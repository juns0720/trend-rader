// admin.jsx — 관리자 중심 수집/검수 화면

const { useMemo: useMemoA, useState: useStateA } = React;

const ADMIN_TABS = [
  { k: "dash", label: "대시보드", group: "General", Icon: IconChart },
  { k: "inbox", label: "수집 큐", group: "Workflow", Icon: IconLayers },
  { k: "review", label: "후보 검수", group: "Workflow", Icon: IconCheck },
  { k: "sources", label: "소스", group: "Workflow", Icon: IconAt },
];

const ADMIN_ACCENT = "#4353FF";
const ADMIN_ACCENT_SOFT = "#EEF0FF";
const ADMIN_SURFACE = "#FFFFFF";
const ADMIN_APP_BG = "#F5F7FB";
const ADMIN_TEXT = "#111827";
const ADMIN_MUTED = "#6B7280";
const ADMIN_LINE = "#E7EAF1";

const PLATFORM_LABELS = {
  x: "X",
  youtube: "유튜브",
  manual_url: "수동 등록",
  instagram: "인스타그램",
  tiktok: "틱톡",
};

const RAW_STATUS = {
  raw: { label: "수집 대기", tone: "#3182F6" },
  analyzed: { label: "키워드 확인", tone: "#8B5CF6" },
  linked: { label: "후보 연결", tone: "var(--tr-green)" },
  ignored: { label: "제외", tone: "var(--tr-muted)" },
  duplicate: { label: "중복", tone: "var(--tr-yellow)" },
};

const CLUSTER_STATUS = {
  new: { label: "신규", tone: "#3182F6" },
  watching: { label: "관찰 중", tone: "var(--tr-yellow)" },
  ready_for_draft: { label: "초안 생성", tone: "var(--tr-green)" },
  draft_requested: { label: "초안 요청", tone: "#8B5CF6" },
  rejected: { label: "제외", tone: "var(--tr-red)" },
  merged: { label: "병합됨", tone: "var(--tr-muted)" },
};

const DRAFT_STATUS = {
  draft: { label: "검수 대기", tone: "#3182F6" },
  needs_revision: { label: "수정 요청", tone: "var(--tr-yellow)" },
  approved: { label: "승인", tone: "var(--tr-green)" },
  held: { label: "보류", tone: "var(--tr-muted)" },
  discarded: { label: "폐기", tone: "var(--tr-red)" },
};

const GRADE_COPY = {
  A: "초반 유행을 빠르게 잡는 계정",
  B: "이미 뜬 유행을 잘 정리하는 계정",
  C: "참고 가능하지만 노이즈 확인 필요",
  D: "노이즈가 많아 제외 후보",
};

function AdminShell({ tab, onTab, onExit, searchQuery, onSearchChange, children }) {
  const active = ADMIN_TABS.find(item => item.k === tab) || ADMIN_TABS[0];
  const general = ADMIN_TABS.filter(item => item.group === "General");
  const workflow = ADMIN_TABS.filter(item => item.group === "Workflow");
  return (
    <div className="tr-admin-shell" style={{
      "--tr-bg": ADMIN_APP_BG,
      "--tr-fg": ADMIN_TEXT,
      "--tr-card-2": ADMIN_SURFACE,
      "--tr-muted": ADMIN_MUTED,
      "--tr-line": ADMIN_LINE,
      "--tr-accent": ADMIN_ACCENT,
      "--admin-accent": ADMIN_ACCENT,
      "--admin-accent-soft": ADMIN_ACCENT_SOFT,
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "254px minmax(0, 1fr)",
      background: ADMIN_APP_BG,
      color: ADMIN_TEXT,
      fontFamily: "var(--tr-font)",
    }}>
      <aside className="tr-admin-sidebar" style={{
        minHeight: "100vh",
        background: ADMIN_SURFACE,
        borderRight: `1px solid ${ADMIN_LINE}`,
        padding: "24px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 22,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 6px" }}>
          <span style={{
            width: 32,
            height: 32,
            borderRadius: 9,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: ADMIN_ACCENT,
            color: "#fff",
            fontWeight: 950,
            fontSize: 15,
          }}>T</span>
          <div className="tr-admin-sidebar-copy">
            <div style={{ fontSize: 15, fontWeight: 950, letterSpacing: "-0.035em" }}>Trend Radar</div>
            <div style={{ fontSize: 11.5, color: ADMIN_MUTED, marginTop: 2, fontWeight: 700 }}>Admin Console</div>
          </div>
        </div>

        <nav style={{ display: "grid", gap: 24 }}>
          <AdminSidebarGroup title="General" items={general} tab={tab} onTab={onTab} />
          <AdminSidebarGroup title="Workflow" items={workflow} tab={tab} onTab={onTab} />
        </nav>

        <div style={{ marginTop: "auto", display: "grid", gap: 14 }}>
          <div className="tr-admin-status-card" style={{
            padding: 14,
            borderRadius: 14,
            background: ADMIN_ACCENT_SOFT,
            color: ADMIN_TEXT,
            border: "1px solid #DDE2FF",
          }}>
            <div style={{ fontSize: 11, fontWeight: 900, color: ADMIN_ACCENT, letterSpacing: "0.08em" }}>STATUS</div>
            <div style={{ marginTop: 8, fontSize: 13, fontWeight: 900 }}>승인 전 비공개</div>
            <div style={{ marginTop: 4, fontSize: 12, color: ADMIN_MUTED, lineHeight: 1.45 }}>자동 발행 없음</div>
          </div>
          <button onClick={onExit} style={{
            border: `1px solid ${ADMIN_LINE}`,
            background: ADMIN_SURFACE,
            color: ADMIN_TEXT,
            borderRadius: 12,
            padding: "11px 12px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 13,
            fontWeight: 850,
          }}>
            <span className="tr-admin-return-text">사용자 화면</span>
            <IconChevronRight size={15} />
          </button>
        </div>
      </aside>

      <section style={{ minWidth: 0, display: "flex", flexDirection: "column" }}>
        <header className="tr-admin-header" style={{
          height: 88,
          background: ADMIN_SURFACE,
          borderBottom: `1px solid ${ADMIN_LINE}`,
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: "0 36px",
        }}>
          <div className="tr-admin-header-title" style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, color: ADMIN_MUTED, fontWeight: 800 }}>관리자</div>
            <h1 style={{ margin: "4px 0 0", fontSize: 22, letterSpacing: "-0.04em", fontWeight: 950 }}>
              {active.label}
            </h1>
          </div>
          <label className="tr-admin-search" style={{
            width: 360,
            maxWidth: "36vw",
            display: "flex",
            alignItems: "center",
            gap: 10,
            border: `1px solid ${ADMIN_LINE}`,
            background: "#FAFBFD",
            borderRadius: 12,
            padding: "10px 12px",
            color: ADMIN_MUTED,
          }}>
            <IconSearch size={17} />
            <input
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="검색"
              style={{
                flex: 1,
                minWidth: 0,
                border: 0,
                outline: "none",
                background: "transparent",
                color: ADMIN_TEXT,
                font: "inherit",
                fontSize: 13,
                fontWeight: 700,
              }}
            />
          </label>
          <div style={{ width: 1, height: 34, background: ADMIN_LINE }} />
          <div className="tr-admin-profile" style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "7px 9px 7px 7px",
            borderRadius: 100,
            background: "#FAFBFD",
            border: `1px solid ${ADMIN_LINE}`,
          }}>
            <div style={{
              width: 34,
              height: 34,
              borderRadius: 100,
              background: "linear-gradient(135deg, #222, #6B7280)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 900,
            }}>OP</div>
            <div style={{ fontSize: 12.5, fontWeight: 900 }}>Operator</div>
            <IconChevronDown size={14} stroke={ADMIN_MUTED} />
          </div>
        </header>

        <div style={{ flex: 1, minWidth: 0 }}>
          {children}
        </div>
      </section>
    </div>
  );
}

function AdminSidebarGroup({ title, items, tab, onTab }) {
  return (
    <div>
      <div className="tr-admin-sidebar-section-title" style={{
        padding: "0 10px",
        marginBottom: 9,
        fontSize: 11.5,
        color: ADMIN_MUTED,
        fontWeight: 850,
      }}>{title}</div>
      <div style={{ display: "grid", gap: 5 }}>
        {items.map(item => (
          <AdminSidebarItem key={item.k} item={item} active={tab === item.k} onClick={() => onTab(item.k)} />
        ))}
      </div>
    </div>
  );
}

function AdminSidebarItem({ item, active, onClick }) {
  const Icon = item.Icon || IconLayers;
  return (
    <button aria-label={item.label} title={item.label} onClick={onClick} style={{
      width: "100%",
      border: 0,
      borderRadius: 10,
      padding: "11px 10px",
      background: active ? ADMIN_ACCENT_SOFT : "transparent",
      color: active ? ADMIN_ACCENT : ADMIN_TEXT,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13.5,
      fontWeight: active ? 900 : 750,
      textAlign: "left",
    }}>
      <Icon size={18} sw={active ? 2 : 1.7} />
      <span className="tr-admin-sidebar-item-label">{item.label}</span>
    </button>
  );
}

function AdminTopBar({ tab, onTab, onExit }) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 30,
      background: "var(--tr-bg)", color: "var(--tr-fg)",
      padding: "14px 28px 0",
      borderBottom: "1px solid var(--tr-line)",
    }}>
      <div style={{
        maxWidth: 1480, margin: "0 auto",
        display: "flex", alignItems: "center", padding: "0 0 12px", gap: 14,
      }}>
        <button aria-label="사용자 화면으로 돌아가기" onClick={onExit} style={iconButtonDark}>
          <IconBack size={18} />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 11, opacity: 0.56, letterSpacing: "0.08em",
            fontWeight: 850,
          }}>
            운영자 콘솔
          </div>
          <div style={{ fontSize: 18, fontWeight: 950, letterSpacing: "-0.04em", marginTop: 2 }}>
            트렌드 레이더 운영
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, fontWeight: 800, opacity: 0.74 }}>
          <span style={{ width: 7, height: 7, borderRadius: 100, background: "var(--tr-green)" }} />
          승인 전 비공개
        </div>
      </div>
      <div style={{ maxWidth: 1480, margin: "0 auto", display: "flex", gap: 6, overflowX: "auto" }} className="tr-no-scrollbar">
        {ADMIN_TABS.map(item => (
          <button key={item.k} onClick={() => onTab(item.k)} style={{
            padding: "12px 16px", border: 0, background: "transparent", cursor: "pointer",
            color: tab === item.k ? "var(--tr-fg)" : "var(--tr-muted)",
            fontSize: 14, fontWeight: tab === item.k ? 800 : 650, letterSpacing: "-0.01em",
            position: "relative", whiteSpace: "nowrap",
          }}>
            {item.label}
            {tab === item.k && <div style={{
              position: "absolute", bottom: 0, left: 10, right: 10, height: 2,
              background: "var(--tr-fg)", borderRadius: 100,
            }} />}
          </button>
        ))}
      </div>
    </div>
  );
}

function AdminDashboard({ onTab }) {
  const { PIPELINE_STATS: s, RAW_POSTS, KEYWORD_CLUSTERS, CARD_DRAFTS, SOURCE_ACCOUNTS } = window.TR_DATA;
  const pendingPosts = RAW_POSTS.filter(post => post.status === "raw" || post.status === "analyzed");
  const draftReady = KEYWORD_CLUSTERS.filter(cluster => cluster.status === "ready_for_draft");
  const draftQueue = CARD_DRAFTS.filter(draft => draft.status === "draft" || draft.status === "needs_revision");
  const priorityPosts = [...pendingPosts, ...RAW_POSTS.filter(post => post.status === "linked")].slice(0, 5);
  const priorityClusters = [...draftReady, ...KEYWORD_CLUSTERS.filter(cluster => cluster.status === "new" || cluster.status === "watching")].slice(0, 5);
  return (
    <AdminPage
      eyebrow="운영 현황"
      title="처리 병목"
      aside={<DashboardAside onTab={onTab} />}
    >
      <div style={sectionGrid}>
        <AdminMetricCard title="수집 대기" value={pendingPosts.length} meta="raw / analyzed" icon={<IconLayers size={20} />} onClick={() => onTab("inbox")} />
        <AdminMetricCard title="후보화 대기" value={draftReady.length} meta="ready_for_draft" icon={<IconRadar size={20} />} onClick={() => onTab("review")} />
        <AdminMetricCard title="초안 검수" value={draftQueue.length} meta="draft queue" icon={<IconEdit size={20} />} onClick={() => onTab("review")} />
        <AdminMetricCard title="제외/중복" value={s.noiseOrDuplicate} meta="ignored / duplicate" icon={<IconTrash size={20} />} />
      </div>

      <div className="tr-admin-dashboard-grid" style={dashboardGrid}>
        <Panel title="파이프라인 상태">
          <AdminBarList
            items={[
              { label: "수집 대기", value: s.rawPostStatus.raw, color: ADMIN_ACCENT },
              { label: "키워드 확인", value: s.rawPostStatus.analyzed, color: "#7C8BFF" },
              { label: "후보 연결", value: s.rawPostStatus.linked, color: "#12B76A" },
              { label: "제외/중복", value: s.noiseOrDuplicate, color: "#F04438" },
            ]}
          />
        </Panel>
        <Panel title="수집 경로">
          <AdminBarList
            items={[
              { label: "X", value: s.platformsToday.x, color: ADMIN_ACCENT },
              { label: "유튜브", value: s.platformsToday.youtube, color: "#56B6F7" },
              { label: "수동 등록", value: s.platformsToday.manual_url, color: "#9B7CFF" },
            ]}
          />
        </Panel>
        <Panel title="소스 등급">
          <AdminDonutChart
            total={SOURCE_ACCOUNTS.length}
            items={[
              { label: "A", value: s.gradeMix.A, color: ADMIN_ACCENT },
              { label: "B", value: s.gradeMix.B, color: "#56B6F7" },
              { label: "C", value: s.gradeMix.C, color: "#F6C85F" },
              { label: "D", value: s.gradeMix.D, color: "#F04438" },
            ]}
          />
        </Panel>
      </div>

      <div style={twoColumnGrid}>
        <Panel title="우선 처리 수집 항목" action={<button onClick={() => onTab("inbox")} style={secondarySmallButton}>수집 큐</button>}>
          <div style={{ display: "grid", gap: 8 }}>
            {priorityPosts.map(post => (
              <PriorityPostRow key={post.id} post={post} source={getSource(post.sourceAccountId)} />
            ))}
          </div>
        </Panel>
        <Panel title="초안 생성 대상 후보" action={<button onClick={() => onTab("review")} style={secondarySmallButton}>후보 검수</button>}>
          <div style={{ display: "grid", gap: 8 }}>
            {priorityClusters.map(cluster => (
              <PriorityClusterRow key={cluster.id} cluster={cluster} />
            ))}
          </div>
        </Panel>
      </div>
    </AdminPage>
  );
}

function DashboardAside({ onTab }) {
  const { SOURCE_ACCOUNTS, PIPELINE_STATS } = window.TR_DATA;
  const topSources = SOURCE_ACCOUNTS
    .filter(s => s.active)
    .sort((a, b) => gradeRank(a.grade) - gradeRank(b.grade))
    .slice(0, 5);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Panel title="점검 대상 소스">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {topSources.map((item, i) => (
            <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={rankBadge}>{i + 1}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.handle}</div>
                <div style={{ fontSize: 11, color: "var(--tr-muted)", marginTop: 2 }}>{item.category} · {item.lastCheckedAt}</div>
              </div>
              <GradeChip grade={item.grade} />
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="소스 등급 분포">
        <StatusDistribution
          items={[
            { label: "A", value: PIPELINE_STATS.gradeMix.A, color: "var(--tr-green)" },
            { label: "B", value: PIPELINE_STATS.gradeMix.B, color: "#3182F6" },
            { label: "C", value: PIPELINE_STATS.gradeMix.C, color: "var(--tr-yellow)" },
            { label: "D", value: PIPELINE_STATS.gradeMix.D, color: "var(--tr-red)" },
          ]}
        />
      </Panel>
      <Panel title="바로가기">
        <div style={{ display: "grid", gap: 8 }}>
          <ActionButton label="수집 큐" onClick={() => onTab("inbox")} />
          <ActionButton label="후보 검수" onClick={() => onTab("review")} />
          <ActionButton label="소스" onClick={() => onTab("sources")} />
        </div>
      </Panel>
    </div>
  );
}

function AdminCollectionInbox({ sourceFocus, onClearSource, searchQuery = "" }) {
  const { RAW_POSTS, SOURCE_ACCOUNTS, KEYWORD_CLUSTERS } = window.TR_DATA;
  const [posts, setPosts] = useStateA(RAW_POSTS);
  const [selectedId, setSelectedId] = useStateA(() => {
    const focused = findFocusedPosts(RAW_POSTS, SOURCE_ACCOUNTS, sourceFocus)[0];
    return focused?.id || RAW_POSTS[0]?.id;
  });
  const [statusFilter, setStatusFilter] = useStateA("all");
  const [platformFilter, setPlatformFilter] = useStateA("all");
  const [manualUrl, setManualUrl] = useStateA("");

  const focusedPosts = sourceFocus ? findFocusedPosts(posts, SOURCE_ACCOUNTS, sourceFocus) : posts;
  const visible = focusedPosts.filter(post => {
    const source = getSource(post.sourceAccountId);
    return (
      (statusFilter === "all" || post.status === statusFilter) &&
      (platformFilter === "all" || post.platform === platformFilter) &&
      matchesSearch(searchQuery, [
        post.author,
        post.excerpt,
        post.url,
        ...(post.suggestedKeywords || []),
        source?.name,
        source?.handle,
      ])
    );
  });
  const active = visible.find(post => post.id === selectedId) || visible[0] || posts.find(post => post.id === selectedId) || posts[0];
  const source = getSource(active?.sourceAccountId);
  const linkedClusters = (active?.keywordClusterIds || []).map(getCluster).filter(Boolean);

  const updateStatus = (id, status) => {
    setPosts(prev => prev.map(post => post.id === id ? { ...post, status } : post));
  };
  const linkToCluster = (clusterId) => {
    if (!active) return;
    setPosts(prev => prev.map(post => post.id === active.id ? {
      ...post,
      status: "linked",
      keywordClusterIds: Array.from(new Set([...(post.keywordClusterIds || []), clusterId])),
    } : post));
  };
  const addManualPost = () => {
    const url = manualUrl.trim();
    if (!url) return;
    const next = {
      id: `raw-manual-${posts.length + 1}`,
      platform: "manual_url",
      sourceAccountId: "src-manual-url",
      url,
      author: "운영자 수동 등록",
      postedAt: "확인 필요",
      collectedAt: "방금",
      excerpt: "수동 URL 등록 항목. 원문 확인 후 짧은 발췌와 키워드 입력 필요.",
      metrics: { likes: 0, reposts: 0, comments: 0, views: 0 },
      hashtags: [],
      mentions: [],
      links: [url],
      suggestedKeywords: [],
      keywordClusterIds: [],
      status: "raw",
    };
    setPosts(prev => [next, ...prev]);
    setSelectedId(next.id);
    setManualUrl("");
  };

  return (
    <AdminPage
      eyebrow="수집 큐"
      title="수집 항목 처리"
      aside={<InboxAside posts={posts} clusters={KEYWORD_CLUSTERS} />}
    >
      {sourceFocus && (
        <FocusBanner
          label="선택한 소스"
          value={sourceFocus}
          onClear={onClearSource}
        />
      )}

      <Panel title="수동 URL 등록">
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            value={manualUrl}
            onChange={e => setManualUrl(e.target.value)}
            placeholder="인스타 릴스, 유튜브 쇼츠, 커뮤니티 글 URL"
            style={editorInput}
          />
          <button onClick={addManualPost} style={primaryButton}><IconPlus size={16} /> 큐 추가</button>
        </div>
      </Panel>

      <div className="tr-admin-queue-layout" style={queueLayout}>
        <Panel title={`수집 큐 ${visible.length}건`}>
          <Toolbar>
            <SelectControl value={statusFilter} onChange={setStatusFilter} options={[
              ["all", "모든 상태"],
              ["raw", "수집 대기"],
              ["analyzed", "키워드 확인"],
              ["linked", "후보 연결"],
              ["ignored", "제외"],
              ["duplicate", "중복"],
            ]} />
            <SelectControl value={platformFilter} onChange={setPlatformFilter} options={[
              ["all", "모든 플랫폼"],
              ["x", "X"],
              ["youtube", "유튜브"],
              ["manual_url", "수동 등록"],
            ]} />
          </Toolbar>
          <div className="tr-queue-table-wrap" style={tableWrap}>
            <table style={queueTableStyle}>
              <thead>
                <tr>
                  <th style={{ width: 238 }}>상태 / 출처</th>
                  <th style={{ width: 430 }}>짧은 내용</th>
                  <th style={{ width: 210 }}>추천 키워드</th>
                  <th style={{ width: 190 }}>반응</th>
                  <th style={{ width: 118 }}>수집</th>
                </tr>
              </thead>
              <tbody>
                {visible.map(post => {
                  const rowSource = getSource(post.sourceAccountId);
                  const selected = active?.id === post.id;
                  return (
                    <tr key={post.id} onClick={() => setSelectedId(post.id)} style={{
                      cursor: "pointer",
                      background: selected ? "var(--tr-card-2)" : "transparent",
                    }}>
                      <td style={queueSourceCell}>
                        <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                          <StatusPill status={post.status} map={RAW_STATUS} />
                          <PlatformChip platform={post.platform} />
                          <GradeChip grade={rowSource?.grade || "B"} />
                        </div>
                        <div style={{ marginTop: 8, fontWeight: 900 }}>{post.author}</div>
                      </td>
                      <td style={queueExcerptCell}>{post.excerpt}</td>
                      <td style={queueKeywordCell}>{post.suggestedKeywords?.slice(0, 3).join(", ") || "확인 필요"}</td>
                      <td style={queueNowrapCell}>{formatMetrics(post.metrics)}</td>
                      <td style={queueNowrapCell}>{post.collectedAt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="tr-queue-row-list" style={queueRowListStyle}>
            {visible.map(post => {
              const rowSource = getSource(post.sourceAccountId);
              return (
                <QueuePostRow
                  key={post.id}
                  post={post}
                  source={rowSource}
                  selected={active?.id === post.id}
                  onClick={() => setSelectedId(post.id)}
                />
              );
            })}
          </div>
        </Panel>

        {active && (
          <Panel title="상세 / 처리">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                  <StatusPill status={active.status} map={RAW_STATUS} />
                  <PlatformChip platform={active.platform} />
                  <GradeChip grade={source?.grade || "B"} />
                </div>
                <h3 style={panelTitle}>{active.author}</h3>
                <p style={panelBody}>{active.excerpt}</p>
              </div>
              <button onClick={() => window.open(active.url, "_blank")} style={secondarySmallButton}>
                <IconLink size={15} /> 원문
              </button>
            </div>

            <InfoGrid rows={[
              ["작성 시간", active.postedAt],
              ["수집 시간", active.collectedAt],
              ["출처 메모", source?.notes || "수동 확인 필요"],
              ["반응", formatMetrics(active.metrics)],
            ]} />

            <SectionLabelAdmin>추천 키워드</SectionLabelAdmin>
            <div style={chipRow}>
              {(active.suggestedKeywords?.length ? active.suggestedKeywords : ["확인 필요"]).map(k => (
                <span key={k} style={softChip}>{k}</span>
              ))}
            </div>

            <SectionLabelAdmin>연결된 후보</SectionLabelAdmin>
            {linkedClusters.length ? (
              <div style={{ display: "grid", gap: 8 }}>
                {linkedClusters.map(cluster => (
                  <ClusterMini key={cluster.id} cluster={cluster} />
                ))}
              </div>
            ) : (
              <EmptyState text="연결 후보 없음. 기존 후보 선택 또는 신규 후보 생성 필요." />
            )}

            <SectionLabelAdmin>기존 후보에 연결</SectionLabelAdmin>
            <div style={{ display: "grid", gap: 8 }}>
              {KEYWORD_CLUSTERS.map(cluster => (
                <button key={cluster.id} onClick={() => linkToCluster(cluster.id)} style={listButton}>
                  <div style={{ textAlign: "left", flex: 1 }}>
                    <div style={{ fontWeight: 850, fontSize: 14 }}>{cluster.canonicalKeyword}</div>
                    <div style={{ fontSize: 12, color: "var(--tr-muted)", marginTop: 3 }}>
                      근거 {cluster.rawPostIds.length}건 · {cluster.platforms.map(p => PLATFORM_LABELS[p] || p).join(", ")}
                    </div>
                  </div>
                  <IconPlus size={16} />
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 18 }}>
              <button onClick={() => updateStatus(active.id, "ignored")} style={secondaryButton}>제외</button>
              <button onClick={() => updateStatus(active.id, "duplicate")} style={secondaryButton}>중복</button>
              <button onClick={() => updateStatus(active.id, "analyzed")} style={primaryButton}>키워드 확인 완료</button>
            </div>
          </Panel>
        )}
      </div>
    </AdminPage>
  );
}

function InboxAside({ posts, clusters }) {
  const linked = posts.filter(p => p.status === "linked").length;
  const needsWork = posts.filter(p => p.status === "raw" || p.status === "analyzed").length;
  const ignored = posts.filter(p => p.status === "ignored" || p.status === "duplicate").length;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Panel title="처리 현황">
        <div style={{ display: "grid", gap: 8 }}>
          <MiniStat label="처리 필요" value={needsWork} />
          <MiniStat label="후보 연결" value={linked} />
          <MiniStat label="노이즈/중복" value={ignored} />
        </div>
      </Panel>
      <Panel title="확인 원칙">
        <ChecklistReadOnly items={[
          ["원문 전문 저장 금지", true],
          ["짧은 발췌는 한 줄만", true],
          ["후보 판단 전 근거 확인", true],
          ["자동 발행 없음", true],
        ]} />
      </Panel>
      <Panel title="최근 후보">
        <div style={{ display: "grid", gap: 8 }}>
          {clusters.slice(0, 4).map(cluster => <ClusterMini key={cluster.id} cluster={cluster} />)}
        </div>
      </Panel>
    </div>
  );
}

function AdminCandidateReview({ searchQuery = "" }) {
  const { KEYWORD_CLUSTERS, RAW_POSTS, CARD_DRAFTS, CARDS } = window.TR_DATA;
  const [section, setSection] = useStateA("clusters");
  const [clusters, setClusters] = useStateA(KEYWORD_CLUSTERS);
  const [drafts, setDrafts] = useStateA(CARD_DRAFTS);
  const [selectedClusterId, setSelectedClusterId] = useStateA(KEYWORD_CLUSTERS[0]?.id);
  const [selectedDraftId, setSelectedDraftId] = useStateA(CARD_DRAFTS[0]?.id);

  const filteredClusters = clusters.filter(cluster => matchesSearch(searchQuery, [
    cluster.canonicalKeyword,
    cluster.category,
    cluster.operatorNote,
    ...(cluster.aliases || []),
  ]));
  const filteredDrafts = drafts.filter(draft => {
    const cluster = clusters.find(c => c.id === draft.keywordClusterId);
    return matchesSearch(searchQuery, [
      draft.title,
      draft.summary,
      draft.whyHot,
      cluster?.canonicalKeyword,
      ...(cluster?.aliases || []),
    ]);
  });

  const activeCluster = filteredClusters.find(c => c.id === selectedClusterId) || filteredClusters[0] || clusters[0];
  const activeDraft = filteredDrafts.find(d => d.id === selectedDraftId) || filteredDrafts[0] || drafts[0];

  const requestDraft = (clusterId) => {
    const cluster = clusters.find(c => c.id === clusterId);
    if (!cluster) return;
    setClusters(prev => prev.map(c => c.id === clusterId ? { ...c, status: "draft_requested" } : c));
    if (!drafts.some(d => d.keywordClusterId === clusterId)) {
      const evidence = getRawPostsForCluster(cluster, RAW_POSTS);
      const sourceLinks = evidence.map(p => p.url).slice(0, 3);
      const nextDraft = {
        id: `draft-${cluster.id}`,
        keywordClusterId: cluster.id,
        title: `${cluster.canonicalKeyword} 검수 초안`,
        summary: `근거 ${evidence.length}건 기반 초안. 출처 확인 후 승인 여부 판단.`,
        whyHot: "동일 표현 반복 및 반응 속도 확인.",
        hook: `${cluster.canonicalKeyword} 확산 배경`,
        contentAngle: "근거 기반 재해석. 원문 문장 복제 금지.",
        caution: "수치, 판매처, 일정 등 변동 정보는 확인 필요 표시.",
        sourceLinks,
        checklist: [
          { id: "sources", label: "출처 2개 이상 확인", done: sourceLinks.length >= 2 },
          { id: "copy", label: "원문 문장을 그대로 옮기지 않음", done: true },
          { id: "claims", label: "바뀔 수 있는 정보는 확인 필요로 표시", done: false },
          { id: "media", label: "원본 이미지/영상은 저장하지 않음", done: true },
        ],
        status: "draft",
      };
      setDrafts(prev => [nextDraft, ...prev]);
      setSelectedDraftId(nextDraft.id);
    }
    setSection("drafts");
  };

  const updateDraft = (id, key, value) => {
    setDrafts(prev => prev.map(draft => draft.id === id ? { ...draft, [key]: value } : draft));
  };
  const updateDraftStatus = (id, status) => {
    setDrafts(prev => prev.map(draft => draft.id === id ? { ...draft, status } : draft));
  };
  const toggleChecklist = (draftId, itemId) => {
    setDrafts(prev => prev.map(draft => draft.id === draftId ? {
      ...draft,
      checklist: draft.checklist.map(item => item.id === itemId ? { ...item, done: !item.done } : item),
    } : draft));
  };
  const updateClusterStatus = (clusterId, status) => {
    setClusters(prev => prev.map(cluster => cluster.id === clusterId ? { ...cluster, status } : cluster));
  };

  return (
    <AdminPage
      eyebrow="후보 검수"
      title="후보 / 초안 큐"
      aside={<ReviewAside clusters={clusters} drafts={drafts} />}
    >
      <Segmented
        value={section}
        onChange={setSection}
        options={[
          ["clusters", "후보 큐"],
          ["drafts", "카드 초안"],
        ]}
      />

      {section === "clusters" ? (
        <div className="tr-admin-split-layout" style={adminSplitLayout}>
          <Panel title={`후보 큐 ${filteredClusters.length}건`}>
            <div style={{ display: "grid", gap: 8 }}>
              {filteredClusters.map(cluster => (
                <button key={cluster.id} onClick={() => setSelectedClusterId(cluster.id)} style={{
                  ...listButton,
                  borderColor: activeCluster?.id === cluster.id ? "var(--tr-fg)" : "var(--tr-line)",
                }}>
                  <ScoreBadge score={cluster.trendScore} />
                  <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                    <div style={{ fontSize: 14, fontWeight: 850, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {cluster.canonicalKeyword}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--tr-muted)", marginTop: 3 }}>
                      근거 {cluster.rawPostIds.length}건 · 출처 {cluster.sourceCount}개 · {cluster.lastDetectedAt}
                    </div>
                  </div>
                  <StatusPill status={cluster.status} map={CLUSTER_STATUS} />
                </button>
              ))}
              {filteredClusters.length === 0 && <EmptyState text="검색 결과 없음" />}
            </div>
          </Panel>

          {activeCluster && (
            <ClusterDetail
              cluster={activeCluster}
              rawPosts={RAW_POSTS}
              clusters={clusters}
              onRequestDraft={() => requestDraft(activeCluster.id)}
              onStatus={status => updateClusterStatus(activeCluster.id, status)}
            />
          )}
        </div>
      ) : (
        <div className="tr-admin-split-layout" style={adminSplitLayout}>
          <Panel title={`카드 초안 검수 ${filteredDrafts.length}건`}>
            <div style={{ display: "grid", gap: 8 }}>
              {filteredDrafts.map(draft => {
                const cluster = clusters.find(c => c.id === draft.keywordClusterId);
                return (
                  <button key={draft.id} onClick={() => setSelectedDraftId(draft.id)} style={{
                    ...listButton,
                    borderColor: activeDraft?.id === draft.id ? "var(--tr-fg)" : "var(--tr-line)",
                  }}>
                    <IconEdit size={18} />
                    <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                      <div style={{ fontSize: 14, fontWeight: 850, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {draft.title}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--tr-muted)", marginTop: 3 }}>
                        {cluster?.canonicalKeyword || "연결 후보 없음"} · 출처 {draft.sourceLinks.length}개
                      </div>
                    </div>
                    <StatusPill status={draft.status} map={DRAFT_STATUS} />
                  </button>
                );
              })}
              {filteredDrafts.length === 0 && <EmptyState text="검색 결과 없음" />}
            </div>
          </Panel>

          {activeDraft && (
            <DraftDetail
              draft={activeDraft}
              clusters={clusters}
              cards={CARDS}
              onChange={(key, value) => updateDraft(activeDraft.id, key, value)}
              onStatus={status => updateDraftStatus(activeDraft.id, status)}
              onToggleChecklist={itemId => toggleChecklist(activeDraft.id, itemId)}
            />
          )}
        </div>
      )}
    </AdminPage>
  );
}

function ClusterDetail({ cluster, rawPosts, clusters, onRequestDraft, onStatus }) {
  const evidence = getRawPostsForCluster(cluster, rawPosts);
  const similar = (cluster.similarClusterIds || []).map(id => clusters.find(c => c.id === id)).filter(Boolean);
  return (
    <Panel title="후보 판단">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
            <StatusPill status={cluster.status} map={CLUSTER_STATUS} />
            <span style={softChip}>{cluster.category}</span>
            <span style={softChip}>{cluster.platforms.map(p => PLATFORM_LABELS[p] || p).join(" · ")}</span>
          </div>
          <h3 style={panelTitle}>{cluster.canonicalKeyword}</h3>
          <p style={panelBody}>{cluster.operatorNote}</p>
        </div>
        <ScoreBadge score={cluster.trendScore} large />
      </div>

      <div style={metricGrid}>
        <MetricPill label="근거" value={`${evidence.length}건`} />
        <MetricPill label="출처" value={`${cluster.sourceCount}개`} />
        <MetricPill label="최초 감지" value={cluster.firstDetectedAt} />
        <MetricPill label="최근 감지" value={cluster.lastDetectedAt} />
      </div>

      <SectionLabelAdmin>비슷한 표현</SectionLabelAdmin>
      <div style={chipRow}>
        {cluster.aliases.map(alias => <span key={alias} style={softChip}>{alias}</span>)}
      </div>

      {similar.length > 0 && (
        <div style={mergeBanner}>
          <IconLayers size={18} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 850, fontSize: 14 }}>유사 후보</div>
            <div style={{ fontSize: 12.5, color: "var(--tr-muted)", marginTop: 3 }}>
              {similar.map(item => item.canonicalKeyword).join(", ")}
            </div>
          </div>
          <button style={secondarySmallButton}>병합 검토</button>
        </div>
      )}

      <SectionLabelAdmin>점수 근거</SectionLabelAdmin>
      <ScoreBreakdown breakdown={cluster.scoreBreakdown} />

      <SectionLabelAdmin>연결된 근거</SectionLabelAdmin>
      <div style={{ display: "grid", gap: 8 }}>
        {evidence.map(post => {
          const source = getSource(post.sourceAccountId);
          return (
            <EvidenceRow key={post.id} post={post} source={source} />
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 18 }}>
        <button onClick={() => onStatus("watching")} style={secondaryButton}>관찰</button>
        <button onClick={() => onStatus("rejected")} style={secondaryButton}>후보 제외</button>
        <button onClick={onRequestDraft} style={primaryButton}>
          <IconSparkle size={16} />초안 생성
        </button>
      </div>
    </Panel>
  );
}

function DraftDetail({ draft, clusters, cards, onChange, onStatus, onToggleChecklist }) {
  const cluster = clusters.find(c => c.id === draft.keywordClusterId);
  const previewCard = cards.find(c => c.id === draft.previewCardId) || cards[0];
  const allChecked = draft.checklist.every(item => item.done);
  return (
    <Panel title="초안 검수">
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 360px", minWidth: 280 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
            <StatusPill status={draft.status} map={DRAFT_STATUS} />
            {cluster && <span style={softChip}>{cluster.canonicalKeyword}</span>}
            <span style={softChip}>출처 {draft.sourceLinks.length}개</span>
          </div>
          <AdminField label="제목">
            <input value={draft.title} onChange={e => onChange("title", e.target.value)} style={editorInput} />
          </AdminField>
          <AdminField label="짧은 요약">
            <textarea value={draft.summary} onChange={e => onChange("summary", e.target.value)} rows={2} style={editorInput} />
          </AdminField>
          <AdminField label="왜 뜨는지">
            <textarea value={draft.whyHot} onChange={e => onChange("whyHot", e.target.value)} rows={3} style={editorInput} />
          </AdminField>
          <AdminField label="첫 3초 훅">
            <input value={draft.hook} onChange={e => onChange("hook", e.target.value)} style={editorInput} />
          </AdminField>
          <AdminField label="콘텐츠 각도">
            <textarea value={draft.contentAngle} onChange={e => onChange("contentAngle", e.target.value)} rows={3} style={editorInput} />
          </AdminField>
          <AdminField label="주의사항">
            <textarea value={draft.caution} onChange={e => onChange("caution", e.target.value)} rows={2} style={editorInput} />
          </AdminField>
        </div>
        <div style={{ flex: "0 1 300px", minWidth: 260 }}>
          <SectionLabelAdmin>사용자 미리보기</SectionLabelAdmin>
          <div style={previewCardBox}>
            <Cover cover={previewCard.cover} height={150} />
            <div style={{ padding: 14 }}>
              <div style={{ fontSize: 12, color: "var(--tr-muted)", fontWeight: 750 }}>{previewCard.category}</div>
              <div style={{ fontSize: 17, fontWeight: 900, letterSpacing: "-0.03em", marginTop: 6, lineHeight: 1.25 }}>
                {draft.title}
              </div>
              <p style={{ margin: "8px 0 0", fontSize: 12.5, color: "var(--tr-muted)", lineHeight: 1.5 }}>
                {draft.summary}
              </p>
            </div>
          </div>

          <SectionLabelAdmin>출처 링크</SectionLabelAdmin>
          <div style={{ display: "grid", gap: 7 }}>
            {draft.sourceLinks.map((link, idx) => (
              <a key={link} href={link} target="_blank" style={sourceLinkStyle}>
                <IconLink size={14} /> 원문 URL {idx + 1}
              </a>
            ))}
          </div>

          <SectionLabelAdmin>승인 전 체크리스트</SectionLabelAdmin>
          <div style={{ display: "grid", gap: 8 }}>
            {draft.checklist.map(item => (
              <button key={item.id} onClick={() => onToggleChecklist(item.id)} style={checkRowStyle(item.done)}>
                <IconCheck size={15} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 18 }}>
            <button onClick={() => onStatus("needs_revision")} style={secondaryButton}>수정 요청</button>
            <button onClick={() => onStatus("held")} style={secondaryButton}>보류</button>
            <button onClick={() => onStatus("discarded")} style={secondaryButton}>폐기</button>
            <button onClick={() => onStatus("approved")} style={{
              ...primaryButton,
              opacity: allChecked ? 1 : 0.58,
            }}>
              승인
            </button>
          </div>
          {!allChecked && (
            <div style={{ marginTop: 10, fontSize: 12, color: "var(--tr-muted)", lineHeight: 1.45 }}>
              체크리스트는 강제 차단이 아니라 운영자 검수 가이드입니다.
            </div>
          )}
        </div>
      </div>
    </Panel>
  );
}

function ReviewAside({ clusters, drafts }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Panel title="후보 상태">
        <StatusDistribution
          items={[
            { label: "신규", value: clusters.filter(c => c.status === "new").length, color: "#3182F6" },
            { label: "관찰 중", value: clusters.filter(c => c.status === "watching").length, color: "var(--tr-yellow)" },
            { label: "초안 생성", value: clusters.filter(c => c.status === "ready_for_draft").length, color: "var(--tr-green)" },
            { label: "초안 요청", value: clusters.filter(c => c.status === "draft_requested").length, color: "#8B5CF6" },
          ]}
        />
      </Panel>
      <Panel title="초안 상태">
        <StatusDistribution
          items={[
            { label: "검수 대기", value: drafts.filter(d => d.status === "draft").length, color: "#3182F6" },
            { label: "승인", value: drafts.filter(d => d.status === "approved").length, color: "var(--tr-green)" },
            { label: "보류", value: drafts.filter(d => d.status === "held").length, color: "var(--tr-muted)" },
            { label: "폐기", value: drafts.filter(d => d.status === "discarded").length, color: "var(--tr-red)" },
          ]}
        />
      </Panel>
      <Panel title="초안 원칙">
        <ChecklistReadOnly items={[
          ["원문 요약기가 아니라 재해석 도구", true],
          ["출처 링크 유지", true],
          ["변동 정보 단정 금지", true],
          ["승인 전 사용자 노출 없음", true],
        ]} />
      </Panel>
    </div>
  );
}

function AdminSources({ onUseAsSource, searchQuery = "" }) {
  const { SOURCE_ACCOUNTS, CATEGORIES } = window.TR_DATA;
  const [sources, setSources] = useStateA(SOURCE_ACCOUNTS);
  const [platform, setPlatform] = useStateA("all");
  const [category, setCategory] = useStateA("전체");
  const [grade, setGrade] = useStateA("all");
  const [activeOnly, setActiveOnly] = useStateA(false);
  const [adding, setAdding] = useStateA(false);

  const visible = sources.filter(source => (
    (platform === "all" || source.platform === platform) &&
    (category === "전체" || source.category === category) &&
    (grade === "all" || source.grade === grade) &&
    (!activeOnly || source.active) &&
    matchesSearch(searchQuery, [
      source.name,
      source.handle,
      source.notes,
      source.category,
      source.platform,
    ])
  ));

  const toggleActive = (id) => {
    setSources(prev => prev.map(source => source.id === id ? { ...source, active: !source.active } : source));
  };
  const setSourceGrade = (id, nextGrade) => {
    setSources(prev => prev.map(source => source.id === id ? { ...source, grade: nextGrade } : source));
  };
  const addSource = (data) => {
    const next = {
      id: `src-new-${sources.length + 1}`,
      platform: data.platform,
      name: data.name || data.handle,
      handle: data.handle.startsWith("@") || data.platform !== "x" ? data.handle : `@${data.handle}`,
      profileUrl: data.profileUrl || "#",
      category: data.category,
      grade: data.grade,
      active: true,
      cadence: "수동 확인",
      lastCheckedAt: "방금 추가",
      notes: data.notes || "운영자가 추가한 소스",
    };
    setSources(prev => [next, ...prev]);
    setAdding(false);
  };

  return (
    <AdminPage
      eyebrow="소스"
      title="수집 소스"
      aside={<SourcesAside sources={sources} />}
    >
      <Panel title="필터">
        <Toolbar>
          <SelectControl value={platform} onChange={setPlatform} options={[
            ["all", "모든 플랫폼"],
            ["x", "X"],
            ["youtube", "유튜브"],
            ["manual_url", "수동 등록"],
          ]} />
          <SelectControl value={category} onChange={setCategory} options={CATEGORIES.map(c => [c, c])} />
          <SelectControl value={grade} onChange={setGrade} options={[
            ["all", "모든 등급"],
            ["A", "A"],
            ["B", "B"],
            ["C", "C"],
            ["D", "D"],
          ]} />
          <button onClick={() => setActiveOnly(!activeOnly)} style={activeOnly ? primarySmallButton : secondarySmallButton}>
            활성만
          </button>
          <button onClick={() => setAdding(!adding)} style={primarySmallButton}><IconPlus size={15} /> 소스 추가</button>
        </Toolbar>
      </Panel>

      {adding && (
        <Panel title="소스 추가">
          <AddSourceForm categories={CATEGORIES.filter(c => c !== "전체")} onCancel={() => setAdding(false)} onSubmit={addSource} />
        </Panel>
      )}

      <Panel title={`등록된 소스 ${visible.length}건`}>
        <div style={sourceGrid}>
          {visible.map(source => (
            <div key={source.id} style={sourceCardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <PlatformChip platform={source.platform} />
                    <GradeChip grade={source.grade} />
                    <StatusDot on={source.active} />
                  </div>
                  <h3 style={{ margin: "12px 0 4px", fontSize: 18, letterSpacing: "-0.03em" }}>{source.handle}</h3>
                  <div style={{ fontSize: 12.5, color: "var(--tr-muted)", fontWeight: 750 }}>
                    {source.name} · {source.category}
                  </div>
                </div>
                <button onClick={() => toggleActive(source.id)} style={source.active ? primarySmallButton : secondarySmallButton}>
                  {source.active ? "활성" : "비활성"}
                </button>
              </div>
              <p style={{ margin: "12px 0 0", fontSize: 13, color: "var(--tr-muted)", lineHeight: 1.55 }}>
                {source.notes}
              </p>
              <InfoGrid rows={[
                ["마지막 확인", source.lastCheckedAt],
                ["주기", source.cadence],
                ["등급 의미", GRADE_COPY[source.grade]],
              ]} compact />
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
                {["A", "B", "C", "D"].map(g => (
                  <button key={g} onClick={() => setSourceGrade(source.id, g)} style={source.grade === g ? primarySmallButton : secondarySmallButton}>
                    {g}
                  </button>
                ))}
                <button onClick={() => onUseAsSource(source.id)} style={secondarySmallButton}>
                  수집 큐 열기
                </button>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </AdminPage>
  );
}

function AddSourceForm({ categories, onCancel, onSubmit }) {
  const [form, setForm] = useStateA({
    platform: "x",
    handle: "",
    name: "",
    profileUrl: "",
    category: categories[0] || "푸드",
    grade: "B",
    notes: "",
  });
  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <AdminField label="플랫폼">
          <select value={form.platform} onChange={e => set("platform", e.target.value)} style={editorInput}>
            <option value="x">X</option>
            <option value="youtube">유튜브</option>
            <option value="manual_url">수동 등록</option>
          </select>
        </AdminField>
        <AdminField label="등급">
          <select value={form.grade} onChange={e => set("grade", e.target.value)} style={editorInput}>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </AdminField>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <AdminField label="핸들 / 채널명">
          <input value={form.handle} onChange={e => set("handle", e.target.value)} style={editorInput} />
        </AdminField>
        <AdminField label="표시 이름">
          <input value={form.name} onChange={e => set("name", e.target.value)} style={editorInput} />
        </AdminField>
      </div>
      <AdminField label="프로필 URL">
        <input value={form.profileUrl} onChange={e => set("profileUrl", e.target.value)} style={editorInput} />
      </AdminField>
      <AdminField label="카테고리">
        <select value={form.category} onChange={e => set("category", e.target.value)} style={editorInput}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </AdminField>
      <AdminField label="메모">
        <textarea value={form.notes} onChange={e => set("notes", e.target.value)} rows={2} style={editorInput} />
      </AdminField>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={onCancel} style={secondaryButton}>취소</button>
        <button onClick={() => form.handle && onSubmit(form)} style={primaryButton}>추가</button>
      </div>
    </div>
  );
}

function SourcesAside({ sources }) {
  const active = sources.filter(s => s.active).length;
  const gradeA = sources.filter(s => s.grade === "A").length;
  const paused = sources.filter(s => !s.active).length;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Panel title="소스 요약">
        <div style={{ display: "grid", gap: 8 }}>
          <MiniStat label="활성" value={active} />
          <MiniStat label="A등급" value={gradeA} />
          <MiniStat label="비활성" value={paused} />
        </div>
      </Panel>
      <Panel title="등급 기준">
        <div style={{ display: "grid", gap: 9 }}>
          {Object.entries(GRADE_COPY).map(([grade, copy]) => (
            <div key={grade} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <GradeChip grade={grade} />
              <div style={{ fontSize: 12.5, color: "var(--tr-muted)", lineHeight: 1.45 }}>{copy}</div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function AdminPage({ eyebrow, title, children, aside }) {
  return (
    <main className="tr-admin-page" style={{
      maxWidth: 1440,
      margin: "0 auto",
      padding: "30px 36px 54px",
    }}>
      <div className="tr-admin-page-grid" style={{
        display: "grid", gridTemplateColumns: aside ? "minmax(0, 1fr) 300px" : "1fr",
        gap: 18, alignItems: "start",
      }}>
        <section style={{ minWidth: 0 }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{
              fontSize: 11, fontWeight: 850, letterSpacing: "0.12em",
              color: "var(--tr-muted)", marginBottom: 8,
            }}>
              {eyebrow}
            </div>
            <h1 style={{
              margin: 0, fontSize: 24, lineHeight: 1.12, letterSpacing: "-0.04em",
              fontWeight: 900,
            }}>
              {title}
            </h1>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>{children}</div>
        </section>
        {aside && <aside className="tr-admin-page-aside" style={{ position: "sticky", top: 88 }}>{aside}</aside>}
      </div>
    </main>
  );
}

function Panel({ title, action, children }) {
  return (
    <section style={{
      background: "var(--tr-card-2)",
      border: "1px solid var(--tr-line)",
      borderRadius: 16,
      padding: 18,
      boxShadow: "0 16px 38px rgba(17,24,39,0.04)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <h2 style={{ margin: 0, fontSize: 15, fontWeight: 950, letterSpacing: "-0.02em" }}>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function WorkflowPanel({ title, value, max, action, onClick }) {
  const pct = Math.min(100, Math.round((value / Math.max(1, max)) * 100));
  return (
    <button onClick={onClick} style={{
      border: "1px solid var(--tr-line)",
      background: "var(--tr-card-2)",
      color: "var(--tr-fg)",
      borderRadius: 8,
      padding: 16,
      textAlign: "left",
      cursor: "pointer",
      minHeight: 132,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <div style={{ fontSize: 13, color: "var(--tr-muted)", fontWeight: 750 }}>{title}</div>
        <IconChevronRight size={16} />
      </div>
      <div style={{ fontSize: 34, fontWeight: 950, letterSpacing: "-0.05em", marginTop: 16 }}>{value}</div>
      <ProgressBar value={pct} />
      <div style={{ fontSize: 12, fontWeight: 800, color: "var(--tr-muted)", marginTop: 9 }}>{action}</div>
    </button>
  );
}

function ProgressBar({ value, color = "var(--tr-fg)" }) {
  return (
    <div style={{ height: 6, borderRadius: 100, background: "var(--tr-bg)", overflow: "hidden", marginTop: 10 }}>
      <div style={{ height: "100%", width: `${value}%`, background: color, borderRadius: 100 }} />
    </div>
  );
}

function StatTile({ big, label, accent }) {
  return (
    <div style={{
      border: "1px solid var(--tr-line)",
      borderRadius: 8,
      padding: 16,
      background: accent ? "var(--tr-fg)" : "var(--tr-card-2)",
      color: accent ? "var(--tr-bg)" : "var(--tr-fg)",
      minHeight: 104,
    }}>
      <div style={{ fontSize: 30, fontWeight: 950, letterSpacing: "-0.05em" }}>{big}</div>
      <div style={{ fontSize: 12.5, fontWeight: 750, opacity: accent ? 0.72 : 0.55, marginTop: 8 }}>{label}</div>
    </div>
  );
}

function AdminMetricCard({ title, value, meta, icon, onClick }) {
  const Component = onClick ? "button" : "div";
  return (
    <Component onClick={onClick} style={{
      border: `1px solid ${ADMIN_LINE}`,
      borderRadius: 16,
      padding: 18,
      background: ADMIN_SURFACE,
      color: ADMIN_TEXT,
      minHeight: 134,
      cursor: onClick ? "pointer" : "default",
      textAlign: "left",
      boxShadow: "0 14px 34px rgba(17,24,39,0.04)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14 }}>
        <span style={{
          width: 38,
          height: 38,
          borderRadius: 12,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: ADMIN_ACCENT_SOFT,
          color: ADMIN_ACCENT,
        }}>{icon}</span>
        <IconMore size={18} stroke={ADMIN_MUTED} />
      </div>
      <div style={{ marginTop: 16, fontSize: 12.5, color: ADMIN_MUTED, fontWeight: 850 }}>{title}</div>
      <div style={{ marginTop: 7, fontSize: 32, lineHeight: 1, fontWeight: 950, letterSpacing: "-0.055em" }}>{value}</div>
      <div style={{ marginTop: 9, fontSize: 12, color: ADMIN_MUTED, fontWeight: 750 }}>{meta}</div>
    </Component>
  );
}

function AdminBarList({ items }) {
  const total = Math.max(1, ...items.map(item => item.value));
  return (
    <div style={{ display: "grid", gap: 14 }}>
      {items.map(item => (
        <div key={item.label}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12.5, fontWeight: 850 }}>
            <span>{item.label}</span>
            <span style={{ color: ADMIN_MUTED }}>{item.value}</span>
          </div>
          <div style={{
            marginTop: 7,
            height: 9,
            borderRadius: 100,
            background: "#EEF1F6",
            overflow: "hidden",
          }}>
            <div style={{
              height: "100%",
              width: `${Math.max(4, (item.value / total) * 100)}%`,
              borderRadius: 100,
              background: item.color,
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminDonutChart({ total, items }) {
  const sum = Math.max(1, items.reduce((acc, item) => acc + item.value, 0));
  let current = 0;
  const stops = items.map(item => {
    const start = current;
    const end = current + (item.value / sum) * 100;
    current = end;
    return `${item.color} ${start}% ${end}%`;
  }).join(", ");
  return (
    <div style={{ display: "grid", gridTemplateColumns: "128px 1fr", gap: 18, alignItems: "center" }}>
      <div style={{
        width: 128,
        height: 128,
        borderRadius: "50%",
        background: `conic-gradient(${stops})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}>
        <div style={{
          width: 78,
          height: 78,
          borderRadius: "50%",
          background: ADMIN_SURFACE,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "inset 0 0 0 1px #EEF1F6",
        }}>
          <span style={{ fontSize: 11, color: ADMIN_MUTED, fontWeight: 850 }}>전체</span>
          <span style={{ fontSize: 20, fontWeight: 950, letterSpacing: "-0.04em" }}>{total}</span>
        </div>
      </div>
      <div style={{ display: "grid", gap: 9 }}>
        {items.map(item => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, fontSize: 12.5, fontWeight: 850 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
              <span style={{ width: 8, height: 8, borderRadius: 100, background: item.color }} />
              {item.label}등급
            </span>
            <span style={{ color: ADMIN_MUTED }}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PriorityPostRow({ post, source }) {
  return (
    <div style={priorityRowStyle}>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
          <StatusPill status={post.status} map={RAW_STATUS} />
          <PlatformChip platform={post.platform} />
          <GradeChip grade={source?.grade || "B"} />
        </div>
        <div style={{ marginTop: 8, fontSize: 13.5, fontWeight: 850, lineHeight: 1.35, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {post.excerpt}
        </div>
        <div style={{ marginTop: 5, fontSize: 12, color: ADMIN_MUTED, fontWeight: 750 }}>{post.author} · {post.collectedAt}</div>
      </div>
    </div>
  );
}

function PriorityClusterRow({ cluster }) {
  return (
    <div style={priorityRowStyle}>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 900, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cluster.canonicalKeyword}</div>
        <div style={{ marginTop: 5, fontSize: 12, color: ADMIN_MUTED, fontWeight: 750 }}>
          근거 {cluster.rawPostIds.length}건 · 출처 {cluster.sourceCount}개 · {cluster.lastDetectedAt}
        </div>
      </div>
      <StatusPill status={cluster.status} map={CLUSTER_STATUS} />
    </div>
  );
}

function QueuePostRow({ post, source, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: "100%",
      border: `1px solid ${selected ? ADMIN_ACCENT : ADMIN_LINE}`,
      borderRadius: 13,
      background: selected ? ADMIN_ACCENT_SOFT : "#FAFBFD",
      color: ADMIN_TEXT,
      padding: 13,
      cursor: "pointer",
      display: "grid",
      gridTemplateColumns: "180px minmax(0, 1fr) 150px",
      gap: 14,
      alignItems: "start",
      textAlign: "left",
    }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
          <StatusPill status={post.status} map={RAW_STATUS} />
          <PlatformChip platform={post.platform} />
          <GradeChip grade={source?.grade || "B"} />
        </div>
        <div style={{
          marginTop: 9,
          fontSize: 13,
          fontWeight: 950,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
          {post.author}
        </div>
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 850, lineHeight: 1.45 }}>
          {post.excerpt}
        </div>
        <div style={{
          marginTop: 8,
          fontSize: 12,
          color: ADMIN_MUTED,
          fontWeight: 800,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
          {post.suggestedKeywords?.slice(0, 3).join(", ") || "확인 필요"}
        </div>
      </div>
      <div style={{ minWidth: 0, textAlign: "right" }}>
        <div style={{
          fontSize: 12,
          fontWeight: 850,
          lineHeight: 1.45,
          color: ADMIN_TEXT,
        }}>
          {formatMetrics(post.metrics)}
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: ADMIN_MUTED, fontWeight: 850 }}>
          {post.collectedAt}
        </div>
      </div>
    </button>
  );
}

function MiniStat({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid var(--tr-line)" }}>
      <span style={{ fontSize: 12.5, color: "var(--tr-muted)", fontWeight: 750 }}>{label}</span>
      <span style={{ fontSize: 18, fontWeight: 950 }}>{value}</span>
    </div>
  );
}

function PipelineSteps() {
  const steps = ["소스", "수집 글", "트렌드 후보", "카드 초안", "검수/승인", "미리보기"];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gap: 8 }}>
      {steps.map((step, i) => (
        <div key={step} style={{
          minHeight: 74,
          border: "1px solid var(--tr-line)",
          background: i === 1 ? "var(--tr-fg)" : "var(--tr-card-2)",
          color: i === 1 ? "var(--tr-bg)" : "var(--tr-fg)",
          borderRadius: 8,
          padding: 12,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
          <span style={{ fontSize: 11, fontWeight: 850, opacity: 0.62 }}>0{i + 1}</span>
          <span style={{ fontSize: 13, fontWeight: 900, lineHeight: 1.25 }}>{step}</span>
        </div>
      ))}
    </div>
  );
}

function StatusDistribution({ items }) {
  const total = Math.max(1, items.reduce((sum, item) => sum + item.value, 0));
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {items.map(item => (
        <div key={item.label}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 800, marginBottom: 5 }}>
            <span>{item.label}</span>
            <span style={{ color: "var(--tr-muted)" }}>{item.value}</span>
          </div>
          <ProgressBar value={(item.value / total) * 100} color={item.color} />
        </div>
      ))}
    </div>
  );
}

function DecisionCard({ title, body, meta, action, onClick }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: "var(--tr-muted)", fontWeight: 850, textTransform: "uppercase", letterSpacing: "0.08em" }}>{meta}</div>
      <h3 style={{ margin: "8px 0", fontSize: 18, letterSpacing: "-0.03em" }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 13.5, color: "var(--tr-muted)", lineHeight: 1.55 }}>{body}</p>
      <button onClick={onClick} style={{ ...secondarySmallButton, marginTop: 14 }}>{action}</button>
    </div>
  );
}

function ScoreBreakdown({ breakdown }) {
  const rows = [
    ["growth_signal", "증가 신호", breakdown.growthSignal],
    ["source_diversity", "출처 다양성", breakdown.sourceDiversity],
    ["platform_spread", "플랫폼 확산", breakdown.platformSpread],
    ["reaction_velocity", "반응 속도", breakdown.reactionVelocity],
    ["evidence_quality", "근거 품질", breakdown.evidenceQuality],
    ["operator_weight", "운영자 가중치", breakdown.operatorWeight],
    ["noise_penalty", "노이즈 감점", breakdown.noisePenalty],
  ];
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {rows.map(([key, label, value]) => (
        <div key={key} style={{ display: "grid", gridTemplateColumns: "120px 1fr 38px", gap: 10, alignItems: "center" }}>
          <div style={{ fontSize: 12, color: "var(--tr-muted)", fontWeight: 750 }}>{label}</div>
          <ProgressBar value={Math.max(0, Math.abs(value) * 3)} color={value < 0 ? "var(--tr-red)" : "var(--tr-fg)"} />
          <div style={{ fontSize: 12, fontWeight: 900, textAlign: "right" }}>{value > 0 ? `+${value}` : value}</div>
        </div>
      ))}
    </div>
  );
}

function EvidenceRow({ post, source }) {
  return (
    <div style={{
      border: "1px solid var(--tr-line)",
      borderRadius: 8,
      padding: 12,
      display: "grid",
      gap: 8,
      background: "var(--tr-bg)",
    }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <PlatformChip platform={post.platform} />
        <GradeChip grade={source?.grade || "B"} />
        <StatusPill status={post.status} map={RAW_STATUS} />
        <span style={{ fontSize: 12, color: "var(--tr-muted)", fontWeight: 750 }}>{post.collectedAt}</span>
      </div>
      <div style={{ fontSize: 13.5, lineHeight: 1.55 }}>{post.excerpt}</div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "var(--tr-muted)", fontWeight: 750 }}>{post.author} · {formatMetrics(post.metrics)}</span>
        <a href={post.url} target="_blank" style={smallLinkStyle}>원문</a>
      </div>
    </div>
  );
}

function ClusterMini({ cluster }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      border: "1px solid var(--tr-line)", borderRadius: 8, padding: 10,
      background: "var(--tr-bg)",
    }}>
      <ScoreBadge score={cluster.trendScore} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 850, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {cluster.canonicalKeyword}
        </div>
        <div style={{ fontSize: 11.5, color: "var(--tr-muted)", marginTop: 3 }}>
          근거 {cluster.rawPostIds.length}건 · 출처 {cluster.sourceCount}개
        </div>
      </div>
    </div>
  );
}

function Toolbar({ children }) {
  return <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 12 }}>{children}</div>;
}

function SelectControl({ value, onChange, options }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{
      border: "1px solid var(--tr-line)",
      background: "var(--tr-bg)",
      color: "var(--tr-fg)",
      borderRadius: 8,
      padding: "8px 10px",
      fontSize: 12.5,
      fontWeight: 750,
      outline: "none",
    }}>
      {options.map(([v, label]) => <option key={v} value={v}>{label}</option>)}
    </select>
  );
}

function Segmented({ value, onChange, options }) {
  return (
    <div style={{
      display: "inline-flex",
      alignSelf: "flex-start",
      padding: 3,
      background: "var(--tr-card-2)",
      borderRadius: 8,
      border: "1px solid var(--tr-line)",
    }}>
      {options.map(([v, label]) => (
        <button key={v} onClick={() => onChange(v)} style={{
          border: 0,
          borderRadius: 6,
          padding: "8px 14px",
          cursor: "pointer",
          background: value === v ? "var(--tr-fg)" : "transparent",
          color: value === v ? "var(--tr-bg)" : "var(--tr-fg)",
          fontSize: 13,
          fontWeight: 850,
        }}>
          {label}
        </button>
      ))}
    </div>
  );
}

function AdminField({ label, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
      <span style={{ fontSize: 12, fontWeight: 850, color: "var(--tr-muted)" }}>{label}</span>
      {children}
    </label>
  );
}

function SectionLabelAdmin({ children }) {
  return (
    <div style={{
      margin: "18px 0 9px",
      fontSize: 11,
      fontWeight: 900,
      color: "var(--tr-muted)",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    }}>
      {children}
    </div>
  );
}

function StatusPill({ status, map }) {
  const meta = map?.[status] || { label: status, tone: "var(--tr-muted)" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "5px 8px", borderRadius: 100,
      background: "var(--tr-card-2)", color: "var(--tr-fg)",
      fontSize: 11, fontWeight: 850, whiteSpace: "nowrap",
    }}>
      <span style={{ width: 7, height: 7, borderRadius: 100, background: meta.tone }} />
      {meta.label}
    </span>
  );
}

function GradeChip({ grade }) {
  const colors = { A: "var(--tr-green)", B: "#3182F6", C: "var(--tr-yellow)", D: "var(--tr-red)" };
  return (
    <span title={GRADE_COPY[grade]} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      minWidth: 26, height: 24, padding: "0 8px", borderRadius: 100,
      background: colors[grade] || "var(--tr-muted)",
      color: grade === "C" ? "#111" : "#fff",
      fontSize: 11, fontWeight: 950,
    }}>
      {grade}
    </span>
  );
}

function PlatformChip({ platform }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "5px 8px", borderRadius: 100,
      background: "var(--tr-card-2)",
      fontSize: 11, fontWeight: 850,
    }}>
      {PLATFORM_LABELS[platform] || platform}
    </span>
  );
}

function ScoreBadge({ score, large }) {
  return (
    <div style={{
      width: large ? 62 : 42,
      height: large ? 62 : 42,
      borderRadius: 8,
      background: "var(--tr-fg)",
      color: "var(--tr-bg)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      flex: "0 0 auto",
    }}>
      <span style={{ fontSize: large ? 21 : 15, fontWeight: 950, lineHeight: 1 }}>{score}</span>
      <span style={{ fontSize: large ? 9 : 8, fontWeight: 850, opacity: 0.65, marginTop: 2 }}>판단</span>
    </div>
  );
}

function StatusDot({ on }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontSize: 11, fontWeight: 850, color: "var(--tr-muted)",
    }}>
      <span style={{ width: 7, height: 7, borderRadius: 100, background: on ? "var(--tr-green)" : "var(--tr-muted)" }} />
      {on ? "활성" : "비활성"}
    </span>
  );
}

function InfoGrid({ rows, compact }) {
  return (
    <div style={{ display: "grid", gap: compact ? 5 : 8, marginTop: compact ? 10 : 14 }}>
      {rows.map(([label, value]) => (
        <div key={label} style={{
          display: "grid",
          gridTemplateColumns: compact ? "82px 1fr" : "100px 1fr",
          gap: 10,
          fontSize: compact ? 11.5 : 12.5,
          lineHeight: 1.45,
        }}>
          <span style={{ color: "var(--tr-muted)", fontWeight: 800 }}>{label}</span>
          <span style={{ fontWeight: 700 }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

function ChecklistReadOnly({ items }) {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {items.map(([label, done]) => (
        <div key={label} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12.5, color: "var(--tr-muted)", fontWeight: 750 }}>
          <span style={{ width: 16, height: 16, borderRadius: 100, background: done ? "var(--tr-green)" : "var(--tr-card-2)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            {done ? <IconCheck size={11} /> : null}
          </span>
          {label}
        </div>
      ))}
    </div>
  );
}

function MetricPill({ label, value }) {
  return (
    <div style={{
      padding: "9px 10px",
      borderRadius: 8,
      background: "var(--tr-card-2)",
      border: "1px solid var(--tr-line)",
    }}>
      <div style={{ fontSize: 10.5, color: "var(--tr-muted)", fontWeight: 850, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 900, marginTop: 3 }}>{value}</div>
    </div>
  );
}

function ActionButton({ label, onClick }) {
  return (
    <button onClick={onClick} style={{
      border: "1px solid var(--tr-line)",
      background: "var(--tr-card-2)",
      color: "var(--tr-fg)",
      borderRadius: 8,
      padding: "10px 12px",
      textAlign: "left",
      cursor: "pointer",
      fontWeight: 850,
      fontSize: 13,
    }}>
      {label}
    </button>
  );
}

function EmptyState({ text }) {
  return (
    <div style={{
      border: "1px dashed var(--tr-line)",
      borderRadius: 8,
      padding: 12,
      color: "var(--tr-muted)",
      fontSize: 12.5,
      lineHeight: 1.5,
    }}>
      {text}
    </div>
  );
}

function FocusBanner({ label, value, onClear }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "10px 12px",
      borderRadius: 8,
      border: "1px solid var(--tr-line)",
      background: "var(--tr-card-2)",
    }}>
      <span style={{ fontSize: 11, color: "var(--tr-muted)", fontWeight: 850, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</span>
      <span style={{ flex: 1, fontSize: 14, fontWeight: 900 }}>{value}</span>
      <button onClick={onClear} style={secondarySmallButton}>해제</button>
    </div>
  );
}

function matchesSearch(query, values) {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return true;
  return values
    .filter(value => value !== undefined && value !== null)
    .some(value => String(value).toLowerCase().includes(q));
}

function getSource(id) {
  return window.TR_DATA.SOURCE_ACCOUNTS.find(source => source.id === id || source.handle === id);
}

function getCluster(id) {
  return window.TR_DATA.KEYWORD_CLUSTERS.find(cluster => cluster.id === id);
}

function getRawPostsForCluster(cluster, rawPosts) {
  return rawPosts.filter(post => cluster.rawPostIds.includes(post.id) || (post.keywordClusterIds || []).includes(cluster.id));
}

function findFocusedPosts(posts, sources, focus) {
  if (!focus) return posts;
  const source = sources.find(item => item.id === focus || item.handle === focus);
  if (!source) return posts;
  return posts.filter(post => post.sourceAccountId === source.id);
}

function gradeRank(grade) {
  return ({ A: 0, B: 1, C: 2, D: 3 }[grade] ?? 9);
}

function formatMetrics(metrics = {}) {
  const parts = [];
  if (metrics.likes) parts.push(`좋아요 ${formatCount(metrics.likes)}`);
  if (metrics.comments) parts.push(`댓글 ${formatCount(metrics.comments)}`);
  if (metrics.views) parts.push(`조회 ${formatCount(metrics.views)}`);
  return parts.join(" · ") || "반응 수집 전";
}

function formatCount(value) {
  if (value >= 10000) return `${(value / 10000).toFixed(value >= 100000 ? 0 : 1)}만`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return String(value);
}

const sectionGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 16,
};

const dashboardGrid = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.15fr) minmax(260px, 0.85fr) minmax(280px, 0.9fr)",
  gap: 16,
};

const twoColumnGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 16,
};

const priorityRowStyle = {
  border: `1px solid ${ADMIN_LINE}`,
  borderRadius: 12,
  background: "#FAFBFD",
  padding: 12,
  display: "flex",
  alignItems: "center",
  gap: 12,
  minWidth: 0,
};

const adminSplitLayout = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.1fr) minmax(380px, 0.9fr)",
  gap: 16,
  alignItems: "start",
};

const queueLayout = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
  gap: 16,
  alignItems: "start",
};

const tableWrap = {
  overflowX: "auto",
  border: `1px solid ${ADMIN_LINE}`,
  borderRadius: 14,
  background: ADMIN_SURFACE,
};

const dataTable = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 12.2,
  lineHeight: 1.45,
};

const queueTableStyle = {
  ...dataTable,
  minWidth: 1186,
  tableLayout: "fixed",
};

const queueNowrapCell = {
  whiteSpace: "nowrap",
};

const queueNowrapCellStrong = {
  ...queueNowrapCell,
  fontWeight: 850,
};

const queueSourceCell = {
  minWidth: 220,
};

const queueExcerptCell = {
  minWidth: 380,
  lineHeight: 1.45,
};

const queueKeywordCell = {
  lineHeight: 1.45,
};

const queueRowListStyle = {
  display: "none",
  gap: 10,
};

const editorInput = {
  width: "100%",
  border: `1px solid ${ADMIN_LINE}`,
  background: "#FAFBFD",
  color: ADMIN_TEXT,
  borderRadius: 10,
  padding: "10px 11px",
  font: "inherit",
  fontSize: 13,
  outline: "none",
};

const primaryButton = {
  border: 0,
  borderRadius: 10,
  padding: "10px 14px",
  background: ADMIN_ACCENT,
  color: "#fff",
  fontWeight: 850,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 7,
  whiteSpace: "nowrap",
};

const secondaryButton = {
  ...primaryButton,
  background: ADMIN_SURFACE,
  color: ADMIN_TEXT,
  border: `1px solid ${ADMIN_LINE}`,
};

const primarySmallButton = {
  ...primaryButton,
  padding: "7px 10px",
  fontSize: 12,
};

const secondarySmallButton = {
  ...secondaryButton,
  padding: "7px 10px",
  fontSize: 12,
};

const iconButtonDark = {
  width: 36,
  height: 36,
  borderRadius: 100,
  border: "1px solid var(--tr-line)",
  background: "var(--tr-card-2)",
  color: "var(--tr-fg)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

const listButton = {
  width: "100%",
  border: `1px solid ${ADMIN_LINE}`,
  background: "#FAFBFD",
  color: ADMIN_TEXT,
  borderRadius: 12,
  padding: 12,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 10,
};

const rankBadge = {
  width: 24,
  height: 24,
  borderRadius: 100,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#F2F4F8",
  fontSize: 12,
  fontWeight: 900,
};

const softChip = {
  display: "inline-flex",
  alignItems: "center",
  padding: "6px 9px",
  borderRadius: 100,
  background: "#F3F5FA",
  fontSize: 11.5,
  fontWeight: 800,
  color: ADMIN_TEXT,
};

const chipRow = {
  display: "flex",
  gap: 7,
  flexWrap: "wrap",
};

const panelTitle = {
  margin: 0,
  fontSize: 24,
  fontWeight: 950,
  letterSpacing: "-0.04em",
  lineHeight: 1.15,
};

const panelBody = {
  margin: "8px 0 0",
  fontSize: 13.5,
  color: "var(--tr-muted)",
  lineHeight: 1.6,
};

const metricGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  gap: 8,
  marginTop: 16,
};

const mergeBanner = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: 12,
  borderRadius: 8,
  background: "var(--tr-card-2)",
  border: "1px solid var(--tr-line)",
  marginTop: 14,
};

const previewCardBox = {
  border: "1px solid var(--tr-line)",
  borderRadius: 8,
  overflow: "hidden",
  background: "var(--tr-bg)",
};

const sourceLinkStyle = {
  display: "flex",
  alignItems: "center",
  gap: 7,
  color: "var(--tr-fg)",
  textDecoration: "none",
  fontSize: 12.5,
  fontWeight: 800,
  padding: "8px 10px",
  borderRadius: 8,
  background: "var(--tr-card-2)",
};

const smallLinkStyle = {
  color: "var(--tr-fg)",
  fontWeight: 850,
  fontSize: 12,
  textDecoration: "none",
};

const sourceGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 12,
};

const sourceCardStyle = {
  border: `1px solid ${ADMIN_LINE}`,
  borderRadius: 14,
  padding: 14,
  background: ADMIN_SURFACE,
  boxShadow: "0 12px 28px rgba(17,24,39,0.035)",
};

const checkRowStyle = (done) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "100%",
  border: "1px solid var(--tr-line)",
  borderRadius: 8,
  padding: "9px 10px",
  cursor: "pointer",
  background: done ? "rgba(0,200,83,0.12)" : "var(--tr-bg)",
  color: "var(--tr-fg)",
  textAlign: "left",
  fontSize: 12.5,
  fontWeight: 800,
});

if (typeof document !== "undefined" && !document.getElementById("tr-admin-table-styles")) {
  const style = document.createElement("style");
  style.id = "tr-admin-table-styles";
  style.textContent = `
    .tr-screen { background: var(--tr-bg); }
    table th {
      text-align: left;
      padding: 10px 11px;
      font-size: 11px;
      color: var(--tr-muted);
      letter-spacing: .06em;
      text-transform: uppercase;
      border-bottom: 1px solid var(--tr-line);
      white-space: nowrap;
    }
    table td {
      padding: 11px;
      border-bottom: 1px solid var(--tr-line);
      vertical-align: top;
    }
    table tbody tr:hover {
      background: var(--tr-card-2) !important;
    }
    table tr:last-child td { border-bottom: 0; }
    @media (max-width: 980px) {
      .tr-admin-shell {
        grid-template-columns: 82px minmax(0, 1fr) !important;
      }
      .tr-admin-sidebar {
        padding: 20px 12px !important;
        align-items: center !important;
      }
      .tr-admin-sidebar-copy,
      .tr-admin-sidebar-section-title,
      .tr-admin-sidebar-item-label,
      .tr-admin-status-card,
      .tr-admin-return-text {
        display: none !important;
      }
      .tr-admin-sidebar nav,
      .tr-admin-sidebar nav > div,
      .tr-admin-sidebar nav > div > div:last-child {
        width: 100% !important;
      }
      .tr-admin-header {
        height: auto !important;
        min-height: 88px !important;
        flex-wrap: wrap !important;
        align-items: flex-start !important;
        padding: 16px 18px !important;
        gap: 12px !important;
      }
      .tr-admin-header-title {
        flex-basis: 100% !important;
        width: 100% !important;
      }
      .tr-admin-search {
        width: min(100%, 360px) !important;
        max-width: 100% !important;
        flex: 1 1 220px !important;
      }
      .tr-admin-profile {
        flex: 0 0 auto !important;
      }
      .tr-admin-page {
        padding: 22px 18px 40px !important;
      }
      .tr-admin-page-grid,
      .tr-admin-dashboard-grid,
      .tr-admin-split-layout {
        grid-template-columns: minmax(0, 1fr) !important;
      }
      .tr-queue-table-wrap {
        display: none !important;
      }
      .tr-queue-row-list {
        display: grid !important;
      }
      .tr-admin-page-aside {
        position: static !important;
      }
    }
    @media (max-width: 720px) {
      .tr-queue-row-list > button {
        grid-template-columns: minmax(0, 1fr) !important;
      }
      .tr-queue-row-list > button > div:last-child {
        text-align: left !important;
      }
    }
  `;
  document.head.appendChild(style);
}

const AdminQuickAdd = AdminCollectionInbox;
const AdminReview = AdminCandidateReview;
const AdminInfluencers = AdminSources;
const AdminCandidates = AdminCollectionInbox;
const AdminCards = AdminCandidateReview;
const AdminAccounts = AdminSources;
function PublishBar() { return null; }

Object.assign(window, {
  AdminShell, AdminTopBar, AdminDashboard, AdminCollectionInbox, AdminCandidateReview, AdminSources,
  AdminQuickAdd, AdminReview, AdminInfluencers,
  AdminCandidates, AdminCards, AdminAccounts, PublishBar,
});
