import { useEffect, useState, useRef, useCallback } from 'react';
import type { ElementType } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Menu, X, Home, LayoutGrid, Briefcase, MessageCircle, BookOpen, Info, Sun, Moon, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { translations, useT } from '../i18n/translation';

interface NavLink {
  href: string;
  labelEn: string;
  labelAr: string;
  Icon: ElementType;
  isRoute?: boolean;
  isScroll?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { href: '/',         labelEn: 'Home',     labelAr: 'الرئيسية',   Icon: Home,          isRoute: true },
  { href: '/services', labelEn: 'Services', labelAr: 'خدماتنا',    Icon: LayoutGrid,    isRoute: true },
  { href: '/work',     labelEn: 'Work',     labelAr: 'أعمالنا',    Icon: Briefcase,     isRoute: true },
  { href: '/blog',     labelEn: 'Blog',     labelAr: 'المدونة',    Icon: BookOpen,      isRoute: true },
  { href: '/about',    labelEn: 'About',    labelAr: 'من نحن',     Icon: Info,          isRoute: true },
  { href: '/contact',  labelEn: 'Contact',  labelAr: 'تواصل معنا', Icon: MessageCircle, isRoute: true },
];

const SCROLL_SECTION_IDS = ['hero'];

const LANGUAGES = [
  { code: 'en' as const, label: 'English', native: 'English' },
  { code: 'ar' as const, label: 'Arabic',  native: 'العربية' },
];

export default function Navigation() {
  const { lang, setLang }      = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t  = useT(lang);
  const tx = translations.nav;
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled,    setIsScrolled]    = useState(false);
  const [isMobileOpen,  setIsMobileOpen]  = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isLangOpen,    setIsLangOpen]    = useState(false);
  const [isAnimating,   setIsAnimating]   = useState(false);

  const themeButtonRef = useRef<HTMLButtonElement>(null);
  const iconRef        = useRef<HTMLSpanElement>(null);
  const langDropRef    = useRef<HTMLDivElement>(null);
  const overlayRef     = useRef<HTMLDivElement>(null);
  const dialogRef      = useRef<HTMLDivElement>(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section
  useEffect(() => {
    if (location.pathname !== '/') return;
    const observers: IntersectionObserver[] = [];
    SCROLL_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, [location.pathname]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  // Close lang dropdown on outside click
  useEffect(() => {
    if (!isLangOpen) return;
    const handler = (e: MouseEvent) => {
      if (langDropRef.current && !langDropRef.current.contains(e.target as Node))
        setIsLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isLangOpen]);

  // Dialog open animation
  useEffect(() => {
    if (!isMobileOpen) return;
    const overlay = overlayRef.current;
    const dialog  = dialogRef.current;
    if (!overlay || !dialog) return;

    const tl = gsap.timeline();

    // Background fades in
    tl.fromTo(overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );

    // Dialog scales + fades in
    tl.fromTo(dialog,
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power3.out' },
      '-=0.15'
    );

    // Links stagger up
    tl.fromTo('.nav-dialog-item',
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: 'power3.out' },
      '-=0.2'
    );

    // Footer fades in
    tl.fromTo('.nav-dialog-footer',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
      '-=0.2'
    );
  }, [isMobileOpen]);

  const closeDialog = () => {
    const overlay = overlayRef.current;
    const dialog  = dialogRef.current;
    if (!overlay || !dialog) { setIsMobileOpen(false); return; }

    const tl = gsap.timeline({ onComplete: () => setIsMobileOpen(false) });
    tl.to('.nav-dialog-item', { opacity: 0, y: -16, duration: 0.2, stagger: 0.03, ease: 'power2.in' });
    tl.to(dialog,  { opacity: 0, scale: 0.96, y: -12, duration: 0.25, ease: 'power2.in' }, '-=0.1');
    tl.to(overlay, { opacity: 0, duration: 0.2, ease: 'power2.in' }, '-=0.15');
  };

  const scrollToAnchor = (hash: string) => {
    const el = document.querySelector(hash);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  const handleScrollLink = (hash: string, wasOpen: boolean) => {
    const delay = wasOpen ? 360 : 0;
    if (location.pathname === '/') {
      setTimeout(() => scrollToAnchor(hash), delay);
    } else {
      navigate('/' + hash);
    }
  };

  // Desktop dark mode toggle with GSAP
  const handleThemeToggle = useCallback(() => {
    if (isAnimating || !iconRef.current || !themeButtonRef.current) return;
    setIsAnimating(true);
    const btn  = themeButtonRef.current;
    const icon = iconRef.current;
    const tl   = gsap.timeline({ onComplete: () => setIsAnimating(false) });
    tl.to(btn,  { scale: 0.88, duration: 0.12, ease: 'power2.in' })
      .to(icon, { scale: 0, rotate: 180, duration: 0.18, ease: 'power2.in' }, '<')
      .call(toggleTheme)
      .to(btn,  { scale: 1.12, duration: 0.2, ease: 'back.out(3)' })
      .to(btn,  { scale: 1, duration: 0.15, ease: 'power2.out' })
      .fromTo(icon,
        { scale: 0, rotate: -180 },
        { scale: 1, rotate: 0, duration: 0.28, ease: 'back.out(2.5)' },
        '<-0.1'
      )
      .fromTo(btn,
        { boxShadow: '0 0 0px 0px rgba(43,92,230,0.5)' },
        { boxShadow: '0 0 0px 0px rgba(43,92,230,0)', duration: 0.5, ease: 'power2.out', clearProps: 'boxShadow' },
        '-=0.4'
      );
  }, [isAnimating, toggleTheme]);

  const isActive = (link: NavLink): boolean => {
    if (link.isRoute) {
      if (link.href === '/') return location.pathname === '/';
      return location.pathname.startsWith(link.href);
    }
    return location.pathname === '/' && activeSection === link.href.replace('#', '');
  };

  const getLabel = (link: NavLink) => lang === 'ar' ? link.labelAr : link.labelEn;

  const linkClass = (active: boolean) =>
    `relative flex items-center gap-2 px-3 py-1.5 text-[13px] font-semibold transition-all duration-200 rounded-full ${
      active
        ? 'text-[var(--accent)] bg-[var(--accent-light)]'
        : 'text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--bg-2)]'
    }`;

  const renderDesktopLink = (link: NavLink) => {
    const active = isActive(link);
    const cls    = linkClass(active);
    const dot    = active && <span className="w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" />;
    if (link.isRoute) {
      return (
        <Link to={link.href} className={cls}>
          <link.Icon className="w-[14px] h-[14px] opacity-50 shrink-0" />
          {getLabel(link)}
          {dot}
        </Link>
      );
    }
    return (
      <a href={link.href} onClick={(e) => { e.preventDefault(); handleScrollLink(link.href, false); }} className={cls}>
        <link.Icon className="w-[14px] h-[14px] opacity-50 shrink-0" />
        {getLabel(link)}
        {dot}
      </a>
    );
  };

  const currentLang = LANGUAGES.find((l) => l.code === lang)!;

  return (
    <div>

      {/* ── Nav bar ──────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          isScrolled || location.pathname !== '/'
            ? `${theme === 'dark' ? 'bg-[rgba(14,13,11,0.96)]' : 'bg-[rgba(248,246,242,0.96)]'} backdrop-blur-xl border-b border-[var(--border)] shadow-sm`
            : 'bg-transparent'
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-7 h-7 bg-[var(--ink)] rounded-md grid grid-cols-2 gap-[3px] p-[6px] transition-transform duration-300 group-hover:scale-105">
                <span className="bg-white rounded-[1px]" />
                <span className="bg-white/50 rounded-[1px]" />
                <span className="bg-white/50 rounded-[1px]" />
                <span className="bg-white/20 rounded-[1px]" />
              </div>
              <span className="text-[15px] font-bold tracking-tight text-[var(--ink)]">
                Stackora<span className="text-[var(--accent)]">Labs</span>
              </span>
            </Link>

            {/* Desktop links */}
            <ul className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>{renderDesktopLink(link)}</li>
              ))}
            </ul>

            {/* Right controls */}
            <div className="flex items-center gap-2 shrink-0">

              {/* Dark mode — desktop (with GSAP animation) */}
              <button
                ref={themeButtonRef}
                type="button"
                onClick={handleThemeToggle}
                aria-label="Toggle dark mode"
                className="hidden lg:flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--border)] text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--bg-2)] hover:border-[var(--border-2)] transition-colors duration-200 will-change-transform"
              >
                <span ref={iconRef} className="flex items-center justify-center will-change-transform">
                  {theme === 'dark' ? <Sun className="w-[15px] h-[15px]" /> : <Moon className="w-[15px] h-[15px]" />}
                </span>
              </button>

              {/* Dark mode — mobile/tablet (simple, always visible) */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg border border-[var(--border)] text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--bg-2)] transition-colors duration-200"
              >
                {theme === 'dark' ? <Sun className="w-[14px] h-[14px]" /> : <Moon className="w-[14px] h-[14px]" />}
              </button>

              {/* Language dropdown — all screen sizes */}
              <div ref={langDropRef} className="relative block">
                <button
                  type="button"
                  onClick={() => setIsLangOpen((o) => !o)}
                  aria-expanded={isLangOpen}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] text-[12px] font-semibold text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--border-2)] hover:bg-[var(--bg-2)] transition-all duration-200"
                >
                  <span>{currentLang.native}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className={`absolute top-[calc(100%+8px)] ${lang === 'ar' ? 'left-0' : 'right-0'} min-w-[148px] bg-white border border-[var(--border)] rounded-xl shadow-lg overflow-hidden transition-all duration-200 origin-top ${
                    isLangOpen
                      ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
                  }`}
                >
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => { setLang(l.code); setIsLangOpen(false); }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-[13px] font-medium transition-colors duration-150 ${
                        lang === l.code
                          ? 'bg-[var(--accent-light)] text-[var(--accent)]'
                          : 'text-[var(--ink)] hover:bg-[var(--bg-2)]'
                      }`}
                    >
                      <span className="flex flex-col items-start gap-0.5">
                        <span className="text-[12px] font-semibold">{l.native}</span>
                        <span className="text-[10px] text-[var(--muted-2)]">{l.label}</span>
                      </span>
                      {lang === l.code && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA — desktop */}
              <Link to="/contact" className="hidden lg:inline-flex btn btn-accent text-[11px] py-2.5 px-5">
                {t(tx.cta)}
              </Link>

              {/* Hamburger — mobile/tablet */}
              <button
                type="button"
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open menu"
                className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[var(--bg-2)] transition-colors"
              >
                <Menu className="w-5 h-5 text-[var(--ink)]" />
              </button>

            </div>
          </div>
        </div>
      </nav>

      {/* ── Full-screen nav dialog ───────────────────────────────── */}
      {isMobileOpen && (
        <div ref={overlayRef} className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md">

          {/* Dialog panel */}
          <div
            ref={dialogRef}
            className="absolute inset-4 sm:inset-8 rounded-2xl overflow-hidden flex flex-col"
            style={{ background: theme === 'dark' ? '#0E0D0B' : '#F8F6F2' }}
          >

            {/* Dialog header */}
            <div className="flex items-center justify-between px-6 h-[68px] border-b border-[var(--border)] shrink-0">
              <span className="text-[15px] font-bold tracking-tight text-[var(--ink)]">
                Stackora<span className="text-[var(--accent)]">Labs</span>
              </span>
              <button
                type="button"
                onClick={closeDialog}
                aria-label="Close menu"
                className="flex items-center justify-center w-9 h-9 rounded-xl border border-[var(--border)] text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--bg-2)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 overflow-y-auto flex flex-col justify-center px-6 py-8">
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link);
                  const handleClick = () => {
                    if (link.isRoute) {
                      closeDialog();
                    } else {
                      closeDialog();
                      handleScrollLink(link.href, true);
                    }
                  };
                  return (
                    <li key={link.href} className="nav-dialog-item">
                      <Link
                        to={link.isRoute ? link.href : '/'}
                        onClick={handleClick}
                        className={`group flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 ${
                          active
                            ? 'bg-[var(--accent)] text-white'
                            : 'text-[var(--ink)] hover:bg-[var(--bg-2)]'
                        }`}
                      >
                        <span className={`flex items-center justify-center w-9 h-9 rounded-lg ${
                          active ? 'bg-white/20' : 'bg-[var(--bg-2)] group-hover:bg-[var(--bg-3)]'
                        } transition-colors`}>
                          <link.Icon className={`w-[18px] h-[18px] ${active ? 'text-white' : 'text-[var(--muted)]'}`} />
                        </span>
                        <span className="text-[17px] font-semibold flex-1">{getLabel(link)}</span>
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Dialog footer */}
            <div className="nav-dialog-footer px-6 pb-6 pt-3 border-t border-[var(--border)] shrink-0">
              <Link
                to="/contact"
                onClick={closeDialog}
                className="btn btn-accent w-full justify-center py-3.5 text-[13px]"
              >
                {t(tx.cta)}
              </Link>
              <p className="text-center text-[11px] text-[var(--muted-2)] mt-3">{t(tx.email)}</p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
