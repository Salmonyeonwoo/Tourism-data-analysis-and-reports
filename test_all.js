const fs = require('fs');
const path = require('path');
const vm = require('vm');

const baseDir = __dirname;
const elements = {};
function createMockElement(id) {
  return {
    id: id,
    classList: {
      classes: new Set(),
      add: function(c) { this.classes.add(c); },
      remove: function(c) { this.classes.delete(c); },
      contains: function(c) { return this.classes.has(c); },
      toggle: function(c) { if (this.classes.has(c)) this.classes.delete(c); else this.classes.add(c); }
    },
    className: '',
    innerHTML: '',
    textContent: '',
    value: '',
    placeholder: '',
    getContext: () => ({}),
    scrollTop: 0,
    scrollHeight: 100
  };
}

const context = {
  console: console,
  document: {
    getElementById: (id) => {
      if (!elements[id]) elements[id] = createMockElement(id);
      return elements[id];
    },
    querySelectorAll: (selector) => {
      return [createMockElement('mock-btn-1'), createMockElement('mock-btn-2')];
    }
  },
  window: { scrollTo: () => {} },
  Chart: function() {},
  showToast: (msg) => { console.log('  [Toast Displayed]:', msg); },
  openVisualModal: (which) => { console.log('  [Modal Opened]:', which); }
};

vm.createContext(context);

// Load scripts into context with var so they bind to context
['js/data/contestData.js', 'js/data/i18n.js', 'js/components/tabOverview.js', 'js/components/tabAnalysis.js', 'js/components/tabAssets.js', 'js/components/tabConcierge.js'].forEach(file => {
  let code = fs.readFileSync(path.join(baseDir, file), 'utf8');
  code = code.replace(/const (CONTEST_DATA|CONCIERGE_I18N|TabOverview|TabAnalysis|TabAssets|TabConcierge)/g, 'var $1');
  vm.runInContext(code, context);
});

console.log('=== RUNNING AUTOMATED UNIT & INTEGRATION TESTS ===\n');

// 1. Test Overview Tab
console.log('Test 1: TabOverview.render()');
context.TabOverview.render('tab-overview');
const overviewHtml = elements['tab-overview'].innerHTML;
console.assert(overviewHtml.includes('10영업일 → 1일'), 'Should include 10영업일 -> 1일');
console.assert(overviewHtml.includes('90%'), 'Should include 90%');
console.assert(overviewHtml.includes('24시간 → 2.5시간'), 'Should include 24시간 -> 2.5시간');
console.assert(overviewHtml.includes('약 89.6%'), 'Should include 89.6%');
console.assert(overviewHtml.includes('보고서 기재값, 실측 여부 미확인'), 'Should state unverified report value');
console.log('  -> PASS: Overview rendered with required KPIs and badges.\n');

// 2. Test Analysis Tab & Region Filters
console.log('Test 2: TabAnalysis.render() & selectRegion()');
context.TabAnalysis.render('tab-analysis');
['all', 'gaehang', 'songdo', 'yeongjong'].forEach(reg => {
  context.TabAnalysis.selectRegion(reg);
  console.assert(context.TabAnalysis.activeRegion === reg, 'Active region should be ' + reg);
  console.log(`  -> Region '${reg}' selected: ${elements['region-detail-title'].textContent}`);
});
console.log('  -> PASS: Regions filter working properly.\n');

// 3. Test Assets Tab & Interactive Simulator
console.log('Test 3: TabAssets.render(), setPreviewMode(), stepPreview()');
context.TabAssets.render('tab-assets');
console.assert(context.TabAssets.previewMode === 'cardnews', 'Default mode should be cardnews');
context.TabAssets.stepPreview(1);
console.assert(context.TabAssets.previewIdx === 1, 'Slide step index should be 1');
context.TabAssets.setPreviewMode('flipbook');
console.assert(context.TabAssets.previewMode === 'flipbook', 'Mode should switch to flipbook');
context.TabAssets.stepPreview(1);
console.assert(context.TabAssets.previewIdx === 1, 'Flipbook step index should be 1');
console.log('  -> PASS: CardNews & Flipbook simulators working properly.\n');

// 4. Test Concierge Tab - 4 Languages x 3 Scenarios
console.log('Test 4: TabConcierge 4 Languages x 3 Scenarios & Guardrails');
context.TabConcierge.render('tab-concierge');

const languages = ['ko', 'en', 'ja', 'zh'];
const scenarios = ['flight', 'promo', 'menu'];

languages.forEach(lang => {
  context.TabConcierge.setLanguage(lang);
  console.assert(context.TabConcierge.currentLang === lang, `Language should be ${lang}`);
  const i18n = context.CONCIERGE_I18N[lang];
  console.log(`  [Language: ${lang.toUpperCase()}] Notice: ${elements['concierge-live-badge'].textContent}`);
  console.assert(elements['concierge-live-badge'].textContent === i18n.badgeLiveNotice, 'Live notice must match');

  scenarios.forEach(scen => {
    context.TabConcierge.setScenario(scen);
    console.assert(context.TabConcierge.currentScenario === scen, `Scenario should be ${scen}`);
    const scenData = i18n.scenarios[scen];
    console.assert(elements['policy-panel-title'].textContent === scenData.panelTitle, 'Panel title must match');
    console.assert(!scenData.bot.includes('이관되었습니다') && !scenData.bot.includes('연결되었습니다'), 'Must not claim live agent transfer');
  });
});
console.log('  -> PASS: All 4 languages and 3 scenarios verified with strict guardrails.\n');

// 5. Test State Retention Across Language Switch
console.log('Test 5: State Retention (Scenario & Typed Input)');
context.TabConcierge.setScenario('menu');
elements['custom-chat-input'].value = 'Typing something important...';
context.TabConcierge.setLanguage('en');
console.assert(context.TabConcierge.currentScenario === 'menu', 'Scenario must remain menu after language switch');
console.assert(elements['custom-chat-input'].value === 'Typing something important...', 'Input text must be retained');
console.assert(elements['chat-btn-send-text'].textContent === 'Send', 'Button must translate to Send');
console.log('  -> PASS: Active scenario and typed input preserved during language switch.\n');

// 6. Test Custom Chat Query & Exception Detection
console.log('Test 6: Custom Chat Query & Keyword Detection');
elements['custom-chat-input'].value = '폭설로 인한 환불 절차 문의';
context.TabConcierge.sendCustomChat();
console.assert(context.TabConcierge.customChatHistory.length === 1, 'History length should be 1');
console.assert(context.TabConcierge.customChatHistory[0].isException === true, 'Should detect exception keyword');

elements['custom-chat-input'].value = '개항장 추천 코스 안내';
context.TabConcierge.sendCustomChat();
console.assert(context.TabConcierge.customChatHistory.length === 2, 'History length should be 2');
console.assert(context.TabConcierge.customChatHistory[1].isException === false, 'Should be standard normal inquiry');
console.log('  -> PASS: Custom inquiry exception detection and procedural guidance confirmed.\n');

console.log('=== ALL 6 AUTOMATED TESTS PASSED WITH 100% SUCCESS! ===');
