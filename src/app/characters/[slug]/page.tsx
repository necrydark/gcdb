import characters from "@/utils/dummy/characters";
import React from "react";

export default function CharacterPage({ params: { slug } }: any) {
  const character = characters.find((x) => x.slug === slug);

  return (
    <div className="p-10 container mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center gap-5">
        <div className="flex flex-row">
          <img
            className="w-28"
            src={character?.imageUrl}
            alt={character?.name}
          />
          <div className="space-y-2 pl-2 flex flex-col text-xl">
            <p className="font-bold">[{character?.tag}]</p>
            <p className="font-bold">{character?.name}</p>
            {character?.crossover === "Crossover" && (
              <div>
                <p className="text-sm font-bold">{character?.crossover}</p>
                <p className="text-sm">{character?.game}</p>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 text-center gap-4">
          <div>
            <h1 className="text-xl font-bold">Attribute</h1>
            <p className="text-lg">{character?.attribute}</p>
          </div>
          <div>
            <h1 className="text-xl font-bold">Race</h1>
            <p className="text-lg">{character?.race}</p>
          </div>
          <div>
            <h1 className="text-xl font-bold">Rarity</h1>
            <p className="text-lg">{character?.rarity}</p>
          </div>
        </div>
      </div>

      {/* Basic Info */}
    </div>
  );
}
