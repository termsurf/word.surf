'use client'

import clsx from 'clsx'
import NextLink from 'next/link'

import T from '@termsurf/leaf/component/Text'

import { H1, P } from '@termsurf/leaf/component/Content'
import Environment from '@termsurf/leaf/component/Environment'
import Grid from '@termsurf/leaf/component/Grid'
import TextInput from '@termsurf/leaf/component/TextInput'
import Toast from '@termsurf/leaf/component/Toast'
import { FONT, SCRIPT } from '@termsurf/leaf/constant/settings'
import useFonts from '@termsurf/leaf/hook/useFonts'
import { usePageSettings } from '@termsurf/leaf/hook/usePageSettings'
import useScripts from '@termsurf/leaf/hook/useScripts'

import { useState } from 'react'
import { Cached } from './config'
const SCRIPT_NAMES = [
  'latin',
  'chinese',
  'arabic',
  'devanagari',
  'hebrew',
  'tibetan',
  'tamil',
  'greek',
  'cyrillic',
  'geez',
  'gurmukhi',
  'thai',
  'telugu',
  'burmese',
  'katakana',
  'hiragana',
  'tifinagh',
  'syriac',
  'georgian',
  'bengali',
  'kannada',
  'malayalam',
  'oriya',
  'sinhala',
  'khmer',
  'armenian',
  'mongolian',
  'lao',
  'vai',
  'thaana',
  'mandaic',
  'batak',
  'buginese',
  'balinese',
  'cuneiform',
  'phoenician',
  'runic',
  'gothic',
  'avestan',
  'ogham',
  'coptic',
  'brahmi',
  'javanese',
  'inscriptional-pahlavi',
  'egyptian',
  'cherokee',
  'linear-b',
  'katakana',
  'hiragana',
  'old-persian',
  'linear-a',
  'ugaritic',
  'old-turkic',
  'n-ko',
  'adlam',
  'tirhuta',
  'old-hungarian',
  'glagolitic',
  'osmanya',
  'meroitic',
  'tangut',
  'old-italic',
  'cypriot',
  'deseret',
  'nushu',
  'tai-le',
  'yi',
  'old-sogdian',
  'phags-pa',
  'manichaean',
  'imperial-aramaic',
  'anatolian',
  'lycian',
  'carian',
  'lydian',
  'nabataean',
  'palmyrene',
  'hatran',
  'old-north-arabian',
  'old-south-arabian',
  'samaritan',
  'inscriptional-parthian',
  'kharoshthi',
  'bhaiksuki',
  'siddham',
  'sharada',
  'grantha',
  'newa',
  'kaithi',
  'mahajani',
  'modi',
  'khojki',
  'nandinagari',
  'takri',
  'ahom',
  'dogra',
  'khitan',
  'old-uyghur',
  'tangsa',
  'wancho',
  'miao',
  'lisu',
  'bamum',
  'bassa-vah',
  'mende-kikakui',
  'ol-chiki',
  'osage',
  'caucasian-albanian',
  'vithkuqi',
  'elbasan',
  'gunjala-gondi',
  'masaram-gondi',
  'sora-sompeng',
  'warang-citi',
  'pahawh-hmong',
  'medefaidrin',
  'hanifi-rohingya',
  'makasar',
  'buhid',
  'hanunoo',
  'tagalog',
  'tagbanwa',
  'sundanese',
  'rejang',
  'batak',
  'lepcha',
  'limbu',
  'meetei-mayek',
  'chakma',
  'cham',
  'tai-tham',
  'tai-viet',
  'new-tai-lue',
  'syloti-nagri',
  'kawi',
  'kayah-li',
  'pau-cin-hau',
  'saurashtra',
  'chorasmian',
  'elymaic',
  'indic-siyaq-numbers',
  'khudawadi',
  'marchen',
  'multani',
  'nag-mundari',
  'ottoman-siyaq',
  'sogdian',
  'soyombo',
  'toto',
  'yezidi',
  'zanabazar-square',
  'cypro-minoan',
  'duployan',
  'shavian',
]

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
  useFonts(['Tone Etch'])
  useScripts(SCRIPT_NAMES)

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
        Scripts
      </H1>
      <P
        align="center"
        type="secondary"
      >
        Examine the world&apos;s writing systems
      </P>
    </header>
  )
}

const TERMS = [{}]

const SCRIPTS = [
  {
    slug: 'latin',
    script: 'latin',
    name: 'Latin',
    symbol: 'A',
  },
  {
    slug: 'chinese',
    script: 'chinese',
    name: 'Chinese',
    symbol: '大',
  },
  {
    slug: 'arabic',
    script: 'arabic',
    name: 'Arabic',
    symbol: 'ج',
  },
  {
    slug: 'devanagari',
    script: 'devanagari',
    name: 'Devanagari',
    symbol: 'ॐ',
  },
  {
    slug: 'hebrew',
    script: 'hebrew',
    name: 'Hebrew',
    symbol: 'א',
  },
  {
    slug: 'tibetan',
    script: 'tibetan',
    name: 'Tibetan',
    symbol: 'ཀ',
  },
  {
    slug: 'tamil',
    script: 'tamil',
    name: 'Tamil',
    symbol: 'க',
  },
  {
    slug: 'greek',
    script: 'greek',
    name: 'Greek',
    symbol: 'Π',
  },
  {
    slug: 'cyrillic',
    script: 'cyrillic',
    name: 'Cyrillic',
    symbol: 'ж',
  },
  {
    slug: 'geez',
    script: 'geez',
    name: 'Geez',
    symbol: 'ቀ',
  },
  {
    slug: 'gurmukhi',
    script: 'gurmukhi',
    name: 'Gurmukhi',
    symbol: 'ੴ',
  },
  {
    slug: 'thai',
    script: 'thai',
    name: 'Thai',
    symbol: 'ก',
  },
  {
    slug: 'telugu',
    script: 'telugu',
    name: 'Telugu',
    symbol: 'జ',
  },
  {
    slug: 'burmese',
    script: 'burmese',
    name: 'Burmese',
    symbol: 'က',
  },
  {
    slug: 'korean',
    script: 'korean',
    name: 'Korean',
    symbol: '라',
  },
  {
    slug: 'cherokee',
    script: 'cherokee',
    name: 'Cherokee',
    symbol: 'Ꭿ',
  },
  {
    slug: 'canadian',
    script: 'canadian',
    name: 'Canadian',
    symbol: 'ᐃ',
  },
  {
    slug: 'tifinagh',
    script: 'tifinagh',
    name: 'Tifinagh',
    symbol: 'ⴳ',
  },
  {
    slug: 'syriac',
    script: 'syriac',
    name: 'Syriac',
    symbol: 'ܐ',
  },
  {
    slug: 'georgian',
    script: 'georgian',
    name: 'Georgian',
    symbol: 'გ',
  },
  {
    slug: 'bengali',
    script: 'bengali',
    name: 'Bengali',
    symbol: 'ক',
  },
  {
    slug: 'kannada',
    script: 'kannada',
    name: 'Kannada',
    symbol: 'ಕ',
  },
  {
    slug: 'malayalam',
    script: 'malayalam',
    name: 'Malayalam',
    symbol: 'ക',
  },
  {
    slug: 'oriya',
    script: 'oriya',
    name: 'Oriya',
    symbol: 'କ',
  },
  {
    slug: 'sinhala',
    script: 'sinhala',
    name: 'Sinhala',
    symbol: 'ක',
  },
  {
    slug: 'khmer',
    script: 'khmer',
    name: 'Khmer',
    symbol: 'ឃ',
  },
  {
    slug: 'armenian',
    script: 'armenian',
    name: 'Armenian',
    symbol: 'Ա',
  },
  {
    slug: 'mongolian',
    script: 'mongolian',
    name: 'Mongolian',
    symbol: 'ᠠ',
  },
  {
    slug: 'lao',
    script: 'lao',
    name: 'Lao',
    symbol: 'ກ',
  },
  {
    slug: 'vai',
    script: 'vai',
    name: 'Vai',
    symbol: 'ꔀ',
  },
  {
    slug: 'thaana',
    script: 'thaana',
    name: 'Thaana',
    symbol: 'ޓ',
  },
  {
    slug: 'mandaic',
    script: 'mandaic',
    name: 'Mandaic',
    symbol: 'ࡗ',
  },
  {
    slug: 'batak',
    script: 'batak',
    name: 'Batak',
    symbol: 'ᯀ',
  },
  {
    slug: 'katakana',
    name: 'Katakana',
    script: 'katakana',
    symbol: 'カ',
  },
  {
    slug: 'hiragana',
    name: 'Hiragana',
    script: 'hiragana',
    symbol: 'あ',
  },
  {
    slug: 'balinese',
    script: 'balinese',
    name: 'Balinese',
    symbol: 'ᬓ',
  },
  {
    slug: 'cuneiform',
    script: 'cuneiform',
    name: 'Cuneiform',
    symbol: '𒀭',
  },
  {
    slug: 'phoenician',
    script: 'phoenician',
    name: 'Phoenician',
    symbol: '𐤀',
  },
  {
    slug: 'runic',
    script: 'runic',
    name: 'Runic',
    symbol: 'ᚠ',
  },
  {
    slug: 'gothic',
    script: 'gothic',
    name: 'Gothic',
    symbol: '𐌸',
  },
  {
    slug: 'avestan',
    script: 'avestan',
    name: 'Avestan',
    symbol: '𐬂',
  },
  {
    slug: 'ogham',
    script: 'ogham',
    name: 'Ogham',
    symbol: 'ᚎ',
  },
  {
    slug: 'coptic',
    script: 'coptic',
    name: 'Coptic',
    symbol: 'Ⲁ',
  },
  {
    slug: 'brahmi',
    script: 'brahmi',
    name: 'Brahmi',
    symbol: '𑀠',
  },
  {
    slug: 'javanese',
    script: 'javanese',
    name: 'Javanese',
    symbol: 'ꦏ',
  },
  {
    slug: 'pahlavi',
    script: 'inscriptional-pahlavi',
    name: 'Pahlavi',
    symbol: '𐭮',
  },
  {
    slug: 'egyptian',
    script: 'egyptian',
    name: 'Egyptian',
    symbol: '𓂀',
    weight: 'bold',
  },
  {
    slug: 'linear-b',
    script: 'linear-b',
    name: 'Linear B',
    symbol: '𐀀',
  },
  {
    slug: 'buginese',
    script: 'buginese',
    name: 'Buginese',
    symbol: 'ᨏ',
  },
  {
    slug: 'old-persian',
    name: 'Old Persian',
    script: 'old-persian',
    symbol: '𐎠',
  },
  {
    slug: 'linear-a',
    name: 'Linear A',
    script: 'linear-a',
    symbol: '𐘦',
  },
  {
    slug: 'ugaritic',
    name: 'Ugaritic',
    script: 'ugaritic',
    symbol: '𐎉',
  },
  {
    slug: 'old-turkic',
    name: 'Old Turkic',
    script: 'old-turkic',
    symbol: '𐰌',
  },
  {
    slug: 'n-ko',
    name: "N'Ko",
    script: 'n-ko',
    symbol: 'ߐ',
  },
  {
    slug: 'adlam',
    name: 'Adlam',
    script: 'adlam',
    symbol: '𞤀',
  },
  {
    slug: 'tirhuta',
    name: 'Tirhuta',
    script: 'tirhuta',
    symbol: '𑒀',
  },
  {
    slug: 'old-hungarian',
    name: 'Old Hungarian',
    script: 'old-hungarian',
    symbol: '𐲀',
  },
  {
    slug: 'glagolitic',
    name: 'Glagolitic',
    script: 'glagolitic',
    symbol: 'Ⰰ',
  },
  {
    slug: 'osmanya',
    name: 'Osmanya',
    script: 'osmanya',
    symbol: '𐒀',
  },
  {
    slug: 'meroitic',
    name: 'Meroitic',
    script: 'meroitic',
    symbol: '𐦠',
  },
  {
    slug: 'tangut',
    name: 'Tangut',
    script: 'tangut',
    symbol: '𗀀',
  },
  {
    slug: 'old-italic',
    name: 'Old Italic',
    script: 'old-italic',
    symbol: '𐌀',
  },
  {
    slug: 'cypriot',
    name: 'Cypriot',
    script: 'cypriot',
    symbol: '𐠀',
  },
  {
    slug: 'deseret',
    name: 'Deseret',
    script: 'deseret',
    symbol: '𐐀',
  },
  {
    slug: 'nushu',
    name: 'Nushu',
    script: 'nushu',
    symbol: '𛅰',
  },
  {
    slug: 'tai-le',
    name: 'Tai Le',
    script: 'tai-le',
    symbol: 'ᥐ',
  },
  {
    slug: 'yi',
    name: 'Yi',
    script: 'yi',
    symbol: 'ꀀ',
  },
  {
    slug: 'old-sogdian',
    name: 'Old Sogdian',
    script: 'old-sogdian',
    symbol: '𐼀',
  },
  {
    slug: 'phags-pa',
    name: 'Phags Pa',
    script: 'phags-pa',
    symbol: 'ꡀ',
  },
  {
    slug: 'manichaean',
    name: 'Manichaean',
    script: 'manichaean',
    symbol: '𐫀',
  },
  {
    slug: 'imperial-aramaic',
    name: 'Imperial Aramaic',
    script: 'imperial-aramaic',
    symbol: '𐡀',
  },
  {
    slug: 'anatolian',
    name: 'Anatolian',
    script: 'anatolian',
    symbol: '𔐀',
    weight: 'semibold',
  },
  {
    slug: 'lycian',
    name: 'Lycian',
    script: 'lycian',
    symbol: '𐊀',
  },
  {
    slug: 'carian',
    name: 'Carian',
    script: 'carian',
    symbol: '𐊷',
  },
  {
    slug: 'lydian',
    name: 'Lydian',
    script: 'lydian',
    symbol: '𐤤',
  },
  {
    slug: 'nabataean',
    name: 'Nabataean',
    script: 'nabataean',
    symbol: '𐢀',
  },
  {
    slug: 'palmyrene',
    name: 'Palmyrene',
    script: 'palmyrene',
    symbol: '𐡠',
  },
  {
    slug: 'hatran',
    name: 'Hatran',
    script: 'hatran',
    symbol: '𐣠',
  },
  {
    slug: 'old-north-arabian',
    name: 'Old North Arabian',
    script: 'old-north-arabian',
    symbol: '𐪀',
  },
  {
    slug: 'old-south-arabian',
    name: 'Old South Arabian',
    script: 'old-south-arabian',
    symbol: '𐩠',
  },
  {
    slug: 'samaritan',
    name: 'Samaritan',
    script: 'samaritan',
    symbol: 'ࠀ',
  },
  {
    slug: 'parthian',
    name: 'Parthian',
    script: 'inscriptional-parthian',
    symbol: '𐭀',
  },
  {
    slug: 'kharoshthi',
    name: 'Kharoshthi',
    script: 'kharoshthi',
    symbol: '𐨀',
  },
  {
    slug: 'bhaiksuki',
    name: 'Bhaiksuki',
    script: 'bhaiksuki',
    symbol: '𑰀',
  },
  {
    slug: 'siddham',
    name: 'Siddham',
    script: 'siddham',
    symbol: '𑖀',
  },
  {
    slug: 'sharada',
    name: 'Sharada',
    script: 'sharada',
    symbol: '𑆃',
  },
  {
    slug: 'grantha',
    name: 'Grantha',
    script: 'grantha',
    symbol: '𑌅',
  },
  {
    slug: 'newa',
    name: 'Newa',
    script: 'newa',
    symbol: '𑐀',
  },
  {
    slug: 'kaithi',
    name: 'Kaithi',
    script: 'kaithi',
    symbol: '𑂃',
  },
  {
    slug: 'mahajani',
    name: 'Mahajani',
    script: 'mahajani',
    symbol: '𑅐',
  },
  {
    slug: 'modi',
    name: 'Modi',
    script: 'modi',
    symbol: '𑘀',
  },
  {
    slug: 'khojki',
    name: 'Khojki',
    script: 'khojki',
    symbol: '𑈀',
  },
  {
    slug: 'nandinagari',
    name: 'Nandinagari',
    script: 'nandinagari',
    symbol: '𑧍',
  },
  {
    slug: 'takri',
    name: 'Takri',
    script: 'takri',
    symbol: '𑚀',
  },
  {
    slug: 'ahom',
    name: 'Ahom',
    script: 'ahom',
    symbol: '𑜀',
  },
  {
    slug: 'dogra',
    name: 'Dogra',
    script: 'dogra',
    symbol: '𑠀',
  },
  {
    slug: 'khitan',
    name: 'Khitan',
    script: 'khitan',
    symbol: '𘲽',
  },
  {
    slug: 'old-uyghur',
    name: 'Old Uyghur',
    script: 'old-uyghur',
    symbol: '𐽹',
  },
  {
    slug: 'tangsa',
    name: 'Tangsa',
    script: 'tangsa',
    symbol: '𖪗',
  },
  {
    slug: 'wancho',
    name: 'Wancho',
    script: 'wancho',
    symbol: '𞋀',
  },
  {
    slug: 'miao',
    name: 'Miao',
    script: 'miao',
    symbol: '𖼷𖽷',
  },
  {
    slug: 'lisu',
    name: 'Lisu',
    script: 'lisu',
    symbol: 'ꓯ',
  },
  {
    slug: 'bamum',
    name: 'Bamum',
    script: 'bamum',
    symbol: 'ꚠ',
  },
  {
    slug: 'bassa-vah',
    name: 'Bassa Vah',
    script: 'bassa-vah',
    symbol: '𖫐',
  },
  {
    slug: 'mende-kikakui',
    name: 'Mende Kikakui',
    script: 'mende-kikakui',
    symbol: '𞠀',
  },
  {
    slug: 'ol-chiki',
    name: 'Ol Chiki',
    script: 'ol-chiki',
    symbol: 'ᱚ',
  },
  {
    slug: 'osage',
    name: 'Osage',
    script: 'osage',
    symbol: '𐓏',
  },
  {
    slug: 'caucasian-albanian',
    name: 'Caucasian Albanian',
    script: 'caucasian-albanian',
    symbol: '𐔀',
  },
  {
    slug: 'vithkuqi',
    name: 'Vithkuqi',
    script: 'vithkuqi',
    symbol: '𐖩',
  },
  {
    slug: 'elbasan',
    name: 'Elbasan',
    script: 'elbasan',
    symbol: '𐔀',
  },
  {
    slug: 'gunjala-gondi',
    name: 'Gunjala Gondi',
    script: 'gunjala-gondi',
    symbol: '𑵠',
  },
  {
    slug: 'masaram-gondi',
    name: 'Masaram Gondi',
    script: 'masaram-gondi',
    symbol: '𑴨',
  },
  {
    slug: 'sora-sompeng',
    name: 'Sora Sompeng',
    script: 'sora-sompeng',
    symbol: '𑃐',
  },
  {
    slug: 'warang-citi',
    name: 'Warang Citi',
    script: 'warang-citi',
    symbol: '𑢠',
  },
  {
    slug: 'pahawh-hmong',
    name: 'Pahawh Hmong',
    script: 'pahawh-hmong',
    symbol: '𖬀',
  },
  {
    slug: 'medefaidrin',
    name: 'Medefaidrin',
    script: 'medefaidrin',
    symbol: '𖹀',
  },
  {
    slug: 'hanifi-rohingya',
    name: 'Hanifi Rohingya',
    script: 'hanifi-rohingya',
    symbol: '𐴀',
  },
  {
    slug: 'makasar',
    name: 'Makasar',
    script: 'makasar',
    symbol: '𑻠',
  },
  {
    slug: 'buhid',
    name: 'Buhid',
    script: 'buhid',
    symbol: 'ᝐ',
  },
  {
    slug: 'hanunoo',
    name: 'Hanunoo',
    script: 'hanunoo',
    symbol: 'ᜀ',
  },
  {
    slug: 'tagalog',
    name: 'Tagalog',
    script: 'tagalog',
    symbol: 'ᜀ',
  },
  {
    slug: 'tagbanwa',
    name: 'Tagbanwa',
    script: 'tagbanwa',
    symbol: 'ᝀ',
  },
  {
    slug: 'sundanese',
    name: 'Sundanese',
    script: 'sundanese',
    symbol: 'ᮃ',
  },
  {
    slug: 'rejang',
    name: 'Rejang',
    script: 'rejang',
    symbol: 'ꤰ',
  },
  {
    slug: 'batak',
    name: 'Batak',
    script: 'batak',
    symbol: 'ᯀ',
  },
  {
    slug: 'lepcha',
    name: 'Lepcha',
    script: 'lepcha',
    symbol: 'ᰀ',
  },
  {
    slug: 'limbu',
    name: 'Limbu',
    script: 'limbu',
    symbol: 'ᤀ',
  },
  {
    slug: 'meetei-mayek',
    name: 'Meetei Mayek',
    script: 'meetei-mayek',
    symbol: 'ꯀ',
  },
  {
    slug: 'chakma',
    name: 'Chakma',
    script: 'chakma',
    symbol: '𑄚',
  },
  {
    slug: 'cham',
    name: 'Cham',
    script: 'cham',
    symbol: 'ꨀ',
  },
  {
    slug: 'tai-tham',
    name: 'Tai Tham',
    script: 'tai-tham',
    symbol: 'ᨠ',
  },
  {
    slug: 'tai-viet',
    name: 'Tai Viet',
    script: 'tai-viet',
    symbol: 'ꫛ',
  },
  {
    slug: 'new-tai-lue',
    name: 'New Tai Lue',
    script: 'new-tai-lue',
    symbol: 'ᦝ',
  },
  {
    slug: 'syloti-nagri',
    name: 'Syloti Nagri',
    script: 'syloti-nagri',
    symbol: 'ꠀ',
  },
  {
    slug: 'kawi',
    name: 'Kawi',
    script: 'kawi',
    symbol: '𑼪',
  },
  {
    slug: 'kayah-li',
    name: 'Kayah Li',
    script: 'kayah-li',
    symbol: 'ꤢ꤭',
  },
  {
    slug: 'pau-cin-hau',
    name: 'Pau Cin Hau',
    script: 'pau-cin-hau',
    symbol: '𑫀',
  },
  {
    slug: 'saurashtra',
    name: 'Saurashtra',
    script: 'saurashtra',
    symbol: 'ꢂ',
  },
  {
    slug: 'chorasmian',
    name: 'Chorasmian',
    script: 'chorasmian',
    symbol: '𐿄',
  },
  {
    slug: 'elymaic',
    name: 'Elymaic',
    script: 'elymaic',
    symbol: '𐿠',
  },
  {
    slug: 'khudawadi',
    name: 'Khudawadi',
    script: 'khudawadi',
    symbol: '𑊀',
  },
  {
    slug: 'marchen',
    name: 'Marchen',
    script: 'marchen',
    symbol: '𑱰',
  },
  {
    slug: 'multani',
    name: 'Multani',
    script: 'multani',
    symbol: '𑊀',
  },
  {
    slug: 'nag-mundari',
    name: 'Nag Mundari',
    script: 'nag-mundari',
    symbol: '𞓐',
  },
  {
    slug: 'ottoman-siyaq',
    name: 'Ottoman Siyaq',
    script: 'ottoman-siyaq',
    symbol: '𞴃',
  },
  {
    slug: 'sogdian',
    name: 'Sogdian',
    script: 'sogdian',
    symbol: '𐼰',
  },
  {
    slug: 'soyombo',
    name: 'Soyombo',
    script: 'soyombo',
    symbol: '𑩐',
  },
  {
    slug: 'toto',
    name: 'Toto',
    script: 'toto',
    symbol: '𞊜',
  },
  {
    slug: 'yezidi',
    name: 'Yezidi',
    script: 'yezidi',
    symbol: '𐺐',
  },
  {
    slug: 'zanabazar-square',
    name: 'Zanabazar Square',
    script: 'zanabazar-square',
    symbol: '𑨀',
  },
  {
    slug: 'cypro-minoan',
    name: 'Cypro Minoan',
    script: 'cypro-minoan',
    symbol: '𒾤',
  },
  {
    slug: 'duployan',
    name: 'Duployan',
    script: 'duployan',
    symbol: '𛰤',
  },
  {
    slug: 'shavian',
    name: 'Shavian',
    script: 'shavian',
    symbol: '𐑺',
  },
].map(script => ({
  ...script,
  search: `${script.name} ${script.symbol}`.toLowerCase(),
}))

function Body() {
  const [search, setSearch] = useState<string | undefined>()

  const pattern = search ? search.toLowerCase() : undefined
  const filteredScripts = pattern
    ? SCRIPTS.filter(script => script.search.match(pattern))
    : SCRIPTS

  return (
    <>
      <div className="relative w-full pb-64 flex flex-col gap-16 p-16">
        <TextInput
          size="large"
          value={search}
          placeholder="Search script name (egyptian, etc.)"
          onChange={setSearch}
        />

        {/* <H2 className="!text-2xl !mb-0 !text-gray-600 !border-0 text-center uppercase scale-y-80 tracking-wide-015">
          Ancient
        </H2> */}
        {filteredScripts.length ? (
          <Grid
            minWidth={192}
            gap={16}
            maxColumns={4}
            align="center"
          >
            {filteredScripts.map(script => (
              <ScriptLink
                key={script.slug}
                {...script}
              />
            ))}
          </Grid>
        ) : null}
      </div>
    </>
  )
}

function ScriptLink({
  className,
  slug,
  name,
  script,
  symbol,
  disabled = false,
  weight,
}: {
  className?: string
  slug: string
  name: string
  script?: string
  disabled?: boolean
  symbol?: string
  weight?: string
}) {
  if (disabled) {
    return (
      <div
        className={clsx(
          className,
          'overflow-hidden shadow-small1 flex flex-col bg-gray-100 text-left p-16 h-full rounded-sm w-full',
        )}
      >
        {symbol && (
          <T
            script={script}
            tag="i"
            className={clsx(
              weight && `font-${weight}`,
              'block text-mega text-gray-800 h-156',
            )}
          >
            {symbol}
          </T>
        )}
        <T className="block font-semibold lowercase text-h4 text-gray-500">
          {name}
        </T>
      </div>
    )
  }

  return (
    <NextLink
      href={`/scripts/${slug}`}
      className={clsx(
        className,
        'overflow-hidden text-center shadow-small1 hover:shadow-small2 flex flex-col bg-gray-50 [&>div]:hover:text-violet-600 [&>div]:transition-colors transition-all duration-200 p-16 h-full rounded-sm [&_span]:hover:text-violet-600 [&_i]:hover:text-violet-600',
      )}
    >
      {symbol && (
        <T
          script={script}
          tag="i"
          className={clsx(
            weight && `font-${weight}`,
            'block text-mega text-gray-800 transition-colors h-156',
          )}
        >
          {symbol}
        </T>
      )}
      <T className="block font-semibold lowercase text-h4 text-gray-500 transition-colors">
        {name}
      </T>
    </NextLink>
  )
}
