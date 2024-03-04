import Table from "@/components/table";
import React from "react";

function page() {
  return (
    <div className="container mx-auto p-10 space-y-5">
      <Table
        headers={["Gear", "JP", "EN", "Set", "Set Bonus"]}
        data={["Menacing Moon", "脅威の月", "Menacing Moon", "Moon", "HP +10%"]}
      />
    </div>
  );
}

export default page;
