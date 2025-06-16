"use server";

import {
  getCharacterById,
  getCharacterBySlug,
  getCharacterByTag,
} from "@/data/character";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import db from "../lib/db";
import { auth } from "../auth";
import { stat } from "fs";
import { currentUser } from "../utils/auth";
import { characterSchema } from "../schemas/character/schema";
import { characterUltimateSchema } from "../schemas/character/character-ultimate-schema";
import { skillSchema } from "../schemas/character/skillSchema";
import { statsSchema } from "../schemas/character/statsSchema";
import { giftSchema } from "../schemas/character/giftSchema";
import { CrossoverType } from "@prisma/client";
import { foodSchema } from "../schemas/admin/schema";
import { characterPassiveSchema } from "../schemas/character/character-passive-schema";
import { characterTalentSchema } from "../schemas/character/character-talent-schema";
import { characterUnitySchema } from "../schemas/character/character-unity-schema";

type CharacterUltimateData = z.infer<typeof characterUltimateSchema>
type SkillData = z.infer<typeof skillSchema>
type AddCharacterData = z.infer<typeof characterSchema>
type StatData = z.infer<typeof statsSchema>
type GiftData = z.infer<typeof giftSchema>
type FoodData = z.infer<typeof foodSchema>
type PassiveData = z.infer<typeof characterPassiveSchema>
type TalentData = z.infer<typeof characterTalentSchema>
type UnityData = z.infer<typeof characterUnitySchema>



export const addCharacter = async (
  values: z.infer<typeof characterSchema>
) => {
  const validatedFields = characterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const user = await currentUser();

  if(!user) {
    return { error: "User is not authorized"}
  }

  if(user.role === "USER"){
    return { error: "User does not have the correct role."}
  }
   
  const {
    name,
    tag,
    jpName,
    jpTag,
    slug,
    imageUrl,
    game,
    crossover,
    event,
    races,
    attribute,
    rarity,
    stats,
    releaseDate,
    gender,
    bloodType,
    age,
    birthday,
    height,
    weight,
    location,
    CV,
    gifts,
    food,
    characterAssociations,
   characterPassive,
    skills,
    characterUltimate,
    characterUnity,
    characterTalent,
    characterGrace,
    combinedCharacterUltimate,
    characterFriendshipRewards
  } = validatedFields.data;

  const existingCharacterBySlug = await getCharacterBySlug(slug as string);
  const existingCharacterByTag = await getCharacterByTag(tag as string);

  if (existingCharacterBySlug) {
    return { error: "Character Slug already exists!" };
  }

  if (existingCharacterByTag) {
    return { error: "Character Tag already exists!" };
  }

  const max_stats = 3;
  if(stat.length > max_stats) {
    return {error: `A character cannot have more than ${max_stats} stats.`}
  }

  const typedSkills: SkillData[] = skills as SkillData[];
  const typedCharacterUltimate: CharacterUltimateData = characterUltimate as CharacterUltimateData;
  const typedStats: StatData[] = stats as StatData[];
  const typedGifts = gifts as GiftData[];
  const typedFood = food as FoodData[]

  const createdUltimate = await db.characterUltimate.create({
    data: {
      name: typedCharacterUltimate.name,
      jpName: typedCharacterUltimate.jpName,
      imageUrl: typedCharacterUltimate.imageUrl,
      description: typedCharacterUltimate.description,
      extraInfo: typedCharacterUltimate.extraInfo ?? "",
    },
  });

  const createdCombinedUltimate = await db.combinedCharacterUltimate.create({
    data: {
      name: combinedCharacterUltimate.name,
      jpName: combinedCharacterUltimate.jpName,
      imageUrl: combinedCharacterUltimate.imageUrl,
      description: combinedCharacterUltimate.description,
      extraInfo: combinedCharacterUltimate.extraInfo ?? "",
    },
  })

  await db.character.create({
    data: {
      name,
        tag,
        jpName,
        jpTag,
        slug,
        imageUrl,
        game,
        Crossover: crossover,
        event,
        race: races,
        attribute,
        rarity,
        releaseDate,
        gender,
        bloodType,
        age,
        birthday,
        height,
        weight,
        location,
        cv: CV,
      stats: {
        createMany: {
          data: typedStats.map(stat => ({
            level: stat.level,
            combatClass: stat.combatClass,
              attack: stat.attack,
              defense: stat.defense,
              hp: stat.hp,
              pierceRate: stat.pierceRate,
              resistance: stat.resistance,
              regeneration: stat.regeneration,
              critChance: stat.critChance,
              critDamage: stat.critDamage,
              critResistance: stat.critResistance,
              critDefense: stat.critDefense,
              recoveryRate: stat.recoveryRate,
              lifesteal: stat.lifesteal,
          }))
        }
      },
      unity: {
        create: {
          name: characterUnity.name as string,
          jpName: characterUnity.jpName as string,
          imageUrl: characterUnity.imageUrl as string,
          description: characterUnity.description as string,
          uniqueDisplay: characterUnity.uniqueDisplay
        }
      },
      passiveSkill: {
        create: {
          name: characterPassive.name,
          jpName: characterPassive.jpName,
          imageUrl: characterPassive.imageUrl,
          description: characterPassive.description,
          ccNeeded: characterPassive.ccNeeded, 
          uniqueDisplay: characterPassive.uniqueDisplay

        }
      },
      talent: {
        create: {
          name: characterTalent.name as string,
          jpName: characterTalent.jpName as string,
          imageUrl: characterTalent.imageUrl as string,
          description: characterTalent.description as string,
          uniqueDisplay: characterTalent.uniqueDisplay
        }
      },
      grace: {
        create: {
          name: characterGrace.name as string,
          jpName: characterGrace.jpName as string,
          imageUrl: characterGrace.imageUrl as string,
          description: characterGrace.description as string,
          uniqueDisplay: characterGrace.uniqueDisplay
        }
      },

      gift: gifts && gifts.length > 0 ? {
          connect:  typedGifts.map((gift) => ({ id: gift.id}))
      }: undefined ,
      food: food && food.length > 0 ? { 
        connect:  typedFood.map((food) => ({ id: food.id}))
      }: undefined,
      skills: {
        create: typedSkills.map((skill) => ({
          name: skill.name,
          jpName: skill.jpName,
          imageUrl: skill.imageUrl,
          skillRanks: {
            create: skill.skillRanks.map((sr) => ({
              rank: sr.rank,
              description: sr.description,
              type: sr.type,
            })),
          },
        })),
      },
      characterFriendshipRewards: 
      crossover === CrossoverType.NotCrossover && characterFriendshipRewards
      ? {
        create: characterFriendshipRewards.map(reward => ({
          friendshipLevelId: reward.friendShipLevelId,
          artworkUrl: reward.artworkUrl,
          voiceLineText: reward.voiceLineText,
                  voiceLineAudioUrl: reward.voiceLineAudioUrl,
                  diamondAmount: reward.diamondAmount,
                  motionUrl: reward.motionUrl,
                  cosmeticUrl: reward.cosmeticUrl,
                  cosmeticName: reward.cosmeticName,
        }))
      } : undefined,
      ultimate: {
       connect: { id: createdUltimate.id}
      },
      combinedUltimate: {
        connect: {id: createdCombinedUltimate.id}
      },
      associationsAsMain: characterAssociations && characterAssociations.length > 0
      ? {
          create: characterAssociations.map(assoc => ({
            associatedCharacter: {
              connect: { id: assoc.associatedCharacterId }
            },
            associatedCharacterId: assoc.associatedCharacterId,
      
            bonusType: assoc.bonusType ?? "ATTACK_FLAT",
            bonusValue: assoc.bonusValue ?? 0,
            bonusUnit: assoc.bonusUnit,
          })),
        }
      : undefined,
    },
  });


  revalidatePath("/src/app/(protected)/admin/(*.)");
  return { success: "Character Created" };
};
