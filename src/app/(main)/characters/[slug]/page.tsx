"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import CharacterHeader from "@/src/components/characters/character-header";
import CharacterTabs from "@/src/components/characters/character-tabs";
import CommentsForm from "@/src/components/characters/comments-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { CharacterSkills } from "@/src/types/skill";
import characters from "@/src/utils/dummy/characters";
import { findCharacterFromSlug } from "@/src/utils/findCharacter";
import {
  capitalise,
  splitByCapitalizationAndJoin,
  splitBySlash,
} from "@/src/utils/textFormat";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";



export default function CharacterPage({ params: { slug } }: any) {
  const [showJapanese, setShowJapanese] = useState(true);

  const user = useCurrentUser();
  //find a character using custom handler
  const character = characters.find((x) => x.slug === slug);
  const router = useRouter();
  // console.log(character); - USED FOR DEBUGGING

  // If a character is not found then redirect to the characters page and display a message
  if (!character) {
    router.push("/characters");
    return <div>Character Not Found....</div>;
  }

  return (
    <div className="p-10 pt-[7rem] container mx-auto max-w-6xl ">
      {/* Header */}
      <CharacterHeader
        imageUrl={character?.imageUrl}
        name={character?.name}
        tag={character?.tag}
        jpName={character?.jpName}
        jpTag={character?.jpTag}
        crossover={character?.crossover}
        game={character?.game}
        event={character?.event}
        attribute={character?.basicInfo.attribute}
        rarity={character?.basicInfo.rarity}
        race={character?.basicInfo.race}
      />
      <CharacterTabs 
        character={character} 
        skills={character?.skills ? [character.skills] : []}
        
      
      />
      {user ? (
          <div>
            <h1 className="text-3xl leading-tight font-extrabold mt-8 text-white py-5">
              Comments
            </h1>
            <CommentsForm
              characterId={character?.id?.toString() || "1"} 
              slug={character?.slug}
            />
          </div>
        ) : (
          <div>
              <h1 className="text-3xl leading-tight font-extrabold mt-8 text-white py-5">
              Comments
            </h1>
            <p>You need to be logged in to post comments!</p>
          </div>
        )}
    </div>
  );
}
