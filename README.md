# product
#Product Catalog

This repository stores product images and metadata used for selections and pricing.

## Directory Structure
- `catalog/` – metadata and the sample catalog page
- `*.png`/`*.jpg` – product images stored in the repository root
- `catalog/products.json` – metadata for each product
- `catalog/index.html` – minimalist catalog webpage that loads data from `products.json`

## Product Metadata Fields
Each product entry in `products.json` includes:
- `id` – unique identifier
- `name` – product name
- `image` – relative path to the product image
- `msds` – Material Safety Data Sheet link
- `manufacturer` – manufacturer name
- `origin` – place of origin
- `install_instructions` – installation instructions link
- `warranty` – warranty link
- `cutsheet` – cutsheet link
- `price` – price or upgrade cost
- 'IFC_object' = Industry Foundation Classes

Metadata values are placeholders and can be updated as information becomes available.

Open `catalog/index.html` in a browser to view the catalog.
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
=======
Product Catalog

## Scripts

The `src` directory contains simple Node.js utilities for working with the
product image files.

### Parse image EXIF data

Run the parser to scan all JPEG, PNG or WEBP files in the repository and store
metadata:

```bash
node src/parse-exif.js
```

The script creates `metadata.json` in the repository root. The file stores
Node Form Language attributes (a JSON representation of the EXIF metadata for
each image).

### Generate HTML visualization

After running the parser you can produce an HTML page containing all product
images and their metadata:

```bash
node src/generate-html.js
```

This writes `visualization.html` in the repository root which you can open in a
browser to see the organized product listing.

