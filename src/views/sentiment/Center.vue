<template>
  <!-- 预警中心：实测 .warning-center-page { padding:4px 2px 0 } -->
  <div class="warning-center-page">
    <!-- 顶部统计卡（.overview-card-wrap / .stat-card） -->
    <div class="overview-card-wrap">
      <div v-for="s in stats" :key="s.label" class="stat-card">
        <div class="stat-body">
          <span class="stat-label">{{ s.label }}</span>
          <span class="stat-value sj-num">{{ s.value }}</span>
        </div>
        <span class="stat-extra">{{ s.extra }}</span>
      </div>
    </div>

    <!-- 预警列表 -->
    <div class="content-row">
      <ListPage
        title="预警列表"
        :columns="columns"
        :rows="rows"
        search-prop="title"
        search-placeholder="搜索预警事件"
        :page-size="6"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ListPage from '@/views/common/ListPage.vue'
import { SENTIMENT_WARNINGS } from '@/mock/realdata'

/**
 * 预警中心（参考站 `/main/sentiment/center`，chunk-7e390cfe）。
 * 版式：顶部 .overview-card-wrap 统计行 + .content-row 列表卡。
 * ⚠️ 本账号无「舆情监测」模块权限，数据为松江区场景的合理示例（页面已标注）。
 */
const rows = SENTIMENT_WARNINGS

const stats = computed(() => {
  const total = rows.length
  const pending = rows.filter((r) => r.status === '待处理').length
  const high = rows.filter((r) => r.level === '高').length
  return [
    { label: '预警总量', value: total, extra: '近 7 日' },
    { label: '待处理', value: pending, extra: '需跟进' },
    { label: '高风险', value: high, extra: '优先处置' },
    { label: '已处理', value: total - pending, extra: '处置率 ' + Math.round(((total - pending) / total) * 100) + '%' }
  ]
})

const columns = [
  { label: '预警事件', prop: 'title', minWidth: 380 },
  { label: '等级', prop: 'level', width: 90, tag: true },
  { label: '类型', prop: 'type', width: 120 },
  { label: '状态', prop: 'status', width: 110, tag: true },
  { label: '时间', prop: 'time', width: 172 }
]
</script>

<style scoped>
.warning-center-page {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 4px 2px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.overview-card-wrap {
  display: flex;
  gap: 16px;
  flex-shrink: 0;
}

.stat-card {
  flex: 1 1 0;
  min-width: 0;
  height: 82px;
  padding: 12px 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  border: 1px solid rgba(8, 138, 251, 0.28);
  background: linear-gradient(180deg, rgba(8, 138, 251, 0.16), rgba(4, 30, 56, 0.6));
}

.stat-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.stat-label {
  font-size: 14px;
  color: rgba(201, 215, 239, 0.95);
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #ffd200;
  line-height: 1;
}

.stat-extra {
  font-size: 12px;
  color: rgba(122, 212, 255, 0.8);
}

.content-row {
  flex: 1;
  min-height: 0;
}
</style>
