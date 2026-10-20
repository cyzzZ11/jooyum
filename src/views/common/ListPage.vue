<template>
  <!--
    通用列表页，实测自 _ref/css/chunk-54a242a4.css / chunk-7e390cfe.css：
      .sentiment-list-page { width:100%; height:100%; box-sizing:border-box; padding:4px 2px 0 }
      .list-card 内含 .chart-title（复用 ChartCard）
      .table-wrapper      { flex:1; min-height:0 }
      .pagination-wrapper { display:flex; justify-content:flex-end; padding-top:10px }
  -->
  <div class="sentiment-list-page">
    <div class="list-card">
      <ChartCard :name="title">
        <template #toolbar>
          <span class="list-toolbar">
            <el-input
              v-model="keyword"
              :placeholder="searchPlaceholder"
              size="small"
              clearable
              class="list-search"
            />
            <span class="list-count">共 {{ filtered.length }} 条</span>
          </span>
        </template>

        <div class="table-wrapper">
          <el-table
            :data="paged"
            height="100%"
            :header-cell-style="headerStyle"
            :cell-style="cellStyle"
            :row-style="rowStyle"
          >
            <el-table-column
              v-for="col in columns"
              :key="col.prop"
              :prop="col.prop"
              :label="col.label"
              :width="col.width"
              :min-width="col.minWidth || 120"
              :align="col.align || 'left'"
              show-overflow-tooltip
            >
              <template v-if="col.tag" #default="{ row }">
                <span class="list-tag" :class="tagClass(row[col.prop])">{{ row[col.prop] }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="pagination-wrapper">
          <el-pagination
            v-model:current-page="page"
            :page-size="pageSize"
            :total="filtered.length"
            layout="prev, pager, next"
            background
            small
          />
        </div>
      </ChartCard>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import ChartCard from '@/components/ChartCard.vue'

const props = defineProps({
  title: { type: String, default: '舆情列表' },
  columns: { type: Array, required: true },
  rows: { type: Array, default: () => [] },
  searchProp: { type: String, default: '' },
  searchPlaceholder: { type: String, default: '搜索关键词' },
  pageSize: { type: Number, default: 10 }
})

const keyword = ref('')
const page = ref(1)

const filtered = computed(() => {
  const kw = keyword.value.trim()
  if (!kw || !props.searchProp) return props.rows
  return props.rows.filter((r) => String(r[props.searchProp] || '').includes(kw))
})

watch(filtered, () => {
  page.value = 1
})

const paged = computed(() => {
  const start = (page.value - 1) * props.pageSize
  return filtered.value.slice(start, start + props.pageSize)
})

const headerStyle = {
  background: 'rgba(8, 138, 251, 0.22)',
  color: '#fff',
  fontSize: '14px',
  fontWeight: '700',
  borderColor: 'rgba(8, 138, 251, 0.25)'
}
const cellStyle = {
  background: 'transparent',
  color: '#e6f2ff',
  fontSize: '14px',
  borderColor: 'rgba(8, 138, 251, 0.12)'
}
const rowStyle = { background: 'rgba(4, 30, 56, 0.6)' }

const tagClass = (v) => {
  const s = String(v)
  if (/正面|已处理|低/.test(s)) return 'is-good'
  if (/负面|高|紧急/.test(s)) return 'is-bad'
  if (/中|待处理/.test(s)) return 'is-warn'
  return 'is-neutral'
}
</script>

<style scoped>
.sentiment-list-page {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 4px 2px 0;
}

.list-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* ChartCard 内部已是 flex 列，这里让表格区可压缩 */
.list-card :deep(.content-wrapepr) {
  flex: 1;
  min-height: 0;
  height: auto;
}

.list-toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
}

.list-search {
  width: 180px;
}

.list-count {
  font-size: 13px;
  color: rgba(180, 220, 255, 0.75);
  white-space: nowrap;
}

.table-wrapper {
  flex: 1;
  min-height: 0;
}

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  flex-shrink: 0;
}

.list-tag {
  display: inline-block;
  padding: 1px 8px;
  border-radius: 3px;
  font-size: 12px;
  line-height: 18px;
}

.list-tag.is-good {
  color: #2fd27a;
  background: rgba(47, 210, 122, 0.14);
}

.list-tag.is-bad {
  color: #ff5b5b;
  background: rgba(255, 91, 91, 0.14);
}

.list-tag.is-warn {
  color: #ffd200;
  background: rgba(255, 210, 0, 0.14);
}

.list-tag.is-neutral {
  color: #7ad4ff;
  background: rgba(122, 212, 255, 0.14);
}

:deep(.el-table),
:deep(.el-table tr),
:deep(.el-table th.el-table__cell),
:deep(.el-table td.el-table__cell) {
  background-color: transparent;
}

:deep(.el-table__inner-wrapper::before) {
  display: none;
}

:deep(.el-pagination) {
  --el-pagination-bg-color: rgba(8, 138, 251, 0.14);
  --el-pagination-text-color: #cfe6ff;
  --el-pagination-button-color: #cfe6ff;
}

:deep(.el-pagination.is-background .el-pager li.is-active) {
  background: linear-gradient(180deg, var(--sj-gold-light), var(--sj-gold-dark));
  color: #1a1408;
}
</style>
