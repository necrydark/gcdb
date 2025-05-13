'use client';

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { toggleCollectionChar } from "../actions/collection";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function CollectionButtonChar({
  characterId,
  isCollected: initialFavourited,
  className
}: {
  characterId: string;
  isCollected: boolean;
  className?: React.ReactNode;
}) {
  const [isCollected, setisCollected] = useState(initialFavourited);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
        await toggleCollectionChar(characterId)
      
      setisCollected((prev) => !prev);
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
          isCollected ? "fill-white text-white" : "text-white" 
        }`}
      />
    </Button>
  );
}
