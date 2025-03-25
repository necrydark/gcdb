"use client";
import RelicTabs from "@/src/components/relics/relics-tab";
import Relics from "@/src/components/Tables/relics";
import { bossRelics } from "@/src/utils/dummy/bossRelics";
import React from "react";

function HolyRelicsPage() {
     const  bosses=["Hraesvelgr", "Eikthyrnir", "Skoll and Hati", "Nidhoggr", "Collab"]
  return (
    // <>
    //   <Relics
    //     tabCount={5}
    //     relics={bossRelics}
        // bosses={[
        //   "Hraesvelgr",
        //   "Eikthyrnir",
        //   "Skoll and Hati",
        //   "Nidhoggr",
        //   "Collab",
        // ]}
    //   />
    // </>
    <div className="pt-[7rem] p-10 container mx-auto flex max-w-5xl">
        <RelicTabs bosses={bosses} holyRelic={bossRelics}/>
    </div>
  );
}

export default HolyRelicsPage;
