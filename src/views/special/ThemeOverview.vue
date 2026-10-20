<template>
  <!-- 特色业态专题：实测根类名 .theme-overview-outer-wrapper -->
  <div class="theme-overview-outer-wrapper">
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
      <div class="search-input-wrapper">
        <el-input v-model="keyword" placeholder="搜索专题名称" size="small" clearable />
      </div>
    </div>

    <div class="system-list-wrapper">
      <div v-for="t in filteredThemes" :key="t.name" class="system-card-wrapper">
        <div class="each-card-wrapper">
          <div class="card-top-wrapper" :style="{ backgroundImage: `url(${cardBg})` }">
            <span class="card-top-name">{{ t.name }}</span>
          </div>
          <div class="card-bottom-wrapper">
            <div class="systom-detail-wrapper">{{ t.desc }}</div>
            <div class="systom-status-btn-wrapper">
              <span class="design-status-wrapper">{{ t.status }}</span>
              <span class="design-act-wrapper">查看详情</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { SPECIAL_THEMES } from '@/mock/realdata'

/**
 * 特色业态专题（原参考站为「冰雪运动」专题，本项目按松江本地特色改造）。
 *
 * 版式**从反编译的 CSS 还原**（`_ref/css/chunk-75bf026e.css`，根类名 `.theme-overview-outer-wrapper`）：
 *   .theme-overview-outer-wrapper { width:100%; height:100%; padding:30px 0 20px 0 }
 *   .top-search-wrapper           { width:100%; height:60px; display:flex;
 *                                   align-items:center; justify-content:space-between; padding:0 20px }
 *   .check-item-wrapper           { height:32px; padding:0 16px; border-radius:16px; margin-right:16px }
 *   .search-input-wrapper         { width:300px }
 *   .system-list-wrapper          { width:100%; height:calc(100% - 60px); overflow:auto; flex-wrap:wrap }
 *   .system-card-wrapper          { width:25%; height:280px; padding:20px }
 *   .each-card-wrapper            { height:100%; border-radius:8px; border:1px solid #d4a018 }
 *   .card-top-wrapper             { height:55% }    .card-bottom-wrapper { height:45% }
 *
 * 说明：本项目账号无「特色业态」模块权限，参考站看不到渲染页，
 * 本页依据反编译的 CSS/模板结构重建；内容为松江区特色业态的合理示例。
 */
const cardBg = '/img/entry-type-bg.b730a0bd.png'

const checks = [
  { key: 'all', name: '全部专题' },
  { key: '重点专题', name: '重点专题' },
  { key: '特色业态', name: '特色业态' },
  { key: '新兴业态', name: '新兴业态' }
]
const activeCheck = ref('all')
const keyword = ref('')

const filteredThemes = computed(() =>
  SPECIAL_THEMES.filter((t) => activeCheck.value === 'all' || t.type === activeCheck.value).filter(
    (t) => !keyword.value || t.name.includes(keyword.value)
  )
)
</script>

<style scoped>
/* 版式取自 _ref/css/chunk-75bf026e.css，逐条对应 */
.theme-overview-outer-wrapper {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
  padding: 30px 0 20px 0;
}

.theme-overview-outer-wrapper div,
.theme-overview-outer-wrapper span {
  box-sizing: border-box;
}

.top-search-wrapper {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
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

.search-input-wrapper {
  width: 300px;
}

.system-list-wrapper {
  width: 100%;
  height: calc(100% - 60px);
  overflow: auto;
  display: flex;
  align-content: flex-start;
  flex-flow: wrap;
}

.system-card-wrapper {
  width: 25%;
  height: 280px;
  padding: 20px;
}

.each-card-wrapper {
  height: 100%;
  border-radius: 8px;
  border: 1px solid #d4a018;
  background: linear-gradient(180deg, rgba(212, 160, 24, 0.03), rgba(212, 160, 24, 0.1));
  color: hsla(0, 0%, 100%, 0.8);
  box-shadow: 0 0 10px rgba(212, 160, 24, 0.5);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card-top-wrapper {
  width: 100%;
  height: 55%;
  background-size: cover;
  background-position: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-shrink: 0;
}

.card-top-name {
  font-size: 24px;
  letter-spacing: 3px;
  color: #fff;
  text-shadow: 0 0 33px #1683ff, 0 0 7px #1683ff, 0 0 2px rgba(112, 177, 250, 0.45);
}

.card-bottom-wrapper {
  width: 100%;
  height: 45%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.systom-detail-wrapper {
  width: 100%;
  height: calc(100% - 30px);
  font-size: 14px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: normal;
  color: hsla(0, 0%, 100%, 0.75);
}

.systom-status-btn-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.design-status-wrapper {
  padding: 2px 4px;
  font-size: 12px;
  color: hsla(0, 0%, 100%, 0.7);
  background: rgba(0, 254, 255, 0.1);
}

.design-act-wrapper {
  padding: 3px 10px;
  font-size: 12px;
  color: #fff;
  line-height: 17px;
  background: linear-gradient(180deg, #1ab5fc, #0074ee);
  border-radius: 4px;
  border: 1px solid #016bc6;
  cursor: pointer;
}
</style>
