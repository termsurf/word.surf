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
        <Section.H1>Human Evolution (Cells)</Section.H1>
        <Section.List>
          <Section.Item
            label="Bacteria Cells"
            time="~3.8 bya"
            invert
            image="/evolution/bacteria.png"
          >
            Earliest life forms cells like bacteria.
          </Section.Item>
          <Section.Item
            label="Animal Cells"
            time="~2.1 bya"
            invert
            image="/evolution/animal-cell.png"
          >
            Eukaryotic cells appear, enabling complex cellular
            processes.
          </Section.Item>
          <Section.Item
            label="Polyps"
            time="~600 mya"
            invert
            image="/evolution/polip.png"
          >
            Primitive multicellular animals, resembling polyps or early
            cnidarians.
          </Section.Item>
          <Section.Item
            label="Tubes"
            time="~550 mya"
            invert
            image="/evolution/tube.png"
          >
            Early body plans with tubular structures develop.
          </Section.Item>
          <Section.Item
            label="Flatworms"
            time="~540 mya"
            invert
            image="/evolution/flatworm.png"
          >
            Basic bilaterally symmetric organisms like planaria.
          </Section.Item>
          <Section.Item
            label="Jawless fish"
            time="~500 mya"
            invert
            image="/evolution/jawless-fish.png"
          >
            Early vertebrates like lampreys with cartilage skeletons and
            no jaws.
          </Section.Item>
          <Section.Item
            label="Finned fish"
            time="~420 mya"
            invert
            image="/evolution/finned-fish.png"
          >
            Modern fish traits like fins and bony skeletons emerge.
          </Section.Item>
          <Section.Item
            label="Lobed fish"
            time="~375 mya"
            invert
            image="/evolution/lobed-fish.png"
          >
            Lobe-finned fish with limb-like fins like the tilaatak,
            ancestors of tetrapods.
          </Section.Item>
          <Section.Item
            label="Amphibians"
            time="~370 mya"
            invert
            image="/evolution/amphibian.png"
          >
            Early tetrapods like the axolotl or newt adapt to life both
            in water and on land.
          </Section.Item>
          <Section.Item
            label="Reptiles"
            time="~310 mya"
            invert
            image="/evolution/reptile.png"
          >
            Fully terrestrial vertebrates with scaly skin and amniotic
            eggs.
          </Section.Item>
          <Section.Item
            label="Mammals"
            time="~200 mya"
            invert
            image="/evolution/mammal.png"
          >
            Small, nocturnal, warm-blooded creatures emerge during the
            age of dinosaurs.
          </Section.Item>
          <Section.Item
            label="Tree Mammals"
            time="~60 mya"
            invert
            image="/evolution/tree-mammal.png"
          >
            Early primates evolve traits suited to arboreal life.
          </Section.Item>
          <Section.Item
            label="Monkeys"
            time="~25 mya"
            invert
            image="/evolution/monkey.png"
          >
            Ancestors of modern monkeys and apes develop.
          </Section.Item>
          <Section.Item
            label="Chimps"
            time="~6 mya"
            invert
            image="/evolution/chimp.png"
          >
            Divergence of chimpanzees and humans from a common ancestor.
          </Section.Item>
          <Section.Item
            label="Humans"
            time="~2 mya"
            invert
            image="/evolution/human.png"
          >
            Early humans like Homo erectus walk upright and use tools.
          </Section.Item>
        </Section.List>
      </Section.Header>
    </Section>
  )
}
