<template>
  <div class="chart-card">
    <div class="chart-card-content">
      <div class="chart-panel">
        <div class="chart-title" :class="{ 'title-with-bg': titleBg }">
          <i class="title-before-bar"></i>
          <label class="chart-title__label">{{ name }}</label>
          <span class="chart-title__right">
            <slot name="toolbar" />
            <span class="chart-card__append">
              <slot name="titleAppend" />
            </span>
          </span>
        </div>
        <div class="content-wrapepr" :class="{ 'content-wrapepr--flex': flex }">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * 图表卡片容器：**结构逐层对齐参考站**（反编译 `chunk-19eac3cb.css` 实测）。
 *
 * 参考站真实 DOM / CSS：
 *   .chart-card-content { width:100%; height:100% }
 *     .chart-panel
 *       .chart-title        { position:relative; width:100%; height:42px; display:flex }
 *         .title-before-bar { width:3px; height:14px; background:#088afb; left:10px; top:11px }
 *         label             { margin-left:34px; line-height:30px; font-size:26px;
 *                             font-family:titleText; text-shadow:0 0 6px #002b53; margin-top:2px }
 *       .content-wrapepr    { width:100%; height:calc(100% - 53px); padding-top:10px;
 *                             position:relative; box-sizing:border-box }
 *       .content-wrapepr--flex { display:flex; flex-direction:column }
 *
 * 注意 `.content-wrapepr` 的高度是 `calc(100% - 53px)`（42 标题 + 11 余量），
 * 不是占满剩余空间 —— 这是参考站的原始表达式。
 */
defineProps({
  name: { type: String, default: '' },
  chartType: { type: String, default: '' },
  domId: { type: String, default: '' },
  isBigChart: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  /** 是否显示 s-menu 标题底图（参考站图表卡默认显示） */
  titleBg: { type: Boolean, default: true },
  bordered: { type: Boolean, default: false },
  /** 内容区是否用弹性列布局（表格/自适应图表需要） */
  flex: { type: Boolean, default: true }
})
</script>

<style scoped>
.chart-card {
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* 地图打底时面板需半不透明深色底，否则地图路网会透上来影响读数 */
  background: linear-gradient(180deg, rgba(4, 30, 56, 0.92), rgba(2, 18, 36, 0.88));
  border: 1px solid rgba(8, 138, 251, 0.22);
  border-radius: 3px;
}

/* .chart-card-content：参考站为 width/height 100% */
.chart-card-content {
  width: 100%;
  height: 100%;
}

.chart-panel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* .chart-title：满宽 42 高（实测参考站 458×42，宽度随卡片自适应） */
.chart-title {
  position: relative;
  width: 100%;
  height: 42px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.chart-title.title-with-bg {
  background: url('/img/s-menu.5e84380d.png') no-repeat;
  background-size: 100% 100%;
}

.chart-title .title-before-bar {
  width: 3px;
  height: 14px;
  background: #088afb;
  position: absolute;
  left: 10px;
  top: 11px;
}

.chart-title__label {
  margin-left: 34px;
  margin-top: 2px;
  line-height: 30px;
  font-size: 24px;
  font-family: titleText, 'Microsoft YaHei', sans-serif;
  color: #fff;
  letter-spacing: 1px;
  text-shadow: 0 0 6px #002b53;
  white-space: nowrap;
  flex-shrink: 0;
}

/* 标题右侧元素（工具栏 / 单位）统一靠右排列，避免与绝对定位的
   .title-before-bar 及较长的中文标题重叠（曾出现「热门排行」压住图标） */
.chart-title__right {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: calc(100% - 220px);
}

.chart-card__append {
  font-size: 16px;
  color: hsla(0, 0%, 100%, 0.8);
  white-space: nowrap;
}

/* .content-wrapepr：高度 calc(100% - 53px)（参考站原始表达式） */
.content-wrapepr {
  width: 100%;
  height: calc(100% - 53px);
  padding-top: 10px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
}

.content-wrapepr--flex {
  display: flex;
  flex-direction: column;
}
</style>
