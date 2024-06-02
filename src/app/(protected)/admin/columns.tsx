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
import { UserRole } from "@prisma/client";
import ViewUser from "@/src/components/admin/view-user";


export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  isTwoFactorEnabled: boolean;
  role: UserRole;

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
    header: "Role"
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
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
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
            <DropdownMenuItem asChild>
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
                />
              </DialogContent>
            </Dialog>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteUser(user.id)}>Delete User</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
];
