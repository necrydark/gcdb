import { Food } from "@/src/types/food";
import { Tooltip } from "@nextui-org/react";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";

interface CookingProps {
  tabCount: number;
  town: string[];
  food: Food[][];
}

const Cooking: React.FC<CookingProps> = ({ tabCount, town, food }) => {
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
            {town.map((townName, i) => (
              <motion.li
                key={i}
                className={`cursor-pointer line-clamp-1 text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-white ${
                  openTab === i + 1
                    ? "bg-gray-900 border border-white"
                    : "bg-gray-900"
                }`}
                onClick={() => setOpenTab(i + 1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {townName}
              </motion.li>
            ))}
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-gray-900 w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                {town.map((townName, i) => {
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
                        <table className="table-auto w-full text-sm  rtl:text-right text-gray-500 dark:text-white">
                          <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                            <tr className="odd:bg-white odd:dark:bg-gray-900 font-bold   even:bg-gray-50 even:dark:bg-gray-700 border-b dark:border-gray-700">
                              <th className="px-6 py-3">Food</th>
                              <th className="px-6 py-3">Ingredients</th>
                              <th className="px-6 py-3">Effects</th>
                              <th className="px-6 py-3">Characters</th>
                            </tr>
                          </thead>
                          <tbody>
                            {food[openTab - 1].map((food, i) => (
                              <tr
                                key={i}
                                className="odd:bg-white text-center odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-700"
                              >
                                <td key={i} className="px-6 py-4">
                                  <div>
                                    <img
                                      className="mx-auto"
                                      src={food.meal.imageUrl}
                                      alt={food.meal.name}
                                    />
                                    <p className="text-xs">{food.meal.name}</p>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex justify-center flex-wrap space-x-3">
                                    {food.ingredients?.map((ingredient, i) => (
                                      <Tooltip
                                        offset={-7}
                                        key={i}
                                        content={
                                          ingredient.name +
                                          " - " +
                                          ingredient.location
                                        }
                                      >
                                        <img
                                          key={i}
                                          src={ingredient.imageUrl}
                                          alt={ingredient.name}
                                        />
                                      </Tooltip>
                                    ))}
                                  </div>
                                </td>
                                <td className="text-xs">{food.effect}</td>
                                <td>
                                  <div className="flex justify-center flex-wrap space-x-3">
                                    {food.characters?.map((character, i) => (
                                      <Link
                                        key={i}
                                        href={`/characters/${character.slug}`}
                                      >
                                        <img
                                          className="w-10 cursor-pointer"
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

export default Cooking;

/*

 <div className="container p-10 mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3 gap-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px flex-auto text-center">
                <a
                  className={
                    "text-md font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-white  " +
                    (openTab === 1 ? " bg-gray-900" : " bg-gray-800")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  Vanya
                </a>
              </li>
              <li className="-mb-px flex-auto text-center">
                <a
                  className={
                    "text-md font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-white  " +
                    (openTab === 2 ? " bg-gray-900" : " bg-gray-800")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  Dalmally
                </a>
              </li>
              <li className="-mb-px flex-auto text-center">
                <a
                  className={
                    "text-md font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-white  " +
                    (openTab === 3 ? " bg-gray-900" : " bg-gray-800")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  Post Town Tala
                </a>
              </li>
              <li className="-mb-px flex-auto text-center">
                <a
                  className={
                    "text-md font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-white  " +
                    (openTab === 4 ? " bg-gray-900" : " bg-gray-800")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(4);
                  }}
                  data-toggle="tab"
                  href="#link4"
                  role="tablist"
                >
                  Vaizel
                </a>
              </li>
              <li className="-mb-px flex-auto text-center">
                <a
                  className={
                    "text-md font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-white  " +
                    (openTab === 5 ? " bg-gray-900" : " bg-gray-800")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(5);
                  }}
                  data-toggle="tab"
                  href="#link5"
                  role="tablist"
                >
                  Ordan Village
                </a>
              </li>
              <li className="-mb-px flex-auto text-center">
                <a
                  className={
                    "text-md font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-white  " +
                    (openTab === 6 ? " bg-gray-900" : " bg-gray-800")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(6);
                  }}
                  data-toggle="tab"
                  href="#link6"
                  role="tablist"
                >
                  Liones Castle
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words bg-gray-900 w-full mb-6 shadow-lg rounded">
              <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div
                    className={openTab === 1 ? "block" : "hidden"}
                    id="link1"
                  >
                    <p>
                      Collaboratively administrate empowered markets via
                      plug-and-play networks. Dynamically procrastinate B2C
                      users after installed base benefits.
                      <br />
                      <br /> Dramatically visualize customer directed
                      convergence without revolutionary ROI.
                    </p>
                  </div>
                  <div
                    className={openTab === 2 ? "block" : "hidden"}
                    id="link2"
                  >
                    <p>
                      Completely synergize resource taxing relationships via
                      premier niche markets. Professionally cultivate one-to-one
                      customer service with robust ideas.
                      <br />
                      <br />
                      Dynamically innovate resource-leveling customer service
                      for state of the art customer service.
                    </p>
                  </div>
                  <div
                    className={openTab === 3 ? "block" : "hidden"}
                    id="link3"
                  >
                    <p>
                      Efficiently unleash cross-media information without
                      cross-media value. Quickly maximize timely deliverables
                      for real-time schemas.
                      <br />
                      <br /> Dramatically maintain clicks-and-mortar solutions
                      without functional solutions.
                    </p>
                  </div>
                  <div
                    className={openTab === 4 ? "block" : "hidden"}
                    id="link4"
                  >
                    <p>
                      Efficiently unleash cross-media information without
                      cross-media value. Quickly maximize timely deliverables
                      for real-time schemas.
                      <br />
                      <br /> Dramatically maintain clicks-and-mortar solutions
                      without functional solutions.
                    </p>
                  </div>
                  <div
                    className={openTab === 5 ? "block" : "hidden"}
                    id="link5"
                  >
                    <p>
                      Efficiently unleash cross-media information without
                      cross-media value. Quickly maximize timely deliverables
                      for real-time schemas.
                      <br />
                      <br /> Dramatically maintain clicks-and-mortar solutions
                      without functional solutions.
                    </p>
                  </div>
                  <div
                    className={openTab === 6 ? "block" : "hidden"}
                    id="link6"
                  >
                    <p>
                      Efficiently unleash cross-media information without
                      cross-media value. Quickly maximize timely deliverables
                      for real-time schemas.
                      <br />
                      <br /> Dramatically maintain clicks-and-mortar solutions
                      without functional solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

*/
