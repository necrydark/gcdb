"use server"
import { getRelicByName } from "@/data/relics";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import db from "../lib/db";
import { addHolyRelic, editHolyRelic, MaterialSchema, relicCharacterSchema } from "../schemas/schema";

type MaterialData = z.infer<typeof MaterialSchema>
type CharacterData = z.infer<typeof relicCharacterSchema>

export const getRelics = async () => {
  return await db.holyRelic.findMany({
    include: {
      materials: true
    }
  })
}

export const addRelic = async (values: z.infer<typeof addHolyRelic>) => {
  const validatedFields = addHolyRelic.safeParse(values);
  if (!validatedFields.success) {
    console.error("Validation failed", validatedFields.error);
    return { error: "Invalid Fields!" };
  }

  console.log("Received values in addRelic:", JSON.stringify(values, null, 2));

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


      const createdRelic = await db.holyRelic.create({
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


      // Now, link the materials to the relic in the junction table
    

    // Revalidate the path after adding the relic
    revalidatePath("/src/app/(protected)/admin/(*.)");

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

  if(!validatedFields.success) {
    return {error: "Invalid Fields"}
  }

  const { name, attack, beast,characters,defense,effect,hp,imageUrl,materials, releaseDate} = validatedFields.data;

  if(!name || !attack || !beast || !characters || !defense || !effect || !hp || !imageUrl || !materials) {
    return { error: "A field is not valid."}
  }

  
  const typedMaterials = materials as MaterialData[] | undefined
  const typedCharacters = characters  as CharacterData[] | undefined;

  
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
      materials: typedMaterials ? { set: typedMaterials.map(m => ({ id: m.id })) } : undefined, // Use typedMaterials, handle undefined
      characters: typedCharacters ? { set: typedCharacters.map(c => ({ id: c.id })) } : undefined, // Use typedCharacters, handle undefined
    }
  });

  revalidatePath("/src")
  return { success: "Relic updated successfully" };
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