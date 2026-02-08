import { Media } from '@/payload-types'

export interface GalleryItem {
  image: number | Media
  id?: string | null
}
