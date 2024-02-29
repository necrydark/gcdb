import React from "react";
import characters from "@/utils/dummy/characters";

export default function CharacterPage({ params: { slug } }: any) {
  const character = characters.find((x) => x.slug === slug);

  return (
    <div className="p-10">
      {/* Header */}
      <div className="flex items-center gap-5">
        <div>
          <img
            className="w-28"
            src={character?.imageUrl}
            alt={character?.name}
          />
        </div>
        <div className="space-y-4 text-lg">
          <p>[Whatever]</p>
          <p>{character?.name}</p>
        </div>
      </div>

      {/* Basic Info */}
    </div>
  );
}
