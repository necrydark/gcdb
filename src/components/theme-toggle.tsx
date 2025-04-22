// "use client";

// import { AnimatePresence, motion } from "framer-motion";
// import { useTheme } from "next-themes";
// import { useEffect, useState } from "react";
// import { BsSunFill } from "react-icons/bs";
// import { FaMoon } from "react-icons/fa";

// const ThemeToggle = () => {
//   const [darkMode, setDarkMode] = useState(true);
//   const [mounted, setMounted] = useState(false);
//   const { theme, setTheme } = useTheme();

//   // const toggleTheme = () => setDarkMode(!darkMode);
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;
//   // const setupTheme = () => {
//   //   if (
//   //     localStorage.theme === "dark" ||
//   //     (!("theme" in localStorage) &&
//   //       window.matchMedia("(prefers-color-scheme: dark)").matches)
//   //   ) {
//   //     document.documentElement.classList.add("dark");
//   //   } else {
//   //     document.documentElement.classList.remove("dark");
//   //   }
//   // };
//   // setupTheme();

//   // useEffect(() => setupTheme, []);

//   // useEffect(() => {
//   //   if (darkMode) {
//   //     document.documentElement.classList.add("dark");
//   //     localStorage.setItem("theme", "dark");
//   //   } else {
//   //     document.documentElement.classList.remove("dark");
//   //     localStorage.setItem("theme", "light");
//   //   }
//   // }, [darkMode]);

//   return (
//     <AnimatePresence mode="wait" initial={false}>
//       <motion.button
//         style={{
//           backgroundColor: theme === "dark" ? "#372664" : "#FFCC33",
//           padding: "5px 10px 5px 10px",
//           color: theme === "dark" ? "#fff" : "#000",
//           fontSize: "14px",
//           display: "block",
//           borderRadius: "0.375rem",
//         }}
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         exit={{ y: 20, opacity: 0 }}
//         transition={{ duration: 0.2 }}
//         key={theme === "dark" ? "dark" : "light"}
//         onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//       >
//         {theme === "dark" ? (
//           <BsSunFill className="icon" />
//         ) : (
//           <FaMoon className="icon text-white " />
//         )}
//       </motion.button>
//     </AnimatePresence>
//   );
// };

// export default ThemeToggle;

"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="dark:hover:bg-purple-900 hover:text-white hover:bg-purple-600 border-purple-400 dark:border-purple-700">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100  transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" className="bg-purple-400 dark:bg-purple-700" sideOffset={10} align="end">
        <DropdownMenuItem 
        className="dark:focus:bg-purple-900 focus:bg-purple-600 focus:text-white text-white"
        onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem className="dark:focus:bg-purple-900 focus:bg-purple-600 focus:text-white text-white" onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem className="dark:focus:bg-purple-900 focus:bg-purple-600 focus:text-white text-white" onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
