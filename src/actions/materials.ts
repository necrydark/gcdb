"use server";
import { getMaterialByName, getRelicByName } from "@/data/relics";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import db from "../lib/db";
import { addHolyRelic, addRelicMaterials } from "../schemas/schema";

export const addMaterial = async (
  values: z.infer<typeof addRelicMaterials>
) => {
  const validatedFields = addRelicMaterials.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { name, imageUrl, location } = validatedFields.data;

  if (!name || !imageUrl || !location) {
    return { error: "A field is not valid" };
  }

  const exisitngMaterialByName = await getMaterialByName(name as string);

  if (exisitngMaterialByName) {
    return { error: "Material already exists!" };
  }

  await db.materials.create({
    data: {
      name,
      imageUrl,
      location,
    },
  });

  revalidatePath("/src/app/(protected)/admin/(*.)");
  return { success: "Material Added" };
};

export const updateMaterial = async (
  values: z.infer<typeof addRelicMaterials>,
  id: string
) => {
  const validatedFields = addRelicMaterials.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { name, imageUrl, location } = validatedFields.data;

  if (!name || !imageUrl) {
    return { error: "A field is not valid" };
  }

  await db.materials.update({
    where: { id },
    data: {
      ...values
    },
  });

  revalidatePath("/src/app/(protected)/admin/(*.)");
  return { success: "Material Updated" };
};

export const deleteMaterial = async (materialId: string) => {
  if (!materialId) {
    return { error: "Missing Material ID" };
  }

  await db.materials.delete({
    where: {
      id: materialId,
    },
  });

  revalidatePath("/admin/character");
  revalidatePath("/characters");
  revalidatePath("/relics");
  revalidatePath("/characters");
  revalidatePath("/admin/relics");
  revalidatePath("/admin/relics/materials");
  revalidatePath("/profile");

  return { success: "Material deleted successfully" };
};
