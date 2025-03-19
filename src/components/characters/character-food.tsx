import { Food } from '@/src/types/food';
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';

type Props = {
  food?: Food[]

}

export default function CharacterFoodTab({ food}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Food</CardTitle>
        <CardDescription>
          All available food that when given to the associated character grants boosts to stats.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {food && food.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {food.map((food, idx) => {
              return (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="flex gap-2 flex-col   items-center">
                    <Image
                      width={64}
                      height={64}
                      className="object-cover"
                      src={food?.meal.imageUrl}
                      alt={food?.meal.name}
                    />
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-base ">
                        {food?.meal.name}
                      </p>
                  
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <p className="text-base font-semibold text-center">
              No gifts available...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
