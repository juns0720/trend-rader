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
  green:  { dot: "var(--tr-green)",  text: "실험 가능" },
  yellow: { dot: "var(--tr-yellow)", text: "빠른 확인" },
  red:    { dot: "var(--tr-red)",    text: "신중 검토" },
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

function Cover({ cover, height = 220, style, showLabel = true }) {
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
          {showLabel && (
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
          )}
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
function HomeScreen({ layoutMode = "mobile", onTab, onCard }) {
  const { CARDS, REALTIME } = window.TR_DATA;

  return (
    <NewsletterHomeScreen
      layoutMode={layoutMode}
      cards={CARDS}
      realtime={REALTIME}
      onTab={onTab}
      onCard={onCard}
    />
  );
}

const NEWSLETTER_BLUE = "#4353FF";
const NEWSLETTER_BLUE_DARK = "#2532D9";
const NEWSLETTER_BG = "#FFFFFF";
const NEWSLETTER_PAPER = "#FFFFFF";
const NEWSLETTER_INK = "#111318";
const NEWSLETTER_MUTED = "#6B7280";
const NEWSLETTER_LINE = "#E4E7EF";

function NewsletterHomeScreen({ layoutMode, cards, realtime, onTab, onCard }) {
  const isDesktop = layoutMode === "desktop";
  const isTablet = layoutMode === "tablet";
  const issueCount = cards.length;
  const lead = cards[0];
  const rows = lead ? cards.filter(card => card.id !== lead.id) : cards;
  const [viewportWidth, setViewportWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);

  useEffect(() => {
    const syncViewportWidth = () => setViewportWidth(window.innerWidth);
    syncViewportWidth();
    window.addEventListener("resize", syncViewportWidth);
    return () => window.removeEventListener("resize", syncViewportWidth);
  }, []);

  const showHotSidebar = isDesktop && viewportWidth >= 1840;

  return (
    <div style={{
      minHeight: "100vh",
      background: NEWSLETTER_BG,
      color: NEWSLETTER_INK,
      paddingBottom: isDesktop ? 72 : 112,
    }}>
      {!isDesktop && (
        <NewsletterMobileHeader onTab={onTab} />
      )}

      <section style={{ background: NEWSLETTER_PAPER }}>
        <div style={{
          maxWidth: 1320,
          width: "100%",
          boxSizing: "border-box",
          margin: "0 auto",
          padding: isDesktop ? "44px 28px 42px" : isTablet ? "34px 24px 34px" : "26px 20px 28px",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 24,
          alignItems: "center",
          textAlign: "center",
        }}>
          <div style={{ maxWidth: isDesktop ? 680 : isTablet ? 600 : 360, margin: "0 auto" }}>
            <h1 style={{
              margin: 0,
              fontSize: isDesktop ? 42 : isTablet ? 32 : 24,
              lineHeight: 1.14,
              letterSpacing: isDesktop ? "-0.045em" : "-0.055em",
              fontWeight: 950,
              wordBreak: "keep-all",
            }}>
              요즘 핫한 이슈 모아보기
            </h1>
            <p style={{
              margin: "14px auto 0",
              maxWidth: 520,
              color: NEWSLETTER_MUTED,
              fontSize: isDesktop ? 15 : 14,
              lineHeight: 1.65,
              fontWeight: 750,
              overflowWrap: "anywhere",
            }}>
              SNS에서 자주 보이는 이슈와 유행을 보기 쉽게 모았어요.
            </p>
          </div>
        </div>
      </section>

      {showHotSidebar && (
        <div style={{
          position: "sticky",
          top: 112,
          height: 0,
          zIndex: 8,
          pointerEvents: "none",
        }}>
          <div style={{
            width: "100%",
            height: 0,
            transform: "translateY(42px)",
          }}>
            <div style={{
              marginLeft: "min(calc(75% + 191px), calc(100% - 286px))",
              width: 258,
              pointerEvents: "auto",
            }}>
              <LiveHotPanel realtime={realtime} />
            </div>
          </div>
        </div>
      )}

      <main style={{
        maxWidth: isDesktop ? 1280 : 860,
        width: "100%",
        boxSizing: "border-box",
        margin: "0 auto",
        padding: isDesktop ? "24px 28px 0" : isTablet ? "28px 24px 0" : "20px 20px 0",
      }}>
        {!isDesktop && <TrendingKeywordRail realtime={realtime} isDesktop={isDesktop} />}

        <div style={{
          display: "block",
        }}>
          <div style={{
            minWidth: 0,
          }}>
            {lead && (
              <EditorialLeadStory
                card={lead}
                isDesktop={isDesktop}
                onClick={() => onCard(lead.id)}
              />
            )}

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              gap: 16,
              margin: isDesktop ? "46px 0 4px" : "38px 0 0",
            }}>
              <div>
                <div style={{ color: NEWSLETTER_BLUE, fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  오늘의 흐름
                </div>
                <h2 style={{ margin: "6px 0 0", fontSize: isDesktop ? 26 : 22, letterSpacing: 0, fontWeight: 850 }}>
                  지금 봐야 할 트렌드와 이슈
                </h2>
              </div>
              <div style={{ color: NEWSLETTER_MUTED, fontSize: 13, fontWeight: 650 }}>
                {issueCount}개
              </div>
            </div>

            <section style={{
              display: "grid",
              gridTemplateColumns: isDesktop
                ? "repeat(3, minmax(0, 1fr))"
                : isTablet
                  ? "repeat(2, minmax(0, 1fr))"
                  : "1fr",
              gap: isDesktop ? "58px 32px" : 18,
              marginTop: isDesktop ? 22 : 18,
            }}>
              {rows.map((card, i) => (
                <EditorialIssueRow
                  key={card.id}
                  card={card}
                  index={i + 2}
                  isDesktop={isDesktop}
                  onClick={() => onCard(card.id)}
                />
              ))}
            </section>
          </div>
        </div>
      </main>
    </div>
  );

}

function TrendingKeywordRail({ realtime, isDesktop }) {
  const keywords = (realtime || []).slice(0, isDesktop ? 6 : 4);
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: isDesktop ? 14 : 10,
      flexWrap: "wrap",
      padding: isDesktop ? "0 0 30px" : "0 0 24px",
      borderBottom: `1px solid ${NEWSLETTER_LINE}`,
    }}>
      <span style={{
        color: NEWSLETTER_INK,
        fontSize: 12.5,
        fontWeight: 900,
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
      }}>
        지금 뜨는 키워드
      </span>
      <div style={{ display: "flex", gap: isDesktop ? 12 : 9, flexWrap: "wrap", minWidth: 0 }}>
        {keywords.map(row => (
          <span key={`${row.rank}-${row.kw}`} style={{
            color: NEWSLETTER_MUTED,
            fontSize: isDesktop ? 13 : 12.5,
            fontWeight: 750,
            whiteSpace: "nowrap",
          }}>
            {row.kw}
          </span>
        ))}
      </div>
    </div>
  );
}

function LiveHotPanel({ realtime }) {
  const items = (realtime || []).slice(0, 6);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return undefined;
    const timer = setInterval(() => {
      setActive(current => (current + 1) % items.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;

  return (
    <aside style={{
      alignSelf: "stretch",
      border: `1px solid ${NEWSLETTER_LINE}`,
      borderRadius: 8,
      background: NEWSLETTER_PAPER,
      padding: "20px 20px 18px",
      display: "flex",
      flexDirection: "column",
      minHeight: 376,
      boxShadow: "0 18px 42px rgba(17,19,24,0.06)",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 14,
      }}>
        <div style={{
          color: NEWSLETTER_INK,
          fontSize: 17,
          fontWeight: 950,
          letterSpacing: "-0.02em",
        }}>
          실시간 HOT
        </div>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          color: NEWSLETTER_BLUE,
          fontSize: 11.5,
          fontWeight: 950,
          letterSpacing: "0.08em",
        }}>
          <span style={{
            position: "relative",
            width: 7,
            height: 7,
            borderRadius: 999,
            background: NEWSLETTER_BLUE,
            display: "inline-block",
          }}>
            <span style={{
              position: "absolute",
              inset: 0,
              borderRadius: 999,
              background: NEWSLETTER_BLUE,
              animation: "tr-pulse 1.45s ease-out infinite",
            }} />
          </span>
          LIVE
        </div>
      </div>

      <div style={{ display: "grid", marginTop: 18 }}>
        {items.map((row, i) => {
          const isActive = i === active;
          const deltaColor = row.deltaType === "down"
            ? "#2563EB"
            : row.deltaType === "same"
              ? NEWSLETTER_MUTED
              : "#EF4444";
          return (
            <div key={`${row.rank}-${row.kw}`} style={{
              display: "grid",
              gridTemplateColumns: "30px minmax(0, 1fr) 44px",
              alignItems: "center",
              gap: 10,
              padding: "13px 0",
              borderTop: i === 0 ? 0 : `1px solid rgba(228,231,239,0.78)`,
              background: isActive ? "linear-gradient(90deg, rgba(67,83,255,0.08), rgba(67,83,255,0))" : "transparent",
              transform: isActive ? "translateX(3px)" : "translateX(0)",
              transition: "background 360ms ease, transform 360ms ease",
            }}>
              <span style={{
                color: isActive ? NEWSLETTER_BLUE : "#9AA3B2",
                fontSize: 12.5,
                fontWeight: 950,
                fontFamily: "'Space Grotesk', 'Pretendard', sans-serif",
                transition: "color 360ms ease",
              }}>
                {String(row.rank).padStart(2, "0")}
              </span>
              <span style={{
                color: isActive ? NEWSLETTER_INK : "#4B5563",
                fontSize: 14,
                lineHeight: 1.35,
                fontWeight: isActive ? 900 : 750,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                transition: "color 360ms ease",
              }}>
                {row.kw}
              </span>
              <span style={{
                color: deltaColor,
                fontSize: 12,
                fontWeight: 950,
                textAlign: "right",
                whiteSpace: "nowrap",
              }}>
                {row.delta}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: "auto",
        paddingTop: 14,
        color: NEWSLETTER_MUTED,
        fontSize: 12,
        fontWeight: 700,
        lineHeight: 1.5,
      }}>
        방금 업데이트된 키워드 흐름을 기준으로 보여줘요.
      </div>
    </aside>
  );
}

function EditorialLeadStory({ card, isDesktop, onClick, showDivider = true }) {
  return (
    <article onClick={onClick} style={{
      cursor: "pointer",
      display: "grid",
      gridTemplateColumns: isDesktop ? "minmax(0, 0.9fr) minmax(0, 1.1fr)" : "1fr",
      gap: isDesktop ? 42 : 20,
      alignItems: "center",
      padding: showDivider ? (isDesktop ? "42px 0 48px" : "30px 0 34px") : 0,
      borderBottom: showDivider ? `1px solid ${NEWSLETTER_LINE}` : 0,
    }}>
      <div style={{
        overflow: "hidden",
        borderRadius: isDesktop ? 6 : 8,
        aspectRatio: isDesktop ? "16 / 10" : "16 / 9",
        background: "#F3F5F8",
      }}>
        <Cover
          cover={card.cover}
          height="100%"
          showLabel={false}
          style={{ borderRadius: 0, height: "100%" }}
        />
      </div>
      <div style={{ minWidth: 0 }}>
        <EditorialMetaLine card={card} />
        <h2 style={{
          margin: isDesktop ? "16px 0 0" : "14px 0 0",
          fontSize: isDesktop ? 48 : 26,
          lineHeight: 1.18,
          letterSpacing: isDesktop ? "-0.055em" : "-0.045em",
          fontWeight: 950,
          wordBreak: "keep-all",
        }}>
          {card.title}
        </h2>
        <p style={{
          margin: "16px 0 0",
          color: "#3B4351",
          fontSize: isDesktop ? 16 : 14.5,
          lineHeight: 1.75,
          fontWeight: 650,
          maxWidth: 620,
        }}>
          {card.what}
        </p>
        <span style={{
          display: "inline-flex",
          marginTop: isDesktop ? 26 : 20,
          color: NEWSLETTER_INK,
          fontSize: 14,
          fontWeight: 900,
          letterSpacing: "-0.01em",
        }}>
          읽어보기 →
        </span>
      </div>
    </article>
  );
}

const EDITORIAL_STAGE_TONES = {
  early: { color: "#2563EB", bg: "rgba(37,99,235,0.10)", badgeBg: "#EEF4FF", border: "rgba(37,99,235,0.22)" },
  mainstream: { color: "#059669", bg: "rgba(5,150,105,0.11)", badgeBg: "#ECFDF5", border: "rgba(5,150,105,0.22)" },
  peak: { color: "#D97706", bg: "rgba(217,119,6,0.12)", badgeBg: "#FFF7E6", border: "rgba(217,119,6,0.24)" },
  declining: { color: "#DC2626", bg: "rgba(220,38,38,0.10)", badgeBg: "#FEF2F2", border: "rgba(220,38,38,0.22)" },
};

function getEditorialStageTone(card) {
  return EDITORIAL_STAGE_TONES[card?.stage] || EDITORIAL_STAGE_TONES.mainstream;
}

function EditorialIssueRow({ card, index, isDesktop, onClick }) {
  const stageTone = getEditorialStageTone(card);
  return (
    <article onClick={onClick} style={{
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      background: "transparent",
      transition: "transform 180ms ease, opacity 180ms ease",
    }}>
      <div style={{
        position: "relative",
        aspectRatio: "16 / 9",
        background: "#F3F5F8",
        borderRadius: 7,
        overflow: "hidden",
      }}>
        <Cover
          cover={card.cover}
          height="100%"
          showLabel={false}
          style={{ borderRadius: 0, height: "100%" }}
        />
        <span style={{
          position: "absolute",
          left: 12,
          top: 12,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          height: 26,
          minWidth: 34,
          padding: "0 9px",
          borderRadius: 999,
          background: stageTone.badgeBg,
          color: stageTone.color,
          border: `1px solid ${stageTone.border}`,
          fontSize: 12,
          fontWeight: 950,
          fontFamily: "'Space Grotesk', 'Pretendard', sans-serif",
          boxShadow: "0 8px 24px rgba(17,19,24,0.10)",
        }}>
          {String(index).padStart(2, "0")}
        </span>
      </div>
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        padding: isDesktop ? "13px 0 0" : "13px 0 0",
      }}>
        <EditorialMetaLine card={card} muted />
        <h3 style={{
          margin: "9px 0 0",
          color: NEWSLETTER_INK,
          fontSize: isDesktop ? 22 : 18,
          lineHeight: 1.38,
          letterSpacing: isDesktop ? "-0.028em" : "-0.025em",
          fontWeight: 900,
          wordBreak: "keep-all",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {card.title}
        </h3>
      </div>
    </article>
  );
}

function EditorialMetaLine({ card, muted = false }) {
  const stageTone = getEditorialStageTone(card);
  const timingLabel = card.stageMeta?.short || TIMING[card.timing]?.text || "";
  const color = muted ? NEWSLETTER_MUTED : "#4B5563";
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      flexWrap: "wrap",
      color,
      fontSize: muted ? 12.5 : 13,
      fontWeight: 800,
      letterSpacing: "-0.01em",
    }}>
      {timingLabel && (
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: muted ? "2px 7px" : "3px 8px",
          borderRadius: 999,
          background: stageTone.bg,
          color: stageTone.color,
          border: `1px solid ${stageTone.border}`,
          fontSize: muted ? 11.5 : 12,
          fontWeight: 950,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}>
          {timingLabel}
        </span>
      )}
      {timingLabel && <span style={editorialDotStyle} />}
      <span>{card.publishedAt}</span>
      <span style={editorialDotStyle} />
      <span style={{ color: stageTone.color }}>흐름 {card.velocity}</span>
    </div>
  );
}

const editorialDotStyle = {
  width: 3,
  height: 3,
  borderRadius: 100,
  background: NEWSLETTER_MUTED,
  opacity: 0.45,
  display: "inline-block",
};

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

function NewsletterHotPanel({ realtime, isDesktop, compact = false }) {
  return (
    <aside style={{
      background: NEWSLETTER_PAPER,
      border: `1px solid ${NEWSLETTER_LINE}`,
      borderRadius: 10,
      padding: isDesktop ? 20 : 18,
      boxShadow: "none",
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
      borderRadius: 10,
      overflow: "hidden",
      display: "grid",
      gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)",
      minHeight: 360,
      boxShadow: "none",
    }}>
      <div style={{ position: "relative", minHeight: 360 }}>
        <Cover cover={card.cover} height={360} style={{ borderRadius: 0, height: "100%" }} />
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
  const stageLabel = card.stageMeta?.short;
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
          {stageLabel && <NewsletterLabel>{stageLabel}</NewsletterLabel>}
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
          <span style={{ color: NEWSLETTER_BLUE }}>재생산 {metrics.total.toLocaleString()}</span>
          <span style={{ width: 3, height: 3, borderRadius: 100, background: NEWSLETTER_MUTED, opacity: 0.45 }} />
          <span>{card.velocity}</span>
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
    peaking: "핫이슈",
    declining: "하락세",
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

function CardDetail({ cardId, onBack, bookmarks, toggleBookmark, layoutMode = "mobile" }) {
  const card = window.TR_DATA.CARDS.find(c => c.id === cardId);
  if (!card) return null;
  const bookmarked = bookmarks.has(card.id);
  const metrics = getReproductionMetrics(card);
  const [tab, setTab] = React.useState("article");
  const isDesktop = layoutMode === "desktop";
  const article = getArticleData(card);

  if (isDesktop) {
    return (
      <div style={{ minHeight: "100vh", padding: "34px 32px 80px", background: "#fff", color: "#111318" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 18, marginBottom: 30,
          }}>
            <button onClick={onBack} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: "1px solid #D9DEE8", background: "#fff",
              color: "#111318", borderRadius: 8, padding: "10px 13px",
              fontSize: 13, fontWeight: 700, cursor: "pointer",
            }}>
              <IconBack size={18} />
              목록으로
            </button>
            <button onClick={() => toggleBookmark(card.id)} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: "1px solid #111318", background: bookmarked ? "#111318" : "#fff",
              color: bookmarked ? "#fff" : "#111318", borderRadius: 8,
              padding: "10px 13px", fontSize: 13, fontWeight: 700, cursor: "pointer",
            }}>
              {bookmarked ? <IconBookmarkFilled size={17} /> : <IconBookmark size={17} />}
              {bookmarked ? "저장됨" : "저장"}
            </button>
          </div>

          <ArticleTitleLine
            card={card}
            article={article}
            metrics={metrics}
            activeTab={tab}
            onTabChange={setTab}
            desktop
          />

          <main style={{ maxWidth: 900, margin: "34px 0 0", minWidth: 0 }}>
            {tab === "article" ? (
              <ArticleDetailBody card={card} article={article} desktop />
            ) : (
              <AnalysisDetailBody card={card} desktop />
            )}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100%", paddingBottom: 92, animation: "tr-slide-in .25s ease-out", background: "#fff", color: "#111318" }}>
      <div style={{ padding: "14px 18px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
          <button onClick={onBack} style={{
            width: 40, height: 40, borderRadius: 100,
            border: "1px solid #D9DEE8", background: "#fff", color: "#111318",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}>
            <IconBack size={20} />
          </button>
          <button onClick={() => toggleBookmark(card.id)} style={{
            width: 40, height: 40, borderRadius: 100,
            border: "1px solid #D9DEE8", background: bookmarked ? "#111318" : "#fff",
            color: bookmarked ? "#fff" : "#111318",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}>{bookmarked ? <IconBookmarkFilled size={18} /> : <IconBookmark size={18} />}</button>
        </div>
        <ArticleTitleLine
          card={card}
          article={article}
          metrics={metrics}
          activeTab={tab}
          onTabChange={setTab}
        />
      </div>

      <div style={{ padding: "26px 18px 0", display: "flex", flexDirection: "column", gap: 28 }}>
        {tab === "article" ? (
          <ArticleDetailBody card={card} article={article} />
        ) : (
          <AnalysisDetailBody card={card} />
        )}
      </div>
    </div>
  );
}

function getArticleData(card) {
  const fallback = {
    title: card.title,
    lead: card.hook || card.what,
    author: "수달이",
    authorRole: "Trend Radar 에디터",
    publishedDate: "2026.05.20",
    readMinutes: 5,
    views: Math.max(420, Math.round((card.score || 7) * 92)),
    sections: [
      { title: "이게 뭔데?", paragraphs: [card.what] },
      { title: "왜 지금 반응할까?", paragraphs: [card.why, getConsumerPsychology(card)] },
      { title: "브랜드는 어떻게 써먹을까?", paragraphs: [card.angle] },
      { title: "브랜드 신호등", paragraphs: [card.caution], callout: card.verdict },
    ],
  };
  return { ...fallback, ...(card.article || {}), title: card.title };
}

function ArticleTitleLine({ card, article, metrics, activeTab, onTabChange, desktop = false }) {
  const readMinutes = article.readMinutes || 5;
  const views = article.views || Math.max(420, Math.round((metrics.total || 0) / 2));
  return (
    <header style={{
      paddingBottom: desktop ? 30 : 24,
      borderBottom: "1px solid #E1E5ED",
    }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: desktop ? 18 : 14 }}>
        <TimingPill timing={card.timing} />
        <StageBadge card={card} />
        <span style={{ color: "#697386", fontSize: 13, fontWeight: 500 }}>#{card.rank}</span>
        <span style={{ color: "#697386", fontSize: 13, fontWeight: 500 }}>{card.category}</span>
      </div>
      <h1 style={{
        margin: 0,
        maxWidth: desktop ? 980 : undefined,
        fontSize: desktop ? 42 : 31,
        lineHeight: desktop ? 1.18 : 1.22,
        fontWeight: 700,
        letterSpacing: 0,
        color: "#0B1220",
        wordBreak: "keep-all",
      }}>{card.title}</h1>
      <div style={{
        marginTop: desktop ? 26 : 20,
        display: "flex",
        alignItems: desktop ? "center" : "flex-start",
        justifyContent: "space-between",
        gap: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 13, minWidth: 0 }}>
          <OtterAvatar size={desktop ? 46 : 42} />
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <strong style={{ fontSize: desktop ? 16 : 14.5, fontWeight: 700, color: "#111318" }}>
                {article.author || "수달이"}
              </strong>
              <span style={{ color: "#697386", fontSize: desktop ? 14 : 13, fontWeight: 500 }}>
                {article.publishedDate || "2026.05.20"}
              </span>
            </div>
            <div style={{ marginTop: 4, color: "#8A93A3", fontSize: 12.5, fontWeight: 500 }}>
              {article.authorRole || "Trend Radar 에디터"}
            </div>
          </div>
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: desktop ? 18 : 11,
          color: "#697386",
          fontSize: desktop ? 14 : 12.5,
          fontWeight: 500,
          flexShrink: 0,
          paddingTop: desktop ? 0 : 3,
        }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <IconClock size={desktop ? 16 : 14} />
            {readMinutes}분
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <IconEye size={desktop ? 16 : 14} />
            {views.toLocaleString()}
          </span>
        </div>
      </div>
      {activeTab && onTabChange ? (
        <div style={{ marginTop: desktop ? 28 : 22 }}>
          <DetailTabs active={activeTab} onChange={onTabChange} desktop={desktop} />
        </div>
      ) : null}
      <p style={{
        margin: desktop ? "28px 0 0" : "22px 0 0",
        maxWidth: desktop ? 760 : undefined,
        color: "#1D2737",
        fontSize: desktop ? 18 : 16,
        lineHeight: desktop ? 1.72 : 1.66,
        fontWeight: 500,
        letterSpacing: 0,
        wordBreak: "keep-all",
      }}>{article.lead || card.hook || card.what}</p>
    </header>
  );
}

function OtterAvatar({ size = 44 }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: 100,
      overflow: "hidden",
      flexShrink: 0,
      background: "linear-gradient(145deg, #C7A17A, #F1D9B8)",
      border: "1px solid #D8C4AA",
      position: "relative",
      boxShadow: "inset 0 -8px 18px rgba(95,64,34,0.18)",
    }}>
      <div style={{
        position: "absolute",
        left: "50%",
        top: "51%",
        width: size * 0.58,
        height: size * 0.48,
        borderRadius: "48% 48% 44% 44%",
        background: "#F8E7CE",
        transform: "translate(-50%, -35%)",
      }} />
      <span style={{ position: "absolute", left: size * 0.29, top: size * 0.32, width: size * 0.075, height: size * 0.075, borderRadius: 100, background: "#1D1B18" }} />
      <span style={{ position: "absolute", right: size * 0.29, top: size * 0.32, width: size * 0.075, height: size * 0.075, borderRadius: 100, background: "#1D1B18" }} />
      <span style={{ position: "absolute", left: "50%", top: size * 0.49, width: size * 0.13, height: size * 0.09, borderRadius: 100, background: "#5A3A24", transform: "translateX(-50%)" }} />
    </div>
  );
}

function DetailTabs({ active, onChange, desktop = false }) {
  const tabs = [
    { key: "article", label: "기사" },
    { key: "analysis", label: "트렌드 분석" },
  ];
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      maxWidth: "100%",
      padding: 4,
      border: "1px solid #E1E5ED",
      borderRadius: 8,
      background: "#F6F8FB",
    }}>
      {tabs.map(item => {
        const selected = active === item.key;
        return (
          <button key={item.key} type="button" aria-pressed={selected} onClick={() => onChange(item.key)} style={{
            border: 0,
            borderRadius: 6,
            padding: desktop ? "8px 13px" : "8px 11px",
            background: selected ? "#fff" : "transparent",
            color: selected ? "#111318" : "#7B8493",
            boxShadow: selected ? "0 1px 2px rgba(15, 23, 42, 0.08)" : "none",
            fontSize: desktop ? 14 : 13.5,
            fontWeight: selected ? 700 : 500,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}>
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

function ArticleDetailBody({ card, article, desktop = false }) {
  const sections = article?.sections || getArticleData(card).sections || [];
  return (
    <article style={{
      display: "flex",
      flexDirection: "column",
      gap: desktop ? 44 : 34,
      fontSize: desktop ? 18 : 16,
      lineHeight: desktop ? 1.86 : 1.76,
      letterSpacing: 0,
      color: "#111318",
    }}>
      {sections.map((section, index) => (
        <ArticleRichSection
          key={`${section.title}-${index}`}
          section={section}
          desktop={desktop}
        />
      ))}
      {article?.summary ? (
        <ArticleSummaryBlock summary={article.summary} desktop={desktop} />
      ) : null}
      {article?.articleType !== "issue" ? (
        <div style={{ paddingTop: desktop ? 6 : 0 }}>
          <PlatformGuidePanel card={card} desktop={desktop} />
        </div>
      ) : null}
      <SourcePanel card={card} desktop={desktop} />
    </article>
  );
}

function ArticleRichSection({ section, desktop = false }) {
  if (!section) return null;
  const paragraphs = section.paragraphs || (section.body ? [section.body] : []);
  return (
    <section>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {section.icon ? (
          <span aria-hidden="true" style={{
            width: desktop ? 30 : 26,
            height: desktop ? 30 : 26,
            borderRadius: 8,
            background: "#F1F4F9",
            color: "#4353FF",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: desktop ? 12 : 11,
            fontWeight: 700,
            flexShrink: 0,
          }}>
            {section.icon}
          </span>
        ) : null}
        <h2 style={{
          margin: 0,
          fontSize: desktop ? 28 : 22,
          lineHeight: 1.28,
          fontWeight: 700,
          letterSpacing: 0,
          color: "#0B1220",
          wordBreak: "keep-all",
        }}>{section.title}</h2>
      </div>
      <div style={{ marginTop: desktop ? 18 : 14, display: "flex", flexDirection: "column", gap: desktop ? 16 : 13 }}>
        {paragraphs.map((paragraph, index) => (
          <p key={index} style={{
            margin: 0,
            color: "#202939",
            fontSize: desktop ? 18 : 16,
            lineHeight: desktop ? 1.88 : 1.76,
            fontWeight: 400,
            wordBreak: "keep-all",
          }}>{paragraph}</p>
        ))}
      </div>
      {section.points?.length ? (
        <div style={{
          marginTop: desktop ? 20 : 16,
          display: "grid",
          gridTemplateColumns: desktop ? "1fr 1fr" : "1fr",
          gap: 10,
        }}>
          {section.points.map((point, index) => (
            <div key={`${point.label}-${index}`} style={{
              padding: desktop ? "15px 16px" : "14px 15px",
              borderRadius: 10,
              background: "#F6F8FB",
              border: "1px solid #E4E8F0",
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#4353FF" }}>{point.label}</div>
              <div style={{ marginTop: 7, fontSize: desktop ? 15 : 14, lineHeight: 1.62, fontWeight: 420, color: "#202939" }}>
                {point.text}
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {section.subsections?.length ? (
        <div style={{
          marginTop: desktop ? 24 : 18,
          display: "flex",
          flexDirection: "column",
          gap: desktop ? 24 : 20,
        }}>
          {section.subsections.map((item, index) => (
            <div key={`${item.title}-${index}`}>
              <h3 style={{
                margin: 0,
                color: "#111318",
                fontSize: desktop ? 21 : 18,
                lineHeight: 1.35,
                fontWeight: 640,
                letterSpacing: 0,
                wordBreak: "keep-all",
              }}>{item.title}</h3>
              <div style={{
                marginTop: desktop ? 10 : 8,
                display: "flex",
                flexDirection: "column",
                gap: desktop ? 10 : 9,
              }}>
                {(item.paragraphs || []).map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex} style={{
                    margin: 0,
                    color: "#2B3445",
                    fontSize: desktop ? 17 : 15.5,
                    lineHeight: desktop ? 1.82 : 1.72,
                    fontWeight: 400,
                    wordBreak: "keep-all",
                  }}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {section.callout ? (
        <div style={{
          marginTop: desktop ? 22 : 18,
          padding: desktop ? "18px 20px" : "16px 17px",
          borderRadius: 10,
          background: "#111318",
          color: "#fff",
          fontSize: desktop ? 16 : 14.5,
          lineHeight: 1.68,
          fontWeight: 500,
          wordBreak: "keep-all",
        }}>
          {section.callout}
        </div>
      ) : null}
    </section>
  );
}

function ArticleSummaryBlock({ summary, desktop = false }) {
  return (
    <section style={{
      marginTop: desktop ? -4 : 0,
      padding: desktop ? "22px 24px" : "18px 18px",
      borderRadius: 12,
      background: "#F5F7FB",
      border: "1px solid #E1E6EF",
    }}>
      <h2 style={{
        margin: 0,
        color: "#111318",
        fontSize: desktop ? 24 : 20,
        lineHeight: 1.3,
        fontWeight: 700,
      }}>한 줄 요약</h2>
      <p style={{
        margin: desktop ? "12px 0 0" : "10px 0 0",
        color: "#202939",
        fontSize: desktop ? 18 : 16,
        lineHeight: desktop ? 1.74 : 1.68,
        fontWeight: 480,
        wordBreak: "keep-all",
      }}>{summary}</p>
    </section>
  );
}

function AnalysisDetailBody({ card, desktop = false }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: desktop ? "repeat(2, minmax(0, 1fr))" : "1fr",
      gap: desktop ? 20 : 22,
      alignItems: "start",
    }}>
      <StageSummaryPanel card={card} />
      <MarketingActionPanel card={card} />
      <TrendVerificationCard card={card} />
      <CommunitySignalPanel card={card} />
      <div style={{ gridColumn: desktop ? "1 / -1" : undefined }}>
        <YoutubePanel card={card} />
      </div>
      <div style={{ gridColumn: desktop ? "1 / -1" : undefined }}>
        <RelatedTrendsPanel card={card} />
      </div>
    </div>
  );
}

function DetailLeadBlock({ card, desktop }) {
  return (
    <div style={{
      padding: desktop ? "24px 26px" : "20px 18px",
      borderRadius: desktop ? 10 : 16,
      background: "var(--tr-accent)",
      color: "var(--tr-accent-fg)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 18, right: 18, opacity: 0.45 }}>
        <IconSparkle size={18} />
      </div>
      <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.76 }}>
        3초 훅
      </div>
      <div style={{
        marginTop: 10,
        fontSize: desktop ? 24 : 20,
        lineHeight: 1.36,
        fontWeight: 900,
        letterSpacing: "-0.035em",
        paddingRight: 20,
      }}>
        {card.hook}
      </div>
    </div>
  );
}

function ArticleSection({ title, body, desktop }) {
  if (!body) return null;
  return (
    <section>
      <h2 style={{
        margin: 0,
        fontSize: desktop ? 24 : 20,
        lineHeight: 1.25,
        fontWeight: 760,
        letterSpacing: 0,
      }}>{title}</h2>
      <p style={{
        margin: desktop ? "14px 0 0" : "11px 0 0",
        color: "var(--tr-fg)",
        fontSize: desktop ? 17 : 15.5,
        lineHeight: desktop ? 1.82 : 1.68,
        fontWeight: 560,
      }}>{body}</p>
    </section>
  );
}

function getConsumerPsychology(card) {
  const byCategory = {
    "밈/커뮤니티": "사람들은 이슈 자체의 정보보다 '나도 이 맥락을 안다'는 소속감을 소비합니다. 설명 가능한 의미보다 따라 말하기 쉬운 리듬, 댓글에서 함께 놀 수 있는 여지, 친구에게 공유했을 때 바로 반응이 오는 구조가 중요합니다.",
    "브랜드 이슈": "소비자는 브랜드가 무엇을 팔았는지보다 어떤 맥락을 놓쳤는지에 민감하게 반응합니다. 특히 날짜, 단어, 역사적 기억, 사회적 감수성이 어긋나면 프로모션은 혜택이 아니라 태도 문제로 읽힙니다.",
    "비즈/테크": "복잡한 산업 이슈도 개인의 돈, 일, 미래 불안과 연결되면 빠르게 대중화됩니다. 어려운 용어를 완벽히 이해하지 않아도 '지금 흐름을 놓치면 안 된다'는 감각이 공유를 만듭니다.",
    "팬덤/IP": "팬덤은 단순한 로고 협업보다 내가 좋아하는 세계관 안에 들어갔다는 감각에 반응합니다. 굿즈, 현장 미션, 인증샷, 한정 경험이 함께 설계될 때 방문 이유가 강해집니다.",
    "라이프스타일": "라이프스타일 트렌드는 기능보다 '이번 주말의 나'를 상상하게 만들 때 움직입니다. 준비물, 동선, 인증 장면, 같이 갈 사람까지 떠오르면 콘텐츠가 행동으로 이어집니다.",
  };
  return byCategory[card.category] || card.consumerSummary?.whyPeopleCare || card.why;
}

function PlatformGuidePanel({ card, desktop }) {
  const items = card.platform || [];
  if (!items.length) return null;
  return (
    <section>
      <h2 style={{
        margin: 0,
        fontSize: desktop ? 24 : 20,
        lineHeight: 1.25,
        fontWeight: 700,
        letterSpacing: 0,
      }}>채널별 활용법</h2>
      <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: desktop ? "1fr 1fr" : "1fr", gap: 10 }}>
        {items.map(item => (
          <div key={item.p} style={{
            padding: desktop ? "16px 17px" : "14px 15px",
            borderRadius: desktop ? 10 : 14,
            background: "var(--tr-card-2)",
            border: "1px solid var(--tr-line)",
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--tr-accent)", letterSpacing: "0.04em" }}>
              {item.p}
            </div>
            <div style={{ marginTop: 8, fontSize: desktop ? 14.5 : 13.5, lineHeight: 1.58, fontWeight: 400 }}>
              {item.tip}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CautionPanel({ card, desktop }) {
  return (
    <section style={{
      padding: desktop ? "18px 20px" : "16px 17px",
      borderRadius: desktop ? 10 : 16,
      background: "var(--tr-card-2)",
      border: "1px solid var(--tr-line)",
      borderLeft: "4px solid var(--tr-yellow)",
    }}>
      <SectionLabel>브랜드 리스크</SectionLabel>
      <div style={{ marginTop: 10, fontSize: desktop ? 15 : 14, lineHeight: 1.65, fontWeight: 400 }}>
        {card.caution}
      </div>
    </section>
  );
}

function SourcePanel({ card, desktop }) {
  const sources = card.sources || [];
  if (!sources.length) return null;
  return (
    <section>
      <SectionLabel>확인한 출처</SectionLabel>
      <div style={{ marginTop: 10, borderTop: "1px solid var(--tr-line)" }}>
        {sources.map((source, index) => (
          <a key={`${source.label}-${index}`} href={source.url || "#"} target="_blank" rel="noopener noreferrer" style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: desktop ? "14px 0" : "12px 0",
            borderBottom: "1px solid var(--tr-line)",
            color: "var(--tr-fg)",
            textDecoration: "none",
          }}>
            <span style={{
              width: 30, height: 30, borderRadius: 8,
              background: "var(--tr-card-2)", display: "inline-flex",
              alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 600, color: "var(--tr-muted)",
              flexShrink: 0,
            }}>{String(source.type || "src").slice(0, 2).toUpperCase()}</span>
            <span style={{ flex: 1, minWidth: 0, fontSize: desktop ? 14.5 : 13.5, fontWeight: 400, lineHeight: 1.45 }}>
              {source.label}
            </span>
            <IconChevronRight size={16} stroke="var(--tr-muted)" />
          </a>
        ))}
      </div>
    </section>
  );
}

function MarketingActionPanel({ card }) {
  const riskColor = card.risk === "높음" ? "var(--tr-red)" : card.risk === "중간" ? "var(--tr-yellow)" : "var(--tr-green)";
  return (
    <div style={{
      padding: 18,
      borderRadius: 18,
      background: "var(--tr-card-2)",
      display: "flex",
      flexDirection: "column",
      gap: 14,
    }}>
      <SectionLabel>마케터 액션</SectionLabel>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <SummaryPill label="추천" value={card.stage === "declining" ? "관망 추천" : "실험 가능"} />
        <SummaryPill label="리스크" value={card.risk || "-"} />
      </div>
      <div style={{ fontSize: 15, lineHeight: 1.62, fontWeight: 700 }}>
        {card.verdict || card.consumerSummary?.tryNowVerdict}
      </div>
      <div style={{ height: 6, borderRadius: 100, background: "var(--tr-bg)", overflow: "hidden" }}>
        <div style={{ width: card.risk === "높음" ? "88%" : card.risk === "중간" ? "56%" : "28%", height: "100%", background: riskColor }} />
      </div>
    </div>
  );
}

function CommunitySignalPanel({ card }) {
  const community = card.community;
  if (!community) return null;
  return (
    <div style={{ padding: 18, borderRadius: 18, background: "var(--tr-card-2)" }}>
      <SectionLabel>커뮤니티 반응</SectionLabel>
      <div style={{ marginTop: 10, color: "var(--tr-muted)", fontSize: 13.5, lineHeight: 1.55, fontWeight: 650 }}>
        {community.summary}
      </div>
      <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        <MetricTile label="긍정" value={`${community.sentiment?.positive ?? 0}%`} tone="hot" />
        <MetricTile label="중립" value={`${community.sentiment?.neutral ?? 0}%`} />
        <MetricTile label="부정" value={`${community.sentiment?.negative ?? 0}%`} tone="cool" />
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
            {meta?.label && meta.label !== meta.short && (
              <span style={{ fontSize: 13, color: "var(--tr-muted)", fontWeight: 700 }}>
                {meta.label}
              </span>
            )}
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
  const [commentTarget, setCommentTarget] = useState(null);
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
  const openCardComments = (card) => {
    setCommentTarget({
      title: card.title,
      eyebrow: card.macroCategory || card.category || "트렌드",
      comments: getShortsCommentsForTarget("card", card),
    });
  };
  const openDebateComments = (debate) => {
    setCommentTarget({
      title: debate.title,
      eyebrow: "댓글 토론",
      comments: getShortsCommentsForTarget("debate", debate),
    });
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
      background: "var(--tr-bg)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div data-tr-shorts-feed style={{
        height: "100%",
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
            onComments={() => openDebateComments(item.debate)}
            layoutMode={layoutMode}
          />
        ) : (
          <ShortsTrendSlide
            key={item.id}
            card={item.card}
            onCard={onCard}
            onComments={() => openCardComments(item.card)}
            layoutMode={layoutMode}
          />
        ))}
      </div>
      <ShortsInstagramCommentsDrawer target={commentTarget} onClose={() => setCommentTarget(null)} />
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

function ShortsTrendSlide({ card, onCard, onComments, layoutMode }) {
  const metrics = getReproductionMetrics(card);
  const comments = getShortsCommentsForTarget("card", card);
  const hashtags = card.relatedTrends?.hashtags?.slice(0, 3) || [`#${card.category}`, "#오늘의트렌드"];
  return (
    <section style={shortsSlideStyle(layoutMode)}>
      <div style={shortsSlideInnerStyle}>
        <ShortsSlideBackdrop cover={card.cover} />
        <div style={shortsContentStyle(layoutMode)}>
          <div style={{ padding: "0 20px", display: "grid", gridTemplateColumns: "1fr 52px", gap: 14, alignItems: "end" }}>
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
            <ShortsActionRail likes={formatShortCount(metrics.total)} comments={formatShortCount(comments.length)} shares={formatShortCount(metrics.last7dCount || 0)} onComments={onComments} />
          </div>

          <div style={{ padding: layoutMode === "mobile" ? "12px 20px 104px" : "14px 20px 34px" }}>
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

function ShortsDebateSlide({ debate, selected, onVote, onComments, layoutMode }) {
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
          <div style={{ padding: layoutMode === "mobile" ? "0 20px 104px" : "0 20px 34px", display: "grid", gridTemplateColumns: "minmax(0, 1fr) 52px", gap: 14, alignItems: "end" }}>
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
            <ShortsActionRail likes={debate.likes} comments={debate.comments} shares={debate.shares} onComments={onComments} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ShortsActionRail({ likes, comments, shares, onComments }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, paddingTop: 4 }}>
      <ShortsAction Icon={IconHeart} value={likes} label="좋아요" />
      <ShortsAction Icon={IconMessage} value={comments} label="댓글 열기" onClick={onComments} />
      <ShortsAction Icon={IconShare} value={shares} label="공유" />
    </div>
  );
}

function ShortsInstagramCommentsDrawer({ target, onClose }) {
  if (!target) return null;
  const comments = target.comments || [];
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      zIndex: 36,
      pointerEvents: "auto",
    }}>
      <button
        aria-label="댓글 닫기"
        className="tr-comments-backdrop"
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          border: 0,
          background: "rgba(0,0,0,0.24)",
          cursor: "pointer",
        }}
      />
      <aside className="tr-comments-drawer" style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "min(82%, 560px)",
        maxHeight: "calc(100% - 26px)",
        background: "#fff",
        color: "#111318",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        borderRadius: "18px 18px 0 0",
        boxShadow: "0 -18px 44px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
        <header style={{
          height: 54,
          flex: "0 0 54px",
          borderBottom: "1px solid #EFEFEF",
          display: "grid",
          gridTemplateColumns: "44px 1fr 44px",
          alignItems: "center",
          padding: "0 10px",
        }}>
          <div />
          <div style={{ textAlign: "center", minWidth: 0 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 900, letterSpacing: "-0.02em" }}>
              댓글
            </h2>
            <div style={{
              marginTop: 2,
              color: "#8E8E8E",
              fontSize: 11.5,
              fontWeight: 700,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}>
              {target.title}
            </div>
          </div>
          <button onClick={onClose} aria-label="댓글 닫기" style={{
            width: 34,
            height: 34,
            justifySelf: "end",
            borderRadius: 100,
            border: 0,
            background: "transparent",
            color: "#111318",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <IconX size={20} />
          </button>
        </header>

        <div className="tr-no-scrollbar" style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px 14px 12px",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 14,
            color: "#737373",
            fontSize: 12,
            fontWeight: 800,
          }}>
            <span style={{
              height: 1,
              flex: 1,
              background: "#EFEFEF",
            }} />
            <span>{target.eyebrow} · 댓글 {comments.length}개</span>
            <span style={{
              height: 1,
              flex: 1,
              background: "#EFEFEF",
            }} />
          </div>

          <div style={{ display: "grid", gap: 15 }}>
            {comments.map(comment => (
              <article key={comment.id} style={{
                display: "grid",
                gridTemplateColumns: "36px minmax(0, 1fr) 26px",
                gap: 10,
                alignItems: "start",
              }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 100,
                  padding: 2,
                  background: comment.tone === "hot"
                    ? "linear-gradient(135deg, #FEDA75, #FA7E1E 36%, #D62976 70%, #4F5BD5)"
                    : "#EDEEF2",
                }}>
                  <div style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 100,
                    background: "#fff",
                    color: "#111318",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 950,
                  }}>
                    {(comment.author || "익명").slice(0, 1).toUpperCase()}
                  </div>
                </div>

                <div style={{ minWidth: 0 }}>
                  <p style={{
                    margin: 0,
                    fontSize: 13.4,
                    lineHeight: 1.42,
                    letterSpacing: "-0.01em",
                    color: "#111318",
                  }}>
                    <strong style={{ fontWeight: 900, marginRight: 5 }}>{comment.author}</strong>
                    {comment.text}
                  </p>
                  <div style={{
                    marginTop: 6,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    color: "#8E8E8E",
                    fontSize: 11.5,
                    fontWeight: 800,
                  }}>
                    <span>{comment.timeAgo}</span>
                    <span>좋아요 {comment.likes}개</span>
                    <button style={{
                      border: 0,
                      background: "transparent",
                      color: "inherit",
                      padding: 0,
                      font: "inherit",
                      cursor: "pointer",
                    }}>답글 달기</button>
                  </div>
                </div>

                <button aria-label="댓글 좋아요" style={{
                  width: 26,
                  height: 26,
                  border: 0,
                  background: "transparent",
                  color: "#262626",
                  padding: 0,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 3,
                }}>
                  <IconHeart size={15} sw={1.8} />
                </button>
              </article>
            ))}
          </div>
        </div>

        <footer style={{
          flex: "0 0 auto",
          borderTop: "1px solid #EFEFEF",
          padding: "10px 12px 12px",
          background: "#fff",
          display: "grid",
          gridTemplateColumns: "34px minmax(0, 1fr) auto",
          gap: 10,
          alignItems: "center",
        }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 100,
            background: "linear-gradient(135deg, #111318, #6B7280)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 950,
          }}>나</div>
          <div style={{
            minHeight: 38,
            border: "1px solid #DBDBDB",
            borderRadius: 100,
            padding: "0 14px",
            display: "flex",
            alignItems: "center",
            color: "#8E8E8E",
            fontSize: 13,
            fontWeight: 650,
          }}>
            댓글 달기...
          </div>
          <button style={{
            border: 0,
            background: "transparent",
            color: "#0095F6",
            fontSize: 13,
            fontWeight: 900,
            padding: "0 2px",
            cursor: "pointer",
          }}>
            게시
          </button>
        </footer>
      </aside>
    </div>
  );
}

const SHORTS_COMMENT_SETS = {
  c01: [
    { author: "푸딩헌터", text: "이거 사러 갔다가 사람들 카트에 다 하나씩 있어서 더 열받음. 나만 또 못 샀네.", timeAgo: "방금", likes: 812, tone: "hot" },
    { author: "망고는못참지", text: "1.2kg 푸딩을 혼자 먹겠다는 사람이 제일 무서운 사람임. 근데 그게 나임.", timeAgo: "3분 전", likes: 566, tone: "hot" },
    { author: "코코카트", text: "맛보다 통 들고 있는 샷 때문에 뜬 거 아니냐. 영상각 하나는 진짜 미쳤다.", timeAgo: "8분 전", likes: 304 },
    { author: "디저트냉정파", text: "광고 같아서 안 믿었는데 냉장고 열 때마다 생각나는 중. 졌다.", timeAgo: "14분 전", likes: 221 },
    { author: "당충전러", text: "코스트코 갈 명분 만들어줘서 고맙다. 내 지갑은 안 고마워함.", timeAgo: "22분 전", likes: 148 },
  ],
  c03: [
    { author: "냉동실주민", text: "얼린 젤리 씹는 소리 때문에 밤 12시에 편의점 감. 이게 사람이냐 알고리즘이냐.", timeAgo: "1분 전", likes: 702, tone: "hot" },
    { author: "치아살려", text: "치아: 살려줘 / 뇌: 한 번만 더. 진짜 이 상태 됨.", timeAgo: "6분 전", likes: 488, tone: "hot" },
    { author: "ASMR중독", text: "맛보다 소리가 본체임. 이어폰 끼고 보면 바로 냉동실 열게 됨.", timeAgo: "11분 전", likes: 267 },
    { author: "편의점엔딩", text: "왕꿈틀이를 왜 고급 디저트처럼 먹고 있냐고. 근데 따라 함.", timeAgo: "19분 전", likes: 190 },
    { author: "젤리압수반", text: "냉동실에 넣어뒀다가 가족한테 압수당함. 트렌드도 공유재냐고.", timeAgo: "31분 전", likes: 121 },
  ],
  c06: [
    { author: "치즈늘려", text: "한국인 특: 한정이라는 말만 보면 갑자기 미식가 됨. 나 포함.", timeAgo: "2분 전", likes: 641, tone: "hot" },
    { author: "칼로리차단", text: "치즈 늘어나는 거 3초 보고 바로 저장 눌렀다. 오늘 칼로리라는 단어 금지.", timeAgo: "5분 전", likes: 433, tone: "hot" },
    { author: "미국맛감별사", text: "미국 감성이라더니 결국 치즈스틱 아니냐. 근데 그게 제일 무서움.", timeAgo: "13분 전", likes: 278 },
    { author: "줄서면짐", text: "이거 먹으려고 줄 서는 순간 내가 진 것 같지만 이미 외투 입음.", timeAgo: "24분 전", likes: 176 },
    { author: "소스빌런", text: "소스 찍는 장면 없으면 리뷰 인정 안 함. 치즈보다 소스가 판정함.", timeAgo: "36분 전", likes: 94 },
  ],
  c09: [
    { author: "성수피로도", text: "성수는 이제 팝업이 아니라 줄 서기 테마파크임. 그래도 또 감.", timeAgo: "4분 전", likes: 590, tone: "hot" },
    { author: "무지개포토", text: "무지개 벽 앞에서 사진 안 찍으면 입장료 환불해줘야 함.", timeAgo: "9분 전", likes: 352, tone: "hot" },
    { author: "한정판노예", text: "일주일 한정이라는 말이 제일 무섭다. 평일 반차까지 생각함.", timeAgo: "17분 전", likes: 205 },
    { author: "굿즈보다사람", text: "굿즈보다 사람 구경이 더 콘텐츠. 줄 자체가 숏폼임.", timeAgo: "28분 전", likes: 133 },
    { author: "성수숙제중", text: "성수동은 매주 새로운 숙제를 냄. 안 하면 뒤처진 기분까지 줌.", timeAgo: "44분 전", likes: 88 },
  ],
  c05: [
    { author: "빵심판", text: "바게트에 초콜릿 박는 걸 누가 반대함? 나와봐. 대화 좀 하자.", timeAgo: "방금", likes: 522, tone: "hot" },
    { author: "혈당파리행", text: "프랑스풍이라더니 내 혈당만 파리 감. 그래도 커피랑 먹으면 납득.", timeAgo: "7분 전", likes: 311, tone: "hot" },
    { author: "겉바속초코", text: "겉바속초코 이건 법으로 보호해야 함. 빵집마다 의무 도입 원함.", timeAgo: "15분 전", likes: 244 },
    { author: "동네빵집수사대", text: "우리 동네도 빨리 팔아라. 남의 동네 트렌드 보는 거 너무 억울함.", timeAgo: "26분 전", likes: 150 },
    { author: "초코과몰입", text: "이거 한 입 먹으면 빵이 아니라 기분 전환제임. 위험하다.", timeAgo: "39분 전", likes: 103 },
  ],
  d01: [
    { author: "망고중립불가", text: "지금 사도 됨 vs 늦음? 이건 보이면 사는 거지 토론할 시간이 어딨음.", timeAgo: "2분 전", likes: 912, tone: "hot" },
    { author: "대용량현실파", text: "1.2kg은 인증샷 찍고 나서 냉장고 자리 싸움 시작임. 그게 진짜 후기.", timeAgo: "6분 전", likes: 488 },
    { author: "품절알림켜둠", text: "늦었다는 사람들 특징: 이미 하나 사놓고 말함.", timeAgo: "12분 전", likes: 356, tone: "hot" },
    { author: "푸딩회의론", text: "맛이 아니라 크기가 콘텐츠면 두 번째 영상부터 힘 빠질 수도 있음.", timeAgo: "25분 전", likes: 179 },
    { author: "카트직진", text: "댓글 읽는 시간에 매장 가는 사람이 승자임.", timeAgo: "33분 전", likes: 142 },
  ],
  d02: [
    { author: "카공눈치게임", text: "음료 한 잔으로 5시간은 공부가 아니라 점유율 싸움 아니냐.", timeAgo: "3분 전", likes: 844, tone: "hot" },
    { author: "콘센트수호자", text: "콘센트 자리 맡는 순간부터 이미 카페가 도서관 됨.", timeAgo: "8분 전", likes: 501, tone: "hot" },
    { author: "사장님편", text: "피크타임에 4인석 혼자 쓰면 그건 감성 말고 민폐 맞음.", timeAgo: "16분 전", likes: 318 },
    { author: "조용히할게요", text: "사람 없을 때는 괜찮지 않나. 결국 시간대가 문제임.", timeAgo: "27분 전", likes: 210 },
    { author: "라떼추가요", text: "최소 두 잔은 시키자. 양심도 리필되면 좋겠다.", timeAgo: "41분 전", likes: 164 },
  ],
  d03: [
    { author: "줄서기분노", text: "한 명이 서고 네 명이 합류하면 그건 합류가 아니라 증식임.", timeAgo: "1분 전", likes: 980, tone: "hot" },
    { author: "웨이팅검사", text: "뒤에서 보는 사람 입장에선 진짜 순식간에 내 앞에 파티 생김.", timeAgo: "5분 전", likes: 612, tone: "hot" },
    { author: "현실주의자", text: "두 명까지는 이해함. 다섯 명은 식당 앞에서 팀빌딩하는 거냐.", timeAgo: "13분 전", likes: 377 },
    { author: "예약해제발", text: "이 논쟁 볼 때마다 그냥 예약 시스템 있는 곳만 가고 싶어짐.", timeAgo: "20분 전", likes: 201 },
    { author: "친구기다림", text: "늦는 친구 때문에 내가 욕먹는 구조가 제일 억울함.", timeAgo: "35분 전", likes: 155 },
  ],
};

const SHORTS_FALLBACK_COMMENTS = [
  { author: "트렌드감별사", text: "이거 별거 아닌 척하는데 댓글창 갈라지는 순간 이미 뜬 거임.", timeAgo: "5분 전", likes: 241, tone: "hot" },
  { author: "저장만함", text: "웃기려고 봤는데 저장까지 누름. 알고리즘한테 또 졌다.", timeAgo: "12분 전", likes: 183 },
  { author: "팩폭계정", text: "광고인지 밈인지 모르겠는데 계속 보이면 그게 제일 무서운 신호임.", timeAgo: "21분 전", likes: 126 },
  { author: "늦참전", text: "나만 이제 봤나 했는데 주변 사람들 다 이미 말하고 있었음.", timeAgo: "34분 전", likes: 77 },
];

const EDGY_SHORTS_COMMENT_SETS = {
  c01: [
    { author: "푸딩못삼", text: "아니 이거 또 품절임? 유행템 뜨면 맨날 나만 빈손인 거 개빡치네", timeAgo: "방금", likes: 1240, tone: "hot" },
    { author: "광고냄새남", text: "솔직히 광고 냄새 좀 심한데 댓글 보니까 또 사고 싶음. 나 진짜 쉬운 사람임", timeAgo: "2분 전", likes: 884, tone: "hot" },
    { author: "코코흑우", text: "1.2kg 푸딩을 왜 사냐고 하던 내가 지금 카트 끌고 있음ㅋㅋ 하", timeAgo: "5분 전", likes: 612 },
    { author: "불편한디저트", text: "이런 거 뜨면 꼭 먹지도 않을 애들이 냉장고 자리만 차지함. 제발 적당히", timeAgo: "9분 전", likes: 401, tone: "hot" },
    { author: "통이본체", text: "맛보다 통 큰 게 바이럴 포인트잖아. 다들 속는 척 너무 열심히 함", timeAgo: "18분 전", likes: 236 },
    { author: "엄카압수", text: "엄마가 이거 왜 샀냐고 하면 댓글창 보여줄 거임. 공범 많음", timeAgo: "31분 전", likes: 119 },
  ],
  c03: [
    { author: "치아살려줘", text: "얼린 젤리 씹는 소리 좋은 건 알겠는데 내 어금니는 무슨 죄냐고", timeAgo: "1분 전", likes: 997, tone: "hot" },
    { author: "편털러", text: "밤에 이거 보고 편의점 가는 내가 제일 한심함. 근데 두 봉지 삼", timeAgo: "4분 전", likes: 731, tone: "hot" },
    { author: "ASMR중독자", text: "맛은 모르겠고 소리 때문에 계속 보게 됨. 이쯤 되면 음식이 아니라 소음 마케팅임", timeAgo: "7분 전", likes: 522 },
    { author: "불편러등장", text: "애들 다 따라 할 텐데 치아 깨지면 누가 책임짐? 유행이라고 다 좋은 건 아님", timeAgo: "12분 전", likes: 338, tone: "hot" },
    { author: "젤리뇌절", text: "왕꿈틀이까지 얼려 먹는 건 좀 선 넘은 거 아니냐ㅋㅋ 다음엔 라면도 얼리겠네", timeAgo: "20분 전", likes: 250 },
    { author: "냉동실빌런", text: "가족이 내 젤리 버림. 집안에서 트렌드 탄압당함", timeAgo: "36분 전", likes: 142 },
  ],
  c06: [
    { author: "치즈에미침", text: "또 한정판이래. 이 단어 하나에 다들 지갑 여는 거 ㄹㅇ 웃긴데 나도 열었음", timeAgo: "2분 전", likes: 1080, tone: "hot" },
    { author: "칼로리꺼져", text: "치즈 늘어나는 장면은 반칙이지. 저거 보고 참으면 사람이 아님", timeAgo: "5분 전", likes: 744, tone: "hot" },
    { author: "광고같은데", text: "댓글 왤케 다 칭찬임? 너무 티나서 오히려 궁금해짐. 마케팅 성공했네", timeAgo: "11분 전", likes: 483 },
    { author: "줄서기싫음", text: "이거 먹겠다고 줄 서는 순간 현타 올 듯. 근데 줄 짧으면 바로 감", timeAgo: "17분 전", likes: 291 },
    { author: "미국맛호소인", text: "미국 감성 붙이면 다 맛있어 보이는 거 이제 좀 웃김. 그냥 치즈스틱 아님?", timeAgo: "29분 전", likes: 203, tone: "hot" },
    { author: "소스없음탈락", text: "소스 맛없으면 바로 탈락임. 치즈로만 밀기엔 요즘 사람들 눈 높음", timeAgo: "41분 전", likes: 128 },
  ],
  c09: [
    { author: "성수그만", text: "성수 또 팝업 또 줄 또 인증샷... 진짜 레퍼토리 다 외움", timeAgo: "3분 전", likes: 1320, tone: "hot" },
    { author: "그래도감", text: "욕하면서 저장함. 나 같은 애들 때문에 성수가 계속 이러는 거겠지", timeAgo: "6분 전", likes: 910, tone: "hot" },
    { author: "무지개질림", text: "색깔 좀 칠해놓고 팝업이라고 하는 거 언제까지 먹히냐. 근데 사진은 잘 나옴", timeAgo: "10분 전", likes: 506 },
    { author: "줄알레르기", text: "줄 서 있는 사람들 보면 대단하다 싶다가도 내가 내일 거기 있을까 봐 무서움", timeAgo: "16분 전", likes: 344 },
    { author: "굿즈호구", text: "굿즈 퀄 낮아도 한정 붙이면 바로 팔리는 거 ㄹㅇ 자본주의 무섭다", timeAgo: "27분 전", likes: 227, tone: "hot" },
    { author: "성수숙제", text: "주말마다 성수 숙제 내는 거 누가 멈춰줘. 안 가면 나만 뒤처지는 기분임", timeAgo: "39분 전", likes: 151 },
  ],
  c05: [
    { author: "초코과몰입", text: "바게트에 초코 박았다고 또 난리냐 했는데 사진 보고 바로 사과함", timeAgo: "방금", likes: 901, tone: "hot" },
    { author: "빵값그만", text: "이런 거 뜨면 동네 빵집 가격부터 오를까 봐 벌써 불안함", timeAgo: "4분 전", likes: 671, tone: "hot" },
    { author: "프랑스인척", text: "프랑스풍이라고 하면 다 용서되는 거 웃김. 그냥 맛있는 탄수화물 폭탄임", timeAgo: "9분 전", likes: 428 },
    { author: "혈당엔딩", text: "한 입 먹으면 행복하고 두 입 먹으면 혈당이 댓글 달 듯", timeAgo: "14분 전", likes: 289 },
    { author: "불편하지만먹음", text: "유행빵 너무 많아서 피곤한데 이건 좀 치사하게 맛있어 보이네", timeAgo: "25분 전", likes: 196 },
    { author: "동네차별", text: "왜 우리 동네엔 이런 거 안 파냐. 트렌드도 지역차별함?", timeAgo: "33분 전", likes: 120 },
  ],
  d01: [
    { author: "보이면삼", text: "지금 사도 됨? 이런 거 묻는 동안 이미 누가 집어감. 걍 보이면 사", timeAgo: "1분 전", likes: 1402, tone: "hot" },
    { author: "바이럴의심", text: "솔직히 너무 바이럴 같긴 한데 그래서 더 잘 먹힘. 짜증나게 궁금해", timeAgo: "5분 전", likes: 820, tone: "hot" },
    { author: "늦었다충", text: "늦었다고 하는 애들 특: 집 냉장고에 이미 하나 있음", timeAgo: "8분 전", likes: 733 },
    { author: "푸딩불편러", text: "대용량 디저트 유행하면 결국 음식물 쓰레기 늘어나는 거 아님? 다 먹긴 함?", timeAgo: "15분 전", likes: 392, tone: "hot" },
    { author: "카트전쟁", text: "코스트코에서 이거 두고 눈치싸움하는 그림 벌써 보임. 무섭다", timeAgo: "26분 전", likes: 240 },
    { author: "냉장고없음", text: "사고 싶은데 냉장고 자리가 없음. 유행보다 현실이 더 세다", timeAgo: "37분 전", likes: 119 },
  ],
  d02: [
    { author: "카공그만", text: "음료 한 잔으로 5시간은 솔직히 선 넘지. 카페가 너네 자취방임?", timeAgo: "2분 전", likes: 1604, tone: "hot" },
    { author: "콘센트빌런", text: "콘센트 자리 맡고 노트북 펼치는 순간 표정부터 달라짐ㅋㅋ 거의 입주민", timeAgo: "6분 전", likes: 920, tone: "hot" },
    { author: "나도카공함", text: "나도 카공하지만 피크타임 4인석 혼자는 좀 양심 챙기자 제발", timeAgo: "11분 전", likes: 601 },
    { author: "불편러맞음", text: "사장님 입장 생각하면 이걸 권리라고 우기는 게 더 이상함", timeAgo: "18분 전", likes: 452, tone: "hot" },
    { author: "두잔은시켜", text: "오래 있을 거면 최소 두 잔은 시켜라. 와이파이도 공짜 노동 아님", timeAgo: "29분 전", likes: 311 },
    { author: "공부안됨", text: "근데 진짜 공부하는 사람보다 인스타 올리는 사람이 더 많아 보임", timeAgo: "42분 전", likes: 180 },
  ],
  d03: [
    { author: "합류금지", text: "한 명 줄 서고 네 명 합류? 그건 합류가 아니라 복제임. 개열받음", timeAgo: "방금", likes: 1820, tone: "hot" },
    { author: "줄뒤사람", text: "뒤에서 보면 갑자기 내 앞에 동호회 생김. 당해보면 욕 나옴", timeAgo: "3분 전", likes: 1204, tone: "hot" },
    { author: "현실론자", text: "두 명 정도는 그러려니 하는데 다섯 명은 양심 어디 감", timeAgo: "9분 전", likes: 710 },
    { author: "친구늦지마", text: "늦는 친구 때문에 내가 욕먹는 구조 진짜 싫음. 그냥 제시간에 와라", timeAgo: "16분 전", likes: 438 },
    { author: "불편러등판", text: "다들 한다고 괜찮은 거 아님. 이런 게 제일 조용히 민폐임", timeAgo: "24분 전", likes: 332, tone: "hot" },
    { author: "예약제원함", text: "이 논쟁 볼 때마다 맛집 예약제 없는 게 모든 악의 시작 같음", timeAgo: "38분 전", likes: 201 },
  ],
};

const EDGY_SHORTS_FALLBACK_COMMENTS = [
  { author: "댓글구경꾼", text: "이거 또 누가 억지 유행 만든 거 같긴 한데 댓글창은 재밌네", timeAgo: "3분 전", likes: 310, tone: "hot" },
  { author: "불편러예약", text: "별거 아닌 걸로 다들 호들갑 떠는 거 지겹다면서 끝까지 보는 중", timeAgo: "9분 전", likes: 218 },
  { author: "알고리즘패배", text: "관심 없다고 넘겼는데 세 번째 뜨면 그때부터 내가 진 거임", timeAgo: "18분 전", likes: 166 },
  { author: "팩폭만함", text: "이런 건 좋아서 뜨는 게 아니라 욕하면서 보는 맛 때문에 뜸", timeAgo: "31분 전", likes: 112, tone: "hot" },
];

Object.assign(EDGY_SHORTS_COMMENT_SETS, {
  c01: [
    { author: "셋로그시킴", text: "친구끼리 하면 힙한데 회사가 시키면 그냥 업무보고 아님? 개웃김", timeAgo: "방금", likes: 1480, tone: "hot" },
    { author: "2초도힘듦", text: "2초만 찍으면 된다면서 하루종일 알림 기다리는 거 ㄹㅇ 중독 설계임", timeAgo: "2분 전", likes: 982, tone: "hot" },
    { author: "날것중독", text: "인스타 보정 피드보다 이런 대충 찍은 게 더 사람 같아서 계속 보게 됨", timeAgo: "6분 전", likes: 740 },
    { author: "마케터눈물", text: "내일 회의에서 누가 우리도 셋로그 하자고 할까 봐 벌써 무섭다", timeAgo: "11분 전", likes: 512, tone: "hot" },
    { author: "피드피로러", text: "꾸민 척 안 하는 척도 결국 포맷 되면 피곤해질 듯. 그래도 지금은 재밌음", timeAgo: "23분 전", likes: 286 },
    { author: "팀장님금지", text: "브랜드가 하려면 진짜 자발적으로 해야지 대본 냄새 나면 바로 망함", timeAgo: "36분 전", likes: 199 },
  ],
  c02: [
    { author: "뜻모름", text: "영크크 뭔 뜻인지 아직도 모르겠는데 입에 붙어서 더 짜증남ㅋㅋ", timeAgo: "1분 전", likes: 1210, tone: "hot" },
    { author: "밈늦참러", text: "설명 듣는 순간 재미 없어지는 밈 1위. 걍 모르는 채로 써야 함", timeAgo: "4분 전", likes: 820, tone: "hot" },
    { author: "요를레이히", text: "이런 말 왜 유행하냐고 화내는 사람들 덕분에 더 오래 감", timeAgo: "8분 전", likes: 501 },
    { author: "브랜드금지", text: "공식 계정이 영크크 쓰는 순간 바로 수명 끝날 듯 제발 참아", timeAgo: "13분 전", likes: 477, tone: "hot" },
    { author: "중독성피해자", text: "아니 근데 소리만 보면 좀 잘 만들긴 함. 인정하기 싫은데 맴돎", timeAgo: "25분 전", likes: 244 },
    { author: "댓글구경러", text: "영크크가 뭔데요 묻는 댓글까지 세트로 완성되는 밈임", timeAgo: "39분 전", likes: 138 },
  ],
  c04: [
    { author: "국장불면증", text: "삼전 하닉 얘기만 나오면 댓글창이 바로 투자 상담소 되는 거 개무서움", timeAgo: "2분 전", likes: 980, tone: "hot" },
    { author: "하닉못삼", text: "하닉 살걸이라는 말 올해만 백 번 한 듯. 근데 또 지금 사면 내가 고점임", timeAgo: "5분 전", likes: 744, tone: "hot" },
    { author: "삼전존버단", text: "HBM 설명보다 댓글에 물린 사람들 하소연이 더 현실적임", timeAgo: "9분 전", likes: 520 },
    { author: "투자권유금지", text: "이걸 밈으로 풀 수는 있는데 매수하라 느낌 나면 바로 위험함", timeAgo: "14분 전", likes: 402, tone: "hot" },
    { author: "AI반도체교", text: "엔비디아 한 마디에 한국 커뮤니티가 흔들리는 구조가 제일 웃프다", timeAgo: "27분 전", likes: 260 },
    { author: "직장인개미", text: "마케터가 이걸 알아야 하는 이유: 고객도 점심시간에 이 얘기함", timeAgo: "44분 전", likes: 177 },
  ],
  c05: [
    { author: "캘린더좀봐", text: "5.18에 탱크데이는 진짜 검수 몇 명을 통과한 거냐. 이건 실수가 아니라 시스템 문제임", timeAgo: "방금", likes: 2104, tone: "hot" },
    { author: "브랜드무섭다", text: "할인 이벤트 하나도 날짜랑 단어 못 보면 바로 위기관리 케이스 되는 시대임", timeAgo: "3분 전", likes: 1310, tone: "hot" },
    { author: "사과문수집가", text: "사과문보다 궁금한 건 내부에서 이게 어떻게 승인됐냐는 거임", timeAgo: "7분 전", likes: 900 },
    { author: "불편러맞음", text: "이런 건 예민한 게 아니라 기본 맥락 체크임. 불편러 타령하지 마라", timeAgo: "12분 전", likes: 780, tone: "hot" },
    { author: "마케팅팀비상", text: "우리 회사 캘린더도 지금 다시 봐야겠다. 남 일 아님", timeAgo: "21분 전", likes: 410 },
    { author: "밈화금지", text: "이 이슈는 드립치면 안 됨. 분석은 하되 가볍게 소비하면 역풍 온다", timeAgo: "35분 전", likes: 294 },
  ],
  c11: [
    { author: "헤네시스주민", text: "시급 100만원 NPC 알바? 나 지금 현실 퀘스트 받으러 간다", timeAgo: "1분 전", likes: 1680, tone: "hot" },
    { author: "고증경찰", text: "메이플 콜라보는 귀엽게만 하면 안 됨. 팬들 고증 틀리면 바로 잡아냄", timeAgo: "5분 전", likes: 870, tone: "hot" },
    { author: "굿즈노예", text: "솔직히 어트랙션보다 한정 굿즈 때문에 가는 사람 많을 듯. 나 포함", timeAgo: "9분 전", likes: 654 },
    { author: "IP기획자", text: "이건 로고 붙인 콜라보가 아니라 퀘스트 동선 만든 게 포인트임", timeAgo: "15분 전", likes: 430, tone: "hot" },
    { author: "핑크빈실물파", text: "NPC가 퀘스트 주면 어른도 갑자기 초딩 됨. 이게 팬덤 장사임", timeAgo: "26분 전", likes: 305 },
    { author: "잠실대기러", text: "재밌어 보이는데 웨이팅 지옥이면 바로 민심 꺾일 수 있음", timeAgo: "41분 전", likes: 182 },
  ],
  d01: [
    { author: "팀장님제발", text: "셋로그 하자고 해도 팀장님은 빠져주세요. 그 순간 감성 사망임", timeAgo: "방금", likes: 1902, tone: "hot" },
    { author: "자발성중요", text: "직원들이 진짜 하고 싶어서 찍는 거면 좋고, 시킨 거면 보는 사람이 바로 앎", timeAgo: "4분 전", likes: 1110, tone: "hot" },
    { author: "브랜드병", text: "요즘 뜬다 하면 다 공식 계정이 달려드는 거 너무 피곤함", timeAgo: "8분 전", likes: 770 },
    { author: "실험은찬성", text: "그래도 런칭 전날 직군별 하루 보여주는 건 좀 괜찮을 듯", timeAgo: "14분 전", likes: 438 },
    { author: "대본냄새탐지", text: "날것 포맷인데 대본 자막 들어가면 바로 망하는 거 알지?", timeAgo: "25분 전", likes: 320, tone: "hot" },
    { author: "회의각", text: "이거 내일 마케팅 회의 안건으로 올라온다에 커피 건다", timeAgo: "38분 전", likes: 201 },
  ],
  d02: [
    { author: "검수팀어디", text: "이건 담당자 한 명 탓하면 안 됨. 승인 라인 전체가 못 본 거잖아", timeAgo: "1분 전", likes: 2300, tone: "hot" },
    { author: "캘린더공포증", text: "마케팅 캘린더에 기념일만 적고 맥락 안 적으면 이런 사고 나는 거임", timeAgo: "5분 전", likes: 1380, tone: "hot" },
    { author: "실수라고끝?", text: "실수였다고 끝내면 다음에도 똑같이 터짐. 시스템 얘기해야지", timeAgo: "10분 전", likes: 920 },
    { author: "브랜드피곤", text: "요즘은 카피 한 줄도 사회 맥락 못 보면 바로 이슈화됨. 피곤해도 해야 함", timeAgo: "18분 전", likes: 544, tone: "hot" },
    { author: "사과문분석러", text: "사과문 잘 쓰는 법보다 사고 안 나게 하는 법을 배워야 함", timeAgo: "29분 전", likes: 390 },
    { author: "드립금지", text: "이걸 웃긴 사건처럼 소비하면 진짜 감 없음 인증임", timeAgo: "43분 전", likes: 270, tone: "hot" },
  ],
  d03: [
    { author: "굿즈가본체", text: "체험 좋다 해도 결국 사람들 줄 세우는 건 한정 굿즈임. 인정?", timeAgo: "방금", likes: 1604, tone: "hot" },
    { author: "퀘스트충", text: "아니 굿즈는 집 가면 끝인데 NPC한테 퀘스트 받는 건 기억에 남잖아", timeAgo: "3분 전", likes: 1240, tone: "hot" },
    { author: "팬덤현실화", text: "게임 속 세계관을 현실에서 걷게 만드는 게 진짜 콜라보지", timeAgo: "9분 전", likes: 720 },
    { author: "리셀싫음", text: "굿즈만 밀면 결국 리셀판 되고 팬덤 민심 터짐. 체험 설계가 있어야 함", timeAgo: "15분 전", likes: 490, tone: "hot" },
    { author: "잠실원정대", text: "둘 다 중요함. 굿즈로 오게 만들고 체험으로 오래 붙잡는 거", timeAgo: "25분 전", likes: 330 },
    { author: "핑크빈알바", text: "시급 100만원 NPC는 솔직히 기사 제목부터 너무 세서 안 누를 수 없음", timeAgo: "37분 전", likes: 218 },
  ],
});

EDGY_SHORTS_FALLBACK_COMMENTS.splice(0, EDGY_SHORTS_FALLBACK_COMMENTS.length,
  { author: "트렌드구경꾼", text: "이거 또 업계 사람들 단톡방에서 돌고 있을 듯. 나도 저장함", timeAgo: "3분 전", likes: 340, tone: "hot" },
  { author: "불편러예정", text: "다들 좋다고 달려들 때 한 명쯤은 찬물 끼얹어야 균형 맞음", timeAgo: "9분 전", likes: 218 },
  { author: "알고리즘노예", text: "관심 없다고 넘겼는데 세 번째 뜨면 그때부터 내가 진 거임", timeAgo: "18분 전", likes: 166 },
  { author: "회의실망령", text: "내일 누가 이거 우리도 하자고 할 것 같아서 벌써 피곤함", timeAgo: "31분 전", likes: 142, tone: "hot" },
);

function getShortsCommentsForTarget(type, target) {
  const set = EDGY_SHORTS_COMMENT_SETS[target?.id] || EDGY_SHORTS_FALLBACK_COMMENTS;
  return set.map((comment, index) => ({
    id: `${type}-${target?.id || "fallback"}-${index}`,
    ...comment,
  }));
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

function ShortsAction({ Icon, value, label, onClick }) {
  const content = (
    <React.Fragment>
      <span style={{
        width: 38, height: 38, borderRadius: 100, background: "var(--tr-card-2)",
        display: "flex", alignItems: "center", justifyContent: "center", color: "var(--tr-fg)",
        boxShadow: onClick ? "0 8px 20px rgba(17,19,24,0.12)" : "none",
      }}><Icon size={18} /></span>
      <span style={{ fontSize: 11, fontWeight: 900, fontFamily: "'Space Grotesk', sans-serif" }}>{value}</span>
    </React.Fragment>
  );
  if (onClick) {
    return (
      <button aria-label={label} onClick={onClick} style={{
        border: 0,
        background: "transparent",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        color: "var(--tr-muted)",
        cursor: "pointer",
      }}>
        {content}
      </button>
    );
  }
  return (
    <div aria-label={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: "var(--tr-muted)" }}>
      {content}
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
  const trending = CARDS.slice(0, 4).map(c => c.keyword || c.title);
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
