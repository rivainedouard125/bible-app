import { useState, useRef, useEffect, useCallback } from 'react';
import { useI18n } from '../hooks/i18nContext';

import { LOC, IMAGES, getJourneyStory } from '../data/journeyData';
import type { StoryChapter, VerseSegment } from '../data/journeyData';

// ─── Components ───────────────────────────────────────────────────────────

const ALL_LOCATIONS = Object.values(LOC);

function HolyLandMap({ activeChapter, story }: { activeChapter: StoryChapter, story: StoryChapter[] }) {
  const { t } = useI18n();
  const activeLoc = activeChapter.location;
  const currentIndex = story.findIndex(c => c.id === activeChapter.id);
  const pathPoints = story.slice(0, currentIndex + 1).map(c => `${c.location.x},${c.location.y}`).join(' ');

  return (
    <div className="js-map-outer">
      <div className="js-map-frame">
        <div className="js-map-container" style={{ backgroundImage: `url(${IMAGES.map})` }}>
          {/* Dynamic Age & Period Tracker */}
          <div className="map-journey-tracker">
            <span className="map-tracker-period">{activeChapter.period}</span>
            <span className="map-tracker-age">{activeChapter.age}</span>
          </div>

          <svg viewBox="0 0 100 105" className="js-map-svg">
            <polyline
              points={pathPoints}
              fill="none"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="0.6"
              strokeDasharray="1.5,1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {ALL_LOCATIONS.map((loc, i) => (
              <circle key={i} cx={loc.x} cy={loc.y} r="0.6" fill="rgba(255, 255, 255, 0.15)" />
            ))}
            <g className="js-map-marker active" transform={`translate(${activeLoc.x},${activeLoc.y})`}>
              <circle r="3.5" fill="rgba(var(--jesus-accent-rgb), 0.25)" className="map-pulse-ring" />
              <circle r="1" fill="var(--jesus-accent)" stroke="var(--surface-color)" strokeWidth="0.3" />
              <text y="-4" textAnchor="middle" fontSize="3.2" fontWeight="900" fill="#fff" className="js-map-text-glow">
                {(t as any)(activeLoc.name) || activeLoc.name}
              </text>
            </g>
            {story.map((ch) => (
              ch.id !== activeChapter.id && (
                <g
                  key={ch.id}
                  className="js-map-marker-inactive"
                  transform={`translate(${ch.location.x},${ch.location.y})`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    const el = document.getElementById(`chap-${ch.id}`);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  <circle r="1" fill="rgba(255, 255, 255, 0.6)" stroke="rgba(0,0,0,0.5)" strokeWidth="0.2" />
                </g>
              )
            ))}
          </svg>
        </div>
      </div>
      <div className="js-map-footer">
        <div className="js-map-footer-row">
          <span className="js-map-dot-indicator" />
          <span className="js-map-loc-name">{(t as any)(activeLoc.name) || activeLoc.name}</span>
        </div>
        <span className="js-map-modern">{t('modernDayText')} {(t as any)(activeLoc.modern) || activeLoc.modern}</span>
      </div>
    </div>
  );
}

function VerseQuote({ seg, onNav }: { seg: VerseSegment; onNav: (b: string, c: number) => void }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timer.current = setTimeout(() => setOpen(false), 300);
  };

  useEffect(() => {
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, []);

  return (
    <span 
      ref={ref} 
      className="js-verse-ref-container"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span className={`js-verse-tag ${open ? 'active' : ''}`} onClick={() => { if (timer.current) clearTimeout(timer.current); setOpen(!open); }}>
        {seg.label}
      </span>
      {open && (
        <div className="js-verse-card js-map-text-glow">
          <div className="js-verse-card-header">
            <span>{seg.reference}</span>
            <button className="js-verse-close" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="js-verse-card-body">
            <p className="js-verse-card-text">"{seg.text}"</p>
          </div>
          <button className="js-verse-card-btn" onClick={() => { onNav(seg.book, seg.chapter); setOpen(false); }}>
            {t('openChapterBible')}
          </button>
        </div>
      )}
    </span>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────

type Props = { onSelectPassage: (book: string, chapter: number) => void; onClose: () => void };

export default function JesusJourney({ onSelectPassage, onClose }: Props) {
  const { lang, t } = useI18n();
  const STORY = getJourneyStory(lang);

  const [activeId, setActiveId] = useState(STORY[0]?.id);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const chapRefs = useRef<Record<string, HTMLElement | null>>({});
  const contentRef = useRef<HTMLDivElement>(null);

  const activeIdx = STORY.findIndex(s => s.id === activeId);
  const activeChapter = STORY[activeIdx < 0 ? 0 : activeIdx];
  const progress = Math.round(((activeIdx + 1) / STORY.length) * 100);

  // Intersection Observer for Reveal Animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    STORY.forEach(ch => {
      const el = chapRefs.current[ch.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const onScroll = useCallback(() => {
    const offset = 250;
    let cur = STORY[0].id;
    for (const ch of STORY) {
      const el = chapRefs.current[ch.id];
      if (el && el.getBoundingClientRect().top < offset) cur = ch.id;
    }
    setActiveId(cur);
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    if (el) el.addEventListener('scroll', onScroll, { passive: true });
    return () => el?.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return (
    <div className="js-layout">
      {/* Mobile Top Bar */}
      <div className="js-mobile-nav">
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--jesus-accent)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div className="js-mob-title">CH {activeChapter.number}: {activeChapter.title}</div>
        <button className="js-mob-btn" onClick={() => setMobileNavOpen(true)}>NAV</button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileNavOpen && (
        <div className="js-mobile-overlay" onClick={() => setMobileNavOpen(false)}>
          <div className="js-mobile-drawer" onClick={e => e.stopPropagation()}>
            <div className="js-drawer-header">
              <span>{t('journeyNav')}</span>
              <button onClick={() => setMobileNavOpen(false)}>×</button>
            </div>
            <div className="js-drawer-map">
              <HolyLandMap activeChapter={activeChapter} story={STORY} />
            </div>
            <div className="js-drawer-list">
              {STORY.map((ch, idx) => (
                <button 
                  key={ch.id} 
                  className={`js-drawer-item ${ch.id === activeId ? 'active' : ''}`}
                  onClick={() => {
                    chapRefs.current[ch.id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setMobileNavOpen(false);
                  }}
                >
                  <span className="js-drawer-num">{idx + 1}</span>
                  <span className="js-drawer-label">{ch.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <aside className="js-aside">
        <div className="js-aside-top">
          <button className="js-btn-close" onClick={onClose}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            {t('backToBible').replace('← ', '')}
          </button>
          <div className="js-aside-brand">
            <span className="js-brand-tag">{t('timelineTitle')}</span>
            <h1 className="js-aside-title">{t('journeyOfChrist')}</h1>
          </div>
        </div>

        <HolyLandMap activeChapter={activeChapter} story={STORY} />

        <div className="js-scroll-nav">
          <nav className="js-nav-list">
            {STORY.map((ch, idx) => (
              <button
                key={ch.id}
                className={`js-nav-item ${ch.id === activeId ? 'active' : ''} ${idx < activeIdx ? 'visited' : ''}`}
                onClick={() => chapRefs.current[ch.id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              >
                <div className="js-nav-line" />
                <div className="js-nav-dot">{idx < activeIdx ? '✓' : ch.number}</div>
                <div className="js-nav-info">
                  <span className="js-nav-label">{ch.title}</span>
                  <span className="js-nav-meta">{(t as any)(ch.location.name) || ch.location.name}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="js-sidebar-status">
          <div className="js-status-label">{t('storyProgress')}</div>
          <div className="js-progress-track">
             <div className="js-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="js-status-val">{progress}% {t('fulfilled')}</div>
        </div>
      </aside>

      <main className="js-main" ref={contentRef}>
        <header className="js-hero">
          <div className="js-hero-topline">{t('bethlehemToResurrection')}</div>
          <h1 className="js-hero-title">{t('wordMadeFlesh').split(' ').slice(0, 2).join(' ')}<br/>{t('wordMadeFlesh').split(' ').slice(2).join(' ')}</h1>
          <p className="js-hero-desc">{t('immersiveJourney')}</p>
          <div className="js-hero-scroll-invite">{t('scrollToBegin')}</div>
        </header>

        {STORY.map((ch) => (
          <section id={`chap-${ch.id}`} key={ch.id} className="js-section" ref={el => { chapRefs.current[ch.id] = el; }}>
            <div className="js-chap-row">
              <div className="js-chap-text-side">
                <header className="js-chap-head">
                  <div className="js-chap-pre">{t('chapterTextUpercase')} {ch.number} • {ch.period}</div>
                  <h2 className="js-chap-title">{ch.title}</h2>
                </header>
                <div className="js-narrative">
                  <p className="js-narrative-intro">{ch.intro}</p>
                  
                  <div className="js-harmony">
                    {['Mt', 'Mk', 'Lk', 'Jn'].map(g => (
                      <span key={g} className={`js-harmony-chip ${ch.harmony.includes(g) ? 'active' : ''}`}>
                        {g}
                      </span>
                    ))}
                  </div>

                  <div className="js-narrative-main">
                    {ch.segments.map((s, i) => s.type === 'text' 
                      ? <span key={i}>{s.content}</span> 
                      : <VerseQuote key={i} seg={s} onNav={onSelectPassage} />)}
                  </div>

                  <div className="js-facts-box">
                    <span className="js-facts-title">{t('quickFacts')}</span>
                    {ch.quickFacts.map((f, i) => (
                      <div key={i} className="js-fact-item">
                        <span className="js-fact-label">{f.label}</span>
                        <span className="js-fact-value">{f.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="js-prophecy-mini">
                  <div className="js-prophecy-tag">{t('prophecyFulfilled')}</div>
                  <p>"{ch.prophecy.text}"</p>
                  <cite>{ch.prophecy.reference} → {ch.prophecy.fulfillment}</cite>
                </div>
              </div>
              <div className="js-chap-visual-side">
                <div className="js-art-frame">
                   <img src={ch.image} alt={ch.title} className="js-art-img" />
                   <div className="js-art-caption">
                     <span className="js-caption-loc">{(t as any)(ch.location.name) || ch.location.name}</span>
                     <span className="js-caption-modern">{t('modernDayText')} {(t as any)(ch.location.modern) || ch.location.modern}</span>
                   </div>
                </div>
              </div>
            </div>
            <div className="js-quote-break">
               <blockquote className="js-pullquote">
                 <p>{ch.pullQuote.text}</p>
                 <cite>— {ch.pullQuote.reference}</cite>
               </blockquote>
            </div>
            <div className="js-extra-row">
              <div className="js-extra-group">
                <span className="js-extra-label">{t('keyPeopleText')}</span>
                <div className="js-extra-chips">
                  {ch.keyPeople.map(p => <span key={p} className="js-extra-chip">{p}</span>)}
                </div>
              </div>
              <div className="js-extra-group">
                <span className="js-extra-label">{t('goDeeper')}</span>
                <button className="js-deeper-link" onClick={() => onSelectPassage(ch.deeper[0].book, ch.deeper[0].chapter)}>
                  {t('readAction')} {ch.deeper[0].book} {ch.deeper[0].chapter} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
            <div className="js-section-divider" />
          </section>
        ))}

        <footer className="js-final-footer">
          <div className="js-final-icon">✝</div>
          <h2>{t('heIsRisen')}</h2>
          <p>{t('journeyContinues')}</p>
          <button className="js-btn-restart" onClick={() => contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}>
            {t('restartJourney').toUpperCase()}
          </button>
        </footer>
      </main>
    </div>
  );
}

export function isJesusVerse(text: string): boolean {
  const lower = text.toLowerCase();
  const kw = ['jesus','christ','he said','he replied','he answered','i am ','i tell you','i have come','my father','son of man','truly i','follow me','believe in me','come to me'];
  return kw.some(k => lower.includes(k));
}
