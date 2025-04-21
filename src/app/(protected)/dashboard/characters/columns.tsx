"use client";

import { deleteCharacter } from "@/src/actions/delete-character";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Game } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export type Character = {
  id: string;
  name: string;
  tag: string;
  jpName: string;
  jpTag: string;
  slug: string;
  game?: Game;
};

export const columns: ColumnDef<Character>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "tag",
    header: "Tag",
  },
  {
    accessorKey: "jpName",
    header: "JP Name",
  },
  {
    accessorKey: "jpTag",
    header: "JP Tag",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "game",
    header: "Game",
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
          <DropdownMenuContent align="end" className="bg-purple-400 text-white  dark:bg-purple-700">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600" asChild>
              <Link href={`/dashboard/characters/edit/${character.id}`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600"
              onClick={() => {
                console.log("View", row.original);
              }}
            >
              View
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
