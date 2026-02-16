import React from 'react'

import { z } from 'zod'
import { headers as nextHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import PostGrid from '@/components/PostGrid'
import { getPosts } from '@/lib/PostService'

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function HomePage({ searchParams }: Props) {
  const headers = await nextHeaders()

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers, canSetHeaders: false })

  if (user == null) {
    redirect('/login')
  }

  const PageParamSchema = z.coerce.number().int().positive().default(1).catch(1)

  const pageParam = (await searchParams).page
  const currentPage = PageParamSchema.parse(pageParam)

  const posts = await getPosts({
    page: currentPage,
    limit: 1,
  })

  console.log(posts)

  return (
    <>
      {posts.totalDocs == 0 ? <>Nenalezeny žádné příspěvky</> : <PostGrid paginatedDocs={posts} />}
    </>
  )
}
