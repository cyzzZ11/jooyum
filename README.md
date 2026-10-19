# 松江区文旅 · 一屏观文旅 一网为全城

参考市级「一屏观文旅」大屏改造的**松江区级文旅运行监测大屏**。单屏 **1920×1080** 设计，整体等比缩放适配任意分辨率。

---

## 快速开始

```bash
npm install        # 已指向 npmmirror 镜像
npm run dev        # http://localhost:5173
npm run build      # 产物在 dist/
npm run gen:geo    # 重新生成松江区街镇地图数据（可选）
```

> **想开放给局域网/公网访问？** 见 [`DEPLOY.md`](./DEPLOY.md)。
> - 局域网：`http://<本机IP>:5173/`（已配 `host: '0.0.0.0'`）
> - 公网：`tools\start-public-cloudflare.cmd`（Cloudflare 快速隧道，免注册免代理）
>
> 注意：走隧道时**必须**在 `vite.config.ts` 配好 `server.allowedHosts`，否则 Vite 会返回 403。

---

## 技术栈

| 项 | 选型 |
|---|---|
| 框架 | Vue 3.5（`<script setup>` + TypeScript） |
| 构建 | Vite 8 |
| 图表 | ECharts 5.6（按需引入，见 `src/utils/echarts.ts`） |
| 状态 | Pinia（时钟 + 全局轮播开关） |
| 样式 | 原生 SCSS（无 UI 组件库，大屏样式高度定制） |
| 地图 | ECharts `registerMap` + 自建 GeoJSON |

> ⚠️ **不要升级到 ECharts 6**：6.x 的坐标变换层在 `layoutCenter` 场景下 `matrixInvert` 会返回 `null`，导致 `geo` 初始化直接抛异常、整个 Vue 挂载流程中断。当前锁定 `echarts@^5.6.0`。

---

## 屏幕布局（1920×1080）

```
┌───────────────────────────────────────────────────────────────────────┐
│ 页头 76px ｜ 时间·天气 ｜ 一屏观文旅 一网为全城 ｜ 轮播开关·用户          │
├──────────────┬─────────────────────────────────┬──────────────────────┤
│ 左列 462px    │ 中心 自适应（≈926px）             │ 右列 476px            │
│              │                                 │                      │
│ 游 ⇄ 吃       │  ┌───────────────────────────┐  │ 放 ⇄ 管               │
│ （11s 轮播）   │  │ 松江区街镇一张图            │  │ （10s 轮播）          │
│              │  │  · 17 街镇 choropleth      │  │                      │
│ 购 ⇄ 住       │  │  · 景区点位 effectScatter   │  │                      │
│ （11s 轮播）   │  │  · 伪 3D 立体底座           │  │ ─────────────────    │
│              │  │  · 指标维度可切换            │  │ 服（固定）            │
│ 娱 ⇄ 行       │  └───────────────────────────┘  │                      │
│ （11s 轮播）   │  文旅资源统计（14 类 · 2 行）      │                      │
└──────────────┴─────────────────────────────────┴──────────────────────┘
```

### 卡片切换规则

所有可切换的卡片都用同一个 `PanelBox` 组件（`src/components/common/PanelBox.vue`）：

- **自动轮播** + **点击标签手动切换** + **鼠标悬停暂停** + **底部进度条**
- 切换动画为左右滑入（`sw-next` / `sw-prev` CSS 过渡）
- 页头右侧的「自动轮播 / 已暂停」按钮可**一键暂停全局轮播**
- 轮播间隔可全局配置：`src/stores/screen.ts` 的 `interval`，也可按面板单独传 `:interval`

**左侧**：`游 ⇄ 吃`、`购 ⇄ 住`、`娱 ⇄ 行` 三组，每组两张卡互相切换。
**右侧**：按高度分两块 —— 上块 `放 ⇄ 管` 左右切换，下块固定展示 `服`。

> 想让「服」也参与切换，只需把 `src/components/RightColumn.vue` 里的 `TABS_TOP` 改成三项即可：
> ```ts
> const TABS_TOP: PanelTab[] = [
>   { key: 'fang', label: '放' },
>   { key: 'guan', label: '管' },
>   { key: 'fu',   label: '服' },
> ]
> ```
> 再把 `<FuCard />` 挪进上面的 `PanelBox` 即可。

---

## 目录结构

```
├─ scripts/
│  ├─ build-towns.mjs          # 【回退】DataV 区界 + Voronoi 剖分 → 街镇 GeoJSON（需 --force）
│  └─ fetch-amap-district.mjs  # 【可选】用高德 Key 换成真实街镇边界
├─ src/
│  ├─ assets/geo/              # 生成的地图数据（songjiang / songjiang-towns）
│  ├─ components/
│  │  ├─ common/               # ScreenAdapter / PanelBox / VChart / StatBlock / RankBar / SvgIcon / StatNumber
│  │  ├─ cards/                # 9 张业务卡片（游吃购住娱行 + 放管服）
│  │  ├─ map/                  # SongjiangMap / MapBackdrop / ResourceBar
│  │  ├─ ScreenHeader.vue
│  │  ├─ LeftColumn.vue / CenterColumn.vue / RightColumn.vue
│  ├─ data/                    # 模拟数据（towns / map / panels）
│  ├─ stores/screen.ts         # 时钟 + 轮播总开关
│  ├─ styles/                  # vars / mixins / index / cards
│  ├─ types/ui.ts
│  └─ utils/                   # echarts / chartTheme / color / format / mapRegister
```

---

## 地图：松江区 17 个街镇

松江区下辖 **6 街道 + 11 镇**：岳阳、永丰、方松、中山、广富林、九里亭街道；泗泾、佘山、车墩、新桥、洞泾、九亭、石湖荡、新浜、泖港、叶榭、小昆山镇。

### 数据来源说明

- **区界**：阿里云 DataV `areas_v3/bound/310117.json`（松江区 adcode = 310117），GCJ-02 坐标系。
- **街镇边界：真实行政边界**（17 个街镇，`Polygon` / `MultiPolygon` 混合）。

  已实测与 DataV 区界**坐标系完全一致** —— 两者 bbox 一模一样
  （`lon[121.0249, 121.3720] lat[30.8943, 31.1629]`），街镇无缝拼成全区，与区界描边精确对齐，无需纠偏。

  文件：`src/assets/geo/songjiang-towns.json`，每个 feature 的 `properties` 为 `{ name, center }`。

> ⚠️ 早期版本的街镇边界是用 `scripts/build-towns.mjs` 做的 **Voronoi 示意剖分**（因为 DataV 只提供到区县级）。
> 该脚本现在**默认不会覆盖**已存在的 `songjiang-towns.json`，避免把真实数据冲掉；
> 确需回退到示意分区请运行 `npm run gen:geo -- --force`。

### 替换街镇边界

1. **直接换 GeoJSON**：覆盖 `src/assets/geo/songjiang-towns.json` 即可。要求：
   - `FeatureCollection`
   - 每个 feature 的 `properties.name` 必须与 `src/data/towns.ts` 中的街镇名**逐字一致**（否则填色和 tooltip 会取不到值）
   - 坐标系与区界一致（GCJ-02）
2. **用高德行政区划 API 拉**（拿到的是官方 GCJ-02 边界）：
   ```bash
   # 免费申请 Key： https://console.amap.com/dev/key/app
   AMAP_KEY=你的Key node scripts/fetch-amap-district.mjs
   ```

### 地图交互

- 顶部可切换 5 个指标维度：**接待游客 / 文旅营收 / 景区景点 / 宾馆酒店 / 发展指数**，街镇填色与右侧 TOP5 排行联动。
- 悬停街镇显示该街镇 6 项明细 tooltip。
- 金色 ripple 点为重点景区（带名称）；青色小点为一般文旅点位（仅悬浮提示，避免文字重叠）。
- **拖拽平移 · 滚轮缩放（以光标为锚点，1×~3×）· 双击或点「复位」按钮还原。**

伪 3D 立体底座由 `MapBackdrop.vue` 单独一个 ECharts 实例渲染（**多层 `map` series 放在同一实例里会互相干扰**，所以必须拆开成两个画布叠放）。

> 正因为是两块独立画布，**平移/缩放没有用 ECharts 的 `roam`**（两个实例会各自漫游导致底座与主图错位），
> 而是在 `.map-inner` 容器上做统一的 CSS `translate3d + scale`（`transform-origin: 0 0`）。
> 注意大屏整体已被 `ScreenAdapter` 等比缩放，鼠标位移需要除以舞台缩放比换算成设计稿像素（见 `stageScale()`）。


---

## 数据替换

所有数据集中在 `src/data/`，当前为**模拟数据**，结构已对齐真实业务口径：

| 文件 | 内容 |
|---|---|
| `towns.ts` | 17 街镇：接待游客、文旅营收、景区景点、宾馆酒店、餐馆、执法次数、发展指数；地图指标色带 `MAP_METRICS` |
| `map.ts` | 16 个景区/文旅点位（含坐标、等级、客流）；底部 14 类文旅资源统计 |
| `panels.ts` | 游/吃/购/住/娱/行 + 放/管/服 全部卡片数据 |

接真实接口时，把对应 `computed` 换成 `fetch` + `ref` 即可，视图层不用改。

---

## 已知取舍

1. **街镇边界为真实行政边界**，与 DataV 区界坐标系一致、无缝拼接（见上文）。
   `scripts/build-towns.mjs` 的 Voronoi 示意剖分保留为 `--force` 回退方案。
2. **无 3D 地图**：未引入 `echarts-gl`（对 ECharts 5/6 兼容性风险大），改用多层错位渲染 + 描边发光实现立体观感。
3. **业务数据为本地模拟**：`src/data/` 下的指标均为模拟值，未接真实接口。
   > 注意：排查网络时**不要用 git-bash 的 curl** —— 这台的版本有 bug，
   > 对 github / cloudflare 等会报 `curl: (43) A libcurl function was given a bad argument`，
   > 配合 `-w "%{http_code}"` 会输出 `000`，伪装成"被墙"。用 PowerShell 或 Node `fetch` 才准确。
4. **`sw-next/sw-prev` 过渡依赖 `requestAnimationFrame`**：若在极端情况下 JS 调度被中断，卡片可能停留在过渡中间态；如需绝对稳妥可改为纯 CSS `@keyframes` 入场动画。
