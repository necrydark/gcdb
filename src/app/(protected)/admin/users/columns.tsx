"use client";

import { deleteUser } from "@/src/actions/admin";
import EditUserForm from "@/src/components/admin/edit-user-form";
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
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Dialog>
                <DialogTrigger className=" w-full  relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent hover:bg-accent hover:text-accent-foreground focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  View User
                </DialogTrigger>
                <DialogContent>
                  <ViewUser
                    name={user.name}
                    username={user.username}
                    email={user.email}
                    isTwoFactorEnabled={user.isTwoFactorEnabled}
                    role={user.role}
                  />
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Dialog>
                <DialogTrigger className=" w-full  relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent hover:bg-accent hover:text-accent-foreground focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  Edit User
                </DialogTrigger>
                <DialogContent>
                  <EditUserForm
                    name={user.name}
                    username={user.username}
                    email={user.email}
                    isTwoFactorEnabled={user.isTwoFactorEnabled}
                    role={user.role}
                    image={user.image}
                    banner={user.banner}
                  />
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => deleteUser(user.id)}
            >
              <GoTrash className="w-4 h-4 mr-2" />
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
