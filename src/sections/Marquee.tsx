import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  'Shopify Development',
  'CRO Engineering',
  'Custom Ecommerce',
  'Shopify Plus',
  'Performance Optimisation',
  'Arabic RTL',
  'GCC Payment Gateways',
  'Headless Commerce',
  'Core Web Vitals',
  'B2B Portals',
];

export default function Marquee() {
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Speed up marquee on scroll
      ScrollTrigger.create({
        trigger: track1Ref.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity() / 1000);
          const speedMultiplier = 1 + Math.min(velocity * 0.5, 2);
          
          if (track1Ref.current) {
            track1Ref.current.style.animationDuration = `${36 / speedMultiplier}s`;
          }
          if (track2Ref.current) {
            track2Ref.current.style.animationDuration = `${40 / speedMultiplier}s`;
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="dark-section py-5 overflow-hidden">
      {/* First Track - Left to Right */}
      <div className="relative mb-3">
        <div
          ref={track1Ref}
          className="flex whitespace-nowrap animate-marquee"
          style={{ width: 'max-content' }}
        >
          {[...services, ...services].map((service, index) => (
            <div
              key={index}
              className="flex items-center gap-5 px-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/40">
                {service}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Second Track - Right to Left (reverse) */}
      <div className="relative opacity-50">
        <div
          ref={track2Ref}
          className="flex whitespace-nowrap"
          style={{ 
            width: 'max-content',
            animation: 'marquee 40s linear infinite reverse',
          }}
        >
          {[...services.slice().reverse(), ...services.slice().reverse()].map((service, index) => (
            <div
              key={index}
              className="flex items-center gap-5 px-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30">
                {service}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
