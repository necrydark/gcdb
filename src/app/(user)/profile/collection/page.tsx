import { getCharacterCount } from "@/data/character";
import { getRelicCount } from "@/data/relics";
import { CharacterForTabs, CollectionTabs, HolyRelicWithIncludes } from "@/src/components/profile/collection-tabs";
import db from "@/src/lib/db";
import { currentUser } from "@/src/utils/auth";

async function CollectionPage() {

  const user = await currentUser();

  if(!user) {
    return <div> You are not logged in.</div>
  }

  const res = await db.collection.findMany({
    where: {
      userId: user.id
    },
    select: {
      character: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
          rarity: true,
          slug: true,
          collection: true,
        }
      }
    }
  })

  const relics = await db.collection.findMany({
    where: {
      userId: user.id
    },
    select: {
      relic: {
        include: {
          materials: true,
          characters: true,
        },
      
      }
    }
  })

  const allRelics = await getRelicCount();
  const allCharacters = await getCharacterCount();

  if(!res) {
    return <div className="min-h-screen flex justify-center items-center  pt-[10rem]">
      <h1 className="text-3xl font-extrabold text-center tracking-tight mt-6">You need to add a character or relic to your collection </h1>
    </div>
  }

  const formattedCharacters: CharacterForTabs[] = res
  ?.map(item => {
    if (item && item.character) {
      return {
        id: item.character.id,
        name: item.character.name,
        slug: item.character.slug,
        rarity: item.character.rarity, // Ensure type matches Rarity
        isCollected: item.character.collection, // This should match the array type
        imageUrl: item.character.imageUrl
      };
    }
    return null;
  })
  .filter(Boolean) as CharacterForTabs[];

  const formattedRelics: HolyRelicWithIncludes[] = relics
    ?.map(item => item.relic) // Extract the nested 'relic' object
    .filter(Boolean) as HolyRelicWithIncludes[];

    

  return (
    <div className="min-h-screen pt-[10rem]">
      <section className="container mx-auto flex flex-col max-w-5xl px-4">
      <CollectionTabs characters={formattedCharacters ?? []} relics={formattedRelics ?? []} relicCount={allRelics || 0} characterCount={allCharacters || 0} />
  
    </section>
    </div>
  );
}

export default CollectionPage;


