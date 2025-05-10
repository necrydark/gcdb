// 'use client'
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Heart, Shield, Swords } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Character, HolyRelic, Material } from "@prisma/client";

type Props = {
  holyRelic?: HolyRelic & {
    materials?: Material[]
    characters?: Character[]
  };
  beast?: string;
};

export default function Relic({ holyRelic }: Props) {
  // const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("effect");

  // const filteredRelics = holyRelic?.map((relicArray: HolyRelic[]) => 
  //   relicArray.filter((relic: HolyRelic) => {
  //     const matchesSearch = relic.relic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       relic.effect.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       relic.characters?.some((char: { name: string }) => char.name.toLowerCase().includes(searchTerm.toLowerCase()));
  //     return matchesSearch;
  //   })

  // );


  if(!holyRelic) {
    return <div>
      No relic found
    </div>
  }


  return (
    <>
        <Card
          className="h-full hover:shadow-md transition-shadow px-8 py-4  duration-200 dark:bg-purple-950 bg-purple-400  border-0 overflow-hidden "
        >
            <CardHeader className="pb-2 items-center">
            <Image
              src={holyRelic?.imageUrl}
              alt={holyRelic?.name}
              width={128}
              height={128}
            />
            </CardHeader>
           <CardContent className="space-y-4 w-full">
           <div className="flex flex-col gap-4 w-full">
              <h2 className="font-bold text-lg text-center text-white">{holyRelic.name}</h2>
              <Tabs defaultValue="effect"  value={activeTab} onValueChange={setActiveTab} className="w-full ">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="effect">Effect</TabsTrigger>
                    <TabsTrigger value="materials">Materials</TabsTrigger>
                    <TabsTrigger value="characters">Characters</TabsTrigger>
                  </TabsList>

                  <TabsContent value="effect" className="space-y-4 mt-4">
                  <h4 className="text-sm font-medium text-white mb-2">Effect</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 m-0">{holyRelic.effect}</p>

                  <h4 className="text-sm font-medium text-white mb-1">Stats</h4>

                  <div className="grid grid-cols-3 gap-2">
                <div className="bg-purple-500 dark:bg-purple-800 p-2 rounded-[5px]">
                  <div className="flex items-center gap-1">
                    <Swords className="w-3 h-3 text-red-500" />
                    <div className="text-xs text-gray-500 dark:text-gray-300">Attack</div>
                  </div>
                  <div className="font-medium text-white">
                    +{holyRelic.attack}
                  </div>
                </div>
                <div className="bg-purple-500 dark:bg-purple-800 p-2 rounded-[5px]">
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-blue-500" />
                    <div className="text-xs text-gray-500 dark:text-gray-300">Defense</div>
                  </div>
                  <div className="font-medium text-white">
                    +{holyRelic.defense}
                  </div>
                </div>
                <div className="bg-purple-500 dark:bg-purple-800 p-2 rounded-[5px]">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-green-500" />
                    <div className="text-xs text-gray-500 dark:text-gray-300">HP</div>
                  </div>
                  <div className="font-medium text-white">
                    +{holyRelic.hp}
                  </div>
                </div>
              </div>
              </TabsContent>
              <TabsContent value="materials" className="space-y-4 mt-4">
              <h4 className="text-sm font-medium mb-2 text-white">Required Materials</h4>
                
              <div className="flex flex-row flex-wrap gap-2">
                {holyRelic.materials?.map((material, idx) => (
                  <div key={idx} className="flex items-center flex-row gap-2">
                    <Image
                          src={material.imageUrl as string}
                          alt={material.name}
                          width={50}
                          height={50}
                        />
                   <div className="flex flex-col gap-1">
                   <h4 className="text-sm font-medium text-white">{material.name}</h4>
                    {material.location && (
                       <h4 className="text-xs text-gray-700 dark:text-muted-foreground font-medium">{material.location}</h4>
                    )}
                    
                    </div>
                  </div>
                ))}
              </div>
              </TabsContent>
              <TabsContent value="characters" className="space-y-4 mt-4">
            {holyRelic.characters && holyRelic.characters.length > 0 ? (
                <div className="flex flex-row flex-wrap gap-4 justify-evenly">
                {holyRelic.characters.map((character, idx) => (
                  <Link
                  key={idx}
                  href={`/characters/${character.slug}`}>
                    <div className="flex items-center hover:text-foreground/70 duration-300 transition-all gap-1 flex-row">
                    <Image
                    src={character.imageUrl}
                    alt={character.name as string}
                    width={75}
                    height={75}
                    className="object-cover"
                    />
                    <div className="flex flex-col gap-2">
                 
                    </div>
                    </div>
                  </Link>
                ))}
              </div>
            ): (
              <div className="flex justify-center items-center">
                <h1>No Characters found...</h1>
              </div>
            )}
              </TabsContent>
              
             
              </Tabs>
            </div>
           </CardContent>
        </Card>
    </>
  );
}
