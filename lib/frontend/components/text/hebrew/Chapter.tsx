// import AdSense from 'react-adsense'
// import BookNavigationButtons from '~/components/BookNavigationButtons'
// import Padded from '~/components/Padded'
// import PostLayout from '~/components/PostLayout'
// import Title from '~/components/TitleVibe'
// import React, {
//   useCallback,
//   useContext,
//   useEffect,
//   useState,
// } from 'react'
// import { NUMBER_TO_SYMBOL } from '~/utils/languageNumbers'
// import Type from '~/components/Type'
// import { BookChapterVerseSystem, VerseType } from '~/utils/type.text'
// import VerseList from '../../VerseList'
// import ConfigPanel from './ConfigPanel'
// import { NavigationContext } from '~/components/Navigation'
// import { useTheme } from 'styled-components'
// import { ALPHABET, render } from '~/utils/sefer/measure'
// import useElementSize from '~/hooks/useElementSize'
// import _ from 'lodash'
// import AncientHebrew from './Ancient'
// import { useConfigurationScope } from '~/hooks/useConfiguration'
// import { useHebrewText, useHebrewUrl } from '~/hooks/useHebrewText'
// import TraditionalHebrew from './Traditional'

// export default function Chapter({
//   path,
//   after,
//   before,
//   parent,
//   script,
//   title,
//   index,
//   verses,
//   features,
// }: BookChapterVerseSystem.ChapterType) {
//   useConfigurationScope('hebrew')

//   const toNumberSymbol =
//     NUMBER_TO_SYMBOL[script] ?? NUMBER_TO_SYMBOL.latin

//   const setConfigElement = useContext(NavigationContext)

//   const titleText = String(
//     (title
//       ? Array.isArray(title[0].text)
//         ? title[0].text.join(' ')
//         : title[0].text
//       : undefined) ?? toNumberSymbol(index + 1),
//   )

//   const { font, diacritics, pronunciation } = useHebrewText()

//   useEffect(() => {
//     setConfigElement(
//       <ConfigPanel
//         font={font}
//         diacritics={diacritics}
//         pronunciation={pronunciation}
//         features={features ?? []}
//       />,
//     )

//     return () => {
//       setConfigElement(null)
//     }
//   }, [setConfigElement, features, font, diacritics, pronunciation])

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
//       {font === 'traditional' ? (
//         <TraditionalHebrew verses={verses} />
//       ) : font === 'ancient' ? (
//         <AncientHebrew verses={verses} />
//       ) : (
//         <VerseList
//           script={script}
//           direction="rtl"
//           verses={verses}
//         />
//       )}
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
