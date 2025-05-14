import { getCharacters } from "@/data/character";
import { getMaterials, getRelicById } from "@/data/relics";
import React, { Suspense } from 'react'
import db from "@/src/lib/db";
import ViewRelicPage from "@/src/components/admin/relics/view-relic-page";
import { Loader2 } from "lucide-react";


type Params = Promise<{slug: string}>

export default async function RelicViewPage({params} : {params: Params}) {
    const { slug } = await params;
    const relic = await getRelicById(slug as string);
    const materials = await getMaterials();
    const characters = await getCharacters();
    const existingMaterials = await db.holyRelic.findUnique({
      where: { id: slug },
      include: {
        materials: true,
        characters: true
      }
    });

    if(!existingMaterials) {
        return <p>Material Not Found</p>
      }
    
      if (!relic) {
        return <p>Relic Not Found.</p>;
      }

  return (
    <div className="container mx-auto py-10  h-full">
        <div>
            <Suspense fallback={<div className="flex justify-center items-center text-3xl flex-row gap-2 h-full text-white">Loading Data...<Loader2 className="animate-spin h-6 w-6" /></div>}>
              <ViewRelicPage materials={materials} characters={characters} relic={relic} relicMaterials={existingMaterials} />
            </Suspense>
        </div>
    </div>
  )
}
