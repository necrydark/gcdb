'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {asyncList} from '@sanity/sanity-plugin-async-list'
import {colorInput} from '@sanity/color-input'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'
import { getCharacters } from './data/character'

console.log(schema);

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  useCdn: false,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    colorInput(),
    asyncList({
      schemaType: "characterListItem", // Still targeting this lowest-level type
      loader: async () => {
        try {
          const res = await fetch("http://localhost:3000/api/characters");
          if (!res.ok) {
            console.error("Failed to fetch characters:", res.statusText);
            return [];
          }
          const result = await res.json();
          if (!Array.isArray(result)) {
            console.error("Expected API response to be an array.", result);
            return [];
          }
          console.log("Characters fetched for asyncList:", result);
          return result.map((char: any) => ({
              value: char.slug,
              title: char.name,
              media: char.imageUrl,
              slug: char.slug,
          }));
        } catch (err) {
          console.error("Error fetching characters for asyncList:", err);
          return [];
        }
      }
    }),
  ],
})
