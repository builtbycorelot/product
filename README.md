# Product Catalog

This repository stores product images and the Node Form Language (NFL) files used to manage the catalog for CORELOT Homes.

## Directory layout

- Root directory: Contains product images (PNG/JPG/WEBP) named using the product ID and description.
- `products/`: Additional images or data for specific products.
- Node Form Language files: stored next to the images with the `.nfl` extension (for example `catalog.nfl`). These define product metadata such as SKU, price, and category.

## Node Form Language basics

NFL is a YAML-based format used to describe products. A simple product entry looks like this:

```yaml
- id: 10100
  name: Signature Hardware - Pull Out Faucet
  price: 199.00
  image: "10100 (Signature Hardware - Pull Out Faucet).jpg"
```

The NFL files can include many such entries and are used by our tooling to generate visualizations and client interfaces.

## Adding a new product

1. Add the product image to the repository (either in the root directory or `products/`).
2. Edit the appropriate `.nfl` file (for example `catalog.nfl`). Append a new entry describing the product using the same format as above.
3. Commit the image and NFL file.
4. Run `nfl build` to regenerate any derived artifacts.

## Updating prices

1. Open the relevant `.nfl` file.
2. Locate the product entry and change the `price` field.
3. Commit the change and run `nfl build` to update generated outputs.

## Visualization and client tools

The repository relies on the Node Form Language CLI. After installing it (for example with `npm install -g nfl-cli`), you can:

- Run `nfl visualize` to open a local visualization of the product catalog.
- Run `nfl client` to start the client application that consumes the NFL files.

These tools read the `.nfl` files and display the products with their images and prices.
