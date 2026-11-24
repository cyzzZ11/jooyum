import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // 部署在站点子目录 /dxckc/ 下
  base: '/dxckcy/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    host: true,
    // 允许 cloudflared quick tunnel 等任意 host 代理请求（内网穿透预览用）
    allowedHosts: true,
  },
  preview: {
    port: 4173,
    host: true,
    allowedHosts: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    // 载体资源静态数据量较大（resource.js 约 900KB），放宽分块体积告警阈值
    chunkSizeWarningLimit: 1500,
  },
})
