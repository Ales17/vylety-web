import { getPayload } from 'payload'
import config from '@/payload.config'

const payloadConfig = await config
const payload = await getPayload({ config: payloadConfig })

export async function getPosts() {
  const result = await payload.find({
    collection: 'posts', // required
    page: 1,
    limit: 10,
    pagination: false, // If you want to disable pagination count, etc.
    where: {}, // pass a `where` query here
    sort: '-title',
  })
  return result
}
