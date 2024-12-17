import { useCurrentRole } from "@/hooks/use-current-role";
import { Button } from "@/src/components/ui/button";
import { useToast } from "@/src/components/ui/use-toast";
import { currentRole } from "@/src/lib/auth";
import db from "@/src/lib/db";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { User, columns } from "./users/columns";
import { DataTable } from "./users/data-table";
import { getUserCount } from "@/data/user";
import { getCharacterCount } from "@/data/character";
import { getMaterialCount, getRelicCount } from "@/data/relics";

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
  const count = await getUserCount();
  const charCount = await getCharacterCount();
  const relicCount = await getRelicCount();
  const materialCount = await getMaterialCount();

  return (
    <div className="max-w-[1400px] px-10 container mx-auto py-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl leading-tight font-extrabold pb-5">
          Dashboard
        </h1>
   
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
      <div className="border rounded-lg p-6">
        <h1 className="font-bold">Total Users:</h1>
        <p>{count}</p>
      </div>
      <div className="border rounded-lg p-6">
        <h1 className="font-bold">Total Characters:</h1>
        <p>{charCount}</p>
      </div>
      <div className="border rounded-lg p-6">
        <h1 className="font-bold">Total Relics:</h1>
        <p>{relicCount}</p>
      </div>
       <div className="border rounded-lg p-6">
        <h1 className="font-bold">Total Materials:</h1>
        <p>{materialCount}</p>
      </div>
      </div>
      {/* <DataTable columns={columns} data={data} /> */}
    </div>
  );
};

export default AdminPage;
