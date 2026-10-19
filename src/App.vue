<script setup lang="ts">
import ScreenAdapter from '@/components/common/ScreenAdapter.vue'
import ScreenHeader from '@/components/ScreenHeader.vue'
import LeftColumn from '@/components/LeftColumn.vue'
import CenterColumn from '@/components/CenterColumn.vue'
import RightColumn from '@/components/RightColumn.vue'
</script>

<template>
  <ScreenAdapter>
    <div class="screen">
      <ScreenHeader />
      <main class="screen-main">
        <LeftColumn />
        <CenterColumn />
        <RightColumn />
      </main>
    </div>
  </ScreenAdapter>
</template>

<style scoped lang="scss">
.screen {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  // 顶部氛围光束
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    width: 900px;
    height: 300px;
    transform: translateX(-50%);
    background: radial-gradient(
      ellipse at 50% 0%,
      rgba(47, 216, 255, 0.14),
      transparent 70%
    );
    pointer-events: none;
    z-index: 0;
  }
}

.screen-main {
  position: relative;
  z-index: 1;
  flex: 1;
  min-height: 0;
  display: flex;
  gap: $gap;
  padding: $gap $page-pad ($page-pad + 2px);
}
</style>
