/**
 * ECharts 统一入口（按需注册）
 * 大屏用到的图表类型集中在这里注册，业务组件只 import 本文件。
 */
import * as echarts from 'echarts/core'
import { BarChart, LineChart, MapChart, PieChart, ScatterChart, EffectScatterChart } from 'echarts/charts'
import {
    GeoComponent,
    GraphicComponent,
    GridComponent,
    LegendComponent,
    TitleComponent,
    TooltipComponent,
    VisualMapComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
    BarChart,
    LineChart,
    MapChart,
    PieChart,
    ScatterChart,
    EffectScatterChart,
    GeoComponent,
    GraphicComponent,
    GridComponent,
    LegendComponent,
    TitleComponent,
    TooltipComponent,
    VisualMapComponent,
    CanvasRenderer,
])

export default echarts
export type { EChartsOption } from 'echarts'
export type EChartsInstance = echarts.ECharts
