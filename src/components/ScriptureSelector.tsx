import React from 'react';
import { SCRIPTURES } from '../types/scripture';

interface ScriptureSelectorProps {
  currentScriptureId: string;
  onSelect: (id: string) => void;
}

export const ScriptureSelector: React.FC<ScriptureSelectorProps> = ({ currentScriptureId, onSelect }) => {
  return (
    <div style={{ position: 'relative' }}>
      <select
        value={currentScriptureId}
        onChange={(e) => onSelect(e.target.value)}
        className="scripture-select-input"
      >
        <optgroup label="Bibles" className="opt-group">
          {SCRIPTURES.filter(s => s.type === 'bible').map(s => (
            <option key={s.id} value={s.id} className="opt-item">
              {s.name} · {s.language}
            </option>
          ))}
        </optgroup>
        <optgroup label="Torah" className="opt-group">
          {SCRIPTURES.filter(s => s.type === 'torah').map(s => (
            <option key={s.id} value={s.id} className="opt-item">
              {s.name} · {s.language}
            </option>
          ))}
        </optgroup>
      </select>
      <div className="scripture-select-proxy">
        <span className="scripture-selected-name">
          {SCRIPTURES.find(s => s.id === currentScriptureId)?.name || 'Select'}
        </span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="select-arrow"
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};
