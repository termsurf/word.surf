'use client'

import Box from '@termsurf/leaf/component/Box'
import { LinkButton } from '@termsurf/leaf/component/Button'
import {
  A,
  Code,
  H4,
  Li,
  P,
  Ul,
} from '@termsurf/leaf/component/Content'
import Tag from '@termsurf/leaf/component/Tag'
import Section from '~/lib/frontend/components/Section'

// export const metadata = {
//   title: 'Adding Your Conscript to WordSurf',
//   description: 'The how for adding your conscript to WordSurf',
// }

export default function Page() {
  return (
    <Section.Environment path="/guides/earth-climate-cycles">
      <Content />
    </Section.Environment>
  )
}

function Content() {
  return (
    <Section>
      <Section.Header>
        <Section.H1>Adding Your Conscript</Section.H1>
        <Section.P>
          The how for adding your conscript to WordSurf
        </Section.P>
        <P>
          Welcome to the <strong>WordSurf community</strong>! We're
          excited to help you share your <strong>conscript</strong> with
          the world. Adding your script to our open-source platform is
          simple, here's how to get started.
        </P>
      </Section.Header>
      <Section.Block>
        <Section.H2>What You Need to Prepare</Section.H2>
        <P>
          To showcase your conscript on WordSurf, we'll need a few key
          things from you.
        </P>
        <Section.H3>Font</Section.H3>
        <P>
          Your font helps us display your conscript <em>beautifully</em>{' '}
          on our glyph pages, like{' '}
          <A href="/scripts/hebrew/alphabet">on Hebrew</A>.
        </P>
        <Section.List>
          <Section.Item label="Sans Serif Fonts">
            Preferred for the main showcase. Though we can use any font
            style here!
          </Section.Item>
          <Section.Item label="Multiple Fonts">
            Got a decorative or serif font? We'd love to feature it in
            the fonts section!
          </Section.Item>
        </Section.List>
        <P>
          Your script will then be added to our{' '}
          <A href="/scripts">script homepage</A>, so let us know what 1
          glyphs best represents your script.
        </P>
        <Section.H3>
          Glyph Categories{' '}
          <Box display="block">
            <Tag color="blue">Optional</Tag>
          </Box>
        </Section.H3>
        <P>
          Help readers learn your script faster by organizing your
          glyphs into categories, like we did on the{' '}
          <A href="/scripts/latin">Latin script</A>.
        </P>
        <Ul>
          <Li>
            <strong>Consonants</strong>
          </Li>
          <Li>
            <strong>Vowels</strong>
          </Li>
          <Li>
            <strong>Punctuation</strong>
          </Li>
          <Li>
            <strong>Other</strong>
          </Li>
        </Ul>
        <Section.H3>
          IPA Pronunciations{' '}
          <Box display="block">
            <Tag color="blue">Optional</Tag>
          </Box>
        </Section.H3>
        <P>
          If your script is phonetic, include the{' '}
          <strong>IPA pronunciation</strong> for each glyph. This will
          allow others to understand how to pronounce your characters.
        </P>
        <Section.H3>
          Documentation{' '}
          <Box display="block">
            <Tag color="blue">Optional</Tag>
          </Box>
        </Section.H3>
        <P>
          Have guides, background, or cultural details about your
          script? We'd love to add them to our <Code>/guides</Code>{' '}
          section. However, this isn't required to get started.
        </P>
      </Section.Block>
      <Section.Block>
        <Section.H2>How to Submit Your Conscript</Section.H2>
        <Section.P>Here's how you can share your materials.</Section.P>
        <Section.H3>File Types We Accept</Section.H3>
        <Section.List>
          <Section.Item label="Fonts">
            .otf, .ttf, .woff, or any font file format you prefer.
          </Section.Item>
          <Section.Item label="Spreadsheets">
            Include glyphs in alphabetic or other order, IPA
            pronunciations, and categories (e.g., consonant, vowel).
          </Section.Item>
          <Section.Item label="Docs">
            Perfect for guides, descriptions, or any additional context.
            These can be PDFs or Word Docs.
          </Section.Item>
        </Section.List>
        <Section.H3>Submission Methods</Section.H3>
        <H4>Email Us</H4>
        <P>
          Send your fonts, spreadsheets, and docs to{' '}
          <strong>
            <A href="mailto:base@term.surf">base@term.surf</A>
          </strong>
          .
        </P>
        <Box
          layout="horizontal"
          items="center"
          justify="center"
          padding={16}
          paddingTop={0}
          paddingBottom={48}
        >
          <LinkButton href="mailto:base@term.surf">Email Us</LinkButton>
        </Box>
        <H4>Start a Discussion on GitHub</H4>
        <P>
          Have questions or want to collaborate? Post on our{' '}
          <A href="https://github.com/termsurf/word.surf/discussions">
            GitHub Discussions page
          </A>
          .
        </P>
        <Box
          layout="horizontal"
          items="center"
          justify="center"
          padding={16}
          paddingTop={0}
          paddingBottom={48}
        >
          <LinkButton href="https://github.com/termsurf/word.surf/discussions">
            Discuss on GitHub
          </LinkButton>
        </Box>
      </Section.Block>
      <Section.Block>
        <Section.H2>Questions? We're Here to Help</Section.H2>
        <P>
          Whether you're unsure about formatting, categories, or
          anything else, don't hesitate to reach out. Together, we can
          make your conscript a part of the WordSurf collection!
        </P>
        <Section.H3>A Few Notes</Section.H3>
        <P>
          The submission process is still evolving as WordSurf grows, so
          don't worry if things feel a bit informal. We'll guide you
          every step of the way!
        </P>
      </Section.Block>
    </Section>
  )
}
