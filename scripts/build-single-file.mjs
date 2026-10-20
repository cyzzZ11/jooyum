/**
 * 把 `vite build --config vite.config.single.mjs` 的产物（dist-single/）
 * 内联成一个可直接双击打开的单文件 HTML。
 *
 * 处理内容：
 *   1. 运行时配置 config/appContext.js 内联；
 *   2. 入口 JS（已含全部路由/组件）内联为 <script type="module">；
 *   3. 全部 CSS 内联为 <style>；
 *   4. public/img 下被引用到的图片转 base64 data URI（脚本、样式、模板引用一并替换）。
 *
 * 产物：松江区文旅态势感知平台.html（项目根目录）
 */
import { readFile, writeFile, readdir, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, extname, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

const ROOT = resolve(import.meta.dirname, '..')
const OUT_DIR = join(ROOT, 'dist-single')
const OUT_FILE = join(ROOT, '松江区文旅态势感知平台.html')

const MIME = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
}

const log = (...args) => console.log('[single-file]', ...args)
/** --reuse：跳过 vite 打包，直接用现有 dist-single 重新内联 */
const SKIP_BUILD = process.argv.includes('--reuse')

log(SKIP_BUILD ? '复用现有 dist-single 产物…' : '开始打包…')
// 直接调用本地 vite，避免 Windows 下 npx/cmd 的进程启动问题
const viteBin = join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js')
if (!existsSync(viteBin)) {
  console.error('[single-file] 未找到 vite，请先执行 npm install')
  process.exit(1)
}
const build = SKIP_BUILD ? { status: 0 } : spawnSync(
  process.execPath,
  [viteBin, 'build', '--config', 'vite.config.single.mjs'],
  {
    cwd: ROOT,
    stdio: 'inherit',
    env: {
      ...process.env,
      // 受限环境下 esbuild 清理系统临时目录会被拒绝，这里指到项目内
      TEMP: join(ROOT, '.tmp'),
      TMP: join(ROOT, '.tmp')
    }
  }
)
if (build.status !== 0) {
  console.error('[single-file] 打包失败')
  process.exit(build.status || 1)
}

let html = await readFile(join(OUT_DIR, 'index.html'), 'utf8')

/* ---------- 1. 内联运行时配置 ---------- */
const ctxTag = /<script src="\.\/config\/appContext\.js"><\/script>/
if (ctxTag.test(html)) {
  const ctx = await readFile(join(OUT_DIR, 'config', 'appContext.js'), 'utf8')
  html = html.replace(ctxTag, () => `<script>\n${ctx}\n</script>`)
  log('已内联 config/appContext.js')
}

/* ---------- 2. 内联入口 JS ---------- */
const assetsDir = join(OUT_DIR, 'assets')
const assetFiles = existsSync(assetsDir) ? await readdir(assetsDir) : []
// maplibre 的 worker 在常规构建里是独立文件，file:// 下无法 new Worker(文件路径)；
// 这里把它改成 Blob URL 内联进主脚本（天地图底图在单文件版同样可用）。
const workerFiles = assetFiles.filter((n) => /worker.*\.js$/.test(n))

const scriptTags = [...html.matchAll(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/g)]
if (!scriptTags.length) throw new Error('未找到入口 script 标签')
for (const m of scriptTags) {
  const jsPath = join(OUT_DIR, m[1].replace(/^\.\//, ''))
  if (!existsSync(jsPath)) throw new Error(`入口脚本不存在：${jsPath}`)
  let js = await readFile(jsPath, 'utf8')

  for (const wf of workerFiles) {
    const src = await readFile(join(assetsDir, wf), 'utf8')
    const blobExpr = `URL.createObjectURL(new Blob([${JSON.stringify(src)}],{type:"text/javascript"}))`
    const refPattern = new RegExp(
      `new URL\\("${wf.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}",\\s*import\\.meta\\.url\\)\\.href`,
      'g'
    )
    if (refPattern.test(js)) {
      js = js.replace(refPattern, () => blobExpr)
      log(`已内联 worker ${wf}（${(src.length / 1024).toFixed(0)} KB）`)
    }
  }

  html = html.replace(m[0], () => `<script type="module">\n${js}\n</script>`)
  log(`已内联脚本 ${m[1]}（${(js.length / 1024 / 1024).toFixed(2)} MB）`)
}

/* ---------- 3. 内联 CSS ---------- */
const linkTags = [...html.matchAll(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g)]
let cssTotal = 0
for (const m of linkTags) {
  const cssPath = join(OUT_DIR, m[1].replace(/^\.\//, ''))
  if (!existsSync(cssPath)) continue
  const css = await readFile(cssPath, 'utf8')
  cssTotal += css.length
  html = html.replace(m[0], () => `<style>\n${css}\n</style>`)
}
if (cssTotal) log(`已内联样式（${(cssTotal / 1024).toFixed(0)} KB）`)

// 单文件下 modulepreload 已无意义
html = html.replace(/<link rel="modulepreload"[^>]*>/g, '')

/* ---------- 4. 图片 → data URI ---------- */
const imgDir = join(OUT_DIR, 'img')
const imgFiles = existsSync(imgDir) ? await readdir(imgDir) : []
let inlined = 0
let inlinedBytes = 0

for (const name of imgFiles) {
  const file = join(imgDir, name)
  const info = await stat(file)
  if (!info.isFile()) continue
  const ext = extname(name).toLowerCase()
  const mime = MIME[ext]
  if (!mime) continue
  // 只处理被引用到的资源（引用形式可能是 ../img/x.png、./img/x.png 或 /img/x.png）
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = new RegExp(`(?:\\.\\.\\/|\\.\\/|\\/)img\\/${escaped}`, 'g')
  if (!pattern.test(html)) continue

  const buf = await readFile(file)
  const uri = `data:${mime};base64,${buf.toString('base64')}`
  html = html.replace(pattern, () => uri)
  inlined += 1
  inlinedBytes += buf.length
}
log(`已内联图片 ${inlined} 个（原始 ${(inlinedBytes / 1024 / 1024).toFixed(2)} MB）`)

/* ---------- 5. 输出 ---------- */
const buildTime = new Date().toLocaleString('zh-CN', { hour12: false })
html = html.replace(
  '<title>',
  `<meta name="build-time" content="${buildTime}">\n    <title>`
)
await writeFile(OUT_FILE, html, 'utf8')
const size = (Buffer.byteLength(html, 'utf8') / 1024 / 1024).toFixed(2)
log(`生成完成：${OUT_FILE}（${size} MB）`)

const leftover = html.match(/(?:\.\/|\/)img\/[\w.-]+\.(?:png|jpg|jpeg|svg|webp)/g)
if (leftover) log(`提示：仍有 ${new Set(leftover).size} 个图片引用未内联`, [...new Set(leftover)].slice(0, 5))
