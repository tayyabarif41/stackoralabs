import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ShoppingBag, Zap, Globe, CreditCard,
  TrendingUp, Gauge, Code2, Puzzle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations, useT } from '@/i18n/translation';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesStrip() {
  const { lang } = useLanguage();
  const t = useT(lang);
  const tx = translations.servicesStrip;
  const sectionRef = useRef<HTMLElement>(null);

  const cards = [
    { Icon: ShoppingBag, title: t(tx.card1_title), desc: t(tx.card1_desc) },
    { Icon: Zap,         title: t(tx.card2_title), desc: t(tx.card2_desc) },
    { Icon: Globe,       title: t(tx.card3_title), desc: t(tx.card3_desc) },
    { Icon: CreditCard,  title: t(tx.card4_title), desc: t(tx.card4_desc) },
    { Icon: TrendingUp,  title: t(tx.card5_title), desc: t(tx.card5_desc) },
    { Icon: Gauge,       title: t(tx.card6_title), desc: t(tx.card6_desc) },
    { Icon: Code2,       title: t(tx.card7_title), desc: t(tx.card7_desc) },
    { Icon: Puzzle,      title: t(tx.card8_title), desc: t(tx.card8_desc) },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Header slides up
      gsap.fromTo('.strip-header',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      );

      // Cards stagger in — each slides up from slight offset
      gsap.fromTo('.strip-card',
        { opacity: 0, y: 36, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1,
          duration: 0.55, stagger: { amount: 0.5, from: 'start' }, ease: 'power2.out',
          scrollTrigger: { trigger: '.strip-grid', start: 'top 82%', once: true } }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="dark-section py-24">
      <div className="container">

        {/* Header */}
        <div className="strip-header flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <span className="tag mb-3 border-white/20 text-white/60">{t(tx.heading)}</span>
            <h2 className="font-[var(--font-display)] text-[clamp(28px,4vw,48px)] font-bold text-white leading-tight">
              {t(tx.subheading)}
            </h2>
          </div>
        </div>

        {/* Cards grid */}
        <div className="strip-grid grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {cards.map((card, i) => (
            <div
              key={i}
              className="strip-card group relative bg-[#141210] p-6 flex flex-col gap-3 hover:bg-[#1C1A16] transition-colors duration-300 cursor-default"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[var(--accent)]/5" />

              <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-[var(--accent)] flex items-center justify-center transition-colors duration-300">
                <card.Icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-300" />
              </div>

              <div>
                <p className="text-white font-semibold text-[14px] leading-tight mb-1">{card.title}</p>
                <p className="text-white/40 text-[12px] leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
