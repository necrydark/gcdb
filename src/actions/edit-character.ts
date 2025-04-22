"use server";

import {
  getCharacterById,
} from "@/data/character";
// import { Beast, Genders } from "@prisma/client";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import db from "../lib/db";
import { editCharacterSchema } from "../schemas/schema";

export const editCharacter = async (
  values: z.infer<typeof editCharacterSchema>
) => {
  const validatedFields = editCharacterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
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
    // holyRelic,
    characterUltimate,
  } = validatedFields.data;

  const existingCharacterById = await getCharacterById(id as string);

  if (!existingCharacterById) {
    return { error: "Character not found" };
  }

  const currentSkills = await db.skill.findMany({
    where: {
      characterId: id as string,
    },
    include: {
      skillRanks: true, // Include skill ranks for each skill
    },
  });

  const updatedCharacter = await db.character.update({
    where: {
      id: existingCharacterById.id,
    },
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
      ultimate: {
        update: {
          where: {
            id: characterUltimate.ultimateId,
          },
          data: {
            name: characterUltimate.name,
            jpName: characterUltimate.jpName,
            imageUrl: characterUltimate.imageUrl,
            description: characterUltimate.description,
            extraInfo: {
              set: Array.isArray(characterUltimate.extraInfo)
                ? characterUltimate.extraInfo.filter(
                    (info) => typeof info === "string"
                  )
                : [],
            },
          },
        },
      },
      skills: {
        update: skills.map((skill, index) => ({
          where: { id: skill.id }, // Add the id property to the where object
          data: {
            name: skill.name,
            jpName: skill.jpName,
            imageUrl: skill.imageUrl,
            skillRanks: {
              deleteMany: {}, // Clear existing skillRanks
              create: skill.skillRanks.map((sr) => ({
                rank: sr.rank,
                description: sr.description,
                type: sr.type,
              })),
            },
          },
        })),
      },
    },
  });

  // gift: {
  //   create: (gifts ?? []).map((gift) => ({
  //     name: gift.name,
  //     description: gift.description,
  //     imageUrl: gift.imageUrl,
  //     characterId: gift.characterId,
  //   })),
  // },

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

  revalidatePath("/src/app/(protected)/admin/(*.)");
  return { success: "Character Created" };
};
