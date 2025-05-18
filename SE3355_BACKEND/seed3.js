const fs = require('fs');
const db = require('./db');

const data = JSON.parse(fs.readFileSync('./carousel.json', 'utf-8'));

db.serialize(() => {
  const stmt = db.prepare(`INSERT INTO carousel (id, img, label, title, oldPrice, discountedPrice, cartPrice, paymentNote, extra, rating, votes, forwardLink)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  data.forEach(item => {
    stmt.run(
      item.id,
      item.img,
      item.label || null,
      item.title,
      item.oldPrice || null,
      item.discountedPrice || null,
      item.cartPrice || null,
      item.paymentNote || null,
      item.extra || null,
      item.rating,
      item.votes,
      item.forwardLink
    );
  });

  stmt.finalize();
  console.log('Carousel verisi yüklendi.');
});
