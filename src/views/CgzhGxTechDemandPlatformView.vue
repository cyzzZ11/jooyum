<template>
  <div class="page page--cgzh-gx-tech-demand-platform">
<div class="bg-decoration"></div>

  <!-- 导航栏 -->
  <nav class="navbar">
    <div class="navbar-inner">
      <a href="#" class="logo">
        <div class="logo-icon">Tx</div>
        <span class="logo-text">TechXchange</span>
      </a>
      <div class="nav-links">
        <a href="#" class="nav-link">需求大厅</a>
        <a href="#" class="nav-link">技术供给</a>
        <a href="#" class="nav-link">合作案例</a>
        <a href="#" class="nav-btn" @click="openModal()">发布需求</a>
      </div>
    </div>
  </nav>

  <!-- Hero -->
  <section class="hero">
    <div class="hero-badge animate-in">
      <div class="hero-badge-dot"></div>
      企业 · 高校 · 技术对接
    </div>
    <h1 class="animate-in delay-1">技术需求发布平台</h1>
    <p class="animate-in delay-2">连接企业真实技术痛点与高校科研能力，让需求精准找到解决方案</p>

    <div class="search-bar animate-in delay-3">
      <input type="text" placeholder="搜索技术需求、领域关键词...">
      <button>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
        </svg>
      </button>
    </div>

    <div class="search-tags animate-in delay-4">
      <span class="search-tag">人工智能</span>
      <span class="search-tag">新材料</span>
      <span class="search-tag">生物医药</span>
      <span class="search-tag">智能制造</span>
      <span class="search-tag">碳中和</span>
      <span class="search-tag">半导体</span>
    </div>
  </section>

  <!-- 统计数据 -->
  <div class="stats">
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-number">2,847</div>
        <div class="stat-label">累计发布需求</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">1,203</div>
        <div class="stat-label">已匹配方案</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">486</div>
        <div class="stat-label">合作企业</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">159</div>
        <div class="stat-label">合作高校</div>
      </div>
    </div>
  </div>

  <!-- 技术领域 -->
  <section class="section">
    <div class="section-header">
      <h2 class="section-title">技术领域</h2>
      <a href="#" class="section-more">查看全部 →</a>
    </div>
    <div class="category-grid">
      <div class="category-card">
        <div class="category-icon">🤖</div>
        <div class="category-name">人工智能</div>
        <div class="category-desc">大模型、计算机视觉、NLP、智能决策</div>
        <div class="category-count">368 项需求</div>
      </div>
      <div class="category-card">
        <div class="category-icon">🧬</div>
        <div class="category-name">生物医药</div>
        <div class="category-desc">创新药研发、医疗器械、基因工程</div>
        <div class="category-count">245 项需求</div>
      </div>
      <div class="category-card">
        <div class="category-icon">⚡</div>
        <div class="category-name">新能源</div>
        <div class="category-desc">储能技术、光伏材料、氢能利用</div>
        <div class="category-count">189 项需求</div>
      </div>
      <div class="category-card">
        <div class="category-icon">🔧</div>
        <div class="category-name">智能制造</div>
        <div class="category-desc">工业机器人、数字孪生、精密加工</div>
        <div class="category-count">312 项需求</div>
      </div>
      <div class="category-card">
        <div class="category-icon">🧪</div>
        <div class="category-name">新材料</div>
        <div class="category-desc">纳米材料、复合材料、功能涂层</div>
        <div class="category-count">176 项需求</div>
      </div>
      <div class="category-card">
        <div class="category-icon">🌿</div>
        <div class="category-name">碳中和</div>
        <div class="category-desc">碳捕获、绿色化工、循环利用</div>
        <div class="category-count">134 项需求</div>
      </div>
      <div class="category-card">
        <div class="category-icon">💾</div>
        <div class="category-name">半导体</div>
        <div class="category-desc">芯片设计、封装测试、EDA 工具</div>
        <div class="category-count">221 项需求</div>
      </div>
      <div class="category-card">
        <div class="category-icon">🛡️</div>
        <div class="category-name">网络安全</div>
        <div class="category-desc">数据加密、隐私计算、安全审计</div>
        <div class="category-count">98 项需求</div>
      </div>
    </div>
  </section>

  <!-- 最新需求 -->
  <section class="section">
    <div class="section-header">
      <h2 class="section-title">最新技术需求</h2>
      <a href="#" class="section-more">查看全部 →</a>
    </div>
    <div class="demand-grid">

      <div class="demand-card">
        <div class="demand-header">
          <span class="demand-tag tag-enterprise">企业需求</span>
          <span class="demand-urgent">紧急</span>
        </div>
        <div class="demand-title">基于大模型的工业质检缺陷检测系统</div>
        <div class="demand-desc">需要开发基于视觉大模型的产线缺陷检测方案，要求检测精度 ≥ 99.5%，支持多品类产品快速切换，响应时间 < 200ms。</div>
        <div class="demand-meta">
          <div class="demand-meta-item">
            <svg class="demand-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            人工智能
          </div>
          <div class="demand-meta-item">
            <svg class="demand-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            3 天前发布
          </div>
          <div class="demand-meta-item">
            <svg class="demand-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            126 次浏览
          </div>
        </div>
        <div class="demand-footer">
          <div class="demand-org">
            <div class="demand-avatar">华</div>
            <div class="demand-org-info">
              <span class="demand-org-name">华智制造集团</span>
              <span class="demand-org-type">智能制造</span>
            </div>
          </div>
          <div class="demand-budget">¥ 80-120万</div>
        </div>
      </div>

      <div class="demand-card">
        <div class="demand-header">
          <span class="demand-tag tag-university">高校需求</span>
        </div>
        <div class="demand-title">高通量固态电解质材料的计算筛选与实验验证</div>
        <div class="demand-desc">寻求具有高通量第一性原理计算能力的团队合作，对固态电解质材料进行大规模筛选，并通过实验验证离子电导率。</div>
        <div class="demand-meta">
          <div class="demand-meta-item">
            <svg class="demand-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            新材料
          </div>
          <div class="demand-meta-item">
            <svg class="demand-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            1 天前发布
          </div>
          <div class="demand-meta-item">
            <svg class="demand-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            87 次浏览
          </div>
        </div>
        <div class="demand-footer">
          <div class="demand-org">
            <div class="demand-avatar">清</div>
            <div class="demand-org-info">
              <span class="demand-org-name">清华大学材料学院</span>
              <span class="demand-org-type">材料科学</span>
            </div>
          </div>
          <div class="demand-budget">¥ 30-50万</div>
        </div>
      </div>

      <div class="demand-card">
        <div class="demand-header">
          <span class="demand-tag tag-enterprise">企业需求</span>
        </div>
        <div class="demand-title">mRNA 疫苗递送脂质纳米颗粒工艺优化</div>
        <div class="demand-desc">需要优化 LNP 配方及微流控制备工艺，提升包封率至 ≥ 90%，粒径控制在 60-100nm，批次间稳定性 CV < 5%。</div>
        <div class="demand-meta">
          <div class="demand-meta-item">
            <svg class="demand-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            生物医药
          </div>
          <div class="demand-meta-item">
            <svg class="demand-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            5 天前发布
          </div>
          <div class="demand-meta-item">
            <svg class="demand-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            203 次浏览
          </div>
        </div>
        <div class="demand-footer">
          <div class="demand-org">
            <div class="demand-avatar">瑞</div>
            <div class="demand-org-info">
              <span class="demand-org-name">瑞康生物制药</span>
              <span class="demand-org-type">生物医药</span>
            </div>
          </div>
          <div class="demand-budget">¥ 150-200万</div>
        </div>
      </div>

      <div class="demand-card">
        <div class="demand-header">
          <span class="demand-tag tag-enterprise">企业需求</span>
        </div>
        <div class="demand-title">分布式光伏功率预测与智能调度算法</div>
        <div class="demand-desc">开发基于气象数据和历史发电数据的短期功率预测模型，预测误差 < 8%，并结合储能系统实现智能调度策略。</div>
        <div class="demand-meta">
          <div class="demand-meta-item">
            <svg class="demand-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            新能源
          </div>
          <div class="demand-meta-item">
            <svg class="demand-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            2 天前发布
          </div>
          <div class="demand-meta-item">
            <svg class="demand-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            95 次浏览
          </div>
        </div>
        <div class="demand-footer">
          <div class="demand-org">
            <div class="demand-avatar">国</div>
            <div class="demand-org-info">
              <span class="demand-org-name">国电投新能源科技</span>
              <span class="demand-org-type">清洁能源</span>
            </div>
          </div>
          <div class="demand-budget">¥ 60-90万</div>
        </div>
      </div>

    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="footer-inner">
      <span class="footer-text">© 2026 TechXchange · 技术需求发布平台</span>
      <div class="footer-links">
        <a href="#" class="footer-link">关于我们</a>
        <a href="#" class="footer-link">使用指南</a>
        <a href="#" class="footer-link">联系方式</a>
      </div>
    </div>
  </footer>

  <!-- 发布需求弹窗 -->
  <div class="modal-overlay" id="publishModal">
    <div class="modal">
      <div class="modal-header">
        <h3 class="modal-title">发布技术需求</h3>
        <button class="modal-close" @click="closeModal()">✕</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">需求标题 <span>*</span></label>
          <input type="text" class="form-input" placeholder="简洁描述您的技术需求">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">发布方类型 <span>*</span></label>
            <select class="form-select">
              <option value="">请选择</option>
              <option value="enterprise">企业</option>
              <option value="university">高校/科研院所</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">技术领域 <span>*</span></label>
            <select class="form-select">
              <option value="">请选择领域</option>
              <option>人工智能</option>
              <option>生物医药</option>
              <option>新能源</option>
              <option>智能制造</option>
              <option>新材料</option>
              <option>碳中和</option>
              <option>半导体</option>
              <option>网络安全</option>
              <option>其他</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">需求描述 <span>*</span></label>
          <textarea class="form-textarea" placeholder="详细描述技术背景、核心诉求、期望指标等"></textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">预算范围</label>
            <select class="form-select">
              <option value="">请选择</option>
              <option>10万以内</option>
              <option>10-30万</option>
              <option>30-50万</option>
              <option>50-100万</option>
              <option>100-200万</option>
              <option>200万以上</option>
              <option>面议</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">截止日期</label>
            <input type="date" class="form-input">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">关键词标签</label>
          <div class="form-tags-input" id="tagsContainer">
            <input type="text" class="form-tag-input" placeholder="输入关键词后按回车添加" id="tagInput">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">联系邮箱 <span>*</span></label>
          <input type="email" class="form-input" placeholder="your@company.com">
        </div>
        <button class="form-submit" @click="submitForm()">提交发布</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'

const switchView = (view) => {
  document.querySelectorAll('.view').forEach((el) => el.classList.remove('active'))
  document.getElementById('view-' + view)?.classList.add('active')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const openModal = () => {
  document.getElementById('publishModal')?.classList.add('active')
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  document.getElementById('publishModal')?.classList.remove('active')
  document.body.style.overflow = ''
}

const submitForm = () => {
  alert('需求已提交，审核通过后将自动发布！')
  closeModal()
}

let cleanup = null

onMounted(() => {
  const modal = document.getElementById('publishModal')
  const onOverlay = (e) => { if (e.target === modal) closeModal() }
  modal?.addEventListener('click', onOverlay)

  const tagInput = document.getElementById('tagInput')
  const tagsContainer = document.getElementById('tagsContainer')
  const onTagKeydown = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault()
      const tag = document.createElement('span')
      tag.className = 'form-tag-item'
      tag.innerHTML = `${e.target.value.trim()} <span class="form-tag-remove" onclick="this.parentElement.remove()">×</span>`
      tagsContainer.insertBefore(tag, e.target)
      e.target.value = ''
    }
  }
  tagInput?.addEventListener('keydown', onTagKeydown)

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'page--cgzh-gx-tech-demand-platform-fadeInUp 0.5s ease-out forwards'
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.category-card, .demand-card, .stat-item').forEach((el) => {
    el.style.opacity = '0'
    observer.observe(el)
  })

  cleanup = () => {
    modal?.removeEventListener('click', onOverlay)
    tagInput?.removeEventListener('keydown', onTagKeydown)
    observer.disconnect()
    document.body.style.overflow = ''
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<style scoped>

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .page--cgzh-gx-tech-demand-platform {
      --ice-50: #f0f9ff;
      --ice-100: #e0f2fe;
      --ice-200: #bae6fd;
      --ice-300: #7dd3fc;
      --ice-400: #38bdf8;
      --ice-500: #0ea5e9;
      --ice-600: #0284c7;
      --ice-700: #0369a1;
      --ice-800: #075985;
      --ice-900: #0c4a6e;
      --gray-50: #f8fafc;
      --gray-100: #f1f5f9;
      --gray-200: #e2e8f0;
      --gray-300: #cbd5e1;
      --gray-400: #94a3b8;
      --gray-500: #64748b;
      --gray-600: #475569;
      --gray-700: #334155;
      --gray-800: #1e293b;
      --gray-900: #0f172a;
      --radius: 16px;
      --radius-sm: 10px;
      --radius-xs: 6px;
      --shadow-sm: 0 1px 3px rgba(14, 165, 233, 0.06);
      --shadow-md: 0 4px 20px rgba(14, 165, 233, 0.08);
      --shadow-lg: 0 12px 40px rgba(14, 165, 233, 0.12);
      --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .page--cgzh-gx-tech-demand-platform {
      font-family: 'Inter', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--ice-50);
      color: var(--gray-800);
      line-height: 1.6;
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* ========== 背景装饰 ========== */
    .bg-decoration {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }

    .bg-decoration::before {
      content: '';
      position: absolute;
      top: -30%;
      right: -15%;
      width: 700px;
      height: 700px;
      background: radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, transparent 70%);
      border-radius: 50%;
    }

    .bg-decoration::after {
      content: '';
      position: absolute;
      bottom: -20%;
      left: -10%;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(14, 165, 233, 0.06) 0%, transparent 70%);
      border-radius: 50%;
    }

    /* ========== 导航栏 ========== */
    .navbar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border-bottom: 1px solid rgba(186, 230, 253, 0.4);
    }

    .navbar-inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 32px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }

    .logo-icon {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, var(--ice-400), var(--ice-600));
      border-radius: var(--radius-xs);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 16px;
      letter-spacing: -0.5px;
    }

    .logo-text {
      font-size: 17px;
      font-weight: 600;
      color: var(--gray-800);
      letter-spacing: -0.3px;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .nav-link {
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 400;
      color: var(--gray-600);
      text-decoration: none;
      border-radius: var(--radius-xs);
      transition: var(--transition);
    }

    .nav-link:hover {
      color: var(--ice-600);
      background: var(--ice-100);
    }

    .nav-btn {
      padding: 8px 20px;
      font-size: 14px;
      font-weight: 500;
      color: white;
      background: linear-gradient(135deg, var(--ice-500), var(--ice-600));
      border: none;
      border-radius: var(--radius-xs);
      cursor: pointer;
      transition: var(--transition);
      text-decoration: none;
    }

    .nav-btn:hover {
      background: linear-gradient(135deg, var(--ice-600), var(--ice-700));
      box-shadow: 0 4px 16px rgba(14, 165, 233, 0.3);
    }

    /* ========== Hero ========== */
    .hero {
      position: relative;
      z-index: 1;
      max-width: 1200px;
      margin: 0 auto;
      padding: 80px 32px 40px;
      text-align: center;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 16px;
      background: rgba(14, 165, 233, 0.08);
      border: 1px solid rgba(14, 165, 233, 0.15);
      border-radius: 100px;
      font-size: 13px;
      font-weight: 500;
      color: var(--ice-600);
      margin-bottom: 24px;
    }

    .hero-badge-dot {
      width: 6px;
      height: 6px;
      background: var(--ice-400);
      border-radius: 50%;
      animation: page--cgzh-gx-tech-demand-platform-pulse 2s ease-in-out infinite;
    }

    @keyframes page--cgzh-gx-tech-demand-platform-pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.8); }
    }

    .hero h1 {
      font-size: 48px;
      font-weight: 700;
      letter-spacing: -1.5px;
      line-height: 1.15;
      background: linear-gradient(135deg, var(--gray-900) 0%, var(--ice-700) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 16px;
    }

    .hero p {
      font-size: 17px;
      font-weight: 300;
      color: var(--gray-500);
      max-width: 520px;
      margin: 0 auto 40px;
      letter-spacing: -0.2px;
    }

    /* ========== 搜索栏 ========== */
    .search-bar {
      max-width: 640px;
      margin: 0 auto 24px;
      position: relative;
    }

    .search-bar input {
      width: 100%;
      padding: 16px 56px 16px 20px;
      font-size: 15px;
      font-family: inherit;
      color: var(--gray-800);
      background: white;
      border: 1.5px solid var(--ice-200);
      border-radius: var(--radius);
      outline: none;
      transition: var(--transition);
      box-shadow: var(--shadow-sm);
    }

    .search-bar input::placeholder {
      color: var(--gray-400);
      font-weight: 300;
    }

    .search-bar input:focus {
      border-color: var(--ice-400);
      box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.08), var(--shadow-md);
    }

    .search-bar button {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, var(--ice-500), var(--ice-600));
      border: none;
      border-radius: var(--radius-sm);
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition);
    }

    .search-bar button:hover {
      background: linear-gradient(135deg, var(--ice-600), var(--ice-700));
    }

    .search-tags {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 8px;
    }

    .search-tag {
      padding: 5px 14px;
      font-size: 13px;
      color: var(--gray-500);
      background: white;
      border: 1px solid var(--gray-200);
      border-radius: 100px;
      cursor: pointer;
      transition: var(--transition);
    }

    .search-tag:hover {
      color: var(--ice-600);
      border-color: var(--ice-300);
      background: var(--ice-50);
    }

    /* ========== 统计数据 ========== */
    .stats {
      max-width: 1200px;
      margin: 40px auto 0;
      padding: 0 32px;
      position: relative;
      z-index: 1;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1px;
      background: rgba(186, 230, 253, 0.3);
      border-radius: var(--radius);
      overflow: hidden;
    }

    .stat-item {
      background: white;
      padding: 28px 24px;
      text-align: center;
    }

    .stat-number {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -1px;
      background: linear-gradient(135deg, var(--ice-600), var(--ice-500));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stat-label {
      font-size: 13px;
      color: var(--gray-500);
      margin-top: 4px;
      font-weight: 400;
    }

    /* ========== 分类区域 ========== */
    .section {
      max-width: 1200px;
      margin: 0 auto;
      padding: 64px 32px 0;
      position: relative;
      z-index: 1;
    }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 32px;
    }

    .section-title {
      font-size: 22px;
      font-weight: 600;
      color: var(--gray-800);
      letter-spacing: -0.5px;
    }

    .section-more {
      font-size: 14px;
      color: var(--ice-500);
      text-decoration: none;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: var(--transition);
    }

    .section-more:hover {
      color: var(--ice-700);
      gap: 8px;
    }

    /* ========== 分类卡片 ========== */
    .category-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }

    .category-card {
      background: white;
      border: 1px solid rgba(186, 230, 253, 0.5);
      border-radius: var(--radius);
      padding: 28px 24px;
      cursor: pointer;
      transition: var(--transition);
      position: relative;
      overflow: hidden;
    }

    .category-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--ice-300), var(--ice-500));
      opacity: 0;
      transition: var(--transition);
    }

    .category-card:hover {
      border-color: var(--ice-300);
      box-shadow: var(--shadow-lg);
      transform: translateY(-2px);
    }

    .category-card:hover::before {
      opacity: 1;
    }

    .category-icon {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, var(--ice-50), var(--ice-100));
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      margin-bottom: 16px;
    }

    .category-name {
      font-size: 15px;
      font-weight: 600;
      color: var(--gray-800);
      margin-bottom: 6px;
    }

    .category-desc {
      font-size: 13px;
      color: var(--gray-400);
      font-weight: 300;
      line-height: 1.5;
    }

    .category-count {
      margin-top: 16px;
      font-size: 12px;
      color: var(--ice-500);
      font-weight: 500;
    }

    /* ========== 需求卡片 ========== */
    .demand-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .demand-card {
      background: white;
      border: 1px solid rgba(186, 230, 253, 0.4);
      border-radius: var(--radius);
      padding: 28px;
      transition: var(--transition);
      cursor: pointer;
    }

    .demand-card:hover {
      border-color: var(--ice-300);
      box-shadow: var(--shadow-md);
    }

    .demand-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .demand-tag {
      padding: 4px 10px;
      font-size: 11px;
      font-weight: 500;
      border-radius: 100px;
      white-space: nowrap;
    }

    .tag-enterprise {
      background: rgba(14, 165, 233, 0.08);
      color: var(--ice-600);
    }

    .tag-university {
      background: rgba(99, 102, 241, 0.08);
      color: #6366f1;
    }

    .demand-urgent {
      padding: 4px 10px;
      font-size: 11px;
      font-weight: 500;
      background: rgba(245, 158, 11, 0.08);
      color: #d97706;
      border-radius: 100px;
    }

    .demand-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--gray-800);
      line-height: 1.4;
      margin-bottom: 8px;
      letter-spacing: -0.3px;
    }

    .demand-desc {
      font-size: 14px;
      color: var(--gray-500);
      font-weight: 300;
      line-height: 1.6;
      margin-bottom: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .demand-meta {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .demand-meta-item {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 13px;
      color: var(--gray-400);
    }

    .demand-meta-icon {
      width: 14px;
      height: 14px;
      opacity: 0.6;
    }

    .demand-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid var(--gray-100);
    }

    .demand-org {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .demand-avatar {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, var(--ice-100), var(--ice-200));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 600;
      color: var(--ice-600);
    }

    .demand-org-info {
      display: flex;
      flex-direction: column;
    }

    .demand-org-name {
      font-size: 13px;
      font-weight: 500;
      color: var(--gray-700);
    }

    .demand-org-type {
      font-size: 11px;
      color: var(--gray-400);
    }

    .demand-budget {
      font-size: 15px;
      font-weight: 600;
      color: var(--ice-600);
    }

    /* ========== 发布表单弹窗 ========== */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 23, 42, 0.4);
      backdrop-filter: blur(8px);
      z-index: 1000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 32px;
    }

    .modal-overlay.active {
      display: flex;
    }

    .modal {
      background: white;
      border-radius: 20px;
      width: 100%;
      max-width: 680px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 24px 80px rgba(14, 165, 233, 0.15);
    }

    .modal-header {
      padding: 28px 32px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .modal-title {
      font-size: 20px;
      font-weight: 600;
      color: var(--gray-800);
      letter-spacing: -0.5px;
    }

    .modal-close {
      width: 36px;
      height: 36px;
      background: var(--gray-100);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: var(--gray-500);
      transition: var(--transition);
    }

    .modal-close:hover {
      background: var(--gray-200);
    }

    .modal-body {
      padding: 28px 32px 32px;
    }

    .form-group {
      margin-bottom: 24px;
    }

    .form-label {
      display: block;
      font-size: 13px;
      font-weight: 500;
      color: var(--gray-700);
      margin-bottom: 8px;
    }

    .form-label span {
      color: var(--ice-500);
      margin-left: 2px;
    }

    .form-input,
    .form-select,
    .form-textarea {
      width: 100%;
      padding: 12px 16px;
      font-size: 14px;
      font-family: inherit;
      color: var(--gray-800);
      background: var(--gray-50);
      border: 1.5px solid var(--gray-200);
      border-radius: var(--radius-sm);
      outline: none;
      transition: var(--transition);
    }

    .form-input:focus,
    .form-select:focus,
    .form-textarea:focus {
      border-color: var(--ice-400);
      background: white;
      box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.06);
    }

    .form-textarea {
      min-height: 120px;
      resize: vertical;
      line-height: 1.6;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .form-tags-input {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 10px 14px;
      background: var(--gray-50);
      border: 1.5px solid var(--gray-200);
      border-radius: var(--radius-sm);
      min-height: 44px;
      align-items: center;
      cursor: text;
      transition: var(--transition);
    }

    .form-tags-input:focus-within {
      border-color: var(--ice-400);
      background: white;
      box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.06);
    }

    .form-tag-item {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      background: var(--ice-100);
      color: var(--ice-700);
      border-radius: 100px;
      font-size: 12px;
      font-weight: 500;
    }

    .form-tag-remove {
      cursor: pointer;
      opacity: 0.6;
      font-size: 14px;
    }

    .form-tag-remove:hover {
      opacity: 1;
    }

    .form-tag-input {
      border: none;
      outline: none;
      background: transparent;
      font-size: 14px;
      font-family: inherit;
      color: var(--gray-800);
      flex: 1;
      min-width: 80px;
    }

    .form-tag-input::placeholder {
      color: var(--gray-400);
    }

    .form-submit {
      width: 100%;
      padding: 14px;
      font-size: 15px;
      font-weight: 600;
      font-family: inherit;
      color: white;
      background: linear-gradient(135deg, var(--ice-500), var(--ice-600));
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: var(--transition);
      letter-spacing: -0.2px;
    }

    .form-submit:hover {
      background: linear-gradient(135deg, var(--ice-600), var(--ice-700));
      box-shadow: 0 6px 24px rgba(14, 165, 233, 0.3);
    }

    /* ========== Footer ========== */
    .footer {
      max-width: 1200px;
      margin: 0 auto;
      padding: 64px 32px 40px;
      position: relative;
      z-index: 1;
    }

    .footer-inner {
      border-top: 1px solid var(--ice-200);
      padding-top: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .footer-text {
      font-size: 13px;
      color: var(--gray-400);
      font-weight: 300;
    }

    .footer-links {
      display: flex;
      gap: 24px;
    }

    .footer-link {
      font-size: 13px;
      color: var(--gray-400);
      text-decoration: none;
      transition: var(--transition);
    }

    .footer-link:hover {
      color: var(--ice-500);
    }

    /* ========== 响应式 ========== */
    @media (max-width: 768px) {
      .navbar-inner { padding: 0 20px; }
      .nav-links { display: none; }
      .hero { padding: 48px 20px 24px; }
      .hero h1 { font-size: 32px; }
      .hero p { font-size: 15px; }
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .section { padding: 40px 20px 0; }
      .category-grid { grid-template-columns: repeat(2, 1fr); }
      .demand-grid { grid-template-columns: 1fr; }
      .modal { border-radius: 16px; }
      .modal-body { padding: 20px; }
      .form-row { grid-template-columns: 1fr; }
      .footer-inner { flex-direction: column; gap: 16px; text-align: center; }
    }

    /* ========== 动画 ========== */
    @keyframes page--cgzh-gx-tech-demand-platform-fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-in {
      animation: page--cgzh-gx-tech-demand-platform-fadeInUp 0.6s ease-out forwards;
    }

    .delay-1 { animation-delay: 0.1s; opacity: 0; }
    .delay-2 { animation-delay: 0.2s; opacity: 0; }
    .delay-3 { animation-delay: 0.3s; opacity: 0; }
    .delay-4 { animation-delay: 0.4s; opacity: 0; }
  
</style>
