
import { UniqueDisplayInfo } from "@prisma/client";
import * as z from "zod";

export const characterPassiveSchema = z.object({
    id: z.string().min(1, "Passive ID is required").optional(),
    characterId: z.optional(z.string()),
    name: z.string().min(1, "Passive Name is required"),
    imageUrl: z.string().url("Passive Image URL must be a valid URL").min(1, "Passive Image URL is required"),
    jpName: z.string().min(1, "Passive Japanese Name is required"),
    description: z.string().min(1, "Passive Description is required"),
    ccNeeded: z.optional(z.string()),
    uniqueDisplay: z
    .array(z.nativeEnum(UniqueDisplayInfo))
    .default([UniqueDisplayInfo.All_Content]) 
    .describe("An array unique displays for the passive").optional(),
})
