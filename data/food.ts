import db from "@/src/lib/db";

export const getMealById = async (id: string) => {
    try {
        const meal = await db.meal.findFirst({ where: {id}})
        return meal;
    } catch {
        return null;
    }
}

export const getFoodById = async (id: string) => {
    try {
        const food = await db.food.findFirst({ where: { id}})
        return food;
    } catch {
        return null;
    }
}

export const getIngredientById = async (id: string) => {
    try {
        const ingredient = await db.ingredient.findFirst({ where: { id}}) 
        return ingredient;
    } catch {
        return null;
    }
}