'use client'

import clsx from 'clsx'
import NextLink from 'next/link'

import T from '@termsurf/leaf/component/Text'

import { H1, P } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Grid from '@termsurf/leaf/component/Grid'
import TextInput from '@termsurf/leaf/component/TextInput'
import Toast from '@termsurf/leaf/component/Toast'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'
import { FONT, SCRIPT } from '~/data/fonts'

import { Cached } from './config'

const KEY = '/languages'

export type GridLink = {
  title: string
  description?: string
  path: string
}

type PageInput = {}

export default function Page() {
  return (
    <Environment settings={{ fonts: FONT, scripts: SCRIPT }}>
      <Content />
    </Environment>
  )
}

type ContentInput = PageInput

function Content() {
  useFonts(['Tone Etch', 'Noto Sans Egyptian Hieroglyphs'])

  return (
    <>
      <Header />
      <Body />
      <Toast />
    </>
  )
}

function Header() {
  const { cached } = usePageSettings<any, Cached>()

  return (
    <header className="mt-64">
      <H1 className="block uppercase scale-y-80 tracking-wide-015 !mb-0">
        Fonts
      </H1>
      <P
        align="center"
        type="secondary"
      >
        Explore writing system fonts
      </P>
    </header>
  )
}

const TERMS = [{}]

function Body() {
  return (
    <>
      <div className="relative w-full pb-64 flex flex-col gap-16 p-16">
        <TextInput size="large" />

        {/* <H2 className="!text-2xl !mb-0 !text-gray-600 !border-0 text-center uppercase scale-y-80 tracking-wide-015 mt-32">
          Living
        </H2> */}
        <Grid
          minWidth={192}
          gap={16}
          maxColumns={4}
        >
          <FontLink
            slug="latin"
            script="latin"
            name="Latin"
            sample="A B C D E F G H"
          />
          <FontLink
            slug="chinese"
            script="chinese"
            name="Chinese"
            sample="凹 半 草 出 大 呆 豆 父"
          />
          <FontLink
            slug="arabic"
            script="arabic"
            name="Arabic"
            sample="ب ت ج خ د ر س ص"
          />
          <FontLink
            slug="devanagari"
            script="devanagari"
            name="Devanagari"
            sample="क ख ग घ ङ च छ ज"
          />
          <FontLink
            slug="hebrew"
            script="hebrew"
            name="Hebrew"
            sample="ש ת ל מ צ ח כ ע"
          />
          <FontLink
            slug="tibetan"
            script="tibetan"
            name="Tibetan"
            sample="ཀ ཁ ག ང ཅ ཆ ཇ ཉ"
          />
          <FontLink
            slug="tamil"
            script="tamil"
            name="Tamil"
            sample="க ங ச ஞ ட ண த ந"
          />
          <FontLink
            slug="greek"
            script="greek"
            name="Greek"
            sample="Α Β Γ Δ Ε Ζ Η Θ"
          />
          <FontLink
            slug="cyrillic"
            script="cyrillic"
            name="Cyrillic"
            sample="Б В Г Д Е Ж З И"
          />
          <FontLink
            slug="geez"
            name="Ge'ez"
            script="geez"
            sample="ሀ ለ ሐ መ ሠ ረ ሰ ሸ"
          />
          <FontLink
            slug="gurmukhi"
            script="gurmukhi"
            name="Gurmukhi"
            sample="ਕ ਖ ਗ ਘ ਚ ਛ ਜ ਝ"
          />
          <FontLink
            slug="thai"
            script="thai"
            name="Thai"
            sample="ก ข ค ฆ ง จ ฉ ช"
          />
          <FontLink
            slug="telugu"
            script="telugu"
            name="Telugu"
            sample="క ఖ గ ఘ చ ఛ జ ఝ"
          />
          <FontLink
            slug="burmese"
            name="Burmese"
            script="burmese"
            sample="က ခ ဂ ဃ င စ ဆ ဇ"
          />
          <FontLink
            slug="hangul"
            name="Hangul"
            script="korean"
            sample="가 나 다 라 마 바 사 아"
          />
          <FontLink
            slug="kana"
            name="Kana"
            script="japanese"
            sample="カ キ ク ケ コ サ シ ス"
          />
          <FontLink
            slug="cherokee"
            script="cherokee"
            name="Cherokee"
            sample="Ꭰ Ꭱ Ꭲ Ꭳ Ꭴ Ꭵ Ꭶ Ꭷ"
          />
          <FontLink
            slug="inuktitut"
            name="Inuktitut"
            script="canadian"
            sample="ᐃ ᔦ ᕕ ᓰ ᓂ ᐳ ᕉ ᑎ"
          />
          <FontLink
            slug="tifinagh"
            script="tifinagh"
            name="Tifinagh"
            sample="ⵀ ⵁ ⵂ ⵃ ⵄ ⵅ ⵆ ⵇ"
          />
          <FontLink
            slug="syriac"
            script="syriac"
            name="Syriac"
            sample="ܐ ܒ ܓ ܕ ܗ ܩ ܙ ܛ"
          />
          <FontLink
            slug="georgian"
            script="georgian"
            name="Georgian"
            sample="ა ბ გ დ ე ვ ზ თ"
          />
          <FontLink
            slug="bengali"
            script="bengali"
            name="Bengali"
            sample="ক খ গ ঘ ঙ চ ছ জ"
          />
          <FontLink
            slug="kannada"
            script="kannada"
            name="Kannada"
            sample="ಕ ಖ ಗ ಘ ಙ ಚ ಛ ಜ"
          />
          <FontLink
            slug="malayalam"
            script="malayalam"
            name="Malayalam"
            sample="ക ഖ ഗ ഘ ങ ച ഛ ജ"
          />
          <FontLink
            slug="oriya"
            name="Oriya"
            script="oriya"
            sample="କ ଖ ଗ ଘ ଙ ଚ ଛ ଜ"
          />
          <FontLink
            slug="sinhala"
            script="sinhala"
            name="Sinhala"
            sample="ක ඛ ග ඝ ඞ ච ඡ ජ"
          />
          <FontLink
            slug="khmer"
            script="khmer"
            name="Khmer"
            sample="ក ខ គ ឃ ង ច ឆ ជ"
          />
          <FontLink
            slug="armenian"
            script="armenian"
            name="Armenian"
            sample="Ա Բ Գ Դ Ե Զ Է Ը"
          />
          <FontLink
            slug="mongolian"
            script="mongolian"
            name="Mongolian"
            sample="ᠠ ᠡ ᠢ ᠣ ᠤ ᠥ ᠦ ᠧ"
          />
          <FontLink
            slug="lao"
            script="lao"
            name="Lao"
            sample="ກ ຂ ຄ ງ ຈ ສ ຊ ຕ"
          />
          <FontLink
            slug="vai"
            script="vai"
            name="Vai"
            sample="ꔀ ꔁ ꔂ ꔃ ꔄ ꔅ ꔆ ꔇ"
          />
          <FontLink
            slug="thaana"
            script="thaana"
            name="Thaana"
            sample="ހ ށ ނ ރ ބ ޅ ކ އ"
          />
          <FontLink
            slug="mandaic"
            script="mandaic"
            name="Mandaic"
            sample="ࡀ ࡁ ࡂ ࡃ ࡄ ࡅ ࡆ ࡇ"
          />
          <FontLink
            slug="batak"
            script="batak"
            name="Batak"
            sample="ᯀ ᯁ ᯂ ᯃ ᯄ ᯅ ᯆ ᯇ"
          />
          <FontLink
            slug="lontara"
            name="Lontara"
            script="buginese"
            sample="ᨀ ᨁ ᨂ ᨃ ᨄ ᨅ ᨆ ᨇ"
          />
          <FontLink
            slug="balinese"
            script="balinese"
            name="Balinese"
            sample="ᬓ ᬔ ᬕ ᬖ ᬗ ᬘ ᬙ ᬚ"
          />
          <FontLink
            slug="cuneiform"
            script="cuneiform"
            name="Cuneiform"
            sample="𒀭 𒁍 𒀸 𒁇 𒄑 𒂗 𒅆 𒃻"
          />
          <FontLink
            slug="phoenician"
            script="phoenician"
            name="Phoenician"
            sample="𐤀 𐤁 𐤂 𐤃 𐤄 𐤅 𐤆 𐤇"
          />
          <FontLink
            slug="runic"
            script="runic"
            name="Runic"
            sample="ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᛉ ᛏ"
            weight="bold"
          />
          <FontLink
            slug="gothic"
            script="gothic"
            name="Gothic"
            sample="𐌰 𐌱 𐌲 𐌳 𐌴 𐌵 𐌶 𐌷"
          />
          <FontLink
            slug="avestan"
            script="avestan"
            name="Avestan"
            sample="𐬂 𐬉 𐬇 𐬒 𐬟 𐬬 𐬮 𐬐"
          />
          <FontLink
            slug="ogham"
            script="ogham"
            name="Ogham"
            sample="ᚃ ᚈ ᚆ ᚁ ᚇ ᚅ ᚄ ᚂ"
          />
          <FontLink
            slug="coptic"
            script="coptic"
            name="Coptic"
            sample="Ⲝ Ⲯ Ⲅ Ⲇ Ⲉ Ⲋ Ⲍ Ϩ"
          />
          <FontLink
            slug="brahmi"
            script="brahmi"
            name="Brahmi"
            sample="𑀓 𑀔 𑀕 𑀖 𑀗 𑀘 𑀙 𑀚"
          />
          <FontLink
            slug="javanese"
            script="javanese"
            name="Javanese"
            sample="ꦏ ꦐ ꦑ ꦒ ꦓ ꦔ ꦕ ꦖ"
          />
          <FontLink
            slug="pahlavi"
            name="Pahlavi"
            script="inscriptional-pahlavi"
            sample="𐭠 𐭡 𐭢 𐭣 𐭤 𐭥 𐭦 𐭧"
          />
          <FontLink
            slug="egyptian"
            script="egyptian"
            name="Egyptian"
            sample="𓂀 𓀀 𓅓 𓆣 𓆉 𓃘 𓆈 𓆗"
            weight="bold"
          />
          <FontLink
            slug="linear-b"
            script="linear-b"
            name="Linear B"
            sample="𐀀 𐀁 𐀍 𐀓 𐀞 𐀤 𐀦 𐀐"
            weight="bold"
          />
        </Grid>
      </div>
    </>
  )
}

function FontLink({
  className,
  slug,
  name,
  script,
  sample,
  disabled = false,
  weight,
}: {
  className?: string
  slug: string
  name: string
  script?: string
  disabled?: boolean
  sample?: string
  weight?: string
}) {
  if (disabled) {
    return (
      <div
        className={clsx(
          className,
          'shadow-small1 flex flex-col gap-8 bg-gray-100 text-left p-16 h-full leading-content rounded-sm w-full',
        )}
      >
        <T className="block font-semibold lowercase text-h4 leading-content text-gray-300">
          {name}
        </T>
        {sample && (
          <Grid
            className="lowercase text-h4 leading-content text-gray-300"
            minWidth={28}
            gap={8}
            maxColumns={4}
          >
            {sample.split(/\s+/).map(glyph => (
              <T
                key={glyph}
                script={script}
                className={clsx('block', weight && `font-${weight}`)}
              >
                {glyph}
              </T>
            ))}
          </Grid>
        )}
      </div>
    )
  }

  return (
    <NextLink
      href={`/scripts/${slug}/fonts`}
      className={clsx(
        className,
        'shadow-small1 hover:shadow-small2 flex flex-col gap-8 bg-gray-50 [&>div]:hover:text-violet-600 [&>div]:transition-colors transition-all duration-200 text-left p-16 h-full leading-content rounded-sm w-full [&_span]:hover:text-violet-600 [&_i]:hover:text-violet-400',
      )}
    >
      <T className="block font-semibold lowercase text-h4 leading-content transition-colors">
        {name}
      </T>
      {sample && (
        <Grid
          className="lowercase text-h4 leading-content text-gray-400"
          minWidth={28}
          gap={8}
          maxColumns={4}
        >
          {sample.split(/\s+/).map(glyph => (
            <T
              key={glyph}
              script={script}
              className={clsx('block', weight && `font-${weight}`)}
            >
              {glyph}
            </T>
          ))}
        </Grid>
      )}
    </NextLink>
  )
}
