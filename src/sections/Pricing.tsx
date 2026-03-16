import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X, ArrowRight, Sparkles, Zap, Building2, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  const { t } = useLanguage();
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const plans = [
    {
      nameEn: 'Launch',
      nameAr: 'الإطلاق',
      price: t('$6,999', '٦,٩٩٩ $'),
      periodEn: 'one-time · 6–8 weeks',
      periodAr: 'مرة واحدة · ٦–٨ أسابيع',
      descEn: 'Perfect for new brands ready to enter the GCC market with a professional storefront.',
      descAr: 'مثالي للعلامات التجارية الجديدة الجاهزة لدخول سوق الخليج بواجهة متجر احترافية.',
      icon: Zap,
      features: [
        { en: 'Custom Shopify 2.0 theme (Arabic + English)', ar: 'قالب Shopify 2.0 مخصص (عربي + إنجليزي)', included: true },
        { en: 'Up to 100 products + collection setup', ar: 'حتى ١٠٠ منتج + إعداد المجموعات', included: true },
        { en: '1 GCC payment gateway (Tap or PayTabs)', ar: 'بوابة دفع خليجية واحدة (Tap أو PayTabs)', included: true },
        { en: 'Core Web Vitals optimisation', ar: 'تحسين مؤشرات الويب الأساسية', included: true },
        { en: 'Klaviyo welcome + abandon flows', ar: 'تدفقات الترحيب والتخلي في Klaviyo', included: true },
        { en: '30-day post-launch support', ar: 'دعم ٣٠ يوماً بعد الإطلاق', included: true },
        { en: 'Custom app development', ar: 'تطوير تطبيقات مخصصة', included: false },
        { en: 'ERP / OMS integration', ar: 'تكامل ERP / OMS', included: false },
      ],
      ctaEn: 'Get Started',
      ctaAr: 'ابدأ الآن',
      ctaStyle: 'outline',
      featured: false,
    },
    {
      nameEn: 'Scale',
      nameAr: 'النمو',
      price: t('$18,999', '١٨,٩٩٩ $'),
      periodEn: 'one-time · 10–14 weeks',
      periodAr: 'مرة واحدة · ١٠–١٤ أسبوعاً',
      descEn: 'For growing brands that need enterprise features and multi-market capabilities.',
      descAr: 'للعلامات التجارية النامية التي تحتاج ميزات مؤسسية وقدرات متعددة الأسواق.',
      icon: Sparkles,
      features: [
        { en: 'Fully custom Shopify Plus design system', ar: 'نظام تصميم Shopify Plus مخصص بالكامل', included: true },
        { en: 'Unlimited products + full data migration', ar: 'منتجات غير محدودة + ترحيل بيانات كامل', included: true },
        { en: 'All GCC payment gateways + BNPL', ar: 'جميع بوابات الدفع الخليجية + BNPL', included: true },
        { en: 'CRO audit + 3-month optimisation roadmap', ar: 'تدقيق CRO + خارطة طريق تحسين ٣ أشهر', included: true },
        { en: '2 custom app or API integrations', ar: 'تكاملان مخصصان للتطبيق أو API', included: true },
        { en: 'Bilingual email + SMS automation', ar: 'أتمتة بريد إلكتروني + رسائل SMS ثنائية اللغة', included: true },
        { en: 'VAT + Zakat compliance engineering', ar: 'هندسة الامتثال لضريبة القيمة المضافة والزكاة', included: true },
        { en: '90-day post-launch support', ar: 'دعم ٩٠ يوماً بعد الإطلاق', included: true },
      ],
      ctaEn: 'Start Scaling',
      ctaAr: 'ابدأ النمو',
      ctaStyle: 'primary',
      featured: true,
      badgeEn: 'Most Popular',
      badgeAr: 'الأكثر طلباً',
    },
    {
      nameEn: 'Enterprise',
      nameAr: 'المؤسسات',
      price: t('Custom', 'مخصص'),
      periodEn: 'scoped to requirements',
      periodAr: 'يُحدد حسب المتطلبات',
      descEn: 'For established brands needing headless architecture and complex integrations.',
      descAr: 'للعلامات التجارية الراسخة التي تحتاج بنية headless وتكاملات معقدة.',
      icon: Building2,
      features: [
        { en: 'Dedicated senior engineering team', ar: 'فريق هندسة كبير مخصص', included: true },
        { en: 'Headless / composable architecture', ar: 'بنية headless / composable', included: true },
        { en: 'OMS, WMS and ERP integration', ar: 'تكامل OMS وWMS وERP', included: true },
        { en: 'Multi-store, multi-market, multi-currency', ar: 'متعدد المتاجر والأسواق والعملات', included: true },
        { en: 'Custom Shopify app development', ar: 'تطوير تطبيقات Shopify مخصصة', included: true },
        { en: '24/7 priority Slack support + SLA', ar: 'دعم Slack ذو أولوية ٢٤/٧ + SLA', included: true },
        { en: 'Monthly retainer option', ar: 'خيار عقد شهري', included: true },
        { en: 'Quarterly strategic reviews', ar: 'مراجعات استراتيجية ربع سنوية', included: true },
      ],
      ctaEn: 'Contact Us',
      ctaAr: 'تواصل معنا',
      ctaStyle: 'dark',
      featured: false,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pricing-header',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      gsap.fromTo('.pricing-card',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pricing-grid',
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} id="pricing" className="section bg-[var(--bg)] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse,rgba(43,92,230,0.06)_0%,transparent_70%)]" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="pricing-header text-center max-w-[600px] mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent)]/10 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[var(--accent)]">
              {t('Engagement Models', 'نماذج التعاون')}
            </span>
          </div>
          <h2 className="text-[clamp(40px,5vw,66px)] font-[var(--font-display)] font-semibold leading-[0.95] mb-4">
            {t('Transparent Investment.', 'استثمار شفاف.')}<br />
            <span className="text-[var(--accent)]">{t('No Surprises.', 'بلا مفاجآت.')}</span>
          </h2>
          <p className="text-[15px] text-[var(--muted)] leading-relaxed">
            {t(
              'All prices in USD. Scoped per project. No hidden fees, no ongoing retainer forced on you.',
              'جميع الأسعار بالدولار الأمريكي. تُحدد لكل مشروع. بلا رسوم خفية، بلا عقد شهري مفروض عليك.'
            )}
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="pricing-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card relative rounded-2xl transition-all duration-500 ${
                plan.featured
                  ? 'bg-[var(--ink)] text-white lg:-mt-4 lg:mb-4 shadow-2xl shadow-[var(--ink)]/20'
                  : 'bg-white border border-[var(--border)] hover:border-[var(--accent)]/30'
              } ${hoveredPlan === index ? 'shadow-xl' : ''}`}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Badge */}
              {plan.badgeEn && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white text-[10px] font-bold tracking-[0.1em] uppercase px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3 h-3" />
                  {t(plan.badgeEn, plan.badgeAr!)}
                </div>
              )}

              <div className="p-7 lg:p-8">
                {/* Icon & Name */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    plan.featured ? 'bg-[var(--accent)]/20' : 'bg-[var(--accent-light)]'
                  }`}>
                    <plan.icon className="w-5 h-5 text-[var(--accent)]" />
                  </div>
                  <div>
                    <div className={`text-[10px] font-bold tracking-[0.15em] uppercase mb-0.5 ${
                      plan.featured ? 'text-white/50' : 'text-[var(--muted)]'
                    }`}>
                      {t(plan.nameEn, plan.nameAr)}
                    </div>
                    <div className={`text-[11px] ${plan.featured ? 'text-white/40' : 'text-[var(--muted-2)]'}`}>
                      {t(plan.periodEn, plan.periodAr)}
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-3">
                  {plan.price !== t('Custom', 'مخصص') && (
                    <span className={`text-[18px] font-[var(--font-display)] ${
                      plan.featured ? 'text-white/50' : 'text-[var(--muted)]'
                    }`}>
                      $
                    </span>
                  )}
                  <span className={`font-[var(--font-display)] text-[clamp(40px,4.5vw,56px)] font-bold leading-none ${
                    plan.featured ? 'text-white' : 'text-[var(--ink)]'
                  }`}>
                    {plan.price}
                  </span>
                </div>

                {/* Description */}
                <p className={`text-[13px] leading-relaxed mb-6 ${
                  plan.featured ? 'text-white/50' : 'text-[var(--muted)]'
                }`}>
                  {t(plan.descEn, plan.descAr)}
                </p>

                <div className={`h-px mb-6 ${plan.featured ? 'bg-white/10' : 'bg-[var(--border)]'}`} />

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li
                      key={fidx}
                      className={`flex items-start gap-3 text-[12px] leading-relaxed ${
                        feature.included
                          ? plan.featured ? 'text-white/70' : 'text-[var(--muted)]'
                          : plan.featured ? 'text-white/30 line-through' : 'text-[var(--muted-2)] line-through'
                      }`}
                    >
                      {feature.included ? (
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.featured ? 'bg-[var(--accent)]/20' : 'bg-[var(--accent-light)]'
                        }`}>
                          <Check className="w-3 h-3 text-[var(--accent)]" />
                        </div>
                      ) : (
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.featured ? 'bg-white/5' : 'bg-[var(--bg-2)]'
                        }`}>
                          <X className={`w-3 h-3 ${plan.featured ? 'text-white/30' : 'text-[var(--muted-2)]'}`} />
                        </div>
                      )}
                      {t(feature.en, feature.ar)}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={(e) => handleScrollTo(e, '#contact')}
                  className={`w-full py-3.5 rounded-xl text-[12px] font-semibold tracking-[0.06em] uppercase transition-all duration-300 flex items-center justify-center gap-2 group ${
                    plan.ctaStyle === 'primary'
                      ? 'bg-white text-[var(--ink)] hover:bg-[var(--accent)] hover:text-white shadow-lg'
                      : plan.ctaStyle === 'dark'
                      ? 'bg-[var(--ink)] text-white hover:bg-[var(--ink-2)]'
                      : 'bg-transparent text-[var(--ink)] border-2 border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                  }`}
                >
                  {t(plan.ctaEn, plan.ctaAr)}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-white border border-[var(--border)] rounded-xl shadow-sm">
            <MessageCircle className="w-5 h-5 text-[var(--accent)]" />
            <span className="text-[13px] text-[var(--muted)]">
              {t('Not sure which plan fits?', 'غير متأكد من الخطة المناسبة؟')}
              <button
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="ml-2 text-[var(--accent)] font-semibold hover:underline"
              >
                {t("Let's talk", 'لنتحدث')}
              </button>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
