import { getEnhanceMaterialById, getMaterialById } from "@/data/relics";
import EditEnhanceMaterialForm from "@/src/components/admin/enhance-material/edit-enhance-material-form";


type Params = Promise<{slug: string}>

async function EditMaterialPage({ params }: { params: Params}) {
  const { slug } = await params;
  const material = await getEnhanceMaterialById(slug as string);



  if (!material) {
    return <p>Material Not Found.</p>;
  }

  return (
    <div className="container mx-auto py-10  px-4">
      <div>
        <EditEnhanceMaterialForm materialsEdit={material} />
      </div>
    </div>
  );
}

export default EditMaterialPage;
