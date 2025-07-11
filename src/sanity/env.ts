export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-05-21'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || 
  process.env.SANITY_STUDIO_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

// export const token = assertValue(
//   process.env.NEXT_PUBLIC_SANITY_USER_ADDER_TOKEN ||
//   process.env.SANITY_USER_ADDER_TOKEN,
//   'Missing environment variable: NEXT_PUBLIC_SANITY_USER_ADDER_TOKEN'
// )

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
