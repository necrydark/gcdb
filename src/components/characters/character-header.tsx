"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";

type Props = {
  imageUrl: string;
  name: string;
  jpName: string;
  tag: string;
  jpTag: string;
  crossover?: string;
  game?: string;
  event?: string;
  attribute: string;
  race: string;
  rarity: string;
};

function CharacterHeader({
  imageUrl,
  name,
  jpName,
  tag,
  jpTag,
  crossover,
  game,
  event,
  attribute,
  race,
  rarity,
}: Props) {
  const [isEnglish, setIsEnglish] = useState(true);
  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  };
  return (
    <div className="flex lg:flex-row flex-col justify-between lg:gap-5 gap-10">
      <div className="flex flex-col items-center lg:flex-row">
        <motion.img
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-40"
          src={imageUrl}
          alt={name}
        />
        <div className="space-y-2 lg:pl-3 pt-2 flex flex-col lg:text-start text-center lg:justify-normal justify-center text-xl">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25 }}
            className="lg:text-lg text-sm font-bold"
          >
            {isEnglish ? `${name}` : `${jpName}`}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:text-lg text-sm font-bold !m-0"
          >
            {isEnglish
              ? `[${tag}]`
              : `【${jpTag}】
          `}
          </motion.p>
          {/* <p className="font-bold">[{tag}]</p>
        <p className="font-bold">{name}</p> */}
          {crossover === "Crossover" && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <p className="text-sm font-bold">{crossover}</p>
              <p className="text-sm">{game}</p>
            </motion.div>
          )}
          {event && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <p className="text-sm font-bold">{event}</p>
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

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="grid grid-cols-3 text-center gap-5  h-fit p-5"
      >
        {/* TODO: Decide whether to keep old way or new way */}
        {/* {basicInfo?.map((x) => {
              const char = findCharacterFromSlug(x.slug);

              return (
                <tr className="odd:bg-white odd:dark:bg-gray-900  even:bg-gray-50 text-base even:dark:bg-gray-700 border border-gray-500">
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
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h1 className="lg:text-xl font-bold">Attribute</h1>
          <p className="lg:text-base">{attribute}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <h1 className="lg:text-xl font-bold">Race</h1>
          <p className="lg:text-base">{race}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <h1 className="lg:text-xl font-bold">Rarity</h1>
          <p className="lg:text-base">{rarity}</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default CharacterHeader;
