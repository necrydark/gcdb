"use client";
import Relics from "@/components/Tables/relics";
import { bossRelics } from "@/utils/dummy/bossRelics";
import React from "react";

function HolyRelicsPage() {
  return (
    <>
      <Relics
        tabCount={5}
        relics={bossRelics}
        bosses={[
          "Hraesvelgr",
          "Eikthyrnir",
          "Skoll and Hati",
          "Nidhoggr",
          "Collab",
        ]}
      />
    </>
  );
}

export default HolyRelicsPage;
