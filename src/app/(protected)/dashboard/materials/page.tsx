import { currentRole } from "@/src/utils/auth";
import db from "@/src/lib/db";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { MaterialsPageClient } from "./materials-client";

async function getMaterials() {
  const data = await db.material.findMany();
  return data;
}

const AdminMaterialsPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN && role !== UserRole.OWNER) {
    redirect("/");
  }

  const data = await getMaterials();

  return <MaterialsPageClient data={data} />;
};

export default AdminMaterialsPage;
