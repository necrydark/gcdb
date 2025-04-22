"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function ThemeToggleMobile() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="dark:hover:bg-purple-900 hover:text-white hover:bg-purple-600 border-purple-400 dark:border-purple-700">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className=" bg-purple-400 dark:bg-purple-700"
        side="right"
        sideOffset={10}
        align="end"
      >
        <DropdownMenuItem 
        className="dark:focus:bg-purple-900 focus:bg-purple-600 focus:text-white text-white"
        onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
        className="dark:focus:bg-purple-900 focus:bg-purple-600 focus:text-white text-white"
        onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
        className="dark:focus:bg-purple-900 focus:bg-purple-600 focus:text-white text-white"
        onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
