/**
 * 零依赖静态文件服务器（Node.js 内置模块）
 * 托管 Vite 构建产物 dist/，并为 vue-router history 模式提供 index.html 回退。
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.DEPLOY_RUN_PORT || process.env.PORT || 5000;
const ROOT = path.join(__dirname, 'dist');
const INDEX_FILE = path.join(ROOT, 'index.html');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
};

function sendFile(filePath, req, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      sendIndex(req, res);
      return;
    }

    const mtime = stats.mtime.toUTCString();
    if (req.headers['if-modified-since'] === mtime) {
      res.writeHead(304);
      res.end();
      return;
    }

    const immutable = filePath.startsWith(path.join(ROOT, 'assets') + path.sep);
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Last-Modified': mtime,
      'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : 'no-cache',
    });

    if (req.method === 'HEAD') {
      res.end();
      return;
    }

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
    stream.on('error', () => {
      res.writeHead(500);
      res.end('Server Error');
    });
  });
}

function sendIndex(req, res) {
  fs.readFile(INDEX_FILE, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found: 请先执行 npm run build 生成 dist/');
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache',
    });
    res.end(req.method === 'HEAD' ? undefined : data);
  });
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    res.end('Method Not Allowed');
    return;
  }

  const reqUrl = new URL(req.url, `http://${req.headers.host}`);
  let pathname;
  try {
    pathname = decodeURIComponent(reqUrl.pathname);
  } catch {
    res.writeHead(400);
    res.end('Bad Request');
    return;
  }

  // 安全：防止路径遍历
  if (pathname.includes('..') || pathname.includes('\0')) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  if (pathname === '/' || pathname === '') {
    sendIndex(req, res);
    return;
  }

  const filePath = path.join(ROOT, pathname);
  if (!filePath.startsWith(ROOT + path.sep)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      sendFile(filePath, req, res);
      return;
    }

    // 带扩展名的静态资源缺失 -> 404；.html 旧链接与无扩展名路径交给 SPA 路由
    const ext = path.extname(pathname).toLowerCase();
    const acceptHtml = (req.headers.accept || '').includes('text/html');
    if (ext && ext !== '.html' && !acceptHtml) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found');
      return;
    }

    sendIndex(req, res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Static server running on http://0.0.0.0:${PORT}`);
  console.log(`Serving: ${ROOT}`);
});

// 优雅退出
process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});