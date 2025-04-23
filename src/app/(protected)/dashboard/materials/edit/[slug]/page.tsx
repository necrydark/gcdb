import { getMaterialById } from "@/data/relics";
import EditMaterialForm from "@/src/components/admin/materials/edit-material-form";

async function EditMaterialPage({ params }: { params: { slug: string } }) {
  const material = await getMaterialById(params.slug as string);



  if (!material) {
    return <p>Material Not Found.</p>;
  }

  return (
    <div className="container mx-auto py-10  px-4">
      <div>
        <EditMaterialForm materialsEdit={material} />
      </div>
    </div>
  );
}

export default EditMaterialPage;
