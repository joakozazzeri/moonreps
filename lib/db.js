// lib/db.js
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

let db = null;

async function getDb() {
  if (!db) {
    db = await open({
      filename: './ecommerce.sqlite',
      driver: sqlite3.Database,
    });
  }
  return db;
}

module.exports = {
  async get(query, params) {
    const dbInstance = await getDb();
    return dbInstance.get(query, params);
  },
  async all(query, params) {
    const dbInstance = await getDb();
    return dbInstance.all(query, params);
  },
  async run(query, params) {
    const dbInstance = await getDb();
    return dbInstance.run(query, params);
  },
};