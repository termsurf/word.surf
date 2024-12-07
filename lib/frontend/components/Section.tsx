import Box from '@termsurf/leaf/component/Box'
import { H1, H2, H3, P } from '@termsurf/leaf/component/Content'
import assert from 'assert'
import get from 'lodash/get'
import Glyph from '~/lib/frontend/components/Glyph'
import Grid from '~/lib/frontend/components/Grid'
import TextBox from '~/lib/frontend/components/TextBox'

import Layout from '@termsurf/leaf/component/Layout'
import Text from '@termsurf/leaf/component/Text'
import {
  QueryResolver,
  QueryResolvers,
  usePageSettings,
} from '@termsurf/leaf/hook/usePageSettings'
import useScripts from '@termsurf/leaf/hook/useScripts'
import clsx from 'clsx'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import Environment from '~/lib/frontend/components/Environment'

type SectionContextValues = {
  layout: 'document' | 'slideshow'
}

const SectionContext = createContext<SectionContextValues>({
  layout: 'document',
})

export type Cached = {
  layout: SectionContextValues['layout']
}

const CACHED = {
  layout: 'document',
}

const QUERY: QueryResolvers = {
  layout: {
    ...QueryResolver.text,
    default: 'document',
  },
}

Section.Environment = ({
  children,
  queryResolvers,
  path,
}: {
  children: React.ReactNode
  queryResolvers?: QueryResolvers
  path: string
}) => {
  return (
    <Environment
      queryResolvers={{ ...QUERY, ...(queryResolvers ?? {}) }}
      cached={CACHED}
      path={path}
    >
      {children}
    </Environment>
  )
}

export default function Section({
  children,
  scripts = [],
}: {
  children: React.ReactNode
  scripts?: Array<string>
}) {
  const { cached } = usePageSettings<any, Cached>()

  useScripts(['code'].concat(scripts))

  return (
    <SectionContext.Provider value={{ layout: cached.layout }}>
      <Layout>
        <Content>{children}</Content>
      </Layout>
    </SectionContext.Provider>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  const { layout } = useContext(SectionContext)

  useKeyboardSectionNav()

  return (
    <div
      className={clsx(
        'flex-1 min-h-full pb-64 flex flex-col',
        layout === 'document' && 'pt-96',
        // '[&>section:nth-child(even)]:bg-zinc-50 [&>section:nth-child(odd)]:bg-white [&>section:nth-child(event)]:dark:bg-black [&>section]:dark:text-zinc-300 [&>section:nth-child(odd)]:dark:bg-zinc-950',
      )}
    >
      {children}
    </div>
  )
}

Section.Header = ({ children }: { children: React.ReactNode }) => {
  const { layout } = useContext(SectionContext)

  return (
    <header
      className={clsx(
        'flex flex-col section',
        layout === 'slideshow' && 'min-h-screen justify-center',
        layout === 'document' && 'pb-64',
        'border-0 border-b-2 border-zinc-100 border-solid last:border-none',
      )}
    >
      {children}
    </header>
  )
}

Section.Block = ({ children }: { children: React.ReactNode }) => {
  const { layout } = useContext(SectionContext)
  return (
    <section
      className={clsx(
        'flex flex-col flex-1 section',
        layout === 'slideshow' && 'pt-8 min-h-screen justify-center',
        layout === 'document' && 'pb-64 pt-32',
        'border-0 border-b-2 border-zinc-100 border-solid last:border-none',
      )}
    >
      {children}
    </section>
  )
}

export const BOX_COLOR = {
  purple:
    'bg-violet-500 text-zinc-100 dark:bg-violet-800 dark:text-violet-200',
  green:
    'bg-emerald-500 text-zinc-100 dark:bg-emerald-800 dark:text-emerald-200',
  red: 'bg-rose-500 text-zinc-100 dark:bg-rose-800 dark:text-rose-200',
  blue: 'bg-blue-500 text-zinc-100 dark:bg-blue-800 dark:text-blue-200',
  base: 'bg-zinc-800 text-zinc-100 dark:text-zinc-800 dark:bg-zinc-200',
  neutral: 'bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-200',
}

const BOX_COLOR_HOVER = {
  purple:
    'hover:opacity-70 enabled:dark:hover:opacity-100 enabled:dark:hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50',
  green:
    'hover:opacity-70 enabled:dark:hover:opacity-100 enabled:dark:hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50',
  red: 'hover:opacity-70 enabled:dark:hover:opacity-100 enabled:dark:hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50',
  blue: 'hover:opacity-70 enabled:dark:hover:opacity-100 enabled:dark:hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50',
  base: 'hover:opacity-70 enabled:dark:hover:opacity-100 enabled:dark:hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50',
  neutral:
    'enabled:dark:hover:opacity-100 enabled:dark:hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50',
}

Section.Box = ({
  children,
  className,
  label,
  color = 'base',
  align = 'center',
}: {
  children?: React.ReactNode
  className?: string
  label?: React.ReactNode
  color?: keyof typeof BOX_COLOR
  align?: 'left' | 'center' | 'right'
}) => {
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
      {label && <Text className="font-bold block">{label}</Text>}
      {children && (
        <Text className="block font-medium">{children}</Text>
      )}
    </div>
  )
}

Section.H1 = ({ children }: { children: React.ReactNode }) => {
  return (
    <H1
      align="center"
      className="!mb-16"
    >
      {children}
    </H1>
  )
}

Section.H2 = ({ children }: { children: React.ReactNode }) => {
  return <H2 align="center">{children}</H2>
}

Section.H3 = ({ children }: { children: React.ReactNode }) => {
  return <H3 align="center">{children}</H3>
}

Section.P = ({ children }: { children: React.ReactNode }) => {
  return (
    <P
      align="center"
      type="secondary"
    >
      {children}
    </P>
  )
}

Section.Result = ({
  label = 'Result',
  children,
  className,
  color = 'base',
}: {
  label?: string
  children: React.ReactNode
  className?: string
  color?: keyof typeof BOX_COLOR
}) => {
  return (
    <header className="p-32 flex flex-col items-center">
      <h4 className="text-center mb-8 title">
        <Text>{label}</Text>
      </h4>
      <Text
        className={clsx(
          'rounded-sm p-16 w-fit font-bold',
          BOX_COLOR[color],
          className,
        )}
      >
        {children}
      </Text>
    </header>
  )
}

Section.List = ({
  children,
  ordered,
}: {
  children: React.ReactNode
  ordered?: boolean
}) => {
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <Tag className="rounded-sm overflow-hidden mx-16 !mt-16 list-none [&>li:nth-child(odd)]:bg-zinc-200 [&>li:nth-child(even)]:bg-zinc-100 dark:[&>li:nth-child(odd)]:bg-zinc-900 dark:[&>li:nth-child(even)]:bg-zinc-800">
      {children}
    </Tag>
  )
}

Section.Item = ({
  children,
  label,
  className,
  reverse,
  image,
  invert,
  time,
}: {
  children?: React.ReactNode
  label?: React.ReactNode
  className?: string
  reverse?: boolean
  image?: string
  time?: string
  invert?: boolean
}) => {
  return (
    <li
      className={clsx(
        'flex flex-wrap justify-center gap-16 py-16 px-16 dark:text-zinc-400 dark:font-medium',
        className,
      )}
    >
      <span className="block flex-1 sm:min-w-384">
        {time && (
          <Text
            className={clsx(
              'block',
              'text-sm !lowercase font-semibold title text-zinc-500 dark:text-zinc-400',
            )}
          >
            {time}
          </Text>
        )}
        {label && (
          <Text
            className={clsx(
              'block leading-content mb-4',
              !reverse && 'dark:text-zinc-200 font-bold',
            )}
          >
            {label}
          </Text>
        )}
        {children && (
          <Text
            className={clsx(
              'block',
              !reverse && 'text-zinc-600 dark:text-zinc-400',
              reverse && 'font-bold',
            )}
          >
            {children}
          </Text>
        )}
      </span>
      {image && (
        <span className="block max-w-256">
          <img
            src={image}
            className={clsx('h-auto', invert && 'dark:invert')}
            width="100%"
          />
        </span>
      )}
    </li>
  )
}

const useKeyboardSectionNav = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const observerRef = useRef<IntersectionObserver>(null)
  const { layout } = useContext(SectionContext)

  // Set up intersection observer to track visible sections
  useEffect(() => {
    if (layout !== 'slideshow') {
      return
    }

    const options = {
      root: null, // Use viewport as root
      rootMargin: '0px',
      threshold: 0.5, // Fire when section is 50% visible
    }

    const observer = (observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sections = Array.from(
              document.querySelectorAll('.section'),
            )
            const index = sections.indexOf(entry.target as HTMLElement)
            setCurrentSectionIndex(index)
          }
        })
      },
      options,
    ))

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
      observer.observe(section)
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [layout])

  const handleKeyPress = useCallback(
    event => {
      const sections = document.querySelectorAll('.section')

      if (!sections.length) return

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault()
          const nextIndex = Math.min(
            currentSectionIndex + 1,
            sections.length - 1,
          )
          setCurrentSectionIndex(nextIndex)
          sections[nextIndex]?.scrollIntoView({ behavior: 'instant' })
          break

        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault()
          const prevIndex = Math.max(currentSectionIndex - 1, 0)
          setCurrentSectionIndex(prevIndex)
          sections[prevIndex]?.scrollIntoView({ behavior: 'instant' })
          break

        default:
          break
      }
    },
    [currentSectionIndex],
  )

  useEffect(() => {
    if (layout !== 'slideshow') {
      return
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress, layout])

  return currentSectionIndex
}

function renderComponent(node: any, scope: Record<string, any>) {
  const type = typeof node

  if (type === 'string' || type === 'number') {
    return <React.Fragment key={scope.key}>{node}</React.Fragment>
  }

  if (node.$ref || node.$text || node.$call) {
    return (
      <React.Fragment key={scope.key}>
        {renderValue(node, scope)}
      </React.Fragment>
    )
  }

  if (node.type === 'mapping') {
    return mapping({
      scope,
      ...node,
    })
  }

  const Component = COMPONENTS[node.type]
  if (!Component) {
    console.error(node)
  }
  assert(Component, `Component ${node.type} doesn't exist`)

  let children

  if (node.children) {
    if (Array.isArray(node.children)) {
      children = node.children.map((x, i) => {
        const key = x.key
          ? x.key
          : scope.key
          ? `${scope.key}-${i}`
          : String(i)
        return renderComponent(x, { ...scope, key })
      })
    } else {
      // console.log('scope', node.type, scope)
      children = renderComponent(node.children, {
        ...scope,
        key: `${scope.key}-0`,
      })
    }
  }

  const props: Record<string, any> = {}

  for (const name in node) {
    const val = renderValue(node[name], scope)
    props[name] = val
  }

  const {
    key: keyX,
    type: typeX,
    children: childrenX,
    ...propsWithoutKey
  } = props

  if (scope.key) {
    return (
      <ScopeContext.Provider
        key={scope.key}
        value={scope}
      >
        <Component {...propsWithoutKey}>{children}</Component>
      </ScopeContext.Provider>
    )
  }

  return (
    <ScopeContext.Provider value={scope}>
      <Component {...propsWithoutKey}>{children}</Component>
    </ScopeContext.Provider>
  )
}

function renderValue(val: any, scope: Record<string, any>) {
  if (val) {
    if (val.$ref) {
      return get(scope, val.$ref)
    } else if (val.$text) {
      return val.$text
        .map(x => (x.$ref ? get(scope, x.$ref) : x))
        .join('')
    } else if (val.$call) {
      const fn = scope[val.$call.name]
      assert(fn, `Function '${val.$call.name}' does not exist`)
      const args = (val.$call.args ?? []).map(arg =>
        renderValue(arg, scope),
      )
      return fn(...args)
    }
  }
  return val
}

Section.Page = ({
  resources,
  components,
}: {
  resources: Record<string, any>
  components: Array<any>
}) => {
  return (
    <Section.Environment path={resources.path}>
      <Section scripts={resources.scripts}>
        {components.map((x, i) =>
          renderComponent(x, { ...resources, key: String(i) }),
        )}
      </Section>
    </Section.Environment>
  )
}

const COMPONENTS: Record<string, React.ComponentType<any>> = {
  box: Box,
  grid: Grid,
  text: Text,
  glyph: Glyph,
  section: Section,
  textbox: TextBox,
  block: Section.Block,
  list: Section.List,
  item: Section.Item,
  p: Section.P,
  h1: Section.H1,
  h2: Section.H2,
  h3: Section.H3,
  header: Section.Header,
  image: Image,
}

const ScopeContext = createContext<Record<string, any>>({})

const COMPONENT_TYPES = Object.keys(COMPONENTS)

function mapping({
  scope,
  data: dataProp,
  item,
  template,
}: {
  scope: any
  data: any
  item: string
  template: any
}) {
  const data = dataProp.$ref ? get(scope, dataProp.$ref) : dataProp
  assert(
    COMPONENT_TYPES.includes(template.type),
    `Don't know how to process '${template.type}' component`,
  )

  if (Array.isArray(data)) {
    return data.map((x, i) => {
      const childScope = { ...scope, [item]: x }
      const key = x.key
        ? x.key
        : template.key?.$ref
        ? get(childScope, template.key.$ref) ?? String(i)
        : childScope.key
        ? `${childScope.key}-${i}`
        : String(i)
      return renderComponent(template, { ...childScope, key })
    })
  } else {
    return Object.keys(data).map(key => {
      return renderComponent(template, {
        ...scope,
        key,
        [item]: data[key],
      })
    })
  }
}

function Image({
  src,
  width,
  height,
}: {
  src: string
  width?: number
  height?: number
}) {
  return (
    <img
      src={src}
      width={width}
      height={height}
    />
  )
}
