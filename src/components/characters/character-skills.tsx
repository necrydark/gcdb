"use client"
import type { CharacterSkills } from "@/src/types/skill"
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


type Props = {
  skills?: CharacterSkills[]
  rarity?: string
}

function CharacterSkillsTab({ skills, rarity }: Props) {
  const [showUpgradedSkills, setShowUpgradedSkills] = useState(false)
  const [selectedSkillLevels, setSelectedSkillLevels] = useState<Record<string, number>>({})

  const { showJapanese } = useShowJapanese()

  const getSkillTypeIcon = (type: string) => {
    switch (type) {
      case "attack":
        return <Image src={attack} alt="Attack Icon" className="w-8 h-8" width={32} height={32} />
      case "taunt":
          return <Image src={taunt} alt="Taunt Icon" className="w-8 h-8" width={32} height={32} />
      default:
        return <Star className="w-4 h-4" />
    }
  }

  const handleLevelSelect = (skillIndex: number, regSkillIndex: number, level: number) => {
    setSelectedSkillLevels((prevState) => ({
      ...prevState,
      [`${skillIndex}-${regSkillIndex}`]: level,
    }))
  }

  return (
    <Card className="bg-purple-400 dark:bg-purple-900 dark:border-purple-400">
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
            skills.map((skill, idx) => {
              return (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skill.regularSkills.map((regSkill, x) => {
                    const selectedLevel = selectedSkillLevels[`${idx}-${x}`] || 1
                    const currentLevelData =
                      regSkill.ranks.find((rank) => rank.rank === selectedLevel) || regSkill.ranks[0]
                    const types = regSkill.ranks.map((skill) => skill.type)
  
                    return (
                      <div key={x} className="flex flex-col">
                        <div className="relative rounded-[5px] overflow-hidden border-4 dark:border-purple-400 border-purple-900 bg-gradient-to-b from-gray-300/20 to-gray-500/20 h-80">
                          <div className="absolute top-2 right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white z-10">
                            {getSkillTypeIcon(types[x])}
                          </div>
                          <Image
                            src={regSkill.imageUrl || "/placeholder.svg"}
                            alt={showJapanese ? regSkill.jpName : regSkill.name}
                            fill
                            className="object-contain"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
                            <div className="flex justify-center mb-1">
                              <div className="flex items-center gap-1">
                                {[1, 2, 3].map((level) => (
                                  <button
                                    key={level}
                                    onClick={() => handleLevelSelect(idx, x, level)}
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
                            {showJapanese ? regSkill.jpName : regSkill.name}{" "}
                            <span className="text-sm font-normal dark:text-gray-300 text-gray-700">Lv. {selectedLevel}</span>
                          </h3>
                          <p className="text-sm text-white">{currentLevelData.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })
          ) : (
            <div className="flex flex-col justify-center items-center text-white">
                <p>No skills available....</p>
            </div>
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
          {skills && skills.length > 0 ? (
            skills.map((skill, idx) => (
              <div key={idx} className="flex flex-col justify-center items-center">
                <Image 
                src={skill.ultimate.imageUrl}
                alt={showJapanese ? skill.ultimate.jpName : skill.ultimate.name}
                width={256}
                height={128}
                className="object-cover border-4 dark:border-purple-400 border-purple-900" />
                  <div className="mt-3 space-y-2">
                      <h3 className="font-bold text-lg text-center text-white">
                        {showJapanese ? skill.ultimate.jpName : skill.ultimate.name}{" "}
                      </h3>
                      <p className="text-sm font-normal text-white">{skill.ultimate.description}</p>
                      <p className="pt-4 font-normal text-white">{skill.ultimate.extraInfo}</p>
                    </div>
              </div>
            ))
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

