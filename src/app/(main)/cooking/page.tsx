import FoodTabs from "@/src/components/food/food-tabs";
import db from "@/src/lib/db";
import { Meals } from "@/src/utils/dummy/townMeals";

// cooking page
async function CookingPage() {

  const food = await db.food.findMany({
    include: {
      Character: true,
      ingredients: true,
    }
  })

  


    const formattedFood = food?.map(food => {
      return { 
        ...food,
        affinity: food.affinityValue
       };
    })

    
  return (

      <div className="pt-[7rem] p-10 h-full container mx-auto flex max-w-5xl">
      <FoodTabs  food={JSON.parse(JSON.stringify(formattedFood))}/>
  </div>
  );
}

export default CookingPage;
