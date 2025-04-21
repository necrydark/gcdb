"use client";

import { deleteCharacter } from "@/src/actions/delete-character";
import { deleteMaterial } from "@/src/actions/materials";
import ViewMaterial from "@/src/components/admin/view-material";
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
import { Game } from "@prisma/client";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export type Materials = {
  id: string;
  name: string;
  imageUrl: string;
  location: string | null;
};

export const columns: ColumnDef<Materials>[] = [
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
    header: "Actions",
    id: "actions",
    enableHiding: true,
    cell: ({ row }) => {
      const material = row.original;
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
              <Link href={`/dashboard/materials/edit/${material.id}`}>
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600"
            >
              <Link href={`/dashboard/materials/view/${material.id}`}
              className="w-full">
              View</Link>
            </DropdownMenuItem>

            <DropdownMenuItem
            className="dark:focus:bg-purple-900 focus:text-white rounded-[5px] focus:bg-purple-600 cursor-pointer"
              onClick={() => {
                deleteMaterial(row.original.id);
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
