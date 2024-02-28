"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsSunFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => setDarkMode(!darkMode);
  const setupTheme = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  setupTheme();

  //theme toggle does not work
  useEffect(() => setupTheme, [[], darkMode]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.button
        style={{
          backgroundColor: darkMode ? "#372664" : "#FFCC33",
          padding: "5px 10px 5px 10px",
          color: darkMode ? "#fff" : "#000",
          fontSize: "14px",
          display: "block",
          borderRadius: "0.375rem",
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
        key={darkMode ? "dark" : "light"}
        onClick={toggleTheme}
      >
        {darkMode ? (
          <BsSunFill className="icon" />
        ) : (
          <FaMoon className="icon text-white " />
        )}
      </motion.button>
    </AnimatePresence>
  );
};

export default ThemeToggle;
