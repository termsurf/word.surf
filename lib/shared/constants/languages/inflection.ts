// https://v0.dev/chat/S8HlY6dbs0l

enum InflectionType {
  ArabicNoun,
  ArabicVerb,
  ArabicAdjective,
}

export type InflectionEntry = {
  tense?: string
  person?: number
  singularity?: 1 | 2 | 'n'
  is_indicative?: boolean
  voice?: string
  plurality?: string
  gender?: string
  mood?: string
}

export type InflectionTableTemplate = {
  label: string
  columns: Array<{ label: string }>
  rows: Array<{
    label: string
    blocks: Array<InflectionEntry>
  }>
}

export function buildInflectionTable({
  template,
  entries,
}: {
  template: InflectionTableTemplate
  entries: Array<InflectionEntry>
}) {
  const table = {
    label: template.label,
    columns: template.columns,
    rows: template.rows.map(row => ({
      label: row.label,
      blocks: row.blocks.map(block =>
        entries.find(entry => matchTemplateBlock(block, entry)),
      ),
    })),
  }

  return table
}

export function matchTemplateBlock(block: any, entry: any) {
  for (const name in block) {
    if (block[name] !== entry[name]) {
      return false
    }
  }
  return true
}
