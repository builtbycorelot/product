const fs = require('fs');
const path = require('path');

const IMAGE_DIR = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.resolve(__dirname, '../metadata.json');

// Validate photo based on extension and existence
function validatePhoto(filePath) {
  const allowedExt = ['.png', '.jpg', '.jpeg', '.webp'];
  const ext = path.extname(filePath).toLowerCase();
  if (!allowedExt.includes(ext)) return false;
  try {
    fs.accessSync(filePath, fs.constants.R_OK);
    return true;
  } catch (err) {
    return false;
  }
}

// Collect metadata from image directory
function collectMetadata(dir) {
  const files = fs.readdirSync(dir);
  return files.filter(f => validatePhoto(path.join(dir, f))).map(f => {
    const match = f.match(/^(\d+)\s*\(([^)]+)\)/);
    const id = match ? match[1] : null;
    const name = match ? match[2] : f;
    return { id, name, file: f };
  });
}

function main() {
  const metadata = collectMetadata(IMAGE_DIR);
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(metadata, null, 2));
  console.log(`Metadata written to ${OUTPUT_FILE}`);
}

if (require.main === module) {
  main();
}

module.exports = { validatePhoto, collectMetadata };
