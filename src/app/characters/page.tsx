"use client";

import { Attribute, Attributes } from "@/types/attributes";
import { Crossover, Crossovers } from "@/types/crossover";
import { Race, Races } from "@/types/race";
import { Rarities, Rarity } from "@/types/rarity";
import characters from "@/utils/dummy/characters";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";

function Characters() {
  const [characterName, setCharacterName] = useState("");
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [selectedRarity, setSelectedRarity] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const [selectedCrossover, setSelectedCrossover] = useState("");

  const filteredCharacters = characters.filter((x) => {
    const characterFilter = x.name
      .toLowerCase()
      .includes(characterName.toLowerCase());
    const attributeFilter = selectedAttribute
      ? x.basicInfo.attribute === selectedAttribute
      : true;
    const rarityFilter = selectedRarity
      ? x.basicInfo.rarity === selectedRarity
      : true;
    const raceFilter = selectedRace ? x.basicInfo.race === selectedRace : true;
    const crossoverFilter = selectedCrossover
      ? x.crossover === selectedCrossover
      : true;

    if (
      characterFilter &&
      attributeFilter &&
      rarityFilter &&
      raceFilter &&
      crossoverFilter
    )
      return true;

    return false;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="container mx-auto p-10 space-y-5"
    >
      {/* Add background colour to this. */}
      <div>
        <h1 className="uppercase text-3xl font-bold mb-10">Character List</h1>
      </div>
      <div className="flex justify-between items-center lg:flex-row flex-col gap-3">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="relative z-0 lg:w-48 w-full group"
        >
          <input
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="character_name"
            type="text"
            placeholder=""
            name="character_name"
            onChange={(e) => setCharacterName(e.target.value)}
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Search a character...
          </label>
        </motion.div>

        <div className="flex space-x-5 lg:w-auto w-full lg:pt-0 pt-3 lg:justify-normal justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className="lg:p-0 pl-1 pb-1">Attribute</p>
            <select
              onChange={(e) => setSelectedAttribute(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Clear</option>
              {Object.keys(Attributes).map((attribute) => (
                <option key={attribute} value={attribute}>
                  {Attributes[attribute as Attribute]}
                </option>
              ))}
            </select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35 }}
          >
            <p className="lg:p-0 pl-1 pb-1">Rarity</p>
            <select
              onChange={(e) => setSelectedRarity(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Clear</option>
              {Object.keys(Rarities).map((rarity: any) => (
                <option key={rarity} value={rarity}>
                  {Rarities[rarity as Rarity]}
                </option>
              ))}
            </select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="lg:p-0 pl-1 pb-1">Race</p>
            <select
              onChange={(e) => setSelectedRace(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Clear</option>
              {Object.keys(Races).map((race) => (
                <option key={race} value={race}>
                  {Races[race as Race]}
                </option>
              ))}
            </select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.65 }}
          >
            <p className="lg:p-0 pl-1 pb-1">Crossover</p>
            <select
              onChange={(e) => setSelectedCrossover(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Clear</option>
              {Object.keys(Crossovers).map((crossover) => (
                <option
                  key={crossover}
                  value={Crossovers[crossover as Crossover]}
                >
                  {Crossovers[crossover as Crossover]}
                </option>
              ))}
            </select>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative overflow-x-auto shadow-md sm:rounded-lg"
      >
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Attribute
              </th>
              <th scope="col" className="px-6 py-3">
                Rarity
              </th>
              <th scope="col" className="px-6 py-3">
                Race
              </th>
              <th scope="col" className="px-6 py-3">
                Crossover
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredCharacters.map((character, idx) => (
                <motion.tr
                  layout={"size"}
                  exit={{ opacity: 0, maxHeight: 0 }}
                  key={idx}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="grid place-items-center cursor-pointer hover:animate-pulse hover:text-blue-400 transition-all duration-200">
                      <Link href={`/characters/${character.slug}`}>
                        <>
                          <img
                            className="w-20 h-20 object-cover mb-2 mx-auto"
                            src={character.imageUrl}
                            alt=""
                          />
                          <p>{character.name}</p>
                        </>
                      </Link>
                    </div>
                  </th>
                  <motion.td layout={"size"} className="px-6 py-4">
                    {character.basicInfo.attribute}
                  </motion.td>
                  <motion.td layout={"size"} className="px-6 py-4">
                    {character.basicInfo.rarity}
                  </motion.td>
                  <motion.td layout={"size"} className="px-6 py-4">
                    {character.basicInfo.race}
                  </motion.td>
                  <motion.td layout={"size"} className="px-6 py-4">
                    {character.crossover}
                  </motion.td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}

export default Characters;
