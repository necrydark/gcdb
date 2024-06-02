"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import { deleteUser } from "@/src/actions/admin";
import { Dialog, DialogContent, DialogTrigger } from "@/src/components/ui/dialog";
import EditUserForm from "@/src/components/admin/edit-user-form";
import { Game, UserRole } from "@prisma/client";
import ViewUser from "@/src/components/admin/view-user";


export type Character = {
    id: string;
    name: string;
    tag: string;
    jpName: string;
    jpTag: string;
    slug: string;
    game?: Game;
}

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
        enableHiding: false,
        cell: ({ row }) => {
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
                        <DropdownMenuItem
                            onClick={() => {
                                console.log("Edit", row.original);
                            }}
                        >
                            Edit
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
                                console.log("Delete", row.original);
                                deleteUser(row.original.id);
                            }}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
]