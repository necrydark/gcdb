"use server";

import * as z from "zod";
import db from "../lib/db";
import { ingredientSchema, mealSchema } from "../schemas/admin/schema";
import { getIngredientById } from "@/data/food";
import { revalidatePath } from "next/cache";

export const getFood = async () => {
  try {
    const food = await db.food.findMany();
    return food;
  } catch {
    return null;
  }
};

export const getIngredients = async () => {
  try {
    const ingredients = await db.ingredient.findMany();
    return ingredients;
  } catch {
    return null;
  }
};

export const getFoodCount = async () => {
  try {
    const count = await db.food.count();
    return count;
  } catch {
    return null;
  }
};

export const getIngredientCount = async () => {
  try {
    const count = await db.ingredient.count();
    return count;
  } catch {
    return null;
  }
};

export const getIngredientByName = async (name: string) => {
  try {
    const res = await db.ingredient.findFirst({ where: { name } });
    return res;
  } catch {
    return null;
  }
};

export const getMealByName = async (name: string) => {
  try {
    const res = await db.meal.findFirst({ where: { name } });
    return res;
  } catch {
    return null;
  }
};

export const addIngredient = async (
  values: z.infer<typeof ingredientSchema>
) => {
  const validatedFields = ingredientSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid Fields" };
  }

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { name, imageUrl, location } = validatedFields.data;

  if (!name || !imageUrl || !location) {
    return { error: "A field is not valid." };
  }

  const existingIngredient = await getIngredientByName(name as string);

  if (existingIngredient) {
    return { error: "Ingredient already exists." };
  }

  await db.ingredient.create({
    data: {
      ...values,
    },
  });

  revalidatePath("/src");
  return { success: "Ingredient Added" };
};

export const addMeal = async (values: z.infer<typeof mealSchema>) => {
  const validatedFields = mealSchema.safeParse(values);

  if (!validatedFields || !validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { name, imageUrl } = validatedFields.data;

  if (!name || !imageUrl) {
    return { error: "A field is not valid." };
  }

  const exisitngMeal = await getMealByName(name as string);

  if (exisitngMeal) {
    return { error: "Meal already exists" };
  }

  await db.meal.create({
    data: {
      ...values,
    },
  });

  revalidatePath("/src");
  return { success: "Meal Added" };
};

export const updateIngredient = async (
  values: z.infer<typeof ingredientSchema>
) => {
  const validatedFields = ingredientSchema.safeParse(values);

  if (!validatedFields || !validatedFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { name, imageUrl, location } = validatedFields.data;

  const ingredient = await getIngredientByName(name as string);

  if (!ingredient) {
    return { error: "Ingredient not found" };
  }

  if (!name || !imageUrl || !location) {
    return { error: "A field is not valid." };
  }

  await db.ingredient.update({
    where: {
      id: ingredient.id,
    },
    data: {
      ...values,
    },
  });

  revalidatePath("/src");
  return { success: "Ingredient Updated" };
};

export const updateMeal = async (values: z.infer<typeof mealSchema>) => {
  const validatedFields = mealSchema.safeParse(values);

  if (!validatedFields || !validatedFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { name, imageUrl } = validatedFields.data;

  const meal = await getMealByName(name as string);

  if (!meal) {
    return { error: "Ingredient not found" };
  }

  if (!name || !imageUrl) {
    return { error: "A field is not valid." };
  }

  await db.meal.update({
    where: {
      id: meal.id,
    },
    data: {
      ...values,
    },
  });

  revalidatePath("/src");
  return { success: "Meal Updated" };
};

export const deleteMeal = async(mealId: string) => {
    if(!mealId) {
        return{ error: "Missing Meal ID"}
    }

    await db.meal.delete({
        where: {
            id: mealId
        }
    })

    revalidatePath("/src");
    return { success: "Meal Deleted" };
}

export const deleteIngredient = async(ingredientId: string) => {
    if(!ingredientId) {
        return {error: "Missing Ingredient ID"}
    }

    await db.ingredient.delete({
        where: {
            id: ingredientId
        }
    })

    revalidatePath("/src");
    return { success: "Ingredient Deleted" };
}