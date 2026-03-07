import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate orbs on scroll
      const orbs = document.querySelectorAll('.bg-orb');
      
      orbs.forEach((orb, index) => {
        // Floating animation
        gsap.to(orb, {
          y: `${(index + 1) * 30}`,
          x: `${(index % 2 === 0 ? 1 : -1) * 20}`,
          duration: 4 + index,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      // Parallax on scroll
      gsap.to('.bg-orb-1', {
        y: -200,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      gsap.to('.bg-orb-2', {
        y: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      });

      gsap.to('.bg-orb-3', {
        y: -300,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(var(--ink) 1px, transparent 1px),
            linear-gradient(90deg, var(--ink) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      <div className="bg-orb bg-orb-1 absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(43,92,230,0.08)_0%,transparent_70%)] rounded-full" />
      <div className="bg-orb bg-orb-2 absolute top-[30%] -left-[15%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(184,146,42,0.05)_0%,transparent_70%)] rounded-full" />
      <div className="bg-orb bg-orb-3 absolute top-[60%] right-[5%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(43,92,230,0.06)_0%,transparent_70%)] rounded-full" />
      
      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
