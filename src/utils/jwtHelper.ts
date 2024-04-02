import { encode, decode } from "next-auth/jwt";
import { type User } from "@prisma/client";
import { env } from "@/env";

export type AuthUser = Omit<User, "Password"> & {
  // Add additional properties required by the JWT type
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
  accessTokenExpired: number;
  refreshTokenExpired: number;
};

export const tokenOneDay = 24 * 60 * 60;
export const tokenOneWeek = tokenOneDay * 7;

const createJWT = (token: AuthUser, duration: number) =>
  encode({ token, secret: env.NEXTAUTH_JWT_SECRET, maxAge: duration });

export const jwtHelper = {
  createAccessToken: (token: AuthUser) => createJWT(token, tokenOneDay),
  createRefreshToken: (token: AuthUser) => createJWT(token, tokenOneWeek),
  verifyToken: (token: string) =>
    decode({ token, secret: env.NEXTAUTH_JWT_SECRET }),
};
