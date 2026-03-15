import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from '@/sections/Hero';
import ServicesStrip from '@/sections/ServicesStrip';
import About from '@/sections/About';
import Positioning from '@/sections/Positioning';
import Services from '@/sections/Services';
import Process from '@/sections/Process';
import Cases from '@/sections/Cases';
import WhyUs from '@/sections/WhyUs';
import Testimonials from '@/sections/Testimonials';
import Pricing from '@/sections/Pricing';
import Contact from '@/sections/Contact';
import CTABand from '@/sections/CTABand';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const ref = useLocation();
  const pageRef = useRef<HTMLDivElement>(null);
  const location = ref;

  // ── Scroll animations ──────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Generic section wrappers that have no internal animation
      //    (reveal-section class still on About, old ones removed above)
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 44 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%', once: true } }
        );
      });

      // 2. Horizontal line-rule dividers — wipe in from left
      gsap.utils.toArray<HTMLElement>('.sa-line').forEach((el) => {
        gsap.fromTo(el,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
        );
      });

      // 3. Numbers / highlight spans — count-up feel via clip
      gsap.utils.toArray<HTMLElement>('.sa-number').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, scale: 0.75 },
          { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(2)',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
        );
      });

      // 4. Image / visual blocks — subtle zoom-in
      gsap.utils.toArray<HTMLElement>('.sa-visual').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, scale: 0.95, y: 24 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 84%', once: true } }
        );
      });

      // 5. Stagger siblings — any group with .sa-stagger parent
      gsap.utils.toArray<HTMLElement>('.sa-stagger').forEach((parent) => {
        const children = parent.children;
        if (!children.length) return;
        gsap.fromTo(children,
          { opacity: 0, y: 36, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1,
            duration: 0.55, stagger: 0.09, ease: 'power2.out',
            scrollTrigger: { trigger: parent, start: 'top 83%', once: true } }
        );
      });

      // 6. Left-entry elements (tags, labels, breadcrumbs)
      gsap.utils.toArray<HTMLElement>('.sa-left').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: -28 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
        );
      });

      // 7. Right-entry elements
      gsap.utils.toArray<HTMLElement>('.sa-right').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: 28 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
        );
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  // ── Hash scroll on navigate-from-other-page ────────────────────
  useEffect(() => {
    if (!location.hash) return;
    const timeout = setTimeout(() => {
      const target = document.querySelector(location.hash);
      if (target) {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 80,
          behavior: 'smooth',
        });
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [location.hash]);

  return (
    <div ref={pageRef}>
      <Hero />
      <ServicesStrip />
      <About />
      <Positioning />
      <Services />
      <Process />
      <Cases />
      <WhyUs />
      <Testimonials />
      <Pricing />
      <Contact />
      <CTABand />
    </div>
  );
}
