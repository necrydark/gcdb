import { getIngredientById } from "@/data/food";
import { getGiftById } from "@/src/actions/admin";
import EditGiftForm from "@/src/components/admin/gifts/edit-gift-form";
import EditIngredientForm from "@/src/components/admin/ingredients/edit-ingredient-form";

async function EditIngredientPage({params}: { params: { slug: string}}) {
    const gift = await getGiftById(params.slug as string);

    if(!gift) {
        return <div>Gift not found.</div>
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <div>
                <EditGiftForm giftsEdit={gift} />
            </div>
        </div>
    )
}

export default EditIngredientPage;