"use client";
import characters from "@/utils/dummy/characters";
import Link from "next/link";
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
      <div className="grid md:grid-cols-3 grid-cols-1 justify-items-center pt-[50px] gap-6">
      <div>
        <h1 className="font-bold text-xl">
          Character Stats
        </h1>
        <div>
          {Object.entries(character?.stats).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <p>{key}</p>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1 className="font-bold text-xl pb-3">Skills</h1>
        <div className="flex flex-col gap-4 justify-center 
          items-center text-center">
          {/* {character?.associations?.map((x) => (
                // eslint-disable-next-line react/jsx-key
                <div>
                  <Link href={x.slug}>
                  <img className=" w-20 mx-auto" src={x.imageUrl} alt={x.name} />
                  <p>{x.name}</p>
                  </Link>
                
                </div>

              ))} */}
        </div>
      </div>
      <div>
        <h1 className="font-bold text-xl">Passive</h1>
      </div>
      <div>Stuff</div>
      <div>Gift</div>
      <div>
        {character?.holyRelic && (
          <div>
            <h1 className="text-xl font-bold text-center">Holy Relic</h1>
            {character?.holyRelic.map((x, idx) => (
              <div key={idx} className="flex flex-col text-center items-center">
                <img alt={x.name} className=" w-20 m-2 !mb-0" src={x.imageUrl}/>
                <p className="p-2">{x.name}</p>
                <p className="text-sm p-1">Attack: {x.stats[0]?.attack}</p>
                <p className="text-sm p-1">Defense: {x.stats[0]?.defense}</p>
                <p className="text-sm p-1">HP: {x.stats[0]?.hp}</p>
                <p className="p-2">{x.effect}</p>
              </div>
            ))}
          </div>
   
        )}
      </div>
    </div>
    </div>
  );
}
