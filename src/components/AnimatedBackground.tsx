import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Floating animations on inner orbs (x/y drift) ──────────
      gsap.to('.orb-inner-1', {
        y: 40, x: 24,
        duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
      gsap.to('.orb-inner-2', {
        y: -36, x: -20,
        duration: 7.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
      gsap.to('.orb-inner-3', {
        y: 28, x: 18,
        duration: 5.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });

      // ── Parallax on outer wrappers (scroll-driven y only) ───────
      gsap.to('.orb-wrap-1', {
        y: -220,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
      gsap.to('.orb-wrap-2', {
        y: -140,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.8,
        },
      });
      gsap.to('.orb-wrap-3', {
        y: -320,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2.5,
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(var(--ink) 1px, transparent 1px),
            linear-gradient(90deg, var(--ink) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Orb 1 — top-right, accent blue */}
      <div className="orb-wrap-1 absolute -top-[10%] -right-[8%]">
        <div
          className="orb-inner-1 w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(43,92,230,0.18) 0%, rgba(43,92,230,0.06) 45%, transparent 70%)',
          }}
        />
      </div>

      {/* Orb 2 — mid-left, gold */}
      <div className="orb-wrap-2 absolute top-[25%] -left-[12%]">
        <div
          className="orb-inner-2 w-[580px] h-[580px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(184,146,42,0.14) 0%, rgba(184,146,42,0.04) 50%, transparent 70%)',
          }}
        />
      </div>

      {/* Orb 3 — lower-right, accent blue softer */}
      <div className="orb-wrap-3 absolute top-[55%] right-[2%]">
        <div
          className="orb-inner-3 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(43,92,230,0.13) 0%, rgba(43,92,230,0.04) 50%, transparent 70%)',
          }}
        />
      </div>

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
