import { getRelics } from "@/src/actions/relics";
import RelicTabs from "@/src/components/relics/relics-tab";
import { bossRelics } from "@/src/utils/dummy/bossRelics";
import React from "react";

async function HolyRelicsPage() {
     const bosses=["Hraesvelgr", "Eikthyrnir", "Skoll and Hati", "Nidhoggr", "Collab"]
     const relics = await getRelics();

     console.log(relics)
     
     // Transform the data to match HolyRelic type
     const transformedRelics = relics.map(relic => ({
       relic: {
         name: relic.name,
         imageUrl: relic.imageUrl
       },
       effect: relic.effect,
       
       materials: relic.materials.map(material => ({
         id: material.id,
         name: material.name,
         imageUrl: material.imageUrl,
         location: material.location || undefined
       })),
       stats: {
         attack: relic.attack,
         defense: relic.defense,
         hp: relic.hp
       },
       
     }));

  return (
  
    <div className="pt-[7rem] p-10 container mx-auto flex max-w-5xl">
        <RelicTabs bosses={bosses} holyRelic={transformedRelics}/>
    </div>
  );
}

export default HolyRelicsPage;
