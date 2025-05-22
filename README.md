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