import { getPaginatedData } from "@/src/lib/admin-queries";
import db from "@/src/lib/db";
import { currentRole } from "@/src/utils/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { MaterialsPageClient } from "./materials-client";

async function getMaterials() {
  const { data } = await getPaginatedData({
    model: db.material,
    select: {
      id: true,
      name: true,
      imageUrl: true,
      location: true,
    },
  });

  return data;
}

const AdminMaterialsPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN && role !== UserRole.OWNER) {
    redirect("/");
  }

  const data = await getMaterials();

  return (
    <div className="px-10 container flex flex-col gap-6 mx-auto py-4">
      <MaterialsPageClient data={data} />
    </div>
  );
};

export default AdminMaterialsPage;
