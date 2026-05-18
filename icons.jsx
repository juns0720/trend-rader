// icons.jsx — Custom line icons. No emoji.

const IconBase = ({ children, size = 20, stroke = "currentColor", sw = 1.6, fill = "none", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw}
       strokeLinecap="round" strokeLinejoin="round" style={style}>
    {children}
  </svg>
);

const IconHome = (p) => <IconBase {...p}><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z"/></IconBase>;
const IconSearch = (p) => <IconBase {...p}><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-3.5-3.5"/></IconBase>;
const IconBookmark = (p) => <IconBase {...p}><path d="M6 3h12v18l-6-4-6 4z"/></IconBase>;
const IconBookmarkFilled = (p) => <IconBase {...p} fill="currentColor"><path d="M6 3h12v18l-6-4-6 4z"/></IconBase>;
const IconUser = (p) => <IconBase {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></IconBase>;
const IconBack = (p) => <IconBase {...p}><path d="M15 5l-7 7 7 7"/></IconBase>;
const IconShare = (p) => <IconBase {...p}><path d="M12 3v13"/><path d="M7 8l5-5 5 5"/><path d="M5 14v6h14v-6"/></IconBase>;
const IconLink = (p) => <IconBase {...p}><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66l-1.5 1.5"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1.5-1.5"/></IconBase>;
const IconFilter = (p) => <IconBase {...p}><path d="M3 5h18M6 12h12M10 19h4"/></IconBase>;
const IconClose = (p) => <IconBase {...p}><path d="M6 6l12 12M18 6L6 18"/></IconBase>;
const IconCheck = (p) => <IconBase {...p}><path d="M5 12l5 5 9-11"/></IconBase>;
const IconChevronRight = (p) => <IconBase {...p}><path d="M9 5l7 7-7 7"/></IconBase>;
const IconChevronDown = (p) => <IconBase {...p}><path d="M5 9l7 7 7-7"/></IconBase>;
const IconUp = (p) => <IconBase {...p}><path d="M5 15l7-7 7 7"/></IconBase>;
const IconDown = (p) => <IconBase {...p}><path d="M5 9l7 7 7-7"/></IconBase>;
const IconDash = (p) => <IconBase {...p}><path d="M5 12h14"/></IconBase>;
const IconSettings = (p) => <IconBase {...p}><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></IconBase>;
const IconPlus = (p) => <IconBase {...p}><path d="M12 5v14M5 12h14"/></IconBase>;
const IconEdit = (p) => <IconBase {...p}><path d="M4 20h4l10-10-4-4L4 16zM14 6l4 4"/></IconBase>;
const IconTrash = (p) => <IconBase {...p}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></IconBase>;
const IconSparkle = (p) => <IconBase {...p}><path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/></IconBase>;
const IconClock = (p) => <IconBase {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></IconBase>;
const IconEye = (p) => <IconBase {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></IconBase>;
const IconFlame = (p) => <IconBase {...p}><path d="M12 3c2 4 5 5 5 9a5 5 0 1 1-10 0c0-3 2-3 2-6 0-1 1-2 3-3z"/></IconBase>;
const IconRadar = (p) => <IconBase {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M12 12L20 6"/></IconBase>;
const IconMore = (p) => <IconBase {...p}><circle cx="5" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="19" cy="12" r="1.4" fill="currentColor"/></IconBase>;
const IconLayers = (p) => <IconBase {...p}><path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 18l9 5 9-5"/></IconBase>;
const IconX = (p) => <IconBase {...p} sw={2}><path d="M4 4l16 16M20 4L4 20"/></IconBase>;
const IconAt = (p) => <IconBase {...p}><circle cx="12" cy="12" r="4"/><path d="M16 12v2a3 3 0 0 0 6 0v-2a10 10 0 1 0-4 8"/></IconBase>;
const IconChart = (p) => <IconBase {...p}><path d="M4 20V8M10 20V4M16 20v-9M22 20H2"/></IconBase>;

Object.assign(window, {
  IconHome, IconSearch, IconBookmark, IconBookmarkFilled, IconUser, IconBack, IconShare,
  IconLink, IconFilter, IconClose, IconCheck, IconChevronRight, IconChevronDown,
  IconUp, IconDown, IconDash, IconSettings, IconPlus, IconEdit, IconTrash,
  IconSparkle, IconClock, IconEye, IconFlame, IconRadar, IconMore, IconLayers,
  IconX, IconAt, IconChart,
});
