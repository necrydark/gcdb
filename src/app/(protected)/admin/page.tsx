import { useCurrentRole } from "@/hooks/use-current-role";
import { useToast } from "@/src/components/ui/use-toast";
import { currentRole } from "@/src/lib/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { User, columns } from "./columns";
import { DataTable } from "./data-table";

async function getUsers(): Promise<User[]> {
  return [
    {
      id: "9382321",
      name: "John",
      email: "john@gmail.com",
      username: "JohnDoe",
      isTwoFactorEnabled: true,
    },
  ];
}

const AdminPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN) {
    redirect("/");
  }

  const data = await getUsers();

  return (
    <div className="max-w-[1400px] px-10 container mx-auto py-20">
      <h1 className="text-3xl leading-tight font-extrabold">Admin Page</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default AdminPage;
