const fs = require('fs');
const db = require('./db');

const data = JSON.parse(fs.readFileSync('./specialOffers.json', 'utf-8'));

db.serialize(() => {
  const stmt = db.prepare("INSERT INTO special_offers (image, title, forwardLink) VALUES (?, ?, ?)");

  data.forEach(item => {
    stmt.run(item.image, item.title, item.forwardLink);
  });

  stmt.finalize();
  console.log("Veri başarıyla yüklendi.");
});
