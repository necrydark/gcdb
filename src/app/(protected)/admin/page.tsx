import { useCurrentRole } from "@/hooks/use-current-role";
import { useToast } from "@/src/components/ui/use-toast";
import { currentRole } from "@/src/lib/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { User, columns } from "./columns";
import { DataTable } from "./data-table";
import db from "@/src/lib/db";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

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
  })

  return data as User[];
  
  // return [
  //   {
  //     id: "9382321",
  //     name: "John",
  //     email: "john@gmail.com",
  //     username: "JohnDoe",
  //     isTwoFactorEnabled: true,
  //   },
  // ];
}

const AdminPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN) {
    redirect("/");
  }

  const data = await getUsers();


  return (
    <div className="max-w-[1400px] px-10 container mx-auto py-20">
      <div className="flex justify-between items-center">
      <h1 className="text-3xl leading-tight font-extrabold pb-5">Users Page</h1>
      <Button size="sm" variant="outline" asChild>
        <Link href={"/admin/characters"}>Characters Page</Link>
      </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default AdminPage;
