# 松江大学城科创源 · 科技服务平台

官网前端，已由纯静态 HTML 迁移为 **Vue 3 + Vite** 单页应用（SPA）。

## 技术栈

- Vue 3（`<script setup>` 单文件组件）
- Vue Router 4（history 模式，支持旧 `.html` 链接重定向）
- Vite 6（开发服务器与生产构建）
- 零依赖 Node 静态服务器（`server.js`，托管 `dist/`）

## 目录结构

```text
├─ index.html                 # Vite 入口
├─ vite.config.js
├─ server.js                  # 生产静态服务器（托管 dist/，SPA 回退）
├─ src/
│  ├─ main.js                 # 应用入口
│  ├─ App.vue                 # 根组件（router-view）
│  ├─ router/                 # 路由表 / 内部链接拦截
│  ├─ views/                  # 28 个页面级视图组件
│  ├─ composables/            # 首页轮播、滚动动画、锚点滚动等交互
│  ├─ data/                   # 技术经理人数据
│  └─ assets/styles/          # 全局基础样式与页面共享样式
├─ public/                    # 静态资源（logo、favicon）
├─ dist/                      # 构建产物（npm run build 生成）
├─ legacy/                    # 迁移前的原始静态站，仅作对照保留
└─ build/                     # 打包脚本与一次性迁移脚本
```

## 常用命令

```bash
npm install        # 安装依赖
npm run dev        # 开发服务器 http://localhost:5173
npm run build      # 构建到 dist/
npm run start      # 用 Node 静态服务器托管 dist/（默认 5000 端口）
npm run preview    # Vite 预览构建产物（4173 端口）
npm run pack       # 将 dist/ 打包为部署 zip
```

> 生产部署：先 `npm run build`，再部署 `dist/` 目录；或直接 `npm run start`。
> 端口可通过环境变量 `PORT` / `DEPLOY_RUN_PORT` 覆盖。

## 首页首屏

- 首屏由「轮播 + 新闻资讯」独占一屏（高度 = 视口高度 − 吸顶导航高度），
  顶部导航保持吸顶；不使用 `scroll-snap` 或滚轮劫持，滚动行为保持原生。
- 首屏高度通过 `--home-viewport-h` / `--home-nav-h` 两个 CSS 变量由 JS 测量后下发，
  窗口尺寸变化时自动更新；窗口较矮（≤700px）时自动精简资讯条数，保证首屏仍是一屏。
- 科技感视觉层（均为 CSS 实现，并支持 `prefers-reduced-motion`）：
  顶部滚动进度条、首屏极光光晕 + 科技网格 + 扫描线、轮播 HUD 边角、
  科技关键词跑马灯、活动/数据卡片光标跟随光斑、标题渐变与动效分隔线。

## 路由与旧链接

- 新路由为无扩展名路径，例如 `/gaochuangyuan`、`/platforms/tongji`、
  `/cgzh-gx/tech-demand-platform`。
- 历史 `.html` 链接会被自动重定向到对应新路由（如
  `/gaochuangyuan.html` → `/gaochuangyuan`），无需修改外部链接或收藏。
- 页面内普通 `<a href>` 由 `src/router/linkInterceptor.js` 接管为客户端跳转，
  外链、新窗口、下载和页内锚点保持原生行为。

## 迁移说明

- `legacy/` 保存迁移前的完整静态站，便于视觉与交互对照；不参与构建与部署。
- `build/migrate-legacy.mjs` 是一次性迁移脚本：从 `legacy/` 提取模板、样式与交互，
  生成 `src/views/*.vue`。**迁移完成后请勿重复执行**，否则会覆盖对视图组件的手工修改。
- 页面样式使用 SFC `scoped`，并将原 `:root / html / body` 选择器收敛到页面根容器，
  keyframes 增加页面级前缀，避免 SPA 内多页面样式互相污染。
