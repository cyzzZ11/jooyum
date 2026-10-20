/**
 * 演示用静态服务器（零依赖，仅需 Node.js）。
 *
 * 作用：把 `dist/` 里的打包产物用 http 方式提供出来，并自动打开浏览器。
 * 为什么要起服务：现代浏览器禁止 file:// 下的 ES Module / fetch，
 * 直接双击 dist/index.html 会白屏，必须通过 http 访问。
 *
 * 用法：
 *   node demo-server.mjs                # 默认 127.0.0.1:4180 并自动打开浏览器
 *   node demo-server.mjs --port 5000    # 指定端口
 *   node demo-server.mjs --host 0.0.0.0 # 允许同网段其他设备访问（投影/平板）
 *   node demo-server.mjs --no-open      # 不自动打开浏览器
 */
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, resolve, sep } from 'node:path'
import { exec } from 'node:child_process'

const args = process.argv.slice(2)
const argValue = (name, fallback) => {
  const i = args.indexOf(name)
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback
}

const ROOT = resolve('dist')
const PORT = Number(argValue('--port', process.env.DEMO_PORT || 4180))
const HOST = argValue('--host', '127.0.0.1')
const AUTO_OPEN = !args.includes('--no-open')

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.geojson': 'application/geo+json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json; charset=utf-8'
}

const send = (res, code, body, type = 'text/plain; charset=utf-8') => {
  res.writeHead(code, { 'Content-Type': type, 'Cache-Control': 'no-cache' })
  res.end(body)
}

const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
    // 路由为 hash 模式，任何非静态资源路径都回落到 index.html
    let filePath = resolve(join(ROOT, pathname))
    if (!filePath.startsWith(ROOT + sep) && filePath !== ROOT) {
      return send(res, 403, 'Forbidden')
    }
    const info = await stat(filePath).catch(() => null)
    if (!info || info.isDirectory()) filePath = join(ROOT, 'index.html')

    const body = await readFile(filePath)
    send(res, 200, body, MIME[extname(filePath).toLowerCase()] || 'application/octet-stream')
  } catch (err) {
    send(res, 500, `服务异常：${err.message}`)
  }
})

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`端口 ${PORT} 已被占用，请用 --port 指定其他端口，例如：node demo-server.mjs --port 5000`)
  } else {
    console.error(err)
  }
  process.exitCode = 1
})

server.listen(PORT, HOST, () => {
  const url = `http://127.0.0.1:${PORT}/`
  console.log('松江区文旅态势感知与智能决策平台 · 演示模式')
  console.log(`访问地址：${url}`)
  if (HOST === '0.0.0.0') console.log('已开放局域网访问（同网段设备可用本机 IP 访问）')
  console.log('按 Ctrl+C 结束演示。')

  if (AUTO_OPEN && process.platform === 'win32') {
    exec(`start "" "${url}"`)
  }
})
