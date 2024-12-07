'use client'

import Grid from '@termsurf/leaf/component/Grid'
import Text from '@termsurf/leaf/component/Text'
import FontsContext from '@termsurf/leaf/context/FontsContext'
import useScripts from '@termsurf/leaf/hook/useScripts'
import clsx from 'clsx'
import React, { RefObject, useContext, useMemo, useRef } from 'react'
import { useResizeObserver } from 'usehooks-ts'
import Section, { BOX_COLOR } from '~/lib/frontend/components/Section'
import { getMeasuredMaxWidthFromStrings } from '~/lib/frontend/utilities/elements'

export default function Page() {
  return (
    <Section.Environment path="/guides/earth-climate-cycles">
      <Content />
    </Section.Environment>
  )
}

const CONSONANTS = `m
n
q
g
d
b
p
t
k
h
s
f
v
z
j
x
c
C
w
l
r
y`.split(/\n+/)

function Content() {
  useScripts(['tone', 'code'])

  return (
    <Section>
      <Section.Header>
        <Section.H1>Tune</Section.H1>
        <Section.P>
          A simplified spoken language for modeling reality
        </Section.P>
        <div className="p-16 flex flex-col items-center">
          <Text className="block text-zinc-600 font-semibold">
            hen wolda
          </Text>
          <Text className="block text-zinc-400">Hello World</Text>
        </div>
      </Section.Header>
      <Section.Block>
        <Section.H2>Tone</Section.H2>
        <Section.P>
          A rune-inspired writing system for human languages
        </Section.P>
        <div className="p-16 flex flex-col items-center">
          <Text
            className="block"
            script="tone"
            size={32}
          >
            hen wolda
          </Text>
          <Text className="block text-zinc-600 font-semibold">
            hen wolda
          </Text>
          <Text className="block text-zinc-400">Hello World</Text>
        </div>
      </Section.Block>
      <Section.Block>
        <Section.H2>The 3 Base Tones</Section.H2>
        <Section.P>
          All glyphs are derived from these 3 symbols
        </Section.P>
        <div className="p-16">
          <Grid
            maxColumns={3}
            minWidth={192}
            maxWidth={192}
            gap={16}
            breakpoints={[3, 1]}
            align="center"
          >
            <Glyph
              script="tone"
              text="i"
              pronunciation="i"
            />
            <Glyph
              script="tone"
              text="a"
              pronunciation="a"
            />
            <Glyph
              script="tone"
              text="u"
              pronunciation="u"
            />
          </Grid>
        </div>
      </Section.Block>
      <Section.Block>
        <Section.H2>Glyph Structure</Section.H2>
        <Section.P>
          Rotate and add tail to generate all possible glyphs
        </Section.P>
        <div className="flex justify-center px-16">
          <img
            src="/tone.gif"
            width={512}
          />
        </div>
      </Section.Block>
      <Section.Block>
        <Section.H2>Vowels</Section.H2>
        <Section.P>The 5 vowels used in Tune</Section.P>
        <div className="p-16">
          <Grid
            maxColumns={5}
            minWidth={128}
            maxWidth={192}
            gap={16}
            breakpoints={[5, 3, 2, 1]}
            align="center"
          >
            <Glyph
              script="tone"
              text="i"
              pronunciation="i"
            />
            <Glyph
              script="tone"
              text="e"
              pronunciation="e"
            />
            <Glyph
              script="tone"
              text="a"
              pronunciation="a"
            />
            <Glyph
              script="tone"
              text="o"
              pronunciation="o"
            />
            <Glyph
              script="tone"
              text="u"
              pronunciation="u"
            />
          </Grid>
        </div>
      </Section.Block>
      <Section.Block>
        <Section.H2>Consonants</Section.H2>
        <Section.P>The 22 consonants used in Tune</Section.P>
        <div className="p-16">
          <Grid
            maxColumns={4}
            minWidth={128}
            maxWidth={192}
            gap={16}
            breakpoints={[4, 3, 2, 1]}
            align="center"
          >
            {CONSONANTS.map(c => (
              <Glyph
                script="tone"
                key={c}
                text={c}
                pronunciation={c}
              />
            ))}
          </Grid>
        </div>
      </Section.Block>
      <Section.Block>
        <Section.H2>Alphabet</Section.H2>
        <Section.P>
          How to remember the 27 sounds in alphabetic order
        </Section.P>
        <div className="p-16 flex flex-col gap-8 items-center">
          <div className="flex gap-8">
            <Glyph
              script="tone"
              contrast
              text="i"
              size="small"
            />
          </div>
          <div className="flex gap-8">
            <Glyph
              script="tone"
              contrast
              text="e"
              size="small"
            />
            <Glyph
              script="tone"
              contrast
              text="a"
              size="small"
            />
            <Glyph
              script="tone"
              contrast
              text="o"
              size="small"
            />
          </div>
          <div className="flex gap-8">
            <Glyph
              script="tone"
              contrast
              text="u"
              size="small"
            />
          </div>
          <div className="flex gap-8">
            <Glyph
              script="tone"
              contrast
              text="m"
              size="small"
            />
            <Glyph
              script="tone"
              contrast
              text="n"
              size="small"
            />
            <Glyph
              script="tone"
              contrast
              text="q"
              size="small"
            />
          </div>
          <div className="flex gap-8">
            <Glyph
              script="tone"
              contrast
              text="b"
              size="small"
            />
            <Glyph
              script="tone"
              contrast
              text="d"
              size="small"
            />
            <Glyph
              script="tone"
              contrast
              text="g"
              size="small"
            />
          </div>
          <div className="flex gap-8">
            <Glyph
              script="tone"
              contrast
              text="p"
              size="small"
            />
            <Glyph
              script="tone"
              contrast
              text="t"
              size="small"
            />
            <Glyph
              script="tone"
              contrast
              text="k"
              size="small"
            />
          </div>
          <div className="flex gap-8">
            <Glyph
              script="tone"
              contrast
              text="h"
              size="small"
            />
          </div>
          <div className="flex gap-8">
            <Glyph
              script="tone"
              contrast
              text="f"
              size="small"
            />
            <Glyph
              script="tone"
              contrast
              text="s"
              size="small"
            />
          </div>
          <div className="flex gap-8">
            <Glyph
              script="tone"
              contrast
              text="v"
              size="small"
            />
            <Glyph
              script="tone"
              contrast
              text="z"
              size="small"
            />
          </div>
          <div className="flex gap-8">
            <Glyph
              script="tone"
              contrast
              text="x"
              size="small"
            />
            <Glyph
              script="tone"
              contrast
              text="j"
              size="small"
            />
          </div>
          <div className="flex gap-8">
            <Glyph
              script="tone"
              contrast
              text="c"
              size="small"
            />
            <Glyph
              script="tone"
              contrast
              text="C"
              size="small"
            />
          </div>
          <div className="flex gap-8">
            <Glyph
              script="tone"
              contrast
              text="w"
              size="small"
            />
            <Glyph
              script="tone"
              contrast
              text="l"
              size="small"
            />
            <Glyph
              script="tone"
              contrast
              text="r"
              size="small"
            />
            <Glyph
              script="tone"
              contrast
              text="y"
              size="small"
            />
          </div>
        </div>
      </Section.Block>
      <Section.Block>
        <Section.H2>Roots</Section.H2>
        <Section.P>
          Base words used to generate all other word forms
        </Section.P>
        <div className="p-16">
          <Grid
            breakpoints={[4, 2, 1]}
            maxColumns={4}
            gap={16}
            minWidth={156}
          >
            <TextBox
              script="tone"
              color="neutral"
              native="red"
              roman="red"
              english="red"
            />
            <TextBox
              script="tone"
              color="neutral"
              native="dip"
              roman="dip"
              english="tree"
            />
            <TextBox
              script="tone"
              color="neutral"
              native="groq"
              roman="groq"
              english="grow"
            />
            <TextBox
              script="tone"
              color="neutral"
              native="kwik"
              roman="kwik"
              english="quickly"
            />
          </Grid>
        </div>
      </Section.Block>
      <Section.Block>
        <Section.H2>Root Rules</Section.H2>
        <Section.P>All roots start and end with a consonant</Section.P>
        <Section.List>
          <Section.Item label="Vowel clusters">
            No diphthongs exist like "oi" or "ai".
          </Section.Item>
          <Section.Item label="Consonant clusters">
            Any straightforward to pronounce consonant cluster is
            allowed.
          </Section.Item>
          <Section.Item label="Root endings">
            Roots can't end in -h, -y, or -w.
          </Section.Item>
          <Section.Item label="Root beginnings">
            Roots can't start in q-.
          </Section.Item>
          <Section.Item label="Compound roots">
            Join roots with -ya- or -wa-, depending on what sounds best
            after a particular consonant.
          </Section.Item>
          <Section.Item label="Syllables">
            Most words are 1-2 syllables, but arbitrary number of
            syllables are allowed.
          </Section.Item>
        </Section.List>
      </Section.Block>
      <Section.Block>
        <Section.H2>Realized words</Section.H2>
        <Section.P>Add suffixes to the roots</Section.P>
        <div className="p-16 pt-0">
          <Grid
            maxColumns={3}
            minWidth={192}
            maxWidth={192}
            gap={16}
            breakpoints={[3, 1]}
            align="center"
          >
            <Glyph
              script="tone"
              text="-i"
              pronunciation="-i"
              label="action"
            />
            <Glyph
              script="tone"
              text="-a"
              pronunciation="-a"
              label="object"
            />
            <Glyph
              script="tone"
              text="-u"
              pronunciation="-u"
              label="feature"
            />
          </Grid>
        </div>
      </Section.Block>
      <Section.Block>
        <Section.H2>Action words</Section.H2>
        <Section.P>These are some realized verbs of Tune</Section.P>
        <div className="p-16 pt-0">
          <Grid
            gap={16}
            minWidth={256}
            maxColumns={4}
          >
            <TextBox
              script="tone"
              color="neutral"
              native="sizi"
              roman="sizi"
              english="experience"
            />
            <TextBox
              script="tone"
              color="neutral"
              native="zusi"
              roman="zusi"
              english="do"
            />
            <TextBox
              script="tone"
              color="neutral"
              native="niqi"
              roman="niqi"
              english="flow"
            />
            <TextBox
              script="tone"
              color="neutral"
              native="nuqi"
              roman="nuqi"
              english="bond"
            />
          </Grid>
        </div>
      </Section.Block>
      <Section.Block>
        <Section.H2>Object words</Section.H2>
        <Section.P>These are some realized nouns of Tune</Section.P>
        <div className="p-16 pt-0">
          <Grid
            gap={16}
            minWidth={256}
            maxColumns={4}
          >
            <TextBox
              script="tone"
              color="neutral"
              native="siza"
              roman="siza"
              english="experience"
            />
            <TextBox
              script="tone"
              color="neutral"
              native="zusa"
              roman="zusa"
              english="deed"
            />
            <TextBox
              script="tone"
              color="neutral"
              native="niqa"
              roman="niqa"
              english="flow"
            />
            <TextBox
              script="tone"
              color="neutral"
              native="nuqa"
              roman="nuqa"
              english="bond"
            />
          </Grid>
        </div>
      </Section.Block>
    </Section>
  )
}

function Glyph({
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

function FittedGrid({
  fontWeight,
  fontSize,
  fontFamily,
  strings,
  children,
  itemPadding,
  ...gridProps
}: {
  fontWeight: number
  fontSize: number
  fontFamily: string
  strings: Array<string>
  maxWidth?: number
  maxRows?: number
  gap: number
  itemPadding?: number
  children: React.ReactNode
}) {
  const state = useContext(FontsContext)
  const isFontLoaded = state.fonts[fontFamily]
  const ref = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>
  const { width: containerWidth = 0 } = useResizeObserver({ ref })

  const maxItemWidth = useMemo(
    () =>
      !isFontLoaded
        ? 320
        : Math.min(
            320,
            getMeasuredMaxWidthFromStrings(strings, {
              fontWeight,
              fontSize: fontSize,
              fontFamily: fontFamily,
            }) + (itemPadding ?? 0),
          ),
    [
      fontSize,
      itemPadding,
      isFontLoaded,
      fontWeight,
      fontFamily,
      strings,
    ],
  )

  const maxColumns = Math.max(
    1,
    Math.floor(containerWidth / maxItemWidth),
  )

  return (
    <div
      ref={ref}
      className="w-full"
    >
      <Grid
        maxColumns={maxColumns}
        minWidth={maxItemWidth}
        {...gridProps}
      >
        {children}
      </Grid>
    </div>
  )
}

// ## Action Words

// - siz

// ## Object Words

// - siz

// ## Feature Words

// - siz

// ## Modifier Words

// Modifiers are root words preceding realized words

// - red tree
// - quickly grows
// - big old black bird

// ## Action Time Modifiers

// A list of "verb tenses"

// [each tense]

// ## Pronouns

// [pronoun]

// ## Common Object Modifiers

// [pronoun]

// ## Sentences

const TextBox = ({
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
}) => {
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
