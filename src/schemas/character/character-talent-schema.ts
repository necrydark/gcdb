import * as z from "zod";

export const characterTalentSchema = z.object({
    hasTalent: z.boolean().optional(),
    talentName: z.string().min(1, "Talent Name is required").optional(),
    talentJpName: z.string().min(1, "Talent Japanese Name is required").optional(),
    talentImageUrl: z
      .string()
      .url("Invalid URL")
      .min(1, "Talent Image URL is required").optional(),
    talentDescription: z.string().min(1, "Talent Description is required").optional(),
  
  })
  