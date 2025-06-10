// src/schemas/schema.ts
import * as z from "zod";
import {
  Game, Crossovers, Race, Attribute, Rarity, Genders, GameEvent, StatLevel, FriendshipRewardType
} from "@prisma/client";

import { giftSchema } from './giftSchema';
import { statsSchema } from './statsSchema';
import { skillSchema } from './skillSchema';
import { characterUltimateSchema } from './character-ultimate-schema';
import { characterUnitySchema } from './character-unity-schema';
import { friendshipRewardSchema } from './friendship-reward-schema'; // Our specific reward schema
import { characterTalentSchema } from "./character-talent-schema";

// Define common fields for all characters
const commonCharacterFields = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  tag: z.string().min(1, "Tag is required"),
  jpName: z.string().min(1, "Japanese Name is required"),
  jpTag: z.string().min(1, "Japanese Tag is required"),
  slug: z.optional(z.string().min(1, "Slug is required")),
  imageUrl: z.string().url("Image URL must be a valid URL").min(1, "Image URL is required"),
  releaseDate:  z.coerce.date().describe("Release Date is required."),
  game: z.nativeEnum(Game).default(Game.Base).describe("Game is required."),
  races: z
  .array(z.nativeEnum(Race))
  .default([Race.Human]) // Default to an array with Human
  .describe("An array of races for the character"),
  attribute: z.nativeEnum(Attribute),
  rarity: z.nativeEnum(Rarity),
  gender: z.nativeEnum(Genders).optional(),
  bloodType: z.string().optional(),
  age: z.string().optional(),
  birthday: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  CV: z.string().optional(),
  gifts: z.array(giftSchema).optional(),
  stats: z.array(statsSchema).min(1, "A character must have at least one stat").max(3, "A character cannot have more than 3 stat choices.").refine(stats => {
    const levels = stats.map(stat => stat.level);
    const uniqueLevels = new Set(levels);
    return levels.length === uniqueLevels.size;
  }, {
    message: "Each stat must have a unique level",
    path: ['stats']
  }),
  food: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1, "Food name is required"),
      imageUrl: z.string().url(),
      effect: z.string().optional(),
      mealId: z.coerce.number().optional(),
      characterId: z.string().optional(),
    })
  ).optional(),
  passiveName: z.string().min(1, "Passive Name is required"),
  passiveImageUrl: z.string().url("Passive Image URL must be a valid URL").min(1, "Passive Image URL is required"),
  passiveJpName: z.string().min(1, "Passive Japanese Name is required"),
  passiveDescription: z.string().min(1, "Passive Description is required"),
  passiveCCNeeded: z.optional(z.string()),
  skills: z.array(skillSchema).min(2, "At least two skills are required"),
  associations: z.array(
    z.object({
      name: z.string(),
      imageUrl: z.string().url(),
      slug: z.string(),
      bonus: z.string().optional(),
      tag: z.string(),
      characterId: z.string(),
    })
  ).optional(),
  associationsWith: z.array(
    z.object({
      name: z.string(),
      imageUrl: z.string().url(),
      slug: z.string().nullable(),
      bonus: z.string().optional(),
      tag: z.string().nullable(),
      characterId: z.string(),
    })
  ).optional(),
  holyRelicId: z.string().optional(),
  event: z.nativeEnum(GameEvent).default(GameEvent.None),
  characterUltimate: characterUltimateSchema,
  characterUnity: characterUnitySchema,
  characterTalent: characterTalentSchema,
});


// Define the full addCharacterSchema with conditional logic for 'crossover'
export const characterSchema = z.discriminatedUnion("crossover", [
  // Case 1: Not a Crossover Character
  commonCharacterFields.extend({
    crossover: z.literal(Crossovers.NotCrossover),
    characterFriendshipRewards: z.array(friendshipRewardSchema)
      .length(5, "Non-crossover characters must have exactly 5 friendship rewards.")
      .refine(rewards => {
        const levelIds = new Set(rewards.map(r => r.friendShipLevelId));
        return levelIds.size === 5; // Ensure all 5 unique friendship levels are defined
      }, {
        message: "All 5 friendship levels must be uniquely defined for non-crossover characters.",
        path: ['characterFriendshipRewards']
      })
      .refine(rewards => {
        return true
      }, {
          message: "Reward details missing for required types.",
          path: ['characterFriendshipRewards']
      }),
  }),
  // Case 2: Crossover Character
  commonCharacterFields.extend({
    crossover: z.literal(Crossovers.Crossover),
    characterFriendshipRewards: z.array(friendshipRewardSchema) // Still an array type, but must be empty
      .max(0, "Crossover characters cannot have friendship rewards.")
      .optional() // Can be undefined or an empty array
  }),
]);
