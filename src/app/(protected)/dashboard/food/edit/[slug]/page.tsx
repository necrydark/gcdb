import { getFoodById, getIngredients } from "@/data/food"
import EditFoodForm from "@/src/components/admin/food/edit-food-form";
import db from "@/src/lib/db";

type Params = Promise<{slug: string}>


async function EditFoodPage({ params}: { params: Params}) {
    const { slug } = await params;
    const food = await getFoodById(slug as string)
    const ingredients = await getIngredients();
    const existingFood = await db.food.findUnique({
        where: { id: slug},
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