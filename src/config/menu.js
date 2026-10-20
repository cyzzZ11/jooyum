/**
 * 菜单与模块定义。
 *
 * 结构来源：参考站构建产物（app.js 路由表 + chunk-b753df26 模块容器）。
 * 子菜单名称与顺序已按 **参考站账号 songjiang 的真实权限树** 校准
 * （GET api/v1/permission/current/user/functions，system_id = 114）：
 *
 *   114      全国旅游大数据平台
 *   114-1    旅游态势
 *   114-1-1  总览        /main/trend/overview
 *   114-1-2  旅游消费    /main/trend/fee
 *   114-1-3  国内旅游    /main/trend/city
 *   114-1-4  入境旅游    /main/trend/entry
 *   114-1-5  景区旅游    /main/trend/scenic
 *   114-1-7  对比分析    /main/trend/compare
 *   114-1-8  商圈游客    /main/trend/business
 *
 * 参考站还存在「实时客流」(/main/trend/real) 与「冰雪运动」专题（本账号无权限），
 * 本项目保留「实时客流」，并将冰雪专题替换为松江本地特色业态专题。
 * 其余 5 个模块（舆情监测 / 产业洞察 / 资源图谱 / 假日客流 / 特色业态）取自
 * 参考站完整路由表，作为本项目后续扩展位。
 */

export const modules = [
  {
    key: 'trend',
    name: '文旅态势感知',
    shortName: '态势感知',
    fullName: '松江区文旅态势感知平台',
    path: '/main/trend',
    icon: 'DataLine',
    sysDesc: ['多源数据融合感知', '实时掌握文旅运行态势'],
    /**
     * 子菜单文案与顺序 = 参考站运行时真实渲染结果（CDP 实测，非权限树文案）：
     * 态势总览 / 旅游消费 / 国内旅游 / 入境旅游 / 景区游客 / 商圈游客 / 对比分析
     * 注意：权限树里写的是「总览」「景区旅游」，但界面实际显示「态势总览」「景区游客」。
     */
    children: [
      { name: '态势总览', path: '/main/trend/overview', icon: 'PieChart' },
      { name: '旅游消费', path: '/main/trend/fee', icon: 'Money' },
      { name: '国内旅游', path: '/main/trend/city', icon: 'Position' },
      { name: '入境旅游', path: '/main/trend/entry', icon: 'Promotion' },
      { name: '景区游客', path: '/main/trend/scenic', icon: 'Picture' },
      { name: '商圈游客', path: '/main/trend/business', icon: 'Shop' },
      { name: '对比分析', path: '/main/trend/compare', icon: 'TrendCharts' }
    ]
  },
  {
    key: 'sentiment',
    name: '文旅舆情监测',
    shortName: '舆情监测',
    fullName: '松江区文旅舆情监测平台',
    path: '/main/sentiment',
    icon: 'ChatDotRound',
    sysDesc: ['全网舆情实时监测', '风险预警与热点追踪'],
    children: [
      { name: '舆情分析', path: '/main/sentiment/analysis', icon: 'DataAnalysis' },
      { name: '媒体分析', path: '/main/sentiment/media', icon: 'VideoCamera' },
      { name: '区域分析', path: '/main/sentiment/area', icon: 'MapLocation' },
      { name: '舆情列表', path: '/main/sentiment/list', icon: 'Document' },
      { name: '预警中心', path: '/main/sentiment/center', icon: 'Bell' }
    ]
  },
  {
    key: 'industry',
    name: '文旅产业洞察',
    shortName: '产业洞察',
    fullName: '松江区文旅产业洞察平台',
    path: '/main/industry',
    icon: 'OfficeBuilding',
    sysDesc: ['产业数据深度挖掘', '洞察趋势与发展机会'],
    children: [
      { name: '产业总览', path: '/main/industry/overview', icon: 'Grid' },
      { name: '产业图谱', path: '/main/industry/map', icon: 'Share' },
      { name: '链数分析', path: '/main/industry/analysis', icon: 'Connection' },
      { name: '企业监测', path: '/main/industry/company', icon: 'Monitor' }
    ]
  },
  {
    key: 'source',
    name: '文旅资源图谱',
    shortName: '资源图谱',
    fullName: '松江区文旅资源图谱平台',
    path: '/main/source',
    icon: 'Files',
    sysDesc: ['资源底数一张图', '分类分级动态管理'],
    children: [
      { name: '资源图谱', path: '/main/source/tree', icon: 'List' },
      { name: '资源一张图', path: '/main/source/map', icon: 'Location' },
      { name: '资源分析', path: '/main/source/analysis', icon: 'Histogram' }
    ]
  },
  {
    key: 'holiday',
    name: '假日客流分析',
    shortName: '客流分析',
    fullName: '松江区假日客流分析平台',
    path: '/main/holiday',
    icon: 'Calendar',
    sysDesc: ['假日客流实时跟踪', '高峰时段精准调度'],
    children: [
      { name: '假日总览', path: '/main/holiday/overview', icon: 'DataBoard' },
      { name: '城市客流', path: '/main/holiday/city', icon: 'LocationInformation' },
      { name: '景区客流', path: '/main/holiday/scenic', icon: 'Sunny' },
      { name: '门票收入', path: '/main/holiday/fee', icon: 'Wallet' }
    ]
  },
  {
    key: 'special',
    name: '特色业态专题',
    shortName: '特色专题',
    fullName: '松江区文旅特色业态专题',
    path: '/main/special',
    icon: 'Star',
    sysDesc: ['夜间经济与研学旅游', '一镇一品特色业态'],
    children: [
      { name: '特色业态', path: '/main/special/theme', icon: 'Sunrise' },
      { name: '夜间经济', path: '/main/special/night', icon: 'Moon' }
    ]
  }
]

/** 路径 -> 菜单项/模块 反查表（模块路径 / 模块首页 / 子页面均可解析） */
const flatMap = {}
modules.forEach((m) => {
  flatMap[m.path] = { module: m, item: null }
  m.children.forEach((c, idx) => {
    flatMap[c.path] = { module: m, item: c }
    // 模块首页：模块路径与第一个子页面等价（参考站 initMenus 取 children[0]）
    if (idx === 0) flatMap[m.path] = { module: m, item: c }
  })
})

export function resolveMenu(path) {
  return flatMap[path] || flatMap['/main/trend/overview']
}

export default modules
