import { useState } from 'react';
import type { EventCategory } from '../../data/timelineEvents';
import { TIMELINE_EVENTS } from '../../data/timelineEvents';
import { useI18n } from '../../hooks/i18nContext';
import { motion } from 'framer-motion';
import './Timeline.css';

export const Timeline = ({ onClose, onReadPassage }: { onClose: () => void, onReadPassage: (bookName: string, chapterNum: number) => void }) => {
  const { t } = useI18n();
  const [activeFilter, setActiveFilter] = useState<EventCategory | 'all'>('all');

  const getTranslatedCategory = (cat: string) => {
    const key = `timeline${cat.charAt(0).toUpperCase() + cat.slice(1)}` as any;
    return t(key) || cat;
  };

  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'jesus': return '#eab308'; // yellow
      case 'covenant': return '#a855f7'; // purple
      case 'miracle': return '#3b82f6'; // blue
      case 'battle': return '#ef4444'; // red
      case 'prophecy': return '#10b981'; // green
      case 'creation': return '#f59e0b'; // amber
      default: return '#8b5cf6'; // generic purple
    }
  };

  const formatDisplayDate = (dateStr: string) => {
    if (dateStr === 'Beginning of Time') return t('beginningOfTime' as any) as string || dateStr;
    let res = dateStr;
    if (res.startsWith('c. ')) {
      res = res.replace('c. ', (t('circa' as any) as string || 'c.') + ' ');
    }
    if (res.includes(' BC')) {
      res = res.replace(' BC', ' ' + (t('bc' as any) as string || 'BC'));
    }
    if (res.includes(' AD')) {
      res = res.replace(' AD', ' ' + (t('ad' as any) as string || 'AD'));
    }
    return res;
  };

  const filteredEvents = activeFilter === 'all' 
    ? TIMELINE_EVENTS 
    : TIMELINE_EVENTS.filter(e => e.category === activeFilter);

  return (
    <div className="timeline-page">
      <div className="nav-bar-glass" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="nav-left">
          <button className="glass-button" onClick={onClose} style={{ margin: 0, padding: '0.4rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderRadius: '100px' }}>
            <span style={{ fontSize: '1.1rem', opacity: 0.8 }}>←</span>
            <span className="hide-mobile" style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t('backToHome')}</span>
          </button>
          <h3 className="timeline-page-title">{t('timelinePageTitle')}</h3>
        </div>
      </div>

      <div className="timeline-container">
        <div className="timeline-header-controls">
          {(['all', 'covenant', 'miracle', 'battle', 'prophecy', 'jesus', 'general'] as const).map(filter => {
            const color = filter === 'all' ? 'var(--accent-color)' : getCategoryColor(filter);
            return (
              <button
                key={filter}
                className={`glass-button timeline-filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
                style={{ 
                  borderColor: activeFilter === filter ? color : `${color}30`,
                  background: activeFilter === filter ? `${color}20` : 'transparent',
                  color: activeFilter === filter ? color : 'var(--text-secondary)'
                }}
              >
                <span style={{ 
                  display: 'inline-block', 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: color,
                  marginRight: '8px',
                  opacity: activeFilter === filter ? 1 : 0.6
                }} />
                {getTranslatedCategory(filter)}
              </button>
            );
          })}
        </div>

        <div className="timeline-track-wrap">
          <div className="timeline-vertical-line" />
          
          {filteredEvents.map((evt, idx) => {
             const showEraHeader = idx === 0 || filteredEvents[idx - 1].era !== evt.era;
             const translatedBook = t(evt.scriptureLink.bookName as any) || evt.scriptureLink.bookName;
             
             // SUBTLE COLORS: Keep them consistent but muted
             const catColor = getCategoryColor(evt.category);
             const displayDate = formatDisplayDate(evt.displayDate);

             return (
               <div key={evt.id} className="timeline-event-wrapper">
                 {showEraHeader && (
                   <motion.div 
                     className="timeline-era-header"
                     initial={{ opacity: 0, y: 10 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-50px" }}
                     transition={{ duration: 0.5 }}
                   >
                     <span className="era-badge">
                       {(t(evt.era as any) || evt.era).toUpperCase()}
                     </span>
                   </motion.div>
                 )}
                 
                 <motion.div 
                   className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}
                   initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 0.6, type: 'spring', damping: 20 }}
                 >
                   <div className="timeline-marker">
                     <div className="timeline-dot" style={{ backgroundColor: catColor, boxShadow: `0 0 0 4px var(--bg-body), 0 0 10px ${catColor}40` }} />
                   </div>
                   <div className="timeline-content glass-container">
                     <div className="timeline-date" style={{ color: catColor, opacity: 0.9 }}>{displayDate}</div>
                     <h3 className="timeline-title">{t(evt.id as any) || evt.title}</h3>
                     <p className="timeline-desc">{t(`${evt.id}Desc` as any) || evt.description}</p>
                     <button 
                       className="glass-button primary-button timeline-read-btn"
                       onClick={() => onReadPassage(evt.scriptureLink.bookName, evt.scriptureLink.chapter)}
                       style={{ background: `${catColor}15`, border: `1px solid ${catColor}30`, color: 'var(--text-primary)' }}
                     >
                       {t('readAction')} {translatedBook} {evt.scriptureLink.chapter}
                     </button>
                   </div>
                 </motion.div>
               </div>
             );
          })}
        </div>
      </div>
    </div>
  );
};
