"use client";
import Cooking from "@/src/components/cooking";
import { Meals } from "@/src/utils/dummy/townMeals";
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
