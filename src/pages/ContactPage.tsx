import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useLanguage } from '@/context/LanguageContext';

import Contact from '@/sections/Contact';
import CTABand from '@/sections/CTABand';

export default function ContactPage() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.page-hero-content',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        className="dark-section pt-32 pb-20 relative overflow-hidden"
      >
        {/* Radial gradient decoration */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(43,92,230,0.15) 0%, transparent 70%)',
          }}
        />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/40 text-[12px] font-medium tracking-wider uppercase mb-6">
            <Link to="/" className="hover:text-white/70 transition-colors">
              {t('Home', 'الرئيسية')}
            </Link>
            <span className="opacity-50">/</span>
            <span className="text-white/60">{t('Contact', 'تواصل معنا')}</span>
          </div>

          <div className="page-hero-content max-w-3xl">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-4 h-px bg-[var(--accent)]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
                {t('Get In Touch', 'تواصل معنا')}
              </span>
            </div>

            <h1
              className="text-[clamp(40px,6vw,80px)] font-bold text-white leading-[0.95] mb-5"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t("Let's Build Something", 'لنبني شيئاً')}
              <br />
              <span className="gradient-text">{t('Exceptional.', 'استثنائياً.')}</span>
            </h1>

            <p className="text-white/50 text-[17px] leading-relaxed max-w-xl">
              {t(
                "Tell us about your brand and your project. We'll be in touch within the same business day with a clear next step — no sales pitch, no obligation.",
                'أخبرنا عن علامتك التجارية ومشروعك. سنتواصل معك في نفس يوم العمل بخطوة واضحة تالية — بلا عرض بيع، بلا التزامات.'
              )}
            </p>
          </div>
        </div>
      </section>

      <Contact />
      <CTABand />
    </>
  );
}
