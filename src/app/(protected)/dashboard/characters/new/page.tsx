import { getFood } from "@/data/food";
import { getGifts } from "@/src/actions/admin";
import { getRelics } from "@/src/actions/relics";
import AddCharacterForm from "@/src/components/admin/characters/add-character-form";
import db from "@/src/lib/db";

const AddCharacterPage = async () => {
  const relics = await getRelics();
  const gifts = await getGifts();
  const food = await getFood();

  return (
    <div className="mx-auto container py-20">
      <AddCharacterForm
        Relics={relics}
        Gifts={gifts ?? []}
        Foods={food ?? []}
      />
    </div>
  );
};

export default AddCharacterPage;
