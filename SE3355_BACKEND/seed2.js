const fs = require('fs');
const db = require('./db');

const data = JSON.parse(fs.readFileSync('./electronicSection.json', 'utf-8'));

db.serialize(() => {
  const stmt = db.prepare(`INSERT INTO electronics (img, title, discountedPrice, rating, seller, votes, color, forwardLink)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);

  data.forEach(item => {
    stmt.run(item.img, item.title, item.discountedPrice, item.rating, item.seller, item.votes || 0, item.color || null, item.forwardLink);
  });

  stmt.finalize();
  console.log('Elektronik verisi yüklendi.');
});
