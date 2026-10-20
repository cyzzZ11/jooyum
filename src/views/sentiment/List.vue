<template>
  <!-- 舆情列表：实测 .sentiment-list-page { padding:4px 2px 0 } -->
  <ListPage
    title="舆情列表"
    :columns="columns"
    :rows="rows"
    search-prop="title"
    search-placeholder="搜索舆情标题"
    :page-size="10"
  />
</template>

<script setup>
import ListPage from '@/views/common/ListPage.vue'
import { SENTIMENT_LIST } from '@/mock/realdata'

/**
 * 舆情列表页（参考站 `/main/sentiment/list`，chunk-54a242a4）。
 * 版式：整页单卡（.list-card）+ 表格 + 右对齐分页（.pagination-wrapper）。
 * ⚠️ 本账号无「舆情监测」模块权限，数据为松江区场景的合理示例（页面已标注）。
 */
const columns = [
  { label: '舆情标题', prop: 'title', minWidth: 420 },
  { label: '媒体来源', prop: 'media', width: 130 },
  { label: '情感倾向', prop: 'emotion', width: 110, tag: true },
  { label: '热度', prop: 'heat', width: 100, align: 'right' },
  { label: '发布时间', prop: 'time', width: 172 }
]
const rows = SENTIMENT_LIST
</script>
