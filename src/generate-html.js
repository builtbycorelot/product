#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const metaPath = path.join(rootDir, 'metadata.json');
const output = path.join(rootDir, 'visualization.html');

const metadata = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

let html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Products</title></head><body>`;
for (const item of metadata) {
  html += `<div style="margin-bottom:20px;">`;
  html += `<h3>${item.file}</h3>`;
  html += `<img src="${item.file}" style="max-width:200px;display:block;"/>`;
  html += `<pre>${JSON.stringify(item.exif, null, 2)}</pre>`;
  html += `</div>`;
}
html += `</body></html>`;

fs.writeFileSync(output, html);
console.log(`Wrote HTML visualization to ${output}`);
