import { Post } from '@/payload-types'
import RichTextDefault from './RichTextDefault'
import { MapIcon, Calendar1Icon, FootprintsIcon } from 'lucide-react'
import TripInfoItem from './TripInfoItem'
import { formatDate } from 'lib/string-methods'
import Gallery from './Gallery'
interface Props {
  post: Post
}

export default function SinglePost({ post }: Props) {
  return (
    <div className="flex flex-col gap-y-4">
      {(post.eventDate || post.tripLength || post.mapsLink) && (
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          {post.eventDate && (
            <TripInfoItem
              title="Datum akce"
              icon={<Calendar1Icon />}
              label={formatDate(post.eventDate)}
            />
          )}
          {post.tripLength && (
            <TripInfoItem
              title="Délka trasy"
              icon={<FootprintsIcon />}
              label={`${post.tripLength} km`}
            />
          )}
          {post.mapsLink && (
            <TripInfoItem
              icon={<MapIcon />}
              label={'Mapa trasy'}
              href={post.mapsLink}
              title="Otevřít trasu"
            />
          )}
        </ul>
      )}
      {post.content && <RichTextDefault data={post.content} />}
      {post.gallery && <Gallery images={post.gallery} />}
    </div>
  )
}
