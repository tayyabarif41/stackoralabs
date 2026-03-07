import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations, useT } from '@/i18n/translation';

export default function Positioning() {
  const { lang } = useLanguage();
  const t = useT(lang);
  const tx = translations.positioning;

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

  return (
    <section className="reveal-section section bg-[var(--bg)]">
      <div className="container">

        <span className="tag mb-10">{t(tx.tag)}</span>

        {/* Featured dark card */}
        <div className="bg-[var(--ink)] rounded-2xl p-10 md:p-14 mb-6">
          <div className="max-w-[640px]">
            <h2 className="font-[var(--font-display)] text-[clamp(28px,4vw,52px)] font-bold text-white leading-tight mb-6">
              {t(tx.featured_title)}
            </h2>
            <p className="text-white/60 text-[16px] leading-relaxed mb-8">
              {t(tx.featured_body)}
            </p>
            <ul className="space-y-3">
              {bullets.map((bullet, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80 text-[14px]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4 feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-[var(--bg-2)] rounded-2xl p-7 border border-[var(--border)] card-hover group"
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