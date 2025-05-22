function readUInt16(buffer, offset, le) {
  return le ? buffer.readUInt16LE(offset) : buffer.readUInt16BE(offset);
}

function readUInt32(buffer, offset, le) {
  return le ? buffer.readUInt32LE(offset) : buffer.readUInt32BE(offset);
}

function parse(buffer) {
  // JPEG EXIF is stored in APP1 marker starting with "Exif\0\0"
  const exifHeader = Buffer.from('457869660000', 'hex');
  const idx = buffer.indexOf(exifHeader);
  if (idx === -1) return {};

  let offset = idx + exifHeader.length; // TIFF header follows

  const le = buffer.toString('ascii', offset, offset + 2) === 'II';
  offset += 2; // byte order
  // skip fixed 0x002A
  offset += 2;
  const ifdOffset = readUInt32(buffer, offset, le);
  offset = idx + exifHeader.length + ifdOffset;
  const numEntries = readUInt16(buffer, offset, le);
  const result = {};
  for (let i = 0; i < numEntries; i++) {
    const entry = offset + 2 + i * 12;
    const tag = readUInt16(buffer, entry, le);
    const type = readUInt16(buffer, entry + 2, le);
    const count = readUInt32(buffer, entry + 4, le);
    const valueOffset = entry + 8;

    let value;
    if (type === 2) { // ASCII
      const off = readUInt32(buffer, valueOffset, le);
      value = buffer.toString('ascii', idx + exifHeader.length + off, idx + exifHeader.length + off + count - 1);
    } else if (type === 3) { // SHORT
      value = readUInt16(buffer, valueOffset, le);
    } else if (type === 4) { // LONG
      value = readUInt32(buffer, valueOffset, le);
    } else {
      continue;
    }

    if (tag === 0x010F) result.Make = value;
    if (tag === 0x0110) result.Model = value;
    if (tag === 0x0112) result.Orientation = value;
  }
  return result;
}

module.exports = { parse };
