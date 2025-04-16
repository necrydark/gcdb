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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { getUserGrowthStats } from "@/src/actions/get-user-stats";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

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


  
  const data = await getUserGrowthStats();
  // const data = await getUsers();
  const count = await getUserCount();
  const charCount = await getCharacterCount();
  const relicCount = await getRelicCount();
  const materialCount = await getMaterialCount();


  return (
    <div className="max-w-[1400px] text-white px-10 container mx-auto py-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl leading-tight font-extrabold pb-5">
          Dashboard
        </h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className=" bg-white rounded-lg shadow-sm">
      <CardHeader>
        <CardTitle>
        User Growth
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{data.currentMonthUsers}</p>


      
      {data.percentageChange !== null && (
        <div className="mt-2 flex items-center">
          {data.percentageChange > 0 ? (
            <>
              <ArrowUpIcon className="h-4 w-4 text-green-500" />
              <span className=" text-xs text-muted-foreground font-medium ">
                {data.percentageChange}% from last month
              </span>
            </>
          ) : data.percentageChange < 0 ? (
            <>
              <ArrowDownIcon className="h-4 w-4 text-red-500" />
              <span className=" text-xs text-muted-foreground text-red-500">
                {Math.abs(data.percentageChange)}% from last month
              </span>
            </>
          ) : (
            <span className=" text-xs text-muted-foreground text-gray-500">
              No change from last month
            </span>
          )}
        </div>
      )}
      </CardContent>

    </Card>
        {/* <Card>
          <CardHeader>
            <CardTitle>Total Users:</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{count}</p>
          </CardContent>
        </Card> */}
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">Total Characters:</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{charCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">Total Relics:</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{relicCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">Total Materials:</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{materialCount}</p>
          </CardContent>
        </Card>
      </div>
      {/* <DataTable columns={columns} data={data} /> */}
    </div>
  );
};

export default AdminPage;
