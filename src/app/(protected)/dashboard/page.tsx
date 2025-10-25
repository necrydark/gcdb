import { currentRole } from "@/src/utils/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
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
import { getFoodCount, getIngredientCount } from "@/data/food";




const AdminPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN && role !== UserRole.OWNER ) {
    redirect("/");
  }
  
  const data = await getUserGrowthStats();
  const charCount = await getCharacterCount();
  const relicCount = await getRelicCount();
  const materialCount = await getMaterialCount();
  const foodCount = await getFoodCount();
  const ingredientCount = await getIngredientCount()


  return (
    <div className=" text-white px-10 container mx-auto py-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl leading-tight font-extrabold pb-5">
          Dashboard
        </h1>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
      <Card className="bg-purple-500 dark:bg-purple-900 border-0 rounded-lg shadow-[4px_4px_11px_2px_rgba(128,0,128,1)]">
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
        <Card className="bg-purple-500 dark:bg-purple-900 rounded-lg border-0 shadow-[4px_4px_11px_2px_rgba(128,0,128,1)]">
          <CardHeader>
            <CardTitle className="font-bold">Total Characters</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{charCount ?? 0}</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-500 dark:bg-purple-900 rounded-lg border-0 shadow-[4px_4px_11px_2px_rgba(128,0,128,1)]">
          <CardHeader>
            <CardTitle className="font-bold">Total Relics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{relicCount ?? 0}</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-500 dark:bg-purple-900 rounded-lg  border-0 shadow-[4px_4px_11px_2px_rgba(128,0,128,1)]">
          <CardHeader>
            <CardTitle className="font-bold">Total Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{materialCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-500 dark:bg-purple-900 rounded-lg border-0 shadow-[4px_4px_11px_2px_rgba(128,0,128,1)]">
          <CardHeader>
            <CardTitle className="font-bold">Total Food</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{foodCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-500 dark:bg-purple-900 rounded-lg border-0 shadow-[4px_4px_11px_2px_rgba(128,0,128,1)]">
          <CardHeader>
            <CardTitle className="font-bold">Total Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{ingredientCount}</p>
          </CardContent>
        </Card>
      </div>
      {/* <DataTable columns={columns} data={data} /> */}
    </div>
  );
};

export default AdminPage;
