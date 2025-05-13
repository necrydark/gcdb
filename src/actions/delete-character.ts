"use server";

import { revalidatePath } from "next/cache";
import db from "../lib/db";
import { currentUser } from "../utils/auth";

export const deleteCharacter = async (characterId: string) => {

  const user = await currentUser();

  if(!user) {
    return { error: "User is not authorized"}
  }

  if(user.role === "USER"){
    return { error: "User does not have the correct role."}
  }

  if (!characterId) {
    return { error: "Missing Character ID" };
  }

  await db.character.delete({
    where: {
      id: characterId,
    },
    include: {
      stats: true,
      skills: true,
      ultimate: true,
      Comments: true,
      Collection: true,
      associations: true,
      associationsWith: true,

    }
  });

  revalidatePath("/admin/character");
  revalidatePath("/characters");
  revalidatePath("/profile");

  return { success: "Character deleted successfully" };
};
