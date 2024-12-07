// import AdSense from 'react-adsense'
// import BookNavigationButtons from '~/components/BookNavigationButtons'
// import Padded from '~/components/Padded'
// import PostLayout from '~/components/PostLayout'
// import Title from '~/components/TitleVibe'
// import React, { useContext, useEffect } from 'react'
// import { NUMBER_TO_SYMBOL } from '~/utils/languageNumbers'
// import Type from '~/components/Type'
// import { BookChapterVerseSystem } from '~/utils/type.text'
// import ChapterList from '../../ChapterList'
// import ConfigPanel from './ConfigPanel'
// import { NavigationContext } from '~/components/Navigation'
// import { useHebrewText, useHebrewUrl } from '~/hooks/useHebrewText'

// export default function Book({
//   path,
//   after,
//   before,
//   parent,
//   script,
//   tags,
//   title,
//   chapters,
//   features,
// }: BookChapterVerseSystem.BookType) {
//   const toNumberSymbol =
//     NUMBER_TO_SYMBOL[script] ?? NUMBER_TO_SYMBOL.latin

//   const setConfigElement = useContext(NavigationContext)

//   const titleText = String(title ? title[0].text : '')

//   const { font, pronunciation, diacritics } = useHebrewText()

//   useEffect(() => {
//     setConfigElement(
//       <ConfigPanel
//         font={font}
//         pronunciation={pronunciation}
//         diacritics={diacritics}
//         features={features ?? []}
//       />,
//     )

//     return () => {
//       setConfigElement(null)
//     }
//   }, [setConfigElement, features, font, pronunciation, diacritics])

//   const boldTitle = (
//     <Type
//       size={28}
//       bold
//       text={titleText}
//       type={script}
//     />
//   )

//   const urlBuilder = useHebrewUrl()

//   const parentUrl = urlBuilder(parent.path)
//   const afterUrl = urlBuilder(after?.path)
//   const beforeUrl = urlBuilder(before?.path)

//   const parentLink = parentUrl
//     ? {
//         url: parentUrl,
//       }
//     : undefined

//   const afterLink =
//     after && afterUrl
//       ? {
//           url: afterUrl,
//         }
//       : undefined

//   const beforeLink =
//     before && beforeUrl
//       ? {
//           url: beforeUrl,
//         }
//       : undefined

//   return (
//     <PostLayout
//       tab={titleText}
//       url={path}
//     >
//       <Title
//         title={boldTitle}
//         url={path}
//       />
//       <Padded>
//         <AdSense.Google
//           client="ca-pub-2593838011725409"
//           slot="4719225000"
//           style={{ minHeight: 90 }}
//           format=""
//           responsive="true"
//         />
//       </Padded>
//       <ChapterList
//         chapters={chapters}
//         script={script}
//         direction="rtl"
//         urlBuilder={urlBuilder}
//       />
//       {/* <ApiCall url={`/api/v1${url}`} /> */}
//       <BookNavigationButtons
//         parentLink={parentLink}
//         beforeLink={beforeLink}
//         afterLink={afterLink}
//       />
//     </PostLayout>
//   )
// }
export const x = 10
