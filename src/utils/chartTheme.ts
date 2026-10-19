/** ECharts 通用样式工厂，保证各卡片视觉一致 */
import type { EChartsOption } from '@/utils/echarts'

export const C_TEXT_SUB = '#8fb6dd'
export const C_AXIS = 'rgba(120, 180, 230, 0.42)'
export const C_SPLIT = 'rgba(80, 150, 220, 0.12)'

export const tooltipBase = {
    backgroundColor: 'rgba(6, 26, 54, 0.94)',
    borderColor: 'rgba(94, 214, 255, 0.45)',
    borderWidth: 1,
    textStyle: { color: '#dcf0ff', fontSize: 12 },
    extraCssText: 'box-shadow:0 4px 18px rgba(0,0,0,.55);border-radius:3px;',
} as const

/** 类目轴 */
export function catAxis(data: string[], extra: Record<string, unknown> = {}) {
    return {
        type: 'category' as const,
        data,
        axisLine: { lineStyle: { color: C_AXIS } },
        axisTick: { show: false },
        axisLabel: { color: C_TEXT_SUB, fontSize: 11, margin: 8 },
        ...extra,
    }
}

/** 数值轴 */
export function valAxis(extra: Record<string, unknown> = {}) {
    return {
        type: 'value' as const,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: C_TEXT_SUB, fontSize: 10 },
        splitLine: { lineStyle: { color: C_SPLIT, type: 'dashed' as const } },
        ...extra,
    }
}

/** 柱状图 */
export function barOption(opts: {
    categories: string[]
    values: number[]
    colors?: [string, string]
    unit?: string
    max?: number
}): EChartsOption {
    const { categories, values, colors = ['rgba(47,216,255,0.15)', '#2fd8ff'], unit = '', max } = opts
    return {
        tooltip: { ...tooltipBase, trigger: 'axis', axisPointer: { type: 'shadow' }, valueFormatter: (v: unknown) => `${v}${unit}` },
        grid: { left: 4, right: 4, top: 20, bottom: 2, containLabel: true },
        xAxis: catAxis(categories),
        yAxis: valAxis({ max, splitNumber: 3 }),
        series: [
            {
                type: 'bar',
                data: values,
                barWidth: 16,
                itemStyle: {
                    borderRadius: [3, 3, 0, 0],
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: colors[1] },
                            { offset: 1, color: colors[0] },
                        ],
                    },
                },
                label: {
                    show: true,
                    position: 'top',
                    color: '#dcf0ff',
                    fontSize: 12,
                    fontFamily: 'Bahnschrift, Arial',
                    formatter: `{c}${unit ? ` ${unit}` : ''}`,
                },
            },
        ],
    }
}

/** 环形图 */
export function donutOption(opts: {
    data: { name: string; value: number }[]
    colors: string[]
    radius?: [string, string]
    showLabel?: boolean
    unit?: string
}): EChartsOption {
    const { data, colors, radius = ['52%', '76%'], showLabel = true, unit = '' } = opts
    return {
        tooltip: { ...tooltipBase, trigger: 'item', valueFormatter: (v: unknown) => `${v}${unit}` },
        color: colors,
        series: [
            {
                type: 'pie',
                radius,
                center: ['50%', '50%'],
                avoidLabelOverlap: true,
                itemStyle: { borderColor: 'rgba(3,10,26,0.85)', borderWidth: 2 },
                label: {
                    show: showLabel,
                    color: C_TEXT_SUB,
                    fontSize: 11,
                    formatter: '{b} {d}%',
                },
                labelLine: {
                    show: showLabel,
                    length: 6,
                    length2: 6,
                    lineStyle: { color: 'rgba(120,180,230,.5)' },
                },
                emphasis: {
                    scale: true,
                    scaleSize: 6,
                    itemStyle: { shadowBlur: 16, shadowColor: 'rgba(47,216,255,.8)' },
                },
                data,
            },
        ],
    }
}

/** 折线图（可选面积） */
export function lineOption(opts: {
    categories: string[]
    series: { name: string; color: string; data: number[] }[]
    area?: boolean
    unit?: string
}): EChartsOption {
    const { categories, series, area = true, unit = '' } = opts
    return {
        tooltip: { ...tooltipBase, trigger: 'axis', valueFormatter: (v: unknown) => `${v}${unit}` },
        legend: {
            show: series.length > 1,
            right: 0,
            top: 0,
            itemWidth: 10,
            itemHeight: 6,
            textStyle: { color: C_TEXT_SUB, fontSize: 11 },
            icon: 'roundRect',
        },
        grid: { left: 4, right: 8, top: series.length > 1 ? 26 : 14, bottom: 2, containLabel: true },
        xAxis: catAxis(categories, { boundaryGap: false }),
        yAxis: valAxis({ splitNumber: 4 }),
        series: series.map((s) => ({
            name: s.name,
            type: 'line' as const,
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            showSymbol: true,
            data: s.data,
            lineStyle: { width: 2, color: s.color, shadowBlur: 10, shadowColor: s.color },
            itemStyle: { color: s.color, borderColor: '#04182f', borderWidth: 1 },
            areaStyle: area
                ? {
                    color: {
                        type: 'linear' as const,
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: `${s.color}55` },
                            { offset: 1, color: `${s.color}00` },
                        ],
                    },
                }
                : undefined,
        })),
    }
}

/** 迷你趋势线（无坐标轴，用于卡片角标） */
export function sparkOption(values: number[], color: string): EChartsOption {
    return {
        grid: { left: 0, right: 0, top: 4, bottom: 0 },
        xAxis: { type: 'category', show: false, boundaryGap: false, data: values.map((_, i) => i) },
        yAxis: { type: 'value', show: false },
        series: [
            {
                type: 'line',
                smooth: true,
                showSymbol: false,
                data: values,
                lineStyle: { width: 2, color },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: `${color}66` },
                            { offset: 1, color: `${color}00` },
                        ],
                    },
                },
            },
        ],
    }
}
