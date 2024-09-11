export async function getBase(path: string) {
  const res = await fetch(`https://base.chat.surf${path}`)
  const json = await res.json()
  return json
}

export async function postBase(path: string, body: any) {
  const res = await fetch(`https://base.chat.surf${path}`, {
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const json = await res.json()
  return json
}
