import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 参考站以相对路径部署在子目录（如 /quanguolvyou/），这里保持同样的可移植策略。
// 注意：本文件为 .mjs，Vite 会直接 import 而不经 esbuild 打包，避免在受限环境下
// esbuild 启动子进程被拦截（spawn EPERM）；因此这里不使用 __dirname / fileURLToPath。
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  },
  server: {
    host: '127.0.0.1',
    port: 5180,
    strictPort: false
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        // 按依赖体积拆分，避免单个 chunk 过大（echarts / element-plus 为体积主要来源）
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('maplibre') || id.includes('geojson-vt') || id.includes('supercluster'))
            return 'vendor-map'
          if (id.includes('echarts') || id.includes('zrender')) return 'vendor-echarts'
          if (id.includes('element-plus') || id.includes('@element-plus')) return 'vendor-element'
          if (id.includes('vue') || id.includes('@vue')) return 'vendor-vue'
          return 'vendor'
        }
      }
    }
  }
})
