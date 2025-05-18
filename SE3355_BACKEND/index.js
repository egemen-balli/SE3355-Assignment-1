const express = require('express');
const db = require('./db');
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Merhaba Express!');
});

app.get('/api/special-offers', (req, res) => {
  db.all('SELECT * FROM special_offers', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/main-slider', (_, res) => {
  db.all('SELECT * FROM main_slider', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/electronics', (_, res) => {
  db.all('SELECT * FROM electronics', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/carousel', (_, res) => {
  db.all('SELECT * FROM carousel', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`API calisiyor: http://localhost:${port}`);
});
