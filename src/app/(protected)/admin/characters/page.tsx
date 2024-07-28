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
import { Character, columns } from "./columns";
import { CharacterDataTable } from "./data-table";

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
      <div className="flex flex-row gap-5 items-center">
        <Button size="sm" variant="outline" asChild>
          <Link href={"/admin/characters/add"}>Add Character</Link>
        </Button>
      </div>
      <div className="flex justify-between items-center flex-row">
        <h1 className="text-3xl leading-tight font-extrabold py-5">
          Characters Page
        </h1>
        <Button size="sm" variant="outline" asChild>
          <Link href={"/admin"}>Go Back</Link>
        </Button>
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
