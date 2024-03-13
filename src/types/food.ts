import { CharacterPreview } from "./character";

export type Ingredient = {
  name: string;
  imageUrl: string;
  location: string;
};

export type Meal = {
  name: string;
  imageUrl: string;
};

export type Food = {
  meal: Meal;
  ingredients?: Ingredient[];
  effect: string;
  characters: CharacterPreview[];
};
