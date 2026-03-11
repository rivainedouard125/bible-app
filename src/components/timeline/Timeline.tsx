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
      <div className="timeline-nav">
        <button className="back-btn-round" onClick={onClose} style={{ width: '42px', height: '42px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h3 className="section-title" style={{ fontSize: '1.5rem' }}>{t('timelinePageTitle')}</h3>
      </div>

      <div className="timeline-container">
        <div className="timeline-filters">
          {(['all', 'covenant', 'miracle', 'battle', 'prophecy', 'jesus', 'general'] as const).map(filter => {
            const color = filter === 'all' ? 'var(--accent-color)' : getCategoryColor(filter);
            return (
              <button
                key={filter}
                className={`timeline-filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
                style={{ 
                  borderColor: activeFilter === filter ? color : 'transparent'
                }}
              >
                <span className="filter-dot" style={{ backgroundColor: color }} />
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
             
             const catColor = getCategoryColor(evt.category);
             const displayDate = formatDisplayDate(evt.displayDate);

             return (
               <div key={evt.id} className="timeline-event-wrapper">
                 {showEraHeader && (
                   <div className="timeline-era-header">
                     <span className="era-badge">
                        {t(evt.era as any) || evt.era}
                     </span>
                   </div>
                 )}
                 
                 <motion.div 
                   className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 0.5, ease: "easeOut" }}
                 >
                   <div className="timeline-marker">
                     <div className="timeline-dot" style={{ backgroundColor: catColor, boxShadow: `0 0 20px ${catColor}40` }} />
                   </div>
                   <div className="timeline-content">
                     <div className="timeline-date" style={{ color: catColor }}>{displayDate}</div>
                     <h3 className="timeline-title">{t(evt.id as any) || evt.title}</h3>
                     <p className="timeline-desc">{t(`${evt.id}Desc` as any) || evt.description}</p>
                     <button 
                       className="glass-button timeline-read-btn"
                       onClick={() => onReadPassage(evt.scriptureLink.bookName, evt.scriptureLink.chapter)}
                       style={{ background: 'var(--accent-color)', color: 'var(--on-accent)', border: 'none' }}
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
