import { getPayload } from 'payload'
import config from '@/payload.config'

const payloadConfig = await config
const payload = await getPayload({ config: payloadConfig })

export async function getPosts({
  limit = 10,
  page,
  isDraft = false,
}: {
  limit?: number
  page: number
  isDraft?: boolean
}) {
  const result = await payload.find({
    collection: 'posts', // required
    page: page,
    limit: limit,
    pagination: true, // If you want to disable pagination count, etc.
    where: {
      isDraft: { equals: isDraft },
    }, // pass a `where` query here
    sort: '-createdAt',
  })
  return result
}

export async function getPostById(id: string) {
  const result = await payload.findByID({
    collection: 'posts',
    id: id,
  })
  return result
}
