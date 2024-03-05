import Table from "@/components/table";
import React from "react";

function page() {

  const gears = [
    {
      gear: "Menacing Moon",
      name: "Menacing Moon",
      jpName: "脅威の月",
      set: "Moon",
      setBonus: "HP +10%",
    },
    {
      gear: "Menacing Moon",
      name: "Menacing Moon",
      jpName: "脅威の月",
      set: "Moon",
      setBonus: "HP +10%",
    },
  ]
  return (
    <div className="container mx-auto p-10 space-y-5">
      <Table
        headers={["Gear", "JP", "EN", "Set", "Set Bonus"]}
        data={gears}
      />
    </div>
  );
}

export default page;
