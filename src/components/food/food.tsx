import React from 'react'
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Heart, Shield, Swords } from "lucide-react";
import Link from "next/link";
import { Card } from "../ui/card";
import { Food } from '@/src/types/food';


type Props = {
    towns?: string[]
    food?: Food[][];
}

export default function Foods({towns, food}: Props) {
    const foods = food?.[0]
  return (
   
    <>
    {foods?.map((food, idx) => (
        <Card
          key={idx}
          className="h-full hover:shadow-md transition-shadow px-8 py-4 hover:dark:shadow-white duration-200 dark:bg-purple-950 bg-purple-800 border-0 overflow-hidden "
        >
          <div className="flex flex-col justify-center items-center h-full gap-2">
            <Image
              src={food.meal.imageUrl}
              alt={food.meal.name}
              width={50}
              height={50}
            />
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-lg text-center text-white">{food.meal.name}</h2>
              <p className="text-sm text-gray-300 text-center">{food.effect}</p>
              <div className="flex flex-row justify-evenly flex-wrap gap-2">
                {food.ingredients?.map((material, idx) => (
                  <TooltipProvider key={idx}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Image
                          src={material.imageUrl}
                          alt={material.name}
                          width={50}
                          height={50}
                        />
                      </TooltipTrigger>
                      <TooltipContent>{material.name}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
           
              <div className="flex flex-row flex-wrap gap-4">
                {food.characters?.map((character, idx) => (
                  <Link
                  key={idx}
                  href={`/characters/${character.slug}`}>
                    <Image
                    src={character.imageUrl}
                    alt={character.name}
                    width={50}
                    height={50}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </>
  )
}
