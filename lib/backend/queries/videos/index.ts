import fsp from 'fs/promises'
import { tmpNameSync } from 'tmp'
import storage from '~/lib/shared/settings/google-cloud-storage'
import { bigintToIdTone } from '~/lib/shared/utilities/bigint'
import { getNextId, initializeId } from '~/lib/shared/utilities/id'
import { db } from '~/lib/shared/utilities/kysely'
import { MIME, UploadVideo } from './constants'

export async function upload(source: UploadVideo) {
  const input = UploadVideo.parse(source)

  const exists = await db
    .selectFrom('video')
    .select(['id'])
    .where('path', '=', input.path)
    .executeTakeFirst()

  if (exists) {
    throw new Error(`Path ${input.path} already uploaded.`)
  }

  const parts = input.path.split('.')
  const ext = parts.pop()!.toLowerCase()

  const video = await db
    .insertInto('video')
    .returning(['id'])
    .values({ path: input.path })
    .executeTakeFirstOrThrow()

  // await db.deleteFrom('video_file').execute()
  // await db.deleteFrom('video_asset').execute()
  // await db.deleteFrom('video').execute()

  const buffer = await fsp.readFile(`tmp${input.path}`)
  return await uploadFile({
    buffer,
    sourceId: BigInt(video.id),
    format: 'webm',
  })
}

async function uploadFile({
  sourceId,
  buffer,
  format,
}: {
  sourceId: bigint
  buffer: Buffer
  format: string
}) {
  await initializeId('video_file', true)
  const id = await getNextId('video_file')
  const code = bigintToIdTone(id as bigint)
  const name = `${code}.${format}`
  const url = `https://file.word.surf/${name}`
  await db
    .insertInto('video_file')
    .values({
      id,
      base__id: sourceId,
      format,
      url,
    })
    .execute()

  const gcs = storage.bucket(`gs://${process.env.GOOGLE_BUCKET_NAME}`)

  const path = tmpNameSync()

  await fsp.writeFile(path, new Uint8Array(buffer))

  await gcs.upload(path, {
    destination: name,
    // public: true,
    metadata: {
      contentType: MIME[format], //application/csv for excel or csv file upload
    },
  })
}
