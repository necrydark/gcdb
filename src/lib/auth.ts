import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { twoFactor, username } from "better-auth/plugins"
import { nextCookies } from "better-auth/next-js";
import { Comments } from "@prisma/client";
import { Resend } from "resend";



const resend = new Resend(process.env.RESEND_API_KEY);

 
const prisma = new PrismaClient();
export const auth = betterAuth({
  appName: "GCWiki",
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
  
    plugins: [
      twoFactor({
        otpOptions: {
          async sendOTP({ user, otp}) {
            await resend.emails.send({
              from: "GCWiki <onboarding@resend.dev>",
              to: user.email,
              subject: "Your OTP code",
              html: `<p>Your OTP code is <strong>${otp}</strong></p>`,
            })
          }
        },
        skipVerificationOnEnable: true
      }),
      username({
        maxUsernameLength: 30,
        usernameValidator(username) {
          const regex = /^[a-zA-Z0-9_]+$/;
          if (!regex.test(username)) {
            throw new Error("Username can only contain letters, numbers, and underscores");
          }
          return true;
        },
      }),
      nextCookies()
    ],
    user: {
      modelName: "users",
      additionalFields: {
        username: {
          type: "string",
          required: true,
          defaultValue: "",
          input: true,
        },
        boxCC: {
          type: "string",
          required: false,
          defaultValue: "11000000",
          input: true, // don't allow user to set profile colour
        },
        ingameRank: {
          type: "string",
          required: false,
          defaultValue: "0",
          input: true, // don't allow user to set profile colour
        }
      }
    },
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      maxPasswordLength: 20,
      minPasswordLength: 8,
      sendResetPassword: async ({user, url, token}, request) => {
        await resend.emails.send({
          from: "GCWiki <onboarding@resend.dev>",
          to: user.email,
          subject: "Reset your password",
          text: `Click the link to reset your password: ${url}`,
        })
      }
    }
});
