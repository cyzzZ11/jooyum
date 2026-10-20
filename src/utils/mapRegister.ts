/**
 * 地图注册（应用启动时执行一次）
 * 放在独立模块里，保证任何图表实例初始化前 'songjiang' / 'songjiang-district' 已注册。
 */
import echarts from './echarts'
import townsGeo from '@/assets/geo/songjiang-towns.json'
import districtGeo from '@/assets/geo/songjiang-district.json'
import { cleanGeoJSON } from './geoClean'

export const MAP_NAME = 'songjiang'
export const DISTRICT_MAP_NAME = 'songjiang-district'

// 注册前先清理：union 掉同一街镇内部贴合多边形之间的接缝（否则窄条带的
// 两条描边会糊成一条多余亮线），并剔除零面积 / 亚像素的退化环。
// 详见 utils/geoClean.ts
echarts.registerMap(MAP_NAME, cleanGeoJSON(townsGeo) as never)
echarts.registerMap(DISTRICT_MAP_NAME, cleanGeoJSON(districtGeo) as never)
