import AddCharacterForm from "@/src/components/admin/characters/add-character-form";
import { Button } from "@/src/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { currentRole } from "@/src/utils/auth";
import db from "@/src/lib/db";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { Character, columns } from "./columns";
import { CharacterDataTable } from "./data-table";
import { Download, Plus } from "lucide-react";

async function getCharacters(): Promise<Character[]> {
  const data = await db.character.findMany();

  return data as Character[];
}
const AdminCharactersPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN && role !== UserRole.OWNER) {
    redirect("/");
  }

  const data = await getCharacters();

  return (
    <div className="max-w-[1400px] px-10 container mx-auto py-20">
      
      <div className="flex justify-between items-center">
      <div>
      <h1 className="text-2xl font-bold tracking-tight text-white">Characters</h1>
      <p className="text-gray-500 dark:text-gray-300">Manage your characters.</p>
        </div>
        <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="dark:hover:bg-purple-950 border-purple-900 bg-purple-400 border-[2px] rounded-[5px] hover:text-white dark:bg-purple-700 transition-all duration-250 hover:bg-purple-600 ">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
        <Button size="sm" variant="outline" className="rounded-[5px] dark:hover:bg-purple-950 border-purple-900 bg-purple-400 border-[2px] hover:text-white dark:bg-purple-700 transition-all duration-250 hover:bg-purple-600" asChild>
        <Link href={"/dashboard/characters/new"} ><Plus className="mr-2 h-4 w-4"  />
        Add Characters</Link>

        </Button>

        </div>
      </div>
      <CharacterDataTable columns={columns} data={data} />
    </div>
    // <TabsContent value="addCharacter">
    //   <div className="flex justify-between items-center flex-row">
    //     <h1 className="text-3xl leading-tight font-extrabold py-5">
    //       Add Character
    //     </h1>
    //     <Button size="sm" variant="outline" asChild>
    //       <Link href={"/admin"}>Go Back</Link>
    //     </Button>
    //   </div>
    //   <AddCharacterForm />
    // </TabsContent>
    // <TabsContent value="editCharacter">
    //   <div className="flex justify-between items-center flex-row">
    //     <h1 className="text-3xl leading-tight font-extrabold py-5">
    //       Edit Character
    //     </h1>
    //     <Button size="sm" variant="outline" asChild>
    //       <Link href={"/admin"}>Go Back</Link>
    //     </Button>
    //   </div>
    //   {/* Use combobox for selecting character */}
    //   <AddCharacterForm />
    // </TabsContent>
  );
};

export default AdminCharactersPage;
