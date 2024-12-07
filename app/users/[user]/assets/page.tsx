'use client'

import Button from '@termsurf/leaf/component/Button'
import Field from '@termsurf/leaf/component/Field'
import TextInput from '@termsurf/leaf/component/TextInput'
import { KeyboardEvent, MouseEvent, useRef, useState } from 'react'
import Environment from '~/lib/frontend/components/Environment'
import { FileNode } from '~/lib/shared/queries/images'

type Input = {
  params: Promise<{ user: string; type: string; collection: string }>
}

const file: Array<FileNode> = [
  {
    slug: 'bear.svg',
    record: {
      type: 'image',
      path: 'bear.svg',
    },
  },
  {
    slug: 'wolf.svg',
    record: {
      type: 'image',
      path: 'wolf.svg',
    },
  },
]

function CollectionItemInput({
  item,
  onAdd,
}: {
  item: Collection['items'][0]
  onAdd: () => void
}) {
  const [key, setKey] = useState(item.slug)
  const [value, setValue] = useState(item.id)
  const [id, setId] = useState<string>()

  const handleKeyUp = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault()
        e.stopPropagation()
        onAdd()
        break
    }
  }

  return (
    <Field className="flex gap-8 !flex-row">
      <TextInput
        value={key}
        onChange={t => setKey(t ?? '')}
        onKeyDown={handleKeyUp}
      />
      <TextInput
        value={value}
        onChange={t => setValue(t ?? '')}
        onKeyDown={handleKeyUp}
      />
    </Field>
  )
}

export type Collection = {
  slug: string
  items: Array<{
    slug: string
    id: string
  }>
}

export default function View(input: Input) {
  const id = useRef(0)
  const [collection, setCollection] = useState<Collection>({
    slug: '',
    items: [],
  })
  // const save = () => {
  //   if (id) {
  //     updateCollectionItem()
  //   } else {
  //     createCollectionItem()
  //   }
  // }

  const handleItemAdd = () => {
    setCollection({
      ...collection,
      items: [
        { slug: '', id: String(id.current++) },
        ...collection.items,
      ],
    })
  }

  const handleSave = async (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const res = await fetch(
      'https://base.word.surf/users/lancejpollard/image-collections',
      {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(collection),
      },
    )
    console.log(await res.json())
  }

  const handleAdd = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    handleItemAdd()
  }

  return (
    <Environment>
      <form className="mt-64 px-16 flex flex-col gap-8">
        <Field className="flex gap-8 !flex-row">
          <Button onClick={handleAdd}>Add +</Button>
          <Button onClick={handleSave}>Save</Button>
        </Field>
        <Field>
          <TextInput
            value={collection.slug}
            onChange={slug =>
              setCollection(c => ({ ...c, slug: slug ?? '' }))
            }
          />
        </Field>
        {collection.items.map(item => (
          <CollectionItemInput
            key={item.id}
            item={item}
            onAdd={handleItemAdd}
          />
        ))}
      </form>
    </Environment>
  )
}
