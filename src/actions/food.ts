"use server"

import db from "../lib/db";

export const getFood = async () => {
    try {
        const food = await db.food.findMany();
        return food;
    } catch{
        return null;
    }
}

export const getIngredients = async () => {
    try {
        const ingredients = await db.ingredient.findMany();
        return ingredients
    } catch {
        return null;
    }
}

export const getFoodCount = async () => {
    try {
        const count = await db.food.count();
        return count
    } catch  {
        return null;
    }
}

export const getIngredientCount = async () => {
    try {
        const count = await db.ingredient.count();
        return count
    } catch  {
        return null;
    }
}
