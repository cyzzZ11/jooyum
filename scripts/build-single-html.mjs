/**
 * 打包成「单个 HTML 文件」：JS / CSS 全部内联，双击即可离线打开。
 * 用于把大屏发给领导 / 同事预览，对方无需安装 Node、也无需起服务。
 *
 * 用法：
 *   node scripts/build-single-html.mjs [输出文件名]
 * 默认输出：项目根目录下的 松江区文旅大屏-预览.html
 */
import { readFile, writeFile, rm, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outFile = path.resolve(root, process.argv[2] ?? '松江区文旅大屏-预览.html')
const tmpDir = path.join(root, '.cache', 'single-html-build')

async function main() {
    await mkdir(path.dirname(tmpDir), { recursive: true })
    await build({
        root,
        base: './', // 相对路径，避免 file:// 下找不到 /assets
        logLevel: 'warn',
        build: {
            outDir: tmpDir,
            emptyOutDir: true,
        },
    })

    const indexPath = path.join(tmpDir, 'index.html')
    let html = await readFile(indexPath, 'utf8')

    // 内联 CSS
    const linkRe = /<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g
    for (const [, href] of [...html.matchAll(linkRe)]) {
        const css = await readFile(path.join(tmpDir, href.replace(/^\.?\//, '')), 'utf8')
        html = html.replace(
            new RegExp(`<link[^>]*href="${escapeRe(href)}"[^>]*>`),
            () => `<style>\n${css.replace(/<\/style/gi, '<\\/style')}\n</style>`
        )
    }

    // 内联 JS（保留 type="module"，否则会在 #app 渲染前执行）
    const scriptRe = /<script[^>]*src="([^"]+)"[^>]*><\/script>/g
    let inlined = 0
    for (const [, src] of [...html.matchAll(scriptRe)]) {
        const js = await readFile(path.join(tmpDir, src.replace(/^\.?\//, '')), 'utf8')
        html = html.replace(
            new RegExp(`<script[^>]*src="${escapeRe(src)}"[^>]*><\\/script>`),
            () => `<script type="module">\n${js.replace(/<\/script/gi, '<\\/script')}\n</script>`
        )
        inlined += 1
    }

    if (inlined === 0) throw new Error('未找到需要内联的入口 JS，构建产物结构可能已变化')

    await writeFile(outFile, html, 'utf8')
    const size = Buffer.byteLength(html) / 1024 / 1024
    console.log(`✔ 已生成 ${outFile}（${size.toFixed(2)} MB）`)
    await rm(tmpDir, { recursive: true, force: true })
}

function escapeRe(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
