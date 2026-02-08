import FoodTabs from "@/src/components/food/food-tabs";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/src/components/ui/empty";
import db from "@/src/lib/db";
import { Button } from "@/src/components/ui/button";
import { ForkKnifeCrossedIcon } from "lucide-react";

// cooking page
async function CookingPage() {
  const food = await db.food.findMany({
    include: {
      Character: true,
      ingredients: true,
    },
  });

  const formattedFood = food?.map((food) => {
    return {
      ...food,
      affinity: food.affinityValue,
    };
  });

  return (
    <div className="pt-[7rem] p-10 h-full container mx-auto flex max-w-5xl">
      {formattedFood.length > 0 ? (
        <FoodTabs food={JSON.parse(JSON.stringify(formattedFood))} />
      ) : (
        <div className="flex w-full justify-center">
            <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia className="bg-primary/50" variant="icon">
          <ForkKnifeCrossedIcon />
        </EmptyMedia>
        <EmptyTitle>No Food Available</EmptyTitle>
        <EmptyDescription>
          There are currently no food options available.
        </EmptyDescription>
      </EmptyHeader>
 
    </Empty>
        </div>
      )}
    </div>
  );
}

export default CookingPage;
