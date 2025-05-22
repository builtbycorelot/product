const fs = require('fs');
const path = require('path');
const { ExifTool } = require('exiftool-vendored');

const exiftool = new ExifTool();

(async () => {
  const files = fs.readdirSync('.');
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;

    const match = file.match(/^(\d+) \(([^)]+)\)/);
    if (!match) continue;

    const id = match[1];
    const name = match[2];
    const price = 0; // TODO: replace with real price lookup

    const description = JSON.stringify({ id, name, price });

    try {
      await exiftool.write(file, {
        'XMP-dc:Description': description,
      });
      console.log(`Embedded metadata into ${file}`);
    } catch (err) {
      console.error(`Failed to embed metadata for ${file}:`, err);
    }
  }
  await exiftool.end();
})();
