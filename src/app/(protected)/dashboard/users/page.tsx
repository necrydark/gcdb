import { currentRole } from "@/src/utils/auth";
import { getPaginatedData } from "@/src/lib/admin-queries";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { UniversalDataTable } from "@/src/components/admin/shared/universal-data-table";
import { AdminPageHeader } from "@/src/components/admin/shared/admin-layout-components";
import { createActionsColumn } from "@/src/components/admin/shared/data-table-actions";
import { deleteUser } from "@/src/actions/user";
import db from "@/src/lib/db";
import ExportButton from "./export-button";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

// Define user columns with reusability in mind
const userColumns: ColumnDef<any>[] = [
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
  }),
];

async function getUsers() {
  const { data } = await getPaginatedData({
    model: db.user,
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      isTwoFactorEnabled: true,
      role: true,
    },
  });

  return data;
}

const AdminUserPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN && role !== UserRole.OWNER) {
    redirect("/");
  }

  const data = await getUsers();

  return (
    <div className="px-10 container mx-auto py-20">
      <AdminPageHeader
        title="Users"
        description="Manage your users"
        actionText="Add User"
        actionHref="/dashboard/users/new"
      >
        <ExportButton data={data} />
      </AdminPageHeader>
      
      <UniversalDataTable 
        columns={userColumns} 
        data={data}
        searchableColumns={["email", "username", "name"]}
      />
    </div>
  );
};

export default AdminUserPage;
