'use client'
// import { Character, Food, Meal } from '@prisma/client';
import { Food } from '@/src/types/food';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import React, { useState } from 'react'
import Foods from './food';
import { Character, Ingredient, Towns } from '@prisma/client';

export interface food {
    id: string;
    name: string;
    affinity: number;
    effect: string;
    characters: Character[];
    ingredients: Ingredient[]
    imageUrl: string;
    location: Towns;
}

type Props =
{
    food?: food[]
}

export default function FoodTabs({food}: Props) {
    const [activeTab, setActiveTab] = useState(Towns.Vanya as string)
    const filterFoodByTowns = (town: Towns) => {
        return food?.filter(food => food.location === town);
    }

  return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full h-full'>
        <TabsList className='h-full grid grid-cols-1 md:grid-cols-6 mb-6 bg-purple-400 dark:bg-purple-700'>
        <TabsTrigger className={activeTab === Towns.Vanya  as string ? "data-[state=active]:bg-purple-600 data-[state=active]:text-white" : "bg-transparent text-white"}  value={Towns.Vanya  as string}>Vanya</TabsTrigger>
        <TabsTrigger className={activeTab === Towns.Dalmally  as string ? "data-[state=active]:bg-purple-600 data-[state=active]:text-white" : "bg-transparent text-white"}  value={Towns.Dalmally as string}>Dalmally</TabsTrigger>
        <TabsTrigger className={activeTab === Towns.PostTownTala  as string ? "data-[state=active]:bg-purple-600 data-[state=active]:text-white" : "bg-transparent text-white"}  value={Towns.PostTownTala  as string}>Post Town Tala</TabsTrigger>
        <TabsTrigger className={activeTab === Towns.Vaziel  as string ? "data-[state=active]:bg-purple-600 data-[state=active]:text-white" : "bg-transparent text-white"}  value={Towns.Vaziel  as string}>Vaziel</TabsTrigger>
        <TabsTrigger className={activeTab === Towns.OrdanVillage  as string ? "data-[state=active]:bg-purple-600 data-[state=active]:text-white" : "bg-transparent text-white"}  value={Towns.OrdanVillage  as string}>Ordan Village</TabsTrigger>
        <TabsTrigger className={activeTab === Towns.LionesCastle  as string ? "data-[state=active]:bg-purple-600 data-[state=active]:text-white" : "bg-transparent text-white"}  value={Towns.LionesCastle  as string}>Liones Castle</TabsTrigger>

        </TabsList>

       {Object.values(Towns).map(town => (
        <TabsContent key={town} value={town as string} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                {filterFoodByTowns(town)?.map(food => (
                    <Foods key={food.id} food={JSON.parse(JSON.stringify(food))} />
                ))}
            </div>
        </TabsContent>
       ))}
    </Tabs>
  )
}
