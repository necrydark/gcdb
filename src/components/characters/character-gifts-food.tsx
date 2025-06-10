import { Gift } from "@/src/types/gift";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Food } from "@/src/types/food";
import { Separator } from "../ui/separator";
type Props = {
  gifts?: Gift[];
  food?: Food[]

};


const affinityFoods = [
  {
    name: "Vanya Ale",
    imageUrl: "https://3duibobjm6.ufs.sh/f/BVooQWfmjDnKZ07mytyp0HIuFj6cKXoYGU9kLzihg8OQNDMa",
    affinity: 100,
  }, 
  {
    name: "Affinity Increase Elixir",
    imageUrl: "https://3duibobjm6.ufs.sh/f/BVooQWfmjDnKZ07mytyp0HIuFj6cKXoYGU9kLzihg8OQNDMa",
    affinity: 1000,
  }
]


export default function CharacterGiftsFoodTab({ gifts, food }: Props) {
  return (
    <Card  className="bg-purple-400 rounded-[5px] dark:bg-purple-900 text-white dark:border-purple-400">
      <CardHeader>
        <CardTitle>Gifts</CardTitle>
        <CardDescription className="text-gray-700 dark:text-gray-300">
          All available gifts to improve character affection to gain rewards.
        </CardDescription>
      </CardHeader>
      <CardContent>
      
        {gifts && gifts.length > 0 && (
          <>
            {gifts.map((gift, idx) => {
              return (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="flex gap-2 flex-col md:flex-row items-center">
                    <Image
                      width={64}
                      height={64}
                      className="object-cover"
                      src={gift.imageUrl}
                      alt={gift.name}
                    />
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-base">
                        {gift.name}
                      </p>
                      <p className="text-white">
                        {gift.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </CardContent>
      <Separator className="my-8 dark:bg-purple-400" />
      <CardHeader>
        <CardTitle>Food</CardTitle>
        <CardDescription className="text-gray-700 dark:text-gray-300">All available food that when given to the associated character grants boosts to stats.</CardDescription>
      </CardHeader>
      <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 mb-8 gap-6">
        {affinityFoods.map((aff, idx) => (
            <div key={idx} className="flex flex-col gap-2">
            <div className="flex gap-2 flex-col text-center items-center">
              <Image
                width={64}
                height={64}
                className="object-cover"
                src={aff.imageUrl}
                alt={aff.name}
              />
              <div className="flex flex-col gap-1">
                <p className="font-bold text-base">
                  {aff.name}
                </p>
                <p className="text-white">
                  +{aff.affinity} affinity
                </p>
              </div>
            </div>
          </div>
        ))}
        </div>
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
            <h1>
              No food available...
            </h1>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
