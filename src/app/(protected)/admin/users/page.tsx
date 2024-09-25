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
import { getUserCount } from "@/data/user";
import { getCharacterCount } from "@/data/character";
import { getRelicCount } from "@/data/relics";
import { Dialog, DialogContent, DialogTrigger } from "@/src/components/ui/dialog";
import AddUserForm from "@/src/components/admin/add-user-form";
import { Plus } from "lucide-react";

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

const UsersAdminPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN && role !== UserRole.OWNER) {
    redirect("/");
  }

  const data = await getUsers();

  return (
    <div className="max-w-[1400px] px-10 container mx-auto py-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl leading-tight font-extrabold pb-5">
          Users
        </h1>
        <div className="flex items-center py-4">
          <Dialog>
            <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap w-10 h-10 rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground  ml-auto">
              <Plus className="h-4 w-4" />
            </DialogTrigger>
            <DialogContent>
              <AddUserForm />
            </DialogContent>
          </Dialog>
        </div>
   
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default UsersAdminPage;
