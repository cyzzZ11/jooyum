import { createRouter, createWebHistory } from 'vue-router'

const SITE_NAME = '科技服务平台'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '科技服务平台 | 创新创业 · 产学研赋能', description: '科技服务平台 - 聚焦创新创业、产学研赋能' },
  },
  {
    path: '/company-index',
    name: 'company-index',
    component: () => import('@/views/CompanyIndexView.vue'),
    meta: { title: '公司介绍' },
  },
  {
    path: '/cxybm',
    name: 'cxybm',
    component: () => import('@/views/CxybmView.vue'),
    meta: { title: '产学研合作计划 · 报名通道' },
  },
  {
    path: '/gaochuangyuan',
    name: 'gaochuangyuan',
    component: () => import('@/views/GaochuangyuanView.vue'),
    meta: { title: '上海松江高创源科技服务有限公司 - 松江大学城科创源运营主体' },
  },
  {
    path: '/platform-index',
    name: 'platform-index',
    component: () => import('@/views/PlatformIndexView.vue'),
    meta: { title: '高能级科创平台 · 长三角G60科创走廊策源地（松江）' },
  },
  {
    path: '/sjkczcjs',
    name: 'sjkczcjs',
    component: () => import('@/views/SjkczcjsView.vue'),
    meta: { title: '松江区科技创新政策' },
  },
  {
    path: '/sjqrcfw',
    name: 'sjqrcfw',
    component: () => import('@/views/SjqrcfwView.vue'),
    meta: { title: '上海市松江区人才服务网' },
  },
  {
    path: '/songjiang-employment-service',
    name: 'songjiang-employment-service',
    component: () => import('@/views/SongjiangEmploymentServiceView.vue'),
    meta: {
      title: '松江区就业服务中心 — 上海市松江区人力资源和社会保障局',
      description: '上海市松江区就业促进中心官方服务平台，提供求职招聘、职业指导、技能培训、政策补贴、创业扶持等一站式公共就业服务。',
    },
  },
  {
    path: '/tech-manager-intro',
    name: 'tech-manager-intro',
    component: () => import('@/views/TechManagerIntroView.vue'),
    meta: { title: '技术经理人 — 科技成果转化的关键桥梁' },
  },
  {
    path: '/zlgxc',
    name: 'zlgxc',
    component: () => import('@/views/ZlgxcView.vue'),
    meta: { title: '专利共享池 — 开放协作，让创新价值流动' },
  },

  {
    path: '/platforms/donghua',
    name: 'platform-donghua',
    component: () => import('@/views/PlatformDonghuaView.vue'),
    meta: { title: '东华大学先进纤维材料全国重点实验室松江科创基地 - 高能级科创平台' },
  },
  {
    path: '/platforms/donghua-gn',
    name: 'platform-donghua-gn',
    component: () => import('@/views/PlatformDonghuaGnView.vue'),
    meta: { title: '东华大学国家大学科技园概念验证成果转化中心 - 高能级科创平台' },
  },
  {
    path: '/platforms/guanggu',
    name: 'platform-guanggu',
    component: () => import('@/views/PlatformGuangguView.vue'),
    meta: { title: '上海工程技术大学国家大学科技园光谷科创源 - 高能级科创平台' },
  },
  {
    path: '/platforms/jiaoda',
    name: 'platform-jiaoda',
    component: () => import('@/views/PlatformJiaodaView.vue'),
    meta: { title: '上海交通大学国家技术转移（松江）中心 - 高能级科创平台' },
  },
  {
    path: '/platforms/liug',
    name: 'platform-liug',
    component: () => import('@/views/PlatformLiugView.vue'),
    meta: { title: '上海6G信通智谷未来产业园 - 高能级科创平台' },
  },
  {
    path: '/platforms/qingrui',
    name: 'platform-qingrui',
    component: () => import('@/views/PlatformQingruiView.vue'),
    meta: { title: '清锐光链加速器 - 高能级科创平台' },
  },
  {
    path: '/platforms/shisu',
    name: 'platform-shisu',
    component: () => import('@/views/PlatformShisuView.vue'),
    meta: { title: '上海外国语大学语言科学研究院科研转化基地 - 高能级科创平台' },
  },
  {
    path: '/platforms/tongji',
    name: 'platform-tongji',
    component: () => import('@/views/PlatformTongjiView.vue'),
    meta: { title: '同济大学长三角G60科创走廊研究院 - 高能级科创平台' },
  },
  {
    path: '/platforms/weina',
    name: 'platform-weina',
    component: () => import('@/views/PlatformWeinaView.vue'),
    meta: { title: '国家集成电路微纳检测设备产业计量测试中心 - 高能级科创平台' },
  },
  {
    path: '/platforms/yiqi',
    name: 'platform-yiqi',
    component: () => import('@/views/PlatformYiqiView.vue'),
    meta: { title: '上海科学仪器创新港 - 高能级科创平台' },
  },

  {
    path: '/cgzh-gx/enterprise-tech-demand',
    name: 'cgzh-gx-enterprise',
    component: () => import('@/views/CgzhGxEnterpriseDemandView.vue'),
    meta: { title: '企业技术需求发布平台' },
  },
  {
    path: '/cgzh-gx/tech-demand-platform',
    name: 'cgzh-gx-platform',
    component: () => import('@/views/CgzhGxTechDemandPlatformView.vue'),
    meta: { title: '技术需求发布平台' },
  },
  {
    path: '/cgzh-gx/university-tech-demand',
    name: 'cgzh-gx-university',
    component: () => import('@/views/CgzhGxUniversityDemandView.vue'),
    meta: { title: '高校技术需求发布平台' },
  },
  {
    path: '/cgzh-gx/demand-detail-ai-qc',
    name: 'cgzh-gx-detail',
    component: () => import('@/views/CgzhGxDemandDetailView.vue'),
    meta: { title: '项目详情 - 基于大模型的工业质检缺陷检测系统开发' },
  },

  {
    path: '/cgzh-qy/enterprise-tech-demand',
    name: 'cgzh-qy-enterprise',
    component: () => import('@/views/CgzhQyEnterpriseDemandView.vue'),
    meta: { title: '企业技术需求发布平台' },
  },
  {
    path: '/cgzh-qy/tech-demand-platform',
    name: 'cgzh-qy-platform',
    component: () => import('@/views/CgzhQyTechDemandPlatformView.vue'),
    meta: { title: '企业技术需求发布平台' },
  },
  {
    path: '/cgzh-qy/university-tech-demand',
    name: 'cgzh-qy-university',
    component: () => import('@/views/CgzhQyUniversityDemandView.vue'),
    meta: { title: '高校技术需求发布平台' },
  },
  {
    path: '/cgzh-qy/demand-detail-ai-qc',
    name: 'cgzh-qy-detail',
    component: () => import('@/views/CgzhQyDemandDetailView.vue'),
    meta: { title: '项目详情 - 基于大模型的工业质检缺陷检测系统开发' },
  },

  // ?????????????????? .html ????????
  { path: '/:pathMatch(.*)*', name: 'not-found' },
]

// ? .html ????????????????????????
const legacyPathGuard = (to) => {
  if (to.path.endsWith('.html')) {
    const clean = to.path === '/index.html' ? '/' : to.path.replace(/\.html$/, '')
    return { path: clean, query: to.query, hash: to.hash, replace: true }
  }
  if (to.name === 'not-found') return { path: '/', replace: true }
  return true
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

router.beforeEach(legacyPathGuard)

router.afterEach((to) => {
  const title = to.meta?.title
  document.title = title ? (title.includes(SITE_NAME) || to.path === '/' ? title : `${title} | ${SITE_NAME}`) : SITE_NAME

  const description = to.meta?.description
  if (description) {
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', description)
  }
})

export default router
