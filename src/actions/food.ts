"use server";

import * as z from "zod";
import db from "../lib/db";
import { foodSchema, ingredientSchema, mealSchema } from "../schemas/admin/schema";
import { getFoodByName, getIngredientById, getIngredientByName } from "@/data/food";
import { revalidatePath } from "next/cache";



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

type IngredientData = z.infer<typeof ingredientSchema>

export const addFood = async(values: z.infer<typeof foodSchema>) => {
  const validatedFields = foodSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid Fields" };
  }

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { name, imageUrl, location, effect, ingredients } = validatedFields.data;

  const typedIngredients = ingredients as IngredientData[];


  if (!name || !imageUrl || !location || !effect) {
    return { error: "A field is not valid." };
  }


 try {
  const existingFood = await getFoodByName(name as string);

  if (existingFood) {
    return { error: "Food already exists." };
  }


  await db.food.create({
    data: {
      name,
      imageUrl,
      effect,
      location,
      ingredients: {
        connect: typedIngredients.map((ingredient) => ({ id: ingredient.id}))
      }
    }
  })

 } catch (error ) {
  console.log("error adding food", error)
  return {error: "Failed to add food."}
 }

  revalidatePath("/src");
  return { success: "Ingredient Added" };
}

export const editFood = async(
  values: z.infer<typeof foodSchema>,
  id: string
) => {
  const validatedFields = foodSchema.safeParse(values);

  if(!validatedFields.success) {
    return { error: "Invalid Fields"}
  }

  const { name, imageUrl, effect, location, ingredients} = validatedFields.data;

  if(!name || !imageUrl || !effect || !location || !ingredients)  {
    return { error: "A field is not valid."}
  }

  const typedIngredients = ingredients as IngredientData[] | undefined;

  await db.food.update({
    where: { id},
    data: {
      ...values,
      ingredients: typedIngredients ? { set: typedIngredients.map(i => ({ id: i.id }))} : undefined
    }
  })

  
  revalidatePath("/src")
  return { success: "Food updated successfully" };
}

export const deleteFood = async(id: string) => {
  if(!id) {
    return { error: "Missing ID"}
  }
  await db.food.delete({
    where: {
      id
    }
  })

  revalidatePath("/src")
  return { success: "Food deleted successfully" };

}