"use client";

import { AdminPageClient } from "@/src/components/admin/shared/admin-page-client";
import { createActionsColumn } from "@/src/components/admin/shared/data-table-actions";
import { ColumnDef } from "@tanstack/react-table";

interface Character {
  id: string;
  name: string;
  slug: string;
  jpName: string;
  rarity: string;
  attribute: string;
  race: string;
}

// Define character columns with reusability in mind
const characterColumns: ColumnDef<Character>[] = [
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
  }) as ColumnDef<Character>,
];

interface CharactersPageClientProps {
  data: Character[];
}

export function CharactersPageClient({ data }: CharactersPageClientProps) {
  return (
    <AdminPageClient
      title="Characters"
      description="Manage your characters"
      actionText="Add Character"
      actionHref="/dashboard/characters/new"
      data={data}
      columns={characterColumns}
      searchableColumns={["name", "jpName", "slug"]}
      exportHeaders={[
        "id",
        "name",
        "slug",
        "jpName",
        "rarity",
        "attribute",
        "race",
      ]}
    />
  );
}
