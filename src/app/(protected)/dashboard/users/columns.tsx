"use client";

import { deleteUser } from "@/src/actions/admin";
import EditUserForm from "@/src/components/admin/users/edit-user-form";
import ViewUser from "@/src/components/admin/view-user";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { UserRole } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { GoTrash } from "react-icons/go";

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  isTwoFactorEnabled: boolean;
  role: UserRole;
  image: string;
  banner: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },

  {
    accessorKey: "isTwoFactorEnabled",
    header: "Two Factor Enabled",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
          <Button size="sm" variant="outline" className="dark:hover:bg-purple-950 bg-purple-600 dark:bg-purple-900 border-purple-400 border-[2px] rounded-[5px] hover:text-white hover:bg-purple-700">
              <MoreHorizontal className=" text-white" size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end"  className="bg-purple-400 text-white  dark:bg-purple-700">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600"
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuItem    className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600" asChild>
            <Link href={`/dashboard/users/view/${user.id}`}>
            View</Link>
            </DropdownMenuItem>
            <DropdownMenuItem    className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600" asChild>
              <Link href={`/dashboard/users/edit/${user.id}`}>
              Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
                className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600"
              onClick={() => deleteUser(user.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
