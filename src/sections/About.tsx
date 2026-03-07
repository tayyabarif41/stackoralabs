import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '180', suffix: '+', label: 'Ecommerce Projects' },
  { value: '2.8', prefix: '$', suffix: 'B', label: 'Revenue Processed', decimals: 1 },
  { value: '4', suffix: ' GCC', label: 'Markets Served' },
  { value: '97', suffix: '%', label: 'Client Retention' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation
      const counters = document.querySelectorAll('.about-counter');
      counters.forEach((counter) => {
        const target = parseFloat(counter.getAttribute('data-target') || '0');
        const decimals = parseInt(counter.getAttribute('data-decimals') || '0');
        
        ScrollTrigger.create({
          trigger: counter,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to({ value: 0 }, {
              value: target,
              duration: 2,
              ease: 'power2.out',
              onUpdate: function() {
                const val = this.targets()[0].value;
                counter.textContent = decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toString();
              },
            });
          },
        });
      });

      // Stat boxes stagger
      gsap.fromTo('.stat-box',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
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
    <section ref={sectionRef} id="about" className="section bg-[var(--bg)]">
      <div className="container">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="reveal-section">
            <div className="tag mb-6">Our Positioning</div>
            
            <h2 className="text-[clamp(42px,5vw,68px)] font-[var(--font-display)] font-semibold leading-[0.95] mb-6">
              Not a Generic Agency.<br />
              <span className="text-[var(--accent)]">A Specialist Partner.</span>
            </h2>
            
            <p className="text-[15px] text-[var(--muted)] leading-relaxed max-w-[500px] mb-8">
              Most GCC agencies offer ecommerce as one of twenty services. We offer it as our 
              only one — which is why our clients convert better, launch faster, and scale 
              further than anyone else in the region.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <a
                href="#services"
                onClick={(e) => handleScrollTo(e, '#services')}
                className="btn btn-primary"
              >
                Our Services
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#cases"
                onClick={(e) => handleScrollTo(e, '#cases')}
                className="btn btn-secondary"
              >
                See Work
              </a>
            </div>
          </div>

          {/* Right Stats Grid */}
          <div ref={statsRef} className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`stat-box bg-white border border-[var(--border)] rounded-xl p-6 lg:p-7 card-hover ${
                  index === 1 ? 'lg:mt-6' : index === 3 ? 'lg:-mt-6' : ''
                }`}
              >
                <div className="flex items-start gap-1 mb-2">
                  {stat.prefix && (
                    <span className="font-[var(--font-display)] text-[clamp(28px,3vw,42px)] font-bold leading-none">
                      {stat.prefix}
                    </span>
                  )}
                  <span 
                    className="about-counter font-[var(--font-display)] text-[clamp(28px,3vw,42px)] font-bold leading-none"
                    data-target={stat.value}
                    data-decimals={stat.decimals || 0}
                  >
                    0
                  </span>
                  <span className="font-[var(--font-display)] text-[clamp(28px,3vw,42px)] font-bold leading-none text-[var(--accent)]">
                    {stat.suffix}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span className="text-[11px] text-[var(--muted)] font-medium tracking-wide">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
