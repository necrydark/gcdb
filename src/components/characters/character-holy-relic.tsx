import { Food } from '@/src/types/food';
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { HolyRelic } from '@/src/types/holyrelic';
import { Heart, Shield, Swords } from 'lucide-react';

type Props = {
  holyRelic?: HolyRelic[];

}

export default function CharacterFoodTab({ holyRelic}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Holy Relics</CardTitle>
        <CardDescription>
          All available holy relics that provide boosts to stats or unique effects to characters.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {holyRelic && holyRelic.length > 0 ? (
          <div className='grid gap-6'>
            {holyRelic.map((relic, idx) => {
              return (
                <div key={idx} className="flex flex-col md:flex-row gap-4 p-4 shadow-md border rounded-lg">
                  <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden border-2 flex-shrink-0">
                    <Image
                      width={128}
                      height={128}
                      className="object-cover"
                      src={relic.relic.imageUrl}
                      alt={relic.relic.name}
                    />
                    </div>
                    <div className="flex-1">
                      <h1 className="font-bold text-lg ">
                        {relic.relic.name}
                      </h1>
                    <p className='text-muted-foreground text-sm mb-3'>{relic.effect}</p>
                  <div className='grid grid-cols-3 gap-2'>
                    <div className="bg-gray-100 p-2 rounded-[5px]">
                      <div className='flex items-center gap-1'>
                        <Swords className='w-3 h-3 text-red-500' />
                        <div className='text-xs text-gray-500'>
                          Attack
                        </div>
                      </div>
                      <div className='font-medium text-black'>
                        +{relic.stats?.attack}
                      </div>
                    </div>
                    <div className="bg-gray-100 p-2 rounded-[5px]">
                      <div className='flex items-center gap-1'>
                        <Shield className='w-3 h-3 text-blue-500' />
                        <div className='text-xs text-gray-500'>
                          Defense
                        </div>
                      </div>
                      <div className='font-medium text-black'>
                        +{relic.stats?.defense}
                      </div>
                    </div>
                    <div className="bg-gray-100 p-2 rounded-[5px]">
                      <div className='flex items-center gap-1'>
                        <Heart className='w-3 h-3 text-green-500' />
                        <div className='text-xs text-gray-500'>
                          HP
                        </div>
                      </div>
                      <div className='font-medium text-black'>
                        +{relic.stats?.hp}
                      </div>
                    </div>
                  </div>

                  </div>
                </div>
              );
            })}
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
