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