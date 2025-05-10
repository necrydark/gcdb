import db from "@/src/lib/db";
import e from "express";


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
  
  export const getFoods = async() => {
    try {
      const res = await db.food.findMany();
      return res;
    } catch {
      return null;
    }
  }


  export const getFoodByName = async(name: string) => {
    try {
        const res = await db.food.findFirst({ where: {name}})
        return res
    } catch {
        return null;
    }
  }