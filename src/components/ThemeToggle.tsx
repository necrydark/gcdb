"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BsSunFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // const toggleTheme = () => setDarkMode(!darkMode);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  // const setupTheme = () => {
  //   if (
  //     localStorage.theme === "dark" ||
  //     (!("theme" in localStorage) &&
  //       window.matchMedia("(prefers-color-scheme: dark)").matches)
  //   ) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // };
  // setupTheme();

  // useEffect(() => setupTheme, []);

  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   }
  // }, [darkMode]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.button
        style={{
          backgroundColor: theme === "dark" ? "#372664" : "#FFCC33",
          padding: "5px 10px 5px 10px",
          color: theme === "dark" ? "#fff" : "#000",
          fontSize: "14px",
          display: "block",
          borderRadius: "0.375rem",
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
        key={theme === "dark" ? "dark" : "light"}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <BsSunFill className="icon" />
        ) : (
          <FaMoon className="icon text-white " />
        )}
      </motion.button>
    </AnimatePresence>
  );
};

export default ThemeToggle;
