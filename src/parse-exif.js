#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { parse } = require('./simple-exif-parser');

const rootDir = path.resolve(__dirname, '..');
const output = path.join(rootDir, 'metadata.json');

const files = fs.readdirSync(rootDir);
const images = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
const data = [];
for (const file of images) {
  const filePath = path.join(rootDir, file);
  const buffer = fs.readFileSync(filePath);
  const exif = parse(buffer);
  data.push({ file, exif });
}
fs.writeFileSync(output, JSON.stringify(data, null, 2));
console.log(`Wrote metadata for ${data.length} images to ${output}`);
