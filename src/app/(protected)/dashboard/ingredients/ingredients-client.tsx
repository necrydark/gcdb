"use client";

import { UniversalDataTable } from "@/src/components/admin/shared/universal-data-table";
import { createActionsColumn } from "@/src/components/admin/shared/data-table-actions";
import { ColumnDef } from "@tanstack/react-table";
import ExportButton from "./export-button";

// Define ingredient columns
const ingredientColumns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">{row.original.id.substring(0, 8)}...</div>
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <img 
        src={row.original.imageUrl || "/placeholder.svg"} 
        alt={row.original.name} 
        width={32} 
        height={32} 
        className="mx-auto object-cover rounded"
      />
    )
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  createActionsColumn({
    viewPath: "/dashboard/ingredients/view",
    editPath: "/dashboard/ingredients/edit",
  }),
];

interface IngredientsPageClientProps {
  data: any[];
}

export function IngredientsPageClient({ data }: IngredientsPageClientProps) {
  return (
    <>
      <ExportButton data={data} />
      <UniversalDataTable 
        columns={ingredientColumns} 
        data={data}
        searchableColumns={["name", "location"]}
      />
    </>
  );
}