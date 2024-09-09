import { getMaterialByName, getRelicByName } from "@/data/relics";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import db from "../lib/db";
import { addHolyRelic, addRelicMaterials } from "../schemas/schema";

export const addRelic = async (values: z.infer<typeof addHolyRelic>) => {
  const validatedFields = addHolyRelic.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  console.log("Received values in addRelic:", JSON.stringify(values, null, 2));

  const { name, imageUrl, effect, attack, defense, hp, beast, materials } =
    validatedFields.data;

  const exisitngRelicByName = await getRelicByName(name);

  if (exisitngRelicByName) {
    return { error: "Relic already exists!" };
  }

  await db.holyRelic.create({
    data: {
      name,
      imageUrl,
      effect,
      attack,
      defense,
      hp,
      // characters: {
      //   connect: Array.isArray(characterId)
      //     ? characterId.map((id) => ({ id }))
      //     : [{ id: characterId }],
      // },
      beast,
      materials: {
        connect: materials.map((material) => ({ id: material.id })),
      },
    },
  });

  revalidatePath("/src/app/(protected)/admin/(*.)");
  return { success: "Relic Added" };
};
