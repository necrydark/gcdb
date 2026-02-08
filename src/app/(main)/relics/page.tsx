import RelicTabs from "@/src/components/relics/relics-tab";
import db from "@/src/lib/db";
import { currentUser } from "@/src/utils/auth";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/src/components/ui/empty";
import { Book } from "lucide-react";

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
             <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia className="bg-primary/50" variant="icon">
          <Book />
        </EmptyMedia>
        <EmptyTitle>No Relics Available</EmptyTitle>
        <EmptyDescription>
          There are currently no relics available.
        </EmptyDescription>
      </EmptyHeader>
 
    </Empty>
        </div>
      )}
    </div>
  );
}

export default HolyRelicsPage;
