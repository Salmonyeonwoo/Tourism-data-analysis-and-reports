# 2026 관광 AX 현업활용 심사위원용 인터랙티브 대시보드
> **인천 · 관광 AX 공모전 출품작 개선본** | 출품자: 박연우 (David Park)  
> *"데이터를 관광상품으로, 반복업무를 환대로"*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![HTML5 / Vanilla JS](https://img.shields.io/badge/Frontend-HTML5%20%7C%20Vanilla%20JS%20%7C%20Tailwind-38B2AC)](https://developer.mozilla.org/ko/docs/Web/JavaScript)
[![Multilingual AI](https://img.shields.io/badge/AI%20Concierge-KO%20%7C%20EN%20%7C%20JA%20%7C%20ZH-teal)](https://github.com/Salmonyeonwoo/Tourism-data-analysis-and-reports)

---

## 📌 프로젝트 소개 (Overview)
글로벌 OTA(Klook) AI QA 및 CS 운영 경험을 바탕으로, **인천 관광 활성화 및 외국인 관광객 응대 자동화**를 위해 기획·제작된 인터랙티브 웹 대시보드입니다.

인천 방문객의 짧은 체류시간(평균 2.5시간) 극복을 위한 데이터 분석과 함께, 로컬 상권의 가장 큰 애로사항인 **언어 장벽(61.0%)**을 완화하는 **실시간 다국어 AI 프리컨시어지**를 구현했습니다.

---

## 🚀 주요 메뉴 & 기능 (Key Features)

### 1. 🏠 한눈에 보기 (Overview)
- **핵심 목표(KPI)**: 관광 상품 기획 기간 90% 단축(10영업일 → 1일), 인천 체류시간 2.5시간 한계 극복
- **3대 전략 & Klook AI QA 안전 가드레일**: 표준 정형 문의 자동화와 전문 예외 검토 프로세스 분리

### 2. 📊 관광 분석 (Analysis)
- 인천 3대 권역(**개항장·차이나타운, 송도 센트럴파크, 영종도·강화군**)별 관광객 소비 패턴 및 체류시간 데이터 시각화 (Chart.js 연동)
- 지역 필터링을 통한 실시간 맞춤 전략 카드 제공

### 3. 📦 제작 산출물 (Assets)
- **스마트 투어 패스**: 단양 지오패스, 인천 헤리티지 패스 등 실제 산출물 콘셉트
- **인터랙티브 뷰어**: 카드뉴스(CardNews) 슬라이드 및 리플릿 플립북(Flipbook) 시뮬레이터 내장
- 원본 시안 확대 모달 지원

### 4. 💬 다국어 AI 프리컨시어지 (Multilingual AI Concierge)
- **4개 국어 실시간 소통 지원**: 한국어(KO), English(EN), 日本語(JA), 简体中文(ZH)
- **인천 핵심 명소·맛집·교통 실시간 안내**:
  - 차이나타운(하얀짜장/원조 자장면/길거리 간식)
  - 송도 센트럴파크(문보트/G타워 33층 무료 전망대/야경)
  - 개항장 문화거리(120년 전통 등록문화재 카페 팟알/흑백사진관)
  - 영종도 복합리조트(인스파이어 '오로라' 미디어아트 쇼/파라다이스시티 씨메르)
  - 인천공항 ↔ 도심 교통(공항철도 AREX, 리무진 버스, 수하물 짐 보관소)
- **원클릭 후속 질문 칩 (Quick Prompt Chips)**: 클릭 한 번으로 대화가 꼬리를 물고 자연스럽게 연결
- **Klook 스타일 안전 가드레일 (Safety Guardrail)**: 결항·환불 등 법적/금전적 예외 문의 감지 시, 제멋대로 확답하지 않고 우측 '예외 규정 검토 패널'로 실시간 전환
- **(선택 사양) Google Gemini Live AI 모드**: 상단 모달에서 API Key를 입력하여 100% 실시간 생성형 AI 자유 대화 가능

---

## 💻 실행 방법 (Getting Started)

별도의 백엔드 서버나 빌드 과정 없이, 웹 브라우저에서 즉시 실행 가능합니다.

1. 저장소를 클론(Clone)하거나 다운로드합니다:
   ```bash
   git clone https://github.com/Salmonyeonwoo/Tourism-data-analysis-and-reports.git
   ```
2. 프로젝트 폴더의 `index.html` 파일을 더블 클릭하거나 브라우저(Chrome, Edge 등)로 엽니다.
3. 좌측 사이드바(모바일은 하단 탭)를 통해 4개 메뉴를 자유롭게 탐색할 수 있습니다.

---

## 🧪 자동화 테스트 검증 (Automated Testing)

프로젝트 루트에서 Node.js를 통해 6가지 핵심 인터랙션 및 가드레일 단위 테스트를 검증할 수 있습니다:
```bash
node test_all.js
```
```text
=== RUNNING AUTOMATED UNIT & INTEGRATION TESTS ===
Test 1: TabOverview.render() -> PASS
Test 2: TabAnalysis.render() & selectRegion() -> PASS
Test 3: TabAssets.render() -> PASS
Test 4: TabConcierge 4 Languages x 3 Scenarios & Guardrails -> PASS
Test 5: State Retention Across Language Switch -> PASS
Test 6: Custom Chat Query & Keyword Detection -> PASS
=== ALL 6 AUTOMATED TESTS PASSED WITH 100% SUCCESS! ===
```

---

## 📂 디렉토리 구조 (Directory Structure)
```text
├── index.html                   # 메인 인터랙티브 대시보드
├── test_all.js                  # 자동화 단위/통합 테스트 스크립트
├── README.md                    # 프로젝트 안내 문서
├── assets/                      # 고해상도 시각 시안 이미지 (인천/컨시어지/단양)
├── css/
│   └── styles.css               # 커스텀 테마 스타일 및 반응형 CSS
└── js/
    ├── app.js                   # 탭 전환, 모달, 토스트 등 애플리케이션 진입점
    ├── data/
    │   ├── contestData.js       # 공모전 KPI, 지역별 데이터셋
    │   └── i18n.js              # 4개 국어(KO/EN/JA/ZH) 다국어 번역 데이터
    └── components/
        ├── tabOverview.js       # 한눈에 보기 컴포넌트
        ├── tabAnalysis.js       # 관광 데이터 분석 컴포넌트
        ├── tabAssets.js         # 제작 산출물 컴포넌트
        └── tabConcierge.js      # 실시간 다국어 AI 프리컨시어지 컴포넌트
```

---

## 👤 출품자 정보 (Author)
* **박연우 (David Park)** | 글로벌 OTA(Klook) AI QA · CS 전문가 (8.5년 경력)
* **Email**: yeonwoopark40@gmail.com
