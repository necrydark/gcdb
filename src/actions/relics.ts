"use server"
import { getMaterialByName, getRelicByName } from "@/data/relics";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import db from "../lib/db";
import { addHolyRelic, addRelicMaterials } from "../schemas/schema";

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
          characters: {
            connect: characters.map((character) => ({ id: character.id })),
          }
        },
      });

      console.log("Created Relic:", createdRelic);

      // Now, link the materials to the relic in the junction table
      for (const material of materials) {
        const existingMaterial = await getMaterialByName(material.name);

        if (!existingMaterial) {
          console.error("Material not found:", material.name);
          throw new Error(`Material ${material.name} not found!`);
        }

        // Create an entry in the HolyRelicMaterials junction table
        await tx.holyRelicMaterials.create({
          data: {
            holyRelicId: createdRelic.id,
            materialId: existingMaterial.id,
          },
        });

        console.log(
          `Linked Material (${existingMaterial.name}) to Relic (${createdRelic.name})`
        );
      }
    });

    // Revalidate the path after adding the relic
    revalidatePath("/src/app/(protected)/admin/(*.)");

    return { success: "Relic Added" };
  } catch (error) {
    console.error("Error adding relic:", error);
    return { error: "Failed to add relic!" };
  }
};
