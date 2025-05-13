"use client"
import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Attribute } from "@/src/types/attributes";
import { Rarity } from "@/src/types/rarity";
import { getRarityColour } from "@/src/lib/rarity-colours";
import db from "@/src/lib/db";
import { User } from "@prisma/client";
import { ExtendedUser } from "@/src/next-auth";
import { auth } from "@/src/auth";
import { currentUser } from "@/src/utils/auth";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import CollectionButtonChar from "../collection-button-char";


type Props = {
  id: string;
  name: string;
  url: string;
  rarity: Rarity;
  slug: string;
  isCollected?: boolean;
};

export default function CharacterCard({
  id,
  name,
  url,
  rarity,
  isCollected,
  slug
}: Props) {


    const user = useCurrentUser();

    console.log(isCollected)


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
          <CollectionButtonChar
          className= "absolute bottom-1 left-1"
          characterId={id}
          isCollected={isCollected as boolean}
          />
        )}
      </div>
    </Card>
  );
}
