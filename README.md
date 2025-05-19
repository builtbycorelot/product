# product
Product Catalog for CORELOT Homes

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
