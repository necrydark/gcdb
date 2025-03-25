
import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { Attribute } from '@/src/types/attributes';
import { Rarity } from '@/src/types/rarity';
import { Gamepad2, Globe } from 'lucide-react';



type Props = {
    name: string;
    url: string;
    attribute: Attribute;
    rarity: Rarity;
    race: string;
    crossover: string
}

const getAttributeColor = (attribute: Attribute) => {
  const attributeColors = {
    Strength: "bg-red-500",
    Speed: "bg-blue-500",
    HP: "bg-green-500",
    Light: "bg-yellow-500",
    Dark: "bg-purple-500",
  };
  return attributeColors[attribute] || "bg-gray-500";
};

const getRarityColor = (rarity: Rarity) => {
  const rarityColors = {
    LR: "bg-gradient-to-r from-red-500 to-purple-500 text-white border-yellow-400",
    UR: "bg-red-400 hover:bg-red-400/70 text-red-950 border-red-600",
    SSR: "bg-purple-400 hover:bg-purple-400/70 text-purple-950 border-purple-600",
    SR: "bg-yellow-400 hover:bg-yellow-400/70 text-yellow-950 border-yellow-600",
    R: "bg-blue-400 hover:bg-blue-400/70 text-blue-950 border-blue-600",
  };
  return rarityColors[rarity] || "bg-gray-400 text-gray-950 border-gray-600";
};


export default function CharacterCard({ name, url, attribute, rarity, race, crossover}: Props) {


  return (
    <Card className='h-full hover:shadow-md transition-shadow hover:dark:shadow-white duration-200 dark:bg-purple-950 bg-purple-800 border-0 overflow-hidden'>
      <div className='relative h-48 w-full'>
        <Image
        src={url || "/"}
        alt={`${name}'s Image`}
        fill
        className='object-cover' />
        <div className='absolute top-2 right-2'>
          <Badge className={`${getRarityColor(rarity)}` }>
            {rarity}
          </Badge>
        </div>
      </div>
      <CardContent className='pt-4'>
          <h3 className='font-bold text-lg text-white mb-2'>
            {name}
          </h3>
          <div className='flex flex-wrap gap-2'>
            <Badge className={`${getAttributeColor(attribute)} text-white`}>
              {attribute}
            </Badge>
            <Badge variant={"outline"} className='text-white'>
              {race}
            </Badge>
          </div>
      </CardContent>
      <CardFooter className="border-t pt-3 text-sm  text-white">
        <Gamepad2 className='w-4 h-4 mr-1'/>
        {crossover}
      </CardFooter>
    </Card>
  )
}
