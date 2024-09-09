"use server";

import { revalidatePath } from "next/cache";
import db from "../lib/db";

export const deleteCharacter = async (characterId: string) => {
  if (!characterId) {
    return { error: "Missing Character ID" };
  }

  await db.character.delete({
    where: {
      id: characterId,
    },
  });

  revalidatePath("/admin/character");
  revalidatePath("/characters");
  revalidatePath("/profile");

  return { success: "Character deleted successfully" };
};
