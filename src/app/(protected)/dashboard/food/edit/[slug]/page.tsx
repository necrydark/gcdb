import { getFoodById, getIngredients } from "@/data/food"
import EditFoodForm from "@/src/components/admin/food/edit-food-form";
import db from "@/src/lib/db";

async function EditFoodPage({ params}: { params: {slug: string}}) {
    const food = await getFoodById(params.slug as string)
    const ingredients = await getIngredients();
    const existingFood = await db.food.findUnique({
        where: { id: params.slug},
        include: {
            ingredients: true,
        }
    })


    if(!food) {
        return <p>Food not found</p>
    }

    if(!ingredients) {
        return <p>Ingredients not found</p>
    }

    if(!existingFood) {
        return <p>Food not found.</p>
    }

    return (
        <div className="container mx-auto py-10">
            <div>
                <EditFoodForm food={food} ingredients={ingredients} foodIngredients={existingFood} />
            </div>
        </div>
    )

}

export default EditFoodPage