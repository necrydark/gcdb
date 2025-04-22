"use server"
import { getRelicByName } from "@/data/relics";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import db from "../lib/db";
import { addHolyRelic, editHolyRelic } from "../schemas/schema";

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

  const { name, imageUrl, effect, attack, defense, hp, beast, materials, characters } =
    validatedFields.data;

  try {
    const existingRelicByName = await getRelicByName(name);
    if (existingRelicByName) {
      console.error("Relic already exists:", existingRelicByName);
      return { error: "Relic already exists!" };
    }

    // Start a database transaction
    const result = await db.$transaction(async (tx) => {
      // Create the new relic
      const createdRelic = await tx.holyRelic.create({
        data: {
          name,
          imageUrl,
          effect,
          attack,
          defense,
          hp,
          beast,
          materials: {
            connect: materials.map((material) => ({ id: material.id}))
          },
          characters: {
            connect: characters.map((character) => ({ id: character.id })),
          }
        },
      });


      // Now, link the materials to the relic in the junction table
    
    });

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

  const { name, attack, beast,characters,defense,effect,hp,imageUrl,materials} = validatedFields.data;

  if(!name || !attack || !beast || !characters || !defense || !effect || !hp || !imageUrl || !materials) {
    return { error: "A field is not valid."}
  }
  
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
      materials: {
        set: materials.map(m => ({ id: m.id }))
      },
      characters: {
        set: characters.map(c => ({ id: c.id }))
      }
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