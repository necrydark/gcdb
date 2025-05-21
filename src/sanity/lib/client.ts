import { createClient } from 'next-sanity'

import { apiVersion } from '../env'

export const client = createClient({
  projectId: process.env.SANIITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANIITY_STUDIO_DATASET,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
