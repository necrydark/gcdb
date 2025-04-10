import { getCharacters } from "@/data/character";
import { getMaterials, getRelicById } from "@/data/relics";
import EditMaterialForm from "@/src/components/admin/edit-material-form";
import EditRelicForm from "@/src/components/admin/edit-relic-form";
import db from "@/src/lib/db";

async function EditRelicPage({ params }: { params: { slug: string } }) {
  const relic = await getRelicById(params.slug);
  const materials = await getMaterials();
  const characters = await getCharacters();
  const existingMaterials = await db.holyRelic.findUnique({
    where: { id: params.slug },
    include: {
      materials: true,
      characters: true
    }
  });

  if(!existingMaterials) {
    return <p>Material Not Found</p>
  }

  if (!relic) {
    return <p>Relic Not Found.</p>;
  }



  return (
    <div className="container mx-auto py-10 max-w-[1400px]">
      <div>
        <EditRelicForm materials={materials} characters={characters} relic={relic} relicMaterials={existingMaterials} />
      </div>
    </div>
  );
}

export default EditRelicPage;
