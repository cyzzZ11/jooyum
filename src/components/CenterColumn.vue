<script setup lang="ts">
/** 中间列：松江区街镇地图 + 文旅资源统计条 */
import SongjiangMap from '@/components/map/SongjiangMap.vue'
import ResourceBar from '@/components/map/ResourceBar.vue'
</script>

<template>
  <div class="col">
    <SongjiangMap class="col-map" />
    <ResourceBar class="col-res" />
  </div>
</template>

<style scoped lang="scss">
.col {
  flex: 1;
  min-width: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: $gap;
}

.col-map {
  flex: 1;
  min-height: 0;
}

.col-res {
  flex: none;
  height: 168px;
}
</style>
