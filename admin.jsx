// admin.jsx — Operator console screens

const { useState: useStateA } = React;

// ─── Admin Top Bar ────────────────────────────────────────────
function AdminTopBar({ tab, onTab, onExit }) {
  const tabs = [
    { k: "dash", label: "대시보드" },
    { k: "cand", label: "후보" },
    { k: "cards", label: "카드" },
    { k: "accs", label: "계정" },
  ];
  return (
    <div style={{
      background: "var(--tr-fg)", color: "var(--tr-bg)",
      padding: "8px 12px 0",
    }}>
      <div style={{
        display: "flex", alignItems: "center", padding: "8px 8px 14px", gap: 10,
      }}>
        <button onClick={onExit} style={{
          width: 32, height: 32, border: 0, borderRadius: 100, cursor: "pointer",
          background: "rgba(255,255,255,0.1)", color: "var(--tr-bg)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}><IconBack size={18} /></button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10.5, opacity: 0.6, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>
            Operator Console
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 2 }}>
            트렌드 레이더
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 500, opacity: 0.7 }}>
          <span style={{ width: 6, height: 6, borderRadius: 100, background: "var(--tr-green)" }} />
          ONLINE
        </div>
      </div>
      <div style={{ display: "flex", gap: 4, overflowX: "auto" }} className="tr-no-scrollbar">
        {tabs.map(t => (
          <button key={t.k} onClick={() => onTab(t.k)} style={{
            padding: "10px 14px", border: 0, background: "transparent", cursor: "pointer",
            color: tab === t.k ? "var(--tr-bg)" : "rgba(255,255,255,0.5)",
            fontSize: 13.5, fontWeight: tab === t.k ? 600 : 500, letterSpacing: "-0.01em",
            position: "relative", whiteSpace: "nowrap",
          }}>
            {t.label}
            {tab === t.k && <div style={{
              position: "absolute", bottom: 0, left: 8, right: 8, height: 2, background: "var(--tr-bg)", borderRadius: 100,
            }} />}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────
function AdminDashboard({ onTab }) {
  const s = window.TR_DATA.STATS;
  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <div style={{ marginBottom: 8, fontSize: 12.5, color: "var(--tr-muted)", fontWeight: 500 }}>
        2026년 5월 18일 · 09:42
      </div>
      <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: "-0.03em" }}>
        오늘 아침 작업
      </h2>

      {/* TODO list */}
      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        <TodoCard
          status="now"
          title="후보 키워드 6개 검토"
          sub="네이버 데이터랩 그래프 + 인스타 해시태그 확인"
          time="20분"
          onClick={() => onTab("cand")}
        />
        <TodoCard
          status="next"
          title="카드 초안 검수 · 8장"
          sub="LLM 초안 → 타이밍 라벨 부착 → 발행"
          time="40분"
          onClick={() => onTab("cards")}
        />
        <TodoCard
          status="done"
          title="X 수집 / 데이터랩 배치"
          sub="새벽 4시 자동 실행 · 142건 수집"
        />
      </div>

      {/* Key stats */}
      <div style={{ marginTop: 28 }}>
        <SectionLabel>오늘의 숫자</SectionLabel>
        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <StatTile big={s.todayPublished} label="발행 완료" accent />
          <StatTile big={s.todayDraft} label="초안 대기" />
          <StatTile big={s.candidates} label="후보 검토 대기" />
          <StatTile big={s.collectedX + s.collectedNaver} label="수집 신호" />
        </div>
      </div>

      {/* Weekly bar */}
      <div style={{ marginTop: 28 }}>
        <SectionLabel>주간 발행</SectionLabel>
        <WeeklyChart data={s.weekly} />
      </div>

      {/* API usage */}
      <div style={{ marginTop: 28 }}>
        <SectionLabel>X API 사용량</SectionLabel>
        <div style={{
          marginTop: 12, padding: "16px 18px", borderRadius: 14, background: "var(--tr-card-2)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
            <div>
              <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.025em",
                            fontFamily: "'Space Grotesk', sans-serif" }}>
                {s.apiUsage.used.toLocaleString()}
              </span>
              <span style={{ fontSize: 13, color: "var(--tr-muted)", marginLeft: 6 }}>
                / {s.apiUsage.limit.toLocaleString()} reads
              </span>
            </div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--tr-green)" }}>
              여유 있음
            </div>
          </div>
          <div style={{
            height: 8, borderRadius: 100, background: "var(--tr-bg)", overflow: "hidden",
          }}>
            <div style={{
              width: `${(s.apiUsage.used / s.apiUsage.limit) * 100}%`,
              height: "100%", background: "var(--tr-fg)", borderRadius: 100,
            }} />
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: "var(--tr-muted)" }}>
            예상 월말 도달 12,400 reads · 한도 17% 여유
          </div>
        </div>
      </div>

      {/* Cost */}
      <div style={{ marginTop: 28 }}>
        <SectionLabel>월 비용 현황</SectionLabel>
        <div style={{
          marginTop: 12, padding: "16px 18px", borderRadius: 14, background: "var(--tr-card-2)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.025em",
                          fontFamily: "'Space Grotesk', sans-serif" }}>
              ₩342,180
            </div>
            <div style={{ fontSize: 11.5, color: "var(--tr-muted)", marginTop: 4 }}>
              한도 ₩500,000 · 32% 여유
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 11, color: "var(--tr-muted)" }}>
            <Row k="X API" v="₩300,000" />
            <Row k="LLM" v="₩37,180" />
            <Row k="서버 외" v="₩5,000" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
      <span style={{ minWidth: 48 }}>{k}</span>
      <span style={{ color: "var(--tr-fg)", fontWeight: 500, fontFamily: "'Space Grotesk', sans-serif", fontVariantNumeric: "tabular-nums" }}>{v}</span>
    </div>
  );
}

function TodoCard({ status, title, sub, time, onClick }) {
  const ui = {
    now:  { dot: "var(--tr-red)",    label: "지금" },
    next: { dot: "var(--tr-yellow)", label: "다음" },
    done: { dot: "var(--tr-green)",  label: "완료" },
  }[status];
  return (
    <div onClick={onClick} style={{
      padding: "14px 16px", borderRadius: 14, background: "var(--tr-card-2)",
      display: "flex", alignItems: "center", gap: 12,
      cursor: onClick ? "pointer" : "default",
      opacity: status === "done" ? 0.55 : 1,
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 36 }}>
        <span style={{ width: 8, height: 8, borderRadius: 100, background: ui.dot }} />
        <span style={{ fontSize: 9.5, color: "var(--tr-muted)", fontWeight: 600, letterSpacing: "0.05em" }}>{ui.label}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em",
                      textDecoration: status === "done" ? "line-through" : "none" }}>
          {title}
        </div>
        <div style={{ fontSize: 12.5, color: "var(--tr-muted)", marginTop: 3 }}>{sub}</div>
      </div>
      {time && <div style={{
        fontSize: 11, color: "var(--tr-muted)", fontWeight: 600, fontVariantNumeric: "tabular-nums",
      }}>{time}</div>}
      {onClick && <IconChevronRight size={16} stroke="var(--tr-muted)" />}
    </div>
  );
}

function StatTile({ big, label, accent }) {
  return (
    <div style={{
      padding: "16px 14px", borderRadius: 14,
      background: accent ? "var(--tr-accent)" : "var(--tr-card-2)",
      color: accent ? "var(--tr-accent-fg)" : "var(--tr-fg)",
    }}>
      <div style={{
        fontSize: 28, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1,
        fontFamily: "'Space Grotesk', 'Pretendard', sans-serif",
      }}>{big}</div>
      <div style={{
        fontSize: 11.5, marginTop: 8, fontWeight: 500, opacity: accent ? 0.75 : 0.65,
      }}>{label}</div>
    </div>
  );
}

function WeeklyChart({ data }) {
  const max = Math.max(...data);
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  return (
    <div style={{
      marginTop: 12, padding: "16px 18px", borderRadius: 14, background: "var(--tr-card-2)",
    }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 90 }}>
        {data.map((v, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ height: "100%", display: "flex", alignItems: "flex-end", width: "100%" }}>
              <div style={{
                width: "100%", height: `${(v / max) * 100}%`, borderRadius: 4,
                background: i === data.length - 1 ? "var(--tr-fg)" : "var(--tr-line)",
                minHeight: 4, transition: "height .3s",
              }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        {days.map((d, i) => (
          <div key={d} style={{
            flex: 1, fontSize: 10, textAlign: "center", color: "var(--tr-muted)",
            fontWeight: i === days.length - 1 ? 700 : 500,
          }}>
            <div>{d}</div>
            <div style={{ marginTop: 2, fontWeight: 600,
                          fontFamily: "'Space Grotesk', sans-serif",
                          color: i === days.length - 1 ? "var(--tr-fg)" : "var(--tr-muted)" }}>
              {data[i]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Candidate Review ─────────────────────────────────────────
function AdminCandidates() {
  const { CANDIDATES } = window.TR_DATA;
  const [items, setItems] = useStateA(CANDIDATES.map(c => ({ ...c, status: "pending" })));
  const [expanded, setExpanded] = useStateA(null);
  const pending = items.filter(c => c.status === "pending");
  const handled = items.filter(c => c.status !== "pending");

  const decide = (id, status) => {
    setItems(items.map(c => c.id === id ? { ...c, status } : c));
    setExpanded(null);
  };

  return (
    <div style={{ padding: "16px 16px 100px" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em" }}>
          후보 키워드 <span style={{ color: "var(--tr-muted)" }}>{pending.length}</span>
        </h2>
        <button style={{
          padding: "6px 10px", border: 0, borderRadius: 100, background: "var(--tr-card-2)",
          fontSize: 12, fontWeight: 500, color: "var(--tr-fg)", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 4,
        }}>
          <IconFilter size={13} />필터
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {pending.map(c => (
          <CandidateCard key={c.id} c={c}
            open={expanded === c.id}
            onToggle={() => setExpanded(expanded === c.id ? null : c.id)}
            onApprove={() => decide(c.id, "approved")}
            onReject={() => decide(c.id, "rejected")}
          />
        ))}
      </div>

      {handled.length > 0 && (
        <div style={{ marginTop: 28 }}>
          <SectionLabel>방금 처리한 항목 · {handled.length}</SectionLabel>
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
            {handled.map(c => (
              <div key={c.id} style={{
                padding: "10px 14px", borderRadius: 12, background: "var(--tr-card-2)",
                display: "flex", alignItems: "center", gap: 10, opacity: 0.6,
              }}>
                <span style={{
                  fontSize: 9.5, fontWeight: 700, letterSpacing: "0.05em",
                  padding: "3px 7px", borderRadius: 4,
                  background: c.status === "approved" ? "var(--tr-green)" : "var(--tr-line)",
                  color: c.status === "approved" ? "#fff" : "var(--tr-fg)",
                }}>{c.status === "approved" ? "승인" : "거절"}</span>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{c.keyword}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CandidateCard({ c, open, onToggle, onApprove, onReject }) {
  const conf = Math.round(c.confidence * 100);
  return (
    <div style={{
      borderRadius: 14, background: "var(--tr-card-2)", overflow: "hidden",
      transition: "background .2s",
    }}>
      <div onClick={onToggle} style={{ padding: "14px 16px", cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.05em",
                padding: "3px 7px", borderRadius: 4,
                background: "var(--tr-bg)", color: "var(--tr-muted)",
              }}>{c.category.toUpperCase()}</span>
              <span style={{ fontSize: 11, color: "var(--tr-muted)" }}>· {c.firstSeen}</span>
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.025em" }}>
              {c.keyword}
            </div>
          </div>
          <ConfidenceRing conf={conf} />
        </div>

        <div style={{
          marginTop: 10, display: "flex", gap: 8, fontSize: 11.5, color: "var(--tr-muted)", fontWeight: 500,
        }}>
          <SourceCount type="x" n={c.sources.x} />
          <SourceCount type="insta" n={c.sources.insta} />
          <SourceCount type="naver" n={c.sources.naver} />
        </div>

        {!open && (
          <div style={{ marginTop: 10, fontSize: 12.5, color: "var(--tr-muted)", lineHeight: 1.4 }}>
            {c.note}
          </div>
        )}
      </div>

      {open && (
        <div style={{ padding: "0 16px 14px" }}>
          <div style={{
            padding: "12px 14px", background: "var(--tr-bg)", borderRadius: 10,
            fontSize: 13, lineHeight: 1.55, marginBottom: 12,
          }}>{c.note}</div>

          {/* mini chart preview */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10.5, color: "var(--tr-muted)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>
              네이버 데이터랩 (14일)
            </div>
            <MiniChart trend="up" />
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onReject} style={{
              flex: 1, padding: "12px", border: "1px solid var(--tr-line)", borderRadius: 12,
              background: "transparent", color: "var(--tr-fg)", cursor: "pointer",
              fontSize: 13.5, fontWeight: 600, letterSpacing: "-0.01em",
            }}>거절</button>
            <button onClick={onApprove} style={{
              flex: 2, padding: "12px", border: 0, borderRadius: 12,
              background: "var(--tr-fg)", color: "var(--tr-bg)", cursor: "pointer",
              fontSize: 13.5, fontWeight: 600, letterSpacing: "-0.01em",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              <IconCheck size={15} />승인 · 카드 초안 생성
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SourceCount({ type, n }) {
  const labels = { x: "X", insta: "IG", naver: "Naver" };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      <span style={{
        fontSize: 9, fontWeight: 700, padding: "2px 5px", borderRadius: 3,
        background: "var(--tr-bg)", color: "var(--tr-muted)", letterSpacing: "0.04em",
      }}>{labels[type]}</span>
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "var(--tr-fg)" }}>{n}</span>
    </span>
  );
}

function ConfidenceRing({ conf }) {
  const R = 18, C = 2 * Math.PI * R;
  const color = conf >= 80 ? "var(--tr-green)" : conf >= 60 ? "var(--tr-yellow)" : "var(--tr-red)";
  return (
    <div style={{ position: "relative", width: 44, height: 44, flexShrink: 0 }}>
      <svg width="44" height="44" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r={R} fill="none" stroke="var(--tr-bg)" strokeWidth="4" />
        <circle cx="22" cy="22" r={R} fill="none" stroke={color} strokeWidth="4"
                strokeDasharray={C} strokeDashoffset={C - (conf / 100) * C}
                transform="rotate(-90 22 22)" strokeLinecap="round" />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em",
      }}>{conf}</div>
    </div>
  );
}

function MiniChart({ trend = "up" }) {
  const points = trend === "up"
    ? [22, 18, 24, 20, 19, 23, 28, 24, 30, 35, 38, 45, 52, 58]
    : [40, 38, 35, 32, 30, 28, 25, 26, 24, 22, 20, 19, 18, 16];
  const W = 280, H = 60;
  const xStep = W / (points.length - 1);
  const max = Math.max(...points), min = Math.min(...points);
  const path = points.map((p, i) => {
    const x = i * xStep, y = H - ((p - min) / (max - min)) * (H - 8) - 4;
    return `${i === 0 ? "M" : "L"}${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: "100%", height: 60, display: "block" }}>
      <defs>
        <linearGradient id="mcg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--tr-fg)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--tr-fg)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L${W},${H} L0,${H} Z`} fill="url(#mcg)" />
      <path d={path} fill="none" stroke="var(--tr-fg)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Card List + Editor ───────────────────────────────────────
function AdminCards() {
  const { CARDS } = window.TR_DATA;
  const [editId, setEditId] = useStateA(null);
  const [filter, setFilter] = useStateA("all");
  const list = filter === "all" ? CARDS : CARDS.filter(c => filter === "draft" ? c.timing === "yellow" : c.timing !== "yellow");

  if (editId) {
    const card = CARDS.find(c => c.id === editId);
    return <CardEditor card={card} onBack={() => setEditId(null)} />;
  }

  return (
    <div style={{ padding: "16px 16px 100px" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em" }}>카드</h2>
        <button style={{
          padding: "8px 12px", border: 0, borderRadius: 100,
          background: "var(--tr-fg)", color: "var(--tr-bg)", cursor: "pointer",
          fontSize: 12.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 4,
        }}>
          <IconPlus size={14} />새 카드
        </button>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {[
          { k: "all", l: "전체" },
          { k: "draft", l: "초안 3" },
          { k: "pub", l: "발행 8" },
        ].map(t => (
          <button key={t.k} onClick={() => setFilter(t.k)} style={{
            padding: "6px 12px", border: 0, borderRadius: 100,
            background: filter === t.k ? "var(--tr-fg)" : "var(--tr-card-2)",
            color: filter === t.k ? "var(--tr-bg)" : "var(--tr-fg)",
            fontSize: 12.5, fontWeight: 500, cursor: "pointer",
          }}>{t.l}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {list.map(c => (
          <div key={c.id} onClick={() => setEditId(c.id)} style={{
            padding: "12px 14px", borderRadius: 12, background: "var(--tr-card-2)", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{ width: 48, height: 48, flexShrink: 0 }}>
              <Cover cover={c.cover} height={48} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <span style={{
                  width: 6, height: 6, borderRadius: 100, background: `var(--tr-${c.timing})`,
                }} />
                <span style={{ fontSize: 11, color: "var(--tr-muted)", fontWeight: 500 }}>
                  발행 {c.publishedAt} · {c.category}
                </span>
              </div>
              <div style={{
                fontSize: 14.5, fontWeight: 600, letterSpacing: "-0.02em",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>{c.title}</div>
            </div>
            <IconChevronRight size={16} stroke="var(--tr-muted)" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CardEditor({ card, onBack }) {
  const [draft, setDraft] = useStateA(card);
  const [generating, setGenerating] = useStateA(false);
  const update = (k, v) => setDraft({ ...draft, [k]: v });
  const generate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 1400);
  };

  return (
    <div style={{ padding: "12px 16px 140px" }}>
      <button onClick={onBack} style={{
        display: "flex", alignItems: "center", gap: 6, border: 0, background: "transparent",
        color: "var(--tr-muted)", fontSize: 13, fontWeight: 500, padding: "4px 0 12px", cursor: "pointer",
      }}>
        <IconBack size={16} />카드 목록
      </button>

      <Cover cover={draft.cover} height={140} />

      <div style={{ marginTop: 16 }}>
        <FieldLabel>제목</FieldLabel>
        <input value={draft.title} onChange={e => update("title", e.target.value)} style={editorInput} />
      </div>

      <div style={{ marginTop: 14 }}>
        <FieldLabel>타이밍 라벨</FieldLabel>
        <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
          {["green", "yellow", "red"].map(t => (
            <button key={t} onClick={() => update("timing", t)} style={{
              flex: 1, padding: "10px", border: draft.timing === t ? "1.5px solid var(--tr-fg)" : "1.5px solid var(--tr-line)",
              borderRadius: 12, background: "transparent", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              fontSize: 12.5, fontWeight: 600, color: "var(--tr-fg)",
            }}>
              <span style={{ width: 10, height: 10, borderRadius: 100, background: `var(--tr-${t})` }} />
              {TIMING[t].text}
            </button>
          ))}
        </div>
      </div>

      {/* AI draft button */}
      <button onClick={generate} disabled={generating} style={{
        marginTop: 16, width: "100%", padding: "14px", border: 0, borderRadius: 14,
        background: "var(--tr-fg)", color: "var(--tr-bg)", cursor: generating ? "default" : "pointer",
        fontSize: 13.5, fontWeight: 600, letterSpacing: "-0.01em",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        opacity: generating ? 0.7 : 1,
      }}>
        <IconSparkle size={16} style={generating ? { animation: "tr-spin 1s linear infinite" } : {}} />
        {generating ? "LLM 초안 생성 중…" : "LLM으로 본문 초안 생성"}
      </button>

      <div style={{ marginTop: 16 }}>
        <FieldLabel>이게 뭔데?</FieldLabel>
        <textarea value={draft.what} onChange={e => update("what", e.target.value)} rows={3} style={editorInput} />
      </div>
      <div style={{ marginTop: 14 }}>
        <FieldLabel>왜 뜨는데?</FieldLabel>
        <textarea value={draft.why} onChange={e => update("why", e.target.value)} rows={3} style={editorInput} />
      </div>
      <div style={{ marginTop: 14 }}>
        <FieldLabel>3초 훅</FieldLabel>
        <input value={draft.hook} onChange={e => update("hook", e.target.value)} style={editorInput} />
      </div>
      <div style={{ marginTop: 14 }}>
        <FieldLabel>콘텐츠 각도</FieldLabel>
        <textarea value={draft.angle} onChange={e => update("angle", e.target.value)} rows={3} style={editorInput} />
      </div>
      <div style={{ marginTop: 14 }}>
        <FieldLabel>주의점</FieldLabel>
        <textarea value={draft.caution} onChange={e => update("caution", e.target.value)} rows={2} style={editorInput} />
      </div>

      {/* Sources */}
      <div style={{ marginTop: 14 }}>
        <FieldLabel>출처 링크</FieldLabel>
        <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 6 }}>
          {draft.sources.map((s, i) => (
            <div key={i} style={{
              padding: "10px 12px", borderRadius: 10, background: "var(--tr-card-2)",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <SourceIcon type={s.type} />
              <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{s.label}</span>
              <button style={{ border: 0, background: "transparent", color: "var(--tr-muted)", cursor: "pointer", padding: 4 }}>
                <IconTrash size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const editorInput = {
  width: "100%", marginTop: 6, padding: "12px 14px",
  border: "1px solid var(--tr-line)", borderRadius: 12,
  background: "var(--tr-bg)", color: "var(--tr-fg)", outline: "none",
  fontSize: 14, fontFamily: "inherit", lineHeight: 1.5, resize: "vertical",
  letterSpacing: "-0.01em", boxSizing: "border-box",
};

function FieldLabel({ children }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 600, letterSpacing: "0.05em",
      textTransform: "uppercase", color: "var(--tr-muted)",
    }}>{children}</div>
  );
}

// Sticky publish bar for editor
function PublishBar({ visible }) {
  if (!visible) return null;
  return (
    <div style={{
      position: "absolute", left: 0, right: 0, bottom: 0,
      padding: "12px 16px 16px", background: "var(--tr-bg)",
      borderTop: "1px solid var(--tr-line)", display: "flex", gap: 8, zIndex: 15,
    }}>
      <button style={{
        flex: 1, padding: "13px", border: "1px solid var(--tr-line)", borderRadius: 12,
        background: "transparent", color: "var(--tr-fg)", cursor: "pointer",
        fontSize: 13.5, fontWeight: 600,
      }}>임시저장</button>
      <button style={{
        flex: 2, padding: "13px", border: 0, borderRadius: 12,
        background: "var(--tr-fg)", color: "var(--tr-bg)", cursor: "pointer",
        fontSize: 13.5, fontWeight: 600,
      }}>발행하기</button>
    </div>
  );
}

// ─── Accounts / Blocklist ─────────────────────────────────────
function AdminAccounts() {
  const { ACCOUNTS, BLOCKLIST } = window.TR_DATA;
  const [accs, setAccs] = useStateA(ACCOUNTS);
  const [blocks, setBlocks] = useStateA(BLOCKLIST);
  const [newBlock, setNewBlock] = useStateA("");

  const toggleAcc = (h) => setAccs(accs.map(a => a.handle === h ? { ...a, enabled: !a.enabled } : a));
  const addBlock = () => {
    const v = newBlock.trim();
    if (v && !blocks.includes(v)) { setBlocks([...blocks, v]); setNewBlock(""); }
  };
  const removeBlock = (b) => setBlocks(blocks.filter(x => x !== b));

  return (
    <div style={{ padding: "16px 16px 100px" }}>
      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em" }}>소스 관리</h2>

      <div style={{ marginTop: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <SectionLabel>X 계정 · {accs.filter(a => a.enabled).length}/{accs.length}</SectionLabel>
          <button style={{
            padding: "5px 10px", border: 0, borderRadius: 100, background: "var(--tr-card-2)",
            fontSize: 12, fontWeight: 500, color: "var(--tr-fg)", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 4,
          }}><IconPlus size={12} />추가</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {accs.map(a => <AccountRow key={a.handle} a={a} onToggle={() => toggleAcc(a.handle)} />)}
        </div>
      </div>

      <div style={{ marginTop: 28 }}>
        <SectionLabel>키워드 블록리스트 · {blocks.length}</SectionLabel>
        <div style={{
          marginTop: 10, padding: "12px 14px", borderRadius: 14, background: "var(--tr-card-2)",
          display: "flex", flexWrap: "wrap", gap: 6,
        }}>
          {blocks.map(b => (
            <span key={b} style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              padding: "5px 8px 5px 10px", borderRadius: 100, background: "var(--tr-bg)",
              fontSize: 12.5, fontWeight: 500, letterSpacing: "-0.01em",
            }}>
              {b}
              <button onClick={() => removeBlock(b)} style={{
                border: 0, background: "transparent", color: "var(--tr-muted)", cursor: "pointer",
                padding: 0, display: "flex",
              }}><IconClose size={13} /></button>
            </span>
          ))}
          <input value={newBlock} onChange={e => setNewBlock(e.target.value)}
                 onKeyDown={e => e.key === "Enter" && addBlock()}
                 placeholder="키워드 추가 + Enter"
                 style={{
                   flex: 1, minWidth: 100, border: 0, background: "transparent", outline: "none",
                   fontSize: 13, color: "var(--tr-fg)", padding: "5px 4px", fontFamily: "inherit",
                 }} />
        </div>
      </div>

      <div style={{ marginTop: 28 }}>
        <SectionLabel>네이버 데이터랩 연결</SectionLabel>
        <div style={{
          marginTop: 10, padding: "14px 16px", borderRadius: 14, background: "var(--tr-card-2)",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: "var(--tr-green)", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}><IconChart size={18} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>음식 분야 · 10/20대 필터</div>
            <div style={{ fontSize: 11.5, color: "var(--tr-muted)", marginTop: 2 }}>일 1회 자동 수집 · 마지막 04:00</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "var(--tr-green)", fontWeight: 600 }}>
            <span style={{ width: 6, height: 6, borderRadius: 100, background: "var(--tr-green)" }} />정상
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountRow({ a, onToggle }) {
  const trustDots = Array.from({ length: 5 }).map((_, i) => i < a.trust);
  return (
    <div style={{
      padding: "12px 14px", borderRadius: 12, background: "var(--tr-card-2)",
      display: "flex", alignItems: "center", gap: 12,
      opacity: a.enabled ? 1 : 0.4,
      transition: "opacity .2s",
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14, fontWeight: 600, letterSpacing: "-0.015em",
          }}>{a.handle}</span>
          <span style={{
            fontSize: 9.5, fontWeight: 700, padding: "2px 5px", borderRadius: 3,
            background: "var(--tr-bg)", color: "var(--tr-muted)",
          }}>{a.freq}</span>
        </div>
        <div style={{ fontSize: 11.5, color: "var(--tr-muted)" }}>
          {a.category} · 마지막 {a.lastCheck}
        </div>
      </div>
      <div style={{ display: "flex", gap: 2, marginRight: 6 }}>
        {trustDots.map((on, i) => (
          <span key={i} style={{
            width: 5, height: 5, borderRadius: 100,
            background: on ? "var(--tr-fg)" : "var(--tr-line)",
          }} />
        ))}
      </div>
      <Toggle on={a.enabled} onChange={onToggle} />
    </div>
  );
}

Object.assign(window, {
  AdminTopBar, AdminDashboard, AdminCandidates, AdminCards, AdminAccounts, PublishBar,
});
