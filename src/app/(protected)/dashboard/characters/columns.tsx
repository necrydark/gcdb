"use client";

import { deleteCharacter } from "@/src/actions/delete-character";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { getRarityColour } from "@/src/lib/rarity-colours";
import { Attribute, Character, Game, Race, Rarity } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export type CharacterCols = {
  id: string;
  name: string;
  jpName: string;
  imageUrl: string
  tag: string;
  race: Race[];
  attribute: Attribute;
  rarity: Rarity;
  game?: Game;
  slug: string;
};


const getAttributeColor = (attribute: Attribute) => {
  const attributeColors = {
    Strength: "bg-red-500",
    Speed: "bg-blue-500",
    HP: "bg-green-500",
    Light: "bg-yellow-500",
    Dark: "bg-purple-500",
  };
  return attributeColors[attribute] || "bg-gray-500";
};


export const columns: ColumnDef<CharacterCols>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">{row.original.id.substring(0,8 )}...</div>
  },
  {
    accessorKey: "character",
    header:"Character",
    cell: ({ row }) => (
      <div className="flex items-center gap-3 justify-center">
        <Avatar className="h-8 w-8">
          <AvatarImage src={row.original.imageUrl || "/placeholder.svg"} alt={row.original.name} />
          <AvatarFallback>{row.original.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <Link 
          className="font-medium hover:underline"
          href={`/dashboard/characters/view/${row.original.id}`}>
          {row.original.name}
          </Link>
          <div className="text-xs dark:text-gray-300 text-gray-500">
            {row.original.jpName}
          </div>
        </div>
      </div>
    )
  },

  {
    accessorKey: "race",
    header: "Race",
    cell: ({ row}) => (
      <Badge variant={"purple"}>
          {row.original.race}
      </Badge>
    )
  },
  {
    accessorKey: "attribute",
    header: "Attribute",
    cell: ({ row}) => (
      <Badge variant={"purple"} className={getAttributeColor(row.original.attribute)}>
          {row.original.attribute}
      </Badge>
    )
  },
  {
    accessorKey: "rarity",
    header: "Rarity",
    cell: ({ row}) => (
      <Badge variant={"purple"} className={getRarityColour(row.original.rarity)}>
          {row.original.rarity}
      </Badge>
    )
  },
  {
    accessorKey: "game",
    header: "Game",
    cell: ({ row}) => <div>{row.original.game}</div>
  },
  {
    id: "actions",
    enableHiding: true,
    cell: ({ row }) => {
      const character = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
          <Button size="sm" variant="outline" className="dark:hover:bg-purple-950 bg-purple-600 dark:bg-purple-900 border-purple-400 border-[2px] rounded-[5px] hover:text-white hover:bg-purple-700">
              <MoreHorizontal className=" text-white" size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-purple-400 text-white rounded-[5px] dark:bg-purple-700">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600" asChild>
              <Link href={`/dashboard/characters/edit/${character.id}`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600"
          
            >
              <Link href={`/characters/${character.slug}`}>View</Link>
              
            </DropdownMenuItem>
            <DropdownMenuItem
            className="dark:focus:bg-purple-900 focus:text-white rounded-[5px] focus:bg-purple-600 cursor-pointer"
              onClick={() => {
                deleteCharacter(row.original.id);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

