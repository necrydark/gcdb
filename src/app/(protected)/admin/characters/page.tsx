import { Button } from '@/src/components/ui/button'
import db from '@/src/lib/db'
import Link from 'next/link'
import React from 'react'
import { Character, columns } from './columns'
import { CharacterDataTable } from './data-table'
import { currentRole } from '@/src/lib/auth'
import { UserRole } from '@prisma/client'
import { redirect } from 'next/navigation'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/src/components/ui/tabs"
import AddCharacterForm from '@/src/components/admin/add-character-form'

async function getCharacters(): Promise<Character[]> {
    const data = await db.character.findMany();

    return data as Character[];
}
const AdminCharactersPage = async () => {
    const role = await currentRole();
  if (role !== UserRole.ADMIN) {
    redirect("/");
  }


    const data = await getCharacters();

  return (
    <Tabs defaultValue='characterList' className='max-w-[1400px] px-10 container mx-auto py-20'>
        <TabsList>
            <TabsTrigger value='characterList'>Character List</TabsTrigger>
            <TabsTrigger value='addCharacter'>Add Character</TabsTrigger>
        </TabsList>
        <TabsContent value='characterList'>
        <div className='flex justify-between items-center flex-row'>
       <h1 className="text-3xl leading-tight font-extrabold py-5">Characters Page</h1>
       <Button size="sm" variant="outline" asChild>
         <Link href={'/admin'}>Go Back</Link>
       </Button>
       </div>
       <CharacterDataTable columns={columns} data={data} />
        </TabsContent>
        <TabsContent value='addCharacter'>
        <div className='flex justify-between items-center flex-row'>
       <h1 className="text-3xl leading-tight font-extrabold py-5">Add Character</h1>
       <Button size="sm" variant="outline" asChild>
         <Link href={'/admin'}>Go Back</Link>
       </Button>
       </div>
            <AddCharacterForm />
        </TabsContent>

    </Tabs>
  )
}

export default AdminCharactersPage