import { Button } from "@/src/components/ui/button";
import { ProfileColour } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../lib/utils";

type Props = {
  name: string;
  rarity: string;
  race: string;
  attribute: string;
  imageUrl: string;
  slug: string;
  colour: ProfileColour;
};

function SmallCharacterCard({
  name,
  rarity,
  race,
  attribute,
  imageUrl,
  slug,
  colour,
}: Props) {
  const cardColour = colour.toLocaleUpperCase();
  return (
    <div
      className={cn(
        "border shadow rounded-2xl h-[150px] w-[300px] lg:w-full mx-auto",
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
      <div className="flex justify-evenly flex-col px-8 h-[150px]">
        <div className="flex items-center flex-row gap-2">
          <Image
            src={imageUrl}
            alt={`${name}'s Image`}
            priority
            width={75}
            height={75}
          />
          <div className="flex flex-col gap-y-1">
            <h1 className="text-lg font-extrabold tracking-tight">{name}</h1>
            <p className="text-sm">{attribute}</p>
            <p className="text-sm">{race}</p>
            <p className="text-sm">{rarity}</p>
          </div>
        </div>
        <Button
          asChild
          variant={
            colour as
              | "purple"
              | "red"
              | "green"
              | "blue"
              | "yellow"
              | "orange"
              | "pink"
              | "cyan"
              | null
              | undefined
          }
          className="rounded-md hover-btn w-1/2 mx-auto md:w-full inline-flex justify-center items-center px-4 py-2 h-10 "
        >
          <Link href={`/characters/${slug}`}>View</Link>
        </Button>
      </div>
    </div>
  );
}

export default SmallCharacterCard;
