import { currentRole } from "@/src/utils/auth";
import db from "@/src/lib/db";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { GiftsPageClient } from "./gifts-client";
import { Gifts } from "./columns";

async function getGifts(): Promise<Gifts[]> {
  const data = await db.gift.findMany();
  return data as Gifts[];
}

const AdminGiftsPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN && role !== UserRole.OWNER) {
    redirect("/");
  }

  const data = await getGifts();

  return <GiftsPageClient data={data} />;
};

export default AdminGiftsPage;
