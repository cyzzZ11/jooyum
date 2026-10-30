﻿<template>
  <div class="page page--home" :class="{ 'fp-on': fpEnabled, 'theme-dark': isDark }">
    <!-- 科技感光标：带尾巴的三角箭头 + 蓝色泛光 + JS 惯性跟随 -->
    <div class="cursor-layer" aria-hidden="true">
      <!-- 主图形：带尾巴的三角箭头（参考图标） -->
      <span class="cursor-arrow">
        <span class="cursor-glow">
          <svg viewBox="0 0 28 28" width="100%" height="100%">
            <defs>
              <linearGradient id="arrG" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#0ea5e9"/>
                <stop offset="55%" stop-color="#38bdf8"/>
                <stop offset="100%" stop-color="#67e8f9"/>
              </linearGradient>
            </defs>
            <path d="M3 2 L25 14 L25 26 L11 26 L7 22 Z" fill="url(#arrG)" stroke="#38bdf8" stroke-width="1.2" stroke-linejoin="round"/>
          </svg>
        </span>
      </span>
    </div>

    <!-- 首屏弹窗 -->
    <div class="scroll-progress" aria-hidden="true">
      <span :style="{ transform: `scaleX(${progressValue})` }"></span>
    </div>

    <!-- 左侧环形进度 + 当前屏名称 -->
    <div class="scroll-ring" aria-hidden="true">
      <span class="scroll-ring__ring">
        <svg viewBox="0 0 48 48">
          <circle class="scroll-ring__track" cx="24" cy="24" r="19" />
          <circle
            class="scroll-ring__bar"
            cx="24"
            cy="24"
            r="19"
            :style="{ strokeDashoffset: 119.4 * (1 - progressValue) }"
          />
        </svg>
        <span class="scroll-ring__pct">{{ Math.round(progressValue * 100) }}</span>
      </span>
      <span class="scroll-ring__meta">
        <em>当前屏</em>
        <strong>{{ currentSectionLabel }}</strong>
      </span>
    </div>

    <!-- 返回顶部 -->
    <button
      class="back-top"
      type="button"
      :class="{ 'is-visible': showBackTop }"
      aria-label="返回顶部"
      data-cursor="hover"
      @click="backToTop"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
      <span>顶部</span>
    </button>

    <div
      class="splash-modal"
      id="splashModal"
      :class="{ 'is-hidden': !splashVisible }"
      :aria-hidden="String(!splashVisible)"
    >
      <div class="splash-modal__overlay" @click="hideSplash"></div>
      <div class="splash-modal__content">
        <button class="splash-modal__close" id="splashCloseBtn" aria-label="关闭" @click="hideSplash">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div class="splash-modal__image-wrap">
          <div class="splash-modal__image"></div>
          <div class="splash-modal__gradient"></div>
          <div class="splash-modal__text">
            <p class="splash-modal__sub">TECHNOLOGY INNOVATION PLATFORM</p>
            <h2 class="splash-modal__title">赋能创新 · 链接未来</h2>
            <p class="splash-modal__desc">聚焦产学研融合，助力科技成果转化</p>
          </div>
        </div>
        <button
          type="button"
          class="splash-countdown"
          :aria-label="splashSeconds + ' 秒后自动进入，点击立即进入'"
          @click="hideSplash"
        >
          <span class="splash-countdown__ring">
            <svg viewBox="0 0 44 44" aria-hidden="true">
              <circle class="splash-countdown__track" cx="22" cy="22" r="18" />
              <circle
                class="splash-countdown__bar"
                cx="22"
                cy="22"
                r="18"
                :style="{ strokeDashoffset: 113.1 * splashProgress }"
              />
            </svg>
            <span class="splash-countdown__num">{{ splashSeconds }}</span>
          </span>
          <span class="splash-countdown__main">{{ splashSeconds }} 秒后自动进入</span>
          <span class="splash-countdown__divider" aria-hidden="true"></span>
          <span class="splash-countdown__skip">点击跳过</span>
        </button>
      </div>
    </div>

    <div id="site-app" :class="{ 'is-visible': appVisible }">
      <div class="fp-viewport">
        <main
          class="fp-track"
          :class="{ 'is-settling': fpSettling }"
          :style="fpEnabled ? { transform: `translate3d(0, -${fpIndex * 100}%, 0)` } : null"
        >
          <!-- 新闻轮播区 -->
          <section class="news-section fp-section" id="innovation" :class="{ 'is-current': fpIndex === 0 }">
            <div class="tech-backdrop" aria-hidden="true">
              <span class="tech-backdrop__photo"></span>
              <span class="tech-backdrop__grid"></span>
              <span class="tech-backdrop__glow tech-backdrop__glow--1"></span>
              <span class="tech-backdrop__glow tech-backdrop__glow--2"></span>
              <span class="tech-backdrop__beam tech-backdrop__beam--1"></span>
              <span class="tech-backdrop__beam tech-backdrop__beam--2"></span>
              <span class="tech-backdrop__particles"></span>
              <span class="tech-backdrop__scan"></span>
              <!-- 鼠标柔光跟随（spotlight） -->
              <span class="tech-backdrop__spotlight"></span>
              <!-- 四周装饰浮动点（纯 CSS 呼吸动画，无 JS 依赖） -->
              <span class="tech-backdrop__dot tech-backdrop__dot--1"></span>
              <span class="tech-backdrop__dot tech-backdrop__dot--2"></span>
              <span class="tech-backdrop__dot tech-backdrop__dot--3"></span>
              <span class="tech-backdrop__ring tech-backdrop__ring--1"></span>
              <span class="tech-backdrop__ring tech-backdrop__ring--2"></span>
            </div>

            <!-- 竖向「需求—成果」关键词数据流 -->
            <div class="data-stream" aria-hidden="true">
              <div
                v-for="(col, ci) in dataStreamColumns"
                :key="`stream-${ci}`"
                class="data-stream__col"
                :style="{
                  left: ci < 2 ? `${1.6 + ci * 5}%` : null,
                  right: ci >= 2 ? `${1.6 + (ci - 2) * 5}%` : null,
                  animationDuration: `${22 + ci * 6}s`,
                  animationDelay: `${-ci * 5}s`,
                }"
              >
                <span v-for="(word, wi) in col" :key="`w-${ci}-${wi}`" class="data-stream__word">{{ word }}</span>
                <span v-for="(word, wi) in col" :key="`d-${ci}-${wi}`" class="data-stream__word">{{ word }}</span>
              </div>
            </div>

            <div class="container">
              <!-- 轮播上方的艺术字标语 -->
              <header class="hero-slogan" data-cursor="hover" aria-label="开放共享赋能 创新创业筑梦">
                <span class="hero-slogan__line" aria-hidden="true"></span>
                <h1 class="hero-slogan__title">
                  <span class="hero-slogan__text">开放共享赋能</span>
                  <i class="hero-slogan__diamond" aria-hidden="true"></i>
                  <span class="hero-slogan__text">创新创业筑梦</span>
                </h1>
                <span class="hero-slogan__line" aria-hidden="true"></span>
              </header>
              <div class="news-wrap">
                <!-- 左侧轮播（70%） -->
                <div class="carousel" id="carousel">
                  <div class="carousel__track" id="carouselTrack">
                    <!-- Slide 1 -->
                    <div class="carousel__slide carousel__slide--active">
                      <div class="carousel__image carousel__image--1"></div>
                      <div class="carousel__overlay"></div>
                      <div class="carousel__content">
                        <span class="carousel__tag">平台动态</span>
                        <h2 class="carousel__title">2026科技创新峰会圆满落幕</h2>
                        <p class="carousel__subtitle">汇聚产学研精英，共探科技未来发展方向</p>
                        <a href="#" class="carousel__btn">
                          查看详情
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <!-- Slide 2 -->
                    <div class="carousel__slide">
                      <div class="carousel__image carousel__image--2"></div>
                      <div class="carousel__overlay"></div>
                      <div class="carousel__content">
                        <span class="carousel__tag">政策更新</span>
                        <h2 class="carousel__title">新一代信息技术产业扶持政策发布</h2>
                        <p class="carousel__subtitle">最高500万资金支持，助力企业创新发展</p>
                        <a href="#" class="carousel__btn">
                          查看详情
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <!-- Slide 3 -->
                    <div class="carousel__slide">
                      <div class="carousel__image carousel__image--3"></div>
                      <div class="carousel__overlay"></div>
                      <div class="carousel__content">
                        <span class="carousel__tag">活动通知</span>
                        <h2 class="carousel__title">创新创业大赛报名通道开启</h2>
                        <p class="carousel__subtitle">百万奖金池，寻找最具潜力的创业项目</p>
                        <a href="#" class="carousel__btn">
                          立即报名
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <!-- Slide 4 -->
                    <div class="carousel__slide">
                      <div class="carousel__image carousel__image--4"></div>
                      <div class="carousel__overlay"></div>
                      <div class="carousel__content">
                        <span class="carousel__tag">行业资讯</span>
                        <h2 class="carousel__title">人工智能产业联盟正式成立</h2>
                        <p class="carousel__subtitle">产学研深度融合，推动AI技术产业化落地</p>
                        <a href="#" class="carousel__btn">
                          查看详情
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  <!-- 导航按钮 -->
                  <button
                    class="carousel__nav carousel__nav--prev"
                    id="carouselPrev"
                    aria-label="上一张"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    class="carousel__nav carousel__nav--next"
                    id="carouselNext"
                    aria-label="下一张"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>

                  <!-- 指示器 -->
                  <div class="carousel__dots" id="carouselDots">
                    <button
                      class="carousel__dot carousel__dot--active"
                      data-index="0"
                      aria-label="第1张"
                    ></button>
                    <button class="carousel__dot" data-index="1" aria-label="第2张"></button>
                    <button class="carousel__dot" data-index="2" aria-label="第3张"></button>
                    <button class="carousel__dot" data-index="3" aria-label="第4张"></button>
                  </div>

                  <!-- HUD 边角装饰 -->
                  <div class="carousel-hud" aria-hidden="true">
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                  </div>

                  <!-- 实拍图来源标注 -->
                  <span class="carousel__credit">图片来源：松江区融媒体中心</span>
                </div>

                <!-- 右侧新闻资讯（30%） -->
                <div class="news-list">
                  <div class="news-list__header">
                    <h3 class="news-list__title">新闻资讯</h3>
                    <a href="#" class="news-list__more">查看更多 →</a>
                  </div>
                  <ul class="news-timeline" data-fp-scroll>
                    <li
                      v-for="(item, i) in newsItems"
                      :key="`news-${i}`"
                      class="news-timeline__item"
                      :class="{ 'news-timeline__item--latest': i === 0 }"
                    >
                      <span class="news-timeline__node" aria-hidden="true"></span>
                      <div class="news-timeline__date">{{ item.date }}</div>
                      <a href="#" class="news-timeline__title">{{ item.title }}</a>
                      <span class="news-item__tag" :class="`news-item__tag--${item.type}`">{{ item.tag }}</span>
                    </li>
                  </ul>
                  <div class="news-list__count">
                    当前显示
                    <span data-count="91">91</span>
                    条动态
                  </div>
                </div>
              </div>
            </div>

            <!-- 科技关键词跑马灯 -->
            <div class="tech-ticker" aria-hidden="true">
              <div class="tech-ticker__track">
                <!-- 两段完全相同的内容，每段重复 4 轮，保证任一时刻都能铺满视口，实现无缝循环 -->
                <div v-for="half in 2" :key="half" class="tech-ticker__group">
                  <template v-for="copy in 4" :key="`${half}-${copy}`">
                    <span
                      v-for="word in techKeywords"
                      :key="`${half}-${copy}-${word}`"
                      class="tech-ticker__item"
                    >{{ word }}</span>
                  </template>
                </div>
              </div>
            </div>
          </section>

          <!-- 科创源信息球：关于 / 四链 / 高校 / 发榜（滚轮顺时针旋转查看） -->
          <section class="globe-section fp-section" id="globe" :class="{ 'is-current': fpIndex === 1 }">
            <div class="globe-stage">
              <!-- 轨道弧线 + 流动光点 -->
              <svg
                class="globe-orbit"
                viewBox="0 0 1200 720"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="orbitGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="rgba(56,189,248,0.5)" />
                    <stop offset="100%" stop-color="rgba(99,102,241,0.2)" />
                  </linearGradient>
                </defs>
                <ellipse class="globe-orbit__ring" cx="600" cy="384" rx="540" ry="152" transform="rotate(-8 600 384)" />
                <ellipse class="globe-orbit__ring globe-orbit__ring--2" cx="600" cy="372" rx="430" ry="112" transform="rotate(11 600 372)" />
                <ellipse class="globe-orbit__ring globe-orbit__ring--3" cx="600" cy="392" rx="310" ry="76" transform="rotate(-17 600 392)" />
                <ellipse
                  class="globe-orbit__flow"
                  cx="600"
                  cy="384"
                  rx="540"
                  ry="152"
                  transform="rotate(-8 600 384)"
                  stroke="url(#orbitGrad)"
                />
                <ellipse
                  class="globe-orbit__flow globe-orbit__flow--2"
                  cx="600"
                  cy="372"
                  rx="430"
                  ry="112"
                  transform="rotate(11 600 372)"
                />
                <ellipse
                  class="globe-orbit__flow globe-orbit__flow--3"
                  cx="600"
                  cy="392"
                  rx="310"
                  ry="76"
                  transform="rotate(-17 600 392)"
                />
                <circle class="globe-orbit__node" cx="132" cy="300" r="3" />
                <circle class="globe-orbit__node globe-orbit__node--2" cx="1058" cy="430" r="3" />
                <circle class="globe-orbit__node globe-orbit__node--3" cx="330" cy="470" r="2.5" />
                <circle class="globe-orbit__node globe-orbit__node--4" cx="900" cy="248" r="2.5" />
              </svg>
              <div class="globe-sphere" :style="{ transform: `rotateY(${globeAngle}deg)` }">
                <div class="globe-core" aria-hidden="true">
                  <span class="globe-core__ring"></span>
                  <span class="globe-core__ring globe-core__ring--2"></span>
                  <span class="globe-core__ring globe-core__ring--3"></span>
                  <span class="globe-core__glow"></span>
                </div>

                <!-- 面板1：关于科创源 -->
                <div class="globe-panel globe-panel--1" :class="{ 'is-face': globeStep === 0 }">
                  <div class="container">
              <div class="section-header">
                <span class="section-header__eyebrow">ABOUT</span>
                <h2 class="section-header__title">关于科创源</h2>
                <p class="section-header__desc">
                  以上海松江大学城高校区域为核心的创新策源地与产学研协同发展平台
                </p>
              </div>

              <!-- 服务快捷入口 -->
              <div class="service-strip">
                <a class="service-chip" href="/cgzh-qy/tech-demand-platform">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 20V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14" />
                    <path d="M4 20h16" />
                    <path d="M16 10h2a2 2 0 0 1 2 2v8" />
                    <path d="M8 8h4M8 12h4" />
                  </svg>
                  <span>校企双向发榜</span>
                </a>
                <a class="service-chip" href="https://www.sjdxckcy.com/resource/index" target="_blank" rel="noopener">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M3 10h18M9 10v10" />
                  </svg>
                  <span>载体资源</span>
                </a>
                <a class="service-chip" href="https://www.sjdxckcy.com/home/publicService" target="_blank" rel="noopener">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="12" rx="2" />
                    <path d="M8 20h8M12 16v4" />
                  </svg>
                  <span>数字公共服务驿站</span>
                </a>
                <a class="service-chip" href="/sjkczcjs">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                    <path d="M14 3v5h5M9 13h6M9 17h4" />
                  </svg>
                  <span>政策支持</span>
                </a>
                <a class="service-chip" href="/sjqrcfw">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
                  </svg>
                  <span>人才服务</span>
                </a>
              </div>

              <div class="intro-grid">
                <div class="intro-story">
                  <p class="intro-story__lead">
                    为贯彻落实市委、市政府关于松江大学城优化提升的部署要求，松江区在市级工作机制领导下，
                    按照“高、新、特、实”的发展理念推进科创源建设，集聚政府、技术、市场、产业等各方资源要素，
                    打造服务科技成果转化的沃土、汇聚创新创业的热土、开放共享的乐土。
                  </p>
                  <p class="intro-story__text">
                    2025 年 12 月 20 日，松江大学城科创源正式揭牌，进入实体化运行阶段。以 5.5 平方公里高校区域为核心空间，
                    汇聚 8 所高校、12 万余名师生，推动科技创新与产业创新深度融合，加快实现新质生产力发展先行区目标。
                  </p>
                  <dl class="intro-meta">
                    <div>
                      <dt>建设推动</dt>
                      <dd>上海市教育委员会 · 松江区人民政府</dd>
                    </div>
                    <div>
                      <dt>运营主体</dt>
                      <dd>上海松江高创源科技服务有限公司</dd>
                    </div>
                    <div>
                      <dt>实体化运行</dt>
                      <dd>2025 年 12 月 20 日</dd>
                    </div>
                  </dl>
                </div>

                <div class="intro-facts">
                  <div class="intro-fact">
                    <strong data-count="5.5" data-decimals="1">5.5</strong>
                    <span>平方公里</span>
                    <em>核心区面积</em>
                  </div>
                  <div class="intro-fact">
                    <strong data-count="8">8</strong>
                    <span>所</span>
                    <em>高校汇聚</em>
                  </div>
                  <div class="intro-fact">
                    <strong><i data-count="12">12</i><small>万+</small></strong>
                    <span>名</span>
                    <em>在校师生</em>
                  </div>
                  <div class="intro-fact">
                    <strong data-count="19">19</strong>
                    <span>个</span>
                    <em>功能性平台</em>
                  </div>
                </div>
              </div>
                  </div>
                </div>

                <!-- 面板2：四链融合 -->
                <div class="globe-panel globe-panel--2" :class="{ 'is-face': globeStep === 1 }">
                  <div class="container">
              <div class="section-header">
                <span class="section-header__eyebrow">ROADMAP</span>
                <h2 class="section-header__title">四链融合 · 发展目标</h2>
                <p class="section-header__desc">
                  创新链、产业链、资金链、人才链协同发力，分三步建成大学科创中心
                </p>
              </div>

              <div class="chain-grid">
                <article class="chain-card">
                  <span class="chain-card__no">01</span>
                  <h3>创新链</h3>
                  <p>高校科研成果与企业技术需求双向发榜，逐项比对匹配，全程跟踪至合同、样机、中试与产业化。</p>
                </article>
                <article class="chain-card">
                  <span class="chain-card__no">02</span>
                  <h3>产业链</h3>
                  <p>聚焦新材料、仪器仪表、“6G + AI + 卫星互联网”等方向，推动实验室成果对接真实产业场景。</p>
                </article>
                <article class="chain-card">
                  <span class="chain-card__no">03</span>
                  <h3>资金链</h3>
                  <p>与长三角国家技术创新中心共建 3 亿元“拨投结合”专项资金池，5 年内支持不少于 30 个科技创业项目。</p>
                </article>
                <article class="chain-card">
                  <span class="chain-card__no">04</span>
                  <h3>人才链</h3>
                  <p>技术经理人按普及型、骨干型、高端型三梯度培养，科创训练营以“3+3+3”体系支持师生创业。</p>
                </article>
              </div>

              <ol class="roadmap">
                <li class="roadmap__item">
                  <span class="roadmap__year">2027</span>
                  <h4>夯基筑台</h4>
                  <p>集聚不少于 3 个产教融合实训基地，百余门特色微专业课程实现跨校选课、学分互认。</p>
                </li>
                <li class="roadmap__item">
                  <span class="roadmap__year">2030</span>
                  <h4>四基地成型</h4>
                  <p>建成科技成果转化基地、产业人才培育基地、师生创新创业基地与开放共享合作基地。</p>
                </li>
                <li class="roadmap__item">
                  <span class="roadmap__year">2035</span>
                  <h4>大学科创中心</h4>
                  <p>全面建成具有全球影响力的大学科创中心，成为区域创新策源的核心引擎。</p>
                </li>
              </ol>
                  </div>
                </div>

                <!-- 面板3：八所高校矩阵 -->
                <div class="globe-panel globe-panel--3" :class="{ 'is-face': globeStep === 2 }">
                  <div class="container">
              <div class="section-header">
                <span class="section-header__eyebrow">UNIVERSITIES</span>
                <h2 class="section-header__title">八所高校 · 同城协同</h2>
                <p class="section-header__desc">
                  8 所高校、12 万余名师生同处 5.5 平方公里，学科互补、课程共享、成果互通
                </p>
              </div>

              <div class="uni-grid">
                <a class="uni-card" href="https://www.shisu.edu.cn" target="_blank" rel="noopener">
                  <span class="uni-card__badge">01</span>
                  <h3 class="uni-card__name">上海外国语大学</h3>
                  <p class="uni-card__tag">语言科技 · 国际传播</p>
                  <span class="uni-card__go">访问官网</span>
                </a>
                <a class="uni-card" href="https://www.dhu.edu.cn" target="_blank" rel="noopener">
                  <span class="uni-card__badge">02</span>
                  <h3 class="uni-card__name">东华大学</h3>
                  <p class="uni-card__tag">新材料 · 纺织服装</p>
                  <span class="uni-card__go">访问官网</span>
                </a>
                <a class="uni-card" href="https://www.ecupl.edu.cn" target="_blank" rel="noopener">
                  <span class="uni-card__badge">03</span>
                  <h3 class="uni-card__name">华东政法大学</h3>
                  <p class="uni-card__tag">法治营商 · 知识产权</p>
                  <span class="uni-card__go">访问官网</span>
                </a>
                <a class="uni-card" href="https://www.suibe.edu.cn" target="_blank" rel="noopener">
                  <span class="uni-card__badge">04</span>
                  <h3 class="uni-card__name">上海对外经贸大学</h3>
                  <p class="uni-card__tag">经贸金融 · 数字贸易</p>
                  <span class="uni-card__go">访问官网</span>
                </a>
                <a class="uni-card" href="https://www.lixin.edu.cn" target="_blank" rel="noopener">
                  <span class="uni-card__badge">05</span>
                  <h3 class="uni-card__name">上海立信会计金融学院</h3>
                  <p class="uni-card__tag">会计金融 · 数据审计</p>
                  <span class="uni-card__go">访问官网</span>
                </a>
                <a class="uni-card" href="https://www.sues.edu.cn" target="_blank" rel="noopener">
                  <span class="uni-card__badge">06</span>
                  <h3 class="uni-card__name">上海工程技术大学</h3>
                  <p class="uni-card__tag">智能制造 · 轨道交通</p>
                  <span class="uni-card__go">访问官网</span>
                </a>
                <a class="uni-card" href="https://www.siva.edu.cn" target="_blank" rel="noopener">
                  <span class="uni-card__badge">07</span>
                  <h3 class="uni-card__name">上海视觉艺术学院</h3>
                  <p class="uni-card__tag">视觉设计 · 数字文创</p>
                  <span class="uni-card__go">访问官网</span>
                </a>
                <a class="uni-card" href="https://www.sus.edu.cn" target="_blank" rel="noopener">
                  <span class="uni-card__badge">08</span>
                  <h3 class="uni-card__name">上海体育大学</h3>
                  <p class="uni-card__tag">运动健康 · 体育科技</p>
                  <span class="uni-card__go">访问官网</span>
                </a>
              </div>

              <!-- 合作机构 -->
              <div class="uni-partners">
                <span class="uni-partners__label">合作机构</span>
                <div class="uni-partners__list">
                  <a
                    class="partner-card"
                    href="https://www.lidapoly.edu.cn"
                    target="_blank"
                    rel="noopener"
                  >上海立达学院</a>
                  <a
                    class="partner-card"
                    href="http://www.shafc.edu.cn"
                    target="_blank"
                    rel="noopener"
                  >上海农林职业技术学院</a>
                  <a
                    class="partner-card"
                    href="http://www.shtivc.edu.cn"
                    target="_blank"
                    rel="noopener"
                  >上海科创职业技术学院</a>
                  <a
                    class="partner-card"
                    href="https://www.shsmu.edu.cn/sri"
                    target="_blank"
                    rel="noopener"
                  >上海交通大学医学院松江研究院</a>
                </div>
              </div>
                  </div>
                </div>

                <!-- 面板4：校企双向发榜成果 -->
                <div class="globe-panel globe-panel--4" :class="{ 'is-face': globeStep === 3 }">
                  <div class="container">
              <div class="section-header">
                <span class="section-header__eyebrow">MATCHING</span>
                <h2 class="section-header__title">校企双向发榜</h2>
                <p class="section-header__desc">
                  让高校成果找到产业场景，让企业需求找到技术答案
                </p>
              </div>

              <div class="results-stats">
                <div class="results-stat">
                  <strong data-count="72">72</strong>
                  <span>项高校科研成果</span>
                </div>
                <div class="results-stat">
                  <strong data-count="66">66</strong>
                  <span>项企业研发需求</span>
                </div>
                <div class="results-stat">
                  <strong data-count="46">46</strong>
                  <span>个促成合作</span>
                </div>
                <div class="results-stat">
                  <strong><i data-count="3000">3000</i><small>万元</small></strong>
                  <span>累计合作金额</span>
                </div>
              </div>

              <div class="results-cases">
                <article class="case-card">
                  <span class="case-card__tag">新材料</span>
                  <h4>东华大学 × 上海朗亿功能材料</h4>
                  <p>固态电池电解质项目已产出实验室小样；AI 分散剂项目完成基础模型搭建，进入企业内部试用。</p>
                </article>
                <article class="case-card">
                  <span class="case-card__tag">智能制造</span>
                  <h4>上海工程技术大学 × 科海华泰船舶电气</h4>
                  <p>联合开展大型船舶电气绝缘智能检测技术攻关，推动检测环节由人工判断向智能判定升级。</p>
                </article>
                <article class="case-card">
                  <span class="case-card__tag">绿色低碳</span>
                  <h4>东华大学 × 泽耀环保科技</h4>
                  <p>“低碳源污水处理装置”完成技术转让，绿色低碳技术在园区内加速落地。</p>
                </article>
              </div>

              <div class="results-cta">
                <a class="btn results-cta__main" href="/cgzh-qy/tech-demand-platform">企业发榜</a>
                <a class="btn btn--outline" href="/cgzh-gx/university-tech-demand">高校发榜</a>
              </div>
                  </div>
                </div>
              </div>

              <!-- 球面进度 + 操作提示 -->
              <div class="globe-indicator" aria-hidden="true">
                <span
                  v-for="n in 4"
                  :key="`globe-dot-${n}`"
                  class="globe-indicator__dot"
                  :class="{ 'is-active': globeStep === n - 1 }"
                ></span>
              </div>
              <p class="globe-hint" aria-hidden="true">
                滚动滚轮 · 顺时针旋转查看　{{ globeStep + 1 }} / 4
              </p>
            </div>
            <div class="globe-spacer" aria-hidden="true"></div>
          </section>

          <!-- 活动报名 -->
          <section class="activities-section fp-section" id="startup" :class="{ 'is-current': fpIndex === 2 }">
            <div class="container" style="position: relative;">
              <div class="section-header" style="margin-bottom: 0;">
                <span class="section-header__eyebrow">STARTUP</span>
                <h2 class="section-header__title">活动报名</h2>
                <p class="section-header__desc">精选创新创业活动，助力你的成长与突破</p>
              </div>
              <div class="activities-more" style="margin: 16px 0;">
                <a href="#" class="btn btn--outline" style="border: none;">
                  查看更多活动
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
              <!-- 活动卡片网格（滚动容器） -->
              <div class="activity-grid-scroll">
                <div class="activity-grid" id="activityGrid">
                  <article
                    v-for="(item, i) in activities"
                    :key="`activity-${i}`"
                    class="activity-card"
                    :class="{ 'activity-card--ended': item.status === 'ended' }"
                  >
                    <!-- 正面 -->
                    <div class="activity-card__body">
                      <div class="activity-card__meta">
                        <span>
                          <span
                            class="badge"
                            :class="item.status === 'ended' ? 'badge--ended' : 'badge--hot'"
                          >{{ item.status === 'ended' ? '已结束' : '报名中' }}</span>
                          <span class="activity-card__type">{{ item.type }}</span>
                        </span>
                        <span class="activity-card__date">{{ item.date }}</span>
                      </div>
                      <h3 class="activity-card__title">{{ item.title }}</h3>
                      <p class="activity-card__desc">{{ item.desc }}</p>
                      <div class="activity-card__footer">
                        <a href="#" class="activity-card__btn">
                          {{ item.status === 'ended' ? '查看回顾' : '立即报名' }}
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </a>
                      </div>
                    </div>

                    <!-- 背面：主办 / 规模 / 二维码占位 -->
                    <div
                      class="activity-card__back"
                      :class="{ 'activity-card__back--ended': item.status === 'ended' }"
                      aria-hidden="true"
                    >
                      <span class="activity-card__back-tag">
                        {{ item.status === 'ended' ? '活动已结束' : '扫码报名' }}
                      </span>
                      <dl class="activity-card__back-list">
                        <div>
                          <dt>主办单位</dt>
                          <dd>{{ item.organizer }}</dd>
                        </div>
                        <div>
                          <dt>活动规模</dt>
                          <dd>{{ item.scale }} · {{ item.city }}</dd>
                        </div>
                      </dl>
                      <div v-if="item.status === 'open'" class="activity-card__qr">
                        <span class="activity-card__qr-box">
                          <svg viewBox="0 0 40 40" aria-hidden="true">
                            <rect x="3" y="3" width="12" height="12" rx="1.5" />
                            <rect x="25" y="3" width="12" height="12" rx="1.5" />
                            <rect x="3" y="25" width="12" height="12" rx="1.5" />
                            <rect x="7.5" y="7.5" width="3" height="3" />
                            <rect x="29.5" y="7.5" width="3" height="3" />
                            <rect x="7.5" y="29.5" width="3" height="3" />
                            <rect x="19" y="6" width="2.5" height="2.5" />
                            <rect x="19" y="12" width="2.5" height="2.5" />
                            <rect x="19" y="19" width="2.5" height="2.5" />
                            <rect x="25" y="19" width="2.5" height="2.5" />
                            <rect x="31" y="19" width="2.5" height="2.5" />
                            <rect x="19" y="25" width="2.5" height="2.5" />
                            <rect x="25" y="29" width="2.5" height="2.5" />
                            <rect x="31" y="25" width="2.5" height="2.5" />
                          </svg>
                        </span>
                        <span class="activity-card__qr-text">
                          扫码进入报名页
                          <em>名额有限 · 报名从速</em>
                        </span>
                      </div>
                      <p v-else class="activity-card__back-note">活动已结束，敬请关注下一期</p>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </section>

          <!-- 公司简介与合作伙伴 -->
          <section class="about-section fp-section" id="about" :class="{ 'is-current': fpIndex === 3 }">
            <div class="container">
              <div class="about-header">
                <!-- <span class="section-tag">关于我们</span> -->
                <h2 class="section-title">开放共享赋能 创新创业筑梦</h2>
                <p class="section-subtitle">
                  作为国内领先的科技服务平台，我们致力于打通"政产学研用"全链条，
                  汇聚创新资源、连接产业需求、培育科技人才，助力创新创业高质量发展。
                </p>
              </div>

              <div class="about-body">
                <!-- 手绘风大学城地图：5.5km² · 8 所高校 -->
                <div class="campus-map">
                  <svg
                    class="campus-map__art"
                    viewBox="0 0 640 420"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="mapLand" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="rgba(56,189,248,0.14)" />
                        <stop offset="100%" stop-color="rgba(99,102,241,0.1)" />
                      </linearGradient>
                      <pattern id="mapDots" width="16" height="16" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" fill="rgba(14,165,233,0.14)" />
                      </pattern>
                    </defs>
                    <rect width="640" height="420" fill="url(#mapDots)" />
                    <!-- 核心区边界（手绘虚线） -->
                    <path
                      d="M 62 116 C 118 62 232 44 352 58 C 452 70 566 104 588 186 C 610 266 542 330 428 352 C 320 372 178 366 108 306 C 58 264 26 160 62 116 Z"
                      fill="url(#mapLand)"
                      stroke="rgba(14,165,233,0.45)"
                      stroke-width="1.8"
                      stroke-dasharray="8 7"
                      stroke-linejoin="round"
                    />
                    <!-- 河道（手绘双线） -->
                    <path
                      d="M 26 318 C 108 300 168 336 246 316 C 322 296 378 258 466 274 C 528 286 586 302 626 288"
                      fill="none"
                      stroke="rgba(56,189,248,0.28)"
                      stroke-width="12"
                      stroke-linecap="round"
                    />
                    <path
                      d="M 26 318 C 108 300 168 336 246 316 C 322 296 378 258 466 274 C 528 286 586 302 626 288"
                      fill="none"
                      stroke="rgba(56,189,248,0.45)"
                      stroke-width="1.4"
                      stroke-dasharray="14 10"
                    />
                    <!-- 文汇路主轴 -->
                    <path
                      d="M 58 226 C 160 210 288 204 404 212 C 482 217 546 228 600 242"
                      fill="none"
                      stroke="rgba(100,116,139,0.34)"
                      stroke-width="7"
                      stroke-linecap="round"
                    />
                    <path
                      d="M 58 226 C 160 210 288 204 404 212 C 482 217 546 228 600 242"
                      fill="none"
                      stroke="rgba(148,163,184,0.55)"
                      stroke-width="1.2"
                      stroke-dasharray="9 9"
                    />
                    <!-- 支路 -->
                    <path
                      d="M 232 60 C 246 140 250 210 258 316"
                      fill="none"
                      stroke="rgba(100,116,139,0.22)"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M 428 70 C 420 150 432 224 424 344"
                      fill="none"
                      stroke="rgba(100,116,139,0.22)"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                    <!-- 高校地块（手绘方块） -->
                    <rect x="120" y="146" width="66" height="46" rx="8" fill="none" stroke="rgba(14,165,233,0.28)" stroke-width="1.4" transform="rotate(-6 153 169)" />
                    <rect x="222" y="126" width="70" height="50" rx="8" fill="none" stroke="rgba(99,102,241,0.26)" stroke-width="1.4" transform="rotate(4 257 151)" />
                    <rect x="318" y="178" width="66" height="44" rx="8" fill="none" stroke="rgba(14,165,233,0.26)" stroke-width="1.4" transform="rotate(-3 351 200)" />
                    <rect x="398" y="132" width="64" height="46" rx="8" fill="none" stroke="rgba(99,102,241,0.26)" stroke-width="1.4" transform="rotate(5 430 155)" />
                    <rect x="440" y="214" width="70" height="46" rx="8" fill="none" stroke="rgba(14,165,233,0.26)" stroke-width="1.4" transform="rotate(-4 475 237)" />
                    <rect x="516" y="148" width="62" height="46" rx="8" fill="none" stroke="rgba(99,102,241,0.24)" stroke-width="1.4" transform="rotate(6 547 171)" />
                    <rect x="242" y="248" width="66" height="44" rx="8" fill="none" stroke="rgba(14,165,233,0.24)" stroke-width="1.4" transform="rotate(-5 275 270)" />
                    <rect x="326" y="262" width="60" height="42" rx="8" fill="none" stroke="rgba(99,102,241,0.22)" stroke-width="1.4" transform="rotate(4 356 283)" />
                    <!-- 手写标注 -->
                    <text class="map-anno" x="62" y="212" transform="rotate(-2 62 212)">文汇路</text>
                    <text class="map-anno map-anno--soft" x="452" y="404">5.5 km² 核心区</text>
                    <text class="map-anno map-anno--soft" x="30" y="28">松江大学城</text>
                    <!-- 指北针 -->
                    <g class="map-compass" transform="translate(594 46)">
                      <circle r="16" fill="none" stroke="rgba(148,163,184,0.45)" stroke-width="1.2" />
                      <path d="M 0 -11 L 5 4 L 0 1 L -5 4 Z" fill="rgba(14,165,233,0.6)" />
                      <text x="0" y="-19" text-anchor="middle">N</text>
                    </g>
                  </svg>

                  <a
                    v-for="uni in campusPoints"
                    :key="uni.name"
                    class="map-pin"
                    :class="{ 'map-pin--right': uni.x > 78 }"
                    :style="{ left: `${uni.x}%`, top: `${uni.y}%` }"
                    :href="uni.url"
                    target="_blank"
                    rel="noopener"
                    data-cursor="hover"
                  >
                    <span class="map-pin__dot" aria-hidden="true"></span>
                    <span class="map-pin__name">{{ uni.short }}</span>
                    <span class="map-pin__tip">
                      <strong>{{ uni.name }}</strong>
                      <em>{{ uni.tag }}</em>
                      <span class="map-pin__link">访问官网 →</span>
                    </span>
                  </a>

                  <span class="campus-map__legend">
                    8 所高校 · 12 万余名师生 · 5.5 平方公里
                  </span>
                </div>

              <div class="about-stats">
                <div class="stat-card">
                  <div class="stat-icon stat-icon--blue">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M3 21h18" />
                      <path d="M5 21V7l8-4v18" />
                      <path d="M19 21V11l-6-4" />
                      <path d="M9 9v.01" />
                      <path d="M9 12v.01" />
                      <path d="M9 15v.01" />
                      <path d="M9 18v.01" />
                    </svg>
                  </div>
                  <div class="stat-number" data-target="500">0</div>
                  <div class="stat-label">合作企业</div>
                  <div class="stat-desc">覆盖智能制造、生物医药、人工智能等领域</div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon stat-icon--purple">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <div class="stat-number" data-target="120">0</div>
                  <div class="stat-label">高校研究院所</div>
                  <div class="stat-desc">携手国内顶尖高校共建产学研基地</div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon stat-icon--cyan">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div class="stat-number" data-target="50000">0</div>
                  <div class="stat-label">服务创新创业者</div>
                  <div class="stat-desc">累计孵化与赋能创业团队超万支</div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon stat-icon--green">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <div class="stat-number" data-target="100">0</div>
                  <div class="stat-label">产业基金规模(亿)</div>
                  <div class="stat-desc">链接头部投资机构赋能早期项目</div>
                </div>
              </div>
              </div>

              <!-- <div class="about-partners">
              <div class="partners-header">
                <h3 class="partners-title">合作伙伴</h3>
                <p class="partners-desc">与行业领军企业、顶尖高校、权威机构深度合作</p>
              </div>
              <div class="partners-grid">
                <div class="partner-logo"><span>清华科技园</span></div>
                <div class="partner-logo"><span>北大创业营</span></div>
                <div class="partner-logo"><span>中科院孵化</span></div>
                <div class="partner-logo"><span>腾讯云启</span></div>
                <div class="partner-logo"><span>阿里云创新</span></div>
                <div class="partner-logo"><span>百度飞桨</span></div>
                <div class="partner-logo"><span>华为云</span></div>
                <div class="partner-logo"><span>字节跳动</span></div>
                <div class="partner-logo"><span>红杉中国</span></div>
                <div class="partner-logo"><span>IDG资本</span></div>
                <div class="partner-logo"><span>真格基金</span></div>
                <div class="partner-logo"><span>高瓴创投</span></div>
              </div>
              </div>-->
            </div>
          </section>

          <!-- 页脚 -->
          <footer class="footer fp-section" id="contact" :class="{ 'is-current': fpIndex === 4 }">
            <div class="footer__giant" aria-hidden="true">
              <span>松江大学城科创源</span>
            </div>
            <div class="container">
              <div class="footer__grid">
                <div class="footer__brand">
                  <div class="footer__logo">
                    <svg viewBox="0 0 32 32" fill="none">
                      <circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke="url(#footerLogoGrad)"
                        stroke-width="2"
                      />
                      <path
                        d="M10 16L14 20L22 12"
                        stroke="url(#footerLogoGrad)"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <defs>
                        <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="32" y2="32">
                          <stop offset="0%" stop-color="#38bdf8" />
                          <stop offset="100%" stop-color="#6366f1" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <h4 class="footer__name">松江大学城科创源</h4>
                  <p class="footer__desc">
                    服务科技成果转化的沃土
                    <br />汇聚创新创业的热土 · 开放共享的乐土
                  </p>
                </div>
                <div class="footer__col">
                  <h5 class="footer__title">快速链接</h5>
                  <ul class="footer__links">
                    <li>
                      <a href="#innovation">科技成果转化</a>
                    </li>
                    <li>
                      <a href="#startup">活动报名</a>
                    </li>
                    <li>
                      <a href="#space">载体资源</a>
                    </li>
                    <li>
                      <a href="#research">产学研</a>
                    </li>
                    <li>
                      <a href="/finance-support">金融服务</a>
                    </li>
                    <li>
                      <a href="#digital">数字公共服务驿站</a>
                    </li>
                  </ul>
                </div>
                <div class="footer__col">
                  <h5 class="footer__title">关于我们</h5>
                  <ul class="footer__links">
                    <li>
                      <a href="#">平台介绍</a>
                    </li>
                    <li>
                      <a href="#">合作伙伴</a>
                    </li>
                    <li>
                      <a href="#">加入我们</a>
                    </li>
                    <li>
                      <a href="#">联系方式</a>
                    </li>
                  </ul>
                </div>
                <div class="footer__col">
                  <h5 class="footer__title">联系我们</h5>
                  <ul class="footer__contact">
                    <li>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path
                          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                        />
                      </svg>
                      021-3773 5673
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path
                          d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                        />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      service@sjdxckcy.com
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      松江区文汇路 699 号德稻大师楼 11 层
                    </li>
                  </ul>
                </div>
              </div>
              <div class="footer__bottom">
                <p>主办单位：松江大学城科创源　|　运营单位：上海松江高创源科技服务有限公司</p>
                <p>© 2026 松江大学城科创源 版权所有　|　沪ICP备2025000000号-1</p>
              </div>
            </div>
          </footer>
        </main>
      </div>

      <!-- 整屏分页导航 -->
      <nav v-if="fpEnabled" class="fp-nav" aria-label="整屏分页导航">
        <button
          v-for="(section, i) in fpSections"
          :key="section.id"
          type="button"
          class="fp-nav__dot"
          :class="{ 'is-active': i === fpIndex }"
          :aria-label="`第 ${i + 1} 屏：${section.label}`"
          :aria-current="i === fpIndex ? 'true' : undefined"
          @click="fpGoTo(i)"
        >
          <span class="fp-nav__label">{{ section.label }}</span>
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useFullPage } from '@/composables/useFullPage'
import { useHomePage } from '@/composables/useHomePage'
import { useTheme } from '@/composables/useTheme'
import { useTiltCards } from '@/composables/useTiltCards'

// 子目录部署时的静态资源前缀（如 /dxckc/）
const baseUrl = import.meta.env.BASE_URL

const { splashVisible, appVisible, splashSeconds, splashProgress, scrollProgress, hideSplash } = useHomePage()

const { index: fpIndex, enabled: fpEnabled, settling: fpSettling, goTo: fpGoTo } = useFullPage()

const fpSections = [
  { id: 'innovation', label: '新闻资讯' },
  { id: 'globe', label: '科创源' },
  { id: 'startup', label: '活动报名' },
  { id: 'about', label: '关于我们' },
  { id: 'contact', label: '联系我们' },
]

// 首屏新闻（时间轴）
const newsItems = [
  { title: '关于加快推进松江大学城科创源建设的若干政策措施', date: '2026-10-24', tag: '政策发布', type: 'policy' },
  { title: '2026 年松江区科技成果转化项目申报正式启动', date: '2026-10-21', tag: '活动通知', type: 'event' },
  { title: '人民日报：松江大学城科创源打造科技成果转化沃土', date: '2026-10-18', tag: '媒体关注', type: 'media' },
  { title: '校企双向发榜平台上线，首批发布企业技术需求 72 项', date: '2026-10-15', tag: '平台动态', type: 'platform' },
  { title: '“芯链闭门局”半导体上下游闭门交流会开始报名', date: '2026-10-12', tag: '活动通知', type: 'event' },
]

// 首屏竖向关键词数据流（每列滚动两组相同内容实现无缝循环）
const dataStreamColumns = [
  ['技术需求', '成果转化', '揭榜挂帅', '概念验证', '中试熟化', '校企对接'],
  ['专利共享', '联合实验室', '样机试制', '技术经理人', '需求发榜', '产业孵化'],
  ['科研成果', '人才共育', '产业场景', '资金链', '创新创业', '成果评价'],
  ['学科交叉', '区域协同', '项目路演', '知识产权', '平台共建', '开放共享'],
]

// 活动报名（正面信息 + 翻转背面信息）
const activities = [
  {
    status: 'open',
    type: '医工融合',
    date: '2026.10.31',
    title: '数智康复 · 医工融合——打造“智能康复新质生产力”',
    desc: '主办单位：中国康复医学会康复工程与产业促进专业委员会 · 规模 500 人',
    organizer: '中国康复医学会康复工程与产业促进专业委员会',
    scale: '500 人',
    city: '北京',
  },
  {
    status: 'open',
    type: '半导体',
    date: '2026.10.30',
    title: '“芯链闭门局”——半导体上下游闭门交流会',
    desc: '主办单位：松江大学城科创源 · 上海绿之岸碳科技有限公司 · 规模 30 人',
    organizer: '松江大学城科创源 · 上海绿之岸碳科技有限公司',
    scale: '30 人',
    city: '上海',
  },
  {
    status: 'open',
    type: '人工智能',
    date: '2026.10.29',
    title: '数智赋能——松江区 AI 赋能产业转型沙龙',
    desc: '主办单位：松江区数据局 · 规模 30 人',
    organizer: '松江区数据局',
    scale: '30 人',
    city: '上海',
  },
  {
    status: 'ended',
    type: '数字孪生',
    date: '2026.10.27',
    title: '3D 高斯与数字孪生培训和发展论坛',
    desc: '主办单位：深圳市其域创新科技股份有限公司 · 规模 80 人',
    organizer: '深圳市其域创新科技股份有限公司',
    scale: '80 人',
    city: '深圳',
  },
  {
    status: 'ended',
    type: '创业沙龙',
    date: '2026.10.27',
    title: '奉贤区退役军人创业沙龙 · 金海街道专场',
    desc: '主办单位：上海市奉贤区人民政府金海街道办事处 · 松江大学城科创源 · 规模 40 人',
    organizer: '上海市奉贤区人民政府金海街道办事处 · 松江大学城科创源',
    scale: '40 人',
    city: '线上',
  },
  {
    status: 'ended',
    type: '城市沙龙',
    date: '2026.10.23',
    title: 'GOPC 城市沙龙',
    desc: '主办单位：同橙科创产业发展集团有限公司 · 规模 20 人',
    organizer: '同橙科创产业发展集团有限公司',
    scale: '20 人',
    city: '广州',
  },
  {
    status: 'ended',
    type: '政策宣讲',
    date: '2026.10.20',
    title: '高水平大学城科创源赋能新质生产力发展先行区建设',
    desc: '主办单位：区委党校 · 规模 60 人',
    organizer: '区委党校',
    scale: '60 人',
    city: '成都',
  },
  {
    status: 'ended',
    type: '国际交流',
    date: '2026.10.20',
    title: '中国国际青年交流中心拉美青年商业领袖调研活动',
    desc: '主办单位：团区委',
    organizer: '团区委',
    scale: '规模待定',
    city: '北京',
  },
]

// 手绘地图上的 8 所高校点位（百分比定位）
const campusPoints = [
  { name: '上海外国语大学', short: '上外', tag: '语言科技 · 国际传播', url: 'https://www.shisu.edu.cn', x: 23, y: 45 },
  { name: '东华大学', short: '东华', tag: '新材料 · 纺织服装', url: 'https://www.dhu.edu.cn', x: 36, y: 34 },
  { name: '华东政法大学', short: '华政', tag: '法治营商 · 知识产权', url: 'https://www.ecupl.edu.cn', x: 48, y: 52 },
  { name: '上海对外经贸大学', short: '对外经贸', tag: '经贸金融 · 数字贸易', url: 'https://www.suibe.edu.cn', x: 58, y: 39 },
  { name: '上海立信会计金融学院', short: '立信', tag: '会计金融 · 数据审计', url: 'https://www.lixin.edu.cn', x: 68, y: 57 },
  { name: '上海工程技术大学', short: '工程大', tag: '智能制造 · 轨道交通', url: 'https://www.sues.edu.cn', x: 78, y: 41 },
  { name: '上海视觉艺术学院', short: '视觉', tag: '视觉设计 · 数字文创', url: 'https://www.siva.edu.cn', x: 85, y: 66 },
  { name: '上海体育大学', short: '体育', tag: '运动健康 · 体育科技', url: 'https://www.sus.edu.cn', x: 39, y: 68 },
]

/*
 * 科创源信息球：四块内容（关于 / 四链 / 高校 / 发榜）贴在球面四周，
 * 滚轮在这个屏内滚动时驱动球体顺时针旋转（0 → -270°），
 * 滚到发榜面板（-270°）即触发该屏的内滚动到底，之后由整屏翻页接管。
 */
const globeAngle = ref(0)
const globeStep = computed(() => {
  const step = Math.round(Math.abs(globeAngle.value) / 90)
  return Math.min(3, Math.max(0, step))
})

let globeEl = null
// 球体转到首/尾后继续滚轮时，翻屏锁（与整屏过渡时长一致）
let globeFlipLock = 0

function syncGlobe() {
  if (!globeEl) return
  const max = globeEl.scrollHeight - globeEl.clientHeight
  if (max <= 0) {
    globeAngle.value = 0
    return
  }
  const progress = Math.min(Math.max(globeEl.scrollTop / max, 0), 1)
  globeAngle.value = -270 * progress
}

/**
 * 光标落在球面面板上时，面板自身会消费滚轮（面板内容可滚动导致球体不转）。
 * 这里统一把面板内的滚轮转交给整屏滚动容器，保证任何位置滚轮都能驱动球体旋转；
 * 转到底/顶后继续滚轮，则直接翻到下一屏/上一屏。
 */
function onGlobeWheel(event) {
  if (!globeEl || !fpEnabled.value || fpIndex.value !== 1) return
  if (!(event.target instanceof Element) || !event.target.closest('.globe-panel')) return
  const max = globeEl.scrollHeight - globeEl.clientHeight
  if (max <= 0) return
  event.preventDefault()

  const next = globeEl.scrollTop + event.deltaY
  if (next <= 0) {
    flipGlobe(-1)
    return
  }
  if (next >= max) {
    globeEl.scrollTop = max
    flipGlobe(1)
    return
  }
  globeEl.scrollTop = next
}

function flipGlobe(direction) {
  const now = Date.now()
  if (now < globeFlipLock) return
  globeFlipLock = now + 820
  fpGoTo(fpIndex.value + direction)
}

// ===== 深色模式：状态由全站导航统一维护 =====
const { isDark } = useTheme()

// ===== 数字滚动 =====
function animateCount (el) {
  if (el.dataset.counted) return
  const target = Number.parseFloat(el.dataset.count)
  if (Number.isNaN(target)) return
  el.dataset.counted = 'true'
  const decimals = Number(el.dataset.decimals || 0)
  const duration = 1500
  const startTime = performance.now()
  const render = (value) => {
    el.textContent = decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-US')
  }
  const tick = (now) => {
    const progress = Math.min((now - startTime) / duration, 1)
    render(target * (1 - Math.pow(1 - progress, 3)))
    if (progress < 1) requestAnimationFrame(tick)
    else render(target)
  }
  requestAnimationFrame(tick)
}

function animateCounts (scope) {
  const root = typeof scope === 'string' ? document.querySelector(scope) : scope
  root?.querySelectorAll('[data-count]').forEach(animateCount)
}

// ===== 页脚巨字横向视差 =====
let footerEl = null
function onFooterMove (event) {
  if (!footerEl) return
  const ratio = event.clientX / window.innerWidth - 0.5
  footerEl.style.setProperty('--footer-shift', `${(-ratio * 60).toFixed(1)}px`)
}

onMounted(() => {
  globeEl = document.getElementById('globe')
  globeEl?.addEventListener('scroll', syncGlobe, { passive: true })
  globeEl?.addEventListener('wheel', onGlobeWheel, { passive: false })
  // 小屏回退为普通滚动时由 window 驱动
  window.addEventListener('scroll', syncGlobe, { passive: true })
  syncGlobe()

  footerEl = document.querySelector('.footer')
  window.addEventListener('mousemove', onFooterMove, { passive: true })
})

onBeforeUnmount(() => {
  globeEl?.removeEventListener('scroll', syncGlobe)
  globeEl?.removeEventListener('wheel', onGlobeWheel)
  window.removeEventListener('scroll', syncGlobe)
  window.removeEventListener('mousemove', onFooterMove)
  footerEl = null
})

const progressValue = computed(() => {
  if (!fpEnabled.value) return scrollProgress.value
  return (fpIndex.value + 1) / fpSections.length
})

const currentSectionLabel = computed(() => {
  if (fpEnabled.value) return fpSections[fpIndex.value]?.label || ''
  const ratio = Math.min(Math.max(scrollProgress.value, 0), 0.999)
  return fpSections[Math.floor(ratio * fpSections.length)]?.label || ''
})

// ===== 返回顶部 =====
const showBackTop = computed(() => {
  if (fpEnabled.value) return fpIndex.value > 0
  return scrollProgress.value > 0.06
})

function backToTop () {
  if (fpEnabled.value) {
    fpGoTo(0)
    return
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 整屏切换时把焦点移出可能被裁切的元素，避免键盘 Tab 落到屏幕外
watch(fpIndex, (index) => {
  if (fpEnabled.value) document.activeElement?.blur?.()
  if (index === 1) animateCounts('.globe-panel--1')
  if (index === 3) animateCounts('.about-stats')
})

// 转到发榜面板时再触发数字滚动
watch(globeStep, (step) => {
  if (step === 3) animateCounts('.globe-panel--4')
})

// 首屏内容出现后再开始滚动数字
watch(appVisible, (visible) => {
  if (!visible) return
  animateCounts('.news-list')
  if (!fpEnabled.value) document.querySelectorAll('[data-count]').forEach(animateCount)
})

const techKeywords = [
  '人工智能',
  '集成电路',
  '生物医药',
  '智能制造',
  '新材料',
  '新能源',
  '空天科技',
  '量子信息',
  '6G 通信',
  '低碳技术',
]

useTiltCards('.activity-card, .stat-card, .uni-card, .case-card')
</script>

<style scoped src="../assets/styles/home.css"></style>
<style scoped>
/* ============================================================
       * 下拉菜单（nav__dropdown）
       * 契合原站：冰蓝渐变 / 玻璃拟态 / 300ms cubic-bezier 动画
       * 支持二级 + 三级（fly-out）
       * ============================================================ */
.nav__item--dropdown {
  position: relative;
}
.nav__dropdown-caret {
  width: 12px;
  height: 12px;
  margin-left: 4px;
  transition: transform var(--duration-base, 300ms)
    var(--ease-default, cubic-bezier(0.4, 0, 0.2, 1));
  vertical-align: -1px;
}
.nav__item--dropdown:hover .nav__dropdown-caret,
.nav__item--dropdown.is-open .nav__dropdown-caret {
  transform: rotate(180deg);
}

.nav__dropdown-trigger {
  display: inline-flex;
  align-items: center;
}

/* ---- 二级面板 ---- */
.nav__dropdown-menu {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translate(-50%, -8px);
  min-width: 200px;
  padding: 8px;
  background: #fff;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-light, #e2e8f0);
  border-radius: var(--radius-lg, 12px);
  box-shadow: var(--shadow-medium, 0 8px 32px rgba(14, 165, 233, 0.12)),
    var(--shadow-glow, 0 0 32px rgba(56, 189, 248, 0.25));
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity var(--duration-base, 300ms)
      var(--ease-default, cubic-bezier(0.4, 0, 0.2, 1)),
    transform var(--duration-base, 300ms)
      var(--ease-default, cubic-bezier(0.4, 0, 0.2, 1)),
    visibility 0s linear var(--duration-base, 300ms);
  z-index: 200;
}
.nav__dropdown-menu::before {
  content: '';
  position: absolute;
  top: -7px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 12px;
  height: 12px;
  background: #fff;
  border-left: 1px solid var(--border-light, #e2e8f0);
  border-top: 1px solid var(--border-light, #e2e8f0);
  border-radius: 2px;
}
/* 透明连接桥：填满触发项与面板之间 10px 的间隙，避免 hover 中断 */
.nav__dropdown-menu::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: -12px;
  height: 12px;
}

.nav__item--dropdown:hover > .nav__dropdown-menu,
.nav__item--dropdown.is-open > .nav__dropdown-menu {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translate(-50%, 0);
  transition-delay: 0s;
}

/* ---- 二级菜单项 ---- */
.nav__dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary, #64748b);
  border-radius: var(--radius-md, 8px);
  position: relative;
  transition: color var(--duration-fast, 150ms)
      var(--ease-default, cubic-bezier(0.4, 0, 0.2, 1)),
    background var(--duration-fast, 150ms)
      var(--ease-default, cubic-bezier(0.4, 0, 0.2, 1));
}
.nav__dropdown-item::after {
  content: '';
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 6px;
  height: 2px;
  border-radius: 1px;
  background: var(--accent-gradient, linear-gradient(135deg, #38bdf8, #6366f1));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--duration-base, 300ms)
    var(--ease-default, cubic-bezier(0.4, 0, 0.2, 1));
}
.nav__dropdown-item:hover {
  color: var(--text-primary, #0f172a);
  background: var(
    --accent-gradient-soft,
    linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(99, 102, 241, 0.1))
  );
}
.nav__dropdown-item:hover::after {
  transform: scaleX(1);
}

.nav__dropdown-item > .arrow {
  width: 14px;
  height: 14px;
  opacity: 0;
  transform: translateX(-4px);
  color: var(--accent-deep, #0ea5e9);
  transition: opacity var(--duration-fast, 150ms)
      var(--ease-default, cubic-bezier(0.4, 0, 0.2, 1)),
    transform var(--duration-fast, 150ms)
      var(--ease-default, cubic-bezier(0.4, 0, 0.2, 1));
}
.nav__dropdown-item:hover > .arrow {
  opacity: 1;
  transform: translateX(0);
}

/* 有三级子菜单的项：右箭头常驻 */
.nav__dropdown-item--has-sub > .arrow {
  opacity: 0.45;
  transform: none;
}
.nav__dropdown-item--has-sub:hover > .arrow {
  opacity: 1;
  transform: translateX(2px);
}

/* ---- 三级面板（向右飞出） ---- */
.nav__submenu {
  position: absolute;
  top: -9px;
  left: calc(100% + 6px);
  min-width: 190px;
  padding: 8px;
  background: #fff;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-light, #e2e8f0);
  border-radius: var(--radius-lg, 12px);
  box-shadow: var(--shadow-medium, 0 8px 32px rgba(14, 165, 233, 0.12)),
    var(--shadow-glow, 0 0 32px rgba(56, 189, 248, 0.2));
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateX(-8px);
  transition: opacity var(--duration-base, 300ms)
      var(--ease-default, cubic-bezier(0.4, 0, 0.2, 1)),
    transform var(--duration-base, 300ms)
      var(--ease-default, cubic-bezier(0.4, 0, 0.2, 1)),
    visibility 0s linear var(--duration-base, 300ms);
  z-index: 210;
}
.nav__submenu::before {
  content: '';
  position: absolute;
  left: -7px;
  top: 20px;
  width: 12px;
  height: 12px;
  background: #fff;
  border-left: 1px solid var(--border-light, #e2e8f0);
  border-bottom: 1px solid var(--border-light, #e2e8f0);
  transform: rotate(45deg);
  border-radius: 2px;
}
/* 透明连接桥：填满二级项与三级面板之间 6px 的间隙，避免 hover 中断 */
.nav__submenu::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: -10px;
  width: 10px;
}
.nav__dropdown-item--has-sub:hover > .nav__submenu,
.nav__dropdown-item--has-sub.is-open > .nav__submenu {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateX(0);
  transition-delay: 0s;
}

.nav__submenu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  font-size: 13.5px;
  font-weight: 500;
  color: var(--text-secondary, #64748b);
  border-radius: var(--radius-md, 8px);
  position: relative;
  white-space: nowrap;
  transition: color var(--duration-fast, 150ms)
      var(--ease-default, cubic-bezier(0.4, 0, 0.2, 1)),
    background var(--duration-fast, 150ms)
      var(--ease-default, cubic-bezier(0.4, 0, 0.2, 1));
}
.nav__submenu-item::after {
  content: '';
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 5px;
  height: 2px;
  border-radius: 1px;
  background: var(--accent-gradient, linear-gradient(135deg, #38bdf8, #6366f1));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--duration-base, 300ms)
    var(--ease-default, cubic-bezier(0.4, 0, 0.2, 1));
}
.nav__submenu-item:hover {
  color: var(--text-primary, #0f172a);
  background: var(
    --accent-gradient-soft,
    linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(99, 102, 241, 0.1))
  );
}
.nav__submenu-item:hover::after {
  transform: scaleX(1);
}

.nav__submenu-item .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-gradient, linear-gradient(135deg, #38bdf8, #6366f1));
  flex-shrink: 0;
  opacity: 0.7;
  transition: opacity var(--duration-fast, 150ms) ease,
    transform var(--duration-fast, 150ms) ease;
}
.nav__submenu-item:hover .dot {
  opacity: 1;
  transform: scale(1.25);
}

/* ---- 移动端：手风琴展开 ---- */
@media (max-width: 768px) {
  .nav__item--dropdown {
    width: 100%;
  }
  .nav__dropdown-trigger {
    width: 100%;
    justify-content: space-between;
  }

  .nav__dropdown-menu {
    position: static;
    transform: none;
    min-width: 0;
    width: 100%;
    margin-top: 4px;
    padding: 4px;
    box-shadow: none;
    border: 1px dashed var(--border-light, #e2e8f0);
    background: rgba(56, 189, 248, 0.04);
    max-height: 0;
    overflow: hidden;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transition: max-height var(--duration-base, 300ms)
        var(--ease-default, cubic-bezier(0.4, 0, 0.2, 1)),
      padding var(--duration-base, 300ms)
        var(--ease-default, cubic-bezier(0.4, 0, 0.2, 1));
  }
  .nav__dropdown-menu::before {
    display: none;
  }
  .nav__item--dropdown.is-open > .nav__dropdown-menu {
    max-height: 800px;
    padding: 6px;
  }
  .nav__dropdown-item {
    padding: 10px 12px;
  }

  /* 三级在移动端内联 */
  .nav__dropdown-item--has-sub {
    flex-wrap: wrap;
  }
  .nav__submenu {
    position: static;
    transform: none;
    min-width: 0;
    width: 100%;
    margin-top: 4px;
    padding: 4px;
    box-shadow: none;
    border: 1px dashed var(--border-light, #e2e8f0);
    background: rgba(99, 102, 241, 0.05);
    max-height: 0;
    overflow: hidden;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transition: max-height var(--duration-base, 300ms)
        var(--ease-default, cubic-bezier(0.4, 0, 0.2, 1)),
      padding var(--duration-base, 300ms)
        var(--ease-default, cubic-bezier(0.4, 0, 0.2, 1));
  }
  .nav__submenu::before {
    display: none;
  }
  .nav__dropdown-item--has-sub.is-open > .nav__submenu {
    max-height: 600px;
    padding: 6px;
  }
  .nav__submenu-item {
    padding: 8px 12px;
    font-size: 13px;
  }

  /* 移动端把右箭头改成下箭头 */
  .nav__dropdown-item--has-sub > .arrow {
    transform: rotate(0deg);
    transition: transform var(--duration-base, 300ms)
      var(--ease-default, cubic-bezier(0.4, 0, 0.2, 1));
  }
  .nav__dropdown-item--has-sub.is-open > .arrow {
    transform: rotate(90deg);
  }
}

/* ===== 首屏倒计时 ===== */
.splash-countdown {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: fit-content;
  margin: 18px auto 0;
  padding: 10px 24px 10px 10px;
  border-radius: 999px;
  color: #fff;
  background: rgba(15, 23, 42, 0.72);
  border: 1px solid rgba(56, 189, 248, 0.45);
  box-shadow: 0 8px 32px rgba(56, 189, 248, 0.22);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: background var(--duration-fast) var(--ease-default),
    border-color var(--duration-fast) var(--ease-default),
    transform var(--duration-fast) var(--ease-default);
}
.splash-countdown:hover {
  background: rgba(15, 23, 42, 0.88);
  border-color: var(--accent-ice, #38bdf8);
  transform: translateY(-2px);
}
.splash-countdown__ring {
  position: relative;
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
}
.splash-countdown__ring svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}
.splash-countdown__track,
.splash-countdown__bar {
  fill: none;
  stroke-width: 3.5;
}
.splash-countdown__track {
  stroke: rgba(255, 255, 255, 0.22);
}
.splash-countdown__bar {
  stroke: var(--accent-ice, #38bdf8);
  stroke-linecap: round;
  stroke-dasharray: 113.1;
  transition: stroke-dashoffset 80ms linear;
}
.splash-countdown__num {
  position: relative;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  font-variant-numeric: tabular-nums;
}
.splash-countdown__main {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #fff;
  white-space: nowrap;
}
.splash-countdown__divider {
  width: 1px;
  height: 16px;
  background: rgba(255, 255, 255, 0.25);
}
.splash-countdown__skip {
  font-size: 13px;
  color: var(--accent-ice, #38bdf8);
  white-space: nowrap;
}

@media (max-width: 480px) {
  .splash-countdown {
    gap: 10px;
    padding: 8px 18px 8px 8px;
  }
  .splash-countdown__ring {
    width: 36px;
    height: 36px;
  }
  .splash-countdown__main {
    font-size: 13px;
  }
  .splash-countdown__skip {
    font-size: 12px;
  }
}

/* ============================================================
       * 科技感视觉层
       * 1. 顶部滚动进度条
       * 2. 首屏（轮播 + 新闻）独占一屏：极光 / 网格 / 扫描线
       * 3. 轮播 HUD 边角
       * 4. 科技关键词跑马灯
       * 5. 卡片光标光斑
       * 6. 标题渐变与动效分隔线
       * ============================================================ */

/* ---- 滚动进度条 ---- */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 400;
  pointer-events: none;
  background: rgba(148, 163, 184, 0.12);
}
.scroll-progress span {
  display: block;
  height: 100%;
  transform-origin: left center;
  background: linear-gradient(
    90deg,
    var(--accent-ice, #38bdf8),
    var(--accent-purple, #6366f1)
  );
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.65);
  transition: transform 120ms linear;
}

/* 用 clip 代替 hidden：避免创建滚动容器导致吸顶导航失效 */
.page--home {
  overflow-x: clip;
}

/* ---- 首屏独占一屏 ---- */
.page--home .news-section {
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: calc(100vh - var(--home-nav-h, 64px));
  min-height: calc(var(--home-viewport-h, 100vh) - var(--home-nav-h, 64px));
  padding: clamp(28px, 6vh, 72px) 0 0;
  overflow: hidden;
}
.page--home .news-section > .container {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: clamp(10px, 1.8vh, 22px);
  flex: 1;
  width: 100%;
}

/* ---- 轮播上方艺术字标语 ---- */
.hero-slogan {
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: clamp(12px, 1.6vw, 26px);
}
.hero-slogan__title {
  position: relative;
  display: flex;
  align-items: center;
  gap: clamp(10px, 1.2vw, 22px);
  margin: 0;
  font-size: clamp(28px, 3.4vw, 56px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: 0.14em;
  white-space: nowrap;
}
/* 悬停时文字背后的柔光底 */
.hero-slogan__title::before {
  content: '';
  position: absolute;
  inset: -35% -8%;
  background: radial-gradient(
    ellipse at center,
    rgba(56, 189, 248, 0.3),
    rgba(99, 102, 241, 0.12) 45%,
    transparent 72%
  );
  opacity: 0;
  transform: scale(0.92);
  transition: opacity 320ms ease, transform 320ms ease;
  pointer-events: none;
  z-index: -1;
}
.hero-slogan__title:hover::before {
  opacity: 0.12;
  transform: scale(1);
}
.hero-slogan__text {
  background-image: linear-gradient(
    100deg,
    #075985 0%,
    #0284c7 34%,
    #0ea5e9 62%,
    #4f46e5 100%
  );
  background-size: 220% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 3px 12px rgba(56, 189, 248, 0.4));
  transition: filter 320ms ease;
  animation: sloganShimmer 7s ease-in-out infinite alternate;
}
/* 悬停：只有光晕微微变化，文字位置与字形保持不动 */
.hero-slogan__title:hover .hero-slogan__text {
  filter: drop-shadow(0 0 7px rgba(56, 189, 248, 0.28));
  animation-play-state: paused;
}
@keyframes sloganShimmer {
  from { background-position: 0% 50%; }
  to { background-position: 100% 50%; }
}
.hero-slogan__diamond {
  flex: none;
  width: clamp(5px, 0.5vw, 8px);
  height: clamp(5px, 0.5vw, 8px);
  transform: rotate(45deg);
  background: linear-gradient(135deg, #38bdf8, #6366f1);
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.8);
}
.hero-slogan__line {
  flex: 0 1 clamp(28px, 6vw, 110px);
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.75));
}
.hero-slogan__line:last-child {
  background: linear-gradient(90deg, rgba(99, 102, 241, 0.75), transparent);
}
@media (prefers-reduced-motion: reduce) {
  .hero-slogan__text {
    animation: none;
  }
  .hero-slogan__title:hover .hero-slogan__text {
    animation: none;
  }
}
.page--home .news-section .news-wrap {
  width: 100%;
  min-height: 0;
  /* 与大标语拉开一点距离，同时把轮播 + 新闻整体往下压，减少底部留白 */
  margin-top: clamp(18px, 5vh, 60px);
}
/* 轮播与右侧资讯用同一高度变量，保证两者底部严格对齐 */
.page--home .news-section {
  --news-block-h: clamp(320px, 56vh, 620px);
}
.page--home .news-section .carousel {
  height: var(--news-block-h);
}
.page--home .news-section .news-list {
  min-height: 0;
}
/* 整屏模式下给资讯面板定高，超出的时间轴在面板内部滚动 */
.page--home.fp-on .news-section .news-list {
  height: var(--news-block-h);
}
.page--home .news-section .news-timeline {
  scrollbar-width: thin;
  scrollbar-color: rgba(56, 189, 248, 0.4) transparent;
  overscroll-behavior: contain;
}
.page--home .news-section .news-timeline::-webkit-scrollbar {
  width: 5px;
}
.page--home .news-section .news-timeline::-webkit-scrollbar-track {
  background: transparent;
}
.page--home .news-section .news-timeline::-webkit-scrollbar-thumb {
  background: rgba(56, 189, 248, 0.32);
  border-radius: 3px;
}
.page--home .news-section .news-timeline::-webkit-scrollbar-thumb:hover {
  background: rgba(56, 189, 248, 0.6);
}
.page--home .news-section .news-list__items {
  overflow-y: auto;
}

/* 资讯条：标题在上，分类标签 + 日期在同一行 */
.news-item__meta {
  display: flex;
  align-items: center;
  gap: 8px;
}
.news-item__meta .news-item__date::before {
  content: '·';
  margin-right: 8px;
  color: var(--border-light);
}
.news-item__tag--policy {
  color: #0ea5e9;
  background: rgba(14, 165, 233, 0.1);
}
.news-item__tag--event {
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
}
.news-item__tag--media {
  color: #0f9d76;
  background: rgba(16, 185, 129, 0.12);
}
.news-item__tag--platform {
  color: #b45309;
  background: rgba(245, 158, 11, 0.14);
}
.news-list__count {
  padding: 10px 20px;
  font-size: 12px;
  color: var(--text-muted);
  text-align: center;
  border-top: 1px solid var(--border-light);
  background: rgba(248, 250, 252, 0.6);
}

/* 活动卡：人数/城市统计已并入摘要（主办单位 · 规模），隐藏原统计区 */
.activity-card__stats {
  display: none;
}
.activity-card__footer {
  justify-content: flex-end;
}
.badge--ended {
  background: rgba(148, 163, 184, 0.18);
  color: var(--text-secondary);
}
.activity-card--ended {
  opacity: 0.8;
}
.activity-card--ended .activity-card__footer {
  display: none;
}

/* 页脚底部信息：主办 / 运营 / 版权备案分两行，整体居中 */
.footer__bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;
}

/* 轮播底图来源标注 */
.carousel__credit {
  position: absolute;
  right: 14px;
  bottom: 10px;
  z-index: 3;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.62);
  letter-spacing: 0.3px;
  text-shadow: 0 1px 4px rgba(15, 23, 42, 0.6);
  pointer-events: none;
}

/* ---- 极光 / 网格 / 扫描线 ---- */
.tech-backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}
/* 鼠标跟随柔光（前景光斑，z-index 最高） */
.tech-backdrop__spotlight {
  position: absolute;
  inset: -20%;
  background: radial-gradient(
    circle 380px at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(56, 189, 248, calc(0.16 * var(--mouse-active, 1))),
    rgba(99, 102, 241, calc(0.08 * var(--mouse-active, 1))) 35%,
    transparent 65%
  );
  opacity: calc(0.85 * var(--mouse-active, 1));
  transition: opacity 320ms ease;
  mix-blend-mode: screen;
}
/* 轻微视差：各层 transform 幅度不同，制造纵深 */
/* photo 与 glow 层原有的 float/drift 动画已合并到各自的 keyframes 中 */
.tech-backdrop__grid {
  transform: translate3d(
    calc(var(--mouse-rx, 0) * 10px),
    calc(var(--mouse-ry, 0) * 10px),
    0
  );
  transition: transform 220ms ease-out;
  will-change: transform;
}
.tech-backdrop__particles {
  transform: translate3d(
    calc(var(--mouse-rx, 0) * 12px),
    calc(var(--mouse-ry, 0) * 12px),
    0
  );
  transition: transform 220ms ease-out;
  will-change: transform;
}
.tech-backdrop__beam--1,
.tech-backdrop__beam--2 {
  transform-origin: center;
  transition: transform 260ms ease-out, opacity 300ms ease;
}
.tech-backdrop__beam--1 {
  transform: translate3d(calc(var(--mouse-rx, 0) * 8px), 0, 0) rotate(18deg);
}
.tech-backdrop__beam--2 {
  transform: translate3d(calc(var(--mouse-rx, 0) * -8px), 0, 0) rotate(-18deg);
}
.tech-backdrop__grid {
  position: absolute;
  inset: -25% -12%;
  background-image: linear-gradient(
      rgba(56, 189, 248, 0.12) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(56, 189, 248, 0.12) 1px, transparent 1px);
  background-size: 56px 56px;
  -webkit-mask-image: radial-gradient(
    ellipse 70% 60% at 50% 45%,
    #000 0%,
    transparent 78%
  );
  mask-image: radial-gradient(
    ellipse 70% 60% at 50% 45%,
    #000 0%,
    transparent 78%
  );
  animation: techGridDrift 26s linear infinite;
}
.tech-backdrop__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.55;
}
.tech-backdrop__glow--1 {
  width: 46vw;
  height: 46vw;
  max-width: 620px;
  max-height: 620px;
  top: -18%;
  left: -8%;
  background: radial-gradient(
    circle,
    rgba(56, 189, 248, 0.35),
    transparent 70%
  );
  animation: techGlowFloat 18s ease-in-out infinite alternate;
}
.tech-backdrop__glow--2 {
  width: 42vw;
  height: 42vw;
  max-width: 560px;
  max-height: 560px;
  right: -6%;
  bottom: -22%;
  background: radial-gradient(
    circle,
    rgba(99, 102, 241, 0.28),
    transparent 72%
  );
  animation: techGlowFloatRev 22s ease-in-out infinite alternate-reverse;
}
.tech-backdrop__scan {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 180px;
  opacity: 0;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(125, 211, 252, 0.16),
    transparent
  );
  animation: techScan 11s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
/* 装饰浮动点：四角/边缘呼吸小圆点 */
.tech-backdrop__dot {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(56, 189, 248, 0.9),
    rgba(56, 189, 248, 0.3) 60%,
    transparent 100%
  );
  filter: blur(0.5px);
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.45);
  animation: techDotPulse 5s ease-in-out infinite;
}
.tech-backdrop__dot--1 {
  top: 18%;
  left: 8%;
  width: 10px;
  height: 10px;
  animation-delay: 0s;
}
.tech-backdrop__dot--2 {
  bottom: 28%;
  right: 12%;
  width: 7px;
  height: 7px;
  animation-delay: -2.3s;
}
.tech-backdrop__dot--3 {
  bottom: 14%;
  left: 22%;
  width: 6px;
  height: 6px;
  background: radial-gradient(
    circle,
    rgba(99, 102, 241, 0.9),
    rgba(99, 102, 241, 0.25) 60%,
    transparent 100%
  );
  box-shadow: 0 0 8px rgba(99, 102, 241, 0.4);
  animation-delay: -3.7s;
}
/* 装饰细环：微呼吸描边圆环，不抢戏 */
.tech-backdrop__ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(56, 189, 248, 0.35);
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.18) inset;
  animation: techRingPulse 7s ease-in-out infinite;
}
.tech-backdrop__ring--1 {
  top: 10%;
  right: 22%;
  width: 180px;
  height: 180px;
  animation-delay: -1.2s;
}
.tech-backdrop__ring--2 {
  bottom: 8%;
  left: 4%;
  width: 120px;
  height: 120px;
  border-color: rgba(99, 102, 241, 0.3);
  box-shadow: 0 0 18px rgba(99, 102, 241, 0.15) inset;
  animation-delay: -4.4s;
}
@keyframes techDotPulse {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(0.9);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}
@keyframes techRingPulse {
  0%,
  100% {
    opacity: 0.28;
    transform: scale(0.96);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.06);
  }
}
/* 科创园实景底图（淡化处理，铺满首屏空白区域） */
.tech-backdrop__photo {
  position: absolute;
  inset: 0;
  background-image: url('../assets/images/campus-bg.jpg');
  background-size: cover;
  background-position: center 58%;
  opacity: 0.38;
  filter: grayscale(0.15) saturate(0.9) contrast(0.95);
  -webkit-mask-image: radial-gradient(
    ellipse 96% 90% at 50% 52%,
    #000 16%,
    transparent 92%
  );
  mask-image: radial-gradient(
    ellipse 96% 90% at 50% 52%,
    #000 16%,
    transparent 92%
  );
  animation: techPhotoDrift 46s ease-in-out infinite alternate;
}
/* 淡色蒙层，保证前景文字与轮播图对比度 */
.tech-backdrop::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(248, 250, 252, 0.52) 0%,
    rgba(248, 250, 252, 0.2) 38%,
    rgba(248, 250, 252, 0.66) 100%
  );
  pointer-events: none;
}
/* 斜向科技光束 */
.tech-backdrop__beam {
  position: absolute;
  top: -25%;
  width: 2px;
  height: 150%;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(56, 189, 248, 0.5) 35%,
    rgba(99, 102, 241, 0.18) 62%,
    transparent 100%
  );
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
  opacity: 0.65;
  animation: techBeam 9s ease-in-out infinite alternate;
}
.tech-backdrop__beam--1 {
  left: 22%;
  transform: rotate(18deg);
}
.tech-backdrop__beam--2 {
  left: 76%;
  transform: rotate(-18deg);
  animation-delay: -4s;
}
/* 细颗粒粒子层 */
.tech-backdrop__particles {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
      circle,
      rgba(14, 165, 233, 0.5) 0 1px,
      transparent 1.6px
    ),
    radial-gradient(circle, rgba(99, 102, 241, 0.45) 0 1px, transparent 1.6px);
  background-size: 180px 180px, 260px 260px;
  background-position: 10px 20px, 100px 130px;
  -webkit-mask-image: radial-gradient(
    ellipse 72% 68% at 50% 50%,
    #000 26%,
    transparent 86%
  );
  mask-image: radial-gradient(
    ellipse 72% 68% at 50% 50%,
    #000 26%,
    transparent 86%
  );
  opacity: 0.6;
  animation: techParticles 11s ease-in-out infinite alternate;
}
@keyframes techPhotoDrift {
  from {
    transform: translate3d(
        calc(var(--mouse-rx, 0) * -6px),
        calc(var(--mouse-ry, 0) * -6px),
        0
      )
      scale(1.04);
  }
  to {
    transform: translate3d(
        calc(calc(var(--mouse-rx, 0) * -6px) - 1.5%),
        calc(calc(var(--mouse-ry, 0) * -6px) - 1%),
        0
      )
      scale(1.1);
  }
}
@keyframes techBeam {
  from {
    opacity: 0.18;
  }
  to {
    opacity: 0.62;
  }
}
@keyframes techParticles {
  from {
    opacity: 0.22;
    background-position: 10px 20px, 100px 130px;
  }
  to {
    opacity: 0.55;
    background-position: 26px 46px, 118px 156px;
  }
}
@keyframes techGridDrift {
  to {
    background-position: 56px 56px, 56px 56px;
  }
}
@keyframes techGlowFloat {
  from {
    transform: translate3d(
        calc(var(--mouse-rx, 0) * 14px),
        calc(var(--mouse-ry, 0) * 14px),
        0
      )
      scale(1);
  }
  to {
    transform: translate3d(
        calc(calc(var(--mouse-rx, 0) * 14px) + 4%),
        calc(calc(var(--mouse-ry, 0) * 14px) + 6%),
        0
      )
      scale(1.12);
  }
}
@keyframes techGlowFloatRev {
  from {
    transform: translate3d(
        calc(var(--mouse-rx, 0) * -16px),
        calc(var(--mouse-ry, 0) * -16px),
        0
      )
      scale(1);
  }
  to {
    transform: translate3d(
        calc(calc(var(--mouse-rx, 0) * -16px) - 4%),
        calc(calc(var(--mouse-ry, 0) * -16px) - 6%),
        0
      )
      scale(1.08);
  }
}
@keyframes techScan {
  0% {
    transform: translateY(-180px);
    opacity: 0;
  }
  12% {
    opacity: 0.9;
  }
  70% {
    transform: translateY(calc(100vh));
    opacity: 0.9;
  }
  100% {
    transform: translateY(calc(100vh));
    opacity: 0;
  }
}

/* ---- 轮播 HUD 边角 ---- */
.carousel-hud {
  position: absolute;
  inset: 12px;
  z-index: 3;
  pointer-events: none;
}
.carousel-hud i {
  position: absolute;
  width: 26px;
  height: 26px;
  border: 2px solid rgba(186, 230, 253, 0.85);
  filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.55));
}
.carousel-hud i:nth-child(1) {
  top: 0;
  left: 0;
  border-right: 0;
  border-bottom: 0;
  border-top-left-radius: 8px;
}
.carousel-hud i:nth-child(2) {
  top: 0;
  right: 0;
  border-left: 0;
  border-bottom: 0;
  border-top-right-radius: 8px;
}
.carousel-hud i:nth-child(3) {
  bottom: 0;
  left: 0;
  border-right: 0;
  border-top: 0;
  border-bottom-left-radius: 8px;
}
.carousel-hud i:nth-child(4) {
  right: 0;
  bottom: 0;
  border-top: 0;
  border-left: 0;
  border-bottom-right-radius: 8px;
}

/* ---- 科技关键词跑马灯 ---- */
.tech-ticker {
  position: relative;
  z-index: 1;
  margin-top: auto;
  overflow: hidden;
  border-top: 1px solid rgba(226, 232, 240, 0.9);
  background: linear-gradient(
    90deg,
    rgba(56, 189, 248, 0.06),
    rgba(99, 102, 241, 0.06)
  );
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent,
    #000 8%,
    #000 92%,
    transparent
  );
  mask-image: linear-gradient(
    90deg,
    transparent,
    #000 8%,
    #000 92%,
    transparent
  );
}
.tech-ticker__track {
  display: flex;
  align-items: center;
  width: max-content;
  padding: 11px 0;
  animation: techTickerScroll 130s linear infinite;
}
.tech-ticker__group {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
}
.tech-ticker:hover .tech-ticker__track {
  animation-play-state: paused;
}
.tech-ticker__item {
  position: relative;
  margin-right: 44px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 2px;
  color: var(--text-secondary, #64748b);
  white-space: nowrap;
}
.tech-ticker__item::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -26px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent-ice, #38bdf8);
  opacity: 0.6;
  transform: translateY(-50%);
}
@keyframes techTickerScroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

/* ---- 卡片光标光斑 ---- */
.page--home .activity-card::after,
.page--home .stat-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    260px circle at var(--x, 50%) var(--y, 50%),
    rgba(56, 189, 248, 0.16),
    transparent 70%
  );
  opacity: 0;
  transition: opacity var(--duration-base, 300ms) var(--ease-default);
  pointer-events: none;
}
.page--home .stat-card {
  overflow: hidden;
  border-radius: 12px;
}
.page--home .activity-card:hover::after,
.page--home .stat-card:hover::after {
  opacity: 1;
}

/* ---- 标题渐变 / 动效分隔线 ---- */
.page--home .about-header .section-title {
  background: linear-gradient(115deg, #0f172a 0%, #0284c7 48%, #6366f1 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
.page--home .about-header::after {
  content: '';
  display: block;
  width: 96px;
  height: 3px;
  margin: 22px auto 0;
  border-radius: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--accent-ice, #38bdf8) 35%,
    var(--accent-purple, #6366f1) 65%,
    transparent
  );
  animation: aboutUnderline 3.2s ease-in-out infinite;
}
@keyframes aboutUnderline {
  0%,
  100% {
    opacity: 0.55;
    transform: scaleX(0.8);
  }
  50% {
    opacity: 1;
    transform: scaleX(1);
  }
}

/* ---- 小节标题脉冲点 ---- */
.page--home .section-header__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.page--home .section-header__eyebrow::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-deep, #0ea5e9);
  animation: eyebrowPulse 2.2s ease-in-out infinite;
}
@keyframes eyebrowPulse {
  0%,
  100% {
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.12);
    opacity: 0.8;
  }
  50% {
    box-shadow: 0 0 0 7px rgba(56, 189, 248, 0.03);
    opacity: 1;
  }
}

/* ---- 区块分隔流光 ---- */
.page--home .activities-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 30%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(56, 189, 248, 0.9),
    transparent
  );
  animation: sectionShimmer 7s linear infinite;
  pointer-events: none;
}
@keyframes sectionShimmer {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(430%);
  }
}

@media (max-width: 768px) {
  .page--home .news-section {
    padding-top: 16px;
  }
  .hero-slogan__line {
    display: none;
  }
  .hero-slogan__title {
    font-size: clamp(18px, 4.8vw, 26px);
    letter-spacing: 0.06em;
    gap: 8px;
  }
  .page--home .news-section {
    --news-block-h: clamp(220px, 40vh, 340px);
  }
  .carousel-hud {
    display: none;
  }
  .tech-ticker__item {
    margin-right: 32px;
    font-size: 12px;
  }
  .tech-ticker__item::after {
    right: -19px;
  }
}

/* 矮窗口：精简资讯条数，保证首屏仍是一屏 */
@media (min-width: 769px) and (max-height: 700px) {
  .page--home .news-section {
    --news-block-h: clamp(240px, 46vh, 400px);
  }
  .page--home .news-item:nth-child(n + 4) {
    display: none;
  }
}

/* ============================================================
       * 整屏滚动（full-page scroll）
       * 仅在 .fp-on 下生效，小屏自动回退为普通滚动
       * ============================================================ */
.page--home.fp-on .fp-viewport {
  height: calc(100vh - var(--home-nav-h, 64px));
  height: calc(var(--home-viewport-h, 100vh) - var(--home-nav-h, 64px));
  overflow: hidden;
}
.page--home.fp-on .fp-track {
  height: 100%;
  transition: transform 820ms cubic-bezier(0.76, 0, 0.24, 1);
}
.page--home.fp-on .fp-track.is-settling {
  transition: none;
}
.page--home.fp-on .fp-track > .fp-section {
  height: 100%;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;
}
.page--home.fp-on .fp-track > .fp-section::-webkit-scrollbar {
  width: 0;
  height: 0;
}

/* 装饰光晕改为背景，避免伪元素撑大滚动高度 */
.page--home .about-section::before,
.page--home .about-section::after {
  content: none;
}
.page--home .about-section {
  background-image: radial-gradient(
      circle at 100% 0%,
      rgba(56, 189, 248, 0.07) 0%,
      transparent 32%
    ),
    radial-gradient(
      circle at 0% 100%,
      rgba(99, 102, 241, 0.06) 0%,
      transparent 30%
    );
  background-repeat: no-repeat;
}

/* 各屏在整屏模式下垂直居中 */
.page--home.fp-on .activities-section.fp-section,
.page--home.fp-on .about-section.fp-section {
  display: flex;
  align-items: flex-start;
}
/* 页脚：水印在上、主体贴底，剩余空白由两个 auto 边距平分，水印自然落在上部中间 */
.page--home.fp-on .footer.fp-section {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.page--home.fp-on .activities-section .activity-grid-scroll {
  max-height: calc(
    var(--home-viewport-h, 100vh) - var(--home-nav-h, 64px) - 230px
  );
}
/* 跑马灯两侧渐隐，避免卡片在容器边缘被硬切 */
.page--home .activity-grid-scroll {
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent 0,
    #000 28px,
    #000 calc(100% - 28px),
    transparent 100%
  );
  mask-image: linear-gradient(
    90deg,
    transparent 0,
    #000 28px,
    #000 calc(100% - 28px),
    transparent 100%
  );
}
@media (max-height: 800px) {
  .page--home.fp-on .activities-section .activity-grid {
    grid-template-rows: auto;
  }
}
/* margin:auto 双向居中；内容超高时自动退化为顶部对齐，避免顶部被裁掉 */
.page--home.fp-on .activities-section > .container,
.page--home.fp-on .about-section > .container {
  width: 100%;
  margin: auto;
}
/* 页脚内容贴底：主办单位 / 备案号始终落在屏幕底部 */
.page--home.fp-on .footer.fp-section > .container {
  width: 100%;
  margin: auto auto 0;
  padding-bottom: clamp(18px, 2.6vh, 34px);
}
/* 整屏模式下每屏一进入就完整可见，避免滚动渐显动画在切屏时卡住 */
.page--home.fp-on .fade-in-up {
  opacity: 1 !important;
  transform: none !important;
  transition: none !important;
}
.page--home.fp-on .stat-card,
.page--home.fp-on .partner-logo {
  opacity: 1 !important;
  transform: none !important;
}

.page--home.fp-on .about-header {
  margin-bottom: clamp(18px, 4vh, 40px);
}
.page--home.fp-on .about-header::after {
  margin-top: 14px;
}
.page--home.fp-on .about-stats {
  margin-bottom: 0;
}
.page--home.fp-on .footer.fp-section {
  margin-top: 0;
  padding: 0;
}

/* 分页导航 */
.fp-nav {
  position: fixed;
  right: 26px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 150;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.fp-nav__dot {
  position: relative;
  width: 10px;
  height: 10px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(148, 163, 184, 0.5);
  cursor: pointer;
  transition: background var(--duration-base, 300ms) var(--ease-default),
    box-shadow var(--duration-base, 300ms) var(--ease-default),
    transform var(--duration-base, 300ms) var(--ease-default);
}
.fp-nav__dot::before {
  content: '';
  position: absolute;
  inset: -8px;
  border-radius: 50%;
}
.fp-nav__dot:hover {
  background: rgba(14, 165, 233, 0.7);
  transform: scale(1.2);
}
.fp-nav__dot.is-active {
  background: linear-gradient(
    135deg,
    var(--accent-ice, #38bdf8),
    var(--accent-purple, #6366f1)
  );
  box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.14),
    0 0 14px rgba(56, 189, 248, 0.65);
  transform: scale(1.25);
}
.fp-nav__label {
  position: absolute;
  right: 24px;
  top: 50%;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  color: var(--text-secondary, #64748b);
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid var(--border-light, #e2e8f0);
  box-shadow: var(--shadow-soft, 0 4px 24px rgba(14, 165, 233, 0.08));
  opacity: 0;
  pointer-events: none;
  transform: translateY(-50%) translateX(6px);
  transition: opacity var(--duration-fast, 150ms) var(--ease-default),
    transform var(--duration-fast, 150ms) var(--ease-default);
}
.fp-nav__dot:hover .fp-nav__label,
.fp-nav__dot:focus-visible .fp-nav__label {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}
.fp-nav__dot:focus-visible {
  outline: 2px solid var(--accent-deep, #0ea5e9);
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
  .page--home.fp-on .fp-track {
    transition-duration: 1ms;
  }
  .tech-backdrop__grid,
  .tech-backdrop__glow,
  .tech-backdrop__photo,
  .tech-backdrop__beam,
  .tech-backdrop__particles,
  .tech-backdrop__scan,
  .tech-backdrop__dot,
  .tech-backdrop__ring,
  .tech-ticker__track,
  .page--home .about-header::after,
  .page--home .section-header__eyebrow::before,
  .page--home .activities-section::after {
    animation: none;
  }
  .tech-backdrop__grid,
  .tech-backdrop__glow--1,
  .tech-backdrop__glow--2,
  .tech-backdrop__photo,
  .tech-backdrop__particles,
  .tech-backdrop__beam--1,
  .tech-backdrop__beam--2 {
    transform: none !important;
    transition: none;
  }
  .tech-backdrop__spotlight {
    opacity: 0 !important;
  }
  .tech-backdrop__scan {
    display: none;
  }
  .scroll-progress span {
    transition: none;
  }
}

/* ===== 科创源信息球：关于 / 四链 / 高校 / 发榜 ===== */
.globe-section {
  position: relative;
  padding: 0;
}

/* 舞台吸顶：球体固定，滚动只驱动旋转 */
.globe-stage {
  --globe-r: clamp(460px, 30vw, 600px);
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(var(--home-viewport-h, 100vh) - var(--home-nav-h, 72px));
  overflow: hidden;
  background:
    radial-gradient(900px 420px at 12% 0%, rgba(56, 189, 248, 0.09), transparent 68%),
    radial-gradient(760px 380px at 90% 100%, rgba(99, 102, 241, 0.08), transparent 68%),
    var(--bg-primary);
}

/* 提供 3 屏的滚轮行程：面板1→2→3→4 */
.globe-spacer {
  height: 300vh;
}

/* 小屏回退为普通滚动时，吸顶位置要让开导航栏 */
.page--home:not(.fp-on) .globe-stage {
  top: var(--home-nav-h, 72px);
}

.globe-sphere {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  will-change: transform;
}

/* 球心：经纬线 + 光核 */
.globe-core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(var(--globe-r) * 1.15);
  height: calc(var(--globe-r) * 1.15);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(56, 189, 248, 0.16),
    rgba(56, 189, 248, 0.04) 46%,
    transparent 68%
  );
}
.globe-core__ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid rgba(56, 189, 248, 0.18);
}
.globe-core__ring--2 {
  inset: 14%;
  border-color: rgba(99, 102, 241, 0.2);
  transform: rotateY(62deg);
}
.globe-core__ring--3 {
  inset: 14%;
  border-color: rgba(56, 189, 248, 0.14);
  transform: rotateX(66deg);
}
.globe-core__glow {
  position: absolute;
  inset: 30%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.28), transparent 70%);
  filter: blur(18px);
  animation: globePulse 6s ease-in-out infinite;
}
@keyframes globePulse {
  0%,
  100% {
    opacity: 0.55;
    transform: scale(0.96);
  }
  50% {
    opacity: 0.95;
    transform: scale(1.04);
  }
}

/* 球面面板：四块内容按 90° 均匀分布 */
.globe-panel {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(880px, 74vw);
  max-height: calc(100% - 72px);
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;
  padding: clamp(18px, 2.4vh, 30px) clamp(20px, 2.2vw, 34px);
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid var(--border-light);
  border-radius: 24px;
  box-shadow: var(--shadow-large);
  backface-visibility: hidden;
  transform-origin: center center;
}
.globe-panel::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.globe-panel--1 {
  transform: translate(-50%, -50%) rotateY(0deg) translateZ(var(--globe-r));
}
.globe-panel--2 {
  transform: translate(-50%, -50%) rotateY(90deg) translateZ(var(--globe-r));
}
.globe-panel--3 {
  transform: translate(-50%, -50%) rotateY(180deg) translateZ(var(--globe-r));
}
.globe-panel--4 {
  transform: translate(-50%, -50%) rotateY(270deg) translateZ(var(--globe-r));
}

.globe-panel .container {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
}
.globe-panel .section-header {
  margin-bottom: clamp(14px, 2.2vh, 26px);
}

/* 进度点 + 操作提示 */
.globe-indicator {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 3;
}
.globe-indicator__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(14, 165, 233, 0.25);
  transition: all var(--duration-base) var(--ease-default);
}
.globe-indicator__dot.is-active {
  height: 22px;
  border-radius: 4px;
  background: var(--accent-gradient);
}
.globe-hint {
  position: absolute;
  left: 50%;
  bottom: 22px;
  transform: translateX(-50%);
  z-index: 3;
  font-size: 12px;
  letter-spacing: 1px;
  color: var(--text-muted);
  pointer-events: none;
}

/* 服务快捷入口 */
.service-strip {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: clamp(16px, 2.4vh, 26px);
}
.service-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  font-size: 13px;
  color: var(--text-primary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: 999px;
  box-shadow: var(--shadow-soft);
  transition: transform var(--duration-base) var(--ease-default),
              border-color var(--duration-base) var(--ease-default),
              box-shadow var(--duration-base) var(--ease-default),
              color var(--duration-base) var(--ease-default);
}
.service-chip svg {
  width: 16px;
  height: 16px;
  color: var(--accent-ice);
  transition: color var(--duration-base) var(--ease-default);
}
.service-chip:hover {
  transform: translateY(-2px);
  border-color: var(--border-glow);
  color: var(--accent-deep);
  box-shadow: var(--shadow-medium);
}
.service-chip:hover svg {
  color: var(--accent-deep);
}

/* 关于科创源 */
.intro-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  gap: clamp(20px, 3vw, 44px);
  align-items: center;
}
.intro-story__lead {
  font-size: clamp(15px, 1.1vw, 17px);
  line-height: 1.9;
  color: var(--text-secondary);
  margin-bottom: 12px;
}
.intro-story__text {
  font-size: 14px;
  line-height: 1.9;
  color: var(--text-muted);
}
.intro-meta {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: clamp(16px, 2.6vh, 26px);
}
.intro-meta div {
  padding: 12px 14px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: 10px;
}
.intro-meta dt {
  font-size: 11px;
  letter-spacing: 1px;
  color: var(--text-muted);
  margin-bottom: 4px;
}
.intro-meta dd {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.65;
  color: var(--text-primary);
}

.intro-facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(10px, 1.4vw, 16px);
}
.intro-fact {
  position: relative;
  overflow: hidden;
  padding: clamp(16px, 1.9vw, 24px);
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: 14px;
  box-shadow: var(--shadow-soft);
}
.intro-fact::after {
  content: '';
  position: absolute;
  right: -22%;
  bottom: -58%;
  width: 130px;
  height: 130px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.18), transparent 70%);
}
.intro-fact strong {
  display: inline-block;
  font-size: clamp(26px, 2.6vw, 40px);
  font-weight: 700;
  line-height: 1.1;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.intro-fact small {
  font-size: 0.45em;
}
.intro-fact span {
  margin-left: 4px;
  font-size: 13px;
  color: var(--text-secondary);
}
.intro-fact em {
  display: block;
  margin-top: 8px;
  font-style: normal;
  font-size: 12px;
  letter-spacing: 0.5px;
  color: var(--text-muted);
}

/* 四链融合 */
.chain-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(10px, 1.2vw, 16px);
}
.chain-card {
  padding: clamp(16px, 1.8vw, 22px);
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: 14px;
  box-shadow: var(--shadow-soft);
  transition: transform var(--duration-base) var(--ease-default),
              box-shadow var(--duration-base) var(--ease-default),
              border-color var(--duration-base) var(--ease-default);
}
.chain-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-glow);
  box-shadow: var(--shadow-medium);
}
.chain-card__no {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--accent-ice);
}
.chain-card h3 {
  margin: 8px 0 10px;
  font-size: 17px;
  color: var(--text-primary);
}
.chain-card p {
  font-size: 13px;
  line-height: 1.8;
  color: var(--text-secondary);
}

.roadmap {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(10px, 1.2vw, 16px);
  margin-top: clamp(14px, 2.4vh, 26px);
  padding: 0;
}
.roadmap__item {
  list-style: none;
  padding: clamp(14px, 1.6vw, 20px);
  background: var(--bg-glass);
  border: 1px solid var(--border-light);
  border-left: 3px solid var(--accent-ice);
  border-radius: 12px;
}
.roadmap__year {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  background: var(--accent-gradient-soft);
  border: 1px solid var(--border-glow);
  color: var(--accent-deep);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
}
.roadmap__item h4 {
  margin: 8px 0 6px;
  font-size: 15px;
  color: var(--text-primary);
}
.roadmap__item p {
  font-size: 12.5px;
  line-height: 1.75;
  color: var(--text-secondary);
}

/* 八所高校矩阵 */
.uni-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(10px, 1.2vw, 16px);
}
.uni-card {
  display: block;
  padding: clamp(16px, 1.8vw, 22px);
  color: var(--text-primary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: 14px;
  box-shadow: var(--shadow-soft);
  transition: transform var(--duration-base) var(--ease-default),
              box-shadow var(--duration-base) var(--ease-default),
              border-color var(--duration-base) var(--ease-default);
}
.uni-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-glow);
  box-shadow: var(--shadow-medium);
}
.uni-card__badge {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--accent-ice);
}
.uni-card__name {
  margin: 6px 0 8px;
  font-size: clamp(14px, 1.05vw, 16px);
  color: var(--text-primary);
}
.uni-card__tag {
  font-size: 12px;
  letter-spacing: 0.3px;
  color: var(--text-muted);
}
.uni-card__go {
  display: block;
  margin-top: 12px;
  font-size: 12px;
  color: var(--accent-deep);
  opacity: 0.6;
  transition: opacity var(--duration-base) var(--ease-default),
              transform var(--duration-base) var(--ease-default);
}
.uni-card:hover .uni-card__go {
  opacity: 1;
  transform: translateX(3px);
}

/* 合作机构 */
.uni-partners {
  margin-top: clamp(14px, 1.8vh, 22px);
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}
.uni-partners__label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  color: var(--text-muted);
}
.uni-partners__list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.partner-card {
  padding: 6px 14px;
  font-size: 12.5px;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: 999px;
  transition: color var(--duration-base) var(--ease-default),
              border-color var(--duration-base) var(--ease-default),
              transform var(--duration-base) var(--ease-default);
}
.partner-card:hover {
  color: var(--accent-deep);
  border-color: var(--border-glow);
  transform: translateY(-2px);
}

/* 校企双向发榜 */
.results-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(10px, 1.2vw, 16px);
}
.results-stat {
  text-align: center;
  padding: clamp(12px, 1.5vw, 20px);
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: 14px;
  box-shadow: var(--shadow-soft);
}
.results-stat strong {
  display: inline-block;
  font-size: clamp(26px, 2.6vw, 38px);
  font-weight: 700;
  line-height: 1.15;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.results-stat small {
  font-size: 12px;
}
.results-stat span {
  display: block;
  margin-top: 6px;
  font-size: 12.5px;
  color: var(--text-muted);
}

.results-cases {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(10px, 1.2vw, 16px);
  margin-top: clamp(12px, 2vh, 22px);
}
.case-card {
  padding: clamp(14px, 1.7vw, 20px);
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: 14px;
  box-shadow: var(--shadow-soft);
  transition: border-color var(--duration-base) var(--ease-default),
              box-shadow var(--duration-base) var(--ease-default);
}
.case-card:hover {
  border-color: var(--border-glow);
  box-shadow: var(--shadow-medium);
}
.case-card__tag {
  display: inline-block;
  padding: 2px 9px;
  border-radius: 999px;
  font-size: 11px;
  color: var(--accent-deep);
  background: rgba(56, 189, 248, 0.12);
}
.case-card h4 {
  margin: 8px 0 6px;
  font-size: 14px;
  color: var(--text-primary);
}
.case-card p {
  font-size: 12.5px;
  line-height: 1.75;
  color: var(--text-secondary);
}

.results-cta {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-top: clamp(14px, 2.2vh, 26px);
}
.results-cta__main {
  padding: 11px 30px;
  border-radius: 999px;
  color: var(--text-white);
  background: var(--accent-gradient);
  box-shadow: 0 8px 24px rgba(56, 189, 248, 0.32);
}
.results-cta__main:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(56, 189, 248, 0.42);
}
.results-cta .btn--outline {
  padding: 11px 30px;
  border-radius: 999px;
}

@media (max-width: 1100px) {
  .globe-stage {
    --globe-r: clamp(380px, 42vw, 480px);
  }
  .globe-panel {
    width: min(760px, 88vw);
  }
  .intro-grid {
    grid-template-columns: 1fr;
  }
  .chain-grid,
  .uni-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .results-stats,
  .results-cases {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .roadmap {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .globe-stage {
    --globe-r: clamp(300px, 62vw, 400px);
  }
  .globe-panel {
    width: 92vw;
    max-height: calc(100% - 96px);
    border-radius: 18px;
  }
  .globe-indicator {
    right: 12px;
  }
  .globe-hint {
    bottom: 12px;
    font-size: 11px;
  }
  .intro-meta {
    grid-template-columns: 1fr;
  }
  .service-strip {
    gap: 8px;
  }
  .service-chip {
    padding: 8px 12px;
    font-size: 12px;
  }
  .results-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .results-cases {
    grid-template-columns: 1fr;
  }
}

/* ============================================================
 * 本次改造：环形进度 / 数据流 / 时间轴 / 翻转卡 / 地图 / 轨道 / 巨字 / 深色
 * ============================================================ */

/* ---- 左侧环形滚动进度 ---- */
.scroll-ring {
  position: fixed;
  left: 26px;
  bottom: 28px;
  z-index: 400;
  display: flex;
  align-items: center;
  gap: 10px;
  pointer-events: none;
}
.scroll-ring__ring {
  position: relative;
  display: block;
  width: 56px;
  height: 56px;
}
.scroll-ring__ring svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}
.scroll-ring__track,
.scroll-ring__bar {
  fill: none;
  stroke-width: 3;
}
.scroll-ring__track {
  stroke: rgba(148, 163, 184, 0.28);
}
.scroll-ring__bar {
  stroke: var(--accent-ice);
  stroke-linecap: round;
  stroke-dasharray: 119.4;
  filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.55));
  transition: stroke-dashoffset 520ms cubic-bezier(0.4, 0, 0.2, 1);
}
.scroll-ring__pct {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: var(--text-secondary);
}
.scroll-ring__meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.scroll-ring__meta em {
  font-style: normal;
  font-size: 10px;
  letter-spacing: 2px;
  color: var(--text-muted);
}
.scroll-ring__meta strong {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}
@media (max-width: 900px) {
  .scroll-ring {
    display: none;
  }
}

/* ---- 返回顶部 ---- */
.back-top {
  position: fixed;
  right: 26px;
  bottom: 28px;
  z-index: 400;
  width: 52px;
  height: 52px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
  border-radius: 50%;
  color: var(--text-secondary);
  background: var(--bg-glass);
  border: 1px solid var(--border-light);
  backdrop-filter: blur(12px);
  box-shadow: var(--shadow-soft);
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: opacity var(--duration-base) var(--ease-default),
    transform var(--duration-base) var(--ease-default),
    visibility var(--duration-base) var(--ease-default),
    color var(--duration-fast) var(--ease-default),
    border-color var(--duration-fast) var(--ease-default),
    box-shadow var(--duration-fast) var(--ease-default);
}
.back-top.is-visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
.back-top svg {
  width: 17px;
  height: 17px;
}
.back-top span {
  font-size: 9.5px;
  line-height: 1;
  letter-spacing: 1.5px;
}
.back-top:hover {
  color: var(--accent-deep);
  border-color: var(--border-glow);
  box-shadow: var(--shadow-glow);
  transform: translateY(-3px);
}
@media (max-width: 900px) {
  .back-top {
    right: 16px;
    bottom: 16px;
    width: 46px;
    height: 46px;
  }
}

/* ---- 深色模式切换按钮 ---- */
.nav__theme {
  flex: none;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  transition: color var(--duration-base) var(--ease-default),
    border-color var(--duration-base) var(--ease-default),
    transform var(--duration-base) var(--ease-default),
    box-shadow var(--duration-base) var(--ease-default);
}
.nav__theme svg {
  width: 18px;
  height: 18px;
}
.nav__theme:hover {
  color: var(--accent-deep);
  border-color: var(--border-glow);
  transform: rotate(20deg);
  box-shadow: var(--shadow-soft);
}

/* ---- 分屏入场：子元素依次上浮 ---- */
@keyframes fpRise {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.page--home .fp-section.is-current > .container > * {
  animation: fpRise 620ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
.page--home .fp-section.is-current > .container > *:nth-child(2) {
  animation-delay: 80ms;
}
.page--home .fp-section.is-current > .container > *:nth-child(3) {
  animation-delay: 160ms;
}
.page--home .fp-section.is-current > .container > *:nth-child(4) {
  animation-delay: 240ms;
}
.page--home .fp-section.is-current > .container > *:nth-child(5) {
  animation-delay: 320ms;
}
.page--home .globe-section.is-current .globe-panel.is-face > .container > * {
  animation: fpRise 620ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
.page--home .globe-section.is-current .globe-panel.is-face > .container > *:nth-child(2) {
  animation-delay: 90ms;
}
.page--home .globe-section.is-current .globe-panel.is-face > .container > *:nth-child(3) {
  animation-delay: 180ms;
}
.page--home .globe-section.is-current .globe-panel.is-face > .container > *:nth-child(4) {
  animation-delay: 260ms;
}

/* ---- 首屏竖向关键词数据流 ---- */
.data-stream {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(180deg, transparent, #000 18%, #000 78%, transparent);
  mask-image: linear-gradient(180deg, transparent, #000 18%, #000 78%, transparent);
}
.data-stream__col {
  position: absolute;
  top: -26%;
  display: flex;
  flex-direction: column;
  font-size: clamp(11px, 0.85vw, 13px);
  letter-spacing: 5px;
  color: rgba(14, 165, 233, 0.34);
  animation-name: dataStream;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform;
}
.data-stream__col:nth-child(2),
.data-stream__col:nth-child(4) {
  color: rgba(99, 102, 241, 0.28);
}
.data-stream__word {
  display: block;
  padding: 13px 0;
  white-space: nowrap;
}
@keyframes dataStream {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-50%);
  }
}

/* ---- 新闻资讯：竖向时间轴 ---- */
.news-timeline {
  position: relative;
  flex: 1;
  min-height: 0;
  margin: 0;
  padding: 12px 20px 12px 44px;
  list-style: none;
  overflow-y: auto;
}
.news-timeline::before {
  content: '';
  position: absolute;
  left: 30px;
  top: 18px;
  bottom: 18px;
  width: 2px;
  border-radius: 2px;
  background: linear-gradient(180deg, rgba(56, 189, 248, 0.55), rgba(99, 102, 241, 0.14));
}
.news-timeline__item {
  position: relative;
  padding: 8px 0 14px;
}
.news-timeline__node {
  position: absolute;
  left: -18.5px;
  top: 13px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--bg-secondary);
  border: 2px solid var(--accent-ice);
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.45);
  transition: transform var(--duration-base) var(--ease-default),
    background var(--duration-base) var(--ease-default);
}
.news-timeline__item--latest .news-timeline__node {
  background: var(--accent-ice);
  animation: newsNodePulse 2.4s ease-in-out infinite;
}
@keyframes newsNodePulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.5);
  }
  60% {
    box-shadow: 0 0 0 6px rgba(56, 189, 248, 0);
  }
}
.news-timeline__date {
  font-size: 11.5px;
  letter-spacing: 0.5px;
  color: var(--text-muted);
}
.news-timeline__title {
  display: -webkit-box;
  margin: 2px 0 6px;
  font-size: 13.5px;
  line-height: 1.45;
  color: var(--text-primary);
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color var(--duration-fast) var(--ease-default);
}
.news-timeline__title:hover {
  color: var(--accent-deep);
}
.news-timeline__item:hover .news-timeline__node {
  transform: scale(1.3);
  background: var(--accent-ice);
}

/* ---- 活动卡：悬停 3D 翻转（背面 = 主办 / 规模 / 二维码） ---- */
.activity-card {
  perspective: 1100px;
}
.activity-card__body {
  position: relative;
  z-index: 1;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transition: transform 640ms cubic-bezier(0.4, 0, 0.2, 1);
}
.activity-card:hover .activity-card__body {
  transform: rotateY(180deg);
}
.activity-card__back {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 16px;
  border-radius: inherit;
  background: linear-gradient(150deg, #eef9ff 0%, #eef0ff 100%);
  border: 1px solid var(--border-glow);
  transform: rotateY(-180deg);
  backface-visibility: hidden;
  transition: transform 640ms cubic-bezier(0.4, 0, 0.2, 1);
}
.activity-card:hover .activity-card__back {
  transform: rotateY(0deg);
}
.activity-card__back-tag {
  align-self: flex-start;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: var(--text-white);
  background: linear-gradient(135deg, var(--accent-ice), var(--accent-purple));
}
.activity-card__back--ended .activity-card__back-tag {
  color: var(--text-secondary);
  background: rgba(148, 163, 184, 0.22);
}
.activity-card__back-list {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin: 0;
}
.activity-card__back-list div {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.activity-card__back-list dt {
  flex: none;
  font-size: 11px;
  color: var(--text-muted);
}
.activity-card__back-list dd {
  display: -webkit-box;
  margin: 0;
  font-size: 11.5px;
  line-height: 1.45;
  color: var(--text-primary);
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.activity-card__qr {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  padding-top: 9px;
  border-top: 1px dashed var(--border-light);
}
.activity-card__qr-box {
  flex: none;
  width: 46px;
  height: 46px;
  padding: 3px;
  border-radius: 6px;
  background: #ffffff;
  border: 1px solid var(--border-light);
}
.activity-card__qr-box svg {
  width: 100%;
  height: 100%;
}
.activity-card__qr-box rect {
  fill: #0f172a;
}
.activity-card__qr-box rect[rx] {
  fill: none;
  stroke: #0f172a;
  stroke-width: 2.4;
}
.activity-card__qr-text {
  font-size: 11.5px;
  line-height: 1.5;
  color: var(--text-secondary);
}
.activity-card__qr-text em {
  display: block;
  font-style: normal;
  font-size: 10.5px;
  color: var(--text-muted);
}
.activity-card__back-note {
  margin-top: auto;
  padding-top: 9px;
  border-top: 1px dashed var(--border-light);
  font-size: 11.5px;
  color: var(--text-muted);
}

/* ---- 关于屏：手绘地图 + 紧凑数据卡 ---- */
.about-body {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.18fr) minmax(0, 1fr);
  gap: clamp(14px, 1.8vw, 26px);
  align-items: stretch;
}
.campus-map {
  position: relative;
  min-height: clamp(300px, 44vh, 430px);
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid var(--border-light);
  background: var(--bg-secondary);
  box-shadow: var(--shadow-soft);
}
.campus-map__art {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.map-anno {
  font-family: 'STKaiti', 'KaiTi', 'PingFang SC', var(--font-family);
  font-size: 13px;
  letter-spacing: 2px;
  fill: var(--text-secondary);
  opacity: 0.85;
}
.map-anno--soft {
  font-size: 11px;
  letter-spacing: 3px;
  fill: var(--text-muted);
}
.map-compass text {
  font-size: 9px;
  letter-spacing: 1px;
  fill: var(--text-muted);
}
.map-pin {
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  transform: translate(-50%, -50%);
}
.map-pin__dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--bg-secondary);
  border: 2px solid var(--accent-deep);
  box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.14);
  transition: transform var(--duration-base) var(--ease-default),
    background var(--duration-base) var(--ease-default);
}
.map-pin__name {
  padding: 1px 6px;
  font-size: 11px;
  line-height: 1.5;
  white-space: nowrap;
  color: var(--text-secondary);
  background: var(--bg-glass);
  border-radius: 6px;
}
.map-pin:hover .map-pin__dot {
  transform: scale(1.3);
  background: var(--accent-ice);
}
.map-pin__tip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  width: 178px;
  padding: 10px 12px;
  border-radius: 10px;
  text-align: left;
  background: var(--bg-secondary);
  border: 1px solid var(--border-glow);
  box-shadow: var(--shadow-medium);
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, 6px);
  transition: opacity var(--duration-base) var(--ease-default),
    transform var(--duration-base) var(--ease-default);
}
.map-pin:hover .map-pin__tip {
  opacity: 1;
  pointer-events: auto;
  transform: translate(-50%, 0);
}
.map-pin--right .map-pin__tip {
  left: auto;
  right: -6px;
  transform: translate(0, 6px);
}
.map-pin--right:hover .map-pin__tip {
  transform: translate(0, 0);
}
.map-pin__tip strong {
  display: block;
  font-size: 12.5px;
  line-height: 1.4;
  color: var(--text-primary);
}
.map-pin__tip em {
  display: block;
  margin: 3px 0 6px;
  font-style: normal;
  font-size: 11px;
  color: var(--text-muted);
}
.map-pin__link {
  font-size: 11.5px;
  color: var(--accent-deep);
}
.campus-map__legend {
  position: absolute;
  left: 14px;
  bottom: 12px;
  z-index: 3;
  padding: 4px 10px;
  font-size: 11px;
  letter-spacing: 1px;
  color: var(--text-muted);
  background: var(--bg-glass);
  border: 1px solid var(--border-light);
  border-radius: 999px;
  backdrop-filter: blur(6px);
}
.about-body .about-stats {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 0;
  align-content: center;
}
.about-body .stat-card {
  padding: 18px 16px;
  text-align: left;
}
.about-body .stat-icon {
  width: 38px;
  height: 38px;
  margin: 0 0 10px;
  border-radius: 10px;
}
.about-body .stat-icon svg {
  width: 20px;
  height: 20px;
}
.about-body .stat-number {
  margin-bottom: 4px;
  font-size: 28px;
}
.about-body .stat-label {
  margin-bottom: 4px;
  font-size: 13px;
}
.about-body .stat-desc {
  font-size: 11.5px;
  line-height: 1.5;
}
.page--home.fp-on .about-header {
  margin-bottom: clamp(14px, 2.4vh, 24px);
}

/* ---- 信息球：轨道弧线与流动光点 ---- */
.globe-orbit {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.globe-sphere {
  z-index: 1;
}
.globe-orbit__ring {
  fill: none;
  stroke: rgba(56, 189, 248, 0.14);
  stroke-width: 1;
}
.globe-orbit__ring--2 {
  stroke: rgba(99, 102, 241, 0.18);
  stroke-dasharray: 4 9;
}
.globe-orbit__ring--3 {
  stroke: rgba(56, 189, 248, 0.12);
  stroke-dasharray: 2 12;
}
.globe-orbit__flow {
  fill: none;
  stroke: rgba(56, 189, 248, 0.65);
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-dasharray: 1 34;
  filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.7));
  animation: orbitFlow 9s linear infinite;
}
.globe-orbit__flow--2 {
  stroke: rgba(129, 140, 248, 0.7);
  stroke-dasharray: 1 26;
  animation-duration: 7s;
  animation-direction: reverse;
}
.globe-orbit__flow--3 {
  stroke: rgba(103, 232, 249, 0.65);
  stroke-dasharray: 1 18;
  animation-duration: 5.4s;
}
@keyframes orbitFlow {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: -420;
  }
}
.globe-orbit__node {
  fill: var(--accent-ice);
  animation: orbitNode 3.6s ease-in-out infinite;
}
.globe-orbit__node--2 {
  animation-delay: 0.9s;
}
.globe-orbit__node--3 {
  animation-delay: 1.8s;
}
.globe-orbit__node--4 {
  animation-delay: 2.7s;
}
@keyframes orbitNode {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
}

/* ---- 页脚巨型水印：作为「联系我们」整块的背景图（横向轻微视差） ---- */
.footer {
  position: relative;
  overflow: hidden;
}
.footer__giant {
  position: relative;
  z-index: 0;
  display: flex;
  justify-content: center;
  margin-top: auto;
  pointer-events: none;
}
.footer__giant span {
  display: inline-block;
  font-size: clamp(36px, 10.5vw, 240px);
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: 0.06em;
  white-space: nowrap;
  padding-bottom: 0.04em;
  color: rgba(56, 189, 248, 0.04);
  -webkit-text-stroke: 1.1px rgba(56, 189, 248, 0.14);
  transform: translateX(var(--footer-shift, 0px));
  transition: transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
}
.footer .container {
  position: relative;
  z-index: 1;
}

/* ---- 深色模式 ---- */
.page--home.theme-dark {
  --bg-primary: #070d18;
  --bg-secondary: #0e1a2b;
  --bg-glass: rgba(14, 26, 43, 0.72);
  --text-primary: #e6eefb;
  --text-secondary: #9fb3cc;
  --text-muted: #6d8299;
  --border-light: #1d2b40;
  --border-glow: rgba(56, 189, 248, 0.32);
  --shadow-soft: 0 4px 24px rgba(0, 0, 0, 0.4);
  --shadow-medium: 0 8px 32px rgba(0, 0, 0, 0.5);
  --shadow-large: 0 16px 48px rgba(0, 0, 0, 0.55);
  color-scheme: dark;
}
.page--home.theme-dark .nav {
  background: rgba(7, 13, 24, 0.82);
}
.page--home.theme-dark .globe-panel {
  background: rgba(14, 26, 43, 0.96);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(56, 189, 248, 0.08);
}
.page--home.theme-dark .news-list__header {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%);
}
.page--home.theme-dark .news-list__count {
  background: rgba(14, 26, 43, 0.6);
}
.page--home.theme-dark .fp-nav__label {
  background: rgba(14, 26, 43, 0.92);
}
.page--home.theme-dark .footer {
  background: #04080f;
}
.page--home.theme-dark .footer__giant span {
  color: rgba(56, 189, 248, 0.045);
  -webkit-text-stroke-color: rgba(56, 189, 248, 0.2);
}
.page--home.theme-dark .tech-backdrop::after {
  background: linear-gradient(
    180deg,
    rgba(7, 13, 24, 0.76) 0%,
    rgba(7, 13, 24, 0.42) 38%,
    rgba(7, 13, 24, 0.88) 100%
  );
}
.page--home.theme-dark .tech-backdrop__photo {
  opacity: 0.16;
}
.page--home.theme-dark .tech-ticker {
  border-top-color: var(--border-light);
}
.page--home.theme-dark .hero-slogan__text {
  background-image: linear-gradient(100deg, #7dd3fc 0%, #38bdf8 42%, #a5b4fc 100%);
}
.page--home.theme-dark .data-stream__col {
  color: rgba(125, 211, 252, 0.3);
}
.page--home.theme-dark .activity-card__back {
  background: linear-gradient(150deg, #0f2233 0%, #131b33 100%);
}
.page--home.theme-dark .activity-card__qr-box {
  background: #e6eefb;
}
.page--home.theme-dark .map-pin__name {
  background: rgba(14, 26, 43, 0.88);
}
.page--home.theme-dark .map-pin__tip {
  background: rgba(14, 26, 43, 0.98);
}
.page--home.theme-dark .stat-card:hover {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.55);
}

@media (max-width: 1100px) {
  .about-body {
    grid-template-columns: 1fr;
  }
  .campus-map {
    min-height: 300px;
  }
  .about-body .about-stats {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
@media (max-width: 768px) {
  .about-body .about-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .data-stream {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .data-stream__col,
  .globe-orbit__flow,
  .globe-orbit__node,
  .news-timeline__item--latest .news-timeline__node,
  .page--home .fp-section.is-current > .container > *,
  .page--home .globe-section.is-current .globe-panel.is-face > .container > * {
    animation: none !important;
  }
  .activity-card__body,
  .activity-card__back,
  .footer__giant span {
    transition: none;
  }
}
</style>

<!-- 科技感双层光标：隐藏原生 + JS 惯性跟随 + 蓝色泛光 -->
<style>
/* 深色模式：页面根背景（scoped 令牌无法影响 html/body） */
html.theme-dark,
html.theme-dark body {
  background: #070d18;
  color-scheme: dark;
}

.cursor-layer {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
}
/* 原生光标隐藏 */
body.has-custom-cursor,
body.has-custom-cursor * {
  cursor: none !important;
}

/* ---- 主图形：只负责位移与尺寸，泛光交给内层，避免每帧重算滤镜 ---- */
.cursor-arrow {
  position: absolute;
  top: 0;
  left: 0;
  width: 28px;
  height: 28px;
  transform: translate3d(0, 0, 0);
  will-change: transform;
  transition: width 200ms cubic-bezier(0.22, 1, 0.36, 1),
              height 200ms cubic-bezier(0.22, 1, 0.36, 1),
              opacity 200ms ease;
}
/* 泛光层：位置不动（随父级一起被位移），滤镜结果可复用 */
.cursor-glow {
  display: block;
  width: 100%;
  height: 100%;
  transition: filter 240ms ease;
  filter:
    drop-shadow(0 0 6px rgba(14, 165, 233, 0.7))
    drop-shadow(0 0 14px rgba(56, 189, 248, 0.35));
}
.cursor-glow svg {
  display: block;
}

/* ---- 鼠标离开视口：淡出 ---- */
body:not(.cursor-visible) .cursor-arrow {
  opacity: 0;
}

/* ---- hover 可交互元素：主图形放大 + 发光更强 ---- */
body.cursor-hover .cursor-arrow {
  width: 42px;
  height: 42px;
}
body.cursor-hover .cursor-glow {
  filter:
    drop-shadow(0 0 8px rgba(56, 189, 248, 0.9))
    drop-shadow(0 0 20px rgba(56, 189, 248, 0.5))
    drop-shadow(0 0 40px rgba(14, 165, 233, 0.3));
}

/* ---- 鼠标按下：主图形略微缩小 + 发光收敛 ---- */
body.cursor-press .cursor-arrow {
  width: 24px;
  height: 24px;
  transition-duration: 90ms;
}
body.cursor-press .cursor-glow {
  filter:
    drop-shadow(0 0 3px rgba(56, 189, 248, 0.8))
    drop-shadow(0 0 8px rgba(14, 165, 233, 0.4));
  transition-duration: 90ms;
}

/* ---- 触屏 / 降低动画 / IE：自动回退 ---- */
@media (pointer: coarse), (prefers-reduced-motion: reduce) {
  .cursor-layer { display: none !important; }
}
</style>
