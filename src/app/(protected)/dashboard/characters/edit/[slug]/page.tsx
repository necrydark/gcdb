import {
  getCharacters,
  getSkillRanksById,
  getSkillsById,
  getUltimateByCharacterId
} from "@/data/character";
import { getFoods } from "@/data/food";
import { getGifts } from "@/src/actions/admin";
import EditCharacterForm from "@/src/components/admin/characters/edit-character-form";
import db from "@/src/lib/db";

async function getStats(slug: string) {
  const [res, friendshipLevels] = await Promise.all([
    db.character.findUnique({
      where: {
        id: slug,
      },
      include: {
        stats: true,
        ultimate: true,
        skills: {
          select: {
            id: true,
            name: true,
            jpName: true,
            imageUrl: true,
            characterId: true,
            skillRanks: true,
          },
        },
        food: true,
        gift: true,
        unity: true,
        talent: true,
        passiveSkill: true,
        combinedUltimate: true,
        characterFriendshipRewards: {
          include: {
            friendshipLevel: {
              select: {
                rewardType: true,
                id: true,
                level: true,
                requiredAffinity: true,
              }
            },
          }
        },
        associationsAsMain: true,
        associationsAsAssociated: true,
        grace: true,
      },
    }),
    db.friendshipLevel.findMany()
  ]);

  if(!res) {
    return null;
  }

  res.stats = res.stats || [];


  return {character: res, friendshipLevels};
}

// Updated type definition to match Next.js 15 expectations
type Params = Promise<{slug: string}>

export default async function EditCharacterPage({ params }: {params: Params}) {
  const { slug } = await params;



  const res = await getStats(slug);


  // console.log(JSON.stringify(res, null, 2));


  if(!res) {
    return <p className="text-center">Character Stats Not Found.</p>
  }

  const {character , friendshipLevels} = res


    // const character = await getCharacterById(slug as string);
    const skills = await getSkillsById(character?.id as string);
    const skillIds = skills?.map((skill) => skill.id);
    const skillRanks = await getSkillRanksById(skillIds || []);
    const gifts = await getGifts();
    const foods = await getFoods();

  const ultimate =
    (await getUltimateByCharacterId(character?.id as string)) || undefined;

  if (!character) {
    return <p className="text-center">Character not found.</p>;
  }


  const characters = await getCharacters();

  return (
    <div className="container mx-auto py-10">
      <div>
        <EditCharacterForm
          Character={character}
          FriendshipLevels={friendshipLevels}
          SkillsEdit={skills ?? []}
          RanksEdit={skillRanks ?? []}
          UltimateEdit={ultimate}
          Gifts={gifts ?? []}
          Foods={foods ?? []}
          Characters={characters ?? []}
        />
      </div>
    </div>
  );
}