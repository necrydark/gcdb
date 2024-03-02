import { Attribute } from "./attributes";
import { IsCrossover } from "./crossover";
import { Food } from "./food";
import { Race } from "./race";
import { Rarity } from "./rarity";
import { CharacterSkills } from "./skill";

export type BasicInfo = {
  rarity: Rarity;
  attribute: Attribute;
  race: Race;
};

export type CharacterStats = {
  combatClass_CP: number;
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
  age?: number;
  birthday?: string;
  height?: string;
  weight?: string;
  location: string;
};

export type Character = {
  name: string;
  // tag: string;
  // jpName: string;
  // jpTag: string;
  slug: string;
  imageUrl: string;
  attribute: Attribute;
  rarity: Rarity;
  race: Race;
  crossover: IsCrossover;
  // basicInfo: BasicInfo;
  // stats: CharacterStats;
  // misc: {
  //   info: CharacterMiscInfo;
  //   gift?: string;
  //   food?: Food[];
  // };
  // skills: CharacterSkills;
};
