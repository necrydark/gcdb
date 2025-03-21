"use client";
import { AnimatePresence, motion } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCurrentUser } from "@/hooks/use-current-user";
import AuthNavbar from "../components/auth/auth-nav";

export default function Home() {
  const user = useCurrentUser();
  const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };
  const hidden = { opacity: 0, y: -10 };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{ hidden, visible }}
      className="min-h-screen flex flex-col text-gray-900 bg-background transition-all duration-300 dark:text-white"
    >
      {user && <AuthNavbar />}
      {!user && <Navbar />}
      <div className="container flex-1 mx-auto p-5 pt-[100px] h-[65vh] text-center">
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
          <div className="grid pt-[25px] md:grid-cols-3 grid-cols-1 gap-5">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className=" bg-slate-600 text-white shadow-slate-900 "
            >
              <h1 className="p-4 text-2xl font-bold">Latest News!</h1>
              <div className="flex flex-col justify-center border-t-2">
                <h1 className="text-2xl p-2">News title!</h1>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="bg-slate-600 text-white"
            >
              <h1 className="p-4 text-2xl font-bold">Latest Characters!</h1>
              <div className="flex flex-col justify-center border-t-2">
                <h1 className="text-2xl p-2">Character Name</h1>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="bg-slate-600 text-white"
            >
              <h1 className="p-4 text-2xl font-bold">Latest Relics!</h1>
              <div className="flex flex-col justify-center border-t-2">
                <h1 className="text-2xl p-2">Relic Name!</h1>
              </div>
            </motion.div>
          </div>
          {/* @TODO: Add most recent favourites here, if not display a paragraph and button to create an account */}
        </AnimatePresence>
      </div>
      <Footer />
    </motion.div>
  );
}
