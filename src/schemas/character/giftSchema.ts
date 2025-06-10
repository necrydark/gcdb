import * as z from "zod";

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
