import {
  getServerSession,
  type NextAuthOptions,
  type User,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/server/db";
import bcrypt from "bcrypt";
import { type AuthUser, jwtHelper, tokenOneDay, tokenOneWeek } from "@/utils/jwtHelper";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  providers: [
    CredentialsProvider({
      id: "next-auth",
      credentials: {
        name: {
          label: "Username",
          type: "text",
          placeholder: "Please enter username",
        },
        email: {
          label: "Email Address",
          type: "text",
          placeholder: "Please enter email address",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "xxxx-xxxx-xxxx",
        },
      },
      async authorize(credentials: Record<"name" | "email" | "password", string> | undefined) : Promise<User | null> {
        try {
          const user = await db.user.findFirst({
            where: {
              email: credentials?.email,
            },
          });

          if (user && credentials) {
            const validPassword = await bcrypt.compare(
              credentials?.password,
              user.password,
            );

            if (validPassword && user?.email) {
              return {
                id: user.id,
                email: user.email,
              };
            }
          } else if (!user && credentials) {
            const isUser = await db.user.findFirst({
              where: {
                email: credentials.email,
              },
            });

            if (!isUser) {
              const hashPassword = await bcrypt.hash(credentials.password, 10);
              const newUser = await db.user.create({
                data: {
                  name: credentials.name,
                  email: credentials.email,
                  password: hashPassword,
                },
              });

              await db.account.create({
                data: {
                  userId: newUser.id, // Assign userId instead of providerAccountId
                  type: "credentials",
                  provider: "Next-Auth"
                }
              });

              return {
                id: newUser.id,
                name: newUser.name ?? '',
                email: newUser.email,
              };
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const authUser = { id: user.id, email: user.email, name: user.name } as AuthUser;

        const accessToken = await jwtHelper.createAccessToken(authUser);
        const refreshToken = await jwtHelper.createRefreshToken(authUser);
        const accessTokenExpired = Date.now() + tokenOneDay * 1000;
        const refreshTokenExpired = Date.now() + tokenOneWeek * 1000;

        const isAccount = await db.account.findFirst({
          where: {
            userId: authUser.id,
          },
        })

        if(isAccount) {
          // Update the account with the new tokens and expiration times
          await db.account.update({
            where: {
              id: isAccount.id,
            },
            data: {
              access_token: accessToken,
              refresh_token: refreshToken,
              expires_at: accessTokenExpired,
              token_type: "Bearer",
            }
          });
        }

        return {
          ...token,
          accessToken,
          refreshToken,
          accessTokenExpired,
          refreshTokenExpired,
          user: authUser,
        };
      } else {
        if (token) {
          if (Date.now() > token.accessTokenExpired) {
            const verifyToken = await jwtHelper.verifyToken(token.refreshToken);

            if (verifyToken) {
              const user = await db.user.findFirst({
                where: {
                  email: token.user.email,
                },
              });

              if (user) {
                const accessToken = await jwtHelper.createAccessToken(token.user);
                const accessTokenExpired = Date.now() + tokenOneDay * 1000;

                return { ...token, accessToken, accessTokenExpired };
              }
            }

            return { ...token, error: "RefreshAccessTokenError" };
          }
        }
      }

      return token;
    },

    async session({ session, user }) {
      if (user) {
        session.user = {
          name: user.name,
          email: user?.email,
          userId: user?.id,
        };
      }
      return session;
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
