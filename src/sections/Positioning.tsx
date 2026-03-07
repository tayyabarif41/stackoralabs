import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Globe, Rocket, Building2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    number: '01',
    title: 'Ecommerce-Only Focus',
    description: 'Every engineer, designer and strategist works exclusively on ecommerce. No generalist dilution, no divided attention.',
    icon: Zap,
  },
  {
    number: '02',
    title: 'GCC-Native Understanding',
    description: 'We understand regional payment gateways, Arabic RTL UX patterns, UAE VAT, KSA Zakat and GCC consumer buying behaviour deeply.',
    icon: Globe,
  },
  {
    number: '03',
    title: 'Performance Engineering First',
    description: 'Speed is not an afterthought. Core Web Vitals benchmarking and performance budgets are agreed before a single line of code is written.',
    icon: Rocket,
  },
  {
    number: '04',
    title: 'Enterprise-Ready Architecture',
    description: 'Built to scale. Headless options, OMS/ERP integrations, multi-store multi-market architecture — from day one, not as an afterthought.',
    icon: Building2,
  },
];

export default function Positioning() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Featured card animation
      gsap.fromTo('.pos-featured',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pos-featured',
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Grid cards stagger
      gsap.fromTo('.pos-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pos-grid',
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="position" className="section bg-[var(--bg)]">
      <div className="container">
        <div className="tag mb-8">Why We're Different</div>

        <div className="pos-grid grid lg:grid-cols-2 gap-0.5 bg-[var(--border)] rounded-2xl overflow-hidden border border-[var(--border)]">
          {/* Featured Card */}
          <div className="pos-featured lg:col-span-2 bg-[var(--ink)] p-8 lg:p-12 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/40 mb-4">
                Our Promise
              </div>
              <h3 className="text-[clamp(24px,3vw,40px)] font-[var(--font-display)] font-semibold text-white leading-tight">
                We build stores your competitors will study and your customers will return to.
              </h3>
            </div>
            
            <ul className="space-y-4">
              {[
                'Sub-2s load times across the GCC CDN network',
                'Culturally adapted Arabic UX — not just translation',
                'Tap, HyperPay, PayTabs, Moyasar, Telr, Tabby, Tamara',
                'VAT + Zakat compliance engineering for UAE and KSA',
              ].map((item, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-3 text-[13px] text-white/60 leading-relaxed"
                >
                  <ArrowRight className="w-4 h-4 text-[var(--accent)] mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Feature Cards */}
          {features.map((feature, index) => (
            <div
              key={index}
              className="pos-card bg-white p-8 lg:p-10 hover:bg-[var(--bg)] transition-colors duration-300 group"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--accent)]">
                  {feature.number}
                </span>
                <feature.icon className="w-5 h-5 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors" />
              </div>
              
              <h4 className="text-[clamp(18px,1.8vw,24px)] font-[var(--font-display)] font-semibold mb-3 leading-tight">
                {feature.title}
              </h4>
              
              <p className="text-[13px] text-[var(--muted)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
