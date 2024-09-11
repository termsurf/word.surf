import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import {
  A,
  Code,
  Column,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  HR,
  Li,
  Ol,
  P,
  Pre,
  Table,
  TableScroller,
  TBody,
  TD,
  TH,
  TR,
  Ul,
  Whole,
} from '@termsurf/leaf/component/Content'
import Text from '@termsurf/leaf/component/Text'

import Entry from '../Entry'
import Gloss from '../Gloss'

const components = {
  Gloss,
  Entry,
  Column,
  Whole,
  p: P,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  H1: H1,
  H2: H2,
  H3: H3,
  H4: H4,
  H5: H5,
  H6: H6,
  ol: Ol,
  li: Li,
  ul: Ul,
  hr: HR,
  T: Text,
  a: A,
  pre: Pre,
  code: Code,
  table: props => (
    <TableScroller>
      <Table {...props} />
    </TableScroller>
  ),
  tbody: TBody,
  tr: TR,
  th: TH,
  td: TD,
}

export default function Guide({
  source,
}: {
  source: MDXRemoteSerializeResult
}) {
  return (
    <MDXRemote
      {...source}
      components={components}
    />
  )
}
