// app.jsx — main router + Tweaks

const { useState: useStateApp, useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#0a0a0a", "#ffffff", "#f4f4f4"],
  "accent": "#C8FF3D",
  "font": "Pretendard",
  "cardStyle": "image",
  "dark": false,
  "showOnboarding": false
}/*EDITMODE-END*/;

const PALETTES = {
  monoLight: ["#0a0a0a", "#ffffff", "#f4f4f4"],
  monoDark:  ["#fafafa", "#0a0a0a", "#1a1a1a"],
  warm:      ["#1a1815", "#fbf9f4", "#efeae0"],
  cool:      ["#0d1117", "#f6f8fa", "#eaeef2"],
};

const ACCENT_OPTS = ["#C8FF3D", "#FF4500", "#3182F6", "#0a0a0a", "#FFD400"];
const FONT_OPTS = ["Pretendard", "SUIT", "Wanted Sans"];
const CARD_STYLES = ["image", "minimal", "compact"];

function buildCSS(t) {
  const [fg, bg, card2] = t.palette;
  const accentFg = isLight(t.accent) ? "#0a0a0a" : "#ffffff";
  const muted = mix(fg, bg, 0.45);
  const line = mix(fg, bg, 0.12);
  const dotOff = mix(fg, bg, 0.18);
  const pillBg = mix(fg, bg, 0.07);
  return `
    :root {
      --tr-fg: ${fg};
      --tr-bg: ${bg};
      --tr-card-2: ${card2};
      --tr-muted: ${muted};
      --tr-line: ${line};
      --tr-dot-off: ${dotOff};
      --tr-accent: ${t.accent};
      --tr-accent-fg: ${accentFg};
      --tr-pill-bg: ${pillBg};
      --tr-pill-fg: ${fg};
      --tr-green: #00C853;
      --tr-yellow: #FFB300;
      --tr-red: #FF3B30;
      --tr-blue: #3182F6;
      --tr-card-radius: 18px;
      --tr-font: '${t.font}', -apple-system, system-ui, sans-serif;
    }
    .tr-screen, .tr-screen * { font-family: var(--tr-font) !important; }
  `;
}

function isLight(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) > 140;
}

function mix(a, b, weight) {
  const pa = parseHex(a), pb = parseHex(b);
  const r = Math.round(pa[0] * weight + pb[0] * (1 - weight));
  const g = Math.round(pa[1] * weight + pb[1] * (1 - weight));
  const bl = Math.round(pa[2] * weight + pb[2] * (1 - weight));
  return `rgb(${r},${g},${bl})`;
}
function parseHex(h) {
  h = h.replace("#", "");
  if (h.length === 3) h = h.split("").map(c => c + c).join("");
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [mode, setMode] = useStateApp("user"); // user | admin
  const [tab, setTab] = useStateApp("home"); // user nav
  const [adminTab, setAdminTab] = useStateApp("dash");
  const [detailId, setDetailId] = useStateApp(null);
  const [bookmarks, setBookmarks] = useStateApp(new Set(["c01", "c03", "c06"]));
  const [onboarding, setOnboarding] = useStateApp(t.showOnboarding);

  useEffectApp(() => { window.TR_TWEAKS = t; }, [t]);
  useEffectApp(() => { setOnboarding(t.showOnboarding); }, [t.showOnboarding]);

  const toggleBookmark = (id) => {
    setBookmarks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const css = buildCSS(t);

  let userScreen;
  if (tab === "home") userScreen = <HomeScreen onCard={setDetailId} bookmarks={bookmarks} toggleBookmark={toggleBookmark} />;
  else if (tab === "search") userScreen = <SearchScreen onCard={setDetailId} bookmarks={bookmarks} toggleBookmark={toggleBookmark} />;
  else if (tab === "bookmarks") userScreen = <BookmarksScreen bookmarks={bookmarks} toggleBookmark={toggleBookmark} onCard={setDetailId} />;
  else if (tab === "profile") userScreen = <ProfileScreen onAdmin={() => setMode("admin")} />;

  let adminScreen;
  if (adminTab === "dash") adminScreen = <AdminDashboard onTab={setAdminTab} />;
  else if (adminTab === "cand") adminScreen = <AdminCandidates />;
  else if (adminTab === "cards") adminScreen = <AdminCards />;
  else if (adminTab === "accs") adminScreen = <AdminAccounts />;

  return (
    <React.Fragment>
      <style>{css}</style>
      <FrameStage>
        <div className="tr-screen" style={{
          width: "100%", height: "100%", position: "relative",
          background: "var(--tr-bg)", color: "var(--tr-fg)",
          fontFamily: "var(--tr-font)",
          overflow: "hidden",
        }}>
          {/* status bar */}
          <StatusBar dark={!isLight(t.palette[1])} />

          <div style={{
            position: "absolute", top: 32, bottom: 0, left: 0, right: 0, overflow: "auto", scrollbarWidth: "none", msOverflowStyle: "none",
          }}>
            {mode === "user" ? (
              detailId ? (
                <CardDetail cardId={detailId} onBack={() => setDetailId(null)}
                            bookmarks={bookmarks} toggleBookmark={toggleBookmark} />
              ) : userScreen
            ) : (
              <React.Fragment>
                <AdminTopBar tab={adminTab} onTab={setAdminTab} onExit={() => setMode("user")} />
                {adminScreen}
              </React.Fragment>
            )}
          </div>

          {/* bottom nav (user mode only, hidden on detail) */}
          {mode === "user" && !detailId && (
            <BottomNav tab={tab} onTab={setTab} />
          )}

          {/* Home indicator */}
          <div style={{
            position: "absolute", bottom: 6, left: 0, right: 0, display: "flex", justifyContent: "center", pointerEvents: "none",
          }}>
            <div style={{
              width: 130, height: 4, borderRadius: 100,
              background: "var(--tr-fg)", opacity: 0.4,
            }} />
          </div>

          {/* Onboarding overlay */}
          {onboarding && <Onboarding onDone={() => setOnboarding(false)} />}
        </div>
      </FrameStage>

      <TweaksUI t={t} setTweak={setTweak} mode={mode} setMode={setMode} setTab={setTab}
                setAdminTab={setAdminTab} setOnboarding={setOnboarding}
                setDetailId={setDetailId} />
    </React.Fragment>
  );
}

// Mock status bar (Korean-style)
function StatusBar({ dark }) {
  const c = "var(--tr-fg)";
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: 32,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 22px", zIndex: 10, pointerEvents: "none",
      fontFamily: "'Space Grotesk', system-ui, sans-serif",
    }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: c, letterSpacing: "-0.01em" }}>9:30</span>
      <div style={{ width: 22, height: 22, borderRadius: 100, background: dark ? "#222" : "#222", position: "absolute",
                    left: "50%", top: 6, transform: "translateX(-50%)" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 5, color: c }}>
        <svg width="16" height="11" viewBox="0 0 16 11" fill={c}><path d="M1 8h2v3H1zm4-2h2v5H5zm4-2h2v7H9zm4-2h2v9h-2z"/></svg>
        <svg width="14" height="11" viewBox="0 0 14 11" fill="none" stroke={c} strokeWidth="1.2">
          <path d="M1 4a8 8 0 0 1 12 0M3 6.5a5 5 0 0 1 8 0M5.5 9a2 2 0 0 1 3 0"/></svg>
        <svg width="22" height="11" viewBox="0 0 22 11">
          <rect x="0.5" y="0.5" width="19" height="10" rx="2.5" fill="none" stroke={c} opacity="0.5"/>
          <rect x="2" y="2" width="14" height="7" rx="1.2" fill={c}/>
          <rect x="20" y="3.5" width="1.5" height="4" rx="0.5" fill={c} opacity="0.5"/>
        </svg>
      </div>
    </div>
  );
}

// Responsive frame stage — scales the 412x892 phone into the available viewport
function FrameStage({ children }) {
  const [scale, setScale] = useStateApp(1);
  const ref = React.useRef(null);
  useEffectApp(() => {
    const compute = () => {
      const W = window.innerWidth, H = window.innerHeight;
      const pw = 412 + 16, ph = 892 + 16; // include frame border
      const sx = (W - 24) / pw;
      const sy = (H - 24) / ph;
      const s = Math.min(1.0, sx, sy);
      setScale(s);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return (
    <div style={{
      position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      <div ref={ref} style={{
        width: 412, height: 892, transform: `scale(${scale})`, transformOrigin: "center",
        position: "relative", borderRadius: 52, overflow: "hidden",
        background: "var(--tr-bg)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.18), 0 0 0 10px #0e0e10, 0 0 0 11.5px #2a2a2e",
      }}>
        {children}
      </div>
    </div>
  );
}

// Tweaks UI
function TweaksUI({ t, setTweak, mode, setMode, setTab, setAdminTab, setOnboarding, setDetailId }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="모드" />
      <TweakRadio label="화면 모드" value={mode} options={["user", "admin"]}
                  onChange={(v) => setMode(v)} />
      {mode === "user" && (
        <TweakSelect label="사용자 화면" value={"current"}
                     options={[
                       { value: "home", label: "홈 (오늘의 카드)" },
                       { value: "search", label: "검색" },
                       { value: "bookmarks", label: "북마크" },
                       { value: "profile", label: "설정" },
                       { value: "onboarding", label: "온보딩" },
                     ]}
                     onChange={(v) => {
                       setDetailId(null);
                       if (v === "onboarding") setOnboarding(true);
                       else setTab(v);
                     }} />
      )}
      {mode === "admin" && (
        <TweakSelect label="운영자 화면" value={"current"}
                     options={[
                       { value: "dash", label: "대시보드" },
                       { value: "cand", label: "후보 키워드" },
                       { value: "cards", label: "카드 편집" },
                       { value: "accs", label: "X 계정 / 블록리스트" },
                     ]}
                     onChange={(v) => setAdminTab(v)} />
      )}

      <TweakSection label="테마" />
      <TweakColor label="팔레트" value={t.palette}
                  options={[PALETTES.monoLight, PALETTES.monoDark, PALETTES.warm, PALETTES.cool]}
                  onChange={(v) => setTweak("palette", v)} />
      <TweakColor label="포인트 컬러" value={t.accent} options={ACCENT_OPTS}
                  onChange={(v) => setTweak("accent", v)} />

      <TweakSection label="타이포 / 카드" />
      <TweakRadio label="폰트" value={t.font} options={FONT_OPTS}
                  onChange={(v) => setTweak("font", v)} />
      <TweakRadio label="카드 스타일" value={t.cardStyle} options={CARD_STYLES}
                  onChange={(v) => setTweak("cardStyle", v)} />

      <TweakSection label="기타" />
      <TweakButton label="온보딩 다시 보기"
                   onClick={() => setOnboarding(true)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
