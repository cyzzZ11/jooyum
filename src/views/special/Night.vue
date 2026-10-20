<template>
  <!-- 夜间经济：实测 .theme-overview-outer-wrapper 同族卡片墙版式 -->
  <div class="night-outer-wrapper">
    <div class="top-search-wrapper">
      <div class="check-list-wrapper">
        <div
          v-for="c in checks"
          :key="c.key"
          class="check-item-wrapper"
          :class="{ 'is-active': activeCheck === c.key }"
          @click="activeCheck = c.key"
        >
          {{ c.name }}
        </div>
      </div>
      <div class="summary-inline">
        夜间客流 <b class="sj-num">665.95</b> 万人次 · 占比 <b class="sj-num">45.36%</b>
      </div>
    </div>

    <div class="night-list-wrapper">
      <div v-for="n in list" :key="n.name" class="night-card-wrapper">
        <div class="night-card">
          <div class="night-card-top">
            <span class="night-card-name">{{ n.name }}</span>
            <span class="night-card-tag">{{ n.type }}</span>
          </div>
          <div class="night-card-body">
            <div class="night-metrics">
              <div v-for="m in n.metrics" :key="m.label" class="night-metric">
                <span class="metric-label">{{ m.label }}</span>
                <span class="metric-value sj-num">{{ m.value }}<em>{{ m.unit }}</em></span>
              </div>
            </div>
            <p class="night-desc">{{ n.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

/**
 * 特色业态 · 夜间经济（参考站 `/main/special/night`，chunk-03b74880 / chunk-6e0f7d7a 同族）。
 *
 * 版式**从反编译 CSS 还原**（与 `.theme-overview-outer-wrapper` 同族）：
 *   .top-search-wrapper   { height:60px; display:flex; align-items:center;
 *                           justify-content:space-between; padding:0 20px }
 *   .check-item-wrapper   { height:32px; padding:0 16px; border-radius:16px; margin-right:16px }
 *   .system-list-wrapper  { height:calc(100% - 60px); overflow:auto; flex-wrap:wrap }
 *   .system-card-wrapper  { width:25%; height:280px; padding:20px }
 *
 * 数据口径：夜间客流占比 45.36% 为**平台实测真实值**（见 SCENIC_METRICS.nightRatio），
 * 其余点位明细为松江区场景的合理示例（页面已标注）。
 */
const checks = [
  { key: 'all', name: '全部载体' },
  { key: 'night-market', name: '夜市街区' },
  { key: 'night-view', name: '夜景观光' },
  { key: 'night-show', name: '夜间演艺' }
]
const activeCheck = ref('all')

const ALL = [
  {
    name: '广富林夜游', type: '夜景观光',
    metrics: [{ label: '夜间客流', value: '86.4', unit: '万人次' }, { label: '同比', value: '+32.6', unit: '%' }],
    desc: '以广富林文化遗址为核心的夜游项目，灯光秀与水上实景演出为主要吸引点。'
  },
  {
    name: '佘山夜间休闲带', type: '夜景观光',
    metrics: [{ label: '夜间客流', value: '124.8', unit: '万人次' }, { label: '同比', value: '+18.2', unit: '%' }],
    desc: '串联欢乐谷、月湖雕塑公园的夜间休闲动线，节假日夜间客流占比超过五成。'
  },
  {
    name: '泗泾烟火夜市', type: '夜市街区',
    metrics: [{ label: '夜间客流', value: '68.2', unit: '万人次' }, { label: '同比', value: '+42.4', unit: '%' }],
    desc: '泗泾古镇开街后形成的夜市街区，餐饮与文创摊位为主要业态。'
  },
  {
    name: '松江印象城夜经济', type: '夜市街区',
    metrics: [{ label: '夜间客流', value: '142.6', unit: '万人次' }, { label: '同比', value: '+12.8', unit: '%' }],
    desc: '商业综合体夜间延时经营，主力店与影院带动 18-21 时客流高峰。'
  },
  {
    name: '欢乐谷电音节', type: '夜间演艺',
    metrics: [{ label: '夜间客流', value: '52.4', unit: '万人次' }, { label: '同比', value: '+26.4', unit: '%' }],
    desc: '夏季夜间电音主题演艺活动，单场最高接待超 3 万人次。'
  },
  {
    name: '云间粮仓文创夜市', type: '夜市街区',
    metrics: [{ label: '夜间客流', value: '34.6', unit: '万人次' }, { label: '同比', value: '+38.2', unit: '%' }],
    desc: '老粮仓改造的文创园区，周末夜间市集与露天电影为主要内容。'
  },
  {
    name: '泰晤士小镇夜拍', type: '夜景观光',
    metrics: [{ label: '夜间客流', value: '28.8', unit: '万人次' }, { label: '同比', value: '+8.6', unit: '%' }],
    desc: '英伦风情建筑群夜间灯光造景，成为热门夜拍打卡点。'
  },
  {
    name: '醉白池夜游园', type: '夜间演艺',
    metrics: [{ label: '夜间客流', value: '18.4', unit: '万人次' }, { label: '同比', value: '+22.4', unit: '%' }],
    desc: '古典园林夜间开放，结合昆曲与民乐演出的沉浸式游园。'
  }
]

const list = computed(() =>
  activeCheck.value === 'all' ? ALL : ALL.filter((n) => n.type === checks.find((c) => c.key === activeCheck.value)?.name)
)
</script>

<style scoped>
.night-outer-wrapper {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
  padding: 10px 0 20px 0;
}

.top-search-wrapper {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
}

.check-list-wrapper {
  display: flex;
  align-items: center;
}

.check-item-wrapper {
  height: 32px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-radius: 16px;
  background: linear-gradient(175deg, rgba(10, 109, 190, 0.3), rgba(17, 197, 245, 0.3));
  border: 1px solid rgba(0, 145, 255, 0.3);
  margin-right: 16px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.check-item-wrapper:hover {
  border-color: rgba(0, 145, 255, 0.7);
}

.check-item-wrapper.is-active {
  color: #1a1408;
  font-weight: 700;
  border-color: transparent;
  background: linear-gradient(180deg, var(--sj-gold-light), var(--sj-gold-dark));
}

.summary-inline {
  font-size: 14px;
  color: rgba(201, 215, 239, 0.9);
}

.summary-inline b {
  color: #ffd200;
  font-size: 18px;
  margin: 0 3px;
}

.night-list-wrapper {
  width: 100%;
  height: calc(100% - 60px);
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 0 20px;
  box-sizing: border-box;
}

.night-card-wrapper {
  width: 25%;
  height: 250px;
  padding: 10px;
  box-sizing: border-box;
}

.night-card {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 1px solid rgba(212, 160, 24, 0.65);
  background: linear-gradient(180deg, rgba(212, 160, 24, 0.04), rgba(212, 160, 24, 0.12));
  box-shadow: 0 0 10px rgba(212, 160, 24, 0.32);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.night-card-top {
  padding: 14px 16px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.night-card-name {
  font-size: 20px;
  letter-spacing: 1px;
  color: #fff;
  text-shadow: 0 0 24px #1683ff, 0 0 6px #1683ff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.night-card-tag {
  padding: 2px 8px;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid rgba(0, 145, 255, 0.6);
  color: #9fd2ff;
  white-space: nowrap;
  flex-shrink: 0;
}

.night-card-body {
  flex: 1;
  min-height: 0;
  padding: 6px 16px 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.night-metrics {
  display: flex;
  gap: 24px;
  margin-bottom: 10px;
}

.night-metric {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metric-label {
  font-size: 12px;
  color: rgba(201, 215, 239, 0.85);
}

.metric-value {
  font-size: 22px;
  font-weight: 700;
  color: #ffd200;
  line-height: 1;
}

.metric-value em {
  font-style: normal;
  font-size: 12px;
  font-weight: 400;
  color: rgba(201, 215, 239, 0.85);
  margin-left: 3px;
}

.night-desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: hsla(0, 0%, 100%, 0.72);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
