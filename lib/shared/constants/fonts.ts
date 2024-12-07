import {
  FONT as fonts,
  SCRIPT as scripts,
} from '@termsurf/leaf/constant/settings'

export const FONT = {
  ...fonts,
  MiSansTibetan: {
    lineHeight: {
      heading: 2.1,
      body: 1.9,
      base: 1,
    },
    test: '',
    family: 'MiSansTibetan',
    styles: [
      {
        weight: 400,
      },
      {
        weight: 700,
      },
    ],
  },
  CuneiformComposite: {
    lineHeight: {
      heading: 1.2,
      body: 1.7,
      base: 1,
    },
    test: '',
    family: 'CuneiformComposite',
    styles: [
      {
        weight: 400,
      },
      {
        weight: 700,
      },
    ],
  },
}

export const SCRIPT = {
  ...scripts,
  cuneiform: {
    default: 'modern',
    font: 'modern',
    fonts: {
      modern: 'CuneiformComposite',
    },
  },
  tibetan: {
    default: 'modern',
    font: 'modern',
    fonts: {
      modern: 'MiSansTibetan',
    },
  },
}
