import { Character } from "@/types/character";
import { Attributes } from "../../types/attributes";
import { Crossovers } from "../../types/crossover";
import { Races } from "../../types/race";
import { Rarities } from "../../types/rarity";

export const characters: Character[] = [
  {
    name: "Queen Diane",
    slug: "queen_diane",
    imageUrl:
      "https://gcdatabase.com/images/characters/queen_diane/ssrg_portrait.png",
    attribute: Attributes.HP,
    rarity: Rarities.SSR,
    race: Races.Giant,
    crossover: Crossovers.NotCrossover,
  },
  {
    name: "Jue Viole Grace",
    slug: "jue_viole_grace",
    imageUrl:
      "https://gcdatabase.com/images/characters/jyu_viole_grace/ssrr_portrait.png",
    attribute: Attributes.Strength,
    rarity: Rarities.SSR,
    race: Races.Human,
    crossover: Crossovers.Crossover,
  },
  {
    name: "Alioni",
    slug: "alioni",
    imageUrl:
      "https://gcdatabase.com/images/characters/alioni/rg_portrait.webp",
    attribute: Attributes.HP,
    rarity: Rarities.R,
    race: Races.Human,
    crossover: Crossovers.NotCrossover,
  },
];

export default characters;
