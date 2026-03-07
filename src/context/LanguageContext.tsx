import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Lang = 'en' | 'ar';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (en: string, ar: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  toggleLang: () => {},
  t: (en) => en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const root = document.documentElement;
    if (lang === 'ar') {
      root.setAttribute('dir', 'rtl');
      root.setAttribute('lang', 'ar');
      document.body.classList.add('ar');
    } else {
      root.setAttribute('dir', 'ltr');
      root.setAttribute('lang', 'en');
      document.body.classList.remove('ar');
    }
  }, [lang]);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'ar' : 'en');

  // Helper: pick string based on current lang
  const t = (en: string, ar: string) => lang === 'ar' ? ar : en;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);