import fs from 'fs/promises'

make()

async function make() {
  const string = await fs.readFile(`utility/database.ts`, `utf-8`)
  await fs.writeFile(`utility/database.ts`, clean(string))
}

function clean(string: string) {
  return string
    .replace(/schema_migrations: SchemaMigrations;\s*/, '')
    .replace(
      `
export interface SchemaMigrations {
  inserted_at: Timestamp | null;
  version: Int8;
}
`,
      '',
    )
}
