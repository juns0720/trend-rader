// user.jsx — User-facing screens: onboarding, home, detail, search, bookmarks, profile

const { useState, useEffect, useRef, useMemo } = React;

// ─── Shared bits ──────────────────────────────────────────────
const TIMING = {
  green:  { dot: "var(--tr-green)",  text: "지금 타도 됨" },
  yellow: { dot: "var(--tr-yellow)", text: "빠르면 좋음" },
  red:    { dot: "var(--tr-red)",    text: "이미 늦은 듯" },
};

function TimingPill({ timing, size = "sm" }) {
  const t = TIMING[timing];
  const pad = size === "sm" ? "4px 9px 4px 8px" : "6px 12px 6px 10px";
  const fs = size === "sm" ? 11 : 12.5;
  return (
    <span className="tr-pill" style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: pad, borderRadius: 100, fontSize: fs, fontWeight: 500,
      background: "var(--tr-pill-bg)", color: "var(--tr-pill-fg)",
      letterSpacing: "-0.01em", whiteSpace: "nowrap",
    }}>
      <span style={{ width: 7, height: 7, borderRadius: 100, background: t.dot, display: "inline-block" }} />
      {t.text}
    </span>
  );
}

function TrafficLight({ active }) {
  // visual representation of all 3 dots
  const colors = ["green", "yellow", "red"];
  return (
    <div style={{ display: "inline-flex", gap: 3, padding: "3px 5px", background: "var(--tr-card-2)", borderRadius: 100 }}>
      {colors.map(c => (
        <span key={c} style={{
          width: 8, height: 8, borderRadius: 100,
          background: active === c ? `var(--tr-${c})` : "var(--tr-dot-off)",
          transition: "background .2s",
        }} />
      ))}
    </div>
  );
}

// Cover image: stylized colored block w/ display text (placeholder for real image)
function Cover({ cover, height = 220, style }) {
  const { hue, sat, lum, label } = cover;
  // monochrome variant if accent toggled
  const bg = `hsl(${hue} ${sat}% ${lum}%)`;
  const bg2 = `hsl(${hue} ${Math.max(0, sat - 20)}% ${Math.max(20, lum - 25)}%)`;
  return (
    <div style={{
      position: "relative", width: "100%", height, borderRadius: "var(--tr-card-radius)",
      overflow: "hidden", background: `linear-gradient(155deg, ${bg} 0%, ${bg2} 100%)`,
      ...style,
    }}>
      {/* halftone-ish grain */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(at 30% 20%, rgba(255,255,255,.25), transparent 50%), radial-gradient(at 70% 80%, rgba(0,0,0,.2), transparent 60%)",
        mixBlendMode: "overlay",
      }} />
      {/* big stamped label */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Space Grotesk', 'Pretendard', sans-serif",
        fontSize: height > 200 ? 38 : 22, fontWeight: 700,
        letterSpacing: "-0.04em", lineHeight: 0.95, textAlign: "center",
        color: "rgba(255,255,255,.92)", whiteSpace: "pre-line",
        textShadow: "0 2px 18px rgba(0,0,0,0.18)",
        mixBlendMode: "screen",
      }}>{label}</div>
    </div>
  );
}

// ─── Onboarding ───────────────────────────────────────────────
function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const slides = [
    {
      eyebrow: "Trend Radar",
      title: "오늘 뭐 찍지,\n매일 정해드려요.",
      body: "음식·디저트 트렌드를 사람이 직접 큐레이션한 카드로 매일 아침 5~10개.",
      bg: "var(--tr-accent)",
    },
    {
      eyebrow: "Step 02",
      title: "막 뜨기 시작한\n타이밍만 골랐어요.",
      body: "신호등 라벨로 끝물·진행 중·진입 시점을 표시. 이미 늦은 트렌드는 정직하게 빨간불.",
      bg: "var(--tr-fg)",
    },
    {
      eyebrow: "Step 03",
      title: "찍을 각도까지\n준비해뒀어요.",
      body: "이게 뭔지, 왜 뜨는지, 3초 훅, 플랫폼별 포맷 팁까지 카드 한 장에.",
      bg: "var(--tr-green)",
    },
  ];
  const s = slides[step];
  return (
    <div style={{
      position: "absolute", inset: 0, background: "var(--tr-bg)",
      display: "flex", flexDirection: "column", zIndex: 50,
    }}>
      <div style={{ flex: 1, position: "relative", overflow: "hidden", margin: 16, marginBottom: 0,
                    borderRadius: 24, background: s.bg, transition: "background .4s",
                    color: s.bg === "var(--tr-fg)" ? "var(--tr-bg)" : "var(--tr-fg)" }}>
        <div style={{ padding: "32px 28px", display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{
              fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
              fontWeight: 600, opacity: 0.7,
            }}>{s.eyebrow}</div>
            <button onClick={onDone} style={{
              background: "transparent", border: 0, color: "inherit",
              opacity: 0.65, fontSize: 14, fontWeight: 500, padding: "4px 0", cursor: "pointer",
            }}>건너뛰기</button>
          </div>
          <div style={{ flex: 1 }} />
          <div>
            <h1 style={{
              fontSize: 38, lineHeight: 1.08, fontWeight: 700, letterSpacing: "-0.035em",
              margin: 0, whiteSpace: "pre-line",
            }}>{s.title}</h1>
            <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.5, opacity: 0.75, maxWidth: 320, fontWeight: 400 }}>{s.body}</p>
          </div>
        </div>
        {/* radar mark */}
        <div style={{ position: "absolute", top: 28, right: 28, opacity: 0.9 }}>
          <IconRadar size={24} sw={1.8} />
        </div>
      </div>

      <div style={{ padding: "24px 28px 32px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", gap: 6, flex: 1 }}>
          {slides.map((_, i) => (
            <div key={i} style={{
              height: 4, flex: i === step ? 3 : 1, borderRadius: 100,
              background: i === step ? "var(--tr-fg)" : "var(--tr-card-2)",
              transition: "all .3s",
            }} />
          ))}
        </div>
        <button
          onClick={() => step < slides.length - 1 ? setStep(step + 1) : onDone()}
          style={{
            background: "var(--tr-fg)", color: "var(--tr-bg)", border: 0,
            padding: "14px 24px", borderRadius: 100, fontSize: 15, fontWeight: 600,
            letterSpacing: "-0.01em", cursor: "pointer",
          }}>
          {step < slides.length - 1 ? "다음" : "시작하기"}
        </button>
      </div>
    </div>
  );
}

// ─── Home ─────────────────────────────────────────────────────
function HomeScreen({ onCard, bookmarks, toggleBookmark }) {
  const { CARDS, REALTIME, CATEGORIES } = window.TR_DATA;
  const [cat, setCat] = useState("전체");
  const filtered = cat === "전체" ? CARDS : CARDS.filter(c => c.category === cat);

  return (
    <div style={{ padding: "8px 0 100px" }}>
      {/* Header */}
      <div style={{ padding: "8px 20px 24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, color: "var(--tr-muted)", letterSpacing: "-0.01em", fontWeight: 500 }}>
            2026년 5월 18일 · 월
          </div>
          <h1 style={{ margin: "4px 0 0", fontSize: 30, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.1 }}>
            오늘의 트렌드
          </h1>
        </div>
        <div style={{ display: "flex", gap: 4, marginTop: 6, color: "var(--tr-fg)" }}>
          <button className="tr-icon-btn"><IconSearch size={20} /></button>
          <button className="tr-icon-btn"><IconBookmark size={20} /></button>
        </div>
      </div>

      {/* Realtime ranking strip */}
      <RealtimeStrip data={REALTIME} />

      {/* Category chips */}
      <div style={{
        display: "flex", gap: 8, overflowX: "auto", padding: "20px 20px 8px",
        scrollbarWidth: "none",
      }} className="tr-no-scrollbar">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            padding: "8px 14px", borderRadius: 100, border: 0, cursor: "pointer",
            fontSize: 13.5, fontWeight: 500, letterSpacing: "-0.01em", whiteSpace: "nowrap",
            background: cat === c ? "var(--tr-fg)" : "var(--tr-card-2)",
            color: cat === c ? "var(--tr-bg)" : "var(--tr-fg)",
            transition: "all .15s",
          }}>{c}</button>
        ))}
      </div>

      {/* Card feed */}
      <div style={{ padding: "12px 20px 0", display: "flex", flexDirection: "column", gap: 24 }}>
        {filtered.map((card, i) => (
          <CardFeedItem key={card.id} card={card} index={i}
                        bookmarked={bookmarks.has(card.id)}
                        onBookmark={() => toggleBookmark(card.id)}
                        onClick={() => onCard(card.id)} />
        ))}
      </div>
    </div>
  );
}

function RealtimeStrip({ data }) {
  const [showAll, setShowAll] = useState(false);
  const shown = showAll ? data : data.slice(0, 5);
  return (
    <div style={{ margin: "0 20px", padding: "14px 16px", background: "var(--tr-card-2)", borderRadius: 18 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            position: "relative", display: "inline-block", width: 8, height: 8, borderRadius: 100,
            background: "var(--tr-red)",
          }}>
            <span style={{
              position: "absolute", inset: -4, borderRadius: 100,
              background: "var(--tr-red)", opacity: 0.3, animation: "tr-pulse 1.5s infinite",
            }} />
          </span>
          <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: "-0.01em" }}>
            실시간 트렌드 · 09:30 업데이트
          </div>
        </div>
        <button onClick={() => setShowAll(s => !s)} style={{
          background: "transparent", border: 0, fontSize: 12, color: "var(--tr-muted)",
          fontWeight: 500, cursor: "pointer",
        }}>{showAll ? "접기" : "전체"}</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {shown.map((r, i) => <RealtimeRow key={r.rank} row={r} idx={i} /> )}
      </div>
    </div>
  );
}

function RealtimeRow({ row, idx }) {
  const deltaUI = () => {
    if (row.deltaType === "up") return <span style={{ color: "var(--tr-red)", fontSize: 11, fontWeight: 600 }}>{row.delta}</span>;
    if (row.deltaType === "down") return <span style={{ color: "var(--tr-blue)", fontSize: 11, fontWeight: 600 }}>{row.delta}</span>;
    if (row.deltaType === "new") return <span style={{
      background: "var(--tr-red)", color: "#fff", padding: "2px 6px", borderRadius: 4,
      fontSize: 9.5, fontWeight: 700, letterSpacing: "0.04em",
    }}>NEW</span>;
    return <span style={{ color: "var(--tr-muted)", fontSize: 11 }}>—</span>;
  };
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "5px 0", gap: 12 }}>
      <span style={{
        width: 18, fontSize: 13, fontWeight: 700, letterSpacing: "-0.02em",
        color: row.rank <= 3 ? "var(--tr-fg)" : "var(--tr-muted)",
        fontVariantNumeric: "tabular-nums",
      }}>{row.rank}</span>
      <span style={{ flex: 1, fontSize: 14, fontWeight: 500, letterSpacing: "-0.015em" }}>{row.kw}</span>
      <span style={{ minWidth: 32, textAlign: "right" }}>{deltaUI()}</span>
    </div>
  );
}

function CardFeedItem({ card, index, bookmarked, onBookmark, onClick }) {
  const style = window.TR_TWEAKS?.cardStyle || "image";
  if (style === "minimal") return <MinimalCardItem card={card} bookmarked={bookmarked} onBookmark={onBookmark} onClick={onClick} />;
  if (style === "compact") return <CompactCardItem card={card} bookmarked={bookmarked} onBookmark={onBookmark} onClick={onClick} />;
  return <ImageCardItem card={card} bookmarked={bookmarked} onBookmark={onBookmark} onClick={onClick} />;
}

function ImageCardItem({ card, bookmarked, onBookmark, onClick }) {
  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      <div style={{ position: "relative" }}>
        <Cover cover={card.cover} height={300} />
        {/* timing badge top-left */}
        <div style={{ position: "absolute", top: 14, left: 14 }}>
          <TimingPill timing={card.timing} />
        </div>
        {/* bookmark top-right */}
        <button onClick={(e) => { e.stopPropagation(); onBookmark(); }} style={{
          position: "absolute", top: 10, right: 10,
          width: 38, height: 38, borderRadius: 100, border: 0,
          background: "rgba(255,255,255,0.92)", color: "var(--tr-fg)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", backdropFilter: "blur(8px)",
        }}>
          {bookmarked ? <IconBookmarkFilled size={18} /> : <IconBookmark size={18} />}
        </button>
        {/* rank chip bottom-left */}
        <div style={{
          position: "absolute", bottom: 14, left: 14,
          padding: "5px 10px", background: "rgba(0,0,0,0.55)", color: "#fff",
          borderRadius: 100, fontSize: 11, fontWeight: 600, letterSpacing: "0.02em",
          backdropFilter: "blur(8px)",
        }}>
          #{card.rank} · {card.category}
        </div>
      </div>
      <div style={{ padding: "14px 4px 0" }}>
        <h2 style={{
          margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.2,
        }}>{card.title}</h2>
        <p style={{
          margin: "8px 0 0", fontSize: 14.5, lineHeight: 1.45, color: "var(--tr-muted)",
          letterSpacing: "-0.01em",
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{card.what}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
          <span style={{
            fontSize: 11, color: "var(--tr-muted)", fontWeight: 500,
          }}>{card.publishedAt}</span>
          <span style={{ width: 3, height: 3, borderRadius: 100, background: "var(--tr-muted)", opacity: 0.5 }} />
          <span style={{ fontSize: 11, color: "var(--tr-muted)", fontWeight: 500 }}>
            트렌드 점수 {card.score}
          </span>
          <span style={{ width: 3, height: 3, borderRadius: 100, background: "var(--tr-muted)", opacity: 0.5 }} />
          <span style={{
            fontSize: 11, fontWeight: 600,
            color: card.velocity.startsWith("+") ? "var(--tr-red)" : "var(--tr-blue)",
          }}>{card.velocity}</span>
        </div>
      </div>
    </div>
  );
}

function MinimalCardItem({ card, bookmarked, onBookmark, onClick }) {
  return (
    <div onClick={onClick} style={{
      cursor: "pointer", padding: "20px 0", borderTop: "1px solid var(--tr-line)",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 4, marginBottom: 8 }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 12, fontWeight: 600, color: "var(--tr-muted)",
          marginRight: 12, marginTop: 4,
          fontVariantNumeric: "tabular-nums",
        }}>{String(card.rank).padStart(2, "0")}</span>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            {card.title}
          </h2>
          <p style={{
            margin: "6px 0 0", fontSize: 14, lineHeight: 1.5, color: "var(--tr-muted)",
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>{card.what}</p>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onBookmark(); }} style={{
          background: "transparent", border: 0, color: "var(--tr-fg)", cursor: "pointer", padding: 4,
        }}>{bookmarked ? <IconBookmarkFilled size={18} /> : <IconBookmark size={18} />}</button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 36 }}>
        <TimingPill timing={card.timing} />
        <span style={{ fontSize: 11.5, color: "var(--tr-muted)", fontWeight: 500 }}>{card.category}</span>
        <span style={{ width: 3, height: 3, borderRadius: 100, background: "var(--tr-muted)", opacity: 0.5 }} />
        <span style={{
          fontSize: 11.5, fontWeight: 600,
          color: card.velocity.startsWith("+") ? "var(--tr-red)" : "var(--tr-blue)",
        }}>{card.velocity}</span>
      </div>
    </div>
  );
}

function CompactCardItem({ card, bookmarked, onBookmark, onClick }) {
  return (
    <div onClick={onClick} style={{
      cursor: "pointer", display: "flex", gap: 14, alignItems: "flex-start",
    }}>
      <div style={{ width: 96, height: 96, flexShrink: 0 }}>
        <Cover cover={card.cover} height={96} />
      </div>
      <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
          <TimingPill timing={card.timing} />
        </div>
        <h2 style={{
          margin: 0, fontSize: 16, fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.25,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{card.title}</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, fontSize: 11.5, color: "var(--tr-muted)", fontWeight: 500 }}>
          <span>{card.category}</span>
          <span style={{ width: 3, height: 3, borderRadius: 100, background: "var(--tr-muted)", opacity: 0.5 }} />
          <span style={{ color: card.velocity.startsWith("+") ? "var(--tr-red)" : "var(--tr-blue)", fontWeight: 600 }}>{card.velocity}</span>
        </div>
      </div>
      <button onClick={(e) => { e.stopPropagation(); onBookmark(); }} style={{
        background: "transparent", border: 0, color: "var(--tr-fg)", cursor: "pointer", padding: 4, marginTop: 2,
      }}>{bookmarked ? <IconBookmarkFilled size={18} /> : <IconBookmark size={18} />}</button>
    </div>
  );
}

// ─── Card Detail ──────────────────────────────────────────────
function LegacyCardDetail({ cardId, onBack, bookmarks, toggleBookmark }) {
  const card = window.TR_DATA.CARDS.find(c => c.id === cardId);
  if (!card) return null;
  const bookmarked = bookmarks.has(card.id);
  return (
    <div style={{ paddingBottom: 100, animation: "tr-slide-in .25s ease-out" }}>
      {/* Hero with back */}
      <div style={{ position: "relative" }}>
        <div style={{ height: 420, width: "100%", overflow: "hidden", position: "relative" }}>
          <Cover cover={card.cover} height={420} style={{ borderRadius: 0 }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent 40%, transparent 70%, rgba(0,0,0,0.2))",
          }} />
        </div>
        <button onClick={onBack} style={{
          position: "absolute", top: 16, left: 16, width: 40, height: 40, borderRadius: 100,
          border: 0, background: "rgba(255,255,255,0.92)", color: "var(--tr-fg)",
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          backdropFilter: "blur(8px)",
        }}>
          <IconBack size={20} />
        </button>
        <button onClick={() => toggleBookmark(card.id)} style={{
          position: "absolute", top: 16, right: 16, width: 40, height: 40, borderRadius: 100,
          border: 0, background: "rgba(255,255,255,0.92)", color: "var(--tr-fg)",
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          backdropFilter: "blur(8px)",
        }}>{bookmarked ? <IconBookmarkFilled size={18} /> : <IconBookmark size={18} />}</button>

        {/* Title overlay */}
        <div style={{ position: "absolute", left: 20, right: 20, bottom: 24, color: "#fff" }}>
          <div style={{ marginBottom: 10 }}><TimingPill timing={card.timing} /></div>
          <h1 style={{
            margin: 0, fontSize: 34, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.1,
            textShadow: "0 2px 16px rgba(0,0,0,0.25)",
          }}>{card.title}</h1>
          <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, fontWeight: 500, opacity: 0.9 }}>
            <span>#{card.rank}</span>
            <span style={{ width: 3, height: 3, borderRadius: 100, background: "#fff", opacity: 0.5 }} />
            <span>{card.category}</span>
            <span style={{ width: 3, height: 3, borderRadius: 100, background: "#fff", opacity: 0.5 }} />
            <span>점수 {card.score}</span>
            <span style={{ width: 3, height: 3, borderRadius: 100, background: "#fff", opacity: 0.5 }} />
            <span>{card.velocity}</span>
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div style={{ padding: "28px 20px 0", display: "flex", flexDirection: "column", gap: 28 }}>
        <Section label="이게 뭔데?" body={card.what} />
        <Section label="왜 뜨는데?" body={card.why} />

        {/* Hook highlight */}
        <div>
          <SectionLabel>3초 훅</SectionLabel>
          <div style={{
            marginTop: 12, padding: "20px 22px",
            background: "var(--tr-accent)", color: "var(--tr-accent-fg)",
            borderRadius: 18, position: "relative",
          }}>
            <div style={{ position: "absolute", top: 14, right: 16, opacity: 0.5 }}>
              <IconSparkle size={16} />
            </div>
            <div style={{
              fontSize: 20, fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.3,
            }}>"{card.hook}"</div>
            <div style={{ marginTop: 10, fontSize: 11.5, opacity: 0.7, fontWeight: 500 }}>
              영상 첫 3초 안에 던질 멘트
            </div>
          </div>
        </div>

        <Section label="콘텐츠 각도" body={card.angle} />

        {/* Platform tips */}
        <div>
          <SectionLabel>플랫폼별 포맷 팁</SectionLabel>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {card.platform.map(p => (
              <div key={p.p} style={{
                padding: "14px 16px", borderRadius: 14, background: "var(--tr-card-2)",
                display: "flex", gap: 12, alignItems: "flex-start",
              }}>
                <span style={{
                  fontSize: 10.5, fontWeight: 700, letterSpacing: "0.05em",
                  padding: "4px 8px", background: "var(--tr-fg)", color: "var(--tr-bg)",
                  borderRadius: 4, flexShrink: 0, marginTop: 1,
                }}>{p.p.toUpperCase()}</span>
                <span style={{ fontSize: 14, lineHeight: 1.5, letterSpacing: "-0.01em" }}>{p.tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cautions */}
        <div>
          <SectionLabel>주의점</SectionLabel>
          <div style={{
            marginTop: 12, padding: "14px 16px", borderRadius: 14,
            background: "var(--tr-card-2)", borderLeft: "3px solid var(--tr-yellow)",
            fontSize: 14, lineHeight: 1.55, letterSpacing: "-0.01em",
          }}>{card.caution}</div>
        </div>

        {/* Sources */}
        <div>
          <SectionLabel>출처</SectionLabel>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column" }}>
            {card.sources.map((s, i) => (
              <a key={i} href={s.url} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "12px 0", borderTop: i === 0 ? 0 : "1px solid var(--tr-line)",
                color: "var(--tr-fg)", textDecoration: "none",
              }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: "var(--tr-card-2)", flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: 14, fontWeight: 500, letterSpacing: "-0.01em" }}>{s.label}</span>
                <IconChevronRight size={16} stroke="var(--tr-muted)" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div style={{
          padding: "16px 0 8px", borderTop: "1px solid var(--tr-line)",
          display: "flex", alignItems: "center", gap: 8, fontSize: 11.5, color: "var(--tr-muted)",
        }}>
          <IconClock size={13} />
          <span>발행 {card.publishedAt} · 운영자 검수 완료</span>
        </div>
      </div>
    </div>
  );
}

function peakStatusLabel(status) {
  return {
    rising: "상승 중",
    peaking: "정점 근처",
    declining: "하락 중",
  }[status] || "수집 전";
}

function TrendLineChart({ points }) {
  if (!points || points.length === 0) {
    return (
      <div style={{
        height: 132, borderRadius: 14, background: "var(--tr-card-2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, color: "var(--tr-muted)", fontWeight: 500,
      }}>데이터 수집 전</div>
    );
  }
  const width = 292;
  const height = 132;
  const pad = 12;
  const max = Math.max(...points.map(p => p.value), 1);
  const min = Math.min(...points.map(p => p.value), 0);
  const range = Math.max(max - min, 1);
  const coords = points.map((p, i) => {
    const x = pad + (i * (width - pad * 2)) / Math.max(points.length - 1, 1);
    const y = height - pad - ((p.value - min) / range) * (height - pad * 2);
    return { x, y, ...p };
  });
  const line = coords.map(p => `${p.x},${p.y}`).join(" ");
  const area = `${pad},${height - pad} ${line} ${width - pad},${height - pad}`;
  return (
    <div style={{ marginTop: 14 }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} style={{ display: "block" }}>
        <defs>
          <linearGradient id="trendArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--tr-accent)" stopOpacity="0.36" />
            <stop offset="100%" stopColor="var(--tr-accent)" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {[0, 1, 2].map(i => (
          <line key={i} x1={pad} x2={width - pad} y1={pad + i * 48} y2={pad + i * 48}
                stroke="var(--tr-line)" strokeWidth="1" />
        ))}
        <polygon points={area} fill="url(#trendArea)" />
        <polyline points={line} fill="none" stroke="var(--tr-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {coords.map((p, i) => (i === 0 || i === coords.length - 1) && (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill="var(--tr-accent)" stroke="var(--tr-bg)" strokeWidth="2" />
        ))}
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: "var(--tr-muted)", fontWeight: 500 }}>
        <span>{points[0].date}</span>
        <span>최근 14일 상대 검색 관심도</span>
        <span>{points[points.length - 1].date}</span>
      </div>
    </div>
  );
}

function TrendMetric({ label, value, tone }) {
  const color = tone === "hot" ? "var(--tr-red)" : tone === "cool" ? "var(--tr-blue)" : "var(--tr-fg)";
  return (
    <div style={{ flex: 1, minWidth: 0, padding: "12px 10px", borderRadius: 12, background: "var(--tr-bg)" }}>
      <div style={{ fontSize: 10.5, color: "var(--tr-muted)", fontWeight: 600, letterSpacing: "0.02em" }}>{label}</div>
      <div style={{ marginTop: 5, fontSize: 16, fontWeight: 700, color, letterSpacing: "-0.02em" }}>{value}</div>
    </div>
  );
}

function TrendVerificationCard({ card }) {
  const trend = card.naverTrend;
  if (!trend) {
    return (
      <div style={{ padding: 18, borderRadius: 18, background: "var(--tr-card-2)" }}>
        <SectionLabel>트렌드 검증</SectionLabel>
        <div style={{ marginTop: 12, fontSize: 14, color: "var(--tr-muted)", lineHeight: 1.5 }}>
          네이버 데이터랩 검색 추이를 아직 수집하지 않았습니다.
        </div>
      </div>
    );
  }
  return (
    <div style={{ padding: 18, borderRadius: 18, background: "var(--tr-card-2)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div>
          <SectionLabel>트렌드 검증</SectionLabel>
          <div style={{ marginTop: 6, fontSize: 20, fontWeight: 700, letterSpacing: "-0.03em" }}>
            네이버 검색 관심도 {trend.changeRate}
          </div>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 6, padding: "7px 10px",
          borderRadius: 100, background: "var(--tr-bg)", fontSize: 11.5, fontWeight: 700, whiteSpace: "nowrap",
        }}>
          <IconChart size={14} />
          {peakStatusLabel(trend.peakStatus)}
        </div>
      </div>
      <TrendLineChart points={trend.points} />
      <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
        <TrendMetric label="전일 대비" value={trend.dailyChange || "-"} tone={String(trend.dailyChange).startsWith("-") ? "cool" : "hot"} />
        <TrendMetric label="누가 찾나" value={trend.audience || "-"} />
      </div>
      <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--tr-muted)" }}>
        <IconClock size={12} />
        <span>최근 14일 일간 추이 · {trend.updatedAt} 갱신</span>
      </div>
    </div>
  );
}


function normalizeAudienceFilters(trend) {
  if (!trend?.audienceBreakdown) return null;
  return {
    gender: trend.audienceBreakdown.gender || [],
    age: trend.audienceBreakdown.age || [],
  };
}

function combineAudienceSelection(filters, genderLabel, ageLabel) {
  const gender = genderLabel === "전체" ? null : filters.gender.find(item => item.label === genderLabel);
  const age = ageLabel === "전체" ? null : filters.age.find(item => item.label === ageLabel);
  if (gender && age) {
    return {
      label: `${gender.label} · ${age.label}`,
      share: Math.max(1, Math.round((Number(gender.share) * Number(age.share)) / 100)),
    };
  }
  if (gender) {
    return { label: gender.label, share: Number(gender.share) || 0 };
  }
  if (age) {
    return { label: age.label, share: Number(age.share) || 0 };
  }
  return { label: "전체", share: 100 };
}

function AudienceFilterGroup({ title, options, selected, onSelect }) {
  return (
    <div>
      <div style={{ fontSize: 11.5, color: "var(--tr-muted)", fontWeight: 800, marginBottom: 8 }}>{title}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {options.map(option => {
          const isSelected = selected === option;
          return (
            <button key={option} onClick={() => onSelect(option)} style={{
              border: 0, borderRadius: 100, padding: "8px 13px",
              background: isSelected ? "var(--tr-fg)" : "var(--tr-bg)",
              color: isSelected ? "var(--tr-bg)" : "var(--tr-fg)",
              fontSize: 12.5, fontWeight: 800, fontFamily: "inherit", cursor: "pointer",
              transition: "background 0.2s, color 0.2s, transform 0.15s",
              transform: isSelected ? "scale(1.05)" : "scale(1)",
            }}>
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AudienceSelectionBar({ selection }) {
  const targetWidth = Math.max(4, Math.min(100, selection.share));
  const [barWidth, setBarWidth] = React.useState(0);
  const [displayNum, setDisplayNum] = React.useState(0);
  const rafRef = React.useRef(null);
  const fromRef = React.useRef(0);

  React.useEffect(() => {
    const t = setTimeout(() => setBarWidth(targetWidth), 30);
    return () => clearTimeout(t);
  }, [targetWidth]);

  React.useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const from = fromRef.current;
    const to = selection.share;
    let t0 = null;
    const duration = 650;

    const tick = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplayNum(Math.round(from + (to - from) * ease));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [selection.share]);

  return (
    <div style={{ marginTop: 18 }}>
      <div style={{
        padding: "18px 18px 16px", borderRadius: 18, background: "var(--tr-bg)",
        position: "relative", overflow: "hidden",
      }}>
        {/* 배경 glow */}
        <div style={{
          position: "absolute", top: -50, right: -30, width: 140, height: 140, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,255,61,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* 레이블 + 숫자 */}
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          gap: 12, marginBottom: 18, position: "relative",
        }}>
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--tr-muted)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 5 }}>
              관심 비중
            </div>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: "var(--tr-fg)", letterSpacing: "-0.02em" }}>
              {selection.label}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 1, fontVariantNumeric: "tabular-nums" }}>
            <span style={{ fontSize: 40, fontWeight: 900, letterSpacing: "-0.05em", color: "var(--tr-accent)", lineHeight: 1 }}>
              {displayNum}
            </span>
            <span style={{ fontSize: 18, fontWeight: 800, color: "var(--tr-accent)", paddingBottom: 4 }}>%</span>
          </div>
        </div>

        {/* 바 트랙 */}
        <div style={{ position: "relative", height: 16 }}>
          {/* 트랙 (overflow:hidden으로 shimmer 클리핑) */}
          <div style={{
            position: "absolute", top: "50%", left: 0, right: 0,
            height: 9, borderRadius: 100, transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.07)", overflow: "hidden",
          }}>
            {/* 채움 바 */}
            <div style={{
              height: "100%", borderRadius: 100,
              width: `${barWidth}%`,
              background: "linear-gradient(90deg, #7AE000 0%, #C8FF3D 55%, #E5FF8A 100%)",
              transition: "width 0.7s cubic-bezier(0.34, 1.4, 0.64, 1)",
              position: "relative",
            }}>
              {/* Shimmer */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.38) 50%, transparent 80%)",
                backgroundSize: "200% 100%",
                animation: "tr-shimmer 2.4s ease-in-out infinite",
              }} />
            </div>
          </div>

          {/* 끝 도트 인디케이터 */}
          <div style={{
            position: "absolute", top: "50%",
            left: `${barWidth}%`,
            transform: "translate(-50%, -50%)",
            width: 16, height: 16, borderRadius: "50%",
            background: "#C8FF3D",
            animation: "tr-glow-breathe 2s ease-in-out infinite",
            transition: "left 0.7s cubic-bezier(0.34, 1.4, 0.64, 1)",
            zIndex: 2,
          }} />
        </div>

        {/* 눈금 */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          marginTop: 8, fontSize: 10, fontWeight: 600, color: "var(--tr-muted)",
        }}>
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}

function AudienceBreakdownPanel({ card }) {
  const filters = normalizeAudienceFilters(card.naverTrend);
  const [selectedGender, setSelectedGender] = useState("전체");
  const [selectedAge, setSelectedAge] = useState("전체");
  if (!filters || (!filters.gender.length && !filters.age.length)) {
    return (
      <div>
        <SectionLabel>검색층 분석</SectionLabel>
        <div style={{
          marginTop: 12, padding: 18, borderRadius: 18, background: "var(--tr-card-2)",
          fontSize: 14, color: "var(--tr-muted)", lineHeight: 1.5,
        }}>
          검색층 데이터 수집 전
        </div>
      </div>
    );
  }
  const genderOptions = ["전체", ...filters.gender.map(item => item.label)];
  const ageOptions = ["전체", ...filters.age.map(item => item.label)];
  const selection = combineAudienceSelection(filters, selectedGender, selectedAge);
  return (
    <div>
      <SectionLabel>검색층 분석</SectionLabel>
      <div style={{ marginTop: 12, padding: 18, borderRadius: 18, background: "var(--tr-card-2)" }}>
        <div style={{ fontSize: 12, color: "var(--tr-muted)", fontWeight: 700, lineHeight: 1.45 }}>
          성별과 나이대를 선택하면 해당 검색층의 관심 비중을 볼 수 있어요
        </div>
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 14 }}>
          <AudienceFilterGroup title="성별" options={genderOptions} selected={selectedGender} onSelect={setSelectedGender} />
          <AudienceFilterGroup title="나이대" options={ageOptions} selected={selectedAge} onSelect={setSelectedAge} />
        </div>
        <AudienceSelectionBar selection={selection} />
      </div>
    </div>
  );
}

const COMMUNITY_POS = ["좋", "대박", "찍어야", "탈게", "가야", "선점", "재미", "맛있", "바로", "해야", "빠르", "영상감", "달려"];
const COMMUNITY_NEG = ["이미", "많아", "늦", "포화", "별로", "식상", "피크", "지났", "차별화 힘", "걱정", "힘들"];
function classifyComment(text) {
  if (COMMUNITY_POS.some(w => text.includes(w))) return "positive";
  if (COMMUNITY_NEG.some(w => text.includes(w))) return "negative";
  return "neutral";
}

const TONE_COLOR = { positive: "var(--tr-green)", negative: "var(--tr-red)", neutral: "var(--tr-muted)" };
const SUFFIX = {
  positive: " 최근 긍정 반응이 더 늘고 있어요.",
  negative: " 콘텐츠 포화를 우려하는 시각도 함께 올라오고 있어요.",
  neutral:  " 다양한 시각이 공존하고 있어요.",
};

function SentimentBar({ label, value, color }) {
  const [barW, setBarW] = React.useState(0);
  React.useEffect(() => {
    const t = setTimeout(() => setBarW(value), 30);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 32, fontSize: 11.5, fontWeight: 700, color: "var(--tr-muted)", flexShrink: 0 }}>{label}</div>
      <div style={{ flex: 1, height: 7, borderRadius: 100, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 100, background: color,
          width: `${barW}%`, transition: "width 0.7s cubic-bezier(0.25,1,0.5,1)",
        }} />
      </div>
      <div style={{ width: 30, fontSize: 12, fontWeight: 800, color, textAlign: "right", flexShrink: 0 }}>{value}%</div>
    </div>
  );
}

function CommunityPanel({ card }) {
  const community = card.community;
  if (!community) return null;

  const storageKey = `community_${card.id}`;
  const [userComments, setUserComments] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || "[]"); } catch { return []; }
  });
  const [inputText, setInputText] = React.useState("");
  const [analyzing, setAnalyzing] = React.useState(false);
  const [sentiment, setSentiment] = React.useState({ ...community.sentiment });
  const [summaryExtra, setSummaryExtra] = React.useState("");

  const handleSubmit = () => {
    const text = inputText.trim();
    if (!text || analyzing) return;
    setAnalyzing(true);
    const tone = classifyComment(text);
    setTimeout(() => {
      const total = sentiment.positive + sentiment.negative + sentiment.neutral + userComments.length + 1;
      const baseTotal = community.sentiment.positive + community.sentiment.negative + community.sentiment.neutral;
      const posCount = Math.round((community.sentiment.positive / 100) * baseTotal) + userComments.filter(c => c.tone === "positive").length + (tone === "positive" ? 1 : 0);
      const negCount = Math.round((community.sentiment.negative / 100) * baseTotal) + userComments.filter(c => c.tone === "negative").length + (tone === "negative" ? 1 : 0);
      const neuCount = Math.round((community.sentiment.neutral / 100) * baseTotal) + userComments.filter(c => c.tone === "neutral").length + (tone === "neutral" ? 1 : 0);
      const newTotal = posCount + negCount + neuCount;
      const newPos = Math.round((posCount / newTotal) * 100);
      const newNeg = Math.round((negCount / newTotal) * 100);
      const newNeu = 100 - newPos - newNeg;
      setSentiment({ positive: newPos, negative: newNeg, neutral: Math.max(0, newNeu) });
      if (!summaryExtra) setSummaryExtra(SUFFIX[tone]);
      const newComment = { id: Date.now(), author: "나", text, tone, timeAgo: "방금 전", isMe: true };
      const updated = [newComment, ...userComments];
      setUserComments(updated);
      try { localStorage.setItem(storageKey, JSON.stringify(updated)); } catch {}
      setInputText("");
      setAnalyzing(false);
    }, 1500);
  };

  const allComments = [...userComments, ...community.comments];

  return (
    <div>
      <SectionLabel>크리에이터 반응</SectionLabel>
      <div style={{ marginTop: 12, borderRadius: 18, background: "var(--tr-card-2)", overflow: "hidden", position: "relative" }}>

        {/* 분석 중 오버레이 */}
        {analyzing && (
          <div style={{
            position: "absolute", inset: 0, zIndex: 10,
            background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14,
            borderRadius: 18,
          }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: "#fff" }}>AI가 반응을 분석하고 있어요</div>
            <div style={{ display: "flex", gap: 6 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 7, height: 7, borderRadius: "50%", background: "var(--tr-accent)",
                  animation: `tr-dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}

        <div style={{ padding: 18 }}>
          {/* 감성 바 3개 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            <SentimentBar label="긍정" value={sentiment.positive} color="var(--tr-green)" />
            <SentimentBar label="부정" value={sentiment.negative} color="var(--tr-red)" />
            <SentimentBar label="중립" value={sentiment.neutral}  color="var(--tr-muted)" />
          </div>

          {/* AI 요약 */}
          <div style={{
            marginTop: 14, padding: "11px 14px", borderRadius: 12, background: "var(--tr-bg)",
            fontSize: 12.5, lineHeight: 1.55, color: "var(--tr-muted)", fontStyle: "italic",
          }}>
            {community.summary}{summaryExtra}
          </div>

          {/* 댓글 목록 */}
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            {allComments.map((c, i) => (
              <div key={c.id ?? i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%", background: TONE_COLOR[c.tone] || "var(--tr-muted)",
                  flexShrink: 0, marginTop: 5,
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 800, color: "var(--tr-fg)" }}>{c.author}</span>
                    {c.isMe && (
                      <span style={{
                        fontSize: 9.5, fontWeight: 800, color: "var(--tr-accent-fg)",
                        background: "var(--tr-accent)", borderRadius: 4, padding: "1px 5px",
                        letterSpacing: "0.04em",
                      }}>나</span>
                    )}
                    <span style={{ fontSize: 11, color: "var(--tr-muted)", marginLeft: "auto", flexShrink: 0 }}>{c.timeAgo}</span>
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.45, color: "var(--tr-fg)" }}>{c.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 댓글 입력 */}
        <div style={{
          borderTop: "1px solid var(--tr-line)", padding: "12px 16px",
          display: "flex", gap: 10, alignItems: "flex-end",
          background: "var(--tr-bg)",
        }}>
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
            placeholder="이 트렌드, 어떻게 생각해요?"
            rows={1}
            style={{
              flex: 1, border: 0, background: "transparent", resize: "none",
              fontSize: 13, color: "var(--tr-fg)", fontFamily: "inherit",
              outline: "none", lineHeight: 1.5, padding: "4px 0",
            }}
          />
          <button onClick={handleSubmit} disabled={!inputText.trim() || analyzing} style={{
            border: 0, borderRadius: 10, padding: "7px 14px",
            background: inputText.trim() && !analyzing ? "var(--tr-accent)" : "var(--tr-line)",
            color: inputText.trim() && !analyzing ? "var(--tr-accent-fg)" : "var(--tr-muted)",
            fontSize: 12.5, fontWeight: 800, fontFamily: "inherit", cursor: "pointer",
            transition: "background .2s, color .2s", flexShrink: 0,
          }}>등록</button>
        </div>

      </div>
    </div>
  );
}

function RelatedChipGroup({ title, items, tone = "soft" }) {
  return (
    <div style={{ padding: 15, borderRadius: 16, background: "var(--tr-card-2)" }}>
      <div style={{ fontSize: 12, color: "var(--tr-muted)", fontWeight: 700, marginBottom: 10 }}>{title}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {(items || []).map((item, i) => (
          <span key={`${item}-${i}`} style={{
            padding: "8px 10px", borderRadius: 100,
            background: tone === "dark" ? "var(--tr-fg)" : "var(--tr-bg)",
            color: tone === "dark" ? "var(--tr-bg)" : "var(--tr-fg)",
            fontSize: 12.5, fontWeight: 600, letterSpacing: "-0.01em",
            maxWidth: "100%", overflowWrap: "anywhere",
          }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function RelatedTrendsPanel({ card }) {
  const related = card.relatedTrends;
  if (!related) {
    return (
      <div style={{ padding: 18, borderRadius: 18, background: "var(--tr-card-2)" }}>
        <SectionLabel>관련 트렌드 탐색</SectionLabel>
        <div style={{ marginTop: 12, fontSize: 14, color: "var(--tr-muted)", lineHeight: 1.5 }}>
          관련 데이터 수집 전입니다.
        </div>
      </div>
    );
  }
  return (
    <div>
      <SectionLabel>관련 트렌드 탐색</SectionLabel>
      <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
        <RelatedChipGroup title="비슷한 검색어" items={related.keywords} tone="dark" />
        <RelatedChipGroup title="같이 뜨는 해시태그" items={related.hashtags} />
      </div>
    </div>
  );
}

function CardDetail({ cardId, onBack, bookmarks, toggleBookmark }) {
  const card = window.TR_DATA.CARDS.find(c => c.id === cardId);
  if (!card) return null;
  const bookmarked = bookmarks.has(card.id);
  return (
    <div style={{ paddingBottom: 100, animation: "tr-slide-in .25s ease-out" }}>
      <div style={{ position: "relative" }}>
        <div style={{ height: 420, width: "100%", overflow: "hidden", position: "relative" }}>
          <Cover cover={card.cover} height={420} style={{ borderRadius: 0 }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.58), transparent 42%, transparent 70%, rgba(0,0,0,0.18))",
          }} />
        </div>
        <button onClick={onBack} style={{
          position: "absolute", top: 16, left: 16, width: 40, height: 40, borderRadius: 100,
          border: 0, background: "rgba(255,255,255,0.92)", color: "var(--tr-fg)",
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          backdropFilter: "blur(8px)",
        }}>
          <IconBack size={20} />
        </button>
        <button onClick={() => toggleBookmark(card.id)} style={{
          position: "absolute", top: 16, right: 16, width: 40, height: 40, borderRadius: 100,
          border: 0, background: "rgba(255,255,255,0.92)", color: "var(--tr-fg)",
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          backdropFilter: "blur(8px)",
        }}>{bookmarked ? <IconBookmarkFilled size={18} /> : <IconBookmark size={18} />}</button>

        <div style={{ position: "absolute", left: 20, right: 20, bottom: 24, color: "#fff" }}>
          <div style={{ marginBottom: 10 }}><TimingPill timing={card.timing} /></div>
          <h1 style={{
            margin: 0, fontSize: 34, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.1,
            textShadow: "0 2px 16px rgba(0,0,0,0.25)",
          }}>{card.title}</h1>
          <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, fontWeight: 500, opacity: 0.9, flexWrap: "wrap" }}>
            <span>#{card.rank}</span>
            <span style={{ width: 3, height: 3, borderRadius: 100, background: "#fff", opacity: 0.5 }} />
            <span>{card.category}</span>
            <span style={{ width: 3, height: 3, borderRadius: 100, background: "#fff", opacity: 0.5 }} />
            <span>점수 {card.score}</span>
            <span style={{ width: 3, height: 3, borderRadius: 100, background: "#fff", opacity: 0.5 }} />
            <span>{card.velocity}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "24px 20px 0", display: "flex", flexDirection: "column", gap: 28 }}>
        <TrendVerificationCard card={card} />
        <AudienceBreakdownPanel card={card} />
        <CommunityPanel card={card} />
        <RelatedTrendsPanel card={card} />
      </div>
    </div>
  );
}

function Section({ label, body }) {
  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      <div style={{
        marginTop: 10, fontSize: 15.5, lineHeight: 1.6, letterSpacing: "-0.01em",
        color: "var(--tr-fg)",
      }}>{body}</div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
      textTransform: "uppercase", color: "var(--tr-muted)",
    }}>{children}</div>
  );
}

// ─── Search Screen ────────────────────────────────────────────
function SearchScreen({ onCard, bookmarks, toggleBookmark }) {
  const { CARDS, CATEGORIES } = window.TR_DATA;
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("전체");
  const trending = ["얼먹젤리", "코스트코 망고푸딩", "칠리스 치즈스틱", "동결건조"];
  const filtered = CARDS.filter(c =>
    (cat === "전체" || c.category === cat) &&
    (q.trim() === "" || c.title.includes(q.trim()) || c.category.includes(q.trim()))
  );
  return (
    <div style={{ padding: "8px 0 100px" }}>
      <div style={{ padding: "8px 20px 16px" }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: "-0.035em" }}>검색</h1>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "12px 14px", background: "var(--tr-card-2)", borderRadius: 14,
        }}>
          <IconSearch size={18} stroke="var(--tr-muted)" />
          <input value={q} onChange={(e) => setQ(e.target.value)}
                 placeholder="트렌드, 메뉴, 카테고리 검색"
                 style={{
                   flex: 1, border: 0, background: "transparent", outline: "none",
                   fontSize: 14.5, fontFamily: "inherit", color: "var(--tr-fg)",
                   letterSpacing: "-0.01em",
                 }} />
          {q && (
            <button onClick={() => setQ("")} style={{
              border: 0, background: "transparent", color: "var(--tr-muted)", padding: 0, cursor: "pointer",
              display: "flex",
            }}><IconClose size={16} /></button>
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "16px 20px 8px" }} className="tr-no-scrollbar">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            padding: "8px 14px", borderRadius: 100, border: 0, cursor: "pointer",
            fontSize: 13.5, fontWeight: 500, whiteSpace: "nowrap",
            background: cat === c ? "var(--tr-fg)" : "var(--tr-card-2)",
            color: cat === c ? "var(--tr-bg)" : "var(--tr-fg)",
          }}>{c}</button>
        ))}
      </div>

      {q === "" ? (
        <div style={{ padding: "16px 20px 0" }}>
          <SectionLabel>지금 많이 찾아요</SectionLabel>
          <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {trending.map((t, i) => (
              <button key={t} onClick={() => setQ(t)} style={{
                padding: "10px 14px", border: 0, borderRadius: 100,
                background: "var(--tr-card-2)", color: "var(--tr-fg)",
                fontSize: 13.5, fontWeight: 500, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700,
                  color: "var(--tr-red)",
                }}>{i + 1}</span>
                {t}
              </button>
            ))}
          </div>

          <div style={{ marginTop: 28 }}>
            <SectionLabel>{cat} 카테고리</SectionLabel>
            <div style={{
              marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14,
            }}>
              {filtered.slice(0, 6).map(c => (
                <GridCard key={c.id} card={c} onClick={() => onCard(c.id)} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ padding: "16px 20px 0" }}>
          <div style={{ fontSize: 12, color: "var(--tr-muted)", marginBottom: 14 }}>
            검색 결과 {filtered.length}건
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {filtered.map(c => (
              <CompactCardItem key={c.id} card={c} onClick={() => onCard(c.id)}
                               bookmarked={bookmarks.has(c.id)}
                               onBookmark={() => toggleBookmark(c.id)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function GridCard({ card, onClick }) {
  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      <Cover cover={card.cover} height={160} />
      <div style={{ padding: "10px 2px 0" }}>
        <div style={{ marginBottom: 6 }}>
          <TimingPill timing={card.timing} />
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.25,
                      display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {card.title}
        </div>
      </div>
    </div>
  );
}

// ─── Bookmarks ────────────────────────────────────────────────
function BookmarksScreen({ bookmarks, toggleBookmark, onCard }) {
  const cards = window.TR_DATA.CARDS.filter(c => bookmarks.has(c.id));
  return (
    <div style={{ padding: "8px 0 100px" }}>
      <div style={{ padding: "8px 20px 20px" }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: "-0.035em" }}>북마크</h1>
        <div style={{ fontSize: 12.5, color: "var(--tr-muted)", marginTop: 4, fontWeight: 500 }}>
          {cards.length}장 저장됨
        </div>
      </div>
      {cards.length === 0 ? (
        <div style={{
          margin: "0 20px", padding: "60px 24px", borderRadius: 18, background: "var(--tr-card-2)",
          textAlign: "center",
        }}>
          <div style={{ display: "inline-flex", padding: 16, background: "var(--tr-bg)", borderRadius: 100, color: "var(--tr-muted)" }}>
            <IconBookmark size={22} />
          </div>
          <div style={{ marginTop: 14, fontSize: 15, fontWeight: 600 }}>아직 저장한 카드가 없어요</div>
          <div style={{ marginTop: 6, fontSize: 13, color: "var(--tr-muted)", lineHeight: 1.5 }}>
            마음에 드는 트렌드 카드를<br/>
            북마크해서 모아두세요.
          </div>
        </div>
      ) : (
        <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 18 }}>
          {cards.map(c => (
            <CompactCardItem key={c.id} card={c} onClick={() => onCard(c.id)}
                             bookmarked={true} onBookmark={() => toggleBookmark(c.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Profile ──────────────────────────────────────────────────
function ProfileScreen({ onAdmin }) {
  return (
    <div style={{ padding: "8px 0 100px" }}>
      <div style={{ padding: "8px 20px 20px" }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: "-0.035em" }}>설정</h1>
      </div>

      <div style={{ padding: "0 20px" }}>
        {/* Profile card */}
        <div style={{
          padding: "20px", borderRadius: 18, background: "var(--tr-card-2)",
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 100, background: "var(--tr-fg)", color: "var(--tr-bg)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 700,
          }}>김</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.02em" }}>김 제작자</div>
            <div style={{ fontSize: 12.5, color: "var(--tr-muted)", marginTop: 2 }}>주로 디저트 · 14일 째 사용 중</div>
          </div>
        </div>

        <div style={{ marginTop: 28 }}>
          <SectionLabel>내 활동</SectionLabel>
          <MenuList items={[
            { label: "북마크한 카드", value: "12장" },
            { label: "이거로 영상 찍었어요", value: "3건" },
            { label: "관심 카테고리", value: "디저트, 식당" },
          ]} />
        </div>

        <div style={{ marginTop: 28 }}>
          <SectionLabel>알림</SectionLabel>
          <MenuList items={[
            { label: "아침 발행 알림", toggle: true, value: true },
            { label: "내가 북마크한 카드 끝물 경보", toggle: true, value: true },
            { label: "새 카테고리 출시", toggle: true, value: false },
          ]} />
        </div>

        <div style={{ marginTop: 28 }}>
          <SectionLabel>기타</SectionLabel>
          <MenuList items={[
            { label: "사용 약관", arrow: true },
            { label: "개인정보 처리방침", arrow: true },
            { label: "문의하기", arrow: true },
          ]} />
        </div>

        {/* Admin entry */}
        <div style={{ marginTop: 28 }}>
          <SectionLabel>운영</SectionLabel>
          <div onClick={onAdmin} style={{
            marginTop: 10, padding: "16px 18px", borderRadius: 14,
            background: "var(--tr-fg)", color: "var(--tr-bg)",
            display: "flex", alignItems: "center", gap: 12, cursor: "pointer",
          }}>
            <IconLayers size={20} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.015em" }}>운영자 콘솔로 이동</div>
              <div style={{ fontSize: 12, opacity: 0.6, marginTop: 2 }}>후보 검토 · 카드 발행 · 지표</div>
            </div>
            <IconChevronRight size={18} />
          </div>
        </div>

        <div style={{ marginTop: 36, fontSize: 11, color: "var(--tr-muted)", textAlign: "center", fontWeight: 500 }}>
          Trend Radar · MVP v0.1
        </div>
      </div>
    </div>
  );
}

function MenuList({ items }) {
  return (
    <div style={{ marginTop: 10, background: "var(--tr-card-2)", borderRadius: 14, overflow: "hidden" }}>
      {items.map((it, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", padding: "14px 16px",
          borderTop: i === 0 ? 0 : "1px solid var(--tr-line)",
          fontSize: 14, letterSpacing: "-0.01em",
        }}>
          <span style={{ flex: 1, fontWeight: 500 }}>{it.label}</span>
          {it.toggle ? <Toggle on={it.value} /> :
            <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--tr-muted)", fontSize: 13 }}>
              {it.value}
              {it.arrow && <IconChevronRight size={14} />}
            </span>
          }
        </div>
      ))}
    </div>
  );
}

function Toggle({ on: init = false, onChange }) {
  const [internal, setInternal] = useState(init);
  const controlled = onChange !== undefined;
  const on = controlled ? init : internal;
  const flip = () => {
    if (controlled) onChange(!on);
    else setInternal(o => !o);
  };
  return (
    <button onClick={flip} style={{
      width: 44, height: 26, borderRadius: 100, border: 0, padding: 0, cursor: "pointer",
      background: on ? "var(--tr-fg)" : "var(--tr-line)", position: "relative",
      transition: "background .2s",
    }}>
      <div style={{
        position: "absolute", top: 3, left: on ? 21 : 3, width: 20, height: 20, borderRadius: 100,
        background: "#fff", transition: "left .2s",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }} />
    </button>
  );
}

// ─── Bottom nav ──────────────────────────────────────────────
function BottomNav({ tab, onTab }) {
  const tabs = [
    { k: "home", label: "홈", Icon: IconHome },
    { k: "search", label: "검색", Icon: IconSearch },
    { k: "bookmarks", label: "북마크", Icon: IconBookmark },
    { k: "profile", label: "설정", Icon: IconUser },
  ];
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      background: "var(--tr-bg)", borderTop: "1px solid var(--tr-line)",
      display: "flex", padding: "8px 4px 12px", zIndex: 20,
    }}>
      {tabs.map(t => (
        <button key={t.k} onClick={() => onTab(t.k)} style={{
          flex: 1, border: 0, background: "transparent", cursor: "pointer",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
          padding: "8px 0", color: tab === t.k ? "var(--tr-fg)" : "var(--tr-muted)",
        }}>
          <t.Icon size={22} sw={tab === t.k ? 2 : 1.6} />
          <span style={{ fontSize: 10.5, fontWeight: tab === t.k ? 600 : 500, letterSpacing: "-0.01em" }}>
            {t.label}
          </span>
        </button>
      ))}
    </div>
  );
}

Object.assign(window, {
  Onboarding, HomeScreen, CardDetail, SearchScreen, BookmarksScreen, ProfileScreen, BottomNav,
  Cover, TimingPill, TrafficLight, SectionLabel, RealtimeStrip, CompactCardItem,
});
