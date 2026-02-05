import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import './styles.css'

import PostGrid from '@/components/PostGrid'
const headers = await getHeaders()
const payloadConfig = await config
const payload = await getPayload({ config: payloadConfig })
const { user } = await payload.auth({ headers })

async function getPosts() {
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

export default async function HomePage() {
  let posts = await getPosts()

  return (
    <>
      {posts.totalDocs == 0 ? <>Nenalezeny žádné příspěvky</> : <PostGrid paginatedDocs={posts} />}
    </>
  )
}
