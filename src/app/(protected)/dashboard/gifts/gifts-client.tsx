"use client";
import { AdminPageClient } from "@/src/components/admin/shared/admin-page-client";
import { Gifts, columns } from "./columns";

interface GiftsPageClientProps {
  data: Gifts[];
}

export function GiftsPageClient({ data }: GiftsPageClientProps) {
  return (
    <AdminPageClient
      title="Gifts"
      description="Manage your inventory of gifts and resources"
      actionText="Add Gift"
      actionHref="/dashboard/gifts/new"
      data={data}
      columns={columns}
      searchableColumns={["name"]}
      exportHeaders={["name", "rarity", "description"]}
    />
  );
}
