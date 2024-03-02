import { Character } from "@/types/character";
import { Attributes } from "../../types/attributes";
import { Crossovers } from "../../types/crossover";
import { Races } from "../../types/race";
import { Rarities } from "../../types/rarity";
import { Games } from "@/types/game";

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
    game: Games.Base,
  },
  {
    name: "Queen Diane",
    slug: "queen_diane_2",
    imageUrl:
      "https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png",
    attribute: Attributes.Strength,
    game: Games.Base,
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
    game: Games.TOG,
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
    game: Games.Base,
  },
  {
    name: "Eren Yeager",
    slug: "eren_yeager",
    imageUrl:
      "https://gcdatabase.com/images/characters/eren/ssrg_portrait.webp",
    attribute: Attributes.HP,
    game: Games.AOT,
    rarity: Rarities.SSR,
    race: Races.HumanGiant,
    crossover: Crossovers.NotCrossover,
  },
];

export default characters;
