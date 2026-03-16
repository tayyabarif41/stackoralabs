import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { CookieProvider } from './context/CookieContext';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <CookieProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </CookieProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
);
