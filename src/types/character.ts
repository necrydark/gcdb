import { Association } from "./associtations";
import { Attribute } from "./attributes";
import { Crossover } from "./crossover";
import { Food } from "./food";
import { Gift } from "./gift";
import { Race } from "./race";
import { Rarity } from "./rarity";
import { CharacterSkills } from "./skill";
import { HolyRelic } from "./holyrelic";

export type BasicInfo = {
  rarity: Rarity;
  attribute: Attribute;
  race: Race;
};

export type CharacterStats = {
  combatClass: number;
  attack: number;
  defense: number;
  hp: number;
  pierceRate: string;
  resistance: string;
  regeneration: string;
  critChance: string;
  critDamage: string;
  critResistance: string;
  critDefense: string;
  recoveryRate: string;
  lifesteal: string;
};

export type CharacterPreview = {
  name: string;
  slug: string;
  imageUrl: string;
};

export type CharacterMiscInfo = {
  gender: string;
  bloodType?: string;
  age?: string;
  birthday?: string;
  height?: string;
  weight?: string;
  location: string;
  CV?: string;
};

export type Character = {
  name: string;
  tag: string;
  jpName: string;
  jpTag: string;
  slug: string;
  game?: string;
  imageUrl: string;
  // attribute: Attribute;
  // rarity: Rarity;
  // race: Race;
  crossover: Crossover;
  basicInfo: BasicInfo;
  stats: CharacterStats;
  misc: {
    info: CharacterMiscInfo;
  };
  gift?: Gift[];
  food?: Food[];
  // skills: CharacterSkills;
  associations?: Association[];
  holyRelic?: HolyRelic[];
};
