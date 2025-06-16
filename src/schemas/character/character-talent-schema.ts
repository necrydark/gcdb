import { UniqueDisplayInfo } from "@prisma/client";
import * as z from "zod";

export const characterTalentSchema = z.object({
  id: z.string().optional(),

    name: z.string().min(1, "Talent Name is required").optional(),
    jpName: z.string().min(1, "Talent Japanese Name is required").optional(),
    imageUrl: z
      .string()
      .url("Invalid URL")
      .min(1, "Talent Image URL is required").optional(),
    description: z.string().min(1, "Talent Description is required").optional(),
    uniqueDisplay: z
    .array(z.nativeEnum(UniqueDisplayInfo))
    .default([UniqueDisplayInfo.All_Content]) // Default to an array with Human
    .describe("An array unique displays for the talent").optional(),
  
  })
  