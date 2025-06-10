import * as z from "zod";

export const skillRankSchema = z.object({
    rank: z.coerce.number().min(1).max(3),
    description: z.string().min(1, "Skill Rank Description is required"),
    type: z.string().min(1, "Skill Rank Type is required"),
  });
  
  export const skillSchema = z.object({
    name: z.string().min(1, "Skill Name is required"),
    jpName: z.string().min(1, "Skill Japanese Name is required"),
    imageUrl: z.string().min(1, "Image URL is required"),
    skillRanks: z
      .array(skillRankSchema)
      .length(3, "Exactly three skill ranks are required"),
  });