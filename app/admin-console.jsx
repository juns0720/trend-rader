// Trend Radar — admin console (desktop).
// Wrapped in a ChromeWindow. Internal sidebar nav between 4 views:
//   Dashboard · Candidates · Card Editor · Accounts
// Fully interactive: approve/reject candidates, edit card draft, toggle accounts.

const { useState: useStateA, useMemo: useMemoA, useEffect: useEffectA } = React;

// Re-uses CARDS, CANDIDATES, ACCOUNTS, BLOCKLIST, METRICS, CATEGORIES, TIMING,
// Icons, Logo, Sparkline, ThumbPlaceholder, TimingDot.

// ── Sidebar.
const AdminSidebar = ({ view, onView }) => {
  const items = [
    { id: 'dashboard',  label: '대시보드',     Icon: Icons.Home,    badge: null },
    { id: 'candidates', label: '후보 검토',    Icon: Icons.Eye,     badge: 9 },
    { id: 'editor',     label: '카드 편집',    Icon: Icons.Edit,    badge: 3 },
    { id: 'accounts',   label: '소스 · 블록',  Icon: Icons.Settings,badge: null },
  ];
  return (
    <aside style={{
      width: 232, flexShrink: 0,
      background: 'var(--bg-2)',
      borderRight: '1px solid var(--line)',
      padding: '20px 12px', display: 'flex', flexDirection: 'column',
      gap: 4,
    }}>
      <div style={{ padding: '4px 10px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Logo size={20}/>
        <span style={{
          fontSize: 9.5, fontWeight: 700, letterSpacing: '0.05em',
          padding: '3px 6px', borderRadius: 4,
          background: 'var(--ink)', color: 'var(--paper)',
        }}>OPS</span>
      </div>
      {items.map(it => (
        <button key={it.id} onClick={() => onView(it.id)} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '10px 12px', borderRadius: 9,
          border: 0, cursor: 'pointer', textAlign: 'left',
          background: view === it.id ? 'var(--ink)' : 'transparent',
          color: view === it.id ? 'var(--paper)' : 'var(--ink)',
          fontSize: 13.5, fontWeight: 500,
          transition: 'background .12s',
        }}>
          <it.Icon size={17}/>
          <span style={{ flex: 1 }}>{it.label}</span>
          {it.badge != null && (
            <span style={{
              fontSize: 10.5, fontWeight: 700, padding: '2px 7px',
              borderRadius: 999,
              background: view === it.id ? 'var(--paper)' : 'var(--ink)',
              color: view === it.id ? 'var(--ink)' : 'var(--paper)',
              fontVariantNumeric: 'tabular-nums',
            }}>{it.badge}</span>
          )}
        </button>
      ))}
      <div style={{ marginTop: 'auto', padding: '10px', fontSize: 11, color: 'var(--mute)', lineHeight: 1.5 }}>
        <div style={{ fontWeight: 600, color: 'var(--ink)' }}>운영자: hyo@</div>
        <div>다음 수집: 13:30 · X 5h 22m 후</div>
      </div>
    </aside>
  );
};

const TopBar = ({ title, sub, actions }) => (
  <div style={{
    padding: '20px 28px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
    borderBottom: '1px solid var(--line)',
  }}>
    <div>
      <div style={{ fontSize: 11, color: 'var(--mute)', letterSpacing: '0.05em', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>{sub}</div>
      <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>{title}</h1>
    </div>
    <div style={{ display: 'flex', gap: 8 }}>{actions}</div>
  </div>
);

// ────────────────────────────────────────────────────────────────
// DASHBOARD
// ────────────────────────────────────────────────────────────────
const KPI = ({ label, value, sub, trend }) => (
  <div style={{
    padding: '18px 18px', borderRadius: 14,
    background: 'var(--paper)', border: '1px solid var(--line)',
    display: 'flex', flexDirection: 'column',
  }}>
    <div style={{ fontSize: 11, color: 'var(--mute)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
      <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.025em', fontVariantNumeric: 'tabular-nums' }}>{value}</span>
      {sub && <span style={{ fontSize: 12, color: 'var(--mute)' }}>{sub}</span>}
    </div>
    {trend && (
      <div style={{ marginTop: 6 }}>
        <Sparkline data={trend} width={140} height={22}/>
      </div>
    )}
  </div>
);

const Dashboard = ({ onView }) => {
  const todayCards = CARDS.slice(0, 7);
  return (
    <>
      <TopBar
        sub="2026.05.18 · MON · 09:42 발행"
        title="오늘의 운영 현황"
        actions={(
          <>
            <button style={btnGhost}>로그 보기</button>
            <button style={btnPrimary} onClick={() => onView('editor')}>
              <Icons.Plus size={14}/> 새 카드 초안
            </button>
          </>
        )}
      />
      <div style={{ padding: '20px 28px' }}>
        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
          <KPI label="오늘 발행" value={METRICS.publishedToday} sub="/ 목표 5–10" trend={[3,5,4,6,7,7,7]}/>
          <KPI label="검토 대기" value={METRICS.candidatesPending} sub="후보 키워드"/>
          <KPI label="이번 주 DAU" value={METRICS.weeklyDAU} sub={`재방문 ${METRICS.retention7d}`} trend={[12,18,22,29,33,38,41]}/>
          <KPI label="X API 사용량" value={`${(METRICS.xUsage.used/1000).toFixed(1)}k`} sub={`/ ${METRICS.xUsage.cap/1000}k 한도`} trend={[1,3,4,5,6,7,9]}/>
        </div>

        {/* Two col */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 12 }}>
          {/* Today's published */}
          <div style={panelStyle}>
            <PanelHeader title="오늘 발행한 카드" sub={`${todayCards.length}장 · 09:42 일괄 발행`}/>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={{ width: 36 }}>#</th>
                  <th>카드</th>
                  <th style={{ width: 80 }}>타이밍</th>
                  <th style={{ width: 70 }}>스코어</th>
                  <th style={{ width: 90 }}>조회</th>
                  <th style={{ width: 70 }}>저장</th>
                </tr>
              </thead>
              <tbody>
                {todayCards.map((c, i) => (
                  <tr key={c.id}>
                    <td style={{ color: 'var(--mute)', fontVariantNumeric: 'tabular-nums' }}>{i+1}</td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{c.title}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--mute)', marginTop: 1 }}>
                        {CATEGORIES.find(x => x.id === c.category)?.label}
                      </div>
                    </td>
                    <td><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                      <TimingDot timing={c.timing} size={8}/>
                      {TIMING[c.timing].short}
                    </span></td>
                    <td style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{c.score}</td>
                    <td style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--ink-2)' }}>{(c.score * 14 + 120).toLocaleString()}</td>
                    <td style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--ink-2)' }}>{Math.round(c.score * 0.35)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={panelStyle}>
              <PanelHeader title="수집 파이프라인" sub="최근 24시간"/>
              <div style={{ padding: '4px 4px 14px' }}>
                {[
                  { label: 'X 트윗 수집',         val: 312, max: 500, note: '20계정' },
                  { label: '네이버 데이터랩 갱신', val: 1,   max: 1,   note: '✓ 09:30' },
                  { label: '인스타 수동 점검',    val: 6,   max: 8,   note: '오전 1차' },
                  { label: '후보 추출',           val: 9,   max: 20,  note: '대기 중' },
                  { label: 'LLM 초안 생성',       val: 3,   max: 10,  note: '진행 중' },
                ].map(r => (
                  <div key={r.label} style={{ padding: '8px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{r.label}</span>
                      <span style={{ fontSize: 11, color: 'var(--mute)', fontVariantNumeric: 'tabular-nums' }}>{r.val} / {r.max} · {r.note}</span>
                    </div>
                    <div style={{ height: 4, background: 'var(--line)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ width: `${(r.val/r.max)*100}%`, height: '100%', background: 'var(--ink)' }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={panelStyle}>
              <PanelHeader title="가설 검증 (4주차)" sub="MVP 성공/실패 지표"/>
              <div style={{ padding: '0 4px' }}>
                {[
                  { k: 'DAU 30명+',           c: '41명',   ok: true },
                  { k: '재방문율 30%+',       c: '34%',    ok: true },
                  { k: '카드 클릭률 40%+',    c: '47%',    ok: true },
                  { k: '"콘텐츠 만듦" 주 5건',c: '주 5건', ok: true },
                ].map(h => (
                  <div key={h.k} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 0', borderTop: '1px solid var(--line)',
                  }}>
                    <span style={{ fontSize: 13 }}>{h.k}</span>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontSize: 12.5, fontWeight: 600,
                      color: h.ok ? 'var(--go)' : 'var(--late)',
                    }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: h.ok ? 'var(--go)' : 'var(--late)' }}/>
                      {h.c}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Operator daily flow */}
        <div style={{ ...panelStyle, marginTop: 12 }}>
          <PanelHeader title="오늘 운영자 흐름" sub="총 1시간 30분 · 09:00 시작"/>
          <div style={{ display: 'flex', gap: 6, padding: '8px 4px 4px', overflowX: 'auto' }}>
            {[
              { t: '09:00', l: '후보 확인',        s: '5m',  done: true },
              { t: '09:05', l: '데이터랩 검증',    s: '20m', done: true },
              { t: '09:25', l: '카드 5–10개 선정', s: '10m', done: true },
              { t: '09:35', l: 'LLM 초안 생성',    s: '5m',  done: true },
              { t: '09:40', l: '초안 검수 + 수정', s: '50m', done: false, current: true },
              { t: '10:30', l: '발행',             s: '1m',  done: false },
              { t: '오후',  l: '반응 확인',        s: '20m', done: false },
            ].map(s => (
              <div key={s.t} style={{
                flex: '1 1 0', minWidth: 110, padding: '10px 12px',
                borderRadius: 10,
                border: '1px solid ' + (s.current ? 'var(--ink)' : 'var(--line)'),
                background: s.done ? 'var(--bg-2)' : 'var(--paper)',
              }}>
                <div style={{ fontSize: 10.5, color: 'var(--mute)', fontWeight: 600 }}>{s.t}</div>
                <div style={{
                  fontSize: 13, fontWeight: 600, marginTop: 4,
                  color: s.done ? 'var(--mute)' : 'var(--ink)',
                }}>{s.l}</div>
                <div style={{
                  fontSize: 11, marginTop: 4,
                  color: s.current ? 'var(--ink)' : 'var(--mute)',
                }}>{s.done ? `완료 · ${s.s}` : s.current ? `진행 중 · ${s.s}` : s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const PanelHeader = ({ title, sub, right }) => (
  <div style={{
    display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
    padding: '16px 18px 12px', borderBottom: '1px solid var(--line)',
  }}>
    <div>
      <h3 style={{ fontSize: 13, fontWeight: 700, margin: 0, letterSpacing: '-0.005em' }}>{title}</h3>
      {sub && <div style={{ fontSize: 11.5, color: 'var(--mute)', marginTop: 2 }}>{sub}</div>}
    </div>
    {right}
  </div>
);

const panelStyle = {
  background: 'var(--paper)', border: '1px solid var(--line)',
  borderRadius: 14, overflow: 'hidden',
};

const tableStyle = {
  width: '100%', borderCollapse: 'collapse', fontSize: 13,
};

// shared button styles
const btnPrimary = {
  display: 'inline-flex', alignItems: 'center', gap: 6,
  padding: '8px 14px', borderRadius: 9,
  background: 'var(--ink)', color: 'var(--paper)',
  border: 0, fontSize: 13, fontWeight: 600, cursor: 'pointer',
  letterSpacing: '-0.005em',
};
const btnGhost = {
  display: 'inline-flex', alignItems: 'center', gap: 6,
  padding: '8px 14px', borderRadius: 9,
  background: 'var(--paper)', color: 'var(--ink)',
  border: '1px solid var(--line)', fontSize: 13, fontWeight: 500, cursor: 'pointer',
};
const btnDanger = {
  ...btnGhost,
  color: 'var(--late)',
  borderColor: 'color-mix(in oklch, var(--late) 40%, var(--line))',
};

// inject one-time table CSS for admin
if (!document.getElementById('admin-css')) {
  const s = document.createElement('style');
  s.id = 'admin-css';
  s.textContent = `
    .adm-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .adm-table th { text-align: left; font-weight: 600; color: var(--mute);
      font-size: 10.5px; letter-spacing: 0.06em; text-transform: uppercase;
      padding: 10px 16px; border-bottom: 1px solid var(--line); background: var(--bg-2); }
    .adm-table td { padding: 12px 16px; border-bottom: 1px solid var(--line);
      vertical-align: middle; color: var(--ink); }
    .adm-table tbody tr:last-child td { border-bottom: 0; }
    .adm-table tbody tr:hover td { background: var(--bg-2); }
  `;
  document.head.appendChild(s);
}

// ────────────────────────────────────────────────────────────────
// CANDIDATES
// ────────────────────────────────────────────────────────────────
const Candidates = ({ onView }) => {
  const [list, setList] = useStateA(CANDIDATES);
  const [filter, setFilter] = useStateA('pending'); // pending|approved|rejected|all
  const [selected, setSelected] = useStateA(new Set());

  const setStatus = (id, status) => setList(L => L.map(c => c.id === id ? {...c, status} : c));
  const bulkSet = (status) => {
    setList(L => L.map(c => selected.has(c.id) ? {...c, status} : c));
    setSelected(new Set());
  };

  const filtered = list.filter(c => filter === 'all' ? true : c.status === filter);

  return (
    <>
      <TopBar
        sub="X · 데이터랩 · 인스타 수집 결과"
        title="후보 키워드 검토"
        actions={(
          <>
            <button style={btnGhost}>병합</button>
            <button style={btnGhost}>차단어로 추가</button>
            <button style={btnPrimary}><Icons.Check size={14}/> 선택 승인 ({selected.size})</button>
          </>
        )}
      />
      <div style={{ padding: '14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['pending','approved','rejected','all'].map(f => {
            const labels = { pending: '검토 대기', approved: '승인', rejected: '거절', all: '전체' };
            const counts = { pending: list.filter(c=>c.status==='pending').length, approved: list.filter(c=>c.status==='approved').length, rejected: list.filter(c=>c.status==='rejected').length, all: list.length };
            const on = filter === f;
            return (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '6px 12px', borderRadius: 7,
                background: on ? 'var(--ink)' : 'var(--paper)',
                color: on ? 'var(--paper)' : 'var(--ink)',
                border: '1px solid ' + (on ? 'var(--ink)' : 'var(--line)'),
                fontSize: 12.5, fontWeight: 500, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
                {labels[f]} <span style={{ fontVariantNumeric: 'tabular-nums', opacity: 0.7 }}>{counts[f]}</span>
              </button>
            );
          })}
        </div>
        {selected.size > 0 && (
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12.5 }}>
            <span style={{ color: 'var(--mute)' }}>{selected.size}개 선택</span>
            <button onClick={() => bulkSet('approved')} style={btnGhost}>승인</button>
            <button onClick={() => bulkSet('rejected')} style={btnDanger}>거절</button>
          </div>
        )}
      </div>

      <div style={{ padding: '0 28px 28px' }}>
        <div style={panelStyle}>
          <table className="adm-table">
            <thead>
              <tr>
                <th style={{ width: 36 }}>
                  <input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0}
                    onChange={(e) => setSelected(e.target.checked ? new Set(filtered.map(c => c.id)) : new Set())}/>
                </th>
                <th>키워드</th>
                <th style={{ width: 96 }}>신호</th>
                <th style={{ width: 100 }}>X 언급</th>
                <th style={{ width: 130 }}>데이터랩</th>
                <th style={{ width: 84 }}>소스</th>
                <th style={{ width: 88 }}>최초 감지</th>
                <th style={{ width: 230 }}>액션</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td><input type="checkbox" checked={selected.has(c.id)} onChange={() => {
                    setSelected(s => {
                      const n = new Set(s);
                      n.has(c.id) ? n.delete(c.id) : n.add(c.id);
                      return n;
                    });
                  }}/></td>
                  <td>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{c.keyword}</div>
                    <div style={{ fontSize: 11, color: 'var(--mute)', marginTop: 1 }}>id · {c.id}</div>
                  </td>
                  <td>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '3px 9px', borderRadius: 999,
                      background: c.signal === 'rising' ? 'color-mix(in oklch, var(--go) 14%, var(--paper))'
                        : c.signal === 'flat' ? 'var(--bg-2)' : 'color-mix(in oklch, var(--late) 14%, var(--paper))',
                      fontSize: 11.5, fontWeight: 600,
                      color: c.signal === 'rising' ? 'var(--go)' : c.signal === 'flat' ? 'var(--ink-2)' : 'var(--late)',
                    }}>
                      {c.signal === 'rising' ? <Icons.Up size={12}/> : c.signal === 'flat' ? <Icons.Flat size={12}/> : <Icons.Down size={12}/>}
                      {c.signal === 'rising' ? '상승' : c.signal === 'flat' ? '평탄' : '하락'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{c.mentions}</span>
                      <span style={{ fontSize: 11, color: 'var(--mute)' }}>건</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        fontVariantNumeric: 'tabular-nums', fontWeight: 600,
                        color: c.datalab < 0 ? 'var(--late)' : 'var(--ink)',
                      }}>{c.datalab > 0 ? '+' : ''}{c.datalab}%</span>
                      <Sparkline data={fakeTrend(c.datalab)} width={56} height={18}/>
                    </div>
                  </td>
                  <td style={{ color: 'var(--ink-2)' }}>{c.sources}곳</td>
                  <td style={{ fontSize: 12, color: 'var(--mute)' }}>{c.first}</td>
                  <td>
                    {c.status === 'pending' && (
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button onClick={() => setStatus(c.id, 'approved')} style={btnPrimary}><Icons.Check size={13}/> 승인 → 카드</button>
                        <button onClick={() => setStatus(c.id, 'rejected')} style={{ ...btnGhost, padding: '8px 10px' }}><Icons.X size={13}/></button>
                      </div>
                    )}
                    {c.status === 'approved' && <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'var(--go)',
                    }}><Icons.Check size={14}/> 승인됨 · 편집 대기</span>}
                    {c.status === 'rejected' && <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'var(--late)',
                    }}><Icons.X size={14}/> 거절됨</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

function fakeTrend(delta) {
  // produce a 7-pt array that ends consistent with the delta
  const start = 50;
  const end = Math.max(8, Math.min(100, 50 + delta * 0.4));
  const arr = [];
  for (let i = 0; i < 7; i++) {
    const t = i / 6;
    arr.push(start + (end - start) * t + (Math.sin(i * 1.3) * 3));
  }
  return arr;
}

// ────────────────────────────────────────────────────────────────
// CARD EDITOR — for the first approved candidate ("코스트코 떠먹는 망고푸딩")
// ────────────────────────────────────────────────────────────────
const CardEditor = () => {
  const [card, setCard] = useStateA(CARDS[0]);
  const [activeField, setActiveField] = useStateA('what');
  const [timing, setTimingState] = useStateA(card.timing);
  const [draft, setDraft] = useStateA({
    title: card.title,
    what: card.what,
    why: card.why,
    angles: card.angles.join('\n'),
    hook: card.hook,
    cautions: card.cautions,
  });
  const [llmBusy, setLlmBusy] = useStateA(false);
  const [savedAt, setSavedAt] = useStateA('방금 자동 저장');

  const update = (k, v) => {
    setDraft(d => ({ ...d, [k]: v }));
    setSavedAt('편집 중…');
    clearTimeout(window.__trEditTimer);
    window.__trEditTimer = setTimeout(() => setSavedAt('방금 자동 저장'), 700);
  };
  const llmRegen = (k) => {
    setLlmBusy(true);
    setTimeout(() => {
      setLlmBusy(false);
      setSavedAt('LLM 재생성 완료');
    }, 900);
  };

  return (
    <>
      <TopBar
        sub={`초안 #${card.id} · ${card.publishedAt} 발행 예정`}
        title="카드 편집기"
        actions={(
          <>
            <span style={{ fontSize: 12, color: 'var(--mute)', alignSelf: 'center', marginRight: 8 }}>{savedAt}</span>
            <button style={btnGhost}>숨김 저장</button>
            <button style={btnGhost}>미리보기</button>
            <button style={btnPrimary}><Icons.Check size={14}/> 발행</button>
          </>
        )}
      />
      <div style={{
        flex: 1, display: 'grid', gridTemplateColumns: '1fr 360px',
        gap: 0, overflow: 'hidden',
      }}>
        {/* Left: editor */}
        <div style={{ padding: '20px 28px', overflowY: 'auto' }}>
          {/* Title */}
          <Field label="제목" right={<button onClick={() => llmRegen('title')} style={miniLlm}>{llmBusy ? '생성 중…' : 'LLM 재생성'}</button>}>
            <input value={draft.title} onChange={e => update('title', e.target.value)}
              style={titleInput}/>
          </Field>

          {/* Timing */}
          <Field label="타이밍 라벨">
            <div style={{ display: 'flex', gap: 8 }}>
              {['go','soon','late'].map(t => {
                const on = timing === t;
                return (
                  <button key={t} onClick={() => setTimingState(t)} style={{
                    flex: 1, padding: '12px 14px', borderRadius: 10,
                    background: on ? 'var(--ink)' : 'var(--paper)',
                    color: on ? 'var(--paper)' : 'var(--ink)',
                    border: '1px solid ' + (on ? 'var(--ink)' : 'var(--line)'),
                    cursor: 'pointer', textAlign: 'left',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <span style={{
                      width: 14, height: 14, borderRadius: '50%',
                      background: TIMING[t].color,
                      boxShadow: on ? `0 0 8px ${TIMING[t].color}` : 'none',
                    }}/>
                    <span>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{TIMING[t].label}</div>
                      <div style={{ fontSize: 11, opacity: 0.7 }}>{ {go:'초록 · 진입 권장', soon:'노랑 · 빠를수록', late:'빨강 · 비권장'}[t] }</div>
                    </span>
                  </button>
                );
              })}
            </div>
          </Field>

          <Field label="이게 뭔데?" right={<button onClick={() => llmRegen('what')} style={miniLlm}>LLM 재생성</button>}>
            <textarea value={draft.what} onChange={e => update('what', e.target.value)}
              rows={4} style={textArea}/>
          </Field>

          <Field label="왜 뜨는데?" right={<button onClick={() => llmRegen('why')} style={miniLlm}>LLM 재생성</button>}>
            <textarea value={draft.why} onChange={e => update('why', e.target.value)}
              rows={4} style={textArea}/>
          </Field>

          <Field label="콘텐츠 각도 (한 줄당 한 개)" right={<button onClick={() => llmRegen('angles')} style={miniLlm}>4개 더 생성</button>}>
            <textarea value={draft.angles} onChange={e => update('angles', e.target.value)}
              rows={5} style={textArea}/>
          </Field>

          <Field label="첫 3초 훅" right={<button onClick={() => llmRegen('hook')} style={miniLlm}>3안 제시</button>}>
            <textarea value={draft.hook} onChange={e => update('hook', e.target.value)}
              rows={2} style={{ ...textArea, fontWeight: 600 }}/>
          </Field>

          <Field label="주의점">
            <textarea value={draft.cautions} onChange={e => update('cautions', e.target.value)}
              rows={2} style={textArea}/>
          </Field>

          <Field label="근거 출처">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {card.sources.map((s, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px',
                  background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 9,
                }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.04em',
                    padding: '3px 7px', borderRadius: 4,
                    background: 'var(--bg-2)', color: 'var(--ink)',
                    minWidth: 64, textAlign: 'center',
                  }}>{s.kind}</span>
                  <span style={{ flex: 1, fontSize: 13 }}>{s.label}</span>
                  <button style={{ ...btnGhost, padding: '5px 9px' }}><Icons.Trash size={13}/></button>
                </div>
              ))}
              <button style={{ ...btnGhost, justifyContent: 'center', padding: '10px 0' }}>
                <Icons.Plus size={14}/> 소스 추가
              </button>
            </div>
          </Field>
        </div>

        {/* Right: live preview */}
        <div style={{
          borderLeft: '1px solid var(--line)',
          background: 'var(--bg-2)',
          padding: '20px 18px', overflowY: 'auto',
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          <div style={{ fontSize: 11, color: 'var(--mute)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            모바일 미리보기
          </div>

          {/* Phone-shaped preview */}
          <div style={{
            background: 'var(--bg)', borderRadius: 22,
            border: '8px solid #d8d3c8',
            boxShadow: '0 18px 40px rgba(0,0,0,0.12)',
            overflow: 'hidden',
            maxWidth: 290, alignSelf: 'center',
            width: '100%',
          }}>
            <div style={{ padding: '14px 14px 0' }}>
              <ThumbPlaceholder label={`HERO · ${draft.title}`} h={150}/>
            </div>
            <div style={{ padding: '12px 16px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '3px 8px', borderRadius: 999,
                  background: 'var(--paper)', border: '1px solid var(--line)',
                  fontSize: 10.5, fontWeight: 600,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: TIMING[timing].color }}/>
                  {TIMING[timing].label}
                </span>
              </div>
              <h4 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 8px', lineHeight: 1.25 }}>{draft.title}</h4>
              <p style={{ fontSize: 11.5, color: 'var(--ink-2)', lineHeight: 1.5, margin: '0 0 10px' }}>{draft.what?.slice(0, 130)}…</p>
              <div style={{
                padding: '8px 10px', background: 'var(--ink)', color: 'var(--paper)',
                borderRadius: 8, fontSize: 11, lineHeight: 1.4,
              }}>{draft.hook}</div>
            </div>
          </div>

          {/* LLM context */}
          <div style={panelStyle}>
            <PanelHeader title="LLM 생성 컨텍스트" sub="자동 첨부됨"/>
            <div style={{ padding: '12px 14px', fontSize: 12, lineHeight: 1.6, color: 'var(--ink-2)' }}>
              <div><b style={{ color: 'var(--ink)' }}>제품:</b> 코스트코 PB 망고푸딩 900g</div>
              <div><b style={{ color: 'var(--ink)' }}>가격:</b> 13,990원</div>
              <div><b style={{ color: 'var(--ink)' }}>최초 감지:</b> 4일 전 (@costco_kr_pick)</div>
              <div><b style={{ color: 'var(--ink)' }}>경쟁 콘텐츠:</b> 쇼츠 12편 (1만 조회+ 3편)</div>
            </div>
          </div>

          <div style={{ ...panelStyle, padding: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>리스크 체크</div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 11.5, color: 'var(--ink-2)', lineHeight: 1.6 }}>
              <li>코스트코 협찬 오인 가능 → 가격 출처 명시 OK</li>
              <li>품절/가격 변동 멘트 → 주의점에 포함 OK</li>
              <li>X 본문 직접 인용 없음 OK</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

const Field = ({ label, right, children }) => (
  <div style={{ marginBottom: 18 }}>
    <div style={{
      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      marginBottom: 8,
    }}>
      <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-2)' }}>{label}</label>
      {right}
    </div>
    {children}
  </div>
);

const titleInput = {
  width: '100%', padding: '12px 14px', borderRadius: 9,
  border: '1px solid var(--line)', background: 'var(--paper)',
  fontSize: 18, fontWeight: 700, fontFamily: 'inherit', letterSpacing: '-0.02em',
  color: 'var(--ink)', outline: 'none', boxSizing: 'border-box',
};

const textArea = {
  width: '100%', padding: '12px 14px', borderRadius: 9,
  border: '1px solid var(--line)', background: 'var(--paper)',
  fontSize: 13.5, fontFamily: 'inherit', letterSpacing: '-0.005em',
  color: 'var(--ink)', outline: 'none', boxSizing: 'border-box',
  lineHeight: 1.5, resize: 'vertical',
};

const miniLlm = {
  fontSize: 10.5, fontWeight: 600, letterSpacing: '0.02em',
  padding: '4px 9px', borderRadius: 6,
  background: 'var(--ink)', color: 'var(--paper)',
  border: 0, cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', gap: 5,
};

// ────────────────────────────────────────────────────────────────
// ACCOUNTS / BLOCKLIST
// ────────────────────────────────────────────────────────────────
const Accounts = () => {
  const [accounts, setAccounts] = useStateA(ACCOUNTS);
  const [block, setBlock]       = useStateA(BLOCKLIST);
  const [newKw, setNewKw]       = useStateA('');

  return (
    <>
      <TopBar
        sub="소스 운영"
        title="X 계정 · 블록리스트"
        actions={(<><button style={btnGhost}>CSV 내보내기</button><button style={btnPrimary}><Icons.Plus size={14}/> 새 계정</button></>)}
      />
      <div style={{ padding: '20px 28px', display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 14 }}>
        {/* X accounts */}
        <div style={panelStyle}>
          <PanelHeader title="X 계정" sub={`${accounts.length}개 · 활성 ${accounts.filter(a => a.enabled).length}개`}/>
          <table className="adm-table">
            <thead>
              <tr>
                <th>핸들</th>
                <th style={{ width: 90 }}>신뢰도</th>
                <th style={{ width: 96 }}>수집 주기</th>
                <th style={{ width: 90 }}>이번 달</th>
                <th>메모</th>
                <th style={{ width: 78 }}>상태</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(a => (
                <tr key={a.id}>
                  <td>
                    <span style={{ fontSize: 13.5, fontWeight: 600 }}>{a.handle}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} style={{
                          width: 12, height: 4, borderRadius: 2,
                          background: i < a.trust ? 'var(--ink)' : 'var(--line)',
                        }}/>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span style={{
                      fontSize: 11.5, padding: '3px 8px', borderRadius: 999,
                      background: a.interval === '4h' ? 'var(--ink)' : 'var(--bg-2)',
                      color: a.interval === '4h' ? 'var(--paper)' : 'var(--ink-2)',
                      fontWeight: 600,
                    }}>{a.interval}</span>
                  </td>
                  <td style={{ fontVariantNumeric: 'tabular-nums' }}>{a.posts}</td>
                  <td style={{ fontSize: 12, color: 'var(--mute)' }}>{a.notes || '—'}</td>
                  <td>
                    <button onClick={() => setAccounts(L => L.map(x => x.id === a.id ? {...x, enabled: !x.enabled} : x))} style={{
                      width: 38, height: 22, borderRadius: 12,
                      background: a.enabled ? 'var(--ink)' : 'var(--line)',
                      border: 0, padding: 0, cursor: 'pointer', position: 'relative',
                    }}>
                      <span style={{
                        position: 'absolute', top: 2,
                        left: a.enabled ? 18 : 2,
                        width: 18, height: 18, borderRadius: '50%',
                        background: 'var(--paper)',
                        transition: 'left .15s',
                      }}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: blocklist + X usage */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={panelStyle}>
            <PanelHeader title="X API 사용량" sub="이번 달"/>
            <div style={{ padding: '16px 18px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>9.4k</span>
                <span style={{ fontSize: 12, color: 'var(--mute)' }}>/ 15k reads</span>
              </div>
              <div style={{ height: 6, background: 'var(--line)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: '62.8%', height: '100%', background: 'var(--ink)' }}/>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 11.5, color: 'var(--mute)' }}>
                <span>주기 차등화로 안전 구간 유지</span>
                <span>예상 월말: 13.8k</span>
              </div>
            </div>
          </div>

          <div style={panelStyle}>
            <PanelHeader title="블록리스트" sub={`${block.length}개 · 후보에서 자동 제외`}/>
            <div style={{ padding: '12px 14px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {block.map(b => (
                <span key={b} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '4px 4px 4px 10px', borderRadius: 999,
                  background: 'var(--bg-2)', fontSize: 12,
                }}>
                  {b}
                  <button onClick={() => setBlock(L => L.filter(x => x !== b))} style={{
                    width: 18, height: 18, borderRadius: '50%',
                    background: 'transparent', border: 0, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--mute)',
                  }}><Icons.Close size={11}/></button>
                </span>
              ))}
            </div>
            <div style={{ padding: '0 14px 14px', display: 'flex', gap: 6 }}>
              <input value={newKw} onChange={e => setNewKw(e.target.value)}
                placeholder="키워드 추가"
                style={{
                  flex: 1, padding: '8px 12px', borderRadius: 8,
                  border: '1px solid var(--line)', outline: 'none',
                  fontSize: 13, fontFamily: 'inherit', background: 'var(--paper)',
                }}/>
              <button onClick={() => {
                if (newKw.trim()) { setBlock(b => [...b, newKw.trim()]); setNewKw(''); }
              }} style={btnPrimary}>추가</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ────────────────────────────────────────────────────────────────
// Root
// ────────────────────────────────────────────────────────────────
const AdminConsole = ({ startView = 'dashboard' }) => {
  const [view, setView] = useStateA(startView);
  return (
    <ChromeWindow
      tabs={[
        { title: 'Trend Radar · 운영자 콘솔', active: true },
        { title: '데이터랩' },
        { title: 'X · TweetDeck' },
      ]}
      activeIndex={0}
      url="ops.trendradar.kr/admin"
      width={1280} height={820}
    >
      <div style={{
        display: 'flex', height: '100%',
        background: 'var(--bg)', color: 'var(--ink)',
        fontFamily: 'inherit',
      }}>
        <AdminSidebar view={view} onView={setView}/>
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {view === 'dashboard'  && <Dashboard  onView={setView}/>}
            {view === 'candidates' && <Candidates onView={setView}/>}
            {view === 'editor'     && <CardEditor/>}
            {view === 'accounts'   && <Accounts/>}
          </div>
        </main>
      </div>
    </ChromeWindow>
  );
};

Object.assign(window, { AdminConsole });
