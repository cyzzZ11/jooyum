import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * 路由结构 1:1 对齐参考站（全国文旅态势感知与智能决策平台）。
 *
 * 参考站层级：App shell（chunk-223c1674）
 *   → 模块容器 Vistors（chunk-b753df26，含 top-bj 遮罩与地图层）
 *   → 子页面（chunk-1b0fcab6 等）
 *
 * 参考站子路由的 useMap 元信息决定是否显示模块级地图（逐条实测，见 _probe/usemap.mjs）：
 *   /main/trend/overview   useMap: false → 地图关闭，页面铺满
 *   /main/trend/fee|city|entry|scenic|business  useMap: true → 地图打开
 *   /main/trend/compare    useMap: false
 *   /main/trend/real       参考站该路由不在本账号权限内，本项目不提供
 * 本文件沿用同一套元信息（route.meta.useMap），未显式声明时取模块默认值
 * defaultMap（对齐参考站各模块 landing 页是否含地图的实际表现）。
 */

const Placeholder = () => import('@/views/common/ModuleSkeleton.vue')
const Module = () => import('@/views/common/ModuleLayout.vue')
const Overview = () => import('@/views/trend/Overview.vue')
const Fee = () => import('@/views/trend/Fee.vue')
const City = () => import('@/views/trend/City.vue')
const Entry = () => import('@/views/trend/Entry.vue')
const Scenic = () => import('@/views/trend/Scenic.vue')
const Business = () => import('@/views/trend/Business.vue')
const Compare = () => import('@/views/trend/Compare.vue')
// 其余模块（依据反编译 CSS/模板重建，本项目账号无参考站权限）
const SentimentAnalysis = () => import('@/views/sentiment/Analysis.vue')
const SentimentMedia = () => import('@/views/sentiment/Media.vue')
const SentimentArea = () => import('@/views/sentiment/Area.vue')
const SentimentList = () => import('@/views/sentiment/List.vue')
const SentimentCenter = () => import('@/views/sentiment/Center.vue')
const IndustryOverview = () => import('@/views/industry/Overview.vue')
const IndustryMap = () => import('@/views/industry/IndustryMap.vue')
const IndustryAnalysis = () => import('@/views/industry/Analysis.vue')
const IndustryCompany = () => import('@/views/industry/Company.vue')
const SourceTree = () => import('@/views/source/Tree.vue')
const SourcePoiMap = () => import('@/views/source/PoiMap.vue')
const SourceAnalysis = () => import('@/views/source/Analysis.vue')
const SourceCompare = () => import('@/views/source/Compare.vue')
const SourceMap = () => import('@/views/source/SourceMap.vue')
const ThemeOverview = () => import('@/views/special/ThemeOverview.vue')
const SpecialNight = () => import('@/views/special/Night.vue')

const routes = [
  { path: '/', redirect: '/main/trend/overview' },

  // ===== 1. 文旅态势感知（参考站 /main/trend） =====
  {
    path: '/main/trend',
    component: Module,
    redirect: '/main/trend/overview',
    meta: { defaultMap: false },
    children: [
      // useMap 逐条对齐参考站路由 meta（见 _probe/usemap.mjs 输出）
      { path: 'overview', name: 'trendOverview', component: Overview, meta: { useMap: false } },
      // Fee 页自带地图层（与参考站 .main-outer 一致），故不再走模块级地图
      { path: 'fee', name: 'trendFee', component: Fee, meta: { useMap: false } },
      { path: 'city', name: 'trendCity', component: City, meta: { useMap: false } },
      { path: 'entry', name: 'trendEntry', component: Entry, meta: { useMap: false } },
      { path: 'scenic', name: 'trendScenic', component: Scenic, meta: { useMap: false } },
      // 商圈游客：与 /scenic 同一版式
      { path: 'business', name: 'trendBusiness', component: Business, meta: { useMap: false } },
      { path: 'compare', name: 'trendCompare', component: Compare, meta: { useMap: false } }
    ]
  },

  // ===== 2. 文旅舆情监测（参考站 /main/sentiment） =====
  {
    path: '/main/sentiment',
    component: Module,
    redirect: '/main/sentiment/analysis',
    meta: { defaultMap: false },
    children: [
      { path: 'analysis', name: 'sentimentAnalysis', component: SentimentAnalysis, meta: { useMap: false } },
      { path: 'media', name: 'sentimentMedia', component: SentimentMedia, meta: { useMap: false } },
      { path: 'area', name: 'sentimentArea', component: SentimentArea, meta: { useMap: false } },
      { path: 'list', name: 'sentimentList', component: SentimentList, meta: { useMap: false } },
      { path: 'center', name: 'sentimentCenter', component: SentimentCenter, meta: { useMap: false } }
    ]
  },

  // ===== 3. 文旅产业洞察（参考站 /main/industry） =====
  {
    path: '/main/industry',
    component: Module,
    redirect: '/main/industry/overview',
    meta: { defaultMap: false },
    children: [
      { path: 'overview', name: 'industryOverview', component: IndustryOverview, meta: { useMap: false } },
      { path: 'map', name: 'industryMap', component: IndustryMap, meta: { useMap: false } },
      { path: 'analysis', name: 'industryAnalysis', component: IndustryAnalysis, meta: { useMap: false } },
      { path: 'company', name: 'industryCompany', component: IndustryCompany, meta: { useMap: false } }
    ]
  },

  // ===== 4. 文旅资源图谱（参考站 /main/source） =====
  {
    path: '/main/source',
    component: Module,
    redirect: '/main/source/tree',
    // 参考站 /main/source/poimap（资源一张图）为主视图，模块默认带地图
    meta: { defaultMap: true },
    children: [
      { path: 'tree', name: 'sourceTree', component: SourceTree, meta: { useMap: false } },
      { path: 'map', name: 'sourceMap', component: SourcePoiMap, meta: { useMap: false } },
      { path: 'analysis', name: 'sourceAnalysis', component: SourceAnalysis, meta: { useMap: false } },
      // 参考站另有 /main/source/compare 与 /main/source/poimap（同一张图的两种入口）
      { path: 'compare', name: 'sourceCompare', component: SourceCompare, meta: { useMap: false } },
      { path: 'poimap', name: 'sourcePoiMap', component: SourceMap, meta: { useMap: false } }
    ]
  },

  // ===== 5. 假日客流分析（参考站 /main/holiday，与 /main/trend 共用页面组件） =====
  {
    path: '/main/holiday',
    component: Module,
    redirect: '/main/holiday/overview',
    meta: { defaultMap: false },
    children: [
      // 假日客流模块的 4 个页面在参考站**复用与 trend 相同的代码块**
      // （routes.json：overview→chunk-1b0fcab6、fee→181b8576、city→ab447fea、scenic→696d552c），
      // 即版式同构，故直接复用已按实测重建的组件。
      { path: 'overview', name: 'holidayOverview', component: Overview, meta: { useMap: false } },
      { path: 'city', name: 'holidayCity', component: City, meta: { useMap: false } },
      { path: 'scenic', name: 'holidayScenic', component: Scenic, meta: { useMap: false } },
      { path: 'fee', name: 'holidayFee', component: Fee, meta: { useMap: false } }
    ]
  },

  // ===== 6. 特色业态专题（对应参考站 /main/special，冰雪专题替换为本地特色业态） =====
  {
    path: '/main/special',
    component: Module,
    redirect: '/main/special/theme',
    meta: { defaultMap: false },
    children: [
      { path: 'theme', name: 'specialTheme', component: ThemeOverview, meta: { useMap: false } },
      { path: 'night', name: 'specialNight', component: SpecialNight, meta: { useMap: false } }
    ]
  },

  { path: '/:pathMatch(.*)*', redirect: '/main/trend/overview' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

export default router
