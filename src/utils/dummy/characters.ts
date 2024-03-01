import { Attributes } from "../traits/attributes";
import { Crossovers } from "../traits/crossover";
import { Games } from "../traits/game";
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
    crossover: Crossovers.NotCrossover,
    game: Games.Base
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
    Crossover: Crossovers.NotCrossover,
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
    crossover: Crossovers.NotCrossover,
    tag: "Beard Of The Mountain Cat",
    game: Games.Base
  },
  {
    name: "Eren Yeager",
    slug: "eren_yeager",
    imageUrl:
      "https://gcdatabase.com/images/characters/eren/ssrg_portrait.webp",
    attribute: Attributes.HP,
    tag: "Beard Of The Mountain Cat",
    game: Games.AOT,
    rarity: Rarities.SSR,
    race: Races.HumanGiant,
    Crossover: Crossovers.NotCrossover,
  },
];
