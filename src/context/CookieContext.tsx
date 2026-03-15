import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export interface CookiePreferences {
  necessary: true;          // always on — cannot be disabled
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  performance: boolean;
}

type ConsentStatus = 'pending' | 'accepted' | 'rejected' | 'custom';

interface CookieContextValue {
  status: ConsentStatus;
  preferences: CookiePreferences;
  acceptAll: () => void;
  rejectAll: () => void;
  saveCustom: (prefs: Omit<CookiePreferences, 'necessary'>) => void;
  resetConsent: () => void;
}

const STORAGE_KEY = 'stackora-cookie-consent';

const defaultPrefs: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
  performance: false,
};

const CookieContext = createContext<CookieContextValue>({
  status: 'pending',
  preferences: defaultPrefs,
  acceptAll: () => {},
  rejectAll: () => {},
  saveCustom: () => {},
  resetConsent: () => {},
});

export function CookieProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ConsentStatus>('pending');
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPrefs);

  // Load persisted consent on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { status: ConsentStatus; preferences: CookiePreferences };
        if (parsed.status && parsed.status !== 'pending') {
          setStatus(parsed.status);
          setPreferences({ ...parsed.preferences, necessary: true });
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const persist = (s: ConsentStatus, p: CookiePreferences) => {
    setStatus(s);
    setPreferences(p);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ status: s, preferences: p }));
  };

  const acceptAll = () =>
    persist('accepted', {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      performance: true,
    });

  const rejectAll = () =>
    persist('rejected', {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      performance: false,
    });

  const saveCustom = (prefs: Omit<CookiePreferences, 'necessary'>) =>
    persist('custom', { ...prefs, necessary: true });

  const resetConsent = () => {
    localStorage.removeItem(STORAGE_KEY);
    setStatus('pending');
    setPreferences(defaultPrefs);
  };

  return (
    <CookieContext.Provider value={{ status, preferences, acceptAll, rejectAll, saveCustom, resetConsent }}>
      {children}
    </CookieContext.Provider>
  );
}

export function useCookies() {
  return useContext(CookieContext);
}
