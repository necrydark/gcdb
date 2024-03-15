"use client";
import Cooking from "@/components/cooking";
import { Meals } from "@/utils/dummy/food";
import React, { useState } from "react";

// cooking page
function CookingPage() {
  return (
    <>
      <Cooking
        tabCount={6}
        food={Meals}
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
