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
        <Section.H1>Human Tool Evolution</Section.H1>
        <Section.H3>~3 to 2.5 mya</Section.H3>
        <Section.List>
          <Section.Item
            label="Beat"
            invert
            image="/beat.png"
          >
            Making sounds with beating your hands or fists.
          </Section.Item>
          <Section.Item
            label="Power Grip"
            invert
            image="/power-grip.png"
          >
            Strong grip to hold objects.
          </Section.Item>
          <Section.Item
            label="Precision Grip"
            invert
            image="/precision-grip.png"
          >
            To manipulate objects with their fingers.
          </Section.Item>
        </Section.List>
        <Section.H3>~2.5 to 2 mya</Section.H3>
        <Section.List>
          <Section.Item
            label="Drum"
            invert
            image="/drum.png"
          >
            Hitting a stick or rock against something for sound-making.
          </Section.Item>
          <Section.Item
            label="Rattle"
            invert
            image="/rattle.png"
          >
            Shaking a tree branch with leaves to create noise.
          </Section.Item>
          <Section.Item
            label="Voice"
            invert
            image="/voice.png"
          >
            Early vocalizations (coos, calls, hums).
          </Section.Item>
          <Section.Item
            label="Chisel"
            invert
            time="~2 mya"
            image="/chisel.png"
          >
            Rounded rock with sharp edges, made by chipping flakes off a
            stone.
          </Section.Item>
        </Section.List>
        <Section.H3>~1 mya</Section.H3>
        <Section.List>
          <Section.Item
            label="Axe"
            invert
            image="/axe.png"
          >
            Triangular-shaped hand axe with a rounded bottom.
          </Section.Item>
          <Section.Item label="Blade">
            Sharper stone flakes crafted for cutting. invert
          </Section.Item>
          <Section.Item
            label="Controlled fire"
            invert
            image="/controlled-fire.png"
          >
            Organized logs used to maintain fire.
          </Section.Item>
        </Section.List>
      </Section.Header>
    </Section>
  )
}
