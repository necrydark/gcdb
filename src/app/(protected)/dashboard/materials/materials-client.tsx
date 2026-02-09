'use client'
import { AdminPageClient } from "@/src/components/admin/shared/admin-page-client";
import { createActionsColumn } from "@/src/components/admin/shared/data-table-actions";
import { ColumnDef } from "@tanstack/react-table";

interface Material {
  id: string;
  name: string;
  imageUrl: string;
  location: string | null;
}

const materialColumns: ColumnDef<Material>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  createActionsColumn({
    viewPath: "/dashboard/materials/view",
    editPath: "/dashboard/materials/edit",
  }) as ColumnDef<Material>,
];

interface MaterialsPageClientProps {
  data: Material[];
}

export function MaterialsPageClient({ data }: MaterialsPageClientProps) {
  return (
    <AdminPageClient
      title="Materials"
      description="Manage your inventory of materials and resources"
      actionText="Add Material"
      actionHref="/dashboard/materials/new"
      data={data}
      columns={materialColumns}
      searchableColumns={["name", "location"]}
      exportHeaders={['id', 'name', 'imageUrl', 'location']}
    />
  );
}