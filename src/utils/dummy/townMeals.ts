import { ingredients, meal } from "./food";

const town1 = [
  {
    meal: meal.sweetMeatPie,
    ingredients: [ingredients.agedMeat, ingredients.sugar, ingredients.laurels],
    effect: "EXP +100%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
  {
    meal: meal.vegetableMeatPie,
    ingredients: [
      ingredients.agedMeat,
      ingredients.vegetables,
      ingredients.laurels,
    ],
    effect: "EXP +100%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
  {
    meal: meal.milkMeatPie,
    ingredients: [ingredients.agedMeat, ingredients.milk, ingredients.laurels],
    effect: "EXP +100%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
  {
    meal: meal.chickenMatangoTamoyaki,
    ingredients: [
      ingredients.agedMeat,
      ingredients.eggs,
      ingredients.sliceChickenMatango,
    ],
    effect: "Attack +10%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
  {
    meal: meal.chickenMatangoGrilledButter,
    ingredients: [
      ingredients.agedMeat,
      ingredients.butter,
      ingredients.sliceChickenMatango,
    ],
    effect: "Attack +10%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
  {
    meal: meal.honeyRoastedChickenMatango,
    ingredients: [
      ingredients.agedMeat,
      ingredients.honey,
      ingredients.sliceChickenMatango,
    ],
    effect: "Attack +10%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
  {
    meal: meal.pepperGrilledBeef,
    ingredients: [
      ingredients.agedMeat,
      ingredients.pepper,
      ingredients.truffle,
    ],
    effect: "Pierce Rate +20%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
  {
    meal: meal.saltGrilledBeef,
    ingredients: [ingredients.agedMeat, ingredients.salt, ingredients.truffle],
    effect: "Pierce Rate +20%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
  {
    meal: meal.herbGrilledBeef,
    ingredients: [ingredients.agedMeat, ingredients.herbs, ingredients.truffle],
    effect: "Pierce Rate +20%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
];

const town2 = [
  {
    meal: meal.milkPudding,
    ingredients: [
      ingredients.organicMilk,
      ingredients.milk,
      ingredients.breathOfDanafort,
    ],
    effect: "Gold +100%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
  {
    meal: meal.eggPudding,
    ingredients: [
      ingredients.organicMilk,
      ingredients.eggs,
      ingredients.breathOfDanafort,
    ],
    effect: "Gold +100%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
  {
    meal: meal.honeyPudding,
    ingredients: [
      ingredients.organicMilk,
      ingredients.honey,
      ingredients.breathOfDanafort,
    ],
    effect: "Gold +100%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
  {
    meal: meal.sandCrawlerGrilledSalt,
    ingredients: [
      ingredients.organicMilk,
      ingredients.salt,
      ingredients.asparagas,
    ],
    effect: "Defense +20%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
  {
    meal: meal.sandCrawlerGrilledButter,
    ingredients: [
      ingredients.organicMilk,
      ingredients.butter,
      ingredients.asparagas,
    ],
    effect: "Defense +20%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
  {
    meal: meal.sandCrawlerGrilledHerbs,
    ingredients: [
      ingredients.organicMilk,
      ingredients.herbs,
      ingredients.asparagas,
    ],
    effect: "Defense +20%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
  {
    meal: meal.breadCheeseSugar,
    ingredients: [
      ingredients.organicMilk,
      ingredients.sugar,
      ingredients.goatMilk,
    ],
    effect: "Resistance +30%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
  {
    meal: meal.breadCheesePepper,
    ingredients: [
      ingredients.organicMilk,
      ingredients.pepper,
      ingredients.goatMilk,
    ],
    effect: "Resistance +30%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
  {
    meal: meal.breadCheeseVegetables,
    ingredients: [
      ingredients.organicMilk,
      ingredients.vegetables,
      ingredients.goatMilk,
    ],
    effect: "Resistance +30%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
];

const town3 = [
  {
    meal: meal.milkStrawberry,
    ingredients: [
      ingredients.vegetablesAndFruits,
      ingredients.milk,
      ingredients.wildStrawberry,
    ],
    effect: "Combat Class (CP) +10%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
  {
    meal: meal.butterStrawberry,
    ingredients: [
      ingredients.vegetablesAndFruits,
      ingredients.butter,
      ingredients.wildStrawberry,
    ],
    effect: "Combat Class (CP) +10%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
  {
    meal: meal.herbsStrawberry,
    ingredients: [
      ingredients.vegetablesAndFruits,
      ingredients.herbs,
      ingredients.wildStrawberry,
    ],
    effect: "Combat Class (CP) +10%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
  {
    meal: meal.raisinsPepper,
    ingredients: [
      ingredients.vegetablesAndFruits,
      ingredients.pepper,
      ingredients.assortedGrapes,
    ],
    effect: "HP +10%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
  {
    meal: meal.raisinsSalt,
    ingredients: [
      ingredients.vegetablesAndFruits,
      ingredients.salt,
      ingredients.assortedGrapes,
    ],
    effect: "HP +10%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
  {
    meal: meal.raisinsSugar,
    ingredients: [
      ingredients.vegetablesAndFruits,
      ingredients.sugar,
      ingredients.assortedGrapes,
    ],
    effect: "HP +10%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
  {
    meal: meal.vegSalad,
    ingredients: [
      ingredients.vegetablesAndFruits,
      ingredients.vegetables,
      ingredients.fairySprouts,
    ],
    effect: "Regeneration +10%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
  {
    meal: meal.eggSalad,
    ingredients: [
      ingredients.vegetablesAndFruits,
      ingredients.eggs,
      ingredients.fairySprouts,
    ],
    effect: "Regeneration +10%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
  {
    meal: meal.honeySalad,
    ingredients: [
      ingredients.vegetablesAndFruits,
      ingredients.honey,
      ingredients.fairySprouts,
    ],
    effect: "Regeneration +10%",
    characters: [
      {
        name: "Ice Spice",
        imageUrl:
          "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        slug: "queen_diane",
      },
    ],
  },
];

export const Meals = [town1, town2, town3, [], [], [], []];