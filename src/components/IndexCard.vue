<template>
  <div class="each-card-wrapper">
    <div class="index-info-wrapper">
      <!--
        边框底图：参考站实测
        `.index-info-wrapper .bg-img-wrapper{position:absolute;width:242px;height:146px;
         left:calc(50% - 121px);bottom:10px;z-index:-1}`
        容器本身 `background: transparent`（先前误用渐变 + 1px 边框，是观感差异来源）
      -->
      <img class="bg-img-wrapper" src="/img/tar-bj.4b07ffe7.png" alt="" />

      <div class="main-inner-wrapper">
        <div class="center-top-title-wrapper">
          {{ title }}
          <el-icon class="center-top-title__icon"><QuestionFilled /></el-icon>
        </div>

        <div class="center-top-data-unit-wrapper">
          <div class="center-top-data-wrapper sj-num">{{ value }}</div>
          <div class="center-top-unit-wrapper">{{ unit }}</div>
        </div>

        <div class="ratio-wrapper">
          <div class="center-top-compare-data-icon-wrapper">
            <div class="center-top-compare-wrapper">同比</div>
            <div
              class="center-top-compare-data-wrapper sj-num"
              :class="tbNum >= 0 ? 'is-up' : 'is-down'"
            >
              {{ percent(Math.abs(tbNum)) }}%
            </div>
            <div class="center-top-compare-icon-wrapper">
              <i class="compare-arrow" :class="tbNum >= 0 ? 'is-up' : 'is-down'"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { percent } from '@/utils/format'

/**
 * 左上角指标卡 —— 1:1 复刻参考站 `index-info-wrapper`（`chunk-181b8576.css` 实测）。
 *
 * 关键点（先前做错的地方）：
 *   1. 卡片**没有** CSS 渐变背景、**没有** 1px 边框；容器是 `background: transparent`
 *   2. 视觉边框来自一张位图 `<img class="bg-img-wrapper" src="tar-bj.4b07ffe7.png">`
 *      （242×146，`left:calc(50% - 121px); bottom:10px; z-index:-1`）
 *   3. `ratio-wrapper` 自带一条 base64 装饰底图（`background-size:100% 100%`），
 *      故不能再叠加自定义底色
 *   4. 数字用 `cityDigital` 字体、70px、色值 `#f9bb00`（不是 --sj-gold）
 *
 * 该卡片原先在 10 个页面里各写了一遍，现统一为本组件。
 */
const props = defineProps({
  /** 卡片标题，如「旅游消费总金额(累计)」 */
  title: { type: String, required: true },
  /** 主数值（已格式化的字符串） */
  value: { type: [String, Number], required: true },
  /** 单位，如「万元」「亿人次」 */
  unit: { type: String, default: '' },
  /** 同比，小数口径（0.0559 = +5.59%） */
  tb: { type: [Number, String], default: 0 }
})

const tbNum = computed(() => {
  const n = Number(props.tb)
  if (!Number.isFinite(n)) return 0
  // 兼容两种口径：小数（0.0545 = +5.45%）与百分数（5.45 原样）
  return Math.abs(n) > 1.5 ? n : n * 100
})
</script>

<style scoped>
.each-card-wrapper {
  width: 100%;
  height: 33%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

/* 参考站：background: transparent，无边框。
   ⚠️ 必须建立**自己的堆叠上下文**（`z-index: 0`）：底图 `.bg-img-wrapper` 用
   `z-index: -1` 才能只退到本卡片内容之后；否则负 z-index 会逃出卡片，
   导致卡内元素整体被地图画布覆盖（曾出现地图盖住指标卡的严重问题）。 */
.index-info-wrapper {
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding: 0;
  position: relative;
  z-index: 0;
}

/* 边框底图（实测 242×146，底部居中，z-index:-1） */
.bg-img-wrapper {
  position: absolute;
  width: 242px;
  height: 146px;
  left: calc(50% - 121px);
  bottom: 10px;
  z-index: -1;
}

.main-inner-wrapper {
  width: 90%;
  height: 230px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 0;
}

.center-top-title-wrapper {
  width: 100%;
  font-size: 24px;
  color: #fff;
  background: url('/img/target-bj.037c19c3.png') no-repeat;
  background-size: 100% 100%;
  letter-spacing: 2px;
  line-height: 44px;
  cursor: pointer;
  text-align: center;
}

.center-top-title__icon {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.75);
  vertical-align: middle;
}

.center-top-data-unit-wrapper {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 22px;
}

.center-top-data-wrapper {
  font-family: cityDigital, var(--sj-font-num, sans-serif);
  font-size: 70px;
  font-weight: 700;
  letter-spacing: 3px;
  color: #f9bb00;
  line-height: 1.1;
}

.center-top-unit-wrapper {
  line-height: 25px;
  font-size: 16px;
  color: #e4f3ff;
  margin-left: 12px;
  margin-bottom: 10px;
}

/* 该底条来自参考站的 base64 装饰图，不可再叠加底色 */
.ratio-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 100%;
  background: url("data:image/png;base64,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")
    no-repeat;
  background-size: 100% 100%;
}

/* 同比块（实测：label 20px #e4f3ff；数值 20px cityDigital） */
.center-top-compare-data-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  margin: 0 20px;
}

.center-top-compare-wrapper {
  font-size: 20px;
  color: #e4f3ff;
  line-height: 27px;
}

.center-top-compare-data-wrapper {
  font-family: cityDigital, var(--sj-font-num, sans-serif);
  font-size: 20px;
  font-weight: 700;
  line-height: 26px;
  text-align: left;
  font-style: normal;
  margin-left: 10px;
  color: #09d3b9;
}

/* 参考站：上涨用玫红、下跌用青绿（`#09d3b9` 为基准色） */
.center-top-compare-data-wrapper.is-up {
  color: #ff5b5b;
}

.center-top-compare-data-wrapper.is-down {
  color: #09d3b9;
}

.center-top-compare-icon-wrapper {
  margin-left: 8px;
  margin-bottom: 4px;
}

.compare-arrow {
  display: block;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
}

.compare-arrow.is-up {
  border-bottom: 7px solid #ff5b5b;
}

.compare-arrow.is-down {
  border-top: 7px solid #09d3b9;
}
</style>
