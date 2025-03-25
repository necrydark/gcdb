import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { HolyRelic } from "@/src/types/holyrelic";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Heart, Shield, Swords } from "lucide-react";
import Link from "next/link";

type Props = {
  holyRelic?: HolyRelic[][];
  beast?: string;
};

export default function Relic({ holyRelic }: Props) {
  const relics = holyRelic?.[0];
  return (
    <>
      {relics?.map((relic, idx) => (
        <Card
          key={idx}
          className="h-full hover:shadow-md transition-shadow px-8 py-4 hover:dark:shadow-white duration-200 dark:bg-purple-950 bg-purple-800 border-0 overflow-hidden "
        >
          <div className="flex flex-col justify-center items-center h-full gap-2">
            <Image
              src={relic.relic.imageUrl}
              alt={relic.relic.name}
              width={128}
              height={128}
            />
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-lg text-center text-white">{relic.relic.name}</h2>
              <p className="text-sm text-gray-300">{relic.effect}</p>
              <div className="flex flex-row justify-evenly flex-wrap gap-2">
                {relic.materials?.map((material, idx) => (
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
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-gray-100 p-2 rounded-[5px]">
                  <div className="flex items-center gap-1">
                    <Swords className="w-3 h-3 text-red-500" />
                    <div className="text-xs text-gray-500">Attack</div>
                  </div>
                  <div className="font-medium text-black">
                    +{relic.stats?.attack}
                  </div>
                </div>
                <div className="bg-gray-100 p-2 rounded-[5px]">
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-blue-500" />
                    <div className="text-xs text-gray-500">Defense</div>
                  </div>
                  <div className="font-medium text-black">
                    +{relic.stats?.defense}
                  </div>
                </div>
                <div className="bg-gray-100 p-2 rounded-[5px]">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-green-500" />
                    <div className="text-xs text-gray-500">HP</div>
                  </div>
                  <div className="font-medium text-black">
                    +{relic.stats?.attack}
                  </div>
                </div>
              </div>
              <div className="flex flex-row flex-wrap gap-4">
                {relic.characters?.map((character, idx) => (
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
  );
}
