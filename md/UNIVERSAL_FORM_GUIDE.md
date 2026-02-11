# Creating New Admin Pages with UniversalForm

This guide explains how to create new admin pages using the UniversalForm system, which provides a consistent, mobile-friendly interface for managing data in your GCDB application.

## Overview

The UniversalForm system uses:
- **Wizard-style navigation** instead of tabs (better for mobile)
- **Declarative configuration** through form configs
- **Reusable components** that work with any data model
- **Built-in validation** with Zod schemas
- **Server actions** for CRUD operations

## File Structure

When creating a new admin entity (e.g., "Enhance Material"), you'll typically create these files:

```
src/
├── lib/
│   └── [entity]-form-config.ts          # Form configuration and schema
├── components/admin/[entity]/
│   ├── add-[entity]-form.tsx           # Add form component
│   ├── edit-[entity]-form.tsx          # Edit form component
│   └── view-[entity]-page.tsx          # View page component
└── lib/server-actions.ts               # Server actions (if not exists)
```

## Step 1: Create Form Configuration

Create a form configuration file that defines the structure and validation for your form.

**Example: `src/lib/enhance-material-form-config.ts`**

```typescript
import { z } from "zod";
import { TabConfig, UniversalFormProps } from "../components/ui/universal-form";

// Define your tabs and fields
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

// Create the Zod schema
export const enhanceMaterialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  imageUrl: z.string().url("Please enter a valid URL"),
  location: z.string().optional(),
});

// Function to get form props
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
        "./server-actions"
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
    submitText: enhanceMaterial?.id ? "Update Enhance Material" : "Create Enhance Material",
    onSuccess: (message) => {
      console.log("Enhance material form success:", message);
    },
    onError: (error) => {
      console.error("Enhance material form error:", error);
    },
  };
}
```

## Available Field Types

The UniversalForm supports these field types:

- **`text`** - Text input fields
- **`email`** - Email validation
- **`password`** - Password fields
- **`number`** - Numeric input
- **`url`** - URL validation
- **`textarea`** - Multi-line text
- **`select`** - Dropdown selection
- **`multiselect`** - Multiple selection with search
- **`switch`** - Toggle switches
- **`date`** - Date picker
- **`array`** - Dynamic field arrays
- **`object`** - Nested field groups
- **`custom`** - Custom rendering

## Step 2: Create Server Actions

Add CRUD operations to `src/lib/server-actions.ts`:

```typescript
// Create operation
export async function createEnhanceMaterial(
  values: any,
): Promise<{ success?: string; error?: string }> {
  try {
    await db.relicEnhanceMaterial.create({
      data: values,
    });

    revalidatePath("/dashboard/enhance-materials");
    return { success: "Enhance material created successfully" };
  } catch (error) {
    console.error("Failed to create enhance material:", error);
    return { error: `Failed to create enhance material: ${(error as Error).message}` };
  }
}

// Update operation
export async function updateEnhanceMaterial(
  id: string,
  values: any,
): Promise<{ success?: string; error?: string }> {
  try {
    await db.relicEnhanceMaterial.update({
      where: { id },
      data: values,
    });

    revalidatePath("/dashboard/enhance-materials");
    return { success: "Enhance material updated successfully" };
  } catch (error) {
    console.error("Failed to update enhance material:", error);
    return { error: `Failed to update enhance material: ${(error as Error).message}` };
  }
}

// Delete operation
export async function deleteEnhanceMaterial(
  id: string,
): Promise<{ success?: string; error?: string }> {
  try {
    await db.relicEnhanceMaterial.delete({
      where: { id },
    });

    revalidatePath("/dashboard/enhance-materials");
    return { success: "Enhance material deleted successfully" };
  } catch (error) {
    console.error("Failed to delete enhance material:", error);
    return { error: `Failed to delete enhance material: ${(error as Error).message}` };
  }
}
```

## Step 3: Create Add Form Component

**Example: `src/components/admin/enhance-material/add-enhance-material-form.tsx`**

```typescript
"use client";

import { getEnhanceMaterialFormProps } from "../../../lib/enhance-material-form-config";
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
```

## Step 4: Create Edit Form Component

**Example: `src/components/admin/enhance-material/edit-enhance-material-form.tsx`**

```typescript
"use client";

import { getEnhanceMaterialFormProps } from "../../../lib/enhance-material-form-config";
import { UniversalForm } from "../../ui/universal-form";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
            Update the details of this enhance material. Changes will affect all holy relics that use this material for enhancement.
          </p>
        </div>

        <UniversalForm {...formProps} />
      </div>
    </div>
  );
}
```

## Step 5: Advanced Field Configurations

### Array Fields

For dynamic lists of fields:

```typescript
stats: {
  key: "stats",
  name: "stats",
  type: "array",
  label: "Character Stats",
  required: true,
  minItems: 1,
  maxItems: 3,
  arrayConfig: {
    addButtonLabel: "Add Stat Level",
    fields: {
      level: {
        key: "level",
        name: "level",
        type: "select",
        label: "Stat Level",
        required: true,
        options: statLevelOptions,
      },
      attack: {
        key: "attack",
        name: "attack",
        type: "number",
        label: "Attack",
        required: true,
        placeholder: "500",
      },
    },
  },
}
```

### Select with Data Sources

For fields that use dynamic data:

```typescript
associatedCharacterId: {
  key: "associatedCharacterId",
  name: "associatedCharacterId",
  type: "select",
  label: "Associated Character",
  required: true,
  options: [], // This will be populated dynamically
  dataSource: "characters", // References dataSources in form props
}
```

### Conditional Fields

For fields that show/hide based on other values:

```typescript
conditionalField: {
  key: "conditionalField",
  name: "conditionalField",
  type: "conditional",
  label: "Conditional Field",
  conditionalConfig: {
    triggerField: "showAdvanced",
    condition: (value) => value === true,
    fields: {
      advancedOption: {
        key: "advancedOption",
        name: "advancedOption",
        type: "text",
        label: "Advanced Option",
        required: false,
      },
    },
  },
}
```

## Step 6: Routing

Create the appropriate Next.js routes in your app directory:

```
app/
└── (protected)/dashboard/[entity]/
    ├── page.tsx                    # List view
    ├── new/
    │   └── page.tsx                # Add form
    └── [id]/
        └── edit/
            └── page.tsx            # Edit form
```

## Best Practices

1. **Consistent Naming**: Use consistent naming patterns for your entities
2. **Validation**: Always include proper validation with meaningful error messages
3. **Mobile-First**: Design forms with mobile devices in mind (the wizard approach helps)
4. **Data Sources**: Use data sources for dynamic dropdowns to keep forms flexible
5. **Error Handling**: Provide clear error messages and loading states
6. **Revalidation**: Always revalidate paths after CRUD operations

## Styling

The UniversalForm uses Tailwind CSS classes and integrates with your existing design system. Custom styling can be applied through the `className` prop on field configurations.

## Testing

Test your forms with:
- Empty submissions
- Invalid data
- Large datasets
- Mobile devices
- Different screen sizes

This system provides a robust foundation for creating consistent, user-friendly admin interfaces while maintaining code reusability and maintainability.