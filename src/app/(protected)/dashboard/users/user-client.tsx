"use client";

import { deleteUser } from "@/src/actions/user";
import { AdminPageClient } from "@/src/components/admin/shared/admin-page-client";
import { createActionsColumn } from "@/src/components/admin/shared/data-table-actions";
import { ColumnDef } from "@tanstack/react-table";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  isTwoFactorEnabled: boolean;
}

// Define user columns with reusability in mind
const userColumns: ColumnDef<User>[] = [
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
  createActionsColumn({
    viewPath: "/dashboard/users/view",
    editPath: "/dashboard/users/edit",
    onDelete: deleteUser,
  }) as ColumnDef<User>,
];

interface UserPageClientProps {
  data: User[];
}

export function UserPageClient({ data }: UserPageClientProps) {
  return (
    <AdminPageClient
      title="Users"
      description="Manage your users"
      actionText="Add User"
      actionHref="/dashboard/users/new"
      data={data}
      columns={userColumns}
      searchableColumns={["name", "email", "username"]}
      exportHeaders={[
        "id",
        "name",
        "username",
        "email",
        "role",
        "isTwoFactorEnabled",
      ]}
    />
  );
}
