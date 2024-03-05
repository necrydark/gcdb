import { Character } from "@/types/character";
import { Games } from "@/types/game";
import { Attributes } from "../../types/attributes";
import { Crossovers } from "../../types/crossover";
import { Races } from "../../types/race";
import { Rarities } from "../../types/rarity";


// BASIC TEMPLATE FOR CHARACTERS
// {
  //   name: "Eren Yeager",
  //   tag: "Titan Form",
  //   jpName: "エレン・イェーガー",
  //   jpTag: "巨人化能力",
  //   slug: "eren_yeager",
  //   game: Games.AOT,
  //   imageUrl:
  //     "https://gcdatabase.com/images/characters/eren/ssrg_portrait.webp",
  //   crossover: Crossovers.NotCrossover,

  //   basicInfo: {
  //     attribute: Attributes.HP,
  //     rarity: Rarities.SSR,
  //     race: Races.HumanGiant,
  //   },
  //   stats: {
  //     combatClass: 0,
  //     attack: 0,
  //     defense: 0,
  //     hp: 0,
  //     pierceRate: "",
  //     resistance: "",
  //     regeneration: "",
  //     critChance: "",
  //     critDamage: "",
  //     critResistance: "",
  //     critDefense: "",
  //     recoveryRate: "",
  //     lifesteal: "",
  //   },
  //   misc: {
  //     info: {
  //       gender: "Male",
  //       bloodType: "Unknown",
  //       age: "Unknown",
  //       birthday: "Unknown",
  //       height: "Unknown",
  //       weight: "Unknown",
  //       location: "Unknown",
  //       CV: "Unknown",
  //     }
  //   },
  // }
export const characters: Character[] = [


  {
    name: "Queen Diane",
    tag: "Love's Messenger",
    jpName: "ディアンヌ",
    jpTag: "恋の伝令",
    slug: "queen_diane",
    game: Games.Base,
    imageUrl:
      "https://gcdatabase.com/images/characters/queen_diane/ssrg_portrait.png",
    crossover: Crossovers.NotCrossover,
    basicInfo:
    {
      rarity: Rarities.SSR,
      attribute: Attributes.Strength,
      race: Races.Giant
    },
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
      {
        name: "Ribbon",
        imageUrl: "https://gcdatabase.com/images/gift/diane.webp",
        description: "Its a ribbon"
      }
    ],
    passive: 
      {
        name: "Queen's Authority",
        imageUrl: "https://gcdatabase.com/images/characters/queen_diane/ssrg_passive.png",
        description: "Increases all allies' basic stats by 10% in PVP.",
        jpName: "女王の権威",
      },
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
    tag: "Waves of the Earth",
    jpTag: "永遠の約束",
    jpName: "聖騎士 ディアンヌ",
    slug: "queen_diane_2",
    game: Games.Base,
    imageUrl:
      "https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png",
    crossover: Crossovers.NotCrossover,
    basicInfo: {
      attribute: Attributes.Strength,
      rarity: Rarities.SSR,
      race: Races.Giant,
    },
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


  },
  {
    name: "Jue Viole Grace",
    tag: "Slayer Candidate",
    jpTag: "ジュ・ビオレ・グレイス",
    jpName: "スレイヤー候補",
    slug: "jue_viole_grace",
    game: Games.TOG,
    imageUrl:
      "https://gcdatabase.com/images/characters/jyu_viole_grace/ssrr_portrait.png",
    crossover: Crossovers.Crossover,
    basicInfo: {
      attribute: Attributes.Strength,
      rarity: Rarities.SSR,
      race: Races.Human,
    },
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
  },
  {
    name: "Alioni",
    tag: "Beard Of The Mountain Cat",
    jpTag: "〈山猫の髭〉騎士団",
    jpName: "団員 アリオーニ",
    slug: "alioni",
    game: Games.Base,
    imageUrl:
      "https://gcdatabase.com/images/characters/alioni/rg_portrait.webp",
    crossover: Crossovers.NotCrossover,
    basicInfo: {
      attribute: Attributes.HP,
      rarity: Rarities.R,
      race: Races.Human,
    },

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
    tag: "Titan Form",
    jpName: "エレン・イェーガー",
    jpTag: "巨人化能力",
    slug: "eren_yeager",
    game: Games.AOT,
    imageUrl:
      "https://gcdatabase.com/images/characters/eren/ssrg_portrait.webp",
    crossover: Crossovers.NotCrossover,

    basicInfo: {
      attribute: Attributes.HP,
      rarity: Rarities.SSR,
      race: Races.HumanGiant,
    },
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
  },
];

export default characters;
