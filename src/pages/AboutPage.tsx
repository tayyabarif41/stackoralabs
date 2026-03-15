import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

import About from '@/sections/About';
import Positioning from '@/sections/Positioning';
import WhyUs from '@/sections/WhyUs';
import Testimonials from '@/sections/Testimonials';
import CTABand from '@/sections/CTABand';

export default function AboutPage() {
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
            <span className="text-white/60">About</span>
          </div>

          <div className="page-hero-content max-w-3xl">
            {/* Tag */}
            <div className="flex items-center gap-2 mb-5">
              <span className="w-4 h-px bg-[var(--accent)]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
                Our Story
              </span>
            </div>

            {/* Heading */}
            <h1
              className="text-[clamp(40px,6vw,80px)] font-bold text-white leading-[0.95] mb-5"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Built for
              <br />
              <span className="gradient-text">GCC Commerce.</span>
            </h1>

            {/* Subheading */}
            <p className="text-white/50 text-[17px] leading-relaxed max-w-xl">
              We've spent years mastering the nuances of the Gulf ecommerce
              market — from Arabic UX to regional payment gateways and what it
              truly takes to scale in KSA, UAE, Kuwait and Qatar.
            </p>
          </div>
        </div>
      </section>

      <About />
      <Positioning />
      <WhyUs />
      <Testimonials />
      <CTABand />
    </>
  );
}
