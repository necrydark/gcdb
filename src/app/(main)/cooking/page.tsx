import FoodTabs from "@/src/components/food/food-tabs";
import db from "@/src/lib/db";

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
          <h1 className=" text-3xl font-bold">
            There is currently no food available.
          </h1>
        </div>
      )}
    </div>
  );
}

export default CookingPage;
