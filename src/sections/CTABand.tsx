import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTABand() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
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
    <section ref={sectionRef} id="cta" className="py-24 lg:py-32 dark-section relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(43,92,230,0.15)_0%,transparent_70%)]" />
      
      <div className="container relative z-10">
        <div className="cta-content max-w-[800px]">
          <div className="tag mb-6 !text-white/40 before:!bg-white/30">
            Ready to Dominate GCC Ecommerce?
          </div>
          
          <h2 className="text-[clamp(44px,6.5vw,88px)] font-[var(--font-display)] font-semibold text-white leading-[0.9] mb-6">
            Your Competitors Are Already Investing in This.
          </h2>
          
          <p className="text-[16px] lg:text-[17px] text-white/50 leading-relaxed max-w-[480px] mb-10">
            The GCC ecommerce market grows at 23% annually. The brands that invest in 
            engineering-grade commerce infrastructure now will own the market in 3 years.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="btn btn-accent"
            >
              Book Free Strategy Session
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/work"
              className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20"
            >
              <Briefcase className="w-4 h-4" />
              See Our Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
