import { headers as nextHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { getIdFromSlug } from 'lib/string-methods'
import { getPostById } from 'lib/PostService'
import SinglePost from '@/components/SinglePost'
import PageWrapper from '@/components/PageWrapper'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: Props) {
  const headers = await nextHeaders()

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers, canSetHeaders: false })

  if (user == null) {
    redirect('/login')
  }

  const { slug } = await params

  const entityId = getIdFromSlug(slug)

  if (entityId == null) {
    return <>Neplatný odkaz</>
  }

  const post = await getPostById(entityId)

  return (
    <PageWrapper pageName={post.title}>
      <SinglePost post={post} />
    </PageWrapper>
  )
}
