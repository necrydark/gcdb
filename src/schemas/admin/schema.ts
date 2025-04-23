import { ProfileColour, UserRole } from "@prisma/client"
import * as z from "zod"

export const userSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    emailVerified: z.boolean(),
    twoFactorEnabled: z.boolean(),
    username: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    displayUsername: z.string().optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    image: z.string().optional(),
    boxCC: z.string().optional(),
    ingameRank: z.string().optional(),
    bio: z.string().optional(),
    role: z.enum([UserRole.ADMIN, UserRole.USER, UserRole.OWNER]),
    profileColour: z.enum([    ProfileColour.RED,
        ProfileColour.BLUE,
        ProfileColour.GREEN,
        ProfileColour.YELLOW,
        ProfileColour.PURPLE,
        ProfileColour.ORANGE,
        ProfileColour.PINK,
        ProfileColour.CYAN,]),
  })  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match!",
  });