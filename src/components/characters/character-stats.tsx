"use client"
import { Character, CharacterMiscInfo, CharacterStats } from "@/src/types/character";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { GiArrowScope, GiArrowsShield, GiFrontTeeth, GiHealing } from "react-icons/gi";
import { Anvil, Cake, Calendar, Cross, Dumbbell, Heart, MapPin, Mic, Ruler, Shield, Star, Sword, Swords } from "lucide-react";
import { Separator } from "../ui/separator";
import { MdOutlineBloodtype } from "react-icons/md";
import { FaVenusMars } from "react-icons/fa6";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

type Props = {
  character: Character;
  misc?: CharacterMiscInfo;
};

export default function CharacterStatsTab({ character, misc }: Props) {

  const [selectedLevel, setSelectedLevel] = useState("1");

  
  const hasLevel1Stats = Array.isArray(character.stats)
  ? character.stats.some((stat) => stat.level === "1" || stat.level === "1")
  : false

const hasLevel100Stats = Array.isArray(character.stats)
  ? character.stats.some((stat) => stat.level === "100" || stat.level === "100")
  : false

const hasSuperAwakening = Array.isArray(character.stats) ? character.stats.some((stat) => stat.level === "Super Awakening") : false

  const hasBothLevels = hasLevel1Stats && hasLevel100Stats;

  const currentStats = (() => {
    if (!Array.isArray(character.stats)) {
      return character.stats
    }

    return character.stats.find((stat) => stat.level.toString() === selectedLevel) || character.stats[0]
  })()
  

  return (
    <Card className="bg-purple-400 dark:bg-purple-900 text-white dark:border-purple-400">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between items-center">Character Stats & Info
        <div className="flex">
            {hasBothLevels ? (
               <div className="flex justify-end space-x-2 items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline" className=" dark:text-purple-600 text-white border-purple-600 hover:bg-purple-800 dark:hover:text-white hover:text-white duration-300 transition-all rounded-full">
                      Levels
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-purple-400 dark:bg-purple-700 text-white rounded-[5px]">
                    <DropdownMenuItem className="dark:hover:bg-purple-900 hover:bg-purple-600 rounded-[5px]" onClick={() => setSelectedLevel("1")}>1</DropdownMenuItem>
                    <DropdownMenuItem className="dark:hover:bg-purple-900 hover:bg-purple-600 rounded-[5px]" onClick={() => setSelectedLevel("100")}>100</DropdownMenuItem>
                    {hasSuperAwakening && (
                      <DropdownMenuItem className="dark:hover:bg-purple-900 hover:bg-purple-600 rounded-[5px]" onClick={() => setSelectedLevel("Super Awakening")}>Super Awakening</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
            </div>
            
            ) : (
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Only level {currentStats.level} stats available for this character.
            </div>
            )}
            </div>
        </CardTitle>
        <CardDescription className=" flex flex-row gap-1 text-gray-700 dark:text-gray-300">{currentStats.level === "Super Awakening" ? (
            <p>Stats for a super awakened character</p>
        ): (
          <p>Base Stats at level {currentStats.level}</p>
        )} & Misc Info.</CardDescription>
      </CardHeader>
      <CardContent >
   
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 flex flex-col gap-6">
        <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Anvil className="w-4 h-4 mr-2 text-orange-500" />
                <span>Combat Class</span>
              </div>
              <span className="font-medium">{currentStats.combatClass}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Swords className="w-4 h-4 mr-2 text-orange-500" />
                <span>Attack</span>
              </div>
              <span className="font-medium">{currentStats.attack}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-2 text-red-500" />
                <span>Health</span>
              </div>
              <span className="font-medium">{currentStats.hp}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-blue-500" />
                <span>Defense</span>
              </div>
              <span className="font-medium">{currentStats.defense}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GiArrowScope className="w-4 h-4 mr-2 text-blue-500" />
                <span>Pierce Rate</span>
              </div>
              <span className="font-medium">{currentStats.pierceRate}%</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GiHealing className="w-4 h-4 mr-2 text-green-500" />
                <span>Regeneration</span>
              </div>
              <span className="font-medium">{currentStats.regeneration}%</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GiFrontTeeth className="w-4 h-4 mr-2 text-red-500" />
                <span>Life Steal</span>
              </div>
              <span className="font-medium">{currentStats.lifesteal}%</span>
            </div>
          </div>
        </div>
        <div className="space-y-4 flex flex-col gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-purple-500" />
                <span>Crit Chance</span>
              </div>
              <span className="font-medium">{currentStats.critChance}%</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-pink-500" />
                <span>Crit Damage</span>
              </div>
              <span className="font-medium">{currentStats.critDamage}%</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-orange-500" />
                <span>Crit Defense</span>
              </div>
              <span className="font-medium">{currentStats.critDefense}%</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GiArrowsShield className="w-4 h-4 mr-2 text-orange-500" />
                <span>Crit Resistance</span>
              </div>
              <span className="font-medium">{currentStats.critResistance}%</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Cross className="w-4 h-4 mr-2 text-green-500" />
                <span>Recovery Rate</span>
              </div>
              <span className="font-medium">{currentStats.recoveryRate}%</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-red-500" />
                <span>Resistance</span>
              </div>
              <span className="font-medium">{currentStats.resistance}%</span>
            </div>
          </div>
        </div>
        </div>
        <Separator className="my-8 dark:bg-purple-400"/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 flex flex-col gap-6">
        <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
              <Mic className="w-4 h-4 mr-2 text-red-500" />
                <span>CV</span>
              </div>
              
              <span className="font-medium">{misc?.CV}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-blue-500" />

                <span>Age</span>
              </div>
              <span className="font-medium">{misc?.age}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">

              <div className="flex items-center">
            <Cake className="w-4 h-4 mr-2 text-orange-500" />

                <span>Birthday</span>
              </div>
              <span className="font-medium">{misc?.birthday}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
              <MdOutlineBloodtype  className="w-4 h-4 mr-2 text-purple-500" />

                <span>Blood Type</span>
              </div>
              <span className="font-medium">{misc?.bloodType}</span>
            </div>
          </div>
       
        </div>
        <div className="space-y-4 flex flex-col gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
              <FaVenusMars  className="w-4 h-4 mr-2 text-orange-500" />

                <span>Gender</span>
              </div>
              <span className="font-medium">{misc?.gender}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
              <Ruler  className="w-4 h-4 mr-2 text-green-500" />

                <span>Height</span>
              </div>
              <span className="font-medium">{misc?.height}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
              <MapPin  className="w-4 h-4 mr-2 text-yellow-500" />

                <span>Location</span>
              </div>
              <span className="font-medium">{misc?.location}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
              <Dumbbell  className="w-4 h-4 mr-2 text-teal-500" />

                <span>Weight</span>
              </div>
              <span className="font-medium">{misc?.weight}</span>
            </div>
          </div>
      
        </div>
        </div>
       
      </CardContent>
    </Card>
  );
}
