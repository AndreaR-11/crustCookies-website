const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection pool (better for handling many requests)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Andrea',   // your MySQL password
  database: 'crustcookies',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test route
app.get('/', (req, res) => {
  res.send('Node.js server running 🥳');
});

// Route to receive order data from frontend
app.post('/api/orders', (req, res) => {
  const { name, email, phone, address, date, instructions } = req.body;

  // Basic validation
  if (!name || !email || !phone || !address) {
    return res.status(400).json({ error: 'Please fill all required fields' });
  }

  const sql = 'INSERT INTO orders (name, email, phone, address, delivery_date, instructions) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [name, email, phone, address, date || null, instructions || null];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error('DB insert error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json({ message: 'Order saved successfully!', orderId: result.insertId });
  });
});

app.get('/ping', (req, res) => {
  res.send('Backend is connected! 🎉');
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




