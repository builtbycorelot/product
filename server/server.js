const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8'));

function sendJSON(res, status, obj) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(obj));
}

function serveStatic(req, res) {
  const filePath = path.join(__dirname, '..', decodeURIComponent(req.url));
  if (fs.existsSync(filePath)) {
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  if (parsed.pathname === '/api/products') {
    if (req.method === 'GET') {
      sendJSON(res, 200, data);
    } else {
      res.writeHead(405); res.end();
    }
  } else if (parsed.pathname.startsWith('/api/products/')) {
    const parts = parsed.pathname.split('/');
    const id = parts[3];
    const product = data.find(p => p.id === id);
    if (!product) {
      sendJSON(res, 404, { error: 'Product not found' });
      return;
    }
    if (parsed.pathname.endsWith('/price')) {
      sendJSON(res, 200, { price: product.price });
    } else if (parsed.pathname.split('/').length === 4) {
      sendJSON(res, 200, product);
    } else {
      res.writeHead(404); res.end();
    }
  } else if (parsed.pathname === '/api/upload' && req.method === 'POST') {
    // Simple placeholder validation: ensure content-type is image/* and size < 2MB
    const size = parseInt(req.headers['content-length'] || '0', 10);
    const type = req.headers['content-type'] || '';
    if (!type.startsWith('image/')) {
      sendJSON(res, 400, { error: 'Only image uploads are allowed' });
      return;
    }
    if (size > 2 * 1024 * 1024) {
      sendJSON(res, 400, { error: 'File too large' });
      return;
    }
    // Discard body
    req.resume();
    req.on('end', () => {
      sendJSON(res, 200, { status: 'ok' });
    });
  } else if (parsed.pathname.startsWith('/')) {
    serveStatic(req, res);
  } else {
    res.writeHead(404); res.end();
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
