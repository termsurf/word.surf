const symbols = {
  latin: {
    letters: {
      name: 'Letters',
      slug: 'letters',
      symbols: () =>
        `A B C D E F G H I J K L M N O P Q R S T U V W X Y Z`.split(
          /\s+/,
        ),
      links: {
        consonants: {
          name: 'Consonants',
          slug: 'letters/consonants',
          symbols: () =>
            `B C D F G H J K L M N P Q R S T V W X Y Z`.split(/\s+/),
          links: {
            flats: {
              name: 'Flat Consonants',
              slug: 'letters/consonants/flats',
              symbols: () =>
                `m n d b t k h s f v z x c w l r`.split(/\s+/),
            },
          },
        },
        vowels: {
          name: 'Vowels',
          slug: 'letters/vowels',
          symbols: () => `A E I O U`.split(/\s+/),
        },
      },
    },
    numbers: {
      name: 'Numbers',
      slug: 'numbers',
      symbols: () => `0 1 2 3 4 5 6 7 8 9`.split(/\s+/),
      links: {},
    },
  },
  tibetan: {},
}

export default symbols
