<template>
  <SiteNav />
  <router-view />
  <RobotPet />
</template>

<script setup>
import SiteNav from '@/components/SiteNav.vue'
import RobotPet from '@/components/RobotPet.vue'
</script>
