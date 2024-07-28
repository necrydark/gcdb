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
