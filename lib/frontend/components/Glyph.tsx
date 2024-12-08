import Text from '@termsurf/leaf/component/Text'
import clsx from 'clsx'

// TODO: double click to navigate
// TODO: pronunciation on click
export default function Glyph({
  text,
  script,
  pronunciation,
  label,
  size = 'medium',
  contrast,
  align = 'center',
}: {
  text: string
  script?: string
  pronunciation?: string
  size?: 'small' | 'medium' | 'large'
  contrast?: boolean
  label?: string
  align?: 'left' | 'center' | 'right'
}) {
  return (
    <div
      className={clsx(
        size === 'small' ? 'px-16 pb-8' : 'px-16 pb-16',
        size === 'small' && 'w-64',
        contrast
          ? 'bg-zinc-700 dark:bg-zinc-300'
          : 'bg-zinc-100 dark:bg-zinc-800',
        'rounded-sm',
        align === 'center'
          ? 'text-center'
          : align === 'right'
          ? 'text-right'
          : 'text-left',
      )}
    >
      <Text
        className={clsx(
          'block',
          contrast
            ? 'text-zinc-100 dark:text-zinc-800'
            : 'text-zinc-700 dark:text-zinc-300',
        )}
        script={script}
        size={size === 'small' ? 32 : size === 'medium' ? 92 : 156}
      >
        {text}
      </Text>
      {pronunciation != null && (
        <Text
          className={clsx(
            'block',
            contrast
              ? 'text-zinc-400 dark:text-zinc-500'
              : 'text-zinc-400 dark:text-zinc-500',
          )}
          size={size === 'small' ? 12 : size === 'medium' ? 22 : 32}
        >
          {pronunciation}
        </Text>
      )}
      {label != null && (
        <Text
          className={clsx(
            'block font-bold',
            contrast
              ? 'text-zinc-200 dark:text-zinc-800'
              : 'text-zinc-800 dark:text-zinc-200',
            pronunciation && 'mt-8',
          )}
          size={size === 'small' ? 12 : size === 'medium' ? 16 : 20}
        >
          {label}
        </Text>
      )}
    </div>
  )
}
