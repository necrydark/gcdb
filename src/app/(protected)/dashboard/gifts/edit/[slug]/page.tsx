import { getIngredientById } from "@/data/food";
import { getGiftById } from "@/src/actions/admin";
import EditGiftForm from "@/src/components/admin/gifts/edit-gift-form";
import EditIngredientForm from "@/src/components/admin/ingredients/edit-ingredient-form";

type Params = Promise<{slug: string}>


async function EditIngredientPage({params}: { params: Params}) {
    const { slug } = await params;
    const gift = await getGiftById(slug as string);

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