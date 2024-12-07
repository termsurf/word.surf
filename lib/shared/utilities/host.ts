export const IS_LOCAL = process.env.NEXT_PUBLIC_LOCAL === 'true'

export const HOST = IS_LOCAL
  ? `http://localhost:3000`
  : `https://word.surf`

export const BASE_QUERY_PATH = `${HOST}/queries/v1`
