import { getIngredientById } from "@/data/food";
import EditIngredientForm from "@/src/components/admin/ingredients/edit-ingredient-form";

async function EditIngredientPage({params}: { params: { slug: string}}) {
    const ingredient = await getIngredientById(params.slug as string);

    if(!ingredient) {
        return <div>Ingredient not found.</div>
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <div>
                <EditIngredientForm ingredient={ingredient} />
            </div>
        </div>
    )
}

export default EditIngredientPage;