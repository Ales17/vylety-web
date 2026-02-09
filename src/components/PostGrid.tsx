import { PaginatedDocs } from 'payload'
import { Post } from '@/payload-types'
import { ArrowRightIcon } from 'lucide-react'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import RichTextDefault from './RichTextDefault'
import LinkButton from './LinkButton'
import { formatDate } from 'lib/string-methods'
import Pagination from './Pagination'
interface Props {
  paginatedDocs: PaginatedDocs<Post>
}

export default function PostGrid({ paginatedDocs }: Props) {
  const posts = paginatedDocs.docs

  return (
    <div className="flex flex-col gap-2">
      <div className="grid gap-2 md:grid-cols-2">
        {posts.map((doc) => {
          const data = doc.content as DefaultTypedEditorState
          return (
            <div
              key={doc.id}
              className="border rounded-3xl bg-white border-slate-200 p-2 md:p-4 flex flex-col gap-2"
            >
              <h2 className="text-2xl">{doc.title}</h2>
              <p title="Datum vytvoření příspěvku">{formatDate(doc.createdAt)}</p>
              <RichTextDefault className="line-clamp-2 flex-1" data={data} />
              <div>
                <LinkButton
                  href={`/posts/${doc.id}-${doc.slug}`}
                  label={'Přečíst'}
                  icon={<ArrowRightIcon />}
                />
              </div>
            </div>
          )
        })}
      </div>
      {paginatedDocs.totalPages > 1 && paginatedDocs.page && (
        <Pagination
          baseUrl={'/'}
          totalPages={paginatedDocs.totalPages}
          currentPage={paginatedDocs.page}
        />
      )}
    </div>
  )
}
