import Database from "better-sqlite3";

const db = new Database("baseDatos.db");

const createTable = () => {
  const sql = `CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL)`;
  db.prepare(sql).run();
};

createTable();

