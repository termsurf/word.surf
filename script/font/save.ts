import fsp from 'fs/promises'
import crypto from 'crypto'

const slug = process.argv[2]
const path = process.argv[3]

call({ slug, path })

async function call({ slug, path }: { slug: string; path: string }) {
  // const hash = crypto.createHash('md5').update(slug).digest('hex')
  const body = new FormData()
  body.append('file', new Blob([await fsp.readFile(path)]))

  await fetch(`https://base.chat.surf/font/${slug}`, {
    method: 'PATCH',
    body,
  })
}
