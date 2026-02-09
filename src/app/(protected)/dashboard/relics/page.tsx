import { getPaginatedData } from "@/src/lib/admin-queries";
import db from "@/src/lib/db";
import { currentRole } from "@/src/utils/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { RelicPageClient } from "./relic-client";

async function getRelics() {
  const { data } = await getPaginatedData({
    model: db.holyRelic,
    select: {
      id: true,
      name: true,
      effect: true,
      imageUrl: true,
      attack: true,
      defense: true,
      hp: true,
      enhancable: true,
    },
  });

  return data;
}

const AdminRelicsPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN && role !== UserRole.OWNER) {
    redirect("/");
  }

  const data = await getRelics();

  return <RelicPageClient data={data} />;
};

export default AdminRelicsPage;
