"use client";

import { deleteCharacter } from "@/src/actions/delete-character";
import { deleteRelic } from "@/src/actions/relics";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Beast, Game } from "@prisma/client";
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
  beast: Beast;
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
    accessorKey: "beast",
    header: "Beast"
  },
  {
    id: "actions",
    enableHiding: true,
    cell: ({ row }) => {
      const relic = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button size="sm" variant="outline" className="dark:hover:bg-purple-950 rounded-[5px] bg-purple-600 dark:bg-purple-900 border-purple-400 border-[2px] hover:text-white hover:bg-purple-700">
              <MoreHorizontal className=" text-white" size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-purple-400 text-white  dark:bg-purple-700">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600" asChild>
              <Link href={`/dashboard/relics/edit/${relic.id}`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600"
            >
              <Link href={`/dashboard/relics/view/${relic.id}`}
              className="w-full">
              View</Link>
            </DropdownMenuItem>

            <DropdownMenuItem
            className="dark:focus:bg-purple-900 focus:text-white rounded-[5px] focus:bg-purple-600 cursor-pointer"

              onClick={() => {
                deleteRelic(row.original.id);
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
