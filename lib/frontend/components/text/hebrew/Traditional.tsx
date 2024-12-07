// import { useCallback, useEffect, useState } from 'react'
// import { useElementSize } from 'usehooks-ts'
// import { ALPHABET, render } from '~/utils/sefer/measure'
// import { VerseType } from '~/utils/type.text'

// type PropsType = {
//   verses: Array<VerseType>
// }

// export default function TraditionalHebrew({ verses }: PropsType) {
//   const [containerRef, containerSize] = useElementSize()
//   const [sefer, setSefer] = useState<React.ReactNode>([])

//   const updateSefer = useCallback(
//     (width: number, verses: Array<VerseType>) => {
//       const words: Array<string> = []

//       verses.forEach(v => {
//         words.push(
//           ...String(v.value[0].text)
//             .split(/\s+/)
//             .map(word => {
//               return [...word]
//                 .filter(c => ALPHABET.includes(c))
//                 .join('')
//             }),
//         )
//       })

//       setSefer(render(words, 32, width))
//     },
//     [],
//   )

//   useEffect(() => {
//     if (containerSize.width === 0) {
//       return
//     }

//     updateSefer(containerSize.width, verses)
//   }, [verses, containerSize.width, updateSefer])

//   return (
//     <div
//       style={{ padding: 16 }}
//       ref={containerRef}
//     >
//       {sefer}
//     </div>
//   )
// }
export const x = 10
