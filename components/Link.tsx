import clsx from 'clsx'
import NextLink from 'next/link'

import T from '@termsurf/leaf/component/Text'

function Link({
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
        <T className="block font-semibold lowercase text-base sm:text-base-large text-gray-300">
          {title}
        </T>
        {description && (
          <T className="block text-gray-300 text-base sm:text-base-large">
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
      <T className="block font-semibold lowercase text-base sm:text-base-large transition-colors">
        {title}
      </T>
      {description && (
        <T className="block text-gray-600 transition-colors text-base sm:text-base-large">
          {description}
        </T>
      )}
    </NextLink>
  )
}

export default Link
