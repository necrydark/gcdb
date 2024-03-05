"use client";
import characters from "@/utils/dummy/characters";
import { findCharacterFromSlug } from "@/utils/findCharacter";
import {
  capitalise,
  splitByCapitalizationAndJoin,
  splitBySlash,
} from "@/utils/textFormat";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CharacterPage({ params: { slug } }: any) {
  const [isEnglish, setIsEnglish] = useState(true);
  //find a character using custom handler
  const character = characters.find((x) => x.slug === slug);
  const router = useRouter();
  // console.log(character); - USED FOR DEBUGGING


  // If a character is not found then redirect to the characters page and display a message
  if (!character) {
    router.push("/characters");
    return <div>Character Not Found....</div>;
  }

  // Toggle language between English and Japanese for character names and tags
  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  };

  return (
    <div className="p-10 container mx-auto space-y-10">
      {/* Header */}
      <div className="flex lg:flex-row flex-col justify-between lg:gap-5 gap-10">
        <div className="flex flex-col items-center lg:flex-row">
          <motion.img
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-40"
            src={character?.imageUrl}
            alt={character?.name}
          />
          <div className="space-y-2 lg:pl-2 pt-2 flex flex-col lg:text-start text-center lg:justify-normal justify-center text-xl">
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.25 }}
              className="lg:text-lg text-sm">
              {isEnglish ? `${character.name}` : `${character.jpName}`}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="lg:text-lg text-sm">
              {isEnglish
                ? `[${character.tag}]`
                : `【${character.jpTag}】
              `}
            </motion.p>
            {/* <p className="font-bold">[{character?.tag}]</p>
            <p className="font-bold">{character?.name}</p> */}
            {character?.crossover === "Crossover" && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}>
                <p className="text-sm font-bold">{character?.crossover}</p>
                <p className="text-sm">{character?.game}</p>
              </motion.div>
            )}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="cursor-pointer text-center w-[12rem] lg:text-left text-xs font-bold p-0 lg:bg-transparent lg:border-0 border border-white lg:w-[50px]"
              onClick={toggleLanguage}
            >
              EN/JP
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-3 text-center gap-4"> {/* TODO: Decide whether to keep old way or new way */}
          {/* {character?.basicInfo?.map((x) => {
                  const char = findCharacterFromSlug(x.slug);

                  return (
                    <tr className="odd:bg-white odd:dark:bg-gray-900  even:bg-gray-50 text-base even:dark:bg-gray-800 border border-gray-500">
                      <td className="p-4 border border-gray-500">
                        <Link className="space-y-3" href={char.slug}>
                          <img
                            className="w-20 mx-auto"
                            src={char.imageUrl}
                            alt={char.name}
                          />
                          <p className="font-bold text-base hover:opacity-60 transition-all duration-300">{char.name}</p>
                        </Link>
                      </td>
                      <td className="p-4 text-base font-semibold">{x.bonus}</td>
                    </tr>
                  );
                })} */}
          {/* Character Info */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25 }}
          >
            <h1 className="lg:text-xl font-bold">Attribute</h1>
            <p className="lg:text-lg">{character?.basicInfo.attribute}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}>
            <h1 className="lg:text-xl font-bold">Race</h1>
            <p className="lg:text-lg">{character?.basicInfo.race}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <h1 className="lg:text-xl font-bold">Rarity</h1>
            <p className="lg:text-lg">{character?.basicInfo.rarity}</p>
          </motion.div>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-6">
        {/* Character Stats */}
        <div className="gap-5 flex flex-col justify-center">
          <h1 className="font-bold text-xl pb-5 text-center lg:text-left">
            Character Stats
          </h1>
          <div>
            <h2 className="text-sm font-semibold pb-1">Level 1 Stats:</h2>
            <table className="w-full text-sm  rtl:text-right text-gray-500 dark:text-white font-bold">
              {Object.entries(character?.stats).map(([key, value]) => (
                <tr key={key} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border border-gray-500    border-b dark:border-gray-700">
                  <td className="p-4 text-lg">
                    {splitBySlash(
                      capitalise(splitByCapitalizationAndJoin(`${key}: `))
                    )}
                  </td>
                  <td className="p-4 text-base">{value}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>

        {/* TODO: Add Skills + Ultimate */}
        <div className="lg:col-span-2">
          <h1 className="font-bold text-xl text-center lg:text-left pb-5">Skills</h1>
          <div
            className="flex flex-col gap-4 justify-center 
          items-center text-center"
          ></div>
        </div>

        {/* TODO: Add Passive */}
        <div>
          <h1 className="font-bold text-center lg:text-left pb-5 text-xl">Passive</h1>
        </div>

        {/* Association */}
        {character.associations && (
          <div>
            <h1 className="font-bold text-center lg:text-left text-xl pb-5">Associations</h1>

            <table className="w-full text-sm rtl:text-right text-white-500 text-center">
              <thead>
                <tr className="odd:bg-white odd:dark:bg-gray-900  text-lg even:bg-gray-50 even:dark:bg-gray-800 border border-gray-500 font-bold text-gray-900 dark:text-white">
                  <th className="px-6 border-r-[1px] border-gray-500 py-4 whitespace-nowrap">
                    Character
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap">Bonus</th>
                </tr>
              </thead>
              <tbody>
                {character?.associations?.map((x, idx) => {
                  const char = findCharacterFromSlug(x.slug);

                  return (
                    <tr key={idx} className="odd:bg-white odd:dark:bg-gray-900  even:bg-gray-50 text-base even:dark:bg-gray-800 border border-gray-500">
                      <td className="p-4 border border-gray-500">
                        <Link className="space-y-3" href={char.slug}>
                          <img
                            className="w-20 mx-auto"
                            src={char.imageUrl}
                            alt={char.name}
                          />
                          <p className="font-bold text-base hover:opacity-60 transition-all duration-300">{char.name}</p>
                        </Link>
                      </td>
                      <td className="p-4 text-base font-semibold">{x.bonus}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Character Misc Info */}
        {/* TODO: Fix table on smaller resolutions */}
        <div>
          <h1 className="font-bold text-center lg:text-left text-xl pb-5">Misc Info</h1>
          <table className="w-full text-sm  rtl:text-right text-gray-500 dark:text-white font-bold">
            {Object.entries(character?.misc.info).map(([key, value]) => (
              <tr key={key} className="odd:bg-white odd:dark:bg-gray-900  border border-gray-500  even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="p-4 text-lg">
                  {splitBySlash(
                    capitalise(splitByCapitalizationAndJoin(`${key}: `))
                  )}
                </td>
                <td className="p-4 text-base">{value}</td>
              </tr>
            ))}
          </table>

        </div>
        {/* Gifts */}

        <div>
          {character?.gift && (
            <>
              <h1 className="text-xl pb-5 font-bold text-center lg:text-left ">
                Gift
              </h1>
              <div className="bg-gray-900 justify-center flex items-center border border-gray-500 border-b dark:border-gray-700 p-2">
                {character?.gift.map((x, idx) => (
                  <div key={idx} className="text-center">
                    <img
                      alt={x.name}
                      className=" w-20  m-2 !mb-0"
                      src={x.imageUrl}
                    />
                    <p className="p-2 text-sm" >{x.name}</p>
                  </div>

                ))}
              </div>
            </>

          )}
        </div>
        {/* Character Food */}
        <div>
          {character?.food && (
            <>
              <h1 className="text-xl pb-5 font-bold text-center lg:text-left ">
                Food
              </h1>
              <div className="bg-gray-900 flex flex-col items-center border border-gray-500 border-b dark:border-gray-700 p-2">
                {character?.food.map((x, idx) => (
                  <div key={idx} className="text-center">
                    <img
                      alt={x.name}
                      className=" w-20 mx-auto"
                      src={x.imageUrl}
                    />
                    <p className="p-2 text-sm" >{x.name}</p>
                  </div>

                ))}
              </div>
            </>
          )}
        </div>
        {/* Holy Relics */}
        <div>
          {character?.holyRelic && (
            <>
              <h1 className="text-xl pb-5 font-bold text-center lg:text-left">
                Holy Relic
              </h1>
              <div className="dark:bg-gray-900 border border-gray-500 border-b dark:border-gray-700  p-4">

                {character?.holyRelic.map((x, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col text-center space-y-2 items-center"
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
