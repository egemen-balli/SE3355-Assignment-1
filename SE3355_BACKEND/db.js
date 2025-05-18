const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

db.run(`CREATE TABLE IF NOT EXISTS special_offers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT,
    title TEXT,
    forwardLink TEXT
  )`);

db.run(`CREATE TABLE IF NOT EXISTS main_slider (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  image TEXT,
  title TEXT,
  forwardLink TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS electronics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  img TEXT,
  title TEXT,
  discountedPrice TEXT,
  rating REAL,
  seller TEXT,
  votes INTEGER,
  color TEXT,
  forwardLink TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS carousel (
  id INTEGER PRIMARY KEY,
  img TEXT,
  label TEXT,
  title TEXT,
  oldPrice TEXT,
  discountedPrice TEXT,
  cartPrice TEXT,
  paymentNote TEXT,
  extra TEXT,
  rating REAL,
  votes INTEGER,
  forwardLink TEXT
)`);

module.exports = db;
