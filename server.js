const express = require('express');
const path = require('path');
const fs = require('fs');

const { collectMetadata, validatePhoto } = require('./scripts/generateMetadata');

const app = express();
const PORT = process.env.PORT || 3000;
const IMAGE_DIR = path.resolve(__dirname);
const META_FILE = path.resolve(__dirname, 'metadata.json');

// Ensure metadata exists on startup
if (!fs.existsSync(META_FILE)) {
  const metadata = collectMetadata(IMAGE_DIR);
  fs.writeFileSync(META_FILE, JSON.stringify(metadata, null, 2));
}

let metadata = JSON.parse(fs.readFileSync(META_FILE));

app.use('/images', express.static(IMAGE_DIR));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/products', (req, res) => {
  res.json(metadata);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
