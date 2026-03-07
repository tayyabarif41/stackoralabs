import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X, LayoutGrid, Briefcase, GitBranch, Tag, MessageCircle } from 'lucide-react';

const navLinks = [
  { href: '#services', label: 'Services', icon: LayoutGrid },
  { href: '#cases', label: 'Work', icon: Briefcase },
  { href: '#process', label: 'Process', icon: GitBranch },
  { href: '#pricing', label: 'Pricing', icon: Tag },
  { href: '#contact', label: 'Contact', icon: MessageCircle },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.fromTo(mobileMenuRef.current,
          { y: '-100%', opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
        );
        gsap.fromTo('.mobile-nav-link',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, delay: 0.2, ease: 'power3.out' }
        );
      }
    }
  }, [isMobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[rgba(248,246,242,0.95)] backdrop-blur-xl border-b border-[var(--border)]'
            : 'bg-transparent'
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 bg-[var(--ink)] rounded-md grid grid-cols-2 gap-0.5 p-1.5 transition-transform duration-300 group-hover:scale-105">
                <span className="bg-white rounded-[1px]" />
                <span className="bg-white/50 rounded-[1px]" />
                <span className="bg-white/50 rounded-[1px]" />
                <span className="bg-white/20 rounded-[1px]" />
              </div>
              <span className="font-[var(--font-body)] text-[15px] font-bold tracking-tight text-[var(--ink)]">
                Stackora<span className="text-[var(--accent)]">Labs</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-[var(--muted)] rounded-lg transition-all duration-200 hover:text-[var(--ink)] hover:bg-[var(--bg-2)]"
                  >
                    <link.icon className="w-4 h-4 opacity-60" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="hidden sm:inline-flex btn btn-accent py-3 px-5 text-[11px]"
              >
                Start a Project
              </a>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-[var(--bg-2)] transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-[var(--ink)]" />
                ) : (
                  <Menu className="w-5 h-5 text-[var(--ink)]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 bg-white flex flex-col pt-24 px-8 pb-10"
        >
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href} className="mobile-nav-link border-b border-[var(--border)]">
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="flex items-center gap-4 py-5 text-[clamp(28px,6vw,44px)] font-[var(--font-display)] font-semibold text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                >
                  <link.icon className="w-6 h-6 opacity-50" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="btn btn-accent w-full justify-center"
            >
              Start a Project
            </a>
          </div>
        </div>
      )}
    </>
  );
}
