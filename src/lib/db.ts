import fs from "fs";
import path from "path";
import sqlite3 from "sqlite3";
import { open, type Database } from "sqlite";

const DB_DIR = process.env.DATABASE_DIR || path.join(process.cwd(), "db");
const DB_PATH = process.env.DATABASE_PATH || path.join(DB_DIR, "ferman.sqlite");

let dbPromise: Promise<Database<sqlite3.Database, sqlite3.Statement>> | null =
  null;

function ensureDbDir() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
}

async function initSchema(database: Database<sqlite3.Database, sqlite3.Statement>) {
  await database.exec(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
}

export async function getDb() {
  if (!dbPromise) {
    ensureDbDir();
    dbPromise = open({
      filename: DB_PATH,
      driver: sqlite3.Database,
    }).then(async (database) => {
      await database.exec("PRAGMA journal_mode = WAL;");
      await initSchema(database);
      return database;
    });
  }

  return dbPromise;
}

export async function addNewsletterSubscriber(email: string) {
  const database = await getDb();

  return database.run("INSERT INTO newsletter_subscribers (email) VALUES (?)", [
    email.trim().toLowerCase(),
  ]);
}
