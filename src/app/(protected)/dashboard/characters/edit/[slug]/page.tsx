import {
  getCharacterById,
  getSkillRanksById,
  getSkillsById,
  getUltimateByCharacterId,
} from "@/data/character";
import EditCharacterForm from "@/src/components/admin/characters/edit-character-form";
import db from "@/src/lib/db";
import { Decimal } from "@prisma/client/runtime/library";
import React from "react";

async function getStats(slug: string) {
  const res = await db.character.findUnique({
    where: {
      id: slug
    },
    include: {
      stats: true,
      ultimate: true,
      skills: {
        select: {
          id: true, name: true, jpName: true, imageUrl: true, characterId: true,
        skillRanks: true
        }
      },
      associations: true,
      associationsWith: true,
      food: true,
      gift: true,
    },
  })

  if(!res) {
    return null;
  }

  res.stats = res.stats || [];


  return res;
}

async function EditCharacterPage({ params }: { params: { slug: string } }) {
  const character = await getCharacterById(params.slug as string);
  const skills = await getSkillsById(character?.id as string);
  const skillIds = skills?.map((skill) => skill.id);
  const skillRanks = await getSkillRanksById(skillIds || []);

  const res = await getStats(params.slug);


  const ultimate =
    (await getUltimateByCharacterId(character?.id as string)) || undefined;

  if (!character) {
    return <p>Character not found.</p>; // Redirect to 404 page if character not found.  Note: replace "/404" with your 404 page path.
  }

  if(!res) {
    return <p>Character Not Found.</p>
  }

 


  return (
    <div className="container mx-auto py-10 ">
      <div>
        <EditCharacterForm
          Character={res}
          CharacterEdit={character}
          SkillsEdit={skills ?? []}
          RanksEdit={skillRanks ?? []}
          UltimateEdit={ultimate}
        />
      </div>
    </div>
  );
}

export default EditCharacterPage;
