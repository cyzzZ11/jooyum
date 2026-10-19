<template>
  <div class="page page--cgzh-qy-enterprise-tech-demand">
<!-- 导航 -->
  <nav class="navbar">
    <div class="navbar-inner">
      <a class="logo" @click="switchView('list')">
        <div class="logo-icon">Tx</div>
        <span class="logo-text">TechXchange</span>
        <span class="logo-badge">企业版</span>
      </a>
      <div class="nav-right">
        <a class="nav-link active" id="nav-home" @click="switchView('list')">需求大厅</a>
        <a href="#" class="nav-link">技术供给</a>
        <a href="#" class="nav-link">合作案例</a>
        <a href="#" class="nav-link">我的需求</a>
        <a class="nav-publish">+ 发布需求</a>
      </div>
    </div>
  </nav>

  <!-- ==================== 视图1：需求列表 ==================== -->
  <div id="view-list" class="view active">

    <!-- Hero -->
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-enterprise-tag">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
          企业技术需求中心
        </div>
        <h1>发布技术需求，精准<em>匹配高校方案</em></h1>
        <p>面向企业真实技术痛点，连接 159 所高校科研团队，让产学研合作高效落地</p>
        <div class="hero-search">
          <input type="text" placeholder="搜索技术需求关键词、行业、企业...">
          <button class="hero-search-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
        </div>
        <div class="hero-tags">
          <a href="#" class="hero-tag">智能制造</a>
          <a href="#" class="hero-tag">新材料</a>
          <a href="#" class="hero-tag">生物医药</a>
          <a href="#" class="hero-tag">人工智能</a>
          <a href="#" class="hero-tag">新能源</a>
          <a href="#" class="hero-tag">半导体</a>
        </div>
      </div>
    </section>

    <!-- 统计 -->
    <div class="stats-bar">
      <div class="stats-inner">
        <div class="stat-item">
          <div class="stat-num">1,842</div>
          <div class="stat-label">企业累计发布</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">876</div>
          <div class="stat-label">已成功对接</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">486</div>
          <div class="stat-label">入驻企业</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">159</div>
          <div class="stat-label">合作高校</div>
        </div>
      </div>
    </div>

    <!-- 内容 -->
    <div class="content">

      <!-- 行业分类 -->
      <div class="section-head">
        <h2 class="section-title">按行业浏览</h2>
        <a href="#" class="section-more">全部行业 →</a>
      </div>
      <div class="industry-grid">
        <div class="industry-card">
          <div class="industry-emoji">🏭</div>
          <div class="industry-name">智能制造</div>
          <div class="industry-count">312 项需求</div>
        </div>
        <div class="industry-card">
          <div class="industry-emoji">💊</div>
          <div class="industry-name">生物医药</div>
          <div class="industry-count">245 项需求</div>
        </div>
        <div class="industry-card">
          <div class="industry-emoji">⚡</div>
          <div class="industry-name">新能源</div>
          <div class="industry-count">189 项需求</div>
        </div>
        <div class="industry-card">
          <div class="industry-emoji">🧪</div>
          <div class="industry-name">新材料</div>
          <div class="industry-count">176 项需求</div>
        </div>
        <div class="industry-card">
          <div class="industry-emoji">💾</div>
          <div class="industry-name">半导体</div>
          <div class="industry-count">221 项需求</div>
        </div>
        <div class="industry-card">
          <div class="industry-emoji">🤖</div>
          <div class="industry-name">人工智能</div>
          <div class="industry-count">368 项需求</div>
        </div>
      </div>

      <!-- 紧急需求 -->
      <div style="margin-top: 48px;">
        <div class="urgent-banner">
          <div class="urgent-left">
            <div class="urgent-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <div class="urgent-text">
              <h4>12 项紧急需求正在寻找解决方案</h4>
              <p>高优先级技术攻关项目，响应截止日期临近</p>
            </div>
          </div>
          <button class="urgent-btn">查看紧急需求</button>
        </div>
      </div>

      <!-- 最新需求 -->
      <div class="section-head">
        <h2 class="section-title">最新企业需求</h2>
        <a href="#" class="section-more">查看全部 →</a>
      </div>
      <div class="demand-list">

        <!-- 可跳转第一条 -->
        <div class="demand-row" @click="switchView('detail')" style="text-decoration:none;color:inherit;">
          <div class="demand-left">
            <div class="demand-row-top">
              <span class="demand-industry-tag">智能制造</span>
              <span class="demand-urgent-tag">紧急</span>
              <span class="demand-time">3 天前</span>
            </div>
            <div class="demand-title">基于大模型的工业质检缺陷检测系统开发</div>
            <div class="demand-desc">需要开发基于视觉大模型的产线缺陷检测方案，要求检测精度 ≥ 99.5%，支持多品类产品快速切换，单帧响应时间 < 200ms，适配现有 MES 系统。</div>
            <div class="demand-tags">
              <span class="demand-kw">计算机视觉</span>
              <span class="demand-kw">大模型</span>
              <span class="demand-kw">工业质检</span>
              <span class="demand-kw">MES集成</span>
            </div>
          </div>
          <div class="demand-right">
            <div class="demand-budget">¥ 80-120万</div>
            <div class="demand-org">
              <div class="demand-org-avatar">华</div>
              <span class="demand-org-name">华智制造集团</span>
            </div>
            <div class="demand-views">126 次浏览 · 8 次响应</div>
          </div>
        </div>

        <!-- 其余条目 -->
        <div class="demand-row">
          <div class="demand-left">
            <div class="demand-row-top">
              <span class="demand-industry-tag">生物医药</span>
              <span class="demand-time">5 天前</span>
            </div>
            <div class="demand-title">mRNA 疫苗递送脂质纳米颗粒工艺优化</div>
            <div class="demand-desc">需要优化 LNP 配方及微流控制备工艺，提升包封率至 ≥ 90%，粒径控制在 60-100nm，批次间稳定性 CV < 5%，并完成小试放大验证。</div>
            <div class="demand-tags">
              <span class="demand-kw">LNP</span>
              <span class="demand-kw">mRNA</span>
              <span class="demand-kw">微流控</span>
              <span class="demand-kw">工艺放大</span>
            </div>
          </div>
          <div class="demand-right">
            <div class="demand-budget">¥ 150-200万</div>
            <div class="demand-org">
              <div class="demand-org-avatar">瑞</div>
              <span class="demand-org-name">瑞康生物制药</span>
            </div>
            <div class="demand-views">203 次浏览 · 12 次响应</div>
          </div>
        </div>

        <div class="demand-row">
          <div class="demand-left">
            <div class="demand-row-top">
              <span class="demand-industry-tag">新能源</span>
              <span class="demand-time">2 天前</span>
            </div>
            <div class="demand-title">分布式光伏功率预测与储能智能调度算法</div>
            <div class="demand-desc">开发基于气象数据和历史发电数据的短期功率预测模型，预测误差 < 8%，结合储能系统实现削峰填谷智能调度策略，降低用电成本 15% 以上。</div>
            <div class="demand-tags">
              <span class="demand-kw">功率预测</span>
              <span class="demand-kw">储能调度</span>
              <span class="demand-kw">光伏</span>
            </div>
          </div>
          <div class="demand-right">
            <div class="demand-budget">¥ 60-90万</div>
            <div class="demand-org">
              <div class="demand-org-avatar">国</div>
              <span class="demand-org-name">国电投新能源科技</span>
            </div>
            <div class="demand-views">95 次浏览 · 5 次响应</div>
          </div>
        </div>

        <div class="demand-row">
          <div class="demand-left">
            <div class="demand-row-top">
              <span class="demand-industry-tag">半导体</span>
              <span class="demand-urgent-tag">紧急</span>
              <span class="demand-time">1 天前</span>
            </div>
            <div class="demand-title">28nm 工艺节点 EDA 时序分析引擎优化</div>
            <div class="demand-desc">现有时序分析工具在大规模设计（>5000万单元）场景下运行时间过长，需优化关键路径算法，目标提速 3-5 倍，同时保持 signoff 精度。</div>
            <div class="demand-tags">
              <span class="demand-kw">EDA</span>
              <span class="demand-kw">时序分析</span>
              <span class="demand-kw">算法优化</span>
              <span class="demand-kw">28nm</span>
            </div>
          </div>
          <div class="demand-right">
            <div class="demand-budget">¥ 200-300万</div>
            <div class="demand-org">
              <div class="demand-org-avatar">芯</div>
              <span class="demand-org-name">芯合微电子</span>
            </div>
            <div class="demand-views">178 次浏览 · 6 次响应</div>
          </div>
        </div>

        <div class="demand-row">
          <div class="demand-left">
            <div class="demand-row-top">
              <span class="demand-industry-tag">新材料</span>
              <span class="demand-time">4 天前</span>
            </div>
            <div class="demand-title">航空级碳纤维复合材料热压罐成型工艺改进</div>
            <div class="demand-desc">现有热压罐成型工艺废品率约 8%，需通过工艺参数优化和在线监测手段将废品率降至 2% 以下，同时保持力学性能满足航空标准。</div>
            <div class="demand-tags">
              <span class="demand-kw">碳纤维</span>
              <span class="demand-kw">热压罐</span>
              <span class="demand-kw">工艺优化</span>
              <span class="demand-kw">航空</span>
            </div>
          </div>
          <div class="demand-right">
            <div class="demand-budget">¥ 100-150万</div>
            <div class="demand-org">
              <div class="demand-org-avatar">航</div>
              <span class="demand-org-name">中航复合材料</span>
            </div>
            <div class="demand-views">142 次浏览 · 9 次响应</div>
          </div>
        </div>

      </div>

      <!-- 合作流程 -->
      <div class="process-section">
        <div class="section-head">
          <h2 class="section-title">企业合作流程</h2>
        </div>
        <div class="process-grid">
          <div class="process-step">
            <div class="process-num">1</div>
            <div class="process-name">发布需求</div>
            <div class="process-desc">描述技术痛点与期望指标</div>
          </div>
          <div class="process-step">
            <div class="process-num">2</div>
            <div class="process-name">方案匹配</div>
            <div class="process-desc">智能推荐对口高校团队</div>
          </div>
          <div class="process-step">
            <div class="process-num">3</div>
            <div class="process-name">对接洽谈</div>
            <div class="process-desc">线上沟通确认合作方案</div>
          </div>
          <div class="process-step">
            <div class="process-num">4</div>
            <div class="process-name">签约落地</div>
            <div class="process-desc">合同签订与项目启动</div>
          </div>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-inner">
        <span class="footer-text">© 2026 TechXchange · 企业技术需求发布平台</span>
        <div class="footer-links">
          <a href="#" class="footer-link">使用指南</a>
          <a href="#" class="footer-link">企业认证</a>
          <a href="#" class="footer-link">联系我们</a>
        </div>
      </div>
    </footer>

  </div>

  <!-- ==================== 视图2：需求详情 ==================== -->
  <div id="view-detail" class="view">

    <!-- 面包屑 -->
    <div class="breadcrumb-bar">
      <div class="breadcrumb">
        <a @click="switchView('list')">需求大厅</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        <span>智能制造</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        <span style="color:var(--gray-600)">项目详情</span>
      </div>
    </div>

    <!-- 主体 -->
    <div class="detail-layout">

      <!-- 左侧 -->
      <div class="detail-main">

        <!-- 标题区 -->
        <div class="detail-header">
          <div class="detail-tags">
            <span class="detail-tag tag-industry">智能制造</span>
            <span class="detail-tag tag-urgent">紧急</span>
            <span class="detail-tag tag-status">征集中</span>
          </div>
          <h1 class="detail-title">基于大模型的工业质检缺陷检测系统开发</h1>
          <div class="detail-meta">
            <div class="detail-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
              华智制造集团
            </div>
            <div class="detail-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              2026-08-10 发布
            </div>
            <div class="detail-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              126 次浏览
            </div>
            <div class="detail-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              8 次响应
            </div>
          </div>
        </div>

        <!-- 项目概述 -->
        <div class="detail-card">
          <div class="detail-card-title">项目概述</div>
          <p>华智制造集团目前在多条产线上依赖人工目检 + 传统机器视觉进行产品缺陷检测，存在漏检率高、换线调试周期长、无法覆盖微小缺陷等问题。希望联合高校科研团队，基于视觉大模型技术开发一套端到端的工业质检缺陷检测系统，实现高精度、高柔性、低延迟的在线检测能力，并与现有 MES 系统深度集成。</p>
        </div>

        <!-- 核心技术指标 -->
        <div class="detail-card">
          <div class="detail-card-title">核心技术指标</div>
          <div class="spec-grid">
            <div class="spec-item">
              <div class="spec-label">缺陷检测精度</div>
              <div class="spec-value">≥ <em>99.5%</em></div>
            </div>
            <div class="spec-item">
              <div class="spec-label">单帧推理延迟</div>
              <div class="spec-value">< <em>200ms</em></div>
            </div>
            <div class="spec-item">
              <div class="spec-label">换线调试时间</div>
              <div class="spec-value">< <em>4小时</em></div>
            </div>
            <div class="spec-item">
              <div class="spec-label">缺陷最小可检尺寸</div>
              <div class="spec-value">≥ <em>0.05mm</em></div>
            </div>
            <div class="spec-item">
              <div class="spec-label">支持品类数量</div>
              <div class="spec-value">≥ <em>20 类</em></div>
            </div>
            <div class="spec-item">
              <div class="spec-label">系统可用率</div>
              <div class="spec-value">≥ <em>99.9%</em></div>
            </div>
          </div>
        </div>

        <!-- 详细需求 -->
        <div class="detail-card">
          <div class="detail-card-title">详细需求清单</div>
          <ul class="requirement-list">
            <li>
              <span class="req-num">1</span>
              <span>基于视觉大模型的缺陷检测算法研发，支持 zero-shot / few-shot 学习范式，实现新产品快速适配</span>
            </li>
            <li>
              <span class="req-num">2</span>
              <span>构建缺陷样本数据管理平台，支持数据标注、增强、版本管理和质量评估</span>
            </li>
            <li>
              <span class="req-num">3</span>
              <span>开发模型轻量化与边缘部署方案，适配产线工控机或边缘 GPU 设备（如 NVIDIA T4/A10）</span>
            </li>
            <li>
              <span class="req-num">4</span>
              <span>设计多品类产品快速切换机制，支持通过配置文件或 UI 界面在 4 小时内完成新品上线</span>
            </li>
            <li>
              <span class="req-num">5</span>
              <span>开发与 MES 系统的双向数据接口，实现检测结果实时回传、统计分析、SPC 预警联动</span>
            </li>
            <li>
              <span class="req-num">6</span>
              <span>提供可视化运维看板，包含检测统计、缺陷分布、模型性能监控、异常告警等功能</span>
            </li>
          </ul>
        </div>

        <!-- 关键词 -->
        <div class="detail-card">
          <div class="detail-card-title">技术关键词</div>
          <div class="keyword-list">
            <span class="keyword-item">计算机视觉</span>
            <span class="keyword-item">视觉大模型</span>
            <span class="keyword-item">工业质检</span>
            <span class="keyword-item">缺陷检测</span>
            <span class="keyword-item">边缘部署</span>
            <span class="keyword-item">MES 集成</span>
            <span class="keyword-item">Few-shot Learning</span>
            <span class="keyword-item">模型轻量化</span>
          </div>
        </div>

        <!-- 已响应团队 -->
        <div class="detail-card">
          <div class="detail-card-title">已响应团队（8）</div>
          <div class="team-list">

            <div class="team-card">
              <div class="team-header">
                <div class="team-avatar">浙</div>
                <div class="team-info">
                  <div class="team-name">浙江大学 · 工业智能实验室</div>
                  <div class="team-sub">周志远教授团队 · 计算机学院</div>
                </div>
                <span class="team-match">匹配度 96%</span>
              </div>
              <div class="team-desc">长期深耕工业视觉检测领域，已为 3 家头部制造企业提供质检 AI 方案。拥有自研的工业视觉预训练模型，在 MVTec AD 基准上达到 SOTA。</div>
              <div class="team-tags">
                <span class="team-tag">工业视觉</span>
                <span class="team-tag">异常检测</span>
                <span class="team-tag">预训练模型</span>
              </div>
            </div>

            <div class="team-card">
              <div class="team-header">
                <div class="team-avatar">华</div>
                <div class="team-info">
                  <div class="team-name">华中科技大学 · 智能制造装备团队</div>
                  <div class="team-sub">李明华教授团队 · 机械学院</div>
                </div>
                <span class="team-match">匹配度 92%</span>
              </div>
              <div class="team-desc">承担国家重点研发计划"智能机器人"专项，在精密零部件表面缺陷检测方面有 6 年积累，已有 3 项相关发明专利转化。</div>
              <div class="team-tags">
                <span class="team-tag">精密检测</span>
                <span class="team-tag">智能制造</span>
                <span class="team-tag">专利转化</span>
              </div>
            </div>

            <div class="team-card">
              <div class="team-header">
                <div class="team-avatar">中</div>
                <div class="team-info">
                  <div class="team-name">中科院自动化所 · 视觉认知实验室</div>
                  <div class="team-sub">王云飞研究员团队</div>
                </div>
                <span class="team-match">匹配度 89%</span>
              </div>
              <div class="team-desc">在多模态大模型与工业应用交叉领域有深入研究，提出的 DiffusionAD 方法被 CVPR 2025 收录，擅长小样本缺陷生成与检测。</div>
              <div class="team-tags">
                <span class="team-tag">多模态大模型</span>
                <span class="team-tag">CVPR</span>
                <span class="team-tag">小样本学习</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- 右侧 -->
      <div class="detail-sidebar">

        <!-- 预算与操作 -->
        <div class="sidebar-card">
          <div class="sidebar-budget">
            <div class="sidebar-budget-label">项目预算</div>
            <div class="sidebar-budget-value">¥ 80-120万</div>
          </div>
          <button class="sidebar-btn-primary">立即响应此需求</button>
          <button class="sidebar-btn-secondary">收藏需求</button>
        </div>

        <!-- 截止日期 -->
        <div class="sidebar-card">
          <div class="deadline-box">
            <div class="deadline-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </div>
            <div>
              <div class="deadline-text">响应截止：2026-09-10</div>
              <div class="deadline-sub">距截止还有 28 天</div>
            </div>
          </div>
        </div>

        <!-- 发布信息 -->
        <div class="sidebar-card">
          <div class="detail-card-title" style="margin-bottom:12px;">发布信息</div>
          <ul class="info-list">
            <li><span class="info-label">需求编号</span><span class="info-value">TXE-20260810-0042</span></li>
            <li><span class="info-label">发布方</span><span class="info-value">华智制造集团</span></li>
            <li><span class="info-label">行业领域</span><span class="info-value">智能制造</span></li>
            <li><span class="info-label">合作方式</span><span class="info-value">联合开发</span></li>
            <li><span class="info-label">项目周期</span><span class="info-value">6-12 个月</span></li>
            <li><span class="info-label">知识产权</span><span class="info-value">双方共有</span></li>
            <li><span class="info-label">优先级</span><span class="info-value" style="color:#d97706;">高（紧急）</span></li>
          </ul>
        </div>

        <!-- 发布企业 -->
        <div class="sidebar-card">
          <div class="detail-card-title" style="margin-bottom:14px;">发布企业</div>
          <div class="company-card">
            <div class="company-logo">华</div>
            <div>
              <div class="company-name">华智制造集团</div>
              <div class="company-type">智能制造 · 上市公司 · 5000+ 人</div>
            </div>
          </div>
          <div style="margin-top:14px; font-size:13px; color:var(--gray-500); font-weight:300; line-height:1.7;">
            华智制造集团成立于 2003 年，专注于精密零部件与装备研发制造，年营收超 80 亿元，已在全国布局 12 个智能制造基地。
          </div>
        </div>

        <!-- 分享 -->
        <div class="sidebar-card" style="text-align:center;">
          <div style="font-size:13px; color:var(--gray-400); margin-bottom:12px;">分享此需求</div>
          <div style="display:flex; justify-content:center; gap:12px;">
            <button style="width:40px;height:40px;border-radius:50%;border:1px solid var(--gray-200);background:white;cursor:pointer;font-size:16px;transition:var(--transition);" @mouseover="(e) => { e.currentTarget.style.borderColor='var(--ice-300)' }" @mouseout="(e) => { e.currentTarget.style.borderColor='var(--gray-200)' }">📋</button>
            <button style="width:40px;height:40px;border-radius:50%;border:1px solid var(--gray-200);background:white;cursor:pointer;font-size:16px;transition:var(--transition);" @mouseover="(e) => { e.currentTarget.style.borderColor='var(--ice-300)' }" @mouseout="(e) => { e.currentTarget.style.borderColor='var(--gray-200)' }">🔗</button>
            <button style="width:40px;height:40px;border-radius:50%;border:1px solid var(--gray-200);background:white;cursor:pointer;font-size:16px;transition:var(--transition);" @mouseover="(e) => { e.currentTarget.style.borderColor='var(--ice-300)' }" @mouseout="(e) => { e.currentTarget.style.borderColor='var(--gray-200)' }">✉️</button>
          </div>
        </div>

      </div>

    </div>

  </div>
  </div>
</template>

<script setup>
const switchView = (view) => {
  document.querySelectorAll('.view').forEach((el) => el.classList.remove('active'))
  document.getElementById('view-' + view)?.classList.add('active')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>

    * { margin: 0; padding: 0; box-sizing: border-box; }

    .page--cgzh-qy-enterprise-tech-demand {
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
      --radius: 14px;
      --radius-sm: 10px;
      --radius-xs: 6px;
      --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .page--cgzh-qy-enterprise-tech-demand {
      font-family: 'Inter', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--ice-50);
      color: var(--gray-800);
      line-height: 1.6;
      min-height: 100vh;
    }

    /* ========== 视图切换 ========== */
    .view { display: none; }
    .view.active { display: block; }

    /* ========== 导航 ========== */
    .navbar {
      position: sticky; top: 0; z-index: 100;
      background: rgba(255,255,255,0.75);
      backdrop-filter: blur(20px) saturate(180%);
      border-bottom: 1px solid rgba(186,230,253,0.4);
    }
    .navbar-inner {
      max-width: 1200px; margin: 0 auto; padding: 0 32px;
      height: 60px; display: flex; align-items: center; justify-content: space-between;
    }
    .logo { display: flex; align-items: center; gap: 10px; text-decoration: none; cursor: pointer; }
    .logo-icon {
      width: 34px; height: 34px;
      background: linear-gradient(135deg, var(--ice-500), var(--ice-700));
      border-radius: 8px; display: flex; align-items: center; justify-content: center;
      color: white; font-weight: 700; font-size: 13px; letter-spacing: -0.5px;
    }
    .logo-text { font-size: 16px; font-weight: 600; color: var(--gray-800); letter-spacing: -0.3px; }
    .logo-badge {
      font-size: 11px; font-weight: 500; color: var(--ice-600);
      background: var(--ice-100); padding: 2px 8px; border-radius: 100px;
    }
    .nav-right { display: flex; align-items: center; gap: 6px; }
    .nav-link {
      padding: 7px 14px; font-size: 14px; color: var(--gray-600);
      text-decoration: none; border-radius: var(--radius-xs); transition: var(--transition);
      cursor: pointer;
    }
    .nav-link:hover { color: var(--ice-600); background: var(--ice-100); }
    .nav-link.active { color: var(--ice-600); background: var(--ice-100); font-weight: 500; }
    .nav-publish {
      padding: 8px 20px; font-size: 13px; font-weight: 600; color: white;
      background: linear-gradient(135deg, var(--ice-500), var(--ice-600));
      border: none; border-radius: var(--radius-xs); cursor: pointer;
      transition: var(--transition); text-decoration: none; margin-left: 8px;
    }
    .nav-publish:hover { box-shadow: 0 4px 16px rgba(14,165,233,0.3); }

    /* ========== Hero ========== */
    .hero {
      position: relative; overflow: hidden;
      background: linear-gradient(165deg, #f0f9ff 0%, #e0f2fe 40%, #bae6fd 100%);
      padding: 72px 32px 56px;
      text-align: center; color: var(--gray-800);
    }
    .hero::before {
      content: ''; position: absolute; top: -40%; right: -20%;
      width: 600px; height: 600px;
      background: radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%);
      border-radius: 50%;
    }
    .hero::after {
      content: ''; position: absolute; bottom: -30%; left: -10%;
      width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%);
      border-radius: 50%;
    }
    .hero-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
    .hero-enterprise-tag {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 6px 18px; margin-bottom: 24px;
      background: rgba(14,165,233,0.08); border: 1px solid rgba(14,165,233,0.15);
      border-radius: 100px; font-size: 13px; font-weight: 500; color: var(--ice-700); letter-spacing: 0.5px;
    }
    .hero-enterprise-tag svg { width: 16px; height: 16px; }
    .hero h1 {
      font-size: 44px; font-weight: 700; letter-spacing: -1.5px;
      line-height: 1.15; margin-bottom: 16px; color: var(--gray-900);
    }
    .hero h1 em {
      font-style: normal;
      background: linear-gradient(135deg, var(--ice-500), var(--ice-700));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .hero p {
      font-size: 17px; font-weight: 300; color: var(--gray-500);
      max-width: 560px; margin: 0 auto 36px; letter-spacing: -0.2px;
    }

    /* Hero 搜索 */
    .hero-search { max-width: 580px; margin: 0 auto 28px; position: relative; }
    .hero-search input {
      width: 100%; padding: 15px 52px 15px 18px;
      font-size: 15px; font-family: inherit; color: var(--gray-800);
      background: white; border: 1.5px solid var(--ice-200); border-radius: var(--radius);
      outline: none; box-shadow: 0 4px 20px rgba(14,165,233,0.06);
      transition: var(--transition);
    }
    .hero-search input::placeholder { color: var(--gray-400); font-weight: 300; }
    .hero-search input:focus { border-color: var(--ice-400); box-shadow: 0 0 0 4px rgba(14,165,233,0.08); }
    .hero-search-btn {
      position: absolute; right: 6px; top: 50%; transform: translateY(-50%);
      width: 38px; height: 38px;
      background: linear-gradient(135deg, var(--ice-500), var(--ice-600));
      border: none; border-radius: var(--radius-sm); color: white;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
    }

    /* Hero 快捷标签 */
    .hero-tags { display: flex; justify-content: center; flex-wrap: wrap; gap: 8px; }
    .hero-tag {
      padding: 5px 14px; font-size: 13px;
      color: var(--gray-600); background: white;
      border: 1px solid var(--gray-200); border-radius: 100px;
      cursor: pointer; transition: var(--transition); text-decoration: none;
    }
    .hero-tag:hover { color: var(--ice-600); border-color: var(--ice-300); background: var(--ice-50); }

    /* ========== 统计条 ========== */
    .stats-bar {
      max-width: 1200px; margin: -28px auto 0; padding: 0 32px;
      position: relative; z-index: 2;
    }
    .stats-inner {
      display: grid; grid-template-columns: repeat(4, 1fr);
      background: white; border-radius: var(--radius);
      box-shadow: 0 4px 24px rgba(14,165,233,0.08);
      overflow: hidden;
    }
    .stat-item {
      padding: 24px; text-align: center;
      border-right: 1px solid var(--gray-100);
    }
    .stat-item:last-child { border-right: none; }
    .stat-num { font-size: 26px; font-weight: 700; letter-spacing: -1px; color: var(--ice-600); }
    .stat-label { font-size: 13px; color: var(--gray-400); margin-top: 2px; }

    /* ========== 内容区 ========== */
    .content { max-width: 1200px; margin: 0 auto; padding: 56px 32px; }

    .section-head {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 28px;
    }
    .section-title { font-size: 20px; font-weight: 600; color: var(--gray-800); letter-spacing: -0.4px; }
    .section-more { font-size: 13px; color: var(--ice-500); text-decoration: none; font-weight: 500; transition: var(--transition); }
    .section-more:hover { color: var(--ice-700); }

    /* ========== 企业行业分类 ========== */
    .industry-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }
    .industry-card {
      background: white; border: 1px solid rgba(186,230,253,0.4);
      border-radius: var(--radius); padding: 20px 16px;
      text-align: center; cursor: pointer; transition: var(--transition);
    }
    .industry-card:hover {
      border-color: var(--ice-300); box-shadow: 0 8px 24px rgba(14,165,233,0.1);
      transform: translateY(-2px);
    }
    .industry-emoji { font-size: 28px; margin-bottom: 10px; }
    .industry-name { font-size: 14px; font-weight: 600; color: var(--gray-800); margin-bottom: 4px; }
    .industry-count { font-size: 12px; color: var(--gray-400); }

    /* ========== 紧急需求横幅 ========== */
    .urgent-banner {
      background: linear-gradient(135deg, rgba(14,165,233,0.06), rgba(56,189,248,0.04));
      border: 1px solid rgba(14,165,233,0.12);
      border-radius: var(--radius); padding: 20px 28px;
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 48px;
    }
    .urgent-left { display: flex; align-items: center; gap: 14px; }
    .urgent-icon {
      width: 40px; height: 40px; border-radius: 10px;
      background: linear-gradient(135deg, var(--ice-400), var(--ice-600));
      display: flex; align-items: center; justify-content: center;
    }
    .urgent-icon svg { width: 20px; height: 20px; color: white; }
    .urgent-text h4 { font-size: 15px; font-weight: 600; color: var(--gray-800); }
    .urgent-text p { font-size: 13px; color: var(--gray-500); font-weight: 300; }
    .urgent-btn {
      padding: 9px 20px; font-size: 13px; font-weight: 500;
      color: var(--ice-600); background: white;
      border: 1.5px solid var(--ice-300); border-radius: var(--radius-xs);
      cursor: pointer; transition: var(--transition); white-space: nowrap;
    }
    .urgent-btn:hover { background: var(--ice-50); border-color: var(--ice-400); }

    /* ========== 需求列表 ========== */
    .demand-list { display: flex; flex-direction: column; gap: 12px; }

    .demand-row {
      background: white; border: 1px solid rgba(186,230,253,0.4);
      border-radius: var(--radius); padding: 24px 28px;
      display: grid; grid-template-columns: 1fr auto;
      gap: 20px; align-items: center;
      cursor: pointer; transition: var(--transition);
    }
    .demand-row:hover {
      border-color: var(--ice-300); box-shadow: 0 4px 20px rgba(14,165,233,0.08);
    }

    .demand-row-top { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
    .demand-industry-tag {
      padding: 3px 10px; font-size: 11px; font-weight: 500;
      background: var(--ice-100); color: var(--ice-600); border-radius: 100px;
    }
    .demand-urgent-tag {
      padding: 3px 10px; font-size: 11px; font-weight: 500;
      background: rgba(245,158,11,0.08); color: #d97706; border-radius: 100px;
    }
    .demand-time { font-size: 12px; color: var(--gray-400); margin-left: auto; }
    .demand-title {
      font-size: 16px; font-weight: 600; color: var(--gray-800);
      margin-bottom: 6px; letter-spacing: -0.3px;
    }
    .demand-desc {
      font-size: 13px; color: var(--gray-500); font-weight: 300;
      line-height: 1.6; margin-bottom: 12px;
      display: -webkit-box; -webkit-line-clamp: 2;
      -webkit-box-orient: vertical; overflow: hidden;
    }
    .demand-tags { display: flex; gap: 6px; flex-wrap: wrap; }
    .demand-kw {
      padding: 3px 8px; font-size: 11px; color: var(--gray-500);
      background: var(--gray-100); border-radius: 4px;
    }

    .demand-right { text-align: right; min-width: 140px; }
    .demand-budget {
      font-size: 20px; font-weight: 700; color: var(--ice-600);
      letter-spacing: -0.5px; margin-bottom: 8px;
    }
    .demand-org { display: flex; align-items: center; gap: 8px; justify-content: flex-end; }
    .demand-org-avatar {
      width: 28px; height: 28px; border-radius: 6px;
      background: linear-gradient(135deg, var(--ice-100), var(--ice-200));
      display: flex; align-items: center; justify-content: center;
      font-size: 12px; font-weight: 600; color: var(--ice-600);
    }
    .demand-org-name { font-size: 13px; color: var(--gray-600); font-weight: 500; }
    .demand-views { font-size: 12px; color: var(--gray-400); margin-top: 6px; }

    /* ========== 合作流程 ========== */
    .process-section { margin-top: 56px; }
    .process-grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
      position: relative;
    }
    .process-grid::before {
      content: ''; position: absolute; top: 28px; left: 12.5%; right: 12.5%;
      height: 2px; background: linear-gradient(90deg, var(--ice-200), var(--ice-400), var(--ice-200));
    }
    .process-step { text-align: center; position: relative; }
    .process-num {
      width: 56px; height: 56px; margin: 0 auto 16px;
      background: white; border: 2px solid var(--ice-300);
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      font-size: 18px; font-weight: 700; color: var(--ice-600);
      position: relative; z-index: 1;
    }
    .process-name { font-size: 14px; font-weight: 600; color: var(--gray-800); margin-bottom: 4px; }
    .process-desc { font-size: 12px; color: var(--gray-400); font-weight: 300; }

    /* ========== Footer ========== */
    .footer { max-width: 1200px; margin: 0 auto; padding: 40px 32px 32px; }
    .footer-inner {
      border-top: 1px solid var(--ice-200); padding-top: 24px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .footer-text { font-size: 13px; color: var(--gray-400); font-weight: 300; }
    .footer-links { display: flex; gap: 20px; }
    .footer-link {
      font-size: 13px; color: var(--gray-400); text-decoration: none;
      transition: var(--transition);
    }
    .footer-link:hover { color: var(--ice-500); }

    /* ========== 详情页样式 ========== */
    /* 面包屑 */
    .breadcrumb-bar { max-width: 1200px; margin: 0 auto; padding: 20px 32px 0; }
    .breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--gray-400); }
    .breadcrumb a { color: var(--ice-500); text-decoration: none; transition: var(--transition); cursor: pointer; }
    .breadcrumb a:hover { color: var(--ice-700); }
    .breadcrumb svg { width: 14px; height: 14px; opacity: 0.5; }

    /* 主体布局 */
    .detail-layout {
      max-width: 1200px; margin: 0 auto; padding: 24px 32px 64px;
      display: grid; grid-template-columns: 1fr 360px; gap: 24px;
      align-items: start;
    }

    /* 标题区 */
    .detail-header {
      background: white; border: 1px solid rgba(186,230,253,0.4);
      border-radius: var(--radius); padding: 32px; margin-bottom: 16px;
    }
    .detail-tags { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
    .detail-tag { padding: 4px 12px; font-size: 12px; font-weight: 500; border-radius: 100px; }
    .tag-industry { background: var(--ice-100); color: var(--ice-600); }
    .tag-urgent { background: rgba(245,158,11,0.08); color: #d97706; }
    .tag-status { background: rgba(16,185,129,0.08); color: #059669; }
    .detail-title {
      font-size: 26px; font-weight: 700; color: var(--gray-900);
      letter-spacing: -0.8px; line-height: 1.3; margin-bottom: 12px;
    }
    .detail-meta { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; font-size: 13px; color: var(--gray-400); }
    .detail-meta-item { display: flex; align-items: center; gap: 5px; }
    .detail-meta-item svg { width: 14px; height: 14px; opacity: 0.6; }

    /* 通用区块卡片 */
    .detail-card {
      background: white; border: 1px solid rgba(186,230,253,0.4);
      border-radius: var(--radius); padding: 28px 32px; margin-bottom: 16px;
    }
    .detail-card-title {
      font-size: 16px; font-weight: 600; color: var(--gray-800);
      margin-bottom: 16px; letter-spacing: -0.3px;
      display: flex; align-items: center; gap: 8px;
    }
    .detail-card-title::before {
      content: ''; width: 3px; height: 16px;
      background: linear-gradient(180deg, var(--ice-400), var(--ice-600));
      border-radius: 2px;
    }
    .detail-card p { font-size: 14px; color: var(--gray-600); font-weight: 300; line-height: 1.8; }

    /* 技术指标表格 */
    .spec-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .spec-item {
      padding: 16px; background: var(--gray-50);
      border-radius: var(--radius-sm); border: 1px solid var(--gray-100);
    }
    .spec-label { font-size: 12px; color: var(--gray-400); margin-bottom: 4px; font-weight: 400; }
    .spec-value { font-size: 15px; font-weight: 600; color: var(--gray-800); }
    .spec-value em { font-style: normal; color: var(--ice-600); }

    /* 需求清单 */
    .requirement-list { list-style: none; }
    .requirement-list li {
      padding: 12px 0; border-bottom: 1px solid var(--gray-100);
      display: flex; align-items: flex-start; gap: 10px;
      font-size: 14px; color: var(--gray-600); font-weight: 300; line-height: 1.6;
    }
    .requirement-list li:last-child { border-bottom: none; }
    .req-num {
      width: 22px; height: 22px; flex-shrink: 0;
      background: var(--ice-100); color: var(--ice-600);
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      font-size: 11px; font-weight: 600; margin-top: 1px;
    }

    /* 关键词 */
    .keyword-list { display: flex; gap: 8px; flex-wrap: wrap; }
    .keyword-item {
      padding: 6px 14px; font-size: 13px; color: var(--gray-600);
      background: var(--gray-50); border: 1px solid var(--gray-200);
      border-radius: 100px;
    }

    /* 响应团队 */
    .team-list { display: flex; flex-direction: column; gap: 12px; }
    .team-card {
      padding: 20px; background: var(--gray-50);
      border: 1px solid var(--gray-100); border-radius: var(--radius-sm);
      transition: var(--transition);
    }
    .team-card:hover { border-color: var(--ice-300); background: white; }
    .team-header { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
    .team-avatar {
      width: 40px; height: 40px; border-radius: var(--radius-sm);
      background: linear-gradient(135deg, var(--ice-100), var(--ice-200));
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; font-weight: 700; color: var(--ice-600);
    }
    .team-name { font-size: 14px; font-weight: 600; color: var(--gray-800); }
    .team-sub { font-size: 12px; color: var(--gray-400); }
    .team-match {
      margin-left: auto; padding: 4px 12px;
      font-size: 12px; font-weight: 600; color: #059669;
      background: rgba(16,185,129,0.08); border-radius: 100px;
    }
    .team-desc { font-size: 13px; color: var(--gray-500); font-weight: 300; line-height: 1.6; margin-bottom: 10px; }
    .team-tags { display: flex; gap: 6px; flex-wrap: wrap; }
    .team-tag { padding: 3px 8px; font-size: 11px; color: var(--ice-600); background: var(--ice-50); border-radius: 4px; }

    /* 右侧边栏 */
    .sidebar-card {
      background: white; border: 1px solid rgba(186,230,253,0.4);
      border-radius: var(--radius); padding: 24px; margin-bottom: 16px;
    }
    .sidebar-budget {
      text-align: center; padding-bottom: 20px;
      border-bottom: 1px solid var(--gray-100); margin-bottom: 20px;
    }
    .sidebar-budget-label { font-size: 13px; color: var(--gray-400); margin-bottom: 4px; }
    .sidebar-budget-value {
      font-size: 32px; font-weight: 700; letter-spacing: -1px;
      background: linear-gradient(135deg, var(--ice-500), var(--ice-700));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .sidebar-btn-primary {
      display: block; width: 100%; padding: 13px;
      font-size: 15px; font-weight: 600; font-family: inherit;
      color: white; text-align: center;
      background: linear-gradient(135deg, var(--ice-500), var(--ice-600));
      border: none; border-radius: var(--radius-sm); cursor: pointer;
      transition: var(--transition); margin-bottom: 10px;
    }
    .sidebar-btn-primary:hover { box-shadow: 0 6px 24px rgba(14,165,233,0.3); }
    .sidebar-btn-secondary {
      display: block; width: 100%; padding: 12px;
      font-size: 14px; font-weight: 500; font-family: inherit;
      color: var(--ice-600); text-align: center;
      background: white; border: 1.5px solid var(--ice-300);
      border-radius: var(--radius-sm); cursor: pointer;
      transition: var(--transition);
    }
    .sidebar-btn-secondary:hover { background: var(--ice-50); }

    /* 发布信息 */
    .info-list { list-style: none; }
    .info-list li {
      display: flex; justify-content: space-between; align-items: center;
      padding: 10px 0; border-bottom: 1px solid var(--gray-100);
      font-size: 13px;
    }
    .info-list li:last-child { border-bottom: none; }
    .info-label { color: var(--gray-400); }
    .info-value { color: var(--gray-700); font-weight: 500; }

    /* 企业信息 */
    .company-card {
      display: flex; align-items: center; gap: 14px;
      padding: 16px; background: var(--gray-50);
      border-radius: var(--radius-sm);
    }
    .company-logo {
      width: 48px; height: 48px; border-radius: var(--radius-sm);
      background: linear-gradient(135deg, var(--ice-100), var(--ice-200));
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; font-weight: 700; color: var(--ice-600);
    }
    .company-name { font-size: 15px; font-weight: 600; color: var(--gray-800); }
    .company-type { font-size: 12px; color: var(--gray-400); }

    /* 截止日期提醒 */
    .deadline-box {
      display: flex; align-items: center; gap: 12px;
      padding: 14px 16px;
      background: rgba(245,158,11,0.05); border: 1px solid rgba(245,158,11,0.15);
      border-radius: var(--radius-sm);
    }
    .deadline-icon {
      width: 32px; height: 32px; flex-shrink: 0;
      background: rgba(245,158,11,0.1); border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
    }
    .deadline-icon svg { width: 16px; height: 16px; color: #d97706; }
    .deadline-text { font-size: 13px; color: #92400e; font-weight: 500; }
    .deadline-sub { font-size: 12px; color: #b45309; font-weight: 300; }

    /* ========== 响应式 ========== */
    @media (max-width: 768px) {
      .navbar-inner { padding: 0 20px; }
      .nav-link { display: none; }
      .hero { padding: 48px 20px 40px; }
      .hero h1 { font-size: 28px; }
      .stats-inner { grid-template-columns: repeat(2, 1fr); }
      .stat-item:nth-child(2) { border-right: none; }
      .content { padding: 40px 20px; }
      .industry-grid { grid-template-columns: repeat(3, 1fr); }
      .demand-row { grid-template-columns: 1fr; }
      .demand-right { text-align: left; display: flex; align-items: center; gap: 16px; }
      .process-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
      .process-grid::before { display: none; }
      .breadcrumb-bar { padding: 16px 20px 0; }
      .detail-layout { grid-template-columns: 1fr; padding: 16px 20px 48px; }
      .detail-header { padding: 24px; }
      .detail-title { font-size: 22px; }
      .detail-card { padding: 20px; }
      .spec-grid { grid-template-columns: 1fr; }
    }
  
</style>
