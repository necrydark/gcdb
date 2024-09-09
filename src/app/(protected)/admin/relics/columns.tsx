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

export type HolyRelic = {
  id: string;
  name: string;
  effect: string;
  attack: string;
  defense: string;
  hp: string;
};

export const columns: ColumnDef<HolyRelic>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "effect",
    header: "Effect",
  },
  {
    accessorKey: "attack",
    header: "Attack",
  },
  {
    accessorKey: "defense",
    header: "Defense",
  },
  {
    accessorKey: "hp",
    header: "HP",
  },

  {
    id: "actions",
    enableHiding: true,
    cell: ({ row }) => {
      const relic = row.original;
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
              <Link href={`/admin/characters/edit/${relic.id}`}>Edit</Link>
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
