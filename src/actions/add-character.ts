"use server";

import {
  getCharacterById,
  getCharacterBySlug,
  getCharacterByTag,
} from "@/data/character";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import db from "../lib/db";
import { addCharacterSchema, characterUltimateSchema, skillRankSchema, skillSchema, statsSchema } from "../schemas/schema";
import { auth } from "../auth";
import { stat } from "fs";
import { giftSchema } from "../schemas/admin/schema";
import { currentUser } from "../utils/auth";

type CharacterUltimateData = z.infer<typeof characterUltimateSchema>
type SkillData = z.infer<typeof skillSchema>
type AddCharacterData = z.infer<typeof addCharacterSchema>
type StatData = z.infer<typeof statsSchema>
type GiftData = z.infer<typeof giftSchema>

export const addCharacter = async (
  values: AddCharacterData
) => {
  const validatedFields = addCharacterSchema.safeParse(values);

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
    race,
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
    // food,
    // associations,
    // associationsWith,
    passiveName,
    passiveImageUrl,
    passiveJpName,
    passiveDescription,
    passiveCCNeeded,
    skills,
    characterUltimate,
  }: AddCharacterData = validatedFields.data;

  const existingCharacterBySlug = await getCharacterBySlug(slug as string);
  const existingCharacterByTag = await getCharacterByTag(tag as string);

  if (existingCharacterBySlug) {
    return { error: "Character Slug already exists!" };
  }

  if (existingCharacterByTag) {
    return { error: "Character Tag already exists!" };
  }

  const max_stats = 3;
  if(stats.length > max_stats) {
    return {error: `A character cannot have more than ${max_stats} stats.`}
  }

  const typedSkills: SkillData[] = skills as SkillData[];
  const typedCharacterUltimate: CharacterUltimateData = characterUltimate as CharacterUltimateData;
  const typedStats: StatData[] = stats as StatData[];

  console.log("hello wordl")
  const createdUltimate = await db.characterUltimate.create({
    data: {
      // You might need to provide the characterId here if ultimate requires it
      // characterId: characterId, // If CharacterUltimate schema requires characterId on creation
      name: typedCharacterUltimate.name,
      jpName: typedCharacterUltimate.jpName,
      imageUrl: typedCharacterUltimate.imageUrl,
      description: typedCharacterUltimate.description,
      extraInfo: typedCharacterUltimate.extraInfo ?? "", // Or || undefined based on schema
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
      race,
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
      passiveName,
      passiveImageUrl,
      passiveJpName,
      passiveDescription,
      passiveCCNeeded,
      gift: gifts ? {
        create: {
          name: gifts.name, // No need for ?. because we checked if gifts exists
            imageUrl: gifts.imageUrl,
            description: gifts.description,
        }
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
      // holyRelic: {
      //   connect: { id: holyRelicId },
      // },
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
      // holyRelic: holyRelic
      //   ? {
      //       create: holyRelic.map((a) => ({
      //         name: a.name || "",
      //         effect: a.effect,
      //         attack: a.attack.toString(),
      //         hp: a.hp.toString(),
      //         defense: a.defense.toString(),
      //         beast: a.beast,
      //         materials: {
      //           create: a.materials
      //             .filter((material) => material.imageUrl !== undefined)
      //             .map((material) => ({
      //               name: material.name || "",
      //               imageUrl: material.imageUrl!, // Non-null assertion, since we filtered out undefined
      //             })),
      //         },
      //       })),
      //     }
      //   : undefined,
    },
  });

  console.log("i ahtelife ")

  revalidatePath("/src/app/(protected)/admin/(*.)");
  return { success: "Character Created" };
};
