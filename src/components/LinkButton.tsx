import Link from 'next/link'
import type { Url } from 'next/dist/shared/lib/router/router'
interface Props {
  href: Url
}

export default function LinkButton({ href }: Props) {
  return <Link href={href} className="p-2 rounded text-white bg-blue-500"></Link>
}
