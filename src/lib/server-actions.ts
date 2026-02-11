"use server";

import { revalidatePath } from "next/cache";
import db from "../lib/db";

// Simple server action generator for character forms
export async function createCharacter(
  values: any,
): Promise<{ success?: string; error?: string }> {
  try {
    // Create character with basic validation
    await db.character.create({
      data: values,
    });

    revalidatePath("/characters");
    revalidatePath("/admin/characters");

    return { success: "Character created successfully" };
  } catch (error) {
    console.error("Failed to create character:", error);
    return { error: `Failed to create character: ${(error as Error).message}` };
  }
}

export async function updateCharacter(
  id: string,
  values: any,
): Promise<{ success?: string; error?: string }> {
  try {
    await db.character.update({
      where: { id },
      data: values,
    });

    revalidatePath("/characters");
    revalidatePath("/admin/characters");

    return { success: "Character updated successfully" };
  } catch (error) {
    console.error("Failed to update character:", error);
    return { error: `Failed to update character: ${(error as Error).message}` };
  }
}

// Enhance Material server actions
export async function createEnhanceMaterial(
  values: any,
): Promise<{ success?: string; error?: string }> {
  try {
    await db.relicEnhanceMaterial.create({
      data: values,
    });

    revalidatePath("/dashboard/enhance-materials");

    return { success: "Enhance material created successfully" };
  } catch (error) {
    console.error("Failed to create enhance material:", error);
    return { error: `Failed to create enhance material: ${(error as Error).message}` };
  }
}

export async function updateEnhanceMaterial(
  id: string,
  values: any,
): Promise<{ success?: string; error?: string }> {
  try {
    await db.relicEnhanceMaterial.update({
      where: { id },
      data: values,
    });

    revalidatePath("/dashboard/enhance-materials");

    return { success: "Enhance material updated successfully" };
  } catch (error) {
    console.error("Failed to update enhance material:", error);
    return { error: `Failed to update enhance material: ${(error as Error).message}` };
  }
}

export async function deleteEnhanceMaterial(
  id: string,
): Promise<{ success?: string; error?: string }> {
  try {
    await db.relicEnhanceMaterial.delete({
      where: { id },
    });

    revalidatePath("/dashboard/enhance-materials");

    return { success: "Enhance material deleted successfully" };
  } catch (error) {
    console.error("Failed to delete enhance material:", error);
    return { error: `Failed to delete enhance material: ${(error as Error).message}` };
  }
}

export async function deleteCharacter(
  id: string,
): Promise<{ success?: string; error?: string }> {
  try {
    await db.character.delete({
      where: { id },
    });

    revalidatePath("/characters");
    revalidatePath("/admin/characters");

    return { success: "Character deleted successfully" };
  } catch (error) {
    console.error("Failed to delete character:", error);
    return { error: `Failed to delete character: ${(error as Error).message}` };
  }
}
