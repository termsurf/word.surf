import { H1 } from '@termsurf/leaf/component/Content'

export default function Title({
  children,
  size,
}: {
  children: string
  size?: string
}) {
  return (
    <H1 className="flex justify-center items-start gap-8 !mb-24">
      <span className="uppercase scale-y-80 tracking-wide inline-block">
        {children}
      </span>{' '}
      {/* {size && (
        <span className="text-sm relative top-0 text-zinc-500 inline-block">
          {size}
        </span>
      )} */}
    </H1>
  )
}
