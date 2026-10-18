// ==========================================================================
// 2026 AX Contest - Main Application Bootstrap (app.js)
// Orchestrates 4 simplified tabs:
// - 한눈에 보기 ('tab-overview')
// - 관광 분석 ('tab-analysis')
// - 제작 산출물 ('tab-assets')
// - 다국어 응대 ('tab-concierge')
// Manages Mobile Navigation, Modals, and Toasts
// ==========================================================================

let activeTabId = 'tab-overview';
let toastTimer = null;

function switchTab(tabId) {
  activeTabId = tabId;

  // Toggle Tab Panels
  const panels = document.querySelectorAll('.tab-panel');
  panels.forEach(p => p.classList.add('hidden'));

  const target = document.getElementById(tabId);
  if (target) {
    target.classList.remove('hidden');
  }

  // Update Desktop Sidebar Navigation
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    btn.className = 'nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium text-slate-300 hover:bg-slate-800/60 transition-all';
  });
  const activeNav = document.getElementById('nav-' + tabId);
  if (activeNav) {
    activeNav.className = 'nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-bold transition-all bg-teal-600/30 text-white border border-teal-400/40 shadow-sm';
  }

  // Update Mobile Bottom Bar Navigation
  const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');
  mobileNavBtns.forEach(btn => {
    btn.className = 'mobile-nav-btn flex-1 py-2 text-center text-xs font-semibold text-slate-400 hover:text-white transition';
  });
  const activeMobileNav = document.getElementById('mob-nav-' + tabId);
  if (activeMobileNav) {
    activeMobileNav.className = 'mobile-nav-btn flex-1 py-2 text-center text-xs font-bold text-teal-400 transition';
  }

  // Close Mobile Drawer if open
  closeMobileDrawer();

  // Smooth scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  if (!drawer) return;
  drawer.classList.toggle('hidden');
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer && !drawer.classList.contains('hidden')) {
    drawer.classList.add('hidden');
  }
}

function openVisualModal(which) {
  const modal = document.getElementById('visual-modal');
  const title = document.getElementById('modal-title');
  const incheon = document.getElementById('modal-img-incheon');
  const concierge = document.getElementById('modal-img-concierge');
  const danyang = document.getElementById('modal-img-danyang');

  incheon.classList.add('hidden');
  concierge.classList.add('hidden');
  danyang.classList.add('hidden');

  if (which === 'incheon') {
    title.textContent = '인천 관광 인사이트 — 대시보드 시안 [재구성 시안]';
    incheon.classList.remove('hidden');
  } else if (which === 'concierge') {
    title.textContent = '다국어 AI 프리컨시어지 — 하이브리드 응대 시안 [재구성 시안]';
    concierge.classList.remove('hidden');
  } else {
    title.textContent = '단양 지오패스 원정대 — 홍보 콘셉트 포스터 시안 [재구성 시안]';
    danyang.classList.remove('hidden');
  }

  modal.classList.remove('hidden');
}

function closeVisualModal() {
  const modal = document.getElementById('visual-modal');
  if (modal) modal.classList.add('hidden');
}

function showToast(msg) {
  const t = document.getElementById('app-toast');
  const textEl = document.getElementById('app-toast-text');
  if (!t || !textEl) return;

  textEl.textContent = msg;
  t.classList.remove('hidden');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    t.classList.add('hidden');
  }, 3200);
}

// App Initialization
window.addEventListener('DOMContentLoaded', () => {
  // Render all 4 tab components
  TabOverview.render('tab-overview');
  TabAnalysis.render('tab-analysis');
  TabAssets.render('tab-assets');
  TabConcierge.render('tab-concierge');

  // Activate default overview tab
  switchTab('tab-overview');
});
