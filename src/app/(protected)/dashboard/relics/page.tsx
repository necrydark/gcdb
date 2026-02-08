import { currentRole } from "@/src/utils/auth";
import { getPaginatedData } from "@/src/lib/admin-queries";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { UniversalDataTable } from "@/src/components/admin/shared/universal-data-table";
import { AdminPageHeader } from "@/src/components/admin/shared/admin-layout-components";
import { createActionsColumn } from "@/src/components/admin/shared/data-table-actions";
import db from "@/src/lib/db";
import ExportButton from "./export-button";
import { ColumnDef } from "@tanstack/react-table";

async function getRelics() {
  const { data } = await getPaginatedData({
    model: db.holyRelic,
    select: {
      id: true,
      name: true,
      slug: true,
      rarity: true,
      description: true,
    },
  });

  return data;
}

// Define relic columns
const relicColumns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "rarity",
    header: "Rarity",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  createActionsColumn({
    viewPath: "/dashboard/relics/view",
    editPath: "/dashboard/relics/edit",
  }),
];

const AdminRelicsPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN && role !== UserRole.OWNER) {
    redirect("/");
  }

  const data = await getRelics();

  return (
    <div className="px-10 container mx-auto py-20">
      <AdminPageHeader
        title="Relics"
        description="Manage your relics"
        actionText="Add Relic"
        actionHref="/dashboard/relics/new"
      >
        <ExportButton data={data} />
      </AdminPageHeader>
      
      <UniversalDataTable 
        columns={relicColumns} 
        data={data}
        searchColumns={["name", "slug"]}
      />
    </div>
  );
};

export default AdminRelicsPage;
