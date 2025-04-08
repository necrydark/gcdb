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
            <Button size="sm" variant="outline">
              <MoreHorizontal className="text-black dark:text-white" size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href={`/admin/materials/edit/${material.id}`}>
                Edit Material
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Dialog>
                <DialogTrigger className=" w-full  relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent hover:bg-accent hover:text-accent-foreground focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  View Material
                </DialogTrigger>
                <DialogContent>
                  <ViewMaterial
                    name={material.name}
                    imageUrl={material.imageUrl}
                    location={material.location as string}
                  />
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                deleteMaterial(row.original.id);
              }}
            >
              Delete Material
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
