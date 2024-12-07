import 'dotenv/config'
import { Kysely, PostgresDialect, sql } from 'kysely'
import pg from 'pg'
import { DB } from '~/lib/shared/constants/database.js'

const { Pool } = pg

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    // cert: process.env.DATABASE_SSL_CERT,
  },
})

const dialect = new PostgresDialect({
  pool,
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect,
})

export { sql }
