import clsx from 'clsx'
import NextLink from 'next/link'

import T from '@termsurf/leaf/component/Text'

function GridLink({
  className,
  path,
  title,
  description,
  disabled = false,
}: {
  className?: string
  path: string
  title: string
  description?: string
  disabled?: boolean
}) {
  if (disabled) {
    return (
      <div
        className={clsx(
          className,
          'shadow-small1 flex flex-col gap-8 bg-gray-100 text-left p-16 h-full rounded-sm w-full',
        )}
      >
        <T className="block font-semibold lowercase text-lg sm:text-lg-large text-gray-300">
          {title}
        </T>
        {description && (
          <T className="block text-gray-300 text-lg sm:text-lg-large">
            {description}
          </T>
        )}
      </div>
    )
  }
  return (
    <NextLink
      href={path}
      className={clsx(
        className,
        'shadow-small1 hover:shadow-small2 flex flex-col gap-8 bg-gray-50 [&_span]:hover:text-violet-600 [&>div]:transition-colors transition-all duration-200 text-left p-16 h-full rounded-sm w-full',
      )}
    >
      <T className="block font-semibold lowercase text-lg sm:text-lg-large transition-colors">
        {title}
      </T>
      {description && (
        <T className="block text-gray-600 transition-colors text-lg sm:text-lg-large">
          {description}
        </T>
      )}
    </NextLink>
  )
}

export default GridLink
