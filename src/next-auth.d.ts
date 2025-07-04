import { ProfileColour, UserRole } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  username: string;
  displayUsername: string;
  isTwoFactorEnabled: boolean;
  profileColor: ProfileColour;
  bio: string;
  boxCC: string;
  ingameRank: string;
  stripeCustomerId?: string | null;
      stripeSubscriptionId?: string | null;
      stripePriceId?: string | null;
      stripeCurrentPeriodEnd?: Date | null;
      subscriptionStatus?: string | null;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
