<template>
  <!-- 资源对比：实测 .source-resource-compare（顶部参数条 + 表格） -->
  <div class="source-resource-compare">
    <div class="compare-params-wrapper">
      <div class="param-control value-mode-control">
        <div class="mode-group">
          <div
            v-for="m in valueModes"
            :key="m"
            class="mode-item"
            :class="{ 'is-active': valueMode === m }"
            @click="valueMode = m"
          >
            {{ m }}
          </div>
        </div>
      </div>

      <div class="param-control resource-type-control">
        <label>资源类型</label>
        <el-select v-model="typeFilter" size="small" style="width: 150px" clearable placeholder="全部">
          <el-option v-for="t in types" :key="t" :label="t" :value="t" />
        </el-select>
      </div>

      <div class="param-control area-control">
        <label>对比区域</label>
        <el-select v-model="areas" multiple collapse-tags size="small" style="width: 280px" placeholder="选择街镇">
          <el-option v-for="t in towns" :key="t.name" :label="t.name" :value="t.name" />
        </el-select>
      </div>

      <div class="btn-panel">
        <div class="btn-control" @click="reset">重置</div>
      </div>
    </div>

    <div class="compare-content-wrapper">
      <ChartCard name="资源对比明细">
        <template #toolbar>
          <span class="compare-tip">共 {{ tableData.length }} 个区域</span>
        </template>
        <el-table
          :data="tableData"
          height="100%"
          :header-cell-style="headerStyle"
          :cell-style="cellStyle"
          :row-style="{ background: 'rgba(4, 30, 56, 0.6)' }"
        >
          <el-table-column prop="region" label="街镇" min-width="140" />
          <el-table-column v-for="c in dynamicColumns" :key="c" :prop="c" :label="c" min-width="130" />
        </el-table>
      </ChartCard>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import ChartCard from '@/components/ChartCard.vue'
import { SOURCE_RESOURCES } from '@/mock/realdata'
import { towns } from '@/mock/songjiang'

/**
 * 资源图谱 · 资源对比（参考站 `/main/source/compare`，chunk-2f51b236）。
 *
 * 版式**从反编译 CSS 还原**：
 *   .source-resource-compare .compare-params-wrapper { height:36px; display:flex;
 *                                                      align-items:center; gap:24px; justify-content:flex-end }
 *   .compare-params-wrapper .param-control           { gap:8px; align-items:center }
 *   .value-mode-control .mode-group .mode-item       { height:28px; padding:0 12px; color:#9fd2ff;
 *                                                      border:1px solid rgba(8,138,251,.45) }
 *   .area-control                                    { min-width:280px }
 *   .btn-panel .btn-control                          { height:32px; padding:0 16px;
 *                                                      box-shadow:inset 0 0 11px 0 rgba(8,138,251,.6) }
 *
 * ⚠️ 本账号无「资源图谱」模块权限，数据为松江区文旅资源的合理示例（页面已标注）。
 */
const valueModes = ['绝对量', '占比', '人均']
const valueMode = ref('绝对量')
const typeFilter = ref('')
const areas = ref(['方松街道', '岳阳街道', '中山街道', '佘山镇'])

const types = SOURCE_RESOURCES.categories.map((c) => c.name)
const dynamicColumns = computed(() => SOURCE_RESOURCES.categories.slice(0, 6).map((c) => c.name))

const tableData = computed(() =>
  (areas.value.length ? areas.value : towns.slice(0, 8).map((t) => t.name)).map((name, ri) => {
    const row = { region: name }
    SOURCE_RESOURCES.categories.slice(0, 6).forEach((c) => {
      const base = Math.round((c.value / 12) * (1 + ((ri % 4) - 1.5) * 0.16))
      row[c.name] = valueMode.value === '占比' ? `${((base / c.value) * 100).toFixed(1)}%` : base
    })
    return row
  })
)

const reset = () => {
  valueMode.value = '绝对量'
  typeFilter.value = ''
  areas.value = ['方松街道', '岳阳街道', '中山街道', '佘山镇']
}

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
</script>

<style scoped>
.source-resource-compare {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.compare-params-wrapper {
  width: 100%;
  height: 36px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.compare-params-wrapper .param-control {
  width: auto;
  height: 100%;
  display: flex;
  gap: 8px;
  align-items: center;
}

.compare-params-wrapper .param-control label {
  font-size: 14px;
  color: #fff;
  white-space: nowrap;
}

.mode-group {
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(8, 138, 251, 0.45);
}

.mode-item {
  height: 28px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  color: #9fd2ff;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  box-sizing: border-box;
  background: rgba(8, 138, 251, 0.08);
}

.mode-item.is-active {
  color: #1a1408;
  font-weight: 700;
  background: linear-gradient(180deg, var(--sj-gold-light), var(--sj-gold-dark));
}

.btn-panel {
  gap: 8px;
  height: 100%;
  display: flex;
  justify-content: flex-end;
}

.btn-panel .btn-control {
  height: 32px;
  padding: 0 16px;
  color: #fff;
  line-height: 30px;
  text-align: center;
  box-shadow: inset 0 0 11px 0 rgba(8, 138, 251, 0.6);
  border-radius: 2px;
  border: 1px solid transparent;
  cursor: pointer;
}

.btn-panel .btn-control:hover {
  border-color: rgba(8, 138, 251, 0.7);
}

.compare-content-wrapper {
  flex: 1;
  min-height: 0;
}

.compare-tip {
  font-size: 13px;
  color: rgba(180, 220, 255, 0.75);
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
</style>
