import { onBeforeUnmount, onMounted } from 'vue'

/**
 * 鼠标位置驱动的卡片高光效果（写入 --x / --y CSS 变量）。
 */
export function useTiltCards(selector) {
  const bindings = []

  onMounted(() => {
    document.querySelectorAll(selector).forEach((card) => {
      const handler = (event) => {
        const rect = card.getBoundingClientRect()
        const x = (((event.clientX - rect.left) / rect.width) * 100).toFixed(1)
        const y = (((event.clientY - rect.top) / rect.height) * 100).toFixed(1)
        card.style.setProperty('--x', `${x}%`)
        card.style.setProperty('--y', `${y}%`)
      }
      card.addEventListener('mousemove', handler)
      bindings.push([card, handler])
    })
  })

  onBeforeUnmount(() => {
    bindings.forEach(([card, handler]) => card.removeEventListener('mousemove', handler))
  })
}
