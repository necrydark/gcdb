"use client";
import Cooking from "@/src/components/cooking";
import FoodTabs from "@/src/components/food/food-tabs";
import { Meals } from "@/src/utils/dummy/townMeals";
import React, { useState } from "react";

// cooking page
function CookingPage() {
  const towns = [   "Vanya",
          "Dalmally",
          "Post Town Tala",
          "Vaziel",
          "Ordan Village",
          "Liones Castle",]
  return (
    // <>
    //   <Cooking
    //     tabCount={6}
    //     food={Meals}
    //     town={[
    //       "Vanya",
    //       "Dalmally",
    //       "Post Town Tala",
    //       "Vaziel",
    //       "Ordan Village",
    //       "Liones Castle",
    //     ]}
    //   />
    // </>
      <div className="pt-[7rem] p-10 container mx-auto flex max-w-5xl">
      <FoodTabs towns={towns} food={Meals}/>
  </div>
  );
}

export default CookingPage;
