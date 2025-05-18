// seed-slider.js
const fs = require('fs');
const db = require('./db');

const data = JSON.parse(fs.readFileSync('./mainSlider.json', 'utf-8'));

db.serialize(() => {
  const stmt = db.prepare("INSERT INTO main_slider (image, title, forwardLink) VALUES (?, ?, ?)");

  data.forEach(item => {
    stmt.run(item.image, item.title, item.forwardLink);
  });

  stmt.finalize();
  console.log("Main slider verisi yüklendi.");
});
