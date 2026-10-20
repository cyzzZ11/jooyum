# 松江区文旅态势感知与智能决策平台（前端）

参照 **全国文旅态势感知与智能决策平台**（`http://192.170.13.107:8088/quanguolvyou`）的模块布局开发，
把所有数据口径从「全国」替换为 **上海市松江区**。

技术栈：Vue 3 + Vite 5 + Element Plus + ECharts 5。

> **当前演示口径**：2026 年国庆节假期（10 月 1 日 - 10 月 7 日）、松江区。
> **数据来源**：核心客流指标取自「节假日游客大数据监测平台」（实测，已逐条留档于 [`data-source/`](./data-source/)），
> 消费/入境/商圈等平台未监测口径为测算值。逐项清单见 [docs/数据源清单.md](./docs/数据源清单.md)，
> 生成规则见 [docs/2026国庆数据来源与生成规则.md](./docs/2026国庆数据来源与生成规则.md)。
> 演示方式：双击 **`松江区文旅态势感知平台.html`**（单文件版）或 `启动演示.cmd`，说明见 [docs/演示部署说明.md](./docs/演示部署说明.md)。

---

## 一、与参考站的对应关系

外框结构、页面结构、配色尺寸均从参考站构建产物反编译得出，逐项对齐如下。

### 1. 应用外壳（参考站 `chunk-223c1674`）

| 参考站实现 | 本项目实现 |
| --- | --- |
| `#app` 固定 **1920×1080**，按窗口等比 `scale()` 缩放并居中 | `src/utils/screen.js`，算法与参考站 `Main.resize()` 完全一致 |
| `.main-wrapper` 全屏科技蓝底图 `main-bj.png` | 同一张底图：`public/img/main-bj.3a8efb62.png` |
| `.header-panel` 高 **93px**，底图 `header-top.png` | 同一张底图：`public/img/header-top.1b3f41db.png` |
| `.sys-name` 标题，`linear-gradient(180deg,#fff,#93e1ff)` 裁切文字 | 同款渐变文字 |
| `.check-menu-wrapper` 模块切换下拉 | 同位置「菜单」下拉，切换 6 大模块 |
| `.sys-menu-panel` 水平子菜单：每项 **125×60**、左右箭头滚动 | 同规格；选中/悬停用 `menu-bj.png`，未选中用 `menu-select.png` |
| `#mainContent`：`position:absolute; width:100%; height:calc(100% - 70px); bottom:0` | 同名同规格 |
| **无左侧菜单** | 无左侧菜单（早期版本曾有侧栏，已按参考站移除） |
| 模块容器 `Vistors`（`chunk-b753df26`）：`.top-bj` 100px 渐隐遮罩 + `.map-wrapper` 960px 地图层 | `src/views/common/ModuleLayout.vue`，同尺寸；地图层按 `route.meta.useMap` 显示 |

> 图片素材已按参考站原始文件名放入 `public/img/`（`main-bj` / `header-top` / `menu-bj` /
> `menu-select` / `index-card-bg` / `world` / `travel` / `traffic` / `shopping` /
> `entertainment` / `logo3` / `target-bj`），CSS 直接引用，因此这几处与外框**完全一致**。
> 授权前提：已由项目方确认该平台为本单位/承建平台。

### 2. 态势总览页（参考站 `chunk-1b0fcab6`，路由 `/main/trend/overview`）

结构与样式逐条对齐，CSS 数值直接取自参考站 scoped 样式：

- 顶部 `热门排行 / 高频态势` 切换（`.rank-type-switch`，项 `min-width:240px; height:48px; font-size:24px`，选中态金色渐变 `#f6d76a → #d8b048`）
- 参数区：区域选择（全国→上海市→松江区→街镇）+ 时间类型 `月度/日度/假日` + 年份/假日级联
- 四张指标卡：累计旅游消费 / 累计接待游客量 / 累计接待入境游客量 / 景区累计接待游客量（含单位、同比、涨跌箭头）
- 热门排行：热门消费街镇 / 热门旅游街镇 / 热门入境街镇 / 热门景区（各 `calc(25% - 20px)`，列为 区域 / 归属 / 累计值 / 同比）
- 高频态势：四张突破榜 + 5 张趋势图（消费、接待游客、入境游客、景区接待、商圈接待）
- 每张趋势图上方为摘要条 `.trend-summary-bar`，文案格式与参考站一致：
  `{时间}，{区域}{指标} {值}{单位}，同比 {同比}%。`，数值用 `#ffd200` 高亮
- 底部 `数据来源：手机信令大数据`

### 3. 路由与菜单

**子菜单名称与顺序已按参考站真实账号的权限树校准**（`GET api/v1/permission/current/user/functions`）：

```
114      全国旅游大数据平台
114-1    旅游态势
114-1-1  总览       -> /main/trend/overview
114-1-2  旅游消费   -> /main/trend/fee
114-1-3  国内旅游   -> /main/trend/city
114-1-4  入境旅游   -> /main/trend/entry
114-1-5  景区旅游   -> /main/trend/scenic
114-1-7  对比分析   -> /main/trend/compare
114-1-8  商圈游客   -> /main/trend/business
```

本项目 6 大模块（`src/config/menu.js`）：

1. 文旅态势感知：总览 / 旅游消费 / 国内旅游 / 入境旅游 / 景区旅游 / 商圈游客 / 对比分析 / 实时客流
2. 文旅舆情监测：舆情分析 / 媒体分析 / 区域分析 / 舆情列表 / 预警中心
3. 文旅产业洞察：产业总览 / 产业图谱 / 链数分析 / 企业监测
4. 文旅资源图谱：资源图谱 / 资源一张图 / 资源分析
5. 假日客流分析：假日总览 / 城市客流 / 景区客流 / 门票收入
6. 特色业态专题：特色业态 / 夜间经济（对应参考站「冰雪运动」专题，替换为松江本地特色）

首期「总览」为完整实现，其余子页面由 `src/views/common/ModuleSkeleton.vue` 统一骨架渲染
（结构、指标卡、图表位与参考站同构，数据为演示数据，待接口接入后逐页替换）。

---

## 一·补充、参考站真实接口与取数通道（已实测）

> 以下为实际登录参考站（账号 `songjiang`）后验证得到的结论，是接真实数据的关键。

### 1. 登录协议

| 步骤 | 接口 | 说明 |
| --- | --- | --- |
| 取 RSA 公钥 | `GET {baseUrl}common/config/rsa/public-key` | 返回 base64 X.509 公钥；密码用 **RSA PKCS#1 v1.5** 加密（等价 JSEncrypt） |
| 取图形验证码 key | `POST {baseUrl}common/code/image-code/key` | 返回 `codekey` |
| 取验证码图片 | `GET {baseUrl}common/code/{codekey}/image-code` | **必须带 `Accept: image/*`**，否则返回 `No acceptable representation` |
| 登录 | `POST {baseUrl}auth/token` | body `{username, password(RSA密文), code, codekey}`；成功返回 `{tokenId, userId, username, expireTime}`，**有效期约 10 分钟** |
| 权限树 | `GET {baseUrl}api/v1/permission/current/user/functions` | 头 `Authorization: Bearer {tokenId}` + `smart_token_jwt: {userId}` |

### 2. 取数通道（关键）

数据不是直接请求的，而是通过网关的 `nocache` 代理转发到数据服务：

```
POST {baseUrl}api/v2/nocache/data/json
body: {
  adcode: "110000",
  ext: { rest: { method: "GET", url: "/api/v4/attr/query/list?dataId=xxx&filter=<encodeURI(JSON)>" } },
  level: "province",
  queryType: "v4daasData",     // 或 dmsData（POST + datas）
  regionGroup: "general",
  time: "2024"
}
```

**filter 必须 `encodeURIComponent`**，否则网关 JSON 解析报
`illegal fieldName input 114 ... fastjson`。

### 3. 总览页用到的 dataId

> **重要：每张表的「区域参数名」不一样，传错会报「请检查模板或者参数是否错误」。**
> 这是实测踩坑得出的规则：
>
> | 表类型 | 正确参数名 | 反例 |
> | --- | --- | --- |
> | 总量/趋势类（`*_total_ls_*`、`*_time_m`、`*_on_day`） | **`fnid`** | 传 `region_code` 报模板错误 |
> | 消费类（`snow_sports_bxxf_*`） | **`region_code`** | 传 `fnid` 报模板错误 |
>
> 另外：月度口径日期为 **YYYYMM**、日度为 **YYYYMMDD**，且多数表需用 **`dates: [起, 止]` 数组**。

| 用途 | dataId |
| --- | --- |
| 区域树（含松江区 `310117`） | `qgdtrkdsjjcpt_dtrkjc_area_region` |
| 国内游客总量 | `qgdtrkdsjjcpt_zdqyjc_zdjq_total_ls_city` |
| 景区总量 | `qgdtrkdsjjcpt_zdqyjc_zdjq_total_ls` |
| 入境游客（当日客流量） | `qglyxxfwyyjzhpt_jc_csjc_rjyk_jdykl` |
| 热门旅游城市 | `qgdtrkdsjjcpt_zdqyjc_zdjq_ykgm_ls_city` |
| 热门入境城市 | `qglyxxfwyyjzhpt_jc_csjc_rjyk_csykgm` |
| 趋势（月度） | `qgdtrkdsjjcpt_zdqyjc_zdjq_time_m`、`qgdtrkdsjjcpt_zdqyjc_zdjq_city_time_m` |
| 趋势（日度） | `qgdtrkdsjjcpt_zdqyjc_zdjq_on_day` |
| 入境趋势 | `qglyxxfwyyjzhpt_jc_csjc_rjyk_time_m` |
| 商圈规模 | `shsrkdsjjcpt_business_scale_times` / `..._holiday` |

### 4. 当前环境限制（**已实测，非限制而是参数问题**）

> 更正：早期结论「数据服务不可达」是**错的**。数据服务 `192.170.13.66` 实际可用，
> 之前的失败是**参数名与日期格式错误**。

关键参数规则（实测确定）：

| 项 | 规则 |
| --- | --- |
| 区域参数名 | 是 **`fnid`**（不是 `region_code`）；松江区 `fnid=310117`，`lv=3` |
| 月度口径日期 | **`YYYYMM`**（如 `202501`），且 **必须用 `dates: [起, 止]` 数组** |
| 日度口径日期 | `YYYYMMDD`，同样用 `dates` 数组 |
| 月度表 dataId | 事实表多有 `_m`（月度）/ `_m_n`（月度净客流）后缀 |
| 维度表 | `*_time_m`、`*_on_day` 加 `dates` 过滤后返回完整时间序列 |
| token | `auth/token` 返回的 `tokenId` **有效期约 10 分钟**，需重新登录 |

### 5. 实测到的松江区真实数据（已固化到 `src/mock/realdata.js`）

**区级汇总（平台实测）**

| 指标 | 2024 | 2025 | 同比 |
| --- | --- | --- | --- |
| 国内游客（累计） | 153,550,303 | **137,773,671** | -10.27% |
| 景区接待（监测口径） | 19,861,782 | **14,680,604** | -26.09% |
| 景区夜间客流 | 9,244,995 | **6,659,501** | 占比 45.36% |
| 入境游客（累计） | 3,724,416 | **4,319,356** | +15.97% |

对照（2025）：全国景区 8,419,102,233 人次；上海市 244,789,936 人次。

**消费分项（松江区，2025 全年，`snow_sports_bxxf_total`）**

```
总 602.63 万元（同比 -1.34%）
吃 187.57 / 住 204.16 / 行 38.43 / 游 7.22 / 购 108.41 / 娱 56.84  （万元）
对照：上海市 9945.32 万元（+6.82%）  全国 270956.59 万元（+13.10%）
```

**消费月度趋势（真实逐月，`snow_sports_bxxf_xfqs`）**

```
2025 逐月（万元）：37.5 38.3 55.5 52.4 53.2 46.9 52.8 53.6 57.5 49.6 57.4 47.9   合计 602.63
2024 逐月（万元）：37.3 25.7 77.0 70.6 64.5 57.1 63.0 59.2 53.9 49.6 51.1 49.9   合计 658.81
```

**上海市各区消费总额（16 区全部为平台实测真实值，2025 全年）**

| 区域 | 消费总额 | 同比 | 区域 | 消费总额 | 同比 |
| --- | --- | --- | --- | --- | --- |
| 浦东新区 | 2227.31 万 | +10.47% | 长宁区 | 444.57 万 | +10.34% |
| 黄浦区 | 1074.80 万 | +4.28% | 杨浦区 | 437.26 万 | +11.89% |
| 闵行区 | 1043.80 万 | +4.63% | 青浦区 | 409.12 万 | +16.01% |
| 静安区 | 782.97 万 | +11.13% | 普陀区 | 369.59 万 | +2.32% |
| 徐汇区 | 653.44 万 | +10.67% | 奉贤区 | 298.57 万 | -3.38% |
| **松江区** | **602.63 万** | **-1.34%** | 虹口区 | 209.76 万 | +3.09% |
| 嘉定区 | 592.30 万 | +4.59% | 金山区 | 170.16 万 | +5.54% |
| 宝山区 | 501.61 万 | +3.36% | 崇明区 | 127.42 万 | -0.07% |

> 该榜与参考站「热门消费城市」展示的维度一致（都是上海市各区），
> 因此**热门排行与对比分析页已改用这批真实值**，不再用测算分布。

**游客画像 / 出行方式（平台实测，2025 全年）**

| 指标 | 松江区 | 上海市 | 全国 |
| --- | --- | --- | --- |
| 出行方式 | **汽车 90.10% / 高铁 9.35% / 飞机 0.55%** ✅ | 汽车 93.9% / 高铁 4.0% / 飞机 1.7% | — |
| 消费能力 | **低 10.4% / 中低 47.06% / 中 39.96% / 中高 2.37% / 高 0.21%** ✅ | 低 7.95% / 中低 43.01% / 中 44.99% / 中高 3.69% / 高 0.37% | — |
| 性别 | ❌ 区县无数据 | 男 56.73% / 女 43.27% | 男 57.13% / 女 42.87% |
| 年龄结构 | ❌ 区县无数据 | 25-34岁 31.96% / 35-44岁 27.39% / 45-54岁 17.5% / 16-24岁 11.48% / 55岁以上 11.67% | 25-34岁 27.52% |
| 驻留时长 | ❌ 区县无数据 | <1h 35.13% / >4h 27.77% / 1-2h 18.81% / 2-4h 18.29% | <1h 24.59% / >4h 34.34% |

> **数据可得性实测结论**：`消费能力` 与 `出行方式` 在**松江区（lv3）有真实值**；
> `性别年龄`、`年龄结构`、`驻留时长` 在区县层级返回 0，只能取上海市值，
> 界面已标注「性别（上海市）」以区分口径。对应 dataId 见
> `src/mock/realdata.js` 中 `SJ_TRAVEL_MODE` / `SJ_SPENDING_POWER` / `SH_GENDER` / `SH_AGE` / `SH_DWELL`。
>
> 另：这批画像表的日期参数是 **YYYYMMDD**（月度区间 YYYYMM 会返回 null），
> 区域参数为 `fnid`；`出行方式` 的字段是绝对量（`cx_qt` 汽车 / `cx_gt` 高铁 / `cx_fj` 飞机），
> 百分比需自行按合计换算。

**两套口径并存**：
- 区级汇总指标优先用 **松江区统计公报**（法定统计口径）：旅游收入 157.56 亿元、
  接待游客 2207 万人次、16 家 A 级景区 1496.77 万人次；
- **数据平台监测值**用于趋势/夜间/同比等平台特有维度（景区 1468.06 万人次，与公报差约 2%）。

**街镇 / 景区 / 商圈明细无平台真实数据**：该平台区域维度只到区县级
（区域树中松江区为 lv3 且无下级），因此明细仍按区级真实总量测算分布，
并在 `src/mock/realdata.js` 的 `DATA_GRANULARITY` 中显式标注，前端可据此提示来源。

接真实数据的方式：`public/config/appContext.js` 把 `dataMode` 改为 `'api'`，
`src/api/trend.js` 按上表补参数即可。取数脚本见 `_probe/fetch-all.mjs`。

### 6. 地图

参考站地图图层为高德（`地图来源：高德地图`）。本项目按要求改用 **天地图**（key 已配置）。

实现：`src/components/TiandituMap.vue`，用 `maplibre-gl` 加载天地图 WMTS 瓦片
（`vec_w`/`cva_w` 矢量与注记、`img_w`/`cia_w` 影像与注记）。

接入要点（两个坑，均已修复）：
1. **maplibre-gl v6 是具名导出**，必须 `import * as maplibregl from 'maplibre-gl'`，
   否则整个路由组件加载失败、页面空白；
2. **v6 的 worker 是独立入口**，需 `import MapWorker from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'`
   并调用 `maplibregl.setWorkerUrl(MapWorker)`，否则报 `Worker failed to load`。

---

## 一·补充二、参考站**真实渲染页面**的实测数据（CDP）

已通过 Chrome 调试端口接管参考站标签页（用户手动登录），读取**渲染后的真实 DOM 与计算样式**，
并把测量值换算为 1920×1080 设计单位（参考站 `#app` 会按窗口缩放，需除以缩放系数）。

### 1. 应用外壳（实测）

| 元素 | 尺寸 | 位置 |
| --- | --- | --- |
| `.main-wrapper` | 1920×1080 | (0,0) |
| `.header-panel` | 1920×**93** | (0,0) |
| `.sys-name` | 460×70 | (10,0) |
| `.sys-menu-panel` | 1056×60 | (714,0) → 右边缘 1770 = 1920−150 |
| `.sys-menu` | **125×60** | 逐项 |
| `.user-info` | 103×40 | (1808,10) |
| `#mainContent` | 1920×**1010** | (0,70) |

**菜单文案（运行时实际渲染，非权限树文案）**：
`态势总览 / 旅游消费 / 国内旅游 / 入境旅游 / 景区游客 / 商圈游客 / 对比分析`
（权限树里写的是「总览」「景区旅游」，界面显示不同）
**标题**：`全国文旅态势感知平台` → 本项目为 `松江区文旅态势感知平台`。

### 2. 态势总览页（实测）

> 下列数值为**直接量参考站渲染页**（CDP，换算 1920 设计单位）所得，可逐项复核：

| 元素 | 参考站实测 | 本项目 |
| --- | --- | --- |
| `#mainContent > *` 页面根 | 1920×1010 @(0,70) | 1920×1010 ✓ |
| `.top-part-wrapper` | 1920×70 | 1920×70 ✓ |
| `.index-card-wrapper` | 1760×260 | 1760×260 ✓ |
| `.rank-part-wrapper` | 1920×570 | 1920×570 ✓ |
| `.rank-detail-wrapper` | 1920×560 @(0,10) | 1920×560 ✓ |
| `.rank-card-item` ×4 | 450×520 | 450×520 ✓ |
| `.chart-title` | 450×42 | 448×42 ✓ |
| `.content-wrapepr` | 450×467 | 448×468 ✓ |
| `.sourece-wrapper` | 1894×20 | 1894×19 ✓ |

**缩放算法**（反编译 `chunk-223c1674` 的 `resize()`，与本项目一致）：

```js
// body 尺寸 cw×ch，基准 1920×1080
cw / ch > 16 / 9
  ? { hr: ch/1080, marginLeft: (cw - 1920*ch/1080)/2 }   // 视口偏宽 → 按高缩放
  : { hr: cw/1920, marginTop:  (ch - 1080*cw/1920)/2 }   // 视口偏高 → 按宽缩放
$('#app').css({ width: 1920, height: 1080, transform: `scale(${hr})` })
```

> 实测坑：模块容器的 `padding: 10px 0 20px 0` 必须保留（页面可用高度 = 1010−30 之外，
> 参考站的页面根本身就是 1010，padding 由 `.module-layout` 承担）。
> 另外 `TableList` / `.chart-card__body` 必须带 `overflow: hidden` 且能被压缩
> （`min-height: 0; flex: 1 1 auto`），否则表格行会顶出卡片 —— 这是总览页曾溢出 17px 的原因。

### 3. 总览页内部结构（实测）

> **总览页两个 TAB 的实测结论（重要，曾理解错误）**
>
> | TAB | 真实结构 |
> | --- | --- |
> | **热门排行** | 4 张**排行榜**卡片：热门消费城市 / 热门旅游城市 / 热门入境城市 / 热门景区<br>列：`排名 · 区域(景区) · 累计消费(累计客流) · 同比`<br>容器 `.rank-part-wrapper`，卡片 450×520（`.chart-title` 448×42） |
> | **高频态势** | **不是排行榜**，而是 6 张「**摘要条 + 折线图**」卡片，3 列 × 2 行<br>容器 `.chart-part-wrapper`，卡片 `.trend-chart-card-wrapper`<br>卡片内部：`.chart-title` → `.content-wrapepr.trend-chart-panel` →<br>`.trend-summary-bar`（摘要条）→ `.e-linechart`（折线）<br>标题：旅游消费 / 国内旅游 / 入境旅游 / 景区游客 / 商圈游客 / 夜间文旅 |
>
> 摘要条文案格式（实测）：
> `「9月，上海市旅游消费累计1.04亿元，同比增长6.4%。」`
>
> **每条折线是双系列**（实测读取 SVG path）：
> `当年` 金黄 `#FCCE25` ＋ `去年同期` 青 `#1FDEDB`，**两条都不加区域填充**（`fill="none"`）。
> X 轴为 12 个月滚动窗口（实测 2025-10 → 2026-09）。
>
> 另外两个已修的坑：
> 1. **列宽必须 grow**：实测列宽 48/122/80/69 合计 319，而卡片内容宽约 448，
>    用固定宽 `0 0 Npx` 会留 100+px 空隙，把数值挤成「2452.37万-10.27%」。
> 2. **年份选择器返回 Date 对象**：`el-date-picker type="year"` 需加
>    `value-format="YYYY"`，否则摘要条会渲染成
>    `Thu Jan 01 2026 00:00:00 GMT+0800 (中国标准时间)年，…`（已在 `baseParams()` 加兜底）。
> 3. **高频态势下指标卡隐藏**（实测参考站该 TAB 无 `.index-card-wrapper`），
>    故趋势区应 `flex:1` 撑满，若沿用固定 753px 会在底部留 124px 空白。

```
#mainContent > *（页面根）      1920×1010 @(0,70)   ← 注意是 1010，不是 980
  .top-part-wrapper            1920×70   @(0,0)
    .rank-type-wrapper         1920×57
    .top-params-wrapper         500×40   @(1420,0)   ← 靠右，右边缘=1920
  .index-card-wrapper          1760×260  @(80,100)   ← margin 30px 80px 0，padding 0 40px
    .statistics-card-wrapper   各 ~318–384×123
  .rank-part-wrapper           1920×570
    .rank-detail-wrapper       1920×560  @(0,10)     ← padding 40px 20px 0
      .rank-card-item           450×520 ×4，间距 27px
  .sourece-wrapper             1894×20   @(26,940)   ← margin 4px 0 6px 26px，font-size 14px
```

> 早期此处曾记为「1920×980 @(0,100)」，经**直接量参考站渲染页**更正为
> **1920×1010 @(0,70)**（`#mainContent` 高 1010，页面根铺满，不再额外减 30px）。
> 页面内各部分竖直合计 960，在 1010 内留 50px 余量。

### 4. 图表卡（`.chart-card-content`，实测）

**结构与 CSS 逐字取自参考站 `chunk-19eac3cb.css`**（`ChartCard.vue` 已按其重建）：

```css
.chart-card-content { width:100%; height:100% }
  .chart-title        { position:relative; width:100%; height:42px; display:flex }
    .title-before-bar { width:3px; height:14px; background:#088afb; left:10px; top:11px }
    label             { margin-left:34px; line-height:30px; font-size:26px;
                        font-family:titleText; text-shadow:0 0 6px #002b53; margin-top:2px }
  .content-wrapepr    { width:100%; height:calc(100% - 53px); padding-top:10px;
                        position:relative; box-sizing:border-box }
  .content-wrapepr--flex { display:flex; flex-direction:column }
```

> 两个易错点：
> 1. `.chart-title` 是 **`width:100%`**（随卡片自适应），不是固定 458px；
>    实测 `/fee` 的 `.chart-title` 为 458×42 是因为左栏宽 458。
> 2. `.content-wrapepr` 高度是 **`calc(100% - 53px)`**（42 标题 + 11 余量），
>    不是「占满剩余空间」。
> 3. `.title-before-bar` 是绝对定位，标题右侧的工具栏/单位必须一并绝对定位靠右，
>    否则会与它及较长中文标题重叠。

### 5. 地图类页面的版式规则（实测 `chunk-181b8576.css`）

```css
.main-outer .layout-wrapper      { width:100%; height:100%; position:absolute; top:0; left:0;
                                   z-index:1100; display:flex; justify-content:space-between;
                                   pointer-events:none; box-sizing:border-box; padding:0 5px }
.main-outer .left-part-wrapper   { width:24%;  height:100%; display:flex; flex-direction:column;
                                   justify-content:space-between; gap:5px; pointer-events:auto }
.main-outer .right-part-wrapper  { width:24%;  height:100%; ... 同上 }
.main-outer .center-part-wrapper { width:calc(52% - 40px); height:calc(35% - 20px);
                                   position:absolute; bottom:0; left:calc(24% + 20px); z-index:1000 }
.main-outer .each-card-wrapper   { width:100%; height:33%; display:flex;
                                   align-items:center; justify-content:space-around }
.map-wrapper                     { position:absolute; width:960px; height:calc(100% - 340px);
                                   left:calc(50% - 480px); top:0; z-index:200 }
.top-bj                          { position:absolute; width:100%; height:100px; top:0; left:0;
                                   z-index:201; pointer-events:none }
```

> 本项目 `MapPanelsLayout.vue` 与上述规则**逐条一致**（已核对 CSS 原文）。
> 差异仅一处：`.map-wrapper`（参考站 960×670 的居中地图容器）本项目未单独建，
> 改为页面级全幅 `.map-layer`，视觉上等价但少一个容器节点。

### 6. 图表卡其余实测值

| 元素 | 规格 |
| --- | --- |
| `.chart-title` | 450×**42**（左栏卡片时），背景 `img/s-menu.5e84380d.png`（`background-size:100% 100%`） |
| `.chart-title label` | 143×40，`margin: 2px 0 0 34px`，**font-size: 26px**，字体 `titleText` |
| `.title-extra-unit-wrapper` | 例如 `(单位:元)`，font-size 16px |
| `.content-wrapepr.trend-chart-panel` | 450×467 |
| 表头 `th` | padding 12px 0，**font-size 14px，font-weight 700**，`text-align:left` |
| 单元格 `.cell` | padding 0 10px，font-size 14px，line-height 23px |

> 以上数值已全部落到本项目：`src/App.vue`、`src/views/trend/Overview.vue`、
> `src/components/ChartCard.vue`。
> 同时补齐了位图素材：`s-menu` / `panel-title` / `title-bottom-bar` / `b-menu`。

### 7. 已按实测重建的页面：旅游消费（`/main/trend/fee`）

`src/views/trend/Fee.vue` —— 与参考站同构的「地图打底 + 三栏浮层」：

| 区域 | 内容 |
| --- | --- |
| 中栏底层 | 天地图（松江区居中，实测 90/90 瓦片 200） |
| 左栏 | ① 旅游消费总金额(累计) 447.74 万元 + 同比<br>② 消费金额 2×3 宫格（餐饮/住宿/交通/旅游/购物/娱乐，各带图标与同比）<br>③ 消费结构 雷达图（6 维 + 占比标注） |
| 右栏 | ① 热门排行（排名/区域/消费金额/同比）<br>② 分类消费排行（下拉切换分类） |
| 底部居中 | 消费趋势：2026/2025 双柱 + 同比折线（双 Y 轴），切换 总体/吃/住/行/游/购/娱 |

数据取自平台实测：`FEE_BREAKDOWN`（`src/mock/realdata.js`）。

### 8. 已按实测重建的页面
版式骨架抽成公用组件 **`src/views/common/MapPanelsLayout.vue`**（实测尺寸）：
`.layout-wrapper` 1920×980 padding 0 5px；左右栏各 24%；中栏 `calc(52% - 40px)` 底部居中。
插槽 `left / center / right`。
| 路由 | 页面 | 卡片布局（实测自参考站） | 状态 |
| --- | --- | --- | --- |
| `/main/trend/overview` | 态势总览 | 切换 + 指标卡 + 4 榜 / 趋势 | ✅ 完成 |
| `/main/trend/fee` | 旅游消费 | 左：总金额·消费金额宫格·消费结构 ／ 中底：消费趋势 ／ 右：热门排行·分类消费排行 | ✅ 完成 |
| `/main/trend/city` | 国内旅游 | 左：接待游客量·出行特征·人群画像 ／ 中底：游客趋势 ／ 右：热门排行·游客来源地 | ✅ 完成 |
| `/main/trend/entry` | 入境旅游 | 左：入境游客分类·驻留时长·游客趋势 ／ 中底：入境游客月度趋势 ／ 右：热门排行·游客来源地 | ✅ 完成 |
| `/main/trend/scenic` | 景区游客 | 左：出行特征·人群画像·游客趋势 ／ 中底：景区接待趋势（日间/夜间堆叠） ／ 右：热门排行·游客来源地 | ✅ 完成 |
| `/main/trend/business` | 商圈游客 | 左：出行特征·人群画像·游客趋势 ／ 中底：客流时段分布 ／ 右：热门排行·游客来源地 | ✅ 完成 |
| `/main/trend/compare` | 对比分析 | 顶部参数区（区域·时间维度·日期区间·对比区域）＋ 选项卡（旅游消费/游客量/游客画像/出行方式/来源地）＋ 大表格 | ✅ 完成 |
| `/main/holiday/*`（4 页） | 假日客流 | 与 trend 对应页**复用同一代码块**（见下），故直接复用组件 | ✅ 完成 |
| `/main/sentiment/*`（5 页） | 舆情监测 | 分析·媒体 三栏等宽 `calc(33.33% - 6.67px)`；区域 40%+30%+30%；列表/预警 整页表格 | ✅ 完成 |
| `/main/industry/*`（4 页） | 产业洞察 | 概览 126px 四卡 + 两行四卡；图谱/分析/企业 用 `.HYAnalysis` 侧栏外壳 | ✅ 完成 |
| `/main/source/*`（5 页） | 资源图谱 | 左 270px 资源树 + 右侧图区；一张图含顶部参数条 + 地图 | ✅ 完成 |
| `/main/special/*`（2 页） | 特色业态 | 60px 筛选条（气泡 + 搜索）＋ 卡片墙，卡片 25%×280 | ✅ 完成 |

**全站 33 个页面路由均已实现，0 个占位。**

#### 假日模块与 trend 同构（routes.json 实测）

参考站「假日客流分析」的 4 个页面**直接复用 trend 的页面代码块**：

```
/main/holiday/overview → chunk-1b0fcab6（= trend/overview）
/main/holiday/fee      → chunk-181b8576（= trend/fee）
/main/holiday/city     → chunk-ab447fea（= trend/city）
/main/holiday/scenic   → chunk-696d552c（= trend/scenic）
```

因此本项目直接复用对应组件，版式天然一致。

#### 无权限模块的重建依据

舆情/产业/资源/特色四个模块本账号**无权限**，参考站看不到渲染页，
因此这些页面**完全依据反编译的 CSS 与模板结构重建**（不靠臆测），
每个文件头部都写明了取材的 css 文件与原始规则，例如：

```
_ref/css/chunk-1ee8bc2e.css  →  .sentiment-analysis-page .layout-wrapper { gap:30px }
                                .left/center/right-part-wrapper { width:calc(33.33333% - 6.66667px) }
_ref/css/chunk-4b8d6e07.css  →  .HYOverview .overview-wrapper { height:126px }
                                .data-card-wrapper { width:calc(50% - 8px) }
_ref/css/chunk-75bf026e.css  →  .theme-overview-outer-wrapper { padding:30px 0 20px 0 }
                                .system-card-wrapper { width:25%; height:280px; padding:20px }
```

这些模块的**数据**为松江区场景的合理示例（页面已显式标注「示例数据」），
因为平台无对应取数权限。

### 对比分析页（`/main/trend/compare`）实测结构

与其余页面**完全不同**，是三行式：

```
.trend-compare-outer-wrapper  1920×980
  .params-panel.bg-card   1880×30   区域 + 时间维度(日度/月度/季度/假日) + 日期区间 + 对比区域级联 + 重置按钮
  .tab-outer-wrapper      1880×40   选项卡，项 120×33
  .table-out-wrapper      1880×820  表格
```

表格列（实测）：`对比区域/主要指标 ｜ 消费总额(元) ｜ 餐饮(元) ｜ 住宿(元) ｜ 交通(元) ｜
旅游(元) ｜ 购物(元) ｜ 娱乐(元)`；
TAB（实测）：`旅游消费 / 游客量 / 游客画像 / 出行方式 / 来源地`；
排行维度为**上海市各区**（参考站实测如此）。

> 实测结论：`/fee`、`/city`、`/entry`、`/scenic`、`/business` **使用完全相同的骨架**
> （leftCards 458×323 ×3、rightCards 458×487 ×2、center 958×323），
> 仅卡片标题与内容不同 —— 因此全部复用 `MapPanelsLayout.vue`。
> 五个页面的卡片标题也都取自参考站实测，未自行发挥。

### 9. 地图：底图切换 + 街镇着色

`src/components/TiandituMap.vue`

**① 底图切换（文案与参考站一致）**

参考站用 Leaflet 的图层控件，选项为 `电子地图` / `影像图`（实测 `.leaflet-control-layers-list`
文本 `" 电子地图 影像图"`）。本项目对应关系：

| 按钮 | 天地图图层 |
| --- | --- |
| 电子地图 | `vec_w`（矢量底图）+ `cva_w`（矢量注记） |
| 影像图 | `img_w`（影像底图）+ `cia_w`（影像注记） |

实测切换后 `img_w` 瓦片请求 0 → 45，`vec_w` 停止增长，着色层与图例保持。

**② 街镇分色渲染（choropleth）**

参考站对**区县**做分色；本项目按要求下沉到**松江区下属街镇**。

- 边界数据：`public/geo/songjiang-towns.geojson`（松江区**现行 17 个街镇**，
  已处理为**无缝铺满全区**，见下）
- 着色值：`SJ_TOWN_CHOROPLETH`（`src/mock/rankData.js`），与排行表同源，
  保证地图配色与榜单一致；配色 低值深蓝 → 高值金色
- **名称标注**：每个街镇多边形内点处显示名称（HTML Marker）
- 交互：悬浮高亮 + 显示街镇名与数值；图例标注数值范围
- **只有一层面**：不需要兜底图层或补丁图层（见下）

**边界数据的来源与两轮修复（重要，含一次失败的尝试）**

公开渠道（DataV / AreaCity / GitHub 各仓库）**只提供较早版本的松江区街镇边界**：
16 个要素，**缺 `广富林街道`、`九里亭街道`**（后设立），多一个已不属现行区划的
`松江工业区`。

1. **第一轮：切分**（`_probe/split-towns.mjs`）—— 把母体街镇水平切开补出两个新街道：

   | 母体（旧） | 切分纬度 | 结果 |
   | --- | --- | --- |
   | 方松街道 | y = 31.048 | 北半部 → **广富林街道**（49.4%），南半部保留方松街道 |
   | 九亭镇 | y = 31.125 | 南半部 → **九里亭街道**（44.2%），北半部保留九亭镇 |

2. **第二轮：补空缺（走过的弯路，供参考）**—— 街镇边界与松江区界**不是同一套**，
   栅格法实测**约 10.7% 区域无覆盖**（集中在小昆山镇西/南、石湖荡镇北、方松街道西、
   新桥镇东/南、车墩镇一带），渲染出空白。依次尝试过：

   | 方案 | 结果 |
   | --- | --- |
   | 追加「区界兜底要素」铺一层不同颜色的底 | 出现**两层颜色**的观感 |
   | 栅格补丁按「行内合并成条带」 | 条带边界形成**平行横线** |
   | 栅格补丁**逐格矩形** | 透明叠加下形成**网格纹** |
   | ✅ **shapely 几何运算** | 单层、无缝、无条纹 |

   最终方案 `_probe/rebuild-towns-shapely.py`：用 `shapely` 计算
   `松江区界 − 街镇并集 = 未归属区域`，把未归属区域切块后按**到最近街镇多边形的
   距离**逐块归属，再与街镇多边形合并、裁剪到区界。
   结果：**覆盖率 100.00%**（面积合计 = 区界面积），每街镇一个干净多边形，
   因此组件里只保留一层 `fill`，彻底消除叠层与条纹。

> 说明：切分线为**近似值**（按广富林文化遗址、九里亭街道的实际方位确定），
> 与官方界线存在偏差；未归属区域的最近归属同样为近似。
> 仅用于可视化着色，精确界线需官方矢量数据。
>
> 另：`sj-portal.com:9980` 是**栅格瓦片底图服务**（`/tile/{z}/{x}/{y}.png`），
> 含街镇名称标注与路网，但**没有边界矢量数据**，无法用于补边界；
> 其标注位置与本项目的划分基本吻合，可作为切分合理性的旁证。

**③ 街镇边界的几何清理（消除地图上的「多余竖线」）**

`_probe/clean-towns-geometry.py`

前一版用栅格逐格回填街镇空隙，在图上留下三类脏数据（由用户实测反馈定位）：

| 问题 | 具体表现 | 影响街镇 |
| --- | --- | --- |
| **零面积内环（洞）** | area = 0 或 ~1e-13，渲染成莫名其妙的闭合线 | 方松(17) / 泗泾(6) / 石湖荡(3) / 叶榭、新浜、小昆山(各1)，共 29 个 |
| **与主体分离的细长碎片** | 显示为一根根**竖线** | 方松 7.89%+3.12%、**永丰 0.73%（细长比 8.5:1）**、**石湖荡 0.05%** |
| **0.0008 度的轴对齐阶梯边** | `GAP_CELL = 0.0008` 的栅格步长在相邻街镇边界上形成直角阶梯 | 佘山 129V/52H、小昆山 69V/45H、石湖荡 54V/18H、永丰 53V/29H …共 628V/396H |

处理流程（最终版）：

```
A. 填掉面积 <= 1e-9 的洞
B. 只保留最大部件，其余碎片并给共边最长的相邻街镇（转移而非删除，不留空洞）
C. 亚像素抽稀 simplify(1.2e-4)，仅合并共线点
D. 裁剪到区界
E. 连通块整体回填（关键，见下）
F. 收敛循环：回填 → 消重叠 → 裁剪 → 剥离游离块
G. 兜底清微洞
H. 输出前坐标压到 6 位小数（约 0.11m），JSON 体积减约 40%
```

**关键决策一：绝不使用栅格回填**

试过把回填网格细化到 `0.00015°`（约 0.4px），结果多个相邻且同属一镇的小格被
`unary_union` 合并成**长直边** —— 实测 `永丰街道` 出现一条 `0.0144°`（约 39px）
的竖直尺子线，比原来的阶梯更刺眼。

最终改为**连通块整体归属**：把 `区界 − 街镇并集` 的每个连通块，整块并入共边最长的
相邻街镇。空隙块的轮廓本身由「原始街镇边界 + 松江区界」围成，不引入任何新的轴对齐边。

**关键决策二：输入必须用干净数据**

`simplify(5e-4)` 虽能抹平阶梯，但也会把**缓弯压成尺子直线**（实测又给
`永丰街道` 造出一条 0.0144° 竖线）。最终改为从切分后、未经栅格回填的
`_probe/towns-original-17.geojson` 重新构建（该文件实测 **0V/4H** 轴对齐边、0 洞），
只做亚像素抽稀，不做大容差简化。

**结果**

| 指标 | 清理前 | 清理后 |
| --- | --- | --- |
| 轴对齐边（≥0.0003°） | 628V / 396H | **12V / 13H** |
| 零面积洞 | 29 | **0** |
| 多部件街镇 | 6 个 | **0**（全部纯 Polygon） |
| 与区界面积差 | 0.11% | **0.0000%** |
| 文件大小 | 238 KB | **64 KB** |
| 长直边（≥0.0015°） | — | 10 条，其中 4 条是**切分方松/九亭时的近似直线**（已如实标注） |

> 验收时最后一处「锯齿」位于 `(121.162, 31.017)`，但该点 **0.008° 范围内没有任何
> 多边形顶点** —— 说明它来自**天地图底图自带的行政界线**（栅格瓦片，放大后显块状），
> 不是本项目数据。对照验证：隐藏 `towns-fill` / `towns-line` 两层后底图上该线仍在。

> ⚠️ 又一次踩到编码坑：本轮用 PowerShell 的 `Set-Content -Encoding UTF8` 改这个
> Python 文件，中文全变成 mojibake（`Get-Content -Raw` 按 ANSI 读 UTF-8）。已重写。
> **批量改文本一律用 Node 显式 utf8 或编辑器写入工具。**

**④ 两个实现坑**

1. **symbol 层标不出文字**：maplibre 的 `symbol` 图层需要 `style.glyphs` 字体端点，
   而本组件的 style 是纯栅格底图（只有 raster source），没有 glyphs 配置 → 文字不渲染。
   改用 **HTML Marker**（`maplibregl.Marker` + 自定义 DOM）即可，无需字体服务。
2. **变量作用域**：边界 GeoJSON 若在 `if (!map.getSource(...))` 块内 `const` 声明，
   块外构建标注时会 `ReferenceError: geojson is not defined`
   （表现为「面层正常但标注全无」）。已提升为模块级缓存 `townsGeoJSON`。
3. **调试钩子**：组件里挂了 `window.__tdtMap = map`，方便在控制台 / CDP 里
   `map.setLayoutProperty('towns-line','visibility','none')` 之类地排查图层。

### 10. 天地图接入的两个关键坑（均已修复）
1. **瓦片 URL 不能用 WMTS 花括号参数**：`.../vec_w/wmts?...&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}`
   会让 maplibre 模板解析失败、**一个瓦片都不请求**。必须用标准 XYZ 形式：
   `https://t{s}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=<key>`
   （注记层 `cva_w` / 影像层 `img_w` + `cia_w` 同理）。
2. **maplibre-gl v6 的 worker 是独立入口**，需 `import MapWorker from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'`
   并 `maplibregl.setWorkerUrl(MapWorker)`，否则报 `Worker failed to load`。

### 11. 资源与动效对齐（从参考站产物提取）

**① 位图资源：从 17 张补齐到 65 张**

参考站 webpack 产物里引用了 **65 张图片**，最初只复制了 17 张（背景/标题/图标），
缺的 48 张里包括 `food / live / entertainment / entry-icon / company-icon /
le1-le4 / nanxing / nvxing / china / nanhai / dizuo / pie-center / up / focus` 等
**图标类资源**——这正是「看着有差别」的主因。

提取方式（`_probe/scan-images.mjs` + `_probe/download-images.mjs`）：
1. 扫描 `_ref/js/*.js` 与 `_ref/css/*.css`，正则提取 `名字.8位哈希.扩展名`
2. 与 `public/img/` 已有文件比对，得到缺失清单
3. 从 `http://192.170.13.107:8088/quanguolvyou/img/<哈希名>` 逐张下载

结果：`public/img` 与 `dist/img` 均为 **65 个文件**，代码引用全部命中。

**② 动效：参考站共 13 个 keyframes，实际使用的只有 3 处**

扫描 `_probe/scan-animations.mjs` / `scan-anim2.mjs` 得到的结论——参考站
**没有** GIF / Lottie / WebGL 动画，动效都以 CSS + Vue 计时器实现：

| 动效 | 参考站实现 | 本项目 |
| --- | --- | --- |
| **饼图旋转装饰环** | `.e-pie img{width:238px;height:238px;top:calc(50% - 119px);left:calc(50% - 119px);animation:rotate2 10s linear infinite}`，图为 `pie-center.42045c25.png` | 已实现（`TabChartCard` 的 `spinDeco` 与 `/entry` 驻留时长卡） |
| **行内进度条** | `.el-table tr:after{content:"";width:var(--process);transition:width .3s ease;background:var(--color);height:5px;border-radius:2px;left:10px}` | 已实现（`TableList` 的 `.table-list__progress`，进度按占首行比例，前三名用金/青/绿） |
| 菜单滑动 | `.sys-menu-track{transition:transform .25s ease}` | 已有 |
| 图例折叠 | `.legend-fold{transition:grid-template-rows .28s ease}` + 箭头 `.28s` 旋转 | 已有 |
| 表格行高亮 | `tr` 背景过渡 | 已有（`.table-list__row:hover`） |
| 天气预警跑马灯 | `WarnList` 组件：`displayList = list.concat(list)` + `translate3d` + `.45s ease-in-out` | **未用**（无天气模块，见下方勘误） |
| 3D 饼图 | `.e-3dpiechart` 用 `rotateX(60deg)` + 旋转 | 未用（项目无 3D 饼图场景） |

> ⚠️ **勘误（曾据此做出错误实现）**：我最初把 `WarnList` 的跑马灯机制当成了**排行榜**
> 的行为，给 `TableList` 默认开启了自动滚动，导致总览页「热门入境城市 / 热门景区」
> 等榜单一直快速滚动。
>
> 用 CDP 对参考站连续 5 次采样后澄清：**参考站排行榜完全不滚动** ——
> 首行始终 `top:533`、`transform: none`、`scrollTop: 0`；容器只是普通的
> `.el-table__body-wrapper{overflow:hidden auto}`，即可手动滚动。
> 页面里唯一在动的 track 是 `.sys-menu-track`（顶部菜单）。
>
> 已把 `TableList.autoScroll` 改为**默认 `false`**，并恢复 `.table-list__body` 的
> `overflow: hidden auto`（可手动滚）。跑马灯代码保留但不再默认启用。

> 两个实现要点：
> 1. 饼图装饰环必须放在**图表容器内并 `pointer-events:none`**，否则会挡住 ECharts 的悬浮交互。
> 2. 自动滚动的复位必须**临时关闭 transition**，否则会看到「倒着滚回去」。
>    同时在 `onBeforeUnmount` 清掉两个定时器，避免路由切换后残留。
> 3. 已加 `@media (prefers-reduced-motion: reduce)` 关闭旋转，尊重系统设置。

**③ 关键：`行内进度条` 与 `自动滚动` 不要同时依赖 `overflow-y:auto`**

改成跑马灯后 `.table-list__body` 的 `overflow-y` 从 `auto` 改为 `hidden`，
避免出现两条滚动条；行数 ≤ 4 时自动不滚动（`canScroll()` 判定）。

### 12. 地图层必须内缩（「卡片没了」的根因）

现象：切到任意地图模块，左上角指标卡看起来**消失了**，背后直接是地图。

根因是我把地图写成了**铺满全屏**：

| | 定位 | 实际盒子（1920×980 内） |
| --- | --- | --- |
| 参考站 `.map-wrapper` | `position:absolute; inset: 0px 480px 340px; z-index:200` | `[540, 61, 840, 586]` |
| 本项目（错误） | `.map-layer { inset: 0 }` | `[77, 74, 1742, 888]` |

参考站的地图**左右各让出 480px、底部让出 340px**，只占中间一块。
而参考站的指标卡是 `background: transparent`（只有 `tar-bj` 位图边框 + 发光环），
它的**可读性完全依赖背后是页面背景**。地图一铺满，卡片背后就变成地图 ——
看起来就像卡片不见了。

修复（`MapPanelsLayout.vue`）：分两层

```css
/* 外层铺满并加不透明页面底色 → 浮层区域呈现页面背景，与参考站观感一致 */
.map-layer   { position: absolute; inset: 0; z-index: 1; background: var(--sj-bg-deep, #041426); }
/* 内层才是真正的地图，按参考站实测内缩 */
.map-wrapper { position: absolute; inset: 0 25% 34.7%; z-index: 200; }
```

> `inset: 0 25% 34.7%` 等价于参考站的 `0 480px 340px`（480/1920 = 25%，340/980 = 34.7%）。
> 修复后实测地图盒子 `[513, 74, 870, 579]`，与参考站 `[540, 61, 840, 586]` 基本一致。

### 13. 指标卡：抽成 `IndexCard` 组件

左上角「XXX(累计)」卡片原先在 **5 个 trend 页面各写了一遍**。实测参考站
`chunk-181b8576.css` 后统一为 `src/components/IndexCard.vue`
（props：`title / value / unit / tb`），修正了三处不一致：

| 项 | 参考站实际（已修正） | 先前错误做法 |
| --- | --- | --- |
| 卡片底色 | `background: transparent`，**无边框** | 自加 CSS 渐变 + 1px 蓝边 |
| 视觉边框 | 位图 `<img class="bg-img-wrapper" src="tar-bj.4b07ffe7.png">`，242×146，`left:calc(50% - 121px); bottom:10px; z-index:-1` | 无 |
| 同比底条 | `.ratio-wrapper` 自带 **base64 装饰底图**（`background-size:100% 100%`） | 无 |
| 数字字体 | `cityDigital` 70px `#f9bb00` | `--sj-gold` |
| 同比结构 | `.center-top-compare-data-icon-wrapper` + label(20px `#e4f3ff`) + 值(20px `#09d3b9`) + 箭头 | 简化成 span |

> ⚠️ `.bg-img-wrapper` 用 `z-index:-1` 退到卡片内容之后。若父级 `.index-info-wrapper`
> **未建立堆叠上下文**，负 z-index 会逃出卡片。修复：父级加
> `position: relative; z-index: 0`。
> 排查手法：`document.elementFromPoint(x, y)` 在卡片区域内多点取样，看命中的元素链。

### 14. 景区指标的地图着色

`SJ_TOWN_CHOROPLETH.scenic` 原先直接用**景区排行榜**（9 个实测景区）按街镇聚合，
而 9 个景区只落在 **5 个街镇** → **其余 12 个街镇在 `match` 表达式里落到默认透明**，
地图出现大片空洞。修正分两步：

1. **数据源换掉**：改用 `scenicSpots` 的**全部 41 个点位**（覆盖 14 个街镇）
2. **归一化锚点换成区级真实总量**：统计公报「16 家 A 级景区接待 1496.77 万人次」，
   而 `scenicSpots` 里 A 级点位恰好 **16 个**（4A×10 + 3A×6），口径完全吻合 ——
   于是 `单位权重接待量 = 14967700 ÷ 12.52 ≈ 119.55 万`，各街镇按点位等级权重求和

结果：17 个街镇**全部有色**（无景区的 3 个镇取极小值），佘山镇 791.42 万最高。

> 先前那版算法有个更隐蔽的错误：用**各镇自己的实测值**反推「单位权重接待量」，
> 锚点彼此不一致，算出佘山镇 1918 万（≈ 全区总量的 1.3 倍），明显荒谬。
> 教训：**归一化基准必须来自区级口径**，不能逐镇自洽。

### 15. 长尾指标的配色：加伽马校正

景区指标呈「一镇独大」长尾（佘山 791 万是次高值 325 万的 2.4 倍），线性映射会把
其余 16 个街镇全部压进色带最左端，肉眼难以区分。

`TiandituMap.colorAt()` 加了指数 `0.62` 的伽马校正抬高低值段。
**只影响配色分布**，图例显示与悬浮提示仍是真实数值。

### 16. 调试工具（本项目自带，可复用）

| 工具 | 用途 |
| --- | --- |
| `_probe/all-pages.mjs` | **全站巡检**：逐个路由打开，检查根高、卡片数、canvas 数、控制台报错 |
| `_probe/probe-tab.mjs` | 连**已存在**的 Chrome 标签页测量（可带登录态量参考站，关键工具） |
| `_probe/ref-measure.mjs` | 实测参考站任意路由的版式（自动换算 1920 设计单位） |
| `_probe/measure-mine.mjs` | 量本地页面的几何（含缩放比） |
| `_probe/measure-overview.mjs` / `find-overflow.mjs` | 量总览页内部结构 / 找出越界元素及超出像素 |
| `_probe/box-model.mjs` / `dom-children.mjs` | 查单个组件的完整盒子模型 / 枚举容器子元素类名 |
| `_probe/check-scale.mjs` | 校验 1920×1080 缩放适配是否生效 |
| `_probe/page-layout.mjs` | 从反编译 CSS 提取某页的**页面级布局规则**（重建无权限页面用） |
| `_probe/chunk-info.mjs` | 列某 chunk 的 dataId、图片、根类名 |
| `_probe/login-helper.mjs` | 平台登录（过验证码，`new` 取图 / `try` 提交） |
| `_probe/fetch-*.mjs` | 各类真实数据抓取（见 `_probe/real-*.json` 结果） |

> ⚠️ 教训：`Runtime.evaluate` 里用模板字符串拼递归函数容易因转义出错而产生**假阴性**
> （曾误判页面空白）。巡检请优先用 `all-pages.mjs` + `dom-children.mjs` 这类
> 直接统计 `querySelectorAll` 数量的写法。
>
> ⚠️ **更严重的教训：不要用 PowerShell 改源码文件。**
> `Get-Content -Raw` + `[IO.File]::WriteAllText` 会把 UTF-8 中文写成 mojibake，
> 且由于 UTF-8 解码器会用 U+FFFD 替换非法字节，**该损坏不可逆**
> （曾一次性写坏 `Fee/City/Entry/Scenic/Business` 5 个文件、618 个字符，
> 只能逐文件人工重建）。批量改文件请用 Node + `readFileSync/writeFileSync` 并显式指定 `'utf8'`。

### 17. 交付验证结果（最近一次全站巡检）

```
node _probe/all-pages.mjs        →  通过 27 / 27
生产构建 vite build              →  ✓ built，0 报错
占位路由                          →  0 个
```

每个页面根元素高度均为 **1010**，与参考站 `#mainContent > *` 实测值一致。

| 脚本 | 用途 |
| --- | --- |
| `_probe/ref-probe.mjs` | 接管参考站标签页，读结构/样式/几何（自动换算设计单位） |
| `_probe/ref.mjs` | 读 DOM / 计算样式 / 几何 / 截图 |
| `_probe/ref-login.mjs` | 注入 token 到参考站 localStorage |
| `_probe/cdp.mjs` | 启动独立无头 Chrome，调试**本项目**页面（控制台+探针+截图） |
| `_probe/fetch-all.mjs` | 用真实接口拉取松江区业务数据 |
| `_probe/login-helper.mjs` | 取验证码 / 尝试验证码登录 |

---

## 一·补充三、子页面真实结构与共享控制栏

> **重要：参考站的子页面不是「滚动卡片」，而是「地图打底 + 三栏浮层」。**
> 以下是 CDP 实测的真实结构，本项目需按此重做各子页面。

### 旅游消费页（`/main/trend/fee`）实测结构

```
.main-outer                            地图铺满 1920×980
  .layout-wrapper            1920×980
    .left-part-wrapper        458×980   3 张卡各 458×323，gap 5px
      .each-card-wrapper      458×323   → .index-info-wrapper（总金额大数字卡）
      .chart-card-content     458×323   → 「消费金额」2×3 宫格（餐饮/住宿/交通/旅游/购物/娱乐）
      .chart-card-content     458×323   → 「消费结构」雷达图
    .right-part-wrapper       458×980   2 张卡各 458×487
      .chart-card-content     458×487   → 「热门排行」（下拉：消费金额(元)）
      .chart-card-content     458×487   → 「分类消费排行」（下拉：餐饮/住宿/…）
    .center-part-wrapper      958×323   底部居中（左 480，高 323）
      .chart-card-content     958×323   → 「消费趋势」柱+线组合，切换 总体/吃/住/行/游/购/娱
    （中间 960 宽为地图区域）
```

**地图**：上海市区级色块图（各区按消费额着色，底部高→低图例），
左下角标注 `数据来源：手机信令大数据`；地图来源为高德（本项目改天地图）。

**指标卡（`.index-info-wrapper`）规格**：
`.main-inner-wrapper` 90%×230；`.center-top-title-wrapper` font-size 24px +
`img/target-bj.037c19c3.png` 底图（line-height 44）；
`.center-top-data-wrapper` font-size **70px** 色 `#f9bb00` 字体 `cityDigital`；
`.center-top-unit-wrapper` font-size 16px 色 `#e4f3ff`；
`.ratio-wrapper` 高 40（底图为内嵌 base64 渐变）。

### 排行表实测（`TableList`）

| 列 | 宽度 | 示例 |
| --- | --- | --- |
| 排名 | 48 | `1` + 升降序三角图标（升红降绿） |
| 区域 / 景区 | 122 | `浦东新区` |
| 累计消费 / 累计客流 | 69~80 | `1909.48万` |
| 同比 | 69 | `16.06%`（正红负绿） |

表头 `th`：padding 12px 0，font-size 14px，font-weight 700。
**注意参考站排行维度是「上海市各区」，不是街镇**——数据平台区域维度只到区县。

### 通用控件

各子页面顶部为 **区域下拉 + 时间维度 + 日期区间** 三段式
（取自 `chunk-181b8576` 旅游消费 / `chunk-ab447fea` 国内旅游 / `chunk-696d552c` 景区旅游）：

| 控件 | 参考站规格 | 本项目 |
| --- | --- | --- |
| `.picker-control` | `height:32px; padding:0 10px; border:1px solid #088afb; border-radius:2px` | `src/components/PageControlBar.vue` 同规格 |
| 时间维度 | `日度 / 月度 / 季度 / 假日` | 同选项、同底色 `rgba(17,34,102,.88)` |
| 监测维度 | `.params-panel { display:flex; gap:10px }` | 同规格 |

### 对应 CSS（保留实测表达式，便于核对）

```css
.main-outer            { position:relative; width:100%; height:100% }   /* 地图铺满 */
.layout-wrapper        { position:absolute; inset:0; z-index:1100;
                         display:flex; justify-content:space-between;
                         pointer-events:none; padding:0 5px }
  .left-part-wrapper   { width:24%;  height:100%; flex-column; gap:5px }
  .center-part-wrapper { width:calc(52% - 40px); height:calc(35% - 20px);
                         position:absolute; bottom:0; left:calc(24% + 20px) }
  .right-part-wrapper  { width:24%;  height:100%; flex-column; gap:5px }
  .each-card-wrapper   { width:100%; height:33% }
```

---

## 一·补充四、浏览器调试工具（本项目自带）

`_probe/cdp.mjs` 是一个零依赖的 CDP 客户端：启动无头 Chrome → 打开指定 URL →
**收集控制台日志/异常** → 探针关键 DOM 节点 → 截图。

```bash
node _probe/cdp.mjs "http://127.0.0.1:5180/#/main/trend/city"
```

输出 `_shots/cdp.png` 与控制台日志，用于在改动后快速验证「有没有渲染、有没有报错」。
（本项目的多个问题就是这样定位的，例如 `maplibre-gl` 缺少 default 导出导致整页空白。）

各子页面顶部并非「一个下拉」，而是 **日期区间 + 时间维度 + 监测维度** 三段式
（取自 `chunk-181b8576` 旅游消费 / `chunk-ab447fea` 国内旅游 / `chunk-696d552c` 景区旅游）：

| 控件 | 参考站规格 | 本项目 |
| --- | --- | --- |
| `.picker-control` | `height:32px; padding:0 10px; border:1px solid #088afb; border-radius:2px` | `src/components/PageControlBar.vue` 同规格 |
| 时间维度 | `全部 / 日度 / 月度 / 季度 / 假日`（`.select-wrapper`，`background:rgba(17,34,102,.88)`） | 同选项、同底色 |
| 监测维度 | `.params-panel { display:flex; gap:10px }`，如「游客监测/消费监测」「景区范围」 | 同规格 |

---

## 二、数据来源（松江区真实数据）

区级核心指标全部来自官方来源，`src/mock/songjiang.js` 内逐条标注出处：

| 指标 | 数值 | 来源 |
| --- | --- | --- |
| 旅游收入 | 157.56 亿元（+5.0%） | 2025 年松江区统计公报 |
| 接待游客 | 2207 万人次（+11.4%） | 同上 |
| 16 家 A 级景区接待 | 1496.77 万人次 | 同上 |
| A 级景区 | 4A 级 10 家 + 3A 级 6 家 | 同上（名录见下） |
| 星级旅游饭店 | 2 家（五星 1、四星 1，660 间房） | 同上 |
| 社会消费品零售总额 | 854.67 亿元（+11.8%） | 同上 |
| 住宿餐饮业增加值 | 28.45 亿元 | 同上 |
| 地区生产总值 | 2375.42 亿元（+5.2%） | 同上 |
| 常住人口 | 196.18 万人 | 同上 |

- 4A 级（10 家）：佘山国家森林公园、上海辰山植物园、上海欢乐谷、月湖雕塑公园、广富林文化遗址、
  方塔园、醉白池公园、上海影视乐园、蓝精灵主题乐园、云堡未来市
- 3A 级（6 家）：浦江之首、云间粮仓文创园、泗泾古镇、佘山精灵之城主题乐园、
  上海广富林奇石馆、江南水稻艺术观光园
- 17 个街镇名单：松江区政府《关于公布松江区 17 个街镇履行职责事项清单的公告》
- 分街镇常住人口：松江年鉴 2019（2018-12-31 官方口径）
- 重点假日接待数据：松江区政府官网 / 上海市政府官网公开报道

**需要说明的口径**：

- **街镇级、景区级的客流与消费明细为测算分布值**（按各街镇文旅资源体量分配），
  其**合计与公报全区值严格一致**（消费 157.56 亿元 / 游客 2207 万人次 / 入境 331.05 万人次 /
  景区 1496.77 万人次），可据此校验。实际明细口径需以松江区文旅局统计为准。
- 松江区统计公报**未单列入境游客指标**，入境游客 331.05 万人次为按接待游客量测算的演示值。
- 数据来源 URL 全部记录在 `src/mock/songjiang.js` 顶部注释中。

---

## 三、运行

```bash
npm install          # 首次（受限环境下可加 --ignore-scripts）
npm run dev          # 开发： http://127.0.0.1:5180
npm run build        # 生产构建： dist/
npm run preview      # 预览构建产物
```

> **Windows 受限环境提示**：若 `vite build` 报 `esbuild ... Access is denied`，
> 把临时目录指到工作区内再构建：
>
> ```powershell
> $env:TEMP='D:\fe-liantong\wenlv2\.tmp'; $env:TMP=$env:TEMP; npm run build
> ```

部署：构建产物使用相对路径（`base: './'`），可直接放到任意子目录（如 `/songjiang/`）。
运行时配置在 `public/config/appContext.js`，**改后端地址不需要重新打包**。

## 四、接入真实后端

1. 打开 `public/config/appContext.js`，把 `dataMode` 改为 `'api'`，并填写 `baseUrl`。
2. 接口路径定义在 `src/api/trend.js`（`/travel/statistics`、`/travel/rank/hot`、
   `/travel/rank/break`、`/travel/trend` 等），按后端实际路径调整即可。
3. `src/utils/request.js` 已按参考站鉴权约定实现（`Authorization: Bearer <token>` +
   `smart_token_jwt` 请求头），并兼容 `{ code, data, msg }` 响应结构。
4. Mock 分支位于 `src/mock/`，切换后不再参与运行。

## 五、目录结构

```
src/
  api/trend.js            接口定义层（mock / api 双模式）
  components/             ChartCard 图表卡、TableList 排行表、TrendChart 趋势卡、
                          BaseChart ECharts 封装、AreaSelect 区域选择
  config/                 menu.js 模块菜单、overview.js 总览页配置、pages.js 子页骨架配置
  mock/                   songjiang.js 松江数据字典、overview.js 数据生成、index.js 路由表
  router/index.js         路由（6 大模块，hash 路由，与参考站同构）
  styles/global.css       深色主题与全局样式
  utils/                  screen.js 1920×1080 缩放、chart.js 图表配置、format.js 数值格式化、request.js 请求封装
  views/trend/Overview.vue        态势总览（完整实现）
  views/common/ModuleSkeleton.vue 其余子页面统一骨架
```
