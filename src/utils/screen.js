/**
 * 大屏画布适配：与参考站 Main 组件 resize() 完全一致。
 *
 * 参考站逻辑（chunk-223c1674）：
 *   const ratio = clientWidth / clientHeight
 *   ratio > 16/9 ? 以高度为准 : 以宽度为准
 *   $("#app").css({ width: '1920px', height: '1080px', transform: `scale(hr, vr)`,
 *                   marginTop, marginLeft })
 *
 * 即：内容始终按 1920×1080 设计，再整体等比缩放并居中。
 */
const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080

export function initScreenAdapter(el = document.getElementById('app')) {
  if (!el) return () => {}

  const resize = () => {
    const cw = document.body.clientWidth
    const ch = document.body.clientHeight
    let hr
    let vr
    let marginLeft
    let marginTop

    if (cw / ch > DESIGN_WIDTH / DESIGN_HEIGHT) {
      // 窗口更宽：以高度为准，左右留白
      hr = ch / DESIGN_HEIGHT
      vr = ch / DESIGN_HEIGHT
      marginLeft = `${(cw - (DESIGN_WIDTH * ch) / DESIGN_HEIGHT) / 2}px`
      marginTop = '0px'
    } else {
      // 窗口更高：以宽度为准，上下留白
      hr = cw / DESIGN_WIDTH
      vr = cw / DESIGN_WIDTH
      marginLeft = '0px'
      marginTop = `${(ch - (DESIGN_HEIGHT * cw) / DESIGN_WIDTH) / 2}px`
    }

    el.style.width = `${DESIGN_WIDTH}px`
    el.style.height = `${DESIGN_HEIGHT}px`
    el.style.transform = `scale(${hr}, ${vr})`
    el.style.transformOrigin = 'left top'
    el.style.marginTop = marginTop
    el.style.marginLeft = marginLeft
  }

  resize()
  window.addEventListener('resize', resize)
  return () => window.removeEventListener('resize', resize)
}

export { DESIGN_WIDTH, DESIGN_HEIGHT }
