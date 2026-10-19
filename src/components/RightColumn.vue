<script setup lang="ts">
/**
 * 右侧列：放 / 管 / 服
 * 按屏幕高度分两部分 —— 上部分「放 ↔ 管」左右切换，下部分固定「服」。
 * 如需让「服」也参与切换，把 TABS_TOP 改成三项即可。
 */
import { ref } from 'vue'
import PanelBox from '@/components/common/PanelBox.vue'
import type { PanelTab } from '@/types/ui'
import FangCard from '@/components/cards/FangCard.vue'
import GuanCard from '@/components/cards/GuanCard.vue'
import FuCard from '@/components/cards/FuCard.vue'

const TABS_TOP: PanelTab[] = [
  { key: 'fang', label: '放' },
  { key: 'guan', label: '管' }
]

const keyTop = ref('fang')
</script>

<template>
  <div class="col">
    <PanelBox
      v-model="keyTop"
      class="col-top"
      badge="放"
      title="简政放权与行业监管"
      :tabs="TABS_TOP"
      :interval="10000"
    >
      <FangCard v-if="keyTop === 'fang'" />
      <GuanCard v-else />
    </PanelBox>

    <PanelBox class="col-bottom" badge="服" title="文旅公共服务" :autoplay="false">
      <FuCard />
    </PanelBox>
  </div>
</template>

<style scoped lang="scss">
.col {
  width: 476px;
  flex: none;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: $gap;
  min-height: 0;
}

.col-top {
  flex: 48 1 0;
  min-height: 0;
}

.col-bottom {
  flex: 52 1 0;
  min-height: 0;
}
</style>
