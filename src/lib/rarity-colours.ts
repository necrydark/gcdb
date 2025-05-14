import { Rarity } from "@prisma/client";

export const getRarityColour = (rarity: Rarity) => {
    const rarityColours = {
      LR: "bg-gradient-to-r from-red-500 to-purple-500 text-white border-yellow-400",
      UR: "bg-red-400 hover:bg-red-400/70 text-red-950 border-red-600",
      SSR: "bg-purple-400 hover:bg-purple-400/70 text-purple-950 border-purple-600",
      SR: "bg-yellow-400 hover:bg-yellow-400/70 text-yellow-950 border-yellow-600",
      R: "bg-blue-400 hover:bg-blue-400/70 text-blue-950 border-blue-600",
    };
    return rarityColours[rarity] || "bg-gray-400 text-gray-950 border-gray-600";
  };

  export const cardColours = (colour: string): string => {
    const colours: Record<string, string> = {
      purple: "dark:bg-purple-950 bg-purple-800",
      pink: "dark:bg-pink-950 bg-pink-800",
      red: "dark:bg-red-950 bg-red-800",
      orange: "dark:bg-orange-950 bg-orange-800",
      yellow: "dark:bg-yellow-950 bg-yellow-800",
      green: "dark:bg-green-950 bg-green-800",
      blue: "dark:bg-blue-950 bg-blue-800",
      cyan: "dark:bg-cyan-950 bg-cyan-800",
    };
    return colours[colour] || "dark:bg-purple-950 bg-purple-800";
  }