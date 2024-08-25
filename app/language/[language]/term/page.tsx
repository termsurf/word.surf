import Page from '~/page/language/type/term/Page'

type Input = { params: { language: string } }

export const generateMetadata = ({ params }: Input) => {}

export default async function View({ params }: Input) {
  return <Page {...params} />
}
