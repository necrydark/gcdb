import AddIngredientForm from "@/src/components/admin/ingredients/add-ingredient-form"
import { AdminPageLayout } from "@/src/components/admin/shared/admin-page-layout"

const AddIngredientPage = () => {
    return (
        <AdminPageLayout 
            title="Add New Ingredient"
            description="Create a new ingredient for your inventory"
            backButtonHref="/dashboard/ingredients"
            backButtonLabel="Back to Ingredients"
        >
            <AddIngredientForm />
        </AdminPageLayout>
    )
}

export default AddIngredientPage;