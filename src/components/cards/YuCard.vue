<script setup lang="ts">
import RankBar from '@/components/common/RankBar.vue'
import StatBlock from '@/components/common/StatBlock.vue'
import { YU_RANK, YU_STATS } from '@/data/panels'
</script>

<template>
  <div class="card">
    <div class="stat-row">
      <StatBlock v-for="s in YU_STATS" :key="s.label" v-bind="s" size="sm" />
    </div>
    <div class="chart-title">
      线上文化活动点击量 TOP5
      <em>次</em>
    </div>
    <div class="chart-fill scroll-area">
      <RankBar :items="YU_RANK" color="#ff5f9e" compact />
    </div>
  </div>
</template>
