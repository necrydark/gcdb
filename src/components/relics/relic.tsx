// 'use client'
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

type Props = {
  holyRelic?: HolyRelic[];
  beast?: string;
};

export default function Relic({ holyRelic }: Props) {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [activeTab, setActiveTab] = useState("effect");


  // const filteredRelics = holyRelic?.map((relicArray: HolyRelic[]) => 
  //   relicArray.filter((relic: HolyRelic) => {
  //     const matchesSearch = relic.relic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       relic.effect.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       relic.characters?.some((char: { name: string }) => char.name.toLowerCase().includes(searchTerm.toLowerCase()));
  //     return matchesSearch;
  //   })

  // );



  return (
    <>
      {holyRelic?.map((relic, idx) => (
        <Card
          key={idx}
          className="h-full hover:shadow-md transition-shadow px-8 py-4 hover:dark:shadow-white duration-200 dark:bg-purple-950 bg-purple-400  border-0 overflow-hidden "
        >
            <CardHeader className="pb-2 items-center">
            <Image
              src={relic.relic.imageUrl}
              alt={relic.relic.name}
              width={128}
              height={128}
            />
            </CardHeader>
           <CardContent className="space-y-4 w-full">
           <div className="flex flex-col gap-4 w-full">
              <h2 className="font-bold text-lg text-center text-white">{relic.relic.name}</h2>
              <Tabs defaultValue="effect" className="w-full ">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="effect">Effect</TabsTrigger>
                    <TabsTrigger value="materials">Materials</TabsTrigger>
                    <TabsTrigger value="characters">Characters</TabsTrigger>
                  </TabsList>

                  <TabsContent value="effect" className="space-y-4 mt-4">
                  <h4 className="text-sm font-medium text-white mb-2">Effect</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 m-0">{relic.effect}</p>

                  <h4 className="text-sm font-medium text-white mb-2">Stats</h4>

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
              </TabsContent>
              <TabsContent value="materials" className="space-y-4 mt-4">
              <h4 className="text-sm font-medium mb-2 text-white">Required Materials</h4>
                
              <div className="flex flex-row flex-wrap gap-2">
                {relic.materials?.map((material, idx) => (
                  <div key={idx} className="flex items-center flex-row gap-2">
                    <Image
                          src={material.imageUrl}
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
            {relic.characters && relic.characters.length > 0 ? (
                <div className="flex flex-row flex-wrap gap-4 justify-evenly">
                {relic.characters.map((character, idx) => (
                  <Link
                  key={idx}
                  href={`/characters/${character.slug}`}>
                    <div className="flex items-center hover:text-foreground/70 duration-300 transition-all gap-1 flex-col">
                    <Image
                    src={character.imageUrl}
                    alt={character.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                    />
                      <h2 className="text-xs text-white">{character.name}</h2>
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
      ))}
    </>
  );
}
