import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { User } from '@/types/user.type'

// Define a type for database structure
type DbSchema = {
  users: User[];
  // Add other collections as needed
}

// Declare global to mimic the previous setup
declare global {
  var db: Low<DbSchema> | undefined
}

// File path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json')

// Configure lowdb to write to JSONFile
const adapter = new JSONFile<DbSchema>(file)
const defaultData: DbSchema = { users: [] }
const db = global.db || new Low(adapter, defaultData)

// Initialize and write default data if necessary
async function initDb() {
  if (!db.data) {
    db.data = defaultData
    await db.write()
  }
}

// Ensure the database is initialized
initDb().catch(console.error)

if (process.env.NODE_ENV !== 'production') global.db = db

export { db }
