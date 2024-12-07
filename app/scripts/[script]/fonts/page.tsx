import Page from '~/lib/frontend/components/pages/scripts/script/fonts/Page'
import SYMBOLS from '~/lib/shared/constants/scripts/symbols.json'

type Input = {
  params: Promise<{ script: string }>
}

export default async function View(props: Input) {
  const params = await props.params
  const item = SYMBOLS.find(item => params.script === item.script.slug)
  const symbols = item?.symbols.split(/\s+/) ?? []
  const size = item?.size

  return (
    <Page
      scriptSlug={params.script}
      symbols={symbols}
      fontSize={size}
    />
  )
}
