// ==========================================================================
// 2026 AX Contest - Tab 1: Overview (tabOverview.js)
// 1. 핵심 제목 & 10초 요약 -> 2. 업무효율 지표 2개 -> 3. 대표 산출물 3개 -> 4. 3단계 체계
// ==========================================================================

const TabOverview = {
  render: function(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const eff = CONTEST_DATA.efficiencyMetrics;
    const findings = CONTEST_DATA.surveyFindings;

    el.innerHTML = `
      <!-- 1. 핵심 제목과 한 줄 설명 (Hero Banner) -->
      <div class="bg-white rounded-2xl p-6 sm:p-8 card-shadow border border-slate-200">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full bg-teal-600/15 text-teal-800 text-xs font-bold border border-teal-200">2026 AI 현업활용 우수사례 공모전</span>
            <span class="px-2.5 py-0.5 rounded-full badge-report text-xs font-semibold">보고서 기재 시안</span>
          </div>
          <span class="text-xs font-medium text-slate-500">출품자: 박연우 (David Park)</span>
        </div>

        <div class="mt-5">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
            데이터를 관광상품으로, 반복 업무를 고객 환대로
          </h1>
          <p class="text-base sm:text-lg font-medium text-slate-600 mt-2">
            글로벌 OTA AI QA 실무 경험과 관광 교육 산출물을 융합한 관광 AX(AI 전환) 혁신 모델
          </p>

          <!-- 10초 핵심 요약 박스 (심사위원용) -->
          <div class="mt-5 p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200">
            <div class="flex items-center gap-2 mb-2">
              <i class="fa-solid fa-stopwatch text-teal-600 text-sm"></i>
              <span class="text-xs font-extrabold text-slate-800 uppercase tracking-wider">심사위원 10초 핵심 요약</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div class="bg-white p-3 rounded-lg border border-slate-200">
                <span class="font-bold text-teal-800 block mb-1">Q. 어떤 문제를 다뤘는가?</span>
                <p class="text-slate-600 leading-relaxed">인천 관광 만족도는 높으나(90.6%), 당일여행(78.3%) 편중과 외국인 언어소통(61.0%)이 핵심 병목</p>
              </div>
              <div class="bg-white p-3 rounded-lg border border-slate-200">
                <span class="font-bold text-teal-800 block mb-1">Q. AI로 어떻게 다뤘는가?</span>
                <p class="text-slate-600 leading-relaxed">데이터 분석 파이프라인 → 멀티포맷 에셋(OSMU) 원천 생성 → AI QA 룰베이스 다국어 CS 설계</p>
              </div>
              <div class="bg-white p-3 rounded-lg border border-slate-200">
                <span class="font-bold text-teal-800 block mb-1">Q. 무엇을 만들었는가?</span>
                <p class="text-slate-600 leading-relaxed">대시보드 2종, 마케팅 웹에셋 5종, 4개국어(한·영·일·중) AI 프리컨시어지 하이브리드 프로토타입</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. 업무효율 지표 2개 -->
      <div class="bg-white rounded-2xl p-6 sm:p-8 card-shadow border border-slate-200">
        <div class="flex items-center gap-2 mb-4">
          <div class="teal-accent-bar h-6"></div>
          <h2 class="text-lg sm:text-xl font-extrabold text-slate-900">핵심 업무효율 지표</h2>
          <span class="badge-report px-2 py-0.5 rounded text-[11px] font-bold">보고서 기재값, 실측 여부 미확인</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${eff.map(e => `
            <div class="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div class="flex items-center justify-between">
                <span class="px-2.5 py-0.5 rounded ${e.badgeClass} text-[11px] font-bold">${e.badge}</span>
                <span class="text-xs text-rose-600 font-semibold">${e.subNote}</span>
              </div>
              <p class="text-sm font-bold text-slate-800 mt-3">${e.label}</p>
              <p class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">${e.fromTo}</p>
              <p class="text-3xl sm:text-4xl font-extrabold text-teal-700 mt-1">${e.rateNumber} <span class="text-base font-bold text-slate-600">${e.rateUnit}</span></p>
              <p class="text-xs text-slate-500 mt-2">${e.calcNote}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 3. 대표 산출물 3개 -->
      <div class="bg-white rounded-2xl p-6 sm:p-8 card-shadow border border-slate-200">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <div class="teal-accent-bar h-6"></div>
            <h2 class="text-lg sm:text-xl font-extrabold text-slate-900">대표 산출물 (3개 영역)</h2>
          </div>
          <span class="text-xs text-slate-500">카드를 클릭하면 상세 화면으로 이동합니다</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div onclick="switchTab('tab-analysis')" class="card-hover cursor-pointer p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="px-2.5 py-0.5 rounded badge-concept text-[11px] font-bold">01. 관광 데이터 분석</span>
                <i class="fa-solid fa-chart-column text-teal-600 text-lg"></i>
              </div>
              <h3 class="text-base sm:text-lg font-extrabold text-slate-900 mt-1">인천 관광 분석 & 여수 대시보드</h3>
              <p class="text-xs text-slate-600 mt-2 leading-relaxed">2024 인천 실태조사 공공데이터 기반 8대 인사이트 도출 및 여수시 관광 빅데이터 시각화 대시보드 구축 실습</p>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-teal-700">
              <span>관광 분석 상세 보기</span><i class="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          <div onclick="switchTab('tab-assets')" class="card-hover cursor-pointer p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="px-2.5 py-0.5 rounded badge-report text-[11px] font-bold">02. 마케팅 제작물</span>
                <i class="fa-solid fa-layer-group text-teal-600 text-lg"></i>
              </div>
              <h3 class="text-base sm:text-lg font-extrabold text-slate-900 mt-1">단양 지오패스 & 7종 웹에셋</h3>
              <p class="text-xs text-slate-600 mt-2 leading-relaxed">단일 지오패스 기획을 인스타그램 8장 카드뉴스, 판매 상세페이지, 야간 플립북 브로슈어로 쾌속 전개(OSMU)</p>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-teal-700">
              <span>제작 산출물 상세 보기</span><i class="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          <div onclick="switchTab('tab-concierge')" class="card-hover cursor-pointer p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="px-2.5 py-0.5 rounded badge-concept text-[11px] font-bold">03. 다국어 CS 설계</span>
                <i class="fa-solid fa-headset text-rose-600 text-lg"></i>
              </div>
              <h3 class="text-base sm:text-lg font-extrabold text-slate-900 mt-1">4개국어 AI 프리컨시어지</h3>
              <p class="text-xs text-slate-600 mt-2 leading-relaxed">로컬 상권 정형 문의는 AI가 안내하고, 결항·복합 정책 예외는 검토 가이드 절차로 전환하는 하이브리드 구조</p>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-rose-700">
              <span>다국어 응대 데모 체험</span><i class="fa-solid fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. 과거 실무 / 이번 산출물 / 향후 적용 (3단계 라이프사이클) -->
      <div class="rounded-2xl navy-sidebar text-white p-6 sm:p-8 card-shadow">
        <div class="flex items-center gap-2 mb-4">
          <i class="fa-solid fa-timeline text-teal-300"></i>
          <h2 class="text-lg sm:text-xl font-extrabold text-white">과거 실무 → 이번 산출물 → 향후 적용 체계</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <span class="px-2.5 py-0.5 rounded badge-practice text-[11px] font-bold">1단계 · 과거 실무</span>
            <h3 class="text-base font-extrabold text-white mt-2">글로벌 OTA(Klook) AI QA 실무</h3>
            <p class="text-xs text-slate-300 mt-1.5 leading-relaxed">8.5년 OTA 실무에서 폭설·결항 등 10대 실패패턴 방지 로직 구축 및 상담원 이관율 안정화 검증</p>
          </div>
          <div class="p-4 rounded-xl bg-teal-900/40 border border-teal-500/50">
            <span class="px-2.5 py-0.5 rounded badge-report text-[11px] font-bold">2단계 · 이번 산출물</span>
            <h3 class="text-base font-extrabold text-white mt-2">공모전 실무 교육 7종 에셋</h3>
            <p class="text-xs text-slate-200 mt-1.5 leading-relaxed">인천 데이터 분석 8대 인사이트·24개 전략 및 여수 대시보드, 단양 지오패스 카드뉴스·상세페이지 등 기술서 기재</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <span class="px-2.5 py-0.5 rounded badge-goal text-[11px] font-bold">3단계 · 향후 적용</span>
            <h3 class="text-base font-extrabold text-white mt-2">인천 체류·다국어 소통 실증</h3>
            <p class="text-xs text-slate-300 mt-1.5 leading-relaxed">원도심 개항장·송도·영종 3권역 야간 패스 및 로컬 상권 QR 컨시어지 도입으로 숙박 전환과 다국어 편의 개선</p>
          </div>
        </div>
      </div>

      <!-- 문제 진단 조사 지표 (펼쳐보기) -->
      <details class="p-2 sm:p-4">
        <summary class="text-sm font-bold text-slate-800">
          <span>2024 인천관광 실태조사 4대 기초 지표 (조사값 세부 확인)</span>
        </summary>
        <div class="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          ${findings.map(f => `
            <div class="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span class="px-2 py-0.5 rounded ${f.badgeClass} text-[10px] font-bold">${f.badge}</span>
              <p class="text-slate-600 font-semibold mt-1">${f.label}</p>
              <p class="text-2xl font-extrabold kpi-value my-1">${f.value}</p>
              <p class="text-[11px] text-slate-500">${f.detail}</p>
            </div>
          `).join('')}
        </div>
        <p class="text-[11px] text-slate-500 mt-3 pl-1">※ 2024 인천관광 실태조사(내국인 n=3,000, 외국인 n=1,000) 인용 지표이며, 서로 다른 표본·항목의 조사값입니다.</p>
      </details>
    `;
  }
};
