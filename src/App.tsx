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

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
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
  const [isAiSidebarOpen, setIsAiSidebarOpen] = useState(false);
  const [aiChat, setAiChat] = useState<ChatMessage[]>([]);
  const [aiInput, setAiInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [llmModel, setLlmModel] = useState('mistral'); // default fallback
  const [availableModels, setAvailableModels] = useState<string[]>([]);

  const [tooltipPos, setTooltipPos] = useState<{ x: number, y: number } | null>(null);
  const [highlightedText, setHighlightedText] = useState('');

  // Features State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('bible_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

  const chatEndRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    // Try to discover which local Ollama model is available
    fetch('/api/ai/tags')
      .then(res => res.json())
      .then(data => {
        if (data.models && data.models.length > 0) {
          const models = data.models.map((m: any) => m.name);
          setAvailableModels(models);
          if (models.includes('mistral:latest')) setLlmModel('mistral:latest');
          else if (models.includes('mistral')) setLlmModel('mistral');
          else setLlmModel(models[0]);
        }
      })
      .catch(e => console.log('Ollama may not be running yet.', e));
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiChat]);

  // Handle text selection in Reading View
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0 && chapter) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setHighlightedText(selection.toString().trim());
        setTooltipPos({
          x: rect.left + rect.width / 2,
          y: rect.top + window.scrollY
        });
      } else {
        // We delay clearing the tooltip slightly to allow clicks on it
        setTimeout(() => {
          const s = window.getSelection();
          if (!s || s.toString().trim().length === 0) {
            setTooltipPos(null);
          }
        }, 100);
      }
    };
    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, [chapter]);

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
    setIsAiSidebarOpen(false);
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

  // AI Actions
  const openAskAI = () => {
    setIsAiSidebarOpen(true);
    setTooltipPos(null); // hide tooltip
    if (highlightedText && book && chapter) {
      const prompt = `Can you explain or give me context on this passage from ${book.name} ${chapter.chapter}:\n\n"${highlightedText}"`;
      setAiInput(prompt);
    }
  };

  const sendAiMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aiInput.trim() || isAiLoading) return;

    const userMsg = aiInput.trim();
    const newChat: ChatMessage[] = [...aiChat, { role: 'user', content: userMsg }];
    setAiChat(newChat);
    setAiInput('');
    setIsAiLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: llmModel,
          messages: [
            { role: 'system', content: 'You are a highly knowledgeable, helpful, and concise AI Bible Study Assistant. You help users understand scripture, historical context, and theology. Keep responses readable and brief.' },
            ...newChat
          ],
          stream: false
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setAiChat([...newChat, { role: 'assistant', content: data.message.content }]);
    } catch (err) {
      console.error(err);
      setAiChat([...newChat, { role: 'assistant', content: 'Oops! I could not connect to your local Ollama instance. Is it running on your Mac?' }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const Background = () => (
    <div className="bg-subtle-pattern"></div>
  );

  const ProgressBar = ({ percentage }: { percentage: number }) => (
    <div className="progress-bar-container">
      <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
    </div>
  );

  // Reusable Top Navigation Bar
  const renderNavBar = () => (
    <div className="nav-bar-glass">

      {/* LEFT: Title + Scripture Selector */}
      <div className="nav-left">
        <h3 className="nav-title" onClick={resetAll}>
          {t('appTitle')}
        </h3>
        <ScriptureSelector
          currentScriptureId={scriptureId}
          onSelect={(id) => {
            setScriptureId(id);
            // Reset reading position if switching texts
            setTestament(null);
            setBook(null);
            setChapter(null);
            setIsJesusReadingMode(false);
          }}
        />
      </div>

      {/* CENTER: Search */}
      <div className="nav-search">
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
        {/* Community */}
        <button
          className="glass-button community-btn-nav"
          onClick={() => setIsCommunityOpen(true)}
          title="Community Forum"
        >
          🌐 <span className="hide-mobile">Community</span>
        </button>
        {/* Settings Dropdown (Typography, Language, Theme) */}
        <div style={{ position: 'relative' }} className="typo-container">
          <button
            className="glass-button"
            style={{ width: '38px', height: '38px', padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', fontSize: '16px' }}
            onClick={() => setIsTypoOpen(!isTypoOpen)}
            title="Settings"
          >
            ⚙️
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
                  {isDarkMode ? '☀️' : '🌙'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Avatar / Profile */}
        {(() => {
          const religionSymbol: Record<string, string> = { Christianity: '✝', Islam: '☪', Judaism: '✡', Other: '☮' };
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
                  <span style={{ fontSize: '16px' }}>👤</span>
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
    const flagEmoji = 
      scriptureConfig.language === 'English' ? '🇬🇧' : 
      scriptureConfig.language === 'Français' ? '🇫🇷' : 
      scriptureConfig.language === 'Español' ? '🇪🇸' : 
      scriptureConfig.language === 'Deutsch' ? '🇩🇪' : '📖';

    return (
      <div className="home-page">
        {/* Hero */}
        <section className="home-hero">
          <div className="home-hero-tag">{scriptureConfig.name} {flagEmoji}</div>
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
            <span className="jesus-btn-cross">✝</span>
            <div className="jesus-btn-title">{t('jesusJourneyTitle')}</div>
            <div className="jesus-btn-subtitle">{t('jesusJourneySub')}</div>
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
                <p className="testament-card-range">{scriptureConfig.name} {flagEmoji}</p>
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
                  <p className="testament-card-range">{scriptureConfig.name} {flagEmoji}</p>
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
          <button className="home-action-card" onClick={() => setIsAiSidebarOpen(true)}>
            <div>
              <h3 className="home-action-title">{t('aiStudyTitle')}</h3>
              <p className="home-action-sub">{t('aiStudySub')}</p>
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
      <div className="app-main">
        <button className="back-button" onClick={() => setTestament(null)}>
          {t('backToTestaments')}
        </button>
        <h1>{testament === 'Old Testament' ? t('oldTestament') : t('newTestament')}</h1>
        {books.length === 0 ? (
          <div className="empty-state">{t('emptyTestament')}</div>
        ) : (
          <div className="grid-cards">
            {books.map((b) => {
              const { percentage, isComplete } = getBookProgressInfo(b);
              return (
                <button
                  key={b.name}
                  className={`glass-button book-card ${isComplete ? 'completed' : ''}`}
                  onClick={() => handleBookSelect(b)}
                >
                  <div className="book-card-header">
                    <span>{b.name}</span>
                    {isComplete && <CheckIcon className="check-icon" />}
                  </div>
                  <div className="book-progress-wrapper" onClick={(e) => e.stopPropagation()}>
                    <ProgressBar percentage={percentage} />
                  </div>
                </button>
              );
            })}
          </div>
        )}
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

        {/* Highlight Tooltip */}
        {tooltipPos && (
          <div
            className="ai-tooltip"
            style={{ left: tooltipPos.x, top: tooltipPos.y - 45 }}
            onClick={(e) => { e.stopPropagation(); openAskAI(); }}
          >
            ✨ Ask AI
          </div>
        )}
      </div>
    );
  };

  const renderAiSidebar = () => {
    return (
      <div className={`ai-sidebar ${isAiSidebarOpen ? 'open' : ''}`}>
        <div className="ai-sidebar-header">
          <span>✨ {t('studyAssistant')}</span>
          <button className="ai-close-btn" onClick={() => setIsAiSidebarOpen(false)}>×</button>
        </div>

        <div style={{ padding: '0.75rem 1.5rem', background: 'var(--border-subtle)', borderBottom: '1px solid var(--border-strong)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>{t('model')}:</span>
          {availableModels.length > 0 ? (
            <select
              value={llmModel}
              onChange={e => setLlmModel(e.target.value)}
              style={{ background: 'transparent', border: 'none', fontWeight: 600, color: 'var(--text-primary)', outline: 'none', cursor: 'pointer' }}
            >
              {availableModels.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          ) : (
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{llmModel}</span>
          )}
        </div>

        <div className="ai-chat-area">
          {aiChat.length === 0 && (
            <div style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '2rem' }}>
              {t('aiInitialPrompt')}
              {availableModels.length === 0 && (
                <div style={{ marginTop: '1rem', color: '#ef4444', fontSize: '0.85rem' }}>
                  {t('ollamaNotDetected')}
                </div>
              )}
            </div>
          )}
          {aiChat.map((msg, idx) => (
            <div key={idx} className={`ai-bubble ${msg.role}`}>
              {msg.content}
            </div>
          ))}
          {isAiLoading && (
            <div className={`ai-bubble ai`}>
              <span style={{ opacity: 0.5 }}>Thinking...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <form className="ai-input-area" onSubmit={sendAiMessage}>
          <input
            type="text"
            className="ai-input"
            placeholder={t('aiPlaceholder')}
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            disabled={isAiLoading}
          />
          <button type="submit" className="ai-send-btn" disabled={!aiInput.trim() || isAiLoading}>
            Send
          </button>
        </form>
      </div>
    );
  };

  if (isQuizOpen) {
    return <Quiz llmModel={llmModel} onClose={() => setIsQuizOpen(false)} />;
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
        {renderAiSidebar()}
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
      {renderAiSidebar()}
    </>
  );
}

export default App;
