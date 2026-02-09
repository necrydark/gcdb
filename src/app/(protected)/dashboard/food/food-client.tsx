'use client'
import { AdminPageClient } from "@/src/components/admin/shared/admin-page-client";
import { Foods, columns } from "./columns";

interface FoodPageClientProps {
  data: Foods[];
}

export function FoodPageClient({ data }: FoodPageClientProps) {
  return (
    <AdminPageClient
      title="Food"
      description="Manage your inventory of food items and recipes"
      actionText="Add Food"
      actionHref="/dashboard/food/new"
      data={data}
      columns={columns}
      searchableColumns={["name", "category"]}
      exportHeaders={["name", "category", "description"]}
    />
  );
}