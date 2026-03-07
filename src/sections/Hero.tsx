import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations, useT } from '@/i18n/translation';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { lang } = useLanguage();
  const t = useT(lang);
  const tx = translations.hero;

  const headingRef = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = document.querySelectorAll('.hero-word');
      gsap.fromTo(words,
        { opacity: 0, rotateX: 45, y: 20 },
        { opacity: 1, rotateX: 0, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.3 }
      );

      gsap.fromTo('.hero-badge',
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.1 }
      );

      gsap.fromTo('.hero-sub',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.7 }
      );

      const counters = document.querySelectorAll<HTMLElement>('.hero-counter');
      counters.forEach((el) => {
        const target = parseFloat(el.dataset.target || '0');
        const isDecimal = target % 1 !== 0;
        const suffix = el.dataset.suffix || '';

        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(
              { val: 0 },
              {
                val: target,
                duration: 1.8,
                ease: 'power2.out',
                onUpdate: function () {
                  const v = this.targets()[0].val;
                  el.textContent = isDecimal
                    ? `$${v.toFixed(1)}B`
                    : `${Math.round(v)}${suffix}`;
                },
              }
            );
          },
        });
      });

      gsap.to('.hero-content', {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 180, suffix: '+', label: t(tx.stat1_label), raw: t(tx.stat1_value) },
    { value: 2.8, suffix: 'B', label: t(tx.stat2_label), raw: t(tx.stat2_value) },
    { value: 4,   suffix: '',  label: t(tx.stat3_label), raw: t(tx.stat3_value) },
    { value: 97,  suffix: '%', label: t(tx.stat4_label), raw: t(tx.stat4_value) },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-[var(--bg)]"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[var(--accent)]/5 blur-[120px] animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--gold)]/5 blur-[100px] animate-float-slow" />
      </div>

      <div className="container relative z-10 hero-content">
        <div className="pt-40 pb-16">

          {/* Badge */}
          <div className="hero-badge mb-8">
            <span className="tag inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
              </span>
              {t(tx.badge)}
            </span>
          </div>

          {/* Heading */}
          <div ref={headingRef} className="mb-8" style={{ perspective: '1000px' }}>
            <h1 className="font-[var(--font-display)] text-[clamp(48px,8vw,120px)] font-bold leading-[0.95] tracking-tight text-[var(--ink)]">
              {t(tx.heading1).split(' ').map((word, i) => (
                <span
                  key={i}
                  className="hero-word inline-block mr-[0.2em]"
                >
                  {word}
                </span>
              ))}
              <br />
              {t(tx.heading2).split(' ').map((word, i) => (
                <span
                  key={`h2-${i}`}
                  className="hero-word gradient-text inline-block mr-[0.2em]"
                >
                  {word}
                </span>
              ))}
            </h1>
          </div>

          {/* Subheading */}
          <p className="hero-sub max-w-[560px] text-[var(--muted)] text-[18px] leading-relaxed mb-10">
            {t(tx.subheading)}
          </p>

          {/* CTAs */}
          <div className="hero-sub flex flex-wrap items-center gap-4 mb-20">
            <a href="#contact" className="btn btn-accent gap-2 py-4 px-7 text-[14px]">
              {t(tx.cta_primary)}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#cases" className="btn btn-secondary gap-2 py-4 px-7 text-[14px]">
              <Play className="w-4 h-4" />
              {t(tx.cta_secondary)}
            </a>
          </div>

          {/* Stats bar */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 border-t border-[var(--border)] pt-8 pb-8 gap-y-8"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`flex flex-col gap-1 ${
                  i > 0 ? 'md:border-l md:border-[var(--border)] md:pl-8' : ''
                }`}
              >
                <span
                  className="hero-counter font-[var(--font-display)] text-[36px] font-bold text-[var(--ink)] leading-none"
                  data-target={stat.value}
                  data-suffix={stat.suffix}
                >
                  {stat.raw}
                </span>
                <span className="text-[12px] text-[var(--muted)] font-medium uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}