import HomeIcon from '@termsurf/leaf/component/icon/Home'
import PencilIcon from '@termsurf/leaf/component/icon/Pencil'
import Link from 'next/link'

type ClickHandler = () => void

export function BoxedHomeIcon() {
  return (
    <Link
      href="/"
      className="flex items-center p-8 h-40"
    >
      <span className="block w-24 h-24">
        <HomeIcon hoverable />
      </span>
    </Link>
  )
}

export function BoxedPencilIcon({ href }: { href: string }) {
  return (
    <Link
      className="flex items-center p-8 h-40"
      href={href}
    >
      <span className="block w-24 h-24">
        <PencilIcon hoverable />
      </span>
    </Link>
  )
}

export function RightPencilIcon({ href }: { href: string }) {
  return (
    <div className="flex items-center h-full justify-end w-full">
      <BoxedPencilIcon href={href} />
    </div>
  )
}
