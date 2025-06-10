import { StatLevel } from "@prisma/client";
import * as z from "zod";
export const statsSchema = z.object({
  level: z.enum([StatLevel.LEVEL_1, StatLevel.LEVEL_100, StatLevel.TRUE_AWAKENING]).default("LEVEL_1").describe("Stat Level is reuiqred."),
  combatClass: z.number().int().nonnegative("Combat Class must be a non-negative integer").min(0, "Combat Class is required"),
  attack: z.number().int().nonnegative("Attack must be a non-negative integer").min(0, "Attack is required"),
  defense: z.number().int().nonnegative("Defense must be a non-negative integer").min(0, "Defense is required"),
  hp: z.number().int().nonnegative("HP must be a non-negative integer").min(0, "HP is required"),
  pierceRate: z.number().int().nonnegative("Pierce Rate must be a non-negative integer").min(0, "Pierce Rate is required"),
  resistance: z.number().int().nonnegative().min(0, "Resistance is required"),
  regeneration: z.number().int().nonnegative().min(0, "Regeneration is required"),
  critChance: z.number().int().nonnegative().min(0, "Crit Chance is required"),
  critDamage: z.number().int().nonnegative().min(0, "Crit Damage is required"),
  critResistance: z.number().int().nonnegative().min(0, "Crit Resistance is required"),
  critDefense: z.number().int().nonnegative().min(0, "Crit Defense is required"),
  recoveryRate: z.number().int().nonnegative().min(0, "Recovery Rate is required"),
  lifesteal: z.number().int().nonnegative().min(0, "Lifesteal is required"),
})