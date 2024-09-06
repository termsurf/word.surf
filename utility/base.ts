export async function readBase(path: string) {
  const res = await fetch(`https://base.chat.surf${path}`)
  const json = await res.json()
  return json
}
