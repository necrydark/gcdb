"use server";

import {
  getCharacterById,
  getCharacterBySlug,
  getCharacterByTag,
} from "@/data/character";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import db from "../lib/db";
import { addCharacterSchema, characterUltimateSchema, skillRankSchema, skillSchema } from "../schemas/schema";
import { auth } from "../auth";

type CharacterUltimateData = z.infer<typeof characterUltimateSchema>
type SkillData = z.infer<typeof skillSchema>
type AddCharacterData = z.infer<typeof addCharacterSchema>

export const addCharacter = async (
  values: AddCharacterData
) => {
  const validatedFields = addCharacterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const user = await auth();

  if(!user) {
    return { error: "User is not authorized"}
  }

  if(user.user.role === "USER"){
    return { error: "User does not have the correct role."}
  }
   
  const {
    id,
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
    combatClass,
    attack,
    defense,
    hp,
    pierceRate,
    resistance,
    regeneration,
    critChance,
    critDamage,
    critDefense,
    releaseDate,
    critResistance,
    recoveryRate,
    lifesteal,
    gender,
    bloodType,
    age,
    birthday,
    height,
    weight,
    location,
    CV,
    // gifts,
    // food,
    // associations,
    // associationsWith,
    passiveName,
    passiveImageUrl,
    passiveJpName,
    passiveDescription,
    passiveCCNeeded,
    skills,
    holyRelicId,
    characterUltimate,
  }: AddCharacterData = validatedFields.data;

  const existingCharacterById = await getCharacterById(id as string);
  const existingCharacterBySlug = await getCharacterBySlug(slug as string);
  const existingCharacterByTag = await getCharacterByTag(tag as string);

  if (existingCharacterById) {
    return { error: "Character ID already exists!" };
  }

  if (existingCharacterBySlug) {
    return { error: "Character Slug already exists!" };
  }

  if (existingCharacterByTag) {
    return { error: "Character Tag already exists!" };
  }

  const typedSkills: SkillData[] = skills as SkillData[];
  const typedCharacterUltimate: CharacterUltimateData = characterUltimate as CharacterUltimateData;

  await db.character.create({
    data: {
      id: id ?? "",
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
        create: {
          attack,
          combatClass,
          defense,
          hp,
          pierceRate,
          resistance,
          regeneration,
          critChance,
          critDamage,
          critResistance,
          critDefense,
          recoveryRate,
          lifesteal,
          level: "LEVEL_1"
        }
      },
      passiveName,
      passiveImageUrl,
      passiveJpName,
      passiveDescription,
      passiveCCNeeded,
      // gift: {
      //   create: (gifts ?? []).map((gift) => ({
      //     name: gift.name,
      //     description: gift.description,
      //     imageUrl: gift.imageUrl,
      //     characterId: gift.characterId,
      //   })),
      // },
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
      holyRelic: {
        connect: { id: holyRelicId },
      },
      ultimate: {
        create: {
          name: typedCharacterUltimate.name,
          jpName: typedCharacterUltimate.jpName,
          imageUrl: typedCharacterUltimate.imageUrl,
          description: typedCharacterUltimate.description,
          extraInfo: typedCharacterUltimate.extraInfo ?? [],
        },
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

  revalidatePath("/src/app/(protected)/admin/(*.)");
  return { success: "Character Created" };
};
