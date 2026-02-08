import { Media } from '@/payload-types'

export const isMedia = (img: number | Media | undefined | null): img is Media => {
  return typeof img === 'object' && img !== null && 'url' in img
}
