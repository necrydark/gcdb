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

// Define material columns
const materialColumns: ColumnDef<any>[] = [
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
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "rarity",
    header: "Rarity",
  },
  createActionsColumn({
    viewPath: "/dashboard/materials/view",
    editPath: "/dashboard/materials/edit",
  }),
];

async function getMaterials() {
  const { data } = await getPaginatedData({
    model: db.material,
    select: {
      id: true,
      name: true,
      slug: true,
      type: true,
      rarity: true,
    },
  });

  return data;
}

const AdminMaterialsPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN && role !== UserRole.OWNER) {
    redirect("/");
  }

  const data = await getMaterials();

  return (
    <div className="px-10 container flex flex-col gap-6 mx-auto py-4">
      <AdminPageHeader
        title="Materials"
        description="Manage your inventory of materials and resources"
        actionText="Add Material"
        actionHref="/dashboard/materials/new"
      >
        <ExportButton data={data} />
      </AdminPageHeader>
      
      <UniversalDataTable 
        columns={materialColumns} 
        data={data}
        searchableColumns={["name", "slug", "type"]}
      />
    </div>
  );
};

export default AdminMaterialsPage;
