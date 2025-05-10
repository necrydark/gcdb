import { getRelics } from "@/src/actions/relics";
import RelicTabs from "@/src/components/relics/relics-tab";
import React from "react";

async function HolyRelicsPage() {
     const relics = await getRelics();
    
  return (
  
    <div className="pt-[7rem] p-10 h-full container mx-auto flex max-w-5xl">
        <RelicTabs holyRelic={relics}/>
    </div>
  );
}

export default HolyRelicsPage;
