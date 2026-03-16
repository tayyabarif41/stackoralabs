import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Cookie, Shield, BarChart2, Megaphone, Sliders, Zap,
  ChevronDown, X, Check, Info,
} from 'lucide-react';
import { useCookies } from '@/context/CookieContext';
import type { CookiePreferences } from '@/context/CookieContext';
import { useLanguage } from '@/context/LanguageContext';

/* ── Cookie category definitions ──────────────────────────────── */
interface Category {
  key: keyof Omit<CookiePreferences, 'necessary'>;
  Icon: React.ElementType;
  labelEn: string;
  labelAr: string;
  descEn: string;
  descAr: string;
  examples: string;
  required?: false;
}

const CATEGORIES: Category[] = [
  {
    key: 'analytics',
    Icon: BarChart2,
    labelEn: 'Analytics',
    labelAr: 'التحليلات',
    descEn: 'Help us understand how visitors interact with our website by collecting and reporting information anonymously.',
    descAr: 'تساعدنا على فهم كيفية تفاعل الزوار مع موقعنا من خلال جمع المعلومات والإبلاغ عنها بشكل مجهول.',
    examples: 'Google Analytics, Hotjar, Mixpanel',
  },
  {
    key: 'marketing',
    Icon: Megaphone,
    labelEn: 'Marketing',
    labelAr: 'التسويق',
    descEn: 'Used to track visitors across websites to display relevant and engaging advertisements.',
    descAr: 'تُستخدم لتتبع الزوار عبر المواقع لعرض إعلانات ذات صلة وجذابة.',
    examples: 'Meta Pixel, Google Ads, LinkedIn Insight',
  },
  {
    key: 'functional',
    Icon: Sliders,
    labelEn: 'Functional',
    labelAr: 'وظيفية',
    descEn: 'Enable enhanced functionality and personalisation such as live chat, language preferences, and saved settings.',
    descAr: 'تتيح وظائف محسّنة وتخصيصاً مثل الدردشة المباشرة وتفضيلات اللغة والإعدادات المحفوظة.',
    examples: 'Intercom, Crisp, language memory',
  },
  {
    key: 'performance',
    Icon: Zap,
    labelEn: 'Performance',
    labelAr: 'الأداء',
    descEn: 'Allow us to count visits and traffic sources to measure and improve site performance.',
    descAr: 'تتيح لنا إحصاء الزيارات ومصادر الزيارات لقياس أداء الموقع وتحسينه.',
    examples: 'Cloudflare Insights, Web Vitals',
  },
];

/* ── Toggle switch ─────────────────────────────────────────────── */
function Toggle({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
        disabled
          ? 'cursor-not-allowed opacity-60 bg-[var(--accent)]'
          : checked
          ? 'cursor-pointer bg-[var(--accent)]'
          : 'cursor-pointer bg-[var(--border-2)]'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

/* ── Expandable row ────────────────────────────────────────────── */
function CategoryRow({
  category,
  enabled,
  onChange,
  tFn,
}: {
  category: Category;
  enabled: boolean;
  onChange: (v: boolean) => void;
  tFn: (en: string, ar: string) => string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[var(--border)] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-8 h-8 rounded-lg bg-[var(--accent-light)] flex items-center justify-center shrink-0">
          <category.Icon className="w-4 h-4 text-[var(--accent)]" />
        </div>
        <span className="flex-1 text-[var(--ink)] font-semibold text-[13px]">{tFn(category.labelEn, category.labelAr)}</span>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="p-1 text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
          aria-label="Show details"
        >
          <ChevronDown
            className="w-4 h-4 transition-transform duration-200"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>
        <Toggle checked={enabled} onChange={onChange} />
      </div>

      {/* Details */}
      {open && (
        <div className="px-4 pb-4 border-t border-[var(--border)] bg-[var(--bg-2)]">
          <p className="text-[var(--muted)] text-[12px] leading-relaxed mt-3 mb-2">
            {tFn(category.descEn, category.descAr)}
          </p>
          <p className="text-[var(--muted-2)] text-[11px]">
            <span className="font-medium text-[var(--muted)]">{tFn('Examples: ', 'أمثلة: ')}</span>
            {category.examples}
          </p>
        </div>
      )}
    </div>
  );
}

/* ── Main component ────────────────────────────────────────────── */
export default function CookieConsent() {
  const { status, preferences, acceptAll, rejectAll, saveCustom } = useCookies();
  const { t } = useLanguage();
  const [view, setView] = useState<'banner' | 'settings'>('banner');
  const [custom, setCustom] = useState({
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    functional: preferences.functional,
    performance: preferences.performance,
  });

  const bannerRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Sync custom state if preferences change (e.g. on load from storage)
  useEffect(() => {
    setCustom({
      analytics: preferences.analytics,
      marketing: preferences.marketing,
      functional: preferences.functional,
      performance: preferences.performance,
    });
  }, [preferences]);

  // no GSAP needed — banner uses CSS animation

  // Animate settings panel in
  useEffect(() => {
    if (view !== 'settings') return;
    const el = settingsRef.current;
    if (!el) return;
    gsap.fromTo(el,
      { y: 20, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' }
    );
  }, [view]);

  const animateOut = (cb: () => void) => {
    const el = bannerRef.current ?? settingsRef.current;
    if (!el) { cb(); return; }
    gsap.to(el, { y: 40, opacity: 0, duration: 0.3, ease: 'power3.in', onComplete: cb });
  };

  if (status !== 'pending') return null;

  /* ── Banner ── */
  if (view === 'banner') {
    return (
      <div
        ref={bannerRef}
        className="fixed bottom-6 inset-x-0 mx-auto z-[300] w-[min(calc(100vw-2rem),720px)] cookie-banner-enter"
      >
        <div className="bg-[var(--bg)] border border-[var(--border)] rounded-2xl shadow-[var(--shadow-lg)] p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Icon + text */}
          <div className="flex gap-3 flex-1 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[var(--accent-light)] flex items-center justify-center shrink-0 mt-0.5">
              <Cookie className="w-4 h-4 text-[var(--accent)]" />
            </div>
            <div className="min-w-0">
              <p className="text-[var(--ink)] font-semibold text-[13px] mb-0.5">{t('We use cookies', 'نستخدم ملفات تعريف الارتباط')}</p>
              <p className="text-[var(--muted)] text-[12px] leading-relaxed">
                {t(
                  'We use cookies to enhance your experience, analyse traffic, and serve personalised content. You can manage your preferences at any time.',
                  'نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل الزيارات وتقديم محتوى مخصص. يمكنك إدارة تفضيلاتك في أي وقت.'
                )}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setView('settings')}
              className="px-3 py-2 rounded-xl text-[12px] font-semibold text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--bg-2)] transition-colors border border-[var(--border)] flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5" />
              {t('Manage', 'إدارة')}
            </button>
            <button
              type="button"
              onClick={() => animateOut(rejectAll)}
              className="px-3 py-2 rounded-xl text-[12px] font-semibold text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--bg-2)] transition-colors border border-[var(--border)]"
            >
              {t('Reject all', 'رفض الكل')}
            </button>
            <button
              type="button"
              onClick={() => animateOut(acceptAll)}
              className="px-4 py-2 rounded-xl text-[12px] font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-2)] transition-colors flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              {t('Accept all', 'قبول الكل')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Settings panel ── */
  return (
    <div className="fixed inset-0 z-[300] overflow-y-auto bg-[rgba(0,0,0,0.4)] backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4">
      <div
        ref={settingsRef}
        style={{ opacity: 0 }}
        className="bg-[var(--bg)] border border-[var(--border)] rounded-2xl shadow-[var(--shadow-lg)] w-full max-w-lg flex flex-col my-4"
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-5 border-b border-[var(--border)]">
          <div className="w-8 h-8 rounded-xl bg-[var(--accent-light)] flex items-center justify-center">
            <Shield className="w-4 h-4 text-[var(--accent)]" />
          </div>
          <div className="flex-1">
            <h2 className="text-[var(--ink)] font-semibold text-[15px]">{t('Cookie Preferences', 'تفضيلات ملفات الارتباط')}</h2>
            <p className="text-[var(--muted)] text-[11px]">{t('Control what data we collect', 'تحكم في البيانات التي نجمعها')}</p>
          </div>
          <button
            type="button"
            onClick={() => setView('banner')}
            className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--bg-2)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-3">

          {/* Necessary — always on */}
          <div className="border border-[var(--border)] rounded-xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-light)] flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4 text-[var(--accent)]" />
              </div>
              <div className="flex-1">
                <span className="text-[var(--ink)] font-semibold text-[13px]">{t('Necessary', 'ضرورية')}</span>
                <span className="ml-2 text-[10px] font-medium text-[var(--accent)] bg-[var(--accent-light)] px-2 py-0.5 rounded-full">
                  {t('Always on', 'دائماً مفعّلة')}
                </span>
              </div>
              <Toggle checked={true} onChange={() => {}} disabled />
            </div>
            <div className="px-4 pb-3 border-t border-[var(--border)] bg-[var(--bg-2)]">
              <p className="text-[var(--muted)] text-[12px] leading-relaxed mt-3 mb-2">
                {t('Essential for the website to function. They cannot be switched off.', 'ضرورية لعمل الموقع. لا يمكن إيقافها.')}
              </p>
              <p className="text-[var(--muted-2)] text-[11px]">
                <span className="font-medium text-[var(--muted)]">{t('Examples: ', 'أمثلة: ')}</span>
                {t('Session cookies, CSRF protection, authentication tokens', 'ملفات الجلسة، حماية CSRF، رموز المصادقة')}
              </p>
            </div>
          </div>

          {/* Optional categories */}
          {CATEGORIES.map((cat) => (
            <CategoryRow
              key={cat.key}
              category={cat}
              enabled={custom[cat.key]}
              onChange={(v) => setCustom((p) => ({ ...p, [cat.key]: v }))}
              tFn={t}
            />
          ))}

          {/* Info note */}
          <div className="flex gap-2 p-3 rounded-xl bg-[var(--bg-2)] border border-[var(--border)]">
            <Info className="w-4 h-4 text-[var(--muted)] shrink-0 mt-0.5" />
            <p className="text-[var(--muted)] text-[11px] leading-relaxed">
              {t(
                'Your preferences are stored locally and can be updated at any time via our cookie settings. We never sell your personal data.',
                'تُخزَّن تفضيلاتك محلياً ويمكن تحديثها في أي وقت عبر إعدادات ملفات الارتباط. لا نبيع بياناتك الشخصية أبداً.'
              )}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-[var(--border)] flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => animateOut(rejectAll)}
            className="px-4 py-2 rounded-xl text-[12px] font-semibold text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--bg-2)] transition-colors border border-[var(--border)]"
          >
            {t('Reject all', 'رفض الكل')}
          </button>
          <div className="flex-1" />
          <button
            type="button"
            onClick={() => animateOut(() => saveCustom(custom))}
            className="px-4 py-2 rounded-xl text-[12px] font-semibold border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent-light)] transition-colors"
          >
            {t('Save preferences', 'حفظ التفضيلات')}
          </button>
          <button
            type="button"
            onClick={() => animateOut(acceptAll)}
            className="px-4 py-2 rounded-xl text-[12px] font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-2)] transition-colors flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            {t('Accept all', 'قبول الكل')}
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
