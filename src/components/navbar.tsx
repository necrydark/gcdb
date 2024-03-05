"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Characters",
      url: "/characters",
    },
    {
      name: "Cooking",
      url: "/cooking",
    },
    {
      name: "Gear",
      url: "/gear",
    },
  ];

  const handleResize = () => {
    if (window.innerWidth > 768) setIsMenuOpen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="w-full bg-gray-900 text-white"
        >
          <div className="max-w-[1280px] mx-auto flex justify-between px-2">
            <div className="flex">
              <Link
                href="/"
                className="p-5 hover:opacity-60 transition-all duration-300"
              >
                GCWIki
              </Link>
            </div>
            <div className="md:flex items-center hidden">
              {links.map((link) => (
                <Link
                  href={link.url}
                  className="p-4 hover:opacity-60 transition-all duration-300"
                  key={link.name}
                >
                  {link.name}
                </Link>
              ))}
              <ThemeToggle />
            </div>
            <div
              className="md:hidden items-center flex cursor-pointer"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <RxHamburgerMenu className="text-4xl" />
            </div>
            {isMenuOpen && (
              <>
                <div className="fixed top-0 right-0 left-0 bottom-0 lg:bottom-auto z-10 bg-slate-600">
                  <div
                    className="hidden max-lg:block fixed right-0  px-8 py-4 cursor-pointer"
                    onClick={() => {
                      setIsMenuOpen(!isMenuOpen);
                    }}
                  >
                    <AiOutlineClose className="text-4xl" />
                  </div>
                  <div className="lg:hidden flex flex-col items-center justify-center h-full">
                    {links.map((link) => (
                      <Link
                        href={link.url}
                        className="p-4 hover:opacity-60 transition-all duration-300"
                        key={link.name}
                      >
                        {link.name}
                      </Link>
                    ))}
                    <ThemeToggle />
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default Navbar;
