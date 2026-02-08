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
import React from "react";


type Props = {
  title: string;
  value: number | string;
  extra?: React.ReactNode;
}


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


  const cards: Props[] = [
    {
      title: "User Growth",
      value: data.currentMonthUsers,
      extra: data.percentageChange !== null && (
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
      )
    },
     {
      title: "Total Characters",
      value: charCount ?? 0,
     },
     {
      title: "Total Relics",
      value: relicCount ?? 0
     },
     {
      title: "Total Materials",
      value: materialCount ?? 0
     },
      {
      title: "Total Food",
      value: foodCount ?? 0
     },
      {
      title: "Total Ingredients",
      value: ingredientCount ?? 0
     },
     
  ]

  return (
    <div className=" text-white px-10 container mx-auto py-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl leading-tight font-extrabold pb-5">
          Dashboard
        </h1>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.title} className="bg-gradient-to-br from-card via-card to-muted/20 border-border/50 shadow-xl rounded-lg shadow-xl">
          <CardHeader>
            <CardTitle className="font-bold">{card.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{card.value}</p>
            {card.extra}
          </CardContent>
        </Card>
      ))}
       
      </div>
      {/* <DataTable columns={columns} data={data} /> */}
    </div>
  );
};

export default AdminPage;


