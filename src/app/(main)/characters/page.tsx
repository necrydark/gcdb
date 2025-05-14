
import CharacterCard from "@/src/components/characters/character-card";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/src/components/ui/pagination";
import { Attribute, Race, Rarity, Game, Crossovers} from "@prisma/client";
import db from "@/src/lib/db";
import { Loader2 } from "lucide-react";
import CharacterClient from "@/src/components/characters/character-client";
import { currentUser } from "@/src/utils/auth";
import { auth } from "@/src/auth";
import characters from "@/src/utils/dummy/characters";


interface Character {
  id: string;
  name: string;
  imageUrl: string;
    attribute: Attribute
    race: Race
    rarity: Rarity
  game?: Game
  crossover: Crossovers
  slug: string;
  
}



async function Characters({searchParams}: { searchParams: Record<string, string>}) {
  const page = parseInt(searchParams.page || "1", 10);
  const search = searchParams.search || "";
  const attribute = searchParams.attribute || "";
  const race = searchParams.race || "";
  const rarity = searchParams.rarity || "";
  const game = searchParams.game || "";

  const user = await auth();


  const allCharacters = await db.character.findMany({
    include: {
      Collection: {
        select: {
          userId: true
        }
      }
    }
  })


  return (
    <Suspense fallback={<div><Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading...</div>}>
      <CharacterClient 
      characters={JSON.parse(JSON.stringify(allCharacters))}
      initialFilters={{ page, search, attribute, race, rarity, game }}
      user={user?.user}
      />
    </Suspense>
  )
}

export default Characters;
