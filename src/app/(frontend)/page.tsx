import React from 'react'

import { headers as nextHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import './styles.css'
import PostGrid from '@/components/PostGrid'
import { getPosts } from 'lib/PostService'

export default async function HomePage() {
  const headers = await nextHeaders()

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers, canSetHeaders: false })

  if (user == null) {
    redirect('/login')
  }

  let posts = await getPosts()

  return (
    <>
      {posts.totalDocs == 0 ? <>Nenalezeny žádné příspěvky</> : <PostGrid paginatedDocs={posts} />}
    </>
  )
}
