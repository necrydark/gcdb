'use client';

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { toggleFavourite } from "../actions/favourite";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function FavouriteButton({
  characterId,
  isFavourited: initialFavourited,
  className
}: {
  characterId: string;
  isFavourited: boolean;
  className?: React.ReactNode;
}) {
  const [isFavourited, setIsFavourited] = useState(initialFavourited);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
        await toggleFavourite(characterId)
      
      setIsFavourited((prev) => !prev);
    });
  };


  return (
    <Button
      size="icon"
      onClick={handleClick}
      disabled={isPending}
      className={cn(className, "bg-purple-500/70 z-50")}
    >
      <Heart
        className={`h-4 w-4 transition-colors rounded-[99999px] ${
          isFavourited ? "fill-white text-white" : "text-white" 
        }`}
      />
    </Button>
  );
}
