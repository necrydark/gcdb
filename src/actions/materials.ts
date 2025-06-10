"use server";
import { getEnhanceMaterialByName, getMaterialByName, getRelicByName } from "@/data/relics";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import db from "../lib/db";
import { addRelicEnhanceMaterials, addRelicMaterials } from "../schemas/schema";

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

  await db.material.create({
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

) => {
  const validatedFields = addRelicMaterials.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { name, imageUrl, location } = validatedFields.data;

  const material = await getMaterialByName(name as string);

  if(!material) { 
    return { error: "Material Not Found"}
  }

  if (!name || !imageUrl || !location) {
    return { error: "A field is not valid" };
  }

  await db.material.update({
    where: {
      id: material.id
    },
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

  await db.material.delete({
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


export const addEnhanceMaterial = async (
  values: z.infer<typeof addRelicEnhanceMaterials>
) => {
  const validatedFields = addRelicEnhanceMaterials.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { name, imageUrl, location } = validatedFields.data;

  if (!name || !imageUrl || !location) {
    return { error: "A field is not valid" };
  }

  const exisitngMaterialByName = await getEnhanceMaterialByName(name as string);

  if (exisitngMaterialByName) {
    return { error: "Material already exists!" };
  }

  await db.relicEnhanceMaterial.create({
    data: {
      name,
      imageUrl,
      location,
    },
  });

  revalidatePath("/src/app/(protected)/admin/(*.)");
  return { success: "Enhance Relic Material Added" };
};

export const updateEnhanceMaterial = async (
  values: z.infer<typeof addRelicEnhanceMaterials>,

) => {
  const validatedFields = addRelicEnhanceMaterials.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { name, imageUrl, location } = validatedFields.data;

  const material = await getEnhanceMaterialByName(name as string);

  if(!material) { 
    return { error: "Material Not Found"}
  }

  if (!name || !imageUrl || !location) {
    return { error: "A field is not valid" };
  }

  await db.relicEnhanceMaterial.update({
    where: {
      id: material.id
    },
    data: {
      ...values
    },
  });

  revalidatePath("/src/app/(protected)/admin/(*.)");
  return { success: "Material Updated" };
};

export const deleteEnhanceMaterial = async (materialId: string) => {
  if (!materialId) {
    return { error: "Missing Enhance Material ID" };
  }

  await db.relicEnhanceMaterial.delete({
    where: {
      id: materialId,
    },
  });

  revalidatePath("/admin/character");
  revalidatePath("/characters");
  revalidatePath("/relics");
  revalidatePath("/characters");
  revalidatePath("/admin/relics");
  revalidatePath("/admin/relics/enhance-materials");
  revalidatePath("/profile");

  return { success: "Material deleted successfully" };
};