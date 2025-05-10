"use client";

import { deleteCharacter } from "@/src/actions/delete-character";
// import { deletefood } from "@/src/actions/foods";
// import Viewfood from "@/src/components/admin/view-food";
import { Button } from "@/src/components/ui/button";
import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Game, Towns } from "@prisma/client";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export type Foods = {
  id: string;
  name: string;
  imageUrl: string;
  location: Towns;
  effect: string | null;
};

export const columns: ColumnDef<Foods>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "imageUrl",
    header: "Image URL",
  },
  {
    accessorKey: "location",
    header: "Location",
  },

  {
    accessorKey: "effect",
    header: "Effect",
  },
  {
    header: "Actions",
    id: "actions",
    enableHiding: true,
    cell: ({ row }) => {
      const food = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button size="sm" variant="outline" className="dark:hover:bg-purple-950 rounded-[5px] bg-purple-600 dark:bg-purple-900 border-purple-400 border-[2px] hover:text-white hover:bg-purple-700">
              <MoreHorizontal className=" text-white" size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-purple-400 text-white  dark:bg-purple-700">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer rounded-[5px] dark:focus:bg-purple-900 focus:text-white focus:bg-purple-600" asChild>
              <Link href={`/dashboard/food/edit/${food.id}`}>
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600"
            >
              <Link href={`/dashboard/food/view/${food.id}`}
              className="w-full">
              View</Link>
            </DropdownMenuItem>

            <DropdownMenuItem
            className="dark:focus:bg-purple-900 focus:text-white rounded-[5px] focus:bg-purple-600 cursor-pointer"
              onClick={() => {
                // deleteFood(row.original.id);
                console.log(row.original.id)
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
