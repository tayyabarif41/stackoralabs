import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X, ArrowRight, Sparkles, Zap, Building2, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Launch',
    price: '6,999',
    period: 'one-time · 6–8 weeks',
    description: 'Perfect for new brands ready to enter the GCC market with a professional storefront.',
    icon: Zap,
    features: [
      { text: 'Custom Shopify 2.0 theme (Arabic + English)', included: true },
      { text: 'Up to 100 products + collection setup', included: true },
      { text: '1 GCC payment gateway (Tap or PayTabs)', included: true },
      { text: 'Core Web Vitals optimisation', included: true },
      { text: 'Klaviyo welcome + abandon flows', included: true },
      { text: '30-day post-launch support', included: true },
      { text: 'Custom app development', included: false },
      { text: 'ERP / OMS integration', included: false },
    ],
    cta: 'Get Started',
    ctaStyle: 'outline',
    featured: false,
  },
  {
    name: 'Scale',
    price: '18,999',
    period: 'one-time · 10–14 weeks',
    description: 'For growing brands that need enterprise features and multi-market capabilities.',
    icon: Sparkles,
    features: [
      { text: 'Fully custom Shopify Plus design system', included: true },
      { text: 'Unlimited products + full data migration', included: true },
      { text: 'All GCC payment gateways + BNPL', included: true },
      { text: 'CRO audit + 3-month optimisation roadmap', included: true },
      { text: '2 custom app or API integrations', included: true },
      { text: 'Bilingual email + SMS automation', included: true },
      { text: 'VAT + Zakat compliance engineering', included: true },
      { text: '90-day post-launch support', included: true },
    ],
    cta: 'Start Scaling',
    ctaStyle: 'primary',
    featured: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'scoped to requirements',
    description: 'For established brands needing headless architecture and complex integrations.',
    icon: Building2,
    features: [
      { text: 'Dedicated senior engineering team', included: true },
      { text: 'Headless / composable architecture', included: true },
      { text: 'OMS, WMS and ERP integration', included: true },
      { text: 'Multi-store, multi-market, multi-currency', included: true },
      { text: 'Custom Shopify app development', included: true },
      { text: '24/7 priority Slack support + SLA', included: true },
      { text: 'Monthly retainer option', included: true },
      { text: 'Quarterly strategic reviews', included: true },
    ],
    cta: 'Contact Us',
    ctaStyle: 'dark',
    featured: false,
  },
];

export default function Pricing() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
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

      // Cards stagger with scale effect
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
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse,rgba(43,92,230,0.06)_0%,transparent_70%)]" />
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="pricing-header text-center max-w-[600px] mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent)]/10 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[var(--accent)]">
              Engagement Models
            </span>
          </div>
          <h2 className="text-[clamp(40px,5vw,66px)] font-[var(--font-display)] font-semibold leading-[0.95] mb-4">
            Transparent Investment.<br />
            <span className="text-[var(--accent)]">No Surprises.</span>
          </h2>
          <p className="text-[15px] text-[var(--muted)] leading-relaxed">
            All prices in USD. Scoped per project. No hidden fees, no ongoing retainer forced on you.
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
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white text-[10px] font-bold tracking-[0.1em] uppercase px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3 h-3" />
                  {plan.badge}
                </div>
              )}

              <div className="p-7 lg:p-8">
                {/* Icon & Name */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    plan.featured ? 'bg-[var(--accent)]/20' : 'bg-[var(--accent-light)]'
                  }`}>
                    <plan.icon className={`w-5 h-5 ${plan.featured ? 'text-[var(--accent)]' : 'text-[var(--accent)]'}`} />
                  </div>
                  <div>
                    <div className={`text-[10px] font-bold tracking-[0.15em] uppercase mb-0.5 ${
                      plan.featured ? 'text-white/50' : 'text-[var(--muted)]'
                    }`}>
                      {plan.name}
                    </div>
                    <div className={`text-[11px] ${plan.featured ? 'text-white/40' : 'text-[var(--muted-2)]'}`}>
                      {plan.period}
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-3">
                  {plan.price !== 'Custom' && (
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
                  {plan.description}
                </p>

                {/* Divider */}
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
                          <Check className={`w-3 h-3 ${plan.featured ? 'text-[var(--accent)]' : 'text-[var(--accent)]'}`} />
                        </div>
                      ) : (
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.featured ? 'bg-white/5' : 'bg-[var(--bg-2)]'
                        }`}>
                          <X className={`w-3 h-3 ${plan.featured ? 'text-white/30' : 'text-[var(--muted-2)]'}`} />
                        </div>
                      )}
                      {feature.text}
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
                  {plan.cta}
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
              Not sure which plan fits? 
              <button 
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="ml-2 text-[var(--accent)] font-semibold hover:underline"
              >
                Let's talk
              </button>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
