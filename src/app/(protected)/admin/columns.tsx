"use client";

import { ColumnDef } from "@tanstack/react-table";

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  isTwoFactorEnabled: boolean;
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
    accessorKey: "isTwoFactorEnabled",
    header: "Two Factor Enabled",
  },
];
