import { Character } from "@/src/types/character";
import { Games } from "@/src/types/game";
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
    id: 1,
    name: "Queen Diane",
    tag: "Love's Messenger",
    jpName: "ディアンヌ",
    jpTag: "恋の伝令",
    slug: "queen_diane",
    game: Games.Base,
    imageUrl:
      "https://gcdatabase.com/images/characters/queen_diane/ssrg_portrait.png",
    crossover: Crossovers.NotCrossover,
    basicInfo: {
      rarity: Rarities.SSR,
      attribute: Attributes.HP,
      race: Races.Giant,
    },
    stats: [
      {
        level: "1",
        combatClass: 4846,
        attack: 560,
        defense: 420,
        hp: 6700,
        pierceRate: 70,
        resistance: 60,
        regeneration: 10,
        critChance: 50,
        critDamage: 160,
        critResistance: 85,
        critDefense: 70,
        recoveryRate: 110,
        lifesteal: 5,
      },
      {
        level: "100",
        combatClass: 54928,
        attack: 560,
        defense: 420,
        hp: 6700,
        pierceRate: 70,
        resistance: 60,
        regeneration: 10,
        critChance: 50,
        critDamage: 160,
        critResistance: 85,
        critDefense: 70,
        recoveryRate: 110,
        lifesteal: 5,
      },
      {
        level: "Super Awakening",
        combatClass: 67921,
        attack: 6281,
        defense: 5492,
        hp: 30981,
        pierceRate: 80,
        resistance: 75,
        regeneration: 15,
        critChance: 50,
        critDamage: 250,
        critResistance: 100,
        critDefense: 90,
        recoveryRate: 130,
        lifesteal: 10,
      }
    ],
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
      },
    },
    gift: [
      {
        name: "Ribbon",
        imageUrl: "https://gcdatabase.com/images/gift/diane.webp",
        description: "Its a ribbon",
      },
    ],
    food: [
      {
        meal: {
          name: "Sweet Meat Pie",
          imageUrl: "https://gcdatabase.com/images/food/sweet_meat_pie.webp",
        },
      },
      {
        meal: {
          name: "Honey-roasted Chicken Matango",
          imageUrl:
            "https://gcdatabase.com/images/food/honey-roasted_chicken_matango.webp",
        },
      },
    ],
    passive: {
      name: "Queen's Authority",
      imageUrl:
        "https://gcdatabase.com/images/characters/queen_diane/ssrg_passive.png",
      description:
        "Applies Symbol of Love on the hero at the start of the battle. While assuming a Stance, the hero's HP-Related Stats are increased by 20%. When the hero's Stance is removed, allies' Crit Defense is increased by 30% for 2 turns. In addition, when the hero uses a skill in PVE, allies' Attack-Related Stats are increased by 10% for 2 turns.",
      jpName: "女王の権威",
    },
    skills: {
      regularSkills: [
        {
          name: "Sweet Impact",
          imageUrl:
            "https://gcdatabase.com/images/characters/queen_diane/ssrg_1.png",
          jpName: "スイート・インパクト",
          ranks: [
            {
              rank: 1,
              description:
                "Inflicts Pierce damage equal to 200% of Attack on one enemy.",
              type: "attack",
            },
            {
              rank: 2,
              description:
                "Inflicts Pierce damage equal to 300% of Attack on one enemy.",
              type: "attack",
            },
            {
              rank: 3,
              description:
                "Inflicts Pierce damage equal to 500% of Attack on one enemy.",
              type: "attack",
            },
          ],
        },
        {
          name: "Diamond Shield",
          imageUrl:
            "https://gcdatabase.com/images/characters/queen_diane/ssrg_2.png",
          jpName: "金剛の盾",
          ranks: [
            {
              rank: 1,
              description:
                "Assumes a Stance which Taunts enemies and decreases damage taken by 40% when attacked for 2 turn(s).",
              type: "taunt",
            },
            {
              rank: 2,
              description:
                "Assumes a Stance which Taunts enemies and decreases damage taken by 50% when attacked for 2 turn(s). Depletes the Ultimate Move Gauge of the enemy who used the skill by 1 orb(s).",
              type: "taunt",
            },
            {
              rank: 3,
              description:
                "Assumes a Stance which Taunts enemies and decreases damage taken by 60% when attacked for 2 turn(s). Depletes the Ultimate Move Gauge of the enemy who used the skill by 2 orb(s).",
              type: "taunt",
            },
          ],
        },
      ],
      ultimate: {
        name: "Shy Confession",
        jpName: "クイーン・エンブレイス",
        description:
          "Inflicts Quell damage equal to 380% of Attack on all enemies, then Heals HP of all allies by 3% of damage dealt.",
        imageUrl:
          "https://gcdatabase.com/images/characters/queen_diane/ssrg_ult.png",
        extraInfo: ["Extra Info"],
      },
    },
    associations: [
      {
        slug: "alioni",
        bonus: "HP +5%",
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
    stats: [{
      combatClass: 0,
      level: "1",
      attack: 0,
      defense: 0,
      hp: 0,
      pierceRate: 0,
      resistance: 0,
      regeneration: 0,
      critChance: 0,
      critDamage: 0,
      critResistance: 0,
      critDefense: 0,
      recoveryRate: 0,
      lifesteal: 0,
    }],
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
      },
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
    stats: [
      {combatClass: 100,
        level: "1",
      attack: 0,
      defense: 0,
      hp: 0,
      pierceRate: 0,
      resistance: 0,
      regeneration: 0,
      critChance: 0,
      critDamage: 0,
      critResistance: 0,
      critDefense: 0,
      recoveryRate: 0,
      lifesteal: 0,}
      ],
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
      },
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

    stats: [{
      combatClass: 0,
      level: "1",
      attack: 0,
      defense: 0,
      hp: 0,
      pierceRate: 0,
      resistance: 0,
      regeneration: 0,
      critChance: 0,
      critDamage: 0,
      critResistance: 0,
      critDefense: 0,
      recoveryRate: 0,
      lifesteal: 0,
    }],
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
      },
    },
    holyRelic: [
      {
        relic: {
          name: "Double-edged Sword of the Einherjar",
          imageUrl: "https://gcdatabase.com/images/relics/alioni_relic.png",
        },
        effect: "This works?  ",
        stats: {
          attack: "0",
          defense: "0",
          hp: "5%",
        },
      },
    ],
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
    stats: [{
      combatClass: 0,
      level: "100",
      attack: 0,
      defense: 0,
      hp: 0,
      pierceRate: 0,
      resistance: 0,
      regeneration: 0,
      critChance: 0,
      critDamage: 0,
      critResistance: 0,
      critDefense: 0,
      recoveryRate: 0,
      lifesteal: 0,
    }],
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
      },
    },
  },
];

export default characters;
