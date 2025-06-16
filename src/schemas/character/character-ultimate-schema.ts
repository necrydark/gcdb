import * as z from "zod";

export const characterUltimateSchema = z.object({
    ultimateId: z.string().min(1, "Ultimate ID is required").optional(),
    characterId: z.optional(z.string()),
    name: z.string().min(1, "Ultimate Name is required"),
    jpName: z.string().min(1, "Ultimate Japanese Name is required"),
    imageUrl: z
      .string()
      .url("Invalid URL")
      .min(1, "Ultimate Image URL is required"),
    description: z.string().min(1, "Ultimate Description is required"),
    extraInfo: z.optional((z.string())), 
})

