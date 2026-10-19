import { defineStore } from 'pinia'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { pad2 } from '@/utils/format'

const WEEK = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

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

    let timer: number | undefined

    function tick() {
        const d = new Date()
        time.value = `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`
        date.value = `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${WEEK[d.getDay()]}`
    }

    onMounted(() => {
        tick()
        timer = window.setInterval(tick, 1000)
    })

    onBeforeUnmount(() => {
        if (timer) window.clearInterval(timer)
    })

    function toggleAutoPlay() {
        autoPlay.value = !autoPlay.value
    }

    return { time, date, autoPlay, interval, tick, toggleAutoPlay }
})
