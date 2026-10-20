<script setup lang="ts">
import SvgIcon from '@/components/common/SvgIcon.vue'
import StatNumber from '@/components/common/StatNumber.vue'
import { RESOURCE_LEGEND } from '@/data/map'
</script>

<template>
  <section class="res-bar">
    <header class="rb-hd">
      <span class="rb-badge">数</span>
      <span class="rb-title">松江区文旅资源统计</span>
      <span class="rb-line" />
      <span class="rb-sub">数据口径：区文旅局行业管理台账（存量，截至 2026.09）</span>
    </header>
    <ul class="rb-grid">
      <li v-for="r in RESOURCE_LEGEND" :key="r.label">
        <SvgIcon :name="r.icon" :size="20" :color="r.color" />
        <span class="rb-text">
          <b class="rb-num" :style="{ color: r.color }">
            <StatNumber :value="r.value" />
          </b>
          <span class="rb-name">{{ r.label }}</span>
        </span>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.res-bar {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 6px 14px 8px;
  background: linear-gradient(
    180deg,
    rgba(16, 62, 122, 0.4),
    rgba(6, 22, 48, 0.26)
  );
  border: 1px solid $c-border;
  border-radius: $r-panel;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0 0 auto 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(94, 214, 255, 0.7),
      transparent
    );
  }
}

.rb-hd {
  flex: none;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 24px;
}

.rb-badge {
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  color: #04182f;
  background: linear-gradient(160deg, #a6f2ff, #2fd8ff 70%);
  clip-path: polygon(24% 0, 100% 0, 76% 100%, 0 100%);
}

.rb-title {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  @include grad-text($c-cyan, #ffffff);
}

.rb-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(94, 214, 255, 0.42), transparent);
}

.rb-sub {
  font-size: 10px;
  color: $c-text-dim;
}

.rb-grid {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 4px 6px;
  margin-top: 4px;

  li {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 2px 6px;
    min-width: 0;
    background: linear-gradient(90deg, rgba(47, 216, 255, 0.07), transparent);
    border-left: 2px solid rgba(47, 216, 255, 0.35);
    transition: background 0.25s;

    &:hover {
      background: linear-gradient(90deg, rgba(47, 216, 255, 0.2), transparent);
    }
  }

  .rb-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
    line-height: 1.25;
  }

  .rb-num {
    font-family: $font-num;
    font-size: 17px;
    font-weight: 700;
    @include glow-text($c-cyan, 8px);
  }

  .rb-name {
    font-size: 10px;
    color: $c-text-sub;
    @include ellipsis(1);
  }
}
</style>
