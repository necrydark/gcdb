import * as z from "zod";


export const friendshipRewardSchema = z.object({
    friendShipLevelId: z.string().min(1, "Friendship Level is required"),
    level: z.number().int().min(1).max(5),
    artworkUrl: z.string().url("Must be a valid URL").optional(),
  voiceLineText: z.string().optional(),
  voiceLineAudioUrl: z.string().url("Must be a valid URL").optional(),
  diamondAmount: z.coerce.number().int().min(0).optional(),
  motionUrl: z.string().url("Must be a valid URL").optional(),
  cosmeticUrl: z.string().url("Must be a valid URL").optional(),
  cosmeticName: z.string().optional(),
})