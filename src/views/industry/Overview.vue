<template>
  <!-- 产业总览：实测根类名 .HYOverview -->
  <div class="HYOverview">
    <div class="content-wrapper">
      <div class="content-top-wrapper">
        <span>数据来源：松江区文旅产业统计（示例数据）</span>
        <span class="detail-back-wrapper">文旅企业名录 ›</span>
      </div>

      <div class="content-main-wrapper">
        <!-- 概览区：实测 height 126px -->
        <div class="overview-wrapper">
          <div class="overview-outer">
            <div v-for="k in kpi" :key="k.name" class="little-card-wrapper">
              <div class="each-overview-wrapper">
                <span class="overview-name">{{ k.name }}</span>
                <div class="overview-data-unit-wrapper">
                  <span class="overview-data sj-num">{{ k.value }}</span>
                  <span class="overview-unit-wrapper">{{ k.unit }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 下半：企业类型 3×3（实测 .company-type-outer 小卡 calc(33% - 6px)） -->
        <div class="data-part-wrapper">
          <div class="data-top-wrapper">
            <div class="data-card-wrapper">
              <ChartCard name="企业类型分布">
                <div class="company-type-outer">
                  <div v-for="t in types" :key="t.name" class="little-type-card-wrapper">
                    <div class="company-type-top-wrapper">
                      <span class="company-type-name-wrapper">{{ t.name }}</span>
                    </div>
                    <div class="each-company-type-wrapper">
                      <div class="company-type-data-unit-wrapper">
                        <span class="company-type-data sj-num">{{ t.value }}</span>
                        <span class="company-type-unit-wrapper">{{ t.unit }}</span>
                      </div>
                      <span class="company-type-zb-wrapper sj-num">{{ t.zb }}</span>
                    </div>
                  </div>
                </div>
              </ChartCard>
            </div>

            <div class="data-card-wrapper">
              <ChartCard name="产业结构占比">
                <BaseChart :option="pieOption" height="100%" />
              </ChartCard>
            </div>
          </div>

          <div class="data-bottom-wrapper">
            <div class="data-card-wrapper">
              <ChartCard name="营收趋势">
                <BaseChart :option="trendOption" height="100%" />
              </ChartCard>
            </div>

            <div class="data-card-wrapper">
              <ChartCard name="重点企业">
                <TableList :columns="companyColumns" :rows="companies" dom-id="industry-companies" />
              </ChartCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BaseChart from '@/components/BaseChart.vue'
import ChartCard from '@/components/ChartCard.vue'
import TableList from '@/components/TableList.vue'
import { INDUSTRY_OVERVIEW } from '@/mock/realdata'

/**
 * 文旅产业洞察 · 产业总览。
 *
 * 版式**从反编译的 CSS 还原**（`_ref/css/chunk-4b8d6e07.css`，根类名 `.HYOverview`）：
 *   .content-top-wrapper   { height:12px }
 *   .content-main-wrapper  { height:calc(100% - 12px); padding-top:4px; flex-column }
 *   .overview-wrapper      { height:126px }
 *   .overview-outer .little-card-wrapper { width:calc(33% - 6px); height:calc(33% - 8px);
 *                                          background:url(entry-type-bg.png) }
 *   .data-part-wrapper     { height:calc(100% - 126px); margin-top:16px; flex-column }
 *   .data-top/bottom-wrapper { height:calc(50% - 8px); display:flex; justify-content:space-between }
 *   .data-card-wrapper     { width:calc(50% - 8px); height:100% }
 *   .company-type-outer .little-type-card-wrapper { width:calc(33% - 6px); height:calc(33% - 8px) }
 *
 * 说明：本项目账号无「产业洞察」模块权限，参考站看不到渲染页，
 * 本页依据反编译的 CSS/模板结构重建；数据为松江区文旅产业的合理示例。
 */
const kpi = computed(() => INDUSTRY_OVERVIEW.kpi)
const types = computed(() => INDUSTRY_OVERVIEW.types)

const pieOption = computed(() => ({
  tooltip: { trigger: 'item', formatter: '{b}<br/>{c} 家 ({d}%)' },
  legend: {
    orient: 'vertical',
    right: 10,
    top: 'center',
    textStyle: { color: 'rgba(180,220,255,.85)', fontSize: 12 },
    itemWidth: 10,
    itemHeight: 8
  },
  color: ['#088afb', '#ffd200', '#2fd27a', '#ff8b4d', '#7ad4ff', '#b47aff', '#ff5b8b', '#5bffd4', '#9fb6d4'],
  series: [
    {
      type: 'pie',
      radius: ['40%', '66%'],
      center: ['34%', '52%'],
      itemStyle: { borderColor: 'rgba(3,20,35,.9)', borderWidth: 2 },
      label: { show: false },
      data: types.value.map((t) => ({ name: t.name, value: Number(String(t.value).replace(/,/g, '')) }))
    }
  ]
}))

const trendOption = computed(() => {
  const labels = ['2021', '2022', '2023', '2024', '2025']
  const data = [142.6, 128.4, 156.8, 172.3, 186.4]
  return {
    grid: { left: 12, right: 24, top: 24, bottom: 22, containLabel: true },
    tooltip: { trigger: 'axis', valueFormatter: (v) => v + ' 亿元' },
    xAxis: {
      type: 'category',
      data: labels,
      axisLine: { lineStyle: { color: 'rgba(8,138,251,.45)' } },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(180,220,255,.78)', fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      name: '亿元',
      nameTextStyle: { color: 'rgba(180,220,255,.8)', fontSize: 11 },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(180,220,255,.78)', fontSize: 11 },
      splitLine: { lineStyle: { color: 'rgba(8,138,251,.14)', type: 'dashed' } }
    },
    series: [
      {
        type: 'bar',
        barMaxWidth: 26,
        itemStyle: {
          borderRadius: [3, 3, 0, 0],
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#ffd200' },
              { offset: 1, color: 'rgba(255,210,0,.22)' }
            ]
          }
        },
        label: { show: true, position: 'top', color: '#ffd200', fontSize: 11 },
        data
      }
    ]
  }
})

const companyColumns = [
  { label: '企业', prop: 'region_name', align: 'left', width: 150 },
  { label: '营收(万元)', prop: 'all_value', width: 96, sortable: true },
  { label: '同比', prop: 'tb_all_value', width: 69, unit: '%', sortable: true }
]

const companies = [
  { region_name: '上海佘山国家旅游度假区', all_value: 286400, tb_all_value: 0.186 },
  { region_name: '上海欢乐谷', all_value: 214600, tb_all_value: 0.128 },
  { region_name: '广富林文化发展有限公司', all_value: 128400, tb_all_value: 0.264 },
  { region_name: '上海辰山植物园', all_value: 96200, tb_all_value: 0.086 },
  { region_name: '松江印象城', all_value: 88600, tb_all_value: 0.142 },
  { region_name: '上海影视乐园', all_value: 64200, tb_all_value: -0.062 },
  { region_name: '开元地中海商业广场', all_value: 52800, tb_all_value: 0.048 },
  { region_name: '云间粮仓文创园', all_value: 42600, tb_all_value: 0.318 }
]
</script>

<style scoped>
/* 版式取自 _ref/css/chunk-4b8d6e07.css，逐条对应 */
.HYOverview {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
}

.HYOverview .content-wrapper {
  width: 100%;
  height: 100%;
}

.HYOverview .content-wrapper .content-top-wrapper {
  width: 100%;
  height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  color: hsla(0, 0%, 100%, 0.8);
}

.HYOverview .content-wrapper .content-top-wrapper .detail-back-wrapper {
  font-size: 14px;
  cursor: pointer;
  color: #1890ff;
  margin-left: 40px;
}

.HYOverview .content-wrapper .content-main-wrapper {
  width: 100%;
  height: calc(100% - 12px);
  padding-top: 4px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  box-sizing: border-box;
}

/* 概览区：实测 height 126px，内部 4 个指标卡一行铺满 */
.HYOverview .content-wrapper .content-main-wrapper .overview-wrapper {
  width: 100%;
  height: 126px;
  flex-shrink: 0;
}

.overview-outer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.overview-outer .little-card-wrapper {
  flex: 1 1 0;
  min-width: 0;
  height: 100%;
  background: url('/img/entry-type-bg.b730a0bd.png') no-repeat;
  background-size: 100% 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  color: #fff;
  box-sizing: border-box;
}

.each-overview-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
}

.overview-name {
  font-size: 14px;
  color: rgba(201, 215, 239, 0.95);
  white-space: nowrap;
}

.overview-data-unit-wrapper {
  display: flex;
  align-items: flex-end;
}

.overview-data {
  font-size: 28px;
  font-weight: 700;
  color: #ffd200;
  line-height: 1.1;
}

.overview-unit-wrapper {
  margin-bottom: 5px;
  margin-left: 5px;
  font-size: 12px;
  opacity: 0.8;
}

/* 下半区：实测 calc(100% - 126px)，margin-top 16 */
.HYOverview .content-wrapper .content-main-wrapper .data-part-wrapper {
  width: 100%;
  flex: 1;
  min-height: 0;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
}

.data-top-wrapper,
.data-bottom-wrapper {
  width: 100%;
  flex: 1;
  min-height: 0;
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.data-card-wrapper {
  width: calc(50% - 8px);
  height: 100%;
}

/* 企业类型 3×3 */
.company-type-outer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
}

.company-type-outer .little-type-card-wrapper {
  width: calc(33% - 6px);
  height: calc(33% - 8px);
  background: url('/img/entry-type-bg.b730a0bd.png') no-repeat;
  background-size: 100% 100%;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px;
  color: #fff;
  box-sizing: border-box;
}

.company-type-top-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
}

.company-type-name-wrapper {
  font-size: 15px;
  margin-left: 4px;
}

.each-company-type-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.company-type-data-unit-wrapper {
  display: flex;
  align-items: flex-end;
}

.company-type-data {
  font-size: 18px;
  font-weight: 700;
  color: #ffd200;
}

.company-type-unit-wrapper {
  margin-bottom: 3px;
  margin-left: 4px;
  font-size: 11px;
  opacity: 0.8;
}

.company-type-zb-wrapper {
  font-size: 13px;
  margin-bottom: 3px;
  color: #7ad4ff;
}
</style>
