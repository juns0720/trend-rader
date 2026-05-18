// Trend Radar — user app (mobile).
// One root <UserApp/> with internal screen state. Screens:
//   onboarding → home → detail / search / bookmarks
// Fully interactive: bookmark toggle, category filter, search,
// back navigation, smooth screen transitions.

const { useState, useMemo, useEffect, useRef } = React;

// ────────────────────────────────────────────────────────────────
// Header inside the app (under the Android status bar).
// ────────────────────────────────────────────────────────────────
const UserHeader = ({ title, left, right, large, sub }) => (
  <div style={{
    background: 'var(--bg)',
    padding: large ? '14px 18px 12px' : '12px 16px',
    display: 'flex', alignItems: large ? 'flex-start' : 'center',
    gap: 10, borderBottom: '1px solid transparent',
  }}>
    {left}
    <div style={{ flex: 1, minWidth: 0 }}>
      {large ? (
        <>
          <div style={{ fontSize: 11, color: 'var(--mute)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 2 }}>{sub}</div>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 }}>{title}</div>
        </>
      ) : (
        <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>{title}</div>
      )}
    </div>
    {right}
  </div>
);

// ────────────────────────────────────────────────────────────────
// Bottom tab bar.
// ────────────────────────────────────────────────────────────────
const BottomTabs = ({ tab, onTab }) => {
  const tabs = [
    { id: 'home',      label: '오늘', Icon: Icons.Home },
    { id: 'search',    label: '탐색', Icon: Icons.Search },
    { id: 'bookmarks', label: '저장', Icon: Icons.BookmarkTab },
    { id: 'me',        label: '나',   Icon: Icons.User },
  ];
  return (
    <div style={{
      position: 'sticky', bottom: 0, left: 0, right: 0,
      background: 'rgba(250,248,244,0.92)',
      backdropFilter: 'blur(12px)',
      borderTop: '1px solid var(--line)',
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
      paddingBottom: 6, paddingTop: 4,
    }}>
      {tabs.map(t => {
        const on = tab === t.id;
        return (
          <button key={t.id} onClick={() => onTab(t.id)} style={{
            background: 'transparent', border: 0, padding: '10px 0 6px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            color: on ? 'var(--ink)' : 'var(--mute)', cursor: 'pointer',
          }}>
            <t.Icon size={22}/>
            <span style={{ fontSize: 10.5, fontWeight: on ? 600 : 500, letterSpacing: '-0.01em' }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// ONBOARDING (3 slides + CTA)
// ────────────────────────────────────────────────────────────────
const Onboarding = ({ onDone }) => {
  const [i, setI] = useState(0);
  const slides = [
    {
      kicker: 'TREND RADAR',
      title: '오늘 뭐 찍지,\n매일 5장으로 끝.',
      body: '음식·디저트 트렌드를 운영팀이 매일 아침 직접 골라 카드로 정리해드려요.',
      visual: 'cards',
    },
    {
      kicker: '신호등',
      title: '\u201c지금 타도 되는지\u201d\n초·노·빨로 한눈에.',
      body: '검색량 그래프와 큰 채널 진입 여부를 운영팀이 종합해 타이밍을 매깁니다.',
      visual: 'light',
    },
    {
      kicker: '레시피',
      title: '카드 하나에 영상 한 편이\n다 들어있어요.',
      body: '이게 뭔지 · 왜 뜨는지 · 콘텐츠 각도 · 첫 3초 훅 · 플랫폼별 포맷까지.',
      visual: 'recipe',
    },
  ];
  const slide = slides[i];

  const Visual = () => {
    if (slide.visual === 'cards') {
      return (
        <div style={{ position: 'relative', width: 240, height: 200, margin: '0 auto' }}>
          {[0,1,2].map(k => (
            <div key={k} style={{
              position: 'absolute', left: 16 + k*22, top: 8 + k*10,
              width: 170, height: 200,
              background: ['#f5efe4','#ebe3d4','var(--paper)'][k],
              borderRadius: 16, border: '1px solid var(--line)',
              boxShadow: `0 ${4+k*6}px ${10+k*8}px rgba(0,0,0,0.06)`,
              transform: `rotate(${-6 + k*5}deg)`,
              display: 'flex', flexDirection: 'column',
              padding: 14,
            }}>
              <div style={{ width: '100%', flex: 1, borderRadius: 8,
                background: `repeating-linear-gradient(135deg, #e3d9c5 0 8px, #d9cfb8 8px 16px)`,
              }}/>
              <div style={{ marginTop: 10, height: 8, background: 'var(--ink)', opacity: 0.85, borderRadius: 2, width: '70%' }}/>
              <div style={{ marginTop: 6, height: 6, background: 'var(--line)', borderRadius: 2, width: '50%' }}/>
            </div>
          ))}
        </div>
      );
    }
    if (slide.visual === 'light') {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 22, padding: '20px 0' }}>
          {['go','soon','late'].map((k, idx) => (
            <div key={k} style={{ textAlign: 'center', opacity: idx === 0 ? 1 : 0.45 }}>
              <span style={{
                display: 'inline-block', width: 56, height: 56, borderRadius: '50%',
                background: TIMING[k].color,
                boxShadow: idx === 0 ? `0 0 24px ${TIMING[k].color}` : 'none',
              }}/>
              <div style={{ marginTop: 10, fontSize: 12, fontWeight: 600 }}>{TIMING[k].label}</div>
            </div>
          ))}
        </div>
      );
    }
    // recipe
    return (
      <div style={{
        width: 260, margin: '0 auto', padding: 16,
        background: 'var(--paper)', borderRadius: 16, border: '1px solid var(--line)',
      }}>
        {['이게 뭔데?', '왜 뜨는데?', '콘텐츠 각도', '첫 3초 훅', '플랫폼별 포맷'].map((s, idx) => (
          <div key={s} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 0',
            borderTop: idx === 0 ? 'none' : '1px solid var(--line)',
            fontSize: 13, fontWeight: 500,
          }}>
            <span style={{
              width: 18, height: 18, borderRadius: '50%',
              background: 'var(--ink)', color: 'var(--paper)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 700,
            }}>{idx+1}</span>
            <span>{s}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: 'var(--bg)',
    }}>
      <div style={{
        padding: '20px 22px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Logo size={22}/>
        <button onClick={onDone} style={{
          background: 'transparent', border: 0, color: 'var(--mute)',
          fontSize: 13, fontWeight: 500, cursor: 'pointer',
        }}>건너뛰기</button>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 26px' }}>
        <div style={{ padding: '0 0 28px' }}>
          <Visual/>
        </div>
        <div style={{
          fontSize: 11, color: 'var(--mute)', letterSpacing: '0.08em',
          fontWeight: 600, marginBottom: 8,
        }}>{slide.kicker}</div>
        <h1 style={{
          fontSize: 26, fontWeight: 700, lineHeight: 1.25,
          letterSpacing: '-0.025em', margin: '0 0 12px',
          whiteSpace: 'pre-line',
        }}>{slide.title}</h1>
        <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.55, margin: 0 }}>{slide.body}</p>
      </div>
      <div style={{ padding: '0 22px 28px' }}>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 22 }}>
          {slides.map((_, idx) => (
            <span key={idx} style={{
              width: idx === i ? 22 : 6, height: 6, borderRadius: 3,
              background: idx === i ? 'var(--ink)' : 'var(--line)',
              transition: 'all .25s',
            }}/>
          ))}
        </div>
        <button onClick={() => i < slides.length - 1 ? setI(i+1) : onDone()} style={{
          width: '100%', padding: '17px 0', borderRadius: 14, border: 0,
          background: 'var(--ink)', color: 'var(--paper)',
          fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', cursor: 'pointer',
        }}>
          {i < slides.length - 1 ? '다음' : '시작하기'}
        </button>
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// HOME (today's cards + live rank + filters)
// ────────────────────────────────────────────────────────────────

// Realtime ranking strip — slides through top 10 in groups of 5.
const RankStrip = ({ onPick }) => {
  const [page, setPage] = useState(0);
  const pages = useMemo(() => {
    const sorted = [...CARDS].sort((a,b) => a.rank - b.rank).slice(0, 10);
    return [sorted.slice(0,5), sorted.slice(5,10)];
  }, []);
  useEffect(() => {
    const t = setInterval(() => setPage(p => (p+1) % pages.length), 4200);
    return () => clearInterval(t);
  }, [pages.length]);

  return (
    <div style={{
      margin: '0 16px 18px',
      padding: '14px 14px 12px',
      background: 'var(--paper)',
      border: '1px solid var(--line)',
      borderRadius: 16,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%', background: 'var(--late)',
            animation: 'tr-pulse 1.8s infinite',
          }}/>
          <span style={{ fontSize: 12, fontWeight: 600 }}>실시간 트렌드 TOP 10</span>
        </div>
        <span style={{ fontSize: 10.5, color: 'var(--mute)' }}>
          {page === 0 ? '1 – 5' : '6 – 10'} · 09:42 갱신
        </span>
      </div>
      <div style={{ overflow: 'hidden' }}>
        <div style={{
          display: 'flex', width: '200%',
          transform: `translateX(${page === 0 ? '0%' : '-50%'})`,
          transition: 'transform .55s cubic-bezier(.7,.05,.3,1)',
        }}>
          {pages.map((group, gi) => (
            <div key={gi} style={{ width: '50%', flexShrink: 0, paddingRight: gi === 0 ? 0 : 0 }}>
              {group.map(card => (
                <button key={card.id} onClick={() => onPick(card)} style={{
                  width: '100%', display: 'grid',
                  gridTemplateColumns: '22px 1fr auto auto',
                  alignItems: 'center', gap: 10,
                  padding: '7px 0', background: 'transparent', border: 0,
                  cursor: 'pointer', textAlign: 'left',
                }}>
                  <span style={{
                    fontSize: 13, fontWeight: 700,
                    color: card.rank <= 3 ? 'var(--ink)' : 'var(--mute)',
                    fontVariantNumeric: 'tabular-nums',
                  }}>{card.rank}</span>
                  <span style={{
                    fontSize: 13.5, fontWeight: 500, color: 'var(--ink)',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>{card.title}</span>
                  <RankDelta prev={card.prevRank} curr={card.rank}/>
                  <TimingDot timing={card.timing} size={7}/>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Big card.
const CardListItem = ({ card, bookmarked, onBookmark, onOpen, style = 'image' }) => {
  const isInfo = style === 'info';
  return (
    <div onClick={onOpen} style={{
      cursor: 'pointer', padding: '0 16px 22px',
    }}>
      <div style={{
        background: 'var(--paper)',
        borderRadius: 18,
        border: '1px solid var(--line)',
        overflow: 'hidden',
      }}>
        {!isInfo && (
          <div style={{ position: 'relative', padding: 8 }}>
            <ThumbPlaceholder
              label={`PHOTO · ${card.title}`}
              h={232}
              tone={card.category === 'meme' ? 'cool' : 'warm'}
            />
            <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 6 }}>
              <TimingPill timing={card.timing} dense/>
            </div>
            <button onClick={(e) => { e.stopPropagation(); onBookmark(card.id); }} style={{
              position: 'absolute', top: 16, right: 16,
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(6px)',
              border: 0, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--ink)',
            }}>
              {bookmarked
                ? <Icons.BookmarkFill size={18}/>
                : <Icons.Bookmark size={18}/>}
            </button>
          </div>
        )}
        <div style={{ padding: isInfo ? 18 : '4px 18px 18px' }}>
          {isInfo && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <TimingPill timing={card.timing} dense/>
              <button onClick={(e) => { e.stopPropagation(); onBookmark(card.id); }} style={{
                width: 30, height: 30, borderRadius: 8, background: 'transparent', border: 0,
                cursor: 'pointer', color: 'var(--ink)',
              }}>
                {bookmarked ? <Icons.BookmarkFill size={18}/> : <Icons.Bookmark size={18}/>}
              </button>
            </div>
          )}
          <div style={{
            fontSize: 11, color: 'var(--mute)', letterSpacing: '0.03em',
            textTransform: 'uppercase', marginBottom: 6,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span>{CATEGORIES.find(c => c.id === card.category)?.label}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{card.publishedAt}</span>
          </div>
          <h3 style={{
            fontSize: 19, fontWeight: 700, letterSpacing: '-0.025em',
            lineHeight: 1.25, margin: '0 0 8px',
          }}>{card.title}</h3>
          <p style={{
            fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.5, margin: '0 0 14px',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>{card.snippet}</p>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: 12, borderTop: '1px solid var(--line)',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{
                fontSize: 22, fontWeight: 700, letterSpacing: '-0.03em',
                fontVariantNumeric: 'tabular-nums',
              }}>{card.score}</span>
              <span style={{ fontSize: 10.5, color: 'var(--mute)', fontWeight: 600 }}>스코어</span>
              <span style={{
                marginLeft: 6, fontSize: 11, fontWeight: 600,
                color: card.delta.startsWith('-') ? 'var(--late)' : 'var(--go)',
                fontVariantNumeric: 'tabular-nums',
              }}>{card.delta}</span>
            </div>
            <Sparkline data={card.trend} width={84} height={26}/>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = ({ bookmarks, onBookmark, onOpen, onTab, category, setCategory, cardStyle }) => {
  const filtered = useMemo(() => {
    return CARDS
      .filter(c => category === 'all' ? true : c.category === category)
      .sort((a,b) => a.rank - b.rank);
  }, [category]);

  return (
    <>
      <UserHeader
        large sub="2026년 5월 18일 · 월요일"
        title={`오늘의 카드 ${filtered.length}장`}
        right={(
          <button style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'var(--paper)', border: '1px solid var(--line)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--ink)',
          }}>
            <Icons.Bell size={18}/>
          </button>
        )}
      />
      <RankStrip onPick={onOpen}/>
      <div style={{
        position: 'sticky', top: 0, zIndex: 5,
        background: 'linear-gradient(180deg, var(--bg) 80%, transparent)',
        padding: '6px 16px 14px',
      }}>
        <div style={{
          display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 2,
          scrollbarWidth: 'none',
        }}>
          {CATEGORIES.map(c => (
            <Chip key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>{c.label}</Chip>
          ))}
        </div>
      </div>
      <div>
        {filtered.map(card => (
          <CardListItem
            key={card.id}
            card={card}
            bookmarked={bookmarks.has(card.id)}
            onBookmark={onBookmark}
            onOpen={() => onOpen(card)}
            style={cardStyle}
          />
        ))}
      </div>
      <div style={{ padding: '6px 16px 28px', textAlign: 'center', color: 'var(--mute)', fontSize: 12 }}>
        — 오늘의 카드는 여기까지 —<br/>
        <span style={{ fontSize: 11 }}>내일 아침 9시 30분에 새 카드가 옵니다.</span>
      </div>
    </>
  );
};

// ────────────────────────────────────────────────────────────────
// DETAIL
// ────────────────────────────────────────────────────────────────
const Detail = ({ card, bookmarked, onBookmark, onBack }) => {
  return (
    <>
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(250,248,244,0.85)',
        backdropFilter: 'blur(10px)',
        padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid var(--line)',
      }}>
        <button onClick={onBack} style={{
          width: 38, height: 38, borderRadius: '50%',
          background: 'var(--paper)', border: '1px solid var(--line)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)',
        }}>
          <Icons.Back size={20}/>
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'var(--paper)', border: '1px solid var(--line)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)',
          }}>
            <Icons.Share size={17}/>
          </button>
          <button onClick={() => onBookmark(card.id)} style={{
            width: 38, height: 38, borderRadius: '50%',
            background: bookmarked ? 'var(--ink)' : 'var(--paper)',
            border: '1px solid ' + (bookmarked ? 'var(--ink)' : 'var(--line)'),
            color: bookmarked ? 'var(--paper)' : 'var(--ink)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {bookmarked ? <Icons.BookmarkFill size={17}/> : <Icons.Bookmark size={17}/>}
          </button>
        </div>
      </div>

      {/* Hero image */}
      <div style={{ padding: 12 }}>
        <ThumbPlaceholder label={`HERO · ${card.title}`} h={280}
          tone={card.category === 'meme' ? 'cool' : 'warm'}/>
      </div>

      {/* Title block */}
      <div style={{ padding: '4px 20px 22px' }}>
        <div style={{
          fontSize: 11, color: 'var(--mute)', letterSpacing: '0.06em',
          textTransform: 'uppercase', fontWeight: 600, marginBottom: 8,
        }}>
          {CATEGORIES.find(c => c.id === card.category)?.label} · {card.publishedAt} 발행
        </div>
        <h1 style={{
          fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em',
          lineHeight: 1.2, margin: '0 0 16px',
        }}>{card.title}</h1>

        {/* Score / Trend / Light row */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 14,
          padding: '16px 16px', background: 'var(--paper)',
          border: '1px solid var(--line)', borderRadius: 16,
          alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 10.5, color: 'var(--mute)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>스코어</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 2 }}>
              <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>{card.score}</span>
              <span style={{
                fontSize: 12, fontWeight: 600,
                color: card.delta.startsWith('-') ? 'var(--late)' : 'var(--go)',
              }}>{card.delta}</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10.5, color: 'var(--mute)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>7일 추세</div>
            <Sparkline data={card.trend} width={100} height={32}/>
          </div>
          <TimingLight timing={card.timing}/>
        </div>

        {/* Timing note */}
        <div style={{
          marginTop: 14, padding: '12px 14px',
          background: card.timing === 'go' ? 'color-mix(in oklch, var(--go) 14%, var(--paper))'
            : card.timing === 'soon' ? 'color-mix(in oklch, var(--soon) 14%, var(--paper))'
            : 'color-mix(in oklch, var(--late) 14%, var(--paper))',
          borderRadius: 12,
          fontSize: 13, lineHeight: 1.5, color: 'var(--ink)',
        }}>
          <span style={{ fontWeight: 700 }}>{TIMING[card.timing].label}</span> · {card.timingNote}
        </div>
      </div>

      <Section title="이게 뭔데?">
        <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{card.what}</p>
      </Section>

      <Section title="왜 뜨는데?">
        <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{card.why}</p>
      </Section>

      <Section title="콘텐츠 각도" sub={`${card.angles.length}개 제안`}>
        <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {card.angles.map((a, i) => (
            <li key={i} style={{
              display: 'flex', gap: 14,
              padding: '14px 0',
              borderTop: i === 0 ? 'none' : '1px solid var(--line)',
            }}>
              <span style={{
                width: 22, height: 22, flexShrink: 0,
                borderRadius: '50%', background: 'var(--ink)', color: 'var(--paper)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700,
                fontVariantNumeric: 'tabular-nums',
              }}>{i + 1}</span>
              <span style={{ fontSize: 14.5, lineHeight: 1.5, color: 'var(--ink)' }}>{a}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="첫 3초 훅">
        <div style={{
          padding: '16px 18px',
          background: 'var(--ink)', color: 'var(--paper)',
          borderRadius: 14,
          fontSize: 15, fontWeight: 500, lineHeight: 1.5,
          letterSpacing: '-0.01em',
          fontStyle: 'normal',
        }}>
          <div style={{ fontSize: 10, opacity: 0.5, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 6 }}>HOOK · 0:00 – 0:03</div>
          {card.hook}
        </div>
      </Section>

      <Section title="플랫폼별 포맷">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {card.platformTips.map((t, i) => (
            <div key={i} style={{
              display: 'flex', gap: 12, padding: 14,
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              borderRadius: 12,
            }}>
              <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
                padding: '4px 8px', height: 22, lineHeight: '14px',
                background: 'var(--ink)', color: 'var(--paper)',
                borderRadius: 6, flexShrink: 0, alignSelf: 'flex-start',
              }}>{t.p}</span>
              <span style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink-2)' }}>{t.t}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="주의점">
        <div style={{
          padding: '12px 14px',
          border: '1px dashed var(--ink-2)',
          borderRadius: 10,
          fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-2)',
        }}>{card.cautions}</div>
      </Section>

      <Section title="근거 출처">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {card.sources.map((s, i) => (
            <a key={i} href={s.url} onClick={e => e.preventDefault()} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: 14, borderRadius: 12,
              background: 'var(--paper)', border: '1px solid var(--line)',
              textDecoration: 'none', color: 'var(--ink)',
            }}>
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.04em',
                padding: '4px 8px', borderRadius: 6,
                background: 'var(--bg-2)', color: 'var(--ink)',
                minWidth: 56, textAlign: 'center',
              }}>{s.kind}</span>
              <span style={{ flex: 1, fontSize: 13.5, color: 'var(--ink-2)' }}>{s.label}</span>
              <Icons.Link size={15}/>
            </a>
          ))}
        </div>
      </Section>

      <div style={{ padding: '8px 20px 32px' }}>
        <button onClick={() => onBookmark(card.id)} style={{
          width: '100%', padding: '17px 0', borderRadius: 14,
          background: bookmarked ? 'var(--paper)' : 'var(--ink)',
          color: bookmarked ? 'var(--ink)' : 'var(--paper)',
          border: '1px solid ' + (bookmarked ? 'var(--line)' : 'var(--ink)'),
          fontSize: 15, fontWeight: 600, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          {bookmarked ? <><Icons.Check size={18}/> 저장됨</> : <><Icons.Bookmark size={18}/> 이 카드 저장</>}
        </button>
        <div style={{ marginTop: 12, textAlign: 'center', fontSize: 11.5, color: 'var(--mute)' }}>
          이 카드로 콘텐츠 만드셨다면 <a href="#" onClick={e => e.preventDefault()} style={{ color: 'var(--ink)', textDecoration: 'underline' }}>알려주세요</a> → 다음 큐레이션 정확도가 좋아져요.
        </div>
      </div>
    </>
  );
};

const Section = ({ title, sub, children }) => (
  <div style={{ padding: '6px 20px 22px' }}>
    <div style={{
      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      marginBottom: 12,
    }}>
      <h2 style={{
        fontSize: 12, fontWeight: 700, letterSpacing: '0.06em',
        textTransform: 'uppercase', color: 'var(--ink)', margin: 0,
      }}>{title}</h2>
      {sub && <span style={{ fontSize: 11, color: 'var(--mute)' }}>{sub}</span>}
    </div>
    {children}
  </div>
);

// ────────────────────────────────────────────────────────────────
// SEARCH
// ────────────────────────────────────────────────────────────────
const Search = ({ onOpen, bookmarks, onBookmark }) => {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  const [timing, setTiming] = useState('all');

  const recents = ['망고푸딩', '버터떡', '코스트코', '동결건조'];
  const trending = CARDS.slice(0, 6);

  const results = useMemo(() => {
    return CARDS.filter(c => {
      if (cat !== 'all' && c.category !== cat) return false;
      if (timing !== 'all' && c.timing !== timing) return false;
      if (q.trim() && !(c.title.includes(q) || c.snippet.includes(q))) return false;
      return true;
    });
  }, [q, cat, timing]);

  const hasQuery = q.trim().length > 0 || cat !== 'all' || timing !== 'all';

  return (
    <>
      <div style={{ padding: '14px 16px 8px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '12px 14px',
          background: 'var(--paper)', border: '1px solid var(--line)',
          borderRadius: 14,
        }}>
          <Icons.Search size={19}/>
          <input
            autoFocus={false}
            value={q} onChange={e => setQ(e.target.value)}
            placeholder="트렌드, 키워드, 카테고리 검색"
            style={{
              flex: 1, border: 0, outline: 'none', background: 'transparent',
              fontSize: 15, color: 'var(--ink)', fontFamily: 'inherit',
              letterSpacing: '-0.01em',
            }}
          />
          {q && <button onClick={() => setQ('')} style={{
            background: 'transparent', border: 0, padding: 4, cursor: 'pointer', color: 'var(--mute)',
          }}><Icons.Close size={16}/></button>}
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ padding: '8px 16px 0' }}>
        <div style={{ fontSize: 11, color: 'var(--mute)', fontWeight: 600, marginBottom: 8, letterSpacing: '0.04em' }}>카테고리</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          {CATEGORIES.map(c => <Chip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>{c.label}</Chip>)}
        </div>
        <div style={{ fontSize: 11, color: 'var(--mute)', fontWeight: 600, marginBottom: 8, letterSpacing: '0.04em' }}>타이밍</div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          <Chip active={timing === 'all'} onClick={() => setTiming('all')}>전체</Chip>
          {['go','soon','late'].map(t => (
            <button key={t} onClick={() => setTiming(timing === t ? 'all' : t)} style={{
              padding: '7px 13px', borderRadius: 999,
              border: '1px solid ' + (timing === t ? 'var(--ink)' : 'var(--line)'),
              background: timing === t ? 'var(--ink)' : 'var(--paper)',
              color: timing === t ? 'var(--paper)' : 'var(--ink)',
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%', background: TIMING[t].color,
              }}/>
              {TIMING[t].label}
            </button>
          ))}
        </div>
      </div>

      {!hasQuery && (
        <>
          <Section title="최근 검색">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {recents.map(r => (
                <button key={r} onClick={() => setQ(r)} style={{
                  padding: '7px 12px', borderRadius: 999,
                  background: 'var(--paper)', border: '1px solid var(--line)',
                  color: 'var(--ink)', fontSize: 13, cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                }}>
                  <Icons.Clock size={13}/> {r}
                </button>
              ))}
            </div>
          </Section>
          <Section title="이번 주 급상승">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {trending.map((c, i) => (
                <button key={c.id} onClick={() => onOpen(c)} style={{
                  display: 'grid', gridTemplateColumns: '28px 1fr auto',
                  alignItems: 'center', gap: 12, padding: '12px 0',
                  border: 0, borderTop: i === 0 ? 'none' : '1px solid var(--line)',
                  background: 'transparent', cursor: 'pointer', textAlign: 'left',
                }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--mute)', fontVariantNumeric: 'tabular-nums' }}>{c.rank}</span>
                  <span style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{c.title}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--mute)' }}>
                      {CATEGORIES.find(x => x.id === c.category)?.label} · {c.delta}
                    </div>
                  </span>
                  <Sparkline data={c.trend} width={56} height={22}/>
                </button>
              ))}
            </div>
          </Section>
        </>
      )}

      {hasQuery && (
        <>
          <div style={{ padding: '4px 20px 12px', fontSize: 12.5, color: 'var(--mute)' }}>
            <b style={{ color: 'var(--ink)', fontWeight: 600 }}>{results.length}</b>건의 결과
          </div>
          {results.map(c => (
            <CardListItem key={c.id} card={c} bookmarked={bookmarks.has(c.id)}
              onBookmark={onBookmark} onOpen={() => onOpen(c)} style="info"/>
          ))}
          {results.length === 0 && (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--mute)', fontSize: 13.5 }}>
              결과가 없어요.<br/>다른 키워드로 시도해보세요.
            </div>
          )}
        </>
      )}
    </>
  );
};

// ────────────────────────────────────────────────────────────────
// BOOKMARKS / ME (simple)
// ────────────────────────────────────────────────────────────────
const Bookmarks = ({ bookmarks, onOpen, onBookmark, cardStyle }) => {
  const list = CARDS.filter(c => bookmarks.has(c.id));
  return (
    <>
      <UserHeader large sub="저장한 카드" title={`저장됨 ${list.length}장`}/>
      {list.length === 0 ? (
        <div style={{ padding: '60px 30px', textAlign: 'center', color: 'var(--mute)' }}>
          <div style={{
            width: 56, height: 56, margin: '0 auto 18px', borderRadius: '50%',
            background: 'var(--paper)', border: '1px solid var(--line)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icons.Bookmark size={22}/>
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>
            저장한 카드가 없어요
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.5 }}>
            마음에 드는 카드의 북마크 아이콘을<br/>탭해서 저장해보세요.
          </div>
        </div>
      ) : (
        list.map(c => (
          <CardListItem key={c.id} card={c} bookmarked
            onBookmark={onBookmark} onOpen={() => onOpen(c)} style={cardStyle}/>
        ))
      )}
    </>
  );
};

const Me = () => (
  <>
    <UserHeader large sub="설정 · 알림" title="나의 레이더"/>
    <div style={{ padding: '0 16px' }}>
      <div style={{
        padding: '18px 18px', background: 'var(--paper)',
        border: '1px solid var(--line)', borderRadius: 16, marginBottom: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{
            width: 46, height: 46, borderRadius: '50%',
            background: 'var(--ink)', color: 'var(--paper)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 700,
          }}>R</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>릴스맨</div>
            <div style={{ fontSize: 12, color: 'var(--mute)' }}>음식 · 디저트 · 베이커리</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[['41','읽은 카드'],['12','저장'],['3','만든 콘텐츠']].map(([n, l]) => (
            <div key={l} style={{
              padding: '10px 0', textAlign: 'center',
              border: '1px solid var(--line)', borderRadius: 10,
            }}>
              <div style={{ fontSize: 18, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{n}</div>
              <div style={{ fontSize: 11, color: 'var(--mute)' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      {[
        { label: '관심 카테고리', sub: '디저트 · 베이커리 · 편의점' },
        { label: '알림 시간', sub: '매일 오전 9:45' },
        { label: '카드 도착 알림', sub: '켜짐' },
        { label: '서비스 안내', sub: 'v0.1 베타' },
      ].map((r, i) => (
        <div key={r.label} style={{
          padding: '16px 18px', background: 'var(--paper)',
          border: '1px solid var(--line)',
          borderTop: i === 0 ? '1px solid var(--line)' : 'none',
          borderRadius: i === 0 ? '14px 14px 0 0' : i === 3 ? '0 0 14px 14px' : 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer',
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{r.label}</div>
            <div style={{ fontSize: 12, color: 'var(--mute)', marginTop: 2 }}>{r.sub}</div>
          </div>
          <Icons.ArrowRight size={16}/>
        </div>
      ))}
    </div>
  </>
);

// ────────────────────────────────────────────────────────────────
// Root
// ────────────────────────────────────────────────────────────────
const UserApp = ({ cardStyle = 'image', startScreen = 'home' }) => {
  const [bookmarks, setBookmarks] = useState(new Set(['mango','butter-tteok']));
  const [screen, setScreen]       = useState(startScreen); // 'onboarding'|'home'|'detail'|'search'|'bookmarks'|'me'
  const [tab, setTab]             = useState('home');
  const [selected, setSelected]   = useState(startScreen === 'detail' ? CARDS[0] : null);
  const [category, setCategory]   = useState('all');
  const [transition, setTransition] = useState(null); // 'forward'|'back'
  const scrollRef = useRef(null);

  const onBookmark = (id) => setBookmarks(b => {
    const n = new Set(b);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });
  const openDetail = (card) => {
    setSelected(card); setTransition('forward');
    setScreen('detail');
  };
  const closeDetail = () => {
    setTransition('back');
    setScreen(tab);
  };
  const goTab = (t) => {
    setTab(t);
    setScreen(t);
    setTransition('back');
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  // animate
  useEffect(() => {
    if (!transition) return;
    const t = setTimeout(() => setTransition(null), 260);
    return () => clearTimeout(t);
  }, [transition, screen]);

  const showTabs = !['onboarding','detail'].includes(screen);

  return (
    <AndroidDevice width={394} height={830}>
      <div ref={scrollRef} style={{
        flex: 1, overflowY: 'auto', overflowX: 'hidden',
        background: 'var(--bg)', display: 'flex', flexDirection: 'column',
        position: 'relative',
      }}>
        <div key={screen} style={{
          minHeight: '100%',
          animation: transition === 'forward'
            ? 'tr-slide-in .26s cubic-bezier(.2,.7,.2,1)'
            : transition === 'back'
              ? 'tr-fade-in .22s ease-out'
              : 'none',
        }}>
          {screen === 'onboarding' && <Onboarding onDone={() => { setScreen('home'); setTab('home'); }}/>}
          {screen === 'home' && (
            <Home bookmarks={bookmarks} onBookmark={onBookmark} onOpen={openDetail}
              onTab={goTab} category={category} setCategory={setCategory}
              cardStyle={cardStyle}/>
          )}
          {screen === 'detail' && selected && (
            <Detail card={selected} bookmarked={bookmarks.has(selected.id)}
              onBookmark={onBookmark} onBack={closeDetail}/>
          )}
          {screen === 'search' && (
            <Search onOpen={openDetail} bookmarks={bookmarks} onBookmark={onBookmark}/>
          )}
          {screen === 'bookmarks' && (
            <Bookmarks bookmarks={bookmarks} onOpen={openDetail} onBookmark={onBookmark}
              cardStyle={cardStyle}/>
          )}
          {screen === 'me' && <Me/>}
        </div>
        {showTabs && <BottomTabs tab={tab} onTab={goTab}/>}
      </div>
    </AndroidDevice>
  );
};

Object.assign(window, { UserApp });
