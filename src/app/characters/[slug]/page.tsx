"use client";
import characters from "@/utils/dummy/characters";
import {
  capitalise,
  splitByCapitalizationAndJoin,
  splitBySlash,
} from "@/utils/textFormat";
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
    <div className="p-10 container mx-auto space-y-10">
      {/* Header */}
      <div className="flex lg:flex-row flex-col justify-between lg:gap-5 gap-10">
        <div className="flex flex-col items-center lg:flex-row">
          <img
            className="w-40"
            src={character?.imageUrl}
            alt={character?.name}
          />
          <div className="space-y-2 lg:pl-2 pt-2 flex flex-col lg:text-start text-center lg:justify-normal justify-center text-xl">
            <p className="lg:text-lg text-sm">
              {isEnglish ? `${character.name}` : `${character.jpName}`}
            </p>
            <p className="lg:text-lg text-sm">
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
              className="cursor-pointer text-center w-[12rem] lg:text-left text-xs font-bold p-0 lg:bg-transparent lg:border-0 border border-white lg:w-[50px]"
              onClick={toggleLanguage}
            >
              EN/JP
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 text-center gap-4">
          <div>
            <h1 className="lg:text-xl font-bold">Attribute</h1>
            <p className="lg:text-lg">{character?.attribute}</p>
          </div>
          <div>
            <h1 className="lg:text-xl font-bold">Race</h1>
            <p className="lg:text-lg">{character?.race}</p>
          </div>
          <div>
            <h1 className="lg:text-xl font-bold">Rarity</h1>
            <p className="lg:text-lg">{character?.rarity}</p>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-6">
        {/* Character Stats */}
        <div className="gap-5 flex flex-col justify-center">
          <h1 className="font-bold text-xl mb-4 text-center lg:text-left">
            Character Stats
          </h1>
          <div>
            <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
              {Object.entries(character?.stats).map(([key, value]) => (
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-2 py-4">
                    {splitBySlash(
                      capitalise(splitByCapitalizationAndJoin(key))
                    )}
                  </td>
                  <td className="px-2 py-4">{value}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>

        {/* Skills */}
        <div className="lg:col-span-2">
          <h1 className="font-bold text-xl pb-3">Skills</h1>
          <div
            className="flex flex-col gap-4 justify-center 
          items-center text-center"
          >
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

        {/* Passive */}
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
                <div
                  key={idx}
                  className="flex flex-col text-center items-center"
                >
                  <img
                    alt={x.name}
                    className=" w-20 m-2 !mb-0"
                    src={x.imageUrl}
                  />
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
