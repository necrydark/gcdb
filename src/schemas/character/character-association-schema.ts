import { BonusType } from "@prisma/client"
import * as z from "zod"

export const characterAssociationSchema = z.object({
    associatedCharacterId: z.string().cuid({ message: "Invalid association character ID"}).optional(),
    bonusType:z.nativeEnum(BonusType, { message: "Invalid bonus type "}).optional(),
    bonusValue: z.preprocess(
        (a) => {
          // Ensure the value is treated as a number
          if (typeof a === 'string' && a.trim() === '') return undefined; // Treat empty string as undefined for optional
          return parseFloat(String(a));
        },
        z.number().min(0, "Bonus value must be positive.")// Allow undefined for empty input, make it optional
      ).optional(),
      bonusUnit: z.string().optional(),
})