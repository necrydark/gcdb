"use client"
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import Relic from './relic'
import { Beast, Character, Collection, HolyRelic, Material, RelicEnhanceMaterial } from '@prisma/client';
import { useCurrentUser } from '@/hooks/use-current-user';

export interface relic {
  id: string;
  name: string;
  imageUrl: string;
  releaseDate: Date;
  attack: string;
  defense: string;
  hp: string;
  effect: string;
  materials: Material[]
  characters: Character[]
  beast: Beast;
  isCollected: boolean;
  collection: Collection[]
  enhanceable: boolean;
  enhancedAttack: string;
  enhancedDefense: string;
  enhancedHp: string;
  enhancedMaterials: RelicEnhanceMaterial[]

}

type Props = {
    holyRelic?: relic[];
}

export default function RelicTabs({ holyRelic}: Props) {
    const [activeTab, setActiveTab] = useState(Beast.Hraesvelgr  as string)
    const filterRelicsByBeast = (beast: Beast) => {
      return holyRelic?.filter(relic => relic.beast === beast);
    };



    const user = useCurrentUser();

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full h-full'>
        <TabsList className='h-full grid grid-cols-1 md:grid-cols-6 mb-6 bg-purple-400 dark:bg-purple-700'>
        <TabsTrigger className={activeTab === Beast.Hraesvelgr  as string ? "data-[state=active]:bg-purple-600 data-[state=active]:text-white" : "bg-transparent text-white"}  value={Beast.Hraesvelgr  as string}>Hraesvelgr</TabsTrigger>
        <TabsTrigger className={activeTab === Beast.Eikthyrnir  as string ? "data-[state=active]:bg-purple-600 data-[state=active]:text-white" : "bg-transparent text-white"}  value={Beast.Eikthyrnir as string}>Eikthyrnir</TabsTrigger>
        <TabsTrigger className={activeTab === Beast.SkollAndHati  as string ? "data-[state=active]:bg-purple-600 data-[state=active]:text-white" : "bg-transparent text-white"}  value={Beast.SkollAndHati  as string}>Skoll And Hati</TabsTrigger>
        <TabsTrigger className={activeTab === Beast.Nidhoggr  as string ? "data-[state=active]:bg-purple-600 data-[state=active]:text-white" : "bg-transparent text-white"}  value={Beast.Nidhoggr  as string}>Nidhoggr</TabsTrigger>
        <TabsTrigger className={activeTab === Beast.Ratatoskr  as string ? "data-[state=active]:bg-purple-600 data-[state=active]:text-white" : "bg-transparent text-white"}  value={Beast.Ratatoskr  as string}>Ratatoskr</TabsTrigger>
        <TabsTrigger className={activeTab === Beast.Collab  as string ? "data-[state=active]:bg-purple-600 data-[state=active]:text-white" : "bg-transparent text-white"}  value={Beast.Collab  as string}>Collab</TabsTrigger>

        
        </TabsList>

        {Object.values(Beast).map(beast => (
        <TabsContent key={beast} value={beast as string} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Filter relics based on the current beast */}
            {filterRelicsByBeast(beast)?.map(relic => (
              <Relic key={relic.id} holyRelic={JSON.parse(JSON.stringify(relic))}  isCollected={relic.isCollected} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
