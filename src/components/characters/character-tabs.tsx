"use client";


import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CharacterStatsTab from "./character-stats";
import CharacterPassiveTab from "./character-passive";
import CharacterAssociationsTab from "./character-associations";
import CharacterGiftsFoodTab from "./character-gifts-food";
import CharacterSkillsTab from "./character-skills";
import CharacterHolyRelic from "./character-holy-relic";
import { Association, Character, CharacterUltimate, Gift, HolyRelic, SkillRank, Stats } from "@prisma/client";
import { SkillWithRanks } from "@/src/lib/interface";
import { Passive } from "@/src/types/passive";
import { CharacterMiscInfo } from "@/src/types/character";



type Props = {
  character: Character;
  skills?: SkillWithRanks[]
  relic?: HolyRelic;
  stats?: Stats[];
  passive?: Passive
  gift?: Gift[];
  miscInfo?: CharacterMiscInfo;
  associations?: Association[]
  ultimate?: CharacterUltimate;
};

function CharacterTabs({ character, skills, relic, stats, passive, gift, miscInfo, associations, ultimate}: Props) {
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
        <CharacterStatsTab character={character}  misc={miscInfo} stats={stats} />
      </TabsContent>
      <TabsContent value="skills" className="space-y-6">
        <CharacterSkillsTab skills={skills} rarity={character?.rarity} ultimate={ultimate} />
        </TabsContent> 
      <TabsContent value="passive" className="space-y-4">
        <CharacterPassiveTab passive={passive} />
        </TabsContent> 
        <TabsContent value="associations" className="space-y-4">
        <CharacterAssociationsTab associations={associations} />
        </TabsContent> 
        <TabsContent value="gifts-food" className="space-y-4">
        <CharacterGiftsFoodTab gifts={gift} />
        </TabsContent> 
        <TabsContent value="holy-relic" className="space-y-4">
        <CharacterHolyRelic holyRelic={relic || undefined} />
        </TabsContent> 
    </Tabs>
  );
}

export default CharacterTabs;
