import { getRelics } from "@/src/actions/relics";
import RelicTabs from "@/src/components/relics/relics-tab";
import db from "@/src/lib/db";
import { currentUser } from "@/src/utils/auth";
import React from "react";

async function HolyRelicsPage() {
    const relics = await db.holyRelic.findMany({
      include: {
        Collection: true,
        characters: true,
        materials: true,
        enhanceMaterials: true,
      }
    })

     const user = await currentUser();


     const formattedRelics = relics?.map(relic => {
      const isRelicCollected = relic.Collection.some(collected => collected.userId === user?.id);

      return {
        ...relic,
        isCollected: isRelicCollected,
      }
     })
    
  return (
  
    <div className="pt-[7rem] p-10 h-full container mx-auto flex max-w-5xl">
        <RelicTabs holyRelic={JSON.parse(JSON.stringify(formattedRelics))} 
      />
    </div>
  );
}

export default HolyRelicsPage;
