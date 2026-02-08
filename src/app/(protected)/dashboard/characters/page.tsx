import { currentRole } from "@/src/utils/auth";
import { getPaginatedData } from "@/src/lib/admin-queries";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { CharactersPageClient } from "./characters-client";
import db from "@/src/lib/db";

async function getCharacters() {
  const { data } = await getPaginatedData({
    model: db.character,
    select: {
      id: true,
      name: true,
      slug: true,
      jpName: true,
      rarity: true,
      attribute: true,
      race: true,
    },
  });

  return data;
}

const AdminCharactersPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN && role !== UserRole.OWNER) {
    redirect("/");
  }

  const data = await getCharacters();

  return <CharactersPageClient data={data} />;
};

export default AdminCharactersPage;
