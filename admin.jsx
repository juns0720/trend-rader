// admin.jsx — Operator console screens

const { useMemo: useMemoA, useState: useStateA } = React;

const ADMIN_TABS = [
  { k: "dash", label: "대시보드" },
  { k: "add", label: "등록" },
  { k: "review", label: "검수" },
  { k: "influencer", label: "인플루언서" },
];

const STAGE_LABELS = {
  early: "얼리",
  mainstream: "메인스트림",
  peak: "피크",
  declining: "지는 중",
};

const SAMPLE_URLS = [
  "https://www.instagram.com/reel/C0_food_seoul/",
  "https://www.tiktok.com/@meme_kr/video/735900001",
  "https://www.instagram.com/p/seoul_popup_new/",
];

// LLM이 oEmbed 메타(작성자/캡션/썸네일)를 보고 자동 채움하는 결과의 mock.
// 실제 백엔드 연결 시 이 부분이 LLM 응답으로 교체됨.
const QUICK_ADD_PRESETS = [
  {
    caption: "스타벅스 매장 한정 신상 발견했어요 이거 진짜 미친 비주얼... 녹차 크림 + 마들렌 조합 처음 본 사람 #스벅신상 #녹차마들렌 #카페투어",
    title: "녹차 크림 마들렌",
    keyword: "녹차 마들렌",
    description: "스타벅스 한정 출시 + 개인 베이커리 동시 출시로 SNS에서 빠르게 재생산되고 있는 디저트 신상.",
    hook: "스벅 한정인데 베이커리에서도 따라 만들기 시작했어요",
    why: "동시 다발 출시 + 비주얼 강한 컬러 대비. 카페 인플루언서 8명 24시간 내 게시.",
    angle: "원조 vs 베이커리 비교 컷, 가격 자막. 단면 클로즈업 필수.",
    caution: "스타벅스 매장 내 촬영 정책 확인.",
    stagePreview: "mainstream",
    confidence: 0.86,
    categoryReason: "캡션의 '#스벅신상 #카페투어' 해시태그와 매장 위치 언급으로 푸드로 분류.",
  },
  {
    caption: "9분만에 끝나는 챌린지 ㄹㅇ 두 명만 있으면 됩니다 ㅋㅋ 마지막 동작 못 따라하면 벌칙 #9분챌린지 #듀엣챌린지 #밈",
    title: "9분 챌린지",
    keyword: "9분 챌린지",
    description: "원곡 후렴구에 맞춰 두 명이 9가지 동작을 9분 안에 따라하는 챌린지 포맷. 10대 사이 폭발 확산 중.",
    hook: "두 명만 있으면 9분 안에 끝납니다",
    why: "원곡 음원 차트 진입 + 진입 장벽 0. 24시간 내 #9분챌린지 +890%.",
    angle: "1차 시도 → 실패 → 성공. 마지막 동작 슬로모션 처리.",
    caution: "원곡 저작권 — 틱톡 내장 음원으로만 사용.",
    stagePreview: "early",
    confidence: 0.92,
    categoryReason: "9가지 동작 챌린지 포맷 + #챌린지 해시태그 + 음원 의존성으로 밈·챌린지로 분류.",
  },
  {
    caption: "한남동 도넛 팝업 다녀왔어요 주말 줄 1.5시간 평일 추천 ✨ 컬러별로 다 사봤는데 너무 예뻐서 박스 못 버림 #한남동팝업 #도넛 #서울팝업",
    title: "한남동 도넛 팝업",
    keyword: "도넛 팝업",
    description: "한남동에 2주 한정으로 열린 컬러 도넛 팝업스토어. 비주얼 + 한정성으로 빠르게 재생산.",
    hook: "주말 1.5시간 줄, 평일 오전이 골든타임",
    why: "한정 운영 + 컬러 비주얼 + SNS 인증샷 명소. 인스타 #한남동팝업 24h +320%.",
    angle: "외관 → 컬러별 클로즈업 → 박스 패키지 컷. 줄 길이 자막.",
    caution: "주말 운영시간 짧음, 평일 오전 추천 자막 권장.",
    stagePreview: "mainstream",
    confidence: 0.78,
    categoryReason: "특정 지역 팝업스토어 위치 언급 + #서울팝업 해시태그로 플레이스로 분류.",
  },
  {
    caption: "이번 가을 무조건 이 컬러래요 셀프네일 도전해봤는데 광택 진짜 미쳤어요 #버건디네일 #셀프네일 #가을네일",
    title: "버건디 매니큐어",
    keyword: "버건디 네일",
    description: "가을 진입과 함께 다시 뜨는 딥 버건디 컬러 네일아트. 뷰티 인플루언서 다수 동시 게시.",
    hook: "가을엔 무조건 이 컬러래요",
    why: "K-아이돌 공항패션 + 셀프네일 트렌드 결합. 뷰티 크리에이터 12명 동시 게시.",
    angle: "광택 vs 매트 비교, 손톱 모양별 추천 컷, 셀프네일 과정.",
    caution: "특정 브랜드 협찬 시 표기 명확히.",
    stagePreview: "mainstream",
    confidence: 0.81,
    categoryReason: "네일아트 + 컬러 트렌드 + #가을네일 해시태그로 패션·뷰티로 분류.",
  },
  {
    caption: "출근 전 30분 러닝 시작한 지 2주 됐어요 진짜 하루가 다르다... 같이 뛰실 분 있나요 #모닝러닝 #러닝크루 #출퇴근러닝",
    title: "출퇴근 러닝 모임",
    keyword: "모닝 러닝",
    description: "출퇴근 시간에 30분 가볍게 뛰는 러닝 크루 인증 콘텐츠 트렌드. 일상 + 건강 결합.",
    hook: "출근 전 30분이 하루를 바꿔요",
    why: "건강 + 일상 콘텐츠 결합 + 진입 장벽 낮음. 모임 크루 자발적 확산.",
    angle: "GPS 트래킹 + 풍경 컷 교차. 30분 BGM 동기화. 코스 추천 자막.",
    caution: "초보 안전 멘트 1줄 권장.",
    stagePreview: "early",
    confidence: 0.74,
    categoryReason: "일상 루틴 + 건강 컨텐츠 + #모닝러닝 해시태그로 라이프스타일로 분류.",
  },
];

function AdminTopBar({ tab, onTab, onExit }) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 30,
      background: "var(--tr-fg)", color: "var(--tr-bg)",
      padding: "10px 22px 0",
      boxShadow: "0 1px 0 rgba(255,255,255,0.08)",
    }}>
      <div style={{
        maxWidth: 1180, margin: "0 auto",
        display: "flex", alignItems: "center", padding: "8px 0 16px", gap: 14,
      }}>
        <button aria-label="사용자 화면으로 돌아가기" onClick={onExit} style={iconButtonDark}>
          <IconBack size={18} />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 10.5, opacity: 0.62, letterSpacing: "0.14em",
            textTransform: "uppercase", fontWeight: 700,
          }}>
            Operator Console
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", marginTop: 2 }}>
            트렌드 레이더
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, fontWeight: 700, opacity: 0.72 }}>
          <span style={{ width: 7, height: 7, borderRadius: 100, background: "var(--tr-green)" }} />
          ONLINE
        </div>
      </div>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", gap: 6, overflowX: "auto" }} className="tr-no-scrollbar">
        {ADMIN_TABS.map(item => (
          <button key={item.k} onClick={() => onTab(item.k)} style={{
            padding: "12px 16px", border: 0, background: "transparent", cursor: "pointer",
            color: tab === item.k ? "var(--tr-bg)" : "rgba(255,255,255,0.5)",
            fontSize: 14, fontWeight: tab === item.k ? 700 : 600, letterSpacing: "-0.01em",
            position: "relative", whiteSpace: "nowrap",
          }}>
            {item.label}
            {tab === item.k && <div style={{
              position: "absolute", bottom: 0, left: 10, right: 10, height: 2,
              background: "var(--tr-bg)", borderRadius: 100,
            }} />}
          </button>
        ))}
      </div>
    </div>
  );
}

function AdminDashboard({ onTab }) {
  const s = window.TR_DATA.STATS;
  return (
    <AdminPage
      eyebrow="오늘 워크플로우"
      title="10분 안에 발견부터 발행까지"
      aside={<DashboardAside onTab={onTab} />}
    >
      <div style={sectionGrid}>
        <WorkflowPanel title="인플루언서 둘러보기" value={s.todayInfluencerChecked} max={s.todayInfluencerTarget} action="보드 열기" onClick={() => onTab("influencer")} />
        <WorkflowPanel title="Quick Add 등록" value={s.todayDiscovered} max={s.todayDiscoveryTarget} action="등록하기" onClick={() => onTab("add")} />
        <WorkflowPanel title="검수 대기" value={s.pendingReview} max={s.pendingReview + s.todayPublished} action="검수하기" onClick={() => onTab("review")} />
      </div>

      <div style={sectionGrid}>
        <StatTile big={s.enrichmentInProgress} label="자동 보강 중" />
        <StatTile big={s.pendingReview} label="검수 대기" accent />
        <StatTile big={s.todayPublished} label="오늘 발행" />
        <StatTile big={s.todayDiscovered} label="오늘 등록" />
      </div>

      <Panel title="단계별 발행 분포">
        <StageDistribution distribution={s.stageDistribution} />
      </Panel>

      <div style={twoColumnGrid}>
        <Panel title="데이터 소스별 신호">
          <SignalBars signals={s.signalsToday} />
        </Panel>
        <Panel title="API 사용량">
          <ApiUsageTiles usage={s.apiUsage} />
        </Panel>
      </div>

      <Panel title="주간 발행">
        <WeeklyChart data={s.weekly} />
      </Panel>
    </AdminPage>
  );
}

function DashboardAside({ onTab }) {
  const s = window.TR_DATA.STATS;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Panel title="이번 주 보드 Top 3">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {s.weekTopInfluencers.map((item, i) => (
            <div key={item.handle} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={rankBadge}>{i + 1}</span>
              <span style={{ flex: 1, fontWeight: 700, fontSize: 14 }}>{item.handle}</span>
              <span style={{ fontSize: 12, color: "var(--tr-muted)", fontWeight: 600 }}>{item.contributedThisWeek}건</span>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="바로가기">
        <div style={{ display: "grid", gap: 8 }}>
          <ActionButton label="URL 일괄 등록" onClick={() => onTab("add")} />
          <ActionButton label="검수 큐 확인" onClick={() => onTab("review")} />
          <ActionButton label="오늘 볼 10명" onClick={() => onTab("influencer")} />
        </div>
      </Panel>
    </div>
  );
}

function AdminQuickAdd({ sourceHandle, onClearSource }) {
  const { CATEGORIES, INFLUENCERS } = window.TR_DATA;
  const [urls, setUrls] = useStateA(SAMPLE_URLS.join("\n"));
  const [rows, setRows] = useStateA([]);
  const [selected, setSelected] = useStateA(null);

  const analyze = () => {
    const handles = INFLUENCERS.filter(i => i.enabled);
    const inputUrls = urls.split(/\n+/).map(v => v.trim()).filter(Boolean);
    const pinnedInfluencer = sourceHandle
      ? INFLUENCERS.find(i => i.handle === sourceHandle)
      : null;
    const nextRows = inputUrls.map((url, i) => {
      const influencer = pinnedInfluencer || handles[i % handles.length];
      const category = influencer.category || CATEGORIES[(i % (CATEGORIES.length - 1)) + 1];
      const preset = QUICK_ADD_PRESETS[i % QUICK_ADD_PRESETS.length];
      return {
        id: `qa-${i + 1}`,
        url,
        handle: influencer.handle,
        platform: url.includes("tiktok") ? "tiktok" : "instagram",
        caption: preset.caption,
        title: preset.title,
        keyword: preset.keyword,
        category,
        description: preset.description,
        hook: preset.hook,
        why: preset.why,
        angle: preset.angle,
        caution: preset.caution,
        stagePreview: preset.stagePreview,
        confidence: preset.confidence,
        categoryReason: preset.categoryReason,
        status: "ready",
      };
    });
    setRows(nextRows);
    setSelected(nextRows[0]?.id || null);
  };

  const updateRow = (id, key, value) => {
    setRows(rows.map(row => row.id === id ? { ...row, [key]: value } : row));
  };
  const mark = (id, status) => {
    setRows(rows.map(row => row.id === id ? { ...row, status } : row));
  };
  const active = rows.find(row => row.id === selected) || rows[0];

  return (
    <AdminPage eyebrow="등록" title="Quick Add">
      <Panel title="멀티 URL 붙여넣기">
        {sourceHandle && (
          <div style={{
            display: "flex", alignItems: "center", gap: 8, marginBottom: 10,
            padding: "8px 12px", borderRadius: 8,
            background: "var(--tr-card-2)", border: "1px solid var(--tr-line)",
          }}>
            <span style={{ fontSize: 12, color: "var(--tr-muted)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>출처</span>
            <span style={{ fontSize: 14, fontWeight: 800, flex: 1 }}>{sourceHandle}</span>
            <button onClick={onClearSource} style={{
              border: 0, background: "transparent", cursor: "pointer",
              color: "var(--tr-muted)", fontSize: 18, lineHeight: 1, padding: "0 2px",
            }}>×</button>
          </div>
        )}
        <textarea value={urls} onChange={e => setUrls(e.target.value)} rows={5} style={editorInput} />
        <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
          <div style={{ fontSize: 12.5, color: "var(--tr-muted)", lineHeight: 1.5 }}>
            줄바꿈으로 URL을 구분합니다. 현재는 oEmbed/LLM 흐름을 더미로 시연합니다.
          </div>
          <button onClick={analyze} style={primaryButton}>
            <IconSparkle size={16} />일괄 분석
          </button>
        </div>
      </Panel>

      {rows.length > 0 && (
        <div style={reviewLayout}>
          <Panel title={`분석 결과 ${rows.length}건`}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {rows.map(row => (
                <button key={row.id} onClick={() => setSelected(row.id)} style={{
                  ...listButton,
                  borderColor: active?.id === row.id ? "var(--tr-fg)" : "var(--tr-line)",
                  opacity: row.status === "discarded" ? 0.45 : 1,
                }}>
                  <SourceThumb row={row} />
                  <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.title}</div>
                    <div style={{ fontSize: 12, color: "var(--tr-muted)", marginTop: 3 }}>{row.handle} · {row.category}</div>
                  </div>
                  <StatusPill status={row.status} />
                </button>
              ))}
            </div>
          </Panel>

          {active && (
            <Panel title="LLM 자동 채움 폼">
              <SourcePreview row={active} />
              <AnalysisMeta row={active} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <AdminField label="키워드">
                  <input value={active.keyword} onChange={e => updateRow(active.id, "keyword", e.target.value)} style={editorInput} />
                </AdminField>
                <AdminField label="카테고리">
                  <select value={active.category} onChange={e => updateRow(active.id, "category", e.target.value)} style={editorInput}>
                    {CATEGORIES.filter(c => c !== "전체").map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </AdminField>
              </div>
              <AdminField label="제목">
                <input value={active.title} onChange={e => updateRow(active.id, "title", e.target.value)} style={editorInput} />
              </AdminField>
              <AdminField label="훅 (3초 멘트)">
                <input value={active.hook || ""} onChange={e => updateRow(active.id, "hook", e.target.value)} style={editorInput} />
              </AdminField>
              <AdminField label="설명 초안">
                <textarea value={active.description} onChange={e => updateRow(active.id, "description", e.target.value)} rows={3} style={editorInput} />
              </AdminField>
              <AdminField label="왜 뜨고 있나">
                <textarea value={active.why || ""} onChange={e => updateRow(active.id, "why", e.target.value)} rows={2} style={editorInput} />
              </AdminField>
              <AdminField label="콘텐츠 각도">
                <textarea value={active.angle || ""} onChange={e => updateRow(active.id, "angle", e.target.value)} rows={2} style={editorInput} />
              </AdminField>
              <AdminField label="주의사항">
                <input value={active.caution || ""} onChange={e => updateRow(active.id, "caution", e.target.value)} style={editorInput} />
              </AdminField>
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                <button onClick={() => mark(active.id, "discarded")} style={secondaryButton}>폐기</button>
                <button onClick={() => mark(active.id, "registered")} style={primaryButton}>등록하고 보강 시작</button>
              </div>
            </Panel>
          )}
        </div>
      )}
    </AdminPage>
  );
}

function AdminReview() {
  const { CARDS, CANDIDATES, STAGES } = window.TR_DATA;
  const queue = CANDIDATES.map((candidate, i) => ({
    ...candidate,
    card: CARDS[i % CARDS.length],
    stageMeta: STAGES[candidate.stagePreview] || STAGES.mainstream,
  }));
  const [selected, setSelected] = useStateA(queue[0]?.id);
  const [published, setPublished] = useStateA(new Set());
  const active = queue.find(item => item.id === selected) || queue[0];

  const publish = () => {
    const next = new Set(published);
    next.add(active.id);
    setPublished(next);
  };

  return (
    <AdminPage eyebrow="검수" title="10초 확인 후 발행">
      <div style={reviewLayout}>
        <Panel title={`검수 큐 ${queue.length}건`}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {queue.map(item => (
              <button key={item.id} onClick={() => setSelected(item.id)} style={{
                ...listButton,
                borderColor: item.id === active?.id ? "var(--tr-fg)" : "var(--tr-line)",
              }}>
                <SourceThumb row={{ platform: item.discoverySource.platform, title: item.title }} />
                <div style={{ flex: 1, textAlign: "left", minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: "var(--tr-muted)", marginTop: 3 }}>{item.discoverySource.handle} · {item.registeredAt}</div>
                </div>
                {published.has(item.id) ? <StatusPill status="published" /> : <StageChip stageMeta={item.stageMeta} />}
              </button>
            ))}
          </div>
        </Panel>

        {active && (
          <Panel title="자동 보강 데이터">
            <div style={reviewHero}>
              <Cover cover={active.card.cover} height={180} />
              <div style={{ flex: 1, minWidth: 240 }}>
                <StageChip stageMeta={active.stageMeta} large />
                <h3 style={{ margin: "14px 0 8px", fontSize: 26, letterSpacing: "-0.04em" }}>{active.title}</h3>
                <p style={{ margin: 0, fontSize: 14, color: "var(--tr-muted)", lineHeight: 1.6 }}>{active.note}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
                  <MetricPill label="데이터랩" value={active.enrichmentStatus.datalab} />
                  <MetricPill label="네이버" value={active.enrichmentStatus.naver} />
                  <MetricPill label="유튜브" value={active.enrichmentStatus.youtube} />
                </div>
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <SectionLabel>데이터랩 14일 추이</SectionLabel>
              <MiniChart trend={active.stagePreview === "declining" ? "down" : "up"} />
            </div>

            <div style={twoColumnGrid}>
              <EvidenceList title="카페·블로그 인용문" items={active.card.enrichment.cafeBlog.map(v => `${v.source} · ${v.snippet}`)} />
              <EvidenceList title="유튜브 관련 영상" items={active.card.enrichment.youtube.map(v => `${v.title} · ${v.views}`)} />
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
              <button style={secondaryButton}>수정 필요</button>
              <button onClick={publish} style={primaryButton}>
                <IconCheck size={16} />발행 ON
              </button>
            </div>
          </Panel>
        )}
      </div>
    </AdminPage>
  );
}

function AdminInfluencers({ onUseAsSource }) {
  const { CATEGORIES, INFLUENCERS: SEED, STATS } = window.TR_DATA;
  const [added, setAdded] = useStateA([]);
  const INFLUENCERS = useMemoA(() => [...added, ...SEED], [added, SEED]);
  const [category, setCategory] = useStateA("전체");
  const [adding, setAdding] = useStateA(false);
  const visible = INFLUENCERS.filter(item => category === "전체" || item.category === category);
  const today = useMemoA(() => scoreInfluencers(INFLUENCERS).slice(0, 10), [INFLUENCERS]);
  const counts = CATEGORIES.map(cat => ({
    cat,
    count: cat === "전체" ? INFLUENCERS.length : INFLUENCERS.filter(i => i.category === cat).length,
  }));

  const addInfluencer = (data) => {
    const handle = data.handle.startsWith("@") ? data.handle : `@${data.handle}`;
    if (INFLUENCERS.some(i => i.handle === handle)) {
      alert("이미 등록된 핸들입니다.");
      return false;
    }
    setAdded([{
      handle,
      category: data.category,
      platform: data.platform,
      trust: data.trust,
      followers: data.followers || "—",
      lastChecked: "방금 추가",
      contributedThisWeek: 0,
      contributedAllTime: 0,
      enabled: true,
      note: data.note || "신규 추가",
    }, ...added]);
    setAdding(false);
    return true;
  };

  return (
    <AdminPage
      eyebrow="인플루언서"
      title="오늘 둘러볼 10명"
      aside={
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Panel title="카테고리">
            <div style={{ display: "grid", gap: 6 }}>
              {counts.map(item => (
                <button key={item.cat} onClick={() => setCategory(item.cat)} style={{
                  ...categoryButton,
                  background: category === item.cat ? "var(--tr-fg)" : "var(--tr-bg)",
                  color: category === item.cat ? "var(--tr-bg)" : "var(--tr-fg)",
                }}>
                  <span>{item.cat}</span>
                  <span>{item.count}</span>
                </button>
              ))}
            </div>
          </Panel>
          <Panel title="이번 주 발견 기여도">
            <div style={{ display: "grid", gap: 8 }}>
              {STATS.weekTopInfluencers.map((item, i) => (
                <div key={item.handle} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={rankBadge}>{i + 1}</span>
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 700 }}>{item.handle}</span>
                  <span style={{ fontSize: 12, color: "var(--tr-muted)" }}>{item.contributedThisWeek}건</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      }
    >
      <Panel title="아침 8시 자동 큐레이션">
        <div style={{ display: "grid", gap: 8 }}>
          {today.map(item => (
            <InfluencerRow key={item.handle} item={item} curated onUseAsSource={onUseAsSource} />
          ))}
        </div>
      </Panel>

      <Panel
        title={`전체 인플루언서 ${visible.length}명`}
        action={
          !adding && (
            <button onClick={() => setAdding(true)} style={primaryButton}>
              <IconSparkle size={14} />+ 인플루언서 추가
            </button>
          )
        }
      >
        {adding && (
          <AddInfluencerForm
            categories={CATEGORIES.filter(c => c !== "전체")}
            onCancel={() => setAdding(false)}
            onSubmit={addInfluencer}
          />
        )}
        <div style={{ display: "grid", gap: 8 }}>
          {visible.map(item => (
            <InfluencerRow key={item.handle} item={item} onUseAsSource={onUseAsSource} />
          ))}
        </div>
      </Panel>
    </AdminPage>
  );
}

function AddInfluencerForm({ categories, onCancel, onSubmit }) {
  const [handle, setHandle] = useStateA("");
  const [platform, setPlatform] = useStateA("instagram");
  const [category, setCategory] = useStateA(categories[0]);
  const [trust, setTrust] = useStateA(3);
  const [followers, setFollowers] = useStateA("");
  const [note, setNote] = useStateA("");

  const submit = () => {
    if (!handle.trim()) { alert("핸들을 입력하세요."); return; }
    onSubmit({ handle: handle.trim(), platform, category, trust, followers: followers.trim(), note: note.trim() });
  };

  return (
    <div style={{
      padding: 16, borderRadius: 10, background: "var(--tr-bg)",
      border: "1px solid var(--tr-line)", marginBottom: 12,
    }}>
      <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12 }}>새 인플루언서 추가</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <AdminField label="핸들 (@food_seoul 같은 형식)">
          <input value={handle} onChange={e => setHandle(e.target.value)} placeholder="@handle" style={editorInput} />
        </AdminField>
        <AdminField label="플랫폼">
          <select value={platform} onChange={e => setPlatform(e.target.value)} style={editorInput}>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
          </select>
        </AdminField>
        <AdminField label="카테고리">
          <select value={category} onChange={e => setCategory(e.target.value)} style={editorInput}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </AdminField>
        <AdminField label="신뢰도 (1~5)">
          <div style={{ display: "flex", gap: 6 }}>
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} onClick={() => setTrust(n)} style={{
                flex: 1, padding: "9px 0", borderRadius: 6, cursor: "pointer",
                border: `1px solid ${trust === n ? "var(--tr-fg)" : "var(--tr-line)"}`,
                background: trust === n ? "var(--tr-fg)" : "var(--tr-bg)",
                color: trust === n ? "var(--tr-bg)" : "var(--tr-fg)",
                fontSize: 13, fontWeight: 800,
              }}>{n}</button>
            ))}
          </div>
        </AdminField>
        <AdminField label="팔로워 (선택)">
          <input value={followers} onChange={e => setFollowers(e.target.value)} placeholder="150K" style={editorInput} />
        </AdminField>
        <AdminField label="메모 (선택)">
          <input value={note} onChange={e => setNote(e.target.value)} placeholder="발견 경위 등" style={editorInput} />
        </AdminField>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 14, justifyContent: "flex-end" }}>
        <button onClick={onCancel} style={secondaryButton}>취소</button>
        <button onClick={submit} style={primaryButton}>추가</button>
      </div>
    </div>
  );
}

function hoursSinceCheck(s) {
  if (!s || s === "—") return 48;
  if (String(s).includes("방금")) return 24;
  const m = String(s).match(/(\d+)\s*(분|시간|일)/);
  if (!m) return 24;
  const n = parseInt(m[1], 10);
  const unit = m[2];
  if (unit === "분") return n / 60;
  if (unit === "시간") return n;
  if (unit === "일") return n * 24;
  return 24;
}

function scoreInfluencers(list) {
  // 1차: 품질(trust) + 기여도 + 신선도 + 신규 가산점
  const withBase = list.filter(item => item.enabled).map(item => {
    const hours = hoursSinceCheck(item.lastChecked);
    const freshness = Math.min(hours / 24, 1.5);
    const isNew = (item.contributedAllTime || 0) === 0;
    return {
      ...item,
      _hoursSinceCheck: hours,
      _isNew: isNew,
      _baseScore:
        item.trust * 0.4 +
        item.contributedThisWeek * 0.3 +
        freshness * 0.2 +
        (isNew ? 1.2 : 0),
    };
  });

  // 2차: 카테고리 균형 페널티 — 같은 카테고리 두 번째부터 점수 차감
  const sorted = [...withBase].sort((a, b) => b._baseScore - a._baseScore);
  const seen = {};
  return sorted.map(item => {
    seen[item.category] = (seen[item.category] || 0) + 1;
    const penalty = Math.max(0, seen[item.category] - 1) * 0.15;
    return { ...item, boardScore: item._baseScore - penalty };
  }).sort((a, b) => b.boardScore - a.boardScore);
}

function InfluencerRow({ item, curated, onUseAsSource }) {
  return (
    <div style={{
      padding: "13px 14px", borderRadius: 8, background: "var(--tr-card-2)",
      border: curated ? "1px solid var(--tr-line)" : "1px solid transparent",
      display: "flex", alignItems: "center", gap: 12,
      opacity: item.enabled ? 1 : 0.45,
    }}>
      <PlatformMark platform={item.platform} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.015em" }}>{item.handle}</span>
          <span style={smallPill}>{item.category}</span>
        </div>
        <div style={{ fontSize: 12, color: "var(--tr-muted)", marginTop: 4 }}>
          팔로워 {item.followers} · 마지막 {item.lastChecked} · 이번 주 {item.contributedThisWeek}건
        </div>
      </div>
      <button style={secondarySmallButton}>열기</button>
      <button style={primarySmallButton} onClick={() => onUseAsSource && onUseAsSource(item.handle)}>등록 출처로 사용</button>
    </div>
  );
}

function AdminPage({ eyebrow, title, children, aside }) {
  return (
    <div style={{ padding: "28px 22px 80px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 12, color: "var(--tr-muted)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {eyebrow}
          </div>
          <h1 style={{ margin: "6px 0 0", fontSize: 32, fontWeight: 800, letterSpacing: "-0.045em" }}>
            {title}
          </h1>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: aside ? "minmax(0, 1fr) 320px" : "1fr",
          gap: 18,
          alignItems: "start",
        }}>
          <main style={{ display: "flex", flexDirection: "column", gap: 18 }}>{children}</main>
          {aside && <aside style={{ position: "sticky", top: 126 }}>{aside}</aside>}
        </div>
      </div>
    </div>
  );
}

function Panel({ title, action, children }) {
  return (
    <section style={{
      background: "var(--tr-card-2)", border: "1px solid var(--tr-line)", borderRadius: 8,
      padding: 18,
    }}>
      {(title || action) && (
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          gap: 10, margin: "0 0 14px",
        }}>
          {title && <h2 style={{ margin: 0, fontSize: 15, fontWeight: 800, letterSpacing: "-0.02em" }}>{title}</h2>}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

function WorkflowPanel({ title, value, max, action, onClick }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <Panel>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800 }}>{title}</div>
          <div style={{ marginTop: 6, fontSize: 24, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif" }}>
            {value}<span style={{ color: "var(--tr-muted)", fontSize: 16 }}>/{max}</span>
          </div>
        </div>
        <button onClick={onClick} style={secondarySmallButton}>{action}</button>
      </div>
      <ProgressBar value={pct} />
    </Panel>
  );
}

function ProgressBar({ value, color = "var(--tr-fg)" }) {
  return (
    <div style={{ marginTop: 14, height: 8, borderRadius: 100, background: "var(--tr-bg)", overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 100 }} />
    </div>
  );
}

function StatTile({ big, label, accent }) {
  return (
    <div style={{
      padding: "18px 16px", borderRadius: 8,
      background: accent ? "var(--tr-accent)" : "var(--tr-card-2)",
      color: accent ? "var(--tr-accent-fg)" : "var(--tr-fg)",
      border: accent ? "0" : "1px solid var(--tr-line)",
    }}>
      <div style={{
        fontSize: 30, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1,
        fontFamily: "'Space Grotesk', 'Pretendard', sans-serif",
      }}>{big}</div>
      <div style={{ fontSize: 12, marginTop: 9, fontWeight: 700, opacity: accent ? 0.72 : 0.62 }}>{label}</div>
    </div>
  );
}

function StageDistribution({ distribution }) {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {Object.entries(distribution).map(([stage, value]) => {
        const meta = window.TR_DATA.STAGES[stage];
        return (
          <div key={stage}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, fontWeight: 700 }}>
              <span>{meta?.label || STAGE_LABELS[stage]}</span>
              <span>{value}%</span>
            </div>
            <ProgressBar value={value} color={meta?.color || "var(--tr-fg)"} />
          </div>
        );
      })}
    </div>
  );
}

function SignalBars({ signals }) {
  const total = Object.values(signals).reduce((sum, n) => sum + n, 0) || 1;
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {Object.entries(signals).map(([key, value]) => (
        <div key={key}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 700 }}>
            <span>{key === "instagram" ? "Instagram" : "TikTok"}</span>
            <span>{value}건</span>
          </div>
          <ProgressBar value={(value / total) * 100} color={key === "instagram" ? "var(--tr-red)" : "var(--tr-blue)"} />
        </div>
      ))}
    </div>
  );
}

function ApiUsageTiles({ usage }) {
  const labels = { datalab: "데이터랩", naver: "네이버", youtube: "유튜브" };
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {Object.entries(usage).map(([key, item]) => (
        <div key={key}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, fontWeight: 700 }}>
            <span>{labels[key] || key}</span>
            <span>{item.used.toLocaleString()} / {item.limit.toLocaleString()}</span>
          </div>
          <ProgressBar value={(item.used / item.limit) * 100} />
        </div>
      ))}
    </div>
  );
}

function WeeklyChart({ data }) {
  const max = Math.max(...data);
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 110 }}>
        {data.map((value, i) => (
          <div key={days[i]} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "flex-end" }}>
              <div style={{
                width: "100%", height: `${(value / max) * 100}%`, minHeight: 5,
                borderRadius: 4, background: i === data.length - 1 ? "var(--tr-fg)" : "var(--tr-line)",
              }} />
            </div>
            <div style={{ fontSize: 11, color: "var(--tr-muted)", textAlign: "center" }}>
              <div>{days[i]}</div>
              <strong style={{ color: "var(--tr-fg)" }}>{value}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniChart({ trend = "up" }) {
  const points = trend === "down"
    ? [92, 88, 82, 74, 69, 62, 54, 46, 41, 35, 31, 26, 22, 19]
    : [18, 22, 26, 31, 35, 42, 50, 56, 63, 70, 77, 83, 91, 100];
  const width = 280;
  const height = 64;
  const step = width / (points.length - 1);
  const max = Math.max(...points);
  const min = Math.min(...points);
  const path = points.map((point, index) => {
    const x = index * step;
    const y = height - ((point - min) / (max - min || 1)) * (height - 8) - 4;
    return `${index === 0 ? "M" : "L"}${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ width: "100%", height: 64, display: "block", marginTop: 10 }}>
      <path d={`${path} L${width},${height} L0,${height} Z`} fill="rgba(0,0,0,0.06)" />
      <path d={path} fill="none" stroke="var(--tr-fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SourcePreview({ row }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "92px 1fr", gap: 14,
      padding: 12, borderRadius: 8, background: "var(--tr-bg)", marginBottom: 14,
      border: "1px solid var(--tr-line)",
    }}>
      <SourceThumb row={row} large />
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 800 }}>{row.handle}</span>
          <span style={{ fontSize: 11, color: "var(--tr-muted)" }}>· {row.platform === "tiktok" ? "TikTok" : "Instagram"}</span>
        </div>
        {row.caption && (
          <div style={{
            fontSize: 12.5, color: "var(--tr-fg)", marginTop: 8, lineHeight: 1.55,
            display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {row.caption}
          </div>
        )}
        <div style={{
          fontSize: 10.5, color: "var(--tr-muted)", marginTop: 8,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          oEmbed 추출 · {row.url}
        </div>
      </div>
    </div>
  );
}

function AnalysisMeta({ row }) {
  const stageMeta = window.TR_DATA.STAGES?.[row.stagePreview];
  const pct = Math.round((row.confidence || 0) * 100);
  return (
    <div style={{
      display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap",
      padding: "10px 12px", borderRadius: 8,
      background: "var(--tr-bg)", border: "1px solid var(--tr-line)",
      marginBottom: 14,
    }}>
      {stageMeta && (
        <span style={{
          padding: "4px 10px", borderRadius: 100, fontSize: 11, fontWeight: 800,
          color: stageMeta.color, background: stageMeta.bg,
          border: `1px solid ${stageMeta.color}`,
        }}>
          잠정 단계 · {stageMeta.short}
        </span>
      )}
      <span style={{
        padding: "4px 10px", borderRadius: 100, fontSize: 11, fontWeight: 700,
        color: pct >= 80 ? "var(--tr-green)" : pct >= 65 ? "var(--tr-yellow)" : "var(--tr-muted)",
        background: "var(--tr-card-2)",
      }}>
        신뢰도 {pct}%
      </span>
      {row.categoryReason && (
        <div style={{ flex: 1, minWidth: 200, fontSize: 11.5, color: "var(--tr-muted)", lineHeight: 1.5 }}>
          {row.categoryReason}
        </div>
      )}
    </div>
  );
}

function SourceThumb({ row, large }) {
  const isTikTok = row.platform === "tiktok";
  return (
    <div style={{
      width: large ? 92 : 46, height: large ? 92 : 46, borderRadius: 8,
      background: isTikTok ? "linear-gradient(135deg,#111,#3182F6)" : "linear-gradient(135deg,#FF3B30,#FFB300)",
      color: "#fff", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: large ? 18 : 11, fontWeight: 900, letterSpacing: "0.02em",
    }}>
      {isTikTok ? "TT" : "IG"}
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    ready: ["분석됨", "var(--tr-blue)"],
    registered: ["등록됨", "var(--tr-green)"],
    discarded: ["폐기", "var(--tr-muted)"],
    published: ["발행", "var(--tr-green)"],
  };
  const [label, color] = map[status] || [status, "var(--tr-muted)"];
  return <span style={{ ...smallPill, color, borderColor: color }}>{label}</span>;
}

function StageChip({ stageMeta, large }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      padding: large ? "7px 11px" : "4px 8px", borderRadius: 100,
      fontSize: large ? 13 : 11, fontWeight: 800,
      background: stageMeta.bg, color: stageMeta.color,
      border: `1px solid ${stageMeta.color}`,
      whiteSpace: "nowrap",
    }}>
      {stageMeta.short}
    </span>
  );
}

function MetricPill({ label, value }) {
  return (
    <span style={{
      display: "inline-flex", gap: 6, alignItems: "center",
      padding: "6px 9px", borderRadius: 100,
      background: "var(--tr-card-2)", border: "1px solid var(--tr-line)",
      fontSize: 12, fontWeight: 700,
    }}>
      <span style={{ color: "var(--tr-muted)" }}>{label}</span>
      {value}
    </span>
  );
}

function EvidenceList({ title, items }) {
  return (
    <div style={{ marginTop: 18 }}>
      <SectionLabel>{title}</SectionLabel>
      <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
        {items.map((item, i) => (
          <div key={i} style={{ padding: "11px 12px", borderRadius: 8, background: "var(--tr-bg)", fontSize: 13, lineHeight: 1.45 }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function PlatformMark({ platform }) {
  return (
    <div style={{
      width: 38, height: 38, borderRadius: 8,
      background: platform === "tiktok" ? "#111" : "var(--tr-red)",
      color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 11, fontWeight: 900,
    }}>
      {platform === "tiktok" ? "TT" : "IG"}
    </div>
  );
}

function AdminField({ label, children }) {
  return (
    <label style={{ display: "block", marginTop: 12 }}>
      <FieldLabel>{label}</FieldLabel>
      {children}
    </label>
  );
}

function FieldLabel({ children }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 800, letterSpacing: "0.06em",
      textTransform: "uppercase", color: "var(--tr-muted)", marginBottom: 6,
    }}>{children}</div>
  );
}

function ActionButton({ label, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "11px 12px", borderRadius: 8, border: "1px solid var(--tr-line)",
      background: "var(--tr-bg)", color: "var(--tr-fg)", cursor: "pointer",
      fontSize: 13, fontWeight: 800, textAlign: "left",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      {label}<IconChevronRight size={15} />
    </button>
  );
}

const sectionGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 12,
};

const twoColumnGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 18,
};

const reviewLayout = {
  display: "grid",
  gridTemplateColumns: "minmax(280px, 360px) minmax(0, 1fr)",
  gap: 18,
  alignItems: "start",
};

const reviewHero = {
  display: "grid",
  gridTemplateColumns: "260px minmax(0, 1fr)",
  gap: 18,
  alignItems: "center",
};

const editorInput = {
  width: "100%", padding: "12px 13px",
  border: "1px solid var(--tr-line)", borderRadius: 8,
  background: "var(--tr-bg)", color: "var(--tr-fg)", outline: "none",
  fontSize: 14, fontFamily: "inherit", lineHeight: 1.5, resize: "vertical",
  letterSpacing: "-0.01em", boxSizing: "border-box",
};

const primaryButton = {
  padding: "12px 15px", border: 0, borderRadius: 8,
  background: "var(--tr-fg)", color: "var(--tr-bg)", cursor: "pointer",
  fontSize: 13.5, fontWeight: 800, letterSpacing: "-0.01em",
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7,
  whiteSpace: "nowrap",
};

const secondaryButton = {
  flex: 1, padding: "12px 15px", border: "1px solid var(--tr-line)", borderRadius: 8,
  background: "transparent", color: "var(--tr-fg)", cursor: "pointer",
  fontSize: 13.5, fontWeight: 800,
};

const primarySmallButton = {
  padding: "8px 10px", border: 0, borderRadius: 7,
  background: "var(--tr-fg)", color: "var(--tr-bg)", cursor: "pointer",
  fontSize: 12, fontWeight: 800, whiteSpace: "nowrap",
};

const secondarySmallButton = {
  padding: "8px 10px", border: "1px solid var(--tr-line)", borderRadius: 7,
  background: "var(--tr-bg)", color: "var(--tr-fg)", cursor: "pointer",
  fontSize: 12, fontWeight: 800, whiteSpace: "nowrap",
};

const iconButtonDark = {
  width: 34, height: 34, border: 0, borderRadius: 100, cursor: "pointer",
  background: "rgba(255,255,255,0.1)", color: "var(--tr-bg)",
  display: "flex", alignItems: "center", justifyContent: "center",
};

const listButton = {
  width: "100%", padding: 12, border: "1px solid var(--tr-line)", borderRadius: 8,
  background: "var(--tr-card-2)", color: "var(--tr-fg)", cursor: "pointer",
  display: "flex", alignItems: "center", gap: 12,
};

const categoryButton = {
  padding: "9px 11px", border: "1px solid var(--tr-line)", borderRadius: 7,
  cursor: "pointer", fontSize: 13, fontWeight: 800,
  display: "flex", justifyContent: "space-between",
};

const rankBadge = {
  width: 24, height: 24, borderRadius: 100,
  background: "var(--tr-bg)", color: "var(--tr-fg)",
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  fontSize: 12, fontWeight: 900, fontFamily: "'Space Grotesk', sans-serif",
};

const smallPill = {
  display: "inline-flex", alignItems: "center",
  padding: "3px 7px", borderRadius: 100,
  border: "1px solid var(--tr-line)",
  color: "var(--tr-muted)",
  fontSize: 11, fontWeight: 800,
  whiteSpace: "nowrap",
};

// Compatibility aliases for older callers.
const AdminCandidates = AdminQuickAdd;
const AdminCards = AdminReview;
const AdminAccounts = AdminInfluencers;
function PublishBar() { return null; }

Object.assign(window, {
  AdminTopBar, AdminDashboard, AdminQuickAdd, AdminReview, AdminInfluencers,
  AdminCandidates, AdminCards, AdminAccounts, PublishBar,
});
