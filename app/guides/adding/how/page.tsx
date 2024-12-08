'use client'

import Box from '@termsurf/leaf/component/Box'
import { LinkButton } from '@termsurf/leaf/component/Button'
import { A, Code, Li, P, Ul } from '@termsurf/leaf/component/Content'
import Section from '~/lib/frontend/components/Section'

export default function Page() {
  return (
    <Section.Environment path="/guides/adding/how">
      <Content />
    </Section.Environment>
  )
}

function Content() {
  return (
    <Section>
      <Section.Header>
        <Section.H1>Adding Guides to WordSurf</Section.H1>
        <P>
          <em>
            <strong>Note</strong>: For now, we can convert your existing
            content into production ready website content! Just email us
            the raw content and we will get to working as soon as we
            can.
          </em>
        </P>
        <P>
          Guides on WordSurf are beautifully designed documents that use
          our standard components to display various types of content.
          They are written in <A href="https://yaml.org">YAML</A>, a
          simple and human-readable data modeling language, similar to
          HTML. Each element in your guide has properties that can be
          customized to fit your needs. However, the styles are
          intentionally normalized to ensure consistent and
          aesthetically pleasing designs across the site, regardless of
          user-generated content.
        </P>
        <P>
          This guide will walk you through how to create and submit
          guides for WordSurf. Whether you're documenting a conlang,
          conscript, or other language-related content, you'll find
          everything you need here.
        </P>
      </Section.Header>

      <Section.Block>
        <Section.H2>Why Use WordSurf for Your Guides?</Section.H2>
        <P>
          WordSurf makes it easy to share and showcase your language
          creations with the world. By using our standardized guide
          format, you can:
        </P>
        <Ul>
          <Li>
            Ensure your content looks professional and consistent across
            all devices.
          </Li>
          <Li>
            Leverage our built-in components for beautiful layouts and
            typography.
          </Li>
          <Li>
            Focus on your content rather than worrying about complex web
            design.
          </Li>
          <Li>
            Reach a broad audience, including conlangers, linguists, and
            language enthusiasts.
          </Li>
        </Ul>
      </Section.Block>

      <Section.Block>
        <Section.H2>How Guides Are Organized</Section.H2>
        <P>
          Guides are placed under specific URLs depending on their type.
          Here's how the structure works:
        </P>
        <Section.H3>For Conlangs</Section.H3>
        <P>
          Guides for conlangs are used to document grammar, phonology,
          tutorials, and other language aspects. Example structure:
        </P>
        <Ul>
          <Li>
            <Code>/languages/your-language/guides</Code>: The main page
            for your language's guides.
          </Li>
          <Li>
            <Code>/languages/your-language/guides/sounds</Code>: A guide
            to your language's phonology.
          </Li>
          <Li>
            <Code>/languages/your-language/guides/nouns</Code>: A
            detailed introduction to nouns.
          </Li>
          <Li>
            <Code>/languages/your-language/guides/history</Code>:
            Historical background of your language.
          </Li>
          <Li>
            <Code>
              /languages/your-language/guides/history/timeline
            </Code>
            : A brief timeline of your language.
          </Li>
        </Ul>

        <Section.H3>For Conscripts</Section.H3>
        <P>
          Guides for conscripts introduce your script and explain how it
          works. Example structure:
        </P>
        <Ul>
          <Li>
            <Code>/scripts/your-script/guides</Code>: The main page for
            your script's guides.
          </Li>
          <Li>
            <Code>/scripts/your-script/guides/letters</Code>: An
            introduction to the letters of your script.
          </Li>
          <Li>
            <Code>/scripts/your-script/guides/history</Code>: The
            history and evolution of your script.
          </Li>
        </Ul>
        <P>
          <strong>Note:</strong> Phonology charts for both conlangs and
          conscripts are handled under the dedicated{' '}
          <Code>/sounds</Code> section, so you don't need to include
          them in your guides.
        </P>
      </Section.Block>

      <Section.Block>
        <Section.H2>Writing for Your Audience</Section.H2>
        <P>The audience for your guides may include:</P>
        <Ul>
          <Li>
            Conlangers and conscripters looking for inspiration or
            resources.
          </Li>
          <Li>
            Linguists exploring unique or experimental language
            structures.
          </Li>
          <Li>
            The general public, including language learners and
            enthusiasts.
          </Li>
        </Ul>
        <P>To make your guides more accessible:</P>
        <Ul>
          <Li>
            Use simple and recognizable terms for URLs and titles (e.g.,
            use <Code>/sounds</Code> instead of <Code>/phonology</Code>
            ).
          </Li>
          <Li>
            Introduce technical terms gradually, and link to resources
            like Wikipedia for additional context.
          </Li>
        </Ul>
        <P>
          Remember, one of WordSurf's goals is to lower the barrier to
          entry for language resources, making them approachable for
          everyone!
        </P>
      </Section.Block>

      <Section.Block>
        <Section.H2>Submission Methods</Section.H2>
        <Section.H3>Email Us</Section.H3>
        <P
          align="center"
          color="secondary"
        >
          Send your guides in YAML, Word Doc, or PDF format to{' '}
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

        <Section.H3>Start a Discussion on GitHub</Section.H3>
        <P
          align="center"
          color="secondary"
        >
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
        <Section.H2>Examples and Resources</Section.H2>
        <P>
          Not sure where to start? Check out our{' '}
          <A href="https://github.com/termsurf/word.surf/blob/c4fe4f6679ae6e20f1d49ae259c6257b46997f9c/app/languages/tune/guides/page.yaml">
            Tune guides YAML
          </A>{' '}
          for inspiration.
        </P>
        <P>
          This example demonstrates how to structure your guides and use
          YAML effectively. Feel free to reach out to us if you have any
          questions or need further guidance!
        </P>
      </Section.Block>
    </Section>
  )
}
