"use client";

import { Button } from "@/src/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getEnhanceMaterialFormProps } from "../../../lib/form-configs/enhance-material-form-config";
import { UniversalForm } from "../../ui/universal-form";

interface EnhanceMaterialEditFormProps {
  enhanceMaterial: any;
  holyRelics?: any[];
}

export default function EnhanceMaterialEditForm({
  enhanceMaterial,
  holyRelics,
}: EnhanceMaterialEditFormProps) {
  const formProps = getEnhanceMaterialFormProps(enhanceMaterial, holyRelics);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex justify-between flex-row items-center pb-5 gap-5">
        <div className="flex flex-row gap-2 items-center">
          <Button
            variant="outline"
            size="icon"
            className="dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px] hover:text-white dark:bg-purple-700 transition-all duration-250"
            asChild
          >
            <Link href={"/dashboard/enhance-materials"}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div className="flex flex-col">
            <h1 className="text-2xl leading-tight font-bold text-white">
              Edit Enhance Material
            </h1>
            <span className="text-gray-500 dark:text-gray-300">
              Update info for {enhanceMaterial.name}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <div className="mb-8">
          <p className="text-muted-foreground mt-2">
            Update the details of this enhance material. Changes will affect all
            holy relics that use this material for enhancement.
          </p>
        </div>

        <UniversalForm {...formProps} />
      </div>
    </div>
  );
}
