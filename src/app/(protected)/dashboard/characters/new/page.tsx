import AddCharacterForm from "@/src/components/admin/characters/add-character-form";
import db from "@/src/lib/db";

const AddCharacterPage = async () => {


  return (
    <div className="mx-auto container py-20">
      <AddCharacterForm />
    </div>
  );
};

export default AddCharacterPage;
