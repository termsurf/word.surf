// import Type from '~/components/Type'
// import { ALPHABET } from '~/utils/sefer/measure'
// import { VerseType } from '~/utils/type.text'

// type PropsType = {
//   verses: Array<VerseType>
// }

// export default function AncientHebrew({ verses }: PropsType) {
//   const chars: Array<string> = []

//   verses.forEach(v => {
//     chars.push(
//       ...String(v.value[0].text)
//         .split(/\s+/)
//         .join('')
//         .split('')
//         .filter(c => {
//           return ALPHABET.includes(c)
//         }),
//     )
//   })

//   return (
//     <div style={{ padding: 16 }}>
//       <Type
//         block
//         direction="rtl"
//         text={chars.join('')}
//         type="hebrew"
//         align="justify"
//       />
//     </div>
//   )
// }

export const x = 10
