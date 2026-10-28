import { onBeforeUnmount, onMounted } from 'vue'

// 鼠标位置驱动的磁吸 3D 倾斜（最大约 3° / 4°），同时写入 --x / --y 供光斑使用
const MAX_TILT_X = 5
const MAX_TILT_Y = 7

/**
 * 卡片磁吸倾斜 + 高光（写入 --x / --y CSS 变量）。
 * 倾斜用 important 写入，确保覆盖整屏模式下 `transform: none !important` 的兜底规则。
 */
export function useTiltCards (selector) {
  const bindings = []

  onMounted(() => {
    document.querySelectorAll(selector).forEach((card) => {
      const handler = (event) => {
        const rect = card.getBoundingClientRect()
        const px = (event.clientX - rect.left) / rect.width
        const py = (event.clientY - rect.top) / rect.height
        card.style.setProperty('--x', `${(px * 100).toFixed(1)}%`)
        card.style.setProperty('--y', `${(py * 100).toFixed(1)}%`)
        const rotateX = ((0.5 - py) * MAX_TILT_X).toFixed(2)
        const rotateY = ((px - 0.5) * MAX_TILT_Y).toFixed(2)
        card.style.setProperty(
          'transform',
          `perspective(900px) translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          'important'
        )
      }
      const reset = () => {
        card.style.setProperty(
          'transform',
          'perspective(900px) translateY(0) rotateX(0deg) rotateY(0deg)',
          'important'
        )
      }
      card.addEventListener('mousemove', handler)
      card.addEventListener('mouseleave', reset)
      bindings.push([card, handler, reset])
    })
  })

  onBeforeUnmount(() => {
    bindings.forEach(([card, handler, reset]) => {
      card.removeEventListener('mousemove', handler)
      card.removeEventListener('mouseleave', reset)
    })
  })
}
