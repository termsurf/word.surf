import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  String(process.env.NEXT_PUBLIC_SUPABASE_URL),
  String(process.env.NEXT_PUBLIC_SUPABASE_KEY),
)
// import * as Y from 'yjs'

export default supabase
