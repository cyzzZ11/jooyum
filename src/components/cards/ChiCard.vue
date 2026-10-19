<script setup lang="ts">
import RankBar from '@/components/common/RankBar.vue'
import StatBlock from '@/components/common/StatBlock.vue'
import { CHI_RANK, CHI_STATS } from '@/data/panels'
</script>

<template>
  <div class="card">
    <div class="stat-row">
      <StatBlock v-for="s in CHI_STATS" :key="s.label" v-bind="s" size="md" />
    </div>
    <div class="chart-title">
      热门餐饮商圈消费额
      <em>万元</em>
    </div>
    <div class="chart-fill scroll-area">
      <RankBar :items="CHI_RANK" color="#ff9f43" />
    </div>
  </div>
</template>
