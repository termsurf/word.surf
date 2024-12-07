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
        <Section.H1>Computing Evolution</Section.H1>
        <Section.List>
          <Section.Item
            time="1947-1948"
            label="Transistor"
          >
            Revolutionized electronics by enabling smaller, more
            efficient devices.
          </Section.Item>
          <Section.Item
            time="1956"
            label="Shockley Semiconductor Laboratory"
          >
            Pioneers the use of silicon for transistors.
          </Section.Item>
          <Section.Item
            time="1957"
            label="Fairchild Semiconductor"
          >
            Birth of the venture-backed startup era.
          </Section.Item>
          <Section.Item
            time="1969"
            label="ARPANET and UNIX"
          >
            Lays the groundwork for global computer networking and
            operating systems.
          </Section.Item>
          <Section.Item
            time="1971"
            label="Silicon Valley Coined"
          >
            Defines the region as a hub for semiconductor innovation.
          </Section.Item>
          <Section.Item
            time="1976"
            label="16-bit Microprocessor"
          >
            Advances computing power, paving the way for modern
            processors.
          </Section.Item>
          <Section.Item
            time="1980s"
            label="Boom and Bust"
          >
            Personal computer revolution with GUIs and private equity
            cycles.
          </Section.Item>
          <Section.Item
            time="1991"
            label="Linux"
          >
            Establishes open-source software as a major force in
            computing.
          </Section.Item>
          <Section.Item
            time="1998"
            label="Google"
          >
            Transforms internet search and drives modern tech
            innovation.
          </Section.Item>
          <Section.Item
            time="2005"
            label="Y Combinator"
          >
            Streamlines startup funding with the accelerator model.
          </Section.Item>
          <Section.Item
            time="2008"
            label="GitHub"
          >
            Central hub for software collaboration and open-source
            development.
          </Section.Item>
        </Section.List>
      </Section.Header>
    </Section>
  )
}
