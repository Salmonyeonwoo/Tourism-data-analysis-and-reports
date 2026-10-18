// ==========================================================================
// 2026 AX Contest - Tab 4: Multilingual Concierge (tabConcierge.js)
// 4 Languages (KO, EN, JA, ZH) · Real-time Dynamic AI Tourism Concierge
// Instant Conversational Connection & Klook-style QA Guardrails
// ==========================================================================

const TabConcierge = {
  currentLang: 'ko',
  currentScenario: 'flight',
  customChatHistory: [],
  geminiApiKey: '',
  isAITyping: false,

  // Knowledge base for instant rich tourism conversation in 4 languages
  knowledgeBase: {
    ko: {
      welcome: "안녕하세요! 인천 관광 AI 컨시어지입니다. 차이나타운, 송도 센트럴파크, 개항장 거리, 영종도 복합리조트 등 인천 여행의 모든 것을 실시간으로 안내해 드립니다. 무엇이 궁금하신가요?",
      topics: {
        greeting: {
          reply: "반갑습니다! 인천의 특별한 매력을 발견하실 수 있도록 돕는 다국어 AI 프리컨시어지입니다. 맛집 추천, 관광 명소, 공항철도 교통편, 짐 보관소 등 어떤 정보가 필요하신가요?",
          chips: ["🥟 차이나타운 대표 맛집", "🏙️ 송도 센트럴파크", "🌊 인스파이어 오로라 쇼", "🚆 공항철도 & 짐 보관"]
        },
        chinatown: {
          reply: "🥢 **인천 차이나타운 & 개항장 맛집 가이드**\n• **하얀짜장**: '연경' (담백하고 자극적이지 않아 외국인 관광객 만족도 1위)\n• **원조 자장면**: '공화춘', '신승반점' (바삭한 탕수육과 계란후라이 간짜장 인기)\n• **길거리 디저트**: 화덕만두(십리향), 홍두병(통팥·망고·크림치즈), 공갈빵\n• 💡 **추천 동선**: 식사 후 바로 옆 송월동 동화마을과 개항장 근대건축거리를 함께 산책하시면 반나절 코스로 완벽합니다!",
          chips: ["🏛️ 개항장 레트로 카페", "🏙️ 송도 센트럴파크 가기", "🚆 인천역 짐 보관소", "🥟 다른 먹거리 추천"]
        },
        songdo: {
          reply: "🏙️ **송도국제도시 핵심 명소 & 야경 투어**\n• **송도 센트럴파크**: 해수로를 따라 타는 반짝이는 '문보트(Moon Boat)'와 수상택시 체험 추천!\n• **G타워 33층 전망대**: 무료 개방! 360도 통유리로 서해 갯벌과 인천대교, 미래도시 전경 조망 가능\n• **트리플스트리트 & 현대프리미엄아울렛**: 쾌적한 쇼핑과 이국적인 야외 테라스 펍\n• 💡 해 질 무렵(18:00~19:30)에 방문하시면 호수에 비친 고층빌딩의 환상적인 야경을 즐기실 수 있습니다.",
          chips: ["🥟 차이나타운 이동법", "🌊 영종도 인스파이어", "🛍️ 송도 쇼핑 안내", "🚆 송도 공항버스"]
        },
        openport: {
          reply: "🏛️ **개항장 문화지구 & 레트로 힐링 코스**\n• **근대역사 건축**: 1883년 개항 당시의 일본 제18은행 지점, 대불호텔(한국 최초 서양식 호텔) 전시관\n• **이색 등록문화재 카페**: 120년 전통 일본식 목조 가옥을 재생한 '카페 팟알(Pot R)' (수제 단팥죽과 팥빙수 명소)\n• **특별한 체험**: 개항기 근대의상 대여 후 흑백 레트로 사진관 촬영\n• 💡 차이나타운 입구에서 도보 3분 거리로 이어져 있습니다.",
          chips: ["🥟 차이나타운 맛집", "🌊 월미도 바다열차", "🏙️ 송도 야경 명소", "🚆 교통편 안내"]
        },
        yeongjong: {
          reply: "🌊 **영종도 & 복합 엔터테인먼트 리조트**\n• **인스파이어 리조트**: 길이 150m 천장 디지털 미디어 거리 '오로라(Aurora)' (매시 정각/30분 무료 초대형 미디어아트 쇼)\n• **파라다이스시티**: 예술품 가득한 아트 스파 '씨메르(CIMER)'와 실내 테마파크 원더박스\n• **을왕리 & 마시안 해변**: 황금빛 서해 일몰 감상 및 오션뷰 베이커리 카페, 조개구이 거리\n• 💡 인천공항에서 무료 셔틀버스나 택시로 약 15~20분이면 도착합니다.",
          chips: ["🚆 공항 ↔ 영종도 셔틀", "🏙️ 송도 센트럴파크", "🥟 차이나타운 가기", "⚠️ 결항 환불 규정"]
        },
        transport: {
          reply: "🚆 **인천 교통 & 짐 보관 필수 정보**\n• **공항 ↔ 송도**: 인천공항 1/2터미널에서 6770번 또는 6777번 리무진 버스 탑승 (약 30분 소요)\n• **공항 ↔ 개항장/차이나타운**: 공항철도 탑승 후 검암역/공덕역 환승 또는 인천역(1호선/수인분당선) 이용\n• **짐 보관(Luggage Storage)**: 인천공항 각 터미널 수하물 보관소 및 1호선 인천역, 공항철도 운서역 물품보관함 이용 가능\n• **인천 시티투어버스**: 개항장-월미도 레트로 노선과 송도 바다 노선이 운행 중입니다.",
          chips: ["🥟 차이나타운 맛집", "🏙️ 송도 센트럴파크", "🏛️ 개항장 거리", "⚠️ 항공 결항 시 대처"]
        },
        refund: {
          reply: "⚠️ **항공기 결항 및 환불 규정 안내 (정책 안전 가드레일)**\n항공기 결항, 폭설, 천재지변 등으로 인한 투어/패스 환불 문의가 감지되었습니다.\n1. 항공사 공식 **결항 증명서(Flight Cancellation Certificate)** 를 발급받으세요.\n2. 예약하신 구매처(OTA/예약 플랫폼) 마이페이지에서 취소 신청 및 증빙을 접수합니다.\n3. 현장 가맹점 및 약관 확인 후 수수료 면제 예외 환불 절차가 순차적으로 진행됩니다.\n*(우측 패널에 전문 검토 규정 가이드가 활성화되었습니다)*",
          chips: ["📄 증빙 서류 제출 방법", "🥟 차이나타운 둘러보기", "🚆 공항철도 안내", "🏙️ 송도 센트럴파크"]
        },
        general: {
          reply: "인천은 근대 역사의 숨결이 살아있는 개항장부터 미래도시 송도, 바다와 리조트가 어우러진 영종도까지 다채로운 매력을 가진 도시입니다! 어떤 일정이나 코스를 계획하고 계신가요? 목적지나 취향을 말씀해 주시면 맞춤 코스를 추천해 드릴게요! ✨",
          chips: ["🥟 차이나타운 대표 맛집", "🏙️ 송도 센트럴파크", "🏛️ 개항장 거리", "🚆 인천 교통편"]
        }
      }
    },
    en: {
      welcome: "Hello! Welcome to Incheon AI Concierge. I provide instant recommendations for Chinatown, Songdo Central Park, Open Port Heritage Street, Yeongjong Island resorts, and transportation. How can I assist you today?",
      topics: {
        greeting: {
          reply: "Welcome to Incheon! I am your real-time AI Pre-Concierge. Whether you need local food spots, scenic sightseeing, airport transportation, or luggage storage, feel free to ask anything! 😊",
          chips: ["🥟 Chinatown Famous Food", "🏙️ Songdo Central Park", "🌊 INSPIRE Aurora Show", "🚆 Airport Train & Luggage"]
        },
        chinatown: {
          reply: "🥢 **Incheon Chinatown & Heritage Food Guide**\n• **White Jajangmyeon**: 'Yeon-gyeong' (savory & non-spicy, highly rated by international visitors)\n• **Original Black Bean Noodles**: 'Gonghwachun' & 'Sinseungbanjeom' (crispy sweet & sour pork is a must-try!)\n• **Street Snacks**: Charcoal-baked dumplings (Sibrihyang) & Red bean sweet pastries (Hongdubyeong)\n• 💡 **Recommended Course**: After dining, take a peaceful stroll through Songwol-dong Fairy Tale Village and the Open Port Heritage district!",
          chips: ["🏛️ Open Port Retro Cafes", "🏙️ Songdo Central Park", "🚆 Luggage Storage at Incheon Station", "🥟 More Food Spots"]
        },
        songdo: {
          reply: "🏙️ **Songdo International City Highlights & Night Tour**\n• **Songdo Central Park**: Experience the illuminated Moon Boat or Water Taxi along the sea canal!\n• **G-Tower 33rd Floor**: Free entry! 360-degree glass observatory overlooking Incheon Bridge, the sea, and high-rise architecture\n• **Triple Street & Hyundai Premium Outlets**: Top shopping spots with vibrant outdoor terrace dining\n• 💡 Sunset hours (18:00 - 19:30) provide the most breathtaking skyline reflections over the park lake.",
          chips: ["🥟 Chinatown Transit", "🌊 Yeongjong INSPIRE", "🛍️ Songdo Shopping", "🚆 Airport Bus to Songdo"]
        },
        openport: {
          reply: "🏛️ **Open Port Cultural District & Retro Heritage Cafes**\n• **Historic Sites**: Modern Architecture Museum, Daebul Hotel (Korea's 1st Western-style hotel), and 19th-century Japanese bank brick buildings\n• **Heritage Cafe**: 'Cafe Pot R' located inside a 120-year-old registered wooden heritage building (famous for handmade shaved red bean ice)\n• **Unique Activity**: Rent 1900s modern retro costumes and take memorable black-and-white studio photos!\n• 💡 Just a 3-minute walk from Chinatown entrance.",
          chips: ["🥟 Chinatown Food", "🌊 Wolmido Sea Train", "🏙️ Songdo Night Views", "🚆 Transit Guide"]
        },
        yeongjong: {
          reply: "🌊 **Yeongjong Island & Entertainment Resorts**\n• **INSPIRE Entertainment Resort**: 150-meter digital ceiling media street 'Aurora' (free giant immersive media show every hour and half-hour)\n• **Paradise City**: Luxury art spa 'CIMER' and indoor retro theme park 'Wonderbox'\n• **Eulwangri & Masian Beach**: Gorgeous West Sea sunsets, oceanfront bakery cafes, and fresh grilled clams street\n• 💡 Only 15-20 minutes by taxi or free resort shuttle bus from Incheon International Airport.",
          chips: ["🚆 Airport Shuttle Bus", "🏙️ Songdo Central Park", "🥟 Chinatown Tour", "⚠️ Flight Refund Policy"]
        },
        transport: {
          reply: "🚆 **Incheon Transit & Luggage Storage Tips**\n• **Airport ↔ Songdo**: Take Limousine Bus #6770 or #6777 from Incheon Airport T1/T2 (takes ~30 mins)\n• **Airport ↔ Chinatown**: Take AREX Airport Railroad to Geomam/Gongdeok or transfer to Incheon Station (Line 1)\n• **Luggage Storage**: Available at Incheon Airport baggage services, Incheon Station coin lockers, and Unseo Station\n• **Incheon City Tour Bus**: Hop-on Hop-off bus connecting Chinatown, Wolmido, and Songdo is super convenient!",
          chips: ["🥟 Chinatown Food", "🏙️ Songdo Central Park", "🏛️ Open Port Street", "⚠️ Flight Delay Procedure"]
        },
        refund: {
          reply: "⚠️ **Flight Cancellation & Refund Policy Guide (Safety Guardrail)**\nYour inquiry involves flight delays, cancellations, or weather emergencies.\n1. Obtain an official **Flight Cancellation Certificate (결항확인서)** from your airline.\n2. Submit a refund request with the certificate on your booking platform (OTA) My Page.\n3. The special exception waiver will be reviewed according to merchant partner policies.\n*(Please refer to the Exception Policy Panel on the right!)*",
          chips: ["📄 How to submit certificate", "🥟 Chinatown Tour", "🚆 Airport Railroad Info", "🏙️ Songdo Central Park"]
        },
        general: {
          reply: "Incheon offers a wonderful mix of 19th-century open port history, futuristic skyscrapers in Songdo, and coastal resort islands! What kind of trip or vibe are you looking for? Tell me what you enjoy, and I'll tailor the best spots for you! ✨",
          chips: ["🥟 Chinatown Famous Food", "🏙️ Songdo Central Park", "🏛️ Open Port Street", "🚆 Incheon Transit"]
        }
      }
    },
    ja: {
      welcome: "こんにちは！仁川（インチョン）観光AIコンシェルジュです。中華街、松島セントラルパーク、開港場レトロ通り、永宗島リゾート、空港アクセスなど、仁川の旅をリアルタイムでご案内します。気になることは何ですか？",
      topics: {
        greeting: {
          reply: "仁川へようこそ！リアルタイム多言語AIプレコンシェルジュです。おすすめグルメ、観光名所、空港アクセス、手荷物預かりなど、何でもお気軽にご相談ください！😊",
          chips: ["🥟 中華街おすすめグルメ", "🏙️ 松島セントラルパーク", "🌊 インスパイア オーロラ", "🚆 空港アクセス・荷物預かり"]
        },
        chinatown: {
          reply: "🥢 **仁川チャイナタウン＆開港場 グルメガイド**\n• **白いジャージャー麺**: 「燕京（ヨンギョン）」（あっさりコクがあり日本人観光客に大人気！）\n• **元祖黒ジャージャー麺**: 「共和春」「新勝飯店」（目玉焼きのせ＆サクサク酢豚が絶品）\n• **食べ歩きスイーツ**: 炭火窯焼き肉まん（十里香）、紅豆餅（ホンドゥビョン）\n• 💡 **おすすめ順路**: 食後は隣接する「松月洞童話村」やレトロな「開港場通り」の散歩が定番です！",
          chips: ["🏛️ 開港場レトロカフェ", "🏙️ 松島セントラルパーク", "🚆 仁川駅コインロッカー", "🥟 他のグルメを探す"]
        },
        songdo: {
          reply: "🏙️ **松島（ソンド）国際都市＆夜景スポット**\n• **松島セントラルパーク**: 海水運河で光る「ムーンボート」や水上タクシー体験がイチオシ！\n• **Gタワー33階展望台**: 入場無料！仁川大橋と西海、未来的な高層ビル群を一望できます\n• **トリプルストリート＆現代プレミアムアウトレット**: ショッピングとテラス席カフェ＆パブが集結\n• 💡 日没時間（18:00〜19:30）に訪れると、水面に映る近代的な摩天楼の夜景が格別です。",
          chips: ["🥟 中華街へのアクセス", "🌊 永宗島リゾート", "🛍️ 松島ショッピング", "🚆 空港リムジンバス"]
        },
        openport: {
          reply: "🏛️ **開港場（ケハンジャン）近代歴史＆レトロカフェ**\n• **歴史的建築**: 近代建築展示館、旧日本第18銀行仁川支店、大仏ホテル（韓国初の西洋式ホテル）\n• **登録文化財カフェ**: 築120年の町家を再生した「ポットアル（팟알）」（手作り小豆かき氷やカステラが名物）\n• **レトロ体験**: 1900年代の開港期レトロ衣装レンタル＆モノクロ記念写真館\n• 💡 チャイナタウンのすぐ隣に位置しています。",
          chips: ["🥟 中華街グルメ", "🌊 月尾島モノレール", "🏙️ 松島夜景スポット", "🚆 交通アクセス"]
        },
        yeongjong: {
          reply: "🌊 **永宗島（ヨンジョンド）＆エンタメ複合リゾート**\n• **インスパイアリゾート**: 150mのデジタル天井「オーロラ」（毎時0分・30分の巨大メディアアートショーは無料観覧可能！）\n• **パラダイスシティ**: アート空間広がるラグジュアリースパ「シメール（CIMER）」\n• **乙旺里（ウルワンリ）海岸**: 西海の美しい夕日と、海辺の大型ベーカリーカフェ＆焼き貝通り\n• 💡 仁川空港から無料シャトルバスまたはタクシーで約15〜20分でアクセス可能です。",
          chips: ["🚆 空港無料シャトル", "🏙️ 松島セントラルパーク", "🥟 中華街めぐり", "⚠️ 欠航時の返金規定"]
        },
        transport: {
          reply: "🚆 **仁川交通アクセス＆手荷物預かり情報**\n• **空港 ↔ 松島**: 仁川空港T1/T2からリムジンバス6770番または6777番に乗車（約30分）\n• **空港 ↔ 中華街**: 空港鉄道（AREX）に乗車し、黔岩駅で乗り換え、または仁川駅（1号線）利用\n• **荷物預かり**: 仁川空港内の手荷物預かりカウンター、地下鉄仁川駅・雲西駅のコインロッカーを利用可能\n• **仁川シティツアーバス**: チャイナタウン・月尾島・松島を結ぶ周遊バスが観光に便利です！",
          chips: ["🥟 中華街グルメ", "🏙️ 松島セントラルパーク", "🏛️ 開港場通り", "⚠️ 欠航時の対応手順"]
        },
        refund: {
          reply: "⚠️ **フライト欠航・返金規定ガイド（安全ガードレール作動）**\nフライトの欠航や天候不良によるツアー・パスのキャンセルに関するお問い合わせです。\n1. 航空会社発行の公式「欠航証明書（Flight Cancellation Certificate）」を取得してください。\n2. ご予約元の購入サイト（OTA/予約プラットフォーム）のマイページより証明書を提出します。\n3. 加盟店および利用規約に基づき、手数料免除の例外返金審査が順次行われます。\n*(右側の例外規定確認パネルも併せてご確認ください)*",
          chips: ["📄 証明書の提出手順", "🥟 中華街グルメ", "🚆 空港鉄道のご案内", "🏙️ 松島セントラルパーク"]
        },
        general: {
          reply: "仁川は歴史薫る開港場から、未来都市の松島、リゾート感溢れる島々まで魅力満載の都市です！どのようなプランをご希望ですか？お好みに合わせて最適なコースをご提案します！✨",
          chips: ["🥟 中華街おすすめグルメ", "🏙️ 松島セントラルパーク", "🏛️ 開港場通り", "🚆 交通アクセス"]
        }
      }
    },
    zh: {
      welcome: "您好！欢迎使用仁川旅游AI智能礼宾助手。随时为您实时解答仁川唐人街、松岛中央公园、开港场复古街、永宗岛综合度假区及机场交通等问题。今天想了解什么呢？",
      topics: {
        greeting: {
          reply: "欢迎来到仁川！我是您的多语言AI实时礼宾助手。不论是地道美食、网红景点、机场直达交通还是行李寄存，都可以随时向我提问！😊",
          chips: ["🥟 唐人街必吃美食", "🏙️ 松岛中央公园", "🌊 迎仕柏极光天幕秀", "🚆 机场快线与行李寄存"]
        },
        chinatown: {
          reply: "🥢 **仁川唐人街 & 开港场美食精选**\n• **特色白炸酱面**: “燕京”（清爽不腻，深受外国游客好评）\n• **百年经典老字号**: “共和春”、“新胜饭店”（招牌煎蛋干炸酱面配酥脆糖醋肉必尝！）\n• **特色小吃**: 十里香烘烤烤包子、馅料满满的红豆饼、传统空心烧饼\n• 💡 **推荐路线**: 饱餐后直接步行游览旁边的松月洞童话村和开港场近代近代建筑街，半日游绝佳搭配！",
          chips: ["🏛️ 开港场复古咖啡馆", "🏙️ 前往松岛中央公园", "🚆 仁川站行李寄存", "🥟 更多特色小吃"]
        },
        songdo: {
          reply: "🏙️ **松岛国际城核心亮点与夜景指南**\n• **松岛中央公园**: 强力推荐体验海水运河上的发光“月亮船（Moon Boat）”或水上出租车！\n• **G-Tower 33层观景台**: 完全免费！360度全景观景台俯瞰黄海落日、仁川大桥与未来摩天大楼\n• **Triple Street商业街 & 现代奥特莱斯**: 超大型时尚购物街与露天花园酒吧餐厅\n• 💡 建议傍晚（18:00 - 19:30）前往，运河倒映的高楼霓虹夜景令人叹为观止。",
          chips: ["🥟 前往唐人街交通", "🌊 永宗岛迎仕柏", "🛍️ 松岛购物指南", "🚆 松岛直达机场大巴"]
        },
        openport: {
          reply: "🏛️ **开港场文化街区 & 复古慢生活咖啡馆**\n• **近代历史建筑**: 近代建筑展览馆、大佛酒店展览馆（韩国最早的西洋式酒店）、旧日本第18银行支行\n• **百年古迹咖啡馆**: 由120年历史日式木屋改造的“Pot R咖啡馆”（招牌纯手作红豆刨冰与长崎蛋糕）\n• **沉浸式体验**: 租借19世纪复古近代服饰，漫步石板路拍摄复古黑白写真！\n• 💡 紧邻唐人街入口，步行仅需3分钟即可到达。",
          chips: ["🥟 唐人街美食推荐", "🌊 月尾岛海洋列车", "🏙️ 松岛璀璨夜景", "🚆 交通路线指引"]
        },
        yeongjong: {
          reply: "🌊 **永宗岛 & 大型奢华综合度假城**\n• **迎仕柏（INSPIRE）度假城**: 长达150米的巨型数字天幕街“极光 Aurora”（每整点和半点上演巨型裸眼3D多媒体秀，免费入场！）\n• **百乐达斯城（Paradise City）**: 奢华艺术水疗SPA“汐美 CIMER”与室内复古游乐园Wonderbox\n• **乙旺里 & 马嘶鞍海滩**: 欣赏黄海绝美落日，打卡超大海景面包咖啡馆与海鲜烤贝一条街\n• 💡 从仁川国际机场乘免费穿梭巴士或出租车仅需15-20分钟即可抵达。",
          chips: ["🚆 机场免费穿梭巴士", "🏙️ 松岛中央公园", "🥟 唐人街游览", "⚠️ 航班取消退款说明"]
        },
        transport: {
          reply: "🚆 **仁川交通出行与行李寄存实用指南**\n• **机场 ↔ 松岛**: 仁川机场T1/T2乘6770路或6777路豪华机场大巴（约30分钟直达）\n• **机场 ↔ 唐人街**: 乘机场快线AREX至黔岩站换乘，或乘坐地铁1号线至仁川站\n• **行李寄存**: 仁川机场T1/T2航站楼行李寄存处，地铁1号线仁川站及云西站均设有自助行李柜\n• **仁川观光巴士**: City Tour循环巴士串联唐人街、月尾岛和松岛各大景区，方便实惠！",
          chips: ["🥟 唐人街美食推荐", "🏙️ 松岛中央公园", "🏛️ 开港场街区", "⚠️ 航班延误改签指南"]
        },
        refund: {
          reply: "⚠️ **航班取消与退款政策指引（安全防护规则已激活）**\n系统检测到您的咨询涉及航班取消、恶劣天气或退订退款事项：\n1. 请向航空公司申请并开具官方【航班取消/延误证明（Flight Certificate）】。\n2. 登录您购票的预订平台（OTA/电子票务渠道）个人中心提交退款申请并上传凭证。\n3. 平台审核团队将根据商家合作条款协助处理免手续费退改流程。\n*(请同步参考右侧专业审核流程指引面板)*",
          chips: ["📄 如何上传证明材料", "🥟 唐人街游玩攻略", "🚆 机场快线时刻表", "🏙️ 松岛中央公园"]
        },
        general: {
          reply: "仁川汇集了百年开港历史的复古情怀、松岛的未来摩天都市、以及永宗岛的浪漫海景与国际度假城！今天您打算如何安排游玩时间呢？告诉我您的喜好，我来为您规划专属路线！✨",
          chips: ["🥟 唐人街必吃美食", "🏙️ 松岛中央公园", "🏛️ 开港场街区", "🚆 仁川交通指南"]
        }
      }
    }
  },

  render: function(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    el.innerHTML = `
      <div class="bg-white rounded-2xl p-6 sm:p-8 card-shadow border border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div class="flex flex-wrap items-center gap-2.5">
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">다국어 AI 프리컨시어지</h1>
            <span class="px-3 py-1 rounded-full badge-goal text-xs font-bold" id="concierge-live-badge">실시간 다국어 대화 지원 중</span>
          </div>
          <p class="text-sm sm:text-base text-slate-600 mt-2">인천 방문 외국인을 위한 실시간 관광 안내 · 4개 언어(한국어/영어/일본어/중국어) 즉각 소통 &amp; Klook AI QA 안전 가드레일 작동</p>
        </div>
        <div class="flex items-center gap-2 self-start md:self-auto">
          <button type="button" onclick="TabConcierge.openApiModal()" class="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
            <i class="fa-solid fa-key text-teal-600"></i> <span id="api-btn-text">Gemini 연결 (선택)</span>
          </button>
          <button type="button" onclick="openVisualModal('concierge')" class="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
            <i class="fa-solid fa-expand"></i> 시안 원본
          </button>
        </div>
      </div>

      <!-- Language Switcher Bar -->
      <div class="bg-white rounded-2xl p-4 card-shadow border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-earth-asia text-teal-700 text-xl"></i>
          <div>
            <span class="text-xs font-extrabold text-slate-800 block">대화 언어 선택 (Select Language)</span>
            <span class="text-[11px] text-slate-500">원하시는 언어로 질문하시면 실시간으로 친절하게 대화가 연결됩니다</span>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-1.5 bg-slate-100 p-1.5 rounded-xl w-full sm:w-auto" id="lang-btn-group">
          <button type="button" onclick="TabConcierge.setLanguage('ko')" id="lang-btn-ko" class="px-3.5 py-2 rounded-lg text-xs font-bold bg-white text-teal-900 shadow-sm transition">한국어</button>
          <button type="button" onclick="TabConcierge.setLanguage('en')" id="lang-btn-en" class="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition">English</button>
          <button type="button" onclick="TabConcierge.setLanguage('ja')" id="lang-btn-ja" class="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition">日本語</button>
          <button type="button" onclick="TabConcierge.setLanguage('zh')" id="lang-btn-zh" class="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition">简体中文</button>
        </div>
      </div>

      <!-- Scenario Tabs for Contest Evaluation -->
      <div class="flex flex-wrap gap-2" id="scen-btn-group"></div>

      <!-- Main Chat Section & Policy Panel -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Chat Console -->
        <div class="lg:col-span-7 bg-white rounded-2xl p-6 card-shadow border border-slate-200 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="text-xs font-extrabold text-slate-800" id="chat-topic-badge">실시간 대화 모드</span>
              </div>
              <div class="flex items-center gap-2">
                <span id="chat-engine-status" class="text-[11px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 font-semibold border border-teal-200">지능형 다국어 엔진 작동 중</span>
                <button type="button" onclick="TabConcierge.resetChat()" title="대화 초기화" class="text-slate-400 hover:text-slate-700 text-xs p-1">
                  <i class="fa-solid fa-rotate-left"></i>
                </button>
              </div>
            </div>

            <!-- Chat Stream Area -->
            <div id="chat-stream" class="space-y-4 my-4 max-h-[380px] overflow-y-auto pr-1"></div>

            <!-- Quick Prompt Suggestions (Chips) -->
            <div class="pt-2 pb-1 border-t border-slate-100">
              <span class="text-[11px] font-bold text-slate-500 block mb-1.5"><i class="fa-solid fa-wand-magic-sparkles text-amber-500 mr-1"></i>빠른 질문 추천 (클릭 시 즉시 질문):</span>
              <div id="quick-chips-container" class="flex flex-wrap gap-1.5"></div>
            </div>
          </div>

          <!-- Chat Input Area -->
          <div class="pt-3 border-t border-slate-100 space-y-2">
            <div class="flex gap-2">
              <input type="text" id="custom-chat-input" class="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 shadow-inner" placeholder="" onkeydown="if(event.key==='Enter') TabConcierge.sendCustomChat();">
              <button type="button" onclick="TabConcierge.sendCustomChat()" id="chat-btn-send" class="px-5 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95">
                <i class="fa-solid fa-paper-plane"></i> <span id="chat-btn-send-text">전송</span>
              </button>
            </div>
            <div class="flex items-center justify-between text-[11px] text-slate-400">
              <span>💡 한국어, 영어, 일본어, 중국어로 편하게 질문해 보세요.</span>
              <span id="api-status-indicator">로컬 지능형 엔진</span>
            </div>
          </div>
        </div>

        <!-- Policy & Guardrail Panel (Responsive to Inquiry) -->
        <div class="lg:col-span-5 bg-white rounded-2xl p-6 card-shadow border border-slate-200 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 class="text-sm font-extrabold text-slate-800" id="policy-panel-title">예외 규정 검토 절차</h3>
              <span class="badge-practice px-2 py-0.5 rounded text-[10px] font-bold">Klook AI QA 기준</span>
            </div>
            <div id="policy-alert-box" class="my-4 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3">
              <div id="policy-icon" class="w-9 h-9 rounded-full bg-rose-500 text-white flex items-center justify-center font-extrabold text-sm flex-shrink-0 mt-0.5">!</div>
              <div>
                <h4 id="policy-status-title" class="text-sm font-extrabold text-rose-800">예외 태그 감지</h4>
                <p id="policy-status-sub" class="text-xs text-rose-700 mt-0.5">AI 일반 응답 중단 · 절차 안내 전환</p>
              </div>
            </div>
            <div id="policy-tags" class="flex flex-wrap gap-1.5 mb-4"></div>
            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed" id="policy-guide-text"></div>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
            <p><strong>가드레일 준수:</strong> 미확인 알레르기 및 환불 가능 여부는 단정하지 않고 표준 확인 절차를 안내합니다.</p>
            <p class="text-slate-400">일반 관광 문의는 AI가 즉시 답변하며, 결항/환불 등 규정 문의는 상인 약관 검토 패널로 안전하게 전환됩니다.</p>
          </div>
        </div>
      </div>

      <!-- API Key Modal (Optional Real Gemini Integration) -->
      <div id="api-modal" class="fixed inset-0 z-50 modal-backdrop hidden flex items-center justify-center p-4" onclick="TabConcierge.closeApiModal()">
        <div class="bg-white rounded-2xl max-w-md w-full card-shadow border border-slate-200 p-6" onclick="event.stopPropagation()">
          <div class="flex items-center justify-between pb-3 border-b border-slate-200">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-sparkles text-teal-600"></i>
              <h3 class="text-base font-extrabold text-slate-900">Google Gemini API 연결 (선택사항)</h3>
            </div>
            <button type="button" onclick="TabConcierge.closeApiModal()" class="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center text-xs font-bold">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="my-4 space-y-3">
            <p class="text-xs text-slate-600 leading-relaxed">
              API 키가 없어도 <strong>내장된 지능형 관광 엔진</strong>을 통해 모든 다국어 대화가 즉시 작동합니다.<br>
              실제 Google 최신 생성형 AI 모델과 100% 실시간 자유 대화를 원하시면 본인의 Gemini API 키를 입력해 주세요.
            </p>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Gemini API Key</label>
              <input type="password" id="input-gemini-key" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500" placeholder="AIzaSy...">
            </div>
            <p class="text-[11px] text-slate-400">※ 입력된 API 키는 브라우저 로컬 세션에만 임시 저장되며 외부 서버로 전송되지 않습니다.</p>
          </div>
          <div class="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <button type="button" onclick="TabConcierge.clearApiKey()" class="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition">키 제거</button>
            <button type="button" onclick="TabConcierge.saveApiKey()" class="px-4 py-1.5 rounded-xl bg-teal-700 text-white text-xs font-bold hover:bg-teal-800 transition">저장 및 활성화</button>
          </div>
        </div>
      </div>

      <!-- Visual Reference Modal -->
      <div class="bg-white rounded-2xl p-6 card-shadow border border-slate-200 mt-6">
        <div class="flex items-center justify-between mb-3">
          <div>
            <span class="badge-concept px-2.5 py-0.5 rounded text-[11px] font-bold">VISUAL REFERENCE 02</span>
            <h3 class="text-base font-extrabold text-slate-900 mt-1">다국어 AI 프리컨시어지 하이브리드 응대 시안</h3>
          </div>
          <span class="text-xs text-rose-600 font-medium">재구성 시안 — 실제 운영 화면 또는 판매 실적이 아닙니다</span>
        </div>
        <div class="rounded-xl overflow-hidden border border-slate-200">
          <img src="assets/ref2_concierge.jpg" alt="다국어 AI 프리컨시어지 시안" class="w-full h-auto cursor-pointer" onclick="openVisualModal('concierge')">
        </div>
      </div>
    `;

    // Load API Key from sessionStorage if available
    try {
      const savedKey = sessionStorage.getItem('gemini_api_key');
      if (savedKey) {
        this.geminiApiKey = savedKey;
        const ind = document.getElementById('api-status-indicator');
        if (ind) ind.textContent = 'Gemini Live AI 연동 중';
      }
    } catch(e) {}

    this.updateLanguageUI();
  },

  openApiModal: function() {
    const m = document.getElementById('api-modal');
    const input = document.getElementById('input-gemini-key');
    if (m) m.classList.remove('hidden');
    if (input) input.value = this.geminiApiKey || '';
  },

  closeApiModal: function() {
    const m = document.getElementById('api-modal');
    if (m) m.classList.add('hidden');
  },

  saveApiKey: function() {
    const input = document.getElementById('input-gemini-key');
    const val = (input ? input.value : '').trim();
    if (val) {
      this.geminiApiKey = val;
      try { sessionStorage.setItem('gemini_api_key', val); } catch(e) {}
      showToast('Gemini API 키가 적용되었습니다. 실시간 AI 모드로 전환됩니다.');
      const ind = document.getElementById('api-status-indicator');
      if (ind) ind.textContent = 'Gemini Live AI 연동 중';
    }
    this.closeApiModal();
  },

  clearApiKey: function() {
    this.geminiApiKey = '';
    try { sessionStorage.removeItem('gemini_api_key'); } catch(e) {}
    showToast('API 키가 제거되었습니다. 내장 지능형 엔진으로 전환됩니다.');
    const ind = document.getElementById('api-status-indicator');
    if (ind) ind.textContent = '로컬 지능형 엔진';
    this.closeApiModal();
  },

  setLanguage: function(lang) {
    const inputEl = document.getElementById('custom-chat-input');
    const typedText = inputEl ? inputEl.value : '';
    this.currentLang = lang;
    this.updateLanguageUI();
    if (inputEl) inputEl.value = typedText;
  },

  setScenario: function(scen) {
    this.currentScenario = scen;
    this.customChatHistory = [];
    this.updateLanguageUI();
  },

  detectLanguage: function(text) {
    if (/[가-힣]/.test(text)) return 'ko';
    if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) return 'ja';
    if (/[\u4E00-\u9FFF]/.test(text)) return 'zh';
    if (/[a-zA-Z]/.test(text)) return 'en';
    return this.currentLang;
  },

  updateLanguageUI: function() {
    const lang = this.currentLang;
    const i18n = (typeof CONCIERGE_I18N !== 'undefined' && CONCIERGE_I18N[lang]) ? CONCIERGE_I18N[lang] : CONCIERGE_I18N.ko;
    const scenData = i18n.scenarios[this.currentScenario];

    ['ko', 'en', 'ja', 'zh'].forEach(l => {
      const btn = document.getElementById('lang-btn-' + l);
      if (btn) {
        btn.className = (l === lang)
          ? 'px-3.5 py-2 rounded-lg text-xs font-bold bg-white text-teal-900 shadow-sm transition'
          : 'px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition';
      }
    });

    const liveBadge = document.getElementById('concierge-live-badge');
    if (liveBadge) liveBadge.textContent = i18n.badgeLiveNotice;

    const scenGroup = document.getElementById('scen-btn-group');
    if (scenGroup) {
      scenGroup.innerHTML = Object.keys(i18n.scenarioTabs).map(k => `
        <button type="button" onclick="TabConcierge.setScenario('${k}')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${k === this.currentScenario ? 'bg-teal-700 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}">${i18n.scenarioTabs[k]}</button>
      `).join('');
    }

    if (document.getElementById('chat-topic-badge')) {
      document.getElementById('chat-topic-badge').textContent = scenData.badge;
      document.getElementById('policy-panel-title').textContent = scenData.panelTitle;
      document.getElementById('policy-status-title').textContent = scenData.statusTitle;
      document.getElementById('policy-status-sub').textContent = scenData.statusSub;
      document.getElementById('policy-guide-text').textContent = scenData.guide;

      this.updatePolicyAlertBox(scenData.isException);

      document.getElementById('policy-tags').innerHTML = scenData.tags.map(t => `<span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-[11px] font-semibold">${t}</span>`).join('');
      document.getElementById('custom-chat-input').placeholder = i18n.ui.inputPlaceholder;
      document.getElementById('chat-btn-send-text').textContent = i18n.ui.btnSend;
    }

    this.renderQuickChips();
    this.renderChatStream();
  },

  updatePolicyAlertBox: function(isException) {
    const alertBox = document.getElementById('policy-alert-box');
    const icon = document.getElementById('policy-icon');
    const title = document.getElementById('policy-status-title');
    const sub = document.getElementById('policy-status-sub');
    if (!alertBox || !icon) return;

    if (isException) {
      alertBox.className = 'my-4 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 transition-colors';
      icon.className = 'w-9 h-9 rounded-full bg-rose-500 text-white flex items-center justify-center font-extrabold text-sm flex-shrink-0 mt-0.5';
      icon.textContent = '!';
      if (title) title.className = 'text-sm font-extrabold text-rose-800';
      if (sub) sub.className = 'text-xs text-rose-700 mt-0.5';
    } else {
      alertBox.className = 'my-4 p-4 rounded-xl bg-teal-50 border border-teal-200 flex items-start gap-3 transition-colors';
      icon.className = 'w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center font-extrabold text-sm flex-shrink-0 mt-0.5';
      icon.textContent = '✓';
      if (title) title.className = 'text-sm font-extrabold text-teal-800';
      if (sub) sub.className = 'text-xs text-teal-700 mt-0.5';
    }
  },

  renderQuickChips: function() {
    const container = document.getElementById('quick-chips-container');
    if (!container) return;

    const lang = this.currentLang;
    const chipsByLang = {
      ko: [
        { label: "🥟 차이나타운 대표 맛집", query: "차이나타운 대표 맛집과 하얀짜장 알려줘" },
        { label: "🏙️ 송도 센트럴파크 & 야경", query: "송도 센트럴파크 문보트와 야경 추천해줘" },
        { label: "🏛️ 개항장 레트로 카페", query: "개항장 거리의 가볼만한 레트로 카페 추천해줘" },
        { label: "🌊 영종도 인스파이어", query: "영종도 인스파이어 오로라 쇼 시간 알려줘" },
        { label: "🚆 공항철도 & 짐 보관", query: "인천공항에서 차이나타운 가는 법과 짐 보관소 위치 알려줘" },
        { label: "⚠️ 항공 결항 환불 규정", query: "비행기가 폭설로 결항되었는데 패스 전액 환불 되나요?" }
      ],
      en: [
        { label: "🥟 Chinatown Famous Food", query: "What are the best food spots and White Jajangmyeon in Chinatown?" },
        { label: "🏙️ Songdo Central Park", query: "Tell me about Songdo Central Park Moon Boat and night view" },
        { label: "🏛️ Open Port Retro Cafes", query: "Recommend historic cafes in the Open Port district" },
        { label: "🌊 INSPIRE Aurora Show", query: "What are the show times for the INSPIRE Resort Aurora show?" },
        { label: "🚆 Airport Train & Luggage", query: "How do I get to Chinatown from Incheon Airport and where can I store luggage?" },
        { label: "⚠️ Flight Cancellation Refund", query: "My flight was cancelled due to snow. Can I get a full refund?" }
      ],
      ja: [
        { label: "🥟 中華街おすすめグルメ", query: "仁川チャイナタウンのおすすめグルメと白いジャージャー麺を教えて" },
        { label: "🏙️ 松島セントラルパーク", query: "松島セントラルパークのムーンボートと夜景スポットを教えて" },
        { label: "🏛️ 開港場レトロカフェ", query: "開港場通りのおすすめレトロカフェを教えて" },
        { label: "🌊 インスパイア オーロラ", query: "インスパイアリゾートのオーロラショーの時間を教えて" },
        { label: "🚆 空港アクセス・荷物預かり", query: "仁川空港からチャイナタウンへの行き方とコインロッカーの場所を教えて" },
        { label: "⚠️ 欠航時の返金手続き", query: "フライトが欠航になった場合、ツアーの全額返金は可能ですか？" }
      ],
      zh: [
        { label: "🥟 唐人街美食推荐", query: "仁川唐人街有什么必吃美食和特色白炸酱面？" },
        { label: "🏙️ 松岛中央公园夜景", query: "介绍一下松岛中央公园月亮船和夜景拍照点" },
        { label: "🏛️ 开港场复古咖啡馆", query: "推荐开港场近代街区有特色的复古咖啡馆" },
        { label: "🌊 迎仕柏极光天幕秀", query: "迎仕柏度假城极光天幕秀的演出时间是什么时候？" },
        { label: "🚆 机场交通与行李寄存", query: "从仁川机场怎么去中国城？哪里可以寄存行李？" },
        { label: "⚠️ 航班取消退款政策", query: "如果遇到航班取消，预订的门票可以全额退款吗？" }
      ]
    };

    const chips = chipsByLang[lang] || chipsByLang.ko;
    container.innerHTML = chips.map(c => `
      <button type="button" onclick="TabConcierge.sendQuickChip('${c.query.replace(/'/g, "\\'")}')" class="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-800 hover:border-teal-300 border border-slate-200 text-slate-700 text-[11px] font-semibold transition active:scale-95">
        ${c.label}
      </button>
    `).join('');
  },

  sendQuickChip: function(text) {
    const input = document.getElementById('custom-chat-input');
    if (input) input.value = text;
    this.sendCustomChat();
  },

  generateLocalResponse: function(userText, lang) {
    const t = userText.toLowerCase();
    const detectedLang = this.detectLanguage(userText);
    const useLang = (detectedLang && detectedLang !== 'en') ? detectedLang : lang;
    const kb = this.knowledgeBase[useLang] || this.knowledgeBase.ko;

    const isRefund = /결항|환불|취소|폭설|지연|프로모션|refund|cancel|delay|flight|promo|返金|欠航|キャンセル|退款|取消/i.test(userText);
    const isGreeting = /안녕|반가|하이|hello|hi|hey|greet|こんにちは|はじめまして|你好|早上好|晚上好/i.test(userText);
    const isChinatown = /차이나타운|짜장|자장|중화|만두|홍두병|공화춘|연경|chinatown|jajang|noodle|中華街|ジャージャー|チャイナタウン|中国城|唐人街|炸酱面/i.test(userText);
    const isSongdo = /송도|센트럴파크|문보트|g타워|트리플|야경|songdo|central park|moon boat|g-tower|松島|ソンド|セントラルパーク|ムーンボート|松岛/i.test(userText);
    const isOpenPort = /개항장|역사|대불|팟알|적산|근대|카페|동화마을|open port|heritage|daebul|pot r|fairy tale|開港場|近代|レトロ|童話村|开港场|复古|童话村/i.test(userText);
    const isYeongjong = /영종|인스파이어|오로라|파라다이스|씨메르|을왕리|바다|조개|yeongjong|inspire|aurora|paradise|cimer|eulwangri|永宗島|インスパイア|オーロラ|パラダイス|シメール|永宗岛|迎仕柏|极光/i.test(userText);
    const isTransport = /교통|공항철도|지하철|버스|리무진|어떻게|가는법|짐|보관|락커|수하물|transport|arex|train|bus|luggage|storage|locker|交通|空港鉄道|行き方|荷物|ロッカー|寄存/i.test(userText);

    let chosenTopic = 'general';
    if (isRefund) chosenTopic = 'refund';
    else if (isGreeting) chosenTopic = 'greeting';
    else if (isChinatown) chosenTopic = 'chinatown';
    else if (isSongdo) chosenTopic = 'songdo';
    else if (isOpenPort) chosenTopic = 'openport';
    else if (isYeongjong) chosenTopic = 'yeongjong';
    else if (isTransport) chosenTopic = 'transport';

    const topicData = kb.topics[chosenTopic] || kb.topics.general;
    return {
      replyText: topicData.reply,
      chips: topicData.chips,
      isException: isRefund,
      topic: chosenTopic
    };
  },

  renderChatStream: function() {
    const stream = document.getElementById('chat-stream');
    if (!stream) return;
    const i18n = (typeof CONCIERGE_I18N !== 'undefined' && CONCIERGE_I18N[this.currentLang]) ? CONCIERGE_I18N[this.currentLang] : CONCIERGE_I18N.ko;
    const scen = i18n.scenarios[this.currentScenario];

    let html = `
      <div class="flex items-start justify-end gap-2.5">
        <div class="bg-sky-50 border border-sky-100 text-slate-900 px-4 py-3 rounded-2xl rounded-tr-sm max-w-[85%] text-xs sm:text-sm font-medium shadow-sm leading-relaxed">${scen.user}</div>
        <div class="w-8 h-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-xs flex-shrink-0"><i class="fa-solid fa-user"></i></div>
      </div>
      <div class="flex items-start gap-2.5">
        <div class="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs flex-shrink-0"><i class="fa-solid fa-robot"></i></div>
        <div class="bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[85%] text-xs sm:text-sm font-medium shadow-sm leading-relaxed whitespace-pre-line">${scen.bot}</div>
      </div>
    `;

    this.customChatHistory.forEach((item, idx) => {
      // Format markdown bold & bullet lines cleanly
      const formattedReply = item.replyText
        ? item.replyText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>')
        : (item.isException ? i18n.ui.botCustomReplyException : i18n.ui.botCustomReplyNormal);

      html += `
        <div class="flex items-start justify-end gap-2.5">
          <div class="bg-sky-50 border border-sky-100 text-slate-900 px-4 py-3 rounded-2xl rounded-tr-sm max-w-[85%] text-xs sm:text-sm font-medium shadow-sm leading-relaxed">${item.userText}</div>
          <div class="w-8 h-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-xs flex-shrink-0"><i class="fa-solid fa-user"></i></div>
        </div>
        <div class="flex items-start gap-2.5">
          <div class="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs flex-shrink-0"><i class="fa-solid fa-robot"></i></div>
          <div class="space-y-2 max-w-[85%]">
            <div class="bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-2xl rounded-tl-sm text-xs sm:text-sm font-medium shadow-sm leading-relaxed">${formattedReply}</div>
            ${item.chips && item.chips.length ? `
              <div class="flex flex-wrap gap-1.5 pt-1">
                ${item.chips.map(chip => `<button type="button" onclick="TabConcierge.sendQuickChip('${chip.replace(/'/g, "\\'")}')" class="px-2.5 py-1 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-[11px] font-semibold transition">${chip}</button>`).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    });

    if (this.isAITyping) {
      html += `
        <div class="flex items-start gap-2.5" id="ai-typing-indicator">
          <div class="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs flex-shrink-0"><i class="fa-solid fa-robot"></i></div>
          <div class="bg-slate-50 border border-slate-200 text-slate-600 px-4 py-3 rounded-2xl rounded-tl-sm text-xs font-medium shadow-sm flex items-center gap-2">
            <span class="inline-flex gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-teal-600 animate-bounce"></span>
              <span class="w-1.5 h-1.5 rounded-full bg-teal-600 animate-bounce" style="animation-delay: 0.2s"></span>
              <span class="w-1.5 h-1.5 rounded-full bg-teal-600 animate-bounce" style="animation-delay: 0.4s"></span>
            </span>
            <span class="text-[11px] text-teal-800 font-semibold">AI 컨시어지가 답변을 작성 중입니다...</span>
          </div>
        </div>
      `;
    }

    stream.innerHTML = html;
    stream.scrollTop = stream.scrollHeight;
  },

  sendCustomChat: function() {
    const input = document.getElementById('custom-chat-input');
    const val = (input ? input.value || '' : '').trim();
    const i18n = (typeof CONCIERGE_I18N !== 'undefined' && CONCIERGE_I18N[this.currentLang]) ? CONCIERGE_I18N[this.currentLang] : CONCIERGE_I18N.ko;

    if (!val) {
      showToast(i18n.ui.toastEmpty);
      return;
    }

    // Keyword exception test for guardrails & automated test compatibility
    const isException = /결항|환불|취소|폭설|지연|프로모션|refund|cancel|delay|flight|promo|返金|欠航|キャンセル|退款|取消/i.test(val);

    // Dynamic Policy Alert Box update
    this.updatePolicyAlertBox(isException);

    // If API Key is present, call Gemini API
    if (this.geminiApiKey) {
      this.isAITyping = true;
      input.value = '';
      this.renderChatStream();

      this.callGeminiAPI(val, isException);
      return;
    }

    // Instant Local Response
    const response = this.generateLocalResponse(val, this.currentLang);
    this.customChatHistory.push({
      userText: val,
      isException: isException,
      replyText: response.replyText,
      chips: response.chips
    });

    if (input) input.value = '';
    this.renderChatStream();
    showToast(isException ? i18n.ui.toastException : i18n.ui.toastNormal);
  },

  callGeminiAPI: function(userText, isException) {
    const apiKey = this.geminiApiKey;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const langName = { ko: 'Korean', en: 'English', ja: 'Japanese', zh: 'Chinese' }[this.currentLang] || 'Korean';
    const systemPrompt = `You are an expert AI Travel Concierge for Incheon, South Korea. You are helping foreign and domestic tourists visiting Chinatown, Songdo Central Park, Open Port heritage street, and Yeongjong Island resorts.
Respond politely and enthusiastically in ${langName}. If the query is about flight cancellation or refunds, mention standard procedures and advise checking merchant review policies safely without false promises. Keep answers clear, structured with bullet points, and under 150 words.`;

    const payload = {
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\nTourist question: ${userText}` }] }
      ]
    };

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
      this.isAITyping = false;
      let reply = '';
      try {
        reply = data.candidates[0].content.parts[0].text;
      } catch(e) {
        reply = 'Gemini 응답을 수신하는 중 오류가 발생하여 내장 지능형 엔진 답변으로 대체합니다.\n\n' + this.generateLocalResponse(userText, this.currentLang).replyText;
      }
      this.customChatHistory.push({
        userText: userText,
        isException: isException,
        replyText: reply,
        chips: ["🥟 차이나타운 맛집", "🏙️ 송도 센트럴파크", "🚆 교통편 안내"]
      });
      this.renderChatStream();
    })
    .catch(err => {
      this.isAITyping = false;
      const fallback = this.generateLocalResponse(userText, this.currentLang);
      this.customChatHistory.push({
        userText: userText,
        isException: isException,
        replyText: fallback.replyText,
        chips: fallback.chips
      });
      this.renderChatStream();
    });
  },

  resetChat: function() {
    this.customChatHistory = [];
    this.updateLanguageUI();
    showToast('대화 내역이 초기화되었습니다.');
  }
};
