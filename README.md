# product
Product Catalog for CORELOT Homes

## Metadata Schema

Product metadata is stored in JSON files located in the `products` directory. Each product image has a corresponding `ID.json` file with the following structure:

```json
{
  "id": "string",
  "name": "string",
  "price": number,
  "description": "string"
}
```

The `id` matches the product identifier, usually taken from the beginning of the image filename. `price` and `description` may be `null` or empty when no data is available.
