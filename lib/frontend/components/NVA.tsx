import Text from '@termsurf/leaf/component/Text'
import clsx from 'clsx'
import Link from 'next/link'
import { LanguageItem } from '~/lib/shared/constants'
import { languageListPath } from '~/lib/shared/utilities/paths'

export default function NVA({
  language,
  className,
  size,
  active,
}: {
  className?: string
  language: LanguageItem
  size: string
  active?: string
}) {
  return (
    <ul className={clsx('flex gap-32 justify-center mb-32', className)}>
      <li className="text-center">
        {active === `noun/${size}` ? (
          <Text className="font-bold lowercase">Noun</Text>
        ) : (
          <Link
            className="[&>span]:hover:text-violet-600 [&>span]:transition-colors"
            href={languageListPath({
              language: language.slug,
              path: `noun/${size}`,
            })}
          >
            <Text className="font-bold lowercase text-zinc-500">
              Noun
            </Text>
          </Link>
        )}
      </li>
      <li className="text-center">
        {active === `verb/${size}` ? (
          <Text className="font-bold lowercase">Verb</Text>
        ) : (
          <Link
            className="[&>span]:hover:text-violet-600 [&>span]:transition-colors"
            href={languageListPath({
              language: language.slug,
              path: `verb/${size}`,
            })}
          >
            <Text className="font-bold lowercase text-zinc-500">
              Verb
            </Text>
          </Link>
        )}
      </li>
      <li className="text-center">
        {active === `adjective/${size}` ? (
          <Text className="font-bold lowercase">Adjective</Text>
        ) : (
          <Link
            className="[&>span]:hover:text-violet-600 [&>span]:transition-colors"
            href={languageListPath({
              language: language.slug,
              path: `adjective/${size}`,
            })}
          >
            <Text className="font-bold lowercase text-zinc-500">
              Adjective
            </Text>
          </Link>
        )}
      </li>
    </ul>
  )
}
