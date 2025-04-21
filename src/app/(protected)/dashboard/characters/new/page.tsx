import AddCharacterForm from "@/src/components/admin/add-character-form";
import db from "@/src/lib/db";

const AddCharacterPage = async () => {

  const relics = await db.holyRelic.findMany();

  return (
    <div className="max-w-[1400px] mx-auto container py-20">
      <AddCharacterForm Relics={relics} />
    </div>
  );
};

export default AddCharacterPage;
