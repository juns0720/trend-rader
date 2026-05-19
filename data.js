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
    cover: { hue: 38, sat: 92, lum: 68, label: "MANGO\nPUDDING" },
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
    cover: { hue: 200, sat: 72, lum: 70, label: "FROZEN\nJELLY" },
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
    cover: { hue: 22, sat: 45, lum: 38, label: "CHOCO\nBAGUETTE" },
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
    cover: { hue: 12, sat: 78, lum: 52, label: "CHILI'S\nSTICKS" },
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
    cover: { hue: 320, sat: 80, lum: 65, label: "POPUP\nSEONGSU" },
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
    label: "이제 막 뜨는 중",
    short: "얼리",
    desc: "검색은 아직 잔잔한데 SNS 쪽이 먼저 움직이는 중. 선점 여지 있어요.",
    color: "var(--tr-blue)",
    bg: "rgba(49,130,246,0.12)",
  },
  mainstream: {
    key: "mainstream",
    label: "한창 퍼지는 중",
    short: "메인스트림",
    desc: "검색이랑 SNS가 같이 오르는 중. 안정적인 타이밍이에요.",
    color: "var(--tr-green)",
    bg: "rgba(0,200,83,0.12)",
  },
  peak: {
    key: "peak",
    label: "정점 가까이",
    short: "피크",
    desc: "검색은 정점 가까이 왔고 SNS도 슬슬 둔화되는 중. 다른 각도가 필요해요.",
    color: "var(--tr-yellow)",
    bg: "rgba(255,179,0,0.14)",
  },
  declining: {
    key: "declining",
    label: "살짝 빠지는 중",
    short: "쇠퇴",
    desc: "검색이랑 SNS 둘 다 빠지고 있어요. 회고형이 아니면 굳이 안 해도 될 것 같아요.",
    color: "var(--tr-red)",
    bg: "rgba(255,59,48,0.12)",
  },
};

// 기존 timing(red/yellow/green) → stage 매핑 (호환용)
function stageFromTiming(timing, velocity) {
  if (timing === "red") return "declining";
  if (timing === "yellow") return "peak";
  // green: 신선한 신호인지 안정 성장인지 velocity로 분기
  const v = parseInt(String(velocity).replace(/[^0-9-]/g, ""), 10);
  if (Number.isFinite(v) && v >= 80) return "early";
  return "mainstream";
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
      { id: 4, author: "데일리_크리에이터", text: "피크 지나면 반응 없을까봐 고민이 되긴 함", tone: "negative", timeAgo: "1시간 전" },
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
    card.stage === "early"      ? "데이터랩은 아직 잔잔한데 SNS 쪽이 먼저 움직이고 있어요. 선점 여지 있습니다." :
    card.stage === "mainstream" ? "데이터랩이랑 SNS 둘 다 같이 오르는 중. 안정적인 타이밍이에요." :
    card.stage === "peak"       ? "검색은 이미 정점 가까이 왔고 SNS도 슬슬 둔화되는 중. 다른 각도가 필요할 수 있어요." :
                                  "검색이랑 SNS 둘 다 빠지고 있어요. 회고형 콘텐츠가 아니면 굳이 안 해도 될 것 같아요."
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

window.TR_DATA = {
  CARDS, REALTIME,
  CATEGORIES, CATEGORY_MAP, STAGES,
  CANDIDATES, INFLUENCERS, ACCOUNTS,
  BLOCKLIST, STATS,
  stageFromTiming, mapCategory,
};
