"use client"
import type { CharacterSkills, CharacterUltimate } from "@/src/types/skill"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { useShowJapanese } from "../eng-jp"
import { Shield, Star, Swords } from "lucide-react"
import Image from "next/image"
import { Separator } from "../ui/separator"
import attack from "@/public/attack.png";
import taunt from "@/public/taunt.png";
import damage_debuff from "@/public/damage_debuff.png";
import { SkillWithRanks } from "@/src/lib/interface"


type Props = {
  skills?: SkillWithRanks[]
  ultimate?: CharacterUltimate;
  rarity?: string
}

function CharacterSkillsTab({ skills, rarity, ultimate }: Props) {
  const [showUpgradedSkills, setShowUpgradedSkills] = useState(false)
  const [selectedSkillLevels, setSelectedSkillLevels] = useState<{ [key: string]: number }>({});


  const { showJapanese } = useShowJapanese()

  const getSkillTypeIcon = (type: string) => {
    console.log(type)
    
    switch (type) {
      case "Attack":
        return <Image src={attack} alt="Attack Icon" className="w-8 h-8" width={32} height={32} />
      case "Taunt":
          return <Image src={taunt} alt="Taunt Icon" className="w-8 h-8" width={32} height={32} />
      case "Debuff":
          return <Image  src={damage_debuff} alt="Debuff Icon" className="w-8 h-8" width={32} height={32}/>
      default:
        return <Star className="w-4 h-4" />
    }
  }

  const handleLevelSelect = (skillIndex: number, level: number) => {
      setSelectedSkillLevels((prevState) => ({
        ...prevState,
        // Use the skill's index to create a unique key for its selected level
        [skillIndex]: level,
      }));
    };

  return (
    <Card className="bg-purple-400 dark:bg-purple-900 rounded-[5px] dark:border-purple-400">
      <CardHeader>
        <CardTitle className="text-white">Character Skills</CardTitle>
        <CardDescription className="text-gray-700 dark:text-gray-300">Character skills & ultimate.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end">
          {rarity === "LR" && (
            <div className="flex items-center justify-end mb-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="skills-toggle" className="text-sm">
                  Base Skills
                </Label>
                <Switch id="skills-toggle" checked={showUpgradedSkills} onCheckedChange={setShowUpgradedSkills} />
                <Label htmlFor="skills-toggle" className="text-sm">
                  Upgraded Skills
                </Label>
              </div>
            </div>
          )}
        </div>
        <div>
        {skills && skills.length > 0 ? (
  // Only one map is needed to iterate over the skills array
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Place the grid outside the map if it applies to all skills */}
    {skills.map((skill, idx) => { // Iterate over the skills array once
     const selectedLevel = selectedSkillLevels[idx] || 1; // Adjust key if needed
      const currentLevelData =
        skill.skillRanks.find((rank) => rank.rank === selectedLevel) || skill.skillRanks[0];
      const types = skill.skillRanks.map((rank) => rank.type); // Map types from the skill's ranks

      console.log(skill, idx + 1);

      return (
        <div key={idx} className="flex flex-col"> {/* Container for a single skill */}
          <div className="relative rounded-[5px] overflow-hidden border-4 dark:border-purple-400 border-purple-900 bg-gradient-to-b from-gray-300/20 to-gray-500/20 h-80">
            {/* Assuming you have a way to get the type for the icon from the ranks */}
            <div className="absolute top-2 right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white z-10">
               {/* You might need to determine the skill type based on ranks or a skill property */}
               {/* Example: Using the type of the first rank */}
               {types.length > 0 && getSkillTypeIcon(types[0])}
            </div>
            <Image
              src={skill.imageUrl || "/placeholder.svg"}
              alt={showJapanese ? skill.jpName : skill.name}
              fill
              className="object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
              <div className="flex justify-center mb-1">
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((level) => (
                    <button
                      key={level}
                      // Adjust the key for handleLevelSelect to be unique per skill
                      onClick={() => handleLevelSelect(idx, level)} // Simplified key
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xd font-bold ${
                        selectedLevel === level
                          ? "bg-yellow-400 text-yellow-900"
                          : "bg-gray-600 text-gray-300"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <h3 className="font-bold text-lg text-white">
              {showJapanese ? skill.jpName : skill.name}{" "}
              <span className="text-sm font-normal dark:text-gray-300 text-gray-700">Lv. {selectedLevel}</span>
            </h3>
            <p className="text-sm text-white">{currentLevelData?.description}</p> {/* Use optional chaining */}
          </div>
        </div>
      );
    })}
  </div>
) : (
  // Handle no skills
  <div className="text-center text-white">No skills available.</div>
)}
        </div>
      </CardContent>
        <Separator className="my-8 dark:bg-purple-400" />
      <div>
          <CardHeader className="pt-0">
            <CardTitle className="text-white">Character Ultimate</CardTitle>
            <CardDescription className="text-gray-700 dark:text-gray-300">The characters most powerful move.</CardDescription>
          </CardHeader>
          <CardContent>
          {ultimate ? (
              <div className="flex flex-col justify-center items-center">
                <Image 
                src={ultimate.imageUrl}
                alt={showJapanese ? ultimate.jpName : ultimate.name}
                width={256}
                height={128}
                className="object-cover border-4 dark:border-purple-400 border-purple-900" />
                  <div className="mt-3 space-y-2">
                      <h3 className="font-bold text-lg text-center text-white">
                        {showJapanese ? ultimate.jpName : ultimate.name}{" "}
                      </h3>
                      <p className="text-sm font-normal text-white">{ultimate.description}</p>
                      <p className="pt-4 font-normal text-white">{ultimate.extraInfo}</p>
                    </div>
              </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <p>No ultimate available....</p>
            </div>
          )}
          </CardContent>
        </div>
    </Card>
  )
}

export default CharacterSkillsTab

