import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                // 全局注入变量 / mixin，业务组件内无需重复 @use
                additionalData: `@use "@/styles/vars.scss" as *;\n@use "@/styles/mixins.scss" as *;\n`,
                silenceDeprecations: ['legacy-js-api', 'import'],
            },
        },
    },
    server: {
        host: '0.0.0.0',
        port: 5173,
        /**
         * 内网穿透时 Host 头不是 localhost，Vite 默认会以 403 拒绝
         * （"Blocked request. This host is not allowed."）。
         * 这里放行常见隧道域名，前导点表示匹配所有子域。
         */
        allowedHosts: [
            '.trycloudflare.com', // Cloudflare 快速隧道
            '.cpolar.cn', // cpolar
            '.cpolar.top',
            '.natappfree.cc', // natapp
            '.ngrok.cc', // ngrok 国内版
            '.ngrok-free.app',
            '.i996.me', // 樱花 frp
            '.oray.net', // 花生壳
            '.localhost.run',
            '.serveo.net',
        ],
    },
    build: {
        chunkSizeWarningLimit: 2000,
    },
})
