import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useLanguage } from '@/context/LanguageContext';
import Cases from '@/sections/Cases';
import CTABand from '@/sections/CTABand';

export default function WorkPage() {
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
    <div>
      {/* Hero */}
      <section ref={heroRef} className="dark-section pt-[140px] pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(43,92,230,0.12)_0%,transparent_65%)] translate-x-1/3 -translate-y-1/3" />
        </div>
        <div className="container relative z-10">
          <div className="page-hero-content max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Link to="/" className="text-white/40 hover:text-white/70 text-[12px] font-semibold uppercase tracking-wider transition-colors">
                {t('Home', 'الرئيسية')}
              </Link>
              <span className="text-white/20">/</span>
              <span className="text-white/60 text-[12px] font-semibold uppercase tracking-wider">{t('Work', 'أعمالنا')}</span>
            </div>
            <span className="tag mb-6 !text-white/50 before:!bg-white/30">{t('Our Work', 'أعمالنا')}</span>
            <h1 className="text-[clamp(44px,7vw,88px)] font-[var(--font-display)] font-semibold leading-[0.9] text-white mb-6">
              {t('GCC Brands', 'علامات خليجية')}<br />
              <span className="text-[var(--accent)]">{t("We've Scaled.", 'نجحنا في تنميتها.')}</span>
            </h1>
            <p className="text-white/50 text-[17px] leading-relaxed max-w-xl">
              {t(
                'Real results for real brands across Saudi Arabia, UAE, Kuwait, and Qatar. Every build engineered for performance, conversion, and growth.',
                'نتائج حقيقية لعلامات تجارية حقيقية في السعودية والإمارات والكويت وقطر. كل بناء مهندس للأداء والتحويل والنمو.'
              )}
            </p>
          </div>
        </div>
      </section>

      <Cases />
      <CTABand />
    </div>
  );
}
