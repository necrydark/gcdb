//TODO: Get Character Slug
import db from "@/src/lib/db";

export const getCharacterById = async (id: string) => {
  try {
    const character = await db.character.findUnique({ where: { id } });
    return character;
  } catch {
    return null;
  }
};

export const getCharacterBySlug = async (slug: string) => {
  try {
    const character = await db.character.findUnique({ where: { slug } });
    return character;
  } catch {
    return null;
  }
};

export const getCharacterByTag = async (tag: string) => {
  try {
    const character = await db.character.findUnique({ where: { tag } });
    return character;
  } catch {
    return null;
  }
};

export const getSkillsById = async (id: string) => {
  try {
    const skills = await db.skill.findMany({ where: { characterId: id } });
    return skills;
  } catch {
    return null;
  }
};

export const getSkillRanksById = async (ids: string[]) => {
  try {
    const skillRanks = await db.skillRank.findMany({
      where: {
        skillId: {
          in: ids,
        },
      },
    });
    return skillRanks;
  } catch (error) {
    return null;
  }
};

export const getUltimateByCharacterId = async (id: string) => {
  try {
    const ultimate = await db.characterUltimate.findFirst({
      where: { characterId: id },
    });
    return ultimate;
  } catch {
    return null;
  }
};
