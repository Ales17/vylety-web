import { GalleryItem } from '@/types/GalleryItem'
import { Media } from '@/payload-types'
import Image from 'next/image'

interface GalleryProps {
  images: GalleryItem[] | null | undefined
}

export default function Gallery({ images }: GalleryProps) {
  // 1. Filter the items that actually have a Media object in "image"
  const validImages =
    images?.filter(
      (item): item is GalleryItem & { image: Media } =>
        typeof item.image === 'object' && item.image !== null,
    ) ?? []

  if (validImages.length === 0) {
    return <div className=" text-slate-500">Příspěvek neobsahuje fotky.</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {validImages.map((item) => {
        const img = item.image

        return (
          <div key={item.id} className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={img.url!}
              width={img.width!}
              height={img.height!}
              alt={img.alt || ''}
              className="object-cover"
            />
          </div>
        )
      })}
    </div>
  )
}
