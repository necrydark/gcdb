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

const town4 = [
  {
    meal: meal.friedChicken,
    ingredients: [
      ingredients.luxuryChicken,
      ingredients.milk,
      ingredients.teryakiSauce,
    ],
    effect: "PvP Coins +1000%",
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
    meal: meal.chickenSteak,
    ingredients: [
      ingredients.luxuryChicken,
      ingredients.honey,
      ingredients.teryakiSauce,
    ],
    effect: "PvP Coins +1000%",
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
    meal: meal.glazedChicken,
    ingredients: [
      ingredients.luxuryChicken,
      ingredients.herbs,
      ingredients.teryakiSauce,
    ],
    effect: "PvP Coins +1000%",
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
    meal: meal.sugarGrilledChickenWings,
    ingredients: [
      ingredients.luxuryChicken,
      ingredients.sugar,
      ingredients.mozzarellaCheese,
    ],
    effect: "Crit Chance +20%",
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
    meal: meal.pepperGrilledChickenWings,
    ingredients: [
      ingredients.luxuryChicken,
      ingredients.pepper,
      ingredients.mozzarellaCheese,
    ],
    effect: "Crit Chance +20%",
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
    meal: meal.saltGrilledChickenWings,
    ingredients: [
      ingredients.luxuryChicken,
      ingredients.salt,
      ingredients.mozzarellaCheese,
    ],
    effect: "Crit Chance +20%",
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
    meal: meal.chickenRiceBallButter,
    ingredients: [
      ingredients.luxuryChicken,
      ingredients.butter,
      ingredients.lionesRices,
    ],
    effect: "Crit Damage +20%",
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
    meal: meal.chickenVeggieFriedRice,
    ingredients: [
      ingredients.luxuryChicken,
      ingredients.vegetables,
      ingredients.lionesRices,
    ],
    effect: "Crit Damage +20%",
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
    meal: meal.chickenEggRisotto,
    ingredients: [
      ingredients.luxuryChicken,
      ingredients.eggs,
      ingredients.lionesRices,
    ],
    effect: "Crit Damage +20%",
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

const town5 = [
  {
    meal: meal.vegApplePie,
    ingredients: [
      ingredients.flour,
      ingredients.vegetables,
      ingredients.apples,
    ],
    effect: "Ultimate Move Gauge + 1",
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
    meal: meal.sweetApplePie,
    ingredients: [ingredients.flour, ingredients.sugar, ingredients.apples],
    effect: "Ultimate Move Gauge + 1",
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
    meal: meal.honeyApplePie,
    ingredients: [ingredients.flour, ingredients.honey, ingredients.apples],
    effect: "Ultimate Move Gauge + 1",
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
    meal: meal.herbCiabatta,
    ingredients: [
      ingredients.flour,
      ingredients.vegetables,
      ingredients.driedFruits,
    ],
    effect: "Crit Resistance +30%",
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
    meal: meal.pepperBread,
    ingredients: [
      ingredients.flour,
      ingredients.pepper,
      ingredients.driedFruits,
    ],
    effect: "Crit Resistance +30%",
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
    meal: meal.eggSandwich,
    ingredients: [ingredients.flour, ingredients.eggs, ingredients.driedFruits],
    effect: "Crit Resistance +30%",
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
    meal: meal.seafoodStew,
    ingredients: [
      ingredients.flour,
      ingredients.milk,
      ingredients.assortedShellfish,
    ],
    effect: "Crit Defense +30%",
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
    meal: meal.seafoodPasta,
    ingredients: [
      ingredients.flour,
      ingredients.butter,
      ingredients.assortedShellfish,
    ],
    effect: "Crit Defense +30%",
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
    meal: meal.seafoodPot,
    ingredients: [
      ingredients.flour,
      ingredients.salt,
      ingredients.assortedShellfish,
    ],
    effect: "Crit Defense +30%",
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

export const Meals = [town1, town2, town3, town4, town5, []];
