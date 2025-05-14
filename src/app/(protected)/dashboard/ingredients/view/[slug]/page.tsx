import { getCharacters } from "@/data/character";
import { getFoodById, getIngredientById, getIngredients } from "@/data/food";
import ViewFoodPage from "@/src/components/admin/food/view-food-page";
import ViewIngredientPage from "@/src/components/admin/ingredients/view-ingredient-page";
import db from "@/src/lib/db";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

type Params = Promise<{slug: string}>


export default async function FoodViewPage({ params}: { params: Params}) {

    const { slug } = await params;
    const ingredient = await getIngredientById(slug as string);
    const ingredients = await getIngredients();
    const characters = await getCharacters();
    const existingIngredients = await db.ingredient.findUnique({
        where: { id: slug},
        include: {
            foods: true,
        }
    })

    if(!existingIngredients) {
        return <p>Ingredients not found.</p>
    }

    if(!ingredient) {
        return <p>Ingredient not found.</p>
    }

    return (
        <div className="container mx-auto py-10 h-full">
            <div>
            <Suspense fallback={<div className="flex justify-center items-center text-3xl flex-row gap-2 h-full text-white">Loading Data...<Loader2 className="animate-spin h-6 w-6" /></div>}>
                    <ViewIngredientPage  foodIngredients={existingIngredients} characters={characters} />
            </Suspense>
                
            </div>
        </div>
    )
}