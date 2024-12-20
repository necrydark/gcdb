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
            <Button size="sm" variant="outline">
              <MoreHorizontal size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href={`/admin/characters/edit/${character.id}`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                console.log("View", row.original);
              }}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
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
