import { currentRole } from "@/src/utils/auth";
import { AdminPageHeader } from "@/src/components/admin/shared/admin-layout-components";
import { IngredientsPageClient } from "./ingredients-client";
import db from "@/src/lib/db";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

async function getIngredients() {
  const data = await db.ingredient.findMany({
    select: {
      id: true,
      name: true,
      imageUrl: true,
      location: true,
    },
  });

  return data;
}

const AdminIngredientsPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN && role !== UserRole.OWNER) {
    redirect("/");
  }

  const data = await getIngredients();

  return (
    <div className="px-10 container flex flex-col gap-6 mx-auto py-4">
      <AdminPageHeader
        title="Ingredients"
        description="Manage your inventory of ingredients and resources"
        actionText="Add Ingredient"
        actionHref="/dashboard/ingredients/new"
      >
        <IngredientsPageClient data={data} />
      </AdminPageHeader>
    </div>
  );
};

export default AdminIngredientsPage;
