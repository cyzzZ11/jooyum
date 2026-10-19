<template>
  <div class="page page--sjqrcfw">
<!-- Navigation -->
<nav class="nav" id="topNav">
  <div class="nav-inner">
    <div class="nav-logo">
      <svg aria-hidden="true" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="13" fill="#1976D2"/>
        <path d="M14 6L20 10V18L14 22L8 18V10L14 6Z" fill="white" opacity="0.9"/>
        <path d="M14 9L18 12V17L14 20L10 17V12L14 9Z" fill="#1976D2"/>
        <circle cx="14" cy="14" r="3" fill="white"/>
      </svg>
      松江区人才服务网
    </div>
    <button class="mobile-menu-btn" @click="toggleNavLinks" aria-label="菜单">
      <svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
    </button>
    <ul class="nav-links" id="navLinks">
      <li><a href="#services" class="active">服务概览</a></li>
      <li><a href="#housing">安居保障</a></li>
      <li><a href="#employment">就业创业</a></li>
      <li><a href="#talent">人才培育</a></li>
      <li><a href="#contact">联系我们</a></li>
      <li class="nav-cta"><a href="https://www.songjiang.gov.cn/" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding:8px 18px; font-size:13px;">松江区政府网</a></li>
    </ul>
  </div>
</nav>

<!-- Hero -->
<section class="hero" id="home">
  <div class="hero-bg-pattern"></div>
  <div class="hero-content">
    <!-- <div class="hero-badge">
      <svg aria-hidden="true" viewBox="0 0 12 12" fill="currentColor"><circle cx="6" cy="6" r="6"/></svg>
      长三角 G60 科创走廊策源地 · 上海市松江区
    </div> -->
    <h1 class="hero-title">上海松江<span style="color:#7DD3FC">人才服务</span><br><span style="font-size: 32px;">一站式综合平台</span></h1>
    <p class="hero-subtitle">聚焦"2+4"现代化产业体系，覆盖人才安居、就业创业、技能培育、职称评审、落户办理等全周期服务，助力每一位人才在松江成就事业、安居乐业。</p>
    <div class="hero-actions">
      <a href="#services" class="hero-btn-main">
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1v14M1 8h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        浏览服务
      </a>
      <a href="https://www.songjiang.gov.cn/" target="_blank" rel="noopener noreferrer" class="hero-btn-ghost">
        政策文件
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
    </div>
    <div class="hero-stats">
      <div class="hero-stat">
        <div class="hero-stat-value">2,638<span style="font-size:18px;font-weight:600">家</span></div>
        <div class="hero-stat-label">高新技术企业总数</div>
      </div>
      <div class="hero-stat">
        <div class="hero-stat-value">559<span style="font-size:18px;font-weight:600">名</span></div>
        <div class="hero-stat-label">引进院士专家</div>
      </div>
      <div class="hero-stat">
        <div class="hero-stat-value">115<span style="font-size:18px;font-weight:600">家</span></div>
        <div class="hero-stat-label">院士（专家）工作站</div>
      </div>
      <div class="hero-stat">
        <div class="hero-stat-value">1,539<span style="font-size:18px;font-weight:600">人</span></div>
        <div class="hero-stat-label">入选市级以上人才计划</div>
      </div>
    </div>
  </div>
</section>

<main>

<!-- Services overview -->
<section class="section section-alt" id="services">
  <div class="section-inner">
    <div class="section-header">
      <div class="section-tag">
        <svg aria-hidden="true" viewBox="0 0 12 12" fill="currentColor"><circle cx="6" cy="6" r="6"/></svg>
        六大服务体系
      </div>
      <h2 class="section-title">全方位人才服务生态</h2>
      <p class="section-desc">从"来松江"到"留松江"，全周期陪伴式人才服务，覆盖安居、求职、创业、培育、落户各环节。</p>
    </div>
    <div class="feature-grid">
      <div class="feature-card">
        <div class="feature-icon">
          <svg aria-hidden="true" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 13,12 13,22"/></svg>
        </div>
        <div class="feature-card-title">人才安居保障</div>
        <div class="feature-card-desc">新就业青年租房补贴最高2500元/月，"茸易居"品牌人才公寓，5万套租赁房源统筹配置，实物配租覆盖全市三圈层。</div>
        <span class="feature-card-tag">补贴最高2500元/月</span>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <svg aria-hidden="true" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
        </div>
        <div class="feature-card-title">就业创业扶持</div>
        <div class="feature-card-desc">应届毕业生补贴、就业困难补贴、大学生职前研习坊、创业大赛落地补贴最高40万元，全链条激活创业动能。</div>
        <span class="feature-card-tag">创业补贴最高40万元</span>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <svg aria-hidden="true" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M11 7v4l3 3"/></svg>
        </div>
        <div class="feature-card-title">技能人才培养</div>
        <div class="feature-card-desc">首席技师资助1000元/月·人，技能大师工作室最高20万元资助，高级工及以上获证补贴1000—4000元/人。</div>
        <span class="feature-card-tag">首席技师1000元/月</span>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <svg aria-hidden="true" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
        </div>
        <div class="feature-card-title">高层次人才引聚</div>
        <div class="feature-card-desc">G60人才服务包、青年创新英才计划（月津贴1600元，三年期）、全球引才服务矩阵、海外3个引才联络站。</div>
        <span class="feature-card-tag">青年英才月津贴1600元</span>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <svg aria-hidden="true" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>
        </div>
        <div class="feature-card-title">专业技术人才培育</div>
        <div class="feature-card-desc">职称牵引工程补贴2000元、工程师创新培育实践工作站年补贴3万元、卓越工程师继续教育课程每场最高2万元补贴。</div>
        <span class="feature-card-tag">工程师站年度补贴3万</span>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <svg aria-hidden="true" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>
        </div>
        <div class="feature-card-title">人才落户服务</div>
        <div class="feature-card-desc">人才引进落户全流程指引，重点产业紧缺人才绿色通道，社保合规与实际用工核查一站式解答。</div>
        <span class="feature-card-tag">一站式落户指引</span>
      </div>
    </div>
  </div>
</section>

<!-- Stats bar -->
<div class="stats-bar">
  <div class="stats-grid">
    <div class="stat-item">
      <div class="stat-value">6.4%</div>
      <div class="stat-label">研发经费占GDP比重</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">160<span style="font-size:16px">亿</span></div>
      <div class="stat-label">技术合同年成交额</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">5<span style="font-size:16px">万+</span></div>
      <div class="stat-label">人才安居租赁房源（套）</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">1,000<span style="font-size:16px">名/年</span></div>
      <div class="stat-label">计划引进高层次人才</div>
    </div>
  </div>
</div>

<!-- Housing -->
<section class="section" id="housing">
  <div class="section-inner">
    <div class="section-header">
      <div class="section-tag">
        <svg aria-hidden="true" viewBox="0 0 12 12" fill="currentColor"><circle cx="6" cy="6" r="6"/></svg>
        人才安居保障
      </div>
      <h2 class="section-title">新就业青年租房优惠</h2>
      <p class="section-desc">2026年1月1日起施行的最新政策，面向35周岁以下、在松江区用人单位就业、在沪无自有住房的新就业青年，最高享受2500元/月实物配租补贴，最长2年。</p>
    </div>
    <div class="housing-grid">
      <div class="housing-main">
        <div class="housing-badge">
          <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="5"/></svg>
          2026年最新政策 · 三圈层差异化补贴
        </div>
        <h3>分区域补贴标准</h3>
        <p>按申请人缴保单位注册地核定，房源位置不同补贴比例和上限有所差异，第二年退坡50%。</p>
        <div class="housing-zones">
          <div class="housing-zone">
            <span class="housing-zone-name">外郊线内</span>
            <div class="housing-zone-info">
              <span>补贴 ≤40%</span>
              <span class="housing-zone-sub">S20高速以内 · 上限2500元/月</span>
            </div>
          </div>
          <div class="housing-zone">
            <span class="housing-zone-name">外郊环间</span>
            <div class="housing-zone-info">
              <span>补贴 ≤50%</span>
              <span class="housing-zone-sub">S20—G1503间 · 上限2000元/月</span>
            </div>
          </div>
          <div class="housing-zone">
            <span class="housing-zone-name">郊环线外</span>
            <div class="housing-zone-info">
              <span>补贴 ≤60%</span>
              <span class="housing-zone-sub">G1503高速以外 · 上限1500元/月</span>
            </div>
          </div>
        </div>
      </div>
      <div class="housing-sidelist">
        <div class="housing-side-item">
          <h3>申请基本条件</h3>
          <p>35周岁以下·本科及以上学历·毕业不满3年·在沪无自有住房·社保缴保基数不超过上年度平均工资2倍·2026年1月1日后新就业</p>
          <span class="tag">随申办"我要租房"全程线上办理</span>
        </div>
        <div class="housing-side-item">
          <h3>松江应届毕业生专项</h3>
          <p>松江大学城、松江高职院校应届毕业生，缴保单位注册地在松江区，符合基本条件1、2、3、5即可申请，不受学历毕业年限限制。</p>
          <span class="tag">线下专窗：茸梅路139号</span>
        </div>
        <div class="housing-side-item">
          <h3>高技能青年通道</h3>
          <p>获得技师及以上职业技能等级证书，或代表松江区参加世界级/国家级/市级职业技能竞赛获奖的高技能青年，参照专项申请。</p>
          <span class="tag">咨询：021-67743703</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Employment & Entrepreneurship Policies -->
<section class="policy-section section" id="employment">
  <div class="section-inner">
    <div class="section-header">
      <div class="section-tag">
        <svg aria-hidden="true" viewBox="0 0 12 12" fill="currentColor"><circle cx="6" cy="6" r="6"/></svg>
        就业创业扶持
      </div>
      <h2 class="section-title">惠企稳就业 · 精准施策</h2>
      <p class="section-desc">2026年1月1日起施行的最新政策，覆盖就业补贴、见习实训、创业扶持全链条。（有效期至2027年12月31日）</p>
    </div>
    <div class="policy-grid">
      <!-- Card 1 -->
      <div class="policy-card">
        <div class="policy-card-header">
          <div class="policy-icon">
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div>
            <h3>毕业生就业支持</h3>
            <span>2026年政策</span>
          </div>
        </div>
        <div class="policy-card-body">
          <div class="policy-item">
            <div class="policy-item-dot"></div>
            <div class="policy-item-text">离校未就业困难毕业生求职补贴 <span class="amount">1000元/人</span>（低保家庭、浦南四镇户籍、残疾人证）</div>
          </div>
          <div class="policy-item">
            <div class="policy-item-dot"></div>
            <div class="policy-item-text">应届毕业生就业岗位补贴，首次就业缴纳社保1个月后 <span class="amount">1000元</span>，满12个月后追加 <span class="amount">3000元</span>稳定奖励</div>
          </div>
          <div class="policy-item">
            <div class="policy-item-dot"></div>
            <div class="policy-item-text">就业困难人员（登记失业3个月以上）就业岗位补贴 <span class="amount">2000元/人</span></div>
          </div>
          <div class="policy-item">
            <div class="policy-item-dot"></div>
            <div class="policy-item-text">困难企业分流人员（20人以上）6个月内首次就业满3个月 <span class="amount">2000元/人</span></div>
          </div>
        </div>
      </div>
      <!-- Card 2 -->
      <div class="policy-card">
        <div class="policy-card-header">
          <div class="policy-icon">
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v12H4z"/><path d="M8 20h4M12 16v4"/><path d="M7 9l3 3 5-5"/></svg>
          </div>
          <div>
            <h3>见习与实训</h3>
            <span>2026年政策</span>
          </div>
        </div>
        <div class="policy-card-body">
          <div class="policy-item">
            <div class="policy-item-dot"></div>
            <div class="policy-item-text">青年就业见习基地录用本区户籍学员，缴纳社保满3个月 <span class="amount">5000元/人</span>录用补贴</div>
          </div>
          <div class="policy-item">
            <div class="policy-item-dot"></div>
            <div class="policy-item-text">大学生职前研习坊：企业吸纳高校本科生/研究生参加研习岗位，按上海市月最低工资标准<span class="amount">50%</span>申请研习补贴</div>
          </div>
          <div class="policy-item">
            <div class="policy-item-dot"></div>
            <div class="policy-item-text">基层就业岗位补贴：招募离校未就业应届毕业生，按当年上海市最低工资标准给予岗位补贴</div>
          </div>
        </div>
      </div>
      <!-- Card 3 -->
      <div class="policy-card">
        <div class="policy-card-header">
          <div class="policy-icon">
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><path d="M3 17V7a2 2 0 012-2h6l4 4h4a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
          </div>
          <div>
            <h3>创业扶持</h3>
            <span>2026年政策</span>
          </div>
        </div>
        <div class="policy-card-body">
          <div class="policy-item">
            <div class="policy-item-dot"></div>
            <div class="policy-item-text">国家级大赛优胜创业项目落地补贴：<span class="amount">一级40万 / 二级30万 / 三级20万</span></div>
          </div>
          <div class="policy-item">
            <div class="policy-item-dot"></div>
            <div class="policy-item-text">市级大赛优胜创业项目落地补贴：<span class="amount">一级20万 / 二级15万 / 三级10万</span></div>
          </div>
          <div class="policy-item">
            <div class="policy-item-dot"></div>
            <div class="policy-item-text">区级大赛获优秀创业组织/团队 <span class="amount">1万元</span>一次性项目开发补贴</div>
          </div>
          <div class="policy-item">
            <div class="policy-item-dot"></div>
            <div class="policy-item-text">创业孵化载体运作经费：优秀<span class="amount">30万</span> / 良好<span class="amount">20万</span> / 合格<span class="amount">10万</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Talent programs -->
<section class="section" id="talent">
  <div class="section-inner">
    <div class="section-header">
      <div class="section-tag">
        <svg aria-hidden="true" viewBox="0 0 12 12" fill="currentColor"><circle cx="6" cy="6" r="6"/></svg>
        人才培育计划
      </div>
      <h2 class="section-title">分层分类人才培育体系</h2>
      <p class="section-desc">从技能人才到领军人才，从首席技师到青年英才，松江区构建多层次人才梯队，配套全周期培养支持。</p>
    </div>
    <div class="program-grid">
      <div class="program-card">
        <div class="program-card-body">
          <h3>长三角G60科创走廊青年创新英才</h3>
          <p>面向长三角G60科创走廊产业发展急需紧缺的优秀青年科技人才，经推荐、评审、公示后命名纳入发展项目，享受结对联系、分级培养、平台拓展及经费支持。</p>
          <div class="program-meta">
            <span class="program-tag highlight">月津贴1600元（三年）</span>
            <span class="program-tag">结对区委领导</span>
            <span class="program-tag">项目补贴支持</span>
          </div>
        </div>
      </div>
      <div class="program-card">
        <div class="program-card-body">
          <h3>首席技师 &amp; 技能大师工作室</h3>
          <p>每两年资助25名首席技师（1000元/月·人，3年期）；国家级/市级技能大师工作室一次性资助20万元；区级职教系统技能大师工作室资助5万元。</p>
          <div class="program-meta">
            <span class="program-tag highlight">首席技师1000元/月</span>
            <span class="program-tag">大师工作室最高20万</span>
            <span class="program-tag">世界赛奖励25万</span>
          </div>
        </div>
      </div>
      <div class="program-card">
        <div class="program-card-body">
          <h3>松江大学城产学研协同</h3>
          <p>推进大学城科创源建设，与8所高校共建20个产学研基地、15个联合实验室。设立实体化就业服务站点，开展"创始人公开课"、大学生职前研习坊，打通高校人才到松江就业"最后一公里"。</p>
          <div class="program-meta">
            <span class="program-tag highlight">产学研基地20个</span>
            <span class="program-tag">联合实验室15个</span>
            <span class="program-tag">高校服务季常态化</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Services list -->
<section class="services-section section">
  <div class="section-inner">
    <div class="section-header">
      <div class="section-tag">
        <svg aria-hidden="true" viewBox="0 0 12 12" fill="currentColor"><circle cx="6" cy="6" r="6"/></svg>
        服务索引
      </div>
      <h2 class="section-title">高频服务事项速查</h2>
      <p class="section-desc">点击服务名称，跳转至对应办理渠道或政策文件。</p>
    </div>
    <div class="services-grid">
      <a href="https://www.songjiang.gov.cn/ztzl/005019/005019001/20260806/bab50208-b669-465f-b7d4-bf2f9bca6539.html" target="_blank" rel="noopener noreferrer" class="service-item">
        <div class="service-num">01</div>
        <div class="service-content">
          <h3>新就业青年租房补贴申请</h3>
          <p>随申办"我要租房—新就业青年安居服务"全程线上办理，线下窗口：松江区中山街道茸梅路139号</p>
        </div>
      </a>
      <a href="https://www.songjiang.gov.cn/" target="_blank" rel="noopener noreferrer" class="service-item">
        <div class="service-num">02</div>
        <div class="service-content">
          <h3>人才引进落户咨询</h3>
          <p>松江区人才引进落户流程、申请材料及服务机构推荐，重点产业紧缺人才绿色通道</p>
        </div>
      </a>
      <a href="https://www.songjiang.gov.cn/" target="_blank" rel="noopener noreferrer" class="service-item">
        <div class="service-num">03</div>
        <div class="service-content">
          <h3>就业补贴申领</h3>
          <p>应届毕业生补贴、就业困难补贴、灵活就业社保补贴（600元/月）、跨镇就业补贴等</p>
        </div>
      </a>
      <a href="https://www.songjiang.gov.cn/" target="_blank" rel="noopener noreferrer" class="service-item">
        <div class="service-num">04</div>
        <div class="service-content">
          <h3>创业扶持申请</h3>
          <p>创业大赛报名、孵化载体入驻、创业项目落地补贴（最高40万元一次性）</p>
        </div>
      </a>
      <a href="https://www.songjiang.gov.cn/" target="_blank" rel="noopener noreferrer" class="service-item">
        <div class="service-num">05</div>
        <div class="service-content">
          <h3>技能培训与等级评价</h3>
          <p>高级工及以上项目培训获证补贴（1000—4000元/人）、企业职业技能等级评价机构资助</p>
        </div>
      </a>
      <a href="https://www.songjiang.gov.cn/" target="_blank" rel="noopener noreferrer" class="service-item">
        <div class="service-num">06</div>
        <div class="service-content">
          <h3>职称评审 &amp; 工程师培育</h3>
          <p>工程系列集成电路、生物医药、AI专业中级及以上职称牵引补贴（2000元），工程师工作站年度补贴</p>
        </div>
      </a>
      <a href="https://www.songjiang.gov.cn/" target="_blank" rel="noopener noreferrer" class="service-item">
        <div class="service-num">07</div>
        <div class="service-content">
          <h3>博士后创新实践基地</h3>
          <p>博士后创新实践基地提质扩量，支持在站科研和出站创业，"科创训练营""博士后面对面"常态化活动</p>
        </div>
      </a>
      <a href="https://www.songjiang.gov.cn/" target="_blank" rel="noopener noreferrer" class="service-item">
        <div class="service-num">08</div>
        <div class="service-content">
          <h3>G60人才服务包</h3>
          <p>全球引才服务矩阵，海外3个引才联络站，一站式人才服务综合体，"免申即享"政策推送</p>
        </div>
      </a>
    </div>
  </div>
</section>

<!-- Contact -->
<section class="contact-section section" id="contact">
  <div class="section-inner">
    <div class="section-header">
      <div class="section-tag">
        <svg aria-hidden="true" viewBox="0 0 12 12" fill="currentColor"><circle cx="6" cy="6" r="6"/></svg>
        联系我们
      </div>
      <h2 class="section-title">获取支持与帮助</h2>
      <p class="section-desc">人才服务热线、工作时间及线下办理窗口信息。如有政策疑问，建议优先查阅松江区人民政府官网。</p>
    </div>
    <div class="contact-grid">
      <div class="contact-info">
        <div class="contact-item">
          <div class="contact-item-icon">
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          </div>
          <div>
            <h3>人才服务热线</h3>
            <p>021-67743703（工作日 8:30—11:30，13:30—16:30）</p>
          </div>
        </div>
        <div class="contact-item">
          <div class="contact-item-icon">
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3H3a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V4a1 1 0 00-1-1z"/><path d="M19 3l-7 7-7-7"/></svg>
          </div>
          <div>
            <h3>线下受理窗口</h3>
            <p>松江区中山街道茸梅路139号一楼后台协同区青年安居窗口（双休日及法定节假日除外）</p>
          </div>
        </div>
        <div class="contact-item">
          <div class="contact-item-icon">
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          </div>
          <div>
            <h3>政策有效期</h3>
            <p>本页面政策内容主要依据2025年12月25日印发的《松江区关于支持劳动者高质量充分就业的若干举措（试行）》及2025年11月4日印发的《松江区关于惠企稳就业的若干措施》（均自2026年1月1日起施行，有效期至2027年12月31日）</p>
          </div>
        </div>
        <div class="contact-item">
          <div class="contact-item-icon">
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
          </div>
          <div>
            <h3>官方网站</h3>
            <p><a href="https://www.songjiang.gov.cn/" target="_blank" rel="noopener noreferrer">上海市松江区人民政府官网</a> — 政策文件、人才服务、就业创业等栏目</p>
          </div>
        </div>
      </div>
      <div class="contact-qr">
        <div class="contact-qr-title">扫码获取更多政策</div>
        <div class="qr-placeholder">扫码关注<br>松江人才服务</div>
        <div class="contact-qr-desc">第一时间获取松江区人才政策推送、招聘信息和活动通知</div>
        <a href="https://www.songjiang.gov.cn/" target="_blank" rel="noopener noreferrer" class="btn-outline" style="font-size:13px;">
          前往官网政策库
          <svg aria-hidden="true" width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M7 3l4 3.5-4 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
    </div>
  </div>
</section>

</main>

<!-- Footer -->
<footer class="footer">
  <div class="footer-inner">
    <div class="footer-top">
      <div class="footer-brand">
        <h3>松江区人才服务网</h3>
        <p>聚焦长三角G60科创走廊策源地建设，服务"四个区"发展定位，助力每一位人才在松江安居乐业、成就事业。</p>
      </div>
      <div class="footer-col">
        <h3>安居保障</h3>
        <ul>
          <li><a href="#housing">新就业青年租房补贴</a></li>
          <li><a href="#housing">茸易居人才公寓</a></li>
          <li><a href="#housing">申请条件与流程</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>就业创业</h3>
        <ul>
          <li><a href="#employment">毕业生就业补贴</a></li>
          <li><a href="#employment">见习与实训</a></li>
          <li><a href="#employment">创业大赛与孵化</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>人才培育</h3>
        <ul>
          <li><a href="#talent">青年创新英才</a></li>
          <li><a href="#talent">首席技师计划</a></li>
          <li><a href="#talent">大学城产学研</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 上海市松江区人力资源和社会保障局 · 数据来源：松江区人民政府官网 songjiang.gov.cn</p>
      <p>本页面政策信息基于公开政策文件整理，如有出入请以官方最新公告为准</p>
    </div>
  </div>
</footer>
  </div>
</template>

<script setup>
import { useSmoothScroll } from '@/composables/useSmoothScroll'

const toggleNavLinks = () => document.querySelector('.nav-links')?.classList.toggle('open')

useSmoothScroll({ activeNavSelector: '.nav-links a' })
</script>

<style scoped>

.page--sjqrcfw {
  --canvas: #F0F9FF;
  --surface: #FFFFFF;
  --surface-alt: #E0F2FE;
  --surface-dark: #BAE6FD;
  --ink: #0C4A6E;
  --ink-secondary: #0369A1;
  --ink-muted: #0284C7;
  --rule: #BAE6FD;
  --signal: #0284C7;
  --signal-light: #F0F9FF;
  --signal-dark: #0369A1;
  --accent: #38BDF8;
  --accent-light: #E0F2FE;
  --text-on-signal: #FFFFFF;
  --text-on-dark: #FFFFFF;
  --shadow-sm: 0 1px 3px rgba(3, 105, 161, 0.08);
  --shadow-md: 0 4px 16px rgba(3, 105, 161, 0.10);
  --shadow-lg: 0 8px 32px rgba(3, 105, 161, 0.12);
  --radius: 8px;
  --radius-lg: 14px;
  --font-body: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", system-ui, sans-serif;
  --font-display: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", system-ui, sans-serif;
  --max-w: 1200px;
  --nav-h: 64px;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
.page--sjqrcfw { scroll-behavior: smooth; }
.page--sjqrcfw {
  font-family: var(--font-body);
  background: var(--canvas);
  color: var(--ink);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
a:focus-visible, button:focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: 2px;
  border-radius: 4px;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.001ms !important;
    animation-duration: 0.001ms !important;
  }
}
a { color: var(--signal); text-decoration: none; }
a:hover { color: var(--signal-dark); }
img { max-width: 100%; display: block; }
button { cursor: pointer; font-family: inherit; }
.btn-primary {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--signal); color: var(--text-on-signal);
  border: none; border-radius: var(--radius);
  padding: 10px 22px; font-size: 15px; font-weight: 600;
  transition: background 0.2s, transform 0.15s;
}
.btn-primary:hover { background: var(--signal-dark); transform: translateY(-1px); }
.btn-outline {
  display: inline-flex; align-items: center; gap: 6px;
  background: transparent; color: var(--signal);
  border: 1.5px solid var(--signal); border-radius: var(--radius);
  padding: 9px 21px; font-size: 15px; font-weight: 600;
  transition: background 0.2s, color 0.2s;
}
.btn-outline:hover { background: var(--signal-light); }

/* Navigation */
.nav {
  position: sticky; top: 0; z-index: 200;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--rule);
  height: var(--nav-h);
}
.nav-inner {
  max-width: var(--max-w); margin: 0 auto; padding: 0 24px;
  height: 100%; display: flex; align-items: center; justify-content: space-between;
}
.nav-logo {
  display: flex; align-items: center; gap: 10px;
  font-size: 16px; font-weight: 700; color: var(--ink);
}
.nav-logo svg { width: 28px; height: 28px; }
.nav-links { display: flex; align-items: center; gap: 4px; list-style: none; }
.nav-links a {
  display: block; padding: 6px 14px; font-size: 14px;
  border-radius: 6px; transition: background 0.15s, color 0.15s;
}
.nav-links a:hover, .nav-links a.active { background: var(--surface-alt); color: var(--signal); }
.nav-cta { margin-left: 12px; color: #fff; }

/* Hero */
.hero {
  position: relative; overflow: hidden;
  background: linear-gradient(145deg, #0ea5e9 0%, #0EA5E9 45%, #7DD3FC 100%);
  min-height: 520px;
}
.hero-bg-pattern {
  position: absolute; inset: 0; opacity: 0.07;
  background-image:
    radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px),
    radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px),
    radial-gradient(circle at 60% 80%, #fff 1px, transparent 1px);
  background-size: 60px 60px, 80px 80px, 50px 50px;
}
.hero-content {
  position: relative; z-index: 1;
  max-width: var(--max-w); margin: 0 auto; padding: 72px 24px 80px;
}
.hero-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25);
  color: rgba(255,255,255,0.9); border-radius: 20px;
  padding: 4px 14px; font-size: 12px; font-weight: 500;
  margin-bottom: 20px;
}
.hero-badge svg { width: 12px; height: 12px; }
.hero-title {
  font-size: clamp(28px, 5vw, 48px); font-weight: 800;
  color: #fff; line-height: 1.2; margin-bottom: 18px;
  max-width: 700px;
}
.hero-title em { font-style: normal; color: #7DD3FC; }
.hero-subtitle {
  font-size: clamp(15px, 2vw, 18px); color: rgba(255,255,255,0.78);
  line-height: 1.7; max-width: 560px; margin-bottom: 36px;
}
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; }
.hero-btn-main {
  display: inline-flex; align-items: center; gap: 8px;
  background: #fff; color: var(--signal-dark);
  border: none; border-radius: var(--radius);
  padding: 13px 28px; font-size: 15px; font-weight: 700;
  transition: transform 0.2s, box-shadow 0.2s;
}
.hero-btn-main:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }
.hero-btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(255,255,255,0.12); color: #fff;
  border: 1.5px solid rgba(255,255,255,0.35);
  border-radius: var(--radius); padding: 12px 27px;
  font-size: 15px; font-weight: 600;
  transition: background 0.2s;
}
.hero-btn-ghost:hover { background: rgba(255,255,255,0.22); }
.hero-stats {
  display: flex; flex-wrap: wrap; gap: 0;
  margin-top: 56px; padding-top: 40px;
  border-top: 1px solid rgba(255,255,255,0.15);
}
.hero-stat { flex: 1; min-width: 140px; padding: 0 24px 0 0; }
.hero-stat-value {
  font-size: clamp(28px, 4vw, 38px); font-weight: 800;
  color: #fff; line-height: 1; margin-bottom: 4px;
  font-variant-numeric: tabular-nums;
}
.hero-stat-label { font-size: 13px; color: rgba(255,255,255,0.65); }

/* Section common */
.section { padding: 48px 24px; }
.section-alt { background: var(--surface); }
.section-inner { max-width: var(--max-w); margin: 0 auto; }
.section-header { margin-bottom: 48px; }
.section-tag {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--signal-light); color: var(--signal);
  border-radius: 20px; padding: 4px 14px; font-size: 12px; font-weight: 600;
  margin-bottom: 14px;
}
.section-tag svg { width: 12px; height: 12px; }
.section-title { font-size: clamp(22px, 3vw, 32px); font-weight: 800; color: var(--ink); margin-bottom: 10px; line-height: 1.25; }
.section-desc { font-size: 15px; color: var(--ink-secondary); max-width: 600px; line-height: 1.7; }

/* Feature cards */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(260px, 1fr));
  gap: 20px;
}
.feature-card {
  background: var(--surface); border-radius: var(--radius-lg);
  border: 1px solid var(--rule);
  padding: 16px 24px; transition: transform 0.2s, box-shadow 0.2s;
  position: relative; overflow: hidden;
}
.feature-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--signal), var(--accent));
  opacity: 0; transition: opacity 0.2s;
}
.feature-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
.feature-card:hover::before { opacity: 1; }
.feature-icon {
  width: 48px; height: 48px; border-radius: 10px;
  background: var(--signal-light); display: flex; align-items: center; justify-content: center;
  margin-bottom: 16px;
}
.feature-icon svg { width: 22px; height: 22px; color: var(--signal); }
.feature-card-title { font-size: 17px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
.feature-card-desc { font-size: 14px; color: var(--ink-secondary); line-height: 1.65; }
.feature-card-tag {
  display: inline-block; margin-top: 14px;
  background: var(--surface-alt); color: var(--signal);
  border-radius: 6px; padding: 3px 10px; font-size: 12px; font-weight: 600;
}

/* Housing section */
.housing-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; gap: 24px;
}
@media (max-width: 768px) { .housing-grid { grid-template-columns: 1fr; } }
.housing-main {
  background: linear-gradient(160deg, var(--signal-dark), var(--signal));
  border-radius: var(--radius-lg); padding: 40px 36px;
  color: #fff; position: relative; overflow: hidden;
}
.housing-main::after {
  content: ''; position: absolute; right: -30px; top: -30px;
  width: 200px; height: 200px; border-radius: 50%;
  background: rgba(255,255,255,0.06);
}
.housing-badge {
  display: inline-flex; align-items: center; gap: 5px;
  background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3);
  border-radius: 20px; padding: 4px 12px; font-size: 12px;
  margin-bottom: 18px;
}
.housing-main h3 { font-size: 24px; font-weight: 800; margin-bottom: 12px; line-height: 1.3; }
.housing-main p { font-size: 14px; opacity: 0.8; line-height: 1.7; margin-bottom: 28px; max-width: 400px; }
.housing-zones { display: flex; flex-direction: column; gap: 12px; }
.housing-zone {
  display: flex; justify-content: space-between; align-items: center;
  background: rgba(255,255,255,0.1); border-radius: 8px;
  padding: 12px 16px; font-size: 13px;
}
.housing-zone-name { opacity: 0.85; }
.housing-zone-info { text-align: right; font-weight: 600; }
.housing-zone-sub { font-size: 11px; opacity: 0.7; display: block; }
.housing-sidelist { display: flex; flex-direction: column; gap: 16px; }
.housing-side-item {
  background: var(--surface); border: 1px solid var(--rule);
  border-radius: var(--radius-lg); padding: 24px 20px;
  transition: box-shadow 0.2s, transform 0.2s;
}
.housing-side-item:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.housing-side-item h3 { font-size: 16px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
.housing-side-item p { font-size: 13px; color: var(--ink-secondary); line-height: 1.6; }
.housing-side-item .tag {
  display: inline-block; margin-top: 10px;
  background: var(--signal-light); color: var(--signal);
  border-radius: 6px; padding: 3px 10px; font-size: 12px; font-weight: 600;
}

/* Policy timeline */
.policy-section { background: var(--surface); }
.policy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
.policy-card {
  background: var(--canvas); border-radius: var(--radius-lg);
  border: 1px solid var(--rule); overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;
}
.policy-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.policy-card-header {
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--rule);
  display: flex; align-items: center; gap: 12px;
}
.policy-icon {
  width: 40px; height: 40px; border-radius: 8px;
  background: var(--signal-light); display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.policy-icon svg { width: 20px; height: 20px; color: var(--signal); }
.policy-card-header h3 { font-size: 16px; font-weight: 700; color: var(--ink); }
.policy-card-header span { font-size: 12px; color: var(--ink-muted); }
.policy-card-body { padding: 16px 24px 20px; }
.policy-item {
  display: flex; gap: 10px; padding: 10px 0;
  border-bottom: 1px dashed var(--rule);
}
.policy-item:last-child { border-bottom: none; }
.policy-item-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--signal); margin-top: 7px; flex-shrink: 0;
}
.policy-item-text { font-size: 13px; color: var(--ink-secondary); line-height: 1.6; }
.policy-item-text strong { color: var(--ink); font-weight: 600; }
.policy-item-text .amount { color: var(--signal); font-weight: 700; }

/* Talent programs */
.program-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}
.program-card {
  background: var(--surface); border-radius: var(--radius-lg);
  border: 1px solid var(--rule); overflow: hidden;
  display: flex; flex-direction: column;
  transition: box-shadow 0.2s, transform 0.2s;
}
.program-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); }
.program-card-img {
  height: 160px; background: linear-gradient(135deg, #0369A1, #38BDF8);
  display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
}
.program-card-img::after {
  content: ''; position: absolute; inset: 0;
  background-image:
    radial-gradient(circle at 25% 25%, rgba(255,255,255,0.06) 1px, transparent 1px),
    radial-gradient(circle at 75% 75%, rgba(255,255,255,0.06) 1px, transparent 1px);
  background-size: 40px 40px;
}
.program-card-img span {
  position: relative; z-index: 1;
  color: rgba(255,255,255,0.9); font-size: 14px; font-weight: 600;
  background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25);
  border-radius: 20px; padding: 5px 16px;
}
.program-card-body { padding: 24px; flex: 1; display: flex; flex-direction: column; }
.program-card-body h3 { font-size: 18px; font-weight: 800; color: var(--ink); margin-bottom: 10px; }
.program-card-body p { font-size: 14px; color: var(--ink-secondary); line-height: 1.7; flex: 1; margin-bottom: 20px; }
.program-meta {
  display: flex; flex-wrap: wrap; gap: 8px;
  padding-top: 16px; border-top: 1px solid var(--rule);
}
.program-tag {
  display: inline-flex; align-items: center; gap: 4px;
  background: var(--surface-alt); color: var(--ink-secondary);
  border-radius: 6px; padding: 3px 10px; font-size: 12px; font-weight: 500;
}
.program-tag.highlight { background: var(--signal-light); color: var(--signal); font-weight: 600; }

/* Stats bar */
.stats-bar {
  background: linear-gradient(135deg, #0369A1, #0EA5E9, #7DD3FC);
  padding: 24px;
}
.stats-grid {
  max-width: var(--max-w); margin: 0 auto;
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 0;
}
@media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 0; } }
.stat-item {
  text-align: center; padding: 20px 16px;
  border-right: 1px solid rgba(255,255,255,0.15);
}
.stat-item:last-child { border-right: none; }
.stat-value {
  font-size: clamp(32px, 5vw, 48px); font-weight: 800;
  color: #fff; line-height: 1; margin-bottom: 6px;
  font-variant-numeric: tabular-nums;
}
.stat-label { font-size: 13px; color: rgba(255,255,255,0.65); }

/* Services list */
.services-section { background: var(--canvas); }
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}
.service-item {
  display: flex; align-items: flex-start; gap: 14px;
  background: var(--surface); border-radius: var(--radius);
  border: 1px solid var(--rule); padding: 18px 20px;
  transition: box-shadow 0.2s, border-color 0.2s;
}
.service-item:hover { box-shadow: var(--shadow-sm); border-color: var(--surface-dark); }
.service-num {
  width: 36px; height: 36px; border-radius: 8px;
  background: var(--signal-light); color: var(--signal);
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 800; flex-shrink: 0;
}
.service-content h4 { font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
.service-content p { font-size: 13px; color: var(--ink-muted); line-height: 1.6; }

/* Contact */
.contact-section { background: var(--surface); }
.contact-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 40px;
}
@media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } }
.contact-info { display: flex; flex-direction: column; gap: 24px; }
.contact-item { display: flex; gap: 14px; align-items: flex-start; }
.contact-item-icon {
  width: 42px; height: 42px; border-radius: 10px;
  background: var(--signal-light); display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.contact-item-icon svg { width: 20px; height: 20px; color: var(--signal); }
.contact-item h3 { font-size: 14px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
.contact-item p { font-size: 13px; color: var(--ink-secondary); line-height: 1.6; }
.contact-qr {
  background: var(--canvas); border-radius: var(--radius-lg);
  border: 1px solid var(--rule); padding: 32px;
  display: flex; flex-direction: column; align-items: center; gap: 14px;
}
.contact-qr-title { font-size: 16px; font-weight: 700; color: var(--ink); }
.contact-qr-desc { font-size: 13px; color: var(--ink-secondary); text-align: center; line-height: 1.6; }
.qr-placeholder {
  width: 140px; height: 140px; border-radius: 10px;
  background: var(--surface-alt); border: 2px dashed var(--rule);
  display: flex; align-items: center; justify-content: center;
  color: var(--ink-muted); font-size: 12px; text-align: center; padding: 16px;
}

/* Footer */
.footer {
  background: var(--ink); color: rgba(255,255,255,0.7);
  padding: 48px 24px 32px;
}
.footer-inner { max-width: var(--max-w); margin: 0 auto; }
.footer-top {
  display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px;
  padding-bottom: 32px; border-bottom: 1px solid rgba(255,255,255,0.1);
}
@media (max-width: 768px) { .footer-top { grid-template-columns: 1fr 1fr; gap: 24px; } }
@media (max-width: 480px) { .footer-top { grid-template-columns: 1fr; } }
.footer-brand h3 { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 10px; }
.footer-brand p { font-size: 13px; line-height: 1.7; max-width: 280px; }
.footer-col h4 { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 14px; }
.footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.footer-col a { font-size: 13px; color: rgba(255,255,255,0.6); transition: color 0.15s; }
.footer-col a:hover { color: #fff; }
.footer-bottom {
  padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
}
.footer-bottom p { font-size: 12px; }

/* Responsive nav */
.mobile-menu-btn { display: none; background: none; border: none; padding: 8px; color: var(--ink); }
@media (max-width: 768px) {
  .nav-links { display: none; }
  .mobile-menu-btn { display: flex; }
  .nav-links.open { 
    display: flex; flex-direction: column; position: absolute;
    top: var(--nav-h); left: 0; right: 0;
    background: var(--surface); border-bottom: 1px solid var(--rule);
    padding: 12px; gap: 4px; box-shadow: var(--shadow-md);
  }
  .hero-stats { flex-direction: column; gap: 16px; }
  .hero-stat { padding: 0; }
  .stat-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.15); }
  .stat-item:last-child { border-bottom: none; }
  .footer-bottom { flex-direction: column; text-align: center; }
}

/* Print */
@media print {
  .nav, .hero-actions, .btn-primary, .btn-outline { display: none; }
  .hero { min-height: auto; background: var(--signal-dark) !important; color: #fff !important; }
  .section { padding: 32px 0; }
  .feature-card, .policy-card, .program-card { break-inside: avoid; box-shadow: none; border: 1px solid #ccc; }
}

</style>
