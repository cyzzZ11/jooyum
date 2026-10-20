/**
 * ECharts 深色大屏主题（色值取自参考站：主蓝 #088afb、强调金 #ffd200）
 */
export const chartColors = ['#088afb', '#ffd200', '#2fd27a', '#ff8b4d', '#7ad4ff', '#b47aff']

export const axisLine = { lineStyle: { color: 'rgba(8, 138, 251, 0.45)' } }
export const splitLine = { lineStyle: { color: 'rgba(8, 138, 251, 0.14)', type: 'dashed' } }
export const axisLabel = { color: 'rgba(180, 220, 255, 0.78)', fontSize: 12 }

export const tooltipStyle = {
  backgroundColor: 'rgba(3, 28, 52, 0.95)',
  borderColor: 'rgba(8, 138, 251, 0.6)',
  borderWidth: 1,
  textStyle: { color: '#fff', fontSize: 13 },
  extraCssText: 'box-shadow: 0 0 12px rgba(8,138,251,.35);'
}

export const legendStyle = {
  textStyle: { color: 'rgba(180, 220, 255, 0.85)', fontSize: 13 },
  itemWidth: 12,
  itemHeight: 8,
  top: 2,
  right: 10
}

/** 面积渐变：用于折线图 */
export const areaGradient = (color) => ({
  type: 'linear',
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [
    { offset: 0, color: `${color}66` },
    { offset: 1, color: `${color}05` }
  ]
})

/**
 * 生成一条标准折线/柱状趋势配置
 * @param {object} cfg { xData, series:[{name,data,color,type}], unit, legend, yScale, yUnit }
 */
export function buildTrendOption(cfg) {
  const {
    xData = [],
    series = [],
    unit = '',
    legend = true,
    showDataZoom = false,
    yName = '',
    /** y 轴换算除数（如 10000 表示按“万”显示） */
    yScale = 1,
    /** y 轴单位文案（如 万人次 / 万元） */
    yUnit = ''
  } = cfg
  const scaleNum = (v) => (v === null || v === undefined ? '-' : `${(v / yScale).toLocaleString()}${unit}`)
  return {
    grid: { left: 12, right: 20, top: legend ? 40 : 22, bottom: showDataZoom ? 42 : 22, containLabel: true },
    tooltip: {
      trigger: 'axis',
      ...tooltipStyle,
      axisPointer: { type: 'line', lineStyle: { color: 'rgba(8,138,251,.6)' } },
      valueFormatter: scaleNum
    },
    legend: legend
      ? { ...legendStyle, data: series.map((s) => s.name) }
      : { show: false },
    dataZoom: showDataZoom
      ? [
          { type: 'inside', start: 40, end: 100 },
          {
            type: 'slider',
            height: 14,
            bottom: 8,
            start: 40,
            end: 100,
            borderColor: 'transparent',
            fillerColor: 'rgba(8,138,251,.25)',
            handleStyle: { color: '#088afb' },
            textStyle: { color: 'rgba(180,220,255,.8)', fontSize: 10 }
          }
        ]
      : undefined,
    xAxis: {
      type: 'category',
      boundaryGap: series.some((s) => s.type === 'bar'),
      data: xData,
      axisLine,
      axisTick: { show: false },
      axisLabel: { ...axisLabel, hideOverlap: true }
    },
    yAxis: {
      type: 'value',
      name: yName,
      nameTextStyle: { color: 'rgba(180,220,255,.7)', fontSize: 12 },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        ...axisLabel,
        formatter: (v) => `${v >= 1000 ? (v / 1000).toLocaleString() + 'k' : v}${yUnit}`
      },
      splitLine
    },
    series: series.map((s, i) => ({
      name: s.name,
      type: s.type || 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      showSymbol: xData.length <= 24,
      barMaxWidth: 22,
      itemStyle: {
        color: s.color || chartColors[i % chartColors.length],
        borderRadius: s.type === 'bar' ? [3, 3, 0, 0] : 0
      },
      lineStyle: { width: 2, shadowBlur: 8, shadowColor: `${s.color || chartColors[i % chartColors.length]}77` },
      /**
       * 区域填充：**默认关闭**。
       * 参考站趋势图（高频态势 6 张卡）实测其折线均为 `fill="none"`，
       * 双系列（当年 / 去年同期）叠加时不加填充才不与参考站偏离；
       * 需要填充的图表显式传 `s.area = true`。
       */
      areaStyle: s.area
        ? { color: areaGradient(s.color || chartColors[i % chartColors.length]) }
        : undefined,
      data: s.data
    }))
  }
}

/** 饼图/环形图配置：用于消费结构、客源地等 */
export function buildPieOption(cfg) {
  const { data = [], unit = '', name = '' } = cfg
  return {
    tooltip: { trigger: 'item', ...tooltipStyle, valueFormatter: (v) => `${Number(v).toLocaleString()}${unit}` },
    legend: { ...legendStyle, orient: 'vertical', right: 6, top: 'center' },
    color: chartColors,
    series: [
      {
        name,
        type: 'pie',
        radius: ['46%', '70%'],
        center: ['38%', '54%'],
        avoidLabelOverlap: true,
        itemStyle: { borderColor: 'rgba(3,20,35,.9)', borderWidth: 2 },
        label: { color: 'rgba(220,238,255,.9)', fontSize: 12, formatter: '{b}\n{d}%' },
        labelLine: { lineStyle: { color: 'rgba(8,138,251,.6)' } },
        data
      }
    ]
  }
}

/** 横向条形排行配置 */
export function buildBarRankOption(cfg) {
  const { data = [], unit = '', color = '#088afb' } = cfg
  const list = [...data].sort((a, b) => a.value - b.value)
  return {
    grid: { left: 12, right: 46, top: 12, bottom: 8, containLabel: true },
    tooltip: { trigger: 'axis', ...tooltipStyle, valueFormatter: (v) => `${Number(v).toLocaleString()}${unit}` },
    xAxis: { type: 'value', axisLine: { show: false }, axisTick: { show: false }, axisLabel: { ...axisLabel, show: false }, splitLine: { show: false } },
    yAxis: {
      type: 'category',
      data: list.map((d) => d.name),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { ...axisLabel, fontSize: 13 }
    },
    series: [
      {
        type: 'bar',
        barMaxWidth: 16,
        itemStyle: {
          borderRadius: [0, 8, 8, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: `${color}55` },
              { offset: 1, color }
            ]
          }
        },
        label: {
          show: true,
          position: 'right',
          color: '#ffd200',
          fontSize: 12,
          formatter: ({ value }) => Number(value).toLocaleString()
        },
        data: list.map((d) => d.value)
      }
    ]
  }
}
