import { Event } from "./Event";
import { AssociationWith } from "./associated";
import { Association } from "./associtations";
import { Attribute } from "./attributes";
import { Crossover } from "./crossover";
import { Food } from "./food";
import { Gift } from "./gift";
import { HolyRelic } from "./holyrelic";
import { Race } from "./race";
import { Rarity } from "./rarity";
import { CharacterSkills } from "./skill";
// import { Passive } from "./passive";

export type BasicInfo = {
  rarity: Rarity;
  attribute: Attribute;
  race: Race;
};

export type Passive = {
  name: string;
  imageUrl: string;
  jpName: string;
  description: string;
};

export type CharacterStats = {
  level: string;
  combatClass: number;
  attack: number;
  defense: number;
  hp: number;
  pierceRate: number;
  regeneration: number;
  lifesteal: number;
  critChance: number;
  critDamage: number;
  critDefense: number;
  critResistance: number;
  recoveryRate: number;
  resistance: number;
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

export type Unity = {
  name: string | undefined;
  jpName: string | undefined
  imageUrl: string | undefined
  description: string | undefined
}

export type Talent = {
  name: string | undefined;
  jpName: string | undefined
  imageUrl: string | undefined
  description: string | undefined
}


export type Character = {
  id?: number;
  name: string;
  tag: string;
  jpName: string;
  jpTag: string;
  slug: string;
  game?: string;
  imageUrl: string;
  crossover: Crossover;
  basicInfo: BasicInfo;
  stats: CharacterStats[];
  misc: {
    info: CharacterMiscInfo;
  };
  gift?: Gift[];
  food?: Food[];
  passive?: Passive;
  skills?: CharacterSkills;
  associations?: Association[];
  associationsWith?: AssociationWith[];
  holyRelic?: HolyRelic[];
  event?: Event;
};
