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
import { Crossovers } from "@prisma/client";
import { foodSchema } from "../schemas/admin/schema";

type CharacterUltimateData = z.infer<typeof characterUltimateSchema>
type SkillData = z.infer<typeof skillSchema>
type AddCharacterData = z.infer<typeof characterSchema>
type StatData = z.infer<typeof statsSchema>
type GiftData = z.infer<typeof giftSchema>
type FoodData = z.infer<typeof foodSchema>


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
    // associations,
    // associationsWith,
    passiveName,
    passiveImageUrl,
    passiveJpName,
    passiveDescription,
    passiveCCNeeded,
    skills,
    characterUltimate,
    characterUnity,
    characterTalent,
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
      // characterId: id  ,
      name: typedCharacterUltimate.name,
      jpName: typedCharacterUltimate.jpName,
      imageUrl: typedCharacterUltimate.imageUrl,
      description: typedCharacterUltimate.description,
      extraInfo: typedCharacterUltimate.extraInfo ?? "",
    },
  });

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
        CV,
        passiveName,
        passiveImageUrl,
        passiveJpName,
        passiveDescription,
        passiveCCNeeded,
        talentDescription: characterTalent.talentDescription,
        hasTalent: characterTalent.hasTalent,
        talentImageUrl: characterTalent.talentImageUrl,
        talentJpName: characterTalent.talentJpName,
        talentName: characterTalent.talentName,
        unityDescription: characterUnity.description,
        unityImageUrl: characterUnity.imageUrl,
        unityJpName: characterUnity.jpName,
        unityName: characterUnity.name,
        hasUnity: characterUnity.hasUnity,


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
      crossover === Crossovers.NotCrossover && characterFriendshipRewards
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
      // associations: {
      //   create:
      //     associations?.map((a) => ({
      //       slug: a.slug,
      //       imageUrl: a.imageUrl,
      //       characterId: a.characterId,
      //       tag: a.tag,
      //       bonus: a.bonus,
      //     })) || [],
      // },
      // food:
      //   food && food.length > 0
      //     ? {
      //         connect: food.map((f) => ({
      //           mealId_effect: {
      //             mealId: f.mealId,
      //             effect: f.effect,
      //           },
      //         })),
      //       }
      //     : undefined,
      // associationsWith: {
      //   create:
      //     associationsWith?.map((a) => ({
      //       slug: a.slug,
      //       imageUrl: a.imageUrl,
      //       characterId: a.characterId,
      //       tag: a.tag,
      //       bonus: a.bonus,
      //     })) || [],
      // },
    },
  });


  revalidatePath("/src/app/(protected)/admin/(*.)");
  return { success: "Character Created" };
};
