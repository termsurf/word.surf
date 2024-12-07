import Text from '@termsurf/leaf/component/Text'
import clsx from 'clsx'
import { BOX_COLOR } from './Section'

export default function TextBox({
  className,
  native,
  script,
  roman,
  english,
  color = 'base',
  align = 'center',
}: {
  className?: string
  native?: React.ReactNode
  script?: string
  roman?: React.ReactNode
  english?: React.ReactNode
  color?: keyof typeof BOX_COLOR
  align?: 'left' | 'center' | 'right'
}) {
  const ENGLISH_COLOR = {
    neutral: 'text-zinc-400 dark:text-zinc-600',
  }
  return (
    <div
      className={clsx(
        className,
        BOX_COLOR[color],
        'rounded-sm p-16 flex flex-col',
        align === 'center'
          ? 'text-center'
          : align === 'right'
          ? 'text-right'
          : 'text-left',
      )}
    >
      {native && (
        <Text
          className="font-semibold block"
          size={28}
          script={script}
        >
          {native}
        </Text>
      )}
      {roman && (
        <Text
          className={clsx(
            'block',
            !native ? 'font-bold' : 'font-medium',
          )}
          size={18}
        >
          {roman}
        </Text>
      )}
      {english && (
        <Text
          className={clsx(
            ENGLISH_COLOR[color],
            'block dark:font-medium',
          )}
        >
          {english}
        </Text>
      )}
    </div>
  )
}
