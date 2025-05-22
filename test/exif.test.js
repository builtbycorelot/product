const assert = require('assert');

const images = [
  'https://www.bldr.com/resources/catalogs-literature/sample1.jpg',
  'https://www.bldr.com/resources/catalogs-literature/sample2.jpg'
];

async function fetchImage(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.arrayBuffer();
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
  for (const url of images) {
    try {
      const buffer = await fetchImage(url);
      assert.ok(hasExif(buffer), `Image ${url} should contain EXIF metadata`);
      console.log(`${url} contains EXIF metadata`);
    } catch (err) {
      console.error(err);
      process.exitCode = 1;
    }
  }
})();
