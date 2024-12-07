import T from '@termsurf/leaf/component/Text'
import { useDarkMode } from '@termsurf/leaf/hook/useDarkMode'
import clsx from 'clsx'
import Link from 'next/link'
import React, { useState } from 'react'

export type BoxLinkInput = {
  title: React.ReactNode
  description?: React.ReactNode
  href?: string
  className?: string
  tooltipId?: string
}

export default function BoxLink({
  title,
  description,
  href,
  className,
  tooltipId,
}: BoxLinkInput) {
  const [loading, setLoading] = useState<React.ReactNode>()
  const isDark = useDarkMode() === 'dark'

  const handleClick = () => {
    // setLoading(
    //   <Dots
    //     className={clsx(isDark ? undefined : 'invert', 'opacity-70')}
    //   />,
    // )
  }

  if (!href) {
    return (
      <span
        data-tooltip-id={tooltipId}
        data-tooltip-delay-show={1000}
        className={clsx(
          'shadow-xl flex flex-col gap-16 transition-all duration-200 text-left px-16 py-8 bg-zinc-100 dark:bg-zinc-900 h-full rounded-sm w-full',
          className,
        )}
      >
        <T className="font-bold inline-block w-full break-all">
          {title}
        </T>
        {description && (
          <T className="mb-4 inline-block">{description}</T>
        )}
      </span>
    )
  }

  return (
    <Link
      data-tooltip-id={tooltipId}
      data-tooltip-delay-show={1000}
      className={clsx(
        'shadow-xl flex flex-col gap-16 hover:shadow-medium transition-all duration-200 text-left px-16 py-8 bg-zinc-100 dark:bg-zinc-900 h-full leading-content items-center rounded-sm w-full',
        className,
      )}
      href={`${href}`}
      onClick={handleClick}
    >
      <T className="font-bold block w-full">{title}</T>
      {loading
        ? loading
        : description && (
            <T className="mb-4 block w-full">{description}</T>
          )}
    </Link>
  )
}
