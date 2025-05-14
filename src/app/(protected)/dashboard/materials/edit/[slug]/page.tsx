import { getMaterialById } from "@/data/relics";
import EditMaterialForm from "@/src/components/admin/materials/edit-material-form";


type Params = Promise<{slug: string}>

async function EditMaterialPage({ params }: { params: Params}) {
  const { slug } = await params;
  const material = await getMaterialById(slug as string);



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
