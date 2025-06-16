import { Suspense } from "react"; // Use Suspense from react
import { Attribute, Race, Rarity, Game, CrossoverType } from "@prisma/client";
import db from "@/src/lib/db";
import { Loader2 } from "lucide-react";
import CharacterClient from "@/src/components/characters/character-client";
// The `auth` import is likely for server-side use, keep it.
import { auth } from "@/src/auth";

interface Character {
  id: string;
  name: string;
  imageUrl: string;
  attribute: Attribute;
  race: Race;
  rarity: Rarity;
  game?: Game;
  crossover: CrossoverType;
  slug: string;
}


type searchParams = Promise<{ params: Record<string, string>}>

// This is a Server Component
async function CharactersPage({ searchParams }: { searchParams: searchParams}) {
  const user = await auth();
  const { params } = await searchParams;

  
  const page = parseInt(params?.page || "1", 10);
  const search = params?.search || "";
  const attribute = params?.attribute || "";
  const race = params?.race || "";
  const rarity = params?.rarity || "";
  const game = params?.game || "";


  const allCharacters = await db.character.findMany({
    include: {
      collection: {
        select: {
          userId: true,
        },
      },
    },
  });

  return (
    <Suspense fallback={<div className="flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading...</div>}>
      <CharacterClient
        characters={JSON.parse(JSON.stringify(allCharacters))}
        initialFilters={{ page, search, attribute, race, rarity, game }}
        user={user?.user}
      />
    </Suspense>
  );
}

export default CharactersPage;
