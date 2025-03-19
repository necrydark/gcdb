import { CharacterMiscInfo, CharacterStats } from "@/src/types/character";
import React from "react";
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

type Props = {
  stats?: CharacterStats;
  misc?: CharacterMiscInfo;
};

export default function CharacterStatsTab({ stats, misc }: Props) {
    console.log(misc)
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between">Character Stats & Info
        <Badge variant={"outline"} className="text-sm py-1">
              Level 1
            </Badge>
        </CardTitle>
        <CardDescription>Base Stats & Misc Info.</CardDescription>
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
              <span className="font-medium">{stats?.combatClass}cc</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Swords className="w-4 h-4 mr-2 text-orange-500" />
                <span>Attack</span>
              </div>
              <span className="font-medium">{stats?.attack}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-2 text-red-500" />
                <span>Health</span>
              </div>
              <span className="font-medium">{stats?.hp}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-blue-500" />
                <span>Defense</span>
              </div>
              <span className="font-medium">{stats?.defense}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GiArrowScope className="w-4 h-4 mr-2 text-blue-500" />
                <span>Pierce Rate</span>
              </div>
              <span className="font-medium">{stats?.pierceRate}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GiHealing className="w-4 h-4 mr-2 text-green-500" />
                <span>Regeneration</span>
              </div>
              <span className="font-medium">{stats?.regeneration}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GiFrontTeeth className="w-4 h-4 mr-2 text-red-500" />
                <span>Life Steal</span>
              </div>
              <span className="font-medium">{stats?.lifesteal}</span>
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
              <span className="font-medium">{stats?.critChance}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-pink-500" />
                <span>Crit Damage</span>
              </div>
              <span className="font-medium">{stats?.critDamage}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-orange-500" />
                <span>Crit Defense</span>
              </div>
              <span className="font-medium">{stats?.critDefense}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GiArrowsShield className="w-4 h-4 mr-2 text-orange-500" />
                <span>Crit Resistance</span>
              </div>
              <span className="font-medium">{stats?.critResistance}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Cross className="w-4 h-4 mr-2 text-green-500" />
                <span>Recovery Rate</span>
              </div>
              <span className="font-medium">{stats?.recoveryRate}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-red-500" />
                <span>Resistance</span>
              </div>
              <span className="font-medium">{stats?.resistance}</span>
            </div>
          </div>
        </div>
        </div>
        <Separator className="my-8"/>
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
