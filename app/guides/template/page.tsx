'use client'

import Section from '~/lib/frontend/components/Section'

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
        <Section.H1>Template</Section.H1>
      </Section.Header>
    </Section>
  )
}
