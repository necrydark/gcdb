import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";

import { Button } from "@/src/components/ui/button";
import { ProfileColour } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../lib/utils";

type Props = {
  name: string;
  imageUrl: string;
  slug: string;
  colour: ProfileColour;
};

function SmallFoodCard({ name, imageUrl, slug, colour }: Props) {
  const cardColour = colour.toLowerCase();
  return (
    <div
      className={cn(
        "border shadow rounded-2xl p-2",
        cardColour === ProfileColour.PURPLE &&
          "bg-purple-400 dark:bg-purple-800 !text-white",
        cardColour === ProfileColour.RED &&
          "bg-red-400 dark:bg-red-800 !text-white",
        cardColour === ProfileColour.GREEN &&
          "bg-green-400 dark:bg-green-800 !text-white",
        cardColour === ProfileColour.BLUE &&
          "bg-blue-400 dark:bg-blue-800 !text-white",
        cardColour === ProfileColour.YELLOW &&
          "bg-yellow-400 dark:bg-yellow-800 !text-white",
        cardColour === ProfileColour.ORANGE &&
          " bg-orange-400 dark:bg-orange-800 !text-white",
        cardColour === ProfileColour.PINK &&
          " bg-pink-400 dark:bg-pink-800 !text-white",
        cardColour === ProfileColour.CYAN &&
          " bg-cyan-400 dark:bg-cyan-800 !text-white"
      )}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="hover:scale-105  ">
              <Link href={`/food/${slug}`}>
                <Image
                  src={imageUrl}
                  alt={name}
                  height={50}
                  width={50}
                  className="rounded-2xl border-background border"
                />
              </Link>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default SmallFoodCard;
