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
    stats: {
      combatClass: 4846,
      attack: 560,
      defense: 420,
      hp: 6700,
      pierceRate: "70%",
      resistance: "60%",
      regeneration: "10%",
      critChance: "50%",
      critDamage: "160%",
      critResistance: "85%",
      critDefense: "70%",
      recoveryRate: "110%",
      lifesteal: "5%",
    },

    imageUrl:
      "https://gcdatabase.com/images/characters/queen_diane/ssrg_portrait.png",
    basicInfo:
    {
      rarity: Rarities.SSR,
      attribute: Attributes.Strength,
      race: Races.Giant
    },
    crossover: Crossovers.NotCrossover,
    game: Games.Base,
    misc: {
      info: {
        gender: "Female",
        bloodType: "O",
        age: "~750",
        birthday: "24th December",
        height: "915m",
        weight: "Secret",
        location: "Unknown",
        CV: "Aoi Yuuki",
      }
    },
    gift: [
       { name: "Ribbon",
        imageUrl: "https://gcdatabase.com/images/gift/diane.webp",
        description: "Its a ribbon"}
    ],
    food: [
      {
        name: "Sweet Meat Pie",
        imageUrl: "https://gcdatabase.com/images/food/sweet_meat_pie.webp",
      },
      {
        name: "Honey-roasted Chicken Matango",
        imageUrl: "https://gcdatabase.com/images/food/honey-roasted_chicken_matango.webp"
      }
    ],
    associations: [
      {
        slug: "alioni",

        bonus: "HP +5%"
      },
      {
        slug: "jue_viole_grace",
        bonus: "Attack +280",

      },
    ],
  },
  {
    name: "Queen Diane",
    slug: "queen_diane_2",
    tag: "Waves of the Earth",
    jpTag: "永遠の約束",
    jpName: "聖騎士 ディアンヌ",
    stats: {
      combatClass: 0,
      attack: 0,
      defense: 0,
      hp: 0,
      pierceRate: "",
      resistance: "",
      regeneration: "",
      critChance: "",
      critDamage: "",
      critResistance: "",
      critDefense: "",
      recoveryRate: "",
      lifesteal: "",
    },
    misc: {
      info: {
        gender: "Female",
        bloodType: "O",
        age: "~750",
        birthday: "24th December",
        height: "Unknown",
        weight: "Secret",
        location: "Pub",
        CV: "Aoi Yuuki",
      }
    },
    imageUrl:
      "https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png",
      game: Games.Base,
    basicInfo: {
      attribute: Attributes.Strength,
      rarity: Rarities.SSR,
      race: Races.Giant,
    },
    crossover: Crossovers.NotCrossover,
  },
  {
    name: "Jue Viole Grace",
    slug: "jue_viole_grace",
    tag: "Slayer Candidate",
    jpTag: "ジュ・ビオレ・グレイス",
    jpName: "スレイヤー候補",
    stats: {
      combatClass: 0,
      attack: 0,
      defense: 0,
      hp: 0,
      pierceRate: "",
      resistance: "",
      regeneration: "",
      critChance: "",
      critDamage: "",
      critResistance: "",
      critDefense: "",
      recoveryRate: "",
      lifesteal: "",
    },
    misc: {
      info: {
        gender: "Male",
        bloodType: "Unknown",
        age: "Unknown",
        birthday: "Unknown",
        height: "Unknown",
        weight: "Unknown",
        location: "Unknown",
        CV: "Daimu Mineta",
      }
    },

    imageUrl:
      "https://gcdatabase.com/images/characters/jyu_viole_grace/ssrr_portrait.png",
    basicInfo: {
      attribute: Attributes.Strength,
    rarity: Rarities.SSR,
    race: Races.Human,
    },
    crossover: Crossovers.Crossover,
    game: Games.TOG,
  },
  {
    name: "Alioni",
    slug: "alioni",
    tag: "Beard Of The Mountain Cat",
    jpTag: "〈山猫の髭〉騎士団",
    jpName: "団員 アリオーニ",
    stats: {
      combatClass: 0,
      attack: 0,
      defense: 0,
      hp: 0,
      pierceRate: "",
      resistance: "",
      regeneration: "",
      critChance: "",
      critDamage: "",
      critResistance: "",
      critDefense: "",
      recoveryRate: "",
      lifesteal: "",
    },
    misc: {
      info: {
        gender: "Male",
        bloodType: "Unknown",
        age: "Unknown",
        birthday: "22nd February",
        height: "170cm",
        weight: "Secret",
        location: "Bernia Village",
        CV: "Unknown",
      }
    },
    imageUrl:
      "https://gcdatabase.com/images/characters/alioni/rg_portrait.webp",
    basicInfo: {
      attribute: Attributes.HP,
      rarity: Rarities.R,
      race: Races.Human,
    },
    crossover: Crossovers.NotCrossover,
    game: Games.Base,
    holyRelic: [
      {
        name: 'Double-edged Sword of the Einherjar',
        imageUrl: 'https://gcdatabase.com/images/relics/alioni_relic.png',
        effect: '',
        stats: [
          {
            attack: "0",
            defense: "0",
            hp: "5%"
          }
        ]
      }
    ]
  },
  {
    name: "Eren Yeager",
    slug: "eren_yeager",
    tag: "Titan Form",
    jpName: "エレン・イェーガー",
    jpTag: "巨人化能力",
    stats: {
      combatClass: 0,
      attack: 0,
      defense: 0,
      hp: 0,
      pierceRate: "",
      resistance: "",
      regeneration: "",
      critChance: "",
      critDamage: "",
      critResistance: "",
      critDefense: "",
      recoveryRate: "",
      lifesteal: "",
    },
    misc: {
      info: {
        gender: "Male",
        bloodType: "Unknown",
        age: "Unknown",
        birthday: "Unknown",
        height: "Unknown",
        weight: "Unknown",
        location: "Unknown",
        CV: "Unknown",
      }
    },
    imageUrl:
      "https://gcdatabase.com/images/characters/eren/ssrg_portrait.webp",
    game: Games.AOT,
    basicInfo: {
      attribute: Attributes.HP,
      rarity: Rarities.SSR,
      race: Races.HumanGiant,
    },
    crossover: Crossovers.NotCrossover,
  },
];

export default characters;
