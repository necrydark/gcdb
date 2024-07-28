import { useCurrentRole } from "@/hooks/use-current-role";
import { Button } from "@/src/components/ui/button";
import { useToast } from "@/src/components/ui/use-toast";
import { currentRole } from "@/src/lib/auth";
import db from "@/src/lib/db";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { User, columns } from "./columns";
import { DataTable } from "./data-table";

async function getUsers(): Promise<User[]> {
  const data = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      isTwoFactorEnabled: true,
      role: true,
    },
  });

  return data as User[];
}

const AdminPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN && role !== UserRole.OWNER) {
    redirect("/");
  }

  const data = await getUsers();

  return (
    <div className="max-w-[1400px] px-10 container mx-auto py-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl leading-tight font-extrabold pb-5">
          Users Page
        </h1>
        <Button size="sm" variant="outline" asChild>
          <Link href={"/admin/characters"}>Characters Page</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default AdminPage;
