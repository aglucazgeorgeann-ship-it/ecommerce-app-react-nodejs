const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ikonekta sa database
// Gumamit ng path.resolve para sa consistency sa iba't ibang OS
const dbPath = path.resolve(__dirname, 'ecommerce.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    // I-log ang error at lumabas kung may problema sa koneksyon
    return console.error('Error connecting to database:', err.message);
  }
  console.log('Connected to the ecommerce SQLite database.');
});

// Gumawa ng mga table
db.serialize(() => {
  // Gumawa ng products table kung wala pa
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    imageUrl TEXT
  )`, (err) => {
    if (err) {
      console.error('Error creating products table:', err.message);
    } else {
      console.log('Products table checked/created.');
      // Ipasok ang sample products kung walang laman ang table
      db.get(`SELECT COUNT(*) as count FROM products`, (err, row) => {
        if (err) {
          console.error('Error checking product count:', err.message);
          return;
        }
        if (row.count === 0) {
          console.log('Inserting sample products...');
          const insert = db.prepare(`INSERT INTO products (name, price, description, imageUrl) VALUES (?, ?, ?, ?)`);
          insert.run("Laptop", 50000, "A powerful laptop for all your needs.", "https://placehold.co/600x400/000000/FFFFFF?text=Laptop");
          insert.run("Mouse", 800, "Ergonomic wireless mouse.", "https://placehold.co/600x400/000000/FFFFFF?text=Mouse");
          insert.run("Keyboard", 2500, "Mechanical keyboard with RGB.", "https://placehold.co/600x400/000000/FFFFFF?text=Keyboard");
          insert.finalize(() => {
            console.log('Sample products inserted.');
          });
        } else {
          console.log('Products table already has data.');
        }
      });
    }
  });
});

module.exports = db;