import fs from 'fs'
import fsp from 'fs/promises'
import gm from 'gm'
import { CompiledQuery } from 'kysely'
import { groupBy } from 'lodash'
import path from 'path'
import { tmpNameSync } from 'tmp'
import storage from '~/lib/shared/settings/google-cloud-storage'
import { bigintToIdTone } from '~/lib/shared/utilities/bigint'
import { getNextId, initializeId } from '~/lib/shared/utilities/id'
import { db } from '~/lib/shared/utilities/kysely'
import { removeNulls } from '~/lib/shared/utilities/object'
import { MIME, UploadImageAsset } from './constants'

const SEARCH = fs.readFileSync(
  path.resolve('./lib/backend/queries/images/search.sql'),
  `utf-8`,
)

export async function searchImages({ path }: { path: string }) {
  const query = CompiledQuery.raw(SEARCH, [path.split('/'), 40])
  const images = (await db.executeQuery(query)) as unknown as Array<{
    id: string
  }>
  const ids = images.map(x => x.id)
  return await loadImages({ ids })
}

export async function findImageIdFromPath({ path }: { path: string }) {
  const image = await db
    .selectFrom('image')
    .select(['id'])
    .where('path', '=', path)
    .executeTakeFirstOrThrow()
  return image.id
}

export async function loadImages({ ids }: { ids: Array<string> }) {
  const images = await db
    .selectFrom('image')
    .selectAll()
    .where('id', 'in', ids)
    .execute()

  const imageFiles = await db
    .selectFrom('image_file')
    .where('base__id', 'in', ids)
    .selectAll()
    .execute()

  const imageFilesByImageId = groupBy(imageFiles, 'base__id')

  const output: Array<any> = []

  for (const image of images) {
    const files = imageFilesByImageId[image.id] ?? []
    output.push({
      id: bigintToIdTone(image.id),
      path: image.path,
      preview: image.preview,
      files: files.map(file => ({
        id: bigintToIdTone(file.id),
        url: file.url,
        format: file.format,
        width: file.width,
        height: file.height,
        size: file.size,
      })),
    })
  }

  return removeNulls(output)
}

export async function upload(source: UploadImageAsset) {
  const input = UploadImageAsset.parse(source)

  // await db.deleteFrom('image_file').execute()
  // await db.deleteFrom('image').execute()

  const exists = await db
    .selectFrom('image')
    .select(['id'])
    .where('path', '=', input.path)
    .executeTakeFirst()

  if (exists) {
    throw new Error(`Path ${input.path} already uploaded.`)
  }

  const parts = input.path.split('.')
  const ext = parts.pop()!.toLowerCase()

  // await db.deleteFrom('image_file').execute()
  // await db.deleteFrom('image_asset').execute()
  // await db.deleteFrom('image').execute()

  if (ext === 'svg') {
    return await uploadSVG(input)
  } else {
    return await uploadBinary(input)
  }
}

export async function uploadBinary(source: UploadImageAsset) {
  const input = UploadImageAsset.parse(source)

  const parts = input.path.split('.')
  const ext = parts.pop()!.toLowerCase()

  const buffer = await fsp.readFile(`tmp${input.path}`)

  const sizeBase = await getSize(buffer)
  const buffer16 = await resize(buffer, 16)

  const base64 = buffer16.toString('base64')
  const preview = `data:image/${ext};base64,${base64}`

  const image = await db
    .insertInto('image')
    .returning('id')
    .values({
      path: input.path,
      preview,
    })
    .executeTakeFirstOrThrow()

  if (sizeBase.width > 2048) {
    const buffer2048 = await resize(buffer, 2048)
    const size2048 = await getSize(buffer2048)
    await uploadFile({
      sourceId: BigInt(image.id),
      buffer: buffer2048,
      ...size2048,
      size: 'large',
      format: ext,
    })
  } else if (sizeBase.width > 1024) {
    const size2048 = await getSize(buffer)
    await uploadFile({
      sourceId: BigInt(image.id),
      buffer: buffer,
      ...size2048,
      size: 'large',
      format: ext,
    })
  }

  if (sizeBase.width > 1024) {
    const buffer1024 = await resize(buffer, 1024)
    const size1024 = await getSize(buffer1024)
    await uploadFile({
      sourceId: BigInt(image.id),
      buffer: buffer1024,
      ...size1024,
      size: 'medium',
      format: ext,
    })
  } else if (sizeBase.width > 256) {
    const size1024 = await getSize(buffer)
    await uploadFile({
      sourceId: BigInt(image.id),
      buffer: buffer,
      ...size1024,
      size: 'medium',
      format: ext,
    })
  }

  if (sizeBase.width > 256) {
    const buffer256 = await resize(buffer, 256)
    const size256 = await getSize(buffer256)
    await uploadFile({
      sourceId: BigInt(image.id),
      buffer: buffer256,
      ...size256,
      size: 'small',
      format: ext,
    })
  }
}

export async function uploadSVG(source: UploadImageAsset) {
  const input = UploadImageAsset.parse(source)

  const buffer = await fsp.readFile(`tmp${input.path}`)
  const sizeBase = await getSize(buffer)

  const image = await db
    .insertInto('image')
    .returning('id')
    .values({
      path: input.path,
    })
    .executeTakeFirstOrThrow()

  await uploadFile({
    sourceId: BigInt(image.id),
    buffer,
    ...sizeBase,
    format: 'svg',
  })
}

async function uploadFile({
  sourceId,
  buffer,
  width,
  height,
  size,
  format,
}: {
  sourceId: bigint
  buffer: Buffer
  width: number
  height: number
  size?: string
  format: string
}) {
  await initializeId('image_file', true)
  const id = await getNextId('image_file')
  const code = bigintToIdTone(id as bigint)
  const name = `${code}.${format}`
  const url = `https://file.word.surf/${name}`
  await db
    .insertInto('image_file')
    .values({
      id,
      base__id: sourceId,
      width,
      format,
      height,
      size,
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

async function resize(input: any, size = 2048): Promise<Buffer> {
  return new Promise((res, rej) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    gm(input)
      .quality(100)
      .resize(size)
      .toBuffer(async (err, output) => {
        if (err) {
          return rej(err)
        }
        res(output)
      })
  })
}

async function getSize(
  data: any,
): Promise<{ height: number; width: number }> {
  return new Promise((res, rej) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    gm(data).size(function (err, size) {
      if (!err) {
        res(size)
      } else {
        res({ height: 0, width: 0 })
      }
    })
  })
}
