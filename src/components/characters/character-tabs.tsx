"use client";

import {
  Character,
} from "@/src/types/character";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CharacterStatsTab from "./character-stats";
import CharacterPassiveTab from "./character-passive";
import CharacterAssociationsTab from "./character-associations";
import CharacterGiftsFoodTab from "./character-gifts-food";
import CharacterSkillsTab from "./character-skills";
import { CharacterSkills } from "@/src/types/skill";
import CharacterHolyRelic from "./character-holy-relic";

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
      <TabsList className=" h-full grid grid-cols-3 md:grid-cols-6 mb-6 bg-purple-400 dark:bg-purple-900 text-white">
        <TabsTrigger value="stats-info" className={activeTab === "stats-info" ? "data-[state=active]:bg-purple-700 data-[state=active]:text-white" : "bg-transparent"}>Stats & Info</TabsTrigger>
        <TabsTrigger value="skills" className={activeTab === "skills" ? "data-[state=active]:bg-purple-700 data-[state=active]:text-white" : "bg-transparent"}>Skills</TabsTrigger>
        <TabsTrigger value="passive" className={activeTab === "passive" ? "data-[state=active]:bg-purple-700 data-[state=active]:text-white" : "bg-transparent"}>Passive</TabsTrigger>
        <TabsTrigger value="associations" className={activeTab === "associations" ? "data-[state=active]:bg-purple-700 data-[state=active]:text-white" : "bg-transparent"}>Associations</TabsTrigger>
        <TabsTrigger value="gifts-food" className={activeTab === "gifts-food" ? "data-[state=active]:bg-purple-700 data-[state=active]:text-white" : "bg-transparent"}>Gifts & Food</TabsTrigger>
        <TabsTrigger value="holy-relic" className={activeTab === "holy-relic" ? "data-[state=active]:bg-purple-700 data-[state=active]:text-white" : "bg-transparent"}>Holy Relic</TabsTrigger>
      </TabsList>

      <TabsContent value="stats-info" className="space-y-4">
        <CharacterStatsTab character={character}  misc={character?.misc.info} />
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
        <TabsContent value="gifts-food" className="space-y-4">
        <CharacterGiftsFoodTab gifts={character.gift} />
        </TabsContent> 
        <TabsContent value="holy-relic" className="space-y-4">
        <CharacterHolyRelic holyRelic={character.holyRelic} />
        </TabsContent> 
    </Tabs>
  );
}

export default CharacterTabs;
