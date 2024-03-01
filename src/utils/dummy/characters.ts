import { Attributes } from "../traits/attributes";
import { Crossover } from "../traits/crossover";
import { Games } from "../traits/game";
import { Race } from "../traits/race";
import { Rarity } from "../traits/rarity";

export default [
  {
    name: "Queen Diane",
    slug: "queen_diane",
    imageUrl:
      "https://gcdatabase.com/images/characters/queen_diane/ssrg_portrait.png",
    attribute: Attributes.HP,
    rarity: Rarity.SSR,
    race: Race.Giant,
    crossover: Crossover.Not,
    game: Games.Base
  },
  {
    name: "Queen Diane",
    slug: "queen_diane_2",
    imageUrl:
      "https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png",
    attribute: Attributes.Strength,
    rarity: Rarity.SSR,
    race: Race.Giant,
    crossover: Crossover.Not,
    game: Games.Base
  },
  {
    name: "Jue Viole Grace",
    slug: "jue_viole_grace",
    imageUrl:
      "https://gcdatabase.com/images/characters/jyu_viole_grace/ssrr_portrait.png",
    attribute: Attributes.Strength,
    rarity: Rarity.SSR,
    race: Race.Human,
    crossover: Crossover.Crossover,
    game: Games.TOG,
  },
  {
    name: "Alioni",
    slug: "alioni",
    imageUrl:
      "https://gcdatabase.com/images/characters/alioni/rg_portrait.webp",
    attribute: Attributes.HP,
    rarity: Rarity.R,
    race: Race.Human,
    crossover: Crossover.Not,
    tag: "Beard Of The Mountain Cat",
    game: Games.Base
  },
  {
    name: "Eren Yeager",
    slug: "eren_yeager",
    imageUrl:
      "https://gcdatabase.com/images/characters/eren/ssrg_portrait.webp",
    attribute: Attributes.HP,
    rarity: Rarity.SSR,
    race: Race.HumanGiant,
    crossover: Crossover.Crossover,
    tag: "Beard Of The Mountain Cat",
    game: Games.AOT
  },
];
