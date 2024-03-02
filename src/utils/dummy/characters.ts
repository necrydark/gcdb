import { Character } from "@/types/character";
import { Games } from "@/types/game";
import { Attributes } from "../../types/attributes";
import { Crossovers } from "../../types/crossover";
import { Races } from "../../types/race";
import { Rarities } from "../../types/rarity";

export const characters: Character[] = [
  {
    name: "Queen Diane",
    slug: "queen_diane",
    tag: "Love's Messenger",
    jpName: "ディアンヌ",
    jpTag: "恋の伝令",
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
    tag: "Waves of the Earth",
    jpTag: "永遠の約束",
    jpName: "聖騎士 ディアンヌ",
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
    tag: "Slayer Candidate",
    jpTag: "ジュ・ビオレ・グレイス",
    jpName: "スレイヤー候補",
    imageUrl:
      "https://gcdatabase.com/images/characters/jyu_viole_grace/ssrr_portrait.png",
      attribute: Attributes.Strength,
      rarity: Rarities.SSR,
      race: Races.Human,
      crossover: Crossovers.Crossover,
      game: Games.TOG,
  },
  {
    name: "Alioni",
    slug: "alioni",
    tag: "Beard Of The Mountain Cat",
    jpTag: "〈山猫の髭〉騎士団",
    jpName: "団員 アリオーニ",
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
    tag: "Titan Form",
    jpName: "エレン・イェーガー",
    jpTag: "巨人化能力",
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
