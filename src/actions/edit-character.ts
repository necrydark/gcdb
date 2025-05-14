"use server";

import {
  getCharacterById,
} from "@/data/character";
// import { Beast, Genders } from "@prisma/client";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import db from "../lib/db";
import { characterUltimateSchema, editCharacterSchema, skillSchema, statsSchema } from "../schemas/schema";

type EditCharacterData = z.infer<typeof editCharacterSchema>
type CharacterUltimateData = z.infer<typeof characterUltimateSchema>
type SkillData = z.infer<typeof skillSchema>
type StatData = z.infer<typeof statsSchema>

export const editCharacter = async (
  values: EditCharacterData
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
    stats
  } = validatedFields.data;


  
  const MAX_STATS = 3;
  if(stats.length > MAX_STATS) {
    return { error: `a character cannot have more ${MAX_STATS} stats.`}
  }
  
  const typedId = id as string;
  const typedCharacterUltimate = characterUltimate as CharacterUltimateData;
  const typedSkills = skills as SkillData[];
  const typedStats = stats as StatData[];

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
      stats: {
        updateMany: typedStats.map(stat => ({
          where: {
            id: (stat as any).id
          },
          data: {
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
          }
        }))
      },
      ultimate: {
        update: {
          where: {
            id: typedCharacterUltimate.ultimateId,
          },
          data: {
            name: typedCharacterUltimate.name,
            jpName: typedCharacterUltimate.jpName,
            imageUrl: typedCharacterUltimate.imageUrl,
            description: typedCharacterUltimate.description,
            extraInfo: typedCharacterUltimate.extraInfo,
          },
        },
      },
      skills: {
        update: typedSkills.map((skill,) => ({
          where: { id: (skill as any).id }, 
          data: {
            name: skill.name,
            jpName: skill.jpName,
            imageUrl: skill.imageUrl,
            skillRanks: {
              deleteMany: {}, 
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
  revalidatePath("/src/app/(protected)/admin/(*.)");
  revalidatePath("/characters")
  return { success: "Character Created" };
};
