"use client";

import CharacterCard from "@/src/components/characters/character-card";
import db from "@/src/lib/db";
import { Attribute, Attributes } from "@/src/types/attributes";
import { Game, Games } from "@/src/types/game";
import { Crossover, Crossovers } from "@/src/types/crossover";
import { Race, Races } from "@/src/types/race";
import { Rarities, Rarity } from "@/src/types/rarity";
import characters from "@/src/utils/dummy/characters";
import { AnimatePresence, motion, spring } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/src/components/ui/pagination";

// async function getCharacters() {
//   const characters = await db.character.findMany();
//   console.log(characters);
// }

function Characters() {
  const [characterName, setCharacterName] = useState("");
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [selectedRarity, setSelectedRarity] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const [selectedCrossover, setSelectedCrossover] = useState("");

  const attributes = [...new Set(characters.map((char) => char.basicInfo.attribute))]
  const races = [...new Set(characters.map((char) => char.basicInfo.race))]
  const rarities = [...new Set(characters.map((char) => char.basicInfo.rarity))]
  const games = [...new Set(characters.map((char) => char.game).filter((game): game is string => game !== undefined))]



  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = searchParams.get("page");
  const searchParam = searchParams.get("search")
  const attributeParam = searchParams.get("attribute")
  const raceParam = searchParams.get("race")
  const rarityParam = searchParams.get("rarity")
  const gameParam = searchParams.get("game")

  const [search, setSearch] = useState(searchParam || "")
  const [attribute, setAttribute] = useState(attributeParam || "")
  const [race, setRace] = useState(raceParam || "")
  const [rarity, setRarity] = useState(rarityParam || "")
  const [game, setGame] = useState(gameParam || "")
  const [currentPage, setCurrentPage] = useState(Number.parseInt(pageParam || "1", 10))

  const itemsPerPage = 25;

  const filteredCharacters = characters.filter((character) => {
    return (
      (search === "" || character.name.toLowerCase().includes(search.toLowerCase())) &&
      (attribute === "" || character.basicInfo.attribute === attribute) &&
      (race === "" || character.basicInfo.race === race) &&
      (rarity === "" || character.basicInfo.rarity === rarity) &&
      (game === "" || character.game === game)
    )
  })

  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCharacters = filteredCharacters.slice(startIndex, endIndex)

useEffect(() => {
  const params = new URLSearchParams();
  if(currentPage > 1) params.set("page", currentPage.toString());
  if (search) params.set("search", search)
    if (attribute) params.set("attribute", attribute)
    if (race) params.set("race", race)
    if (rarity) params.set("rarity", rarity)
    if (game) params.set("game", game)

      const url = `/characters${params.toString() ? `?${params.toString()}` : ""}`
      router.push(url, {scroll: false})
}, [currentPage, search, attribute, race,rarity, game, router])

useEffect(() => {
  setCurrentPage(1)
}, [search, attribute, race, rarity, game])

const handleSearch = (e: any) => {
  setSearch(e.target.value)
};

const handleFilterReset = () => {
  setSearch("")
  setAttribute("")
  setRace("")
  setRarity("")
  setGame("")
  setCurrentPage(1)
}

  return (
    <div className=" transition-all duration-300 pb-[7rem] pt-[5rem] bg-gradient-to-b from-purple-300 via-purple-400/60 to-purple-600 dark:from-purple-500/30 dark:via-purple-700/60 dark:to-purple-900">

    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-white">Characters</h1>
      <div className="dark:bg-purple-950 bg-purple-800  shadow-md p-4 rounded-[5px] mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
          <div className="lg:col-span-2">
            <Input placeholder="Search characters..."
            value={search} onChange={handleSearch}
            className="w-full dark:bg-purple-800 bg-purple-950 border-0 placeholder:text-white rounded-[5px] focus-visible:border-purple-700 focus:ring-purple-700 dark:focus:ring-purple-950 text-white" />
          </div>

          <div>
            <Select value={attribute} onValueChange={setAttribute}>
              <SelectTrigger className="dark:bg-purple-800 bg-purple-950 text-white border-0 rounded-[5px]">
                <SelectValue placeholder="Attribute" />
              </SelectTrigger>
              <SelectContent className="dark:bg-purple-800 bg-purple-950 text-white border-0 rounded-[5px]">
                {attributes.map((attr) => (
                  <SelectItem key={attr} className="dark:hover:bg-purple-950 hover:bg-purple-800" value={attr}>
                    {attr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={race} onValueChange={setRace}>
              <SelectTrigger  className="dark:bg-purple-800 bg-purple-950 text-white border-0 rounded-[5px]">
                <SelectValue placeholder="Races" />
              </SelectTrigger>
              <SelectContent className="dark:bg-purple-800 bg-purple-950 text-white border-0 rounded-[5px]">
                {races.map((race) => (
                  <SelectItem key={race} className="dark:hover:bg-purple-950 hover:bg-purple-800" value={race}>
                    {race}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={rarity} onValueChange={setRarity}>
              <SelectTrigger  className="dark:bg-purple-800 bg-purple-950 text-white border-0 rounded-[5px]">
                <SelectValue placeholder="Rarity" />
              </SelectTrigger>
              <SelectContent className="dark:bg-purple-800 bg-purple-950 text-white border-0 rounded-[5px]">
                {rarities.map((rarity) => (
                  <SelectItem key={rarity} className="dark:hover:bg-purple-950 hover:bg-purple-800" value={rarity}>
                    {rarity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={game} onValueChange={setGame}>
              <SelectTrigger  className="dark:bg-purple-800 bg-purple-950 text-white border-0 rounded-[5px]">
                <SelectValue placeholder="Games" />
              </SelectTrigger>
              <SelectContent className="dark:bg-purple-800 bg-purple-950 text-white border-0 rounded-[5px]">
                {games.map((game) => (
                  <SelectItem key={game} className="dark:hover:bg-purple-950 hover:bg-purple-800" value={game}>
                    {game}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end">
          <Button variant={"outline"} className="dark:bg-purple-800 bg-purple-950 hover:text-white  dark:hover:bg-purple-800/70  hover:bg-purple-950/70  border-0 rounded-[5px] " onClick={handleFilterReset}>
            Reset Filters
          </Button>
        </div>
      </div>

      <div className="mb-4 text-sm text-white">
        Showing {filteredCharacters.length > 0 ?
        startIndex + 1 : 0}-{Math.min(endIndex, filteredCharacters.length)} of{" "}
        {filteredCharacters.length} characters
      </div>

      {currentCharacters.length > 0 ? (
          <div className="flex flex-wrap justify-evenly gap-6 mb-8">
            {currentCharacters.map((character) => (
              <Link href={`/characters/${character.slug}`} key={character.id}>
                <CharacterCard 
                name={character.name}
                url={character.imageUrl}
                attribute={character.basicInfo.attribute}
                race={character.basicInfo.race}
                rarity={character.basicInfo.rarity}
                crossover={character.game || "No Game"}
                />
              </Link>
            ))}

          </div>
      ): (
        <div className="text-center py-12 rounded-[5px] dark:bg-purple-950 bg-purple-800">
        <h3 className="text-lg font-medium text-white mb-2">No characters found</h3>
        <p className="text-gray-200">Try adjusting your search or filters</p>
      </div>
      )}

      {totalPages > 1 && (
        <Pagination className="my-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
              onClick={() => setCurrentPage((prev) => 
              Math.max(prev -1 , 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "text-white hover:text-white dark:border-purple-400 dark:hover:bg-purple-400 border-purple-800 hover:bg-purple-800"}

              />
            </PaginationItem>

            {Array.from({ length: totalPages}, (_, i) => i + 1).map((page) => {
              if(page === 1 || page === totalPages || (page >= currentPage -1 && page <= currentPage + 1)) {
                return(
                  <PaginationItem key={page}>
                    <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => setCurrentPage(page)}
                    className="text-white hover:text-white dark:border-purple-400 dark:hover:bg-purple-400 border-purple-800 hover:bg-purple-800"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              }

              if(page === 2 && currentPage > 3){
                return(
                  <PaginationItem key="ellipsis-start">
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              }

              if(page === totalPages - 1 && currentPage < totalPages - 2) {
                return(
                  <PaginationItem key="ellipsis-end">
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              }

              return null
            })}
            <PaginationItem>
              <PaginationNext  
              onClick={() => setCurrentPage((prev) => 
              Math.min(prev + 1, totalPages))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50": "cursor-pointer text-white hover:text-white dark:border-purple-400 dark:hover:bg-purple-400 border-purple-800 hover:bg-purple-800"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
    </div>

    // <motion.div
    //   initial={{ opacity: 0, y: -20 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   exit={{ opacity: 0 }}
    //   transition={{ duration: 1 }}
    //   className="container mx-auto p-10 pt-[8rem] space-y-5"
    // >
    //   {/* Add background colour to this. */}
    //   <div>
    //     <h1 className="uppercase text-3xl font-bold mb-10">Character List</h1>
    //   </div>
    //   <div className="flex justify-between items-center lg:flex-row flex-col gap-3">
    //     <motion.div
    //       initial={{ opacity: 0, y: -20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 1, delay: 0.1 }}
    //       className="relative z-0 lg:w-48 w-full group"
    //     >
    //       <input
    //         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //         id="character_name"
    //         type="text"
    //         placeholder=""
    //         name="character_name"
    //         onChange={(e) => setCharacterName(e.target.value)}
    //       />
    //       <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
    //         Search a character...
    //       </label>
    //     </motion.div>

    //     <div className="flex space-x-5 lg:w-auto w-full lg:pt-0 pt-3 lg:justify-normal justify-between">
    //       <motion.div
    //         initial={{ opacity: 0, y: -20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 1, delay: 0.2 }}
    //       >
    //         <p className="pl-1 pb-1">Attribute</p>
    //         <select
    //           onChange={(e) => setSelectedAttribute(e.target.value)}
    //           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[150px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //         >
    //           <option>Clear</option>
    //           {Object.keys(Attributes).map((attribute) => (
    //             <option key={attribute} value={attribute}>
    //               {Attributes[attribute as Attribute]}
    //             </option>
    //           ))}
    //         </select>
    //       </motion.div>

    //       <motion.div
    //         initial={{ opacity: 0, y: -20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 1, delay: 0.35 }}
    //       >
    //         <p className="pl-1 pb-1">Rarity</p>
    //         <select
    //           onChange={(e) => setSelectedRarity(e.target.value)}
    //           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[150px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //         >
    //           <option>Clear</option>
    //           {Object.keys(Rarities).map((rarity: any) => (
    //             <option key={rarity} value={rarity}>
    //               {Rarities[rarity as Rarity]}
    //             </option>
    //           ))}
    //         </select>
    //       </motion.div>

    //       <motion.div
    //         initial={{ opacity: 0, y: -20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 1, delay: 0.5 }}
    //       >
    //         <p className="pl-1 pb-1">Race</p>
    //         <select
    //           onChange={(e) => setSelectedRace(e.target.value)}
    //           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[150px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //         >
    //           <option value="">Clear</option>
    //           {Object.keys(Races).map((race) => (
    //             <option key={race} value={race}>
    //               {Races[race as Race]}
    //             </option>
    //           ))}
    //         </select>
    //       </motion.div>

    //       <motion.div
    //         initial={{ opacity: 0, y: -20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 1, delay: 0.65 }}
    //       >
    //         <p className="pl-1 pb-1">Game</p>
    //         <select
    //           onChange={(e) => setSelectedCrossover(e.target.value)}
    //           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[150px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //         >
    //           <option value="">Clear</option>
    //           {Object.keys(Games).map((game) => (
    //             <option
    //               key={game}
    //               value={game}
    //             >
    //               {Games[game as Game]}
    //             </option>
    //           ))}
    //         </select>
    //       </motion.div>
    //     </div>
    //   </div>
    //   <motion.div
    //     initial={{ opacity: 0, y: -20 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 1, delay: 0.8 }}
    //     className="grid md:grid-cols-4 gap-6 grid-cols-2"
    //   >
    //     {filteredCharacters.map((char, idx) => (
    //         <div key={idx} className="pt-6">
    //             <CharacterCard name={char.name} url={char.imageUrl} slug={char.slug} attribute={char.basicInfo.attribute} race={char.basicInfo.race} rarity={char.basicInfo.rarity} crossover={char.crossover}  />
    //         </div>
    //     ))}
    //     {/* <table className="w-full text-sm text-center rtl:text-right table-fixed text-gray-500 dark:text-gray-400">
    //       <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    //         <tr>
    //           <th scope="col" className="px-6 py-3">
    //             Name
    //           </th>
    //           <th scope="col" className="px-6 py-3">
    //             Attribute
    //           </th>
    //           <th scope="col" className="px-6 py-3">
    //             Rarity
    //           </th>
    //           <th scope="col" className="px-6 py-3">
    //             Race
    //           </th>
    //           <th scope="col" className="px-6 py-3">
    //             Crossover
    //           </th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <AnimatePresence>
    //           {filteredCharacters.map((character, idx) => (
    //             <motion.tr
    //               layout
    //               transition={spring}
    //               exit={{ opacity: 0, maxHeight: 0 }}
    //               key={idx}
    //               className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
    //             >
    //               <th
    //                 scope="row"
    //                 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //               >
    //                 <div className="grid place-items-center cursor-pointer hover:animate-pulse hover:text-blue-400 transition-all duration-200">
    //                   <Link href={`/characters/${character.slug}`}>
    //                     <>
    //                       <img
    //                         className="w-20 h-20 object-cover mb-2 mx-auto"
    //                         src={character.imageUrl}
    //                         alt=""
    //                       />
    //                       <p>{character.name}</p>
    //                     </>
    //                   </Link>
    //                 </div>
    //               </th>
    //               <motion.td layout transition={spring} className="px-6 py-4">
    //                 <p>{character.basicInfo.attribute}</p>
    //               </motion.td>
    //               <motion.td layout transition={spring} className="px-6 py-4">
    //                 <p>{character.basicInfo.rarity}</p>
    //               </motion.td>
    //               <motion.td layout transition={spring} className="px-6 py-4">
    //                 <p>{character.basicInfo.race}</p>
    //               </motion.td>
    //               <motion.td layout transition={spring} className="px-6 py-4">
    //                 <p>{character.crossover}</p>
    //               </motion.td>
    //             </motion.tr>
    //           ))}
    //         </AnimatePresence>
    //       </tbody>
    //     </table> */}
    //   </motion.div>
    // </motion.div>
  );
}

export default Characters;
