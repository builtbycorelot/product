# product
Product Catalog for CORELOT Homes

## Embedding Metadata

A Node script is provided to embed product information directly into each
image's EXIF metadata using [`exiftool-vendored`](https://www.npmjs.com/package/exiftool-vendored).

Install dependencies and run:

```bash
npm install
npm run embed
```

The script scans the repository for image files, extracts the product ID and
name from the file name and writes them (along with a placeholder price) into
the `XMP-dc:Description` tag.
