"use client";

import { deleteGift } from "@/src/actions/admin";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export type Gifts = {
  id: string;
  name: string;
  imageUrl: string;
  description: string | null;
};

export const columns: ColumnDef<Gifts>[] = [
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
    accessorKey: "description",
    header: "Description",
  },

  {
    header: "Actions",
    id: "actions",
    enableHiding: true,
    cell: ({ row }) => {
      const gift = row.original;
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
              <Link href={`/dashboard/gifts/edit/${gift.id}`}>
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600"
            >
              <Link href={`/dashboard/gifts/view/${gift.id}`}
              className="w-full">
              View</Link>
            </DropdownMenuItem>

            <DropdownMenuItem
            className="dark:focus:bg-purple-900 focus:text-white rounded-[5px] focus:bg-purple-600 cursor-pointer"
              onClick={() => {
                deleteGift(row.original.id);
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
