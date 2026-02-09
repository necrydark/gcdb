import db from "@/src/lib/db";
import { currentRole } from "@/src/utils/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { Materials } from "./columns";
import { EnhanceMaterialsPageClient } from "./enhance-materials-client";

async function getRelics(): Promise<Materials[]> {
  const data = await db.relicEnhanceMaterial.findMany();
  return data as Materials[];
}

const AdminEnhanceMaterialsPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN && role !== UserRole.OWNER) {
    redirect("/");
  }

  const data = await getRelics();

  return <EnhanceMaterialsPageClient data={data} />;
};

export default AdminEnhanceMaterialsPage;
