// user.jsx — User-facing screens: onboarding, home, detail, search, bookmarks, profile

const { useState, useEffect, useRef, useMemo } = React;

// ─── API 설정 — 키를 입력하면 실데이터로 전환됩니다 ───────────
const API_CONFIG = {
  YOUTUBE_KEY: "",
  NAVER_CLIENT_ID: "",
  NAVER_CLIENT_SECRET: "",
  NAVER_PROXY: "",  // 서버리스 프록시 URL (예: https://your-app.vercel.app/api/naver)
};

async function fetchYouTubeVideos(keyword, apiKey) {
  if (!apiKey) return null;
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(keyword)}&type=video&maxResults=5&regionCode=KR&relevanceLanguage=ko&key=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return (data.items || []).map(item => ({
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      videoId: item.id.videoId,
      thumbnail: item.snippet.thumbnails?.medium?.url,
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
  } catch { return null; }
}

async function fetchNaverTrend(keyword, clientId, clientSecret, proxyUrl) {
  if (!clientId || !clientSecret || !proxyUrl) return null;
  try {
    const today = new Date();
    const end = today.toISOString().slice(0, 10);
    const start = new Date(today.getTime() - 30 * 86400000).toISOString().slice(0, 10);
    const res = await fetch(proxyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Naver-Client-Id": clientId,
        "X-Naver-Client-Secret": clientSecret,
      },
      body: JSON.stringify({
        startDate: start, endDate: end, timeUnit: "date",
        keywordGroups: [{ groupName: keyword, keywords: [keyword] }],
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const points = (data.results?.[0]?.data || []).map(p => ({
      date: p.period.slice(5), value: Math.round(p.ratio),
    }));
    return points.length ? points : null;
  } catch { return null; }
}

// ─── Shared bits ──────────────────────────────────────────────
const TIMING = {
  green:  { dot: "var(--tr-green)",  text: "선점 타이밍" },
  yellow: { dot: "var(--tr-yellow)", text: "서두르면 좋아" },
  red:    { dot: "var(--tr-red)",    text: "이미 피크" },
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

function Cover({ cover, height = 220, style }) {
  const { hue, sat, lum, label, src, position } = cover;
  const bg = `hsl(${hue} ${sat}% ${lum}%)`;
  const bg2 = `hsl(${hue} ${Math.max(0, sat - 20)}% ${Math.max(20, lum - 25)}%)`;
  const labelSize = typeof height === "number" && height > 200 ? 38 : 22;
  return (
    <div style={{
      position: "relative", width: "100%", height, borderRadius: "var(--tr-card-radius)",
      overflow: "hidden", background: `linear-gradient(155deg, ${bg} 0%, ${bg2} 100%)`,
      ...style,
    }}>
      {src ? (
        <>
          <img
            src={src}
            alt=""
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: position || "center",
              display: "block",
            }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.16), rgba(0,0,0,0) 52%)",
            pointerEvents: "none",
          }} />
        </>
      ) : (
        <>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(at 30% 20%, rgba(255,255,255,.25), transparent 50%), radial-gradient(at 70% 80%, rgba(0,0,0,.2), transparent 60%)",
            mixBlendMode: "overlay",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Space Grotesk', 'Pretendard', sans-serif",
            fontSize: labelSize, fontWeight: 700,
            letterSpacing: "-0.04em", lineHeight: 0.95, textAlign: "center",
            color: "rgba(255,255,255,.92)", whiteSpace: "pre-line",
            textShadow: "0 2px 18px rgba(0,0,0,0.18)",
            mixBlendMode: "screen",
          }}>{label}</div>
        </>
      )}
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
function HomeScreen({ layoutMode = "mobile", onTab, onCard, bookmarks, toggleBookmark }) {
  const { CARDS, REALTIME, CATEGORIES } = window.TR_DATA;
  const [cat, setCat] = useState("전체");
  const filtered = cat === "전체" ? CARDS : CARDS.filter(c => (c.macroCategory || c.category) === cat);

  return (
    <NewsletterHomeScreen
      layoutMode={layoutMode}
      cat={cat}
      setCat={setCat}
      cards={CARDS}
      filtered={filtered}
      categories={CATEGORIES}
      realtime={REALTIME}
      onTab={onTab}
      onCard={onCard}
      bookmarks={bookmarks}
      toggleBookmark={toggleBookmark}
    />
  );
}

const NEWSLETTER_BLUE = "#4353FF";
const NEWSLETTER_BLUE_DARK = "#2532D9";
const NEWSLETTER_BG = "#F5F6FA";
const NEWSLETTER_PAPER = "#FFFFFF";
const NEWSLETTER_INK = "#111318";
const NEWSLETTER_MUTED = "#6B7280";
const NEWSLETTER_LINE = "#E4E7EF";

function NewsletterHomeScreen({ layoutMode, cat, setCat, cards, filtered, categories, realtime, onTab, onCard, bookmarks, toggleBookmark }) {
  const isDesktop = layoutMode === "desktop";
  const isTablet = layoutMode === "tablet";
  const desktopLead = filtered[0] || cards[0];
  const visibleCards = isDesktop && desktopLead ? filtered.filter(card => card.id !== desktopLead.id) : filtered;
  const issueCount = filtered.length;
  return (
    <div style={{
      minHeight: "100vh",
      background: NEWSLETTER_BG,
      color: NEWSLETTER_INK,
      paddingBottom: isDesktop ? 72 : 112,
      overflowX: "hidden",
    }}>
      {isDesktop ? (
        <NewsletterMasthead onTab={onTab} />
      ) : (
        <NewsletterMobileHeader onTab={onTab} />
      )}

      <section style={{
        background: NEWSLETTER_PAPER,
        borderBottom: `1px solid ${NEWSLETTER_LINE}`,
      }}>
        <div style={{
          maxWidth: 1320,
          width: "100%",
          boxSizing: "border-box",
          margin: "0 auto",
          padding: isDesktop ? "54px 28px 62px" : isTablet ? "40px 24px 42px" : "30px 20px 34px",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 24,
          alignItems: "end",
        }}>
          <div style={{ maxWidth: isDesktop ? 780 : undefined }}>
            <h1 style={{
              margin: 0,
              fontSize: isDesktop ? 54 : isTablet ? 40 : 28,
              lineHeight: 1.02,
              letterSpacing: isDesktop ? "-0.06em" : "-0.075em",
              fontWeight: 950,
              whiteSpace: "nowrap",
              wordBreak: "keep-all",
            }}>
              요즘 핫한 이슈 모아보기
            </h1>
            <p style={{
              margin: "18px 0 0",
              maxWidth: 690,
              color: NEWSLETTER_MUTED,
              fontSize: isDesktop ? 16 : 14.5,
              lineHeight: 1.65,
              fontWeight: 750,
              overflowWrap: "anywhere",
            }}>
              SNS에서 자주 보이는 이슈와 유행을 보기 쉽게 모았어요.
            </p>
          </div>
        </div>
      </section>

      {!isDesktop && (
        <section style={{
          maxWidth: 1320,
          width: "100%",
          boxSizing: "border-box",
          margin: "0 auto",
          padding: isTablet ? "30px 24px 24px" : "24px 20px 20px",
        }}>
          <NewsletterHotPanel realtime={realtime} isDesktop={isDesktop} />
        </section>
      )}

      <NewsletterFilterBar
        categories={categories}
        cards={cards}
        cat={cat}
        setCat={setCat}
        isDesktop={isDesktop}
      />

      <main style={{
        maxWidth: 1320,
        width: "100%",
        boxSizing: "border-box",
        margin: "0 auto",
        padding: isDesktop ? "38px 28px 0" : isTablet ? "30px 24px 0" : "24px 20px 0",
      }}>
        {isDesktop && desktopLead && (
          <section style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 360px",
            gap: 28,
            alignItems: "stretch",
            marginBottom: 44,
          }}>
            <NewsletterFeaturedStory
              card={desktopLead}
              onCard={onCard}
              bookmarked={bookmarks.has(desktopLead.id)}
              onBookmark={() => toggleBookmark(desktopLead.id)}
            />
            <NewsletterHotPanel realtime={realtime} isDesktop={isDesktop} compact />
          </section>
        )}

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          gap: 16,
          marginBottom: 18,
        }}>
          <div>
            <div style={{ color: NEWSLETTER_BLUE, fontSize: 12, fontWeight: 950, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {cat === "전체" ? "전체 이슈" : cat}
            </div>
            <h2 style={{ margin: "6px 0 0", fontSize: isDesktop ? 28 : 23, letterSpacing: "-0.045em", fontWeight: 950 }}>
              이번 호 트렌드 카드
            </h2>
          </div>
          <div style={{ color: NEWSLETTER_MUTED, fontSize: 13, fontWeight: 850 }}>
            {issueCount}개
          </div>
        </div>

        <section style={{
          display: "grid",
          gridTemplateColumns: isDesktop
            ? "repeat(4, minmax(0, 1fr))"
            : isTablet
              ? "repeat(2, minmax(0, 1fr))"
              : "1fr",
          gap: isDesktop ? "34px 24px" : 18,
        }}>
          {visibleCards.map((card, i) => (
            <NewsletterArticleCard
              key={card.id}
              card={card}
              index={isDesktop && desktopLead ? i + 2 : i + 1}
              isDesktop={isDesktop}
              featured={!isDesktop && i === 0}
              bookmarked={bookmarks.has(card.id)}
              onBookmark={() => toggleBookmark(card.id)}
              onClick={() => onCard(card.id)}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

function NewsletterMasthead({ onTab }) {
  return (
    <header style={{
      background: NEWSLETTER_PAPER,
      position: "sticky",
      top: 0,
      zIndex: 20,
      borderBottom: `1px solid ${NEWSLETTER_LINE}`,
    }}>
      <div style={{
        maxWidth: 1320,
        width: "100%",
        boxSizing: "border-box",
        height: 84,
        margin: "0 auto",
        padding: "0 28px",
        display: "flex",
        alignItems: "center",
        gap: 28,
      }}>
        <button onClick={() => onTab("home")} style={{
          border: 0,
          background: "transparent",
          color: NEWSLETTER_INK,
          cursor: "pointer",
          padding: 0,
          fontSize: 30,
          fontFamily: "'Space Grotesk', 'Pretendard', sans-serif",
          fontWeight: 950,
          letterSpacing: "-0.075em",
        }}>
          Trend Radar
        </button>
        <button onClick={() => onTab("home")} style={{
          ...newsletterHeaderLink,
          height: 84,
          borderBottom: `2px solid ${NEWSLETTER_BLUE}`,
          color: NEWSLETTER_INK,
        }}>
          트렌드 레터
        </button>
        <button onClick={() => onTab("search")} style={{
          ...newsletterHeaderLink,
          height: 84,
          borderBottom: "2px solid transparent",
          color: "#4B5563",
        }}>
          탐색하기
        </button>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => onTab("profile")} style={newsletterSubscribeButton}>
            구독하기
          </button>
          <button onClick={() => onTab("profile")} style={newsletterAccountButton}>
            마이페이지
          </button>
        </div>
      </div>
    </header>
  );
}

function NewsletterMobileHeader({ onTab }) {
  return (
    <header style={{
      background: NEWSLETTER_PAPER,
      borderBottom: `1px solid ${NEWSLETTER_LINE}`,
      padding: "16px 18px",
      position: "sticky",
      top: 0,
      zIndex: 12,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => onTab("home")} style={{
          border: 0,
          background: "transparent",
          color: NEWSLETTER_INK,
          cursor: "pointer",
          padding: 0,
          fontSize: 21,
          fontWeight: 950,
          letterSpacing: "-0.055em",
        }}>
          Trend Radar
        </button>
      </div>
    </header>
  );
}

function NewsletterFilterBar({ categories, cards, cat, setCat, isDesktop }) {
  return (
    <section style={{
      background: "#EFF2F8",
      borderBottom: `1px solid ${NEWSLETTER_LINE}`,
    }}>
      <div style={{
        maxWidth: 1320,
        width: "100%",
        boxSizing: "border-box",
        margin: "0 auto",
        padding: isDesktop ? "16px 28px" : "14px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: isDesktop ? "flex-end" : "flex-start",
        gap: 10,
        overflowX: "auto",
      }} className="tr-no-scrollbar">
        {categories.map(category => {
          const count = category === "전체" ? cards.length : cards.filter(card => (card.macroCategory || card.category) === category).length;
          const active = cat === category;
          return (
            <button key={category} onClick={() => setCat(category)} style={{
              border: active ? `1px solid ${NEWSLETTER_BLUE}` : `1px solid ${NEWSLETTER_LINE}`,
              background: active ? NEWSLETTER_BLUE : NEWSLETTER_PAPER,
              color: active ? "#fff" : NEWSLETTER_INK,
              borderRadius: 999,
              padding: "9px 14px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontSize: 13,
              fontWeight: 900,
            }}>
              {category} <span style={{ opacity: active ? 0.78 : 0.48 }}>{count}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function NewsletterHotPanel({ realtime, isDesktop, compact = false }) {
  return (
    <aside style={{
      background: NEWSLETTER_PAPER,
      border: `1px solid ${NEWSLETTER_LINE}`,
      borderRadius: 18,
      padding: isDesktop ? 20 : 18,
      boxShadow: "0 18px 50px rgba(17,19,24,0.045)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 950, letterSpacing: "-0.035em" }}>실시간 HOT</h3>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: isDesktop && !compact ? "repeat(3, minmax(0, 1fr))" : "1fr",
        columnGap: 22,
        rowGap: 4,
      }}>
        {realtime.slice(0, 6).map(row => (
          <div key={row.rank} style={{
            display: "grid",
            gridTemplateColumns: "26px minmax(0, 1fr) 48px",
            alignItems: "center",
            gap: 9,
            padding: "8px 0",
            borderBottom: `1px solid ${NEWSLETTER_LINE}`,
          }}>
            <span style={{ fontSize: 13, fontWeight: 950, color: row.rank <= 3 ? NEWSLETTER_BLUE : NEWSLETTER_MUTED }}>{row.rank}</span>
            <span style={{ minWidth: 0, fontSize: 13, fontWeight: 900, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.kw}</span>
            <span style={{ textAlign: "right", fontSize: 11, fontWeight: 950, color: row.deltaType === "down" ? "#3182F6" : "#FF3B30" }}>{row.delta}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

function NewsletterFeaturedStory({ card, onCard, bookmarked, onBookmark }) {
  const metrics = getReproductionMetrics(card);
  return (
    <article onClick={() => onCard(card.id)} style={{
      cursor: "pointer",
      background: NEWSLETTER_PAPER,
      border: `1px solid ${NEWSLETTER_LINE}`,
      borderRadius: 18,
      overflow: "hidden",
      display: "grid",
      gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)",
      minHeight: 360,
      boxShadow: "0 18px 50px rgba(17,19,24,0.06)",
    }}>
      <div style={{ position: "relative", minHeight: 360 }}>
        <Cover cover={card.cover} height={360} style={{ borderRadius: 0, height: "100%" }} />
        <div style={{ position: "absolute", left: 16, top: 16 }}>
          <NewsletterLabel>{card.macroCategory || card.category}</NewsletterLabel>
        </div>
      </div>
      <div style={{ padding: 30, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <TimingPill timing={card.timing} />
          <StageBadge card={card} inline />
        </div>
        <h2 style={{
          margin: "18px 0 0",
          fontSize: 34,
          lineHeight: 1.12,
          letterSpacing: "-0.055em",
          fontWeight: 950,
        }}>
          {card.title}
        </h2>
        <p style={{
          margin: "14px 0 0",
          color: NEWSLETTER_MUTED,
          fontSize: 14.5,
          lineHeight: 1.65,
          fontWeight: 750,
        }}>
          {card.what}
        </p>
        <div style={{ marginTop: "auto", paddingTop: 22, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ color: NEWSLETTER_MUTED, fontSize: 12.5, fontWeight: 850 }}>{card.publishedAt}</span>
          <span style={{ color: NEWSLETTER_MUTED, fontSize: 12.5, fontWeight: 850 }}>재생산 {metrics.total.toLocaleString()}</span>
          <span style={{ color: NEWSLETTER_MUTED, fontSize: 12.5, fontWeight: 850 }}>{card.velocity}</span>
          <button onClick={(e) => { e.stopPropagation(); onBookmark(); }} style={newsletterBookmarkButton}>
            {bookmarked ? <IconBookmarkFilled size={16} /> : <IconBookmark size={16} />}
          </button>
        </div>
      </div>
    </article>
  );
}

function NewsletterArticleCard({ card, index, isDesktop, featured = false, bookmarked, onBookmark, onClick }) {
  const metrics = getReproductionMetrics(card);
  return (
    <article onClick={onClick} style={{
      cursor: "pointer",
      minWidth: 0,
      gridColumn: featured && isDesktop ? "span 2" : undefined,
    }}>
      <div style={{
        position: "relative",
        borderRadius: 10,
        overflow: "hidden",
        border: `1px solid ${NEWSLETTER_LINE}`,
        background: NEWSLETTER_PAPER,
      }}>
        <Cover cover={card.cover} height={featured ? (isDesktop ? 236 : 238) : (isDesktop ? 174 : 210)} style={{ borderRadius: 0 }} />
        <button onClick={(e) => { e.stopPropagation(); onBookmark(); }} style={{
          ...newsletterBookmarkButton,
          position: "absolute",
          right: 10,
          bottom: 10,
          background: bookmarked ? NEWSLETTER_BLUE : "rgba(255,255,255,0.92)",
          color: bookmarked ? "#fff" : NEWSLETTER_INK,
        }}>
          {bookmarked ? <IconBookmarkFilled size={15} /> : <IconBookmark size={15} />}
        </button>
      </div>
      <div style={{ padding: "13px 0 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <NewsletterLabel>{card.stageMeta?.short || card.macroCategory || card.category}</NewsletterLabel>
          <span style={{ color: NEWSLETTER_MUTED, fontSize: 12, fontWeight: 850 }}>{card.publishedAt}</span>
        </div>
        <h3 style={{
          margin: "10px 0 0",
          fontSize: featured ? (isDesktop ? 23 : 21) : (isDesktop ? 18 : 19),
          lineHeight: 1.3,
          letterSpacing: "-0.035em",
          fontWeight: 950,
        }}>
          {card.title}
        </h3>
        <p style={{
          margin: "7px 0 0",
          color: NEWSLETTER_MUTED,
          fontSize: 13.5,
          lineHeight: 1.55,
          fontWeight: 700,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {card.what}
        </p>
        <div style={{ marginTop: 11, display: "flex", alignItems: "center", gap: 9, color: NEWSLETTER_MUTED, fontSize: 12, fontWeight: 850 }}>
          <span>#{String(index).padStart(2, "0")}</span>
          <span style={{ width: 3, height: 3, borderRadius: 100, background: NEWSLETTER_MUTED, opacity: 0.45 }} />
          <span>{card.macroCategory || card.category}</span>
          <span style={{ width: 3, height: 3, borderRadius: 100, background: NEWSLETTER_MUTED, opacity: 0.45 }} />
          <span style={{ color: NEWSLETTER_BLUE }}>재생산 {metrics.total.toLocaleString()}</span>
        </div>
      </div>
    </article>
  );
}

function NewsletterLabel({ children }) {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      borderRadius: 0,
      background: NEWSLETTER_BLUE,
      color: "#fff",
      padding: "5px 8px",
      fontSize: 11,
      fontWeight: 950,
      lineHeight: 1,
      whiteSpace: "nowrap",
    }}>
      {children}
    </span>
  );
}

const newsletterHeaderLink = {
  border: 0,
  background: "transparent",
  color: NEWSLETTER_INK,
  cursor: "pointer",
  padding: 0,
  fontSize: 15,
  fontWeight: 900,
};

const newsletterSubscribeButton = {
  border: 0,
  background: NEWSLETTER_BLUE,
  color: "#fff",
  padding: "8px 13px",
  cursor: "pointer",
  fontSize: 12.5,
  fontWeight: 950,
};

const newsletterAccountButton = {
  border: `1px solid ${NEWSLETTER_INK}`,
  background: NEWSLETTER_PAPER,
  color: NEWSLETTER_INK,
  padding: "7px 10px",
  cursor: "pointer",
  fontSize: 12.5,
  fontWeight: 950,
};

const newsletterBookmarkButton = {
  border: `1px solid ${NEWSLETTER_LINE}`,
  background: NEWSLETTER_PAPER,
  color: NEWSLETTER_INK,
  width: 34,
  height: 34,
  borderRadius: 100,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  marginLeft: "auto",
};

function DesktopHomeScreen({ cat, setCat, filtered, onTab, onCard, bookmarks, toggleBookmark }) {
  const { CARDS, REALTIME, CATEGORIES, STAGES } = window.TR_DATA;
  const savedCards = CARDS.filter(card => bookmarks.has(card.id)).slice(0, 4);
  const stageCounts = Object.keys(STAGES).map(stage => ({
    stage,
    count: filtered.filter(card => card.stage === stage).length,
    meta: STAGES[stage],
  }));
  return (
    <div style={{
      minHeight: "100vh",
      padding: "28px 28px 40px",
    }}>
      <div style={{
        maxWidth: 1480,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "280px minmax(0, 1fr) 320px",
        gap: 24,
        alignItems: "start",
      }}>
        <aside style={{ position: "sticky", top: 28, display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: "var(--tr-muted)", fontWeight: 700 }}>2026년 5월 18일 · 월</div>
            <h1 style={{ margin: "8px 0 0", fontSize: 34, fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1.05 }}>
              오늘의 트렌드
            </h1>
            <div style={{ marginTop: 9, fontSize: 14, color: "var(--tr-muted)", fontWeight: 700, lineHeight: 1.45 }}>
              지금 SNS에서 확산 중
            </div>
          </div>

          <PanelLike title="카테고리">
            <div style={{ display: "grid", gap: 7 }}>
              {CATEGORIES.map(category => (
                <button key={category} onClick={() => setCat(category)} style={{
                  padding: "10px 12px", border: "1px solid var(--tr-line)", borderRadius: 8,
                  background: cat === category ? "var(--tr-fg)" : "var(--tr-bg)",
                  color: cat === category ? "var(--tr-bg)" : "var(--tr-fg)",
                  cursor: "pointer", fontSize: 13.5, fontWeight: 800,
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span>{category}</span>
                  <span>{category === "전체" ? CARDS.length : CARDS.filter(card => (card.macroCategory || card.category) === category).length}</span>
                </button>
              ))}
            </div>
          </PanelLike>

          <PanelLike title="오늘 요약">
            <div style={{ display: "grid", gap: 10 }}>
              <SummaryLine label="전체 카드" value={`${CARDS.length}개`} />
              <SummaryLine label="선택 카테고리" value={`${filtered.length}개`} />
              <SummaryLine label="저장한 카드" value={`${savedCards.length}개`} />
            </div>
          </PanelLike>
        </aside>

        <main>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "end",
            gap: 16, marginBottom: 18,
          }}>
            <div>
              <div style={{ fontSize: 12, color: "var(--tr-muted)", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {cat}
              </div>
              <h2 style={{ margin: "5px 0 0", fontSize: 28, fontWeight: 800, letterSpacing: "-0.04em" }}>
                지금 뜨는 트렌드 {filtered.length}개
              </h2>
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}>
            {filtered.map((card, i) => (
              <CardFeedItem key={card.id} card={card} index={i}
                            bookmarked={bookmarks.has(card.id)}
                            onBookmark={() => toggleBookmark(card.id)}
                            onClick={() => onCard(card.id)} />
            ))}
          </div>
        </main>

        <aside style={{ position: "sticky", top: 28, display: "flex", flexDirection: "column", gap: 16 }}>
          <RealtimeStrip data={REALTIME} embedded />
          <PanelLike title="지금 분포">
            <div style={{ display: "grid", gap: 10 }}>
              {stageCounts.map(item => (
                <div key={item.stage}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, fontWeight: 800 }}>
                    <span>{item.meta.short}</span>
                    <span>{item.count}</span>
                  </div>
                  <div style={{ marginTop: 6, height: 7, borderRadius: 100, background: "var(--tr-bg)", overflow: "hidden" }}>
                    <div style={{
                      width: `${filtered.length ? (item.count / filtered.length) * 100 : 0}%`,
                      height: "100%", borderRadius: 100, background: item.meta.color,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </PanelLike>
          <PanelLike title="북마크">
            {savedCards.length ? (
              <div style={{ display: "grid", gap: 10 }}>
                {savedCards.map(card => (
                  <button key={card.id} onClick={() => onCard(card.id)} style={{
                    border: 0, borderRadius: 8, background: "var(--tr-bg)", color: "var(--tr-fg)",
                    cursor: "pointer", padding: 10, textAlign: "left",
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 800, lineHeight: 1.3 }}>{card.title}</div>
                    <div style={{ marginTop: 4, fontSize: 11.5, color: "var(--tr-muted)", fontWeight: 700 }}>
                      {card.stageMeta?.short} · 재생산 {getReproductionMetrics(card).total.toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: 13, color: "var(--tr-muted)", lineHeight: 1.5 }}>저장한 카드가 없습니다.</div>
            )}
          </PanelLike>
        </aside>
      </div>
    </div>
  );
}

function SummaryLine({ label, value }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: 13,
      fontWeight: 800,
    }}>
      <span style={{ color: "var(--tr-muted)" }}>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function TabletHomeScreen({ cat, setCat, filtered, onCard, bookmarks, toggleBookmark }) {
  const { CATEGORIES, REALTIME } = window.TR_DATA;
  return (
    <div style={{ padding: "24px 24px 110px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: "var(--tr-muted)", fontWeight: 700 }}>2026년 5월 18일 · 월</div>
          <h1 style={{ margin: "6px 0 0", fontSize: 34, fontWeight: 800, letterSpacing: "-0.045em" }}>
            오늘의 트렌드
          </h1>
          <div style={{ marginTop: 7, fontSize: 14, color: "var(--tr-muted)", fontWeight: 700 }}>
            지금 SNS에서 확산 중
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <RealtimeStrip data={REALTIME} embedded />
      </div>

      <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "20px 0 10px" }} className="tr-no-scrollbar">
        {CATEGORIES.map(category => (
          <button key={category} onClick={() => setCat(category)} style={{
            padding: "8px 14px", borderRadius: 100, border: 0, cursor: "pointer",
            fontSize: 13.5, fontWeight: 700, whiteSpace: "nowrap",
            background: cat === category ? "var(--tr-fg)" : "var(--tr-card-2)",
            color: cat === category ? "var(--tr-bg)" : "var(--tr-fg)",
          }}>{category}</button>
        ))}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 24,
        marginTop: 12,
      }}>
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

function PanelLike({ title, children }) {
  return (
    <section style={{
      padding: 16, borderRadius: 8,
      background: "var(--tr-card-2)",
      border: "1px solid var(--tr-line)",
    }}>
      <div style={{ fontSize: 12, fontWeight: 900, color: "var(--tr-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
        {title}
      </div>
      {children}
    </section>
  );
}

function DesktopNavButton({ label, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "11px 12px", border: "1px solid var(--tr-line)", borderRadius: 8,
      background: "var(--tr-bg)", color: "var(--tr-fg)", cursor: "pointer",
      fontSize: 13.5, fontWeight: 800, textAlign: "left",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      {label}
      <IconChevronRight size={15} />
    </button>
  );
}

function RealtimeStrip({ data, embedded = false }) {
  const [showAll, setShowAll] = useState(false);
  const shown = showAll ? data : data.slice(0, 5);
  return (
    <div style={{
      margin: embedded ? 0 : "0 20px",
      padding: "14px 16px",
      background: "var(--tr-card-2)",
      borderRadius: embedded ? 8 : 18,
      border: embedded ? "1px solid var(--tr-line)" : 0,
    }}>
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
            지금 HOT · 09:30 업데이트
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
      <span style={{ fontSize: 11, color: "var(--tr-muted)", fontWeight: 700 }}>
        재생산
      </span>
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
  const metrics = getReproductionMetrics(card);
  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      <div style={{ position: "relative" }}>
        <Cover cover={card.cover} height={300} />
        {/* timing badge top-left */}
        <div style={{ position: "absolute", top: 14, left: 14 }}>
          <TimingPill timing={card.timing} />
        </div>
        <div style={{ position: "absolute", top: 14, right: 58 }}>
          <StageBadge card={card} />
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
          #{card.rank} · {card.macroCategory || card.category}
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
        <ReproductionSampleGrid card={card} />
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
          <span style={{
            fontSize: 11, color: "var(--tr-muted)", fontWeight: 500,
          }}>{card.publishedAt}</span>
          <span style={{ width: 3, height: 3, borderRadius: 100, background: "var(--tr-muted)", opacity: 0.5 }} />
          <span style={{ fontSize: 11, color: "var(--tr-muted)", fontWeight: 500 }}>
            재생산 {metrics.total.toLocaleString()}
          </span>
          <span style={{ width: 3, height: 3, borderRadius: 100, background: "var(--tr-muted)", opacity: 0.5 }} />
          <span style={{
            fontSize: 11, fontWeight: 600,
            color: metrics.last24hNew >= 0 ? "var(--tr-red)" : "var(--tr-blue)",
          }}>24h {metrics.last24hNew >= 0 ? "+" : ""}{metrics.last24hNew}</span>
        </div>
      </div>
    </div>
  );
}

function MinimalCardItem({ card, bookmarked, onBookmark, onClick }) {
  const metrics = getReproductionMetrics(card);
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
        <StageBadge card={card} inline />
        <span style={{ width: 3, height: 3, borderRadius: 100, background: "var(--tr-muted)", opacity: 0.5 }} />
        <span style={{
          fontSize: 11.5, fontWeight: 600,
          color: metrics.last24hNew >= 0 ? "var(--tr-red)" : "var(--tr-blue)",
        }}>재생산 {metrics.total.toLocaleString()} · 24h {metrics.last24hNew >= 0 ? "+" : ""}{metrics.last24hNew}</span>
      </div>
    </div>
  );
}

function CompactCardItem({ card, bookmarked, onBookmark, onClick }) {
  const metrics = getReproductionMetrics(card);
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
          <StageBadge card={card} inline />
        </div>
        <h2 style={{
          margin: 0, fontSize: 16, fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.25,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{card.title}</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, fontSize: 11.5, color: "var(--tr-muted)", fontWeight: 500 }}>
          <span>{card.macroCategory || card.category}</span>
          <span style={{ width: 3, height: 3, borderRadius: 100, background: "var(--tr-muted)", opacity: 0.5 }} />
          <span style={{ color: metrics.last24hNew >= 0 ? "var(--tr-red)" : "var(--tr-blue)", fontWeight: 600 }}>24h {metrics.last24hNew >= 0 ? "+" : ""}{metrics.last24hNew}</span>
        </div>
        <div style={{ marginTop: 5, fontSize: 11, color: "var(--tr-muted)", fontWeight: 600 }}>
          재생산 {metrics.total.toLocaleString()}
        </div>
      </div>
      <button onClick={(e) => { e.stopPropagation(); onBookmark(); }} style={{
        background: "transparent", border: 0, color: "var(--tr-fg)", cursor: "pointer", padding: 4, marginTop: 2,
      }}>{bookmarked ? <IconBookmarkFilled size={18} /> : <IconBookmark size={18} />}</button>
    </div>
  );
}

function getReproductionMetrics(card) {
  const metrics = card.reproductionMetrics || {};
  const total = (metrics.instagramPosts || 0) + (metrics.tiktokVideos || 0);
  return {
    total,
    last24hNew: metrics.last24hNew || 0,
  };
}

function StageBadge({ card, inline = false }) {
  const meta = card.stageMeta || window.TR_DATA.STAGES?.[card.stage];
  if (!meta) return null;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      padding: inline ? "3px 7px" : "5px 10px",
      borderRadius: 100,
      background: meta.bg,
      color: meta.color,
      border: `1px solid ${meta.color}`,
      fontSize: inline ? 10.5 : 11,
      fontWeight: 800,
      letterSpacing: "-0.01em",
      whiteSpace: "nowrap",
      backdropFilter: inline ? undefined : "blur(8px)",
    }}>
      {meta.short}
    </span>
  );
}

function ReproductionSampleGrid({ card }) {
  const samples = card.reproductionSamples || [];
  if (!samples.length) return null;
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
      gap: 5, marginTop: 12,
    }}>
      {samples.map((sample, i) => (
        <div key={i} style={{
          aspectRatio: "1 / 1",
          minHeight: 50,
          borderRadius: 8,
          background: `hsl(${sample.hue} ${sample.sat}% ${sample.lum}%)`,
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.34), transparent 58%)",
          }} />
          <div style={{
            position: "absolute", left: 6, bottom: 5,
            fontSize: 9.5, color: "#fff", fontWeight: 900,
            textShadow: "0 1px 2px rgba(0,0,0,0.45)",
          }}>
            {sample.platform === "instagram" ? "IG" : "TT"}
          </div>
        </div>
      ))}
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
  const [trend, setTrend] = React.useState(card.naverTrend);
  const [isLive, setIsLive] = React.useState(false);

  React.useEffect(() => {
    const { NAVER_CLIENT_ID, NAVER_CLIENT_SECRET, NAVER_PROXY } = API_CONFIG;
    if (!NAVER_CLIENT_ID || !card.keyword) return;
    fetchNaverTrend(card.keyword, NAVER_CLIENT_ID, NAVER_CLIENT_SECRET, NAVER_PROXY)
      .then(points => {
        if (points) { setTrend(prev => ({ ...prev, points })); setIsLive(true); }
      });
  }, [card.id]);

  const filters = trend?.audienceBreakdown ? {
    gender: trend.audienceBreakdown.gender || [],
    age: trend.audienceBreakdown.age || [],
  } : null;

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
        <TrendMetric label="주 검색층" value={trend.audience || "-"} />
      </div>
      {filters && (filters.gender.length > 0 || filters.age.length > 0) && (
        <SearcherDemographics filters={filters} />
      )}
      <div style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 11, color: "var(--tr-muted)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <IconClock size={12} />
          <span>최근 14일 일간 추이 · {trend.updatedAt} 갱신</span>
        </div>
        {isLive && <span style={{ fontSize: 10, fontWeight: 800, color: "var(--tr-green)", letterSpacing: "0.04em" }}>● 실데이터</span>}
      </div>
    </div>
  );
}

function SearcherDemographics({ filters }) {
  const rows = [...filters.gender, ...filters.age];
  return (
    <div style={{ marginTop: 14, padding: "14px 16px", borderRadius: 14, background: "var(--tr-bg)" }}>
      <div style={{ fontSize: 10.5, fontWeight: 800, color: "var(--tr-muted)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 12 }}>
        주요 검색층
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {rows.map(item => (
          <div key={item.label}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, fontWeight: 800 }}>
              <span>{item.label}</span>
              <span>{item.share ?? item.value}%</span>
            </div>
            <div style={{ marginTop: 5, height: 6, borderRadius: 100, background: "var(--tr-line)", overflow: "hidden" }}>
              <div style={{
                width: `${item.share ?? item.value}%`, height: "100%",
                borderRadius: 100, background: "var(--tr-accent)",
              }} />
            </div>
          </div>
        ))}
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
  const metrics = getReproductionMetrics(card);
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
          <div style={{ marginBottom: 10, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <TimingPill timing={card.timing} />
            <StageBadge card={card} inline />
          </div>
          <h1 style={{
            margin: 0, fontSize: 34, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.1,
            textShadow: "0 2px 16px rgba(0,0,0,0.25)",
          }}>{card.title}</h1>
          <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, fontWeight: 500, opacity: 0.9, flexWrap: "wrap" }}>
            <span>#{card.rank}</span>
            <span style={{ width: 3, height: 3, borderRadius: 100, background: "#fff", opacity: 0.5 }} />
            <span>{card.category}</span>
            <span style={{ width: 3, height: 3, borderRadius: 100, background: "#fff", opacity: 0.5 }} />
            <span>재생산 {metrics.total.toLocaleString()}</span>
            <span style={{ width: 3, height: 3, borderRadius: 100, background: "#fff", opacity: 0.5 }} />
            <span>24h {metrics.last24hNew >= 0 ? "+" : ""}{metrics.last24hNew}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "24px 20px 0", display: "flex", flexDirection: "column", gap: 28 }}>
        <StageSummaryPanel card={card} />
        <TrendVerificationCard card={card} />
        <YoutubePanel card={card} />
        <RelatedTrendsPanel card={card} />
      </div>
    </div>
  );
}

function StageSummaryPanel({ card }) {
  const metrics = getReproductionMetrics(card);
  const meta = card.stageMeta || window.TR_DATA.STAGES?.[card.stage];
  return (
    <div style={{
      padding: 18, borderRadius: 18, background: "var(--tr-card-2)",
      display: "flex", flexDirection: "column", gap: 14,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div>
          <SectionLabel>트렌드 단계</SectionLabel>
          <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
            <StageBadge card={card} />
            <span style={{ fontSize: 13, color: "var(--tr-muted)", fontWeight: 700 }}>
              {meta?.label}
            </span>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}>
            {metrics.total.toLocaleString()}
          </div>
          <div style={{ marginTop: 2, fontSize: 11.5, color: "var(--tr-muted)", fontWeight: 700 }}>재생산 콘텐츠</div>
        </div>
      </div>
      <div style={{ fontSize: 13.5, color: "var(--tr-muted)", lineHeight: 1.55, fontWeight: 600 }}>
        {card.stageReason}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        <MetricTile label="Instagram" value={(card.reproductionMetrics?.instagramPosts || 0).toLocaleString()} />
        <MetricTile label="TikTok" value={(card.reproductionMetrics?.tiktokVideos || 0).toLocaleString()} />
        <MetricTile label="24h" value={`${metrics.last24hNew >= 0 ? "+" : ""}${metrics.last24hNew}`} tone={metrics.last24hNew >= 0 ? "hot" : "cool"} />
      </div>
      <div style={{ fontSize: 11, color: "var(--tr-muted)", opacity: 0.6, lineHeight: 1.5 }}>
        Instagram · TikTok 재생산 수는 추정값입니다. 실데이터 수집은 Apify 연동 필요.
      </div>
    </div>
  );
}

function MetricTile({ label, value, tone }) {
  return (
    <div style={{
      padding: "12px 10px", borderRadius: 12, background: "var(--tr-bg)",
      minWidth: 0,
    }}>
      <div style={{
        fontSize: 16, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif",
        color: tone === "hot" ? "var(--tr-red)" : tone === "cool" ? "var(--tr-blue)" : "var(--tr-fg)",
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      }}>{value}</div>
      <div style={{ marginTop: 4, fontSize: 10.5, color: "var(--tr-muted)", fontWeight: 800 }}>{label}</div>
    </div>
  );
}

function YoutubePanel({ card }) {
  const [videos, setVideos] = React.useState(card.enrichment?.youtube || []);
  const [isLive, setIsLive] = React.useState(false);

  React.useEffect(() => {
    const { YOUTUBE_KEY } = API_CONFIG;
    if (!YOUTUBE_KEY || !card.keyword) return;
    fetchYouTubeVideos(card.keyword, YOUTUBE_KEY).then(result => {
      if (result && result.length > 0) { setVideos(result); setIsLive(true); }
    });
  }, [card.id]);

  if (!videos.length) return null;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <SectionLabel>유튜브 관련 영상</SectionLabel>
        {isLive && <span style={{ fontSize: 10, fontWeight: 800, color: "var(--tr-green)", letterSpacing: "0.04em" }}>● 실데이터</span>}
      </div>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 }} className="tr-no-scrollbar">
        {videos.map((item, i) => (
          <a key={i} href={item.link || "#"} target="_blank" rel="noopener noreferrer" style={{
            minWidth: 132, padding: 10, borderRadius: 12, background: "var(--tr-card-2)",
            textDecoration: "none", color: "inherit", display: "block", flexShrink: 0,
          }}>
            {item.thumbnail ? (
              <img src={item.thumbnail} alt="" style={{ width: "100%", height: 70, borderRadius: 8, objectFit: "cover", display: "block" }} />
            ) : (
              <div style={{
                height: 70, borderRadius: 8,
                background: `hsl(${item.thumbHue ?? 200} 70% 55%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: 11, fontWeight: 900,
              }}>SHORTS</div>
            )}
            <div style={{ marginTop: 8, fontSize: 12.5, fontWeight: 800, lineHeight: 1.35 }}>{item.title}</div>
            <div style={{ marginTop: 4, fontSize: 11.5, color: "var(--tr-muted)", fontWeight: 700 }}>
              {item.channel}{item.views ? ` · ${item.views}` : ""}
            </div>
          </a>
        ))}
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

function DesktopSectionShell({ eyebrow, title, description, children, aside }) {
  return (
    <div style={{ minHeight: "calc(100vh - 62px)", padding: "34px 28px 54px" }}>
      <div style={{ maxWidth: 1480, margin: "0 auto" }}>
        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 24,
          marginBottom: 22,
        }}>
          <div style={{ maxWidth: 760 }}>
            <div style={{
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.1em",
              color: "var(--tr-muted)",
            }}>{eyebrow}</div>
            <h1 style={{
              margin: "8px 0 0",
              fontSize: 34,
              lineHeight: 1.08,
              fontWeight: 950,
              letterSpacing: "-0.055em",
            }}>{title}</h1>
            {description && (
              <p style={{
                margin: "10px 0 0",
                color: "var(--tr-muted)",
                fontSize: 14.5,
                lineHeight: 1.6,
                fontWeight: 650,
              }}>{description}</p>
            )}
          </div>
        </header>
        <div style={{
          display: "grid",
          gridTemplateColumns: aside ? "minmax(0, 1fr) 320px" : "1fr",
          gap: 22,
          alignItems: "start",
        }}>
          <main style={{ minWidth: 0 }}>{children}</main>
          {aside && <aside style={{ position: "sticky", top: 88 }}>{aside}</aside>}
        </div>
      </div>
    </div>
  );
}

function SummaryPill({ label, value }) {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      padding: "8px 11px",
      borderRadius: 100,
      background: "var(--tr-bg)",
      border: "1px solid var(--tr-line)",
      fontSize: 12,
      fontWeight: 850,
    }}>
      <span style={{ color: "var(--tr-muted)" }}>{label}</span>
      <span>{value}</span>
    </span>
  );
}

const softDesktopChip = {
  display: "inline-flex",
  alignItems: "center",
  padding: "6px 9px",
  borderRadius: 100,
  background: "var(--tr-bg)",
  border: "1px solid var(--tr-line)",
  color: "var(--tr-fg)",
  fontSize: 11.5,
  fontWeight: 850,
};

const desktopPrimaryButton = {
  border: 0,
  borderRadius: 8,
  background: "var(--tr-fg)",
  color: "var(--tr-bg)",
  padding: "12px 16px",
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 900,
};

// ─── Shorts Feed ──────────────────────────────────────────────
function ShortsScreen({ layoutMode = "mobile", onCard }) {
  const { CARDS, DEBATES = [], SHORTS_FEED = [] } = window.TR_DATA;
  const [votesByDebateId, setVotesByDebateId] = useState({});
  const items = SHORTS_FEED.map(item => {
    if (item.type === "debate") {
      const debate = DEBATES.find(d => d.id === item.debateId);
      return debate ? { ...item, debate } : null;
    }
    const card = CARDS.find(c => c.id === item.cardId);
    return card ? { ...item, card } : null;
  }).filter(Boolean);

  const vote = (debateId, side) => {
    setVotesByDebateId(prev => ({ ...prev, [debateId]: side }));
  };

  if (layoutMode === "desktop") {
    return (
      <DesktopShortsScreen
        items={items}
        votesByDebateId={votesByDebateId}
        onVote={vote}
        onCard={onCard}
      />
    );
  }

  return (
    <div style={{
      height: layoutMode === "desktop" ? "calc(100vh - 62px)" : layoutMode === "tablet" ? "calc(100vh - 84px)" : "100%",
      minHeight: layoutMode === "desktop" ? 680 : "100%",
      maxWidth: layoutMode === "mobile" ? "100%" : 520,
      margin: layoutMode === "mobile" ? 0 : "0 auto",
      overflowY: "auto",
      scrollSnapType: "y mandatory",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      background: "var(--tr-bg)",
    }} className="tr-no-scrollbar">
      {items.map(item => item.type === "debate" ? (
        <ShortsDebateSlide
          key={item.id}
          debate={item.debate}
          selected={votesByDebateId[item.debate.id]}
          onVote={vote}
          layoutMode={layoutMode}
        />
      ) : (
        <ShortsTrendSlide
          key={item.id}
          card={item.card}
          onCard={onCard}
          layoutMode={layoutMode}
        />
      ))}
    </div>
  );
}

function DesktopShortsScreen({ items, votesByDebateId, onVote, onCard }) {
  const [selectedId, setSelectedId] = useState(items[0]?.id);
  const active = items.find(item => item.id === selectedId) || items[0];
  const trendItems = items.filter(item => item.type !== "debate" && item.card).slice(0, 4);
  return (
    <DesktopSectionShell
      eyebrow="숏폼 레이더"
      title="넘겨보기 전에 흐름부터 봐요"
      description="모바일처럼 한 장씩 넘기기보다, 데스크탑에서는 후보를 한 번에 훑고 바로 카드로 들어갈 수 있게 구성했습니다."
      aside={(
        <div style={{ display: "grid", gap: 16 }}>
          <PanelLike title="오늘 숏폼 포인트">
            <div style={{ display: "grid", gap: 10 }}>
              <SummaryLine label="피드 항목" value={`${items.length}개`} />
              <SummaryLine label="트렌드 카드" value={`${items.filter(item => item.card).length}개`} />
              <SummaryLine label="커뮤니티 질문" value={`${items.filter(item => item.type === "debate").length}개`} />
            </div>
          </PanelLike>
          <PanelLike title="빠르게 볼 카드">
            <div style={{ display: "grid", gap: 10 }}>
              {trendItems.map(item => (
                <button key={item.id} onClick={() => setSelectedId(item.id)} style={{
                  border: "1px solid var(--tr-line)",
                  background: selectedId === item.id ? "var(--tr-fg)" : "var(--tr-bg)",
                  color: selectedId === item.id ? "var(--tr-bg)" : "var(--tr-fg)",
                  borderRadius: 8,
                  padding: 10,
                  cursor: "pointer",
                  textAlign: "left",
                }}>
                  <div style={{ fontSize: 13, fontWeight: 900, lineHeight: 1.35 }}>{item.card.title}</div>
                  <div style={{ marginTop: 4, fontSize: 11.5, opacity: 0.7, fontWeight: 750 }}>
                    #{item.card.rank} · {item.card.macroCategory || item.card.category}
                  </div>
                </button>
              ))}
            </div>
          </PanelLike>
        </div>
      )}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "300px minmax(0, 1fr)",
        gap: 18,
        alignItems: "start",
      }}>
        <PanelLike title="피드">
          <div style={{ display: "grid", gap: 8 }}>
            {items.map(item => {
              const title = item.type === "debate" ? item.debate.title : item.card.title;
              const meta = item.type === "debate" ? "커뮤니티 질문" : `#${item.card.rank} · ${item.card.macroCategory || item.card.category}`;
              return (
                <button key={item.id} onClick={() => setSelectedId(item.id)} style={{
                  border: "1px solid var(--tr-line)",
                  borderRadius: 8,
                  background: selectedId === item.id ? "var(--tr-fg)" : "var(--tr-bg)",
                  color: selectedId === item.id ? "var(--tr-bg)" : "var(--tr-fg)",
                  padding: 12,
                  textAlign: "left",
                  cursor: "pointer",
                }}>
                  <div style={{ fontSize: 12, opacity: 0.68, fontWeight: 850 }}>{meta}</div>
                  <div style={{ marginTop: 5, fontSize: 14, fontWeight: 900, lineHeight: 1.35 }}>{title}</div>
                </button>
              );
            })}
          </div>
        </PanelLike>

        {active?.type === "debate" ? (
          <DesktopDebatePreview
            debate={active.debate}
            selected={votesByDebateId[active.debate.id]}
            onVote={onVote}
          />
        ) : active?.card ? (
          <DesktopShortsPreview card={active.card} onCard={onCard} />
        ) : null}
      </div>
    </DesktopSectionShell>
  );
}

function DesktopShortsPreview({ card, onCard }) {
  const metrics = getReproductionMetrics(card);
  return (
    <section style={{
      border: "1px solid var(--tr-line)",
      borderRadius: 8,
      background: "var(--tr-card-2)",
      overflow: "hidden",
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(320px, 0.95fr) minmax(0, 1.05fr)", minHeight: 420 }}>
        <Cover cover={card.cover} height="100%" style={{ borderRadius: 0, minHeight: 420 }} />
        <div style={{ padding: 26, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <TimingPill timing={card.timing} />
            <StageBadge card={card} inline />
            <span style={softDesktopChip}>{card.macroCategory || card.category}</span>
          </div>
          <h2 style={{ margin: "18px 0 0", fontSize: 36, lineHeight: 1.08, fontWeight: 950, letterSpacing: "-0.055em" }}>
            {card.title}
          </h2>
          <p style={{ margin: "14px 0 0", fontSize: 15.5, color: "var(--tr-muted)", lineHeight: 1.65, fontWeight: 650 }}>
            {card.what}
          </p>
          <div style={{
            marginTop: 20,
            padding: 16,
            borderRadius: 8,
            background: "var(--tr-bg)",
            border: "1px solid var(--tr-line)",
          }}>
            <div style={{ fontSize: 11, color: "var(--tr-muted)", fontWeight: 900, letterSpacing: "0.08em" }}>3초 훅</div>
            <div style={{ marginTop: 8, fontSize: 20, fontWeight: 900, lineHeight: 1.35 }}>"{card.hook}"</div>
          </div>
          <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", paddingTop: 22 }}>
            <SummaryPill label="재생산" value={metrics.total.toLocaleString()} />
            <SummaryPill label="24h" value={`${metrics.last24hNew >= 0 ? "+" : ""}${metrics.last24hNew}`} />
            <button onClick={() => onCard(card.id)} style={desktopPrimaryButton}>
              카드 자세히 보기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function DesktopDebatePreview({ debate, selected, onVote }) {
  return (
    <section style={{
      border: "1px solid var(--tr-line)",
      borderRadius: 8,
      background: "var(--tr-card-2)",
      padding: 26,
      minHeight: 420,
    }}>
      <div style={{ fontSize: 12, color: "var(--tr-muted)", fontWeight: 900, letterSpacing: "0.08em" }}>커뮤니티 질문</div>
      <h2 style={{ margin: "12px 0 0", fontSize: 34, lineHeight: 1.12, fontWeight: 950, letterSpacing: "-0.05em" }}>
        {debate.title}
      </h2>
      <p style={{ margin: "12px 0 22px", fontSize: 15, color: "var(--tr-muted)", lineHeight: 1.6 }}>
        {debate.subtitle}
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {[
          { id: "left", label: debate.leftLabel, percent: debate.leftPercent, args: debate.leftArguments },
          { id: "right", label: debate.rightLabel, percent: debate.rightPercent, args: debate.rightArguments },
        ].map(option => (
          <button key={option.id} onClick={() => onVote(debate.id, option.id)} style={{
            border: "1px solid var(--tr-line)",
            borderRadius: 8,
            background: selected === option.id ? "var(--tr-fg)" : "var(--tr-bg)",
            color: selected === option.id ? "var(--tr-bg)" : "var(--tr-fg)",
            padding: 18,
            textAlign: "left",
            cursor: "pointer",
          }}>
            <div style={{ fontSize: 17, fontWeight: 900 }}>{option.label}</div>
            <div style={{ marginTop: 6, fontSize: 24, fontWeight: 950, letterSpacing: "-0.04em" }}>{option.percent}%</div>
            <div style={{ marginTop: 10, display: "grid", gap: 6 }}>
              {option.args.slice(0, 2).map(arg => (
                <div key={arg} style={{ fontSize: 12.5, opacity: 0.72, lineHeight: 1.45 }}>{arg}</div>
              ))}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function ShortsTrendSlide({ card, onCard, layoutMode }) {
  const metrics = getReproductionMetrics(card);
  const hashtags = card.relatedTrends?.hashtags?.slice(0, 3) || [`#${card.category}`, "#오늘의트렌드"];
  return (
    <section style={shortsSlideStyle(layoutMode)}>
      <div style={shortsSlideInnerStyle}>
        <ShortsSlideBackdrop cover={card.cover} />
        <div style={shortsContentStyle(layoutMode)}>
          <div style={{ padding: "14px 20px 0", display: "grid", gridTemplateColumns: "1fr 52px", gap: 14, alignItems: "start" }}>
            <div style={{ minWidth: 0 }}>
              <h1 style={{
                margin: 0, fontSize: 31, lineHeight: 1.1, fontWeight: 900,
                letterSpacing: "-0.05em",
              }}>{card.title}</h1>
              <p style={{
                margin: "12px 0 0", fontSize: 14.5, lineHeight: 1.55,
                color: "var(--tr-muted)", fontWeight: 600, letterSpacing: "-0.015em",
              }}>{card.what}</p>
              <div style={{ marginTop: 13, display: "flex", flexWrap: "wrap", gap: 7 }}>
                {hashtags.map(tag => <ShortsHash key={tag}>{tag}</ShortsHash>)}
              </div>
            </div>
            <ShortsActionRail likes={formatShortCount(metrics.total)} comments={formatShortCount(card.community?.comments?.length || 0)} shares={formatShortCount(metrics.last7dCount || 0)} />
          </div>

          <div style={{ padding: "14px 20px 76px" }}>
            <button onClick={() => onCard(card.id)} style={{
              width: "100%", border: 0, borderRadius: 100, padding: "15px 18px",
              background: "var(--tr-fg)", color: "var(--tr-bg)", fontSize: 15,
              fontWeight: 900, letterSpacing: "-0.02em", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              상세 분석 보기 <IconChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShortsDebateSlide({ debate, selected, onVote, layoutMode }) {
  const baseTotal = debate.participants || 0;
  const leftBase = Math.round(baseTotal * debate.leftPercent / 100);
  const rightBase = Math.max(0, baseTotal - leftBase);
  const leftVotes = leftBase + (selected === "left" ? 1 : 0);
  const rightVotes = rightBase + (selected === "right" ? 1 : 0);
  const total = Math.max(1, leftVotes + rightVotes);
  const leftPercent = Math.round(leftVotes / total * 100);
  const rightPercent = 100 - leftPercent;
  return (
    <section style={shortsSlideStyle(layoutMode)}>
      <div style={shortsSlideInnerStyle}>
        <ShortsSlideBackdrop cover={debate.cover} />
        <div style={shortsContentStyle(layoutMode)}>
          <div style={{ padding: "14px 20px 76px", display: "grid", gridTemplateColumns: "minmax(0, 1fr) 52px", gap: 14, alignItems: "end" }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 31, lineHeight: 1.1, fontWeight: 900, letterSpacing: "-0.05em" }}>
                {debate.title}
              </h1>
              <p style={{
                margin: "12px 0 0", fontSize: 14.5, lineHeight: 1.55,
                color: "var(--tr-muted)", fontWeight: 600, letterSpacing: "-0.015em",
              }}>{debate.subtitle}</p>
              <DebateGraphVote
                debate={debate}
                selected={selected}
                leftPercent={leftPercent}
                rightPercent={rightPercent}
                onVote={onVote}
              />
            </div>
            <ShortsActionRail likes={debate.likes} comments={debate.comments} shares={debate.shares} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ShortsActionRail({ likes, comments, shares }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, paddingTop: 4 }}>
      <ShortsAction Icon={IconHeart} value={likes} />
      <ShortsAction Icon={IconMessage} value={comments} />
      <ShortsAction Icon={IconShare} value={shares} />
    </div>
  );
}

function ShortsSlideBackdrop({ cover }) {
  if (!cover) return null;
  const { hue, sat, lum, label, src, position } = cover;
  const bg = `hsl(${hue} ${sat}% ${Math.min(92, lum + 10)}%)`;
  const bg2 = `hsl(${(hue + 28) % 360} ${Math.max(30, sat - 18)}% ${Math.max(58, lum - 4)}%)`;
  if (src) {
    return (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0, background: "var(--tr-bg)" }}>
        <img
          src={src}
          alt=""
          loading="lazy"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: position || "center",
            opacity: 0.86,
            filter: "saturate(1.05)",
          }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: [
            "linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.12) 24%, rgba(247,247,245,0.82) 56%, var(--tr-bg) 91%)",
            "radial-gradient(at 50% 18%, rgba(255,255,255,0.2), rgba(255,255,255,0) 42%)",
          ].join(", "),
        }} />
      </div>
    );
  }
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <div style={{
        position: "absolute", top: 36, left: "50%", transform: "translateX(-50%) rotate(-8deg)",
        width: 360, height: 250, borderRadius: 42,
        background: `linear-gradient(145deg, ${bg}, ${bg2})`,
        opacity: 0.2, filter: "blur(24px)",
      }} />
      <div style={{
        position: "absolute", top: 74, left: "50%", transform: "translateX(-50%)",
        width: 270, textAlign: "center", color: "var(--tr-fg)",
        fontFamily: "'Space Grotesk', 'Pretendard', sans-serif",
        fontSize: 42, fontWeight: 900, letterSpacing: "-0.06em", lineHeight: 0.92,
        opacity: 0.045, whiteSpace: "pre-line",
      }}>{label}</div>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0) 34%, var(--tr-bg) 86%)",
      }} />
    </div>
  );
}

function ShortsAction({ Icon, value }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: "var(--tr-muted)" }}>
      <span style={{
        width: 38, height: 38, borderRadius: 100, background: "var(--tr-card-2)",
        display: "flex", alignItems: "center", justifyContent: "center", color: "var(--tr-fg)",
      }}><Icon size={18} /></span>
      <span style={{ fontSize: 11, fontWeight: 900, fontFamily: "'Space Grotesk', sans-serif" }}>{value}</span>
    </div>
  );
}

function DebatePercent({ value, label, color, align = "left" }) {
  return (
    <div style={{ textAlign: align, minWidth: 0 }}>
      <div style={{ color, fontSize: 28, fontWeight: 900, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.06em" }}>
        {value}%
      </div>
      <div style={{ marginTop: 2, color, fontSize: 12, fontWeight: 900, letterSpacing: "-0.02em" }}>{label}</div>
    </div>
  );
}

function DebateArgumentCard({ title, items, color, bg }) {
  return (
    <div style={{ padding: 12, borderRadius: 12, background: bg, border: `1px solid ${color}` }}>
      <div style={{ color, fontSize: 12.5, fontWeight: 900, marginBottom: 8 }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items.slice(0, 3).map(item => (
          <div key={item} style={{ color: "var(--tr-fg)", fontSize: 12, lineHeight: 1.45, fontWeight: 650 }}>
            <span style={{ color }}>•</span> {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function DebateVoteButton({ selected, color, label, onClick }) {
  return (
    <button onClick={onClick} style={{
      border: `1px solid ${selected ? color : "var(--tr-line)"}`,
      background: selected ? color : "var(--tr-card-2)",
      color: selected ? "#fff" : "var(--tr-fg)",
      borderRadius: 100, padding: "14px 10px", cursor: "pointer",
      fontSize: 13.5, fontWeight: 900, letterSpacing: "-0.02em",
    }}>
      {selected ? "투표했습니다" : label}
    </button>
  );
}

function DebateGraphVote({ debate, selected, leftPercent, rightPercent, onVote }) {
  const leftSelected = selected === "left";
  const rightSelected = selected === "right";
  return (
    <div style={{
      marginTop: 18,
      animation: "tr-vote-rise .32s ease both",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        fontSize: 12.5,
        fontWeight: 900,
        letterSpacing: "-0.02em",
      }}>
        <button onClick={() => onVote(debate.id, "left")} style={debateGraphLabelStyle(leftSelected, "var(--tr-blue)")}>
          {debate.leftLabel}
        </button>
        <button onClick={() => onVote(debate.id, "right")} style={debateGraphLabelStyle(rightSelected, "var(--tr-red)")}>
          {debate.rightLabel}
        </button>
      </div>

      <div style={{
        marginTop: 8,
        height: 8,
        borderRadius: 100,
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: `${Math.max(1, leftPercent)}fr ${Math.max(1, rightPercent)}fr`,
        background: "rgba(17,19,24,0.1)",
        boxShadow: "inset 0 0 0 1px rgba(17,19,24,0.05)",
      }}>
        <button
          aria-label={`${debate.leftLabel} 투표`}
          onClick={() => onVote(debate.id, "left")}
          style={debateGraphSegmentStyle("var(--tr-blue)", leftSelected, "left")}
        />
        <button
          aria-label={`${debate.rightLabel} 투표`}
          onClick={() => onVote(debate.id, "right")}
          style={debateGraphSegmentStyle("var(--tr-red)", rightSelected, "right")}
        />
      </div>

      <div style={{
        marginTop: 7,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "var(--tr-muted)",
        fontSize: 12.5,
        fontWeight: 900,
        fontFamily: "'Space Grotesk', 'Pretendard', sans-serif",
      }}>
        <span style={{ color: leftSelected ? "var(--tr-blue)" : "var(--tr-muted)" }}>{leftPercent}%</span>
        <span style={{ color: rightSelected ? "var(--tr-red)" : "var(--tr-muted)" }}>{rightPercent}%</span>
      </div>
    </div>
  );
}

function debateGraphLabelStyle(selected, color) {
  return {
    minWidth: 0,
    border: 0,
    background: "transparent",
    color: selected ? color : "var(--tr-fg)",
    padding: 0,
    font: "inherit",
    cursor: "pointer",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    transition: "color .18s ease, transform .18s ease",
    transform: selected ? "translateY(-1px)" : "none",
  };
}

function debateGraphSegmentStyle(color, selected, side) {
  return {
    minWidth: 0,
    height: "100%",
    border: 0,
    background: color,
    opacity: selected ? 1 : 0.62,
    cursor: "pointer",
    transformOrigin: side === "right" ? "right center" : "left center",
    animation: "tr-vote-fill .52s cubic-bezier(.2,.8,.2,1) both",
    filter: selected ? "saturate(1.2) brightness(1.08)" : "none",
    transition: "opacity .18s ease, filter .18s ease",
  };
}

function ShortsHash({ children }) {
  return (
    <span style={{
      padding: "7px 9px", borderRadius: 100, background: "var(--tr-card-2)",
      color: "var(--tr-muted)", fontSize: 11.5, fontWeight: 800,
    }}>{children}</span>
  );
}

function shortsSlideStyle(layoutMode) {
  const slideHeight = layoutMode === "desktop" ? "calc(100vh - 62px)" : layoutMode === "tablet" ? "calc(100vh - 84px)" : "100%";
  return {
    height: slideHeight,
    minHeight: slideHeight,
    scrollSnapAlign: "start",
    display: "flex",
    flexDirection: "column",
    background: "var(--tr-bg)",
    position: "relative",
    overflow: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  };
}

const shortsSlideInnerStyle = {
  height: "100%",
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  zIndex: 1,
};

function shortsContentStyle(layoutMode) {
  return {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingTop: layoutMode === "mobile" ? 130 : 96,
    paddingBottom: layoutMode === "mobile" ? 6 : 12,
    position: "relative",
    zIndex: 2,
  };
}

function formatParticipants(value) {
  if (value >= 10000) return `${(value / 10000).toFixed(1)}만`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return String(value);
}

function formatShortCount(value) {
  const n = Number(value) || 0;
  if (n >= 10000) return `${(n / 10000).toFixed(1)}만`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

// ─── Search Screen ────────────────────────────────────────────
function SearchScreen({ layoutMode = "mobile", onCard, bookmarks, toggleBookmark }) {
  const { CARDS, CATEGORIES } = window.TR_DATA;
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("전체");
  const trending = ["얼먹젤리", "코스트코 망고푸딩", "칠리스 치즈스틱", "동결건조"];
  const filtered = CARDS.filter(c =>
    (cat === "전체" || (c.macroCategory || c.category) === cat) &&
    (q.trim() === "" || c.title.includes(q.trim()) || c.what.includes(q.trim()) || (c.macroCategory || c.category).includes(q.trim()))
  );

  if (layoutMode === "desktop") {
    return (
      <DesktopSearchScreen
        q={q}
        setQ={setQ}
        cat={cat}
        setCat={setCat}
        trending={trending}
        filtered={filtered}
        categories={CATEGORIES}
        cards={CARDS}
        onCard={onCard}
        bookmarks={bookmarks}
        toggleBookmark={toggleBookmark}
      />
    );
  }

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

function DesktopSearchScreen({ q, setQ, cat, setCat, trending, filtered, categories, cards, onCard, bookmarks, toggleBookmark }) {
  return (
    <DesktopSectionShell
      eyebrow="검색"
      title="트렌드, 메뉴, 카테고리를 한 번에 찾아요"
      description="데스크탑에서는 필터와 결과를 동시에 보면서 후보를 빠르게 비교할 수 있게 했습니다."
      aside={(
        <div style={{ display: "grid", gap: 16 }}>
          <PanelLike title="많이 찾는 키워드">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {trending.map((keyword, i) => (
                <button key={keyword} onClick={() => setQ(keyword)} style={{
                  border: "1px solid var(--tr-line)",
                  borderRadius: 100,
                  background: q === keyword ? "var(--tr-fg)" : "var(--tr-bg)",
                  color: q === keyword ? "var(--tr-bg)" : "var(--tr-fg)",
                  padding: "9px 12px",
                  cursor: "pointer",
                  fontSize: 12.5,
                  fontWeight: 850,
                }}>
                  {i + 1}. {keyword}
                </button>
              ))}
            </div>
          </PanelLike>
          <PanelLike title="검색 요약">
            <div style={{ display: "grid", gap: 10 }}>
              <SummaryLine label="전체 카드" value={`${cards.length}개`} />
              <SummaryLine label="검색 결과" value={`${filtered.length}개`} />
              <SummaryLine label="선택 필터" value={cat} />
            </div>
          </PanelLike>
        </div>
      )}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "260px minmax(0, 1fr)",
        gap: 18,
        alignItems: "start",
      }}>
        <PanelLike title="필터">
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 13px",
            border: "1px solid var(--tr-line)",
            background: "var(--tr-bg)",
            borderRadius: 8,
            marginBottom: 14,
          }}>
            <IconSearch size={18} stroke="var(--tr-muted)" />
            <input value={q} onChange={(e) => setQ(e.target.value)}
                   placeholder="검색어 입력"
                   style={{
                     flex: 1,
                     border: 0,
                     outline: "none",
                     background: "transparent",
                     color: "var(--tr-fg)",
                     font: "inherit",
                     fontSize: 14,
                   }} />
          </div>
          <div style={{ display: "grid", gap: 7 }}>
            {categories.map(category => (
              <button key={category} onClick={() => setCat(category)} style={{
                padding: "10px 12px",
                border: "1px solid var(--tr-line)",
                borderRadius: 8,
                background: cat === category ? "var(--tr-fg)" : "var(--tr-bg)",
                color: cat === category ? "var(--tr-bg)" : "var(--tr-fg)",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 850,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <span>{category}</span>
                <span>{category === "전체" ? cards.length : cards.filter(card => (card.macroCategory || card.category) === category).length}</span>
              </button>
            ))}
          </div>
        </PanelLike>

        <PanelLike title={`검색 결과 ${filtered.length}건`}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
            {filtered.map(card => (
              <CardFeedItem key={card.id} card={card}
                            bookmarked={bookmarks.has(card.id)}
                            onBookmark={() => toggleBookmark(card.id)}
                            onClick={() => onCard(card.id)} />
            ))}
          </div>
        </PanelLike>
      </div>
    </DesktopSectionShell>
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
function BookmarksScreen({ layoutMode = "mobile", bookmarks, toggleBookmark, onCard }) {
  const cards = window.TR_DATA.CARDS.filter(c => bookmarks.has(c.id));

  if (layoutMode === "desktop") {
    return (
      <DesktopBookmarksScreen
        cards={cards}
        bookmarks={bookmarks}
        toggleBookmark={toggleBookmark}
        onCard={onCard}
      />
    );
  }

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

function DesktopBookmarksScreen({ cards, bookmarks, toggleBookmark, onCard }) {
  const allCards = window.TR_DATA.CARDS;
  const savedCategories = Array.from(new Set(cards.map(card => card.macroCategory || card.category)));
  return (
    <DesktopSectionShell
      eyebrow="북마크"
      title="나중에 찍을 카드를 모아봐요"
      description="저장한 카드를 카테고리와 타이밍 기준으로 빠르게 다시 고를 수 있는 데스크탑 보관함입니다."
      aside={(
        <div style={{ display: "grid", gap: 16 }}>
          <PanelLike title="저장 요약">
            <div style={{ display: "grid", gap: 10 }}>
              <SummaryLine label="저장한 카드" value={`${cards.length}장`} />
              <SummaryLine label="전체 카드" value={`${allCards.length}장`} />
              <SummaryLine label="카테고리" value={`${savedCategories.length || 0}개`} />
            </div>
          </PanelLike>
          <PanelLike title="저장 카테고리">
            {savedCategories.length ? (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {savedCategories.map(category => <span key={category} style={softDesktopChip}>{category}</span>)}
              </div>
            ) : (
              <div style={{ fontSize: 13, color: "var(--tr-muted)", lineHeight: 1.5 }}>아직 저장한 카테고리가 없어요.</div>
            )}
          </PanelLike>
        </div>
      )}
    >
      {cards.length === 0 ? (
        <section style={{
          border: "1px solid var(--tr-line)",
          borderRadius: 8,
          background: "var(--tr-card-2)",
          padding: 60,
          textAlign: "center",
        }}>
          <div style={{ display: "inline-flex", padding: 16, background: "var(--tr-bg)", borderRadius: 100, color: "var(--tr-muted)" }}>
            <IconBookmark size={24} />
          </div>
          <h2 style={{ margin: "16px 0 0", fontSize: 24, letterSpacing: "-0.04em" }}>아직 저장한 카드가 없어요</h2>
          <p style={{ margin: "8px 0 0", color: "var(--tr-muted)", fontSize: 14 }}>홈에서 마음에 드는 트렌드를 저장하면 여기에 모입니다.</p>
        </section>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {cards.map(card => (
            <div key={card.id} style={{ border: "1px solid var(--tr-line)", borderRadius: 8, padding: 14, background: "var(--tr-card-2)" }}>
              <CardFeedItem card={card}
                            bookmarked={bookmarks.has(card.id)}
                            onBookmark={() => toggleBookmark(card.id)}
                            onClick={() => onCard(card.id)} />
            </div>
          ))}
        </div>
      )}
    </DesktopSectionShell>
  );
}

// ─── Profile ──────────────────────────────────────────────────
function ProfileScreen({ layoutMode = "mobile", onAdmin }) {
  if (layoutMode === "desktop") {
    return <DesktopProfileScreen onAdmin={onAdmin} />;
  }

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
              <div style={{ fontSize: 12, opacity: 0.6, marginTop: 2 }}>수집 큐 · 후보 검수 · 소스</div>
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

function DesktopProfileScreen({ onAdmin }) {
  return (
    <DesktopSectionShell
      eyebrow="설정"
      title="내 작업 환경을 확인해요"
      description="데스크탑에서는 운영자 콘솔 진입과 활동 정보를 한 화면에서 볼 수 있게 정리했습니다."
      aside={(
        <PanelLike title="프로토타입">
          <div style={{ display: "grid", gap: 10 }}>
            <SummaryLine label="버전" value="MVP v0.1" />
            <SummaryLine label="화면" value="데스크탑" />
            <SummaryLine label="데이터" value="Mock" />
          </div>
        </PanelLike>
      )}
    >
      <div style={{ display: "grid", gridTemplateColumns: "minmax(320px, 0.8fr) minmax(0, 1.2fr)", gap: 18, alignItems: "start" }}>
        <section style={{
          border: "1px solid var(--tr-line)",
          borderRadius: 8,
          background: "var(--tr-card-2)",
          padding: 22,
        }}>
          <div style={{
            width: 58,
            height: 58,
            borderRadius: 100,
            background: "var(--tr-fg)",
            color: "var(--tr-bg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            fontWeight: 900,
          }}>김</div>
          <h2 style={{ margin: "16px 0 0", fontSize: 24, letterSpacing: "-0.04em" }}>김 제작자</h2>
          <p style={{ margin: "6px 0 0", color: "var(--tr-muted)", fontSize: 14, lineHeight: 1.5 }}>주로 디저트 · 14일째 사용 중</p>
          <button onClick={onAdmin} style={{ ...desktopPrimaryButton, width: "100%", marginTop: 22 }}>
            운영자 콘솔로 이동
          </button>
          <p style={{ margin: "10px 0 0", fontSize: 12.5, color: "var(--tr-muted)", lineHeight: 1.45 }}>
            수집 큐, 후보 검수, 소스는 승인 전 비공개로 처리됩니다.
          </p>
        </section>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <PanelLike title="내 활동">
            <div style={{ display: "grid", gap: 10 }}>
              <SummaryLine label="북마크한 카드" value="12장" />
              <SummaryLine label="영상 제작" value="3건" />
              <SummaryLine label="관심 카테고리" value="디저트" />
            </div>
          </PanelLike>
          <PanelLike title="알림">
            <div style={{ display: "grid", gap: 12 }}>
              <ToggleSetting label="아침 발행 알림" on />
              <ToggleSetting label="북마크 끝물 경보" on />
              <ToggleSetting label="새 카테고리 출시" />
            </div>
          </PanelLike>
          <PanelLike title="기타">
            <div style={{ display: "grid", gap: 10 }}>
              <DesktopNavButton label="사용 약관" />
              <DesktopNavButton label="개인정보 처리방침" />
              <DesktopNavButton label="문의하기" />
            </div>
          </PanelLike>
        </div>
      </div>
    </DesktopSectionShell>
  );
}

function ToggleSetting({ label, on }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
      <span style={{ fontSize: 13.5, fontWeight: 800 }}>{label}</span>
      <Toggle on={on} />
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
function BottomNav({ tab, onTab, fixed = false }) {
  const tabs = [
    { k: "home", label: "홈", Icon: IconHome },
    { k: "shorts", label: "숏폼", Icon: IconPlay },
    { k: "search", label: "검색", Icon: IconSearch },
    { k: "bookmarks", label: "북마크", Icon: IconBookmark },
    { k: "profile", label: "설정", Icon: IconUser },
  ];
  return (
    <div style={{
      position: fixed ? "fixed" : "absolute", bottom: 0, left: 0, right: 0,
      background: "rgba(255,255,255,0.96)",
      borderTop: `1px solid ${NEWSLETTER_LINE}`,
      display: "flex",
      padding: "8px 4px 12px",
      zIndex: 20,
      backdropFilter: "blur(12px)",
    }}>
      {tabs.map(t => (
        <button key={t.k} onClick={() => onTab(t.k)} style={{
          flex: 1, border: 0, background: "transparent", cursor: "pointer",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
          padding: "7px 0", color: tab === t.k ? NEWSLETTER_BLUE : NEWSLETTER_MUTED,
        }}>
          <t.Icon size={21} sw={tab === t.k ? 2 : 1.6} />
          <span style={{ fontSize: 10, fontWeight: tab === t.k ? 700 : 500, letterSpacing: "-0.01em" }}>
            {t.label}
          </span>
        </button>
      ))}
    </div>
  );
}

Object.assign(window, {
  Onboarding, HomeScreen, CardDetail, ShortsScreen, SearchScreen, BookmarksScreen, ProfileScreen, BottomNav,
  Cover, TimingPill, TrafficLight, SectionLabel, RealtimeStrip, CompactCardItem,
});
