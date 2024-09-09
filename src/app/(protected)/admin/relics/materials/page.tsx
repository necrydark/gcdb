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
import { Material, columns } from "./columns";
import { MaterialDataTable } from "./data-table";

async function getRelics(): Promise<Material[]> {
  const data = await db.materials.findMany();

  return data as Material[];
}

const AdminMaterialsPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN && role !== UserRole.OWNER) {
    redirect("/");
  }

  const data = await getRelics();

  return (
    <div className="max-w-[1400px] px-10 container mx-auto py-20">
      <div className="flex flex-row gap-5 items-center">
        <Button size="sm" variant="outline" asChild>
          <Link href={"/admin/relics/materials/add"}>Add Materials</Link>
        </Button>
      </div>
      <div className="flex justify-between items-center flex-row">
        <h1 className="text-3xl leading-tight font-extrabold py-5">
          Materials Page
        </h1>
        <Button size="sm" variant="outline" asChild>
          <Link href={"/admin/relics"}>Go Back</Link>
        </Button>
      </div>
      <MaterialDataTable columns={columns} data={data} />
    </div>
  );
};

export default AdminMaterialsPage;
