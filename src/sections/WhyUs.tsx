import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Globe, Zap, BarChart3, Shield, Handshake, Check, ArrowRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    number: '01',
    title: 'Ecommerce-Only Focus',
    description: 'Every engineer, designer and strategist works exclusively on ecommerce. Zero generalist dilution, zero divided attention.',
    icon: Target,
    details: ['Dedicated ecommerce teams', 'No generalist developers', 'Specialized expertise'],
  },
  {
    number: '02',
    title: 'GCC-Native Expertise',
    description: 'Regional payment gateways, Arabic RTL UX, UAE VAT, KSA Zakat and GCC consumer buying behaviour — we know it deeply.',
    icon: Globe,
    details: ['Tap, Tabby, Tamara BNPL', 'Arabic RTL engineering', 'VAT & Zakat compliance'],
  },
  {
    number: '03',
    title: 'Performance Engineering',
    description: 'Core Web Vitals benchmarking and performance budgets agreed before a single line of code is written. Speed is the product.',
    icon: Zap,
    details: ['Sub-2s load times', 'Core Web Vitals optimized', 'CDN strategy for GCC'],
  },
  {
    number: '04',
    title: 'Data-Driven Decisions',
    description: 'GA4, Hotjar, Klaviyo and Shopify analytics configured correctly from day one. Measurement is built in, not bolted on.',
    icon: BarChart3,
    details: ['Full-funnel analytics', 'CRO testing framework', 'Revenue attribution'],
  },
  {
    number: '05',
    title: 'Enterprise-Grade Security',
    description: 'PCI-DSS aligned builds, secure code reviews, penetration testing and UAE NESA cybersecurity compliance as standard.',
    icon: Shield,
    details: ['PCI-DSS compliant', 'Secure code reviews', 'NESA aligned'],
  },
  {
    number: '06',
    title: 'Long-Term Partnership',
    description: '97% client retention. Monthly retainers, CRO sprints and quarterly business reviews — we don\'t disappear after launch.',
    icon: Handshake,
    details: ['97% retention rate', 'Monthly CRO sprints', '24/7 support SLA'],
  },
];

export default function WhyUs() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.why-header',
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

      // Cards stagger with flip effect
      gsap.fromTo('.why-card',
        { opacity: 0, y: 60, rotateY: -15 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.why-cards',
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Quote strip
      gsap.fromTo('.why-quote',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.why-quote',
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="why" className="section bg-[var(--ink)] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(43,92,230,0.12)_0%,transparent_65%)] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(184,146,42,0.08)_0%,transparent_65%)] -translate-x-1/3 translate-y-1/3" />
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[var(--accent)]/30 rounded-full animate-float" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-[var(--accent)]/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-[var(--gold)]/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="why-header text-center max-w-[800px] mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-[11px] font-semibold tracking-wider uppercase text-white/60">
              Why StackoraLabs
            </span>
          </div>
          <h2 className="text-[clamp(36px,5vw,64px)] font-[var(--font-display)] font-semibold text-white leading-[0.95] mb-6">
            The GCC Deserves Better Than<br />
            <span className="text-[var(--accent)]">Generic Agencies.</span>
          </h2>
          <p className="text-[16px] text-white/50 leading-relaxed max-w-[600px] mx-auto">
            The region's ecommerce market is projected to reach $50B by 2025. Yet most brands 
            are served by generalist agencies who treat Shopify as a checkbox. We treat it as a discipline.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="why-cards grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16" style={{ perspective: '1000px' }}>
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="why-card group relative"
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className={`relative bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[var(--accent)]/30 rounded-2xl p-6 lg:p-8 transition-all duration-500 h-full ${
                activeCard === index ? 'shadow-[0_0_40px_rgba(43,92,230,0.15)]' : ''
              }`}>
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-2xl bg-[var(--accent)]/5 transition-opacity duration-500 ${
                  activeCard === index ? 'opacity-100' : 'opacity-0'
                }`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      activeCard === index 
                        ? 'bg-[var(--accent)] scale-110' 
                        : 'bg-[rgba(43,92,230,0.2)]'
                    }`}>
                      <reason.icon className={`w-5 h-5 transition-colors ${
                        activeCard === index ? 'text-white' : 'text-[var(--accent)]'
                      }`} />
                    </div>
                    <span className="font-[var(--font-display)] text-[48px] font-bold leading-none text-white/[0.06]">
                      {reason.number}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-[18px] font-semibold text-white mb-3 group-hover:text-[var(--accent)] transition-colors">
                    {reason.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-[13px] text-white/50 leading-relaxed mb-5">
                    {reason.description}
                  </p>
                  
                  {/* Details list */}
                  <ul className={`space-y-2 transition-all duration-500 ${
                    activeCard === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}>
                    {reason.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[11px] text-white/60">
                        <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--accent)] to-transparent transition-transform duration-500 origin-left ${
                  activeCard === index ? 'scale-x-100' : 'scale-x-0'
                }`} />
              </div>
            </div>
          ))}
        </div>

        {/* Quote Strip */}
        <div className="why-quote relative bg-gradient-to-r from-[rgba(43,92,230,0.15)] to-[rgba(43,92,230,0.05)] border border-[rgba(43,92,230,0.2)] rounded-2xl p-8 lg:p-10 overflow-hidden">
          {/* Quote icon */}
          <div className="absolute top-6 right-8 opacity-10">
            <Quote className="w-20 h-20 text-[var(--accent)]" />
          </div>
          
          <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <blockquote className="text-[clamp(18px,2vw,24px)] font-[var(--font-display)] text-white/90 leading-relaxed italic mb-6">
                "StackoraLabs didn't just build our store. They understood what it means to sell to 
                a GCC customer — the expectations, the trust signals, the payment preferences. 
                No other agency came close."
              </blockquote>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center text-white font-semibold">
                  SA
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-white">Sara Al-Mansouri</div>
                  <div className="text-[12px] text-white/40">CEO, LUMÉ Collective — Dubai</div>
                </div>
              </div>
            </div>
            
            {/* CTA */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white text-[var(--ink)] px-6 py-3 rounded-xl text-[12px] font-semibold tracking-wide hover:bg-[var(--accent)] hover:text-white transition-all group whitespace-nowrap"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
