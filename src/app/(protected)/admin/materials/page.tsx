import AddCharacterForm from "@/src/components/admin/add-character-form";
import { Button } from "@/src/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { currentRole } from "@/src/lib/auth";
import db from "@/src/lib/db";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { Materials, columns } from "./columns";
import { Material } from "@prisma/client";
import { MaterialDataTable } from "./data-table";
import { Plus } from "lucide-react";

async function getRelics(): Promise<Materials[]> {
  const data = await db.material.findMany();


  return data as Materials[];
}

const AdminMaterialsPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN && role !== UserRole.OWNER) {
    redirect("/");
  }

  const data = await getRelics();
  console.log(data);

  return (
    <div className="max-w-[1400px] px-10 container mx-auto py-20">
    
      <div className="flex justify-between items-center flex-row">
        <h1 className="text-3xl leading-tight font-extrabold py-5">
          Materials Page
        </h1>
        <Button size="sm" variant="outline" className="rounded-full" asChild>
        <Link href={"/admin/materials/add"}><Plus className="w-4 h-4 text-black dark:text-white"  /></Link>

        </Button>
      </div>
      <MaterialDataTable columns={columns} data={data} />
    </div>
  );
};

export default AdminMaterialsPage;
