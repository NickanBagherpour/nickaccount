import { Low ,Memory } from "lowdb";

import { User } from "@/types/user.type";

// Define a type for database structure
type DbSchema = {
  users: User[];
  // Add other collections as needed
};

// Declare global to mimic the previous setup
declare global {
  var db: Low<DbSchema> | undefined;
}

// Initialize the database
const adapter = new Memory<DbSchema>();
const defaultData: DbSchema = { users: [] }; // Add default data for other collections if needed
const db = global.db || new Low(adapter, defaultData);


// Initialize and write default data if necessary
async function initDb() {
  await db.read();
  if (!db.data) {
    db.data = defaultData;
    await db.write();
  }
}

// Ensure the database is initialized
initDb().catch(console.error);

if (process.env.NODE_ENV !== "production") global.db = db;

export { db };
