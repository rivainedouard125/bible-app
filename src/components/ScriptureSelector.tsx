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
        className="glass-button scripture-select"
      >
        <optgroup label="Bibles">
          {SCRIPTURES.filter(s => s.type === 'bible').map(s => (
            <option key={s.id} value={s.id}>
              {s.name} · {s.language}
            </option>
          ))}
        </optgroup>
        <optgroup label="Torah">
          {SCRIPTURES.filter(s => s.type === 'torah').map(s => (
            <option key={s.id} value={s.id}>
              {s.name} · {s.language}
            </option>
          ))}
        </optgroup>
      </select>
      {/* Custom Dropdown Arrow */}
      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          stroke: 'currentColor',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeLinejoin: 'round'
        }}
      >
        <path d="M1 1L5 5L9 1" />
      </svg>
    </div>
  );
};
