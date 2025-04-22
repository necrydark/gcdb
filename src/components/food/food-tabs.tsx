'use client'
// import { Character, Food, Meal } from '@prisma/client';
import { Food } from '@/src/types/food';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import React, { useState } from 'react'
import Foods from './food';

type Props =
{
    towns?: string[]
    food?: Food[][]
}

export default function FoodTabs({food, towns}: Props) {
    const [activeTab, setActiveTab] = useState("Vanya")

  return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full h-full'>
        <TabsList className='h-full grid grid-cols-3 md:grid-cols-6 mb-6'>
        {towns?.map((town) => (
            <TabsTrigger key={town} value={town}>{town}</TabsTrigger>
        ))}
        </TabsList>

        {towns?.map((town) => (
            <TabsContent value={town} key={town} className='space-6'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <Foods towns={towns} food={food}/>
                </div>
            </TabsContent>
        ))}
    </Tabs>
  )
}
