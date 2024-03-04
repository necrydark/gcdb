"use client";
import Cooking from "@/components/cooking";
import React, { useState } from "react";

// cooking page
function CookingPage() {
  const [openTab, setOpenTab] = useState(1);
  return (
    <>
      <Cooking
        tabCount={6}
        town={[
          "Vanya",
          "Dalmally",
          "Post Town Tala",
          "Vaziel",
          "Ordan Village",
          "Liones Castle",
        ]}
      />
    </>
  );
}

export default CookingPage;
