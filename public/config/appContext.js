/**
 * 运行时配置（参考站同名文件 config/appContext.js 的松江区版本）
 * 只需修改本文件即可切换 Mock / 真实后端，无需重新打包。
 */
window.appContext = {
  /** 平台标题 */
  platformName: '松江区文旅态势感知与智能决策平台',
  platformShortName: '松江文旅',

  /** 数据源模式：'mock' 使用内置演示数据；'api' 调用 baseUrl 真实接口 */
  dataMode: 'mock',

  /**
   * 是否显示头部「菜单」模块切换下拉。
   * 参考站为 v-if="cardList.length > 1"，本账号只有 1 个系统（system_id=114），
   * 因此参考站上**不显示**该按钮 —— 默认 false，与之 1:1。
   */
  showSystemMenu: false,

  /** 真实后端接口基址（dataMode = 'api' 时生效） */
  baseUrl: 'http://192.170.13.101/smart-decision/',
  /** 接口请求超时（毫秒） */
  timeout: 20000,

  /** 松江区行政区划代码 */
  regionCode: '310117',
  regionName: '松江区',

  /**
   * 天地图密钥（参考站用高德，本项目改用天地图）。
   * 请在 https://console.tianditu.gov.cn/ 免费申请后填入；
   * 留空时地图区域仅显示占位框，不会请求任何瓦片。
   */
  tiandituKey: '4d8102f33503c30ada791872032d5940',
  /** 天地图中心点与初始层级（默认松江区中心） */
  mapCenter: [121.223543, 31.03047],
  mapZoom: 11,
  /** 天地图瓦片子域 */
  tiandituSubdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],

  /** 区域层级：区 -> 街镇 */
  areaRange: 'all',

  /** 手机信令热力图数量阈值与半径（与参考站一致，供地图页使用） */
  heatMax: 100,
  heatRadius: 25,

  /** 数据来源标注 */
  dataSourceText: '数据来源：手机信令大数据（2026年国庆节假期口径，部分指标按区级总量测算）',

  /** 周列表/天气字典：与参考站结构保持一致，便于后续接入气象接口 */
  weekList: ['日', '一', '二', '三', '四', '五', '六'],
  weatherType: [
    { name: '晴', icon: '☀️' },
    { name: '多云', icon: '⛅️' },
    { name: '阴', icon: '☁️' },
    { name: '小雨', icon: '🌦️' },
    { name: '中雨', icon: '🌧️' },
    { name: '大雨', icon: '🌧️' },
    { name: '雷阵雨', icon: '⛈️' },
    { name: '雾', icon: '🌫️' },
    { name: '霾', icon: '😷' },
    { name: '大风', icon: '💨' }
  ]
}

/** 兼容参考站的工具函数命名空间 */
window.appFunc = window.appFunc || {}
