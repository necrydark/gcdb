import { Food } from "@/types/food";
import { HolyRelic } from "@/types/holyrelic";
import { Tooltip } from "@nextui-org/react";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";

interface RelicProps {
  tabCount: number;
  bosses: string[];
  relics: HolyRelic[][];
}

const Relics: React.FC<RelicProps> = ({ tabCount, bosses, relics }) => {
  const [openTab, setOpenTab] = useState(1);

  const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -20 },
  };

  return (
    <motion.div
      className="container p-10 mx-auto"
      initial="closed"
      animate="open"
      variants={variants}
    >
      <div className="flex flex-wrap">
        <div className="w-full text-center">
          <ul
            className="grid md:grid-cols-6 text-center grid-cols-2 pt-3 gap-3 pb-4"
            role="tablist"
          >
            {bosses.map((bossName, i) => (
              <motion.li
                key={i}
                className={`cursor-pointer line-clamp-1 text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-white ${
                  openTab === i + 1 ? "bg-gray-900" : "bg-gray-800"
                }`}
                onClick={() => setOpenTab(i + 1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {bossName}
              </motion.li>
            ))}
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-gray-900 w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                {bosses.map((bossName, i) => {
                  if (openTab === i + 1) {
                    return (
                      <motion.div
                        key={i}
                        className="block"
                        initial="closed"
                        animate="open"
                        transition={{ duration: 0.5, delay: 0.5 }}
                        variants={variants}
                      >
                        <table className="table-auto w-full">
                          <thead>
                            <tr>
                              <th className="px-4 py-2">Relic</th>
                              <th className="px-4 py-2">Materials</th>
                              <th className="px-4 py-2">Effects</th>
                              <th className="px-4 py-2">Characters</th>
                            </tr>
                          </thead>
                          <tbody>
                            {relics[openTab - 1].map((relics, i) => (
                              <tr key={i}>
                                <td key={i} className="px-6 py-4">
                                  <div>
                                    <img
                                      className="mx-auto"
                                      src={relics.relic.imageUrl}
                                      alt={relics.relic.name}
                                    />
                                    <p className="text-xs">
                                      {relics.relic.name}
                                    </p>
                                  </div>
                                </td>
                                <td>
                                  <div className="flex justify-center flex-wrap space-x-3">
                                    {relics.materials?.map((material, i) => (
                                      <Tooltip
                                        offset={-7}
                                        key={i}
                                        content={material.name}
                                      >
                                        <img
                                          key={i}
                                          src={material.imageUrl}
                                          alt={material.name}
                                        />
                                      </Tooltip>
                                    ))}
                                  </div>
                                </td>
                                <td>{relics.effect}</td>
                                <td>
                                  <div className="flex justify-center flex-wrap space-x-3">
                                    {relics.characters?.map((character, i) => (
                                      <Link
                                        key={i}
                                        href={`/characters/${character.slug}`}
                                      >
                                        <img
                                          className="w-20 cursor-pointer"
                                          src={character.imageUrl}
                                          alt={character.name}
                                        />
                                      </Link>
                                    ))}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </motion.div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Relics;
