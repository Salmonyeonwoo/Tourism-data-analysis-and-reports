// ==========================================================================
// 2026 AX Contest - Tab 3: Marketing Deliverables (tabAssets.js)
// - OSMU 7 Digital Assets Showcase
// - Interactive Simulator: 8-card CardNews vs 4-page Flipbook
// - Visual Reference 03 with concept disclaimer
// - Missing assets marked as "이미지 추가 필요" (Requirement 8)
// ==========================================================================

const TabAssets = {
  previewMode: 'cardnews',
  previewIdx: 0,

  render: function(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    el.innerHTML = `
      <!-- Top Banner -->
      <div class="bg-white rounded-2xl p-6 sm:p-8 card-shadow border border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div class="flex flex-wrap items-center gap-2.5">
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">마케팅 제작 산출물</h1>
            <span class="badge-report px-3 py-1 rounded-full text-xs font-bold">OSMU 7종 웹·미디어 에셋</span>
          </div>
          <p class="text-sm sm:text-base text-slate-600 mt-2">
            단일 기획을 대시보드(2종)와 홍보·커머스 웹에셋(5종)으로 일관되게 전개한 산출물 쇼케이스
          </p>
        </div>
        <button type="button" onclick="openVisualModal('danyang')" class="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-2 self-start md:self-auto">
          <i class="fa-solid fa-expand"></i>
          단양 포스터 시안 크게 보기
        </button>
      </div>

      <!-- Interactive Preview Simulator (CardNews & Flipbook) -->
      <div class="rounded-2xl navy-sidebar text-white p-6 sm:p-8 card-shadow space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-700/80">
          <div>
            <span class="text-xs font-extrabold text-teal-300 uppercase tracking-wider">INTERACTIVE SIMULATOR</span>
            <h2 class="text-lg sm:text-xl font-extrabold text-white mt-1">콘텐츠 구조 인터랙티브 뷰어</h2>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" onclick="TabAssets.setPreviewMode('cardnews')" id="prev-btn-cardnews" class="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-teal-700 text-white transition">
              단양 지오패스 8장 카드뉴스
            </button>
            <button type="button" onclick="TabAssets.setPreviewMode('flipbook')" id="prev-btn-flipbook" class="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition">
              야간미술관패스 플립북 (4P)
            </button>
          </div>
        </div>

        <!-- Slide Stage Box -->
        <div id="interactive-slide-box" class="p-6 sm:p-8 rounded-xl bg-slate-800/80 border border-slate-700 min-h-[180px] flex flex-col justify-between">
          <!-- Populated by JS -->
        </div>

        <!-- Slide Pagination Controls -->
        <div class="flex items-center justify-between pt-2">
          <button type="button" onclick="TabAssets.stepPreview(-1)" class="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold transition flex items-center gap-1.5">
            <i class="fa-solid fa-chevron-left"></i> 이전 장
          </button>
          <span class="text-xs font-bold text-teal-300" id="preview-page-indicator">01 / 08</span>
          <button type="button" onclick="TabAssets.stepPreview(1)" class="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-600 text-white text-xs font-bold transition flex items-center gap-1.5">
            다음 장 <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <!-- 7 Digital Assets Table / Grid (Requirement 3 & 4 & 8) -->
      <div class="bg-white rounded-2xl p-6 sm:p-8 card-shadow border border-slate-200 space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="teal-accent-bar h-6"></div>
            <h2 class="text-lg font-extrabold text-slate-900">공모전 출품 기술서 기재 7종 웹·미디어 산출물 명세</h2>
          </div>
          <span class="badge-report px-2.5 py-0.5 rounded text-[11px] font-bold">보고서 기재 목록</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          ${CONTEST_DATA.digitalAssetsList.map((asset, idx) => `
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <span class="font-extrabold text-teal-800">에셋 0${idx + 1}</span>
                  <span class="px-2 py-0.5 rounded ${asset.role.includes('과거') ? 'badge-practice' : asset.role.includes('재구성') ? 'badge-concept' : 'badge-report'} font-bold text-[10px]">
                    ${asset.role}
                  </span>
                </div>
                <h3 class="text-sm font-extrabold text-slate-900">${asset.name}</h3>
                <p class="text-slate-600 mt-1 leading-relaxed">${asset.desc}</p>
              </div>
              <div class="mt-3 pt-2 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-400">
                <span>포맷: HTML / Web Asset</span>
                ${idx < 2 ? '<span class="text-amber-700 font-semibold">[이미지 추가 필요] 실습 웹 에셋</span>' : '<span class="text-teal-700 font-semibold">시안 프리뷰 연동</span>'}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Visual Reference 03 (Danyang Poster) with Disclaimer -->
      <div class="bg-white rounded-2xl p-6 card-shadow border border-slate-200">
        <div class="flex items-center justify-between mb-3">
          <div>
            <span class="badge-concept px-2.5 py-0.5 rounded text-[11px] font-bold">VISUAL REFERENCE 03</span>
            <h3 class="text-base font-extrabold text-slate-900 mt-1">단양 지오패스 원정대 홍보 콘셉트 시안</h3>
          </div>
          <span class="text-xs text-rose-600 font-medium">재구성 시안 — 실제 운영 화면 또는 판매 실적이 아닙니다</span>
        </div>
        <div class="rounded-xl overflow-hidden border border-slate-200">
          <img src="assets/ref3_danyang.jpg" alt="단양 지오패스 홍보 콘셉트 시안" class="w-full h-auto cursor-pointer" onclick="openVisualModal('danyang')">
        </div>
      </div>
    `;

    this.renderSlide();
  },

  setPreviewMode: function(mode) {
    this.previewMode = mode;
    this.previewIdx = 0;
    document.getElementById('prev-btn-cardnews').className = mode === 'cardnews'
      ? 'px-3.5 py-1.5 rounded-lg text-xs font-bold bg-teal-700 text-white transition'
      : 'px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition';
    document.getElementById('prev-btn-flipbook').className = mode === 'flipbook'
      ? 'px-3.5 py-1.5 rounded-lg text-xs font-bold bg-teal-700 text-white transition'
      : 'px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition';
    this.renderSlide();
  },

  stepPreview: function(delta) {
    const list = this.previewMode === 'cardnews' ? CONTEST_DATA.cardNewsSlides : CONTEST_DATA.flipbookPages;
    this.previewIdx = (this.previewIdx + delta + list.length) % list.length;
    this.renderSlide();
  },

  renderSlide: function() {
    const list = this.previewMode === 'cardnews' ? CONTEST_DATA.cardNewsSlides : CONTEST_DATA.flipbookPages;
    const item = list[this.previewIdx];
    const box = document.getElementById('interactive-slide-box');
    if (!box) return;

    box.innerHTML = `
      <div class="flex items-center justify-between mb-3">
        <span class="px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-200 text-xs font-bold">
          ${item.step}
        </span>
        <span class="text-xs text-slate-300 font-medium">
          ${this.previewMode === 'cardnews' ? '단양 지오패스 카드뉴스 8장.html' : '야간미술관패스 플립북 (4P).html'}
        </span>
      </div>
      <div>
        <h3 class="text-lg sm:text-xl font-extrabold text-white leading-snug">${item.title}</h3>
        <p class="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">${item.desc}</p>
      </div>
      <div class="mt-4 pt-3 border-t border-slate-700 flex items-center justify-between text-[11px] text-teal-300">
        <span>보고서 기재 내용을 바탕으로 재구성한 시뮬레이션입니다</span>
        <span>${this.previewIdx + 1} / ${list.length}</span>
      </div>
    `;

    document.getElementById('preview-page-indicator').textContent =
      String(this.previewIdx + 1).padStart(2, '0') + ' / ' + String(list.length).padStart(2, '0');
  }
};
