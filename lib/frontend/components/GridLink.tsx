import clsx from 'clsx'
import NextLink from 'next/link'

import T from '@termsurf/leaf/component/Text'

export type GridLinkColor = 'base'

export const GRID_LINK_COLORS: Record<
  string,
  Record<GridLinkColor | 'disabled', string | undefined>
> = {
  box: {
    disabled: 'bg-zinc-100 dark:bg-zinc-700',
    base: 'text-zinc-700 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-800 [&_span]:hover:text-violet-600 dark:[&_span]:hover:text-violet-500',
  },
  title: {
    disabled: 'text-zinc-300 dark:text-zinc-600',
    base: undefined,
  },
  description: {
    disabled: 'text-zinc-300 dark:text-zinc-600',
    base: 'text-zinc-600 dark:text-zinc-400',
  },
}

function GridLink({
  className,
  href,
  title,
  description,
  disabled = false,
  color = 'base',
}: {
  className?: string
  href: string
  title: string
  description?: string
  disabled?: boolean
  color?: GridLinkColor
}) {
  if (disabled) {
    return (
      <div
        className={clsx(
          className,
          GRID_LINK_COLORS.box.disabled,
          'shadow-small1 flex flex-col gap-8 text-left p-16 h-full rounded-sm w-full',
        )}
      >
        <T
          className={clsx(
            GRID_LINK_COLORS.title.disabled,
            'block font-medium lowercase',
          )}
        >
          {title}
        </T>
        {description && (
          <T
            className={clsx(
              GRID_LINK_COLORS.description.disabled,
              'block',
            )}
          >
            {description}
          </T>
        )}
      </div>
    )
  }
  return (
    <NextLink
      href={href}
      className={clsx(
        className,
        GRID_LINK_COLORS.box[color],
        'shadow-small1 hover:shadow-small2 flex flex-col gap-8 [&>div]:transition-colors transition duration-200 text-left p-16 h-full rounded-sm w-full',
      )}
    >
      <T
        className={clsx(
          'block font-semibold lowercase text-lg sm:text-lg-large transition-colors',
          GRID_LINK_COLORS.title[color],
        )}
      >
        {title}
      </T>
      {description && (
        <T
          className={clsx(
            GRID_LINK_COLORS.description[color],
            'block transition-colors text-lg sm:text-lg-large',
          )}
        >
          {description}
        </T>
      )}
    </NextLink>
  )
}

export default GridLink
