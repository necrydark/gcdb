export type SkillRank = {
  rank: number;
  description: string;
  type: string;
};

export type CharacterSkill = {
  name: string;
  jpName: string;
  imageUrl: string;
  ranks: SkillRank[];
};


export type CharacterUltimate = {
  name: string;
  jpName: string;
  imageUrl: string;
  description: string;
  extraInfo: string;
};

export type CharacterSkills = {
  regularSkills: CharacterSkill[];
  ultimate: CharacterUltimate;
};

