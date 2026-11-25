/**
 * 科创服务中心 —— 一站式科创服务数据
 * 服务板块与站内现有模块（科技成果转化、金融支持、数字公共服务、载体资源、政策、人才）对齐；
 * 联系信息取自站点页脚真实信息。老站首页对应入口：校企双向发榜 / 载体资源 / 数字公共服务驿站 / 政策支持 / 人才服务。
 */

export const serviceStats = [
  { value: '6', unit: '大', label: '服务板块' },
  { value: '42', unit: '项', label: '数字公共服务' },
  { value: '227', unit: '款', label: '银行信贷产品' },
  { value: '24', unit: 'h', label: '需求响应时效' },
]

export const serviceSections = [
  {
    key: 'transfer',
    code: '01',
    name: '科技成果转化',
    en: 'TECH TRANSFER',
    desc: '从技术需求发布到成果落地，打通高校院所与企业的对接通道。',
    link: '/platform-index',
    linkText: '进入高能级平台',
    items: [
      { name: '校企双向发榜', desc: '企业出题、高校答题', href: '/cgzh-qy/tech-demand-platform' },
      { name: '共享实验室（设备）', desc: '高校科研仪器开放预约', href: '/cgzh/laboratory' },
      { name: '技术经理人团队', desc: '成果挖掘与商业化陪跑', href: '/tech-manager-intro' },
      { name: '专利共享池', desc: '开放许可与作价入股', href: '/zlgxc' },
    ],
  },
  {
    key: 'finance',
    code: '02',
    name: '金融支持',
    en: 'FINANCE',
    desc: '基金、银行、保险多元接力，覆盖企业全生命周期的资金需求。',
    link: '/finance-support',
    linkText: '进入金融服务',
    items: [
      { name: '股权融资对接', desc: '天使基金与产业基金', href: '/finance-support' },
      { name: '银行信贷产品', desc: '31 家银行 · 227 款产品', href: '/finance-support' },
      { name: '科技保险服务', desc: '研发与成果转化风险保障', href: '/finance-support' },
    ],
  },
  {
    key: 'digital',
    code: '03',
    name: '数字公共服务',
    en: 'DIGITAL SERVICE',
    desc: '算力、模型、数据、软件等数字能力，低成本、低门槛、高可用。',
    link: '/public-service',
    linkText: '进入数字服务驿站',
    items: [
      { name: '算力服务', desc: '市级调度平台与本地算力池', href: '/public-service' },
      { name: '模型与数据服务', desc: '模型部署调优、数据产品', href: '/public-service' },
      { name: '软件与信创服务', desc: '通用软件、商用密码', href: '/public-service' },
    ],
  },
  {
    key: 'space',
    code: '04',
    name: '载体资源',
    en: 'CARRIER',
    desc: '园区、孵化器与在租房源一图纵览，按需匹配落地空间。',
    link: '/resource',
    linkText: '进入载体资源',
    items: [
      { name: '园区载体', desc: '十大高能级平台与产业园', href: '/resource' },
      { name: '孵化空间', desc: '大学生创业中心与孵化基地', href: '/resource' },
      { name: '在租房源', desc: '面积、租金、配套在线查询', href: '/resource' },
    ],
  },
  {
    key: 'policy',
    code: '05',
    name: '政策服务',
    en: 'POLICY',
    desc: '科技政策集中发布、逐条解读，申报事项一次说清。',
    link: '/sjkczcjs',
    linkText: '查看科技政策',
    items: [
      { name: '科技政策发布', desc: '区级科技政策集中查阅', href: '/sjkczcjs' },
      { name: '申报辅导', desc: '高企、科技型中小企业评价', href: '/sjkczcjs' },
      { name: '资金兑现', desc: '扶持资金申报与兑现指引', href: '/sjkczcjs' },
    ],
  },
  {
    key: 'talent',
    code: '06',
    name: '人才服务',
    en: 'TALENT',
    desc: '人才政策、就业服务与创业扶持，帮助团队安心落地成长。',
    link: '/sjqrcfw',
    linkText: '进入人才服务',
    items: [
      { name: '人才政策', desc: '落户、安居与人才认定', href: '/sjqrcfw' },
      { name: '就业服务', desc: '求职招聘与技能培训', href: '/songjiang-employment-service' },
      { name: '创业扶持', desc: '创业培训与项目孵化', href: '/cxybm' },
    ],
  },
]

export const serviceProcess = [
  { title: '需求提交', desc: '线上提交需求表单，或拨打服务热线说明诉求。' },
  { title: '服务受理', desc: '服务中心统一受理，1 个工作日内完成分类与分办。' },
  { title: '专员对接', desc: '按服务板块匹配专属服务官，一对一沟通细节。' },
  { title: '方案落地', desc: '联动高校、金融机构、载体与政策资源形成解决方案。' },
  { title: '跟踪回访', desc: '事项办结后持续跟踪，提供后续延伸服务。' },
]

export const serviceCommitments = [
  { title: '一口受理', desc: '一个入口提交，内部流转分办' },
  { title: '一网通办', desc: '线上事项全程可查可跟踪' },
  { title: '专人跟办', desc: '每个需求都有专属服务官' },
  { title: '全程陪跑', desc: '从对接到落地不断档' },
]

/**
 * 服务事项清单
 * mode：办理方式；duration：承诺时限
 */
export const serviceItems = [
  {
    name: '企业技术需求发布',
    section: '科技成果转化',
    desc: '面向企业征集技术难题，通过双向发榜对接高校科研团队。',
    mode: '线上办理',
    duration: '1 个工作日',
    link: '/cgzh-qy/tech-demand-platform',
  },
  {
    name: '共享实验室（设备）预约',
    section: '科技成果转化',
    desc: '查询高校科研仪器型号、技术指标并预约使用。',
    mode: '线上办理',
    duration: '2 个工作日',
    link: '/cgzh/laboratory',
  },
  {
    name: '技术合同登记',
    section: '科技成果转化',
    desc: '技术开发、转让、咨询、服务合同认定登记辅导。',
    mode: '窗口办理',
    duration: '3 个工作日',
    link: '/tech-manager-intro',
  },
  {
    name: '专利开放许可申请',
    section: '科技成果转化',
    desc: '对接专利共享池，办理开放许可、转让与作价入股。',
    mode: '窗口办理',
    duration: '5 个工作日',
    link: '/zlgxc',
  },
  {
    name: '银行信贷产品对接',
    section: '金融支持',
    desc: '按企业画像匹配合作银行信贷产品，协助提交授信材料。',
    mode: '线上办理',
    duration: '3 个工作日',
    link: '/finance-support',
  },
  {
    name: '股权融资对接',
    section: '金融支持',
    desc: '对接天使基金、产业基金，安排项目路演与尽调。',
    mode: '专员对接',
    duration: '5 个工作日',
    link: '/finance-support',
  },
  {
    name: '科技保险咨询',
    section: '金融支持',
    desc: '研发中断、成果转化等科技保险方案咨询与投保对接。',
    mode: '专员对接',
    duration: '3 个工作日',
    link: '/finance-support',
  },
  {
    name: '算力资源申请',
    section: '数字公共服务',
    desc: '申请市级算力调度平台、本地算力池与智算服务。',
    mode: '线上办理',
    duration: '2 个工作日',
    link: '/public-service',
  },
  {
    name: '模型与数据服务咨询',
    section: '数字公共服务',
    desc: '模型部署调优、数据产品与定制化数据服务对接。',
    mode: '专员对接',
    duration: '3 个工作日',
    link: '/public-service',
  },
  {
    name: '园区载体选址',
    section: '载体资源',
    desc: '按面积、租金、产业方向匹配园区与孵化空间。',
    mode: '专员对接',
    duration: '3 个工作日',
    link: '/resource',
  },
  {
    name: '高新技术企业认定辅导',
    section: '政策服务',
    desc: '高企申报条件诊断、材料辅导与进度跟踪。',
    mode: '窗口办理',
    duration: '5 个工作日',
    link: '/sjkczcjs',
  },
  {
    name: '科技型中小企业评价',
    section: '政策服务',
    desc: '评价入库条件解读与线上填报辅导。',
    mode: '线上办理',
    duration: '2 个工作日',
    link: '/sjkczcjs',
  },
  {
    name: '人才政策咨询',
    section: '人才服务',
    desc: '人才认定、落户与安居政策一对一解读。',
    mode: '窗口办理',
    duration: '1 个工作日',
    link: '/sjqrcfw',
  },
  {
    name: '创业孵化入驻',
    section: '人才服务',
    desc: '大学生创业中心、孵化基地入驻申请与创业培训。',
    mode: '线上办理',
    duration: '5 个工作日',
    link: '/cxybm',
  },
]

export const serviceContact = {
  address: '松江区文汇路 699 号德稻大师楼 11 层',
  phone: '021-3773 5673',
  email: 'service@sjdxckcy.com',
  hours: '周一至周五 9:00 – 17:00',
}
