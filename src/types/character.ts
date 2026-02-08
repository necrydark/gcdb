/**
 * Character type definitions for Seven Deadly Sins: Grand Cross game data.
 * Contains comprehensive character information including stats, skills, and metadata.
 */

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

/**
 * Basic character information that defines the fundamental properties.
 */
export type BasicInfo = {
  /** Character rarity (SSR, UR, etc.) */
  rarity: Rarity;
  /** Character element attribute (Fire, Water, etc.) */
  attribute: Attribute;
  /** Character race (Human, Goddess, etc.) */
  race: Race;
};

/**
 * Character passive ability information.
 */
export type Passive = {
  /** Passive ability name in English */
  name: string;
  /** Passive ability icon/image URL */
  imageUrl: string;
  /** Passive ability name in Japanese */
  jpName: string;
  /** Detailed description of passive effects */
  description: string;
};

/**
 * Character combat statistics at different levels.
 */
export type CharacterStats = {
  /** Character level (e.g., "Level 1", "Level 100") */
  level: string;
  /** Combat class rating */
  combatClass: number;
  /** Attack power stat */
  attack: number;
  /** Defense stat */
  defense: number;
  /** Health points */
  hp: number;
  /** Pierce rate percentage */
  pierceRate: number;
  /** Health regeneration rate */
  regeneration: number;
  /** Lifesteal percentage */
  lifesteal: number;
  /** Critical hit chance percentage */
  critChance: number;
  /** Critical hit damage multiplier */
  critDamage: number;
  /** Critical hit defense */
  critDefense: number;
  /** Critical hit resistance */
  critResistance: number;
  /** HP recovery rate */
  recoveryRate: number;
  /** Status resistance */
  resistance: number;
};

/**
 * Minimal character information for preview/list views.
 */
export type CharacterPreview = {
  /** Character display name */
  name: string;
  /** URL-friendly slug for routing */
  slug: string;
  /** Character portrait/thumbnail URL */
  imageUrl: string;
};

/**
 * Character background and personal information.
 */
export type CharacterMiscInfo = {
  /** Character gender */
  gender: string;
  /** Blood type (if available) */
  bloodType?: string;
  /** Character age */
  age?: string;
  /** Birthday (MM/DD format) */
  birthday?: string;
  /** Height */
  height?: string;
  /** Weight */
  weight?: string;
  /** Location/Origin */
  location: string;
  /** Voice actor/actress */
  CV?: string;
};

/**
 * Character unity ability information.
 */
export type Unity = {
  /** Unity ability name in English */
  name: string | undefined;
  /** Unity ability name in Japanese */
  jpName: string | undefined;
  /** Unity ability icon URL */
  imageUrl: string | undefined;
  /** Unity ability description */
  description: string | undefined;
};

/**
 * Character talent information.
 */
export type Talent = {
  /** Talent name in English */
  name: string | undefined;
  /** Talent name in Japanese */
  jpName: string | undefined;
  /** Talent icon URL */
  imageUrl: string | undefined;
  /** Talent description */
  description: string | undefined;
};

/**
 * Complete character data structure.
 * Contains all information needed for character pages and database entries.
 */
export type Character = {
  /** Database ID (optional for new characters) */
  id?: number;
  /** Character display name */
  name: string;
  /** Character title or nickname */
  tag: string;
  /** Japanese name */
  jpName: string;
  /** Japanese title or nickname */
  jpTag: string;
  /** URL-friendly slug for routing */
  slug: string;
  /** Game variant (if applicable) */
  game?: string;
  /** Character artwork URL */
  imageUrl: string;
  /** Crossover event information */
  crossover: Crossover;
  /** Basic character properties */
  basicInfo: BasicInfo;
  /** Character stats at different levels */
  stats: CharacterStats[];
  /** Character background and personal info */
  misc: {
    info: CharacterMiscInfo;
  };
  /** Character gift preferences */
  gift?: Gift[];
  /** Character food preferences */
  food?: Food[];
  /** Passive ability information */
  passive?: Passive;
  /** Active skill information */
  skills?: CharacterSkills;
  /** Character associations with other characters */
  associations?: Association[];
  /** Characters associated with this character */
  associationsWith?: AssociationWith[];
  /** Holy relic equipment */
  holyRelic?: HolyRelic[];
  /** Event-specific information */
  event?: Event;
};
