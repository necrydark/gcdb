import {
  TabConfig,
  UniversalFormProps,
} from "@/src/components/ui/universal-form";
import { z } from "zod";

// Tab configuration for enhance material form
export const enhanceMaterialTabs: TabConfig[] = [
  {
    id: "basic",
    label: "Basic Information",
    description: "Core enhance material details",
    columns: 2,
    fields: {
      name: {
        name: "name",
        key: "name",
        type: "text",
        label: "Enhance Material Name",
        required: true,
        placeholder: "Enter enhance material name",
        validation: z.string().min(1, "Name is required"),
      },
      imageUrl: {
        name: "imageUrl",
        key: "imageUrl",
        type: "url",
        label: "Image URL",
        required: true,
        placeholder: "https://example.com/material.png",
        validation: z.string().url("Please enter a valid URL"),
      },
      location: {
        name: "location",
        key: "location",
        type: "text",
        label: "Location",
        required: false,
        placeholder: "Where to find this material",
        validation: z.string().optional(),
      },
    },
  },
];

// Zod schema for enhance material
export const enhanceMaterialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  imageUrl: z.string().url("Please enter a valid URL"),
  location: z.string().optional(),
});

// Function to get enhance material form props
export function getEnhanceMaterialFormProps(
  enhanceMaterial?: any,
  allHolyRelics?: any[],
): UniversalFormProps<typeof enhanceMaterialSchema> {
  return {
    schema: enhanceMaterialSchema,
    defaultValues: enhanceMaterial || {
      name: "",
      imageUrl: "",
      location: "",
    },
    action: async (values) => {
      const { createEnhanceMaterial, updateEnhanceMaterial } = await import(
        "../server-actions"
      );

      if (enhanceMaterial?.id) {
        return await updateEnhanceMaterial(enhanceMaterial.id, values);
      } else {
        return await createEnhanceMaterial(values);
      }
    },
    tabs: enhanceMaterialTabs,
    layout: "enhance-material",
    multiColumn: false,
    submitText: enhanceMaterial?.id
      ? "Update Enhance Material"
      : "Create Enhance Material",
    onSuccess: (message) => {
      console.log("Enhance material form success:", message);
    },
    onError: (error) => {
      console.error("Enhance material form error:", error);
    },
  };
}
