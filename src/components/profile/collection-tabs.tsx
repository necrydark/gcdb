'use client'
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Beast, Character, HolyRelic, Material, Rarity } from "@prisma/client";
import CharacterCard from "../characters/character-card";
import Link from "next/link";
import Relic from "../relics/relic";

export interface CharacterForTabs {
  id: string;
  name: string | null;
  slug: string | null;
  rarity: Rarity;
  isCollected: {
    id: string;
    characterId: string | null;
    userId: string | null;
    relicId: string | null;
    createdAt: Date;
  }[];
  imageUrl: string;
}

export interface HolyRelicWithIncludes {
    id: string;
    name: string | null;
    imageUrl: string;
    beast: Beast;
    effect: string;
    attack: string;
    defense: string;
    hp: string;
    releaseDate: Date;
    materials: Material[]; 
    characters: Character[]; 
}

interface CollectionProps {
  characters?: CharacterForTabs[];
  relics?: HolyRelicWithIncludes[]
}

export const CollectionTabs = ({ characters, relics }: CollectionProps) => {
  const [activeTab, setActiveTab] = useState("characters");

  if (!characters) {
    return null;
  }

  if(!relics) {
    return null;
  }

  console.log(relics)

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid md:grid-cols-2 grid-cols-1">
        <TabsTrigger value="characters">Characters</TabsTrigger>
        <TabsTrigger value="relics">Relics</TabsTrigger>
      </TabsList>
      <TabsContent value="characters">
        {characters?.length > 0 ? (
          <>
            <h1 className="text-3xl font-extrabold text-center tracking-tight my-6">
            Your Collected Characters
            </h1>
            <div className="flex flex-wrap justify-evenly gap-6 mb-8">
              {characters.map((char, idx) => (
                <CharacterCard
                  key={idx}
                  id={char?.id as string}
                  name={char?.name as string}
                  url={char?.imageUrl as string}
                  rarity={char?.rarity ?? "SSR"}
                  slug={char?.slug ?? "ruler-of-nazarick"}
                  isCollected={true}
                />
              ))}
            </div>
          </>
        ) : (
          <div>
            <h1 className="text-3xl font-extrabold text-center tracking-tight my-6">
              You need to add a character to your collection
            </h1>
            <p className="text-center">
              Visit the <Link href={"/characters"}>characters</Link> page to
              view all the characters and add them to your collection tracker.
            </p>
          </div>
        )}
      </TabsContent>
      <TabsContent value="relics">
      {relics?.length > 0 ? (
            <>
                    <h1 className="text-3xl font-extrabold text-center tracking-tight my-6">
              Your Collected Relics
            </h1>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mb-8">
                {relics.map((relic, idx) => (
                    <Relic key={idx} holyRelic={JSON.parse(JSON.stringify(relic))} isCollected={true} />
                ))}
            </div>
            </>
        ) : (
            <div>
            <h1 className="text-3xl font-extrabold text-center tracking-tight mt-6">
              You need to add a relic to your collection
            </h1>
            <p className="text-center">
              Visit the <Link href={"/relics"}>relics</Link> page to
              view all the relics and add them to your collection tracker.
            </p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};
