const express = require('express');
const cors = require('cors'); // I-import ang cors
const db = require('./database.js'); // I-import ang database connection

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para ma-parse ang JSON body ng requests
app.use(express.json());
app.use(cors()); // Gamitin ang cors middleware

// API route para makuha ang lahat ng products
app.get('/api/products', (req, res) => {
  const sql = "SELECT * FROM products";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// API route para makuha ang isang product gamit ang ID
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM products WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ message: 'Product not found.' });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// API route para magdagdag ng bagong product (CREATE)
app.post('/api/products', (req, res) => {
  const { name, price, description, imageUrl } = req.body;
  if (!name || !price) {
    res.status(400).json({ error: 'Name and price are required.' });
    return;
  }
  const sql = `INSERT INTO products (name, price, description, imageUrl) VALUES (?, ?, ?, ?)`;
  db.run(sql, [name, price, description, imageUrl], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Product added successfully!',
      id: this.lastID
    });
  });
});

// API route para mag-update ng existing product (UPDATE)
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, description, imageUrl } = req.body;
  // Basic validation
  if (!name || !price) {
    res.status(400).json({ error: 'Name and price are required.' });
    return;
  }
  const sql = `UPDATE products SET name = ?, price = ?, description = ?, imageUrl = ? WHERE id = ?`;
  db.run(sql, [name, price, description, imageUrl, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ message: 'Product not found.' });
      return;
    }
    res.json({
      message: 'Product updated successfully!',
      changes: this.changes
    });
  });
});

// API route para mag-delete ng product (DELETE)
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM products WHERE id = ?`;
  db.run(sql, id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ message: 'Product not found.' });
      return;
    }
    res.json({
      message: 'Product deleted successfully!',
      changes: this.changes
    });
  });
});

// Start ng server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
