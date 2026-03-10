import { useI18n } from '../hooks/i18nContext';

export const LanguageSelector = () => {
  const { lang, setLang } = useI18n();

  return (
    <div className="language-selector">
      <button 
        className={`lang-btn ${lang === 'en' ? 'active' : ''}`} 
        onClick={() => setLang('en')}
      >
        EN
      </button>
      <button 
        className={`lang-btn ${lang === 'fr' ? 'active' : ''}`} 
        onClick={() => setLang('fr')}
      >
        FR
      </button>
    </div>
  );
};
