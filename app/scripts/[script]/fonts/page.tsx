import Page from '~/components/pages/scripts/script/fonts/Page'
import SYMBOLS from '~/data/scripts/symbols.json'

type Input = {
  params: { script: string }
}

export default async function View({ params }: Input) {
  const item = SYMBOLS.find(item => params.script === item.script.slug)
  const symbols = item?.symbols.split(/\s+/) ?? []
  const size = item?.size

  console.log('here')

  return (
    <Page
      scriptSlug={params.script}
      symbols={symbols}
      fontSize={size}
    />
  )
}
