import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getUserById } from "@/data/user";
import authConfig from "@/src/auth.config";
import db from "@/src/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { ProfileColour, UserRole } from "@prisma/client";
import NextAuth from "next-auth";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      const existingUser = await getUserById(user.id as string);
      if (!existingUser) {
        return false;
      }

      if (!existingUser.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) {
          return false;
        }

        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;

        if (token.stripeCustomerId) {
          session.user.stripeCustomerId = token.stripeCustomerId as string;
        }
        if (token.stripeSubscriptionId) {
          session.user.stripeSubscriptionId = token.stripeSubscriptionId as string;
        }
        if (token.stripePriceId) {
          session.user.stripePriceId = token.stripePriceId as string;
        }
        if (typeof token.stripeCurrentPeriodEnd === "number") {
          session.user.stripeCurrentPeriodEnd = new Date(
            token.stripeCurrentPeriodEnd
          );
        } else {
          // If it's not a number (e.g., null, undefined, or the problematic empty object),
          // set it to null in the session to match the type `Date | null`
          session.user.stripeCurrentPeriodEnd = null;
        }
        if (token.subscriptionStatus) {
          session.user.subscriptionStatus = token.subscriptionStatus as string;
        }

        session.user.username = token.username as string;
        session.user.email = token.email as string;
        session.user.name = token.name;
        session.user.profileColor = token.profileColour as ProfileColour;
        session.user.image = token.image as string;
        session.user.bio = token.bio as string;
        session.user.boxCC = token.boxCC as string;
        session.user.ingameRank = token.ingameRank as string;
        session.user.displayUsername = token.displayUsername as string;

      }

      return session;
    },
    async jwt({ token }) {
    
      if (!token.sub) return token;
      const user = await getUserById(token.sub);
      if (!user) return token;

      token.name = user.name;
      token.email = user.email;
      token.image = user.image;
      token.role = user.role;
      token.isTwoFactorEnabled = user.isTwoFactorEnabled;
      token.username = user.username;
      token.profileColour = user.profileColour;
      token.bio = user.bio;
      token.boxCC = user.boxCC;
      token.ingameRank = user.ingameRank
      token.displayUsername = user.displayUsername;
      token.stripeCustomerId = user.stripeCustomerId;
        token.stripeSubscriptionId = user.stripeSubscriptionId;
        token.stripePriceId = user.stripePriceId;
        token.stripeCurrentEndPeriod = user.stripeCurrentEndPeriod
        ? user.stripeCurrentEndPeriod.getTime() // Convert Date to timestamp
        : null;
        token.subscriptionStatus = user.subscriptionStatus;

      if(!user.stripeCustomerId && user.email) {
        try {
          console.log(`Creating stripe account for ${user.email}`);

          const customer = await stripe.customers.create({
            email: user.email,
            name: user.name || undefined,
            metadata: { userId: user.id },
          })

          await db.user.update({
            where: { id: user.id },
            data: { stripeCustomerId: customer.id}
          })

          token.stripeCustomerId = customer.id;
        } catch(err) {
          console.error(`Failed to create stripe customer for ${user.email}`, err);
        }
      }

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
