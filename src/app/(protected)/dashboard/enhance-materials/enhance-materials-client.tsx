'use client'
import { AdminPageClient } from "@/src/components/admin/shared/admin-page-client";
import { Materials, columns } from "./columns";

interface EnhanceMaterialsPageClientProps {
  data: Materials[];
}

export function EnhanceMaterialsPageClient({ data }: EnhanceMaterialsPageClientProps) {
  return (
    <AdminPageClient
      title="Enhance Materials"
      description="Manage your inventory of enhance materials and resources"
      actionText="Add Enhance Material"
      actionHref="/dashboard/enhance-materials/new"
      data={data}
      columns={columns}
      searchableColumns={["name"]}
      exportHeaders={['id', 'name', 'description']}
    />
  );
}