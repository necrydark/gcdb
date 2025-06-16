"use server"
import { getRelicByName } from "@/data/relics";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import db from "../lib/db";
import { addHolyRelic, editHolyRelic, MaterialSchema, relicCharacterSchema } from "../schemas/schema";

type MaterialData = z.infer<typeof MaterialSchema>
type CharacterData = z.infer<typeof relicCharacterSchema>

export async function getRelics() {
  try {
    const relicsWithRelations = await db.holyRelic.findMany({
    });

    // Map over the results to create plain objects with relevant data
    const serializedRelics = relicsWithRelations.map(relic => ({
      id: relic.id,
      name: relic.name,
      imageUrl: relic.imageUrl,
      effect: relic.effect,
      releaseDate: relic.releaseDate,
      attack: relic.attack,
      defense: relic.defense,
      hp: relic.hp,
      enhancable: relic.enhancable,
      enhanceAttack: relic.enhanceAttack,
      enhanceDefense: relic.enhanceDefense,
      enhanceHp: relic.enhanceHp,
      beast: relic.beast
    }));

    return serializedRelics;

  } catch (error) {
    console.error("Error fetching relics:", error);
    // Handle the error appropriately, perhaps return an empty array or throw
    return [];
  }
}

export const addRelic = async (values: z.infer<typeof addHolyRelic>) => {
  const validatedFields = addHolyRelic.safeParse(values);
  if (!validatedFields.success) {
    console.error("Validation failed", validatedFields.error);
    return { error: "Invalid Fields!" };
  }


  const { name, imageUrl, effect, attack, defense, hp, beast, releaseDate, materials, characters } =
    validatedFields.data;

  try {
    const existingRelicByName = await getRelicByName(name as string);
    if (existingRelicByName) {
      console.error("Relic already exists:", existingRelicByName);
      return { error: "Relic already exists!" };
    }

    const typedMaterials = materials as MaterialData[]
    const typedCharacters = characters  as CharacterData[];


     await db.holyRelic.create({
        data: {
          name,
          imageUrl,
          effect,
          attack,
          defense,
          hp,
          beast,
          releaseDate,
          materials: {
            connect: typedMaterials.map((material) => ({ id: material.id}))
          },
          characters: {
            connect: typedCharacters.map((character) => ({ id: character.id })),
          }
        },
      });

    // Revalidate the path after adding the relic
    revalidatePath("/src/app/(protected)/admin/(*.)");

    console.log("hello")

    return { success: "Relic Added" };
  } catch (error) {
    console.error("Error adding relic:", error);
    return { error: "Failed to add relic!" };
  }
};

export const editRelic = async (
  values: z.infer<typeof editHolyRelic>,
  id: string
) => {
  const validatedFields = editHolyRelic.safeParse(values);

  if (!validatedFields.success) {
    // More specific error handling using ZodError
    const errors = validatedFields.error.flatten().fieldErrors;
    return { error: "Validation failed", details: errors };
  }

  const { name, attack, beast,characters,defense,effect,hp,imageUrl,materials, releaseDate} = validatedFields.data;

  const typedMaterials = materials as MaterialData[] | undefined
  const typedCharacters = characters  as CharacterData[] | undefined;

  
  try {
    await db.holyRelic.update({
      where: { id },
      data: {
        name,
        imageUrl,
        effect,
        attack,
        defense,
        hp,
        beast,
        releaseDate,
        // If materials/characters are optional in Zod, the checks below are correct
        materials: typedMaterials ? { set: typedMaterials.map(m => ({ id: m.id })) } : undefined,
        characters: typedCharacters ? { set: typedCharacters.map(c => ({ id: c.id })) } : undefined,
      }
    });

    revalidatePath("/src"); // Verify this path is correct
    return { success: "Relic updated successfully" };
  } catch (error) {
    console.error("Error updating relic:", error);
    return { error: "Failed to update relic. Please try again." };
  }
}



export const deleteRelic = async (relicId: string) => {
  if (!relicId) {
    return { error: "Missing Relic ID" };
  }

  await db.holyRelic.delete({
    where: {
      id: relicId,
    },
  });

  revalidatePath("/admin/relics");
  revalidatePath("/characters");
  revalidatePath("/relics");
  revalidatePath("/profile");

  return { success: "Relic deleted successfully" };
};