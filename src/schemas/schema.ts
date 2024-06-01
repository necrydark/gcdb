import { ProfileColour, UserRole } from "@prisma/client";
import { z } from "zod";

export const settingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    username: z.optional(z.string()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
    image: z.optional(z.string()),
    banner: z.optional(z.string()),
    profileColour: z.enum([
      ProfileColour.RED,
      ProfileColour.BLUE,
      ProfileColour.GREEN,
      ProfileColour.YELLOW,
      ProfileColour.PURPLE,
      ProfileColour.ORANGE,
      ProfileColour.PINK,
      ProfileColour.CYAN,
    ]),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "New Password is required",
      path: ["newPassword"],
    }
  );

export const formSchema = z
  .object({
    email: z
      .string()
      .email()
      .min(5, {
        message: "Email must be at least 5 characters long",
      })
      .max(50),
    subject: z
      .string()
      .min(5, {
        message: "Subject must be at least 5 characters long",
      })
      .max(100),
    message: z
      .string()
      .min(5, {
        message: "Message must be at least 5 characters long",
      })
      .max(400),
  })
  .required();

export const signInSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  code: z.optional(z.string()),
});

export const resetSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
});

export const newPasswordSchema = z.object({
  password: z
    .string()
    .min(6, "Minimum of 6 characters is required")
    .max(30, "Maximum of 30 characters is allowed"),
});

export const registerSchema = z
  .object({
    username: z.string().min(6, "Username is required"),
    password: z.string().min(6, "Minimum of 6 characters is required"),
    name: z.string().min(1, "First name is required"),
    email: z.string().email().min(1, "Email is required"),
    confirm_password: z.string().min(6, "Minimum of 6 characters is required"),
    bio: z
      .string()
      .min(10, "Bio must be at least 10 characters long")
      .max(255, "Bio must be at most 255 characters"),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match!",
  });

export const addFriendSchema = z.object({
  username: z.string().min(1, "Username is required"),
});
