"use client";

import {
  Character,
  CharacterMiscInfo,
  CharacterStats,
  Passive,
} from "@/src/types/character";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Heart } from "lucide-react";
import { Progress } from "../ui/progress";
import CharacterStatsTab from "./character-stats";
import CharacterPassiveTab from "./character-passive";
import { Association } from "@/src/types/associtations";
import CharacterAssociationsTab from "./character-associations";
import { Gift } from "@/src/types/gift";
import { Food } from "@/src/types/food";
import CharacterGiftsTab from "./character-gifts";
import CharacterFoodTab from "./character-food";
import CharacterSkillsTab from "./character-skills";
import { CharacterSkills } from "@/src/types/skill";

type Props = {
  character: Character;
 
  skills?: CharacterSkills[]

};

function CharacterTabs({ character, skills }: Props) {
  const [activeTab, setActiveTab] = useState("stats-info");
  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full h-full"
    >
      <TabsList className=" h-full grid grid-cols-3 md:grid-cols-6 mb-6">
        <TabsTrigger value="stats-info">Stats & Info</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="passive">Passive</TabsTrigger>
        <TabsTrigger value="associations">Associations</TabsTrigger>
        <TabsTrigger value="gifts">Gifts</TabsTrigger>
        <TabsTrigger value="food">Food</TabsTrigger>
      </TabsList>

      <TabsContent value="stats-info" className="space-y-4">
        <CharacterStatsTab stats={character?.stats} misc={character?.misc.info} />
      </TabsContent>
      <TabsContent value="skills" className="space-y-6">
        <CharacterSkillsTab skills={skills} rarity={character?.basicInfo.rarity} />
        </TabsContent> 
      <TabsContent value="passive" className="space-y-4">
        <CharacterPassiveTab passive={character.passive} />
        </TabsContent> 
        <TabsContent value="associations" className="space-y-4">
        <CharacterAssociationsTab associations={character.associations} />
        </TabsContent> 
        <TabsContent value="gifts" className="space-y-4">
        <CharacterGiftsTab gifts={character.gift} />
        </TabsContent> 
        <TabsContent value="food" className="space-y-4">
        <CharacterFoodTab food={character.food} />
        </TabsContent> 
    </Tabs>
  );
}

export default CharacterTabs;
