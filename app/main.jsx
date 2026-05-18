// Trend Radar — main entry.
// Sets up DesignCanvas with two sections, applies CSS-var tokens from tweaks.

const { useEffect: useEffectM } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "warm",
  "cardStyle": "image",
  "type": "pretendard"
}/*EDITMODE-END*/;

const PALETTES = {
  warm: {
    bg:    '#faf7f1',
    bg2:   '#f1ece1',
    paper: '#ffffff',
    ink:   '#1a1814',
    ink2:  '#4a463f',
    mute:  '#8a8478',
    line:  '#e6e0d2',
  },
  cool: {
    bg:    '#f6f7f9',
    bg2:   '#eceef2',
    paper: '#ffffff',
    ink:   '#14171b',
    ink2:  '#3f444b',
    mute:  '#838890',
    line:  '#dfe2e7',
  },
  mono: {
    bg:    '#f5f5f5',
    bg2:   '#ececec',
    paper: '#ffffff',
    ink:   '#0d0d0d',
    ink2:  '#393939',
    mute:  '#8a8a8a',
    line:  '#e0e0e0',
  },
};

const SIGNAL = {
  go:   'oklch(0.72 0.16 145)',
  soon: 'oklch(0.78 0.15 85)',
  late: 'oklch(0.65 0.18 25)',
};

function applyTokens(palette) {
  const p = PALETTES[palette] || PALETTES.warm;
  const r = document.documentElement;
  r.style.setProperty('--bg',    p.bg);
  r.style.setProperty('--bg-2',  p.bg2);
  r.style.setProperty('--paper', p.paper);
  r.style.setProperty('--ink',   p.ink);
  r.style.setProperty('--ink-2', p.ink2);
  r.style.setProperty('--mute',  p.mute);
  r.style.setProperty('--line',  p.line);
  r.style.setProperty('--go',    SIGNAL.go);
  r.style.setProperty('--soon',  SIGNAL.soon);
  r.style.setProperty('--late',  SIGNAL.late);
}

const App = () => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffectM(() => { applyTokens(t.palette); }, [t.palette]);
  useEffectM(() => {
    document.documentElement.style.setProperty(
      '--font-body',
      t.type === 'serif'
        ? '"Noto Serif KR", "Pretendard Variable", Pretendard, serif'
        : '"Pretendard Variable", Pretendard, -apple-system, "Apple SD Gothic Neo", sans-serif'
    );
  }, [t.type]);

  return (
    <>
      <DesignCanvas>
        <DCSection id="user-app" title="사용자 앱"
          subtitle="Trend Radar — 음식 트렌드 카드를 매일 5–10장 받는 모바일 앱. 카드를 탭하면 상세, 하단 탭으로 이동.">

          <DCArtboard id="onboarding" label="01 · Onboarding"
            width={394} height={830}>
            <UserApp startScreen="onboarding" cardStyle={t.cardStyle}/>
          </DCArtboard>

          <DCArtboard id="home" label="02 · Home — 오늘의 카드 + 실시간 TOP 10"
            width={394} height={830}>
            <UserApp startScreen="home" cardStyle={t.cardStyle}/>
          </DCArtboard>

          <DCArtboard id="detail" label="03 · Detail — 콘텐츠 레시피"
            width={394} height={830}>
            <UserApp startScreen="detail" cardStyle={t.cardStyle}/>
          </DCArtboard>

          <DCArtboard id="search" label="04 · Search — 카테고리·타이밍 필터"
            width={394} height={830}>
            <UserApp startScreen="search" cardStyle={t.cardStyle}/>
          </DCArtboard>

          <DCArtboard id="bookmarks" label="05 · Bookmarks — 저장한 카드"
            width={394} height={830}>
            <UserApp startScreen="bookmarks" cardStyle={t.cardStyle}/>
          </DCArtboard>
        </DCSection>

        <DCSection id="admin" title="운영자 콘솔"
          subtitle="하루 1.5–2시간 운영 흐름. 좌측 사이드바로 4개 뷰 이동. 모든 뷰가 인터랙티브.">
          <DCArtboard id="admin-dashboard" label="A · Dashboard — 오늘의 운영 현황"
            width={1280} height={820}>
            <AdminConsole startView="dashboard"/>
          </DCArtboard>
          <DCArtboard id="admin-candidates" label="B · Candidates — 후보 키워드 검토"
            width={1280} height={820}>
            <AdminConsole startView="candidates"/>
          </DCArtboard>
          <DCArtboard id="admin-editor" label="C · Card Editor — LLM 초안 + 미리보기"
            width={1280} height={820}>
            <AdminConsole startView="editor"/>
          </DCArtboard>
          <DCArtboard id="admin-accounts" label="D · Sources — X 계정 · 블록리스트"
            width={1280} height={820}>
            <AdminConsole startView="accounts"/>
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Trend Radar · Tweaks">
        <TweakSection label="배경 팔레트">
          <TweakRadio
            value={t.palette}
            onChange={v => setTweak('palette', v)}
            options={[
              { value: 'warm', label: '웜' },
              { value: 'cool', label: '쿨' },
              { value: 'mono', label: '모노' },
            ]}/>
        </TweakSection>
        <TweakSection label="카드 스타일">
          <TweakRadio
            value={t.cardStyle}
            onChange={v => setTweak('cardStyle', v)}
            options={[
              { value: 'image', label: '이미지 위주' },
              { value: 'info',  label: '정보 위주' },
            ]}/>
        </TweakSection>
        <TweakSection label="타이포">
          <TweakRadio
            value={t.type}
            onChange={v => setTweak('type', v)}
            options={[
              { value: 'pretendard', label: 'Pretendard' },
              { value: 'serif',      label: '세리프' },
            ]}/>
        </TweakSection>
      </TweaksPanel>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
