import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { I18nProvider } from './hooks/i18nContext.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { Analytics } from '@vercel/analytics/react';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider>
      <AuthProvider>
        <App />
        <Analytics />
      </AuthProvider>
    </I18nProvider>
  </React.StrictMode>,
);
