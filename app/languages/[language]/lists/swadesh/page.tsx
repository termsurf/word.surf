import { findLanguage } from '~/data/base/languages'

type Input = {
  params: { language: string }
}

export default async function View({ params }: Input) {
  const language = await findLanguage(params)
  // const lists = await findLists({
  //   paths: ['/swadesh/207', '/swadesh/100'],
  // })

  return null
}
