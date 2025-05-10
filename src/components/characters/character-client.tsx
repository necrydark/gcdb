"use client";

import { Attribute, Race, Rarity, Game, Crossovers, Favourite, User } from "@prisma/client";
import { startTransition, useEffect, useMemo, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/src/components/ui/pagination";
import Link from "next/link";
import CharacterCard from "./character-card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ExtendedUser } from "@/src/next-auth";
import { Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/debounce";
import { searchItems } from "@/src/actions/search";

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
    favourite: { userId: string }[];
  }
  

interface CharactersClientProps {
  characters: Character[]
  initialFilters: {
    page: number;
    search: string;
    attribute: string;
    race: string;
    rarity: string;
    game: string;
  };
  user?: ExtendedUser;

}

export default function CharacterClient({
  characters,
  initialFilters,
  user
}: CharactersClientProps) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [allCharacters, setAllCharacters] = useState<Character[]>([])





    

    const router = useRouter();
    const searchParams = useSearchParams();

    const pageParam = searchParams.get("page");
    const searchParam = searchParams.get("search");
    const attributeParam = searchParams.get("attribute");
    const raceParam = searchParams.get("race");
    const rarityParam = searchParams.get("rarity");
    const gameParam = searchParams.get("game");
  
    const [searchTerm, setSearchTerm] = useState(searchParam || "");
    const [debouncedSearch, setDebouncedSearch] = useState(searchParam || "");
    const [attribute, setAttribute] = useState(attributeParam || "");
    const [race, setRace] = useState(raceParam || "");
    const [rarity, setRarity] = useState(rarityParam || "");
    const [game, setGame] = useState(gameParam || "");
    const [currentPage, setCurrentPage] = useState(
      Number.parseInt(pageParam || "1", 10)
    );
  

    const itemsPerPage = 25;
  
    // Debounce search term
    useEffect(() => {
      const timeout = setTimeout(() => {
        setDebouncedSearch(searchTerm);
      }, 300);
      return () => clearTimeout(timeout);
    }, [searchTerm]);
  
    // Fetch characters
    useEffect(() => {
      const fetchCharacters = async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch("/api/characters");
          if (!res.ok) {
            throw new Error("Failed to fetch characters");
          }
          const data: Character[] = await res.json();
          setAllCharacters(data);
        } catch (err: any) {
          setError(err.message || "Failed to load characters.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchCharacters();
    }, []);
  
    // Filter options
    const attributes = useMemo(
      () => [...new Set(allCharacters.map((char) => char.attribute))],
      [allCharacters]
    );
    const races = useMemo(
      () => [...new Set(allCharacters.map((char) => char.race))],
      [allCharacters]
    );
    const rarities = useMemo(
      () => [...new Set(allCharacters.map((char) => char.rarity))],
      [allCharacters]
    );
    const games = useMemo(
      () =>
        [...new Set(allCharacters.map((char) => char.game))].filter(
          (g): g is Game => g !== undefined
        ),
      [allCharacters]
    );
  
    // Memoized filtered list
    const filteredCharacters = useMemo(() => {
      return allCharacters.filter((character) => {
        return (
          (debouncedSearch === "" ||
            character.name.toLowerCase().includes(debouncedSearch.toLowerCase())) &&
          (attribute === "" || character.attribute === attribute) &&
          (race === "" || character.race === race) &&
          (rarity === "" || character.rarity === rarity) &&
          (game === "" || character.game === game)
        );
      });
    }, [allCharacters, debouncedSearch, attribute, race, rarity, game]);
  
    const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCharacters = filteredCharacters.slice(startIndex, endIndex);
  
    // Debounced router.push for URL sync
    useEffect(() => {
      const timeout = setTimeout(() => {
        const params = new URLSearchParams();
        if (currentPage > 1) params.set("page", currentPage.toString());
        if (debouncedSearch) params.set("search", debouncedSearch);
        if (attribute) params.set("attribute", attribute);
        if (race) params.set("race", race);
        if (rarity) params.set("rarity", rarity);
        if (game) params.set("game", game);
  
        const url = `/characters${params.toString() ? `?${params.toString()}` : ""}`;
        router.push(url, { scroll: false });
      }, 400);
  
      return () => clearTimeout(timeout);
    }, [debouncedSearch, attribute, race, rarity, game, currentPage, router]);
  
    // Reset pagination on filter changes
    useEffect(() => {
      setCurrentPage(1);
    }, [debouncedSearch, attribute, race, rarity, game]);
  
    const handleFilterReset = () => {
      setSearchTerm("");
      setAttribute("");
      setRace("");
      setRarity("");
      setGame("");
      setCurrentPage(1);
    };
  

  return (
    <div className="transition-all duration-300 pb-[7rem] pt-[5rem] bg-gradient-to-b from-purple-300 via-purple-400/60 to-purple-600 dark:from-purple-500/30 dark:via-purple-700/60 dark:to-purple-900">
   
        <div className="container mx-auto p-4 max-w-7xl">
        <h1 className="text-3xl font-bold mb-6 text-white">Characters</h1>

        {/* Filters */}
        <div className="dark:bg-purple-950 bg-purple-800 shadow-md p-4 rounded-[5px] mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
            <div className="lg:col-span-2">
              <Input
                placeholder="Search characters..."
                     value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full dark:bg-purple-800 bg-purple-950 border-0 h-10 placeholder:text-white rounded-[5px] focus-visible:border-purple-700 focus:ring-purple-700 dark:focus:ring-purple-950 text-white"
              />
            </div>

            <Select value={attribute} onValueChange={setAttribute}>
              <SelectTrigger className="dark:bg-purple-800 bg-purple-950 text-white border-0 rounded-[5px]">
                <SelectValue placeholder="Attribute" />
              </SelectTrigger>
              <SelectContent className="dark:bg-purple-800 bg-purple-950 text-white border-0 rounded-[5px]">
                {attributes.map((attr) => (
                  <SelectItem key={attr} value={attr} className="dark:hover:bg-purple-950 rounded-[5px] hover:bg-purple-800">
                    {attr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={race} onValueChange={setRace}>
              <SelectTrigger className="dark:bg-purple-800 bg-purple-950 text-white border-0 rounded-[5px]">
                <SelectValue placeholder="Races" />
              </SelectTrigger>
              <SelectContent className="dark:bg-purple-800 bg-purple-950 text-white border-0 rounded-[5px]">
                {races.map((r) => (
                  <SelectItem key={r} value={r} className="dark:hover:bg-purple-950 rounded-[5px] hover:bg-purple-800">
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={rarity} onValueChange={setRarity}>
              <SelectTrigger className="dark:bg-purple-800 bg-purple-950 text-white border-0 rounded-[5px]">
                <SelectValue placeholder="Rarity" />
              </SelectTrigger>
              <SelectContent className="dark:bg-purple-800 bg-purple-950 text-white border-0 rounded-[5px]">
                {rarities.map((r) => (
                  <SelectItem key={r} value={r} className="dark:hover:bg-purple-950 rounded-[5px] hover:bg-purple-800">
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={game} onValueChange={setGame}>
              <SelectTrigger className="dark:bg-purple-800 bg-purple-950 text-white border-0 rounded-[5px]">
                <SelectValue placeholder="Games" />
              </SelectTrigger>
              <SelectContent className="dark:bg-purple-800 bg-purple-950 text-white border-0 rounded-[5px]">
                {games.map((g) => (
                  <SelectItem key={g} value={g as string} className="dark:hover:bg-purple-950 rounded-[5px] hover:bg-purple-800">
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={handleFilterReset}
              className="dark:bg-purple-800 bg-purple-950 hover:text-white dark:hover:bg-purple-800/70 hover:bg-purple-950/70 border-0 rounded-[5px]"
            >
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Character Cards */}
        <div className="mb-4 text-sm text-white">
          Showing {filteredCharacters.length > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, filteredCharacters.length)} of {filteredCharacters.length} characters
        </div>

        {currentCharacters.length > 0 ? (
          <div className="flex flex-wrap justify-evenly gap-6 mb-8">
            {currentCharacters.map((character) => (
                <CharacterCard
                  key={character.id}
                  id={character.id}
                  name={character.name}
                  url={character.imageUrl}
                  attribute={character.attribute}
                  race={character.race}
                  rarity={character.rarity}
                  crossover={character.game || "No Game"}
                  slug={character.slug}
                  isFavourited={user && character.favourite && Array.isArray(character.favourite) ? character.favourite.some(fav => fav.userId === user.id) : false}
                />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 rounded-[5px] dark:bg-purple-950 bg-purple-800">
            <h3 className="text-lg font-medium text-white mb-2">No characters found</h3>
            <p className="text-gray-200">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="my-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "text-white dark:border-purple-400 hover:bg-purple-800"}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === currentPage}
                        onClick={() => setCurrentPage(page)}
                        className="text-white dark:border-purple-400 hover:bg-purple-800"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }

                if (page === 2 && currentPage > 3) {
                  return (
                    <PaginationItem key="ellipsis-start">
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                if (page === totalPages - 1 && currentPage < totalPages - 2) {
                  return (
                    <PaginationItem key="ellipsis-end">
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                return null;
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "text-white dark:border-purple-400 hover:bg-purple-800"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
