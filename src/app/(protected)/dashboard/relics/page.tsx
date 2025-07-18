import { Button } from "@/src/components/ui/button";
import { currentRole } from "@/src/utils/auth";
import db from "@/src/lib/db";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { HolyRelic, columns } from "./columns";
import { RelicDataTable } from "./data-table";
import { Download, Plus } from "lucide-react";
import ExportButton from "./export-button";

async function getRelics(): Promise<HolyRelic[]> {
  const data = await db.holyRelic.findMany();

  return data as HolyRelic[];
}

const AdminRelicsPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN && role !== UserRole.OWNER) {
    redirect("/");
  }

  const data = await getRelics();

  return (
    <div className=" px-10 container mx-auto py-20">
      
      <div className="flex justify-between items-center">
      <div>
      <h1 className="text-2xl font-bold tracking-tight text-white">Relics</h1>
      <p className="text-gray-500 dark:text-gray-300">Manage your Relics.</p>
        </div>
        <div className="flex items-center gap-2">
        <ExportButton data={data} />
        <Button size="sm" variant="outline" className="rounded-[5px] dark:hover:bg-purple-950 border-purple-900 bg-purple-400 border-[2px] hover:text-white dark:bg-purple-700 transition-all duration-250 hover:bg-purple-600" asChild>
        <Link href={"/dashboard/relics/new"} ><Plus className="mr-2 h-4 w-4"  />
        Add Relic</Link>

        </Button>

        </div>
      </div>
      <RelicDataTable columns={columns} data={data} />
    </div>
  );
};

export default AdminRelicsPage;
