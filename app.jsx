// app.jsx — main router + Tweaks

const { useState: useStateApp, useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#0a0a0a", "#ffffff", "#f4f4f4"],
  "accent": "#4353FF",
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

const ACCENT_OPTS = ["#4353FF", "#3182F6", "#C8FF3D", "#FF4500", "#0a0a0a", "#FFD400"];
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
    .tr-screen, .tr-admin-shell {
      transition: background-color .24s ease, color .24s ease;
    }
    .tr-screen button,
    .tr-screen input,
    .tr-screen textarea,
    .tr-screen select,
    .tr-screen [role="button"],
    .tr-admin-shell button,
    .tr-admin-shell input,
    .tr-admin-shell textarea,
    .tr-admin-shell select,
    .tr-admin-shell [role="button"] {
      transition:
        background-color .2s ease,
        border-color .2s ease,
        box-shadow .2s ease,
        color .2s ease,
        opacity .2s ease,
        filter .2s ease,
        transform .2s ease;
    }
    .tr-screen button:active,
    .tr-admin-shell button:active {
      transform: scale(.985);
    }
    .tr-motion-view {
      animation: tr-view-in .26s cubic-bezier(.2,.8,.2,1) both;
      will-change: opacity, transform, filter;
    }
    .tr-motion-view[data-motion-kind="detail"] {
      animation-name: tr-detail-in;
      animation-duration: .3s;
    }
    .tr-motion-view[data-motion-kind="admin"] {
      animation-duration: .22s;
    }
    .tr-overlay-motion {
      animation: tr-overlay-in .2s ease both;
    }
    .tr-comments-backdrop {
      animation: tr-comments-backdrop-in .18s ease both;
    }
    .tr-comments-drawer {
      animation: tr-comments-drawer-in .28s cubic-bezier(.2,.8,.2,1) both;
      will-change: transform, opacity;
    }
    @keyframes tr-view-in {
      from { opacity: 0; transform: translate3d(0, 10px, 0) scale(.992); filter: blur(3px); }
      to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); filter: blur(0); }
    }
    @keyframes tr-detail-in {
      from { opacity: 0; transform: translate3d(0, 16px, 0) scale(.985); filter: blur(4px); }
      to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); filter: blur(0); }
    }
    @keyframes tr-overlay-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes tr-comments-backdrop-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes tr-comments-drawer-in {
      from { opacity: 0; transform: translate3d(0, 105%, 0); }
      to { opacity: 1; transform: translate3d(0, 0, 0); }
    }
    @media (prefers-reduced-motion: reduce) {
      .tr-motion-view,
      .tr-overlay-motion,
      .tr-comments-backdrop,
      .tr-comments-drawer {
        animation: none !important;
      }
      .tr-screen *,
      .tr-admin-shell * {
        transition-duration: .001ms !important;
        scroll-behavior: auto !important;
      }
    }
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
  const pathMode = () => {
    const params = new URLSearchParams(window.location.search);
    return window.location.pathname.startsWith("/admin") || params.get("mode") === "admin" ? "admin" : "user";
  };
  const initialMode = pathMode();
  const [mode, setModeState] = useStateApp(initialMode); // user | admin
  const [tab, setTab] = useStateApp("home"); // user nav
  const [adminTab, setAdminTab] = useStateApp("dash");
  const [adminSearch, setAdminSearch] = useStateApp("");
  const [detailId, setDetailId] = useStateApp(null);
  const [bookmarks, setBookmarks] = useStateApp(new Set(["c01", "c03", "c06"]));
  const [onboarding, setOnboarding] = useStateApp(t.showOnboarding);
  const viewport = useViewportSizeApp();
  const [frameParam, setFrameParam] = useStateApp(new URLSearchParams(window.location.search).get("frame"));

  useEffectApp(() => { window.TR_TWEAKS = t; }, [t]);
  useEffectApp(() => { setOnboarding(t.showOnboarding); }, [t.showOnboarding]);
  useEffectApp(() => {
    const syncModeFromPath = () => {
      setModeState(pathMode());
      setFrameParam(new URLSearchParams(window.location.search).get("frame"));
    };
    syncModeFromPath();
    window.addEventListener("popstate", syncModeFromPath);
    return () => window.removeEventListener("popstate", syncModeFromPath);
  }, []);
  useEffectApp(() => {
    if (mode !== "user") return;
    requestAnimationFrame(() => {
      const shell = document.querySelector("[data-tr-user-shell]");
      if (shell) shell.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [mode, tab, detailId, frameParam]);

  const setMode = (nextMode) => {
    setModeState(nextMode);
    const params = new URLSearchParams(window.location.search);
    if (nextMode === "admin") params.set("mode", "admin");
    else params.delete("mode");
    const nextPath = `/${params.toString() ? `?${params.toString()}` : ""}`;
    const currentPath = `${window.location.pathname}${window.location.search}`;
    if (currentPath !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }
    if (nextMode === "user") setDetailId(null);
  };

  const toggleBookmark = (id) => {
    setBookmarks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const css = buildCSS(t);
  const userLayoutMode = viewport.width >= 1024 ? "desktop" : viewport.width >= 768 ? "tablet" : "mobile";
  const usePhoneFrame = mode === "user" && frameParam === "phone";
  const useDesktopFrame = mode === "user" && frameParam === "desktop";
  const effectiveUserLayout = usePhoneFrame ? "mobile" : useDesktopFrame ? "desktop" : userLayoutMode;

  let userScreen;
  if (tab === "home") userScreen = <HomeScreen layoutMode={effectiveUserLayout} onTab={setTab} onCard={setDetailId} />;
  else if (tab === "shorts") userScreen = <ShortsScreen layoutMode={effectiveUserLayout} onCard={setDetailId} />;
  else if (tab === "search") userScreen = <SearchScreen layoutMode={effectiveUserLayout} onCard={setDetailId} bookmarks={bookmarks} toggleBookmark={toggleBookmark} />;
  else if (tab === "bookmarks") userScreen = <BookmarksScreen layoutMode={effectiveUserLayout} bookmarks={bookmarks} toggleBookmark={toggleBookmark} onCard={setDetailId} />;
  else if (tab === "profile") userScreen = <ProfileScreen layoutMode={effectiveUserLayout} onAdmin={() => setMode("admin")} />;

  const [quickAddSource, setQuickAddSource] = React.useState(null);

  const handleUseAsSource = (handle) => {
    setQuickAddSource(handle);
    setAdminTab("inbox");
  };

  let adminScreen;
  if (adminTab === "dash") adminScreen = <AdminDashboard onTab={setAdminTab} />;
  else if (adminTab === "inbox") adminScreen = <AdminCollectionInbox sourceFocus={quickAddSource} onClearSource={() => setQuickAddSource(null)} searchQuery={adminSearch} />;
  else if (adminTab === "review") adminScreen = <AdminCandidateReview searchQuery={adminSearch} />;
  else if (adminTab === "sources") adminScreen = <AdminSources onUseAsSource={handleUseAsSource} searchQuery={adminSearch} />;

  const userViewKey = detailId ? `detail-${detailId}` : `tab-${tab}`;
  const userViewMotion = detailId ? "detail" : "screen";
  const userViewStyle = !detailId && tab === "shorts" && effectiveUserLayout !== "desktop" ? { height: "100%" } : undefined;
  const handleDesktopNavTab = (nextTab) => {
    setDetailId(null);
    setTab(nextTab);
  };

  return (
    <React.Fragment>
      <style>{css}</style>
      {mode === "admin" ? (
        <AdminDesktopShell>
          <AdminShell
            tab={adminTab}
            onTab={setAdminTab}
            onExit={() => setMode("user")}
            searchQuery={adminSearch}
            onSearchChange={setAdminSearch}
          >
            <AnimatedView key={`admin-${adminTab}`} motion="admin" style={{ minHeight: "100%" }}>
              {adminScreen}
            </AnimatedView>
          </AdminShell>
        </AdminDesktopShell>
      ) : usePhoneFrame ? (
        <FrameStage>
          <div className="tr-screen" style={{
          width: "100%", height: "100%", position: "relative",
          background: "var(--tr-bg)", color: "var(--tr-fg)",
          fontFamily: "var(--tr-font)",
          overflow: "hidden",
          }}>
            {/* status bar */}
            <StatusBar dark={!isLight(t.palette[1])} />

            <div data-tr-user-shell style={{
              position: "absolute", top: 32, bottom: 0, left: 0, right: 0,
              overflow: !detailId && tab === "shorts" ? "hidden" : "auto",
              scrollbarWidth: "none", msOverflowStyle: "none",
            }}>
              <AnimatedView key={`phone-${userViewKey}`} motion={userViewMotion} style={userViewStyle}>
                {detailId ? (
                  <CardDetail cardId={detailId} onBack={() => setDetailId(null)}
                              bookmarks={bookmarks} toggleBookmark={toggleBookmark}
                              layoutMode="mobile" />
                ) : userScreen}
              </AnimatedView>
            </div>

            {/* bottom nav (user mode only, hidden on detail) */}
            {!detailId && (
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
            {onboarding && <div className="tr-overlay-motion"><Onboarding onDone={() => setOnboarding(false)} /></div>}
          </div>
        </FrameStage>
      ) : (
        <UserResponsiveShell layoutMode={effectiveUserLayout} lockViewport={!detailId && tab === "shorts" && effectiveUserLayout !== "desktop"}>
          {effectiveUserLayout === "desktop" && (
            <DesktopUserNav tab={tab} onTab={handleDesktopNavTab} />
          )}
          <AnimatedView key={`responsive-${userViewKey}`} motion={userViewMotion} style={userViewStyle}>
            {detailId ? (
              <div style={{
                maxWidth: effectiveUserLayout === "desktop" ? "none" : 620,
                width: "100%",
                margin: "0 auto",
                minHeight: "100vh",
              }}>
                <CardDetail cardId={detailId} onBack={() => setDetailId(null)}
                            bookmarks={bookmarks} toggleBookmark={toggleBookmark}
                            layoutMode={effectiveUserLayout} />
              </div>
            ) : userScreen}
          </AnimatedView>
          {effectiveUserLayout !== "desktop" && !detailId && (
            <BottomNav tab={tab} onTab={setTab} fixed />
          )}
          {onboarding && <div className="tr-overlay-motion"><Onboarding onDone={() => setOnboarding(false)} /></div>}
        </UserResponsiveShell>
      )}

      <TweaksUI t={t} setTweak={setTweak} mode={mode} setMode={setMode} setTab={setTab}
                setAdminTab={setAdminTab} setOnboarding={setOnboarding}
                setDetailId={setDetailId} />
    </React.Fragment>
  );
}

function AnimatedView({ motion = "screen", style, children }) {
  return (
    <div className="tr-motion-view" data-motion-kind={motion} style={style}>
      {children}
    </div>
  );
}

function DesktopUserNav({ tab, onTab }) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 20,
      background: "#FFFFFF",
      color: "#111318",
      borderBottom: "1px solid #E4E7EF",
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
          color: "#111318",
          cursor: "pointer",
          padding: 0,
          fontSize: 30,
          fontFamily: "'Space Grotesk', 'Pretendard', sans-serif",
          fontWeight: 950,
          letterSpacing: "-0.075em",
        }}>Trend Radar</button>
        <button onClick={() => onTab("home")} style={{
          height: 84,
          border: 0,
          borderBottom: tab === "home" ? "2px solid #4353FF" : "2px solid transparent",
          background: "transparent",
          color: "#111318",
          cursor: "pointer",
          fontSize: 14,
          fontWeight: 950,
        }}>
          트렌드 레터
        </button>
        <button onClick={() => onTab("search")} style={{
          height: 84,
          border: 0,
          borderBottom: tab === "search" ? "2px solid #4353FF" : "2px solid transparent",
          background: "transparent",
          color: tab === "search" ? "#111318" : "#4B5563",
          cursor: "pointer",
          fontSize: 14,
          fontWeight: tab === "search" ? 950 : 850,
        }}>
          탐색하기
        </button>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => onTab("profile")} style={{
            border: 0,
            background: "#4353FF",
            color: "#fff",
            borderRadius: 0,
            padding: "8px 13px",
            cursor: "pointer",
            fontSize: 12.5,
            fontWeight: 950,
          }}>
            구독하기
          </button>
          <button onClick={() => onTab("profile")} style={{
            border: "1px solid #111318",
            background: "#FFFFFF",
            color: "#111318",
            borderRadius: 0,
            padding: "7px 10px",
            cursor: "pointer",
            fontSize: 12.5,
            fontWeight: 950,
          }}>
            마이페이지
          </button>
        </div>
      </div>
    </div>
  );
}

function useViewportSizeApp() {
  const [size, setSize] = useStateApp({ width: window.innerWidth, height: window.innerHeight });
  useEffectApp(() => {
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return size;
}

function AdminDesktopShell({ children }) {
  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "var(--tr-bg)", color: "var(--tr-fg)",
      overflow: "auto",
    }}>
      {children}
    </div>
  );
}

function UserResponsiveShell({ layoutMode, lockViewport = false, children }) {
  return (
    <div data-tr-user-shell style={{
      position: "fixed", inset: 0,
      background: "var(--tr-bg)", color: "var(--tr-fg)",
      fontFamily: "var(--tr-font)",
      overflow: lockViewport ? "hidden" : "auto",
    }}>
      <div className="tr-screen" style={{
        minHeight: "100vh",
        height: lockViewport ? "100vh" : "auto",
        position: "relative",
        background: "var(--tr-bg)",
        color: "var(--tr-fg)",
        paddingBottom: layoutMode === "desktop" ? 0 : 84,
      }}>
        {children}
      </div>
    </div>
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
                       { value: "inbox", label: "수집 큐" },
                       { value: "review", label: "후보 검수" },
                       { value: "sources", label: "소스" },
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
