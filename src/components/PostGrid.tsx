import { PaginatedDocs } from 'payload'
import { Post } from '@/payload-types'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import RichTextDefault from './RichTextDefault'
import LinkButton from './LinkButton'
interface Props {
  paginatedDocs: PaginatedDocs<Post>
}

export default function PostGrid(props: Props) {
  const { paginatedDocs } = props

  const docs = paginatedDocs.docs

  return (
    <div className="flex flex-col gap-2">
      {docs.map((doc) => {
        const data = doc.content as DefaultTypedEditorState
        return (
          <div key={doc.id} className="border-2 rounded border-blue-500 p-2 md:p-4">
            <h2>{doc.title}</h2>
            <RichTextDefault data={data} />
            <div>
              <LinkButton href={`/posts/${doc.id}-${doc.slug}`} label={'Detail'} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
