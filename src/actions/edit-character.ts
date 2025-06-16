"use server";

import { getCharacterById } from "@/data/character";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import db from "../lib/db";
import {
  characterUltimateSchema,
  skillSchema,
  statsSchema,
} from "../schemas/schema";
import { foodSchema } from "../schemas/admin/schema";
import { characterSchema } from "../schemas/character/schema";
import { giftSchema } from "../schemas/character/giftSchema";
import { CrossoverType } from "@prisma/client";

type EditCharacterData = z.infer<typeof characterSchema>;
type CharacterUltimateData = z.infer<typeof characterUltimateSchema>;
type SkillData = z.infer<typeof skillSchema>;
type StatData = z.infer<typeof statsSchema>;
type GiftData = z.infer<typeof giftSchema>;
type FoodData = z.infer<typeof foodSchema>;

export const editCharacter = async (values: EditCharacterData) => {
  const validatedFields = characterSchema.safeParse(values);

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
    races,
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
    gifts,
    food,
    skills,
    characterUltimate,
    characterUnity,
    characterPassive,
    characterTalent,
    releaseDate,
    stats,
    characterFriendshipRewards,
  } = validatedFields.data;

  const MAX_STATS = 3;
  if (stats.length > MAX_STATS) {
    return { error: `a character cannot have more ${MAX_STATS} stats.` };
  }

  // const typedId = id as string;
  const typedCharacterUltimate = characterUltimate as CharacterUltimateData;
  const typedSkills = skills as SkillData[];
  const typedStats = stats as StatData[];
  const typedGift = gifts as GiftData[];
  const typedFood = food as FoodData[];

  const existingCharacterById = await getCharacterById(id as string);

  if (!existingCharacterById) {
    return { error: "Character not found" };
  }

  // const currentSkills = await db.skill.findMany({
  //   where: {
  //     characterId: id as string,
  //   },
  //   include: {
  //     skillRanks: true, // Include skill ranks for each skill
  //   },
  // });

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
      race: races,
      attribute,
      rarity,
      gender,
      bloodType,
      age,
      birthday,
      height,
      weight,
      location,
      cv: CV,
      releaseDate,
      stats: {
        updateMany: typedStats.map((stat) => ({
          where: {
            id: (stat as any).id,
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
          },
        })),
      },
      passiveSkill: {
        update: {
          where: {
            id: characterPassive.id,
          },
          data: {
            name: characterPassive.name,
            jpName: characterPassive.jpName,
            imageUrl: characterPassive.imageUrl,
            description: characterPassive.description,
          },
        },
      },
      unity: {
        update: {
          where: {
            id: characterUnity.id,
          },
          data: {
            name: characterUnity.name,
            jpName: characterUnity.jpName,
            imageUrl: characterUnity.imageUrl,
            description: characterUnity.description,
          },
        },
      },
      talent: {
        update: {
          where: {
            id: characterTalent.id,
          },
          data: {
            name: characterTalent.name,
            jpName: characterTalent.jpName,
            imageUrl: characterTalent.imageUrl,
            description: characterTalent.description,
          },
        },
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
      gift:
        gifts && gifts.length > 0
          ? {
              connect: typedGift.map((gift) => ({ id: gift.id })),
            }
          : undefined,
      food:
        food && food.length > 0
          ? {
              connect: typedFood.map((food) => ({ id: food.id })),
            }
          : undefined,
      skills: {
        update: typedSkills.map((skill) => ({
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
      characterFriendshipRewards:
        crossover === CrossoverType.NotCrossover && characterFriendshipRewards
          ? {
              update: characterFriendshipRewards.map((reward) => ({
                where: { id: reward.friendShipLevelId },
                data: {
                  artworkUrl: reward.artworkUrl,
                  voiceLineText: reward.voiceLineText,
                  voiceLineAudioUrl: reward.voiceLineAudioUrl,
                  diamondAmount: reward.diamondAmount,
                  motionUrl: reward.motionUrl,
                  cosmeticUrl: reward.cosmeticUrl,
                  cosmeticName: reward.cosmeticName,
                },
              })),
            }
          : undefined,
    },
  });

  revalidatePath("/src/app/(protected)/admin/(*.)");
  revalidatePath("/characters");
  return { success: "Character Created" };
};
