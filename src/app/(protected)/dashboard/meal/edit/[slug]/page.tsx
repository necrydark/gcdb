import { getMealById } from "@/data/food";
import { getMaterialById } from "@/data/relics";
import EditMaterialForm from "@/src/components/admin/materials/edit-material-form";
import EditMealForm from "@/src/components/admin/meals/edit-meals-form";

async function EditMealPage({ params }: { params: { slug: string } }) {
  const meal = await getMealById(params.slug as string);



  if (!meal) {
    return <p>Material Not Found.</p>;
  }

  return (
    <div className="container mx-auto py-10  px-4">
      <div>
        <EditMealForm meal={meal} />
      </div>
    </div>
  );
}

export default EditMealPage;
