import { ProfileColour, Towns, UserRole } from "@prisma/client"
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
    role: z.enum([UserRole.ADMIN, UserRole.USER, UserRole.OWNER, UserRole.COOWNER]),
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
  

  export const ingredientSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    imageUrl: z.string().min(2, {
      message: "Image URL must be at least 2 characters.",
    }).optional(),
    location: z.string().min(2, {
      message: "Location must be at least 2 characters.",
    }).optional(),
  })


  

  export const mealSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    imageUrl: z.string().min(2, {
      message: "Image URL must be at least 2 characters.",
    }),
  })

  export const giftSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    imageUrl: z.string().min(2, {
      message: "Image URL must be at least 2 characters.",
    }),
    description: z.string().min(2, {
      message: "Description must be at least 2 characters.",
    }),
  })


  export const foodSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    imageUrl: z.string().min(2, {
      message: "Image URL must be at least 2 characters.",
    }),
    location: z.enum([Towns.Dalmally, Towns.LionesCastle, Towns.OrdanVillage, Towns.PostTownTala, Towns.Vanya, Towns.Vaziel]).optional(),
    effect: z.string().min(2, {
      message: "Effect must be at least 2 characters.",
    }).optional(),
    ingredients: z.array(
      ingredientSchema
    ).optional(),
  })