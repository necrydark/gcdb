"use client";

import { getEnhanceMaterialFormProps } from "../../../lib/form-configs/enhance-material-form-config";
import { UniversalForm } from "../../ui/universal-form";

interface EnhanceMaterialAddFormProps {
  holyRelics?: any[];
}

export default function EnhanceMaterialAddForm({
  holyRelics,
}: EnhanceMaterialAddFormProps) {
  const formProps = getEnhanceMaterialFormProps(undefined, holyRelics);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Enhance Material</h1>
        <p className="text-muted-foreground mt-2">
          Create a new enhance material that can be used to upgrade holy relics.
          These materials are essential for enhancing relic stats and abilities.
        </p>
      </div>

      <UniversalForm {...formProps} />
    </div>
  );
}
