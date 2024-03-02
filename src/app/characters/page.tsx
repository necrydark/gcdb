"use client";

import React, { useState } from "react";
import { Attribute, Attributes } from "@/types/attributes";
import { Crossovers, IsCrossover } from "@/types/crossover";
import { Rarities, Rarity } from "@/types/rarity";
import { Race, Races } from "@/types/race";
import characters from "@/utils/dummy/characters";
import Link from "next/link";

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
      ? x.attribute === selectedAttribute
      : true;
    const rarityFilter = selectedRarity ? x.rarity === selectedRarity : true;
    const raceFilter = selectedRace ? x.race === selectedRace : true;
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
    <div className="container mx-auto p-10 space-y-5">
      {/* Add background colour to this. */}
      <div>
        <h1 className="uppercase text-3xl font-bold mb-10">Character List</h1>
      </div>
      <div className="flex justify-between items-center md:flex-row flex-col gap-3">
        <div className="relative z-0  group">
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
        </div>

        <div className="flex space-x-5 md:justify-normal justify-between">
          <div>
            <p>Attribute</p>
            <select
              onChange={(e) => setSelectedAttribute(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Clear</option>
              {Object.keys(Attributes).map((attribute) => (
                <option value={attribute}>
                  {Attributes[attribute as Attribute]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p>Rarity</p>
            <select
              onChange={(e) => setSelectedRarity(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Clear</option>
              {Object.keys(Rarities).map((rarity: any) => (
                <option value={rarity}>{Rarities[rarity as Rarity]}</option>
              ))}
            </select>
          </div>

          <div>
            <p>Race</p>
            <select
              onChange={(e) => setSelectedRace(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Clear</option>
              {Object.keys(Races).map((race) => (
                <option value={race}>{Races[race as Race]}</option>
              ))}
            </select>
          </div>

          <div>
            <p>Crossover</p>
            <select
              onChange={(e) => setSelectedCrossover(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Clear</option>
              {Object.keys(Crossovers).map((crossover) => (
                <option value={Crossovers[crossover as IsCrossover]}>
                  {Crossovers[crossover as IsCrossover]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
            {filteredCharacters.map((character) => (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="grid place-items-center cursor-pointer hover:animate-pulse">
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
                <td className="px-6 py-4">{character.attribute}</td>
                <td className="px-6 py-4">{character.rarity}</td>
                <td className="px-6 py-4">{character.race}</td>
                <td className="px-6 py-4">{character.crossover}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Characters;
