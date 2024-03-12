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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"



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
          <div className="space-y-2 lg:pl-3 pt-2 flex flex-col lg:text-start text-center lg:justify-normal justify-center text-xl">
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.25 }}
              className="lg:text-lg text-sm font-bold"
            >
              {isEnglish ? `${character.name}` : `${character.jpName}`}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="lg:text-lg text-sm font-bold !m-0"
            >
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
                transition={{ duration: 1, delay: 0.6 }}
              >
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

        <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="grid grid-cols-3 text-center gap-5 bg-gray-900 h-fit p-5">
          {" "}
          {/* TODO: Decide whether to keep old way or new way */}
          {/* {character?.basicInfo?.map((x) => {
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
            <p className="lg:text-base">{character?.basicInfo.attribute}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <h1 className="lg:text-xl font-bold">Race</h1>
            <p className="lg:text-base">{character?.basicInfo.race}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <h1 className="lg:text-xl font-bold">Rarity</h1>
            <p className="lg:text-base">{character?.basicInfo.rarity}</p>
          </motion.div>
        </motion.div>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-6">
        <Accordion type="multiple">
                <AccordionItem value={"item-2"}>
                  <AccordionTrigger>Character Stats</AccordionTrigger>
                  <AccordionContent>
                    <h2 className="text-sm font-semibold pb-1 pl-1">Level 1 stats:</h2>
                  <table
              
              className="w-full text-sm  rtl:text-right text-gray-500 dark:text-white font-bold"
            >
              {Object.entries(character?.stats).map(([key, value]) => (
                <tr
                  key={key}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-700 border border-gray-500    border-b dark:border-gray-700"
                >
                  <td className="p-4 text-lg">
                    {splitBySlash(
                      capitalise(splitByCapitalizationAndJoin(`${key}: `))
                    )}
                  </td>
                  <td className="p-4 text-base">{value}</td>
                </tr>
              ))}
            </table>
                  </AccordionContent>
                </AccordionItem>
        </Accordion>
        {/* Character Stats
        <div className="gap-5 flex flex-col">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-bold text-xl pb-5 text-center lg:text-left"
          >
            Character Stats
          </motion.h1>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="text-sm font-semibold pb-1"
            >
              Level 1 Stats:
            </motion.h2>
            <motion.table
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="w-full text-sm  rtl:text-right text-gray-500 dark:text-white font-bold"
            >
              {Object.entries(character?.stats).map(([key, value]) => (
                <tr
                  key={key}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-700 border border-gray-500    border-b dark:border-gray-700"
                >
                  <td className="p-4 text-lg">
                    {splitBySlash(
                      capitalise(splitByCapitalizationAndJoin(`${key}: `))
                    )}
                  </td>
                  <td className="p-4 text-base">{value}</td>
                </tr>
              ))}
            </motion.table>
          </div> */}


        {/* TODO: Add Skills + Ultimate */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <Accordion type="multiple">
            <AccordionItem value={"item-1"}>
              <AccordionTrigger>Skills</AccordionTrigger>
              <AccordionContent>
              <div
          
            className="bg-gray-900 flex flex-col items-center border border-gray-500 border-b gap-5 dark:border-gray-700 p-4"
          >
            {character?.skills?.regularSkills.map((x, idx) => {
              return (
                <div
                  className="flex gap-2 flex-col justify-center text-center w-full"
                  key={idx}
                >
                  <div>
                    <img className="mx-auto" src={x.imageUrl} alt={x.name} />
                  </div>
                  <div key={idx}>
                    <h1 className="text-lg font-bold">
                      {x.name} | {x.jpName}
                    </h1>
                  </div>
                  <table className="w-full text-sm  table-auto rtl:text-right text-gray-500 dark:text-white font-bold">
                    <thead>
                      <tr className="odd:bg-white odd:dark:bg-gray-900  text-lg even:bg-gray-50 even:dark:bg-gray-700 border border-gray-500 font-bold text-gray-900 dark:text-white">
                        <th className="px-6 border border-gray-500 py-4 whitespace-nowrap">
                          Rank
                        </th>
                        <th className="px-6 border border-gray-500 py-4 whitespace-nowrap">
                          Description
                        </th>
                        <th className="px-6 border border-gray-500 py-4 whitespace-nowrap">
                          Type
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {x.ranks.map((y, idx) => (
                        <tr
                          key={idx}
                          className="odd:bg-white odd:dark:bg-gray-900  even:bg-gray-50 text-base even:dark:bg-gray-700 border border-gray-500"
                        >
                          <td className="p-4 border border-gray-500">
                            {idx + 1}
                          </td>
                          <td className="p-4 text-base font-semibold">
                            {y.description}
                          </td>
                          <td className="p-4 border border-gray-500">
                            {y.type}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
            <div className="w-full justify-center p-4 flex flex-col">
              <h1 className="font-bold text-xl text-center lg:text-left pb-5">Ultimate</h1>
              <img
              className="mx-auto"
              src={character?.skills?.ultimate.imageUrl}
              alt={character?.skills?.ultimate.name}
              />
              <h2 className="text-lg p-4 text-center font-bold">
                {character?.skills?.ultimate.name} | {character?.skills?.ultimate.jpName}
              </h2>
              <p className="text-base p-4 border-t-[1px] text-center border-t-white">
                {character?.skills?.ultimate.description}
                </p>
            </div>
          </div> 
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {/* <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="font-bold text-xl text-center lg:text-left pb-5"
          >
            Skills
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="bg-gray-900 flex flex-col items-center border border-gray-500 border-b gap-5 dark:border-gray-700 p-4"
          >
            {character?.skills?.regularSkills.map((x, idx) => {
              return (
                <div
                  className="flex gap-2 flex-col justify-center text-center w-full"
                  key={idx}
                >
                  <div>
                    <img className="mx-auto" src={x.imageUrl} alt={x.name} />
                  </div>
                  <div key={idx}>
                    <h1 className="text-lg font-bold">
                      {x.name} | {x.jpName}
                    </h1>
                  </div>
                  <table className="w-full text-sm  table-auto rtl:text-right text-gray-500 dark:text-white font-bold">
                    <thead>
                      <tr className="odd:bg-white odd:dark:bg-gray-900  text-lg even:bg-gray-50 even:dark:bg-gray-700 border border-gray-500 font-bold text-gray-900 dark:text-white">
                        <th className="px-6 border border-gray-500 py-4 whitespace-nowrap">
                          Rank
                        </th>
                        <th className="px-6 border border-gray-500 py-4 whitespace-nowrap">
                          Description
                        </th>
                        <th className="px-6 border border-gray-500 py-4 whitespace-nowrap">
                          Type
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {x.ranks.map((y, idx) => (
                        <tr
                          key={idx}
                          className="odd:bg-white odd:dark:bg-gray-900  even:bg-gray-50 text-base even:dark:bg-gray-700 border border-gray-500"
                        >
                          <td className="p-4 border border-gray-500">
                            {idx + 1}
                          </td>
                          <td className="p-4 text-base font-semibold">
                            {y.description}
                          </td>
                          <td className="p-4 border border-gray-500">
                            {y.type}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
            <div className="w-full justify-center p-4 flex flex-col">
              <h1 className="font-bold text-xl text-center lg:text-left pb-5">Ultimate</h1>
              <img
              className="mx-auto"
              src={character?.skills?.ultimate.imageUrl}
              alt={character?.skills?.ultimate.name}
              />
              <h2 className="text-lg p-4 text-center font-bold">
                {character?.skills?.ultimate.name} | {character?.skills?.ultimate.jpName}
              </h2>
              <p className="text-base p-4 border-t-[1px] text-center border-t-white">
                {character?.skills?.ultimate.description}
                </p>
            </div>
          </motion.div> */}
        </div>

        {/* TODO: Fix passive so that it displays the data and image */}
       <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
       >
       <Accordion   type="multiple"  className="flex flex-col text-center gap-5">
          <AccordionItem value={"item-1"}>
            <AccordionTrigger>Passive</AccordionTrigger>
            <AccordionContent>
            <img
                className="w-28 mx-auto"
                src={character?.passive?.imageUrl}
                alt={character?.passive?.name}
              />
              <h2 className="p-4 font-bold">
                {character?.passive?.name} | {character?.passive?.jpName}
              </h2>
              <p className="text-base p-4 border-t-[1px] border-t-white">
                {character?.passive?.description}
              </p>
            </AccordionContent>
          </AccordionItem>
          </Accordion>
       </motion.div>

        {/* <div className="flex flex-col  gap-5">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="font-bold text-center lg:text-left pb-5 text-xl"
          >
            Passive
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="bg-gray-900 flex flex-col items-center border border-gray-500 border-b dark:border-gray-700 p-4"
          >
            <div className="flex text-center flex-col justify-center">
              <img
                className="w-28 mx-auto"
                src={character?.passive?.imageUrl}
                alt={character?.passive?.name}
              />
              <h2 className="p-4 font-bold">
                {character?.passive?.name} | {character?.passive?.jpName}
              </h2>
              <p className="text-base p-4 border-t-[1px] border-t-white">
                {character?.passive?.description}
              </p>
            </div>
          </motion.div>
        </div> */}

        {/* Association */}
        {character.associations && (
          <div>
            <Accordion type="multiple">
              <AccordionItem value={"item-3"}>
              <AccordionTrigger>Associations</AccordionTrigger>
              <AccordionContent>
              <table className="w-full text-sm rtl:text-right text-white-500 text-center">
              <thead>
                <tr className="odd:bg-white odd:dark:bg-gray-900  text-lg even:bg-gray-50 even:dark:bg-gray-700 border border-gray-500 font-bold text-gray-900 dark:text-white">
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
                    <tr
                      key={idx}
                      className="odd:bg-white odd:dark:bg-gray-900  even:bg-gray-50 text-base even:dark:bg-gray-700 border border-gray-500"
                    >
                      <td className="p-4 border border-gray-500">
                        <Link className="space-y-3" href={char.slug}>
                          <img
                            className="w-20 mx-auto"
                            src={char.imageUrl}
                            alt={char.name}
                          />
                          <p className="font-bold text-base hover:opacity-60 transition-all duration-300">
                            {char.name}
                          </p>
                        </Link>
                      </td>
                      <td className="p-4 text-base font-semibold">{x.bonus}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table> 
              </AccordionContent>
              </AccordionItem>
            </Accordion>
            {/* <motion.h1
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              viewport={{ once: true }}
              className="font-bold text-center lg:text-left text-xl pb-5"
            >
              Associations
            </motion.h1>

            <motion.table
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="w-full text-sm rtl:text-right text-white-500 text-center"
            >
              <thead>
                <tr className="odd:bg-white odd:dark:bg-gray-900  text-lg even:bg-gray-50 even:dark:bg-gray-700 border border-gray-500 font-bold text-gray-900 dark:text-white">
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
                    <tr
                      key={idx}
                      className="odd:bg-white odd:dark:bg-gray-900  even:bg-gray-50 text-base even:dark:bg-gray-700 border border-gray-500"
                    >
                      <td className="p-4 border border-gray-500">
                        <Link className="space-y-3" href={char.slug}>
                          <img
                            className="w-20 mx-auto"
                            src={char.imageUrl}
                            alt={char.name}
                          />
                          <p className="font-bold text-base hover:opacity-60 transition-all duration-300">
                            {char.name}
                          </p>
                        </Link>
                      </td>
                      <td className="p-4 text-base font-semibold">{x.bonus}</td>
                    </tr>
                  );
                })}
              </tbody>
            </motion.table> */}
          </div>
        )}

        {/* Character Misc Info */}
        {/* TODO: Fix table on smaller resolutions */}
        <div>
        <Accordion type="multiple">
            <AccordionItem value={"item-4"}>
              <AccordionTrigger>Misc Info</AccordionTrigger>
              <AccordionContent>
              <table className="w-full text-sm  rtl:text-right text-gray-500 dark:text-white font-bold">
            {Object.entries(character?.misc.info).map(([key, value]) => (
              <tr
                key={key}
                className="odd:bg-white odd:dark:bg-gray-900  border border-gray-500  even:bg-gray-50 even:dark:bg-gray-700 border-b dark:border-gray-700"
              >
                <td className="p-4 text-lg">
                  {splitBySlash(
                    capitalise(splitByCapitalizationAndJoin(`${key}: `))
                  )}
                </td>
                <td className="p-4 text-base">{value}</td>
              </tr>
            ))}
          </table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {/* <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            viewport={{ once: true }}
            className="font-bold text-center lg:text-left text-xl pb-5"
          >
            Misc Info
          </motion.h1>
          <motion.table
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
            className="w-full text-sm  rtl:text-right text-gray-500 dark:text-white font-bold"
          >
            {Object.entries(character?.misc.info).map(([key, value]) => (
              <tr
                key={key}
                className="odd:bg-white odd:dark:bg-gray-900  border border-gray-500  even:bg-gray-50 even:dark:bg-gray-700 border-b dark:border-gray-700"
              >
                <td className="p-4 text-lg">
                  {splitBySlash(
                    capitalise(splitByCapitalizationAndJoin(`${key}: `))
                  )}
                </td>
                <td className="p-4 text-base">{value}</td>
              </tr>
            ))}
          </motion.table> */}
        </div>
        {/* Gifts */}

        <div>
          {character?.gift && (
            <div>
               <Accordion type="multiple">
            <AccordionItem value={"item-5"}>
              <AccordionTrigger>Gift</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col justify-center items-center">
                {character?.gift.map((x, idx) => (
                  <div key={idx} className="text-center">
                    <img
                      alt={x.name}
                      className=" w-20  m-2 !mb-0"
                      src={x.imageUrl}
                    />
                    <p className="p-2 text-sm">{x.name}</p>
                  </div>
                ))}
                </div>
              
              </AccordionContent>
            </AccordionItem>
          </Accordion>
              {/* <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                viewport={{ once: true }}
                className="text-xl pb-5 font-bold text-center lg:text-left "
              >
                Gift
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                viewport={{ once: true }}
                className="bg-gray-900 justify-center flex items-center border border-gray-500 border-b dark:border-gray-700 p-2"
              >
                {character?.gift.map((x, idx) => (
                  <div key={idx} className="text-center">
                    <img
                      alt={x.name}
                      className=" w-20  m-2 !mb-0"
                      src={x.imageUrl}
                    />
                    <p className="p-2 text-sm">{x.name}</p>
                  </div>
                ))}
              </motion.div> */}
            </div>
          )}
        </div>
        {/* Character Food */}
        <div>
          {character?.food && (
            <div>
                  <Accordion type="multiple">
            <AccordionItem value={"item-6"}>
              <AccordionTrigger>Food</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col justify-center items-center">
                {character?.food.map((x, idx) => (
                  <div key={idx} className="text-center w-full">
                    <img
                      alt={x.name}
                      className=" w-20 mx-auto"
                      src={x.imageUrl}
                    />
                    <p className="p-2 text-sm">{x.name}</p>
                  </div>
                ))}
                </div>
              
              </AccordionContent>
            </AccordionItem>
          </Accordion>
              {/* <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                viewport={{ once: true }}
                className="text-xl pb-5 font-bold text-center lg:text-left "
              >
                Food
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                viewport={{ once: true }}
                className="bg-gray-900 flex flex-col items-center border border-gray-500 border-b dark:border-gray-700 p-2"
              >
                {character?.food.map((x, idx) => (
                  <div key={idx} className="text-center w-full">
                    <img
                      alt={x.name}
                      className=" w-20 mx-auto"
                      src={x.imageUrl}
                    />
                    <p className="p-2 text-sm">{x.name}</p>
                  </div>
                ))}
              </motion.div> */}
            </div>
          )}
        </div>
        {/* Holy Relics */}
        <div>
          {character?.holyRelic && (
            <div>
                <Accordion type="multiple">
            <AccordionItem value={"item-6"}>
              <AccordionTrigger>Holy Relic</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col justify-center items-center">
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
                    <p className="text-sm p-1">
                      Defense: {x.stats[0]?.defense}
                    </p>
                    <p className="text-sm p-1">HP: {x.stats[0]?.hp}</p>
                    <p className="p-2">{x.effect}</p>
                  </div>
                ))}
                </div>
              
              </AccordionContent>
            </AccordionItem>
          </Accordion>
              {/* <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                viewport={{ once: true }}
                className="text-xl pb-5 font-bold text-center lg:text-left"
              >
                Holy Relic
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                viewport={{ once: true }}
                className="dark:bg-gray-900 border border-gray-500 border-b dark:border-gray-700  p-4"
              >
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
                    <p className="text-sm p-1">
                      Defense: {x.stats[0]?.defense}
                    </p>
                    <p className="text-sm p-1">HP: {x.stats[0]?.hp}</p>
                    <p className="p-2">{x.effect}</p>
                  </div>
                ))}
              </motion.div> */}
            </div>
          )}
        </div>
        </div>
      </div>
  );
}
