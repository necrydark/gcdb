"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Attribute } from "@/src/types/attributes";
import { Rarity } from "@/src/types/rarity";
import { Gamepad2, Globe, Heart } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  id: string;
  name: string;
  url: string;
  attribute: Attribute;
  rarity: Rarity;
  race: string;
  crossover: string;
};

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

export default function CharacterCard({
  id,
  name,
  url,
  attribute,
  rarity,
  race,
  crossover,
}: Props) {
  const [favorites, setFavorites] = useState<number[]>([]);

  const handleToggleFavorite = (e: React.MouseEvent, characterId: number) => {
    e.preventDefault(); // Prevent navigation when clicking the favorite button
    e.stopPropagation(); // Prevent event bubbling

    setFavorites((prev) => {
      if (prev.includes(characterId)) {
        return prev.filter((id) => id !== characterId);
      } else {
        return [...prev, characterId];
      }
    });
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow w-fit hover:dark:shadow-white duration-200 dark:bg-purple-950 bg-purple-800 border-0 overflow-hidden">
      <div className="relative w-full">
        <Image
          src={url || "/"}
          alt={`${name}'s Image`}
          width={128}
          height={128}
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className={`${getRarityColor(rarity)}`}>{rarity}</Badge>
        </div>
        <button
                    onClick={(e) => handleToggleFavorite(e, id)}
                    className={`absolute bottom-2 left-2 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      favorites.includes(id)
                        ? "bg-purple-400/70 hover:bg-purple-500/70 text-white"
                        : "bg-purple-400/70 text-white hover:bg-purple-500/70"
                    }`}
                    aria-label={favorites.includes(id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    {favorites.includes(id) ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    )}
                  </button>
      </div>
      {/* <CardContent className='pt-4'>
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
      </CardFooter> */}
    </Card>
  );
}
