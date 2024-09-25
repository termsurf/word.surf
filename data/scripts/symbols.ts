import talk from '@termsurf/talk'
import devanagari from '@termsurf/text/devanagari'
import tibetan from '@termsurf/text/tibetan'

const TIBETAN_FRACTIONS = [
  -0.5, 0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5,
]

const ROMAN_NUMERALS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 50, 100, 500, 1000, 10000, 100,
  6, 50,
]

const DEVANAGARI_VOWEL_DIACRITICS =
  `\u093A \u093B \u093E \u093F \u0940 \u0941 \u0942 \u0943 \u0944 \u0945 \u0946 \u0947 \u0948 \u0949 \u094A \u094B \u094C \u094E \u094F \u0955 \u0956 \u0962 \u0963`.split(
    /\s+/,
  )

const DEVANAGARI_CONSONANTS =
  `\u0915 \u0916 \u0917 \u0918 \u0919 \u091A \u091B \u091C \u091D \u091E \u091F \u0920 \u0921 \u0922 \u0923 \u0924 \u0925 \u0926 \u0927 \u0928 \u092A \u092B \u092C \u092D \u092E \u092F \u0930 \u0932 \u0935 \u0936 \u0937 \u0938 \u0939`.split(
    /\s+/,
  )

export const sets = {
  latin: {
    letters: {
      name: 'Letters',
      slug: 'letters',
      symbols: () =>
        `A B C D E F G H I J K L M N O P Q R S T U V W X Y Z Æ Ɑ	Ꞵ	Ð	Ǝ	Ə	Ɛ	Ɣ	I	Ɩ	Ŋ	Œ	Ɔ	Ꞷ	Ʊ	ẞ	Ʃ	Þ	Ʋ	Ƿ	Ȝ	Ʒ	ʔ`
          .split(/\s+/)
          .map(text => ({ text })),
      links: {
        standard: {
          name: 'Standard Letters',
          slug: 'letters/standard',
          overview: () =>
            `A B C D E F G H I J K L M N O P Q R S T U V W X Y Z`
              .split(/\s+/)
              .map(text => ({ text })),
          symbols: () =>
            `A B C D E F G H I J K L M N O P Q R S T U V W X Y Z`
              .split(/\s+/)
              .map(x => `${x}${x.toLowerCase()}`)
              .map(text => ({ text })),
          links: {
            uppercase: {
              name: 'Standard Uppercase Letters',
              slug: 'letters/standard/uppercase',
              symbols: () =>
                `A B C D E F G H I J K L M N O P Q R S T U V W X Y Z`
                  .split(/\s+/)
                  .map(text => ({ text })),
            },
            lowercase: {
              name: 'Standard Lowercase Letters',
              slug: 'letters/standard/lowercase',
              symbols: () =>
                `A B C D E F G H I J K L M N O P Q R S T U V W X Y Z`
                  .split(/\s+/)
                  .map(x => x.toLowerCase())
                  .map(text => ({ text })),
            },
          },
        },
        modified: {
          name: 'Modified Letters',
          slug: 'letters/modified',
          symbols: () =>
            `Á À Ȧ Â Ä Ǟ Ǎ Ă Ā Ã Å Ǻ Ǽ Ǣ Ḅ Ć Ċ Ĉ Č Ď Ḍ Ḑ Ḓ É È Ė Ê Ë Ě Ĕ Ē Ẽ E̊ Ẹ Ǵ Ġ Ĝ Ǧ Ğ G̃ Ģ Ĥ Ḥ Í Ì İ Î Ï Ǐ Ĭ Ī Ĩ Ị Ĵ Ķ Ǩ Ĺ Ļ Ľ Ŀ Ḷ Ḽ M̂ M̄ ʼN Ń N̂ Ṅ N̈ Ň N̄ Ñ Ņ Ṋ Ó Ò Ȯ Ȱ Ô Ö Ȫ Ǒ Ŏ Ō Õ Ȭ Ő Ọ Ǿ Ơ P̄ Ŕ Ř Ŗ Ṛ Ś Ŝ Ṡ Š Ș Ṣ Ť Ț Ṭ Ṱ Ú Ù Û Ü Ǔ Ŭ Ū Ũ Ű Ů Ụ Ẃ Ẁ Ŵ Ẅ Ẋ Ý Ỳ Ŷ Ÿ Ȳ Ỹ Ź Ż Ž Ẓ Ǯ`
              .split(/\s+/)
              .map(x => `${x}${x.toLowerCase()}`)
              .map(text => ({ text })),
          links: {
            uppercase: {
              name: 'Uppercase Modified Letters',
              slug: 'letters/modified/uppercase',
              symbols: () =>
                `Á À Ȧ Â Ä Ǟ Ǎ Ă Ā Ã Å Ǻ Ǽ Ǣ Ḅ Ć Ċ Ĉ Č Ď Ḍ Ḑ Ḓ É È Ė Ê Ë Ě Ĕ Ē Ẽ E̊ Ẹ Ǵ Ġ Ĝ Ǧ Ğ G̃ Ģ Ĥ Ḥ Í Ì İ Î Ï Ǐ Ĭ Ī Ĩ Ị Ĵ Ķ Ǩ Ĺ Ļ Ľ Ŀ Ḷ Ḽ M̂ M̄ ʼN Ń N̂ Ṅ N̈ Ň N̄ Ñ Ņ Ṋ Ó Ò Ȯ Ȱ Ô Ö Ȫ Ǒ Ŏ Ō Õ Ȭ Ő Ọ Ǿ Ơ P̄ Ŕ Ř Ŗ Ṛ Ś Ŝ Ṡ Š Ș Ṣ Ť Ț Ṭ Ṱ Ú Ù Û Ü Ǔ Ŭ Ū Ũ Ű Ů Ụ Ẃ Ẁ Ŵ Ẅ Ẋ Ý Ỳ Ŷ Ÿ Ȳ Ỹ Ź Ż Ž Ẓ Ǯ`
                  .split(/\s+/)
                  .map(text => ({ text })),
            },
            lowercase: {
              name: 'Lowercase Modified Letters',
              slug: 'letters/modified/lowercase',
              symbols: () =>
                `Á À Ȧ Â Ä Ǟ Ǎ Ă Ā Ã Å Ǻ Ǽ Ǣ Ḅ Ć Ċ Ĉ Č Ď Ḍ Ḑ Ḓ É È Ė Ê Ë Ě Ĕ Ē Ẽ E̊ Ẹ Ǵ Ġ Ĝ Ǧ Ğ G̃ Ģ Ĥ Ḥ Í Ì İ Î Ï Ǐ Ĭ Ī Ĩ Ị Ĵ Ķ Ǩ Ĺ Ļ Ľ Ŀ Ḷ Ḽ M̂ M̄ ʼN Ń N̂ Ṅ N̈ Ň N̄ Ñ Ņ Ṋ Ó Ò Ȯ Ȱ Ô Ö Ȫ Ǒ Ŏ Ō Õ Ȭ Ő Ọ Ǿ Ơ P̄ Ŕ Ř Ŗ Ṛ Ś Ŝ Ṡ Š Ș Ṣ Ť Ț Ṭ Ṱ Ú Ù Û Ü Ǔ Ŭ Ū Ũ Ű Ů Ụ Ẃ Ẁ Ŵ Ẅ Ẋ Ý Ỳ Ŷ Ÿ Ȳ Ỹ Ź Ż Ž Ẓ Ǯ`
                  .split(/\s+/)
                  .map(x => x.toLowerCase())
                  .map(text => ({ text })),
            },
          },
        },
        consonants: {
          name: 'Consonants',
          slug: 'letters/consonants',
          symbols: () =>
            `B C D F G H J K L M N P Q R S T V W X Y Z`
              .split(/\s+/)
              .map(text => ({ text })),
          links: {
            flats: {
              name: 'Flat Consonants',
              slug: 'letters/consonants/flats',
              symbols: () =>
                `m n d b t k h s f v z x c w l r`
                  .split(/\s+/)
                  .map(text => ({ text })),
            },
          },
        },
        vowels: {
          name: 'Vowels',
          slug: 'letters/vowels',
          symbols: () =>
            `A E I O U`.split(/\s+/).map(text => ({ text })),
        },
      },
    },
    numbers: {
      name: 'Numbers',
      slug: 'numbers',
      symbols: () =>
        `0 1 2 3 4 5 6 7 8 9`.split(/\s+/).map(text => ({ text })),
    },
    punctuation: {
      name: 'Punctuation',
      slug: 'punctuation',
      symbols: () =>
        `! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ { | } ~ \``
          .split(/\s+/)
          .map(text => ({ text })),
    },
    fractions: {
      name: 'Fractions',
      slug: 'fractions',
      symbols: () =>
        `⅐ ⅑ ⅒ ⅓ ⅔ ⅕ ⅖ ⅗ ⅘ ⅙ ⅚ ⅛ ⅜ ⅝ ⅞ ⅟ ↉`
          .split(/\s+/)
          .map(text => ({ text })),
    },
    'roman-numerals': {
      name: 'Roman Numerals',
      slug: 'roman-numerals',
      symbols: () =>
        `Ⅰ Ⅱ Ⅲ Ⅳ Ⅴ Ⅵ Ⅶ Ⅷ Ⅸ Ⅹ Ⅺ Ⅻ Ⅼ Ⅽ Ⅾ Ⅿ ↀ ↁ ↂ Ↄ ↅ ↆ`
          .split(/\s+/)
          .map((text, i) => ({
            text,
            hint: ROMAN_NUMERALS[i]?.toLocaleString(),
          })),
      links: {
        lowercase: {
          name: 'Lowercase Roman Numerals',
          slug: 'roman-numerals/lowercase',
          symbols: () =>
            `ⅰ ⅱ ⅲ ⅳ ⅴ ⅵ ⅶ ⅷ ⅸ ⅹ ⅺ ⅻ ⅼ ⅽ ⅾ ⅿ`
              .split(/\s+/)
              .map((text, i) => ({
                text,
                hint: ROMAN_NUMERALS[i]?.toLocaleString(),
              })),
        },
      },
    },
    subscripts: {
      name: 'Subscripts',
      slug: 'subscripts',
      symbols: () =>
        `₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉ ₊ ₋ ₌ ₍ ₎ ₐ ₑ ₒ ₓ ₔ ₕ ₖ ₗ ₘ ₙ ₚ ₛ ₜ`
          .split(/\s+/)
          .map(text => ({ text: `x${text}` })),
    },
    superscripts: {
      name: 'Superscripts',
      slug: 'superscripts',
      symbols: () =>
        `⁰ ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹ ⁺ ⁻ ⁼ ⁽ ⁾ ⁿ ⁱ`
          .split(/\s+/)
          .map(text => ({ text: `x${text}` })),
    },
    diacritics: {
      name: 'Diacritics',
      slug: 'diacritics',
      symbols: () =>
        `\u0300 \u0301 \u0302 \u0303 \u0304 \u0305 \u0306 \u0307 \u0308 \u0309 \u030A \u030B \u030C \u030D \u030E \u030F \u0310 \u0311 \u0312 \u0313 \u0314 \u0315 \u0316 \u0317 \u0318 \u0319 \u031A \u031B \u031C \u031D \u031E \u031F \u0320 \u0321 \u0322 \u0323 \u0324 \u0325 \u0326 \u0327 \u0328 \u0329 \u032A \u032B \u032C \u032D \u032E \u032F \u0330 \u0331 \u0332 \u0333 \u0334 \u0335 \u0336 \u0337 \u0338 \u0339 \u033A \u033B \u033C \u033D \u033E \u033F \u0340 \u0341 \u0342 \u0343 \u0344 \u0345 \u0346 \u0347 \u0348 \u0349 \u034A \u034B \u034C \u034D \u034E \u034F \u0350 \u0351 \u0352 \u0353 \u0354 \u0355 \u0356 \u0357 \u0358 \u0359 \u035A \u035B \u035C \u035D \u035E \u035F \u0360 \u0361 \u0362 \u0363 \u0364 \u0365 \u0366 \u0367 \u0368 \u0369 \u036A \u036B \u036C \u036D \u036E \u036F`
          .split(/\s+/)
          .map(text => ({ text: `\u25cc${text}` })),
    },
  },
  tibetan: {
    consonants: {
      name: 'Consonants',
      slug: 'consonants',
      symbols: () =>
        `ཀ ཁ ག ང ཅ ཆ ཇ ཉ ཏ ཐ ད ན པ ཕ བ མ ཙ ཚ ཛ ཝ ཞ ཟ འ ཡ ར ལ ཤ ས ཧ`
          .split(/\s+/)
          .map(text => ({ text, hint: talk(tibetan(text)) })),
    },
    numbers: {
      name: 'Numbers',
      slug: 'numbers',
      symbols: () =>
        `༠	༡	༢	༣	༤	༥	༦	༧	༨	༩`
          .split(/\s+/)
          .map((text, i) => ({ text, hint: String(i) })),
    },
    punctuation: {
      name: 'Punctuation',
      slug: 'punctuation',
      symbols: () =>
        `༄ ༅ ༃ ༁ ༆ ༉ ་ ། ༎ ༑ ༏ ༐ ༈ ༔ ༒ ༸ ༴ ༓ ༼ ༽ ༺ ༻`
          .split(/\s+/)
          .map(text => ({ text })),
    },
    fractions: {
      name: 'Fractions',
      slug: 'fractions',
      symbols: () =>
        `༳ ༪ ༫ ༬ ༭ ༮ ༯ ༰ ༱ ༲`.split(/\s+/).map((text, i) => ({
          text,
          hint: TIBETAN_FRACTIONS[i].toString(),
        })),
    },
  },
  devanagari: {
    vowels: {
      name: 'Vowels',
      slug: 'vowels',
      symbols: () =>
        `\u0904 \u0905 \u0906 \u0907 \u0908 \u0909 \u090A \u090B \u090C \u090D \u090F \u090E \u0910 \u0911 \u0912 \u0913 \u0914 \u0960 \u0961 \u0972`
          .split(/\s+/)
          .map(text => ({ text, hint: talk(devanagari(text)) })),
      links: {
        diacritics: {
          name: 'Vowel diacritics',
          slug: 'vowels/diacritics',
          symbols: () =>
            DEVANAGARI_VOWEL_DIACRITICS.map(text => ({
              text,
              slug: point(text),
            })),
        },
      },
    },
    consonants: {
      name: 'Consonants',
      slug: 'consonants',
      symbols: () =>
        DEVANAGARI_CONSONANTS.map(text => ({
          text,
          hint: talk(devanagari(text)),
        })),
      links: {
        extensions: {
          name: 'Consonant Extensions',
          slug: 'consonants/extensions',
          symbols: () =>
            `\u0933 \u0915 \u0924 \u091C \u0936 \u0915 \u0916 \u0917 \u091C \u092B \u0921 \u0922`
              .split(/\s+/)
              .map(text => ({ text, hint: talk(devanagari(text)) })),
        },
      },
    },
  },
}

export const symbols = {
  devanagari: {},
}

DEVANAGARI_VOWEL_DIACRITICS.forEach(text => {
  symbols.devanagari[point(text)] = {
    name: text,
    slug: point(text),
    links: {
      bindings: {
        name: `Bindings`,
        slug: `${point(text)}/bindings`,
        symbols: () =>
          DEVANAGARI_CONSONANTS.map(x => ({
            text: `${x}${text}`,
            hint: talk(devanagari(`${x}${text}`)),
          })),
      },
    },
  }
})

function point(text: string) {
  return `U+${text
    .codePointAt(0)
    ?.toString(16)
    .toUpperCase()
    .padStart(4, '0')}`
}
