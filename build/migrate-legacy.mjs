/**
 * 一次性迁移脚本：把 legacy/ 下的静态 HTML 转换为 Vue 3 单文件组件。
 * 用法：node build/migrate-legacy.mjs
 *
 * 转换内容：
 * - <body> 标记 -> SFC <template>（包一层 .page 容器）
 * - 内联 <style> -> <style scoped>（:root/html/body 收敛到页面容器，keyframes 加前缀）
 * - 内链 .html -> vue-router 路径
 * - onclick/onmouseover 等内联事件 -> Vue 事件绑定
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const LEGACY = path.join(ROOT, 'legacy');
const VIEWS = path.join(ROOT, 'src', 'views');

const pages = [
  { file: 'index.html', view: 'HomeView', route: '/', css: 'inline+home' },
  { file: 'company-index.html', view: 'CompanyIndexView', route: '/company-index' },
  { file: 'cxybm.html', view: 'CxybmView', route: '/cxybm' },
  { file: 'gaochuangyuan.html', view: 'GaochuangyuanView', route: '/gaochuangyuan' },
  { file: 'platform-index.html', view: 'PlatformIndexView', route: '/platform-index' },
  { file: 'sjkczcjs.html', view: 'SjkczcjsView', route: '/sjkczcjs' },
  { file: 'sjqrcfw.html', view: 'SjqrcfwView', route: '/sjqrcfw' },
  { file: 'songjiang-employment-service.html', view: 'SongjiangEmploymentServiceView', route: '/songjiang-employment-service' },
  { file: 'tech-manager-intro.html', view: 'TechManagerIntroView', route: '/tech-manager-intro' },
  { file: 'zlgxc.html', view: 'ZlgxcView', route: '/zlgxc' },

  { file: 'platforms/donghua.html', view: 'PlatformDonghuaView', route: '/platforms/donghua', css: 'platform' },
  { file: 'platforms/donghua-gn.html', view: 'PlatformDonghuaGnView', route: '/platforms/donghua-gn', css: 'platform' },
  { file: 'platforms/guanggu.html', view: 'PlatformGuangguView', route: '/platforms/guanggu', css: 'platform' },
  { file: 'platforms/jiaoda.html', view: 'PlatformJiaodaView', route: '/platforms/jiaoda', css: 'platform' },
  { file: 'platforms/liug.html', view: 'PlatformLiugView', route: '/platforms/liug', css: 'platform' },
  { file: 'platforms/qingrui.html', view: 'PlatformQingruiView', route: '/platforms/qingrui', css: 'platform' },
  { file: 'platforms/shisu.html', view: 'PlatformShisuView', route: '/platforms/shisu', css: 'platform' },
  { file: 'platforms/tongji.html', view: 'PlatformTongjiView', route: '/platforms/tongji', css: 'platform' },
  { file: 'platforms/weina.html', view: 'PlatformWeinaView', route: '/platforms/weina', css: 'platform' },
  { file: 'platforms/yiqi.html', view: 'PlatformYiqiView', route: '/platforms/yiqi', css: 'platform' },

  { file: 'cgzh-gx/enterprise-tech-demand.html', view: 'CgzhGxEnterpriseDemandView', route: '/cgzh-gx/enterprise-tech-demand' },
  { file: 'cgzh-gx/tech-demand-platform.html', view: 'CgzhGxTechDemandPlatformView', route: '/cgzh-gx/tech-demand-platform' },
  { file: 'cgzh-gx/university-tech-demand.html', view: 'CgzhGxUniversityDemandView', route: '/cgzh-gx/university-tech-demand' },
  { file: 'cgzh-gx/demand-detail-ai-qc.html', view: 'CgzhGxDemandDetailView', route: '/cgzh-gx/demand-detail-ai-qc' },

  { file: 'cgzh-qy/enterprise-tech-demand.html', view: 'CgzhQyEnterpriseDemandView', route: '/cgzh-qy/enterprise-tech-demand' },
  { file: 'cgzh-qy/tech-demand-platform.html', view: 'CgzhQyTechDemandPlatformView', route: '/cgzh-qy/tech-demand-platform' },
  { file: 'cgzh-qy/university-tech-demand.html', view: 'CgzhQyUniversityDemandView', route: '/cgzh-qy/university-tech-demand' },
  { file: 'cgzh-qy/demand-detail-ai-qc.html', view: 'CgzhQyDemandDetailView', route: '/cgzh-qy/demand-detail-ai-qc' },
];

// 旧路径 -> 新路由
const routeByPath = new Map();
for (const page of pages) {
  routeByPath.set('/' + page.file.split(path.sep).join('/'), page.route);
}

const pageId = (page) => page.route === '/' ? 'home' : page.route.replace(/^\//, '').replace(/\//g, '-');

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** 修正 legacy 中的已知 CSS 问题（platform-index 残留未闭合的空 @media） */
function fixKnownCssIssues(css) {
  return css.replace(
    /@media \(max-width: 600px\) \{\s*\n\s*\n\/\* === 卡片点击效果 === \*\//g,
    '/* === 卡片点击效果 === */'
  );
}

/** 把页面级全局选择器收敛到页面容器上 */
function scopeCss(css, wrapperClass, prefixKeyframes) {
  css = css.replace(/(^|[\s,{}])(:root|html|body)(?=[\s,{}:#.[>+~]|$)/g, (m, pre, sel) => `${pre}.${wrapperClass}`);

  if (prefixKeyframes) {
    const prefix = `${wrapperClass}-`;
    const names = [...new Set([...css.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1]))];
    for (const name of names) {
      css = css.replace(new RegExp(`@keyframes\\s+${escapeRegExp(name)}\\b`, 'g'), `@keyframes ${prefix}${name}`);
      css = css.replace(
        new RegExp(`(animation(?:-name)?\\s*:[^;}]*?)\\b${escapeRegExp(name)}\\b`, 'g'),
        `$1${prefix}${name}`
      );
    }
  }

  return css;
}

/** 重写站内链接与静态资源路径 */
function rewriteLinks(html, sourceFile) {
  return html.replace(/\b(href|src)="([^"]*)"/g, (match, attr, value) => {
    if (!value || /^(https?:)?\/\//i.test(value) || /^(#|mailto:|tel:|javascript:|data:)/i.test(value)) {
      return match;
    }

    let url;
    try {
      url = new URL(value, `http://local/${sourceFile.split(path.sep).join('/')}`);
    } catch {
      return match;
    }

    const route = routeByPath.get(decodeURIComponent(url.pathname));
    if (route) {
      return `${attr}="${route}${url.search}${url.hash}"`;
    }

    // 公共静态资源（public/ 目录）
    if (attr === 'src' && /^\.?\/?[\w-]+\.(png|jpe?g|svg|webp|ico)$/i.test(value)) {
      return `${attr}="/${value.replace(/^\.?\//, '')}"`;
    }

    return match;
  });
}

/** 内联事件 -> Vue 事件绑定 */
function rewriteHandlers(html) {
  return html.replace(/\son(click|mouseover|mouseout|mouseenter|mouseleave|submit|change)="([^"]*)"/g, (match, event, code) => {
    const expr = code.trim();
    if (expr === 'this.parentElement.remove()') {
      return ` @${event}="(e) => e.currentTarget.parentElement.remove()"`;
    }
    if (expr.startsWith('this.style.')) {
      return ` @${event}="(e) => { ${expr.replace(/\bthis\b/g, 'e.currentTarget')} }"`;
    }
    if (expr === "document.querySelector('.nav-links').classList.toggle('open')") {
      return ` @${event}="toggleNavLinks"`;
    }
    if (expr.startsWith("document.querySelector('.nav-links').style.display")) {
      return ` @${event}="toggleNavDisplay"`;
    }
    if (expr === 'toggleNav()') {
      return ` @${event}="toggleNav"`;
    }
    return ` @${event}="${expr}"`;
  });
}

const scriptByView = {
  HomeView: `import { useHomePage } from '@/composables/useHomePage'

const { splashVisible, appVisible, hideSplash } = useHomePage()`,
  CompanyIndexView: `import { useSmoothScroll } from '@/composables/useSmoothScroll'

useSmoothScroll()`,
  CxybmView: `import { onBeforeUnmount, onMounted } from 'vue'
import { useSmoothScroll } from '@/composables/useSmoothScroll'

useSmoothScroll({ excludeSelector: '.nav-cta' })

onMounted(() => {
  const modalOverlay = document.getElementById('modalOverlay')
  const openModalBtn = document.getElementById('openModalBtn')
  const closeModalBtn = document.getElementById('modalCloseBtn')
  const navRegisterBtn = document.getElementById('navRegisterBtn')
  const registerForm = document.getElementById('registerForm')
  if (!modalOverlay) return

  const openModal = () => {
    modalOverlay.classList.add('open')
    modalOverlay.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'
    closeModalBtn.focus()
  }

  const closeModal = () => {
    modalOverlay.classList.remove('open')
    modalOverlay.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = ''
  }

  const onOverlayClick = (e) => {
    if (e.target === modalOverlay) closeModal()
  }

  const onKeydown = (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal()
  }

  const onNavRegister = (e) => {
    e.preventDefault()
    openModal()
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const value = (id) => (document.getElementById(id)?.value || '').trim()
    const name = value('name')
    const phone = value('phone')
    const org = value('org')
    const school = document.getElementById('school')?.value
    const directionChecked = document.querySelectorAll('input[name="directions"]:checked').length > 0

    if (!name || !phone || !org || !school || !directionChecked) {
      alert('请填写所有必填项并选择至少一个合作方向。')
      return
    }
    if (!/^1[3-9]\\d{9}$/.test(phone)) {
      alert('请输入有效的手机号码。')
      return
    }
    e.target.style.display = 'none'
    document.getElementById('formSuccess')?.classList.add('show')
  }

  openModalBtn?.addEventListener('click', openModal)
  closeModalBtn?.addEventListener('click', closeModal)
  navRegisterBtn?.addEventListener('click', onNavRegister)
  modalOverlay.addEventListener('click', onOverlayClick)
  document.addEventListener('keydown', onKeydown)
  registerForm?.addEventListener('submit', onSubmit)

  onBeforeUnmount(() => {
    openModalBtn?.removeEventListener('click', openModal)
    closeModalBtn?.removeEventListener('click', closeModal)
    navRegisterBtn?.removeEventListener('click', onNavRegister)
    modalOverlay.removeEventListener('click', onOverlayClick)
    document.removeEventListener('keydown', onKeydown)
    registerForm?.removeEventListener('submit', onSubmit)
    document.body.style.overflow = ''
  })
})`,
  GaochuangyuanView: `import { useScrollReveal } from '@/composables/useScrollReveal'
import { useSmoothScroll } from '@/composables/useSmoothScroll'

useSmoothScroll()
useScrollReveal('.stat-card, .service-card, .advantage-card', {
  className: 'fade-in-up',
  initialOpacity: 0,
  transitionDelay: true,
})`,
  PlatformIndexView: `import { useScrollReveal } from '@/composables/useScrollReveal'
import { useTiltCards } from '@/composables/useTiltCards'

useTiltCards('.overview-card')
useScrollReveal('.fade-in', { className: 'visible' })`,
  SjkczcjsView: `import { useSmoothScroll } from '@/composables/useSmoothScroll'

useSmoothScroll()`,
  SjqrcfwView: `import { useSmoothScroll } from '@/composables/useSmoothScroll'

useSmoothScroll({ activeNavSelector: '.nav-links a' })`,
  SongjiangEmploymentServiceView: `import { useNavToggle } from '@/composables/useNavToggle'
import { useSmoothScroll } from '@/composables/useSmoothScroll'

const { toggleNav, closeNav } = useNavToggle()
useSmoothScroll({ onNavigate: closeNav })`,
  TechManagerIntroView: `import { onBeforeUnmount, onMounted } from 'vue'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import { managers, tagColors, defaultTagColor } from '@/data/managers'

useSmoothScroll()

onMounted(() => {
  const grid = document.getElementById('rosterGrid')
  const toolbar = document.getElementById('rosterToolbar')
  const overlay = document.getElementById('rosterModal')
  const modalBody = document.getElementById('modalBody')
  const modalClose = document.getElementById('modalClose')
  if (!grid) return

  const tagHtml = (fields) => fields.map((f) => {
    const c = tagColors[f] || defaultTagColor
    return \`<span class="roster-tag" style="background:\${c.bg};color:\${c.text}">\${f}</span>\`
  }).join('')

  const openModal = (idx) => {
    const m = managers[idx]
    document.getElementById('modalAvatar').style.background = m.color
    document.getElementById('modalAvatar').textContent = m.initial
    document.getElementById('modalName').textContent = m.name
    document.getElementById('modalTitle').textContent = m.title
    document.getElementById('modalOrg').textContent = m.org

    const c = (f) => tagColors[f] || defaultTagColor
    modalBody.innerHTML = \`
      <div class="modal-section">
        <div class="modal-section-label">个人简介</div>
        <p>\${m.bio}</p>
      </div>
      <div class="modal-section">
        <div class="modal-section-label">核心数据</div>
        <div class="modal-stats">
          <div class="modal-stat-item"><div class="modal-stat-value">\${m.stats.projects}</div><div class="modal-stat-label">服务项目</div></div>
          <div class="modal-stat-item"><div class="modal-stat-value">\${m.stats.years}年</div><div class="modal-stat-label">从业年限</div></div>
          <div class="modal-stat-item"><div class="modal-stat-value">\${m.stats.amount}</div><div class="modal-stat-label">促成交易额</div></div>
        </div>
      </div>
      <div class="modal-section">
        <div class="modal-section-label">专业领域</div>
        <div class="modal-tags">\${m.fields.map((f) => \`<span class="modal-tag" style="background:\${c(f).bg};color:\${c(f).text}">\${f}</span>\`).join('')}</div>
      </div>
      <div class="modal-section">
        <div class="modal-section-label">主要成就</div>
        <ul>\${m.achievements.map((a) => \`<li>\${a}</li>\`).join('')}</ul>
      </div>
      <div class="modal-section">
        <div class="modal-section-label">代表案例</div>
        <ul>\${m.cases.map((item) => \`<li>\${item}</li>\`).join('')}</ul>
      </div>
    \`
    overlay.classList.add('visible')
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    overlay.classList.remove('visible')
    document.body.style.overflow = ''
  }

  const renderCards = (filter) => {
    grid.innerHTML = ''
    const filtered = filter === 'all' ? managers : managers.filter((m) => m.level === filter || m.fields.includes(filter))
    filtered.forEach((m) => {
      const idx = managers.indexOf(m)
      const card = document.createElement('div')
      card.className = 'roster-card'
      card.setAttribute('data-index', String(idx))
      card.setAttribute('tabindex', '0')
      card.setAttribute('role', 'button')
      card.setAttribute('aria-label', '查看' + m.name + '详情')

      card.innerHTML = \`
        <div class="roster-card-header">
          <div class="roster-avatar" style="background:\${m.color}">\${m.initial}</div>
          <div>
            <div class="roster-name">\${m.name}</div>
            <div class="roster-title">\${m.level}技术经理人</div>
          </div>
        </div>
        <div class="roster-org">
          <svg viewBox="0 0 24 24"><path d="M3 21h18M3 7v14m6-14v14m6-14v14m6-14v14M3 7l9-4 9 4"/></svg>
          \${m.org}
        </div>
        <div class="roster-tags">\${tagHtml(m.fields)}</div>
        <div class="roster-card-action">查看详情<svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></div>
      \`
      card.addEventListener('click', () => openModal(idx))
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter') openModal(idx) })
      grid.appendChild(card)
    })
  }

  const onToolbarClick = (e) => {
    const btn = e.target.closest('.roster-filter-btn')
    if (!btn) return
    document.querySelectorAll('.roster-filter-btn').forEach((b) => b.classList.remove('active'))
    btn.classList.add('active')
    renderCards(btn.dataset.filter)
  }

  const onOverlayClick = (e) => { if (e.target === overlay) closeModal() }
  const onKeydown = (e) => { if (e.key === 'Escape') closeModal() }

  renderCards('all')
  toolbar.addEventListener('click', onToolbarClick)
  modalClose.addEventListener('click', closeModal)
  overlay.addEventListener('click', onOverlayClick)
  document.addEventListener('keydown', onKeydown)

  onBeforeUnmount(() => {
    toolbar.removeEventListener('click', onToolbarClick)
    modalClose.removeEventListener('click', closeModal)
    overlay.removeEventListener('click', onOverlayClick)
    document.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
  })
})`,
  ZlgxcView: `import { onBeforeUnmount, onMounted } from 'vue'
import { useSmoothScroll } from '@/composables/useSmoothScroll'

useSmoothScroll()

onMounted(() => {
  document.querySelectorAll('.patent-tabs').forEach((tabGroup) => {
    tabGroup.querySelectorAll('.patent-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        tabGroup.querySelectorAll('.patent-tab').forEach((t) => {
          t.classList.remove('active')
          t.setAttribute('aria-selected', 'false')
        })
        tab.classList.add('active')
        tab.setAttribute('aria-selected', 'true')
      })
    })
  })

  const modal = document.getElementById('applyModal')
  const openBtn = document.getElementById('openApplyBtn')
  const closeBtn = document.getElementById('closeModalBtn')
  const successCloseBtn = document.getElementById('successCloseBtn')
  const form = document.getElementById('applyForm')
  const formSuccess = document.getElementById('formSuccess')
  if (!modal) return

  let resetTimer = null

  const openModal = () => {
    modal.classList.add('active')
    modal.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    modal.classList.remove('active')
    modal.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = ''
    resetTimer = setTimeout(() => {
      form.style.display = ''
      formSuccess.style.display = 'none'
      form.reset()
    }, 300)
  }

  const onOverlay = (e) => { if (e.target === modal) closeModal() }
  const onKeydown = (e) => { if (e.key === 'Escape' && modal.classList.contains('active')) closeModal() }
  const onSubmit = (e) => {
    e.preventDefault()
    let valid = true
    form.querySelectorAll('[required]').forEach((field) => {
      if (!field.value.trim()) {
        field.style.borderColor = '#DC2626'
        valid = false
      } else {
        field.style.borderColor = ''
      }
    })
    if (!valid) return
    form.style.display = 'none'
    formSuccess.style.display = 'block'
  }

  openBtn?.addEventListener('click', openModal)
  closeBtn?.addEventListener('click', closeModal)
  successCloseBtn?.addEventListener('click', closeModal)
  modal.addEventListener('click', onOverlay)
  document.addEventListener('keydown', onKeydown)
  form?.addEventListener('submit', onSubmit)

  onBeforeUnmount(() => {
    clearTimeout(resetTimer)
    openBtn?.removeEventListener('click', openModal)
    closeBtn?.removeEventListener('click', closeModal)
    successCloseBtn?.removeEventListener('click', closeModal)
    modal.removeEventListener('click', onOverlay)
    document.removeEventListener('keydown', onKeydown)
    form?.removeEventListener('submit', onSubmit)
    document.body.style.overflow = ''
  })
})`,
  PlatformDonghuaView: `import { useScrollReveal } from '@/composables/useScrollReveal'

useScrollReveal('.fade-in', { className: 'visible' })`,
};

// 平台详情页脚本一致
for (const page of pages.filter((p) => p.css === 'platform')) {
  if (!scriptByView[page.view]) {
    scriptByView[page.view] = scriptByView.PlatformDonghuaView;
  }
}

scriptByView.SjqrcfwView = `import { useSmoothScroll } from '@/composables/useSmoothScroll'

const toggleNavLinks = () => document.querySelector('.nav-links')?.classList.toggle('open')

useSmoothScroll({ activeNavSelector: '.nav-links a' })`;

scriptByView.ZlgxcView = scriptByView.ZlgxcView.replace(
  'useSmoothScroll()',
  `useSmoothScroll()

const toggleNavDisplay = () => {
  const links = document.querySelector('.nav-links')
  if (links) links.style.display = links.style.display === 'flex' ? 'none' : 'flex'
}`
);

const switchViewScript = `const switchView = (view) => {
  document.querySelectorAll('.view').forEach((el) => el.classList.remove('active'))
  document.getElementById('view-' + view)?.classList.add('active')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}`;

const cgzhModalScript = `${switchViewScript}

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
}`;

scriptByView.CgzhGxEnterpriseDemandView = switchViewScript;
scriptByView.CgzhQyEnterpriseDemandView = switchViewScript;
scriptByView.CgzhGxDemandDetailView = '';
scriptByView.CgzhQyDemandDetailView = '';
scriptByView.CgzhQyUniversityDemandView = '';

scriptByView.CgzhGxUniversityDemandView = `import { onBeforeUnmount, onMounted } from 'vue'

${cgzhModalScript}

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

onBeforeUnmount(() => cleanup?.())`;

const techDemandScript = `${cgzhModalScript}

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
      tag.innerHTML = \`\${e.target.value.trim()} <span class="form-tag-remove" onclick="this.parentElement.remove()">×</span>\`
      tagsContainer.insertBefore(tag, e.target)
      e.target.value = ''
    }
  }
  tagInput?.addEventListener('keydown', onTagKeydown)

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.5s ease-out forwards'
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

onBeforeUnmount(() => cleanup?.())`;

scriptByView.CgzhGxTechDemandPlatformView = `import { onBeforeUnmount, onMounted } from 'vue'

${techDemandScript}`;
scriptByView.CgzhQyTechDemandPlatformView = scriptByView.CgzhGxTechDemandPlatformView;

// 生成视图
for (const page of pages) {
  const source = fs.readFileSync(path.join(LEGACY, page.file), 'utf8');
  const bodyMatch = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let body = bodyMatch ? bodyMatch[1] : source;

  const inlineStyles = [...source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join('\n');

  body = body.replace(/<script[\s\S]*?<\/script>/gi, '');
  body = body.replace(/<style[\s\S]*?<\/style>/gi, '');
  body = body.replace(/<link\b[^>]*>/gi, '');
  body = rewriteLinks(body, page.file);
  body = rewriteHandlers(body);

  let wrapperClass = `page--${pageId(page)}`;
  if (page.css === 'platform') wrapperClass = 'page--platform';

  // 首页特有：避免与挂载点 #app 冲突，并把弹窗/主体改为状态驱动
  if (page.view === 'HomeView') {
    body = body.replace('<div id="app">', '<div id="site-app" :class="{ \'is-visible\': appVisible }">');
    body = body.replace(
      '<div class="splash-modal" id="splashModal" aria-hidden="false">',
      '<div class="splash-modal" id="splashModal" :class="{ \'is-hidden\': !splashVisible }" :aria-hidden="String(!splashVisible)">'
    );
    body = body.replace('<div class="splash-modal__overlay"></div>', '<div class="splash-modal__overlay" @click="hideSplash"></div>');
    body = body.replace('<button class="splash-modal__close" id="splashCloseBtn" aria-label="关闭">', '<button class="splash-modal__close" id="splashCloseBtn" aria-label="关闭" @click="hideSplash">');
  }

  const css = scopeCss(fixKnownCssIssues(inlineStyles), wrapperClass, page.view !== 'HomeView');
  let script = scriptByView[page.view] || '';

  // 页面脚本中引用的动画名需要跟随 keyframes 前缀
  const keyframeNames = [...new Set([...css.matchAll(/@keyframes\s+(page--[\w-]+)/g)].map((m) => m[1]))];
  for (const name of keyframeNames) {
    const original = name.slice(wrapperClass.length + 1);
    script = script.replace(new RegExp(`(['"])${escapeRegExp(original)}\\b`, 'g'), `$1${name}`);
  }

  const parts = [];
  parts.push('<template>');
  parts.push(`  <div class="page ${wrapperClass}">`);
  parts.push(body.replace(/^\s+|\s+$/g, ''));
  parts.push('  </div>');
  parts.push('</template>');
  parts.push('');
  parts.push('<script setup>');
  parts.push(script);
  parts.push('</script>');
  parts.push('');
  if (page.css === 'inline+home') {
    parts.push('<style scoped src="../assets/styles/home.css"></style>');
  } else if (page.css === 'platform') {
    parts.push('<style scoped src="../assets/styles/platform-shared.css"></style>');
  }
  if (css.trim()) {
    parts.push('<style scoped>');
    parts.push(css);
    parts.push('</style>');
  }
  parts.push('');

  fs.writeFileSync(path.join(VIEWS, `${page.view}.vue`), parts.join('\n'), 'utf8');
}

// 共享样式：收敛全局选择器，避免 SPA 内的跨页冲突
function transformSharedCss(sourceRel, targetRel, wrapperClass, prefixKeyframes) {
  let css = fs.readFileSync(path.join(LEGACY, sourceRel), 'utf8');
  css = scopeCss(css, wrapperClass, prefixKeyframes);
  css = css.replace(/#app\b/g, '#site-app');
  fs.writeFileSync(path.join(ROOT, targetRel), css, 'utf8');
}

transformSharedCss('styles/main.css', 'src/assets/styles/home.css', 'page--home', false);
transformSharedCss('platforms/shared.css', 'src/assets/styles/platform-shared.css', 'page--platform', true);

// 技术经理人数据
const techManagerSource = fs.readFileSync(path.join(LEGACY, 'tech-manager-intro.html'), 'utf8');
const managersBlock = techManagerSource.match(/const managers = \[[\s\S]*?\n\];/)?.[0] || '';
const tagColorsBlock = techManagerSource.match(/const tagColors = \{[\s\S]*?\n\};/)?.[0] || '';
const defaultTagColorBlock = techManagerSource.match(/const defaultTagColor = \{[^\n]*\};/)?.[0] || '';
const levelColorsBlock = techManagerSource.match(/const levelColors = \{[\s\S]*?\n\};/)?.[0] || '';

const dataFile = [
  '// 由 build/migrate-legacy.mjs 从 legacy/tech-manager-intro.html 提取',
  managersBlock.replace('const managers', 'export const managers'),
  '',
  tagColorsBlock.replace('const tagColors', 'export const tagColors'),
  '',
  defaultTagColorBlock.replace('const defaultTagColor', 'export const defaultTagColor'),
  '',
  levelColorsBlock.replace('const levelColors', 'export const levelColors'),
  '',
].join('\n');

fs.mkdirSync(path.join(ROOT, 'src', 'data'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'src', 'data', 'managers.js'), dataFile, 'utf8');

console.log(`✅ 已生成 ${pages.length} 个视图组件到 src/views/`);
