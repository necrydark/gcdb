'use client'
// import { Character, Food, Meal } from '@prisma/client';
import { Character, Ingredient, Towns } from '@prisma/client';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import Foods from './food';

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
        <TabsList className="h-full grid grid-cols-1 md:grid-cols-6 mb-6 rounded-[5px] bg-muted/50 dark:bg-muted/30 border border-border/50 shadow-lg">
        <TabsTrigger className={activeTab === Towns.Vanya  as string   ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-[5px] transition-all duration-300 text-foreground"
              : "bg-transparent text-foreground"}  value={Towns.Vanya  as string}>Vanya</TabsTrigger>
        <TabsTrigger className={activeTab === Towns.Dalmally  as string   ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-[5px] transition-all duration-300 text-foreground"
              : "bg-transparent text-foreground"}  value={Towns.Dalmally as string}>Dalmally</TabsTrigger>
        <TabsTrigger className={activeTab === Towns.PostTownTala  as string   ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-[5px] transition-all duration-300 text-foreground"
              : "bg-transparent text-foreground"}  value={Towns.PostTownTala  as string}>Post Town Tala</TabsTrigger>
        <TabsTrigger className={activeTab === Towns.Vaziel  as string   ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-[5px] transition-all duration-300 text-foreground"
              : "bg-transparent text-foreground"}  value={Towns.Vaziel  as string}>Vaziel</TabsTrigger>
        <TabsTrigger className={activeTab === Towns.OrdanVillage  as string   ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-[5px] transition-all duration-300 text-foreground"
              : "bg-transparent text-foreground"}  value={Towns.OrdanVillage  as string}>Ordan Village</TabsTrigger>
        <TabsTrigger className={activeTab === Towns.LionesCastle  as string   ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-[5px] transition-all duration-300 text-foreground"
              : "bg-transparent text-foreground"}  value={Towns.LionesCastle  as string}>Liones Castle</TabsTrigger>

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
