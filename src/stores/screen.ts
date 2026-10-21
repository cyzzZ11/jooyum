import { defineStore } from 'pinia'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { pad2 } from '@/utils/format'

const WEEK = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

/**
 * 全局字号档位（作用于内容区文字与图表内的数字，页头标题不缩放）
 *
 * 上限刻意收在 130%：卡片、地图叠层的盒子都是 1920×1080 下的固定尺寸，
 * 再往上就会撑破版式。会议室投影时调到 120% 左右即可。
 */
export const FONT_STEPS = [1, 1.1, 1.2, 1.3] as const
const FONT_STORE_KEY = 'sj-screen-font-step'

/**
 * 大屏全局状态：时钟 + 卡片轮播总开关
 */
export const useScreenStore = defineStore('screen', () => {
    const time = ref('00:00:00')
    const date = ref('')
    /** 全局轮播开关，header 上的按钮可一键暂停所有卡片自动切换 */
    const autoPlay = ref(true)
    /** 卡片默认轮播间隔(ms) */
    const interval = ref(9000)

    /** 字号档位索引 */
    const fontStep = ref(0)
    const fontScale = computed(() => FONT_STEPS[fontStep.value] ?? 1)
    const fontCanDec = computed(() => fontStep.value > 0)
    const fontCanInc = computed(() => fontStep.value < FONT_STEPS.length - 1)

    function setFontStep(i: number) {
        fontStep.value = Math.min(FONT_STEPS.length - 1, Math.max(0, i))
    }

    function stepFont(delta: number) {
        setFontStep(fontStep.value + delta)
    }

    function resetFont() {
        setFontStep(0)
    }

    // 写进 :root 的 --fs，所有 calc(Npx * var(--fs, 1)) 一起生效
    watch(
        fontScale,
        (v) => document.documentElement.style.setProperty('--fs', String(v)),
        { immediate: true }
    )

    // 记住上次选择，演示现场刷新不丢
    watch(fontStep, (v) => localStorage.setItem(FONT_STORE_KEY, String(v)))

    let timer: number | undefined

    function tick() {
        const d = new Date()
        time.value = `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`
        date.value = `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${WEEK[d.getDay()]}`
    }

    onMounted(() => {
        tick()
        timer = window.setInterval(tick, 1000)

        const saved = Number(localStorage.getItem(FONT_STORE_KEY))
        if (Number.isInteger(saved) && saved >= 0 && saved < FONT_STEPS.length) {
            setFontStep(saved)
        }
    })

    onBeforeUnmount(() => {
        if (timer) window.clearInterval(timer)
    })

    function toggleAutoPlay() {
        autoPlay.value = !autoPlay.value
    }

    return {
        time,
        date,
        autoPlay,
        interval,
        tick,
        toggleAutoPlay,
        fontStep,
        fontScale,
        fontCanDec,
        fontCanInc,
        stepFont,
        resetFont
    }
})
