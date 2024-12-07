// import BookNavigationButtons from '~/components/BookNavigationButtons'
// import Padded from '~/components/Padded'
// import PostLayout from '~/components/PostLayout'
// import Title from '~/components/TitleVibe'
// import React, { useContext, useEffect, useState } from 'react'
// import { NUMBER_TO_SYMBOL } from '~/utils/languageNumbers'
// import Type from '~/components/Type'
// import { BookChapterVerseSystem } from '~/utils/type.text'
// import VerseList from '../../VerseList'
// import ConfigPanel from './ConfigPanel'
// import { NavigationContext } from '~/components/Navigation'
// import _ from 'lodash'
// import {
//   useConfiguration,
//   useConfigurationScope,
// } from '~/hooks/useConfiguration'
// import { useArabicUrl, useArabicText } from '~/hooks/useArabicText'
// import { renderArabicLines } from '~/utils/kashida/measure'

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
//   useConfigurationScope('arabic')

//   const toNumberSymbol =
//     NUMBER_TO_SYMBOL[script] ?? NUMBER_TO_SYMBOL.latin

//   const setConfigElement = useContext(NavigationContext)
//   const config = useConfiguration()

//   const titleText = String(
//     (title
//       ? Array.isArray(title[0].text)
//         ? title[0].text.join(' ')
//         : title[0].text
//       : undefined) ?? toNumberSymbol(index + 1),
//   )

//   const { font, diacritics, pronunciation } = useArabicText()

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
//       size={font === 'ancient' ? 56 : font === 'traditional' ? 36 : 28}
//       bold
//       text={titleText}
//       type={script}
//     />
//   )

//   const urlBuilder = useArabicUrl()

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

//   const [lines, setLines] = useState<Array<React.ReactNode>>([])

//   // useEffect(() => {
//   //   const words: Array<string> = []
//   //   verses.forEach(v => {
//   //     words.push(...String(v.value[0].text).split(/\s+/))
//   //   })
//   //   const fontFamily =
//   //     config.data.scripts.arabic.fonts[config.data.scripts.arabic.font]
//   //   setLines(
//   //     renderArabicLines(words, fontFamily, 32, 720).map(line => (
//   //       <Type
//   //         type="arabic"
//   //         block
//   //         direction="rtl"
//   //         align="justify"
//   //         text={line}
//   //         key={line}
//   //       />
//   //     )),
//   //   )
//   // }, [verses, config])

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
//       <div style={{ padding: 16, textAlign: 'justify' }}>{lines}</div>
//       <VerseList
//         script={script}
//         direction="rtl"
//         verses={verses}
//         fontSize={
//           font === 'ancient'
//             ? 32
//             : font === 'traditional'
//             ? 24
//             : undefined
//         }
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
