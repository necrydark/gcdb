"use client";

import { Attribute, Attributes } from "@/utils/traits/attributes";
import characters from "@/utils/dummy/characters";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Rarities, Rarity } from "@/utils/traits/rarity";
import { Race, Races } from "@/utils/traits/race";

function Characters() {
  const [characterName, setCharacterName] = useState("");
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [selectedRarity, setSelectedRarity] = useState("");
  const [selectedRace, setSelectedRace] = useState("");

  const filteredCharacters = characters.filter((x) => {
    const characterFilter = x.name
      .toLowerCase()
      .includes(characterName.toLowerCase());
    const attributeFilter = selectedAttribute
      ? x.attribute === selectedAttribute
      : true;
    const rarityFilter = selectedRarity ? x.rarity === selectedRarity : true;
    const raceFilter = selectedRace ? x.race === selectedRace : true;

    if (characterFilter && attributeFilter && rarityFilter && raceFilter)
      return true;

    return false;
  });

  return (
    <div className="p-10 space-y-5">
      <div>
        <h1 className="uppercase text-3xl font-bold mb-10">Character List</h1>
      </div>

      <div className="flex justify-between">
        <div>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Characters names..."
            onChange={(e) => setCharacterName(e.target.value)}
          />
        </div>

        <div className="flex space-x-5">
          <div>
            <select
              onChange={(e) => setSelectedAttribute(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            <select
              onChange={(e) => setSelectedRarity(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Clear</option>
              {Object.keys(Rarities).map((rarity: any) => (
                <option value={rarity}>{Rarities[rarity as Rarity]}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              onChange={(e) => setSelectedRace(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Clear</option>
              {Object.keys(Races).map((race) => (
                <option value={race}>{Races[race as Race]}</option>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Characters;
