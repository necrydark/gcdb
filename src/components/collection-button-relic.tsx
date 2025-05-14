'use client';

import { useState, useTransition } from "react";
import { Heart, Plus, X } from "lucide-react";
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
      className={cn(className, "bg-purple-500/70 hover:bg-purple-600 dark:hover:bg-purple-900 transition-all duration-300 z-50")}
    >
            {isCollected ? <X className="h-4 w-4 text-white" /> : <Plus className="h-4 w-4 text-white" />}

    </Button>
  );
}
