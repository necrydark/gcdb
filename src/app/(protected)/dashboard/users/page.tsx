import { useCurrentRole } from "@/hooks/use-current-role";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";


import { currentRole } from "@/src/utils/auth";
import db from "@/src/lib/db";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { User, columns } from "./columns";
import { DataTable } from "./data-table";
import { getCharacterCount } from "@/data/character";
import { getRelicCount } from "@/data/relics";
import { Dialog, DialogContent, DialogTrigger } from "@/src/components/ui/dialog";
import { Download, Plus } from "lucide-react";
import ExportButton from "./export-button";

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

const AdminUserPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN && role !== UserRole.OWNER) {
    redirect("/");
  }

  const data = await getUsers();

  return (
    <div className=" px-10 container mx-auto py-20">
      <div className="flex justify-between items-center">
        <div>
        <h1 className="text-2xl leading-tight font-bold">
          Users
        </h1>
      <p className="text-gray-500 dark:text-gray-300">Manage your users.</p>

          </div>
        <div className="flex items-center gap-2">
     <ExportButton data={data} />
        <Button size="sm" variant="outline" className="rounded-[5px] dark:hover:bg-purple-950 border-purple-900 bg-purple-400 border-[2px] hover:text-white dark:bg-purple-700 transition-all duration-250 hover:bg-purple-600" asChild>
        <Link href={"/dashboard/users/new"} ><Plus className="mr-2 h-4 w-4"  />
        Add User</Link>

        </Button>

        </div>
   
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default AdminUserPage;
