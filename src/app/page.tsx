"use client";
import ThemeToggle from "@/components/ThemeToggle";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };
  const hidden = { opacity: 0, y: -10 };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{ hidden, visible }}
    >
      <div className="container mx-auto p-5 pt-[100px] text-center">
        <AnimatePresence>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-4xl font-bold p-2"
            >
              Welcome to the Grand Cross Wiki!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg p-2"
            >
              Grand Cross Wiki is a wiki for the Grand Cross community. We
              provide all the latest information on the game as well as the
              correct information for characters.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-lg p-2"
            >
              This information is up to date with the lastest version of the
              game from KR and JP servers. This information is also used from
              Youtubers.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="grid pt-[25px] md:grid-cols-3 grid-cols-1 gap-5"
          >
            <div className=" bg-slate-600 text-white shadow-slate-900 ">
              <h1 className="p-4 text-2xl font-bold">Latest News!</h1>
              <div className="flex flex-col justify-center border-t-2">
                <h1 className="text-2xl p-2">News title!</h1>
              </div>
            </div>
            <div className="bg-slate-600 text-white">
              <h1 className="p-4 text-2xl font-bold">Latest Characters!</h1>
              <div className="flex flex-col justify-center border-t-2">
                <h1 className="text-2xl p-2">Character Name</h1>
              </div>
            </div>
            <div className="bg-slate-600 text-white">
              <h1 className="p-4 text-2xl font-bold">Latest Relics!</h1>
              <div className="flex flex-col justify-center border-t-2">
                <h1 className="text-2xl p-2">Relic Name!</h1>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
