import { useEffect, useState, useRef } from 'react';
import type { MouseEvent, ElementType } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { Menu, X, LayoutGrid, Briefcase, GitBranch, Tag, MessageCircle, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavLink {
  href: string;
  labelEn: string;
  labelAr: string;
  Icon: ElementType;
  isRoute?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { href: '#services', labelEn: 'Services', labelAr: 'خدماتنا',    Icon: LayoutGrid    },
  { href: '#cases',    labelEn: 'Work',     labelAr: 'أعمالنا',    Icon: Briefcase     },
  { href: '#process',  labelEn: 'Process',  labelAr: 'منهجيتنا',   Icon: GitBranch     },
  { href: '#pricing',  labelEn: 'Pricing',  labelAr: 'الأسعار',    Icon: Tag           },
  { href: '#contact',  labelEn: 'Contact',  labelAr: 'تواصل معنا', Icon: MessageCircle },
  { href: '/blog',     labelEn: 'Blog',     labelAr: 'المدونة',     Icon: BookOpen, isRoute: true },
];

const SECTION_IDS = ['hero', 'services', 'cases', 'process', 'pricing', 'contact'];

export default function Navigation() {
  const { lang, toggleLang } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isMobileOpen, setIsMobileOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const drawerRef   = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // scroll detection
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // active section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
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
  }, []);

  // body scroll lock
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  // drawer open animation
  useEffect(() => {
    if (!isMobileOpen) return;
    const slideFrom = lang === 'ar' ? '-100%' : '100%';
    if (backdropRef.current) {
      gsap.fromTo(backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      );
    }
    if (drawerRef.current) {
      gsap.fromTo(drawerRef.current,
        { x: slideFrom },
        { x: '0%', duration: 0.4, ease: 'power3.out' }
      );
    }
    gsap.fromTo('.drawer-link',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.055, delay: 0.18, ease: 'power2.out' }
    );
  }, [isMobileOpen, lang]);

  const closeDrawer = () => {
    const slideTo = lang === 'ar' ? '-100%' : '100%';
    if (backdropRef.current) {
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.2 });
    }
    if (drawerRef.current) {
      gsap.to(drawerRef.current, {
        x: slideTo,
        duration: 0.32,
        ease: 'power3.in',
        onComplete: () => setIsMobileOpen(false),
      });
    } else {
      setIsMobileOpen(false);
    }
  };

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 80,
      behavior: 'smooth',
    });
  };

  const onLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const wasOpen = isMobileOpen;
    if (wasOpen) closeDrawer();
    setTimeout(() => scrollToSection(href), wasOpen ? 360 : 0);
  };

  const onCtaClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const wasOpen = isMobileOpen;
    if (wasOpen) closeDrawer();
    setTimeout(() => scrollToSection('#contact'), wasOpen ? 360 : 0);
  };

  const isActive  = (link: NavLink) =>
    link.isRoute
      ? location.pathname.startsWith(link.href)
      : activeSection === link.href.replace('#', '');
  const getLabel  = (link: NavLink) => lang === 'ar' ? link.labelAr : link.labelEn;

  return (
    <div>

      {/* ── Nav bar ──────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[rgba(248,246,242,0.96)] backdrop-blur-xl border-b border-[var(--border)] shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-7 h-7 bg-[var(--ink)] rounded-md grid grid-cols-2 gap-[3px] p-[6px] transition-transform duration-300 group-hover:scale-105">
                <span className="bg-white rounded-[1px]"></span>
                <span className="bg-white/50 rounded-[1px]"></span>
                <span className="bg-white/50 rounded-[1px]"></span>
                <span className="bg-white/20 rounded-[1px]"></span>
              </div>
              <span className="text-[15px] font-bold tracking-tight text-[var(--ink)]">
                Stackora
                <span className="text-[var(--accent)]">Labs</span>
              </span>
            </a>

            {/* Desktop links */}
            <ul className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => {
                const active = isActive(link);
                const cls = `relative flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                  active
                    ? 'text-[var(--ink)] bg-[var(--bg-2)]'
                    : 'text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--bg-2)]'
                }`;
                return (
                  <li key={link.href}>
                    {link.isRoute ? (
                      <Link to={link.href} className={cls}>
                        <link.Icon className="w-[14px] h-[14px] opacity-50 shrink-0" />
                        {getLabel(link)}
                        {active && (
                          <span className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[var(--accent)]"></span>
                        )}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e: MouseEvent<HTMLAnchorElement>) => onLinkClick(e, link.href)}
                        className={cls}
                      >
                        <link.Icon className="w-[14px] h-[14px] opacity-50 shrink-0" />
                        {getLabel(link)}
                        {active && (
                          <span className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[var(--accent)]"></span>
                        )}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Right controls */}
            <div className="flex items-center gap-2 shrink-0">

              {/* Lang toggle */}
              <button
                type="button"
                onClick={toggleLang}
                aria-label="Toggle language"
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--border)] text-[11px] font-bold tracking-widest transition-all hover:border-[var(--accent)]/40 hover:bg-[var(--accent-light)]"
              >
                <span className={lang === 'ar' ? 'text-[var(--accent)]' : 'text-[var(--muted)]'}>ع</span>
                <span className="text-[var(--muted-2)] opacity-50">/</span>
                <span className={lang === 'en' ? 'text-[var(--accent)]' : 'text-[var(--muted)]'}>EN</span>
              </button>

              {/* CTA button */}
              <a
                href="#contact"
                onClick={onCtaClick}
                className="hidden sm:inline-flex btn btn-accent text-[11px] py-2.5 px-5"
              >
                {lang === 'ar' ? 'ابدأ مشروعك' : 'Start a Project'}
              </a>

              {/* Hamburger */}
              <button
                type="button"
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open menu"
                className="lg:hidden p-2 rounded-lg hover:bg-[var(--bg-2)] transition-colors"
              >
                <Menu className="w-5 h-5 text-[var(--ink)]" />
              </button>

            </div>
            {/* end right controls */}

          </div>
          {/* end flex row */}

        </div>
        {/* end container */}

      </nav>
      {/* end nav */}

      {/* ── Mobile drawer ─────────────────────────────────────────── */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[60]">

          {/* Backdrop */}
          <div
            ref={backdropRef}
            onClick={closeDrawer}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          ></div>

          {/* Drawer panel */}
          <div
            ref={drawerRef}
            className={`absolute top-0 bottom-0 ${
              lang === 'ar' ? 'left-0' : 'right-0'
            } w-[min(88vw,380px)] bg-white flex flex-col shadow-2xl`}
          >

            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 h-[72px] border-b border-[var(--border)] shrink-0">
              <span className="text-[15px] font-bold tracking-tight text-[var(--ink)]">
                Stackora
                <span className="text-[var(--accent)]">Labs</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleLang}
                  aria-label="Toggle language"
                  className="px-2.5 py-1.5 rounded-lg border border-[var(--border)] text-[11px] font-bold text-[var(--muted)] hover:text-[var(--ink)] transition-all"
                >
                  {lang === 'en' ? 'ع' : 'EN'}
                </button>
                <button
                  type="button"
                  onClick={closeDrawer}
                  aria-label="Close menu"
                  className="p-2 rounded-lg hover:bg-[var(--bg-2)] transition-colors"
                >
                  <X className="w-5 h-5 text-[var(--ink)]" />
                </button>
              </div>
            </div>
            {/* end drawer header */}

            {/* Drawer links */}
            <div className="flex-1 overflow-y-auto px-3 py-3">
              <ul className="space-y-0.5">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link);
                  const cls = `flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-all ${
                    active
                      ? 'bg-[var(--accent-light)] text-[var(--accent)]'
                      : 'text-[var(--ink-2)] hover:bg-[var(--bg-2)]'
                  }`;
                  return (
                    <li key={link.href} className="drawer-link">
                      {link.isRoute ? (
                        <Link to={link.href} className={cls} onClick={closeDrawer}>
                          <link.Icon className="w-[18px] h-[18px] opacity-60 shrink-0" />
                          <span className="flex-1">{getLabel(link)}</span>
                          {active && <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0"></span>}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          onClick={(e: MouseEvent<HTMLAnchorElement>) => onLinkClick(e, link.href)}
                          className={cls}
                        >
                          <link.Icon className="w-[18px] h-[18px] opacity-60 shrink-0" />
                          <span className="flex-1">{getLabel(link)}</span>
                          {active && <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0"></span>}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* end drawer links */}

            {/* Drawer footer */}
            <div className="px-4 pb-6 pt-3 border-t border-[var(--border)] shrink-0">
              <a
                href="#contact"
                onClick={onCtaClick}
                className="btn btn-accent w-full justify-center py-3.5 text-[13px]"
              >
                {lang === 'ar' ? 'ابدأ مشروعك' : 'Start a Project'}
              </a>
              <p className="text-center text-[11px] text-[var(--muted-2)] mt-3">
                hello@stackoralabs.com
              </p>
            </div>
            {/* end drawer footer */}

          </div>
          {/* end drawer panel */}

        </div>
      )}
      {/* end mobile drawer */}

    </div>
  );
}