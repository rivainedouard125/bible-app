import React, { useState, useMemo } from 'react';
import { CHARACTERS } from '../data/characters';
import { CHARACTERS_FR } from '../data/characters-fr';
import type { BiblicalCharacter } from '../data/characters';
import { useI18n } from '../hooks/i18nContext';
import './Glossary.css';

interface GlossaryProps {
  onClose: () => void;
}

export const Glossary: React.FC<GlossaryProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('ALL_TAG');
  const [selectedCharacter, setSelectedCharacter] = useState<BiblicalCharacter | null>(null);

  const { t, lang } = useI18n();
  const currentCharacters = lang === 'fr' ? CHARACTERS_FR : CHARACTERS;

  // Derive unique tags for filters
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    currentCharacters.forEach(char => {
      char.tags.forEach(tag => tags.add(tag));
    });
    return ['ALL_TAG', ...Array.from(tags).sort()];
  }, [currentCharacters]);

  // Filtered Characters
  const filteredCharacters = useMemo(() => {
    return currentCharacters.filter(char => {
      const matchesSearch = char.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            char.roles.join(' ').toLowerCase().includes(searchQuery.toLowerCase()) ||
                            char.shortSummary.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = activeFilter === 'ALL_TAG' || char.tags.includes(activeFilter as any);

      return matchesSearch && matchesFilter;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery, activeFilter, currentCharacters]);


  const openCharacter = (id: string) => {
    const char = currentCharacters.find(c => c.id === id);
    if (char) {
      setSelectedCharacter(char);
    }
  };

  return (
    <div className="glossary-page">
      <button className="back-button" onClick={onClose} style={{ alignSelf: 'flex-start' }}>
        {t('backToHome' as any)}
      </button>

      <div className="glossary-header">
        <h1 className="glossary-title">{t('glossaryTitle' as any)}</h1>
        <p className="glossary-subtitle">{t('glossarySub' as any)}</p>
      </div>

      <div className="glossary-controls">
        <div className="glossary-search">
          <span className="glossary-search-icon">🔍</span>
          <input 
            type="text" 
            placeholder={t('glossarySearchPlaceholder' as any)} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="glossary-filters">
          {availableTags.map(tag => (
            <button
              key={tag}
              className={`glossary-filter-chip ${activeFilter === tag ? 'active' : ''}`}
              onClick={() => setActiveFilter(tag)}
            >
              {tag === 'ALL_TAG' ? t('glossaryAll' as any) : tag}
            </button>
          ))}
        </div>
      </div>

      {filteredCharacters.length > 0 ? (
        <div className="glossary-grid">
          {filteredCharacters.map(char => (
            <div key={char.id} className="character-card" onClick={() => openCharacter(char.id)}>
              {char.imageUrl && (
                <div className="char-image-container">
                  <img src={char.imageUrl} alt={char.name} className="char-image" />
                </div>
              )}
              <div className="char-card-header">
                <div>
                  <h3 className="char-card-title">{char.name}</h3>
                  <div className="char-card-era">{char.era}</div>
                </div>
                {char.roles[0] && <div className="char-badge">{char.roles[0]}</div>}
              </div>
              <p className="char-card-summary">{char.shortSummary}</p>
              <div className="char-card-footer">
                {char.tags.map(t => (
                  <span key={t} className="char-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glossary-empty">
          <div className="glossary-empty-icon">📜</div>
          <h3>{t('glossaryNoResultsTitle' as any)}</h3>
          <p>{t('glossaryNoResultsSub' as any)}</p>
        </div>
      )}

      {/* Detail Modal Overlay */}
      {selectedCharacter && (
        <div className="character-detail-overlay" onClick={() => setSelectedCharacter(null)}>
          <div className="character-detail-modal" onClick={e => e.stopPropagation()}>
            <button className="glass-button char-detail-close" onClick={() => setSelectedCharacter(null)}>×</button>
            
            <div className="char-detail-header">
              {selectedCharacter.imageUrl && (
                <div className="char-detail-image-container">
                  <img src={selectedCharacter.imageUrl} alt={selectedCharacter.name} className="char-detail-image" />
                  <span className="modal-ai-badge">{t('glossaryAiPortraitDesc' as any)}</span>
                </div>
              )}
              
              <div className="char-detail-header-info">
                <h2 className="char-detail-title">{selectedCharacter.name}</h2>
                <div className="char-detail-roles">
                  {selectedCharacter.roles.map(role => (
                    <span key={role} className="char-detail-role">{role}</span>
                  ))}
                </div>

                <div className="char-detail-meta">
                  <div className="char-detail-meta-item">
                    <span>⏳</span> {selectedCharacter.era}
                  </div>
                  {selectedCharacter.keyLocations.length > 0 && (
                    <div className="char-detail-meta-item">
                      <span>📍</span> {selectedCharacter.keyLocations.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="char-detail-content">
              <div className="char-section">
                <h3 className="char-section-title"><span>📖</span> {t('glossaryBio' as any)}</h3>
                <p className="char-bio">{selectedCharacter.detailedBio}</p>
              </div>

              {selectedCharacter.keyScriptures.length > 0 && (
                <div className="char-section">
                  <h3 className="char-section-title"><span>📜</span> {t('glossaryScriptures' as any)}</h3>
                  <div className="char-scriptures-list">
                    {selectedCharacter.keyScriptures.map((scripture, i) => (
                      <div key={i} className="char-scripture-item">
                        <span className="char-scripture-ref">{scripture.reference}</span>
                        <span className="char-scripture-event">{scripture.event}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedCharacter.relatedCharacters.length > 0 && (
                <div className="char-section">
                  <h3 className="char-section-title"><span>🔗</span> {t('glossaryRelated' as any)}</h3>
                  <div className="char-related-grid">
                    {selectedCharacter.relatedCharacters.map(relId => {
                      const relChar = currentCharacters.find(c => c.id === relId);
                      if (!relChar) return null;
                      return (
                        <div key={relId} className="char-related-card" onClick={() => openCharacter(relId)}>
                          {relChar.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Glossary;
