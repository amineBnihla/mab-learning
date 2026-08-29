function requiredEnvironmentValue(value: string | undefined, name: string) {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }

  return value
}

export const projectId = requiredEnvironmentValue(
  process.env.SANITY_STUDIO_PROJECT_ID,
  'SANITY_STUDIO_PROJECT_ID',
)

export const dataset = requiredEnvironmentValue(
  process.env.SANITY_STUDIO_DATASET,
  'SANITY_STUDIO_DATASET',
)

export const apiVersion = '2026-08-29'
