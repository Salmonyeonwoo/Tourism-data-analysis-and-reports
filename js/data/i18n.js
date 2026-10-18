// ==========================================================================
// 2026 AX Contest - Multilingual Concierge Dictionary (i18n.js)
// Language keys: 'ko', 'en', 'ja', 'zh'
// Strictly adheres to Contest requirements:
// - Disclaimer: "시나리오 기반 데모, 실제 연결 없음"
// - Guardrails: Verify allergen & refund procedures; no fake agent transfer
// ==========================================================================

const CONCIERGE_I18N = {
  ko: {
    badgeLiveNotice: "시나리오 기반 데모, 실제 연결 없음",
    scenarioTabs: {
      flight: "① 결항·폭설 환불 절차",
      promo: "② 복합 프로모션 환불 절차",
      menu: "③ 로컬 메뉴·알레르기 확인"
    },
    scenarios: {
      flight: {
        badge: "결항 관련 예외 절차 안내",
        isException: true,
        panelTitle: "예외 규정 검토 절차 안내",
        statusTitle: "예외 태그 감지 (증빙 검토 필요)",
        statusSub: "AI 일반 응답 중단 · 시나리오 기반 절차 가이드 제공",
        tags: ["결항 증빙 확인", "가맹점 취소 규정", "시나리오 데모 (실제 연결 없음)"],
        guide: "항공기 결항 시 투어 환불은 항공사 결항 확인서 제출 및 가맹점(Merchant) 취소 규정 확인 절차가 필요합니다. 본 화면은 시나리오 기반 데모로 실제 상담원이나 결제 시스템에 연결되지 않습니다.",
        user: "비행기가 기상 악화로 결항되었는데 예약한 투어 전액 환불이 가능한가요?",
        bot: "항공기 결항은 외부 증빙 검토가 필요한 예외 건입니다. [데모 안내] 실제 환불 처리는 상인 취소 규정과 결항 확인서 접수 절차가 필요하며, 본 데모는 실제 상담원 연결을 지원하지 않습니다. 구매처 안내에 따라 정식 예외 검토를 신청해 주시기 바랍니다."
      },
      promo: {
        badge: "복합 프로모션 부분 사용 절차",
        isException: true,
        panelTitle: "복합 정책 검토 절차 안내",
        statusTitle: "예외 태그 감지 (정산 규정 확인)",
        statusSub: "Klook AI QA 10대 실패패턴 방지 룰 작동",
        tags: ["프로모션 코드 적용", "부분 사용 차액 산정", "시나리오 데모 (실제 연결 없음)"],
        guide: "할인 프로모션이 적용된 패스의 부분 환불은 단품 기준 재산정 규정에 따라 가능 여부 및 금액이 달라집니다. 본 화면은 시나리오 기반 데모로 실제 상담원 이관은 발생하지 않습니다.",
        user: "프로모션 할인을 받아 3인 패스를 샀는데 1명만 사용했어요. 나머지 2명분 부분 환불 되나요?",
        bot: "복합 프로모션 및 부분 사용 건이 감지되었습니다. [데모 안내] 부분 환불 가능 여부와 차액 산정은 제휴사 약관에 따르며, 본 시스템은 시나리오 기반 데모로 실제 정산 상담원에게 이관되지 않습니다. 마이페이지의 정산 규정 확인 절차를 이용해 주세요."
      },
      menu: {
        badge: "로컬 상권 메뉴·알레르기 확인",
        isException: false,
        panelTitle: "AI 표준 정보 안내",
        statusTitle: "정형 문의 (정보 확인 안내)",
        statusSub: "로컬 상권 QR 도슨트 표준 가이드 즉시 표출",
        tags: ["메뉴 기본 정보", "알레르기 성분 확인 안내", "운영시간 확인 요망"],
        guide: "메뉴의 일반적 구성과 패스 운영 기준을 안내합니다. 주방 내 알레르기 교차접촉 여부 및 당일 마감 시간은 변동될 수 있으므로 현장 재확인 절차가 필수적입니다.",
        user: "하얀짜장에 땅콩이나 돼지고기가 들어가나요? 그리고 개항장 야간미술관 패스는 몇 시까지 입장 가능한가요?",
        bot: "하얀짜장의 표준 조리에는 돼지고기와 해산물이 주로 쓰입니다. 단, 조리 환경에 따른 땅콩 등 알레르기 교차접촉 가능성은 매장마다 다르므로 주문 전 현장 직원에게 직접 확인해 주셔야 합니다. 야간미술관 패스 입장 마감 시간은 현장 사정에 따라 변경될 수 있으니 방문 전 최신 공지를 확인해 주세요."
      }
    },
    ui: {
      inputPlaceholder: "궁금한 관광·메뉴·환불 규정을 입력해 보세요 (예: 알레르기, 결항)",
      btnSend: "전송",
      toastEmpty: "문의할 내용을 입력해 주세요.",
      toastException: "예외 태그 감지: 정책 검토 안내 패널이 활성화되었습니다 (시나리오 데모).",
      toastNormal: "AI 프리컨시어지 표준 안내가 완료되었습니다 (시나리오 데모).",
      botCustomReplyException: "[시나리오 데모] 환불/결항/복합정책 키워드가 감지되었습니다. 본 화면은 시나리오 기반 데모로 실제 상담원 연결은 지원되지 않으며, 가맹점 증빙 제출 절차를 안내합니다.",
      botCustomReplyNormal: "[시나리오 데모] 입력하신 문의에 대해 다국어 관광 지식베이스 기반의 표준 안내를 제공합니다. 매장 및 현장 운영 정책을 확인해 주시기 바랍니다."
    }
  },
  en: {
    badgeLiveNotice: "Scenario-based demo, no live connection",
    scenarioTabs: {
      flight: "① Flight Cancellation Procedure",
      promo: "② Bundle Promo Refund Procedure",
      menu: "③ Local Menu & Allergen Check"
    },
    scenarios: {
      flight: {
        badge: "Flight Cancellation Procedure",
        isException: true,
        panelTitle: "Exception Policy Review Guide",
        statusTitle: "Exception Tag Detected (Proof Required)",
        statusSub: "AI general response paused · Scenario-based procedure guide",
        tags: ["Flight Proof Required", "Merchant Policy Check", "Scenario Demo (No Live Link)"],
        guide: "Tour refunds due to flight cancellations require submitting airline proof and checking merchant cancellation policies. This interface is a scenario-based simulation with no connection to live agents or billing systems.",
        user: "My flight was cancelled due to bad weather. Can I get a full refund for my booked tour?",
        bot: "Flight cancellations require external proof verification. [Demo Notice] Actual refund processing depends on merchant cancellation rules and official certificate submission. This demo does not connect to live agents. Please follow your booking channel's formal review procedure."
      },
      promo: {
        badge: "Promo Bundle Partial Refund",
        isException: true,
        panelTitle: "Composite Policy Review Guide",
        statusTitle: "Exception Tag Detected (Settlement Rules)",
        statusSub: "Klook AI QA Top 10 Failure Prevention Rule triggered",
        tags: ["Promo Code Applied", "Partial Usage Calculation", "Scenario Demo (No Live Link)"],
        guide: "Partial refunds on promotional packages require recalculation based on standard non-discounted pricing. This is an interactive scenario simulation and does not transfer to live agents.",
        user: "I bought a 3-person pass with a promo code, but only 1 person used it. Can I refund the remaining 2?",
        bot: "Composite promo and partial usage detected. [Demo Notice] Eligibility and refund amounts depend on merchant terms. This system is a scenario-based simulation and does not transfer to a billing agent. Please consult the settlement guide in your reservation details."
      },
      menu: {
        badge: "Local Menu & Allergen Check",
        isException: false,
        panelTitle: "AI Standard Information Guide",
        statusTitle: "Standard Inquiry (Information Guide)",
        statusSub: "Local merchant QR docent standard guide provided instantly",
        tags: ["Basic Menu Info", "Allergen Verification Guide", "Check Operating Hours"],
        guide: "General menu ingredients and standard pass schedules are provided. Because allergen cross-contact in kitchens and operating hours can change, on-site verification is required.",
        user: "Does White Jajangmyeon contain peanuts or pork? Also, until what time can I enter with the Night Art Pass?",
        bot: "White Jajangmyeon standardly includes pork and seafood. However, cross-contact with peanuts or other allergens varies by kitchen, so please verify directly with store staff before ordering. Night Art Pass admission deadlines may change based on venue circumstances, so please check the latest on-site notice."
      }
    },
    ui: {
      inputPlaceholder: "Type your inquiry (e.g., allergen, cancellation, refund)...",
      btnSend: "Send",
      toastEmpty: "Please enter your question.",
      toastException: "Exception detected: Policy review guide activated (Scenario Demo).",
      toastNormal: "AI Pre-Concierge response completed (Scenario Demo).",
      botCustomReplyException: "[Scenario Demo] Refund/cancellation keyword detected. This demo does not connect to live agents and provides procedural guidance for merchant proof review.",
      botCustomReplyNormal: "[Scenario Demo] Standard tourism guidance generated based on the multilingual knowledge base. Please verify on-site store operational policies."
    }
  },
  ja: {
    badgeLiveNotice: "シナリオベースのデモ（実在システム未接続）",
    scenarioTabs: {
      flight: "① フライト欠航時の確認手順",
      promo: "② 複合プロモーション返金手順",
      menu: "③ 店舗メニュー・アレルギー確認"
    },
    scenarios: {
      flight: {
        badge: "欠航に伴う例外手続き案内",
        isException: true,
        panelTitle: "例外規定の確認手続き案内",
        statusTitle: "例外タグ検知（証明書類の確認が必要）",
        statusSub: "AI一般回答停止・シナリオによる手続き案内を提供",
        tags: ["欠航証明確認", "事業者規定確認", "シナリオデモ（実接続なし）"],
        guide: "欠航によるツアー返金には、航空会社発行の欠航証明書の提出および事業者の取消規定確認が必要です。本画面はシナリオデモであり、実際のオペレーターや決済システムには接続されていません。",
        user: "悪天候でフライトが欠航になりました。予約したツアーの全額返金は可能ですか？",
        bot: "フライト欠航は証明書類の確認を要する例外ケースです。【デモ案内】実際の返金可否は事業者規定と証明書類の提出審査に基づきます。本デモは実在の担当者への接続を行いませんので、正規の申請手続きをご確認ください。"
      },
      promo: {
        badge: "複合プロモーション一部利用手順",
        isException: true,
        panelTitle: "複合規定の確認手続き案内",
        statusTitle: "例外タグ検知（精算規定の確認）",
        statusSub: "Klook AI QA 10大失敗パターン防止ルール作動",
        tags: ["プロモーション適用", "一部利用差額計算", "シナリオデモ（実接続なし）"],
        guide: "割引適用済みパスの一部返金は商品別規約により差額計算方法が異なります。本画面はシナリオデモであり、実在担当者への転送は行われません。",
        user: "割引コードで3名パスを購入し、1名のみ利用しました。残り2名分は返金できますか？",
        bot: "複合プロモーションおよび一部利用が検知されました。【デモ案内】返金可否および金額算定は加盟店規約に基づきます。本システムはシナリオデモであり精算担当者への転送は行いません。予約詳細の精算規定をご確認ください。"
      },
      menu: {
        badge: "ローカルメニュー・アレルギー確認",
        isException: false,
        panelTitle: "AI標準案内情報",
        statusTitle: "定型問合せ（情報案内）",
        statusSub: "商店街QRドーセント標準ガイドを即時表示",
        tags: ["基本メニュー情報", "アレルギー確認案内", "営業時間要確認"],
        guide: "一般的なメニュー原材料とパス運行基準を案内します。厨房内でのアレルギー交差接触や当日の営業時間は変動する場合があるため、現場での直接確認が必須です。",
        user: "白いチャジャン麺にピーナッツや豚肉は入っていますか？また夜間パスは何時まで入場可能ですか？",
        bot: "白いチャジャン麺の標準調理には豚肉と海鮮が使用されます。ただし、厨房環境によるピーナッツ等アレルギー物質の交差接触の有無は店舗毎に異なるため、ご注文前に店舗スタッフへ直接ご確認ください。夜間パスの入場時間は現地事情により変更される場合があるため、最新の現地告知をご確認ください。"
      }
    },
    ui: {
      inputPlaceholder: "お問い合わせ内容を入力（例：アレルギー、欠航、返金）...",
      btnSend: "送信",
      toastEmpty: "お問い合わせ内容を入力してください。",
      toastException: "例外タグ検知：規定確認ガイドパネルが表示されました（シナリオデモ）。",
      toastNormal: "AIプレコンシェルジュの標準案内が完了しました（シナリオデモ）。",
      botCustomReplyException: "【シナリオデモ】返金・欠航関連のキーワードが検知されました。本画面はデモであり実在オペレーターへの接続は行われません。証明書類の提出手順をご案内します。",
      botCustomReplyNormal: "【シナリオデモ】多言語観光ナレッジベースに基づく標準案内を表示しました。店舗の最新運営ポリシーをご確認ください。"
    }
  },
  zh: {
    badgeLiveNotice: "基于场景的交互演示（无外部系统连接）",
    scenarioTabs: {
      flight: "① 航班取消退款审核流程",
      promo: "② 复合优惠部分退款流程",
      menu: "③ 本地商户菜单与致敏原核实"
    },
    scenarios: {
      flight: {
        badge: "航班取消特殊政策指引",
        isException: true,
        panelTitle: "特殊政策审核流程指引",
        statusTitle: "检测到特殊标签（需核验证明）",
        statusSub: "暂停AI常规回复 · 提供场景审核指引",
        tags: ["需航班证明", "商户取消政策", "场景演示（未连接人工）"],
        guide: "因航班取消申请行程退款需提供航司官方证明，并遵循商户取消政策审核。本界面为基于场景的交互演示，未连接人工客服或后台退款系统。",
        user: "因恶劣天气航班取消，请问预订的行程可以申请全额退款吗？",
        bot: "航班取消属于需核验证明文件的特殊情况。【演示说明】实际退款需审核商户条款及官方凭证，本演示不连接真实客服，请根据预订渠道的凭证提交流程办理。"
      },
      promo: {
        badge: "复合优惠部分退款核算",
        isException: true,
        panelTitle: "复合政策审核流程指引",
        statusTitle: "检测到特殊标签（结算条款核对）",
        statusSub: "Klook AI QA 10大失败模式防护规则启动",
        tags: ["优惠码适用", "部分使用金额核算", "场景演示（未连接人工）"],
        guide: "使用优惠码购票的部分退款需根据非优惠单价重新核算，具体以商户条款为准。本界面为交互演示，不会转接人工结算专员。",
        user: "我使用优惠码购买了3人套票，只使用了1人。请问其余2人可以申请部分退款吗？",
        bot: "检测到复合优惠及部分使用情况。【演示说明】退款资格与差额计算视产品结算政策而定，本系统为场景演示，不会转接真实结算专员。请参阅订单详情内的结算指引办理。"
      },
      menu: {
        badge: "商户菜单与致敏原核实",
        isException: false,
        panelTitle: "AI 标准信息指引",
        statusTitle: "常规咨询（信息指引）",
        statusSub: "街区商户QR语音导览标准指南即时呈现",
        tags: ["基本菜单信息", "致敏原核实建议", "营业时间以现场为准"],
        guide: "展示常规菜品原料与通票运营时间。由于厨房烹饪环境中可能存在过敏原交叉接触，营业时间亦可能变动，点单前请务必向店内工作人员再次核实。",
        user: "请问白炸酱面里含有花生或猪肉吗？另外夜间美术馆通票最晚几点可以入场？",
        bot: "白炸酱面常规制作主要含猪肉和海鲜。但由于厨房环境可能存在花生等致敏原交叉接触风险，点餐前请务必直接向店内工作人员确认。夜间美术馆通票入场时间视现场实际运营可能有所调整，请参考现场最新公告。"
      }
    },
    ui: {
      inputPlaceholder: "请输入咨询内容（如：过敏原、航班取消、退款）...",
      btnSend: "发送",
      toastEmpty: "请输入您的咨询内容。",
      toastException: "检测到特殊标签：政策审核流程面板已激活（场景演示）。",
      toastNormal: "AI 预礼宾服务标准回复已完成（场景演示）。",
      botCustomReplyException: "【场景演示】检测到退款/取消等特殊政策关键词。本界面为演示模式，不连接真实客服，请遵循商户凭证提交流程办理。",
      botCustomReplyNormal: "【场景演示】已根据多语言旅游知识库为您生成标准指引，请以商户现场实际运营政策为准。"
    }
  }
};
