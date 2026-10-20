/**
 * 筛选锁定开关。
 *
 * 演示场景下需要把「区域 + 时间」固定为 2026 年国庆节 / 松江区，
 * 避免现场误操作切换口径。在 public/config/appContext.js 中设置
 * `lockFilter: false` 即可恢复可交互。
 */
export const isFilterLocked = () => (window.appContext || {}).lockFilter !== false
