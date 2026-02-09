"use client";

import { UniversalDataTable } from "@/src/components/admin/shared/universal-data-table";
import { createActionsColumn } from "@/src/components/admin/shared/data-table-actions";
import { ColumnDef } from "@tanstack/react-table";
import ExportButton from "./export-button";

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
    accessorKey: "location",
    header: "Location",
  },
  createActionsColumn({
    viewPath: "/dashboard/materials/view",
    editPath: "/dashboard/materials/edit",
  }),
];

interface MaterialsPageClientProps {
  data: any[];
}

export function MaterialsPageClient({ data }: MaterialsPageClientProps) {
  return (
    <>
      <ExportButton data={data} />
      <UniversalDataTable 
        columns={materialColumns} 
        data={data}
        searchableColumns={["name", "location"]}
      />
    </>
  );
}