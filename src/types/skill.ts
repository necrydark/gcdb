export type SkillRank = {
  description: string;
  type: string;
};

export type CharacterSkill = {
  name: string;
  jpName: string;
  imageUrl: string;
  ranks: SkillRank[];
};

export type CharacterPassive = {
  name: string;
  jpName: string;
  imageUrl: string;
  description: string;
};

export type CharacterUltimate = {
  name: string;
  jpName: string;
  imageUrl: string;
  description: string;
  extraInfo: string[];
};

export type CharacterSkills = {
  passive: CharacterPassive;
  regularSkills: CharacterSkill[];
  ultimate: CharacterUltimate;
};
