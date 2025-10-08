import RelicTabs from "@/src/components/relics/relics-tab";
import db from "@/src/lib/db";
import { currentUser } from "@/src/utils/auth";

async function HolyRelicsPage() {
  const relics = await db.holyRelic.findMany({
    include: {
      collection: true,
      characters: true,
      materials: true,
      enhanceMaterials: true,
    },
  });

  const user = await currentUser();

  const formattedRelics = relics?.map((relic) => {
    const isRelicCollected = relic.collection.some(
      (collected) => collected.userId === user?.id
    );

    return {
      ...relic,
      isCollected: isRelicCollected,
    };
  });

  return (
    <div className="pt-[7rem] p-10 h-full container mx-auto flex max-w-5xl">
      {formattedRelics.length > 0 ? (
        <RelicTabs holyRelic={JSON.parse(JSON.stringify(formattedRelics))} />
      ) : (
        <div className="flex w-full justify-center">
          <h1 className=" text-3xl font-bold">
            There are currently no relics available.
          </h1>
        </div>
      )}
    </div>
  );
}

export default HolyRelicsPage;
