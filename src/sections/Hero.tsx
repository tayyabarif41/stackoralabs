import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set('.hero-word', { y: '120%', opacity: 0, rotateX: 45 });
      gsap.set(pillRef.current, { y: 30, opacity: 0, scale: 0.9 });
      gsap.set(descRef.current, { y: 30, opacity: 0 });
      gsap.set(actionsRef.current, { y: 30, opacity: 0 });
      gsap.set('.hero-stat-item', { y: 40, opacity: 0 });
      gsap.set('.hero-orb', { scale: 0, opacity: 0 });

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // Orbs appear
      tl.to('.hero-orb', {
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'elastic.out(1, 0.5)',
      }, 0);

      // Pill animation
      tl.to(pillRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
      }, 0.2);

      // Words stagger animation with 3D effect
      tl.to('.hero-word', {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
      }, 0.3);

      // Description
      tl.to(descRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
      }, 0.8);

      // Actions
      tl.to(actionsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
      }, 0.9);

      // Stats
      tl.to('.hero-stat-item', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      }, 1);

      // Parallax on scroll
      gsap.to(headingRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 1,
        },
      });

      // Orbs parallax
      gsap.to('.hero-orb-1', {
        y: -150,
        x: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to('.hero-orb-2', {
        y: -100,
        x: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      });

      // Counter animation
      const counters = document.querySelectorAll('.counter');
      counters.forEach((counter) => {
        const target = parseFloat(counter.getAttribute('data-target') || '0');
        const decimals = parseInt(counter.getAttribute('data-decimals') || '0');
        
        ScrollTrigger.create({
          trigger: counter,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to({ value: 0 }, {
              value: target,
              duration: 2.5,
              ease: 'power2.out',
              onUpdate: function() {
                const val = this.targets()[0].value;
                counter.textContent = decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toString();
              },
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Animated Background Orbs */}
      <div ref={orbsRef} className="absolute inset-0 z-0 pointer-events-none">
        <div className="hero-orb hero-orb-1 absolute top-[15%] right-[5%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(43,92,230,0.12)_0%,transparent_70%)] rounded-full" />
        <div className="hero-orb hero-orb-2 absolute bottom-[25%] left-[0%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(184,146,42,0.08)_0%,transparent_70%)] rounded-full" />
        <div className="hero-orb hero-orb-3 absolute top-[40%] right-[20%] w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(43,92,230,0.06)_0%,transparent_70%)] rounded-full" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(var(--ink) 1px, transparent 1px),
              linear-gradient(90deg, var(--ink) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[var(--accent)]/20 rounded-full animate-float" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-[var(--accent)]/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-[var(--gold)]/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Content */}
      <div className="container relative z-10 flex-1 flex flex-col justify-end pb-16 pt-32">
        {/* Pill Badge */}
        <div
          ref={pillRef}
          className="inline-flex items-center gap-3 bg-white border border-[var(--border)] rounded-full px-5 py-2.5 w-fit mb-10 shadow-sm hover:shadow-md hover:border-[var(--accent)]/30 transition-all cursor-default group"
        >
          <div className="w-6 h-6 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[12px] font-medium text-[var(--muted)] tracking-wide">
            Dubai's Premier Ecommerce Engineering Partner
          </span>
          <span className="flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[var(--accent)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
          </span>
        </div>

        {/* Heading */}
        <h1
          ref={headingRef}
          className="text-[clamp(52px,11vw,150px)] font-[var(--font-display)] font-semibold leading-[0.85] tracking-tight mb-12"
          style={{ perspective: '1000px' }}
        >
          <span className="block overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
            <span className="hero-word inline-block">Built</span>
          </span>
          <span className="block overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
            <span className="hero-word inline-block">for</span>{' '}
            <span className="hero-word inline-block text-[var(--accent)]">GCC</span>
          </span>
          <span className="block overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
            <span className="hero-word inline-block">Commerce.</span>
          </span>
        </h1>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <p
            ref={descRef}
            className="text-[16px] lg:text-[18px] text-[var(--muted)] leading-relaxed max-w-[500px]"
          >
            We engineer Shopify stores, custom ecommerce systems and commerce infrastructure 
            for UAE, Saudi Arabia, Qatar and Kuwait's fastest-growing brands.
          </p>

          <div ref={actionsRef} className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="btn btn-primary group"
            >
              Start a Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#cases"
              onClick={(e) => handleScrollTo(e, '#cases')}
              className="btn btn-secondary group"
            >
              <Play className="w-4 h-4" />
              View Work
            </a>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div ref={statsRef} className="relative z-10 border-t border-[var(--border)] bg-white/50 backdrop-blur-sm">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            <div className="hero-stat-item py-6 lg:py-8 border-r border-[var(--border)] px-4 lg:px-6 first:pl-0 group hover:bg-white/50 transition-colors">
              <div className="font-[var(--font-display)] text-[clamp(32px,3.5vw,48px)] font-bold leading-none tracking-tight group-hover:text-[var(--accent)] transition-colors">
                <span className="counter" data-target="180">0</span>
                <span className="text-[var(--accent)]">+</span>
              </div>
              <div className="text-[11px] text-[var(--muted)] mt-2 font-medium tracking-wide">
                Projects Delivered
              </div>
            </div>
            
            <div className="hero-stat-item py-6 lg:py-8 border-r border-[var(--border)] px-4 lg:px-6 group hover:bg-white/50 transition-colors">
              <div className="font-[var(--font-display)] text-[clamp(32px,3.5vw,48px)] font-bold leading-none tracking-tight group-hover:text-[var(--accent)] transition-colors">
                $<span className="counter" data-target="2.8" data-decimals="1">0</span>
                <span className="text-[var(--accent)]">B</span>
              </div>
              <div className="text-[11px] text-[var(--muted)] mt-2 font-medium tracking-wide">
                Revenue Processed
              </div>
            </div>
            
            <div className="hero-stat-item py-6 lg:py-8 border-r border-[var(--border)] px-4 lg:px-6 group hover:bg-white/50 transition-colors">
              <div className="font-[var(--font-display)] text-[clamp(32px,3.5vw,48px)] font-bold leading-none tracking-tight group-hover:text-[var(--accent)] transition-colors">
                <span className="counter" data-target="4">0</span>
                <span className="text-[var(--accent)]"> GCC</span>
              </div>
              <div className="text-[11px] text-[var(--muted)] mt-2 font-medium tracking-wide">
                Markets Served
              </div>
            </div>
            
            <div className="hero-stat-item py-6 lg:py-8 px-4 lg:px-6 last:pr-0 group hover:bg-white/50 transition-colors">
              <div className="font-[var(--font-display)] text-[clamp(32px,3.5vw,48px)] font-bold leading-none tracking-tight group-hover:text-[var(--accent)] transition-colors">
                <span className="counter" data-target="97">0</span>
                <span className="text-[var(--accent)]">%</span>
              </div>
              <div className="text-[11px] text-[var(--muted)] mt-2 font-medium tracking-wide">
                Client Retention
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
