import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { twoFactor, username } from "better-auth/plugins"

 
const prisma = new PrismaClient();
export const auth = betterAuth({
  appName: "GCWiki",
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    plugins: [
      twoFactor(),
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
        role: {
          type: "string",
          required: false,
          defaultValue: "user",
          input: false, // don't allow user to set role
        },
        profileColour: {
          type: "string",
          required: false,
          defaultValue: "PURPLE",
          input: false, // don't allow user to set profile colour
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
    }
});
