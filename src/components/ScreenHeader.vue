<script setup lang="ts">
import { useScreenStore } from '@/stores/screen'

const screen = useScreenStore()
</script>

<template>
  <header class="hd">
    <div class="hd-left">
      <div class="clock">
        <span class="clock-time">{{ screen.time }}</span>
        <span class="clock-date">{{ screen.date }}</span>
      </div>
      <div class="weather">
        <span class="w-icon">⛅</span>
        <span class="w-temp">
          21
          <i>℃</i>
        </span>
        <span class="w-desc">多云 · 东南风 2 级</span>
      </div>
      <div class="period" title="大屏所有指标均为该假期口径">
        <span class="p-txt">2026 国庆假期</span>
        <span class="p-date">10.01–10.07</span>
      </div>
    </div>

    <div class="hd-center">
      <span class="deco deco-left" />
      <h1 class="title">一屏观文旅 一网为全城</h1>
      <span class="deco deco-right" />
      <span class="subtitle">松江区文化和旅游局 · 文旅运行监测中心</span>
    </div>

    <div class="hd-right">
      <button
        type="button"
        class="hd-btn"
        :title="screen.autoPlay ? '暂停自动轮播' : '开启自动轮播'"
        @click="screen.toggleAutoPlay()"
      >
        <span class="dot" :class="{ on: screen.autoPlay }" />
        {{ screen.autoPlay ? '自动轮播' : '已暂停' }}
      </button>
      <div class="hd-user">
        <span class="avatar">松</span>
        <span class="uname">松江区文旅局</span>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.hd {
  position: relative;
  flex: none;
  height: $header-h;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  background: linear-gradient(
      180deg,
      rgba(20, 78, 148, 0.55) 0%,
      rgba(6, 24, 52, 0.1) 100%
    ),
    radial-gradient(
      ellipse 46% 130% at 50% 0%,
      rgba(47, 216, 255, 0.25),
      transparent 70%
    );
  border-bottom: 1px solid rgba(64, 178, 255, 0.22);

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(94, 214, 255, 0.85),
      transparent
    );
  }
}

/* ---------- 左：时间 / 天气 ---------- */
.hd-left {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 500px;
}

.clock {
  display: flex;
  flex-direction: column;
  /* 固定宽度：秒数/日期变化时整块不变宽，右侧天气与周期角标才不会左右抖动。
     等宽数字下 HH:MM:SS 实测恒定 104.4px，留 8px 余量取 112px */
  flex: none;
  width: 112px;
  line-height: 1.1;

  &-time {
    font-family: $font-num;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: #ffffff;
    @include glow-text($c-cyan, 12px);
    /* 等宽数字：否则 1 比 8 窄，每秒跳字都会把后面的元素挤动 */
    font-variant-numeric: tabular-nums;
    font-feature-settings: 'tnum' 1;
    white-space: nowrap;
  }

  &-date {
    font-size: 11px;
    color: $c-text-sub;
    letter-spacing: 0.5px;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
}

.weather {
  display: flex;
  align-items: center;
  flex: none;
  gap: 6px;
  padding-left: 14px;
  border-left: 1px solid rgba(94, 214, 255, 0.22);

  .w-icon {
    font-size: 18px;
  }

  .w-temp {
    font-family: $font-num;
    font-size: 18px;
    color: $c-teal;

    i {
      font-style: normal;
      font-size: 10px;
      color: $c-text-sub;
    }
  }

  .w-desc {
    font-size: 11px;
    color: $c-text-dim;
  }
}

/* ---------- 数据周期角标 ---------- */
.period {
  display: flex;
  align-items: center;
  flex: none;
  gap: 6px;
  height: 26px;
  padding: 0 10px;
  border: 1px solid rgba(47, 216, 255, 0.45);
  border-radius: 4px;
  background: linear-gradient(
    180deg,
    rgba(47, 216, 255, 0.16),
    rgba(9, 36, 72, 0.3)
  );
  white-space: nowrap;

  .p-txt {
    font-size: 12px;
    font-weight: 700;
    color: #ffd166;
  }

  .p-date {
    font-family: $font-num;
    font-size: 11px;
    color: $c-cyan;
    letter-spacing: 0.5px;
  }
}

/* ---------- 中：标题 ---------- */
.hd-center {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.title {
  font-size: 34px;
  font-weight: 700;
  letter-spacing: 6px;
  background: linear-gradient(180deg, #ffffff 6%, #a8ecff 45%, #2fd8ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 14px rgba(47, 216, 255, 0.75));
  white-space: nowrap;
}

.subtitle {
  position: absolute;
  bottom: -14px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  letter-spacing: 3px;
  color: rgba(143, 182, 221, 0.75);
  white-space: nowrap;
}

.deco {
  width: 90px;
  height: 10px;

  &.deco-left {
    background: repeating-linear-gradient(
      90deg,
      rgba(94, 214, 255, 0.85) 0 3px,
      transparent 3px 9px
    );
    mask-image: linear-gradient(90deg, transparent, #000);
  }

  &.deco-right {
    background: repeating-linear-gradient(
      90deg,
      rgba(94, 214, 255, 0.85) 0 3px,
      transparent 3px 9px
    );
    mask-image: linear-gradient(270deg, transparent, #000);
  }
}

/* ---------- 右：控制 / 用户 ---------- */
.hd-right {
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
}

.hd-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  font-size: 12px;
  font-family: inherit;
  color: $c-text;
  background: rgba(64, 178, 255, 0.1);
  border: 1px solid rgba(64, 178, 255, 0.35);
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.25s;

  &:hover {
    background: rgba(64, 178, 255, 0.22);
    border-color: rgba(94, 214, 255, 0.7);
  }

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #5d84ad;

    &.on {
      background: $c-teal;
      box-shadow: 0 0 8px $c-teal;
      animation: breathe 1.6s ease-in-out infinite;
    }
  }
}

@keyframes breathe {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}

.hd-user {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 14px 4px 4px;
  background: rgba(47, 216, 255, 0.08);
  border: 1px solid rgba(47, 216, 255, 0.3);
  border-radius: 18px;

  .avatar {
    width: 26px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    font-size: 13px;
    font-weight: 700;
    color: #04182f;
    background: linear-gradient(160deg, #a6f2ff, #2fd8ff);
    border-radius: 50%;
  }

  .uname {
    font-size: 12px;
    color: $c-text;
    letter-spacing: 0.5px;
  }
}
</style>
