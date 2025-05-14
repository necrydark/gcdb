import CharacterCard from "@/src/components/characters/character-card";
import Link from "next/link";
import { Suspense } from "react"; // Use Suspense from react
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/src/components/ui/pagination";
import { Attribute, Race, Rarity, Game, Crossovers } from "@prisma/client";
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
  crossover: Crossovers;
  slug: string;
}

type searchParams = Promise<{ params: Record<string, string>}>

// This is a Server Component
async function Characters({ searchParams }: { searchParams: searchParams}) {

  const { params } = await searchParams;
  
  const page = parseInt(params.page || "1", 10);
  const search = params.search || "";
  const attribute = params.attribute || "";
  const race = params.race || "";
  const rarity = params.rarity || "";
  const game = params.game || "";

  const user = await auth();

  const allCharacters = await db.character.findMany({
    include: {
      Collection: {
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

export default Characters;
