<template>
  <!--
    产业/资源系列公用外壳，实测自 _ref/css/chunk-0b5357e0.css 等：
      .HYAnalysis { display:flex }
      .HYAnalysis .menu-wrapper           { width:164px; height:100%; padding:16px 22px;
                                            display:flex; flex-direction:column; align-items:center }
      .HYAnalysis .menu-wrapper .normal-menu-wrapper { width:120px; height:28px; margin-bottom:24px;
                                            border-radius:18px; box-shadow:inset 0 0 10px 0 rgba(8,138,251,.6);
                                            border:1px solid rgba(8,138,251,.2) }
      .HYAnalysis .menu-name-wrapper      { 渐变文字 linear-gradient(0deg,#77baff,#fff) }
      .HYAnalysis .content-wrapper        { flex:1; height:100% }（带侧栏时 width:calc(100% - 164px)）
      .content-top-wrapper                { height:12px; font-size:12px }
      .content-main-wrapper               { height:calc(100% - 12px); padding-top:4px }
  -->
  <div class="HYAnalysis">
    <div v-if="menus && menus.length" class="menu-wrapper">
      <div
        v-for="m in menus"
        :key="m.key"
        class="normal-menu-wrapper"
        :class="{ 'is-active': activeMenu === m.key }"
        @click="onMenu(m.key)"
      >
        <span class="menu-name-wrapper">{{ m.name }}</span>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="content-top-wrapper">
        <span>{{ sourceText }}</span>
        <span v-if="backText" class="detail-back-wrapper">{{ backText }} ›</span>
      </div>
      <div class="content-main-wrapper">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  menus: { type: Array, default: () => [] },
  sourceText: { type: String, default: '数据来源：松江区文旅资源统计（示例数据）' },
  backText: { type: String, default: '' }
})

const activeMenu = ref(props.menus.length ? props.menus[0].key : '')
const emit = defineEmits(['change'])
const onMenu = (key) => {
  activeMenu.value = key
  emit('change', key)
}
</script>

<style scoped>
.HYAnalysis {
  width: 100%;
  height: 100%;
  display: flex;
  color: #fff;
  box-sizing: border-box;
}

.HYAnalysis .menu-wrapper {
  width: 164px;
  height: 100%;
  padding: 16px 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  flex-shrink: 0;
}

.HYAnalysis .normal-menu-wrapper {
  width: 120px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 10px 0 rgba(8, 138, 251, 0.6);
  border-radius: 18px;
  border: 1px solid rgba(8, 138, 251, 0.2);
  cursor: pointer;
  margin-bottom: 24px;
  transition: all 0.2s ease;
}

.HYAnalysis .normal-menu-wrapper:hover {
  border-color: rgba(8, 138, 251, 0.7);
}

.HYAnalysis .normal-menu-wrapper.is-active {
  background: rgba(8, 138, 251, 0.22);
  border-color: rgba(8, 138, 251, 0.85);
}

.HYAnalysis .menu-name-wrapper {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-style: normal;
  display: inline-block;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(0deg, #77baff, #fff);
}

.HYAnalysis .content-wrapper {
  flex: 1;
  width: calc(100% - 164px);
  height: 100%;
  min-width: 0;
}

.HYAnalysis .content-top-wrapper {
  width: 100%;
  height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  color: hsla(0, 0%, 100%, 0.8);
}

.HYAnalysis .content-top-wrapper .detail-back-wrapper {
  font-size: 14px;
  cursor: pointer;
  color: #1890ff;
  margin-left: 40px;
}

.HYAnalysis .content-main-wrapper {
  width: 100%;
  height: calc(100% - 12px);
  padding-top: 4px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}
</style>
