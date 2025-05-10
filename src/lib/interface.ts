import { SkillRank } from "@prisma/client";

export interface Skill {
    id: string;
    name: string;
    jpName: string;
    imageUrl: string;
    characterId: string;
    skillRanks: SkillRank[]; // skillRanks is a property of Skill
  }
  
 export interface SkillWithRanks extends Skill {
    skillRanks: SkillRank[];
  }