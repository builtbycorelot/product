# Product API

This is a simple Node.js API that serves product metadata and images.

## Endpoints

- `GET /api/products` – list products
- `GET /api/products/:id` – get a single product by ID
- `GET /api/products/:id/price` – return price for product
- `POST /api/upload` – validate uploaded image (content type `image/*` and size < 2MB)

Static image files in the repository are served directly.

Run the server:

```bash
node server/server.js
```

Then open [http://localhost:3000/api/products](http://localhost:3000/api/products).
