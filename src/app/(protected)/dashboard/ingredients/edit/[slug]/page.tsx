import { getIngredientById } from "@/data/food";
import EditIngredientForm from "@/src/components/admin/ingredients/edit-ingredient-form";
import { AdminPageLayout } from "@/src/components/admin/shared/admin-page-layout";

type Params = Promise<{slug: string}>

async function EditIngredientPage({params}: { params: Params}) {
    const { slug } = await params;
    const ingredient = await getIngredientById(slug as string);

    if(!ingredient) {
        return <div>Ingredient not found.</div>
    }

    return (
        <AdminPageLayout 
            title="Edit Ingredient"
            description="Update ingredient information"
            backButtonHref="/dashboard/ingredients"
            backButtonLabel="Back to Ingredients"
        >
            <EditIngredientForm ingredient={ingredient} />
        </AdminPageLayout>
    )
}

export default EditIngredientPage;