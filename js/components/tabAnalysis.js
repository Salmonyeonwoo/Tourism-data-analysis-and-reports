// ==========================================================================
// 2026 AX Contest - Tab 2: Tourism Analysis (tabAnalysis.js)
// Incheon Insights · Yeosu Role Separation · Same-Criteria Chart
// ==========================================================================

const TabAnalysis = {
  activeRegion: 'all',

  render: function(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const pr = CONTEST_DATA.projectRoles;

    el.innerHTML = `
      <div class="bg-white rounded-2xl p-6 sm:p-8 card-shadow border border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div class="flex flex-wrap items-center gap-2.5">
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">관광 데이터 분석</h1>
            <span class="badge-concept px-3 py-1 rounded-full text-xs font-bold">보고서 기반 재구성 시안</span>
          </div>
          <p class="text-sm sm:text-base text-slate-600 mt-2">만족도는 높지만(90.6%), 체류 전환(21.7%)과 다국어 소통(61.0%)은 핵심 해결 과제</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="badge-survey px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5">
            <i class="fa-solid fa-database text-sky-600"></i> 2024 인천관광 실태조사 기반 [조사값]
          </span>
          <button type="button" onclick="openVisualModal('incheon')" class="px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5">
            <i class="fa-solid fa-expand"></i> 시안 원본 보기
          </button>
        </div>
      </div>

      <!-- 프로젝트 역할 분리 및 공통 AI 체계 -->
      <div class="bg-white rounded-2xl p-6 card-shadow border border-slate-200">
        <div class="flex items-center gap-2 mb-3">
          <div class="teal-accent-bar h-6"></div>
          <h2 class="text-base sm:text-lg font-extrabold text-slate-900">프로젝트별 역할 분리 및 공통 AI 체계</h2>
        </div>
        <p class="text-xs sm:text-sm text-slate-600 mb-4">※ 아래 3개 프로젝트는 상이한 지역·목적의 결과물이며, 공통의 AI 파이프라인으로 연결됩니다.</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span class="px-2 py-0.5 rounded ${pr.incheon.badgeClass} font-bold">${pr.incheon.badge}</span>
            <h3 class="text-sm font-extrabold text-slate-900 mt-2">${pr.incheon.name}</h3>
            <p class="text-slate-600 mt-1 leading-relaxed">${pr.incheon.role}</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span class="px-2 py-0.5 rounded ${pr.yeosu.badgeClass} font-bold">${pr.yeosu.badge}</span>
            <h3 class="text-sm font-extrabold text-slate-900 mt-2">${pr.yeosu.name}</h3>
            <p class="text-slate-600 mt-1 leading-relaxed">${pr.yeosu.role}</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span class="px-2 py-0.5 rounded ${pr.danyang.badgeClass} font-bold">${pr.danyang.badge}</span>
            <h3 class="text-sm font-extrabold text-slate-900 mt-2">${pr.danyang.name}</h3>
            <p class="text-slate-600 mt-1 leading-relaxed">${pr.danyang.role}</p>
          </div>
        </div>
        <div class="mt-4 p-3 rounded-lg bg-teal-50/70 border border-teal-200 text-xs text-teal-900 flex items-start gap-2">
          <i class="fa-solid fa-link text-teal-700 mt-0.5"></i>
          <div><strong>공통 AI 활용 파이프라인:</strong><span class="ml-1">${pr.commonAI.pipeline}</span></div>
        </div>
      </div>

      <!-- 세 권역 연계 체류 전략 -->
      <div class="bg-white rounded-2xl p-6 card-shadow border border-slate-200 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 class="text-lg font-extrabold text-slate-900">세 권역을 하나의 체류 경험으로 [재구성 시안]</h2>
            <p class="text-xs text-slate-500 mt-0.5">권역별 특징을 연결하여 당일치기(78.3%)를 체류형으로 전환</p>
          </div>
          <div class="flex flex-wrap gap-1.5" id="region-btn-group">
            <button type="button" onclick="TabAnalysis.selectRegion('all')" id="reg-btn-all" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-700 text-white transition">전체 3권역</button>
            <button type="button" onclick="TabAnalysis.selectRegion('gaehang')" id="reg-btn-gaehang" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition">개항장 (제물포구)</button>
            <button type="button" onclick="TabAnalysis.selectRegion('songdo')" id="reg-btn-songdo" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition">송도 (연수구)</button>
            <button type="button" onclick="TabAnalysis.selectRegion('yeongjong')" id="reg-btn-yeongjong" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition">영종·강화</button>
          </div>
        </div>
        <div id="region-detail-box" class="rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs sm:text-sm text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span class="font-extrabold text-teal-800" id="region-detail-title">[전체 3권역 통합 진단]</span>
            <span id="region-detail-desc" class="ml-1">${CONTEST_DATA.regions.all.desc}</span>
          </div>
          <span class="badge-concept px-2.5 py-1 rounded text-xs font-bold flex-shrink-0" id="region-target-badge">${CONTEST_DATA.regions.all.targetBadge}</span>
        </div>
      </div>

      <!-- 차트 및 수용태세 분석 (Requirement 5) -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-2xl p-6 card-shadow border border-slate-200">
          <div class="flex items-center justify-between mb-3">
            <div>
              <span class="px-2 py-0.5 rounded badge-survey text-[10px] font-bold">동일 기준(%) 비교 차트</span>
              <h3 class="text-sm sm:text-base font-extrabold text-slate-900 mt-1">내·외국인 주요 관광지 방문 비율 (복수응답, %)</h3>
            </div>
            <span class="text-xs text-slate-400">2024 실태조사 [조사값]</span>
          </div>
          <div class="relative h-64 sm:h-72"><canvas id="spotsChart"></canvas></div>
        </div>

        <div class="bg-white rounded-2xl p-6 card-shadow border border-slate-200 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="px-2 py-0.5 rounded badge-report text-[10px] font-bold">조사 기준 상이</span>
              <span class="text-xs font-semibold text-rose-600">[확인 필요] 표본·문항 기준 분리</span>
            </div>
            <h3 class="text-sm sm:text-base font-extrabold text-slate-900">관광 수용태세 점수 분석</h3>
            <p class="text-xs text-slate-500 mt-1 leading-relaxed">
              ※ 내국인(n=3,000)과 외국인(n=1,000) 문항 및 표본 기준이 상이하여 동일 그래프 내 단일 순위 비교는 부적합하므로, 항목별 지표로 분리하여 제시합니다.
            </p>
            <div class="mt-4 space-y-2.5 text-xs">
              <div class="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div><span class="font-bold text-slate-800">숙박시설 만족도 (외국인 호텔 85.3% 관련)</span><p class="text-[11px] text-slate-500">5점 만점 기준 · 외국인 조사값</p></div>
                <span class="text-base font-extrabold text-teal-700">4.55점</span>
              </div>
              <div class="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div><span class="font-bold text-slate-800">치안 안전성 만족도</span><p class="text-[11px] text-slate-500">5점 만점 기준 · 조사 보고서 기재값</p></div>
                <span class="text-base font-extrabold text-teal-700">4.48점</span>
              </div>
              <div class="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div><span class="font-bold text-slate-800">내국인 교통 편리성 & 여행 경비</span><p class="text-[11px] text-slate-500">5점 만점 기준 · 내국인 조사값</p></div>
                <span class="text-base font-extrabold text-amber-700">교통 3.97점 / 경비 3.93점</span>
              </div>
              <div class="p-3 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-between">
                <div><span class="font-bold text-rose-900">외국인 언어소통 만족도 (핵심 병목)</span><p class="text-[11px] text-rose-600">5점 만점 3.67점 (환산 61.0%) · 외국인 조사값</p></div>
                <span class="text-base font-extrabold text-rose-700">3.67점 (최저)</span>
              </div>
            </div>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
            기준선 4.0점 대비 외국인 언어소통(3.67점)이 가장 취약하여 다국어 AI 컨시어지 설계의 핵심 배경이 되었습니다.
          </div>
        </div>
      </div>

      <!-- Visual Reference 01 -->
      <div class="bg-white rounded-2xl p-6 card-shadow border border-slate-200">
        <div class="flex items-center justify-between mb-3">
          <div>
            <span class="badge-concept px-2.5 py-0.5 rounded text-[11px] font-bold">VISUAL REFERENCE 01</span>
            <h3 class="text-base font-extrabold text-slate-900 mt-1">인천 관광 인사이트 대시보드 시안</h3>
          </div>
          <span class="text-xs text-rose-600 font-medium">재구성 시안 — 실제 운영 화면 또는 판매 실적이 아닙니다</span>
        </div>
        <div class="rounded-xl overflow-hidden border border-slate-200">
          <img src="assets/ref1_incheon.jpg" alt="인천 관광 대시보드 시안" class="w-full h-auto cursor-pointer" onclick="openVisualModal('incheon')">
        </div>
      </div>
    `;

    this.initChart();
  },

  selectRegion: function(regKey) {
    this.activeRegion = regKey;
    const info = CONTEST_DATA.regions[regKey] || CONTEST_DATA.regions.all;
    document.getElementById('region-detail-title').textContent = info.title;
    document.getElementById('region-detail-desc').textContent = info.desc;
    document.getElementById('region-target-badge').textContent = info.targetBadge;

    const btns = document.querySelectorAll('#region-btn-group button');
    btns.forEach(b => {
      b.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition';
    });
    const active = document.getElementById('reg-btn-' + regKey);
    if (active) active.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-700 text-white transition';
  },

  initChart: function() {
    const ctx = document.getElementById('spotsChart');
    if (!ctx) return;
    new Chart(ctx.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['차이나타운', '월미도·테마파크', '송도 센트럴파크', '용유도/파라다이스', '소래포구/동화마을'],
        datasets: [
          { label: '내국인 방문 비율 (n=3,000)', data: [32.6, 29.3, 16.6, 21.7, 14.8], backgroundColor: '#162a47', borderRadius: 6 },
          { label: '외국인 방문 비율 (n=1,000)', data: [59.7, 36.2, 39.9, 28.5, 28.9], backgroundColor: '#0d8a96', borderRadius: 6 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11 } } } },
        scales: { y: { beginAtZero: true, max: 70, title: { display: true, text: '방문 비율 (%, 복수응답)' } } }
      }
    });
  }
};
