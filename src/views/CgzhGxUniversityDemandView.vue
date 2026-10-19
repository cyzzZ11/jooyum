<template>
  <div class="page page--cgzh-gx-university-tech-demand">
<!-- 导航 -->
  <nav class="navbar">
    <div class="navbar-inner">
      <a class="logo" @click="switchView('list')">
        <!-- <div class="logo-icon">Tx</div>
        <span class="logo-text">TechXchange</span>
        <span class="logo-badge">高校版</span> -->
      </a>
      <div class="nav-right">
        <a class="nav-link active" id="nav-home" @click="switchView('list')">需求大厅</a>
        <a href="#" class="nav-link">科研团队</a>
        <a href="#" class="nav-link">企业合作</a>
        <a href="#" class="nav-link">我的需求</a>
        <a href="javascript:void(0);" class="nav-publish" @click="openModal()">+ 发布需求</a>
      </div>
    </div>
  </nav>

  <!-- ==================== 视图1：需求列表 ==================== -->
  <div id="view-list" class="view active">

    <!-- Hero（左右布局） -->
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-left">
          <!-- <div class="hero-tag-line">
            <div class="hero-tag-dot"></div>
            高校科研需求中心
          </div> -->
          <h1>高校发布科研需求<br><span style="font-size: 32px;">找到<em>产业合作伙伴</em></span></h1>
          <p class="hero-subtitle">面向高校科研团队与实验室，对接企业真实产业场景与资源，让科研成果走出实验室、落地产业端。</p>
          <div class="hero-actions">
            <!-- <button class="hero-btn-primary">发布科研需求</button> -->
            <button class="hero-btn-secondary">了解合作模式</button>
          </div>
        </div>
        <div class="hero-right">
          <div class="hero-card">
            <div class="hero-card-icon hci-1">🔬</div>
            <div class="hero-card-text">
              <div class="hero-card-num">1,005</div>
              <div class="hero-card-label">高校累计发布需求</div>
            </div>
          </div>
          <div class="hero-card">
            <div class="hero-card-icon hci-2">🤝</div>
            <div class="hero-card-text">
              <div class="hero-card-num">327</div>
              <div class="hero-card-label">产学研合作达成</div>
            </div>
          </div>
          <div class="hero-card">
            <div class="hero-card-icon hci-3">🏢</div>
            <div class="hero-card-text">
              <div class="hero-card-num">486</div>
              <div class="hero-card-label">可对接企业</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 统计条 -->
    <div class="stats-strip">
      <div class="stats-strip-inner">
        <div class="stat-item">
          <div class="stat-num">159</div>
          <div class="stat-label">入驻高校</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">2,340</div>
          <div class="stat-label">科研团队</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">86</div>
          <div class="stat-label">覆盖学科</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">¥4.2亿</div>
          <div class="stat-label">合作总金额</div>
        </div>
      </div>
    </div>

    <!-- 内容 -->
    <div class="content">

      <!-- 学科分类 -->
      <div class="section-head">
        <h2 class="section-title">按学科浏览</h2>
        <div class="section-tabs">
          <button class="section-tab active">全部</button>
          <button class="section-tab">工学</button>
          <button class="section-tab">理学</button>
          <button class="section-tab">医学</button>
          <button class="section-tab">农学</button>
        </div>
      </div>
      <div class="discipline-grid">
        <div class="discipline-card">
          <div class="discipline-top">
            <span class="discipline-icon">🧬</span>
            <span class="discipline-count">186 项</span>
          </div>
          <div class="discipline-name">生物医学工程</div>
          <div class="discipline-desc">基因编辑 · 医疗器械 · 药物递送</div>
        </div>
        <div class="discipline-card">
          <div class="discipline-top">
            <span class="discipline-icon">⚛️</span>
            <span class="discipline-count">142 项</span>
          </div>
          <div class="discipline-name">材料科学与工程</div>
          <div class="discipline-desc">纳米材料 · 复合材料 · 功能涂层</div>
        </div>
        <div class="discipline-card">
          <div class="discipline-top">
            <span class="discipline-icon">🤖</span>
            <span class="discipline-count">268 项</span>
          </div>
          <div class="discipline-name">计算机科学与技术</div>
          <div class="discipline-desc">AI · 大模型 · 分布式系统 · 安全</div>
        </div>
        <div class="discipline-card">
          <div class="discipline-top">
            <span class="discipline-icon">🔋</span>
            <span class="discipline-count">156 项</span>
          </div>
          <div class="discipline-name">能源与动力工程</div>
          <div class="discipline-desc">储能 · 氢能 · 光伏 · 热管理</div>
        </div>
        <div class="discipline-card">
          <div class="discipline-top">
            <span class="discipline-icon">🔩</span>
            <span class="discipline-count">198 项</span>
          </div>
          <div class="discipline-name">机械工程</div>
          <div class="discipline-desc">精密制造 · 机器人 · 微纳加工</div>
        </div>
        <div class="discipline-card">
          <div class="discipline-top">
            <span class="discipline-icon">📡</span>
            <span class="discipline-count">124 项</span>
          </div>
          <div class="discipline-name">电子与信息工程</div>
          <div class="discipline-desc">通信 · 射频 · 集成电路 · 光电</div>
        </div>
        <div class="discipline-card">
          <div class="discipline-top">
            <span class="discipline-icon">🌱</span>
            <span class="discipline-count">89 项</span>
          </div>
          <div class="discipline-name">环境科学与工程</div>
          <div class="discipline-desc">碳捕获 · 水处理 · 土壤修复</div>
        </div>
        <div class="discipline-card">
          <div class="discipline-top">
            <span class="discipline-icon">🧪</span>
            <span class="discipline-count">112 项</span>
          </div>
          <div class="discipline-name">化学工程与技术</div>
          <div class="discipline-desc">催化 · 绿色化工 · 精细化学品</div>
        </div>
      </div>

      <!-- 最新需求 -->
      <div style="margin-top: 48px;">
        <div class="section-head">
          <h2 class="section-title">最新科研需求</h2>
          <div class="section-tabs">
            <button class="section-tab active">全部</button>
            <button class="section-tab">实验室合作</button>
            <button class="section-tab">联合攻关</button>
            <button class="section-tab">人才需求</button>
            <button class="section-tab">基金配套</button>
          </div>
        </div>
      </div>
      <div class="demand-grid">

        <!-- 可跳转第一条 -->
        <div class="demand-card" @click="switchView('detail')">
          <div class="demand-card-top">
            <span class="demand-type-tag type-lab">实验室合作</span>
            <div class="demand-card-meta">
              <span>1 天前</span>
              <span>·</span>
              <span>96 次浏览</span>
            </div>
          </div>
          <div class="demand-card-title">高通量固态电解质材料计算筛选与实验验证平台共建</div>
          <div class="demand-card-desc">寻求具有高通量第一性原理计算能力的企业合作，共同建设固态电解质材料筛选平台，通过计算+实验闭环加速新材料发现。</div>
          <div class="demand-card-tags">
            <span class="demand-kw">第一性原理</span>
            <span class="demand-kw">固态电池</span>
            <span class="demand-kw">高通量计算</span>
          </div>
          <div class="demand-card-footer">
            <div class="demand-dept">
              <div class="demand-dept-avatar">清</div>
              <div class="demand-dept-info">
                <div class="demand-dept-name">清华大学材料学院</div>
                <div class="demand-dept-sub">张明远教授课题组</div>
              </div>
            </div>
            <div class="demand-budget-badge">¥ 30-50万</div>
          </div>
        </div>

        <!-- 其余卡片 -->
        <div class="demand-card">
          <div class="demand-card-top">
            <span class="demand-type-tag type-collab">联合攻关</span>
            <div class="demand-card-meta">
              <span>2 天前</span>
              <span>·</span>
              <span>134 次浏览</span>
            </div>
          </div>
          <div class="demand-card-title">基于多模态大模型的医学影像辅助诊断系统研发</div>
          <div class="demand-card-desc">联合具有医学影像数据标注能力和临床资源的企业，共同研发覆盖 CT/MRI/病理切片的多模态辅助诊断模型，目标取得 NMPA 三类证。</div>
          <div class="demand-card-tags">
            <span class="demand-kw">多模态</span>
            <span class="demand-kw">医学影像</span>
            <span class="demand-kw">NMPA认证</span>
          </div>
          <div class="demand-card-footer">
            <div class="demand-dept">
              <div class="demand-dept-avatar">浙</div>
              <div class="demand-dept-info">
                <div class="demand-dept-name">浙江大学计算机学院</div>
                <div class="demand-dept-sub">李文博副教授团队</div>
              </div>
            </div>
            <div class="demand-budget-badge">¥ 80-120万</div>
          </div>
        </div>

        <div class="demand-card">
          <div class="demand-card-top">
            <span class="demand-type-tag type-talent">人才需求</span>
            <div class="demand-card-meta">
              <span>3 天前</span>
              <span>·</span>
              <span>78 次浏览</span>
            </div>
          </div>
          <div class="demand-card-title">芯片先进封装热管理方向博士后/工程师招聘</div>
          <div class="demand-card-desc">课题组承担国家重点研发计划项目，招聘具有 2.5D/3D 封装热仿真经验的博士后或工程师，熟悉 ANSYS Icepak 或 COMSOL 多物理场仿真。</div>
          <div class="demand-card-tags">
            <span class="demand-kw">先进封装</span>
            <span class="demand-kw">热管理</span>
            <span class="demand-kw">博士后</span>
          </div>
          <div class="demand-card-footer">
            <div class="demand-dept">
              <div class="demand-dept-avatar">上</div>
              <div class="demand-dept-info">
                <div class="demand-dept-name">上海交大微电子学院</div>
                <div class="demand-dept-sub">王建国教授课题组</div>
              </div>
            </div>
            <div class="demand-budget-badge">¥ 35-45万/年</div>
          </div>
        </div>

        <div class="demand-card">
          <div class="demand-card-top">
            <span class="demand-type-tag type-fund">基金配套</span>
            <div class="demand-card-meta">
              <span>5 天前</span>
              <span>·</span>
              <span>112 次浏览</span>
            </div>
          </div>
          <div class="demand-card-title">面向碳中和的 CO₂电催化转化催化剂设计</div>
          <div class="demand-card-desc">已获国家自然科学基金面上项目资助，寻找企业合作伙伴提供配套资金和工业化放大验证条件，共同推进 CO₂电催化催化剂的产业化。</div>
          <div class="demand-card-tags">
            <span class="demand-kw">碳中和</span>
            <span class="demand-kw">电催化</span>
            <span class="demand-kw">NSFC配套</span>
          </div>
          <div class="demand-card-footer">
            <div class="demand-dept">
              <div class="demand-dept-avatar">北</div>
              <div class="demand-dept-info">
                <div class="demand-dept-name">北大化学与分子工程学院</div>
                <div class="demand-dept-sub">陈志伟教授团队</div>
              </div>
            </div>
            <div class="demand-budget-badge">¥ 50-80万</div>
          </div>
        </div>

        <div class="demand-card">
          <div class="demand-card-top">
            <span class="demand-type-tag type-lab">实验室合作</span>
            <div class="demand-card-meta">
              <span>4 天前</span>
              <span>·</span>
              <span>67 次浏览</span>
            </div>
          </div>
          <div class="demand-card-title">面向 L4 自动驾驶的感知-决策一体化模型联合训练</div>
          <div class="demand-card-desc">需要企业提供大规模真实路测数据集和算力支持，联合研发端到端感知决策模型，目标在 nuScenes 基准上达到 SOTA 水平。</div>
          <div class="demand-card-tags">
            <span class="demand-kw">自动驾驶</span>
            <span class="demand-kw">端到端</span>
            <span class="demand-kw">感知决策</span>
          </div>
          <div class="demand-card-footer">
            <div class="demand-dept">
              <div class="demand-dept-avatar">哈</div>
              <div class="demand-dept-info">
                <div class="demand-dept-name">哈工大计算学部</div>
                <div class="demand-dept-sub">赵天宇副教授团队</div>
              </div>
            </div>
            <div class="demand-budget-badge">¥ 100-150万</div>
          </div>
        </div>

        <div class="demand-card">
          <div class="demand-card-top">
            <span class="demand-type-tag type-collab">联合攻关</span>
            <div class="demand-card-meta">
              <span>6 天前</span>
              <span>·</span>
              <span>89 次浏览</span>
            </div>
          </div>
          <div class="demand-card-title">柔性可穿戴传感器的大面积印刷制造工艺开发</div>
          <div class="demand-card-desc">实验室已完成柔性传感器原型验证，现需与具有卷对卷印刷工艺能力的企业合作，解决从实验室样品到量产的工艺放大问题。</div>
          <div class="demand-card-tags">
            <span class="demand-kw">柔性传感器</span>
            <span class="demand-kw">印刷电子</span>
            <span class="demand-kw">工艺放大</span>
          </div>
          <div class="demand-card-footer">
            <div class="demand-dept">
              <div class="demand-dept-avatar">中</div>
              <div class="demand-dept-info">
                <div class="demand-dept-name">中科大微电子学院</div>
                <div class="demand-dept-sub">刘思远教授课题组</div>
              </div>
            </div>
            <div class="demand-budget-badge">¥ 60-90万</div>
          </div>
        </div>

      </div>

      <!-- 合作高校 -->
      <div class="partner-section">
        <div class="section-head">
          <h2 class="section-title">活跃合作高校</h2>
          <a href="#" class="section-more" style="font-size:13px;color:var(--ice-500);text-decoration:none;font-weight:500;">全部高校 →</a>
        </div>
        <div class="partner-grid">
          <div class="partner-card">
            <div class="partner-logo">清</div>
            <div class="partner-name">清华大学</div>
            <div class="partner-count">86 项需求</div>
          </div>
          <div class="partner-card">
            <div class="partner-logo">浙</div>
            <div class="partner-name">浙江大学</div>
            <div class="partner-count">72 项需求</div>
          </div>
          <div class="partner-card">
            <div class="partner-logo">北</div>
            <div class="partner-name">北京大学</div>
            <div class="partner-count">64 项需求</div>
          </div>
          <div class="partner-card">
            <div class="partner-logo">上</div>
            <div class="partner-name">上海交大</div>
            <div class="partner-count">58 项需求</div>
          </div>
          <div class="partner-card">
            <div class="partner-logo">哈</div>
            <div class="partner-name">哈工大</div>
            <div class="partner-count">51 项需求</div>
          </div>
          <div class="partner-card">
            <div class="partner-logo">中</div>
            <div class="partner-name">中国科大</div>
            <div class="partner-count">47 项需求</div>
          </div>
        </div>
      </div>

      <!-- 发布流程 -->
      <div class="workflow-section">
        <div class="section-head">
          <h2 class="section-title">需求发布流程</h2>
        </div>
        <div class="workflow-bar">
          <div class="workflow-step">
            <div class="workflow-num">1</div>
            <div class="workflow-text">
              <div class="workflow-name">提交需求</div>
              <div class="workflow-desc">描述科研诉求与合作方向</div>
            </div>
          </div>
          <div class="workflow-step">
            <div class="workflow-num">2</div>
            <div class="workflow-text">
              <div class="workflow-name">匹配企业</div>
              <div class="workflow-desc">推荐产业场景吻合的企业</div>
            </div>
          </div>
          <div class="workflow-step">
            <div class="workflow-num">3</div>
            <div class="workflow-text">
              <div class="workflow-name">洽谈对接</div>
              <div class="workflow-desc">确认合作模式与资源投入</div>
            </div>
          </div>
          <div class="workflow-step">
            <div class="workflow-num">4</div>
            <div class="workflow-text">
              <div class="workflow-name">签约启动</div>
              <div class="workflow-desc">签订协议启动联合研发</div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-inner">
        <span class="footer-text">© 2026 TechXchange · 高校技术需求发布平台</span>
        <div class="footer-links">
          <a href="#" class="footer-link">使用指南</a>
          <a href="#" class="footer-link">高校入驻</a>
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
        <span>材料科学与工程</span>
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
            <span class="detail-tag tag-discipline">材料科学与工程</span>
            <span class="detail-tag tag-type">实验室合作</span>
            <span class="detail-tag tag-status">征集中</span>
          </div>
          <h1 class="detail-title">高通量固态电解质材料计算筛选与实验验证平台共建</h1>
          <div class="detail-meta">
            <div class="detail-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              清华大学材料学院 · 张明远教授课题组
            </div>
            <div class="detail-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              2026-08-12 发布
            </div>
            <div class="detail-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              96 次浏览
            </div>
            <div class="detail-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              5 家企业意向
            </div>
          </div>
        </div>

        <!-- 项目概述 -->
        <div class="detail-card">
          <div class="detail-card-title">项目概述</div>
          <p>固态电池因其高安全性和高能量密度被视为下一代储能技术的关键方向，而固态电解质材料的发现与优化是核心瓶颈。本课题组已建立基于密度泛函理论（DFT）的材料计算框架，但在高通量计算效率、实验验证闭环和工程化放大方面存在明显短板。希望与具有高通量计算平台、材料合成与表征能力的企业共建联合平台，实现"计算预测 → 定向合成 → 电化学验证"的高效闭环。</p>
        </div>

        <!-- 核心技术指标 -->
        <div class="detail-card">
          <div class="detail-card-title">核心技术指标</div>
          <div class="spec-grid">
            <div class="spec-item">
              <div class="spec-label">高通量筛选通量</div>
              <div class="spec-value">≥ <em>10,000 种/月</em></div>
            </div>
            <div class="spec-item">
              <div class="spec-label">离子电导率预测精度</div>
              <div class="spec-value">误差 < <em>15%</em></div>
            </div>
            <div class="spec-item">
              <div class="spec-label">计算-实验命中率</div>
              <div class="spec-value">≥ <em>30%</em></div>
            </div>
            <div class="spec-item">
              <div class="spec-label">材料体系覆盖</div>
              <div class="spec-value">≥ <em>5 类</em> 固态电解质</div>
            </div>
            <div class="spec-item">
              <div class="spec-label">电化学验证温度</div>
              <div class="spec-value">-20°C ~ <em>80°C</em></div>
            </div>
            <div class="spec-item">
              <div class="spec-label">数据平台容量</div>
              <div class="spec-value">≥ <em>100万</em> 条计算记录</div>
            </div>
          </div>
        </div>

        <!-- 详细需求 -->
        <div class="detail-card">
          <div class="detail-card-title">详细需求清单</div>
          <ul class="requirement-list">
            <li>
              <span class="req-num">1</span>
              <span>合作建设高通量第一性原理计算集群，支持 VASP / Quantum ESPRESSO 等主流 DFT 软件的大规模并行运算</span>
            </li>
            <li>
              <span class="req-num">2</span>
              <span>开发或引进机器学习势函数，加速分子动力学模拟，实现离子迁移路径与活化能的快速评估</span>
            </li>
            <li>
              <span class="req-num">3</span>
              <span>共建材料数据库与数据管理平台，支持计算数据、实验数据、表征结果的统一存储与检索</span>
            </li>
            <li>
              <span class="req-num">4</span>
              <span>建立定向合成验证实验线，具备硫化物 / 氧化物 / 卤化物固态电解质的粉体制备与薄膜沉积能力</span>
            </li>
            <li>
              <span class="req-num">5</span>
              <span>配套电化学测试能力，包括阻抗谱（EIS）、循环伏安（CV）、恒流充放电等全温度区间表征</span>
            </li>
            <li>
              <span class="req-num">6</span>
              <span>开发自动化实验调度系统，实现计算预测 → 实验排程 → 结果反馈的智能闭环迭代</span>
            </li>
          </ul>
        </div>

        <!-- 关键词 -->
        <div class="detail-card">
          <div class="detail-card-title">技术关键词</div>
          <div class="keyword-list">
            <span class="keyword-item">固态电解质</span>
            <span class="keyword-item">高通量计算</span>
            <span class="keyword-item">第一性原理</span>
            <span class="keyword-item">DFT</span>
            <span class="keyword-item">机器学习势</span>
            <span class="keyword-item">离子电导率</span>
            <span class="keyword-item">硫化物</span>
            <span class="keyword-item">氧化物</span>
            <span class="keyword-item">电化学验证</span>
            <span class="keyword-item">数据库</span>
          </div>
        </div>

        <!-- 已响应企业 -->
        <div class="detail-card">
          <div class="detail-card-title">已响应企业（5）</div>
          <div class="partner-list">

            <div class="partner-item">
              <div class="partner-item-header">
                <div class="partner-item-avatar">宁</div>
                <div class="team-info">
                  <div class="partner-item-name">宁德时代新能源科技</div>
                  <div class="partner-item-sub">前沿材料研究中心 · 固态电池事业部</div>
                </div>
                <span class="partner-item-match">匹配度 95%</span>
              </div>
              <div class="partner-item-desc">全球动力电池龙头企业，已布局全固态电池量产路线。拥有 200+ 人材料研发团队，具备完整的高通量计算与实验验证能力，可提供算力资源与中试产线支持。</div>
              <div class="partner-item-tags">
                <span class="partner-item-tag">算力资源</span>
                <span class="partner-item-tag">中试产线</span>
                <span class="partner-item-tag">量产经验</span>
              </div>
            </div>

            <div class="partner-item">
              <div class="partner-item-header">
                <div class="partner-item-avatar">比</div>
                <div class="team-info">
                  <div class="partner-item-name">比亚迪股份有限公司</div>
                  <div class="partner-item-sub">中央研究院 · 先进电池研究所</div>
                </div>
                <span class="partner-item-match">匹配度 91%</span>
              </div>
              <div class="partner-item-desc">新能源汽车与电池双轮驱动，在硫化物固态电解质领域已有 3 年积累。可提供材料合成设备及电化学测试平台，并有成熟的产学研合作模式。</div>
              <div class="partner-item-tags">
                <span class="partner-item-tag">合成设备</span>
                <span class="partner-item-tag">测试平台</span>
                <span class="partner-item-tag">产学研合作</span>
              </div>
            </div>

            <div class="partner-item">
              <div class="partner-item-header">
                <div class="partner-item-avatar">清</div>
                <div class="team-info">
                  <div class="partner-item-name">清陶（昆山）能源发展</div>
                  <div class="partner-item-sub">固态电池研发中心</div>
                </div>
                <span class="partner-item-match">匹配度 87%</span>
              </div>
              <div class="partner-item-desc">专注固态电池产业化的创新企业，由中科院院士团队孵化。在氧化物固态电解质量产方面处于国内领先，可提供产线级放大验证条件。</div>
              <div class="partner-item-tags">
                <span class="partner-item-tag">氧化物体系</span>
                <span class="partner-item-tag">量产验证</span>
                <span class="partner-item-tag">院士团队</span>
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
            <div class="sidebar-budget-label">合作预算</div>
            <div class="sidebar-budget-value">¥ 30-50万</div>
          </div>
          <button class="sidebar-btn-primary">申请合作</button>
          <button class="sidebar-btn-secondary">收藏需求</button>
        </div>

        <!-- 截止日期 -->
        <div class="sidebar-card">
          <div class="deadline-box">
            <div class="deadline-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </div>
            <div>
              <div class="deadline-text">响应截止：2026-10-12</div>
              <div class="deadline-sub">距截止还有 60 天</div>
            </div>
          </div>
        </div>

        <!-- 发布信息 -->
        <div class="sidebar-card">
          <div class="detail-card-title" style="margin-bottom:12px;">发布信息</div>
          <ul class="info-list">
            <li><span class="info-label">需求编号</span><span class="info-value">TXU-20260812-0018</span></li>
            <li><span class="info-label">发布方</span><span class="info-value">清华大学材料学院</span></li>
            <li><span class="info-label">学科领域</span><span class="info-value">材料科学与工程</span></li>
            <li><span class="info-label">合作类型</span><span class="info-value">实验室合作</span></li>
            <li><span class="info-label">项目周期</span><span class="info-value">12-18 个月</span></li>
            <li><span class="info-label">知识产权</span><span class="info-value">双方共有</span></li>
            <li><span class="info-label">资金来源</span><span class="info-value">NSFC + 企业配套</span></li>
          </ul>
        </div>

        <!-- 课题组 -->
        <div class="sidebar-card">
          <div class="detail-card-title" style="margin-bottom:14px;">发布课题组</div>
          <div class="lab-card">
            <div class="lab-logo">清</div>
            <div>
              <div class="lab-name">张明远教授课题组</div>
              <div class="lab-type">清华大学材料学院 · 先进储能材料实验室</div>
            </div>
          </div>
          <div style="margin-top:14px; font-size:13px; color:var(--gray-500); font-weight:300; line-height:1.7;">
            课题组长期从事固态离子学与计算材料学研究，在 Nature Energy、Adv. Mater. 等期刊发表论文 60+ 篇。已建立覆盖 3,000+ 种候选固态电解质材料的计算数据库，与多家头部电池企业保持长期合作。
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
  cleanup = () => {
    modal?.removeEventListener('click', onOverlay)
    document.body.style.overflow = ''
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<style scoped>

    * { margin: 0; padding: 0; box-sizing: border-box; }

    .page--cgzh-gx-university-tech-demand {
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

    .page--cgzh-gx-university-tech-demand {
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
      background: linear-gradient(135deg, var(--ice-400), var(--ice-600));
      border-radius: 8px; display: flex; align-items: center; justify-content: center;
      color: white; font-weight: 700; font-size: 13px;
    }
    .logo-text { font-size: 16px; font-weight: 600; color: var(--gray-800); letter-spacing: -0.3px; }
    .logo-badge {
      font-size: 11px; font-weight: 500; color: var(--ice-700);
      background: linear-gradient(135deg, var(--ice-100), var(--ice-200));
      padding: 2px 8px; border-radius: 100px;
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
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 40%, #bae6fd 100%);
      padding: 64px 32px 48px;
    }
    .hero::before {
      content: ''; position: absolute; top: 10%; right: 5%;
      width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%);
      border-radius: 50%;
    }
    .hero::after {
      content: ''; position: absolute; bottom: -20%; left: 10%;
      width: 300px; height: 300px;
      background: radial-gradient(circle, rgba(125,211,252,0.08) 0%, transparent 70%);
      border-radius: 50%;
    }
    .hero-inner {
      max-width: 1200px; margin: 0 auto; position: relative; z-index: 1;
      display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
    }

    .hero-left {}
    .hero-tag-line {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 6px 16px; margin-bottom: 20px;
      background: rgba(14,165,233,0.06); border: 1px solid rgba(14,165,233,0.12);
      border-radius: 100px; font-size: 13px; font-weight: 500; color: var(--ice-600);
    }
    .hero-tag-dot {
      width: 6px; height: 6px; background: var(--ice-500);
      border-radius: 50%; animation: page--cgzh-gx-university-tech-demand-pulse 2s ease-in-out infinite;
    }
    @keyframes page--cgzh-gx-university-tech-demand-pulse {
      0%,100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.8); }
    }
    .hero h1 {
      font-size: 40px; font-weight: 700; letter-spacing: -1.5px;
      line-height: 1.15; margin-bottom: 14px;
      color: var(--gray-900);
    }
    .hero h1 em {
      font-style: normal;
      background: linear-gradient(135deg, var(--ice-500), var(--ice-700));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .hero-subtitle {
      font-size: 16px; font-weight: 300; color: var(--gray-500);
      line-height: 1.7; margin-bottom: 28px; max-width: 440px;
    }
    .hero-actions { display: flex; gap: 12px; }
    .hero-btn-primary {
      padding: 12px 28px; font-size: 14px; font-weight: 600; font-family: inherit;
      color: white; background: linear-gradient(135deg, var(--ice-500), var(--ice-600));
      border: none; border-radius: var(--radius-sm); cursor: pointer;
      transition: var(--transition);
    }
    .hero-btn-primary:hover { box-shadow: 0 6px 24px rgba(14,165,233,0.3); }
    .hero-btn-secondary {
      padding: 12px 28px; font-size: 14px; font-weight: 500; font-family: inherit;
      color: var(--ice-600); background: white;
      border: 1.5px solid var(--ice-300); border-radius: var(--radius-sm);
      cursor: pointer; transition: var(--transition);
    }
    .hero-btn-secondary:hover { background: var(--ice-50); border-color: var(--ice-400); }

    /* Hero 右侧卡片 */
    .hero-right { display: flex; flex-direction: column; gap: 12px; }
    .hero-card {
      background: white; border-radius: var(--radius); padding: 20px 24px;
      box-shadow: 0 4px 20px rgba(14,165,233,0.06);
      display: flex; align-items: center; gap: 16px;
      transition: var(--transition);
    }
    .hero-card:hover { box-shadow: 0 8px 32px rgba(14,165,233,0.1); }
    .hero-card-icon {
      width: 44px; height: 44px; border-radius: var(--radius-sm); flex-shrink: 0;
      display: flex; align-items: center; justify-content: center; font-size: 20px;
    }
    .hci-1 { background: linear-gradient(135deg, var(--ice-100), var(--ice-200)); }
    .hci-2 { background: linear-gradient(135deg, #ede9fe, #ddd6fe); }
    .hci-3 { background: linear-gradient(135deg, #ecfdf5, #d1fae5); }
    .hero-card-text {}
    .hero-card-num { font-size: 22px; font-weight: 700; color: var(--gray-800); letter-spacing: -0.5px; }
    .hero-card-label { font-size: 13px; color: var(--gray-400); font-weight: 300; }

    /* ========== 统计条 ========== */
    .stats-strip {
      max-width: 1200px; margin: 0 auto; padding: 0 32px;
      position: relative; z-index: 2; margin-top: -16px;
    }
    .stats-strip-inner {
      display: grid; grid-template-columns: repeat(4, 1fr);
      background: white; border-radius: var(--radius);
      box-shadow: 0 4px 24px rgba(14,165,233,0.08);
      overflow: hidden;
    }
    .stat-item {
      padding: 20px 24px; text-align: center;
      border-right: 1px solid var(--gray-100);
    }
    .stat-item:last-child { border-right: none; }
    .stat-num { font-size: 24px; font-weight: 700; letter-spacing: -0.5px; color: var(--ice-600); }
    .stat-label { font-size: 12px; color: var(--gray-400); margin-top: 2px; }

    /* ========== 内容 ========== */
    .content { max-width: 1200px; margin: 0 auto; padding: 56px 32px; }

    .section-head {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 28px;
    }
    .section-title { font-size: 20px; font-weight: 600; color: var(--gray-800); letter-spacing: -0.4px; }
    .section-tabs { display: flex; gap: 4px; }
    .section-tab {
      padding: 6px 16px; font-size: 13px; font-weight: 500;
      color: var(--gray-500); background: transparent;
      border: none; border-radius: 100px; cursor: pointer;
      transition: var(--transition); font-family: inherit;
    }
    .section-tab:hover { color: var(--ice-600); background: var(--ice-50); }
    .section-tab.active { color: var(--ice-600); background: var(--ice-100); }

    /* ========== 学科分类 ========== */
    .discipline-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
    .discipline-card {
      background: white; border: 1px solid rgba(186,230,253,0.4);
      border-radius: var(--radius); padding: 24px;
      cursor: pointer; transition: var(--transition);
      position: relative; overflow: hidden;
    }
    .discipline-card::after {
      content: ''; position: absolute; bottom: 0; left: 0; right: 0;
      height: 3px; background: linear-gradient(90deg, var(--ice-300), var(--ice-500));
      opacity: 0; transition: var(--transition);
    }
    .discipline-card:hover {
      border-color: var(--ice-300); box-shadow: 0 8px 24px rgba(14,165,233,0.1);
      transform: translateY(-2px);
    }
    .discipline-card:hover::after { opacity: 1; }
    .discipline-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
    .discipline-icon { font-size: 24px; }
    .discipline-count {
      font-size: 12px; font-weight: 500; color: var(--ice-500);
      background: var(--ice-50); padding: 2px 8px; border-radius: 100px;
    }
    .discipline-name { font-size: 15px; font-weight: 600; color: var(--gray-800); margin-bottom: 4px; }
    .discipline-desc { font-size: 12px; color: var(--gray-400); font-weight: 300; line-height: 1.5; }

    /* ========== 需求卡片（两列） ========== */
    .demand-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
    .demand-card {
      background: white; border: 1px solid rgba(186,230,253,0.4);
      border-radius: var(--radius); padding: 24px;
      cursor: pointer; transition: var(--transition);
    }
    .demand-card:hover {
      border-color: var(--ice-300); box-shadow: 0 4px 20px rgba(14,165,233,0.08);
    }
    .demand-card-top { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
    .demand-type-tag { padding: 3px 10px; font-size: 11px; font-weight: 500; border-radius: 100px; }
    .type-lab { background: rgba(99,102,241,0.08); color: #6366f1; }
    .type-collab { background: rgba(14,165,233,0.08); color: var(--ice-600); }
    .type-talent { background: rgba(16,185,129,0.08); color: #059669; }
    .type-fund { background: rgba(245,158,11,0.08); color: #d97706; }

    .demand-card-title {
      font-size: 15px; font-weight: 600; color: var(--gray-800);
      margin-bottom: 8px; letter-spacing: -0.2px; line-height: 1.4;
    }
    .demand-card-desc {
      font-size: 13px; color: var(--gray-500); font-weight: 300;
      line-height: 1.6; margin-bottom: 14px;
      display: -webkit-box; -webkit-line-clamp: 2;
      -webkit-box-orient: vertical; overflow: hidden;
    }
    .demand-card-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px; }
    .demand-kw {
      padding: 3px 8px; font-size: 11px; color: var(--gray-500);
      background: var(--gray-100); border-radius: 4px;
    }
    .demand-card-footer {
      display: flex; align-items: center; justify-content: space-between;
      padding-top: 14px; border-top: 1px solid var(--gray-100);
    }
    .demand-dept { display: flex; align-items: center; gap: 8px; }
    .demand-dept-avatar {
      width: 28px; height: 28px; border-radius: 6px;
      background: linear-gradient(135deg, var(--ice-100), var(--ice-200));
      display: flex; align-items: center; justify-content: center;
      font-size: 12px; font-weight: 600; color: var(--ice-600);
    }
    .demand-dept-info {}
    .demand-dept-name { font-size: 13px; font-weight: 500; color: var(--gray-700); }
    .demand-dept-sub { font-size: 11px; color: var(--gray-400); }
    .demand-budget-badge { font-size: 14px; font-weight: 600; color: var(--ice-600); }
    .demand-card-meta { display: flex; gap: 12px; font-size: 12px; color: var(--gray-400); }

    /* ========== 合作高校展示 ========== */
    .partner-section { margin-top: 56px; }
    .partner-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }
    .partner-card {
      background: white; border: 1px solid rgba(186,230,253,0.3);
      border-radius: var(--radius-sm); padding: 18px 12px;
      text-align: center; transition: var(--transition);
    }
    .partner-card:hover { border-color: var(--ice-300); box-shadow: 0 4px 16px rgba(14,165,233,0.08); }
    .partner-logo {
      width: 44px; height: 44px; border-radius: 10px; margin: 0 auto 10px;
      background: linear-gradient(135deg, var(--ice-50), var(--ice-100));
      display: flex; align-items: center; justify-content: center;
      font-size: 18px; font-weight: 700; color: var(--ice-600);
    }
    .partner-name { font-size: 13px; font-weight: 500; color: var(--gray-700); }
    .partner-count { font-size: 11px; color: var(--gray-400); margin-top: 2px; }

    /* ========== 需求发布流程 ========== */
    .workflow-section { margin-top: 56px; }
    .workflow-bar {
      background: linear-gradient(135deg, rgba(14,165,233,0.04), rgba(56,189,248,0.06));
      border: 1px solid rgba(14,165,233,0.1);
      border-radius: var(--radius); padding: 32px 40px;
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
    }
    .workflow-step { display: flex; align-items: flex-start; gap: 14px; }
    .workflow-num {
      width: 36px; height: 36px; flex-shrink: 0;
      background: white; border: 2px solid var(--ice-300);
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      font-size: 14px; font-weight: 700; color: var(--ice-600);
    }
    .workflow-text {}
    .workflow-name { font-size: 14px; font-weight: 600; color: var(--gray-800); margin-bottom: 2px; }
    .workflow-desc { font-size: 12px; color: var(--gray-400); font-weight: 300; }

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
    .tag-discipline { background: var(--ice-100); color: var(--ice-600); }
    .tag-type { background: rgba(99,102,241,0.08); color: #6366f1; }
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

    /* 响应团队/企业 */
    .partner-list { display: flex; flex-direction: column; gap: 12px; }
    .partner-item {
      padding: 20px; background: var(--gray-50);
      border: 1px solid var(--gray-100); border-radius: var(--radius-sm);
      transition: var(--transition);
    }
    .partner-item:hover { border-color: var(--ice-300); background: white; }
    .partner-item-header { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
    .partner-item-avatar {
      width: 40px; height: 40px; border-radius: var(--radius-sm);
      background: linear-gradient(135deg, var(--ice-100), var(--ice-200));
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; font-weight: 700; color: var(--ice-600);
    }
    .partner-item-name { font-size: 14px; font-weight: 600; color: var(--gray-800); }
    .partner-item-sub { font-size: 12px; color: var(--gray-400); }
    .partner-item-match {
      margin-left: auto; padding: 4px 12px;
      font-size: 12px; font-weight: 600; color: #059669;
      background: rgba(16,185,129,0.08); border-radius: 100px;
    }
    .partner-item-desc { font-size: 13px; color: var(--gray-500); font-weight: 300; line-height: 1.6; margin-bottom: 10px; }
    .partner-item-tags { display: flex; gap: 6px; flex-wrap: wrap; }
    .partner-item-tag { padding: 3px 8px; font-size: 11px; color: var(--ice-600); background: var(--ice-50); border-radius: 4px; }

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

    /* 课题组信息 */
    .lab-card {
      display: flex; align-items: center; gap: 14px;
      padding: 16px; background: var(--gray-50);
      border-radius: var(--radius-sm);
    }
    .lab-logo {
      width: 48px; height: 48px; border-radius: var(--radius-sm);
      background: linear-gradient(135deg, var(--ice-100), var(--ice-200));
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; font-weight: 700; color: var(--ice-600);
    }
    .lab-name { font-size: 15px; font-weight: 600; color: var(--gray-800); }
    .lab-type { font-size: 12px; color: var(--gray-400); }

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
      .hero { padding: 40px 20px 32px; }
      .hero-inner { grid-template-columns: 1fr; gap: 28px; }
      .hero h1 { font-size: 28px; }
      .stats-strip-inner { grid-template-columns: repeat(2, 1fr); }
      .stat-item:nth-child(2) { border-right: none; }
      .content { padding: 40px 20px; }
      .discipline-grid { grid-template-columns: repeat(2, 1fr); }
      .demand-grid { grid-template-columns: 1fr; }
      .partner-grid { grid-template-columns: repeat(3, 1fr); }
      .workflow-bar { grid-template-columns: repeat(2, 1fr); }
      .breadcrumb-bar { padding: 16px 20px 0; }
      .detail-layout { grid-template-columns: 1fr; padding: 16px 20px 48px; }
      .detail-header { padding: 24px; }
      .detail-title { font-size: 22px; }
      .detail-card { padding: 20px; }
      .spec-grid { grid-template-columns: 1fr; }
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
    @keyframes page--cgzh-gx-university-tech-demand-fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-in {
      animation: page--cgzh-gx-university-tech-demand-fadeInUp 0.6s ease-out forwards;
    }

    .delay-1 { animation-delay: 0.1s; opacity: 0; }
    .delay-2 { animation-delay: 0.2s; opacity: 0; }
    .delay-3 { animation-delay: 0.3s; opacity: 0; }
    .delay-4 { animation-delay: 0.4s; opacity: 0; }
  
</style>
