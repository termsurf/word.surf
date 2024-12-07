/* eslint-disable simple-import-sort/imports */

export type Input = {
  params: Promise<{ language: string; guide: Array<string> }>
}

// export const generateMetadata = async (props: Input) => {
//   const params = await props.params

//   const guideMetadata = await getBase(
//     `/languages/${params.language}/guides/${params.guide.join(
//       '/',
//     )}?metadata=true`,
//   )

//   return buildMetadata('WordSurf', guideMetadata)
// }

// export default async function View(props: Input) {
//   const params = await props.params

//   const guide = await getBase(
//     `/languages/${params.language}/guides/${params.guide.join('/')}`,
//   )
//   const language = await getBase(`/languages/${params.language}`)

//   const frontmatterMatch = guide.content.match(
//     /^---\s*([\s\S]*?)\s*---/,
//   )
//   let frontmatter: any = {}

//   if (frontmatterMatch) {
//     try {
//       frontmatter = YAML.load(frontmatterMatch[1]) as any
//     } catch (e) {}
//   }

//   const source = await serialize(
//     guide.content.replace(/^---\s*([\s\S]*?)\s*---/, ''),
//     {
//       mdxOptions: {
//         remarkPlugins: [gfm, math],
//         rehypePlugins: [katex],
//       },
//     },
//   )

//   return (
//     <Page
//       source={source}
//       {...frontmatter}
//       language={language}
//     />
//   )
// }
