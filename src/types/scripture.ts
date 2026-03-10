export type ScriptureType = 'bible' | 'torah' | 'quran';

export interface ScriptureOption {
  id: string;
  name: string;
  language: string;
  type: ScriptureType;
  sourceDataId: string; // which JSON file to pull from
}

export const SCRIPTURES: ScriptureOption[] = [
  // Bibles
  { id: 'bible-en', name: 'NIV', language: 'English', type: 'bible', sourceDataId: 'en' },
  { id: 'bible-fr', name: 'Parole de Vie', language: 'Français', type: 'bible', sourceDataId: 'fr' },
  { id: 'bible-es', name: 'Reina-Valera', language: 'Español', type: 'bible', sourceDataId: 'es' },
  { id: 'bible-de', name: 'Luther', language: 'Deutsch', type: 'bible', sourceDataId: 'de' },
  
  // Torah (Filtered views of the Bibles)
  { id: 'torah-en', name: 'Torah', language: 'English', type: 'torah', sourceDataId: 'en' },
  { id: 'torah-fr', name: 'Torah', language: 'Français', type: 'torah', sourceDataId: 'fr' },
  { id: 'torah-es', name: 'Torá', language: 'Español', type: 'torah', sourceDataId: 'es' },
  { id: 'torah-de', name: 'Tora', language: 'Deutsch', type: 'torah', sourceDataId: 'de' },
];
