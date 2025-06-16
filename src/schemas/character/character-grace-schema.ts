import { UniqueDisplayInfo } from "@prisma/client";
import * as z from "zod";

export const characterGraceSchema = z.object({
  id: z.string().optional(),

    name: z.string().min(1, "Grace Name is required").optional(),
    jpName: z.string().min(1, "Grace Japanese Name is required").optional(),
    imageUrl: z
      .string()
      .url("Invalid URL")
      .min(1, "Grace Image URL is required").optional(),
    description: z.string().min(1, "Grace Description is required").optional(),
    uniqueDisplay: z
    .array(z.nativeEnum(UniqueDisplayInfo))
    .default([UniqueDisplayInfo.All_Content]) // Default to an array with Human
    .describe("An array unique displays for the Grace").optional(),
  
  })
  