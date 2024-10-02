import {
  FONT as fonts,
  SCRIPT as scripts,
} from '@termsurf/leaf/constant/settings'

export const FONT = {
  ...fonts,
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
}
