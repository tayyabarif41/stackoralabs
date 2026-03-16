import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function NotFound() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.nf-content > *',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1, delay: 0.1 }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="dark-section min-h-[80vh] flex items-center relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(43,92,230,0.12) 0%, transparent 70%)' }}
      />

      <div className="container relative z-10 py-32">
        <div className="nf-content max-w-2xl">
          {/* 404 label */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-4 h-px bg-[var(--accent)]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
              404 Error
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-[clamp(64px,12vw,160px)] font-bold text-white leading-none mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Oops.
          </h1>

          <h2
            className="text-[clamp(22px,3vw,36px)] font-bold text-white/80 mb-5 leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Page Not Found
          </h2>

          <p className="text-white/50 text-[17px] leading-relaxed max-w-md mb-10">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-white text-[14px] font-semibold hover:opacity-90 transition-opacity"
            >
              ← Back to Home
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/70 text-[14px] font-semibold hover:border-white/40 hover:text-white transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
