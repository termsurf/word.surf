export const languagePath = ({ language }: { language: string }) => {
  return `/languages/${language}`
}

export const languageListPath = ({
  language,
  path,
}: {
  language: string
  path: string
}) => {
  return `/languages/${language}/lists/${path}`
}

export const languageStringsPath = ({
  language,
}: {
  language: string
}) => {
  return `/languages/${language}/strings`
}

export const languageStringPath = ({
  language,
  component,
}: {
  language: string
  component: string
}) => {
  return `/languages/${language}/strings/${slugify(component)}`
}

export function slugify(text: string) {
  return text.replace(/\s/g, '+')
}
