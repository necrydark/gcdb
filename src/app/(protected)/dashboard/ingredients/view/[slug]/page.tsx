import { getCharacters } from "@/data/character";
import { getFoodById, getIngredientById, getIngredients } from "@/data/food";
import ViewFoodPage from "@/src/components/admin/food/view-food-page";
import ViewIngredientPage from "@/src/components/admin/ingredients/view-ingredient-page";
import { AdminViewLayout } from "@/src/components/admin/shared/admin-view-layout";
import db from "@/src/lib/db";

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
        <AdminViewLayout
            title="Ingredient Details"
            description="View ingredient information and related data"
        >
            <ViewIngredientPage foodIngredients={existingIngredients} characters={characters} />
        </AdminViewLayout>
    )
}