'use client';

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { toggleCollectionChar, toggleCollectionRelic } from "../actions/collection";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function CollectionButtonRelic({
  relicId,
  isCollected: initialFavourited,
  className
}: {
  relicId: string;
  isCollected: boolean;
  className?: React.ReactNode;
}) {
  const [isCollected, setisCollected] = useState(initialFavourited);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
        await toggleCollectionRelic(relicId)
      
      setisCollected((prev) => !prev);
    });
  };


  return (
    <Button
      size="icon"
      onClick={handleClick}
      disabled={isPending}
      className={cn(className, "bg-purple-500/70 transition-all duration-300 z-50")}
    >
      <Heart
        className={`h-4 w-4 transition-colors rounded-[99999px] ${
          isCollected ? "fill-white text-white" : "text-white" 
        }`}
      />
    </Button>
  );
}
