export const languageComponentPath = ({
  language,
  component,
}: {
  language: string
  component: string
}) => {
  return `/languages/${language}/components/${slugify(component)}`
}

function slugify(text: string) {
  return text.replace(/\s/g, '+')
}
