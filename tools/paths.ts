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

export const languageComponentsPath = ({
  language,
}: {
  language: string
}) => {
  return `/languages/${language}/components`
}

export const languageComponentPath = ({
  language,
  component,
}: {
  language: string
  component: string
}) => {
  return `/languages/${language}/components/${slugify(component)}`
}

export function slugify(text: string) {
  return text.replace(/\s/g, '+')
}
