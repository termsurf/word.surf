import fsp from 'fs/promises'
import { tmpNameSync } from 'tmp'
import storage from '~/lib/shared/settings/google-cloud-storage'
import { bigintToIdTone } from '~/lib/shared/utilities/bigint'
import { getNextId, initializeId } from '~/lib/shared/utilities/id'
import { db } from '~/lib/shared/utilities/kysely'
import { MIME, UploadRecording } from './constants'

export async function upload(source: UploadRecording) {
  const input = UploadRecording.parse(source)

  const exists = await db
    .selectFrom('audio')
    .select(['id'])
    .where('path', '=', input.path)
    .executeTakeFirst()

  if (exists) {
    throw new Error(`Path ${input.path} already uploaded.`)
  }

  const parts = input.path.split('.')
  const ext = parts.pop()!.toLowerCase()

  const audio = await db
    .insertInto('audio')
    .returning(['id'])
    .values({ path: input.path })
    .executeTakeFirstOrThrow()

  // await db.deleteFrom('audio_file').execute()
  // await db.deleteFrom('audio_asset').execute()
  // await db.deleteFrom('audio').execute()

  const buffer = await fsp.readFile(`tmp${input.localPath}`)
  return await uploadFile({
    buffer,
    sourceId: BigInt(audio.id),
    format: 'mp3',
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
  await initializeId('audio_file', true)
  const id = await getNextId('audio_file')
  const code = bigintToIdTone(id as bigint)
  const name = `${code}.${format}`
  const url = `https://file.word.surf/${name}`
  await db
    .insertInto('audio_file')
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
