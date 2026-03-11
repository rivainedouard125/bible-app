import { useState, useEffect, useMemo, useRef } from 'react';
import bibleDataEn from './data/bible.json';
import bibleDataFr from './data/bible-fr.json';
import bibleDataEs from './data/bible-es.json';
import bibleDataDe from './data/bible-de.json';
import { useI18n } from './hooks/i18nContext';
import { LanguageSelector } from './components/LanguageSelector';
import { ScriptureSelector } from './components/ScriptureSelector';
import { SCRIPTURES } from './types/scripture';
import Quiz from './components/Quiz';
import JesusJourney, { isJesusVerse } from './components/JesusJourney';
import { Timeline } from './components/timeline/Timeline';
import { useAuth } from './contexts/AuthContext';
import { Auth } from './components/Auth';
import { ProfileSetup } from './components/ProfileSetup';
import { UserProfile } from './components/UserProfile';
import { CommunityPage } from './components/CommunityPage';
import { Glossary } from './components/Glossary';
import { supabase } from './supabaseClient';
import './index.css';

// Type definitions based on our parsed JSON
type Verse = {
  verse: number;
  text: string;
};

type Chapter = {
  chapter: number;
  verses: Verse[];
};

type Book = {
  name: string;
  chapters: Chapter[];
};

type BibleData = {
  "Old Testament": Book[];
  "New Testament": Book[];
};


const BIBLES: Record<string, BibleData> = {
  en: bibleDataEn as unknown as BibleData,
  fr: bibleDataFr as unknown as BibleData,
  es: bibleDataEs as unknown as BibleData,
  de: bibleDataDe as unknown as BibleData,
};

// Icon component for a checkmark
const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width="16" height="16">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const SettingsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const SunIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const HomeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

function App() {
  const { lang, t } = useI18n();
  
  // Track scripture selection independently of UI language
  const [scriptureId, setScriptureId] = useState<string>(() => {
    return localStorage.getItem('bible_scripture_id') || `bible-${lang}`;
  });

  useEffect(() => {
    localStorage.setItem('bible_scripture_id', scriptureId);
  }, [scriptureId]);

  // Derive the active Bible data based on the selected scripture options
  const BIBLE = useMemo(() => {
    const scriptureConfig = SCRIPTURES.find(s => s.id === scriptureId) || SCRIPTURES[0];
    const sourceData = BIBLES[scriptureConfig.sourceDataId] || BIBLES.en;

    if (scriptureConfig.type === 'torah') {
      // Torah is only the first 5 books of the Old Testament
      return {
        "Old Testament": sourceData["Old Testament"].slice(0, 5),
        "New Testament": []
      };
    }
    
    return sourceData;
  }, [scriptureId]);

  const { session, profile, user } = useAuth();

  const [testament, setTestament] = useState<"Old Testament" | "New Testament" | null>(null);
  const [book, setBook] = useState<Book | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isJesusJourneyOpen, setIsJesusJourneyOpen] = useState(false);
  const [isJesusReadingMode, setIsJesusReadingMode] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  // Progress Tracking State
  const [readChapters, setReadChapters] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('bible_progress');
    return saved ? JSON.parse(saved) : {};
  });

  // AI State

  // Features State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('bible_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  const [isTypoOpen, setIsTypoOpen] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ book: string, chapter: number, verse: number, text: string }[]>([]);

  // Typography State
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('bible_font_size');
    return saved ? parseFloat(saved) : 1.125;
  });
  const [lineHeight, setLineHeight] = useState(() => {
    const saved = localStorage.getItem('bible_line_height');
    return saved ? parseFloat(saved) : 1.8;
  });

  const verseRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Sync readChapters FROM Supabase when user logs in
  useEffect(() => {
    if (!user) return;
    supabase
      .from('profiles')
      .select('read_chapters')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        if (data?.read_chapters && typeof data.read_chapters === 'object') {
          // Merge Supabase data on top of localStorage (Supabase wins)
          setReadChapters(prev => ({ ...prev, ...data.read_chapters }));
        }
      });
  }, [user]);

  // Auto-save readChapters TO Supabase (debounced 2s so we don't spam on every click)
  useEffect(() => {
    localStorage.setItem('bible_progress', JSON.stringify(readChapters));
    if (!user) return;
    const timer = setTimeout(() => {
      supabase
        .from('profiles')
        .update({ read_chapters: readChapters })
        .eq('id', user.id);
    }, 2000);
    return () => clearTimeout(timer);
  }, [readChapters, user]);

  useEffect(() => {
    localStorage.setItem('bible_font_size', fontSize.toString());
    document.documentElement.style.setProperty('--reading-font-size', `${fontSize}rem`);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('bible_line_height', lineHeight.toString());
    document.documentElement.style.setProperty('--reading-line-height', lineHeight.toString());
  }, [lineHeight]);



  // Compute global progress
  const { totalChapters, readChaptersCount } = useMemo(() => {
    let total = 0;
    let readCount = 0;
    ['Old Testament', 'New Testament'].forEach(t => {
      BIBLE[t as keyof BibleData].forEach(b => {
        b.chapters.forEach(c => {
          total++;
          if (readChapters[`${b.name}-${c.chapter}`]) readCount++;
        });
      });
    });
    return { totalChapters: total, readChaptersCount: readCount };
  }, [readChapters]);

  const globalProgress = (readChaptersCount / totalChapters) * 100;

  // Theme Effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('bible_theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('bible_theme', 'light');
    }
  }, [isDarkMode]);

  // Search Logic
  useEffect(() => {
    if (searchQuery.length < 3) {
      setSearchResults([]);
      return;
    }

    const results: { book: string, chapter: number, verse: number, text: string }[] = [];
    const lowerQuery = searchQuery.toLowerCase();

    for (const testament of ["Old Testament", "New Testament"] as const) {
      for (const book of BIBLE[testament]) {
        for (const chapter of book.chapters) {
          for (const verse of chapter.verses) {
            if (verse.text.toLowerCase().includes(lowerQuery)) {
              results.push({
                book: book.name,
                chapter: chapter.chapter,
                verse: verse.verse,
                text: verse.text
              });
              if (results.length > 50) break;
            }
          }
          if (results.length > 50) break;
        }
        if (results.length > 50) break;
      }
    }
    setSearchResults(results);
  }, [searchQuery]);

  // Outside click handler for search & typography
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.nav-search')) {
        setIsSearchOpen(false);
      }
      if (!target.closest('.typo-container')) {
        setIsTypoOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const getBookProgressInfo = (b: Book) => {
    const totalCount = b.chapters.length;
    const readCount = b.chapters.filter(c => readChapters[`${b.name}-${c.chapter}`]).length;
    return { percentage: (readCount / totalCount) * 100, isComplete: readCount === totalCount };
  };

  const markChapterAsRead = (b: Book, c: Chapter) => {
    setReadChapters(prev => ({ ...prev, [`${b.name}-${c.chapter}`]: true }));
  };

  const resetAll = () => {
    setTestament(null);
    setBook(null);
    setChapter(null);

    setIsJesusJourneyOpen(false);
    setIsJesusReadingMode(false);
    setIsUserProfileOpen(false);
    setIsCommunityOpen(false);
    setIsGlossaryOpen(false);
    setIsTimelineOpen(false);
  };

  const handleBookSelect = (selectedBook: Book) => {
    setBook(selectedBook);
    setChapter(null);
  };



  const Background = () => (
    <div className="bg-subtle-pattern"></div>
  );



  // Reusable Top Navigation Bar
  const renderNavBar = () => (
    <div className="nav-bar-glass">

      {/* LEFT: Title + Home */}
      <div className="nav-left">
        <button 
          className={`glass-button ${(!isTimelineOpen && !isGlossaryOpen && !isQuizOpen && !isCommunityOpen && !isJesusJourneyOpen && !isUserProfileOpen) ? 'active' : ''}`}
          style={{ width: '42px', height: '42px', borderRadius: '50%', padding: 0 }}
          onClick={resetAll}
          title="Home"
        >
          <HomeIcon />
        </button>
        <div className="nav-scripture-wrap">
          <ScriptureSelector
            currentScriptureId={scriptureId}
            onSelect={(id) => {
              setScriptureId(id);
              setTestament(null);
              setBook(null);
              setChapter(null);
              setIsJesusReadingMode(false);
            }}
          />
        </div>
      </div>

      {/* CENTER: Navigation Tabs */}
      <div className="nav-links hide-mobile">
        <button 
          className={`nav-link ${(!isTimelineOpen && !isGlossaryOpen && !isQuizOpen && !isJesusJourneyOpen) ? 'active' : ''}`}
          onClick={resetAll}
        >
          Bible
        </button>
        <button 
          className={`nav-link ${isTimelineOpen ? 'active' : ''}`}
          onClick={() => { resetAll(); setIsTimelineOpen(true); }}
        >
          Timeline
        </button>
        <button 
          className={`nav-link ${isGlossaryOpen ? 'active' : ''}`}
          onClick={() => { resetAll(); setIsGlossaryOpen(true); }}
        >
          Characters
        </button>
        <button 
          className={`nav-link ${isQuizOpen ? 'active' : ''}`}
          onClick={() => { resetAll(); setIsQuizOpen(true); }}
        >
          Quiz
        </button>
      </div>

      {/* CENTER: Search */}
      <div className={`nav-search ${isMobileSearchVisible ? 'mobile-visible' : ''}`}>
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          className="search-input"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsSearchOpen(true);
          }}
          onFocus={() => setIsSearchOpen(true)}
        />
        <button 
          className="mobile-search-close"
          onClick={() => setIsMobileSearchVisible(false)}
        >
          ✕
        </button>
        {isSearchOpen && searchResults.length > 0 && (
          <div className="glass-container" style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', width: '380px', maxHeight: '380px', overflowY: 'auto', marginTop: '0.5rem', padding: '0.5rem', zIndex: 200, boxShadow: 'var(--shadow-glow)' }}>
            {searchResults.map((res, i) => (
              <div
                key={i}
                style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer', borderRadius: '8px' }}
                onClick={() => {
                  setTestament(BIBLE["Old Testament"].find(b => b.name === res.book) ? "Old Testament" : "New Testament");
                  const foundBook = BIBLE["Old Testament"].find(b => b.name === res.book) || BIBLE["New Testament"].find(b => b.name === res.book);
                  if (foundBook) {
                    setBook(foundBook);
                    const foundChapter = foundBook.chapters.find(c => c.chapter === res.chapter);
                    if (foundChapter) {
                      setChapter(foundChapter);
                      setTimeout(() => {
                        const verseKey = `${res.book}-${res.chapter}-${res.verse}`;
                        verseRefs.current[verseKey]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        const el = verseRefs.current[verseKey];
                        if (el) {
                          el.style.backgroundColor = 'rgba(234, 179, 8, 0.2)';
                          setTimeout(() => { el.style.backgroundColor = 'transparent'; }, 2000);
                        }
                      }, 100);
                    }
                  }
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--border-subtle)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '0.25rem' }}>
                  {res.book} {res.chapter}:{res.verse}
                </div>
                <div style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
                  {(() => {
                    const parts = res.text.split(new RegExp(`(${searchQuery})`, 'gi'));
                    return <span>{parts.map((part, i) => part.toLowerCase() === searchQuery.toLowerCase() ? <mark key={i} className="search-highlight">{part}</mark> : part)}</span>;
                  })()}
                </div>
              </div>
            ))}
          </div>
        )}
        {isSearchOpen && searchQuery.length >= 3 && searchResults.length === 0 && (
          <div className="glass-container" style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', width: '260px', marginTop: '0.5rem', padding: '1rem', zIndex: 200, textAlign: 'center', color: 'var(--text-secondary)' }}>
            {t('noResults')}
          </div>
        )}
      </div>

      {/* RIGHT: Controls */}
      <div className="nav-right">
        {/* Mobile Search Toggle */}
        <button
          className="glass-button show-mobile search-toggle-btn"
          style={{ width: '38px', height: '38px', borderRadius: '50%', padding: 0 }}
          onClick={() => setIsMobileSearchVisible(true)}
          title="Search"
        >
          <SearchIcon />
        </button>

        {/* Community */}
        <button
          className="glass-button community-btn-nav"
          style={{ height: '38px', borderRadius: '20px' }}
          onClick={() => setIsCommunityOpen(true)}
          title="Community Forum"
        >
          <GlobeIcon />
          <span className="hide-mobile">Community</span>
        </button>
        {/* Settings Dropdown (Typography, Language, Theme) */}
        <div style={{ position: 'relative' }} className="typo-container">
          <button
            className="glass-button"
            style={{ width: '38px', height: '38px', padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%' }}
            onClick={() => setIsTypoOpen(!isTypoOpen)}
            title="Settings"
          >
            <SettingsIcon />
          </button>
          {isTypoOpen && (
            <div className="typo-popover" style={{ width: '260px' }}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="typo-label">{t('language')}</span>
                </div>
                <LanguageSelector />
              </div>
              
              <div className="typo-control-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="typo-label">{t('fontSize')}</span>
                  <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{Math.round(fontSize * 16)}px</span>
                </div>
                <input type="range" className="typo-slider" min="0.8" max="2" step="0.05" value={fontSize} onChange={(e) => setFontSize(parseFloat(e.target.value))} />
              </div>
              
              <div className="typo-control-group" style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="typo-label">{t('lineHeight')}</span>
                  <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{lineHeight}</span>
                </div>
                <input type="range" className="typo-slider" min="1.2" max="2.5" step="0.1" value={lineHeight} onChange={(e) => setLineHeight(parseFloat(e.target.value))} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="typo-label">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
                <button
                  className="glass-button"
                  style={{ width: '32px', height: '32px', padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%' }}
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  title="Toggle Theme"
                >
                  {isDarkMode ? <SunIcon /> : <MoonIcon />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Avatar / Profile */}
        {(() => {
          const religionSymbol: Record<string, React.ReactNode> = { 
            Christianity: <span style={{ fontSize: '10px' }}>✝</span>, 
            Islam: <span style={{ fontSize: '10px' }}>☪</span>, 
            Judaism: <span style={{ fontSize: '10px' }}>✡</span>, 
            Other: <span style={{ fontSize: '10px' }}>☮</span> 
          };
          return (
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <button
                className="glass-button profile-btn-nav"
                onClick={() => setIsUserProfileOpen(true)}
                title="My Profile"
              >
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <UserIcon />
                )}
              </button>
              {profile?.religion && (
                <div style={{
                  position: 'absolute',
                  bottom: '0px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(99,102,241,0.88)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: '20px',
                  padding: '0px 5px',
                  fontSize: '9px',
                  fontWeight: 700,
                  color: '#fff',
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                  zIndex: 10,
                }}>
                  {religionSymbol[profile.religion] || '☮'}
                </div>
              )}
            </div>
          );
        })()}
      </div>

    </div>
  );


  const renderHome = () => {
    const otChapters = BIBLE['Old Testament'].reduce((s, b) => s + b.chapters.length, 0);
    const ntChapters = BIBLE['New Testament']?.reduce((s, b) => s + b.chapters.length, 0) || 0;
    const otRead = BIBLE['Old Testament'].reduce(
      (s, b) => s + b.chapters.filter(c => readChapters[`${b.name}-${c.chapter}`]).length, 0
    );
    const ntRead = BIBLE['New Testament']?.reduce(
      (s, b) => s + b.chapters.filter(c => readChapters[`${b.name}-${c.chapter}`]).length, 0
    ) || 0;

    const scriptureConfig = SCRIPTURES.find(s => s.id === scriptureId) || SCRIPTURES[0];
    const flagCode = 
      scriptureConfig.language === 'English' ? 'gb' : 
      scriptureConfig.language === 'Français' ? 'fr' : 
      scriptureConfig.language === 'Español' ? 'es' : 
      scriptureConfig.language === 'Deutsch' ? 'de' : null;

    return (
      <div className="home-page">
        {/* Hero */}
        <section className="home-hero">
          <div className="home-hero-tag">
            {flagCode && <img src={`https://flagcdn.com/w40/${flagCode}.png`} className="flag-icon" style={{ marginRight: '8px' }} alt="" />}
            {scriptureConfig.name}
          </div>
          <h1 className="home-hero-title">{t('appTitle')}</h1>
          <p className="home-hero-sub">{t('exploreScripture')}</p>
          <div className="home-progress-wrap">
            <div className="home-progress-label">
              <span>{t('readingProgressText')}</span>
              <span className="home-progress-pct">{Math.round(globalProgress)}%</span>
            </div>
            <div className="home-progress-track">
              <div className="home-progress-fill" style={{ width: `${globalProgress}%` }} />
            </div>
            <div className="home-progress-caption">{readChaptersCount} {t('ofText')} {totalChapters} {t('chaptersRead')}</div>
          </div>
        </section>

        {/* Jesus Journey */}
        <section className="home-section">
          <button className="jesus-journey-btn" style={{ maxWidth: '100%' }} onClick={() => setIsJesusJourneyOpen(true)}>
            <div className="jesus-btn-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L12 22M7 7L17 7"></path>
              </svg>
            </div>
            <div className="jesus-btn-info">
              <div className="jesus-btn-title">{t('jesusJourneyTitle')}</div>
              <div className="jesus-btn-subtitle">{t('jesusJourneySub')}</div>
            </div>
          </button>
        </section>

        {/* Testaments */}
        <section className="home-section">
          <div className="home-section-header">
            <h2 className="home-section-title">{t('browseBible')}</h2>
          </div>
          <div className="home-testament-grid">
            <button className="home-testament-card" onClick={() => setTestament('Old Testament')}>
              <div>
                <h3 className="testament-card-name">{scriptureConfig.type === 'torah' ? 'Torah' : t('oldTestament')}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                   {flagCode && <img src={`https://flagcdn.com/w40/${flagCode}.png`} className="flag-icon" alt="" />}
                   {scriptureConfig.name}
                </div>
              </div>
              <div className="testament-card-stats">
                <div className="testament-stat">
                  <span className="stat-num">{BIBLE['Old Testament'].length}</span>
                  <span className="stat-lbl">{t('books')}</span>
                </div>
                <div className="testament-stat">
                  <span className="stat-num">{otChapters}</span>
                  <span className="stat-lbl">{t('chapters')}</span>
                </div>
                <div className="testament-stat">
                  <span className="stat-num">{otRead}</span>
                  <span className="stat-lbl">{t('read')}</span>
                </div>
              </div>
              <div className="testament-card-progress-track">
                <div className="testament-card-progress-fill" style={{ width: `${otChapters > 0 ? (otRead / otChapters) * 100 : 0}%` }} />
              </div>
            </button>
            {BIBLE['New Testament'] && BIBLE['New Testament'].length > 0 && (
              <button className="home-testament-card" onClick={() => setTestament('New Testament')}>
                <div>
                  <h3 className="testament-card-name">{t('newTestament')}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    {flagCode && <img src={`https://flagcdn.com/w40/${flagCode}.png`} className="flag-icon" alt="" />}
                    {scriptureConfig.name}
                  </div>
                </div>
                <div className="testament-card-stats">
                  <div className="testament-stat">
                    <span className="stat-num">{BIBLE['New Testament'].length}</span>
                    <span className="stat-lbl">{t('books')}</span>
                  </div>
                  <div className="testament-stat">
                    <span className="stat-num">{ntChapters}</span>
                    <span className="stat-lbl">{t('chapters')}</span>
                  </div>
                  <div className="testament-stat">
                    <span className="stat-num">{ntRead}</span>
                    <span className="stat-lbl">{t('read')}</span>
                  </div>
                </div>
                <div className="testament-card-progress-track">
                  <div className="testament-card-progress-fill" style={{ width: `${ntChapters > 0 ? (ntRead / ntChapters) * 100 : 0}%` }} />
                </div>
              </button>
            )}
          </div>
        </section>

        {/* Actions */}
        <section className="home-section home-actions">
          <button className="home-action-card" onClick={() => setIsTimelineOpen(true)} style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <div>
              <h3 className="home-action-title">{t('timelinePageTitle')}</h3>
              <p className="home-action-sub">{t('timelineExploreMsg')}</p>
            </div>
            <span className="home-action-arrow">→</span>
          </button>
          <button className="home-action-card" onClick={() => setIsQuizOpen(true)}>
            <div>
              <h3 className="home-action-title">{t('aiQuizTitle')}</h3>
              <p className="home-action-sub">{t('aiQuizSub')}</p>
            </div>
            <span className="home-action-arrow">→</span>
          </button>

          <button className="home-action-card" onClick={() => setIsGlossaryOpen(true)}>
            <div>
              <h3 className="home-action-title">{t('glossaryEntryTitle' as any)}</h3>
              <p className="home-action-sub">{t('glossaryEntrySub' as any)}</p>
            </div>
            <span className="home-action-arrow">→</span>
          </button>
        </section>
      </div>
    );
  };


  const renderBooks = () => {
    if (!testament) return null;
    const books = BIBLE[testament];

    return (
      <div className="books-page animate-in">
        <div className="books-header">
           <button className="glass-button back-btn-round" onClick={() => setTestament(null)}>
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
               <line x1="19" y1="12" x2="5" y2="12"></line>
               <polyline points="12 19 5 12 12 5"></polyline>
             </svg>
           </button>
           <h2 className="section-title">{testament === 'Old Testament' ? t('oldTestament') : t('newTestament')}</h2>
        </div>

        <div className="grid-cards">
          {books.length === 0 ? (
            <div className="empty-state">{t('emptyTestament')}</div>
          ) : (
            books.map((b) => {
              const { percentage, isComplete } = getBookProgressInfo(b);
              return (
                <div key={b.name} className="book-card" onClick={() => handleBookSelect(b)}>
                  <div className="book-card-info">
                    <h3 className="book-name">{b.name}</h3>
                    <div className="book-card-meta">
                      <span>{b.chapters.length} {t('chapters')}</span>
                      {percentage > 0 && <span className="book-progress-percent">{Math.round(percentage)}%</span>}
                    </div>
                  </div>
                  {isComplete && <CheckIcon className="check-icon" />}
                  {percentage > 0 && (
                    <div className="book-card-progress-mini">
                      <div className="book-card-progress-inner" style={{ width: `${percentage}%` }} />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  const renderChapters = () => {
    if (!book) return null;

    return (
      <div className="app-main">
        <button className="back-button" onClick={() => setBook(null)}>
          {t('backToBooks')}
        </button>
        <h1>{book.name}</h1>
        <div className="grid-chapters">
          {book.chapters.map((c) => {
            const isRead = readChapters[`${book.name}-${c.chapter}`];
            return (
              <button
                key={c.chapter}
                className={`glass-button chapter-btn ${isRead ? 'completed' : ''}`}
                onClick={() => setChapter(c)}
              >
                {c.chapter}
                {isRead && <CheckIcon className="chapter-check" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderReadingView = () => {
    if (!book || !chapter) return null;

    const isRead = readChapters[`${book.name}-${chapter.chapter}`];

    return (
      <div className="app-main">
        <button className="back-button" onClick={() => setChapter(null)}>
          {t('backToChapters')}
        </button>
        <div className="glass-container reading-view">
          <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '2.5rem' }}>
            {book.name} {chapter.chapter}
          </h2>
          <div>
            {chapter.verses.map((v, i) => {
              const verseKey = `${book.name}-${chapter.chapter}-${v.verse}`;
              const isJesus = isJesusReadingMode && isJesusVerse(v.text);
              return (
                <div
                  key={i}
                  className={`verse-block ${isJesus ? 'jesus-verse' : ''}`}
                  ref={el => { verseRefs.current[verseKey] = el; }}
                  style={{ transition: 'background-color 1s ease' }}
                >
                  <span className="verse-number">{v.verse}</span>
                  <span className="verse-text">{v.text}</span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
            <button
              className={`glass-button ${isRead ? 'primary-button' : ''}`}
              style={{ borderRadius: '24px', padding: '0.75rem 2rem' }}
              onClick={() => setReadChapters(prev => ({ ...prev, [`${book.name}-${chapter.chapter}`]: !isRead }))}
            >
              {isRead ? `✓ ${t('read')}` : t('markAsRead')}
            </button>
          </div>

          <div className="reading-nav">
            <button
              className="glass-button"
              disabled={chapter.chapter === 1}
              onClick={() => {
                const prev = book.chapters.find(c => c.chapter === chapter.chapter - 1);
                if (prev) { setChapter(prev); window.scrollTo({ top: 0, behavior: 'smooth' }); }
              }}
              style={{ opacity: chapter.chapter === 1 ? 0.5 : 1 }}
            >
              ← {t('chapterText')} {chapter.chapter - 1}
            </button>
            <button
              className="glass-button"
              disabled={chapter.chapter === book.chapters.length}
              onClick={() => {
                markChapterAsRead(book, chapter); // Automatically mark as read when pressing next
                const next = book.chapters.find(c => c.chapter === chapter.chapter + 1);
                if (next) { setChapter(next); window.scrollTo({ top: 0, behavior: 'smooth' }); }
                else { setChapter(null); } // Go back if last chapter
              }}
              style={{ opacity: chapter.chapter === book.chapters.length ? 0.5 : 1 }}
            >
              {chapter.chapter === book.chapters.length ? t('backToChapters') : `${t('chapterText')} ${chapter.chapter + 1} →`}
            </button>
          </div>
        </div>


      </div>
    );
  };



  if (isQuizOpen) {
    return <Quiz onClose={() => setIsQuizOpen(false)} />;
  }

  if (isCommunityOpen) {
    return (
      <>
        <Background />
        <CommunityPage onBack={() => setIsCommunityOpen(false)} />
      </>
    );
  }

  if (isGlossaryOpen) {
    return (
      <>
        <Background />
        <Glossary onClose={() => setIsGlossaryOpen(false)} />
      </>
    );
  }

  if (isUserProfileOpen) {
    return (
      <>
        <Background />
        <UserProfile onBack={() => setIsUserProfileOpen(false)} />
      </>
    );
  }

  if (isJesusJourneyOpen && !chapter) {
    return (
      <>
        <Background />
        {renderNavBar()}
        <JesusJourney
          onSelectPassage={(bookName, chapterNum) => {
            // Find the book across testaments
            const allBooks = [...BIBLE['Old Testament'], ...BIBLE['New Testament']];
            const foundBook = allBooks.find(b => b.name === bookName);
            if (foundBook) {
              setBook(foundBook);
              const foundChapter = foundBook.chapters.find(c => c.chapter === chapterNum);
              if (foundChapter) {
                setChapter(foundChapter);
                setIsJesusReadingMode(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }
          }}
          onClose={() => setIsJesusJourneyOpen(false)}
        />
      </>
    );
  }

  if (isTimelineOpen) {
    return (
      <>
        <Background />
        <Timeline 
          onClose={() => setIsTimelineOpen(false)}
          onReadPassage={(bookName, chapterNum) => {
            const allBooks = [...BIBLE['Old Testament'], ...(BIBLE['New Testament'] || [])];
            const foundBook = allBooks.find(b => b.name === bookName);
            if (foundBook) {
              setBook(foundBook);
              const foundChapter = foundBook.chapters.find(c => c.chapter === chapterNum);
              if (foundChapter) {
                setChapter(foundChapter);
                setIsTimelineOpen(false);
                setIsJesusReadingMode(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }
          }}
        />
      </>
    );
  }

  // No session = show login
  if (!session) return <Auth />;

  // Has session but no profile yet = first-time setup
  if (session && !profile) return <ProfileSetup />;

  return (
    <>
      <Background />
      {renderNavBar()}

      {!testament && renderHome()}
      {testament && !book && renderBooks()}
      {book && !chapter && renderChapters()}
      {chapter && renderReadingView()}

      {/* Universal Components */}
    </>
  );
}

export default App;
