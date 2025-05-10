import { Food } from '@/src/types/food';
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { Heart, Shield, Swords } from 'lucide-react';
import { HolyRelic } from '@prisma/client';

type Props = {
  holyRelic?: HolyRelic;

}

export default function CharacterFoodTab({ holyRelic}: Props) {
  return (
    <Card className="bg-purple-400 rounded-[5px] dark:bg-purple-900 text-white border-purple-400">
      <CardHeader>
        <CardTitle>Holy Relics</CardTitle>
        <CardDescription className='text-gray-700 dark:text-gray-300'>
          All available holy relics that provide boosts to stats or unique effects to characters.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {holyRelic ? (
          <div className='grid gap-6'>

                <div className="flex flex-col md:flex-row gap-4 p-4 shadow-md border border-purple-400 rounded-lg">
                  <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      width={128}
                      height={128}
                      className="object-cover"
                      src={holyRelic.imageUrl}
                      alt={holyRelic.name}
                    />
                    </div>
                    <div className="flex-1">
                      <h1 className="font-bold text-lg ">
                        {holyRelic.name}
                      </h1>
                    <p className='text-gray-300 text-sm mb-3'>{holyRelic.effect}</p>
                  <div className='grid grid-cols-3 gap-2'>
                    <div className="bg-purple-700 p-2 rounded-[5px]">
                      <div className='flex items-center gap-1'>
                        <Swords className='w-4 h-4 text-red-500' />
                        <div className='text-xs text-white'>
                          Attack
                        </div>
                      </div>
                      <div className='font-medium text-white'>
                        +{holyRelic.attack}
                      </div>
                    </div>
                    <div className="bg-purple-700 p-2 rounded-[5px]">
                      <div className='flex items-center gap-1'>
                        <Shield className='w-4 h-4 text-blue-500' />
                        <div className='text-xs text-white'>
                          Defense
                        </div>
                      </div>
                      <div className='font-medium text-white'>
                        +{holyRelic.defense}
                      </div>
                    </div>
                    <div className="bg-purple-700 p-2 rounded-[5px]">
                      <div className='flex items-center gap-1'>
                        <Heart className='w-4 h-4 text-green-500' />
                        <div className='text-xs text-white'>
                          HP
                        </div>
                      </div>
                      <div className='font-medium text-white'>
                        +{holyRelic.hp}
                      </div>
                    </div>
                  </div>

                  </div>
                </div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <p className="text-base font-semibold text-center">
              No relics available...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
