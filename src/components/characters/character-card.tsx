"use client"
import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Attribute } from "@/src/types/attributes";
import { Rarity } from "@/src/types/rarity";
import { getRarityColour } from "@/src/lib/rarity-colours";
import FavouriteButton from "../favourite-button";
import db from "@/src/lib/db";
import { User } from "@prisma/client";
import { ExtendedUser } from "@/src/next-auth";
import { auth } from "@/src/auth";
import { currentUser } from "@/src/utils/auth";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";


type Props = {
  id: string;
  name: string;
  url: string;
  attribute: Attribute;
  rarity: Rarity;
  race: string;
  crossover: string;
  slug: string;
  isFavourited: boolean;
};

export default function CharacterCard({
  id,
  name,
  url,
  attribute,
  rarity,
  race,
  crossover,
  isFavourited,
  slug
}: Props) {


    const user = useCurrentUser();



  return (
    <Card className="h-full hover:shadow-md transition-shadow w-fit hover:dark:shadow-white duration-200 dark:bg-purple-950 bg-purple-800 border-0 overflow-hidden">
      <div className="relative w-full">
        <Link href={`/characters/${slug}`}>
        <Image
          src={url || "/"}
          alt={`${name}'s Image`}
          width={128}
          height={128}
          className="object-cover"
        />
        </Link>
        <div className="absolute top-2 right-2">
          <Badge className={`${getRarityColour(rarity)}`}>{rarity}</Badge>
        </div>
        {user && (
          <FavouriteButton
          className= "absolute bottom-1 left-1"
          characterId={id}
          isFavourited={isFavourited}
          />
        )}
      </div>
    </Card>
  );
}
