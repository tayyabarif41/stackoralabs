import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Store, 
  Zap, 
  Palette, 
  CreditCard, 
  TrendingUp,
  Gauge,
  Globe,
  Code,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Store,
    title: 'Shopify Development',
    description: 'Custom stores that convert',
  },
  {
    icon: Zap,
    title: 'Shopify Plus',
    description: 'Enterprise commerce solutions',
  },
  {
    icon: Palette,
    title: 'Arabic-First UX',
    description: 'Culturally adapted design',
  },
  {
    icon: CreditCard,
    title: 'GCC Payments',
    description: 'Tap, Tabby, Tamara & more',
  },
  {
    icon: TrendingUp,
    title: 'CRO & Growth',
    description: 'Data-driven optimisation',
  },
  {
    icon: Gauge,
    title: 'Core Web Vitals',
    description: 'Sub-2s load times',
  },
  {
    icon: Globe,
    title: 'Headless Commerce',
    description: 'Next.js + Shopify API',
  },
  {
    icon: Code,
    title: 'Custom Apps',
    description: 'Bespoke functionality',
  },
];

export default function ServicesStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards entrance animation
      gsap.fromTo('.service-strip-card',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-[var(--ink)] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[rgba(43,92,230,0.08)] rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[rgba(184,146,42,0.05)] rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-[11px] font-semibold tracking-wider uppercase text-white/60">
              Our Services
            </span>
          </div>
          <h3 className="text-[clamp(24px,3vw,36px)] font-[var(--font-display)] text-white">
            Everything You Need to <span className="text-[var(--accent)]">Win in GCC</span>
          </h3>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-strip-card group relative bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[var(--accent)]/30 rounded-xl p-5 transition-all duration-300 cursor-pointer"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-[var(--accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/20 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-[var(--accent)]/30 transition-all duration-300">
                  <service.icon className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <h4 className="text-[14px] font-semibold text-white mb-1 group-hover:text-[var(--accent)] transition-colors">
                  {service.title}
                </h4>
                <p className="text-[11px] text-white/40 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex items-center gap-1 mt-3 text-[10px] text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
