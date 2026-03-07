import {
  ShoppingBag, Zap, Globe, CreditCard,
  TrendingUp, Gauge, Code2, Puzzle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations, useT } from '@/i18n/translation';

export default function ServicesStrip() {
  const { lang } = useLanguage();
  const t = useT(lang);
  const tx = translations.servicesStrip;

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

  return (
    <section className="reveal-section bg-[var(--ink)] py-24">
      <div className="container">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <span className="tag mb-3 border-white/20 text-white/60">{t(tx.heading)}</span>
            <h2 className="font-[var(--font-display)] text-[clamp(28px,4vw,48px)] font-bold text-white leading-tight">
              {t(tx.subheading)}
            </h2>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {cards.map((card, i) => (
            <div
              key={i}
              className="group relative bg-[var(--ink)] p-6 flex flex-col gap-3 hover:bg-[var(--ink-2)] transition-colors duration-300 cursor-default"
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