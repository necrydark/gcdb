import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId: projectId,
  dataset: dataset,
  token: process.env.NEXT_PUBLIC_SANITY_USER_ADDER_TOKEN,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
