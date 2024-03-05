export type Ingredient = {
  name: string;
  imageUrl: string;
  location: string;
};

export type Food = {
  name: string;
  imageUrl: string;
  effect?: string;
  ingredients?: Ingredient[];
};
