import { Post } from '@/payload-types'
import RichTextDefault from './RichTextDefault'

interface Props {
  post: Post
}
export default function SinglePost({ post }: Props) {
  return (
    <div>
      <div>{post.title}</div>
      <div>{post.tripLength} km</div>
      <div>Trasa: {post.mapsLink}</div>
      <div>Datum: {post.eventDate}</div>
      {!post.content ? '' : <RichTextDefault data={post.content} />}
      {JSON.stringify(post)}
    </div>
  )
}
