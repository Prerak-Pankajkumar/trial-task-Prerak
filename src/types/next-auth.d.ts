import { type AuthUser } from "@/utils/jwtHelper";

declare module "next-auth" {
  interface User {
    userId?: string;
    name?: string;
    email?: string;
  }

  interface Session {
    user: {
      userId?: string;
      name?: string;
      email?: string;
    };
    error?: "RefreshAccessTokenError";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: AuthUser;
    accessToken: string;
    refreshToken: string;
    accessTokenExpired: number;
    refreshTokenExpired: number;
    error?: "RefreshAccessTokenError";
  }
}
