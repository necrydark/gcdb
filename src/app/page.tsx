"use client";
import ThemeToggle from "@/components/ThemeToggle";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="dark:bg-[#1a1b1f] h-screen">
      <div className="container mx-auto p-5">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false }}
            className="text-center text-white text-2xl p-2"
          >
            Welcome to the Grand Cross Wiki
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.25 }}
            viewport={{ once: false }}
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
            viewport={{ once: false }}
            className="text-center text-white text-lg p-2"
          >
            This information is up to date with the lastest version of the game
            from KR and JP servers. This information is also used from
            Youtubers.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
