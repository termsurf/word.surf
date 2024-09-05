import fsp from 'fs/promises'
import crypto from 'crypto'

const slug = process.argv[2]

call({ slug })

async function call({ slug }: { slug: string }) {
  await fetch(`https://base.chat.surf/font/${slug}`, {
    method: 'GET',
  })
}
