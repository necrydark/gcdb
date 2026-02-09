import db from "@/src/lib/db";
import { currentRole } from "@/src/utils/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { IngredientsPageClient } from "./ingredients-client";

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
      <IngredientsPageClient data={data} />
    </div>
  );
};

export default AdminIngredientsPage;
