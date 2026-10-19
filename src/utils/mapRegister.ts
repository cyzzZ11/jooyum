/**
 * 地图注册（应用启动时执行一次）
 * 放在独立模块里，保证任何图表实例初始化前 'songjiang' / 'songjiang-district' 已注册。
 */
import echarts from './echarts'
import townsGeo from '@/assets/geo/songjiang-towns.json'
import districtGeo from '@/assets/geo/songjiang-district.json'

export const MAP_NAME = 'songjiang'
export const DISTRICT_MAP_NAME = 'songjiang-district'

echarts.registerMap(MAP_NAME, townsGeo as never)
echarts.registerMap(DISTRICT_MAP_NAME, districtGeo as never)
