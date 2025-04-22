import AddRelicForm from "@/src/components/admin/relics/add-holy-relic-form";
import db from "@/src/lib/db";

async function getMaterials() {
  try {
    const materials = await db.material.findMany();
    return materials;
  } catch (err) {
    console.error(err);
  }
}

const AddRelicPage = async () => {
  const materials = await getMaterials();
  return (
    <div className=" mx-auto container py-20">
      <AddRelicForm materials={materials} />
    </div>
  );
};

export default AddRelicPage;
