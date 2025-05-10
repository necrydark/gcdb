import { getIngredients } from "@/data/food";
import AddFoodForm from "@/src/components/admin/food/add-food-form";



const AddFoodPage = async () => {

    const ingredients = await getIngredients();
    return (
        <div className="mx-auto container py-20">
            {ingredients ? (
                <AddFoodForm ingredients={ingredients} />
            ) : (
                <div className="flex justify-center items-center">
                    <p className="text-xl font-semibold text-white">Loading Ingredients...</p>    
                </div>
            )}
        </div>
    )
}

export default AddFoodPage;