import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations, useT } from '@/i18n/translation';

export default function About() {
  const { lang } = useLanguage();
  const t = useT(lang);
  const tx = translations.about;
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    { value: 180, suffix: '+', label: t(tx.stat1_label), raw: t(tx.stat1_value) },
    { value: 2.8, suffix: 'B', label: t(tx.stat2_label), raw: t(tx.stat2_value) },
    { value: 4,   suffix: '',  label: t(tx.stat3_label), raw: t(tx.stat3_value) },
    { value: 97,  suffix: '%', label: t(tx.stat4_label), raw: t(tx.stat4_value) },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-stat',
        { opacity: 0, y: 32, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-stats', start: 'top 80%', once: true },
        }
      );

      const counters = document.querySelectorAll<HTMLElement>('.about-counter');
      counters.forEach((el) => {
        const target = parseFloat(el.dataset.target || '0');
        const isDecimal = target % 1 !== 0;
        const suffix = el.dataset.suffix || '';

        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(
              { val: 0 },
              {
                val: target,
                duration: 2,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="reveal-section section bg-[var(--bg-2)]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: text */}
          <div>
            <span className="tag mb-6">{t(tx.tag)}</span>
            <h2 className="font-[var(--font-display)] text-[clamp(28px,4vw,52px)] font-bold text-[var(--ink)] leading-tight mb-6">
              {t(tx.heading)}
            </h2>
            <p className="text-[var(--muted)] text-[16px] leading-relaxed mb-4">
              {t(tx.body1)}
            </p>
            <p className="text-[var(--muted)] text-[16px] leading-relaxed mb-10">
              {t(tx.body2)}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#services" className="btn btn-primary gap-2">
                {t(tx.cta_services)}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#cases" className="btn btn-secondary gap-2">
                {t(tx.cta_work)}
              </a>
            </div>
          </div>

          {/* Right: stats grid */}
          <div className="about-stats grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="about-stat bg-white rounded-2xl p-7 border border-[var(--border)] card-hover"
              >
                <span
                  className="about-counter block font-[var(--font-display)] text-[42px] font-bold text-[var(--ink)] leading-none mb-2"
                  data-target={stat.value}
                  data-suffix={stat.suffix}
                >
                  {stat.raw}
                </span>
                <span className="text-[13px] text-[var(--muted)] font-medium">
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