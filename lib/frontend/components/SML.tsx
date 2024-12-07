import Text from '@termsurf/leaf/component/Text'
import clsx from 'clsx'
import Link from 'next/link'
import { LanguageItem } from '~/lib/shared/constants'
import { languageListPath } from '~/lib/shared/utilities/paths'

export default function SML({
  language,
  className,
  active,
  type,
}: {
  className?: string
  language: LanguageItem
  active?: string
  type: string
}) {
  return (
    <ul
      className={clsx('text-base flex gap-8 justify-center', className)}
    >
      <li>
        {active === 'small' ? (
          <Text className="font-bold">S</Text>
        ) : (
          <Link
            className="[&>span]:hover:text-violet-600 [&>span]:transition-colors"
            href={languageListPath({
              language: language.slug,
              path: `${type}`,
            })}
          >
            <Text className="font-bold text-zinc-400">S</Text>
          </Link>
        )}
      </li>
      <li>
        {active === 'medium' ? (
          <Text className="font-bold">M</Text>
        ) : (
          <Link
            className="[&>span]:hover:text-violet-600 [&>span]:transition-colors"
            href={languageListPath({
              language: language.slug,
              path: `${type}/medium`,
            })}
          >
            <Text className="font-bold text-zinc-400">M</Text>
          </Link>
        )}
      </li>
      <li>
        {active === 'large' ? (
          <Text className="font-bold">L</Text>
        ) : (
          <Link
            className="[&>span]:hover:text-violet-600 [&>span]:transition-colors"
            href={languageListPath({
              language: language.slug,
              path: `${type}/large`,
            })}
          >
            <Text className="font-bold text-zinc-400">L</Text>
          </Link>
        )}
      </li>
    </ul>
  )
}
