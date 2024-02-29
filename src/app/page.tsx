"use client";
import ThemeToggle from "@/components/ThemeToggle";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const container = {
    hidden: { opacity: 1, y: -20 },
    visible: {
      opacity: 1,
      y: 20,
      transition: {
        delayChildren: 1,
        staggerChildren: 0.9,
      },
    },
  };
  return (
    <div className="dark:bg-[#1a1b1f] h-screen">
      <div className="container mx-auto p-5 pt-[100px]">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white text-4xl font-bold p-2"
          >
            Welcome to the Grand Cross Wiki!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.25 }}
            className="text-center text-white text-lg p-2"
          >
            Grand Cross Wiki is a wiki for the Grand Cross community. We provide
            all the latest information on the game as well as the correct
            information for characters.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="text-center text-white text-lg p-2"
          >
            This information is up to date with the lastest version of the game
            from KR and JP servers. This information is also used from
            Youtubers.
          </motion.p>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="grid pt-[25px] grid-cols-3 gap-5"
        >
          <div className=" bg-slate-600  shadow-slate-900 ">
            <h1 className="text-center p-4  text-white text-2xl font-bold">
              Latest News!
            </h1>
            <div className="flex flex-col justify-center border-t-2">
              <h1 className="text-center text-2xl text-white p-2">
                News title!
              </h1>
            </div>
          </div>
          <div className="bg-slate-600">
            <h1 className="text-center p-4 text-white text-2xl font-bold">
              Latest Characters!
            </h1>
            <div className="flex flex-col justify-center border-t-2">
              <h1 className="text-center text-2xl text-white p-2">
                Character Name
              </h1>
            </div>
          </div>
          <div className="bg-slate-600">
            <h1 className="text-center p-4 text-white text-2xl font-bold">
              Latest Relics!
            </h1>
            <div className="flex flex-col justify-center border-t-2">
              <h1 className="text-center text-2xl text-white p-2">
                Relic Name!
              </h1>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
