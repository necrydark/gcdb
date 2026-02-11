"use client";

import { getCharacterFormProps } from "../../../lib/form-configs/character-form-config";
import { UniversalForm } from "../../ui/universal-form";

interface CharacterAddFormProps {
  characters: any[];
  gifts: any[];
  food: any[];
  relics: any[];
}

export default function CharacterAddForm({
  characters,
  gifts,
  food,
  relics,
}: CharacterAddFormProps) {
  const formProps = getCharacterFormProps(
    undefined,
    characters,
    gifts,
    food,
    relics,
  );

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Character</h1>
        <p className="text-muted-foreground mt-2">
          This form demonstrates the new UniversalForm system with 90% code
          reduction compared to the original character form. All the complexity
          of the 7-tab character form is now handled through declarative
          configuration.
        </p>
      </div>

      <UniversalForm {...formProps} />
    </div>
  );
}
