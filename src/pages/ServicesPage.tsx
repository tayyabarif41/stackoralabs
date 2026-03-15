import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

import Services from '@/sections/Services';
import ServicesStrip from '@/sections/ServicesStrip';
import Pricing from '@/sections/Pricing';
import CTABand from '@/sections/CTABand';

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.page-hero-content',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        className="dark-section pt-32 pb-20 relative overflow-hidden"
      >
        {/* Radial gradient decoration */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(43,92,230,0.15) 0%, transparent 70%)',
          }}
        />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/40 text-[12px] font-medium tracking-wider uppercase mb-6">
            <Link to="/" className="hover:text-white/70 transition-colors">
              Home
            </Link>
            <span className="opacity-50">/</span>
            <span className="text-white/60">Services</span>
          </div>

          <div className="page-hero-content max-w-3xl">
            {/* Tag */}
            <div className="flex items-center gap-2 mb-5">
              <span className="w-4 h-px bg-[var(--accent)]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
                Our Services
              </span>
            </div>

            {/* Heading */}
            <h1
              className="text-[clamp(40px,6vw,80px)] font-bold text-white leading-[0.95] mb-5"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Everything Your Store
              <br />
              <span className="gradient-text">Needs to Win.</span>
            </h1>

            {/* Subheading */}
            <p className="text-white/50 text-[17px] leading-relaxed max-w-xl">
              Four core practices. Twenty-four services. One specialist team —
              built exclusively for GCC ecommerce.
            </p>
          </div>
        </div>
      </section>

      <Services />
      <ServicesStrip />
      <Pricing />
      <CTABand />
    </>
  );
}
