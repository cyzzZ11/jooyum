import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * 单文件 HTML 打包配置（`npm run build:single`）。
 * 与 vite.config.mjs 的差异：
 *   1. 关闭代码分割（inlineDynamicImports），所有路由组件打进同一个 JS；
 *   2. 关闭 CSS 拆分，样式集中在单个文件；
 *   3. 资源内联阈值放大，import 进来的图片/字体直接转 base64。
 * 打包后再由 scripts/build-single-file.mjs 把 JS/CSS/public 图片内联进 index.html。
 */
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  },
  build: {
    outDir: 'dist-single',
    emptyOutDir: true,
    assetsInlineLimit: 1024 * 1024 * 1024,
    cssCodeSplit: false,
    chunkSizeWarningLimit: 30000,
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  }
})
