import { ProfileColour, UserRole } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  username: string;
  isTwoFactorEnabled: boolean;
  profileColor: ProfileColour;
  banner: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
