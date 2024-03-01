import { Attributes } from "../traits/attributes";
import { Crossovers } from "../traits/crossover";
import { Races } from "../traits/race";
import { Rarities } from "../traits/rarity";

export default [
  {
    name: "Queen Diane",
    slug: "queen_diane",
    imageUrl:
      "https://gcdatabase.com/images/characters/queen_diane/ssrg_portrait.png",
    attribute: Attributes.HP,
    rarity: Rarities.SSR,
    race: Races.Giant,
    Crossover: Crossovers.NotCrossover,
  },
  {
    name: "Jue Viole Grace",
    slug: "jue_viole_grace",
    imageUrl:
      "https://gcdatabase.com/images/characters/jyu_viole_grace/ssrr_portrait.png",
    attribute: Attributes.Strength,
    rarity: Rarities.SSR,
    race: Races.Human,
    Crossover: Crossovers.Crossover,
  },
  {
    name: "Alioni",
    slug: "alioni",
    imageUrl:
      "https://gcdatabase.com/images/characters/alioni/rg_portrait.webp",
    attribute: Attributes.HP,
    rarity: Rarities.R,
    race: Races.Human,
    Crossover: Crossovers.NotCrossover,
  },
];
