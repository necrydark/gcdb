"use client";
import { Attribute } from "@/src/types/attributes";
import { Rarity } from "@/src/types/rarity";
import Image from "next/image";
import React, { useState } from "react";
import { Label } from "@/src/components/ui/label";
import { Switch } from "@/src/components/ui/switch";
import { Badge } from "@/src/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { ArrowLeftRight, Calendar, Gamepad2 } from "lucide-react";
import { useShowJapanese } from "../eng-jp";
import { Character } from "@prisma/client";
import { useCurrentUser } from "@/hooks/use-current-user";
import FavouriteButton from "../favourite-button";


type Props = {
  character: Character;
  isFavourited: boolean;
};

function CharacterHeader({
 character,
 isFavourited
}: Props) {

  const {showJapanese, toggleShowJapanese} = useShowJapanese();
  const user = useCurrentUser();


  // Function to get attribute color
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

  // Function to get rarity color
  const getRarityColor = (rarity: Rarity) => {
    const rarityColors = {
      LR: "bg-gradient-to-r from-red-500 to-purple-500 text-white border-yellow-400",
      UR: "bg-gray-400 text-gray-950 border-gray-600",
      SSR: "bg-purple-400 text-purple-950 border-purple-600",
      SR: "bg-purple-400 text-purple-950 border-purple-600",
      R: "bg-blue-400 text-blue-950 border-blue-600",
    };
    return rarityColors[rarity] || "bg-gray-400 text-gray-950 border-gray-600";
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-normal gap-6 mb-8">
      <TooltipProvider>

      <div className="relative w-24 h-24 md:w-32 md:h-32 md:m-0 mx-auto rounded-[5px] overflow-hidden border-4 border-purple-500 bg-gradient-to-b from-purple-300 via-purple-500 to-purple-600 flex-shrink-0">
        <Image
          src={character?.imageUrl || "/placeholder.svg?height=200&width=200"}
          alt={showJapanese ? character?.jpName as string : character?.name as string} 
          width={128}
          height={128}
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-black bg-opacity-70 py-1 px-2 text-center">
          <span
            className={`text-xs font-bold ${getRarityColor(
              character?.rarity
            )} px-2 py-0.5 rounded`}
          >
            {character?.rarity}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center flex-1">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 mb-2">
          <div className="flex-1">
            <h1 className="text-3xl md:text-left text-center  font-bold">
              {showJapanese ? character?.jpName : character?.name}
            </h1>
            <p className="text-muted-foreground md:text-left text-center">
              {showJapanese ? character?.jpTag  : character?.tag}
            </p>
          </div>

          <div className="flex items-center h-full gap-2 md:self-start">
            <div className="flex items-center space-x-2">
              <Label htmlFor="language-toggle" className="text-sm">
                EN
              </Label>
              <Switch
                id="language-toggle"
                className="data-[state=checked]:bg-purple-700 rounded-[5px] data-[state=unchecked]:bg-purple-900 "
                checked={showJapanese}
                onCheckedChange={toggleShowJapanese}
              />
              <Label htmlFor="language-toggle" className="text-sm">
                JP
              </Label>
            </div>
            <div>
              {user && (
                 <FavouriteButton
                 characterId={character.id}
                 isFavourited={isFavourited}
                 />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap md:justify-start justify-center gap-2 mt-1">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium">Race:</span>
            <Badge variant="secondary" className="text-xs">
              {character?.race}
            </Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium">Attribute:</span>
            <Badge
              className={`text-xs ${getAttributeColor(character?.attribute)} text-white hover:${getAttributeColor(character?.attribute)}/75`}
            >
              {character?.attribute}
            </Badge>
          </div>
        </div>
        <div className="flex flex-wrap md:justify-start justify-center gap-2 mt-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-blue-400 text-blue-600 gap-1">
                    <Gamepad2 className="w-3 h-3" />
                    <span>{character?.game}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent className="z-10">
                  <p>From: {character?.game}</p>
                </TooltipContent>
              </Tooltip>

          {character?.Crossover && (
                <Tooltip>
                  <TooltipTrigger asChild>
                  <button className="inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-purple-400 text-purple-600 gap-1">
                      <ArrowLeftRight className="w-3 h-3" />
                      <span>Crossover: {character?.Crossover}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{character?.Crossover}</p>
                  </TooltipContent>
                </Tooltip>
          )}

          {character?.event && (
              <Tooltip>
                <TooltipTrigger asChild>
                <button className="inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-amber-400 text-amber-600 gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{character?.event}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Event character from: {character?.event}</p>
                </TooltipContent>
              </Tooltip>
          )}
        </div>
      </div>
      </TooltipProvider>

    </div>
  );
}

export default CharacterHeader;
