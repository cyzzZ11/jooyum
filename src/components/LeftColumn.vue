<script setup lang="ts">
/** 左侧列：游/吃、购/住、娱/行 —— 三组卡片，组内可左右切换 */
import { ref } from 'vue'
import PanelBox from '@/components/common/PanelBox.vue'
import type { PanelTab } from '@/types/ui'
import YouCard from '@/components/cards/YouCard.vue'
import ChiCard from '@/components/cards/ChiCard.vue'
import GouCard from '@/components/cards/GouCard.vue'
import ZhuCard from '@/components/cards/ZhuCard.vue'
import YuCard from '@/components/cards/YuCard.vue'
import XingCard from '@/components/cards/XingCard.vue'

const TABS_A: PanelTab[] = [
  { key: 'you', label: '游' },
  { key: 'chi', label: '吃' }
]
const TABS_B: PanelTab[] = [
  { key: 'gou', label: '购' },
  { key: 'zhu', label: '住' }
]
const TABS_C: PanelTab[] = [
  { key: 'yu', label: '娱' },
  { key: 'xing', label: '行' }
]

const keyA = ref('you')
const keyB = ref('gou')
const keyC = ref('yu')
</script>

<template>
  <div class="col">
    <PanelBox
      v-model="keyA"
      class="col-item"
      badge="游"
      title="旅游客流与餐饮消费"
      :tabs="TABS_A"
      :interval="11000"
    >
      <YouCard v-if="keyA === 'you'" />
      <ChiCard v-else />
    </PanelBox>

    <PanelBox
      v-model="keyB"
      class="col-item"
      badge="购"
      title="旅游购物与住宿接待"
      :tabs="TABS_B"
      :interval="11000"
    >
      <GouCard v-if="keyB === 'gou'" />
      <ZhuCard v-else />
    </PanelBox>

    <PanelBox
      v-model="keyC"
      class="col-item"
      badge="娱"
      title="文化娱乐与交通出行"
      :tabs="TABS_C"
      :interval="11000"
    >
      <YuCard v-if="keyC === 'yu'" />
      <XingCard v-else />
    </PanelBox>
  </div>
</template>

<style scoped lang="scss">
.col {
  width: 462px;
  flex: none;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: $gap;
  min-height: 0;
}

.col-item {
  flex: 1 1 0;
  min-height: 0;
}
</style>
