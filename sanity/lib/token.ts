import 'server-only'

const readToken = process.env.SANITY_API_READ_TOKEN

if (!readToken) {
  throw new Error('Missing environment variable: SANITY_API_READ_TOKEN')
}

export const token = readToken
