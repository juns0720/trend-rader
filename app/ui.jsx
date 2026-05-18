// Trend Radar — line icons + shared UI primitives.
// No emoji. All icons inline SVG, 1.5px stroke, currentColor.

const Icon = ({ d, size = 20, stroke = 1.6, fill = 'none', children, viewBox = '0 0 24 24', style }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="none"
       stroke="currentColor" strokeWidth={stroke}
       strokeLinecap="round" strokeLinejoin="round"
       style={style}>
    {d ? <path d={d} fill={fill} /> : children}
  </svg>
);

const Icons = {
  Search:   (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></Icon>,
  Bookmark: (p) => <Icon {...p}><path d="M6 4h12v17l-6-4-6 4V4z"/></Icon>,
  BookmarkFill: (p) => <Icon {...p}><path d="M6 4h12v17l-6-4-6 4V4z" fill="currentColor"/></Icon>,
  Back:     (p) => <Icon {...p}><path d="M15 5l-7 7 7 7"/></Icon>,
  Close:    (p) => <Icon {...p}><path d="M6 6l12 12M18 6L6 18"/></Icon>,
  More:     (p) => <Icon {...p}><circle cx="5"  cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="19" cy="12" r="1.4" fill="currentColor"/></Icon>,
  Filter:   (p) => <Icon {...p}><path d="M3 6h18M6 12h12M10 18h4"/></Icon>,
  Share:    (p) => <Icon {...p}><path d="M12 4v12M12 4l-4 4M12 4l4 4M5 14v5h14v-5"/></Icon>,
  Up:       (p) => <Icon {...p}><path d="M6 14l6-6 6 6"/></Icon>,
  Down:     (p) => <Icon {...p}><path d="M6 10l6 6 6-6"/></Icon>,
  Flat:     (p) => <Icon {...p}><path d="M5 12h14"/></Icon>,
  Home:     (p) => <Icon {...p}><path d="M4 11l8-7 8 7v9h-5v-6H9v6H4v-9z"/></Icon>,
  Compass:  (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5L13 13l-4.5 2.5L11 11z" fill="currentColor"/></Icon>,
  BookmarkTab:(p)=> <Icon {...p}><path d="M6 4h12v17l-6-4-6 4V4z"/></Icon>,
  User:     (p) => <Icon {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></Icon>,
  Check:    (p) => <Icon {...p}><path d="M5 12l4 4 10-10"/></Icon>,
  Clock:    (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Icon>,
  Plus:     (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>,
  Eye:      (p) => <Icon {...p}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></Icon>,
  X:        (p) => <Icon {...p}><path d="M4 4l16 16M20 4L4 20" stroke="currentColor"/></Icon>,
  Link:     (p) => <Icon {...p}><path d="M10 14a4 4 0 005.66 0l3-3a4 4 0 00-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 005.66 5.66l1-1"/></Icon>,
  ArrowRight:(p)=> <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6"/></Icon>,
  Settings: (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 01-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 01-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 012.8-2.8l.1.1a1.7 1.7 0 001.8.3h.1a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 012.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8v.1a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z"/></Icon>,
  Radar:    (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><path d="M12 12L19 7"/></Icon>,
  Bell:     (p) => <Icon {...p}><path d="M6 8a6 6 0 1112 0c0 7 3 7 3 9H3c0-2 3-2 3-9z"/><path d="M10 20a2 2 0 004 0"/></Icon>,
  Camera:   (p) => <Icon {...p}><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="4"/><path d="M8 6l2-3h4l2 3"/></Icon>,
  Edit:     (p) => <Icon {...p}><path d="M4 20h4l11-11-4-4L4 16v4z"/></Icon>,
  Trash:    (p) => <Icon {...p}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></Icon>,
};

// ── Logo wordmark — a small radar circle + "Trend Radar".
const Logo = ({ size = 22, color = 'currentColor' }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color, fontWeight: 700, letterSpacing: '-0.02em' }}>
    <span style={{
      width: size, height: size, borderRadius: '50%',
      border: `1.6px solid ${color}`,
      position: 'relative', display: 'inline-block',
    }}>
      <span style={{
        position: 'absolute', inset: 3, borderRadius: '50%',
        border: `1.2px solid ${color}`,
      }}/>
      <span style={{
        position: 'absolute', top: '50%', left: '50%',
        width: size * 0.5, height: 1.4, background: color,
        transformOrigin: '0 50%',
        transform: 'translate(0, -50%) rotate(-30deg)',
      }}/>
      <span style={{
        position: 'absolute', top: '50%', left: '50%',
        width: 4, height: 4, marginLeft: -2, marginTop: -2,
        background: color, borderRadius: '50%',
      }}/>
    </span>
    <span style={{ fontSize: size * 0.82, lineHeight: 1 }}>Trend Radar</span>
  </span>
);

// ── Signal-light timing badge. Variants:
//   variant: 'dot' (just the colored dot)
//   variant: 'pill' (dot + label)
//   variant: 'large' (vertical stack)
const TIMING = {
  go:   { color: 'var(--go)',   label: '지금 타도 됨',  short: 'GO',    short_ko: '초록' },
  soon: { color: 'var(--soon)', label: '빠르면 빠를수록', short: 'SOON',  short_ko: '노랑' },
  late: { color: 'var(--late)', label: '이미 늦은 듯',   short: 'LATE',  short_ko: '빨강' },
};

const TimingDot = ({ timing, size = 10 }) => (
  <span style={{
    display: 'inline-block', width: size, height: size, borderRadius: '50%',
    background: TIMING[timing].color,
    boxShadow: `0 0 0 ${Math.max(2, size * 0.35)}px ${TIMING[timing].color}22`,
  }}/>
);

const TimingPill = ({ timing, dense = false }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: dense ? 5 : 7,
    padding: dense ? '3px 8px 3px 6px' : '5px 10px 5px 8px',
    borderRadius: 999, fontSize: dense ? 11 : 12, fontWeight: 600,
    background: 'var(--paper)',
    border: '1px solid var(--line)',
    color: 'var(--ink)',
    whiteSpace: 'nowrap',
  }}>
    <TimingDot timing={timing} size={dense ? 7 : 8}/>
    {TIMING[timing].label}
  </span>
);

const TimingLight = ({ timing }) => {
  // Vertical 3-light traffic light with active one lit.
  const order = ['go', 'soon', 'late'];
  return (
    <div style={{
      display: 'inline-flex', flexDirection: 'column', gap: 4,
      padding: 6, borderRadius: 10,
      background: 'var(--ink)',
      border: '1px solid var(--line)',
    }}>
      {order.map(k => (
        <span key={k} style={{
          width: 12, height: 12, borderRadius: '50%',
          background: timing === k ? TIMING[k].color : '#2a2a28',
          boxShadow: timing === k ? `0 0 12px ${TIMING[k].color}` : 'none',
          transition: 'all .2s',
        }}/>
      ))}
    </div>
  );
};

// ── Sparkline.
const Sparkline = ({ data, width = 80, height = 28, color = 'var(--ink)', fill = true }) => {
  const max = Math.max(...data), min = Math.min(...data);
  const span = Math.max(1, max - min);
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * width,
    height - ((v - min) / span) * (height - 4) - 2,
  ]);
  const path = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `${path} L${width},${height} L0,${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      {fill && <path d={area} fill={color} opacity="0.08"/>}
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="2.2" fill={color}/>
    </svg>
  );
};

// ── Striped placeholder thumbnail. Used in place of real photos.
//    Diagonal stripes with monospace caption telling content team what
//    should be dropped in.
const ThumbPlaceholder = ({ label, h = 200, tone = 'warm' }) => {
  const tones = {
    warm: ['#efe8db', '#e5dccc', '#3a342a'],
    cool: ['#e9ecef', '#dde1e4', '#2a2f33'],
    mono: ['#ececec', '#dcdcdc', '#222'],
  };
  const [a, b, ink] = tones[tone] || tones.warm;
  return (
    <div style={{
      position: 'relative', width: '100%', height: h, overflow: 'hidden',
      background: `repeating-linear-gradient(135deg, ${a} 0 14px, ${b} 14px 28px)`,
      borderRadius: 14,
      isolation: 'isolate',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'flex-end', padding: 14,
      }}>
        <span style={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: 10.5, letterSpacing: '0.04em',
          color: ink, opacity: 0.7,
          background: 'rgba(255,255,255,0.4)',
          padding: '4px 8px', borderRadius: 6,
          backdropFilter: 'blur(4px)',
        }}>
          {label}
        </span>
      </div>
    </div>
  );
};

// ── Score bar (0-100).
const ScoreBar = ({ value, label, color = 'var(--ink)' }) => (
  <div>
    <div style={{
      display: 'flex', justifyContent: 'space-between',
      fontSize: 11, color: 'var(--mute)', marginBottom: 4,
    }}>
      <span>{label}</span>
      <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{value}</span>
    </div>
    <div style={{ height: 3, background: 'var(--line)', borderRadius: 2, overflow: 'hidden' }}>
      <div style={{ width: `${value}%`, height: '100%', background: color }}/>
    </div>
  </div>
);

// ── Tag chip.
const Chip = ({ children, active, onClick }) => (
  <button onClick={onClick} style={{
    padding: '7px 13px', borderRadius: 999,
    border: '1px solid ' + (active ? 'var(--ink)' : 'var(--line)'),
    background: active ? 'var(--ink)' : 'var(--paper)',
    color: active ? 'var(--paper)' : 'var(--ink)',
    fontSize: 13, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
    transition: 'all .15s',
  }}>{children}</button>
);

// ── Rank delta indicator (▲5 / ▼2 / —)
const RankDelta = ({ prev, curr }) => {
  if (prev == null) return <span style={{ color: 'var(--mute)', fontSize: 11 }}>NEW</span>;
  const diff = prev - curr;
  if (diff === 0) return <span style={{ color: 'var(--mute)', fontSize: 11 }}>—</span>;
  const up = diff > 0;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 1,
      color: up ? 'var(--go)' : 'var(--late)',
      fontSize: 11, fontWeight: 600,
    }}>
      {up ? '▲' : '▼'}{Math.abs(diff)}
    </span>
  );
};

Object.assign(window, {
  Icons, Logo, TimingDot, TimingPill, TimingLight, Sparkline,
  ThumbPlaceholder, ScoreBar, Chip, RankDelta, TIMING,
});
