"use client"
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import Relic from './relic'
import { HolyRelic } from "@/src/types/holyrelic";


type Props = {
    bosses?: string[]
    holyRelic?: HolyRelic[];
}

export default function RelicTabs({bosses, holyRelic}: Props) {
    const [activeTab, setActiveTab] = useState("Hraesvelgr")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full h-full'>
        <TabsList className='h-full grid grid-cols-1 md:grid-cols-5 mb-6 bg-purple-400 dark:bg-purple-700'>
        {bosses?.map((boss) => (
            <TabsTrigger className={activeTab === boss ? "data-[state=active]:bg-purple-600 data-[state=active]:text-white" : "bg-transparent text-white"} key={boss} value={boss}>{boss}</TabsTrigger>
        ))}
        </TabsList>

        {bosses?.map((boss) => (
            <TabsContent value={boss} key={boss} className='space-6'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <Relic holyRelic={holyRelic} />
                </div>
            </TabsContent>
        ))}
    </Tabs>
  )
}
