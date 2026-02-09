import { currentRole } from "@/src/utils/auth";
import db from "@/src/lib/db";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { IngredientsPageClient } from "./ingredients-client";
import { Ingredients } from "./columns";

async function getIngredients() {
  const data = await db.ingredient.findMany();
  return data;
}

const AdminIngredientsPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN && role !== UserRole.OWNER) {
    redirect("/");
  }

  const data = await getIngredients();

  return <IngredientsPageClient data={data} />;
};

export default AdminIngredientsPage;
