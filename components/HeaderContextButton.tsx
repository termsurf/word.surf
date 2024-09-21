import { LinkButton } from '@termsurf/leaf/component/Button'

export default function HeaderContextButton({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <div className="flex justify-center p-16 pt-0">
      <LinkButton
        href={href}
        size="small"
        color="contrast"
        className="rounded-large-circle lowercase font-semibold"
      >
        {children}
      </LinkButton>
    </div>
  )
}
