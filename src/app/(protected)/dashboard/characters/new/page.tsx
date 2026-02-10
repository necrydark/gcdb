import { getFood } from "@/data/food";
import { getGifts } from "@/src/actions/admin";
import { getRelics } from "@/src/actions/relics";
import { getCharacters } from "@/data/character";
import AddCharacterFormNew from "@/src/components/admin/characters/add-character-form-new";

const AddCharacterPage = async () => {
  const relics = await getRelics();
  const gifts = await getGifts();
  const food = await getFood();
  const characters = await getCharacters();

  return (
    <div className="mx-auto container py-20">
      <AddCharacterFormNew
        relics={relics ?? []}
        gifts={gifts ?? []}
        food={food ?? []}
        characters={characters ?? []}
      />
    </div>
  );
};

export default AddCharacterPage;
