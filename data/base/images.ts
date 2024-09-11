import { postBase } from '~/data/base'
import { ImageAsset } from '~/data/types'

export async function mapImages(map: Record<string, string>) {
  const paths = Object.values(map)

  const images = await postBase(`/images`, { paths })

  const output: Record<string, ImageAsset> = {}

  for (const name in map) {
    output[name] = images.find(image => image.path === map[name])
  }

  return output
}
