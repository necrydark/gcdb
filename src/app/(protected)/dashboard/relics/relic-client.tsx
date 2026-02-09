'use client'
import { AdminPageClient } from "@/src/components/admin/shared/admin-page-client";
import { createActionsColumn } from "@/src/components/admin/shared/data-table-actions";
import { ColumnDef } from "@tanstack/react-table";

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
    accessorKey: "effect",
    header: "Effect",
  },
  {
    accessorKey: "attack",
    header: "Attack",
  },
  {
    accessorKey: "defense",
    header: "Defense",
  },
  {
    accessorKey: "hp",
    header: "HP",
  },
  createActionsColumn({
    viewPath: "/dashboard/relics/view",
    editPath: "/dashboard/relics/edit",
  }),
];

interface RelicPageClientProps {
    data: any[];
}

export function RelicPageClient({ data}: RelicPageClientProps) {
  return (
    <AdminPageClient
      title="Relics"
      description="Manage your relics"
      actionText="Add Relic"
      actionHref="/dashboard/relics/new"
      data={data}
      columns={relicColumns}
      searchableColumns={["name", "effect"]}
      exportHeaders={['id', 'name', 'effect', 'attack', 'defense', 'hp']}
    />
  );
}

