// data.js — Sample trend cards & admin data
// Exposes window.TR_DATA for the prototype

const CARDS = [
  {
    id: "c01",
    title: "코스트코 1.2kg 망고푸딩, 왜 다들 사러 가냐면",
    category: "디저트",
    timing: "green", // 지금 타도 됨
    score: 8.4,
    velocity: "+62%",
    rank: 1,
    cover: { hue: 38, sat: 92, lum: 68, label: "MANGO\nPUDDING", src: "assets/shorts/mango-pudding.png", position: "center" },
    what: "코스트코에서 파는 1.2kg짜리 떠먹는 망고푸딩. 큰 통에 숟가락 꽂아서 떠먹는 비주얼이 핵심.",
    why: "1) 큰 사이즈가 ASMR/먹방 포맷에 잘 맞음 2) '코스트코 신상' 키워드가 인스타에서 일 8.7K 게시물로 급상승 3) 가격 대비 양 콘텐츠로 재해석 가능",
    angle: "통째로 한 입 vs 정량 컵 분배 비교. 4인 가족 5일치 분량으로 푸딩 활용 레시피 시리즈도 가능.",
    hook: "이거 한 통이 다섯 명이서 못 다 먹어요",
    platform: [
      { p: "릴스", tip: "0~3초 통 크기 강조 풀샷, 5초부터 떠먹는 ASMR" },
      { p: "쇼츠", tip: "코스트코 영수증 → 푸딩 컷 → 한 숟갈, 9:16 세로컷 좋음" },
      { p: "틱톡", tip: "'한 통 다 먹기 챌린지' 포맷" },
    ],
    caution: "코스트코 매장 내 촬영은 정책상 금지. 차에서 개봉컷부터 시작 권장.",
    sources: [
      { type: "naver", label: "네이버 검색 +62% (1주)", url: "#" },
      { type: "x", label: "@food_seoul · 2.1만 좋아요", url: "#" },
      { type: "insta", label: "#코스트코신상 · 8.7K 게시물", url: "#" },
    ],
    publishedAt: "오늘 09:42",
  },
  {
    id: "c02",
    title: "버터 범벅인데 왜 이렇게 맛있냐는 반응",
    category: "디저트",
    timing: "yellow",
    score: 6.9,
    velocity: "+24%",
    rank: 2,
    cover: { hue: 48, sat: 78, lum: 78, label: "BUTTER\nTTEOK" },
    what: "버터 한 조각을 인절미·찹쌀떡 사이에 끼워 굽거나 데워 먹는 변형 떡. 짭짤+고소+쫀득 조합.",
    why: "유튜브 '하루한끼' 채널 영상 이후 검색량 점진 상승. 단, 상승세가 1주 단위로 꺾이는 중 — 빠르게 타야 함.",
    angle: "한 입 베어 무는 클로즈업, 버터 녹는 단면 부각. 짠/단 페어링 시리즈의 첫 화로도 좋음.",
    hook: "떡인데 짭짤해서 한 박스 다 먹었어요",
    platform: [
      { p: "릴스", tip: "버터 자르는 컷 → 떡 가르는 컷 → 단면, 3컷 리듬" },
      { p: "쇼츠", tip: "전자레인지 30초 vs 팬에 굽기 비교 포맷" },
    ],
    caution: "특정 브랜드 떡 협찬 트윗이 다수 — 광고로 오해되지 않게 자기 멘트 추가.",
    sources: [
      { type: "naver", label: "네이버 +24%", url: "#" },
      { type: "x", label: "@dessert_log · 8.3K", url: "#" },
    ],
    publishedAt: "오늘 09:38",
  },
  {
    id: "c03",
    title: "편의점 젤리 하나가 요즘 진짜 장난 아님",
    category: "디저트",
    timing: "green",
    score: 8.1,
    velocity: "+89%",
    rank: 3,
    cover: { hue: 200, sat: 72, lum: 70, label: "FROZEN\nJELLY", src: "assets/shorts/frozen-jelly.png", position: "center" },
    what: "젤리를 얼려서 먹는 신규 식감 트렌드. 편의점 트레비·왕꿈틀이 등 기존 제품을 -18°C에서 4시간 이상.",
    why: "초여름 진입과 동시에 X 음식 큐레이터 12개 계정에서 동시 언급. 인스타 #얼먹젤리 게시물 24시간 내 +340%.",
    angle: "얼리기 전후 비교 컷, 깨물 때 '바삭' 효과음. 편의점별 추천 젤리 5종 랭킹.",
    hook: "젤리를 4시간 얼리면 식감이 바뀌어요",
    platform: [
      { p: "릴스", tip: "얼린 젤리 깨무는 소리 강조, 마이크 가까이" },
      { p: "쇼츠", tip: "GS25/CU/세븐 3사 비교 컷" },
      { p: "틱톡", tip: "#frozenjelly 영문 태그 같이 — 해외 수요" },
    ],
    caution: "치아 시린 사람 주의 멘트 1줄 필수.",
    sources: [
      { type: "naver", label: "네이버 +89%", url: "#" },
      { type: "x", label: "@snack_kr · 1.4만", url: "#" },
      { type: "insta", label: "#얼먹젤리 +340%", url: "#" },
    ],
    publishedAt: "오늘 09:35",
  },
  {
    id: "c04",
    title: "두쫀쿠가 왜 지금 한물가는 중인지",
    category: "디저트",
    timing: "red",
    score: 4.2,
    velocity: "-12%",
    rank: 8,
    cover: { hue: 18, sat: 65, lum: 60, label: "DUJJON\nKKU" },
    what: "두꺼운 + 쫀득한 쿠키 (두쫀쿠). 베이커리 카페 신메뉴 코너에 동시 등장한 NY스타일 쿠키 변형.",
    why: "이미 3주 전 정점. 현재 X 언급량 -12%, 베이커리 카페 신메뉴에서 빠지는 중. 굳이 지금 찍기엔 노출 약함.",
    angle: "타고 싶다면 '두쫀쿠 끝물 솔직 리뷰' 같은 반대 포지션. 일반 포맷은 비추.",
    hook: "솔직히 두쫀쿠는 이제 좀… (라고 말하면 안 되는 이유)",
    platform: [
      { p: "릴스", tip: "추천하지 않음. 굳이라면 회고/리뷰 포맷" },
    ],
    caution: "끝물 표시 있음. 사용자에게 정직하게.",
    sources: [
      { type: "naver", label: "네이버 -12%", url: "#" },
      { type: "x", label: "최근 2주 언급 감소", url: "#" },
    ],
    publishedAt: "오늘 09:32",
  },
  {
    id: "c05",
    title: "초코바게트, 요즘 빵집마다 같이 떠오르는 이유",
    category: "디저트",
    timing: "yellow",
    score: 7.2,
    velocity: "+31%",
    rank: 4,
    cover: { hue: 22, sat: 45, lum: 38, label: "CHOCO\nBAGUETTE", src: "assets/shorts/choco-baguette.png", position: "center" },
    what: "바게트 안에 다크 초콜릿 통째로 박혀 있는 프랑스풍 베이커리 신상. 파리바게뜨·뚜레쥬르 동시 출시.",
    why: "프랜차이즈 두 곳 동시 출시 → 자연스러운 비교 콘텐츠 수요. 단 신상 카테고리 자체가 1주 수명.",
    angle: "두 브랜드 블라인드 비교 (가격/중량/초콜릿 양/식감). 점수표 인서트.",
    hook: "파바 vs 뚜쥬, 어디 초코바게트가 진짜",
    platform: [
      { p: "릴스", tip: "쪼개는 단면 컷 필수. 초콜릿 노출량 비교" },
      { p: "쇼츠", tip: "9:16, 두 제품 좌우 분할 화면" },
    ],
    caution: "양사 PR팀에서 콘텐츠 모니터링 중. 객관적 톤 유지.",
    sources: [
      { type: "naver", label: "네이버 +31%", url: "#" },
      { type: "x", label: "@bakery_pick · 6.2K", url: "#" },
    ],
    publishedAt: "오늘 09:28",
  },
  {
    id: "c06",
    title: "미국 레스토랑 메뉴가 한국 SNS를 장악한 방법",
    category: "식당",
    timing: "green",
    score: 8.7,
    velocity: "+74%",
    rank: 5,
    cover: { hue: 12, sat: 78, lum: 52, label: "CHILI'S\nSTICKS", src: "assets/shorts/chilis-cheese-sticks.png", position: "center" },
    what: "칠리스 시즈널 메뉴 치즈스틱. 5월 한정 출시, 평소 안 파는 메뉴라 희소성 콘텐츠 가능.",
    why: "한정 메뉴 + 미국 외식 브랜드 한국 재진입 화제성 결합. 인스타 #칠리스 게시물 1주 +218%.",
    angle: "메뉴 비주얼 풀샷 → 가르는 컷 → 치즈 늘어남. 1인 vs 2인 양 비교.",
    hook: "칠리스 5월만 파는 메뉴인데 사람들 모름",
    platform: [
      { p: "릴스", tip: "치즈 늘어나는 슬로우모션 필수. 9:16 세로컷" },
      { p: "쇼츠", tip: "매장 들어가는 첫 컷 → 메뉴판 클로즈업 → 음식" },
    ],
    caution: "특정 지점만 운영하는 시즈널일 수 있음. 지점 정보 자막으로.",
    sources: [
      { type: "naver", label: "네이버 +74%", url: "#" },
      { type: "x", label: "@chains_kr · 9.1K", url: "#" },
      { type: "insta", label: "#칠리스 +218%", url: "#" },
    ],
    publishedAt: "오늘 09:25",
  },
  {
    id: "c07",
    title: "편의점 구석에서 조용히 품절 행진 중인 그것",
    category: "편의점",
    timing: "yellow",
    score: 6.4,
    velocity: "+18%",
    rank: 6,
    cover: { hue: 50, sat: 88, lum: 60, label: "MOIST\nCHEESE" },
    what: "GS25 한정 출시 황치즈맛 감자칩의 변형. 일반 감자칩과 달리 식감이 촉촉/말랑하게 조정된 신제품.",
    why: "감자칩에서 '바삭' 대신 '촉촉'을 만든다는 점이 화제. 다만 호불호 콘텐츠라 양극 반응.",
    angle: "기존 황치즈칩 vs 신제품 비교. 식감 묘사가 핵심.",
    hook: "감자칩인데 촉촉하다는 게 말이 됩니까",
    platform: [
      { p: "릴스", tip: "씹는 소리 ASMR, 일반 vs 신제품 좌우 분할" },
    ],
    caution: "GS25 한정 — 다른 편의점 검색 유입 실망 방지 자막.",
    sources: [
      { type: "naver", label: "네이버 +18%", url: "#" },
      { type: "x", label: "@cvs_news · 4.4K", url: "#" },
    ],
    publishedAt: "오늘 09:22",
  },
  {
    id: "c08",
    title: "다이소 동결건조 디저트, 이렇게 뜰 줄 몰랐음",
    category: "디저트",
    timing: "green",
    score: 7.8,
    velocity: "+45%",
    rank: 7,
    cover: { hue: 320, sat: 35, lum: 78, label: "FREEZE\nDRIED" },
    what: "딸기/요거트/케이크를 동결건조한 가벼운 식감 디저트. 다이소·올영에서 동시 진열 시작.",
    why: "다이소 신상 + 다이어트 키워드 결합. 4월 말부터 X·인스타에서 안정적 상승세.",
    angle: "원본 vs 동결건조 식감/맛 비교. 무게 비교 (10g 봉지에 딸기 한 팩).",
    hook: "딸기 한 팩이 봉지에 다 들어가요 (10g)",
    platform: [
      { p: "릴스", tip: "원본 딸기와 동결건조 좌우 비교, 가벼움 강조 컷" },
      { p: "쇼츠", tip: "가격표 클로즈업 → 시식 → 짧은 멘트" },
    ],
    caution: "수분 적어 목멤 — 음료와 함께 멘트.",
    sources: [
      { type: "naver", label: "네이버 +45%", url: "#" },
      { type: "x", label: "@daiso_pick · 5.8K", url: "#" },
    ],
    publishedAt: "오늘 09:18",
  },
  // ─── Cards in newly-defined categories (for identity demo) ───
  {
    id: "c09",
    title: "성수동 또 줄 섰나요, 이번엔 무지개 컨셉",
    category: "플레이스",
    timing: "green",
    score: 8.0,
    velocity: "+92%",
    rank: 9,
    cover: { hue: 320, sat: 80, lum: 65, label: "POPUP\nSEONGSU", src: "assets/shorts/rainbow-popup.png", position: "center 68%" },
    what: "성수동에 일주일만 열리는 무지개 컬러 팝업스토어. 인증샷 명소로 빠르게 확산.",
    why: "한정 운영 + 비주얼 강함 + 위치 접근성 → 인스타 인증 콘텐츠 폭증.",
    angle: "외관 진입 컷 → 컬러별 포토존 → 굿즈 클로즈업. 줄 서기 팁 자막.",
    hook: "성수동 이번 주에만 열어요",
    platform: [
      { p: "릴스", tip: "외관 → 내부 컬러존 → 굿즈 3단 구성" },
      { p: "쇼츠", tip: "줄 길이 → 입장 → 첫 포토존" },
    ],
    caution: "주말 줄 1시간+. 평일 오전 추천 자막.",
    sources: [
      { type: "insta", label: "#성수동팝업 24h +540%", url: "#" },
    ],
    publishedAt: "오늘 09:50",
  },
  {
    id: "c10",
    title: "올 가을은 버건디 네일이 답이라는 분위기",
    category: "패션·뷰티",
    timing: "green",
    score: 7.6,
    velocity: "+48%",
    rank: 10,
    cover: { hue: 350, sat: 60, lum: 35, label: "BURGUNDY\nNAIL" },
    what: "초가을 진입과 함께 다시 뜨는 딥 버건디 컬러 네일아트.",
    why: "K-아이돌 공항패션 + 뷰티 인플루언서 다수 동시 게시.",
    angle: "광택 vs 매트 비교, 손톱 모양별 추천 컷.",
    hook: "가을엔 무조건 이 컬러래요",
    platform: [
      { p: "릴스", tip: "셀프네일 과정 + 완성 비교" },
      { p: "쇼츠", tip: "톤별 5가지 비교 빠른 컷" },
    ],
    caution: "특정 브랜드 협찬 표기 명확히.",
    sources: [
      { type: "insta", label: "#버건디네일 +220%", url: "#" },
    ],
    publishedAt: "오늘 09:48",
  },
  {
    id: "c11",
    title: "아침마다 뛰는 사람들, 출퇴근 러닝 크루가 뜨는 이유",
    category: "라이프스타일",
    timing: "green",
    score: 7.2,
    velocity: "+38%",
    rank: 11,
    cover: { hue: 130, sat: 55, lum: 50, label: "RUN\nCREW" },
    what: "아침/저녁 출퇴근 시간에 30분 가볍게 뛰는 러닝 크루 인증 콘텐츠 트렌드.",
    why: "건강 + 일상 콘텐츠 결합. 무리 없는 강도라 진입 장벽 낮음.",
    angle: "코스 추천 + 복장 + 페이스 자막. 30분 BGM 동기화.",
    hook: "출근 전 30분이 하루를 바꿔요",
    platform: [
      { p: "릴스", tip: "GPS 트래킹 화면 + 풍경 컷 교차" },
      { p: "쇼츠", tip: "타임랩스 + 마지막 한 줄 멘트" },
    ],
    caution: "초보 안전 멘트 1줄 권장.",
    sources: [
      { type: "insta", label: "#모닝러닝 +180%", url: "#" },
    ],
    publishedAt: "오늘 09:45",
  },
  {
    id: "c12",
    title: "갸자갸자 챌린지, 틱톡에서 24시간 만에 터짐",
    category: "밈·챌린지",
    timing: "green",
    score: 8.8,
    velocity: "+210%",
    rank: 12,
    cover: { hue: 280, sat: 90, lum: 60, label: "GYAZA\nCHALLENGE" },
    what: "특정 노래 후렴구에 맞춰 둘이 마주보고 손동작 맞추는 틱톡 챌린지.",
    why: "10대 사이에서 폭발적 확산. 영상 길이 짧고 진입 장벽 0.",
    angle: "1차 시연 → 실패 → 성공 컷. 친구/가족과 함께 포맷.",
    hook: "두 명만 있으면 5초 만에 가능",
    platform: [
      { p: "틱톡", tip: "원곡 사용 필수. #갸자갸자 태그" },
      { p: "쇼츠", tip: "9:16, 30초 안에 시도→완성" },
    ],
    caution: "원곡 저작권 — 틱톡 내장 음원으로만.",
    sources: [
      { type: "x",     label: "@meme_kr 8.2만", url: "#" },
      { type: "insta", label: "#갸자갸자 24h +890%", url: "#" },
    ],
    publishedAt: "오늘 09:42",
  },
  {
    id: "c13",
    title: "OOO 인터뷰 짤, 지금 모든 계정이 쓰는 중",
    category: "인물·콘텐츠",
    timing: "yellow",
    score: 7.0,
    velocity: "+28%",
    rank: 13,
    cover: { hue: 220, sat: 30, lum: 25, label: "MEME\nINTERVIEW" },
    what: "최근 화제 인터뷰 영상에서 특정 표정·멘트가 짤로 잘려 재가공되는 트렌드.",
    why: "원본 1회성이지만 패러디 가지 수가 많아 콘텐츠 수명 연장.",
    angle: "원본 인용 + 자기 상황 패러디 자막 결합.",
    hook: "이 표정 한 번만 보면 못 잊어요",
    platform: [
      { p: "릴스", tip: "원본 1초 + 자기 상황 4초" },
    ],
    caution: "초상권·맥락 왜곡 주의.",
    sources: [
      { type: "x", label: "@viral_kr 6.4만", url: "#" },
    ],
    publishedAt: "오늘 09:40",
  },
  {
    id: "c14",
    title: "노 메이크업이 트렌드에서 밀려나는 중",
    category: "패션·뷰티",
    timing: "red",
    score: 4.5,
    velocity: "-18%",
    rank: 14,
    cover: { hue: 30, sat: 25, lum: 75, label: "NO\nMAKEUP" },
    what: "민낯 셀카 자연스럽게 올리는 트렌드. 한때 폭발했으나 현재 하향.",
    why: "이미 포화 + 후속 콘텐츠 차별화 어려움.",
    angle: "굳이 한다면 '루틴 공개' 같은 부가 정보 결합.",
    hook: "그냥 셀카는 이제 별로래요",
    platform: [
      { p: "릴스", tip: "추천 안 함. 회고/리뷰 포맷만." },
    ],
    caution: "포화 시장 — 차별화 약하면 노출 거의 없음.",
    sources: [
      { type: "insta", label: "#노메이크업 -18%", url: "#" },
    ],
    publishedAt: "오늘 09:38",
  },
];

// Realtime trend ranking (similar to 실시간 검색어)
const REALTIME = [
  { rank: 1, kw: "얼먹젤리", delta: "▲ 4", deltaType: "up" },
  { rank: 2, kw: "코스트코 망고푸딩", delta: "NEW", deltaType: "new" },
  { rank: 3, kw: "칠리스 치즈스틱", delta: "▲ 2", deltaType: "up" },
  { rank: 4, kw: "버터떡", delta: "▼ 1", deltaType: "down" },
  { rank: 5, kw: "초코바게트", delta: "—", deltaType: "same" },
  { rank: 6, kw: "동결건조", delta: "▲ 3", deltaType: "up" },
  { rank: 7, kw: "촉촉한 황치즈칩", delta: "▼ 2", deltaType: "down" },
  { rank: 8, kw: "두쫀쿠", delta: "▼ 5", deltaType: "down" },
  { rank: 9, kw: "녹차 크림 마들렌", delta: "NEW", deltaType: "new" },
  { rank: 10, kw: "콜드브루 젤리", delta: "▲ 1", deltaType: "up" },
];

// ─── Stage labels (re-production maturity) ───────────────────
// 데이터랩 검색량 추이 + SNS 재생산 활동량 조합으로 4단계 분류.
// 정체성("SNS에서 재생산되는 트렌드") 핵심 차별 라벨.
const STAGES = {
  early: {
    key: "early",
    label: "포착",
    short: "포착",
    desc: "아직 넓게 퍼지기 전이지만 SNS와 커뮤니티에서 신호가 잡히는 단계예요.",
    color: "var(--tr-blue)",
    bg: "rgba(49,130,246,0.12)",
  },
  mainstream: {
    key: "mainstream",
    label: "상승중",
    short: "상승중",
    desc: "검색과 SNS 반응이 같이 오르며 확산 속도가 붙는 단계예요.",
    color: "var(--tr-green)",
    bg: "rgba(0,200,83,0.12)",
  },
  peak: {
    key: "peak",
    label: "핫이슈",
    short: "핫이슈",
    desc: "이미 여러 채널에서 많이 보이는 상태예요. 차별화된 관점이 필요해요.",
    color: "var(--tr-yellow)",
    bg: "rgba(255,179,0,0.14)",
  },
  declining: {
    key: "declining",
    label: "하락세",
    short: "하락세",
    desc: "검색과 SNS 반응이 빠지는 단계예요. 회고형이나 정리형으로 보는 편이 좋아요.",
    color: "var(--tr-red)",
    bg: "rgba(255,59,48,0.12)",
  },
};

// 기존 timing(red/yellow/green) → stage 매핑 (호환용)
function stageFromTiming(timing, velocity) {
  const v = parseInt(String(velocity).replace(/[^0-9-]/g, ""), 10);
  if (Number.isFinite(v) && v < 0) return "declining";
  if (timing === "red") return "peak";
  if (Number.isFinite(v) && v >= 90) return "peak";
  if (timing === "yellow" || (Number.isFinite(v) && v >= 45)) return "mainstream";
  return "early";
}

// ─── Categories (재정비 — 마케터 업종 필터링 친화) ─────────
const CATEGORIES = ["전체", "푸드", "플레이스", "패션·뷰티", "라이프스타일", "밈·챌린지", "인물·콘텐츠"];

// 기존 세부 카테고리(디저트/식당/편의점/음료/...) → 6개 대분류 매핑
const CATEGORY_MAP = {
  "디저트": "푸드",
  "식당": "푸드",
  "편의점": "푸드",
  "음료": "푸드",
  "음식": "푸드",
  "카페": "푸드",
};
function mapCategory(c) { return CATEGORY_MAP[c] || c; }

// ─── Candidates (Quick Add 직후, 자동 보강 진행 중인 트렌드) ──
const CANDIDATES = [
  {
    id: "k001",
    title: "녹차 크림 마들렌",
    category: "푸드",
    discoverySource: { handle:"@bakery_pick", platform:"instagram", postUrl:"#" },
    enrichmentStatus: { datalab:"done", naver:"done", youtube:"in_progress" },
    stagePreview: "mainstream",
    registeredAt: "2시간 전",
    note: "스타벅스 신상 + 개인 베이커리 다수 동시 출시",
  },
  {
    id: "k002",
    title: "콜드브루 젤리",
    category: "푸드",
    discoverySource: { handle:"@cafe_2025", platform:"instagram", postUrl:"#" },
    enrichmentStatus: { datalab:"done", naver:"in_progress", youtube:"pending" },
    stagePreview: "early",
    registeredAt: "5시간 전",
    note: "메가커피 시즈널",
  },
  {
    id: "k003",
    title: "스타벅스 우베라떼",
    category: "푸드",
    discoverySource: { handle:"@food_seoul", platform:"instagram", postUrl:"#" },
    enrichmentStatus: { datalab:"done", naver:"done", youtube:"done" },
    stagePreview: "early",
    registeredAt: "1시간 전",
    note: "5/20 출시 예정. 사전 노출 강함",
  },
  {
    id: "k004",
    title: "Y2K 데님 자켓",
    category: "패션·뷰티",
    discoverySource: { handle:"@daily_outfit", platform:"tiktok", postUrl:"#" },
    enrichmentStatus: { datalab:"in_progress", naver:"pending", youtube:"pending" },
    stagePreview: "mainstream",
    registeredAt: "1시간 전",
    note: "K-아이돌 공항패션 영향",
  },
  {
    id: "k005",
    title: "9분 챌린지",
    category: "밈·챌린지",
    discoverySource: { handle:"@meme_kr", platform:"tiktok", postUrl:"#" },
    enrichmentStatus: { datalab:"done", naver:"done", youtube:"in_progress" },
    stagePreview: "early",
    registeredAt: "3시간 전",
    note: "음원 인기 → 챌린지 파생",
  },
  {
    id: "k006",
    title: "한남동 도넛 팝업",
    category: "플레이스",
    discoverySource: { handle:"@seoul_popup", platform:"instagram", postUrl:"#" },
    enrichmentStatus: { datalab:"done", naver:"done", youtube:"done" },
    stagePreview: "mainstream",
    registeredAt: "6시간 전",
    note: "주말 줄 1.5시간",
  },
];

const ACCOUNTS = [
  { handle: "@food_seoul", trust: 5, freq: "4h", lastCheck: "12분 전", category: "디저트/카페", enabled: true },
  { handle: "@dessert_log", trust: 4, freq: "4h", lastCheck: "28분 전", category: "디저트", enabled: true },
  { handle: "@snack_kr", trust: 5, freq: "4h", lastCheck: "5분 전", category: "스낵/편의점", enabled: true },
  { handle: "@bakery_pick", trust: 4, freq: "4h", lastCheck: "1시간 전", category: "베이커리", enabled: true },
  { handle: "@cvs_news", trust: 4, freq: "12h", lastCheck: "3시간 전", category: "편의점", enabled: true },
  { handle: "@chains_kr", trust: 3, freq: "12h", lastCheck: "4시간 전", category: "프랜차이즈", enabled: true },
  { handle: "@daiso_pick", trust: 3, freq: "12h", lastCheck: "6시간 전", category: "다이소/소품샵", enabled: true },
  { handle: "@cafe_2025", trust: 3, freq: "12h", lastCheck: "8시간 전", category: "카페", enabled: false },
  { handle: "@menu_radar", trust: 2, freq: "12h", lastCheck: "—", category: "외식", enabled: false },
];

// ─── Influencers (인플루언서 보드용 확장) ───────────────────
const INFLUENCERS = [
  // 푸드
  { handle:"@food_seoul",    category:"푸드",         platform:"instagram", trust:5, followers:"312K", lastChecked:"12분 전",  contributedThisWeek:6, contributedAllTime:138, enabled:true,  note:"" },
  { handle:"@dessert_log",   category:"푸드",         platform:"instagram", trust:4, followers:"189K", lastChecked:"28분 전",  contributedThisWeek:4, contributedAllTime:97,  enabled:true,  note:"" },
  { handle:"@snack_kr",      category:"푸드",         platform:"instagram", trust:5, followers:"244K", lastChecked:"5분 전",   contributedThisWeek:3, contributedAllTime:121, enabled:true,  note:"" },
  { handle:"@bakery_pick",   category:"푸드",         platform:"instagram", trust:4, followers:"98K",  lastChecked:"1시간 전", contributedThisWeek:2, contributedAllTime:68,  enabled:true,  note:"" },
  { handle:"@cvs_news",      category:"푸드",         platform:"instagram", trust:4, followers:"152K", lastChecked:"3시간 전", contributedThisWeek:2, contributedAllTime:84,  enabled:true,  note:"" },
  // 플레이스
  { handle:"@seoul_popup",   category:"플레이스",     platform:"instagram", trust:4, followers:"176K", lastChecked:"40분 전",  contributedThisWeek:3, contributedAllTime:55,  enabled:true,  note:"" },
  { handle:"@cafe_2025",     category:"플레이스",     platform:"instagram", trust:3, followers:"81K",  lastChecked:"8시간 전", contributedThisWeek:1, contributedAllTime:23,  enabled:true,  note:"" },
  // 패션·뷰티
  { handle:"@nail_diary",    category:"패션·뷰티",    platform:"instagram", trust:4, followers:"203K", lastChecked:"1시간 전", contributedThisWeek:3, contributedAllTime:71,  enabled:true,  note:"" },
  { handle:"@daily_outfit",  category:"패션·뷰티",    platform:"tiktok",    trust:4, followers:"410K", lastChecked:"2시간 전", contributedThisWeek:2, contributedAllTime:62,  enabled:true,  note:"" },
  // 라이프스타일
  { handle:"@runcrew_kr",    category:"라이프스타일", platform:"instagram", trust:3, followers:"56K",  lastChecked:"4시간 전", contributedThisWeek:1, contributedAllTime:18,  enabled:true,  note:"" },
  { handle:"@daily_routine", category:"라이프스타일", platform:"instagram", trust:3, followers:"73K",  lastChecked:"6시간 전", contributedThisWeek:1, contributedAllTime:22,  enabled:false, note:"비활성 의심" },
  // 밈·챌린지
  { handle:"@meme_kr",       category:"밈·챌린지",   platform:"tiktok",    trust:5, followers:"880K", lastChecked:"15분 전",  contributedThisWeek:5, contributedAllTime:142, enabled:true,  note:"" },
  { handle:"@viral_kr",      category:"밈·챌린지",   platform:"instagram", trust:4, followers:"244K", lastChecked:"50분 전",  contributedThisWeek:3, contributedAllTime:88,  enabled:true,  note:"" },
  // 인물·콘텐츠
  { handle:"@idol_radar",    category:"인물·콘텐츠", platform:"instagram", trust:3, followers:"112K", lastChecked:"3시간 전", contributedThisWeek:2, contributedAllTime:45,  enabled:true,  note:"" },
  { handle:"@drama_today",   category:"인물·콘텐츠", platform:"instagram", trust:3, followers:"95K",  lastChecked:"5시간 전", contributedThisWeek:1, contributedAllTime:34,  enabled:true,  note:"" },
];

const BLOCKLIST = [
  "광고", "협찬", "이벤트", "쿠폰", "신규가입", "1+1",
];

const STATS = {
  todayInfluencerChecked:  3,
  todayInfluencerTarget:   10,
  todayDiscovered:         5,
  todayDiscoveryTarget:    15,
  pendingReview:           8,
  enrichmentInProgress:    12,
  todayPublished:          4,
  stageDistribution: { early: 32, mainstream: 48, peak: 12, declining: 8 },
  signalsToday: { instagram: 7, tiktok: 3 },
  weekTopInfluencers: [
    { handle:"@food_seoul", contributedThisWeek:6 },
    { handle:"@meme_kr",    contributedThisWeek:5 },
    { handle:"@dessert_log",contributedThisWeek:4 },
  ],
  apiUsage: {
    datalab: { used:  230, limit:  1000 },
    naver:   { used: 1240, limit: 25000 },
    youtube: { used: 1200, limit: 10000 },
  },
  weekly: [4, 6, 5, 8, 7, 9, 8],
  // 레거시 호환
  todayDraft:     3,
  candidates:     6,
  collectedX:     142,
  collectedNaver: 24,
};

const DEFAULT_TREND_POINTS = [
  { date: "5/05", value: 18 },
  { date: "5/06", value: 22 },
  { date: "5/07", value: 26 },
  { date: "5/08", value: 25 },
  { date: "5/09", value: 31 },
  { date: "5/10", value: 36 },
  { date: "5/11", value: 42 },
  { date: "5/12", value: 48 },
  { date: "5/13", value: 52 },
  { date: "5/14", value: 61 },
  { date: "5/15", value: 69 },
  { date: "5/16", value: 78 },
  { date: "5/17", value: 88 },
  { date: "5/18", value: 100 },
];

const TREND_ENRICHMENT = {
  c01: {
    naverTrend: {
      period: "14d",
      updatedAt: "오늘 09:30",
      points: DEFAULT_TREND_POINTS,
      changeRate: "+62%",
      dailyChange: "+18%",
      peakStatus: "rising",
      audienceBreakdown: {
        gender: [
          { label: "여성", value: 68 },
          { label: "남성", value: 32 },
        ],
        age: [
          { label: "10대", value: 18 },
          { label: "20대", value: 41 },
          { label: "30대", value: 27 },
          { label: "40대+", value: 14 },
        ],
      },
      audience: "20대 여성",
      audienceDetail: [
        { label: "여성", value: "68%" },
        { label: "20대", value: "41%" },
        { label: "모바일", value: "82%" },
      ],
      reason: "신상 대용량 디저트와 코스트코 키워드가 같이 묶이면서 저장/공유형 콘텐츠 수요가 빠르게 붙는 중.",
    },
    creatorKit: {
      hooks: ["이 한 통이 진짜 1.2kg입니다", "코스트코에서 지금 제일 위험한 디저트", "다섯 명이 먹어도 남는 망고푸딩"],
      titles: ["코스트코 망고푸딩, 진짜 살만한가", "1.2kg 망고푸딩 먹방각 체크", "요즘 저장 많이 되는 코스트코 신상"],
      thumbnailCopies: ["1.2kg 실물", "코스트코 신상", "지금 타도 됨"],
      shotList: ["카트에 담는 첫 컷", "뚜껑 열고 숟가락으로 단면 떠올리기", "일반 컵 디저트와 크기 비교", "3명이 나눠 먹는 분량 컷"],
      platformFormats: [
        { p: "릴스", tip: "첫 2초에 통 크기 비교를 넣고, 6초 안에 단면을 보여준다." },
        { p: "쇼츠", tip: "가격, 용량, 맛 평가를 3줄 자막으로 압축한다." },
        { p: "틱톡", tip: "숟가락 ASMR과 과장된 리액션을 앞에 둔다." },
      ],
      doNotUse: "매장 내부 촬영 제약과 브랜드 광고처럼 보이는 멘트를 피한다.",
    },
    consumerSummary: {
      plainWhat: "코스트코에서 나온 대용량 망고푸딩이다.",
      whyPeopleCare: "큰 크기와 노란 단면이 영상에서 바로 눈에 띄고, 나눠 먹는 장면을 만들기 좋다.",
      whereToFind: "코스트코 디저트/냉장 코너에서 확인하는 흐름으로 보여준다.",
      tryNowVerdict: "지금 검색이 계속 오르는 중이라 콘텐츠로 다루기 좋은 타이밍이다.",
    },
    relatedTrends: {
      keywords: ["코스트코 신상", "망고 디저트", "대용량 디저트", "떠먹는 푸딩"],
      hashtags: ["#코스트코신상", "#망고푸딩", "#대용량디저트", "#디저트추천"],
      places: ["코스트코", "냉장 디저트 코너", "푸드 리뷰 계정"],
      compareWith: ["트레이더스 디저트", "편의점 망고젤리", "카페 망고빙수"],
    },
    community: {
      summary: "대용량 비주얼에 긍정 반응이 많고, 차별화 고민도 함께 올라오고 있어요.",
      sentiment: { positive: 72, negative: 14, neutral: 14 },
      comments: [
        { id: 1, author: "짧은영상_J", text: "이거 진짜 영상감 있다 바로 코스트코 달려가야겠음", tone: "positive", timeAgo: "3분 전" },
        { id: 2, author: "음식계정_K", text: "작년에 비슷한 거 했는데 반응 좋았음 이건 더 클 것 같아", tone: "positive", timeAgo: "21분 전" },
        { id: 3, author: "일상브이로그", text: "1.2kg 먹방은 제목 고민이 관건이네 포인트 어떻게 잡지", tone: "neutral", timeAgo: "45분 전" },
        { id: 4, author: "데일리_요리", text: "이미 비슷한 리뷰 좀 있어서 차별화가 필요할 듯", tone: "negative", timeAgo: "1시간 전" },
      ],
    },
  },
};

const TREND_POINT_SETS = [
  DEFAULT_TREND_POINTS,
  [16, 20, 22, 30, 34, 39, 45, 50, 58, 64, 68, 72, 76, 82].map((value, i) => ({ date: `5/${String(i + 5).padStart(2, "0")}`, value })),
  [8, 12, 18, 26, 30, 41, 52, 58, 63, 71, 79, 88, 93, 100].map((value, i) => ({ date: `5/${String(i + 5).padStart(2, "0")}`, value })),
  [92, 100, 96, 88, 79, 70, 63, 58, 52, 45, 40, 35, 31, 28].map((value, i) => ({ date: `5/${String(i + 5).padStart(2, "0")}`, value })),
  [20, 24, 31, 33, 35, 38, 41, 49, 55, 59, 62, 64, 67, 70].map((value, i) => ({ date: `5/${String(i + 5).padStart(2, "0")}`, value })),
  [14, 21, 27, 34, 42, 55, 61, 72, 80, 84, 89, 94, 97, 100].map((value, i) => ({ date: `5/${String(i + 5).padStart(2, "0")}`, value })),
  [28, 31, 34, 38, 40, 43, 46, 49, 51, 55, 58, 60, 62, 66].map((value, i) => ({ date: `5/${String(i + 5).padStart(2, "0")}`, value })),
  [18, 22, 30, 36, 44, 50, 57, 64, 69, 73, 79, 84, 89, 92].map((value, i) => ({ date: `5/${String(i + 5).padStart(2, "0")}`, value })),
];

function audienceTrendPoints(points, label) {
  const profile = {
    여성: { offset: 3, slope: 9 },
    남성: { offset: -2, slope: 3 },
    "10대": { offset: 1, slope: 12 },
    "20대": { offset: 4, slope: 13 },
    "30대": { offset: 2, slope: 6 },
    "40대+": { offset: -4, slope: 2 },
  }[label] || { offset: 0, slope: 0 };
  return points.map((point, i) => {
    const progress = points.length <= 1 ? 0 : i / (points.length - 1);
    const value = Math.max(1, Math.min(100, Math.round(point.value + profile.offset + profile.slope * progress)));
    return { ...point, value };
  });
}

function hydrateAudienceBreakdown(points, breakdown) {
  if (!breakdown) return null;
  const hydrate = item => ({
    ...item,
    share: item.share ?? item.value,
    points: item.points || audienceTrendPoints(points, item.label),
  });
  return {
    all: { label: "전체", share: 100, points },
    gender: (breakdown.gender || []).map(hydrate),
    age: (breakdown.age || []).map(hydrate),
  };
}

const AUDIENCE_SEGMENTS = [
  {
    audience: "20대 여성",
    detail: [{ label: "여성", value: "64%" }, { label: "20대", value: "39%" }, { label: "모바일", value: "79%" }],
    breakdown: {
      gender: [{ label: "여성", value: 64 }, { label: "남성", value: 36 }],
      age: [{ label: "10대", value: 20 }, { label: "20대", value: 39 }, { label: "30대", value: 25 }, { label: "40대+", value: 16 }],
    },
  },
  {
    audience: "30대 여성",
    detail: [{ label: "여성", value: "58%" }, { label: "30대", value: "34%" }, { label: "모바일", value: "73%" }],
    breakdown: {
      gender: [{ label: "여성", value: 58 }, { label: "남성", value: 42 }],
      age: [{ label: "10대", value: 12 }, { label: "20대", value: 29 }, { label: "30대", value: 34 }, { label: "40대+", value: 25 }],
    },
  },
  {
    audience: "10대 여성",
    detail: [{ label: "여성", value: "61%" }, { label: "10대", value: "37%" }, { label: "모바일", value: "86%" }],
    breakdown: {
      gender: [{ label: "여성", value: 61 }, { label: "남성", value: 39 }],
      age: [{ label: "10대", value: 37 }, { label: "20대", value: 33 }, { label: "30대", value: 18 }, { label: "40대+", value: 12 }],
    },
  },
  {
    audience: "20대 남성",
    detail: [{ label: "남성", value: "55%" }, { label: "20대", value: "36%" }, { label: "모바일", value: "71%" }],
    breakdown: {
      gender: [{ label: "여성", value: 45 }, { label: "남성", value: 55 }],
      age: [{ label: "10대", value: 17 }, { label: "20대", value: 36 }, { label: "30대", value: 29 }, { label: "40대+", value: 18 }],
    },
  },
];

CARDS.forEach((card, i) => {
  const custom = TREND_ENRICHMENT[card.id] || {};
  const points = TREND_POINT_SETS[i % TREND_POINT_SETS.length];
  const audienceSegment = AUDIENCE_SEGMENTS[i % AUDIENCE_SEGMENTS.length];
  const declining = String(card.velocity).startsWith("-");
  const peaking = card.timing === "yellow";
  card.naverTrend = custom.naverTrend || {
    period: "14d",
    updatedAt: "오늘 09:30",
    points,
    changeRate: card.velocity,
    dailyChange: declining ? "-4%" : `+${Math.max(3, Math.round(card.score * 2))}%`,
    peakStatus: declining ? "declining" : peaking ? "peaking" : "rising",
    audience: audienceSegment.audience,
    audienceDetail: audienceSegment.detail,
    audienceBreakdown: audienceSegment.breakdown,
    reason: declining
      ? "검색 관심도가 정점 이후 내려오는 중이라 반응형 리뷰나 비교 콘텐츠가 더 안전하다."
      : peaking
        ? "상승세는 있지만 수명이 짧은 신상형 키워드라 빠르게 확인해야 한다."
        : "최근 검색 관심도와 소셜 언급이 함께 오르며 첫 진입 콘텐츠에 유리하다.",
  };
  card.naverTrend.audienceBreakdown = hydrateAudienceBreakdown(
    card.naverTrend.points,
    card.naverTrend.audienceBreakdown
  );
  card.creatorKit = custom.creatorKit || {
    hooks: [card.hook, `${card.title} 지금 찍어도 될까?`, `요즘 이 키워드가 왜 뜨는지 10초 요약`],
    titles: [`${card.title} 뜨는 이유`, `${card.title} 콘텐츠 각도 3가지`, `지금 타야 할 ${card.category} 트렌드`],
    thumbnailCopies: ["지금 타도 됨", "검색 상승 중", "3초 훅 포함"],
    shotList: ["제품 또는 메뉴 실물 첫 컷", "가장 다른 포인트를 클로즈업", "기존 인기템과 비교", "마지막에 한 줄 verdict 자막"],
    platformFormats: card.platform,
    doNotUse: card.caution,
  };
  card.consumerSummary = custom.consumerSummary || {
    plainWhat: card.what,
    whyPeopleCare: card.why,
    whereToFind: "관련 매장, 편의점, SNS 해시태그, 검색 결과에서 확인할 수 있다.",
    tryNowVerdict: card.timing === "red" ? "이미 정점을 지난 편이라 구경용으로 보는 편이 낫다." : "지금 관심도가 남아 있어 한 번 확인해볼 만하다.",
  };
  card.relatedTrends = custom.relatedTrends || {
    keywords: [card.title, `${card.category} 신상`, `${card.category} 추천`, "요즘 뜨는 메뉴"],
    hashtags: [`#${String(card.title).replace(/\s/g, "")}`, "#오늘의트렌드", `#${String(card.category).replace(/\s/g, "")}`],
    places: ["네이버 검색", "인스타 해시태그", "X 음식 큐레이터", "관련 매장"],
    compareWith: CARDS.filter(c => c.id !== card.id && c.category === card.category).slice(0, 3).map(c => c.title),
  };
  card.community = custom.community || (() => {
    const sentiment = declining
      ? { positive: 35, negative: 42, neutral: 23 }
      : peaking
        ? { positive: 78, negative: 8, neutral: 14 }
        : { positive: 65, negative: 18, neutral: 17 };
    const summary = declining
      ? "이미 비슷한 콘텐츠가 많아 식상하다는 반응과 함께 피로감도 올라오고 있어요."
      : peaking
        ? "빠르게 올라오는 트렌드에 지금 바로 찍어야 한다는 긍정 반응이 압도적이에요."
        : "긍정 반응이 우세하고 콘텐츠 아이디어를 고민하는 크리에이터들이 늘고 있어요.";
    const posComments = [
      { id: 1, author: "짧은영상_S", text: `${card.title} 콘텐츠 바로 만들어야겠다 영상감 있어`, tone: "positive", timeAgo: "5분 전" },
      { id: 2, author: "음식계정_M", text: "이 타이밍 놓치면 안 될 것 같아서 오늘 바로 찍으러 감", tone: "positive", timeAgo: "28분 전" },
    ];
    const negComments = [
      { id: 3, author: "일상브이로그", text: `${card.title} 비슷한 콘텐츠 이미 많지 않나 차별화가 관건인 듯`, tone: "negative", timeAgo: "52분 전" },
      { id: 4, author: "데일리_크리에이터", text: "늦게 타면 반응 없을까봐 고민이 되긴 함", tone: "negative", timeAgo: "1시간 전" },
    ];
    const neuComments = [
      { id: 3, author: "일상브이로그", text: `${card.title} 제목 어떻게 잡을지 고민 중 포인트가 뭔지`, tone: "neutral", timeAgo: "40분 전" },
      { id: 4, author: "데일리_크리에이터", text: "지금 찍어두고 편집하면서 방향 잡으려고", tone: "neutral", timeAgo: "1시간 전" },
    ];
    const comments = declining
      ? [posComments[0], negComments[0], negComments[1], neuComments[0]]
      : peaking
        ? [posComments[0], posComments[1], neuComments[0], negComments[0]]
        : [posComments[0], posComments[1], neuComments[0], negComments[1]];
    return { summary, sentiment, comments };
  })();
});

// ─── New identity fields (re-production focused) ──────────────
CARDS.forEach((card, i) => {
  card.macroCategory = mapCategory(card.category);
  card.stage = stageFromTiming(card.timing, card.velocity);
  card.stageMeta = STAGES[card.stage];
  card.stageReason = (
    card.stage === "early"      ? "아직 넓게 퍼지기 전이지만 SNS 쪽에서 신호가 포착되고 있어요." :
    card.stage === "mainstream" ? "데이터랩이랑 SNS 둘 다 같이 오르며 상승중이에요." :
    card.stage === "peak"       ? "이미 여러 채널에서 크게 이야기되는 핫이슈예요. 다른 각도가 필요할 수 있어요." :
                                  "검색이랑 SNS 둘 다 빠지는 하락세예요. 회고형 콘텐츠가 더 자연스러워요."
  );

  const seed = (i + 1) * 137;
  const igCount = 120 + (seed % 480);
  const ttCount = 30  + ((seed * 3) % 220);
  const last24 = card.stage === "declining"
    ? -((seed % 14) + 4)
    :  ((seed % 38) + (card.stage === "early" ? 30 : card.stage === "mainstream" ? 18 : 8));
  card.reproductionMetrics = {
    instagramPosts: igCount,
    tiktokVideos:   ttCount,
    last24hNew:     last24,
    last7dCount:    Math.round((igCount + ttCount) * 0.45),
  };

  const sourcePool = ["@food_seoul","@dessert_log","@snack_kr","@bakery_pick","@cvs_news","@chains_kr","@daiso_pick"];
  card.discoverySource = {
    handle:      sourcePool[i % sourcePool.length],
    platform:    i % 2 === 0 ? "instagram" : "tiktok",
    postUrl:     "#",
    capturedAt:  card.publishedAt,
  };

  card.reproductionSamples = [0,1,2,3].map(k => {
    const hue = (card.cover.hue + k * 17) % 360;
    const sat = Math.max(40, Math.min(95, card.cover.sat - k * 4));
    const lum = Math.max(40, Math.min(85, card.cover.lum + (k - 1) * 6));
    return {
      kind: "thumb",
      hue, sat, lum,
      author:   sourcePool[(i + k) % sourcePool.length],
      platform: k % 2 === 0 ? "instagram" : "tiktok",
      url: "#",
    };
  });

  card.enrichment = {
    cafeBlog: [
      { source: "네이버 카페",  snippet: `${card.title} 직접 사봤는데 SNS에서 본 그대로네요`, link:"#", timeAgo:"4시간 전" },
      { source: "네이버 블로그",snippet: `${card.title} 후기 — 사진보다 양이 진짜 많음`,        link:"#", timeAgo:"12시간 전" },
      { source: "네이버 카페",  snippet: `${card.title} 다들 어디서 사세요?`,                   link:"#", timeAgo:"1일 전" },
    ],
    youtube: [
      { title: `${card.title} 솔직 리뷰 3분`,      channel: "푸드로그",   views: "12만", thumbHue: card.cover.hue,              link:"#" },
      { title: `${card.title} 먹어봄 #쇼츠`,        channel: "디저트탐험", views: "8.4만", thumbHue: (card.cover.hue + 30) % 360, link:"#" },
      { title: `${card.title} vs 비슷한거 비교`,    channel: "스낵리뷰",   views: "5.1만", thumbHue: (card.cover.hue + 60) % 360, link:"#" },
    ],
  };
});

const DEBATES = [
  {
    id: "d01",
    type: "debate",
    title: "코스트코 망고푸딩, 지금 사러 갈 만할까?",
    subtitle: "대용량 디저트가 숏폼에서 계속 먹힐지, 이미 인증샷이 충분히 쌓였는지 의견이 갈리고 있어요.",
    category: "푸드",
    participants: 2900,
    leftLabel: "지금 사도 됨",
    rightLabel: "이미 늦음",
    leftPercent: 61,
    rightPercent: 39,
    leftArguments: [
      "대용량 비주얼이 첫 3초 훅으로 강함",
      "가족/친구와 나눠 먹는 활용 컷이 남아 있음",
      "코스트코 신상 키워드 유입이 아직 상승 중",
    ],
    rightArguments: [
      "비슷한 먹방 컷이 이미 많음",
      "매장 접근성이 낮아 따라 하기 어려움",
      "단순 리뷰보다 다른 조합이 필요함",
    ],
    featuredComment: {
      author: "디저트로그",
      badge: "T2",
      text: "그냥 떠먹는 컷보다 얼려 먹기, 요거트랑 섞기처럼 변형 포맷을 넣으면 아직 각이 있어요.",
      timeAgo: "1시간 전",
    },
    hashtags: ["#코스트코", "#망고푸딩", "#대용량디저트"],
    likes: "4.1K",
    comments: "2.9K",
    shares: "678",
    cover: { hue: 38, sat: 92, lum: 68, label: "MANGO\nDEBATE", src: "assets/shorts/mango-vote.png", position: "center" },
  },
  {
    id: "d02",
    type: "debate",
    title: "카공족, 음료 한 잔으로 몇 시간까지 가능할까?",
    subtitle: "시험기간마다 카페 공부는 손님 권리라는 쪽과, 오래 앉아 있으면 매장에 민폐라는 쪽이 댓글에서 갈리고 있어요.",
    category: "라이프스타일",
    participants: 4200,
    leftLabel: "손님 권리",
    rightLabel: "장시간은 민폐",
    leftPercent: 54,
    rightPercent: 46,
    leftArguments: [
      "돈 내고 이용하는 공간이라는 인식이 강함",
      "노트북/태블릿 공부 브이로그와 바로 연결됨",
      "콘센트, 와이파이, 조용한 좌석 정보가 댓글을 부름",
    ],
    rightArguments: [
      "작은 매장에서는 회전율 문제로 바로 갈등이 생김",
      "음료 한 잔으로 4인석 점유하면 반감이 큼",
      "사장님 입장, 손님 입장으로 댓글 구도가 선명함",
    ],
    featuredComment: {
      author: "캠퍼스톡",
      badge: "T1",
      text: "혼자 4인석 잡는 건 선 넘었다 vs 빈자리 많으면 상관없다로 바로 싸움 나더라고요.",
      timeAgo: "28분 전",
    },
    hashtags: ["#카공", "#카페공부", "#민폐논쟁"],
    likes: "6.8K",
    comments: "4.2K",
    shares: "936",
    cover: { hue: 232, sat: 78, lum: 62, label: "CAFE\nSTUDY", src: "assets/shorts/cafe-study.png", position: "center" },
  },
  {
    id: "d03",
    type: "debate",
    title: "맛집 웨이팅 중 자리 맡기기, 센스일까 민폐일까?",
    subtitle: "친구 한 명이 먼저 줄 서고 나중에 여럿이 합류하는 상황을 두고, 다들 하는 방식이라는 쪽과 뒤 사람 기만이라는 쪽이 갈리고 있어요.",
    category: "플레이스",
    participants: 5100,
    leftLabel: "현실적 센스",
    rightLabel: "명백한 민폐",
    leftPercent: 49,
    rightPercent: 51,
    leftArguments: [
      "친구끼리 시간 맞추기 어려운 상황에 공감이 큼",
      "몇 명까지 괜찮은지 기준 논쟁이 바로 생김",
      "실제 웨이팅 경험담 댓글을 끌어내기 쉬움",
    ],
    rightArguments: [
      "뒤에서 기다린 사람 입장에서는 순서가 밀림",
      "한 명이 여러 명을 데려오면 체감 대기 시간이 달라짐",
      "맛집, 팝업, 콘서트 줄까지 확장되는 민폐 논쟁",
    ],
    featuredComment: {
      author: "웨이팅로그",
      badge: "T2",
      text: "한 명 추가는 이해하는데 갑자기 네 명 합류하면 그건 줄 선 게 아니라 예약석 만든 거 아님?",
      timeAgo: "41분 전",
    },
    hashtags: ["#맛집웨이팅", "#자리맡기", "#민폐논쟁"],
    likes: "8.9K",
    comments: "5.1K",
    shares: "1.2K",
    cover: { hue: 356, sat: 78, lum: 63, label: "LINE\nDEBATE", src: "assets/shorts/waiting-line.png", position: "center" },
  },
];

const SHORTS_FEED = [
  { type: "trend", cardId: "c01" },
  { type: "trend", cardId: "c03" },
  { type: "debate", debateId: "d01" },
  { type: "trend", cardId: "c06" },
  { type: "trend", cardId: "c09" },
  { type: "debate", debateId: "d02" },
  { type: "trend", cardId: "c05" },
  { type: "debate", debateId: "d03" },
].map((item, index) => ({ ...item, id: `${item.type}-${index + 1}` }));

// ─── Pipeline MVP mock model ─────────────────────────────────
// 관리자 MVP의 핵심은 자동 발행이 아니라 source → raw evidence →
// keyword cluster → card draft로 이어지는 증거 체인을 검수하는 것.
const SOURCE_ACCOUNTS = [
  {
    id: "src-x-food-seoul",
    platform: "x",
    name: "푸드 서울 레이더",
    handle: "@food_seoul",
    profileUrl: "https://x.com/food_seoul",
    category: "푸드",
    grade: "A",
    active: true,
    cadence: "수동 확인 · 오전",
    lastCheckedAt: "12분 전",
    notes: "초반 유행 포착이 빠른 푸드 큐레이션 계정",
  },
  {
    id: "src-x-dessert-log",
    platform: "x",
    name: "디저트 로그",
    handle: "@dessert_log",
    profileUrl: "https://x.com/dessert_log",
    category: "푸드",
    grade: "A",
    active: true,
    cadence: "수동 확인 · 오전",
    lastCheckedAt: "28분 전",
    notes: "디저트 신상과 카페 메뉴 반응이 빠름",
  },
  {
    id: "src-x-snack-kr",
    platform: "x",
    name: "스낵 코리아",
    handle: "@snack_kr",
    profileUrl: "https://x.com/snack_kr",
    category: "푸드",
    grade: "B",
    active: true,
    cadence: "수동 확인 · 오후",
    lastCheckedAt: "5분 전",
    notes: "편의점/마트 신상 신호에 강함",
  },
  {
    id: "src-x-popup-note",
    platform: "x",
    name: "서울 팝업 노트",
    handle: "@seoul_popup",
    profileUrl: "https://x.com/seoul_popup",
    category: "플레이스",
    grade: "B",
    active: true,
    cadence: "수동 확인 · 오후",
    lastCheckedAt: "40분 전",
    notes: "팝업/웨이팅 신호 확인용",
  },
  {
    id: "src-x-meme-kr",
    platform: "x",
    name: "밈 코리아",
    handle: "@meme_kr",
    profileUrl: "https://x.com/meme_kr",
    category: "밈·챌린지",
    grade: "A",
    active: true,
    cadence: "수동 확인 · 상시",
    lastCheckedAt: "15분 전",
    notes: "문장형 밈과 챌린지 초반 반응",
  },
  {
    id: "src-yt-shorts-food",
    platform: "youtube",
    name: "푸드 쇼츠 검색",
    handle: "유튜브 쇼츠",
    profileUrl: "https://www.youtube.com/results?search_query=food+shorts",
    category: "푸드",
    grade: "B",
    active: true,
    cadence: "수동 검증",
    lastCheckedAt: "1시간 전",
    notes: "키워드별 영상화 여부를 확인하는 보조 소스",
  },
  {
    id: "src-manual-url",
    platform: "manual_url",
    name: "수동 등록함",
    handle: "수동 등록",
    profileUrl: "#",
    category: "전체",
    grade: "B",
    active: true,
    cadence: "운영자 입력",
    lastCheckedAt: "방금",
    notes: "인스타그램 릴스, 틱톡, 커뮤니티 링크를 운영자가 직접 등록",
  },
  {
    id: "src-x-daily-routine",
    platform: "x",
    name: "데일리 루틴",
    handle: "@daily_routine",
    profileUrl: "https://x.com/daily_routine",
    category: "라이프스타일",
    grade: "C",
    active: false,
    cadence: "보류",
    lastCheckedAt: "6시간 전",
    notes: "광고성 반복 게시가 많아 비활성 후보",
  },
];

const RAW_POSTS = [
  {
    id: "raw-001",
    platform: "x",
    sourceAccountId: "src-x-food-seoul",
    url: "https://x.com/food_seoul/status/001",
    author: "@food_seoul",
    postedAt: "오늘 08:46",
    collectedAt: "오늘 09:02",
    excerpt: "코스트코 망고푸딩 다시 풀렸는데 1.2kg 통 크기가 영상에서 바로 먹힐 듯",
    metrics: { likes: 21800, reposts: 1260, comments: 340, views: 418000 },
    hashtags: ["#코스트코", "#망고푸딩"],
    mentions: [],
    links: ["https://x.com/food_seoul/status/001"],
    suggestedKeywords: ["코스트코 망고푸딩", "대용량 디저트"],
    keywordClusterIds: ["clu-mango-pudding"],
    status: "linked",
  },
  {
    id: "raw-002",
    platform: "x",
    sourceAccountId: "src-x-dessert-log",
    url: "https://x.com/dessert_log/status/002",
    author: "@dessert_log",
    postedAt: "오늘 08:58",
    collectedAt: "오늘 09:05",
    excerpt: "망고푸딩은 그냥 리뷰보다 얼려 먹기나 컵분배 비교로 가야 저장이 나올 듯",
    metrics: { likes: 8300, reposts: 430, comments: 112, views: 124000 },
    hashtags: ["#망고푸딩", "#디저트추천"],
    mentions: ["@food_seoul"],
    links: ["https://x.com/dessert_log/status/002"],
    suggestedKeywords: ["코스트코 망고푸딩", "얼먹 디저트"],
    keywordClusterIds: ["clu-mango-pudding"],
    status: "linked",
  },
  {
    id: "raw-003",
    platform: "youtube",
    sourceAccountId: "src-yt-shorts-food",
    url: "https://www.youtube.com/shorts/mango-pudding",
    author: "푸드로그",
    postedAt: "어제 23:10",
    collectedAt: "오늘 09:16",
    excerpt: "대용량 망고푸딩 실물 비교 쇼츠가 12시간 만에 12만 조회를 넘김",
    metrics: { likes: 5400, reposts: 0, comments: 86, views: 124000 },
    hashtags: ["#코스트코신상", "#망고디저트"],
    mentions: [],
    links: ["https://www.youtube.com/shorts/mango-pudding"],
    suggestedKeywords: ["코스트코 망고푸딩"],
    keywordClusterIds: ["clu-mango-pudding"],
    status: "linked",
  },
  {
    id: "raw-004",
    platform: "x",
    sourceAccountId: "src-x-snack-kr",
    url: "https://x.com/snack_kr/status/004",
    author: "@snack_kr",
    postedAt: "오늘 08:20",
    collectedAt: "오늘 09:08",
    excerpt: "얼린 젤리 씹는 소리 때문에 편의점 젤리 비교 영상이 다시 돌기 시작",
    metrics: { likes: 14100, reposts: 980, comments: 221, views: 231000 },
    hashtags: ["#얼먹젤리", "#편의점신상"],
    mentions: [],
    links: ["https://x.com/snack_kr/status/004"],
    suggestedKeywords: ["얼먹젤리", "편의점 젤리"],
    keywordClusterIds: ["clu-frozen-jelly"],
    status: "linked",
  },
  {
    id: "raw-005",
    platform: "manual_url",
    sourceAccountId: "src-manual-url",
    url: "https://www.instagram.com/reel/frozen-jelly-example/",
    author: "운영자 수동 등록",
    postedAt: "오늘 07:52",
    collectedAt: "오늘 09:21",
    excerpt: "GS25/CU 젤리 얼리기 비교 릴스가 댓글에서 제품 추천으로 번지는 중",
    metrics: { likes: 7800, reposts: 0, comments: 178, views: 96000 },
    hashtags: ["#얼먹젤리", "#편의점"],
    mentions: [],
    links: ["https://www.instagram.com/reel/frozen-jelly-example/"],
    suggestedKeywords: ["얼먹젤리"],
    keywordClusterIds: ["clu-frozen-jelly"],
    status: "linked",
  },
  {
    id: "raw-006",
    platform: "x",
    sourceAccountId: "src-x-popup-note",
    url: "https://x.com/seoul_popup/status/006",
    author: "@seoul_popup",
    postedAt: "오늘 08:05",
    collectedAt: "오늘 09:15",
    excerpt: "한남동 도넛 팝업 평일 오전 대기도 생겼고 박스 인증샷이 계속 올라옴",
    metrics: { likes: 9100, reposts: 540, comments: 144, views: 178000 },
    hashtags: ["#한남동팝업", "#도넛"],
    mentions: [],
    links: ["https://x.com/seoul_popup/status/006"],
    suggestedKeywords: ["한남동 도넛 팝업", "팝업 줄 인증"],
    keywordClusterIds: ["clu-donut-popup"],
    status: "linked",
  },
  {
    id: "raw-007",
    platform: "x",
    sourceAccountId: "src-x-meme-kr",
    url: "https://x.com/meme_kr/status/007",
    author: "@meme_kr",
    postedAt: "오늘 08:33",
    collectedAt: "오늘 09:18",
    excerpt: "9분 챌린지 벌칙 파트만 따로 잘라서 듀엣 밈으로 쓰는 계정들이 늘어남",
    metrics: { likes: 30400, reposts: 4100, comments: 508, views: 720000 },
    hashtags: ["#9분챌린지", "#듀엣챌린지"],
    mentions: [],
    links: ["https://x.com/meme_kr/status/007"],
    suggestedKeywords: ["9분 챌린지"],
    keywordClusterIds: ["clu-nine-minute"],
    status: "linked",
  },
  {
    id: "raw-008",
    platform: "youtube",
    sourceAccountId: "src-yt-shorts-food",
    url: "https://www.youtube.com/shorts/morning-run",
    author: "루틴쇼츠",
    postedAt: "어제 21:40",
    collectedAt: "오늘 09:28",
    excerpt: "출근 전 30분 러닝 루틴 쇼츠가 댓글에서 지역 크루 모집으로 이어짐",
    metrics: { likes: 2100, reposts: 0, comments: 94, views: 53000 },
    hashtags: ["#모닝러닝", "#러닝크루"],
    mentions: [],
    links: ["https://www.youtube.com/shorts/morning-run"],
    suggestedKeywords: ["모닝 러닝", "출퇴근 러닝"],
    keywordClusterIds: [],
    status: "analyzed",
  },
  {
    id: "raw-009",
    platform: "manual_url",
    sourceAccountId: "src-manual-url",
    url: "https://www.instagram.com/reel/brand-coupon/",
    author: "운영자 수동 등록",
    postedAt: "오늘 08:10",
    collectedAt: "오늘 09:33",
    excerpt: "신규가입 쿠폰 이벤트성 릴스. 반복 광고 신호가 강해 후보에서 제외 예정",
    metrics: { likes: 320, reposts: 0, comments: 8, views: 6400 },
    hashtags: ["#이벤트", "#쿠폰"],
    mentions: [],
    links: ["https://www.instagram.com/reel/brand-coupon/"],
    suggestedKeywords: ["쿠폰 이벤트"],
    keywordClusterIds: [],
    status: "ignored",
  },
  {
    id: "raw-010",
    platform: "x",
    sourceAccountId: "src-x-dessert-log",
    url: "https://x.com/dessert_log/status/010",
    author: "@dessert_log",
    postedAt: "오늘 09:04",
    collectedAt: "오늘 09:35",
    excerpt: "망고푸딩은 컵 디저트랑 크기 비교한 컷이 제일 많이 저장되는 중",
    metrics: { likes: 3900, reposts: 220, comments: 51, views: 72000 },
    hashtags: ["#망고푸딩"],
    mentions: [],
    links: ["https://x.com/dessert_log/status/010"],
    suggestedKeywords: ["코스트코 망고푸딩"],
    keywordClusterIds: ["clu-mango-pudding"],
    status: "duplicate",
  },
];

const KEYWORD_CLUSTERS = [
  {
    id: "clu-mango-pudding",
    canonicalKeyword: "코스트코 망고푸딩",
    aliases: ["망고푸딩", "대용량 망고푸딩", "코스트코 신상 디저트"],
    category: "푸드",
    rawPostIds: ["raw-001", "raw-002", "raw-003", "raw-010"],
    platforms: ["x", "youtube"],
    sourceCount: 3,
    firstDetectedAt: "오늘 08:46",
    lastDetectedAt: "오늘 09:35",
    trendScore: 82,
    scoreBreakdown: {
      growthSignal: 24,
      sourceDiversity: 14,
      platformSpread: 13,
      reactionVelocity: 15,
      evidenceQuality: 13,
      operatorWeight: 6,
      noisePenalty: -3,
    },
    similarClusterIds: ["clu-frozen-jelly"],
    operatorNote: "출처 2개 이상 확인. 단순 리뷰보다 컵 분배/얼려 먹기 각도가 더 안전함.",
    status: "ready_for_draft",
  },
  {
    id: "clu-frozen-jelly",
    canonicalKeyword: "얼먹젤리",
    aliases: ["편의점 젤리", "얼린 젤리", "frozen jelly"],
    category: "푸드",
    rawPostIds: ["raw-004", "raw-005"],
    platforms: ["x", "manual_url"],
    sourceCount: 2,
    firstDetectedAt: "오늘 08:20",
    lastDetectedAt: "오늘 09:21",
    trendScore: 76,
    scoreBreakdown: {
      growthSignal: 22,
      sourceDiversity: 11,
      platformSpread: 12,
      reactionVelocity: 14,
      evidenceQuality: 10,
      operatorWeight: 8,
      noisePenalty: -1,
    },
    similarClusterIds: ["clu-mango-pudding"],
    operatorNote: "ASMR 포맷으로 영상화가 쉬움. 치아 시림 주의 멘트 필요.",
    status: "draft_requested",
  },
  {
    id: "clu-donut-popup",
    canonicalKeyword: "한남동 도넛 팝업",
    aliases: ["도넛 팝업", "한남동 팝업", "팝업 줄 인증"],
    category: "플레이스",
    rawPostIds: ["raw-006"],
    platforms: ["x"],
    sourceCount: 1,
    firstDetectedAt: "오늘 08:05",
    lastDetectedAt: "오늘 09:15",
    trendScore: 61,
    scoreBreakdown: {
      growthSignal: 17,
      sourceDiversity: 6,
      platformSpread: 4,
      reactionVelocity: 12,
      evidenceQuality: 9,
      operatorWeight: 15,
      noisePenalty: -2,
    },
    similarClusterIds: [],
    operatorNote: "사진 인증은 강하지만 출처가 아직 1개라 추가 검증 권장.",
    status: "watching",
  },
  {
    id: "clu-nine-minute",
    canonicalKeyword: "9분 챌린지",
    aliases: ["듀엣 챌린지", "9분 벌칙 챌린지"],
    category: "밈·챌린지",
    rawPostIds: ["raw-007"],
    platforms: ["x"],
    sourceCount: 1,
    firstDetectedAt: "오늘 08:33",
    lastDetectedAt: "오늘 09:18",
    trendScore: 74,
    scoreBreakdown: {
      growthSignal: 26,
      sourceDiversity: 7,
      platformSpread: 5,
      reactionVelocity: 19,
      evidenceQuality: 12,
      operatorWeight: 8,
      noisePenalty: -3,
    },
    similarClusterIds: [],
    operatorNote: "확산 속도는 빠르지만 보조 출처 확인 후 초안 생성 권장.",
    status: "new",
  },
];

const CARD_DRAFTS = [
  {
    id: "draft-frozen-jelly",
    keywordClusterId: "clu-frozen-jelly",
    title: "편의점 젤리, 얼려 먹는 순간 콘텐츠가 되는 이유",
    summary: "얼먹젤리는 익숙한 편의점 젤리를 새로운 식감과 ASMR 포맷으로 재해석하는 신호다.",
    whyHot: "접근성이 높은 제품이고, 얼리기 전후 비교가 짧은 영상 안에서 바로 이해된다.",
    hook: "젤리를 4시간 얼리면 소리가 달라져요",
    contentAngle: "GS25/CU/세븐 제품을 같은 시간 얼린 뒤 소리와 식감을 비교한다.",
    caution: "치아가 시린 사람을 위한 주의 멘트를 넣고, 특정 브랜드 광고처럼 보이는 표현은 피한다.",
    sourceLinks: ["https://x.com/snack_kr/status/004", "https://www.instagram.com/reel/frozen-jelly-example/"],
    checklist: [
      { id: "sources", label: "출처 2개 이상 확인", done: true },
      { id: "copy", label: "원문 문장 그대로 사용하지 않음", done: true },
      { id: "claims", label: "조회수/판매처 등 변동 정보 확인 필요 표시", done: false },
      { id: "media", label: "원본 이미지/영상 저장하지 않음", done: true },
    ],
    status: "draft",
  },
  {
    id: "draft-mango-pudding",
    keywordClusterId: "clu-mango-pudding",
    title: "코스트코 망고푸딩, 지금 찍어도 되는 각도",
    summary: "대용량 비주얼은 이미 반응이 있고, 단순 리뷰보다 분량 비교나 활용 컷이 차별점이다.",
    whyHot: "A급 푸드 seed 계정 2개와 유튜브 쇼츠 보조 검증에서 같은 키워드가 반복됐다.",
    hook: "이 한 통이 진짜 1.2kg입니다",
    contentAngle: "일반 컵 디저트와 크기 비교 후 4인 분배, 얼려 먹기, 요거트 믹스까지 짧게 나눈다.",
    caution: "매장 내부 촬영 제약과 판매 지점 차이를 확인 필요로 표시한다.",
    sourceLinks: ["https://x.com/food_seoul/status/001", "https://x.com/dessert_log/status/002", "https://www.youtube.com/shorts/mango-pudding"],
    checklist: [
      { id: "sources", label: "출처 2개 이상 확인", done: true },
      { id: "copy", label: "원문 문장 그대로 사용하지 않음", done: true },
      { id: "claims", label: "판매 여부/지점 정보 확인 필요 표시", done: true },
      { id: "media", label: "원본 이미지/영상 저장하지 않음", done: true },
    ],
    status: "approved",
    previewCardId: "c01",
  },
];

const PIPELINE_STATS = {
  rawPostsToday: RAW_POSTS.length,
  newClusters: KEYWORD_CLUSTERS.filter(c => c.status === "new").length,
  draftReady: KEYWORD_CLUSTERS.filter(c => c.status === "ready_for_draft").length,
  draftQueue: CARD_DRAFTS.filter(d => d.status === "draft" || d.status === "needs_revision").length,
  noiseOrDuplicate: RAW_POSTS.filter(p => p.status === "ignored" || p.status === "duplicate").length,
  activeABSources: SOURCE_ACCOUNTS.filter(s => s.active && (s.grade === "A" || s.grade === "B")).length,
  sourceTotalTarget: 50,
  rawPostStatus: {
    raw: RAW_POSTS.filter(p => p.status === "raw").length,
    analyzed: RAW_POSTS.filter(p => p.status === "analyzed").length,
    linked: RAW_POSTS.filter(p => p.status === "linked").length,
    ignored: RAW_POSTS.filter(p => p.status === "ignored").length,
    duplicate: RAW_POSTS.filter(p => p.status === "duplicate").length,
  },
  clusterStatus: {
    new: KEYWORD_CLUSTERS.filter(c => c.status === "new").length,
    watching: KEYWORD_CLUSTERS.filter(c => c.status === "watching").length,
    readyForDraft: KEYWORD_CLUSTERS.filter(c => c.status === "ready_for_draft").length,
    draftRequested: KEYWORD_CLUSTERS.filter(c => c.status === "draft_requested").length,
    rejected: KEYWORD_CLUSTERS.filter(c => c.status === "rejected").length,
    merged: KEYWORD_CLUSTERS.filter(c => c.status === "merged").length,
  },
  platformsToday: {
    x: RAW_POSTS.filter(p => p.platform === "x").length,
    youtube: RAW_POSTS.filter(p => p.platform === "youtube").length,
    manual_url: RAW_POSTS.filter(p => p.platform === "manual_url").length,
  },
  gradeMix: {
    A: SOURCE_ACCOUNTS.filter(s => s.grade === "A").length,
    B: SOURCE_ACCOUNTS.filter(s => s.grade === "B").length,
    C: SOURCE_ACCOUNTS.filter(s => s.grade === "C").length,
    D: SOURCE_ACCOUNTS.filter(s => s.grade === "D").length,
  },
};

// ─── 2026 marketer issue refresh ───────────────────────────────
// The prototype started with food/new-product examples. This pass keeps the
// same data contract but replaces the runtime issue set with marketer-facing
// memes, brand risks, fandom/IP, business and platform topics.
Object.assign(STAGES, {
  early: {
    key: "early",
    label: "포착",
    short: "포착",
    desc: "아직 모두가 이야기하진 않지만 커뮤니티와 숏폼에서 신호가 잡힌 단계입니다.",
    color: "var(--tr-blue)",
    bg: "rgba(49,130,246,0.12)",
  },
  mainstream: {
    key: "mainstream",
    label: "상승중",
    short: "상승중",
    desc: "SNS와 검색이 같이 오르며 확산 속도가 붙은 단계입니다. 해석을 붙이기 좋습니다.",
    color: "var(--tr-green)",
    bg: "rgba(0,200,83,0.12)",
  },
  peak: {
    key: "peak",
    label: "핫이슈",
    short: "핫이슈",
    desc: "이미 여러 채널에서 크게 이야기되는 상태입니다. 같은 말보다 새로운 관점이 필요합니다.",
    color: "var(--tr-yellow)",
    bg: "rgba(255,179,0,0.14)",
  },
  declining: {
    key: "declining",
    label: "하락세",
    short: "하락세",
    desc: "관심이 빠지는 상태입니다. 새롭게 올라타기보다 정리형 관점이 더 자연스럽습니다.",
    color: "var(--tr-red)",
    bg: "rgba(255,59,48,0.12)",
  },
});

CATEGORIES.splice(
  0,
  CATEGORIES.length,
  "전체",
  "밈/커뮤니티",
  "브랜드 이슈",
  "비즈/테크",
  "팬덤/IP",
  "라이프스타일"
);
Object.assign(CATEGORY_MAP, {
  "밈/커뮤니티": "밈/커뮤니티",
  "브랜드 이슈": "브랜드 이슈",
  "비즈/테크": "비즈/테크",
  "팬덤/IP": "팬덤/IP",
  "라이프스타일": "라이프스타일",
});

const MARKETER_ISSUE_CARDS = [
  {
    id: "c01",
    title: "요즘 릴스에 자꾸 뜨는 셋로그, 브랜드도 써먹을 수 있을까?",
    category: "밈/커뮤니티",
    timing: "green",
    score: 9.4,
    velocity: "+112%",
    rank: 1,
    keyword: "셋로그",
    cover: { hue: 205, sat: 82, lum: 62, label: "SET\nLOG" },
    what: "셋로그는 친구들과 정해진 시간마다 짧은 영상을 남기고 하루를 분할 화면 브이로그처럼 완성하는 기록형 소셜 포맷이다.",
    why: "꾸민 피드보다 가까운 친구끼리 보는 날것의 일상에 피로감 낮은 친밀감이 붙었다. 1020은 공개 과시보다 작은 그룹 안에서의 실시간 연결감을 더 편하게 소비한다.",
    angle: "브랜드는 직원, 팬, 크리에이터, 매장 스태프의 하루를 같은 시간대별 컷으로 묶어 사람 냄새 나는 비하인드 콘텐츠를 만들 수 있다.",
    hook: "요즘 릴스에서 화면이 여러 칸으로 쪼개진 하루 기록을 봤다면, 그냥 브이로그가 아니라 셋로그 흐름일 가능성이 크다.",
    platform: [
      { p: "릴스", tip: "오전-점심-퇴근 전후 3~4컷을 같은 구도로 묶고 자막은 시간만 짧게 붙인다." },
      { p: "틱톡", tip: "친구, 직군, 캐릭터처럼 서로 다른 시점을 병렬로 보여주면 참여 욕구가 커진다." },
      { p: "브랜드 채널", tip: "런칭 전날 팀원들의 하루를 나눠 보여주면 제품보다 브랜드 뒤 사람을 먼저 각인시킬 수 있다." },
    ],
    caution: "사생활 노출과 직원 동원 느낌을 조심해야 한다. 실제 자발성과 촬영 동의가 보이지 않으면 바로 회사 홍보물처럼 식는다.",
    sources: [
      { type: "news", label: "머니투데이: 딱 2초 공유, Z세대 소셜 앱 주목", url: "https://www.mt.co.kr/society/2026/04/26/2026042408543850503" },
      { type: "news", label: "일요신문: 날것 일상 그대로 올린다", url: "https://www.ilyo.co.kr/?ac=article_view&entry_id=510607" },
    ],
    publishedAt: "오늘 10:20",
    audience: "10-20대 여성",
    audienceDetail: [{ label: "10-20대", value: "67%" }, { label: "여성", value: "58%" }, { label: "모바일", value: "91%" }],
    related: {
      keywords: ["셋로그", "날것 브이로그", "친구 일상 공유", "분할 화면 릴스"],
      hashtags: ["#셋로그", "#setlog", "#날것브이로그", "#친구일상"],
      places: ["인스타 릴스", "앱스토어", "X 타임라인", "학교/대학생 커뮤니티"],
    },
    verdict: "지금 작게 테스트하기 좋다. 브랜드가 사람을 보여줄 명분이 있다면 탑승 추천.",
    risk: "중간",
  },
  {
    id: "c02",
    title: "영크크가 뭐길래, 뜻도 모르는데 다들 따라 할까?",
    category: "밈/커뮤니티",
    timing: "green",
    score: 8.7,
    velocity: "+84%",
    rank: 2,
    keyword: "영크크",
    cover: { hue: 282, sat: 78, lum: 62, label: "YOUNG\nKK" },
    what: "영크크는 코르티스의 YOUNGCREATORCREW에서 나온 줄임말이 밈처럼 재해석되며, 맥락을 몰라도 따라 말하는 소리 중심 유행어로 번지는 흐름이다.",
    why: "Z세대 밈은 의미보다 리듬, 낯섦, 따라 하기 쉬운 어감으로 먼저 확산된다. 설명할수록 재미가 줄고 모를수록 더 쓰고 싶어지는 타입이다.",
    angle: "브랜드는 억지로 뜻을 설명하기보다 사내 밈, 제품 별명, 캠페인 구호처럼 짧고 반복 가능한 소리 자산을 만들어 테스트할 수 있다.",
    hook: "요즘 댓글에서 영크크가 보이는데 정확히 무슨 뜻인지 모르겠다면, 그 모름 자체가 밈의 연료다.",
    platform: [
      { p: "X", tip: "짧은 말장난과 패러디 문장으로 확산되기 좋아 초반 반응 체크에 적합하다." },
      { p: "릴스", tip: "오디오와 자막 반복을 맞추고, 뜻 설명보다 상황극에 끼워 넣는 편이 자연스럽다." },
      { p: "브랜드 채널", tip: "브랜드 톤이 가벼운 경우에만 밈 레퍼런스로 쓰고, 공식 공지문에는 사용하지 않는다." },
    ],
    caution: "늦게 쓰면 아저씨 밈처럼 보인다. 타깃 커뮤니티에서 이미 피로감이 생겼는지 먼저 확인해야 한다.",
    sources: [
      { type: "trend", label: "Careet: 요즘 SNS에서 뜨는 밈 모음", url: "https://www.careet.net/1905" },
    ],
    publishedAt: "오늘 10:12",
    audience: "10대 후반-20대 초반",
    audienceDetail: [{ label: "10대", value: "44%" }, { label: "20대", value: "38%" }, { label: "X/릴스", value: "76%" }],
    related: {
      keywords: ["영크크", "영크리에이터크루", "난해한 가사 밈", "소리 밈"],
      hashtags: ["#영크크", "#요즘밈", "#Z세대밈", "#릴스밈"],
      places: ["X", "인스타 릴스", "아이돌 팬덤 계정", "밈 큐레이션 계정"],
    },
    verdict: "가벼운 브랜드라면 반응형 콘텐츠로만 테스트. 장기 캠페인 키워드로는 부적합.",
    risk: "중간",
  },
  {
    id: "c03",
    title: "빅나티 vs 스윙스, 디스전보다 더 뜨거운 건 댓글 판정이었다",
    category: "밈/커뮤니티",
    timing: "yellow",
    score: 8.2,
    velocity: "+57%",
    rank: 3,
    keyword: "빅나티 스윙스",
    cover: { hue: 12, sat: 82, lum: 58, label: "DISS\nBATTLE" },
    what: "빅나티와 스윙스의 공방은 디스곡, 라이브 해명, 주변 인물 반응, 커뮤니티 판정이 엮이며 음악 이슈를 넘어 실시간 해석 콘텐츠가 됐다.",
    why: "요즘 엔터 이슈는 사건 자체보다 누가 더 설득력 있게 해명했는지, 어떤 짤과 클립이 남았는지, 커뮤니티가 어떻게 판정했는지가 확산을 만든다.",
    angle: "브랜드 입장에서는 직접 탑승보다 이슈 소비 구조를 읽는 사례로 적합하다. 라이브 해명, 증거 제시, 팬덤 여론 대응의 속도가 핵심이다.",
    hook: "디스곡보다 더 빨리 퍼진 건 댓글의 판정이었다. 빅나티와 스윙스 이슈는 지금 엔터 논란이 소비되는 방식을 보여준다.",
    platform: [
      { p: "X", tip: "타임라인 요약, 주요 발언 캡처, 커뮤니티 반응이 가장 빠르게 재가공된다." },
      { p: "유튜브 쇼츠", tip: "라이브 해명 클립과 반응 영상이 2차 확산을 만든다." },
      { p: "브랜드 채널", tip: "직접 패러디는 피하고 위기 커뮤니케이션 분석 콘텐츠로만 다루는 편이 안전하다." },
    ],
    caution: "폭행, 계약, 사적 관계 의혹이 섞인 이슈라 브랜드 밈화는 위험하다. 당사자 비방이나 사실 단정은 피해야 한다.",
    sources: [
      { type: "news", label: "파이낸셜뉴스: 빅나티 디스곡에 스윙스 반박", url: "https://www.fnnews.com/ampNews/202604161631236910" },
      { type: "news", label: "SBS연예뉴스: 빅나티 2차 저격", url: "https://ent.sbs.co.kr/news/article.do?article_id=E10010315730" },
    ],
    publishedAt: "오늘 10:06",
    audience: "20대 남성",
    audienceDetail: [{ label: "20대", value: "46%" }, { label: "남성", value: "61%" }, { label: "커뮤니티", value: "82%" }],
    related: {
      keywords: ["빅나티", "스윙스", "힙합 디스전", "라이브 해명"],
      hashtags: ["#빅나티", "#스윙스", "#힙합이슈", "#디스전"],
      places: ["힙합 커뮤니티", "X", "유튜브 쇼츠", "연예 뉴스"],
    },
    verdict: "콘텐츠 소재보다 위기 대응 케이스 스터디로 적합.",
    risk: "높음",
  },
  {
    id: "c04",
    title: "삼전이냐 하닉이냐, HBM 이슈가 왜 다들 입에 오를까?",
    category: "비즈/테크",
    timing: "green",
    score: 8.9,
    velocity: "+68%",
    rank: 4,
    keyword: "삼전 하닉 HBM",
    cover: { hue: 226, sat: 72, lum: 56, label: "HBM\nRALLY" },
    what: "AI 반도체 수요와 HBM 경쟁이 삼성전자와 SK하이닉스 주가 담론을 다시 키우며, 투자 뉴스가 커뮤니티 밈과 생활 대화로 번지는 중이다.",
    why: "AI 인프라가 거대한 성장 내러티브가 되면서 개인투자자도 기술 격차, 목표주가, 외국인 수급을 짧은 밈과 댓글로 소비한다.",
    angle: "금융, 테크, 교육, 커리어 브랜드는 어려운 산업 뉴스를 쉬운 그래픽과 밈 코드로 번역해 정보형 콘텐츠를 만들 수 있다.",
    hook: "삼전이냐 하닉이냐의 문제는 이제 주식 게시판만의 이야기가 아니다. AI 시대를 대중이 이해하는 가장 쉬운 밈이 됐다.",
    platform: [
      { p: "블로그", tip: "HBM, 엔비디아, 목표주가 같은 키워드를 초보자용 구조도로 풀면 검색 유입이 좋다." },
      { p: "릴스", tip: "삼전파와 하닉파를 캐릭터화하되 투자 권유처럼 보이지 않게 정보형 톤을 유지한다." },
      { p: "브랜드 채널", tip: "테크 리터러시 콘텐츠나 직무 교육 콘텐츠로 연결하면 전문성이 살아난다." },
    ],
    caution: "투자 조언으로 보이면 위험하다. 수익률 단정, 매수/매도 유도, 과장된 목표가는 피해야 한다.",
    sources: [
      { type: "news", label: "글로벌이코노믹: SK증권 목표주가 상향", url: "https://www.g-enews.com/article/Securities/2026/05/202605071704078737df2f5bc1bc_1" },
    ],
    publishedAt: "오늘 09:58",
    audience: "20-40대 직장인",
    audienceDetail: [{ label: "30대", value: "35%" }, { label: "남성", value: "58%" }, { label: "검색", value: "73%" }],
    related: {
      keywords: ["삼성전자", "SK하이닉스", "HBM", "AI 반도체"],
      hashtags: ["#삼전", "#하닉", "#HBM", "#국장"],
      places: ["증권 커뮤니티", "네이버 뉴스", "경제 유튜브", "직장인 단톡"],
    },
    verdict: "정보형 콘텐츠 가치 높음. 단, 투자 권유로 오해되지 않게 선 긋기 필요.",
    risk: "중간",
  },
  {
    id: "c05",
    title: "스타벅스 탱크데이 논란, 할인 이벤트가 왜 사과문이 됐나?",
    category: "브랜드 이슈",
    timing: "red",
    score: 9.1,
    velocity: "+128%",
    rank: 5,
    keyword: "스타벅스 탱크데이",
    cover: { hue: 156, sat: 58, lum: 45, label: "BRAND\nRISK" },
    what: "스타벅스가 5.18 민주화운동 기념일에 탱크데이 이벤트를 진행했다가 비판을 받고 중단 및 사과로 이어진 브랜드 리스크 이슈다.",
    why: "프로모션 문구와 날짜가 사회적 기억과 충돌하면, 할인 이벤트도 정치·역사 감수성 문제로 즉시 전환된다. 캘린더 검수의 중요성이 다시 드러났다.",
    angle: "마케터에게는 캠페인 출시 전 날짜, 단어, 이미지, 내부 승인 프로세스를 점검해야 하는 대표 사례다.",
    hook: "할인 행사가 왜 사과문으로 끝났을까. 스타벅스 탱크데이 논란은 브랜드 캘린더 검수가 얼마나 중요한지 보여준다.",
    platform: [
      { p: "브랜드 채널", tip: "사과문은 빠르게, 변명보다 중단 조치와 재발 방지 프로세스를 먼저 말해야 한다." },
      { p: "X", tip: "비판 확산이 빠른 채널이라 초기 키워드 모니터링과 오해 지점 정리가 필요하다." },
      { p: "내부 체크", tip: "기념일, 재난, 역사 사건, 사회 갈등 키워드를 프로모션 캘린더와 자동 대조한다." },
    ],
    caution: "밈화하거나 가볍게 다루면 2차 비판을 부를 수 있다. 분석 콘텐츠도 피해 맥락을 존중해야 한다.",
    sources: [
      { type: "news", label: "YTN: 5.18 탱크데이 행사 논란", url: "https://m.ytn.co.kr/news_view.php?key=202605181519254664&s_mcd=0134" },
      { type: "news", label: "국제신문: 스타벅스 행사 중단 및 사과", url: "https://www.kookje.co.kr/news2011/asp/newsbody.asp?code=0200&key=20260518.99099004695" },
    ],
    publishedAt: "오늘 09:50",
    audience: "전 연령 뉴스 소비자",
    audienceDetail: [{ label: "30대+", value: "54%" }, { label: "뉴스", value: "88%" }, { label: "브랜드 관심", value: "79%" }],
    related: {
      keywords: ["스타벅스", "탱크데이", "브랜드 리스크", "5.18"],
      hashtags: ["#스타벅스", "#탱크데이", "#브랜드리스크", "#마케팅실수"],
      places: ["뉴스", "X", "직장인 커뮤니티", "마케팅 단톡"],
    },
    verdict: "탑승 금지. 대신 브랜드 리스크 교육/체크리스트 콘텐츠로 활용.",
    risk: "높음",
  },
  {
    id: "c06",
    title: "불닭은 어떻게 세계인의 레시피 놀이가 됐을까?",
    category: "브랜드 이슈",
    timing: "green",
    score: 8.5,
    velocity: "+61%",
    rank: 6,
    keyword: "불닭 현지화",
    cover: { hue: 6, sat: 88, lum: 56, label: "BULDAK\nGLOBAL" },
    what: "불닭은 매운맛 챌린지를 넘어 지역별 입맛, 소비자 레시피, 협업 메뉴로 확장되며 K푸드 브랜드의 글로벌 현지화 사례가 됐다.",
    why: "소비자가 먼저 조합하고 먹는 법을 만들면 브랜드는 그 데이터를 상품화할 수 있다. 챌린지가 제품 개발의 리서치 채널이 되는 구조다.",
    angle: "식품 브랜드는 댓글 레시피, 해외 소비자 조합, 로컬 식재료를 관찰해 한정판이나 협업 메뉴로 빠르게 검증할 수 있다.",
    hook: "불닭은 이제 라면 하나가 아니라 세계 각지 소비자가 자기 방식으로 변주하는 매운맛 플랫폼에 가깝다.",
    platform: [
      { p: "틱톡", tip: "현지 소비자의 조합 레시피를 리액션/듀엣 포맷으로 다시 확산시킨다." },
      { p: "유튜브 쇼츠", tip: "매운맛 챌린지는 짧고 직관적이지만 안전 안내와 과장 방지가 필요하다." },
      { p: "브랜드 채널", tip: "소비자 레시피를 공식 큐레이션하면 커뮤니티 참여감이 커진다." },
    ],
    caution: "매운맛 도전은 건강 리스크와 과소비 논란이 붙을 수 있다. 강요형 챌린지로 보이지 않게 해야 한다.",
    sources: [
      { type: "news", label: "파이낸셜뉴스: 삼양식품 현지화 제품 전략", url: "https://news.nate.com/view/20260507n29903" },
      { type: "news", label: "파이낸셜뉴스: 불닭 40초 챌린지 해외 열풍", url: "https://www.fnnews.com/news/202511070159568307" },
    ],
    publishedAt: "오늘 09:43",
    audience: "10-30대 글로벌 K푸드 소비자",
    audienceDetail: [{ label: "20대", value: "42%" }, { label: "해외", value: "64%" }, { label: "틱톡", value: "81%" }],
    related: {
      keywords: ["불닭", "K푸드", "매운맛 챌린지", "현지화 제품"],
      hashtags: ["#불닭", "#Buldak", "#Kfood", "#매운맛챌린지"],
      places: ["틱톡", "유튜브 쇼츠", "해외 마트", "푸드 커뮤니티"],
    },
    verdict: "글로벌 식품/외식 브랜드라면 참고 가치 높음.",
    risk: "중간",
  },
  {
    id: "c07",
    title: "요즘 2030이 야구장에 모이는 이유, 브랜드가 봐야 할 KBO 팬덤",
    category: "팬덤/IP",
    timing: "green",
    score: 8.3,
    velocity: "+49%",
    rank: 7,
    keyword: "KBO 팬덤 마케팅",
    cover: { hue: 34, sat: 82, lum: 61, label: "KBO\nFANDOM" },
    what: "KBO 팬덤이 경기 관람을 넘어 굿즈, 응원 문화, 먹거리, 패션, 지역 방문까지 연결되며 브랜드 협업 지면으로 커지고 있다.",
    why: "스포츠 팬덤은 반복 방문, 팀 정체성, 인증 소비가 강하다. 브랜드는 단발 노출보다 팬의 루틴 안에 들어갈 수 있다.",
    angle: "식음료, 패션, 금융, 모빌리티 브랜드는 팀 컬러, 직관 루틴, 응원템을 활용해 시즌형 캠페인을 만들 수 있다.",
    hook: "야구장은 이제 광고판만 보는 공간이 아니다. 팬의 하루 전체가 브랜드 접점이 되는 마케팅 필드다.",
    platform: [
      { p: "릴스", tip: "직관 준비물, 응원가, 경기장 먹거리 루틴을 짧은 체크리스트로 묶는다." },
      { p: "브랜드 채널", tip: "팀별 컬러와 팬덤 언어를 존중하는 한정판이 반응을 만든다." },
      { p: "오프라인", tip: "경기 전후 동선에 맞춘 팝업, 쿠폰, 포토존이 방문 명분을 만든다." },
    ],
    caution: "팀 팬덤을 얕게 이해하면 바로 외면받는다. 라이벌 구도와 팬덤 금기를 먼저 확인해야 한다.",
    sources: [
      { type: "report", label: "OpenAds 2026년 5월 미디어&마켓 리포트", url: "https://www.openads.co.kr/content/contentDetail?contsId=19359" },
    ],
    publishedAt: "오늘 09:36",
    audience: "20-30대 스포츠 팬",
    audienceDetail: [{ label: "20대", value: "39%" }, { label: "남성", value: "57%" }, { label: "현장 방문", value: "62%" }],
    related: {
      keywords: ["KBO", "직관", "야구 팬덤", "스포츠 마케팅"],
      hashtags: ["#KBO", "#직관", "#야구팬", "#팬덤마케팅"],
      places: ["야구장", "인스타 릴스", "팀 커뮤니티", "굿즈샵"],
    },
    verdict: "시즌형 캠페인으로 좋음. 팬덤 문법 검수 필수.",
    risk: "낮음",
  },
  {
    id: "c08",
    title: "주말마다 산으로 떠나는 2030, 산트립은 왜 뜰까?",
    category: "라이프스타일",
    timing: "green",
    score: 7.9,
    velocity: "+44%",
    rank: 8,
    keyword: "산트립",
    cover: { hue: 126, sat: 62, lum: 52, label: "SAN\nTRIP" },
    what: "산트립은 등산과 여행을 결합한 흐름으로, 산을 오르는 행위보다 근교 이동, 숙소, 맛집, 인증샷까지 포함한 주말 경험으로 소비된다.",
    why: "건강, 자연, 짧은 여행, 인증 욕구가 한 번에 맞물린다. 장거리 여행 부담은 낮추고 주말 성취감은 크게 느끼는 포맷이다.",
    angle: "아웃도어, 숙박, 로컬 F&B, 모빌리티 브랜드가 등산 코스 전후의 루틴을 묶어 패키지 콘텐츠로 만들 수 있다.",
    hook: "요즘 등산은 산만 오르는 게 아니다. 코스, 카페, 숙소, 인증샷까지 묶인 주말 산트립으로 소비된다.",
    platform: [
      { p: "블로그", tip: "교통, 난이도, 맛집, 준비물을 한 번에 정리하면 검색형 콘텐츠로 강하다." },
      { p: "릴스", tip: "정상 컷보다 출발-간식-뷰-하산 후 맛집까지 루틴을 빠르게 보여준다." },
      { p: "브랜드 채널", tip: "초보자용 코스와 장비 체크리스트를 제공하면 진입 장벽을 낮춘다." },
    ],
    caution: "과도한 핫플화는 환경 훼손, 쓰레기, 안전 문제로 이어질 수 있다. 책임 있는 여행 메시지가 필요하다.",
    sources: [
      { type: "report", label: "OpenAds 2026년 5월 미디어&마켓 리포트", url: "https://www.openads.co.kr/content/contentDetail?contsId=19359" },
    ],
    publishedAt: "오늘 09:29",
    audience: "20-30대 주말 여행층",
    audienceDetail: [{ label: "20-30대", value: "64%" }, { label: "여성", value: "55%" }, { label: "검색", value: "69%" }],
    related: {
      keywords: ["산트립", "등산 여행", "근교 여행", "아웃도어"],
      hashtags: ["#산트립", "#등산스타그램", "#주말여행", "#근교여행"],
      places: ["네이버 검색", "인스타 릴스", "등산 커뮤니티", "로컬 맛집 계정"],
    },
    verdict: "로컬/아웃도어 브랜드에 적합. 안전 메시지와 함께 가야 함.",
    risk: "낮음",
  },
  {
    id: "c09",
    title: "AI 개인화 마케팅, 마케터 일은 진짜 어디까지 바뀔까?",
    category: "비즈/테크",
    timing: "green",
    score: 8.6,
    velocity: "+53%",
    rank: 9,
    keyword: "AI 개인화 마케팅",
    cover: { hue: 258, sat: 74, lum: 57, label: "AI\nPERSONA" },
    what: "생성형 AI는 광고 문구 자동화 수준을 넘어 고객 세그먼트별 메시지, 이미지, 추천, CRM 시나리오를 빠르게 분화시키는 도구가 되고 있다.",
    why: "고객은 더 개인화된 제안을 기대하고, 마케터는 더 적은 시간에 더 많은 실험안을 만들어야 한다. AI가 캠페인 운영 단위를 잘게 나눈다.",
    angle: "브랜드는 하나의 빅 아이디어보다 세그먼트별 훅, 소재, 랜딩 메시지를 AI로 빠르게 생성하고 성과 데이터를 다시 학습시키는 운영 체계가 필요하다.",
    hook: "AI가 마케터를 대체한다기보다, 하나의 캠페인을 수십 개 실험으로 쪼개는 속도를 바꾸고 있다.",
    platform: [
      { p: "CRM", tip: "고객 행동별 메시지 변형안을 만들고 실제 성과 기준으로 빠르게 폐기한다." },
      { p: "광고", tip: "소재를 많이 만드는 것보다 가설과 검수 기준을 먼저 정해야 품질이 유지된다." },
      { p: "브랜드 채널", tip: "AI 사용 사실과 개인정보 처리 기준을 투명하게 안내하면 신뢰 리스크를 줄인다." },
    ],
    caution: "개인정보, 저작권, 허위 과장, 브랜드 톤 붕괴가 동시에 생길 수 있다. 사람 검수 체계가 필수다.",
    sources: [
      { type: "report", label: "OpenAds 2026년 5월 미디어&마켓 리포트", url: "https://www.openads.co.kr/content/contentDetail?contsId=19359" },
    ],
    publishedAt: "오늘 09:21",
    audience: "마케터/PM/광고 실무자",
    audienceDetail: [{ label: "30대", value: "41%" }, { label: "B2B", value: "72%" }, { label: "업무툴", value: "78%" }],
    related: {
      keywords: ["생성형 AI", "개인화 마케팅", "CRM 자동화", "AI 광고 소재"],
      hashtags: ["#AI마케팅", "#개인화", "#CRM", "#마케터"],
      places: ["마케팅 리포트", "링크드인", "오픈애즈", "브랜드 실무 채널"],
    },
    verdict: "서비스 정체성과 가장 맞는 핵심 분석 주제.",
    risk: "중간",
  },
  {
    id: "c10",
    title: "공개 피드보다 DM이 편한 사람들, X챗 흐름을 어떻게 봐야 할까?",
    category: "비즈/테크",
    timing: "yellow",
    score: 7.8,
    velocity: "+38%",
    rank: 10,
    keyword: "X챗",
    cover: { hue: 214, sat: 18, lum: 34, label: "X\nCHAT" },
    what: "X의 메시지 기능 분리 흐름은 플랫폼 이용이 공개 피드 중심에서 더 닫힌 대화, 그룹, DM 기반 관계로 이동하는 신호로 볼 수 있다.",
    why: "이용자는 공개 게시의 피로와 캡처 리스크를 느끼고, 더 작은 대화방에서 정보와 밈을 공유한다. 브랜드도 공개 도달만으로는 팬덤을 붙잡기 어렵다.",
    angle: "브랜드는 댓글 수보다 저장, 공유, DM 전환, 커뮤니티 가입 같은 폐쇄형 관계 지표를 함께 봐야 한다.",
    hook: "공개 피드에서 터진 밈도 결국 단톡방과 DM에서 생명이 길어진다. X챗 이슈는 그 이동을 보여준다.",
    platform: [
      { p: "X", tip: "공개 반응과 DM 공유를 분리해 보면 콘텐츠의 진짜 확산 경로를 더 잘 볼 수 있다." },
      { p: "커뮤니티", tip: "작은 그룹 안에서 공유될 만한 템플릿, 짤, 체크리스트가 유리하다." },
      { p: "브랜드 채널", tip: "오픈채팅, 멤버십, 뉴스레터 같은 소규모 관계 채널을 같이 설계한다." },
    ],
    caution: "폐쇄형 채널은 측정이 어렵고 스팸으로 보이기 쉽다. 초대 명분과 수신 동의가 중요하다.",
    sources: [
      { type: "report", label: "OpenAds 2026년 5월 미디어&마켓 리포트", url: "https://www.openads.co.kr/content/contentDetail?contsId=19359" },
    ],
    publishedAt: "오늘 09:13",
    audience: "SNS 운영자/커뮤니티 매니저",
    audienceDetail: [{ label: "20-30대", value: "59%" }, { label: "플랫폼 관심", value: "71%" }, { label: "커뮤니티", value: "67%" }],
    related: {
      keywords: ["X챗", "DM", "폐쇄형 커뮤니티", "소셜 CRM"],
      hashtags: ["#X챗", "#DM마케팅", "#커뮤니티", "#소셜미디어"],
      places: ["X", "오픈채팅", "디스코드", "뉴스레터"],
    },
    verdict: "플랫폼 전략 관점에서 주목. 대중형 밈 소재로는 약함.",
    risk: "낮음",
  },
  {
    id: "c11",
    title: "메이플 아일랜드가 왜 난리야? 게임 IP가 현실이 되는 순간",
    category: "팬덤/IP",
    timing: "green",
    score: 8.8,
    velocity: "+73%",
    rank: 11,
    keyword: "메이플 아일랜드",
    cover: { hue: 48, sat: 88, lum: 62, label: "MAPLE\nISLAND" },
    what: "넥슨과 롯데월드가 메이플스토리 IP를 오프라인 테마파크, 어트랙션, 굿즈, F&B, NPC 알바 프로모션으로 확장한 사례다.",
    why: "팬덤은 이제 화면 속 세계관을 실제 공간에서 인증하고 싶어 한다. IP 콜라보는 굿즈 판매보다 방문 명분과 체험 동선을 만드는 쪽으로 진화한다.",
    angle: "브랜드는 캐릭터를 붙이는 수준을 넘어, 팬이 세계관 안에 들어와 미션을 수행하고 사진을 남길 수 있는 구조를 설계해야 한다.",
    hook: "메이플 아일랜드가 재밌는 이유는 캐릭터가 롯데월드에 붙어서가 아니라, 팬이 진짜 NPC를 만나는 구조를 만들었기 때문이다.",
    platform: [
      { p: "릴스", tip: "입장-퀘스트-굿즈-F&B-인증샷으로 이어지는 방문 동선을 짧게 보여준다." },
      { p: "오프라인", tip: "포토존보다 미션형 참여가 팬덤 체류 시간을 늘린다." },
      { p: "브랜드 채널", tip: "세계관을 모르는 사람도 이해할 수 있게 캐릭터와 장소의 역할을 설명한다." },
    ],
    caution: "팬덤 고증이 어긋나면 바로 지적받는다. 단순 로고 부착형 콜라보로 보이지 않게 해야 한다.",
    sources: [
      { type: "news", label: "파이낸셜뉴스: 넥슨 메이플 아일랜드 개장", url: "https://www.fnnews.com/news/202604030941014314" },
      { type: "news", label: "동아일보: 시급 100만원 NPC 알바 모집", url: "https://www.donga.com/news/Culture/article/all/20260518/133942074/1" },
    ],
    publishedAt: "오늘 09:05",
    audience: "게임 팬덤/가족 방문객",
    audienceDetail: [{ label: "20대", value: "36%" }, { label: "팬덤/IP", value: "84%" }, { label: "오프라인", value: "76%" }],
    related: {
      keywords: ["메이플 아일랜드", "롯데월드", "NPC 알바", "게임 IP 콜라보"],
      hashtags: ["#메이플아일랜드", "#롯데월드", "#NPC알바", "#IP콜라보"],
      places: ["롯데월드", "메이플 커뮤니티", "당근알바", "인스타 릴스"],
    },
    verdict: "팬덤/IP 브랜드가 반드시 봐야 할 체험형 콜라보 사례.",
    risk: "낮음",
  },
  {
    id: "c12",
    title: "햄버거보다 포켓몬 굿즈? 롯데리아 콜라보가 줄 세우는 법",
    category: "팬덤/IP",
    timing: "yellow",
    score: 8.1,
    velocity: "+46%",
    rank: 12,
    keyword: "롯데리아 포켓몬 굿즈",
    cover: { hue: 52, sat: 92, lum: 66, label: "POKEMON\nGOODS" },
    what: "롯데리아와 포켓몬 굿즈 이슈는 캐릭터 IP가 메뉴 구매, 매장 방문, 인증샷, 품절 대화를 한 번에 만드는 전형적인 콜라보 사례다.",
    why: "캐릭터 굿즈는 제품의 기능보다 수집 욕구와 팬덤 소속감을 자극한다. 품절과 재입고 대화가 자연스럽게 2차 바이럴을 만든다.",
    angle: "외식 브랜드는 메뉴보다 굿즈 획득 동선, 매장 방문 인증, 친구와 교환하는 행위를 캠페인 중심에 둘 수 있다.",
    hook: "햄버거를 먹으러 간 걸까, 포켓몬 굿즈를 가지러 간 걸까. 요즘 캐릭터 콜라보는 구매 이유를 바꾼다.",
    platform: [
      { p: "릴스", tip: "실물 굿즈 언박싱과 매장별 재고 반응을 빠르게 보여주면 댓글이 붙는다." },
      { p: "커뮤니티", tip: "재고 공유, 교환, 인증 글이 자연 확산의 핵심이다." },
      { p: "브랜드 채널", tip: "품절 정보를 투명하게 관리하지 않으면 방문 불만이 커진다." },
    ],
    caution: "수량 부족, 리셀, 어린이 타깃 과소비 논란을 조심해야 한다. 재고 공지가 캠페인 신뢰를 좌우한다.",
    sources: [
      { type: "trend", label: "Careet: 이주의 유행템 7", url: "https://www.careet.net/1902" },
    ],
    publishedAt: "오늘 08:58",
    audience: "10-30대 캐릭터 팬",
    audienceDetail: [{ label: "10-20대", value: "61%" }, { label: "팬덤", value: "79%" }, { label: "매장 방문", value: "72%" }],
    related: {
      keywords: ["롯데리아 포켓몬", "캐릭터 굿즈", "IP 콜라보", "품절 대란"],
      hashtags: ["#롯데리아", "#포켓몬", "#굿즈대란", "#캐릭터콜라보"],
      places: ["매장", "X", "맘카페", "인스타 스토리"],
    },
    verdict: "방문 유도에는 강하지만 재고/리셀 관리가 핵심.",
    risk: "중간",
  },
];

const MARKETER_ARTICLES = {
  c01: {
    title: "셋로그 챌린지, 마케터는 도대체 어떻게 써먹어야 할까?",
    lead: "요즘 릴스에서 화면이 여러 칸으로 쪼개지고, 친구들이 같은 시간대의 하루를 동시에 보여주는 영상을 봤다면 그냥 브이로그로 넘기면 안 된다. 셋로그는 Z세대가 친밀감을 기록하는 방식이자, 브랜드가 사람 냄새를 보여줄 수 있는 꽤 좋은 실험 포맷이다.",
    readMinutes: 6,
    views: 878,
    sections: [
      {
        title: "셋로그, 그래서 도대체 뭔데?",
        paragraphs: [
          "셋로그는 친구들이 각자 자기 하루를 짧게 찍고, 그 조각을 시간대별로 모아 하나의 분할 화면 영상처럼 보여주는 포맷이다. 핵심은 잘 꾸민 브이로그가 아니라 같은 시간에 서로 다른 사람들이 무엇을 하고 있었는지를 보는 데 있다.",
          "예전 브이로그가 한 사람의 하루를 따라가는 방식이었다면, 셋로그는 여러 사람의 하루를 동시에 펼쳐 놓는다. 누군가는 학교에 가고, 누군가는 출근하고, 누군가는 밥을 먹고, 누군가는 침대에 누워 있다. 별일 없는 장면이지만 같이 놓이면 관계와 성격이 보인다.",
          "그래서 셋로그는 영상 퀄리티보다 조합이 중요하다. 화려한 편집, 좋은 카메라, 완벽한 동선보다 '이 사람들이 왜 같이 묶였는지'가 더 큰 재미를 만든다."
        ]
      },
      {
        title: "왜 지금 셋로그가 반응을 얻을까?",
        paragraphs: [
          "첫 번째 이유는 공개 피드 피로감이다. 모두에게 보여주는 완성된 일상보다, 가까운 사람끼리만 공유하는 덜 정돈된 일상이 더 편하게 느껴진다. 셋로그는 과시보다 관계의 온도에 가깝다.",
          "두 번째 이유는 '따로 있지만 같이 있다'는 감각이다. 같은 공간에 있지 않아도 같은 시간대를 공유하면 연결되어 있다는 느낌이 생긴다. Z세대에게 이 감각은 단순한 기록이 아니라 친구 사이의 놀이가 된다.",
          "세 번째 이유는 비교가 아니라 발견이다. 같은 오후 3시라도 누군가는 야근 준비를 하고, 누군가는 카페에서 과제를 하고, 누군가는 아무것도 안 한다. 서로의 평범한 차이가 캐릭터처럼 보이기 시작한다."
        ]
      },
      {
        title: "이 포맷이 퍼지기 쉬운 이유",
        paragraphs: [
          "셋로그는 만들기가 쉽다. 한 사람이 모든 장면을 기획하지 않아도 되고, 각자 2초씩 찍은 조각만 모아도 영상이 된다. 참여 난이도가 낮기 때문에 친구에게 바로 '우리도 이거 하자'고 말하기 좋다.",
          "보는 입장에서도 이해가 빠르다. 화면이 나뉘어 있고, 시간대가 지나가고, 사람마다 다른 장면이 들어온다. 설명을 길게 붙이지 않아도 포맷 자체가 내용을 설명한다.",
          "무엇보다 공유를 부른다. 셋로그는 보는 순간 혼자 감상하고 끝나는 콘텐츠가 아니라, 같이 찍을 사람을 떠올리게 만든다. 이 지점이 마케터가 봐야 할 핵심이다."
        ]
      },
      {
        title: "브랜드는 어떻게 활용할 수 있을까?",
        paragraphs: [
          "가장 쉬운 방식은 직원 셋로그다. 신제품 출시 전날 마케터, 개발자, CS 담당자, 매장 스태프의 하루를 같은 시간대별로 묶으면 제품보다 브랜드 뒤의 사람이 먼저 보인다.",
          "두 번째는 팬 셋로그다. 브랜드가 직접 자기 이야기를 하는 대신, 소비자가 제품을 쓰는 순간을 모아 하나의 하루로 보여주는 방식이다. 같은 제품이어도 사람마다 쓰는 맥락이 달라지기 때문에 활용 장면이 자연스럽게 넓어진다.",
          "캐릭터나 IP가 있는 브랜드라면 세계관 셋로그도 가능하다. 열정적인 캐릭터, 게으른 캐릭터, 먹는 걸 좋아하는 캐릭터가 같은 시간에 각자 무엇을 하는지 보여주면 설정 설명 없이 성격이 전달된다."
        ],
        points: [
          { label: "B2B 브랜드", text: "직군별 하루를 묶어 딱딱한 조직 이미지를 낮춘다." },
          { label: "F&B 브랜드", text: "아침, 점심, 야식처럼 시간대별 제품 사용 장면을 모은다." },
          { label: "IP 브랜드", text: "캐릭터별 일상을 병렬로 보여줘 세계관을 가볍게 확장한다." }
        ]
      },
      {
        title: "브랜드 신호등",
        paragraphs: [
          "셋로그는 기본적으로 초록불에 가깝다. 혐오나 갈등 이슈가 아니라 관계와 일상을 다루는 포맷이기 때문이다. 다만 회사가 직원에게 억지로 시킨 티가 나면 바로 광고처럼 보인다.",
          "마케터가 기억해야 할 건 포맷보다 자발성이다. 셋로그의 매력은 완벽하게 짜인 그림이 아니라, 조금 어설퍼도 진짜 사람의 하루처럼 보이는 순간에서 나온다."
        ],
        callout: "한 줄 정리: 셋로그는 브랜드가 제품을 설명하기 전에, 브랜드 뒤에 있는 사람과 관계를 먼저 보여줄 수 있는 포맷이다."
      }
    ]
  },
  c02: {
    title: "영크크, 뜻보다 먼저 퍼지는 소리 밈을 브랜드가 써도 될까?",
    lead: "영크크는 설명하기 전에 이미 입에 붙는 타입의 밈이다. 뜻을 알아야 쓰는 말이 아니라, 이상하게 들리는데 따라 하고 싶어서 퍼지는 말에 가깝다.",
    readMinutes: 5,
    views: 642,
    sections: [
      {
        title: "영크크, 이게 도대체 뭔데?",
        paragraphs: [
          "영크크는 코르티스의 YOUNGCREATORCREW에서 나온 표현이 짧게 줄고, 다시 댓글과 숏폼에서 밈처럼 굴러다니며 커진 흐름이다. 중요한 건 원래 뜻보다 어감이다.",
          "Z세대 밈 중에는 정확한 의미보다 소리, 리듬, 낯섦이 먼저 움직이는 것들이 많다. 영크크도 그런 계열에 가깝다. 누군가 설명하면 오히려 힘이 빠지고, 아무렇지 않게 던졌을 때 더 웃긴다."
        ]
      },
      {
        title: "왜 이런 밈이 계속 나올까?",
        paragraphs: [
          "요즘 밈은 모두가 이해하는 농담보다, 아는 사람끼리만 알아듣는 신호에 가까워지고 있다. 의미가 조금 비어 있을수록 각자 상황에 끼워 넣기 쉽고, 그 빈틈이 댓글 놀이를 만든다.",
          "또 짧은 소리 밈은 영상에 붙기 좋다. 길게 설명할 필요 없이 자막 한 줄, 표정 하나, 반복되는 음절만으로도 분위기를 만들 수 있다."
        ]
      },
      {
        title: "마케터가 봐야 할 포인트",
        paragraphs: [
          "영크크를 그대로 쓰는 것보다 중요한 건 '브랜드도 자기만의 소리 자산을 가질 수 있느냐'다. 제품명, 캠페인명, 사내 별명, 멤버십 이름이 짧고 반복하기 쉬우면 밈처럼 움직일 가능성이 생긴다.",
          "다만 밈은 수명이 짧다. 내부 승인받고 배포할 때쯤 이미 식어 있을 수 있다. 그래서 이런 소재는 큰 캠페인보다 빠른 반응형 콘텐츠에 맞다."
        ],
        points: [
          { label: "좋은 사용처", text: "댓글형 콘텐츠, 릴스 자막, 팬덤 대상 가벼운 리액션." },
          { label: "나쁜 사용처", text: "공식 사과문, 제품 상세 페이지, 장기 브랜드 슬로건." }
        ]
      },
      {
        title: "브랜드 신호등",
        paragraphs: [
          "영크크는 노란불이다. 잘 쓰면 젊은 감각처럼 보이지만, 늦게 쓰거나 설명을 붙이면 바로 어색해진다.",
          "브랜드가 이 밈에 탑승하려면 먼저 타깃 커뮤니티에서 아직 살아 있는지 확인해야 한다. 밈은 유행어가 아니라 타이밍 게임이다."
        ],
        callout: "한 줄 정리: 영크크는 베껴 쓰는 단어가 아니라, 짧고 이상하고 따라 하기 쉬운 말이 어떻게 퍼지는지 보여주는 사례다."
      }
    ]
  },
  c03: {
    title: "빅나티 vs 스윙스, 디스전보다 빠르게 퍼진 건 커뮤니티의 판정이었다",
    lead: "힙합 디스전은 이제 음악 안에서만 끝나지 않는다. 곡, 라이브 해명, 댓글 캡처, 커뮤니티 판정이 동시에 움직이면서 하나의 실시간 콘텐츠가 된다.",
    readMinutes: 6,
    views: 731,
    sections: [
      {
        title: "이슈는 어떻게 커졌나",
        paragraphs: [
          "빅나티와 스윙스의 공방은 디스곡 하나로만 소비되지 않았다. 누가 먼저 말했는지, 누가 더 세게 반박했는지, 주변 인물은 어떻게 반응했는지까지 모두가 콘텐츠가 됐다.",
          "요즘 엔터 이슈는 원본보다 해석본이 더 빠르게 돈다. 긴 라이브 방송은 짧은 클립으로 잘리고, 커뮤니티는 타임라인을 정리하고, 댓글은 승패를 판정한다."
        ]
      },
      {
        title: "왜 사람들은 이런 이슈를 계속 볼까?",
        paragraphs: [
          "첫 번째는 실시간 재판을 보는 감각이다. 사람들은 단순히 음악을 듣는 게 아니라 누가 더 논리적인지, 누가 더 감정적인지, 누가 여론을 가져가는지를 본다.",
          "두 번째는 커뮤니티 참여감이다. 누군가 요약을 올리면 댓글에서 다시 판정이 붙고, 그 댓글이 또 다른 콘텐츠가 된다. 사건은 하나인데 소비 방식은 계속 늘어난다."
        ]
      },
      {
        title: "브랜드가 배울 점",
        paragraphs: [
          "이 이슈는 브랜드가 따라 할 소재라기보다 위기 커뮤니케이션을 배울 사례에 가깝다. 논란이 생기면 공식 입장만으로 끝나지 않는다. 클립, 댓글, 커뮤니티 요약이 브랜드의 실제 이미지를 만든다.",
          "따라서 브랜드는 빠른 사실 정리, 감정선 관리, 짧게 잘릴 수 있는 발언까지 생각해야 한다. 긴 해명도 결국 10초짜리 클립으로 소비된다."
        ],
        points: [
          { label: "관찰 포인트", text: "원본보다 어떤 요약본이 퍼지는지 확인한다." },
          { label: "실무 포인트", text: "위기 대응 문장은 캡처되어도 오해가 적게 쓰여야 한다." }
        ]
      },
      {
        title: "브랜드 신호등",
        paragraphs: [
          "이 이슈는 빨간불이다. 브랜드가 밈처럼 얹기에는 당사자 갈등과 사적 맥락이 복잡하다. 가볍게 패러디하면 재미보다 무례함이 먼저 읽힐 수 있다.",
          "대신 마케터라면 이슈 확산 구조를 분석하는 데 써야 한다. 사람들이 논란을 어떻게 요약하고 판정하고 재배포하는지를 보면, 위기 대응의 현실이 보인다."
        ],
        callout: "한 줄 정리: 빅나티 vs 스윙스 이슈는 콘텐츠 소재보다 커뮤니티 여론이 논란을 어떻게 편집하는지 보여주는 케이스다."
      }
    ]
  },
  c04: {
    title: "삼전 vs 하닉, HBM 주가 이슈는 왜 국장 밈이 됐을까?",
    lead: "AI 반도체, HBM, 목표주가 같은 말은 어렵지만 사람들은 이 이슈를 밈처럼 소비한다. 이유는 간단하다. 내 돈, 내 회사, 내 미래와 연결되는 이야기이기 때문이다.",
    readMinutes: 6,
    views: 813,
    sections: [
      {
        title: "HBM 이슈, 왜 갑자기 대중 대화가 됐나",
        paragraphs: [
          "HBM은 AI 반도체 성능과 연결되는 핵심 부품으로 주목받고 있다. 이 흐름에서 삼성전자와 SK하이닉스가 비교되며 주가 담론도 커졌다.",
          "예전에는 증권 기사 안에서 끝났을 말들이 이제는 커뮤니티와 직장인 단톡방으로 내려온다. '삼전이냐 하닉이냐'는 단순한 종목 비교를 넘어 AI 시대에 누가 앞서느냐는 이야기로 바뀐다."
        ]
      },
      {
        title: "왜 밈처럼 퍼질까?",
        paragraphs: [
          "개인투자자는 어려운 기술을 완벽히 이해하지 못해도 흐름을 놓치고 싶어 하지 않는다. 그래서 복잡한 산업 뉴스가 짧은 말, 캐릭터, 진영 농담으로 바뀐다.",
          "또 주식 이슈는 감정이 강하다. 기대, 후회, 불안, 자조가 섞이기 때문에 댓글화가 쉽다. 숫자는 차갑지만 사람들의 반응은 뜨겁다."
        ]
      },
      {
        title: "마케터는 어떻게 다뤄야 할까?",
        paragraphs: [
          "금융, 테크, 교육 브랜드라면 HBM 이슈를 정보형 콘텐츠로 풀 수 있다. 어려운 용어를 쉬운 구조도로 설명하고, 산업 흐름을 직무나 생활 언어로 번역하는 방식이다.",
          "다만 투자 권유처럼 보이면 안 된다. 특정 종목의 상승을 단정하거나 매수 타이밍처럼 말하는 순간 콘텐츠가 위험해진다."
        ],
        points: [
          { label: "좋은 각도", text: "HBM이 왜 AI 인프라와 연결되는지 설명한다." },
          { label: "피해야 할 각도", text: "수익률, 매수 추천, 목표가 단정으로 소비자를 자극한다." }
        ]
      },
      {
        title: "브랜드 신호등",
        paragraphs: [
          "이 이슈는 노란불이다. 정보형 콘텐츠로는 가치가 높지만, 투자 조언처럼 보이는 순간 리스크가 커진다.",
          "마케터의 역할은 종목을 찍어주는 것이 아니라 사람들이 왜 이 이슈에 감정적으로 반응하는지 설명해 주는 것이다."
        ],
        callout: "한 줄 정리: 삼전 vs 하닉 담론은 AI 시대를 대중이 가장 쉽게 체감하는 경제 밈이다."
      }
    ]
  },
  c05: {
    title: "스타벅스 탱크데이 논란, 브랜드 캘린더는 왜 사고가 될까?",
    lead: "프로모션은 할인율만으로 판단되지 않는다. 날짜와 단어가 사회적 기억과 부딪히면, 혜택은 순식간에 브랜드 감수성 이슈가 된다.",
    readMinutes: 6,
    views: 904,
    sections: [
      {
        title: "무슨 일이 있었나",
        paragraphs: [
          "스타벅스 탱크데이 논란은 특정 기념일의 사회적 맥락과 프로모션 이름이 충돌하면서 커졌다. 브랜드 입장에서는 행사였지만, 소비자 입장에서는 날짜와 단어가 먼저 보였다.",
          "이런 이슈는 제품 품질 문제가 아니다. 브랜드가 사회적 맥락을 얼마나 세심하게 읽는지에 대한 평가로 옮겨 간다."
        ]
      },
      {
        title: "왜 소비자는 강하게 반응했을까?",
        paragraphs: [
          "소비자는 브랜드가 모든 역사적 맥락을 완벽히 알기를 기대하는 것이 아니다. 다만 큰 기념일과 민감한 단어가 만났을 때 최소한의 검수는 했어야 한다고 느낀다.",
          "특히 대형 브랜드일수록 실수는 개인의 실수가 아니라 조직의 태도로 읽힌다. '몰랐다'는 말이 충분한 해명이 되기 어렵다."
        ]
      },
      {
        title: "마케터가 반드시 배워야 할 것",
        paragraphs: [
          "캠페인 캘린더에는 출시일과 할인 기간만 있으면 안 된다. 국가기념일, 재난일, 역사적 사건, 사회 갈등 키워드가 함께 표시되어야 한다.",
          "문구 검수도 중요하다. 단어 하나가 다른 날짜와 만나면 완전히 다른 의미가 될 수 있다. 특히 군사, 재난, 혐오, 지역, 젠더와 연결될 수 있는 단어는 별도 체크가 필요하다."
        ],
        points: [
          { label: "사전 검수", text: "날짜, 키워드, 이미지, 해시태그를 함께 본다." },
          { label: "사후 대응", text: "해명보다 중단 조치와 재발 방지 약속이 먼저다." }
        ]
      },
      {
        title: "브랜드 신호등",
        paragraphs: [
          "이 이슈는 빨간불이다. 브랜드가 유머로 소비하거나 패러디할 소재가 아니다. 실무 체크리스트와 리스크 교육 사례로 다루는 것이 안전하다.",
          "마케터에게 중요한 건 '우리도 조심하자'에서 끝내지 않는 것이다. 캘린더 검수 프로세스를 실제 업무 안에 넣어야 같은 사고를 막을 수 있다."
        ],
        callout: "한 줄 정리: 브랜드 캘린더에는 날짜가 아니라 맥락이 들어 있어야 한다."
      }
    ]
  },
  c06: {
    title: "불닭 글로벌 현지화, 소비자 레시피가 상품이 되는 시대",
    lead: "불닭은 더 이상 매운 라면 하나로만 설명되지 않는다. 세계 곳곳의 소비자가 자기 방식으로 섞고, 먹고, 올리면서 브랜드가 다시 배울 만한 데이터가 쌓이고 있다.",
    readMinutes: 5,
    views: 756,
    sections: [
      {
        title: "불닭은 어떻게 글로벌 놀이가 됐나",
        paragraphs: [
          "불닭은 매운맛 챌린지로 주목받았지만, 지금은 챌린지를 넘어 현지 소비자의 레시피와 조합으로 확장되고 있다. 치즈를 넣고, 우유를 섞고, 현지 재료와 합치면서 제품이 하나의 베이스가 된다.",
          "브랜드가 모든 사용법을 정해 준 것이 아니라 소비자가 먼저 먹는 법을 만들었다는 점이 중요하다."
        ]
      },
      {
        title: "왜 사람들은 자기만의 레시피를 올릴까?",
        paragraphs: [
          "매운맛은 반응이 즉각적이다. 표정, 실패, 성공, 참는 장면이 모두 콘텐츠가 된다. 여기에 각 나라의 식문화가 붙으면 같은 제품도 전혀 다른 영상이 된다.",
          "소비자는 단순히 제품을 먹는 것이 아니라 '내 방식으로 이 브랜드를 해석했다'는 감각을 공유한다. 이때 브랜드는 소비자의 창작물을 관찰하는 위치가 된다."
        ]
      },
      {
        title: "마케터는 무엇을 배워야 할까?",
        paragraphs: [
          "식품 브랜드라면 댓글과 숏폼 레시피를 제품 개발의 힌트로 볼 수 있다. 소비자가 반복해서 섞는 재료, 자주 등장하는 불편함, 자주 쓰는 표현은 모두 신제품 아이디어가 된다.",
          "글로벌 브랜드일수록 현지화는 번역이 아니라 사용법의 재발견이다. 현지 소비자가 이미 하고 있는 행동을 공식화할 때 반응이 자연스럽다."
        ],
        points: [
          { label: "콘텐츠", text: "소비자 레시피를 공식 큐레이션한다." },
          { label: "제품", text: "반복 등장하는 조합을 한정판으로 검증한다." },
          { label: "커뮤니티", text: "국가별 먹는 법을 비교해 참여를 만든다." }
        ]
      },
      {
        title: "브랜드 신호등",
        paragraphs: [
          "불닭 현지화는 초록불에 가깝다. 소비자가 이미 놀고 있는 판이 있기 때문이다. 다만 매운맛 도전은 건강 리스크가 붙을 수 있어 안전 안내가 필요하다.",
          "마케터가 봐야 할 핵심은 제품보다 사용법이다. 소비자가 만든 사용법을 브랜드가 얼마나 잘 받아내느냐가 다음 성장을 만든다."
        ],
        callout: "한 줄 정리: 불닭은 제품이 소비자를 따라가며 다시 상품이 되는 구조를 보여준다."
      }
    ]
  },
  c07: {
    title: "KBO 팬덤 마케팅, 야구장은 이제 브랜드 놀이터다",
    lead: "요즘 야구장은 경기만 보는 곳이 아니다. 유니폼, 응원가, 먹거리, 굿즈, 이동 동선까지 팬의 하루 전체가 콘텐츠가 된다.",
    readMinutes: 5,
    views: 691,
    sections: [
      {
        title: "KBO 팬덤은 왜 마케팅 지면이 됐나",
        paragraphs: [
          "스포츠 팬덤의 힘은 반복성에 있다. 팬은 한 번 방문하고 끝나는 게 아니라 시즌 내내 같은 팀, 같은 구장, 같은 루틴을 반복한다.",
          "브랜드 입장에서는 이 반복 루틴 안에 들어가는 것이 중요하다. 경기장 광고판보다 팬이 실제로 들고 먹고 입고 공유하는 접점이 더 강해졌다."
        ]
      },
      {
        title: "왜 젊은 팬들이 반응할까?",
        paragraphs: [
          "직관은 이제 취미이자 외출 코스다. 유니폼을 고르고, 포토카드를 챙기고, 경기장 음식을 찍고, 응원 영상을 올리는 과정 전체가 하나의 라이프스타일 콘텐츠가 된다.",
          "팀 정체성도 강하다. 팬덤 언어와 색깔을 잘 이해한 협업은 소속감을 자극하지만, 얕게 가져오면 바로 티가 난다."
        ]
      },
      {
        title: "브랜드는 어떻게 들어가야 할까?",
        paragraphs: [
          "F&B 브랜드는 경기 전후 먹거리 동선과 잘 맞는다. 패션 브랜드는 팀 컬러와 응원룩으로 들어갈 수 있고, 금융이나 통신 브랜드는 멤버십 혜택과 티켓 경험을 연결할 수 있다.",
          "중요한 건 야구를 장식으로 쓰지 않는 것이다. 팬이 실제로 쓰는 말, 싫어하는 표현, 라이벌 구도를 이해한 상태에서 들어가야 한다."
        ],
        points: [
          { label: "현장형", text: "경기 전후 동선에 쿠폰, 포토존, 팝업을 배치한다." },
          { label: "굿즈형", text: "팀 컬러와 팬덤 언어를 반영한 한정판을 만든다." },
          { label: "콘텐츠형", text: "직관 루틴을 짧은 영상 시리즈로 만든다." }
        ]
      },
      {
        title: "브랜드 신호등",
        paragraphs: [
          "KBO 팬덤 마케팅은 초록불이다. 다만 팬덤 검수 없이 들어가면 빠르게 역풍이 난다.",
          "마케터가 먼저 해야 할 일은 팀별 문법을 배우는 것이다. 팬덤은 브랜드의 성의 없음을 누구보다 빨리 알아본다."
        ],
        callout: "한 줄 정리: 야구장 마케팅은 노출 싸움이 아니라 팬의 루틴 안에 들어가는 싸움이다."
      }
    ]
  },
  c08: {
    title: "산트립, 등산이 여행 콘텐츠가 되는 새로운 주말 루틴",
    lead: "산트립은 산을 오르는 행위 하나로 끝나지 않는다. 이동, 장비, 정상 인증, 하산 후 맛집까지 묶여 하나의 주말 여행 포맷이 된다.",
    readMinutes: 5,
    views: 533,
    sections: [
      {
        title: "산트립은 무엇이 다를까?",
        paragraphs: [
          "기존 등산 콘텐츠가 코스와 난이도 중심이었다면, 산트립은 여행 경험 전체를 보여준다. 어디서 출발하고, 무엇을 먹고, 어떤 옷을 입고, 하산 후 어디에 들르는지까지 포함된다.",
          "그래서 산트립은 아웃도어와 로컬 여행 사이에 있다. 산은 목적지이지만, 콘텐츠는 그 주변 루틴까지 확장된다."
        ]
      },
      {
        title: "왜 지금 반응할까?",
        paragraphs: [
          "사람들은 멀리 떠나는 여행의 부담은 줄이고, 주말에 뭔가 해냈다는 감각은 얻고 싶어 한다. 산트립은 건강, 자연, 인증, 맛집을 한 번에 묶어 준다.",
          "또 초보자에게도 상상하기 쉽다. '이 코스라면 나도 갈 수 있겠다'는 느낌이 들면 저장과 공유가 늘어난다."
        ]
      },
      {
        title: "브랜드 활용법",
        paragraphs: [
          "아웃도어 브랜드는 장비를 기능 설명으로만 보여주지 말고 실제 산트립 동선 안에 넣어야 한다. 숙박, 로컬 F&B, 모빌리티 브랜드는 코스 전후의 불편을 줄이는 방식으로 들어갈 수 있다.",
          "블로그에서는 교통, 난이도, 준비물, 맛집 정보를 묶는 것이 좋고, 릴스에서는 출발부터 하산 후 한 컷까지 빠르게 보여주는 구성이 잘 맞는다."
        ],
        points: [
          { label: "검색형", text: "코스, 교통, 난이도, 준비물을 자세히 정리한다." },
          { label: "숏폼형", text: "뷰보다 루틴을 보여준다. 출발, 간식, 정상, 하산 후 식사." }
        ]
      },
      {
        title: "브랜드 신호등",
        paragraphs: [
          "산트립은 초록불이지만 책임 있는 메시지가 필요하다. 핫플화가 심해지면 쓰레기, 안전, 지역 피로도 문제가 생길 수 있다.",
          "브랜드는 예쁜 장면만 보여주기보다 안전, 준비, 지역 존중까지 함께 말해야 오래 간다."
        ],
        callout: "한 줄 정리: 산트립은 등산을 주말 여행 상품처럼 소비하게 만드는 라이프스타일 포맷이다."
      }
    ]
  },
  c09: {
    title: "생성형 AI 개인화 마케팅, 마케터의 일은 어떻게 쪼개질까?",
    lead: "AI는 광고 문구를 대신 써주는 도구에서 멈추지 않는다. 하나의 캠페인을 수십 개의 세그먼트와 메시지로 나누는 운영 방식 자체를 바꾸고 있다.",
    readMinutes: 6,
    views: 817,
    sections: [
      {
        title: "AI 개인화 마케팅, 어디까지 왔나",
        paragraphs: [
          "생성형 AI는 이제 카피 초안 작성 수준을 넘어 고객군별 문구, 이미지 방향, CRM 메시지, 랜딩 페이지 가설까지 빠르게 뽑아내는 도구가 됐다.",
          "마케터가 하나의 정답을 만드는 시대에서, 여러 가설을 빠르게 만들고 성과로 걸러내는 시대로 이동하고 있는 셈이다."
        ]
      },
      {
        title: "왜 지금 더 중요해졌나",
        paragraphs: [
          "소비자는 자신과 관련 없는 메시지에 점점 덜 반응한다. 동시에 마케터는 더 적은 인력과 시간으로 더 많은 채널을 운영해야 한다.",
          "AI는 이 간극을 줄여 준다. 다만 자동화가 많아질수록 브랜드 톤과 검수 기준이 더 중요해진다. 많이 만드는 것보다 틀리지 않게 만드는 체계가 필요하다."
        ]
      },
      {
        title: "브랜드는 어떻게 준비해야 할까?",
        paragraphs: [
          "먼저 세그먼트 기준을 정해야 한다. 누구에게 어떤 제안을 할지 정하지 않은 상태에서 AI에게 많이 만들라고 하면, 그저 비슷한 문장이 쌓일 뿐이다.",
          "그 다음은 검수 루프다. 개인정보, 저작권, 과장 표현, 브랜드 톤을 사람이 확인하고, 성과 데이터는 다시 다음 실험에 반영해야 한다."
        ],
        points: [
          { label: "입력", text: "고객군, 맥락, 금지 표현, 브랜드 톤을 명확히 준다." },
          { label: "검수", text: "사람이 최종 판단하고 민감 표현을 걸러낸다." },
          { label: "학습", text: "성과가 좋았던 메시지를 다음 실험 기준으로 쓴다." }
        ]
      },
      {
        title: "브랜드 신호등",
        paragraphs: [
          "AI 개인화 마케팅은 초록불이지만 무조건 자동화하면 위험하다. 고객은 개인화를 좋아하지만, 감시당한다고 느끼는 순간 거부감이 커진다.",
          "마케터의 역할은 사라지는 것이 아니라 바뀐다. 직접 모든 문장을 쓰는 사람에서, 좋은 가설과 검수 기준을 설계하는 사람으로 이동한다."
        ],
        callout: "한 줄 정리: AI 개인화의 핵심은 자동 생성이 아니라 빠른 실험과 책임 있는 검수다."
      }
    ]
  },
  c10: {
    title: "X챗과 DM 분리, 사람들은 왜 공개 피드 밖으로 이동할까?",
    lead: "공개 피드에서 터진 이슈도 오래 살아남는 곳은 닫힌 대화방일 때가 많다. X챗과 DM 분리 흐름은 소셜 미디어가 공개 도달에서 관계 기반 공유로 이동하고 있음을 보여준다.",
    readMinutes: 5,
    views: 489,
    sections: [
      {
        title: "무슨 변화가 보이나",
        paragraphs: [
          "X의 메시지 기능 분리 흐름은 단순한 기능 개편으로만 보기 어렵다. 사람들은 공개 피드에서 말하는 것과 작은 대화방에서 공유하는 것을 점점 다르게 나누고 있다.",
          "공개 피드는 발견의 장소이고, DM과 그룹 대화는 해석과 관계의 장소가 된다. 밈도 뉴스도 결국 가까운 사람에게 보내질 때 생명이 길어진다."
        ]
      },
      {
        title: "왜 닫힌 대화가 중요해졌을까?",
        paragraphs: [
          "공개 게시에는 피로와 리스크가 있다. 캡처될 수 있고, 맥락이 잘릴 수 있고, 모르는 사람에게 공격받을 수 있다. 그래서 사람들은 더 작은 공간에서 더 편하게 말한다.",
          "브랜드도 공개 댓글 수만 보면 놓치는 것이 많다. 실제로는 DM 공유, 저장, 오픈채팅 이동, 뉴스레터 클릭 같은 닫힌 지표가 관계를 만든다."
        ]
      },
      {
        title: "마케터는 무엇을 바꿔야 하나",
        paragraphs: [
          "콘텐츠 목표를 조회수 하나로 두면 부족하다. 사람들이 친구에게 보내고 싶은 자료인지, 저장해 두고 싶은 체크리스트인지, 작은 커뮤니티에서 이야기할 만한 주제인지 봐야 한다.",
          "브랜드 채널도 공개 피드와 폐쇄형 관계 채널을 함께 설계해야 한다. 뉴스레터, 멤버십, 오픈채팅, 디스코드 같은 채널이 다시 중요해지는 이유다."
        ],
        points: [
          { label: "측정", text: "댓글보다 저장, 공유, 가입, 재방문을 함께 본다." },
          { label: "콘텐츠", text: "친구에게 보내기 좋은 템플릿과 체크리스트를 만든다." }
        ]
      },
      {
        title: "브랜드 신호등",
        paragraphs: [
          "X챗 이슈는 초록불이지만 대중형 밈으로는 약하다. 대신 플랫폼 전략을 점검하는 실무형 주제로 가치가 높다.",
          "폐쇄형 채널은 스팸으로 보이기 쉽다. 초대 명분, 수신 동의, 참여 혜택이 분명해야 한다."
        ],
        callout: "한 줄 정리: 앞으로의 소셜 성과는 공개 반응과 닫힌 공유를 함께 봐야 읽힌다."
      }
    ]
  },
  c11: {
    title: "롯데월드 메이플 아일랜드, 게임 IP는 어떻게 현실 공간이 됐을까?",
    lead: "메이플 아일랜드가 흥미로운 이유는 캐릭터를 놀이공원에 붙였기 때문만이 아니다. 팬이 세계관 안으로 들어와 직접 걷고, 만나고, 인증할 수 있는 구조를 만들었기 때문이다.",
    readMinutes: 6,
    views: 821,
    sections: [
      {
        title: "메이플 아일랜드, 무엇이 다른가",
        paragraphs: [
          "롯데월드 메이플 아일랜드는 게임 IP를 오프라인 테마파크 경험으로 확장한 사례다. 어트랙션, 굿즈, F&B, 포토존, NPC 알바 프로모션이 함께 묶이며 팬이 방문할 이유를 만든다.",
          "단순히 캐릭터 이미지를 붙이는 콜라보와 다르게, 팬이 세계관 안에서 미션을 수행하는 느낌을 준다는 점이 중요하다."
        ]
      },
      {
        title: "왜 팬들은 현실 공간화를 좋아할까?",
        paragraphs: [
          "팬덤은 좋아하는 세계관을 화면 밖에서 확인하고 싶어 한다. 굿즈를 사는 것에서 한 걸음 더 나아가, 내가 그 장소에 있었다는 인증을 남기고 싶어 한다.",
          "NPC 알바 같은 장치는 이 욕망을 더 강하게 만든다. 게임 안 역할이 현실 공간에 등장하면 팬은 단순 관람객이 아니라 참여자가 된다."
        ]
      },
      {
        title: "브랜드가 배워야 할 설계법",
        paragraphs: [
          "IP 콜라보의 핵심은 로고 부착이 아니라 동선이다. 입장해서 무엇을 보고, 어디서 사진을 찍고, 어떤 굿즈를 얻고, 어떤 미션을 완료하는지까지 하나의 흐름으로 설계해야 한다.",
          "세계관을 모르는 사람도 즐길 수 있는 설명이 필요하지만, 팬이 보기에 고증이 어긋나면 안 된다. 신규 유입과 팬덤 만족 사이의 균형이 중요하다."
        ],
        points: [
          { label: "팬덤용", text: "원작의 장소, 대사, 캐릭터 관계를 섬세하게 반영한다." },
          { label: "일반 방문객용", text: "세계관을 몰라도 따라갈 수 있는 미션과 동선을 만든다." }
        ]
      },
      {
        title: "브랜드 신호등",
        paragraphs: [
          "메이플 아일랜드는 초록불이다. 게임, 캐릭터, 테마파크, F&B 브랜드가 모두 참고할 만한 체험형 IP 사례다.",
          "다만 팬덤은 디테일을 본다. 캐릭터를 빌리는 것보다 세계관을 존중하는 태도가 캠페인의 성패를 가른다."
        ],
        callout: "한 줄 정리: IP 콜라보는 캐릭터를 붙이는 일이 아니라 팬이 들어갈 수 있는 현실 세계를 설계하는 일이다."
      }
    ]
  },
  c12: {
    title: "롯데리아 x 포켓몬 굿즈, 사람들은 햄버거를 먹으러 간 걸까?",
    lead: "캐릭터 굿즈 콜라보는 메뉴의 부가 혜택처럼 보이지만 실제로는 방문 이유 자체를 바꾼다. 소비자는 햄버거보다 포켓몬 굿즈를 먼저 떠올릴 수 있다.",
    readMinutes: 5,
    views: 577,
    sections: [
      {
        title: "포켓몬 굿즈 콜라보는 왜 강할까?",
        paragraphs: [
          "포켓몬은 세대가 넓고 수집 욕구가 강한 IP다. 외식 브랜드와 만나면 메뉴 구매, 매장 방문, 굿즈 인증, 재고 공유가 한 번에 일어난다.",
          "이런 콜라보는 제품을 먹는 경험보다 얻는 경험이 앞선다. 소비자는 '무엇을 먹을까'보다 '어느 매장에 아직 남아 있을까'를 먼저 검색한다."
        ]
      },
      {
        title: "왜 자연스럽게 바이럴이 될까?",
        paragraphs: [
          "굿즈는 인증하기 쉽다. 실물 사진, 언박싱, 교환 글, 품절 후기까지 모두 콘텐츠가 된다. 특히 수량이 한정되어 있으면 재고 정보 자체가 대화 소재가 된다.",
          "친구와 교환하거나 여러 매장을 도는 행동도 확산을 만든다. 브랜드가 광고를 하지 않아도 소비자끼리 정보를 업데이트한다."
        ]
      },
      {
        title: "브랜드는 무엇을 설계해야 하나",
        paragraphs: [
          "캐릭터 콜라보의 핵심은 굿즈 디자인만이 아니다. 어떤 세트를 사야 하는지, 언제 받을 수 있는지, 재고를 어디서 확인할 수 있는지까지 경험이 매끄러워야 한다.",
          "품절은 화제성을 만들지만 불만도 만든다. 수량, 판매 조건, 재입고 공지가 투명하지 않으면 팬덤의 기대가 빠르게 실망으로 바뀐다."
        ],
        points: [
          { label: "방문 유도", text: "매장 방문 인증과 굿즈 획득 동선을 함께 만든다." },
          { label: "커뮤니티 확산", text: "재고 공유와 교환이 일어날 공간을 관찰한다." },
          { label: "리스크 관리", text: "품절, 리셀, 어린이 타깃 과소비 논란을 대비한다." }
        ]
      },
      {
        title: "브랜드 신호등",
        paragraphs: [
          "롯데리아 x 포켓몬 굿즈는 노란불이다. 방문 유도 효과는 강하지만 수량 관리와 팬덤 기대치가 까다롭다.",
          "마케터는 굿즈를 미끼로만 보면 안 된다. 팬이 기분 좋게 얻고, 공유하고, 다시 방문할 수 있는 구조가 필요하다."
        ],
        callout: "한 줄 정리: 캐릭터 굿즈 콜라보는 메뉴를 파는 캠페인이 아니라 방문 이유를 설계하는 캠페인이다."
      }
    ]
  },
};

const FRIENDLY_ARTICLE_OVERRIDES = {
  c01: {
    title: "셋로그, 브랜드는 이 흐름을 어떻게 활용하면 좋을까?",
    lead: "릴스에서 화면이 여러 칸으로 나뉘고, 친구들의 하루가 동시에 지나가는 영상을 본 적 있다면 이 흐름을 그냥 브이로그로만 보긴 아쉬워. 셋로그는 Z세대가 친밀감을 기록하는 방식이고, 브랜드가 사람 냄새를 보여주기 좋은 포맷이기도 해.",
    sections: [
      {
        title: "먼저 셋로그가 뭔지부터 보자",
        paragraphs: [
          "셋로그는 친구들이 각자 짧은 일상 영상을 찍고, 그 조각을 시간대별로 모아 하나의 분할 화면처럼 보여주는 포맷이야. 중요한 건 멋진 촬영보다 '같은 시간에 우리는 서로 다르게 살고 있었다'는 느낌이야.",
          "한 사람의 하루를 따라가는 브이로그와 달리, 셋로그는 여러 사람의 하루를 한 화면에 펼쳐 둬. 그래서 별일 없는 장면도 같이 놓이면 관계, 성격, 생활 리듬이 보이기 시작해."
        ]
      },
      {
        title: "왜 지금 반응이 오는 걸까?",
        paragraphs: [
          "요즘 피드는 너무 잘 꾸며진 장면이 많아. 반대로 셋로그는 조금 덜 정돈되어 있어서 오히려 편하게 느껴져. 공개 과시보다 가까운 사람끼리 공유하는 일상에 더 가까운 거지.",
          "또 셋로그에는 '따로 있지만 같이 있다'는 감각이 있어. 같은 공간에 있지 않아도 같은 시간대를 나누면 연결되어 있다는 느낌이 생기고, 이게 친구 사이의 가벼운 놀이로 번져."
        ]
      },
      {
        title: "퍼지기 쉬운 이유도 명확해",
        paragraphs: [
          "이 포맷은 만들기가 쉽다. 각자 2초씩만 찍어도 하나의 영상이 되고, 보는 사람도 구조를 바로 이해할 수 있어. 설명이 길지 않아도 포맷 자체가 내용을 알려주는 셈이야.",
          "무엇보다 보자마자 같이 찍을 사람을 떠올리게 해. '우리도 해볼까?'라는 말이 자연스럽게 나오면, 그건 이미 공유를 부르는 포맷이라는 뜻이야."
        ]
      },
      {
        title: "브랜드는 이렇게 써볼 수 있어",
        paragraphs: [
          "가장 좋은 출발점은 직원 셋로그야. 신제품 출시 전날 마케터, 개발자, CS 담당자, 매장 스태프의 하루를 같은 시간대별로 묶으면 제품보다 브랜드 뒤의 사람이 먼저 보여.",
          "팬이나 소비자를 주인공으로 세워도 좋아. 브랜드가 직접 자기 이야기를 하는 대신, 사람들이 제품을 쓰는 순간을 모으면 훨씬 덜 광고 같고 더 자연스러워져."
        ],
        points: [
          { label: "B2B 브랜드", text: "직군별 하루를 보여주면 딱딱한 조직 이미지를 부드럽게 만들 수 있다." },
          { label: "F&B 브랜드", text: "아침, 점심, 야식처럼 시간대별 제품 사용 장면을 모아볼 수 있다." },
          { label: "IP 브랜드", text: "캐릭터별 하루를 병렬로 보여주면 세계관 설명이 훨씬 쉬워진다." }
        ]
      },
      {
        title: "주의할 점은 자발성이야",
        paragraphs: [
          "셋로그는 초록불에 가까운 포맷이지만, 회사가 억지로 시킨 티가 나면 금방 식어. 이 흐름의 매력은 완벽함이 아니라 조금 어설퍼도 진짜 사람의 하루처럼 보이는 데 있어.",
          "마케터라면 포맷만 가져오기보다 누가 왜 함께 찍는지부터 설계해야 해. 사람 사이의 관계가 보여야 셋로그답게 살아나."
        ],
        callout: "정리하면, 셋로그는 제품을 설명하기 전에 브랜드 뒤의 사람과 관계를 보여주는 포맷이야."
      }
    ]
  },
  c02: {
    title: "영크크, 뜻보다 소리로 먼저 퍼지는 밈을 어떻게 볼까?",
    lead: "영크크는 뜻을 정확히 알아야 웃긴 말이라기보다, 이상하게 귀에 남아서 먼저 퍼지는 밈에 가까워. 브랜드가 그대로 따라 쓰기보다, 왜 이런 말이 움직이는지를 보는 게 더 중요해.",
    sections: [
      {
        title: "영크크는 어떤 밈이야?",
        paragraphs: [
          "영크크는 YOUNGCREATORCREW에서 나온 표현이 줄어들고, 댓글과 숏폼에서 다시 밈처럼 굴러다니며 커진 흐름이야. 여기서 중요한 건 원래 의미보다 어감이야.",
          "요즘 밈 중에는 설명보다 소리, 리듬, 낯섦이 먼저 움직이는 것들이 많아. 영크크도 딱 그쪽에 가까워서, 누가 길게 설명하는 순간 오히려 힘이 빠져."
        ]
      },
      {
        title: "왜 이런 말이 계속 뜰까?",
        paragraphs: [
          "모두가 바로 이해하는 농담보다, 아는 사람끼리만 알아듣는 신호가 더 재미있을 때가 있어. 의미가 조금 비어 있으면 각자 상황에 끼워 넣기 쉽고, 댓글 놀이도 더 잘 생겨.",
          "짧은 소리 밈은 영상에도 잘 붙어. 자막 한 줄, 표정 하나, 반복되는 음절만 있어도 분위기를 만들 수 있으니까 숏폼과 궁합이 좋아."
        ]
      },
      {
        title: "브랜드가 배울 건 따로 있어",
        paragraphs: [
          "영크크를 그대로 쓰는 것보다 중요한 건 우리 브랜드에도 짧고 반복하기 쉬운 소리 자산이 있는지 보는 거야. 제품명, 캠페인명, 멤버십 이름이 입에 잘 붙으면 밈처럼 움직일 가능성이 생겨.",
          "다만 밈은 승인 절차를 기다려주지 않아. 큰 캠페인 슬로건으로 붙잡기보다는, 댓글형 콘텐츠나 빠른 리액션 소재로만 가볍게 테스트하는 편이 좋아."
        ],
        points: [
          { label: "잘 맞는 곳", text: "릴스 자막, 팬덤 리액션, 짧은 댓글형 콘텐츠." },
          { label: "피해야 할 곳", text: "공식 공지, 사과문, 장기 브랜드 슬로건." }
        ]
      },
      {
        title: "타이밍이 거의 전부야",
        paragraphs: [
          "영크크는 노란불이야. 잘 쓰면 감각 있어 보이지만, 늦게 쓰거나 너무 설명하면 바로 어색해져.",
          "브랜드가 써보고 싶다면 먼저 타깃 커뮤니티에서 아직 살아 있는지 확인해야 해. 밈은 단어가 아니라 타이밍으로 움직이거든."
        ],
        callout: "정리하면, 영크크는 베껴 쓸 유행어보다 '짧고 이상하게 입에 붙는 말'이 어떻게 퍼지는지 보여주는 사례야."
      }
    ]
  },
  c03: {
    title: "빅나티 vs 스윙스, 디스전보다 커뮤니티 반응을 봐야 하는 이유",
    lead: "힙합 디스전은 이제 곡 안에서만 끝나지 않아. 라이브 해명, 댓글 캡처, 커뮤니티 요약이 같이 움직이면서 이슈가 실시간 콘텐츠처럼 소비돼.",
    sections: [
      {
        title: "이슈가 커진 방식부터 보자",
        paragraphs: [
          "빅나티와 스윙스의 공방은 디스곡 하나로만 소비되지 않았어. 누가 어떤 말을 했는지, 어떤 해명이 나왔는지, 주변 반응은 어땠는지가 전부 콘텐츠가 됐지.",
          "요즘 엔터 이슈는 원본보다 해석본이 더 빨리 돌아. 긴 라이브는 짧은 클립으로 잘리고, 커뮤니티는 타임라인을 정리하고, 댓글은 바로 판정을 내려."
        ]
      },
      {
        title: "사람들은 왜 계속 볼까?",
        paragraphs: [
          "사람들은 단순히 음악을 듣는 게 아니라 누가 더 설득력 있게 말하는지, 누가 여론을 가져가는지 보는 데 재미를 느껴. 일종의 실시간 관전이야.",
          "그리고 커뮤니티 참여감도 커. 누군가 요약을 올리면 댓글에서 다시 해석이 붙고, 그 댓글이 또 다른 콘텐츠가 돼. 사건은 하나지만 소비 방식은 계속 늘어나는 거지."
        ]
      },
      {
        title: "브랜드가 배울 지점",
        paragraphs: [
          "이 이슈는 따라 할 소재라기보다 위기 커뮤니케이션을 배울 사례에 가까워. 논란이 생기면 공식 입장만으로 끝나지 않고, 잘린 클립과 댓글 요약이 실제 이미지를 만들거든.",
          "그래서 브랜드는 빠른 사실 정리뿐 아니라 짧게 잘렸을 때도 오해가 적은 문장을 준비해야 해. 긴 해명도 결국 몇 초짜리 클립으로 소비될 수 있어."
        ],
        points: [
          { label: "관찰 포인트", text: "원본보다 어떤 요약본이 더 퍼지는지 확인한다." },
          { label: "실무 포인트", text: "위기 대응 문장은 캡처되어도 맥락이 크게 흔들리지 않게 쓴다." }
        ]
      },
      {
        title: "브랜드 탑승은 조심하자",
        paragraphs: [
          "이 이슈는 빨간불에 가까워. 당사자 갈등과 사적 맥락이 섞여 있기 때문에 브랜드가 농담처럼 얹히면 재미보다 무례함이 먼저 읽힐 수 있어.",
          "대신 확산 구조를 분석하는 건 좋아. 사람들이 논란을 어떻게 요약하고, 판정하고, 다시 퍼뜨리는지 보면 위기 대응의 현실을 배울 수 있어."
        ],
        callout: "정리하면, 이 이슈는 콘텐츠 소재보다 커뮤니티가 논란을 편집하는 방식을 보는 케이스야."
      }
    ]
  },
  c04: {
    title: "삼전 vs 하닉, HBM 이슈가 왜 일상 대화까지 내려왔을까?",
    lead: "HBM, AI 반도체, 목표주가 같은 말은 어렵지만 요즘 사람들은 이 이슈를 꽤 가볍게 이야기해. 이유는 결국 내 돈, 내 일, 내 미래와 연결되어 있다고 느끼기 때문이야.",
    sections: [
      {
        title: "어려운 산업 뉴스가 왜 대중 이슈가 됐을까?",
        paragraphs: [
          "HBM은 AI 반도체 성능과 연결되는 핵심 부품으로 주목받고 있어. 이 흐름에서 삼성전자와 SK하이닉스가 비교되면서 주가 이야기도 커졌고.",
          "예전 같으면 증권 기사 안에서 끝났을 말들이 이제는 커뮤니티와 직장인 대화로 내려와. '삼전이냐 하닉이냐'는 종목 비교를 넘어 AI 시대에 누가 앞서느냐는 이야기로 읽혀."
        ]
      },
      {
        title: "왜 밈처럼 퍼질까?",
        paragraphs: [
          "사람들은 어려운 기술을 완벽히 이해하지 못해도 흐름을 놓치고 싶어 하지 않아. 그래서 복잡한 산업 뉴스가 짧은 농담, 진영 구도, 자조 댓글로 바뀌어.",
          "주식 이슈에는 기대와 후회가 같이 붙어. 숫자는 차갑지만 댓글은 뜨겁고, 그 감정이 확산을 만든다."
        ]
      },
      {
        title: "마케터라면 이렇게 다루자",
        paragraphs: [
          "금융, 테크, 교육 브랜드라면 이 이슈를 쉽게 풀어주는 정보형 콘텐츠로 만들 수 있어. HBM이 왜 AI 인프라와 연결되는지, 왜 기업 간 비교가 생기는지 구조로 보여주면 좋아.",
          "다만 투자 조언처럼 보이면 안 돼. 특정 종목을 추천하거나 수익률을 단정하는 순간 콘텐츠의 성격이 위험해져."
        ],
        points: [
          { label: "좋은 각도", text: "어려운 용어를 구조도와 생활 언어로 풀어준다." },
          { label: "주의할 각도", text: "매수 추천, 목표가 단정, 수익률 자극은 피한다." }
        ]
      },
      {
        title: "정보형으로만 접근하자",
        paragraphs: [
          "이 이슈는 노란불이야. 잘 풀면 전문성과 트렌드 감각을 동시에 보여줄 수 있지만, 투자 권유처럼 보이면 바로 부담이 커져.",
          "마케터의 역할은 종목을 찍어주는 게 아니라 사람들이 왜 이 흐름에 반응하는지 이해하기 쉽게 정리해 주는 거야."
        ],
        callout: "정리하면, 삼전 vs 하닉 담론은 AI 시대를 사람들이 가장 쉽게 체감하는 경제 이슈야."
      }
    ]
  },
  c05: {
    title: "스타벅스 탱크데이 논란, 캠페인 캘린더에 맥락이 필요한 이유",
    lead: "프로모션은 할인율만으로 판단되지 않아. 날짜와 단어가 사회적 기억과 부딪히면, 좋은 의도의 이벤트도 순식간에 브랜드 감수성 이슈가 될 수 있어.",
    sections: [
      {
        title: "어떤 지점에서 문제가 커졌을까?",
        paragraphs: [
          "스타벅스 탱크데이 논란은 특정 기념일의 사회적 맥락과 프로모션 이름이 충돌하면서 커졌어. 브랜드 입장에서는 행사였지만, 소비자 입장에서는 날짜와 단어가 먼저 보였지.",
          "이런 이슈는 제품 품질 문제가 아니야. 브랜드가 사회적 맥락을 얼마나 세심하게 읽는지에 대한 평가로 옮겨 가."
        ]
      },
      {
        title: "소비자는 왜 민감하게 봤을까?",
        paragraphs: [
          "소비자는 브랜드가 모든 역사적 맥락을 완벽히 알기를 기대하는 건 아니야. 다만 큰 기념일과 민감한 단어가 만났을 때 최소한의 검수는 했어야 한다고 느껴.",
          "특히 대형 브랜드일수록 실수는 개인의 실수가 아니라 조직의 태도로 읽혀. 그래서 '몰랐다'는 말만으로는 충분하지 않을 때가 많아."
        ]
      },
      {
        title: "실무에서 바로 챙길 것",
        paragraphs: [
          "캠페인 캘린더에는 출시일과 할인 기간만 있으면 부족해. 국가기념일, 재난일, 역사적 사건, 사회 갈등 키워드를 함께 봐야 해.",
          "문구 검수도 같이 가야 해. 단어 하나가 특정 날짜와 만나면 완전히 다른 의미가 될 수 있으니까, 민감 표현은 별도로 체크하는 습관이 필요해."
        ],
        points: [
          { label: "사전 검수", text: "날짜, 문구, 이미지, 해시태그를 한 번에 점검한다." },
          { label: "사후 대응", text: "변명보다 중단 조치와 재발 방지 프로세스를 먼저 말한다." }
        ]
      },
      {
        title: "이건 탑승보다 학습용 이슈야",
        paragraphs: [
          "이 이슈는 빨간불이야. 브랜드가 유머로 소비하거나 가볍게 패러디할 소재가 아니야.",
          "대신 마케팅팀의 체크리스트로는 아주 중요해. 남의 실수로 끝내지 말고 우리 캘린더와 승인 프로세스를 다시 보는 계기로 삼아야 해."
        ],
        callout: "정리하면, 브랜드 캘린더에는 날짜뿐 아니라 그 날짜가 가진 맥락까지 들어 있어야 해."
      }
    ]
  },
  c06: {
    title: "불닭 글로벌 현지화, 소비자 레시피를 브랜드가 다시 배우는 법",
    lead: "불닭은 이제 매운 라면 하나로만 설명하기 어려워. 세계 곳곳의 소비자가 자기 방식으로 섞고, 먹고, 올리면서 브랜드가 다시 배울 만한 사용법을 만들어내고 있어.",
    sections: [
      {
        title: "불닭은 어떻게 글로벌 놀이가 됐을까?",
        paragraphs: [
          "불닭은 매운맛 챌린지로 먼저 주목받았지만, 지금은 현지 소비자의 레시피와 조합으로 더 넓어지고 있어. 치즈를 넣고, 우유를 섞고, 현지 재료를 더하면서 제품이 하나의 베이스가 되는 거야.",
          "브랜드가 모든 사용법을 정해준 게 아니라 소비자가 먼저 먹는 법을 만들었다는 점이 재미있어. 이게 글로벌 현지화의 중요한 힌트야."
        ]
      },
      {
        title: "사람들은 왜 자기 레시피를 올릴까?",
        paragraphs: [
          "매운맛은 반응이 바로 보여. 표정, 실패, 성공, 참는 장면이 전부 콘텐츠가 돼. 여기에 각 나라의 식문화가 붙으면 같은 제품도 완전히 다른 영상처럼 보이고.",
          "소비자는 단순히 제품을 먹는 게 아니라 '내 방식으로 이 브랜드를 해석했다'는 감각을 공유해. 브랜드는 그 창작물을 관찰하면서 다음 힌트를 얻을 수 있어."
        ]
      },
      {
        title: "마케터가 챙길 포인트",
        paragraphs: [
          "식품 브랜드라면 댓글과 숏폼 레시피를 제품 개발의 힌트로 볼 수 있어. 자주 섞는 재료, 반복되는 불편함, 사람들이 쓰는 표현이 전부 아이디어가 돼.",
          "글로벌 현지화는 단순 번역이 아니야. 현지 소비자가 이미 하고 있는 행동을 발견하고, 그걸 공식화할 때 반응이 더 자연스러워."
        ],
        points: [
          { label: "콘텐츠", text: "소비자 레시피를 공식 채널에서 큐레이션한다." },
          { label: "제품", text: "반복 등장하는 조합을 한정판으로 검증한다." },
          { label: "커뮤니티", text: "국가별 먹는 법을 비교해 참여를 만든다." }
        ]
      },
      {
        title: "좋지만 안전 안내는 필요해",
        paragraphs: [
          "불닭 현지화는 초록불에 가까워. 이미 소비자가 놀고 있는 판이 있기 때문이야.",
          "다만 매운맛 도전은 건강 리스크가 붙을 수 있어. 브랜드가 챌린지를 키운다면 재미와 안전 안내를 같이 가져가야 해."
        ],
        callout: "정리하면, 불닭은 제품이 소비자의 사용법을 따라가며 다시 상품이 되는 구조를 보여줘."
      }
    ]
  },
  c07: {
    title: "KBO 팬덤 마케팅, 야구장은 어떻게 브랜드 놀이터가 됐을까?",
    lead: "요즘 야구장은 경기만 보는 곳이 아니야. 유니폼, 응원가, 먹거리, 굿즈, 이동 동선까지 팬의 하루 전체가 콘텐츠가 돼.",
    sections: [
      {
        title: "왜 KBO 팬덤이 마케팅 지면이 됐을까?",
        paragraphs: [
          "스포츠 팬덤의 힘은 반복성에 있어. 팬은 한 번 방문하고 끝나는 게 아니라 시즌 내내 같은 팀, 같은 구장, 같은 루틴을 반복해.",
          "브랜드 입장에서는 이 반복 루틴 안에 들어가는 게 중요해. 경기장 광고판보다 팬이 실제로 들고, 먹고, 입고, 공유하는 접점이 더 강해졌거든."
        ]
      },
      {
        title: "젊은 팬들은 무엇에 반응할까?",
        paragraphs: [
          "직관은 취미이자 외출 코스야. 유니폼을 고르고, 포토카드를 챙기고, 경기장 음식을 찍고, 응원 영상을 올리는 과정 전체가 하나의 라이프스타일 콘텐츠가 돼.",
          "팀 정체성도 강하게 작동해. 팬덤 언어와 팀 컬러를 잘 이해한 협업은 소속감을 만들지만, 얕게 가져오면 바로 티가 나."
        ]
      },
      {
        title: "브랜드는 어떻게 들어가면 좋을까?",
        paragraphs: [
          "F&B 브랜드는 경기 전후 먹거리 동선과 잘 맞고, 패션 브랜드는 팀 컬러와 응원룩으로 들어갈 수 있어. 금융이나 통신 브랜드는 티켓, 멤버십, 혜택 경험과 연결하기 좋아.",
          "중요한 건 야구를 장식처럼 쓰지 않는 거야. 팬이 실제로 쓰는 말, 싫어하는 표현, 라이벌 구도를 이해한 상태에서 들어가야 해."
        ],
        points: [
          { label: "현장형", text: "경기 전후 동선에 쿠폰, 포토존, 팝업을 배치한다." },
          { label: "굿즈형", text: "팀 컬러와 팬덤 언어를 반영한 한정판을 만든다." },
          { label: "콘텐츠형", text: "직관 루틴을 짧은 영상 시리즈로 만든다." }
        ]
      },
      {
        title: "팬덤 검수는 필수야",
        paragraphs: [
          "KBO 팬덤 마케팅은 초록불이야. 다만 팬덤 검수 없이 들어가면 빠르게 역풍이 날 수 있어.",
          "마케터가 먼저 해야 할 일은 팀별 문법을 배우는 거야. 팬덤은 브랜드의 성의 없음을 정말 빨리 알아봐."
        ],
        callout: "정리하면, 야구장 마케팅은 노출 싸움이 아니라 팬의 루틴 안에 자연스럽게 들어가는 싸움이야."
      }
    ]
  },
  c08: {
    title: "산트립, 등산이 여행 콘텐츠가 되는 이유",
    lead: "산트립은 산을 오르는 일 하나로 끝나지 않아. 이동, 장비, 정상 인증, 하산 후 맛집까지 묶여 하나의 주말 여행 포맷처럼 소비돼.",
    sections: [
      {
        title: "산트립은 기존 등산과 뭐가 다를까?",
        paragraphs: [
          "기존 등산 콘텐츠가 코스와 난이도 중심이었다면, 산트립은 여행 경험 전체를 보여줘. 어디서 출발하고, 무엇을 먹고, 어떤 옷을 입고, 하산 후 어디에 들르는지까지 포함하지.",
          "그래서 산트립은 아웃도어와 로컬 여행 사이에 있어. 산은 목적지지만, 콘텐츠는 그 주변 루틴까지 함께 확장돼."
        ]
      },
      {
        title: "왜 지금 사람들이 저장할까?",
        paragraphs: [
          "사람들은 멀리 떠나는 여행의 부담은 줄이고, 주말에 뭔가 해냈다는 감각은 얻고 싶어 해. 산트립은 건강, 자연, 인증, 맛집을 한 번에 묶어줘.",
          "초보자에게도 상상하기 쉽다는 점도 커. '이 코스라면 나도 갈 수 있겠다'는 생각이 들면 저장과 공유가 자연스럽게 늘어나."
        ]
      },
      {
        title: "브랜드가 붙을 수 있는 자리",
        paragraphs: [
          "아웃도어 브랜드는 장비를 기능 설명으로만 보여주지 말고 실제 산트립 동선 안에 넣어야 해. 숙박, 로컬 F&B, 모빌리티 브랜드는 코스 전후의 불편을 줄이는 방식으로 들어갈 수 있어.",
          "블로그에서는 교통, 난이도, 준비물, 맛집 정보를 묶는 게 좋고, 릴스에서는 출발부터 하산 후 한 컷까지 빠르게 보여주는 구성이 잘 맞아."
        ],
        points: [
          { label: "검색형", text: "코스, 교통, 난이도, 준비물을 자세히 정리한다." },
          { label: "숏폼형", text: "뷰보다 루틴을 보여준다. 출발, 간식, 정상, 하산 후 식사." }
        ]
      },
      {
        title: "책임 있는 메시지도 같이 가야 해",
        paragraphs: [
          "산트립은 초록불이지만, 예쁜 장면만 보여주면 부족해. 핫플화가 심해지면 쓰레기, 안전, 지역 피로도 문제가 생길 수 있거든.",
          "브랜드는 안전, 준비, 지역 존중까지 함께 말해야 오래 갈 수 있어. 좋은 여행 콘텐츠일수록 책임감이 같이 보여야 해."
        ],
        callout: "정리하면, 산트립은 등산을 주말 여행 상품처럼 상상하게 만드는 라이프스타일 포맷이야."
      }
    ]
  },
  c09: {
    title: "생성형 AI 개인화 마케팅, 마케터의 일은 어떻게 달라질까?",
    lead: "AI는 광고 문구를 대신 써주는 도구에서 멈추지 않아. 하나의 캠페인을 여러 고객군과 메시지로 나누는 운영 방식 자체를 바꾸고 있어.",
    sections: [
      {
        title: "AI 개인화는 어디까지 왔을까?",
        paragraphs: [
          "생성형 AI는 이제 카피 초안 작성 수준을 넘어 고객군별 문구, 이미지 방향, CRM 메시지, 랜딩 페이지 가설까지 빠르게 뽑아내는 도구가 됐어.",
          "마케터가 하나의 정답을 오래 만드는 방식에서, 여러 가설을 빠르게 만들고 성과로 걸러내는 방식으로 이동하고 있는 셈이야."
        ]
      },
      {
        title: "왜 지금 더 중요해졌을까?",
        paragraphs: [
          "소비자는 자신과 관련 없는 메시지에 점점 덜 반응해. 동시에 마케터는 더 적은 인력과 시간으로 더 많은 채널을 운영해야 하고.",
          "AI는 이 간극을 줄여줄 수 있어. 다만 자동화가 많아질수록 브랜드 톤과 검수 기준은 더 중요해져. 많이 만드는 것보다 틀리지 않게 만드는 체계가 필요해."
        ]
      },
      {
        title: "브랜드가 먼저 정해야 할 것",
        paragraphs: [
          "먼저 세그먼트 기준을 정해야 해. 누구에게 어떤 제안을 할지 정하지 않은 상태에서 AI에게 많이 만들라고 하면, 비슷한 문장만 쌓일 가능성이 커.",
          "그 다음은 검수 루프야. 개인정보, 저작권, 과장 표현, 브랜드 톤을 사람이 확인하고, 성과 데이터는 다시 다음 실험에 반영해야 해."
        ],
        points: [
          { label: "입력", text: "고객군, 맥락, 금지 표현, 브랜드 톤을 명확히 준다." },
          { label: "검수", text: "사람이 최종 판단하고 민감 표현을 걸러낸다." },
          { label: "학습", text: "성과가 좋았던 메시지를 다음 실험 기준으로 쓴다." }
        ]
      },
      {
        title: "자동화보다 운영 체계가 핵심이야",
        paragraphs: [
          "AI 개인화 마케팅은 초록불이지만 무조건 자동화하면 위험해. 고객은 개인화를 좋아하지만, 감시당한다고 느끼는 순간 거부감이 커져.",
          "마케터의 역할은 사라지는 게 아니라 바뀌어. 직접 모든 문장을 쓰는 사람에서, 좋은 가설과 검수 기준을 설계하는 사람으로 이동하는 거야."
        ],
        callout: "정리하면, AI 개인화의 핵심은 자동 생성이 아니라 빠른 실험과 책임 있는 검수야."
      }
    ]
  },
  c10: {
    title: "X챗과 DM 분리, 사람들은 왜 공개 피드 밖으로 갈까?",
    lead: "공개 피드에서 터진 이슈도 오래 살아남는 곳은 닫힌 대화방일 때가 많아. X챗과 DM 분리 흐름은 소셜 미디어가 공개 도달에서 관계 기반 공유로 이동하고 있음을 보여줘.",
    sections: [
      {
        title: "어떤 변화가 보일까?",
        paragraphs: [
          "X의 메시지 기능 분리 흐름은 단순한 기능 개편으로만 보기 어려워. 사람들은 공개 피드에서 말하는 것과 작은 대화방에서 공유하는 것을 점점 다르게 나누고 있어.",
          "공개 피드는 발견의 장소이고, DM과 그룹 대화는 해석과 관계의 장소가 돼. 밈도 뉴스도 결국 가까운 사람에게 보내질 때 생명이 길어지는 경우가 많아."
        ]
      },
      {
        title: "닫힌 대화가 왜 중요해졌을까?",
        paragraphs: [
          "공개 게시에는 피로와 리스크가 있어. 캡처될 수 있고, 맥락이 잘릴 수 있고, 모르는 사람에게 공격받을 수도 있지. 그래서 사람들은 더 작은 공간에서 더 편하게 말해.",
          "브랜드도 공개 댓글 수만 보면 놓치는 게 많아. 실제로는 DM 공유, 저장, 오픈채팅 이동, 뉴스레터 클릭 같은 닫힌 지표가 관계를 만들 수 있어."
        ]
      },
      {
        title: "마케터는 무엇을 바꿔야 할까?",
        paragraphs: [
          "콘텐츠 목표를 조회수 하나로만 두면 부족해. 사람들이 친구에게 보내고 싶은 자료인지, 저장해 두고 싶은 체크리스트인지, 작은 커뮤니티에서 이야기할 만한 주제인지 봐야 해.",
          "브랜드 채널도 공개 피드와 폐쇄형 관계 채널을 함께 설계해야 해. 뉴스레터, 멤버십, 오픈채팅, 디스코드 같은 채널이 다시 중요해지는 이유야."
        ],
        points: [
          { label: "측정", text: "댓글보다 저장, 공유, 가입, 재방문을 함께 본다." },
          { label: "콘텐츠", text: "친구에게 보내기 좋은 템플릿과 체크리스트를 만든다." }
        ]
      },
      {
        title: "스팸처럼 보이지 않는 게 중요해",
        paragraphs: [
          "X챗 이슈는 플랫폼 전략 관점에서는 초록불이야. 다만 대중형 밈처럼 쓰기보다는 실무형 주제로 다루는 편이 좋아.",
          "폐쇄형 채널은 스팸으로 보이기 쉽기 때문에 초대 명분, 수신 동의, 참여 혜택이 분명해야 해."
        ],
        callout: "정리하면, 앞으로의 소셜 성과는 공개 반응과 닫힌 공유를 함께 봐야 더 잘 읽혀."
      }
    ]
  },
  c11: {
    title: "롯데월드 메이플 아일랜드, 게임 IP가 현실 공간이 되는 법",
    lead: "메이플 아일랜드가 흥미로운 이유는 캐릭터를 놀이공원에 붙였기 때문만은 아니야. 팬이 세계관 안으로 들어와 직접 걷고, 만나고, 인증할 수 있는 구조를 만들었기 때문이야.",
    sections: [
      {
        title: "무엇이 다른 콜라보였을까?",
        paragraphs: [
          "롯데월드 메이플 아일랜드는 게임 IP를 오프라인 테마파크 경험으로 확장한 사례야. 어트랙션, 굿즈, F&B, 포토존, NPC 알바 프로모션이 함께 묶이며 팬이 방문할 이유를 만들지.",
          "단순히 캐릭터 이미지를 붙이는 콜라보와 다르게, 팬이 세계관 안에서 미션을 수행하는 느낌을 준다는 점이 중요해."
        ]
      },
      {
        title: "팬들은 왜 현실 공간화를 좋아할까?",
        paragraphs: [
          "팬덤은 좋아하는 세계관을 화면 밖에서 확인하고 싶어 해. 굿즈를 사는 것에서 한 걸음 더 나아가, 내가 그 장소에 있었다는 인증을 남기고 싶어 하지.",
          "NPC 알바 같은 장치는 이 욕망을 더 강하게 만들어. 게임 안 역할이 현실 공간에 등장하면 팬은 단순 관람객이 아니라 참여자가 돼."
        ]
      },
      {
        title: "브랜드가 배워야 할 설계법",
        paragraphs: [
          "IP 콜라보의 핵심은 로고 부착이 아니라 동선이야. 입장해서 무엇을 보고, 어디서 사진을 찍고, 어떤 굿즈를 얻고, 어떤 미션을 완료하는지까지 하나의 흐름으로 설계해야 해.",
          "세계관을 모르는 사람도 즐길 수 있는 설명은 필요하지만, 팬이 보기에 고증이 어긋나면 안 돼. 신규 유입과 팬덤 만족 사이의 균형이 중요해."
        ],
        points: [
          { label: "팬덤용", text: "원작의 장소, 대사, 캐릭터 관계를 섬세하게 반영한다." },
          { label: "일반 방문객용", text: "세계관을 몰라도 따라갈 수 있는 미션과 동선을 만든다." }
        ]
      },
      {
        title: "팬덤은 디테일을 본다",
        paragraphs: [
          "메이플 아일랜드는 초록불이야. 게임, 캐릭터, 테마파크, F&B 브랜드가 모두 참고할 만한 체험형 IP 사례야.",
          "다만 팬덤은 디테일을 정말 잘 봐. 캐릭터를 빌리는 것보다 세계관을 존중하는 태도가 캠페인의 성패를 가른다."
        ],
        callout: "정리하면, IP 콜라보는 캐릭터를 붙이는 일이 아니라 팬이 들어갈 수 있는 현실 세계를 설계하는 일이야."
      }
    ]
  },
  c12: {
    title: "롯데리아 x 포켓몬 굿즈, 방문 이유를 바꾸는 캐릭터 콜라보",
    lead: "캐릭터 굿즈 콜라보는 메뉴의 부가 혜택처럼 보이지만, 실제로는 방문 이유 자체를 바꿔. 소비자는 햄버거보다 포켓몬 굿즈를 먼저 떠올릴 수 있어.",
    sections: [
      {
        title: "포켓몬 굿즈는 왜 강할까?",
        paragraphs: [
          "포켓몬은 세대가 넓고 수집 욕구가 강한 IP야. 외식 브랜드와 만나면 메뉴 구매, 매장 방문, 굿즈 인증, 재고 공유가 한 번에 일어나.",
          "이런 콜라보는 제품을 먹는 경험보다 얻는 경험이 앞서. 소비자는 '무엇을 먹을까'보다 '어느 매장에 아직 남아 있을까'를 먼저 검색하게 돼."
        ]
      },
      {
        title: "왜 자연스럽게 퍼질까?",
        paragraphs: [
          "굿즈는 인증하기 쉬워. 실물 사진, 언박싱, 교환 글, 품절 후기까지 모두 콘텐츠가 돼. 특히 수량이 한정되어 있으면 재고 정보 자체가 대화 소재가 되고.",
          "친구와 교환하거나 여러 매장을 도는 행동도 확산을 만들어. 브랜드가 계속 말하지 않아도 소비자끼리 정보를 업데이트하는 구조가 생겨."
        ]
      },
      {
        title: "브랜드는 무엇을 설계해야 할까?",
        paragraphs: [
          "캐릭터 콜라보의 핵심은 굿즈 디자인만이 아니야. 어떤 세트를 사야 하는지, 언제 받을 수 있는지, 재고를 어디서 확인할 수 있는지까지 경험이 매끄러워야 해.",
          "품절은 화제성을 만들지만 불만도 같이 만들어. 수량, 판매 조건, 재입고 공지가 투명하지 않으면 팬덤의 기대가 빠르게 실망으로 바뀔 수 있어."
        ],
        points: [
          { label: "방문 유도", text: "매장 방문 인증과 굿즈 획득 동선을 함께 만든다." },
          { label: "커뮤니티 확산", text: "재고 공유와 교환이 일어날 공간을 관찰한다." },
          { label: "리스크 관리", text: "품절, 리셀, 어린이 타깃 과소비 논란을 대비한다." }
        ]
      },
      {
        title: "굿즈는 미끼가 아니라 경험이야",
        paragraphs: [
          "롯데리아 x 포켓몬 굿즈는 노란불이야. 방문 유도 효과는 강하지만 수량 관리와 팬덤 기대치가 까다롭기 때문이야.",
          "마케터는 굿즈를 단순 미끼로만 보면 안 돼. 팬이 기분 좋게 얻고, 공유하고, 다시 방문할 수 있는 구조가 필요해."
        ],
        callout: "정리하면, 캐릭터 굿즈 콜라보는 메뉴를 파는 캠페인이 아니라 방문 이유를 설계하는 캠페인이야."
      }
    ]
  }
};

Object.entries(FRIENDLY_ARTICLE_OVERRIDES).forEach(([id, update]) => {
  Object.assign(MARKETER_ARTICLES[id], update);
});

const FRIENDLY_ARTICLE_SUPPLEMENT_SECTIONS = {
  c01: [
    {
      title: "마케터가 먼저 봐야 할 확산 구조",
      paragraphs: [
        "셋로그는 보는 순간 친구, 팀, 동료가 떠오르는 포맷이야. 혼자 소비하고 끝나는 콘텐츠가 아니라 '우리도 이렇게 찍어볼까?'라는 대화로 이어지기 쉽다는 점이 강해.",
        "그래서 지표를 볼 때 조회수만 보면 아쉬워. 저장, 공유, 단체 대화방 유입, 내부 참여 신청처럼 콘텐츠 밖에서 일어나는 반응까지 함께 봐야 이 포맷의 힘을 제대로 읽을 수 있어."
      ]
    }
  ],
  c02: [
    {
      title: "어디서 더 잘 퍼지는지 보자",
      paragraphs: [
        "영크크 같은 밈은 긴 설명이 필요한 채널보다 짧게 반복되는 숏폼, 댓글, 짤 캡션에서 더 빨리 움직여. 특히 팬덤이 먼저 쓰고, 주변 이용자가 의미를 몰라도 따라 쓰면서 유행의 바깥으로 번지는 흐름이 생겨.",
        "마케터라면 이 밈을 브랜드 메인 메시지로 크게 걸기보다, 빠른 리액션 콘텐츠나 커뮤니티 톤을 읽는 관찰 지표로 활용하는 편이 좋아. 밈의 수명이 짧을수록 가볍게 테스트하고 빠르게 빠지는 판단이 중요해."
      ]
    },
    {
      title: "실행 전에 체크할 것",
      paragraphs: [
        "이런 소리형 밈은 내부 회의에서 설명을 길게 붙이는 순간 이미 맛이 빠질 수 있어. 브랜드 계정이 직접 사용한다면 '우리도 안다'보다 '우리도 옆에서 슬쩍 웃었다' 정도의 온도가 더 자연스러워.",
        "또 팬덤에서 나온 표현은 원래 맥락을 무시하면 반감이 생길 수 있어. 쓰기 전에는 관련 댓글과 2차 창작 흐름을 먼저 보고, 부정적으로 뒤집힌 의미가 없는지 확인하는 게 좋아."
      ]
    }
  ],
  c03: [
    {
      title: "왜 커뮤니티 콘텐츠가 됐을까",
      paragraphs: [
        "디스전은 원래 승패 구도가 선명해서 사람들이 참여하기 쉬워. 누가 더 잘했는지, 누가 선을 넘었는지, 어떤 장면이 결정적이었는지 각자 판정을 내릴 수 있거든.",
        "여기에 라이브 해명과 짧은 클립이 붙으면 이야기는 더 잘게 쪼개져. 전체 맥락을 다 보지 않아도 한 장면만으로 의견을 낼 수 있으니, 커뮤니티에서는 이슈가 계속 새 글감으로 재생산돼."
      ]
    },
    {
      title: "브랜드가 참고할 운영 감각",
      paragraphs: [
        "브랜드가 갈등 이슈 자체를 소재로 삼을 필요는 없어. 대신 사람들이 실시간 이슈를 어떻게 요약하고, 판정하고, 밈으로 만드는지 그 흐름을 보면 위기 대응과 소셜 운영에 배울 점이 많아.",
        "특히 논란이 생겼을 때 첫 문장, 해명 속도, 주변 반응의 캡처 가능성이 브랜드 이미지를 크게 바꿔. 공식 문장은 길고 완벽한 것보다, 오해를 줄이는 구조와 다음 행동이 분명한 쪽이 더 잘 작동해."
      ]
    }
  ],
  c04: [
    {
      title: "투자 이슈가 밈이 되는 순간",
      paragraphs: [
        "삼전과 하닉 이야기는 숫자만의 문제가 아니야. AI 시대에 누가 앞서가느냐, 내 계좌가 어떻게 되느냐, 한국 대표 기업의 체면이 어디에 있느냐가 한꺼번에 붙어 있어서 훨씬 넓은 대화가 돼.",
        "커뮤니티에서는 복잡한 반도체 밸류체인이 짧은 별명과 비교 구도로 바뀌어. 이때 사람들은 정확한 산업 리포트를 읽기보다, 내가 이해할 수 있는 말로 현재 분위기를 확인하고 싶어 해."
      ]
    },
    {
      title: "콘텐츠로 만들 때의 적정선",
      paragraphs: [
        "금융, 테크, 교육 브랜드라면 이 이슈를 '지금 사야 하나요'가 아니라 '왜 이 단어가 계속 보이나요'로 풀어야 안전해. HBM, AI 서버, 공급망 같은 단어를 생활 언어로 번역하는 콘텐츠가 더 오래 남아.",
        "반대로 특정 종목의 방향을 단정하거나 수익률을 자극하면 리스크가 커져. 마케터에게 필요한 건 추천이 아니라 맥락 정리, 용어 해설, 대중 반응 지도에 가깝다는 점을 기억하면 좋아."
      ]
    }
  ],
  c05: [
    {
      title: "브랜드 캘린더가 더 중요해진 이유",
      paragraphs: [
        "프로모션은 내부에서는 할인율과 매출 일정으로 보이지만, 소비자에게는 날짜와 단어와 이미지가 함께 보인다. 그래서 같은 이벤트도 어떤 날에 노출되느냐에 따라 전혀 다른 의미가 붙을 수 있어.",
        "이번 이슈가 말해주는 건 명확해. 큰 브랜드일수록 콘텐츠 검수는 문구 교정이 아니라 사회적 맥락 점검까지 포함해야 해. 특히 기념일, 재난, 역사, 젠더, 지역 이슈는 체크리스트로 관리하는 편이 안전해."
      ]
    },
    {
      title: "위기 후 커뮤니케이션의 핵심",
      paragraphs: [
        "사과문에서 중요한 건 멋진 표현보다 책임의 범위와 재발 방지야. 무엇이 문제였는지 인정하고, 어떤 조치를 했고, 앞으로 어떤 검수 체계를 둘지 말해야 소비자가 납득할 여지가 생겨.",
        "브랜드는 실수를 완전히 피할 수는 없지만, 실수 이후의 태도는 설계할 수 있어. 빠른 중단, 명확한 설명, 내부 프로세스 개선까지 이어질 때 이슈는 단순 사고가 아니라 학습의 계기가 돼."
      ]
    }
  ],
  c06: [
    {
      title: "소비자 레시피가 브랜드 자산이 되는 과정",
      paragraphs: [
        "불닭은 브랜드가 만든 사용법보다 소비자가 만든 조합이 더 크게 움직인 사례야. 사람들은 제품을 그대로 먹는 데서 멈추지 않고, 자기 입맛과 지역 문화에 맞게 다시 조립해.",
        "이때 브랜드의 역할은 모든 레시피를 통제하는 것이 아니라 잘 퍼지는 사용법을 발견하고, 안전하고 매력적인 방식으로 공식화하는 거야. 소비자 창작을 존중할수록 브랜드는 더 넓은 언어를 얻게 돼."
      ]
    },
    {
      title: "글로벌 캠페인으로 가져가는 법",
      paragraphs: [
        "국가별로 같은 매운맛이라도 받아들이는 방식은 다르다. 어떤 곳에서는 챌린지로, 어떤 곳에서는 치즈나 우유와 섞는 레시피로, 또 어떤 곳에서는 친구와 함께 먹는 놀이로 움직일 수 있어.",
        "그래서 글로벌 콘텐츠는 하나의 카피를 번역하는 방식보다 지역별 소비 장면을 모으는 방식이 좋아. 현지 이용자가 이미 하고 있는 행동을 캠페인의 출발점으로 삼으면 훨씬 자연스럽게 퍼져."
      ]
    }
  ],
  c07: [
    {
      title: "팬덤은 경기장 밖에서도 움직인다",
      paragraphs: [
        "KBO 팬덤의 힘은 경기 당일에만 생기지 않아. 유니폼을 고르고, 좌석을 예매하고, 응원가를 연습하고, 맛집을 찾는 준비 과정부터 이미 콘텐츠가 시작돼.",
        "브랜드 입장에서는 경기장 안 광고판보다 이 앞뒤의 생활 동선이 더 흥미로울 수 있어. 팬들이 실제로 돈과 시간을 쓰는 순간을 보면 협업 지점이 훨씬 구체적으로 보인다."
      ]
    },
    {
      title: "협업할 때 잊지 말아야 할 감각",
      paragraphs: [
        "스포츠 팬덤은 애정이 큰 만큼 어색한 접근에도 민감해. 팀 컬러를 대충 쓰거나 응원 문화를 겉핥기하면 팬들은 금방 알아차린다.",
        "좋은 협업은 팬이 이미 하는 행동을 더 편하게, 더 즐겁게 만들어준다. 이동, 대기, 응원, 인증, 굿즈 보관처럼 작은 불편을 해결하는 쪽이 오히려 브랜드 호감으로 이어지기 쉽다."
      ]
    }
  ],
  c08: [
    {
      title: "산이 목적지가 아니라 하루의 콘셉트가 됐다",
      paragraphs: [
        "산트립은 정상 정복보다 하루를 어떻게 꾸미느냐에 더 가깝다. 아침 이동, 가벼운 산행, 근처 카페, 지역 맛집, 숙소나 온천까지 묶이면 하나의 주말 코스가 돼.",
        "그래서 콘텐츠도 등산 팁 하나보다 코스 전체를 보여줄 때 반응이 좋아. 사람들이 원하는 건 '나도 따라 할 수 있겠다'는 구체적인 상상이고, 그 상상이 저장과 공유를 만든다."
      ]
    },
    {
      title: "브랜드가 들어갈 수 있는 장면",
      paragraphs: [
        "아웃도어 브랜드는 장비의 기능을 실제 코스 안에서 보여줄 수 있고, F&B 브랜드는 산행 전후의 보상 장면에 자연스럽게 들어갈 수 있어. 지역 브랜드라면 교통, 숙소, 맛집을 묶은 큐레이션이 잘 맞아.",
        "다만 산트립 콘텐츠는 안전과 환경 메시지를 같이 가져가야 한다. 좋은 풍경만 보여주면 예쁘지만, 준비물과 매너까지 알려줘야 브랜드가 책임감 있게 보인다."
      ]
    }
  ],
  c09: [
    {
      title: "AI가 바꾸는 건 속도만이 아니다",
      paragraphs: [
        "생성형 AI는 마케터가 더 빨리 쓰게 해주는 도구이기도 하지만, 더 많은 버전을 동시에 운영하게 만드는 도구이기도 해. 같은 캠페인 안에서도 고객군별 문장, 이미지, 제안이 달라질 수 있거든.",
        "이 변화가 커질수록 마케터의 일은 제작보다 판단에 가까워져. 어떤 가설을 만들지, 어떤 표현은 브랜드답지 않은지, 어떤 데이터를 다음 실험에 반영할지 정하는 능력이 더 중요해져."
      ]
    },
    {
      title: "친근하지만 책임 있게 쓰는 법",
      paragraphs: [
        "AI 개인화는 잘 쓰면 고객에게 필요한 제안을 더 빨리 보여줄 수 있어. 하지만 과하면 '나를 너무 많이 알고 있다'는 느낌을 줄 수 있고, 그 순간 호감은 부담으로 바뀐다.",
        "그래서 개인화 메시지는 유용성, 투명성, 선택권을 같이 설계해야 해. 왜 이 제안을 받는지 알 수 있고, 원치 않으면 조정할 수 있어야 브랜드에 대한 신뢰가 유지돼."
      ]
    }
  ],
  c10: [
    {
      title: "공개 반응만으로는 부족해졌다",
      paragraphs: [
        "이제 소셜 성과를 볼 때 좋아요와 댓글만 보면 놓치는 것이 많아. 사람들은 공개적으로 반응하지 않아도 DM으로 보내고, 단체방에서 이야기하고, 나중에 조용히 링크를 다시 열어.",
        "X챗과 DM 분리 흐름은 이런 변화가 플랫폼 기능 안에서도 보인다는 신호야. 콘텐츠의 진짜 힘이 공개 지표보다 닫힌 대화에서 더 크게 나타나는 경우가 늘고 있어."
      ]
    },
    {
      title: "마케터가 바꿔야 할 질문",
      paragraphs: [
        "앞으로는 '얼마나 많이 봤나'와 함께 '누구에게 보내고 싶어졌나'를 물어야 해. 친구에게 보내기 좋은 한 줄, 팀 채팅방에서 쓸 수 있는 체크리스트, 저장해둘 만한 요약이 더 중요해질 수 있어.",
        "브랜드 채널도 공개 피드와 폐쇄형 커뮤니티를 따로 보지 말고 이어서 설계하는 편이 좋아. 피드에서 발견하고, DM에서 공유하고, 작은 커뮤니티에서 더 깊게 이야기하게 만드는 흐름을 그려야 한다."
      ]
    }
  ],
  c11: [
    {
      title: "현실 공간화가 강한 이유",
      paragraphs: [
        "게임 IP는 화면 안에서 이미 많은 시간을 쌓은 세계야. 그 세계가 오프라인으로 나오면 팬에게는 단순한 팝업이 아니라 '내가 알던 장소에 들어갔다'는 감각이 생겨.",
        "메이플 아일랜드 같은 협업은 그래서 사진 한 장의 장식보다 동선과 역할놀이가 중요해. 팬이 걷고, 찾고, 줄 서고, 미션을 수행하는 과정 자체가 콘텐츠가 된다."
      ]
    },
    {
      title: "IP 협업을 설계할 때의 기준",
      paragraphs: [
        "좋은 IP 협업은 팬에게는 디테일을, 처음 온 사람에게는 이해 가능한 안내를 준다. 둘 중 하나만 잡으면 팬서비스가 너무 폐쇄적이거나, 반대로 팬에게는 싱거운 이벤트가 될 수 있어.",
        "브랜드는 굿즈와 포토존을 넘어서 방문 이유를 단계별로 설계해야 해. 입장 전 기대, 현장 체류, 구매, 인증, 재방문까지 이어질 때 IP는 진짜 공간 경험이 된다."
      ]
    }
  ],
  c12: [
    {
      title: "굿즈가 방문을 만드는 방식",
      paragraphs: [
        "캐릭터 굿즈 협업은 제품을 먹고 끝나는 경험을 수집 경험으로 바꿔. 사람들은 메뉴보다 먼저 어떤 굿즈가 나왔는지, 어디에 재고가 있는지, 친구와 교환할 수 있는지를 확인해.",
        "이 과정에서 매장은 단순 판매처가 아니라 팬들이 움직이는 장소가 된다. 방문, 인증, 재고 공유, 후기까지 한 번에 만들어지니 외식 브랜드 입장에서는 강력한 유입 장치가 될 수 있어."
      ]
    },
    {
      title: "품절까지 캠페인의 일부로 봐야 한다",
      paragraphs: [
        "한정 굿즈는 희소성이 매력인 동시에 불만의 시작점이기도 해. 수량, 판매 시간, 재입고 안내가 불분명하면 기대감은 빠르게 피로감으로 바뀐다.",
        "그래서 콜라보 캠페인은 예쁜 굿즈 제작만큼 운영 설계가 중요해. 매장별 안내, 대기 경험, 교환 정책, 재고 공지를 꼼꼼히 준비해야 팬의 열기가 브랜드 호감으로 남는다."
      ]
    }
  ]
};

Object.entries(FRIENDLY_ARTICLE_SUPPLEMENT_SECTIONS).forEach(([id, sections]) => {
  if (MARKETER_ARTICLES[id]) {
    MARKETER_ARTICLES[id].sections = [
      ...(MARKETER_ARTICLES[id].sections || []),
      ...sections,
    ];
  }
});

const NATURAL_ARTICLE_OVERRIDES = {
  c01: {
    lead: "릴스를 넘기다 보면 화면이 여러 칸으로 쪼개진 영상이 자꾸 보여. 한 명은 등교 중이고, 한 명은 침대 위에서 아직 정신을 못 차리고, 또 다른 한 명은 카페에서 과제하다가 갑자기 밥 먹는 장면으로 넘어가. 엄청난 사건은 없는데 이상하게 계속 보게 되는 그 포맷. 쉽게 말하면 셋로그는 친구들의 하루를 한 화면에 모아보는 우정형 숏폼 기록이야.",
    readMinutes: 8,
    sections: [
      {
        title: "📱 따로 찍었는데 같이 노는 느낌, 셋로그는 어떻게 커졌을까?",
        paragraphs: [
          "셋로그의 정확한 시작점은 더 확인이 필요하지만, 지금 SNS에서 보이는 흐름은 꽤 선명해. 예전 브이로그가 한 사람의 하루를 따라가는 방식이었다면, 셋로그는 질문을 바꿔. “내 하루 어때?”가 아니라 “우리 하루를 한 번에 보면 어떨까?”에 가까워.",
          "처음에는 친구들끼리 같은 시간대에 짧은 영상을 찍어 모으는 방식으로 보였고, 이제는 화면 분할 자체가 놀이 방식이 됐어. 장소는 다 다른데 같은 화면 안에 있으니까 단톡방을 영상으로 만든 느낌이 나거든.",
          "그리고 여기서 더 재밌어지는 건 각자의 캐릭터야. 매번 먹는 장면만 있는 친구, 늘 이동 중인 친구, 공부하는 척하다가 딴짓하는 친구. 별일 없는 하루가 모이면 친구들끼리만 아는 관계성이 보여. 바로 이 지점이 셋로그의 말맛이야."
        ]
      },
      {
        title: "💬 사람들은 왜 셋로그에 빠졌을까?",
        paragraphs: [
          "첫 번째 이유는 “나도 할 수 있겠다”는 낮은 문턱이야. 비싼 카메라나 어려운 편집이 필요한 게 아니라, 지금 내 앞의 장면을 2초만 찍어도 참여할 수 있어. 책상, 지하철 창문, 편의점 봉투, 침대 위 이불까지 전부 소재가 돼.",
          "두 번째는 느슨한 연결감이야. 요즘은 매일 만나지 않아도 스토리를 보고, 길게 통화하지 않아도 DM으로 안부를 주고받잖아. 셋로그는 그 감정을 영상으로 보여줘. 몸은 따로 있는데 기록은 같이 남기는 방식.",
          "세 번째는 관찰 예능 같은 재미야. 친구마다 반복되는 루틴과 성격이 보이니까 “얘 또 이러고 있네”라는 반응이 자연스럽게 나와. 이건 약간 친구 단톡방에서 서로의 하루를 놀리듯 공유하는 재미와 비슷해."
        ]
      },
      {
        title: "🚀 피드에서 잘 퍼지는 이유는 꽤 단순해",
        paragraphs: [
          "어떻게 이게 피드를 타고 퍼졌을까? 일단 결과물이 직관적이야. 처음 보는 사람도 3초 안에 “아, 여러 명의 하루를 동시에 보여주는 거구나” 하고 이해해.",
          "또 셋로그는 공유를 부르는 포맷이야. 댓글이나 DM에서 “우리도 이거 하자”, “너는 먹는 파트 맡아라” 같은 말이 바로 나오기 좋거든. 인스타그램에서는 스토리 공유와 DM에 잘 맞고, 쇼츠나 틱톡에서는 빠른 컷 전환과 반복 포맷으로 확장되기 좋아.",
          "X에서는 캡처 한 장과 문장 밈으로도 번질 수 있어. 예를 들면 “우리 셋로그 찍으면 내 파트는 90% 누워 있음” 같은 식. 보는 콘텐츠이면서 동시에 친구를 소환하는 콘텐츠라는 점이 강해."
        ]
      },
      {
        title: "🧡 브랜드는 셋로그를 어떻게 써볼 수 있을까?",
        paragraphs: [
          "셋로그는 브랜드가 앞에 나서서 설명하기보다, 브랜드 안팎의 사람들을 보여줄 때 더 자연스럽게 살아나. 핵심은 예쁜 광고가 아니라 “같이 살아가는 장면”을 만드는 거야."
        ],
        subsections: [
          {
            title: "🎒 직원들의 하루를 쪼개서 보여주기",
            paragraphs: [
              "신제품 출시 전날 마케터, 디자이너, 개발자, CS 담당자의 하루를 같은 시간대별로 묶어 보여줄 수 있어. 회의 중인 사람, 최종 시안을 보는 사람, 고객 문의를 준비하는 사람의 장면이 모이면 제품 뒤의 사람들이 보이거든.",
              "B2B, 스타트업, 채용 브랜딩에 특히 잘 맞아. 소비자에게 “우리 제품 좋아요”라고 말하기보다 “이런 사람들이 만들고 있어요”를 보여주는 방식이니까."
            ]
          },
          {
            title: "🛍️ 고객의 사용 순간을 모아보기",
            paragraphs: [
              "텀블러 브랜드라면 아침 출근길, 학교 책상, 운동 후, 밤 산책 장면을 모아 하나의 고객 셋로그를 만들 수 있어. 이건 제품 설명이 아니라 제품이 하루에 들어가는 방식을 보여주는 콘텐츠야.",
              "소비자 참여형 캠페인으로도 확장하기 좋아. 단, 실제 고객 영상을 쓸 때는 동의와 초상권 확인이 먼저라는 점은 꼭 챙겨야 해."
            ]
          },
          {
            title: "🧸 캐릭터에게 하루를 만들어주기",
            paragraphs: [
              "캐릭터 IP가 있는 브랜드라면 각 캐릭터의 성격을 하루 루틴으로 보여줄 수 있어. 부지런한 캐릭터는 아침 회의, 먹는 걸 좋아하는 캐릭터는 간식 타임, 느긋한 캐릭터는 아직 침대.",
              "세계관 설명을 길게 하지 않아도 캐릭터성이 바로 전달돼서 굿즈, 팝업, 게임 IP와 궁합이 좋아."
            ]
          }
        ]
      },
      {
        title: "⚠️ 셋로그에서 브랜드가 조심해야 할 것",
        paragraphs: [
          "가장 큰 리스크는 억지 자발성이야. 셋로그의 매력은 자연스러움인데, 브랜드가 대본을 너무 빡세게 짜면 바로 광고 냄새가 나. 직원 콘텐츠라면 참여가 진짜 자발적인지도 중요해.",
          "또 유행 타이밍도 봐야 해. 포맷이 쉬운 만큼 빨리 퍼지고 빨리 식을 수 있어. 너무 늦게 따라 하면 “이제 와서?”라는 반응이 나올 수 있으니, 큰 캠페인보다 가벼운 테스트로 시작하는 편이 좋아.",
          "결국 셋로그는 화면을 쪼개는 유행이 아니라, 각자 살지만 같이 연결되고 싶은 마음을 보여주는 포맷이야. 브랜드가 얻어야 할 인사이트는 하나야. 완벽한 광고보다 함께 살아가는 장면이 더 쉽게 마음을 연다."
        ]
      }
    ],
    summary: "셋로그는 “각자 살지만 같이 연결되고 싶은 마음”을 짧은 영상으로 보여주는 Z세대식 우정 기록 포맷이다."
  },
  c02: {
    lead: "요즘 타임라인에서 갑자기 낯선 단어가 튀어나올 때가 있어. 뜻을 물어보면 설명은 길지 않은데, 이상하게 발음이 귀에 남는 말. 영크크도 딱 그런 쪽에 가까워. 의미를 완벽히 알아야 웃긴 밈이라기보다, 소리와 리듬이 먼저 퍼지고 사람들이 뒤늦게 맥락을 붙이는 타입이야.",
    readMinutes: 7,
    sections: [
      {
        title: "🎧 영크크는 뜻보다 소리로 먼저 도착한 밈이야",
        paragraphs: [
          "영크크는 코르티스의 YOUNGCREATORCREW 관련 표현에서 파생된 흐름으로 알려져 있어. 다만 지금 SNS에서 소비되는 방식은 단순한 원문 설명보다, “말 자체가 웃기고 입에 붙는다”는 쪽에 더 가까워 보여.",
          "처음엔 팬덤 내부에서 알아보는 표현에 가까웠다면, 이후에는 맥락을 정확히 모르는 사람들도 소리와 분위기만 보고 따라 쓰기 시작했어. 여기서 밈의 성격이 바뀌어. 설명 가능한 정보에서 따라 말하고 싶은 리듬으로 넘어간 거지.",
          "이런 밈은 오래 설명하면 맛이 빠져. 누가 “영크크가 뭔데?”라고 물을 때, 모두가 친절하게 설명하기보다 댓글로 다시 한 번 놀리는 분위기가 같이 생기거든."
        ]
      },
      {
        title: "🤔 사람들은 왜 이런 난해한 말에 반응할까?",
        paragraphs: [
          "이유는 간단해. 모두가 바로 이해하는 말보다, 아는 사람만 아는 말이 더 강한 소속감을 만들 때가 있어. 영크크는 약간 비밀 암호처럼 굴러가. 정확한 뜻보다 “너도 이거 봤구나?” 하는 감각이 먼저야.",
          "또 발음 자체가 짧고 튀어. 댓글, 캡션, 릴스 자막에 넣기 쉬워서 한 번 보이면 계속 반복돼. 밈은 가끔 의미보다 입에 붙는 속도가 더 중요하다는 말씀.",
          "10대~20대가 이런 말을 좋아하는 이유도 여기에 있어. 너무 완성된 유행어보다, 살짝 어설프고 낯설고 이상한 말이 오히려 자기들끼리 변형하기 좋거든."
        ]
      },
      {
        title: "📲 영크크는 어디서 잘 퍼질까?",
        paragraphs: [
          "영크크 같은 말은 긴 글보다 짧은 캡션에서 힘을 받아. 릴스 자막, 틱톡 댓글, X의 한 줄 반응처럼 맥락을 길게 설명하지 않아도 되는 곳과 잘 맞아.",
          "특히 X에서는 문장 밈으로 변형되기 쉬워. “오늘 상태 영크크임”, “이 회의 영크크하다”처럼 원래 의미와 조금 멀어져도 소리의 느낌으로 쓰일 수 있어. 이건 정확성보다 분위기가 중요한 밈의 전형적인 확장 방식이야.",
          "다만 브랜드 입장에서는 이게 쉽지 않아. 공식 계정이 너무 진지하게 쓰는 순간 밈의 생기가 빠질 수 있어. 유행어는 아는 척보다 모르는 척 한 발 늦게 웃는 쪽이 더 자연스러울 때가 많아."
        ]
      },
      {
        title: "🪄 브랜드는 어떻게 접근하면 좋을까?",
        paragraphs: [
          "영크크는 메인 캠페인 슬로건으로 쓰기보다, 짧은 리액션형 콘텐츠나 댓글 톤 테스트에 더 잘 맞아. 중요한 건 “우리도 밈 알아요”를 과시하는 게 아니라, 사람들이 왜 이런 소리를 재미있어하는지 읽는 거야."
        ],
        subsections: [
          {
            title: "💬 댓글 리액션용 말맛 테스트",
            paragraphs: [
              "커뮤니티 운영이 활발한 브랜드라면 댓글에서 가볍게 반응하는 방식으로 쓸 수 있어. 예를 들어 신제품 티저에 유저가 “이거 뭔데요?”라고 달면, 브랜드가 너무 설명하지 않고 짧고 장난스럽게 받아치는 식.",
              "단, 사용 전에는 실제 맥락을 꼭 확인해야 해. 팬덤에서 나온 표현은 원래 의미를 무시하면 바로 어색해질 수 있어."
            ]
          },
          {
            title: "🎞️ 숏폼 자막의 리듬으로 활용하기",
            paragraphs: [
              "영크크 자체를 크게 외치기보다, 짧고 반복되는 발음감을 숏폼 자막 리듬에 참고할 수 있어. 예를 들어 브랜드만의 내부 유행어, 제품 별명, 캠페인 약어를 만들 때 소리의 재미를 먼저 보는 거야.",
              "이건 밈을 베끼는 게 아니라 밈이 퍼지는 방식을 배우는 쪽에 가까워."
            ]
          },
          {
            title: "🧪 빠른 테스트 후 빠르게 빠지기",
            paragraphs: [
              "밈 수명이 짧은 표현은 오래 붙잡으면 촌스러워져. 24시간 스토리, 하루짜리 X 포스트, 릴스 댓글 이벤트처럼 가볍게 쓰고 반응을 보는 편이 좋아.",
              "반응이 애매하면 바로 접는 것도 전략이야. 밈은 끈기보다 타이밍이 중요하니까."
            ]
          }
        ]
      },
      {
        title: "⚠️ 브랜드가 제일 조심해야 할 건 아는 척이야",
        paragraphs: [
          "영크크 같은 밈은 공식 계정이 힘주어 설명하는 순간 재미가 줄어들 수 있어. 특히 10대~20대는 “이 브랜드가 우리 말을 가져다 쓴다”는 느낌에 민감해.",
          "그러니까 이 밈을 쓸지 말지보다 먼저 봐야 할 건, 우리 브랜드가 이런 말투를 자연스럽게 소화할 수 있느냐야. 내부 결재를 여러 번 거쳐야 하는 계정이라면, 차라리 관찰 콘텐츠로 풀어내는 편이 더 안전해.",
          "결국 영크크는 뜻보다 감각이 먼저 움직이는 밈이야. 브랜드가 얻어야 할 인사이트는 단어 하나가 아니라, 말이 소리와 분위기로 퍼지는 방식에 있어."
        ]
      }
    ],
    summary: "영크크는 의미보다 소리와 소속감이 먼저 퍼지는 밈이라, 브랜드는 따라 쓰기보다 확산 감각을 읽는 편이 더 안전하다."
  },
  c03: {
    lead: "힙합 디스전은 이제 곡만 듣고 끝나는 이벤트가 아니야. 누가 어떤 가사를 썼는지, 라이브에서 뭐라고 해명했는지, 커뮤니티가 누구 손을 들어줬는지까지 전부 콘텐츠가 돼. 빅나티와 스윙스 이슈도 음악보다 빠르게 댓글과 캡처, 요약본으로 번진 케이스로 볼 수 있어.",
    readMinutes: 8,
    sections: [
      {
        title: "🎤 디스전은 곡에서 시작하지만, 요즘은 타임라인에서 완성돼",
        paragraphs: [
          "이 이슈의 구체적인 사실관계는 기사와 당사자 발언 확인이 필요하지만, SNS에서 소비되는 방식은 분명해. 사람들은 원곡 전체를 듣기 전에 짧은 클립, 가사 캡처, 해명 장면, 주변 반응부터 접해.",
          "처음엔 음악 팬덤 안에서 시작된 논쟁이었을 수 있어. 하지만 누가 먼저 공격했는지, 누가 더 날카롭게 받아쳤는지, 누가 선을 넘었는지 같은 판정 포인트가 생기면 커뮤니티 전체의 구경거리가 돼.",
          "이때 중요한 건 원본보다 편집본이야. 15초짜리 클립 하나가 “이 장면 봄?”이라는 말과 함께 퍼지고, 사람들은 그 조각을 기준으로 자기 의견을 만들기 시작해."
        ]
      },
      {
        title: "🔥 사람들은 왜 이런 이슈를 계속 보게 될까?",
        paragraphs: [
          "디스전은 구조가 너무 직관적이야. A와 B가 있고, 공방이 있고, 판정이 있어. 그래서 모르는 사람도 쉽게 끼어들 수 있어. 마치 스포츠 경기 하이라이트처럼 “누가 이겼냐”를 바로 묻는 재미가 있거든.",
          "또 커뮤니티에는 해석 욕구가 있어. 같은 가사를 두고도 누구는 센스라고 하고, 누구는 선 넘었다고 해. 이 의견 차이가 댓글을 계속 부르고, 댓글은 다시 새로운 콘텐츠가 돼.",
          "10대~20대에게 이런 이슈는 단순한 음악 감상이 아니라 실시간 참여형 관전이야. 친구에게 링크 보내고, 쇼츠 반응 보고, X에서 한 줄 평을 읽으면서 이슈를 함께 소비하는 느낌이 생겨."
        ]
      },
      {
        title: "📡 SNS 확산의 핵심은 캡처 가능한 장면이야",
        paragraphs: [
          "어떻게 이게 피드를 타고 퍼졌을까? 힙합 디스전은 짧은 문장, 강한 표정, 직설적인 가사처럼 캡처 가능한 재료가 많아. 그래서 릴스와 쇼츠에서는 반응 영상으로, X에서는 짤과 문장 밈으로 빠르게 바뀐다.",
          "특히 X는 실시간 판정 문화와 잘 맞아. 누가 더 잘했는지, 누가 민망했는지, 누가 이득을 봤는지 한 줄로 말하기 좋거든. 커뮤니티에서는 긴 설명보다 “이건 누구 승” 같은 압축 문장이 더 빨리 퍼져.",
          "다만 이슈가 자극적일수록 맥락이 잘려나가기 쉬워. 그래서 콘텐츠로 다룰 때는 원문, 발언, 기사 출처를 구분해주는 태도가 필요해."
        ]
      },
      {
        title: "🧭 브랜드는 이걸 어떻게 참고할 수 있을까?",
        paragraphs: [
          "브랜드가 디스전을 소재로 장난치는 건 위험할 수 있어. 대신 사람들이 실시간 이슈를 어떻게 요약하고 판정하고 밈화하는지를 배우는 편이 좋아."
        ],
        subsections: [
          {
            title: "🗂️ 이슈 타임라인 정리형 콘텐츠",
            paragraphs: [
              "미디어, 엔터, 커뮤니티 기반 서비스라면 사건을 자극적으로 키우기보다 “현재까지 확인된 흐름”을 정리하는 콘텐츠를 만들 수 있어. 확인된 사실과 커뮤니티 반응을 구분해주면 신뢰도가 생겨.",
              "예시는 “곡 공개 → 반응 확산 → 해명 클립 → 커뮤니티 판정”처럼 단계별로 보여주는 카드뉴스가 될 수 있어."
            ]
          },
          {
            title: "💬 댓글 판정 문화를 읽는 소셜 리스닝",
            paragraphs: [
              "이런 이슈는 댓글의 단어가 중요해. 사람들이 누구를 응원하는지보다 어떤 표현으로 판단하는지 보면, 현재 커뮤니티의 감정 언어를 읽을 수 있어.",
              "브랜드 위기 대응에서도 도움이 돼. 해명문이 어떻게 캡처되고, 어떤 한 줄로 요약되는지 미리 생각해야 하니까."
            ]
          },
          {
            title: "🎧 음악/스트리트 브랜드의 조심스러운 큐레이션",
            paragraphs: [
              "음악이나 패션 브랜드라면 공방 자체를 소비하기보다, 힙합 문화에서 배틀과 표현이 갖는 의미를 다루는 식으로 접근할 수 있어. 단, 특정 인물 조롱이나 편 가르기는 피해야 해.",
              "확인되지 않은 발언을 사실처럼 쓰면 바로 역풍이 올 수 있다는 점도 잊지 말자."
            ]
          }
        ]
      },
      {
        title: "⚠️ 자극적인 이슈일수록 브랜드는 한 발 물러서야 해",
        paragraphs: [
          "디스전은 조회수를 만들기 쉽지만, 브랜드가 끼어들기에는 리스크가 크다. 개인 간 갈등, 명예훼손, 팬덤 감정이 얽혀 있을 수 있기 때문이야.",
          "마케터가 봐야 할 건 누가 이겼는지가 아니라, 이슈가 어떤 속도로 조각나고 퍼지는지야. 원본보다 요약본이 빠르게 퍼지고, 반응이 다시 콘텐츠가 되는 구조.",
          "이 이슈가 보여주는 핵심은 명확해. 요즘 사람들은 뉴스를 읽듯 이슈를 소비하지 않고, 댓글과 클립으로 실시간 판정하면서 참여한다."
        ]
      }
    ],
    summary: "빅나티 vs 스윙스 이슈는 음악 공방보다 커뮤니티가 이슈를 요약하고 판정하고 재가공하는 방식이 더 중요한 관찰 포인트다."
  },
  c04: {
    lead: "삼전이냐 하닉이냐. 원래라면 증권 기사에서나 볼 법한 이야기가 요즘은 점심시간 대화, 커뮤니티 댓글, 짧은 밈으로 내려왔어. HBM, AI 반도체, 목표주가 같은 말은 어렵지만 사람들은 이 이슈를 꽤 가볍게 주고받아. 이유는 간단해. 내 돈, 내 일, 내 미래와 연결된 이야기처럼 느껴지기 때문이야.",
    readMinutes: 8,
    sections: [
      {
        title: "💹 어려운 반도체 뉴스가 왜 밈처럼 보일까?",
        paragraphs: [
          "HBM은 AI 반도체 성능과 연결되는 핵심 부품으로 자주 언급돼. 이 흐름 속에서 삼성전자와 SK하이닉스가 비교되고, 주가와 목표가 이야기가 커지면서 대중적인 관심도 같이 올라왔어.",
          "처음에는 투자자와 업계 뉴스 중심이었겠지만, 지금은 “삼전 존버”, “하닉 살 걸” 같은 말로 가볍게 번역돼. 어려운 산업 뉴스가 개인의 계좌 감정과 만나면서 밈이 된 거야.",
          "여기서 포인트는 사람들이 기술을 완벽히 이해해서 말하는 게 아니라는 점이야. 복잡한 키워드를 자기 생활 언어로 바꾸고, 그걸로 현재 분위기를 확인하는 거지."
        ]
      },
      {
        title: "🧠 사람들은 왜 이런 이슈에 반응할까?",
        paragraphs: [
          "첫 번째는 체감 가능성이야. 주식이 있는 사람에게는 계좌 이슈고, 없는 사람에게도 한국 대표 기업의 흐름처럼 느껴져. 경제 뉴스가 갑자기 내 주변 이야기처럼 내려오는 순간 반응이 커져.",
          "두 번째는 진영 놀이야. 삼전파, 하닉파처럼 나누면 복잡한 산업 구도가 갑자기 말하기 쉬워져. 사람들은 어려운 뉴스도 비교 구도로 바뀌면 훨씬 쉽게 참여해.",
          "세 번째는 미래감이야. AI가 뜨고, 반도체가 중요하다는 말은 많이 들었지만 막연하잖아. HBM 이슈는 그 막연한 미래를 주가라는 숫자로 보여주는 장치처럼 작동해."
        ]
      },
      {
        title: "📊 SNS에서 퍼지는 방식은 투자 정보보다 감정 공유에 가까워",
        paragraphs: [
          "어떻게 이게 피드를 타고 퍼졌을까? 숫자는 캡처하기 좋고, 상승과 하락은 감정 반응을 바로 불러. 그래서 커뮤니티에서는 차트 한 장, 기사 제목 한 줄, 댓글 캡처만으로도 대화가 시작돼.",
          "X에서는 “나만 또 못 샀지” 같은 자조 밈으로 번지고, 유튜브 쇼츠에서는 어려운 용어를 30초 안에 풀어주는 콘텐츠가 잘 맞아. 블로그나 뉴스레터에서는 HBM이 왜 중요한지 차분히 설명하는 글이 저장 가치가 있어.",
          "다만 금융 이슈는 조심해야 해. 사람들은 가볍게 말해도 실제 돈이 걸려 있기 때문에, 브랜드가 다룰 때는 투자 권유처럼 보이지 않게 선을 분명히 해야 해."
        ]
      },
      {
        title: "🧩 마케터는 이 이슈를 어떻게 콘텐츠로 만들 수 있을까?",
        paragraphs: [
          "핵심은 종목 추천이 아니라 맥락 번역이야. 어려운 경제 키워드를 사람들이 이해할 수 있는 생활 언어로 바꿔주는 콘텐츠가 안전하고 유용해."
        ],
        subsections: [
          {
            title: "📚 HBM을 10초 언어로 풀어주기",
            paragraphs: [
              "금융, 테크, 교육 브랜드라면 “HBM이 왜 AI 시대에 자꾸 언급될까?”를 쉽게 설명하는 카드뉴스를 만들 수 있어. 서버, 메모리, 속도 같은 말을 비유로 풀어주면 저장성이 생겨.",
              "예시는 “AI가 빨리 일하려면 책상 위에 자료가 빨리 올라와야 하는데, HBM은 그 책상 역할에 가깝다”처럼 설명하는 방식이야."
            ]
          },
          {
            title: "🗣️ 개미들의 말투를 관찰하는 커뮤니티 리포트",
            paragraphs: [
              "투자 플랫폼이나 경제 미디어라면 댓글 속 표현을 분석해볼 수 있어. “존버”, “못 샀다”, “고점인가” 같은 말은 단순 농담이 아니라 대중의 불안과 기대를 보여줘.",
              "단, 특정 종목 매수/매도 판단으로 이어지지 않도록 정보형 톤을 유지해야 해."
            ]
          },
          {
            title: "🧾 브랜드 내부 교육 콘텐츠로 바꾸기",
            paragraphs: [
              "B2B나 테크 기업은 이 이슈를 직원용 트렌드 브리핑으로 풀어도 좋아. AI 인프라, 반도체 공급망, 투자 심리가 어떻게 연결되는지 이해시키는 자료로 쓸 수 있어.",
              "마케터가 기술 뉴스를 알아야 하는 이유를 설명하기에도 좋은 소재야. 고객도 이미 점심시간에 이 이야기를 하고 있으니까."
            ]
          }
        ]
      },
      {
        title: "⚠️ 숫자와 돈이 걸린 이슈는 안전선이 필요해",
        paragraphs: [
          "브랜드가 이 이슈를 다룰 때 가장 조심해야 할 건 투자 조언처럼 보이는 거야. 목표가, 상승 가능성, 매수 타이밍을 단정하면 콘텐츠의 성격이 완전히 달라져.",
          "확인된 기사와 데이터를 바탕으로 용어와 분위기를 설명하고, 불확실한 전망은 불확실하다고 말해야 해. 이건 신뢰의 문제야.",
          "결국 삼전 vs 하닉 이슈는 AI 시대의 큰 흐름을 사람들이 얼마나 생활 언어로 받아들이고 있는지 보여줘. 마케터에게 필요한 건 숫자 예측이 아니라, 대중이 기술 뉴스를 어떤 감정으로 소비하는지 읽는 능력이야."
        ]
      }
    ],
    summary: "삼전 vs 하닉/HBM 이슈는 어려운 AI 반도체 뉴스를 사람들이 계좌 감정과 미래감으로 번역해 소비하는 대중형 경제 밈이다."
  },
  c05: {
    lead: "프로모션은 할인율만으로 판단되지 않아. 어떤 날짜에, 어떤 단어로, 어떤 이미지와 함께 나가느냐가 전부 메시지가 돼. 스타벅스 탱크데이 논란은 브랜드 캘린더가 단순 일정표가 아니라 사회적 맥락을 함께 봐야 하는 도구라는 걸 보여준 사례야.",
    readMinutes: 8,
    sections: [
      {
        title: "🗓️ 좋은 이벤트도 날짜를 만나면 다른 의미가 될 수 있어",
        paragraphs: [
          "보도에 따르면 스타벅스는 5.18 민주화운동 기념일에 탱크데이 관련 이벤트를 진행했다가 비판을 받고 중단 및 사과로 이어졌어. 여기서 중요한 건 단어 하나가 아니라 날짜, 표현, 사회적 기억이 함께 읽혔다는 점이야.",
          "브랜드 내부에서는 프로모션명이었을 수 있어. 하지만 소비자에게는 그날의 역사적 맥락과 단어가 먼저 보였을 수 있지. 마케팅은 의도보다 수용되는 방식이 더 크게 작동할 때가 있어.",
          "이런 이슈는 “몰랐다”로 끝나기 어렵다. 규모가 큰 브랜드일수록 소비자는 더 높은 검수 기준을 기대하거든."
        ]
      },
      {
        title: "🧭 사람들은 왜 강하게 반응했을까?",
        paragraphs: [
          "첫 번째 이유는 기념일의 무게야. 어떤 날짜는 단순한 숫자가 아니라 사회적 기억을 담고 있어. 소비자는 모든 브랜드가 완벽하길 기대하는 게 아니라, 최소한의 맥락은 확인하길 기대해.",
          "두 번째는 큰 브랜드에 대한 기준이야. 스타벅스처럼 대중 접점이 큰 브랜드는 실수가 개인의 실수처럼 보이지 않아. 시스템이 작동하지 않았다는 신호로 읽히기 쉬워.",
          "세 번째는 캡처 가능성이야. 이벤트명과 날짜가 한 화면에 잡히면, 긴 설명 없이도 이슈가 퍼질 수 있어. 그래서 브랜드 캘린더 실수는 매우 빠르게 확산돼."
        ]
      },
      {
        title: "📣 SNS에서는 사과문보다 ‘어떻게 통과됐나’가 더 오래 남아",
        paragraphs: [
          "어떻게 이게 피드를 타고 퍼졌을까? 이런 이슈는 X와 커뮤니티에서 특히 빠르게 번져. 사람들은 이벤트 화면을 캡처하고, 날짜와 단어를 붙여서 문제를 설명해. 이해가 빠르기 때문이야.",
          "댓글 반응도 단순해. “이걸 왜 몰랐지?”, “검수는 누가 했지?” 같은 질문이 반복돼. 이 질문은 브랜드의 의도보다 프로세스를 겨냥해.",
          "인스타그램에서는 카드뉴스형 분석으로, 뉴스레터에서는 캠페인 체크리스트 사례로 확장되기 좋아. 단, 논란을 밈처럼 가볍게 소비하면 역풍이 날 수 있어."
        ]
      },
      {
        title: "🧰 브랜드는 이 이슈에서 무엇을 배워야 할까?",
        paragraphs: [
          "이 이슈는 탑승할 유행이 아니라 실무 체크리스트로 가져가야 할 사례야. 마케터가 당장 할 수 있는 건 캠페인 검수의 범위를 넓히는 거야."
        ],
        subsections: [
          {
            title: "📌 민감일 캘린더를 따로 만들기",
            paragraphs: [
              "캠페인 캘린더에 출시일과 할인 기간만 적으면 부족해. 역사적 기념일, 재난 관련 날짜, 사회적 갈등 가능성이 큰 시기를 함께 표시해야 해.",
              "특히 전국 단위 브랜드라면 지역별 기념일과 사회적 맥락도 같이 체크하는 편이 안전해."
            ]
          },
          {
            title: "🔍 단어와 이미지 조합까지 검수하기",
            paragraphs: [
              "문구 하나만 보면 문제 없어 보여도, 날짜와 이미지가 만나면 다른 의미가 될 수 있어. 탱크, 불꽃, 전쟁, 승리 같은 단어는 특정 맥락에서 민감하게 읽힐 수 있어.",
              "검수 단계에서 “이 단어가 오늘 날짜와 만나면 어떻게 보일까?”를 묻는 절차가 필요해."
            ]
          },
          {
            title: "🧯 위기 대응 문장 미리 준비하기",
            paragraphs: [
              "문제가 생긴 뒤에는 빠른 중단, 인정, 재발 방지 설명이 중요해. 사과문은 멋있게 쓰는 글이 아니라 책임의 범위를 명확히 하는 문서야.",
              "브랜드가 배워야 할 건 사과문 기술보다 사고를 줄이는 시스템이야."
            ]
          }
        ]
      },
      {
        title: "⚠️ 브랜드 감수성은 감이 아니라 프로세스야",
        paragraphs: [
          "이 이슈를 다룰 때는 조롱이나 드립을 피해야 해. 역사적 맥락이 있는 사안이기 때문에 가벼운 밈화는 브랜드에도 콘텐츠에도 좋지 않아.",
          "브랜드 담당자가 얻어야 할 인사이트는 명확해. 소비자는 브랜드가 모든 걸 알길 기대하는 게 아니라, 모르면 확인하는 체계를 갖추길 기대해.",
          "결국 브랜드 캘린더는 일정표가 아니라 리스크 지도야. 좋은 프로모션도 맥락을 놓치면 좋은 의도로 읽히지 않을 수 있다는 걸 기억해야 해."
        ]
      }
    ],
    summary: "스타벅스 탱크데이 논란은 캠페인 검수가 날짜, 단어, 사회적 기억까지 함께 봐야 한다는 브랜드 리스크 사례다."
  },
  c06: {
    lead: "불닭은 이제 그냥 매운 라면 하나로 설명하기 어려워. 해외에서는 챌린지로 먹고, 누군가는 치즈를 넣고, 또 누군가는 자기 나라 식재료와 섞어서 새로운 레시피를 만들어. 브랜드가 정한 사용법보다 소비자가 만든 먹는 법이 더 크게 움직이는 흐름. 이게 불닭 글로벌 현지화의 재미있는 포인트야.",
    readMinutes: 7,
    sections: [
      {
        title: "🌶️ 불닭은 매운맛 챌린지를 넘어 레시피 놀이가 됐어",
        paragraphs: [
          "처음 불닭이 해외에서 주목받은 이유 중 하나는 강한 매운맛과 도전성이었어. 먹어보고 반응하는 장면이 영상으로 잘 잡히니까 챌린지형 콘텐츠와 잘 맞았지.",
          "그런데 시간이 지나면서 소비자들은 단순히 “얼마나 맵나”에만 머물지 않았어. 치즈, 크림, 계란, 현지 소스, 고기 토핑처럼 자기 입맛에 맞게 바꾸기 시작했어.",
          "이제 불닭은 제품이면서 동시에 베이스가 됐다고 볼 수 있어. 라면 하나를 사는 게 아니라, 자기만의 조합을 만들 수 있는 재료를 사는 느낌이야."
        ]
      },
      {
        title: "🍽️ 사람들은 왜 자기 레시피를 올릴까?",
        paragraphs: [
          "첫 번째는 반응이 잘 보이기 때문이야. 매운맛은 표정, 소리, 리액션이 바로 나오잖아. 숏폼에서 이만큼 직관적인 소재가 많지 않아.",
          "두 번째는 변형의 재미야. 같은 제품을 먹어도 사람마다 조합이 달라. “나는 이렇게 먹는다”를 보여주는 순간, 단순 리뷰가 아니라 취향 표현이 돼.",
          "세 번째는 작은 성취감이야. 매운맛을 이겨내거나, 더 맛있는 조합을 찾아내거나, 친구에게 추천할 레시피를 만들면 뭔가 발견한 느낌이 생겨. 약간 냉장고 속 재료로 나만의 메뉴를 발명하는 재미와 비슷해."
        ]
      },
      {
        title: "📹 왜 숏폼에서 특히 잘 퍼질까?",
        paragraphs: [
          "불닭 콘텐츠는 시작과 끝이 명확해. 봉지를 뜯고, 소스를 넣고, 먹고, 표정이 바뀌는 흐름이 짧은 영상에 잘 들어가. 결과물이 직관적이라는 뜻이야.",
          "틱톡과 쇼츠에서는 먹방 리액션, 레시피 컷 편집, 친구 도전 영상으로 퍼지기 좋아. 인스타그램에서는 완성샷과 레시피 저장이 강하고, X에서는 “이 조합 미쳤다” 같은 한 줄 추천이 빠르게 돈다.",
          "무엇보다 따라 하기 쉬워. 제품만 있으면 누구나 자기 버전을 만들 수 있으니까 참여 난이도가 낮아."
        ]
      },
      {
        title: "🥢 브랜드는 소비자 레시피를 어떻게 활용할까?",
        paragraphs: [
          "브랜드가 모든 사용법을 통제하기보다, 사람들이 이미 하고 있는 조합을 발견하고 공식화하는 쪽이 자연스러워."
        ],
        subsections: [
          {
            title: "🧀 소비자 조합을 공식 레시피로 큐레이션하기",
            paragraphs: [
              "가장 많이 반복되는 조합을 모아 “이번 주 불닭 조합”처럼 소개할 수 있어. 이때 핵심은 브랜드가 만든 척하지 않는 것. 소비자들이 만든 사용법을 존중하는 톤이 중요해.",
              "예시는 “편의점에서 바로 가능한 3분 조합”, “매운맛 줄이는 입문자 조합” 같은 콘텐츠가 될 수 있어."
            ]
          },
          {
            title: "🌍 나라별 먹는 법 비교하기",
            paragraphs: [
              "글로벌 브랜드라면 국가별 소비자 조합을 비교하는 콘텐츠가 좋아. 같은 제품이 어느 나라에서는 치즈와, 어느 나라에서는 고기 토핑과, 또 다른 곳에서는 현지 소스와 만나는 식.",
              "이건 현지화 메시지를 자연스럽게 보여줘. “우리 제품이 세계 어디서나 똑같이 소비된다”가 아니라 “각자의 방식으로 놀고 있다”는 느낌이니까."
            ]
          },
          {
            title: "🎬 리액션보다 레시피 저장을 노리기",
            paragraphs: [
              "매운맛 리액션은 조회수에 좋지만, 레시피는 저장에 좋아. 마케터라면 둘을 나눠서 봐야 해.",
              "짧은 리액션 영상으로 유입을 만들고, 자세한 조합 카드뉴스로 저장을 유도하면 콘텐츠 흐름이 더 탄탄해져."
            ]
          }
        ]
      },
      {
        title: "⚠️ 매운맛은 재미와 안전이 같이 가야 해",
        paragraphs: [
          "매운맛 챌린지는 자극적이라 퍼지기 쉽지만, 건강 리스크도 같이 따라와. 브랜드가 직접 챌린지를 유도할 때는 무리한 섭취를 부추기지 않는 안내가 필요해.",
          "또 소비자 레시피를 공식 콘텐츠로 가져올 때는 원작자 표기와 사용 허락을 확인해야 해. 커뮤니티에서 나온 아이디어를 브랜드가 그냥 가져가면 반감이 생길 수 있어.",
          "불닭이 보여주는 건 제품의 글로벌 확산만이 아니야. 소비자가 제품을 자기 방식으로 다시 만드는 시대라는 점이 더 중요해."
        ]
      }
    ],
    summary: "불닭 글로벌 현지화는 브랜드가 만든 매운맛을 소비자가 자기 레시피로 다시 해석하며 상품성을 키우는 흐름이다."
  },
  c07: {
    lead: "요즘 야구장은 경기만 보러 가는 곳이 아니야. 유니폼을 고르고, 응원가를 외우고, 먹거리 사진을 찍고, 굿즈를 사고, 경기 끝나고 근처 맛집까지 가는 하루짜리 콘텐츠 코스에 가까워졌어. KBO 팬덤 마케팅은 바로 이 생활 동선에서 힘을 얻고 있어.",
    readMinutes: 7,
    sections: [
      {
        title: "⚾ 야구장은 이제 응원석이 아니라 취향 공간이야",
        paragraphs: [
          "KBO 팬덤은 오래전부터 강했지만, 최근에는 관람 경험이 훨씬 더 넓어졌어. 경기 결과만 보는 게 아니라, 어느 좌석에 앉을지, 어떤 유니폼을 입을지, 어떤 음식을 먹을지까지 콘텐츠가 돼.",
          "처음엔 팬들끼리의 응원 문화가 중심이었다면, 이제는 일상 소비와 연결돼. 데이트 코스, 친구 모임, 지역 방문, 굿즈 수집이 한 번에 묶이는 거야.",
          "브랜드 입장에서는 광고판보다 이 동선이 더 중요할 수 있어. 팬들이 실제로 움직이고 돈을 쓰는 순간이 여기에 있으니까."
        ]
      },
      {
        title: "📣 젊은 팬들은 왜 야구장에 반응할까?",
        paragraphs: [
          "첫 번째는 소속감이야. 팀 컬러를 입고 응원가를 부르는 순간, 낯선 사람들도 같은 편이 돼. 이 감각은 온라인 커뮤니티와 오프라인 현장이 만날 때 더 강해져.",
          "두 번째는 인증 욕구야. 유니폼 착장, 좌석 뷰, 먹거리, 응원 영상은 인스타그램에 올리기 좋고 저장하기도 좋아. 야구장에 갔다는 사실 자체가 하나의 라이프스타일 신호가 되는 거지.",
          "세 번째는 반복 방문의 힘이야. 한 번 가고 끝나는 팝업과 달리 시즌 내내 다시 갈 이유가 있어. 팬덤 마케팅에서 이 반복성은 엄청 큰 자산이야."
        ]
      },
      {
        title: "📲 SNS에서는 ‘경기’보다 ‘하루 코스’가 퍼져",
        paragraphs: [
          "어떻게 이게 피드를 타고 퍼졌을까? KBO 콘텐츠는 결과보다 장면이 다양해. 유니폼 착장샷, 응원 영상, 치킨과 맥주, 굿즈 언박싱, 퇴근 후 직관 브이로그까지 소재가 많아.",
          "인스타그램에서는 사진과 스토리 공유가 강하고, 틱톡/쇼츠에서는 응원가와 관중 리액션이 잘 맞아. X에서는 경기 중 실시간 반응과 짤이 빠르게 돈다.",
          "특히 친구 태그가 쉽다는 점도 중요해. “이번 주말 직관 갈 사람?”이라는 말이 자연스럽게 나오니까 오프라인 행동으로 이어질 가능성이 높아."
        ]
      },
      {
        title: "🏟️ 브랜드는 야구 팬덤을 어떻게 만날 수 있을까?",
        paragraphs: [
          "KBO 팬덤은 이미 강한 문화를 갖고 있어. 브랜드는 그 문화를 대체하려 하지 말고, 팬들이 더 즐겁게 놀 수 있는 작은 장치를 만들어야 해."
        ],
        subsections: [
          {
            title: "🍗 경기 전후 동선을 잡는 F&B 콘텐츠",
            paragraphs: [
              "F&B 브랜드는 경기장 근처 맛집 코스, 직관 전 간식 세트, 경기 후 회식 메뉴처럼 동선형 콘텐츠를 만들 수 있어. 팬들은 이미 먹고 이동하고 기다리니까 그 흐름에 들어가면 자연스러워.",
              "예시는 “퇴근 후 7시 경기 직관 루틴” 같은 릴스가 될 수 있어."
            ]
          },
          {
            title: "👕 팀 컬러를 활용한 한정 굿즈",
            paragraphs: [
              "패션이나 라이프스타일 브랜드라면 팀 컬러를 활용한 소품, 키링, 타월, 파우치 같은 굿즈가 잘 맞아. 단, 구단 권리와 라이선스 확인은 필수야.",
              "팬덤은 디테일에 민감하니까 색상과 문구를 대충 쓰면 바로 티가 나."
            ]
          },
          {
            title: "🎥 팬의 하루를 콘텐츠화하기",
            paragraphs: [
              "브랜드가 직접 응원하는 척하기보다, 실제 팬의 직관 하루를 따라가는 콘텐츠가 더 자연스러워. 예매, 착장, 이동, 응원, 귀가까지 보여주면 팬덤 문화가 살아나.",
              "이 방식은 금융, 통신, 모빌리티 브랜드도 활용할 수 있어. 결제, 교통, 멤버십 혜택을 자연스럽게 끼워 넣을 수 있으니까."
            ]
          }
        ]
      },
      {
        title: "⚠️ 팬덤은 애정이 큰 만큼 어색함도 빨리 알아봐",
        paragraphs: [
          "야구 팬덤 마케팅에서 가장 조심해야 할 건 겉핥기야. 팀 역사, 응원 문화, 라이벌 구도, 팬들이 싫어하는 표현을 모르면 작은 실수도 크게 보일 수 있어.",
          "또 과도한 상업화 느낌도 주의해야 해. 팬들은 자기 문화가 브랜드의 광고판으로만 쓰이는 걸 싫어할 수 있어.",
          "좋은 협업은 팬이 이미 하는 행동을 더 편하게, 더 즐겁게 만들어준다. KBO 팬덤이 보여주는 건 스포츠가 경기장을 넘어 생활 소비가 되는 순간이야."
        ]
      }
    ],
    summary: "KBO 팬덤 마케팅은 경기 관람이 유니폼, 먹거리, 굿즈, 이동 동선까지 확장되며 생활형 콘텐츠가 된 흐름이다."
  },
  c08: {
    lead: "주말에 산 간다고 하면 예전엔 등산화, 물, 김밥이 먼저 떠올랐는데 요즘 산트립은 조금 달라. 등산도 하고, 근처 카페도 가고, 숙소나 맛집까지 묶어서 하루를 여행처럼 꾸며. 산을 오르는 행위보다 “산을 포함한 주말 코스”가 콘텐츠가 되는 느낌이야.",
    readMinutes: 7,
    sections: [
      {
        title: "⛰️ 산트립은 등산이 아니라 주말 큐레이션에 가까워",
        paragraphs: [
          "산트립은 산과 여행을 결합한 흐름으로 볼 수 있어. 정확한 유행어의 확산 경로는 더 확인이 필요하지만, SNS에서 보이는 소비 방식은 명확해. 정상 인증 하나보다 이동, 장비, 먹거리, 하산 후 코스가 함께 묶여.",
          "처음엔 등산 기록이나 운동 인증에 가까웠다면, 이제는 “어디 가서 어떻게 하루를 보냈는지”를 보여주는 콘텐츠가 됐어. 산은 목적지이면서 동시에 하루의 콘셉트야.",
          "이 변화가 흥미로운 이유는 등산의 이미지를 바꾼다는 점이야. 힘든 운동이 아니라, 자연을 끼고 노는 주말 루틴처럼 보이거든."
        ]
      },
      {
        title: "🌿 사람들은 왜 산트립을 저장할까?",
        paragraphs: [
          "첫 번째는 따라 하기 쉬운 여행감이야. 멀리 비행기를 타지 않아도, 근교 산과 카페를 묶으면 작은 여행처럼 느껴져. 비용과 시간은 낮은데 기분 전환은 꽤 크지.",
          "두 번째는 인증과 회복의 조합이야. 정상에서 찍은 사진은 성취감을 주고, 하산 후 맛집이나 카페는 보상처럼 느껴져. 운동과 힐링이 한 콘텐츠 안에 같이 들어가는 거야.",
          "세 번째는 준비하는 재미야. 등산복, 가방, 간식, 코스 검색까지 전부 작은 취향 표현이 돼. 약간 여행 짐 싸는 재미와 운동 준비의 재미가 섞인 느낌이야."
        ]
      },
      {
        title: "📍 SNS에서는 코스가 보일수록 더 잘 퍼져",
        paragraphs: [
          "어떻게 이게 피드를 타고 퍼졌을까? 산트립은 단일 사진보다 루틴형 콘텐츠에 강해. 출발, 등산, 정상, 하산, 식사 순서가 자연스럽게 영상 구조가 되거든.",
          "인스타그램에서는 저장형 카드뉴스와 코스 추천 게시물이 잘 맞아. 틱톡이나 쇼츠에서는 “아침 8시 출발해서 오후 3시에 돌아오는 산트립 루틴” 같은 짧은 브이로그가 잘 어울려.",
          "친구 태그도 쉽다. “우리 이번 주말 이 코스?”라고 말하기 좋은 콘텐츠는 저장과 공유가 동시에 일어나."
        ]
      },
      {
        title: "🎒 브랜드는 산트립에 어떻게 들어갈까?",
        paragraphs: [
          "산트립은 장비만 팔기보다 하루 코스 안에 브랜드가 들어갈 때 자연스러워. 소비자가 실제로 움직이는 장면을 따라가야 해."
        ],
        subsections: [
          {
            title: "🥾 장비를 코스 안에서 보여주기",
            paragraphs: [
              "아웃도어 브랜드라면 제품 스펙만 설명하지 말고, 실제 산트립 루틴 속에서 장비가 어떻게 쓰이는지 보여줘. 가벼운 바람막이, 미끄럼 방지 신발, 작은 물병처럼 실사용 장면이 중요해.",
              "콘텐츠 예시는 “초보자 산트립 가방에 꼭 넣는 것들”이 될 수 있어."
            ]
          },
          {
            title: "☕ 하산 후 보상 코스 만들기",
            paragraphs: [
              "카페, F&B, 지역 브랜드는 하산 후 코스를 잡을 수 있어. 등산 후 먹는 음료나 식사는 그냥 메뉴가 아니라 보상 경험이야.",
              "지역 상권과 묶어 “산 내려와서 30분 안에 갈 수 있는 코스”처럼 제안하면 저장 가치가 커져."
            ]
          },
          {
            title: "🗺️ 초보자용 안전 코스 큐레이션",
            paragraphs: [
              "모빌리티나 여행 플랫폼은 교통, 난이도, 준비물, 소요 시간을 한 번에 정리할 수 있어. 산트립 입문자에게는 예쁜 사진보다 “나도 갈 수 있겠다”는 확신이 중요해.",
              "이런 정보형 콘텐츠는 블로그와 뉴스레터에서도 오래 남아."
            ]
          }
        ]
      },
      {
        title: "⚠️ 예쁜 산 사진만으로는 부족해",
        paragraphs: [
          "산트립은 긍정적인 트렌드지만, 안전과 환경 메시지가 빠지면 아쉬워. 준비 없이 무리하게 오르거나, 쓰레기 문제를 가볍게 보면 브랜드 이미지에도 좋지 않아.",
          "또 초보자에게 너무 어려운 코스를 쉽게 포장하면 위험해. 난이도, 소요 시간, 날씨, 장비 안내를 현실적으로 써야 해.",
          "산트립이 보여주는 건 사람들이 자연을 멀리 있는 여행지가 아니라, 가까운 주말 회복 루틴으로 소비하기 시작했다는 점이야."
        ]
      }
    ],
    summary: "산트립은 등산을 운동 하나가 아니라 이동, 인증, 맛집, 회복이 묶인 주말 라이프스타일 콘텐츠로 바꾼 흐름이다."
  },
  c09: {
    lead: "AI가 광고 문구를 대신 써주는 시대는 이미 지나가고 있어. 이제는 고객군마다 다른 문장, 다른 이미지, 다른 추천 흐름을 빠르게 만들 수 있느냐가 중요해졌어. 생성형 AI 개인화 마케팅은 마케터의 일을 줄이는 도구라기보다, 일을 더 잘게 쪼개고 빠르게 실험하게 만드는 변화에 가까워.",
    readMinutes: 8,
    sections: [
      {
        title: "🤖 AI 개인화는 자동 문구 생성에서 운영 방식 변화로 넘어가고 있어",
        paragraphs: [
          "처음 많은 브랜드가 생성형 AI를 접했을 때는 카피 초안, 이미지 아이디어, 광고 문구 생성에 집중했어. “빨리 만들어준다”는 장점이 가장 크게 보였지.",
          "하지만 지금 더 중요한 변화는 개인화야. 같은 캠페인이라도 신규 고객, 재구매 고객, 이탈 가능성이 있는 고객에게 다른 메시지를 줄 수 있어. AI는 그 버전을 빠르게 만들고 실험하게 도와줘.",
          "쉽게 말하면 마케터가 하나의 정답을 만드는 일에서, 여러 가설을 만들고 검증하는 일로 이동하는 거야."
        ]
      },
      {
        title: "🧠 소비자는 왜 개인화에 반응할까?",
        paragraphs: [
          "사람들은 자기와 상관없는 광고를 빨리 넘겨. 반대로 지금 필요한 제안, 내 상황과 맞는 문장, 내가 좋아할 법한 이미지에는 조금 더 오래 머물러.",
          "개인화가 잘 되면 소비자는 “나를 너무 감시한다”가 아니라 “이거 나한테 필요한데?”라고 느껴. 이 차이가 중요해.",
          "다만 선을 넘으면 바로 부담스러워져. 너무 정확한 타이밍, 너무 사적인 정보처럼 느껴지는 메시지는 오히려 거부감을 줄 수 있어."
        ]
      },
      {
        title: "📩 SNS와 CRM에서 퍼지는 방식도 달라져",
        paragraphs: [
          "AI 개인화는 릴스나 틱톡에서 유행하는 밈처럼 퍼지는 트렌드는 아니야. 대신 마케터들 사이에서 “업무 방식이 바뀐다”는 체감으로 빠르게 확산되는 이슈야.",
          "링크드인, 뉴스레터, 마케팅 커뮤니티에서는 사례 공유가 많고, 인스타그램 카드뉴스에서는 “AI로 고객군별 메시지 나누기” 같은 실무형 콘텐츠가 잘 맞아. X에서는 툴 후기와 프롬프트 팁이 빠르게 돌아.",
          "핵심은 결과물이 짧고 눈에 보여야 한다는 점이야. 같은 제품을 10대, 20대, 직장인, 재구매 고객에게 어떻게 다르게 말할 수 있는지 비교하면 직관적으로 이해돼."
        ]
      },
      {
        title: "🧪 브랜드는 AI 개인화를 어디에 써볼까?",
        paragraphs: [
          "AI 개인화는 거창한 시스템부터 시작할 필요 없어. 작은 캠페인의 메시지 분기부터 테스트하면 충분해."
        ],
        subsections: [
          {
            title: "✍️ 고객군별 카피 A/B 테스트",
            paragraphs: [
              "같은 신제품을 소개하더라도 입문자에게는 쉬운 설명, 기존 고객에게는 업그레이드 포인트, 가격 민감 고객에게는 혜택 중심으로 말할 수 있어.",
              "AI는 초안을 빠르게 만들고, 마케터는 브랜드 톤과 리스크를 검수하는 역할을 맡는 방식이 좋아."
            ]
          },
          {
            title: "🖼️ 이미지와 썸네일 방향 나누기",
            paragraphs: [
              "숏폼 썸네일이나 배너 이미지를 고객군별로 다르게 테스트할 수 있어. 예를 들어 기능 중심, 감성 중심, 후기 중심 이미지를 동시에 비교하는 거야.",
              "단, 생성 이미지 사용 시 저작권과 모델/초상권 리스크는 꼭 확인해야 해."
            ]
          },
          {
            title: "💌 CRM 메시지의 온도 조절",
            paragraphs: [
              "이탈 고객에게는 부담 없는 리마인드, 충성 고객에게는 먼저 알려주는 느낌, 신규 고객에게는 사용법 안내를 줄 수 있어. 같은 할인 쿠폰도 말투에 따라 다르게 느껴져.",
              "여기서 포인트는 자동 발송보다 관계의 온도야."
            ]
          }
        ]
      },
      {
        title: "⚠️ AI 개인화는 편리하지만 신뢰를 건드릴 수 있어",
        paragraphs: [
          "브랜드가 조심해야 할 건 과한 자동화야. 사람이 검수하지 않은 문장은 브랜드 톤을 망칠 수 있고, 민감한 표현을 놓칠 수도 있어.",
          "개인정보도 중요한 이슈야. 고객이 왜 이 메시지를 받았는지 이해할 수 있어야 하고, 원치 않으면 조정할 수 있어야 해.",
          "생성형 AI 개인화가 보여주는 건 마케터의 일이 사라진다는 이야기가 아니야. 오히려 좋은 질문을 만들고, 결과를 판단하고, 책임 있게 운영하는 능력이 더 중요해진다는 신호야."
        ]
      }
    ],
    summary: "생성형 AI 개인화 마케팅은 더 많은 메시지를 빠르게 만드는 기술이 아니라, 고객 맥락별로 더 책임 있게 실험하는 운영 방식의 변화다."
  },
  c10: {
    lead: "공개 피드에서 터진 이슈도 오래 살아남는 곳은 의외로 닫힌 대화방일 때가 많아. 누군가 링크를 DM으로 보내고, 단체방에서 해석이 붙고, 친구끼리 다시 캡처를 주고받는 식. X챗과 DM 분리 흐름은 소셜 미디어가 공개 도달에서 관계 기반 공유로 이동하고 있다는 신호처럼 볼 수 있어.",
    readMinutes: 7,
    sections: [
      {
        title: "💬 사람들은 점점 공개 피드 밖에서 더 많이 말해",
        paragraphs: [
          "X의 메시지 기능 분리 흐름은 단순한 기능 개편으로만 보기 어려워. 사람들은 공개 피드에서 발견하고, 진짜 대화는 더 작은 공간에서 이어가는 경우가 많아졌어.",
          "처음에는 좋아요와 리트윗이 반응의 중심이었다면, 이제는 DM 공유, 단체 채팅, 비공개 커뮤니티 이동이 더 중요해지고 있어. 공개 반응이 적어도 뒤에서 많이 돌 수 있다는 뜻이야.",
          "쉽게 말하면 피드는 발견의 공간, DM은 관계 속 해석의 공간이 되고 있어."
        ]
      },
      {
        title: "🔐 왜 닫힌 대화가 더 편해졌을까?",
        paragraphs: [
          "첫 번째 이유는 공개 피로감이야. 모두가 볼 수 있는 곳에 의견을 남기는 건 부담이 커. 캡처될 수도 있고, 맥락이 잘릴 수도 있으니까.",
          "두 번째는 관계의 안전감이야. 친구에게 보내는 링크는 공개 댓글보다 훨씬 가볍고 솔직해. “이거 우리 얘기 아님?” 같은 말은 공개 피드보다 DM에서 더 자연스럽게 나와.",
          "세 번째는 추천의 신뢰야. 알고리즘이 보여준 콘텐츠보다 친구가 보내준 콘텐츠를 더 유심히 볼 때가 많아. 작은 관계망이 콘텐츠 확산의 중요한 통로가 되는 거지."
        ]
      },
      {
        title: "📲 퍼지는 콘텐츠의 기준도 달라져",
        paragraphs: [
          "어떻게 이게 피드를 타고 퍼졌을까? 사실 이제는 피드만 타는 게 아니야. 피드에서 발견된 뒤 DM에서 다시 살아나는 콘텐츠가 많아.",
          "인스타그램에서는 공유 버튼을 누르기 쉬운 짧은 릴스, X에서는 캡처해서 보내기 좋은 문장, 뉴스레터에서는 팀 채팅방에 던지기 좋은 요약이 중요해져.",
          "댓글이 많지 않아도 저장과 공유가 높다면 좋은 콘텐츠일 수 있어. 마케터는 이제 공개 지표와 비공개 확산을 함께 상상해야 해."
        ]
      },
      {
        title: "📮 브랜드는 닫힌 공유를 어떻게 설계할까?",
        paragraphs: [
          "브랜드가 DM 안으로 억지로 들어가려 하면 스팸처럼 보이기 쉬워. 대신 사람들이 스스로 보내고 싶어지는 콘텐츠를 만들어야 해."
        ],
        subsections: [
          {
            title: "🧾 친구에게 보내기 좋은 체크리스트 만들기",
            paragraphs: [
              "뷰티 브랜드라면 “친구 피부 타입별 선물 고르는 법”, 금융 브랜드라면 “월급날 같이 보면 좋은 소비 체크리스트”처럼 공유 명분이 있는 콘텐츠가 좋아.",
              "받는 사람이 바로 쓸 수 있어야 DM 공유가 자연스럽게 일어나."
            ]
          },
          {
            title: "😂 단톡방에서 말 붙이기 쉬운 한 줄 만들기",
            paragraphs: [
              "콘텐츠 안에 사람들이 그대로 복붙하고 싶은 문장이 있으면 확산이 쉬워져. “이거 우리 팀 얘기다”, “너 이거 해야 함” 같은 식의 문장 말이야.",
              "브랜드 카피도 이제 광고 문구가 아니라 대화 시작 문장이 될 필요가 있어."
            ]
          },
          {
            title: "🔗 공개 피드와 커뮤니티를 이어주기",
            paragraphs: [
              "피드에서는 발견을 만들고, 뉴스레터나 멤버십 커뮤니티에서는 더 깊은 이야기를 제공하는 구조가 좋아. 공개 채널과 닫힌 채널을 따로 보지 말고 이어서 설계해야 해.",
              "단, 초대 링크와 알림이 과하면 바로 스팸처럼 느껴질 수 있어."
            ]
          }
        ]
      },
      {
        title: "⚠️ 폐쇄형 대화는 신뢰가 없으면 바로 거부당해",
        paragraphs: [
          "브랜드가 조심해야 할 건 무리한 침투야. DM, 오픈채팅, 커뮤니티는 사람들에게 더 사적인 공간으로 느껴져. 여기서 광고 냄새가 강하면 반감이 커져.",
          "또 측정이 어렵다는 점도 인정해야 해. 모든 공유를 추적하려고 하면 신뢰를 해칠 수 있어. 대신 저장, 공유 버튼 클릭, 유입 경로 같은 간접 신호를 조심스럽게 봐야 해.",
          "X챗과 DM 분리 흐름이 보여주는 건 소셜의 중심이 공개 반응만은 아니라는 점이야. 이제 콘텐츠는 누가 봤느냐보다, 누가 누구에게 보내고 싶어졌느냐가 중요해지고 있어."
        ]
      }
    ],
    summary: "X챗/DM 흐름은 소셜 확산의 무게가 공개 피드 반응에서 친구·그룹 단위의 닫힌 공유로 이동하고 있음을 보여준다."
  },
  c11: {
    lead: "게임 속 마을이 현실 놀이공원에 생기면 팬들은 그냥 구경만 하지 않아. 들어가고, 걷고, 사진 찍고, 퀘스트를 상상하고, 굿즈를 찾게 돼. 롯데월드 메이플 아일랜드 이슈가 흥미로운 건 캐릭터를 붙인 콜라보를 넘어 게임 IP를 현실 공간으로 옮기는 방식이 보였기 때문이야.",
    readMinutes: 8,
    sections: [
      {
        title: "🍁 메이플 아일랜드는 로고 콜라보보다 ‘입장감’이 강해",
        paragraphs: [
          "넥슨과 롯데월드의 메이플스토리 IP 협업은 어트랙션, 공간, 굿즈, F&B, 현장 이벤트 등으로 확장된 사례로 알려져 있어. 여기에 NPC 알바 모집 이슈까지 더해지면서 팬덤 밖에서도 주목을 받았지.",
          "처음에는 캐릭터와 테마파크의 만남으로 보였지만, 팬들이 반응하는 지점은 조금 더 깊어. 내가 알던 세계관이 현실 장소가 되고, 그 안에서 내가 움직일 수 있다는 감각이야.",
          "이건 굿즈 하나를 사는 경험과 달라. 게임 안에서 보던 세계가 현실에 잠깐 열리는 느낌. 팬덤에게는 꽤 강한 초대장이 될 수 있어."
        ]
      },
      {
        title: "🎮 팬들은 왜 현실 공간화를 좋아할까?",
        paragraphs: [
          "첫 번째는 추억의 입체화야. 메이플스토리를 오래 해온 사람에게 특정 맵과 캐릭터는 단순한 이미지가 아니라 시간의 기억이야. 그걸 현실에서 마주하면 감정 반응이 커질 수밖에 없어.",
          "두 번째는 인증 욕구야. 팬덤은 “내가 거기에 갔다”를 보여주고 싶어 해. 포토존, 티켓, 굿즈, NPC 이벤트는 모두 인증 재료가 돼.",
          "세 번째는 역할놀이의 재미야. NPC 알바처럼 현실 사람이 게임 역할을 맡는 순간, 팬은 관람객이 아니라 세계관 참여자가 돼. 이게 약간 현실 퀘스트 받는 느낌이라는 말씀."
        ]
      },
      {
        title: "📸 SNS에서는 디테일이 확산을 만든다",
        paragraphs: [
          "어떻게 이게 피드를 타고 퍼졌을까? IP 공간화 콘텐츠는 사진으로 바로 이해돼. 캐릭터, 공간, 굿즈, 코스튬, 안내판 같은 요소가 한 장에 잡히면 설명이 길지 않아도 돼.",
          "인스타그램에서는 포토존과 굿즈 인증이 강하고, 쇼츠와 틱톡에서는 현장 동선과 NPC 리액션이 잘 맞아. X에서는 “NPC 알바 시급”처럼 강한 문장형 이슈가 빠르게 퍼질 수 있어.",
          "팬덤은 디테일을 확대해서 봐. 고증이 맞는지, 캐릭터 말투가 어울리는지, 굿즈가 성의 있는지 같은 작은 요소가 댓글 반응을 만든다."
        ]
      },
      {
        title: "🏰 브랜드는 IP를 현실로 옮길 때 무엇을 설계해야 할까?",
        paragraphs: [
          "IP 콜라보의 핵심은 로고 부착이 아니라 동선 설계야. 팬이 어디서 기대하고, 어디서 사진 찍고, 어디서 구매하고, 어디서 공유할지를 생각해야 해."
        ],
        subsections: [
          {
            title: "🗺️ 입장 전부터 퀘스트처럼 만들기",
            paragraphs: [
              "예약, 티켓, 입장 안내부터 세계관 언어를 살릴 수 있어. 단, 너무 어렵게 만들면 처음 온 사람은 길을 잃어. 팬에게는 디테일을, 일반 방문객에게는 쉬운 안내를 줘야 해.",
              "예시는 “오늘의 미션 루트” 같은 방문 가이드가 될 수 있어."
            ]
          },
          {
            title: "🎁 굿즈보다 기억 장면을 먼저 설계하기",
            paragraphs: [
              "굿즈는 방문 이유가 될 수 있지만, 오래 남는 건 현장에서 겪은 장면이야. 캐릭터와 대화하거나, 특정 공간에서 미션을 완료하거나, 친구와 함께 인증하는 순간이 기억에 남아.",
              "브랜드는 구매 포인트와 체험 포인트를 같이 설계해야 해."
            ]
          },
          {
            title: "👀 팬덤 언어를 정확히 쓰기",
            paragraphs: [
              "게임 IP는 팬덤 지식이 깊어. 대충 귀여운 말투만 붙이면 오히려 어색해질 수 있어. 캐릭터 성격, 세계관 용어, 상징물을 정확히 확인해야 해.",
              "고증은 팬서비스이자 리스크 관리야."
            ]
          }
        ]
      },
      {
        title: "⚠️ IP 콜라보는 팬덤 기대치를 만만하게 보면 안 돼",
        paragraphs: [
          "가장 큰 리스크는 디테일 부족이야. 팬덤은 사랑하는 만큼 까다롭다. 작은 오류도 빠르게 캡처되고 공유될 수 있어.",
          "또 현장 운영도 중요해. 대기 시간, 굿즈 재고, 동선 혼잡이 심하면 좋은 기획도 피로감으로 남을 수 있어.",
          "메이플 아일랜드 이슈가 보여주는 건 게임 IP가 이제 화면 안에만 머물지 않는다는 점이야. 잘 설계하면 현실 공간 전체가 하나의 콘텐츠가 된다."
        ]
      }
    ],
    summary: "롯데월드 메이플 아일랜드는 게임 IP가 굿즈를 넘어 현실 동선과 역할놀이로 확장될 때 팬덤 반응이 커진다는 걸 보여준다."
  },
  c12: {
    lead: "햄버거를 먹으러 간 줄 알았는데 사실은 굿즈를 받으러 간 거였을 수도 있어. 캐릭터 콜라보가 강한 이유는 메뉴의 부가 혜택처럼 보이면서도, 실제로는 매장 방문 이유 자체를 바꾼다는 점이야. 롯데리아 x 포켓몬 굿즈 이슈는 이 구조를 꽤 잘 보여줘.",
    readMinutes: 7,
    sections: [
      {
        title: "🎒 캐릭터 굿즈는 메뉴보다 먼저 떠오를 때가 있어",
        paragraphs: [
          "포켓몬은 세대 폭이 넓고 수집 욕구가 강한 IP야. 이런 캐릭터가 외식 브랜드와 만나면 메뉴 구매, 매장 방문, 인증샷, 재고 공유가 한 번에 이어질 수 있어.",
          "처음에는 “메뉴를 사면 굿즈를 준다”는 구조로 보이지만, 소비자 입장에서는 순서가 뒤집힐 수 있어. 굿즈를 갖고 싶어서 메뉴를 사는 거지.",
          "여기서 중요한 건 굿즈가 단순 사은품이 아니라 방문을 설계하는 장치가 된다는 점이야."
        ]
      },
      {
        title: "✨ 사람들은 왜 굿즈 콜라보에 약할까?",
        paragraphs: [
          "첫 번째는 수집 욕구야. 캐릭터 굿즈는 하나만 갖는 것보다 시리즈로 모을 때 재미가 커져. 랜덤 요소가 있으면 교환과 재방문도 생길 수 있어.",
          "두 번째는 인증하기 쉬움이야. 굿즈는 사진으로 바로 보여. 패키지, 피규어, 키링, 스티커 같은 실물은 SNS에서 설명 없이도 반응을 얻기 좋아.",
          "세 번째는 추억과 현재 소비가 만나는 지점이야. 어릴 때 좋아했던 캐릭터를 지금의 소비로 다시 만나는 경험은 꽤 강한 감정 버튼이 될 수 있어."
        ]
      },
      {
        title: "📦 SNS에서는 재고 정보까지 콘텐츠가 된다",
        paragraphs: [
          "어떻게 이게 피드를 타고 퍼졌을까? 캐릭터 굿즈 콜라보는 결과물이 직관적이야. 굿즈 사진 한 장이면 어떤 이벤트인지 바로 보여.",
          "인스타그램에서는 인증샷과 언박싱이 잘 맞고, X에서는 “어느 매장에 아직 있다” 같은 재고 공유가 빠르게 퍼져. 틱톡이나 쇼츠에서는 매장 방문 브이로그, 개봉 리액션, 교환 후기 콘텐츠로 확장돼.",
          "댓글 반응도 잘 붙어. “이거 어디서 받음?”, “아직 남아 있음?”, “교환할 사람?” 같은 질문이 자연스럽게 생기니까."
        ]
      },
      {
        title: "🍔 브랜드는 굿즈 콜라보를 어떻게 설계해야 할까?",
        paragraphs: [
          "캐릭터 콜라보는 귀여운 굿즈를 만드는 데서 끝나지 않아. 소비자가 방문하고, 사고, 인증하고, 다시 이야기하게 만드는 흐름을 만들어야 해."
        ],
        subsections: [
          {
            title: "🧭 매장 방문 루트를 콘텐츠로 만들기",
            paragraphs: [
              "단순히 굿즈 이미지만 공개하지 말고, 실제 매장 방문 과정까지 보여줘. 주문, 수령, 개봉, 인증까지 이어지는 숏폼은 따라 하기 쉽고 직관적이야.",
              "외식 브랜드라면 “퇴근길 포켓몬 굿즈 픽업 루틴” 같은 콘텐츠가 잘 맞아."
            ]
          },
          {
            title: "🔁 교환과 수집을 공식적으로 도와주기",
            paragraphs: [
              "랜덤 굿즈라면 소비자끼리 교환하고 싶어져. 브랜드가 공식 해시태그나 댓글 참여 공간을 열어주면 커뮤니티 반응이 더 자연스럽게 생길 수 있어.",
              "단, 안전한 거래와 개인정보 노출 방지 안내도 같이 필요해."
            ]
          },
          {
            title: "📢 재고 안내를 친절하게 운영하기",
            paragraphs: [
              "한정 굿즈는 희소성이 매력이지만 불만도 빨리 생겨. 매장별 재고, 판매 조건, 재입고 여부를 명확히 안내해야 기대감이 피로감으로 바뀌지 않아.",
              "운영이 좋으면 품절도 화제가 되지만, 운영이 나쁘면 불만이 더 오래 남아."
            ]
          }
        ]
      },
      {
        title: "⚠️ 귀여움만 믿으면 콜라보가 흔들릴 수 있어",
        paragraphs: [
          "캐릭터 굿즈는 강력하지만 리스크도 있어. 저작권과 라이선스는 기본이고, 품질이 낮으면 팬덤 반응이 바로 차가워질 수 있어.",
          "또 과도한 희소성은 리셀과 불만을 부를 수 있어. 브랜드가 일부러 품절감을 자극하는 것처럼 보이면 호감보다 피로가 커져.",
          "롯데리아 x 포켓몬 굿즈 흐름이 보여주는 건, 캐릭터 콜라보가 메뉴 홍보를 넘어 방문 이유를 설계하는 캠페인이 될 수 있다는 점이야."
        ]
      }
    ],
    summary: "롯데리아 x 포켓몬 굿즈는 캐릭터 IP가 메뉴 구매보다 먼저 매장 방문과 인증, 수집 욕구를 만드는 콜라보 구조를 보여준다."
  }
};

Object.entries(NATURAL_ARTICLE_OVERRIDES).forEach(([id, update]) => {
  Object.assign(MARKETER_ARTICLES[id], update);
});

const ARTICLE_TYPE_REWRITE_OVERRIDES = {
  c01: { articleType: "trend" },
  c02: { articleType: "trend" },
  c03: {
    articleType: "issue",
    lead: "힙합 디스전 이슈는 이제 곡 하나만 듣고 끝나는 일이 아니야. 쇼츠에는 가사 일부가 잘려 올라오고, X에는 타임라인 요약이 돌고, 커뮤니티에는 “그래서 누구 말이 더 맞냐”는 판정 글이 붙어. 빅나티와 스윙스 이슈도 처음 보면 조각이 너무 많아서 헷갈리지만, 흐름을 따라가면 요즘 음악 이슈가 어떻게 소비되는지 꽤 선명하게 보여. 🎧",
    readMinutes: 8,
    sections: [
      {
        title: "🎧 그래서 지금 무슨 일이야?",
        paragraphs: [
          "보도와 온라인 반응을 종합하면, 빅나티와 스윙스를 둘러싼 공방은 디스곡, 반박성 발언, 라이브 해명, 주변 반응이 이어지며 커졌어. 다만 세부 발언의 맥락은 원문과 당사자 채널 확인이 필요해.",
          "중요한 건 이 이슈가 한 곡의 평가로만 끝나지 않았다는 점이야. 누가 먼저 어떤 메시지를 던졌는지, 상대가 어떤 방식으로 받아쳤는지, 해명은 설득력이 있었는지가 각각 따로 콘텐츠가 됐거든.",
          "온라인에서는 가사 캡처, 라이브 클립, 커뮤니티 요약글이 먼저 돌고, 그 조각을 본 사람들이 다시 자기 해석을 붙였어. 원본을 다 듣기 전에 이미 ‘판’이 만들어지는 흐름인 거지."
        ]
      },
      {
        title: "🔥 왜 이렇게 커졌을까?",
        paragraphs: [
          "디스전은 구조가 직관적이야. A가 말하고, B가 반응하고, 사람들이 그 사이에서 판정을 내려. 음악을 잘 모르는 사람도 ‘누가 더 세게 말했냐’, ‘누가 더 설득력 있냐’는 식으로 쉽게 끼어들 수 있어.",
          "또 힙합 문화에는 원래 배틀과 응수의 문법이 있잖아. 그런데 지금은 그 문법이 팬덤, 쇼츠, 커뮤니티 판정 문화와 섞였어. 바로 이 지점이 핵심이야. 곡보다 빠른 건 댓글의 해석이고, 해석보다 빠른 건 15초 클립이야.",
          "10대~20대 입장에서는 이게 단순 음악 감상이 아니라 실시간 관전 콘텐츠처럼 느껴져. 친구에게 링크를 보내고, X에서 요약을 보고, 유튜브 댓글에서 여론을 확인하면서 사건을 따라가는 방식이야."
        ]
      },
      {
        title: "🗯️ 사람들이 갈리는 지점",
        paragraphs: [
          "이슈가 커질수록 반응은 한 방향으로만 가지 않아. 특히 디스전은 음악적 표현, 개인 감정, 팬덤 해석이 겹치기 때문에 어디에 무게를 두느냐에 따라 의견이 달라져."
        ],
        subsections: [
          {
            title: "🎤 ‘디스전은 원래 세게 붙는 문화’로 보는 쪽",
            paragraphs: [
              "이쪽은 힙합 안에서 공방 자체를 하나의 표현 방식으로 봐. “디스전이면 이 정도 긴장감은 있어야지” 같은 반응이 나오는 이유야.",
              "🗯️ “곡으로 말하고 곡으로 받는 건 장르 문법 아닌가?” 같은 식의 댓글이 여기에 가까워."
            ]
          },
          {
            title: "⚠️ ‘선을 넘은 개인 갈등처럼 보인다’는 쪽",
            paragraphs: [
              "반대로 특정 표현이나 해명 방식이 개인 공격처럼 느껴진다는 반응도 있어. 이 경우 사람들은 음악성보다 태도와 맥락을 더 보게 돼.",
              "🗯️ “처음엔 디스전인 줄 알았는데 타임라인 보니까 감정싸움 같음” 같은 반응이 여기서 나와."
            ]
          },
          {
            title: "🧩 ‘이슈 소비가 너무 빠르다’는 피로감",
            paragraphs: [
              "원본을 확인하기 전에 요약본만 보고 판단하는 분위기에 피로감을 느끼는 사람들도 있어. 누가 맞는지보다, 모두가 너무 빨리 결론을 내리는 게 부담스럽다는 거야.",
              "🗯️ “요약만 보고 욕하는 흐름은 좀 위험하지 않나”라는 반응도 충분히 나올 수 있어."
            ]
          }
        ]
      },
      {
        title: "📱 SNS에서는 어떻게 소비되고 있어?",
        paragraphs: [
          "X에서는 타임라인 정리가 빠르게 돌아. 누가 어떤 말을 했는지, 어떤 클립을 봐야 하는지, 커뮤니티 분위기가 어떤지 한 줄 요약으로 퍼지기 쉬워.",
          "유튜브 쇼츠와 릴스에서는 해명 장면, 가사 일부, 표정 리액션이 잘라져 소비돼. 전체 맥락보다 ‘이 장면’이 먼저 기억되는 구조야. 그래서 클립 하나가 여론을 크게 흔들 수도 있어.",
          "커뮤니티에서는 판정 놀이가 붙어. “이건 누구 승”, “이건 해명이 더 필요함”, “이건 팬덤끼리 더 붙겠다” 같은 식으로 사건이 계속 재가공돼. 이슈가 음악에서 출발해도, 확산은 댓글과 캡처가 밀어 올리는 셈이야."
        ]
      },
      {
        title: "🧩 이 이슈를 볼 때 포인트",
        paragraphs: [
          "이 이슈의 포인트는 누가 맞고 틀렸는지 바로 결론내리는 데 있지 않아. 오히려 요즘 10대~20대가 엔터 이슈를 어떻게 따라가는지 보는 게 더 중요해.",
          "사람들은 긴 기사보다 클립, 캡처, 요약 타임라인으로 먼저 들어와. 그리고 댓글을 보며 자기 의견을 조정해. 쉽게 말하면 사건을 ‘읽는’ 게 아니라 ‘같이 판정하면서 보는’ 방식에 가까워.",
          "그래서 이런 이슈는 원본, 당사자 발언, 보도 내용, 커뮤니티 해석을 나눠서 보는 습관이 필요해. 한 장면만 보고 전체를 판단하면 맥락이 크게 흔들릴 수 있으니까."
        ]
      },
      {
        title: "⚠️ 아직 조심해서 봐야 할 부분",
        paragraphs: [
          "논란성 이슈에서는 확인되지 않은 주장을 사실처럼 퍼뜨리는 게 가장 위험해. 특히 개인 간 갈등, 사적 관계, 계약 문제처럼 민감한 내용은 당사자 발언과 보도 맥락을 구분해야 해.",
          "또 팬덤 간 감정이 과열되면 악성 댓글이나 조롱으로 번지기 쉬워. 음악적 평가와 인신공격은 완전히 다른 문제라는 점을 잊으면 안 돼.",
          "짧은 캡처나 클립은 편하지만, 그만큼 맥락이 잘려 나갈 수 있어. 이 이슈를 볼 때는 ‘누가 이겼나’보다 ‘내가 본 장면이 전체 흐름 중 어디인가’를 먼저 확인하는 게 좋아."
        ]
      }
    ],
    summary: "빅나티 vs 스윙스 이슈는 디스전 자체보다, 클립과 댓글이 음악 이슈를 실시간 판정 콘텐츠로 바꾸는 방식을 보여준다."
  },
  c04: {
    articleType: "issue",
    lead: "삼전이냐 하닉이냐. HBM이 뭐길래 또 이렇게 시끄러운 걸까? 원래라면 증권 기사에서나 볼 법한 단어들이 요즘은 커뮤니티, 직장인 단톡방, 경제 유튜브 썸네일로 내려왔어. 주가 이야기는 어렵지만, 사람들은 이 이슈를 ‘AI 시대에 누가 앞서가나’라는 꽤 쉬운 질문으로 바꿔서 보고 있어. 📈",
    readMinutes: 8,
    sections: [
      {
        title: "📝 그래서 무슨 일이야?",
        paragraphs: [
          "최근 AI 반도체 수요와 HBM 경쟁이 이어지면서 삼성전자와 SK하이닉스 관련 뉴스가 다시 크게 주목받고 있어. 보도에 따르면 일부 증권사 리포트와 목표주가 조정, AI 인프라 수요 전망이 함께 언급되며 투자자 관심이 커졌어.",
          "여기서 HBM은 AI 반도체 흐름을 설명할 때 자주 등장하는 핵심 키워드야. 다만 이 글은 투자 조언이 아니라, 이 뉴스가 왜 대중 담론과 밈으로 번지는지 보는 브리핑에 가까워.",
          "온라인에서는 ‘삼전 존버’, ‘하닉 살 걸’, ‘AI는 결국 반도체 아니냐’ 같은 말로 어려운 산업 뉴스가 훨씬 생활 언어처럼 번역되고 있어."
        ]
      },
      {
        title: "🔥 왜 이렇게 커졌을까?",
        paragraphs: [
          "첫 번째 이유는 내 돈과 연결되기 때문이야. 주식은 뉴스가 아니라 계좌 감정으로 들어와. 같은 HBM 기사라도 누군가에게는 산업 전망이고, 누군가에게는 ‘내가 왜 그때 안 샀지’라는 후회가 돼.",
          "두 번째는 AI라는 큰 이야기와 붙어 있기 때문이야. AI는 너무 큰 개념이라 체감하기 어렵지만, 반도체 기업의 주가와 경쟁 구도는 비교적 말하기 쉬워. 삼전과 하닉이라는 익숙한 이름이 있어서 더 그래.",
          "세 번째는 진영 놀이가 가능하다는 점이야. 삼전파, 하닉파처럼 나누는 순간 복잡한 기술 격차와 공급망 이야기가 댓글에서 바로 이해되는 구도로 바뀌어."
        ]
      },
      {
        title: "🗯️ 사람들이 갈리는 지점",
        paragraphs: [
          "경제 이슈처럼 보여도 반응은 꽤 감정적이야. 정보, 기대, 후회, 불안이 한꺼번에 붙기 때문이야."
        ],
        subsections: [
          {
            title: "💾 ‘하닉이 더 앞서 있다’고 보는 쪽",
            paragraphs: [
              "이쪽은 HBM 경쟁력, 글로벌 고객사, AI 수요 기대감을 근거로 SK하이닉스 쪽에 더 주목해. 커뮤니티에서는 “결국 AI 수혜주는 여기 아니냐”는 식의 반응이 나와.",
              "다만 이런 기대도 시장 상황에 따라 달라질 수 있으니, 단정적으로 받아들이면 위험해."
            ]
          },
          {
            title: "🏢 ‘그래도 삼전 반등을 봐야 한다’는 쪽",
            paragraphs: [
              "삼성전자의 규모, 브랜드 신뢰, 반도체 전반의 회복 기대를 보는 시선도 있어. ‘늦었지만 반격 가능성이 있다’는 식의 해석이 여기에 가까워.",
              "온라인에서는 기업 체급과 장기 기대를 두고 의견이 계속 갈려."
            ]
          },
          {
            title: "⚠️ ‘주가 밈으로만 보면 위험하다’는 쪽",
            paragraphs: [
              "반대로 피로감을 말하는 사람들도 있어. 어려운 산업 이슈가 너무 쉽게 ‘누가 이김?’ 구도로 바뀌면 리스크가 가려질 수 있다는 거야.",
              "🗯️ “댓글만 보면 다 오를 것 같은데 내 계좌는 왜 이래” 같은 반응도 이 이슈의 현실감을 보여줘."
            ]
          }
        ]
      },
      {
        title: "📱 SNS에서는 어떻게 소비되고 있어?",
        paragraphs: [
          "X와 커뮤니티에서는 짧은 비교 문장으로 퍼져. ‘삼전 vs 하닉’, ‘HBM 수혜’, ‘외국인 수급’ 같은 단어가 캡처와 함께 돌면, 자세한 리포트를 읽지 않은 사람도 대화에 끼어들 수 있어.",
          "유튜브 쇼츠나 릴스에서는 훨씬 더 압축돼. 그래프 한 장, 뉴스 헤드라인 하나, 종목별 캐릭터 비교처럼 만들어지기 쉬워. 직관적이지만 그만큼 단순화도 심해질 수 있어.",
          "직장인 단톡방에서는 ‘그래서 지금 사도 됨?’ 같은 질문으로 바뀌어. 여기서 포인트는 정보 소비와 투자 판단이 섞이기 쉽다는 점이야."
        ]
      },
      {
        title: "🧩 이 이슈를 볼 때 포인트",
        paragraphs: [
          "삼전/하닉/HBM 이슈는 단순히 주가 이야기가 아니라, 사람들이 AI 시대를 어떻게 체감하는지 보여줘. 거대한 기술 변화가 대중에게는 익숙한 기업 이름과 계좌 감정으로 번역되는 거야.",
          "또 경제 뉴스가 밈화되는 방식도 볼 수 있어. 어려운 용어를 다 이해하지 않아도 사람들은 비교 구도, 후회 드립, 진영 농담으로 이슈에 참여해.",
          "그래서 이 이슈는 ‘누가 더 오른다’보다 ‘어려운 산업 뉴스가 어떻게 일상 언어로 내려오는가’를 보는 게 더 안전하고 유익해."
        ]
      },
      {
        title: "⚠️ 아직 조심해서 봐야 할 부분",
        paragraphs: [
          "가장 조심할 건 투자 권유처럼 소비되는 흐름이야. 목표주가, 수급, 전망은 모두 변할 수 있고, 온라인 요약만으로 매수·매도 판단을 내리면 위험해.",
          "또 커뮤니티에서 도는 정보는 출처가 섞이기 쉬워. 리포트 원문, 보도 기사, 개인 의견, 밈을 구분해서 봐야 해.",
          "짧은 그래프와 강한 썸네일은 이해를 돕지만, 맥락을 줄이기도 해. 이 이슈는 재미있게 볼 수 있지만, 판단은 꼭 더 넓은 정보 위에서 해야 해."
        ]
      }
    ],
    summary: "삼전 vs 하닉/HBM 이슈는 AI 반도체 뉴스를 사람들이 계좌 감정, 기업 진영, 경제 밈으로 번역해 소비하는 흐름이다."
  },
  c05: {
    articleType: "issue",
    lead: "할인 이벤트 하나가 왜 이렇게 큰 논란이 됐을까? 스타벅스 탱크데이 이슈는 처음 보면 ‘프로모션 이름 때문에 생긴 해프닝인가?’ 싶지만, 들여다보면 날짜와 단어, 사회적 기억이 한꺼번에 겹친 문제야. 요즘 SNS에서는 브랜드 이벤트도 그냥 혜택으로만 읽히지 않아. 어떤 맥락에서 나왔는지가 먼저 보이거든. ⚠️",
    readMinutes: 8,
    sections: [
      {
        title: "📝 그래서 무슨 일이야?",
        paragraphs: [
          "보도에 따르면 스타벅스는 5.18 민주화운동 기념일에 ‘탱크데이’ 관련 행사를 진행했다가 비판을 받았고, 이후 행사 중단과 사과로 이어졌어.",
          "논란의 핵심은 단순히 프로모션이 있었다는 사실보다, 특정 역사적 기억을 가진 날짜에 ‘탱크’라는 단어가 함께 노출됐다는 점이야. 소비자들은 할인 혜택보다 그 조합을 먼저 읽은 거지.",
          "브랜드 입장에서는 기획된 행사였을 수 있지만, 온라인에서는 “왜 하필 그 날짜에 이 표현이 나왔나”라는 질문이 빠르게 커졌어."
        ]
      },
      {
        title: "🔥 왜 이렇게 커졌을까?",
        paragraphs: [
          "이 이슈가 커진 이유는 날짜와 단어가 너무 강하게 맞물렸기 때문이야. 브랜드 이벤트는 보통 가격, 혜택, 참여 방식으로 평가되지만, 사회적 기념일과 충돌하면 이야기가 완전히 달라져.",
          "또 사람들은 이제 브랜드의 실수를 개인 담당자의 실수로만 보지 않아. “이게 어떻게 승인됐지?”, “캘린더 검수는 없었나?”처럼 시스템 문제로 확장해서 봐.",
          "바로 이 지점이 핵심이야. 요즘 소비자는 브랜드가 무엇을 팔았는지보다, 어떤 맥락을 이해하고 있는지를 더 민감하게 본다."
        ]
      },
      {
        title: "🗯️ 사람들이 갈리는 지점",
        paragraphs: [
          "대부분의 반응은 비판 쪽으로 기울었지만, 세부적으로는 어디에 책임을 둬야 하는지에 대한 시선이 조금씩 달라."
        ],
        subsections: [
          {
            title: "📅 ‘기본적인 날짜 검수 문제’로 보는 쪽",
            paragraphs: [
              "이쪽은 역사적 기념일과 캠페인 단어를 함께 봤어야 한다고 말해. 단순 실수가 아니라 출시 전 체크리스트에서 걸러졌어야 할 문제라는 거야.",
              "🗯️ “이건 예민한 게 아니라 기본 맥락 확인 아닌가” 같은 반응이 여기에 가까워."
            ]
          },
          {
            title: "🏢 ‘개인보다 조직 프로세스 문제’로 보는 쪽",
            paragraphs: [
              "한 명의 담당자를 탓하기보다 승인 라인과 검수 체계를 봐야 한다는 의견도 있어. 큰 브랜드일수록 문구 하나가 여러 단계를 거치기 때문에, 시스템 점검이 필요하다는 시선이야.",
              "🗯️ “사과문보다 궁금한 건 이게 어떻게 통과됐냐는 것”이라는 반응도 나올 수 있어."
            ]
          },
          {
            title: "⚠️ ‘비판 이후 소비 방식도 조심해야 한다’는 쪽",
            paragraphs: [
              "논란이 커지면 이슈 자체가 밈처럼 소비되기도 해. 하지만 이 경우에는 역사적 맥락이 있는 만큼, 가볍게 조롱하거나 농담 소재로 쓰는 것에도 부담이 있어.",
              "온라인에서는 “이건 웃긴 실수로 넘길 일이 아니다”라는 반응이 함께 붙어."
            ]
          }
        ]
      },
      {
        title: "📱 SNS에서는 어떻게 소비되고 있어?",
        paragraphs: [
          "X에서는 날짜와 행사명을 함께 캡처한 게시물이 빠르게 퍼지기 쉬워. 설명이 길지 않아도 한 장만 보면 문제의식이 바로 전달되기 때문이야.",
          "뉴스 댓글과 커뮤니티에서는 ‘브랜드 감수성’, ‘검수 시스템’, ‘사과문’ 같은 키워드로 논쟁이 이어져. 누가 봐도 이해하기 쉬운 이슈라 확산 장벽이 낮아.",
          "릴스나 쇼츠에서는 이슈 요약형 콘텐츠로 소비될 수 있어. 다만 논란성 이슈인 만큼 조롱형 편집이나 과한 효과음은 오히려 반감을 부를 수 있어."
        ]
      },
      {
        title: "🧩 이 이슈를 볼 때 포인트",
        paragraphs: [
          "이 이슈는 단순히 ‘이벤트 이름을 잘못 지었다’로 끝나는 이야기가 아니야. 브랜드가 사회적 맥락을 얼마나 섬세하게 확인해야 하는지 보여주는 사례야.",
          "소비자는 브랜드의 의도를 전부 알 수 없어. 대신 보이는 날짜, 단어, 이미지, 실행 타이밍으로 브랜드의 태도를 해석해. 그래서 기획 의도와 다르게 받아들여질 수 있다는 점을 늘 생각해야 해.",
          "또 사과 이후의 태도도 중요해. 무엇이 문제였는지 인정하고, 어떤 조치를 했는지, 다시 반복하지 않기 위해 무엇을 바꿀지까지 봐야 소비자는 진정성을 판단할 수 있어."
        ]
      },
      {
        title: "⚠️ 아직 조심해서 봐야 할 부분",
        paragraphs: [
          "첫째, 확인되지 않은 내부 책임자 이야기나 추측을 사실처럼 퍼뜨리면 안 돼. 비판은 가능하지만, 개인 신상 추적이나 악성 댓글로 번지면 또 다른 문제가 돼.",
          "둘째, 짧은 캡처만 보고 전체 공지나 후속 조치까지 확인하지 않는 것도 조심해야 해. 논란의 핵심은 분명하지만, 이후 대응까지 함께 봐야 흐름을 정확히 이해할 수 있어.",
          "셋째, 이슈를 지나치게 가볍게 소비하지 않는 태도가 필요해. 이 사건은 프로모션 실수이면서 동시에 사회적 기억을 어떻게 다룰 것인가에 대한 문제이기도 하니까."
        ]
      }
    ],
    summary: "스타벅스 탱크데이 논란은 브랜드 이벤트가 날짜와 단어, 사회적 기억을 함께 읽히는 시대에 놓여 있음을 보여준다."
  },
  c06: { articleType: "trend" },
  c07: { articleType: "trend" },
  c08: { articleType: "trend" },
  c09: { articleType: "trend" },
  c10: { articleType: "trend" },
  c11: { articleType: "trend" },
  c12: { articleType: "trend" },
};

Object.entries(ARTICLE_TYPE_REWRITE_OVERRIDES).forEach(([id, update]) => {
  Object.assign(MARKETER_ARTICLES[id], update);
});

const MARKETER_REALTIME = [
  { rank: 1, kw: "셋로그", delta: "NEW", deltaType: "new" },
  { rank: 2, kw: "스타벅스 탱크데이", delta: "▲ 7", deltaType: "up" },
  { rank: 3, kw: "영크크", delta: "▲ 5", deltaType: "up" },
  { rank: 4, kw: "메이플 아일랜드", delta: "▲ 4", deltaType: "up" },
  { rank: 5, kw: "삼전 하닉 HBM", delta: "▲ 2", deltaType: "up" },
  { rank: 6, kw: "빅나티 스윙스", delta: "▼ 1", deltaType: "down" },
  { rank: 7, kw: "불닭 현지화", delta: "▲ 1", deltaType: "up" },
  { rank: 8, kw: "KBO 팬덤 마케팅", delta: "-", deltaType: "same" },
  { rank: 9, kw: "AI 개인화 마케팅", delta: "NEW", deltaType: "new" },
  { rank: 10, kw: "산트립", delta: "▲ 3", deltaType: "up" },
];

const MARKETER_DEBATES = [
  {
    id: "d01",
    type: "debate",
    title: "브랜드가 셋로그에 지금 탑승해도 될까?",
    subtitle: "날것 일상 포맷이라 친근하다는 쪽과, 회사가 따라 하면 바로 광고 냄새 난다는 쪽이 갈리고 있어요.",
    category: "밈/커뮤니티",
    participants: 4200,
    leftLabel: "지금 테스트",
    rightLabel: "조금 관망",
    leftPercent: 64,
    rightPercent: 36,
    leftArguments: [
      "직원과 팬의 하루를 보여주기에 이보다 자연스러운 포맷이 적음",
      "편집 비용이 낮고 릴스/쇼츠 재가공이 쉬움",
      "아직 포맷이 굳기 전이라 브랜드만의 해석을 만들 수 있음",
    ],
    rightArguments: [
      "자발성이 없으면 바로 회사 홍보물처럼 보임",
      "개인 일상 노출 동의와 내부 가이드가 먼저 필요함",
      "이미 여러 계정이 따라 하면 피로감이 빠르게 올 수 있음",
    ],
    featuredComment: {
      author: "브랜드기획러",
      badge: "T1",
      text: "직원 셋로그는 괜찮은데 팀장님이 시키는 순간 셋로그가 아니라 업무일지가 됨.",
      timeAgo: "8분 전",
    },
    hashtags: ["#셋로그", "#릴스포맷", "#브랜드콘텐츠"],
    likes: "7.8K",
    comments: "4.2K",
    shares: "1.1K",
    cover: { hue: 205, sat: 82, lum: 62, label: "SETLOG\nVOTE" },
  },
  {
    id: "d02",
    type: "debate",
    title: "스타벅스 탱크데이 논란, 마케팅 실수일까 시스템 문제일까?",
    subtitle: "단어 선택 실수로 볼 수 있다는 의견과, 날짜/문구 검수 체계가 작동하지 않은 조직 리스크라는 의견이 맞서고 있어요.",
    category: "브랜드 이슈",
    participants: 6100,
    leftLabel: "실무 실수",
    rightLabel: "시스템 문제",
    leftPercent: 28,
    rightPercent: 72,
    leftArguments: [
      "프로모션명과 날짜 조합을 놓친 단발성 사고에 가까움",
      "빠른 중단과 사과로 1차 대응은 이루어짐",
      "개별 캠페인 검수 체크리스트 보강으로 막을 수 있음",
    ],
    rightArguments: [
      "사회적 기념일과 민감어 자동 검수가 없었다는 뜻",
      "브랜드 규모상 승인 단계가 여러 번 있었을 가능성이 큼",
      "반복 방지를 말하려면 내부 프로세스 공개가 필요함",
    ],
    featuredComment: {
      author: "캘린더검수자",
      badge: "T1",
      text: "이건 카피 한 줄 문제가 아니라 프로모션 캘린더에 안전장치가 없었다는 신호로 봐야 함.",
      timeAgo: "12분 전",
    },
    hashtags: ["#스타벅스", "#브랜드리스크", "#마케팅실수"],
    likes: "9.4K",
    comments: "6.1K",
    shares: "2.0K",
    cover: { hue: 156, sat: 58, lum: 45, label: "RISK\nVOTE" },
  },
  {
    id: "d03",
    type: "debate",
    title: "메이플 아일랜드 같은 IP 콜라보, 굿즈보다 체험이 중요할까?",
    subtitle: "굿즈가 방문 이유라는 쪽과, 팬덤을 오래 붙잡는 건 퀘스트와 공간 경험이라는 쪽이 갈리고 있어요.",
    category: "팬덤/IP",
    participants: 5300,
    leftLabel: "굿즈가 핵심",
    rightLabel: "체험이 핵심",
    leftPercent: 43,
    rightPercent: 57,
    leftArguments: [
      "한정 굿즈가 있어야 방문 명분과 품절 바이럴이 생김",
      "실물 소장 욕구가 팬덤 구매 전환을 만든다",
      "굿즈 인증이 SNS 확산에 가장 직관적임",
    ],
    rightArguments: [
      "세계관 안에서 미션을 하는 경험이 체류 시간을 늘림",
      "NPC 알바처럼 참여형 요소가 기사화와 공유를 동시에 만든다",
      "단순 굿즈샵보다 공간 기억이 브랜드 자산으로 남음",
    ],
    featuredComment: {
      author: "헤네시스주민",
      badge: "T2",
      text: "키링도 좋은데 진짜 기억나는 건 내가 퀘스트 받은 순간임. 그게 IP 콜라보의 맛.",
      timeAgo: "19분 전",
    },
    hashtags: ["#메이플아일랜드", "#IP콜라보", "#NPC알바"],
    likes: "8.1K",
    comments: "5.3K",
    shares: "1.4K",
    cover: { hue: 48, sat: 88, lum: 62, label: "IP\nVOTE" },
  },
];

const MARKETER_SOURCE_ACCOUNTS = [
  { id: "src-careet", platform: "manual_url", name: "캐릿 트렌드", handle: "careet.net", profileUrl: "https://www.careet.net", category: "밈/커뮤니티", grade: "A", active: true, cadence: "매일 확인", lastCheckedAt: "20분 전", notes: "Z세대 밈과 유행템 큐레이션" },
  { id: "src-openads", platform: "manual_url", name: "오픈애즈 리포트", handle: "openads.co.kr", profileUrl: "https://www.openads.co.kr", category: "브랜드 이슈", grade: "A", active: true, cadence: "주 2회", lastCheckedAt: "35분 전", notes: "마케팅 실무 리포트와 미디어 이슈" },
  { id: "src-news-brand", platform: "naver", name: "브랜드 리스크 뉴스", handle: "news", profileUrl: "#", category: "브랜드 이슈", grade: "A", active: true, cadence: "상시", lastCheckedAt: "12분 전", notes: "논란, 사과, 프로모션 중단 이슈" },
  { id: "src-x-meme", platform: "x", name: "밈 타임라인", handle: "@meme_radar_kr", profileUrl: "https://x.com/meme_radar_kr", category: "밈/커뮤니티", grade: "B", active: true, cadence: "상시", lastCheckedAt: "8분 전", notes: "짧은 밈, 커뮤니티 반응, 2차 패러디" },
  { id: "src-finance", platform: "naver", name: "경제/테크 뉴스", handle: "finance", profileUrl: "#", category: "비즈/테크", grade: "B", active: true, cadence: "일 2회", lastCheckedAt: "1시간 전", notes: "AI, 반도체, 플랫폼 이슈" },
  { id: "src-ip-fandom", platform: "instagram", name: "팬덤/IP 현장", handle: "@ip_fandom_watch", profileUrl: "https://www.instagram.com/ip_fandom_watch", category: "팬덤/IP", grade: "B", active: true, cadence: "일 1회", lastCheckedAt: "2시간 전", notes: "굿즈, 팝업, 오프라인 콜라보" },
];

const MARKETER_RAW_POSTS = [
  { id: "raw-001", platform: "manual_url", sourceAccountId: "src-careet", url: "https://www.careet.net/1905", author: "Careet", postedAt: "지난주", collectedAt: "오늘 10:02", excerpt: "영크크가 최근 SNS 밈 큐레이션에 잡힘. 뜻보다 어감과 반복성이 먼저 소비되는 흐름.", metrics: { likes: 0, reposts: 0, comments: 0, views: 0 }, hashtags: ["#영크크", "#요즘밈"], mentions: [], links: ["https://www.careet.net/1905"], suggestedKeywords: ["영크크", "YOUNGCREATORCREW"], keywordClusterIds: ["clu-youngkk"], status: "linked" },
  { id: "raw-002", platform: "naver", sourceAccountId: "src-news-brand", url: "https://m.ytn.co.kr/news_view.php?key=202605181519254664&s_mcd=0134", author: "YTN", postedAt: "2일 전", collectedAt: "오늘 09:50", excerpt: "스타벅스가 5.18 기념일에 탱크데이 행사를 진행해 논란, 행사 중단과 사과로 이어짐.", metrics: { likes: 0, reposts: 0, comments: 0, views: 0 }, hashtags: ["#스타벅스", "#탱크데이"], mentions: [], links: ["https://m.ytn.co.kr/news_view.php?key=202605181519254664&s_mcd=0134"], suggestedKeywords: ["스타벅스 탱크데이", "브랜드 리스크"], keywordClusterIds: ["clu-starbucks-risk"], status: "linked" },
  { id: "raw-003", platform: "x", sourceAccountId: "src-x-meme", url: "https://x.com/meme_radar_kr/status/setlog", author: "@meme_radar_kr", postedAt: "오늘 08:40", collectedAt: "오늘 09:15", excerpt: "셋로그 같이 하자는 글과 분할 브이로그 캡처가 1020 타임라인에서 반복 공유됨.", metrics: { likes: 18200, reposts: 4100, comments: 730, views: 890000 }, hashtags: ["#셋로그", "#setlog"], mentions: [], links: ["https://x.com/meme_radar_kr/status/setlog"], suggestedKeywords: ["셋로그", "분할 브이로그"], keywordClusterIds: ["clu-setlog"], status: "linked" },
  { id: "raw-004", platform: "naver", sourceAccountId: "src-finance", url: "https://www.g-enews.com/article/Securities/2026/05/202605071704078737df2f5bc1bc_1", author: "글로벌이코노믹", postedAt: "지난주", collectedAt: "오늘 09:20", excerpt: "AI 반도체와 HBM 기대감으로 삼성전자·SK하이닉스 목표주가와 주가 담론이 급등.", metrics: { likes: 0, reposts: 0, comments: 0, views: 0 }, hashtags: ["#삼전", "#하닉", "#HBM"], mentions: [], links: ["https://www.g-enews.com/article/Securities/2026/05/202605071704078737df2f5bc1bc_1"], suggestedKeywords: ["삼전 하닉", "HBM"], keywordClusterIds: ["clu-hbm-stock"], status: "linked" },
  { id: "raw-005", platform: "manual_url", sourceAccountId: "src-ip-fandom", url: "https://www.donga.com/news/Culture/article/all/20260518/133942074/1", author: "동아일보", postedAt: "2일 전", collectedAt: "오늘 09:05", excerpt: "롯데월드 메이플 아일랜드존에서 일일 NPC 알바를 모집하며 IP 체험형 프로모션으로 확산.", metrics: { likes: 0, reposts: 0, comments: 0, views: 0 }, hashtags: ["#메이플아일랜드", "#NPC알바"], mentions: [], links: ["https://www.donga.com/news/Culture/article/all/20260518/133942074/1"], suggestedKeywords: ["메이플 아일랜드", "NPC 알바"], keywordClusterIds: ["clu-maple-island"], status: "linked" },
  { id: "raw-006", platform: "manual_url", sourceAccountId: "src-openads", url: "https://www.openads.co.kr/content/contentDetail?contsId=19359", author: "OpenAds", postedAt: "3주 전", collectedAt: "오늘 08:55", excerpt: "5월 미디어&마켓 리포트에서 KBO 팬덤 마케팅, 생성형 AI 개인화 마케팅, 산트립, X챗 이슈를 포착.", metrics: { likes: 0, reposts: 0, comments: 0, views: 0 }, hashtags: ["#마케팅리포트", "#KBO", "#AI마케팅"], mentions: [], links: ["https://www.openads.co.kr/content/contentDetail?contsId=19359"], suggestedKeywords: ["KBO 팬덤 마케팅", "산트립", "AI 개인화 마케팅", "X챗"], keywordClusterIds: ["clu-kbo-fandom", "clu-santrip", "clu-ai-personal", "clu-xchat"], status: "analyzed" },
  { id: "raw-007", platform: "manual_url", sourceAccountId: "src-careet", url: "https://www.careet.net/1902", author: "Careet", postedAt: "지난주", collectedAt: "오늘 08:46", excerpt: "롯데리아 포켓몬 굿즈와 유행템 사례가 Z세대 소비/방문 유도 사례로 잡힘.", metrics: { likes: 0, reposts: 0, comments: 0, views: 0 }, hashtags: ["#롯데리아", "#포켓몬"], mentions: [], links: ["https://www.careet.net/1902"], suggestedKeywords: ["롯데리아 포켓몬 굿즈"], keywordClusterIds: ["clu-pokemon-goods"], status: "linked" },
  { id: "raw-008", platform: "youtube", sourceAccountId: "src-x-meme", url: "https://www.youtube.com/results?search_query=빅나티+스윙스", author: "유튜브 쇼츠", postedAt: "최근 1개월", collectedAt: "오늘 08:40", excerpt: "빅나티와 스윙스 공방이 해명 클립, 반응 영상, 커뮤니티 판정 콘텐츠로 재가공됨.", metrics: { likes: 9700, reposts: 0, comments: 1300, views: 420000 }, hashtags: ["#빅나티", "#스윙스"], mentions: [], links: ["https://www.fnnews.com/ampNews/202604161631236910"], suggestedKeywords: ["빅나티 스윙스", "힙합 디스전"], keywordClusterIds: ["clu-hiphop-diss"], status: "linked" },
];

const MARKETER_KEYWORD_CLUSTERS = [
  { id: "clu-setlog", canonicalKeyword: "셋로그", aliases: ["setlog", "분할 브이로그", "친구 일상 공유"], category: "밈/커뮤니티", rawPostIds: ["raw-003"], platforms: ["x"], sourceCount: 2, firstDetectedAt: "오늘 08:40", lastDetectedAt: "오늘 09:15", trendScore: 94, scoreBreakdown: { growthSignal: 28, sourceDiversity: 13, platformSpread: 12, reactionVelocity: 21, evidenceQuality: 13, operatorWeight: 9, noisePenalty: -2 }, similarClusterIds: ["clu-youngkk"], operatorNote: "브랜드 활용성이 높고 기사/분석 분리가 쉬운 핵심 주제.", status: "ready_for_draft" },
  { id: "clu-youngkk", canonicalKeyword: "영크크", aliases: ["YOUNGCREATORCREW", "영 크리에이터 크루", "요를레이히 말고 영크크"], category: "밈/커뮤니티", rawPostIds: ["raw-001"], platforms: ["manual_url", "x"], sourceCount: 2, firstDetectedAt: "지난주", lastDetectedAt: "오늘 10:02", trendScore: 86, scoreBreakdown: { growthSignal: 24, sourceDiversity: 12, platformSpread: 10, reactionVelocity: 18, evidenceQuality: 12, operatorWeight: 12, noisePenalty: -2 }, similarClusterIds: ["clu-setlog"], operatorNote: "밈 수명이 짧아 빠른 발행 필요.", status: "draft_requested" },
  { id: "clu-starbucks-risk", canonicalKeyword: "스타벅스 탱크데이", aliases: ["탱크데이", "스타벅스 5.18", "브랜드 캘린더 리스크"], category: "브랜드 이슈", rawPostIds: ["raw-002"], platforms: ["naver", "x"], sourceCount: 3, firstDetectedAt: "2일 전", lastDetectedAt: "오늘 09:50", trendScore: 91, scoreBreakdown: { growthSignal: 27, sourceDiversity: 16, platformSpread: 13, reactionVelocity: 17, evidenceQuality: 17, operatorWeight: 6, noisePenalty: -5 }, similarClusterIds: [], operatorNote: "논란 이슈라 분석 톤은 차분하게 유지.", status: "ready_for_draft" },
  { id: "clu-hbm-stock", canonicalKeyword: "삼전 하닉 HBM", aliases: ["삼성전자 SK하이닉스", "HBM 주가", "AI 반도체"], category: "비즈/테크", rawPostIds: ["raw-004"], platforms: ["naver"], sourceCount: 2, firstDetectedAt: "지난주", lastDetectedAt: "오늘 09:20", trendScore: 83, scoreBreakdown: { growthSignal: 20, sourceDiversity: 11, platformSpread: 9, reactionVelocity: 14, evidenceQuality: 16, operatorWeight: 15, noisePenalty: -2 }, similarClusterIds: [], operatorNote: "투자 권유처럼 보이지 않도록 정보형으로 처리.", status: "watching" },
  { id: "clu-maple-island", canonicalKeyword: "롯데월드 메이플 아일랜드", aliases: ["메이플 아일랜드", "NPC 알바", "메이플스토리 롯데월드"], category: "팬덤/IP", rawPostIds: ["raw-005"], platforms: ["manual_url", "instagram"], sourceCount: 3, firstDetectedAt: "4월 3일", lastDetectedAt: "오늘 09:05", trendScore: 88, scoreBreakdown: { growthSignal: 21, sourceDiversity: 14, platformSpread: 12, reactionVelocity: 16, evidenceQuality: 16, operatorWeight: 12, noisePenalty: -3 }, similarClusterIds: ["clu-pokemon-goods"], operatorNote: "게임 IP의 현실 공간화 분석에 적합.", status: "ready_for_draft" },
  { id: "clu-pokemon-goods", canonicalKeyword: "롯데리아 포켓몬 굿즈", aliases: ["포켓몬 굿즈", "캐릭터 콜라보", "굿즈 대란"], category: "팬덤/IP", rawPostIds: ["raw-007"], platforms: ["manual_url", "x"], sourceCount: 2, firstDetectedAt: "지난주", lastDetectedAt: "오늘 08:46", trendScore: 81, scoreBreakdown: { growthSignal: 19, sourceDiversity: 10, platformSpread: 10, reactionVelocity: 15, evidenceQuality: 12, operatorWeight: 15, noisePenalty: 0 }, similarClusterIds: ["clu-maple-island"], operatorNote: "재고/리셀 리스크도 함께 다뤄야 함.", status: "draft_requested" },
];

const MARKETER_CARD_DRAFTS = [
  {
    id: "draft-setlog",
    keywordClusterId: "clu-setlog",
    title: "셋로그, 브랜드는 어떻게 써먹을 수 있을까",
    summary: "친구끼리 짧은 영상을 모아 하루를 완성하는 포맷이 Z세대 친밀감 코드와 맞물리고 있다.",
    whyHot: "공개 피드 피로감이 커진 상황에서 작고 가까운 그룹의 날것 기록이 새로운 소셜 포맷으로 보인다.",
    hook: "릴스 화면이 여러 칸으로 쪼개져 있다면 그냥 브이로그가 아닐 수 있다.",
    contentAngle: "직원, 팬, 크리에이터의 같은 시간 다른 하루를 묶는 브랜드 셋로그.",
    caution: "자발성 없이 연출하면 회사 홍보물로 보일 수 있음.",
    sourceLinks: ["https://www.mt.co.kr/society/2026/04/26/2026042408543850503", "https://www.ilyo.co.kr/?ac=article_view&entry_id=510607"],
    checklist: [
      { id: "sources", label: "출처 2개 이상 확인", done: true },
      { id: "copy", label: "외부 템플릿 문장 미사용", done: true },
      { id: "risk", label: "사생활/동의 리스크 표기", done: true },
      { id: "analysis", label: "브랜드 활용 가이드 포함", done: true },
    ],
    status: "approved",
    previewCardId: "c01",
  },
  {
    id: "draft-starbucks-risk",
    keywordClusterId: "clu-starbucks-risk",
    title: "스타벅스 탱크데이 논란에서 보는 브랜드 캘린더 리스크",
    summary: "프로모션 날짜와 단어가 사회적 기억과 충돌하면 할인 이벤트도 위기 이슈가 된다.",
    whyHot: "5.18 기념일 직후 논란이 확산됐고 브랜드 사과와 행사 중단까지 이어졌다.",
    hook: "마케팅 캘린더에 날짜만 있고 맥락이 없으면 사고가 난다.",
    contentAngle: "민감일, 금칙어, 이미지 조합을 사전 점검하는 캠페인 체크리스트.",
    caution: "논란을 밈처럼 소비하지 않고 차분한 분석 톤 유지.",
    sourceLinks: ["https://m.ytn.co.kr/news_view.php?key=202605181519254664&s_mcd=0134", "https://www.kookje.co.kr/news2011/asp/newsbody.asp?code=0200&key=20260518.99099004695"],
    checklist: [
      { id: "sources", label: "뉴스 출처 확인", done: true },
      { id: "tone", label: "피해 맥락 존중", done: true },
      { id: "claims", label: "사실 단정 최소화", done: true },
      { id: "guide", label: "실무 체크리스트 포함", done: false },
    ],
    status: "draft",
    previewCardId: "c05",
  },
];

function issueTrendPoints(card, index) {
  const start = card.timing === "red" ? 48 : card.timing === "yellow" ? 28 : 14 + index * 2;
  const lift = parseInt(String(card.velocity).replace(/[^0-9-]/g, ""), 10) || 40;
  return Array.from({ length: 14 }, (_, i) => {
    const progress = i / 13;
    const wave = Math.round(Math.sin((i + index) / 2) * 4);
    const redCurve = card.timing === "red" ? Math.min(100, start + i * 5 + wave) : null;
    const value = redCurve ?? Math.min(100, Math.round(start + progress * Math.min(74, lift) + wave));
    return { date: `5/${String(i + 5).padStart(2, "0")}`, value: Math.max(5, value) };
  });
}

function enrichMarketerIssueCard(card, index) {
  const points = issueTrendPoints(card, index);
  const ageKey = card.category === "비즈/테크" ? "30대" : card.category === "팬덤/IP" ? "20대" : "10-20대";
  const genderLead = card.category === "비즈/테크" ? "남성" : card.category === "라이프스타일" ? "여성" : "혼합";
  const velocityValue = parseInt(String(card.velocity).replace(/[^0-9-]/g, ""), 10);
  card.naverTrend = {
    period: "14d",
    updatedAt: "오늘 10:30",
    points,
    changeRate: card.velocity,
    dailyChange: Number.isFinite(velocityValue) && velocityValue < 0 ? "-4%" : card.timing === "red" ? "+31%" : `+${Math.max(8, Math.round(card.score * 2))}%`,
    peakStatus: Number.isFinite(velocityValue) && velocityValue < 0 ? "declining" : (card.timing === "red" || velocityValue >= 90) ? "peaking" : "rising",
    audience: card.audience,
    audienceDetail: card.audienceDetail,
    audienceBreakdown: hydrateAudienceBreakdown(points, {
      gender: genderLead === "남성"
        ? [{ label: "남성", value: 58 }, { label: "여성", value: 42 }]
        : genderLead === "여성"
          ? [{ label: "여성", value: 56 }, { label: "남성", value: 44 }]
          : [{ label: "여성", value: 51 }, { label: "남성", value: 49 }],
      age: [{ label: "10대", value: ageKey === "10-20대" ? 32 : 12 }, { label: "20대", value: 38 }, { label: "30대", value: ageKey === "30대" ? 36 : 24 }, { label: "40대+", value: 18 }],
    }),
    reason: card.why,
  };
  card.creatorKit = {
    hooks: [card.hook, `${card.keyword}, 마케터가 지금 봐야 하는 이유`, `${card.keyword}를 브랜드가 써먹을 수 있을까?`],
    titles: [`${card.keyword} 트렌드 분석`, `${card.keyword}가 뜨는 이유`, `마케터를 위한 ${card.keyword} 활용법`],
    thumbnailCopies: [card.keyword, "지금 봐야 함", card.risk === "높음" ? "신중하게 보기" : "활용 가능"],
    shotList: ["이슈를 한 문장으로 정의", "실제 반응이 나온 채널 보여주기", "소비자 심리 2가지로 쪼개기", "브랜드 활용/주의점으로 마무리"],
    platformFormats: card.platform,
    doNotUse: card.caution,
  };
  card.article = {
    author: "수달이",
    authorRole: "Trend Radar 에디터",
    publishedDate: "2026.05.20",
    ...(MARKETER_ARTICLES[card.id] || {}),
    title: card.title,
  };
  card.consumerSummary = {
    plainWhat: card.what,
    whyPeopleCare: card.why,
    whereToFind: card.related.places.join(", "),
    tryNowVerdict: card.verdict,
  };
  card.relatedTrends = {
    keywords: card.related.keywords,
    hashtags: card.related.hashtags,
    places: card.related.places,
    compareWith: MARKETER_ISSUE_CARDS.filter(c => c.id !== card.id && c.category === card.category).slice(0, 3).map(c => c.title),
  };
  card.community = {
    summary: card.risk === "높음"
      ? "관심도는 높지만 브랜드가 가볍게 얹히기엔 리스크가 커서 분석형 반응이 많습니다."
      : "마케터와 커뮤니티 이용자 모두 활용 가능성과 피로감을 동시에 이야기하고 있습니다.",
    sentiment: card.risk === "높음" ? { positive: 28, negative: 49, neutral: 23 } : { positive: 68, negative: 14, neutral: 18 },
    comments: [
      { id: 1, author: "실무마케터", text: `${card.keyword} 이건 회의 때 바로 얘기 나올 주제라 저장해둠.`, tone: "positive", timeAgo: "7분 전" },
      { id: 2, author: "트렌드보는중", text: `재밌긴 한데 브랜드가 너무 늦게 타면 바로 어색해질 듯.`, tone: "neutral", timeAgo: "19분 전" },
      { id: 3, author: "불편러등판", text: card.risk === "높음" ? "이걸 밈처럼 쓰면 진짜 감 없는 거 인증임." : "다 좋은데 또 모든 브랜드가 따라 하면 피곤해질 각.", tone: "negative", timeAgo: "33분 전" },
      { id: 4, author: "콘텐츠기획자", text: `핵심은 ${card.keyword} 자체보다 사람들이 왜 공유하는지인 듯.`, tone: "positive", timeAgo: "48분 전" },
    ],
  };
  card.macroCategory = mapCategory(card.category);
  card.stage = stageFromTiming(card.timing, card.velocity);
  card.stageMeta = STAGES[card.stage];
  card.stageReason = card.stage === "declining"
    ? "관심이 빠지는 흐름이라 새로 올라타기보다 맥락을 정리하는 콘텐츠가 더 자연스럽습니다."
    : card.stage === "peak"
      ? "지금 여러 채널에서 크게 이야기되는 구간입니다. 같은 말 반복보다 새로운 관점이 필요합니다."
      : card.stage === "mainstream"
        ? "커뮤니티와 숏폼 반응이 같이 오르며 확산 속도가 붙는 중입니다."
        : "아직 크게 퍼지기 전이지만 커뮤니티와 숏폼에서 신호가 포착되고 있습니다.";
  card.reproductionMetrics = {
    instagramPosts: 420 + index * 83,
    tiktokVideos: 120 + index * 37,
    last24hNew: card.timing === "red" ? 86 : 28 + index * 4,
    last7dCount: 310 + index * 52,
  };
  const sourceHandles = ["careet.net", "openads.co.kr", "@meme_radar_kr", "news", "@ip_fandom_watch"];
  card.discoverySource = {
    handle: sourceHandles[index % sourceHandles.length],
    platform: index % 3 === 0 ? "x" : index % 3 === 1 ? "manual_url" : "instagram",
    postUrl: card.sources[0]?.url || "#",
    capturedAt: card.publishedAt,
  };
  card.reproductionSamples = [0, 1, 2, 3].map(k => ({
    kind: "thumb",
    hue: (card.cover.hue + k * 19) % 360,
    sat: Math.max(38, card.cover.sat - k * 4),
    lum: Math.max(38, Math.min(84, card.cover.lum + (k - 1) * 5)),
    author: sourceHandles[(index + k) % sourceHandles.length],
    platform: k % 2 === 0 ? "instagram" : "tiktok",
    url: "#",
  }));
  card.enrichment = {
    cafeBlog: [
      { source: "마케팅 커뮤니티", snippet: `${card.keyword}를 우리 브랜드에 어떻게 적용할지 묻는 글이 늘고 있습니다.`, link: "#", timeAgo: "2시간 전" },
      { source: "실무자 블로그", snippet: `${card.keyword} 이슈를 캠페인 체크리스트로 정리한 글이 공유되고 있습니다.`, link: "#", timeAgo: "6시간 전" },
      { source: "뉴스 클리핑", snippet: `${card.keyword} 관련 기사와 커뮤니티 반응이 함께 묶여 확산 중입니다.`, link: "#", timeAgo: "오늘" },
    ],
    youtube: [
      { title: `${card.keyword} 3분 요약`, channel: "트렌드 브리핑", views: `${12 + index}.4만`, thumbHue: card.cover.hue, link: "#" },
      { title: `마케터가 보는 ${card.keyword}`, channel: "마케팅 인사이트", views: `${8 + index}.1만`, thumbHue: (card.cover.hue + 30) % 360, link: "#" },
      { title: `${card.keyword} 브랜드 활용법`, channel: "콘텐츠 회의실", views: `${5 + index}.7만`, thumbHue: (card.cover.hue + 60) % 360, link: "#" },
    ],
  };
  return card;
}

const MARKETER_COVER_IMAGES = {
  c01: "assets/covers/setlog.svg",
  c02: "assets/covers/youngkk.svg",
  c03: "assets/covers/hiphop-diss.svg",
  c04: "assets/covers/hbm-rally.svg",
  c05: "assets/covers/tank-day-risk.svg",
  c06: "assets/covers/buldak-global.svg",
  c07: "assets/covers/kbo-fandom.svg",
  c08: "assets/covers/santrip.svg",
  c09: "assets/covers/ai-personalization.svg",
  c10: "assets/covers/xchat-dm.svg",
  c11: "assets/covers/maple-island.svg",
  c12: "assets/covers/pokemon-goods.svg",
};

CARDS.splice(0, CARDS.length, ...MARKETER_ISSUE_CARDS.map((card, index) => enrichMarketerIssueCard({ ...card, platform: card.platform.map(p => ({ ...p })), sources: card.sources.map(s => ({ ...s })), related: { ...card.related, keywords: [...card.related.keywords], hashtags: [...card.related.hashtags], places: [...card.related.places] }, audienceDetail: card.audienceDetail.map(item => ({ ...item })), cover: { ...card.cover } }, index)));
CARDS.forEach(card => {
  const src = MARKETER_COVER_IMAGES[card.id];
  if (src) card.cover = { ...card.cover, src, position: "center" };
});
REALTIME.splice(0, REALTIME.length, ...MARKETER_REALTIME);
DEBATES.splice(0, DEBATES.length, ...MARKETER_DEBATES);
SHORTS_FEED.splice(0, SHORTS_FEED.length, ...[
  { type: "trend", cardId: "c01" },
  { type: "trend", cardId: "c02" },
  { type: "debate", debateId: "d01" },
  { type: "trend", cardId: "c05" },
  { type: "trend", cardId: "c11" },
  { type: "debate", debateId: "d02" },
  { type: "trend", cardId: "c04" },
  { type: "debate", debateId: "d03" },
].map((item, index) => ({ ...item, id: `${item.type}-${index + 1}` })));

SOURCE_ACCOUNTS.splice(0, SOURCE_ACCOUNTS.length, ...MARKETER_SOURCE_ACCOUNTS);
RAW_POSTS.splice(0, RAW_POSTS.length, ...MARKETER_RAW_POSTS);
KEYWORD_CLUSTERS.splice(0, KEYWORD_CLUSTERS.length, ...MARKETER_KEYWORD_CLUSTERS);
CARD_DRAFTS.splice(0, CARD_DRAFTS.length, ...MARKETER_CARD_DRAFTS);
CANDIDATES.splice(0, CANDIDATES.length, ...[
  { id: "k001", title: "셋로그 브랜드 활용", category: "밈/커뮤니티", discoverySource: { handle: "@meme_radar_kr", platform: "x", postUrl: "#" }, enrichmentStatus: { datalab: "done", naver: "done", youtube: "in_progress" }, stagePreview: "mainstream", registeredAt: "20분 전", note: "직원/팬 하루 기록 포맷으로 확장 가능" },
  { id: "k002", title: "스타벅스 탱크데이 리스크", category: "브랜드 이슈", discoverySource: { handle: "news", platform: "naver", postUrl: "#" }, enrichmentStatus: { datalab: "done", naver: "done", youtube: "done" }, stagePreview: "declining", registeredAt: "35분 전", note: "브랜드 캘린더 검수 사례로 발행 필요" },
  { id: "k003", title: "메이플 아일랜드 NPC 알바", category: "팬덤/IP", discoverySource: { handle: "@ip_fandom_watch", platform: "instagram", postUrl: "#" }, enrichmentStatus: { datalab: "done", naver: "done", youtube: "pending" }, stagePreview: "mainstream", registeredAt: "1시간 전", note: "IP 세계관 오프라인화 사례" },
  { id: "k004", title: "삼전 하닉 HBM 밈", category: "비즈/테크", discoverySource: { handle: "finance", platform: "naver", postUrl: "#" }, enrichmentStatus: { datalab: "done", naver: "in_progress", youtube: "pending" }, stagePreview: "mainstream", registeredAt: "2시간 전", note: "투자 권유 아닌 정보형으로 처리" },
]);
ACCOUNTS.splice(0, ACCOUNTS.length, ...[
  { handle: "careet.net", trust: 5, freq: "1d", lastCheck: "20분 전", category: "밈/커뮤니티", enabled: true },
  { handle: "openads.co.kr", trust: 5, freq: "2d", lastCheck: "35분 전", category: "브랜드 이슈", enabled: true },
  { handle: "@meme_radar_kr", trust: 4, freq: "4h", lastCheck: "8분 전", category: "밈/커뮤니티", enabled: true },
  { handle: "@ip_fandom_watch", trust: 4, freq: "12h", lastCheck: "2시간 전", category: "팬덤/IP", enabled: true },
  { handle: "finance-news", trust: 4, freq: "12h", lastCheck: "1시간 전", category: "비즈/테크", enabled: true },
]);
INFLUENCERS.splice(0, INFLUENCERS.length, ...[
  { handle: "careet.net", category: "밈/커뮤니티", platform: "manual_url", trust: 5, followers: "-", lastChecked: "20분 전", contributedThisWeek: 5, contributedAllTime: 88, enabled: true, note: "Z세대 밈/유행템" },
  { handle: "openads.co.kr", category: "브랜드 이슈", platform: "manual_url", trust: 5, followers: "-", lastChecked: "35분 전", contributedThisWeek: 4, contributedAllTime: 72, enabled: true, note: "마케팅 리포트" },
  { handle: "@meme_radar_kr", category: "밈/커뮤니티", platform: "x", trust: 4, followers: "420K", lastChecked: "8분 전", contributedThisWeek: 6, contributedAllTime: 104, enabled: true, note: "밈 초반 반응" },
  { handle: "@ip_fandom_watch", category: "팬덤/IP", platform: "instagram", trust: 4, followers: "128K", lastChecked: "2시간 전", contributedThisWeek: 3, contributedAllTime: 49, enabled: true, note: "IP 팝업/굿즈" },
  { handle: "finance-news", category: "비즈/테크", platform: "naver", trust: 4, followers: "-", lastChecked: "1시간 전", contributedThisWeek: 2, contributedAllTime: 31, enabled: true, note: "경제/테크 이슈" },
]);
BLOCKLIST.splice(0, BLOCKLIST.length, ..."광고,협찬,쿠폰,단순할인,근거없음,투자권유,혐오표현".split(","));

Object.assign(STATS, {
  todayInfluencerChecked: 5,
  todayInfluencerTarget: 10,
  todayDiscovered: 12,
  todayDiscoveryTarget: 15,
  pendingReview: 6,
  enrichmentInProgress: 9,
  todayPublished: 5,
  stageDistribution: { early: 26, mainstream: 52, peak: 14, declining: 8 },
  signalsToday: { instagram: 5, tiktok: 3, x: 6, news: 4 },
  weekTopInfluencers: [
    { handle: "@meme_radar_kr", contributedThisWeek: 6 },
    { handle: "careet.net", contributedThisWeek: 5 },
    { handle: "openads.co.kr", contributedThisWeek: 4 },
  ],
  todayDraft: 4,
  candidates: CANDIDATES.length,
  collectedX: 86,
  collectedNaver: 31,
});

Object.assign(PIPELINE_STATS, {
  rawPostsToday: RAW_POSTS.length,
  newClusters: KEYWORD_CLUSTERS.filter(c => c.status === "new").length,
  draftReady: KEYWORD_CLUSTERS.filter(c => c.status === "ready_for_draft").length,
  draftQueue: CARD_DRAFTS.filter(d => d.status === "draft" || d.status === "needs_revision").length,
  noiseOrDuplicate: RAW_POSTS.filter(p => p.status === "ignored" || p.status === "duplicate").length,
  activeABSources: SOURCE_ACCOUNTS.filter(s => s.active && (s.grade === "A" || s.grade === "B")).length,
  sourceTotalTarget: 50,
  rawPostStatus: {
    raw: RAW_POSTS.filter(p => p.status === "raw").length,
    analyzed: RAW_POSTS.filter(p => p.status === "analyzed").length,
    linked: RAW_POSTS.filter(p => p.status === "linked").length,
    ignored: RAW_POSTS.filter(p => p.status === "ignored").length,
    duplicate: RAW_POSTS.filter(p => p.status === "duplicate").length,
  },
  clusterStatus: {
    new: KEYWORD_CLUSTERS.filter(c => c.status === "new").length,
    watching: KEYWORD_CLUSTERS.filter(c => c.status === "watching").length,
    readyForDraft: KEYWORD_CLUSTERS.filter(c => c.status === "ready_for_draft").length,
    draftRequested: KEYWORD_CLUSTERS.filter(c => c.status === "draft_requested").length,
    rejected: KEYWORD_CLUSTERS.filter(c => c.status === "rejected").length,
    merged: KEYWORD_CLUSTERS.filter(c => c.status === "merged").length,
  },
  platformsToday: {
    x: RAW_POSTS.filter(p => p.platform === "x").length,
    youtube: RAW_POSTS.filter(p => p.platform === "youtube").length,
    manual_url: RAW_POSTS.filter(p => p.platform === "manual_url").length,
    naver: RAW_POSTS.filter(p => p.platform === "naver").length,
  },
  gradeMix: {
    A: SOURCE_ACCOUNTS.filter(s => s.grade === "A").length,
    B: SOURCE_ACCOUNTS.filter(s => s.grade === "B").length,
    C: SOURCE_ACCOUNTS.filter(s => s.grade === "C").length,
    D: SOURCE_ACCOUNTS.filter(s => s.grade === "D").length,
  },
});

window.TR_DATA = {
  CARDS, REALTIME, DEBATES, SHORTS_FEED,
  CATEGORIES, CATEGORY_MAP, STAGES,
  CANDIDATES, INFLUENCERS, ACCOUNTS,
  BLOCKLIST, STATS,
  SOURCE_ACCOUNTS, RAW_POSTS, KEYWORD_CLUSTERS, CARD_DRAFTS, PIPELINE_STATS,
  stageFromTiming, mapCategory,
};
