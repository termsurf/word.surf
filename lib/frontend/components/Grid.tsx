import LeafGrid from '@termsurf/leaf/component/Grid'
import assert from 'assert'

const GAP = [2, 4, 8, 16, 32]
const GAP_ERROR = `Gap must be in ${JSON.stringify(GAP)}`

export type GridProps = {
  maxColumns: number
  gap: (typeof GAP)[number]
  children: React.ReactNode
  minWidth: number
  maxWidth: number
}

export default function Grid(props: GridProps) {
  assert(GAP.includes(props.gap), GAP_ERROR)

  console.log(props)

  return <LeafGrid {...props} />
}
