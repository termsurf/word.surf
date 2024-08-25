import Page from '~/page/language/Page'
import { buildMetadata } from '@termsurf/leaf/utility/metadata'
import { ListLanguageResponse } from '~/site/shared/base/type'
import { getBase } from '~/site/shared/base/utility/base'

export const generateMetadata = () =>
  buildMetadata('ChatSurf', {
    title: 'ChatSurf',
  })

export default async function View({ searchParams }: LocaleParams) {
  const languages = await getBase<ListLanguageResponse>({
    path: '/language',
    query: {
      size: 10000,
    },
  })

  return <Page languages={languages} />
}
