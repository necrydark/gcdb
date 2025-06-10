"use client";

import { deleteIngredient } from "@/src/actions/food";
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
import Image from "next/image";
import Link from "next/link";

export type Ingredients = {
  id: string;
  name: string;
  imageUrl: string;
  location: string | null;
};

export const columns: ColumnDef<Ingredients>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">{row.original.id.substring(0,8 )}...</div>

  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "imageUrl",
    header: "Image URL",
    cell: ({ row}) => (
      <Image 
      src={row.original.imageUrl || "/placehover.svg"} alt={row.original.name} width={32} height={32} 
      className="mx-auto object-cover"
      />
    )
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
      const ingredient = row.original;
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
              <Link href={`/dashboard/ingredients/edit/${ingredient.id}`}>
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600"
            >
              <Link href={`/dashboard/ingredients/view/${ingredient.id}`}
              className="w-full">
              View</Link>
            </DropdownMenuItem>

            <DropdownMenuItem
            className="dark:focus:bg-purple-900 focus:text-white rounded-[5px] focus:bg-purple-600 cursor-pointer"
              onClick={() => {
                deleteIngredient(row.original.id);
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
