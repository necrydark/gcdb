import { currentRole } from "@/src/utils/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { FoodPageClient } from "./food-client";
import { getFoods } from "@/data/food";

const AdminFoodPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN && role !== UserRole.OWNER) {
    redirect("/");
  }

  const data = await getFoods();

  if(!data) {
    return null;
  }

  return <FoodPageClient data={data} />;
};

export default AdminFoodPage;
