import { SectionPage } from '~/lib/frontend/components/Section'
import PAGE from './page.yaml'

import type { Metadata } from 'next'

export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: PAGE.resources.title,
    description: PAGE.resources.descrpition,
  }
}

export default function Page() {
  return <SectionPage {...PAGE} />
}

// // ## Action Words

// // - siz

// // ## Object Words

// // - siz

// // ## Feature Words

// // - siz

// // ## Modifier Words

// // Modifiers are root words preceding realized words

// // - red tree
// // - quickly grows
// // - big old black bird

// // ## Action Time Modifiers

// // A list of "verb tenses"

// // [each tense]

// // ## Pronouns

// // [pronoun]

// // ## Common Object Modifiers

// // [pronoun]

// // ## Sentences
