import {
  getCharacterById,
  getSkillRanksById,
  getSkillsById,
  getUltimateByCharacterId,
} from "@/data/character";
import EditCharacterForm from "@/src/components/admin/characters/edit-character-form";
import React from "react";

async function EditCharacterPage({ params }: { params: { slug: string } }) {
  const character = await getCharacterById(params.slug as string);
  const skills = await getSkillsById(character?.id as string);
  const skillIds = skills?.map((skill) => skill.id);
  const skillRanks = await getSkillRanksById(skillIds || []);

  const ultimate =
    (await getUltimateByCharacterId(character?.id as string)) || undefined;

  if (!character) {
    return <p>Character not found.</p>; // Redirect to 404 page if character not found.  Note: replace "/404" with your 404 page path.
  }
  return (
    <div className="container mx-auto py-10 max-w-[1400px]">
      <div>
        <EditCharacterForm
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
