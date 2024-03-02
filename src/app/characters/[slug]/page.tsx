"use client";
import characters from "@/utils/dummy/characters";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CharacterPage({ params: { slug } }: any) {
  const [isEnglish, setIsEnglish] = useState(true);
  const character = characters.find((x) => x.slug === slug);
  const router = useRouter();
  // console.log(character);
  if (!character) {
    router.push("/characters");
    return <div>Character Not Found....</div>;
  }

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  };

  return (
    <div className="p-10 container mx-auto">
      {/* Header */}
      <div className="flex md:flex-row flex-col justify-between md:gap-5 gap-10">
        <div className="flex flex-col items-center md:flex-row">
          <img
            className="w-40"
            src={character?.imageUrl}
            alt={character?.name}
          />
          <div className="space-y-2 md:pl-2 pt-2 flex flex-col md:text-start text-center md:justify-normal justify-center text-xl">
            <p className="md:text-lg text-sm">
              {isEnglish ? `${character.name}` : `${character.jpName}`}
            </p>
            <p className="md:text-lg text-sm">
              {isEnglish ? `${character.tag}` : `${character.jpTag}`}
            </p>
            {/* <p className="font-bold">[{character?.tag}]</p>
            <p className="font-bold">{character?.name}</p> */}
            {character?.crossover === "Crossover" && (
              <div>
                <p className="text-sm font-bold">{character?.crossover}</p>
                <p className="text-sm">{character?.game}</p>
              </div>
            )}
            <button
              className="cursor-pointer text-center w-[12rem] md:text-left text-xs font-bold p-0 md:bg-transparent md:border-0 border border-white md:w-[50px]"
              onClick={toggleLanguage}
            >
              EN/JP
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 text-center gap-4">
          <div>
            <h1 className="text-xl font-bold">Attribute</h1>
            <p className="text-lg">{character?.attribute}</p>
          </div>
          <div>
            <h1 className="text-xl font-bold">Race</h1>
            <p className="text-lg">{character?.race}</p>
          </div>
          <div>
            <h1 className="text-xl font-bold">Rarity</h1>
            <p className="text-lg">{character?.rarity}</p>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 justify-items-center pt-[25px]">
        <div>
          <h1 className="font-bold text-xl">YEssirs</h1>
        </div>
        <div>
          <h1 className="font-bold text-xl">XXXTENTACION!!</h1>
        </div>
        <div>
          <h1 className="font-bold text-xl">tempted</h1>
        </div>
      </div>

      {/* Basic Info */}
    </div>
  );
}
