import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations, useT } from '@/i18n/translation';

gsap.registerPlugin(ScrollTrigger);

export default function Positioning() {
  const { lang } = useLanguage();
  const t = useT(lang);
  const tx = translations.positioning;
  const sectionRef = useRef<HTMLElement>(null);

  const bullets = [
    t(tx.bullet1),
    t(tx.bullet2),
    t(tx.bullet3),
    t(tx.bullet4),
  ];

  const cards = [
    { num: t(tx.card1_num), title: t(tx.card1_title), body: t(tx.card1_body) },
    { num: t(tx.card2_num), title: t(tx.card2_title), body: t(tx.card2_body) },
    { num: t(tx.card3_num), title: t(tx.card3_title), body: t(tx.card3_body) },
    { num: t(tx.card4_num), title: t(tx.card4_title), body: t(tx.card4_body) },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Tag slides in from the side
      gsap.fromTo('.pos-tag',
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: '.pos-tag', start: 'top 88%', once: true } }
      );

      // Featured dark card sweeps up
      gsap.fromTo('.pos-featured',
        { opacity: 0, y: 60, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.pos-featured', start: 'top 82%', once: true } }
      );

      // Heading inside featured card
      gsap.fromTo('.pos-featured-h2',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', delay: 0.12,
          scrollTrigger: { trigger: '.pos-featured', start: 'top 82%', once: true } }
      );

      // Body text
      gsap.fromTo('.pos-featured-body',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.22,
          scrollTrigger: { trigger: '.pos-featured', start: 'top 82%', once: true } }
      );

      // Bullet points stagger
      gsap.fromTo('.pos-bullet',
        { opacity: 0, x: -18 },
        { opacity: 1, x: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out', delay: 0.32,
          scrollTrigger: { trigger: '.pos-featured', start: 'top 82%', once: true } }
      );

      // Feature cards stagger up with slight 3-D tilt
      gsap.fromTo('.pos-card',
        { opacity: 0, y: 48, rotateX: 8, scale: 0.96 },
        { opacity: 1, y: 0, rotateX: 0, scale: 1,
          duration: 0.65, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.pos-cards', start: 'top 82%', once: true } }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section bg-[var(--bg)]" style={{ perspective: '1200px' }}>
      <div className="container">

        <span className="pos-tag tag mb-10">{t(tx.tag)}</span>

        {/* Featured dark card */}
        <div className="pos-featured dark-section rounded-2xl p-10 md:p-14 mb-6">
          <div className="max-w-[640px]">
            <h2 className="pos-featured-h2 font-[var(--font-display)] text-[clamp(28px,4vw,52px)] font-bold text-white leading-tight mb-6">
              {t(tx.featured_title)}
            </h2>
            <p className="pos-featured-body text-white/60 text-[16px] leading-relaxed mb-8">
              {t(tx.featured_body)}
            </p>
            <ul className="space-y-3">
              {bullets.map((bullet, i) => (
                <li key={i} className="pos-bullet flex items-center gap-3 text-white/80 text-[14px]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4 feature cards */}
        <div className="pos-cards grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <div
              key={i}
              className="pos-card bg-[var(--bg-2)] rounded-2xl p-7 border border-[var(--border)] card-hover group"
            >
              <span className="block font-[var(--font-display)] text-[32px] font-bold text-[var(--accent)]/20 group-hover:text-[var(--accent)]/40 transition-colors mb-4 leading-none">
                {card.num}
              </span>
              <h3 className="text-[var(--ink)] font-bold text-[15px] mb-2">
                {card.title}
              </h3>
              <p className="text-[var(--muted)] text-[13px] leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
