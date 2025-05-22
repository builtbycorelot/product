const assert = require('assert');

const path = require('path');
const fs = require('fs').promises;

const images = [
  path.join(__dirname, '../products/images/10186 (Maxim - ORB Pendant Light).jpg'),
  path.join(__dirname, '../products/images/10248 (Moen - ORB Shower Spigot).jpg')
];

async function fetchImage(file) {
  return fs.readFile(file);
}

function hasExif(buffer) {
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length - 4; i++) {
    if (
      bytes[i] === 0x45 &&
      bytes[i + 1] === 0x78 &&
      bytes[i + 2] === 0x69 &&
      bytes[i + 3] === 0x66
    ) {
      return true;
    }
  }
  return false;
}

(async () => {
  for (const file of images) {
    try {
      const buffer = await fetchImage(file);
      assert.ok(hasExif(buffer), `Image ${file} should contain EXIF metadata`);
      console.log(`${file} contains EXIF metadata`);
    } catch (err) {
      console.error(err);
      process.exitCode = 1;
    }
  }
})();
