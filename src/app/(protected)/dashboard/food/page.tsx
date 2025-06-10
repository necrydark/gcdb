import { Button } from "@/src/components/ui/button";
import { currentRole } from "@/src/utils/auth";
import db from "@/src/lib/db";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { Foods, columns } from "./columns";
import { FoodDataTable } from "./data-table";
import {  Plus } from "lucide-react";
import ExportButton from "./export-button";
import { getFoods } from "@/data/food";


const AdminFoodPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN && role !== UserRole.OWNER) {
    redirect("/");
  }

  const data = await getFoods();

  if(!data) {
    return null;
  }

  return (
    <div className=" px-10 container flex flex-col gap-6 mx-auto py-4">
    
      <div className="flex justify-between items-center">
      <div>
      <h1 className="text-2xl font-bold tracking-tight text-white">Food</h1>
      <p className="text-gray-500 dark:text-gray-300">Manage your inventory of Food and resources</p>
        </div>
        <div className="flex items-center gap-2">
        <ExportButton data={data} />
        <Button size="sm" variant="outline" className="rounded-[5px] dark:hover:bg-purple-950 border-purple-900 bg-purple-400 border-[2px] hover:text-white dark:bg-purple-700 transition-all duration-250 hover:bg-purple-600" asChild>
        <Link href={"/dashboard/food/new"} ><Plus className="mr-2 h-4 w-4"  />
        Add Food</Link>

        </Button>

        </div>
      </div>
      <FoodDataTable columns={columns} data={data} />
    </div>
  );
};

export default AdminFoodPage;
