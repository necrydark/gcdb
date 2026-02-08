"use client";

import { UniversalDataTable } from "@/src/components/admin/shared/universal-data-table";
import { AdminPageHeader } from "@/src/components/admin/shared/admin-layout-components";
import { createActionsColumn } from "@/src/components/admin/shared/data-table-actions";
import ExportButton from "./export-button";
import { ColumnDef } from "@tanstack/react-table";

// Define character columns with reusability in mind
const characterColumns: ColumnDef<any>[] = [
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
    accessorKey: "jpName",
    header: "Japanese Name",
  },
  {
    accessorKey: "rarity",
    header: "Rarity",
  },
  {
    accessorKey: "attribute",
    header: "Attribute",
  },
  {
    accessorKey: "race",
    header: "Race",
  },
  createActionsColumn({
    viewPath: "/dashboard/characters/view",
    editPath: "/dashboard/characters/edit",
  }),
];

interface CharactersPageClientProps {
  data: any[];
}

export function CharactersPageClient({ data }: CharactersPageClientProps) {
  return (
    <div className="px-10 container mx-auto py-20">
      <AdminPageHeader
        title="Characters"
        description="Manage your characters"
        actionText="Add Character"
        actionHref="/dashboard/characters/new"
      >
        {data.length > 0 && <ExportButton data={data} />}
      </AdminPageHeader>
      
      <UniversalDataTable 
        columns={characterColumns} 
        data={data}
        searchColumns={["name", "jpName", "slug"]}
      />
    </div>
  );
}