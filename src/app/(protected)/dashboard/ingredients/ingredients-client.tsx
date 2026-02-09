"use client";
import { AdminPageClient } from "@/src/components/admin/shared/admin-page-client";
import { columns, Ingredients } from "./columns";

interface IngredientsPageClientProps {
  data: Ingredients[];
}

export function IngredientsPageClient({ data }: IngredientsPageClientProps) {
  return (
    <AdminPageClient
      title="Ingredients"
      description="Manage your inventory of ingredients and resources"
      actionText="Add Ingredient"
      actionHref="/dashboard/ingredients/new"
      data={data}
      columns={columns}
      searchableColumns={["name", "location"]}
      exportHeaders={["id", "name", "imageUrl", "location"]}
    />
  );
}
