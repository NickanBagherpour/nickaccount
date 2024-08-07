import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { User } from '@/types/user.type';
import { Category } from '@/types/category.type';
import { Transaction } from '@/types/transaction.type';
import { mockCategories } from '@/mocks/categories.mock';
import { isEmptyObject } from '@/utils/helper';

// Define a type for database structure
type DbSchema = {
  users: User[];
  categories: Category[];
  transactions: Transaction[];
  // Add other collections as needed
};

// Declare global to mimic the previous setup
declare global {
  var db: Low<DbSchema> | undefined;
}

// File path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');

// Configure lowdb to write to JSONFile
const adapter = new JSONFile<DbSchema>(file);
const defaultData: DbSchema = { users: [], categories: mockCategories, transactions: [] };
const db = global.db || new Low(adapter, defaultData);

// Initialize and write default data if necessary
async function initDb() {
  await db.read();
  if (isEmptyObject(db.data)) {
    db.data = defaultData;
    await db.write();
  } else if (!db.data?.categories || db.data?.categories?.length === 0) {
    db.data.categories = mockCategories;
    await db.write();
  }
}

// Ensure the database is initialized
initDb().catch(console.error);

if (process.env.NODE_ENV !== 'production') global.db = db;

export { db };
