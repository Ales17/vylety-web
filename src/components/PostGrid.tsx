import { PaginatedDocs } from 'payload'
import { Post } from '@/payload-types'
import Link from 'next/link'
interface Props {
  paginatedDocs: PaginatedDocs<Post>
}

export default function PostGrid(props: Props) {
  const { paginatedDocs } = props

  const docs = paginatedDocs.docs

  return (
    <>
      {docs.map((doc) => {
        return (
          <div key={doc.id} className="border-2 border-amber-500">
            <h2>{doc.title}</h2>
            <Link href={'#'}>Přečíst</Link>
          </div>
        )
      })}
    </>
  )
}
