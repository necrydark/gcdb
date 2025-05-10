import { getCharacters } from "@/data/character";
import { getFoodById, getIngredients } from "@/data/food";
import ViewFoodPage from "@/src/components/admin/food/view-food-page";
import db from "@/src/lib/db";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default async function FoodViewPage({ params}: { params: { slug: string}}) {
    const food = await getFoodById(params.slug as string);
    const ingredients = await getIngredients();
    const characters = await getCharacters();
    const existingIngredients = await db.food.findUnique({
        where: { id: params.slug},
        include: {
            ingredients: true
        }
    })

    if(!existingIngredients) {
        return <p>Ingredients not found.</p>
    }

    if(!food) {
        return <p>Food not found.</p>
    }

    return (
        <div className="container mx-auto py-10 h-full">
            <div>
            <Suspense fallback={<div className="flex justify-center items-center text-3xl flex-row gap-2 h-full text-white">Loading Data...<Loader2 className="animate-spin h-6 w-6" /></div>}>
                    <ViewFoodPage food={food} foodIngredients={existingIngredients} characters={characters} ingredients={ingredients} />
            </Suspense>
                
            </div>
        </div>
    )
}