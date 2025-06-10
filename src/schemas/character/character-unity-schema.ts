import * as z from "zod";

export const characterUnitySchema = z.object({
    hasUnity: z.boolean().optional(),
    name: z.string().min(1, "Unity Name is required").optional(),
    jpName: z.string().min(1, "Unity Japanese Name is required").optional(),
    imageUrl: z
      .string()
      .url("Invalid URL")
      .min(1, "Unity Image URL is required").optional(),
    description: z.string().min(1, "Unity Description is required").optional(),
  
  })
  