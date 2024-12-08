'use client'

import Box from '@termsurf/leaf/component/Box'
import { LinkButton } from '@termsurf/leaf/component/Button'
import { A } from '@termsurf/leaf/component/Content'
import Section from '~/lib/frontend/components/Section'

export default function Page() {
  return (
    <Section.Environment path="/guides/conscripts/adding">
      <Content />
    </Section.Environment>
  )
}

function Content() {
  return (
    <Section>
      <Section.Header>
        <Section.H1>Showcase Your Conscript</Section.H1>
        <Section.P>
          Your conscript is more than just a writing system, it's an
          artistic expression, a cultural artifact, and a vital part of
          your worldbuilding. But scattered notes, rough sketches, and
          unpolished designs don't do it justice. With WordSurf, you can
          organize, refine, and share your conscript with the world in a
          way that captures its beauty and complexity.
        </Section.P>
      </Section.Header>

      <Section.Block>
        <Section.H2>Compose Your Masterpiece</Section.H2>
        <Section.P>
          Imagine this. You've spent countless hours perfecting your
          conscript. You've designed unique glyphs, carefully considered
          their pronunciation, and even thought about how they'd look in
          different styles. But when you look at your work, it's spread
          across notebooks, image files, and random notes. It feels
          incomplete.
        </Section.P>
        <Section.P>
          Then you discover WordSurf. You start by uploading your
          designs and organizing them into categories: consonants,
          vowels, diacritics, and punctuation. Within minutes, your
          conscript is transformed into a polished, interactive chart.
          It's no longer just a collection of symbols. It's a cohesive,
          living system.
        </Section.P>
        <Section.P>
          Want to share it? Export it as a printable guide, an
          interactive webpage, or a professional-looking PDF. Need to
          make changes? Update your glyphs or add new ones, and your
          showcase updates instantly. Your conscript evolves, and
          WordSurf evolves with it.
        </Section.P>
        <Section.P>
          No more scattered files. No more disorganized sketches. Just a
          professional, polished, and shareable script you can be proud
          of.
        </Section.P>
      </Section.Block>

      <Section.Block>
        <Section.H2>Why WordSurf?</Section.H2>
        <Section.List>
          <Section.Item label="Because Your Conscript Deserves More Than Sketches">
            Transform your glyph designs into a beautifully organized
            and professional-looking showcase, ready for sharing or
            printing.
          </Section.Item>
          <Section.Item label="Because Inspiration Strikes at Any Time">
            Update your conscript whenever creativity strikes, and
            export the updated version instantly without any hassle.
          </Section.Item>
          <Section.Item label="Because Every Script Tells a Story">
            Your conscript is more than a set of glyphs—it's a vision of
            a culture and a world. WordSurf helps you share that story
            with precision and beauty.
          </Section.Item>
          <Section.Item label="Because Presentation Matters">
            A polished presentation can make your conscript stand out,
            whether it's for a game, a story, or a personal project.
          </Section.Item>
          <Section.Item label="Because Tools Should Work for You">
            No more struggling with clunky design software or formatting
            issues. WordSurf makes it easy to bring your conscript to
            life.
          </Section.Item>
          <Section.Item label="Because You've Already Done the Hard Part">
            Designing a script from scratch is no small feat. Let
            WordSurf handle the organization, formatting, and
            presentation.
          </Section.Item>
        </Section.List>
      </Section.Block>

      <Section.Block>
        <Section.H2>What You Can Do with WordSurf</Section.H2>
        <Section.List>
          <Section.Item label="Showcase Your Glyphs with Precision">
            Create interactive and printable charts for your script,
            complete with categories for consonants, vowels, and
            diacritics.
          </Section.Item>
          <Section.Item label="Create a Visual Guide in Minutes">
            Automatically generate a professional-looking guide to your
            conscript, complete with glyph descriptions and usage
            examples.
          </Section.Item>
          <Section.Item label="Export Your Conscript as a PDF or Webpage">
            Share your conscript as a polished PDF, interactive webpage,
            or even a physical book.
          </Section.Item>
          <Section.Item label="Update and Refine Anytime">
            Add new glyphs, tweak existing ones, or reorganize your
            categories, and see your showcase update instantly.
          </Section.Item>
        </Section.List>
      </Section.Block>

      <Section.Block>
        <Section.H2>How It Works</Section.H2>
        <Section.P>
          Creating and showcasing your conscript on WordSurf is as
          simple as following three steps. We've made the process
          effortless so you can focus on your creativity while we handle
          the rest.
        </Section.P>

        <Section.H3>Add Your Conscript</Section.H3>
        <Section.P>
          Start by visiting our{' '}
          <A href="/guides/conscripts/adding/how">Add Your Conscript</A>{' '}
          page. Here, you’ll find clear instructions on how to submit
          your conscript, including the required file types and
          organization tips. Provide your glyph designs, categories
          (e.g., consonants, vowels, punctuation), and any optional IPA
          pronunciations to make your conscript truly shine.
        </Section.P>

        <Section.H3>Organize and Refine</Section.H3>
        <Section.P>
          Once uploaded, WordSurf automatically structures your
          conscript into a visually appealing and interactive format.
          Use our tools to organize glyphs into categories, add
          descriptions, or tweak layouts. Need inspiration? Check out
          our <A href="/guides/adding/how">Guides</A> for detailed
          examples and best practices.
        </Section.P>

        <Section.H3>Publish and Share</Section.H3>
        <Section.P>
          When you’re ready, export your conscript as a PDF, an
          interactive webpage, or a printable guide. Share it with your
          friends, community, or collaborators—or keep refining it as
          your ideas evolve. Every update is instantly reflected in your
          conscript’s showcase.
        </Section.P>

        <Box
          layout="horizontal"
          items="center"
          justify="center"
          padding={16}
          paddingBottom={48}
        >
          <LinkButton href="/guides/conscripts/adding/how">
            Add Your Conscript
          </LinkButton>
        </Box>
      </Section.Block>

      <Section.Block>
        <Section.H2>No Risk</Section.H2>
        <Section.List>
          <Section.Item label="Free">
            WordSurf is completely free to use. No hidden fees, no
            subscriptions, no strings attached.
          </Section.Item>
          <Section.Item label="Open Source">
            Our platform is open source, meaning you can trust it to
            remain accessible and transparent.
          </Section.Item>
          <Section.Item label="No Installation Required">
            Everything is online. Start creating your conscript in
            minutes without downloading or installing anything.
          </Section.Item>
          <Section.Item label="Unlimited Updates">
            Your conscript will grow and evolve over time, and WordSurf
            will always support your updates without extra cost.
          </Section.Item>
        </Section.List>
      </Section.Block>

      <Section.Block>
        <Section.H2>Get Started</Section.H2>
        <Section.P>
          Ready to bring your conscript to life? Start using WordSurf
          today and create something truly extraordinary.
        </Section.P>
        <Section.P>
          Have questions? Reach out to us anytime at{' '}
          <A href="mailto:base@term.surf">base@term.surf</A> or join the
          conversation on our{' '}
          <A href="https://github.com/termsurf/word.surf/discussions">
            GitHub Discussions
          </A>
          .
        </Section.P>
      </Section.Block>
    </Section>
  )
}
