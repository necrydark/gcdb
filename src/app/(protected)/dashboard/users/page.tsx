import { getPaginatedData } from "@/src/lib/admin-queries";
import db from "@/src/lib/db";
import { currentRole } from "@/src/utils/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { UserPageClient } from "./user-client";

async function getUsers() {
  const { data } = await getPaginatedData({
    model: db.user,
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      isTwoFactorEnabled: true,
      role: true,
    },
  });

  return data;
}

const AdminUserPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN && role !== UserRole.OWNER) {
    redirect("/");
  }

  const data = await getUsers();

  return <UserPageClient data={data} />;
};

export default AdminUserPage;
