import { Button } from "@/src/components/ui/button";
import { currentRole } from "@/src/utils/auth";
import db from "@/src/lib/db";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { Ingredients, columns } from "./columns";
import { IngredientDataTable } from "./data-table";
import { Plus } from "lucide-react";
import ExportButton from "./export-button";

async function getIngredients(): Promise<Ingredients[]> {
  const data = await db.ingredient.findMany();


  return data as Ingredients[];
}

const AdminIngredientsPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN && role !== UserRole.OWNER) {
    redirect("/");
  }

  const data = await getIngredients();

  return (
    <div className=" px-10 container flex flex-col gap-6 mx-auto py-4">
    
      <div className="flex justify-between items-center">
      <div>
      <h1 className="text-2xl font-bold tracking-tight text-white">Ingredients</h1>
      <p className="text-gray-500 dark:text-gray-300">Manage your inventory of ingredients and resources</p>
        </div>
        <div className="flex items-center gap-2">
        <ExportButton data={data} />
        <Button size="sm" variant="outline" className="rounded-[5px] dark:hover:bg-purple-950 border-purple-900 bg-purple-400 border-[2px] hover:text-white dark:bg-purple-700 transition-all duration-250 hover:bg-purple-600" asChild>
        <Link href={"/dashboard/ingredients/new"} ><Plus className="mr-2 h-4 w-4"  />
        Add Ingredient</Link>

        </Button>

        </div>
      </div>
      <IngredientDataTable columns={columns} data={data} />
    </div>
  );
};

export default AdminIngredientsPage;
