import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Figma, Code, TestTube, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Discovery & Audit',
    description: 'Business objectives, tech audit, competitive landscape and GCC market analysis. We define scope before writing a single line of code.',
    icon: Search,
    duration: 'Week 1-2',
  },
  {
    number: '02',
    title: 'Architecture & Design',
    description: 'Information architecture, Figma prototypes, bilingual design system, component library and technical specification — reviewed and signed off before build.',
    icon: Figma,
    duration: 'Week 3-4',
  },
  {
    number: '03',
    title: 'Engineering & Integration',
    description: 'Agile sprints with weekly demos. Shopify, APIs, payment gateways and third-party apps — all integrated and tested as we build.',
    icon: Code,
    duration: 'Week 5-10',
  },
  {
    number: '04',
    title: 'QA & Performance',
    description: 'Cross-device QA across 60+ browser and device combinations. Performance testing, load testing and Core Web Vitals verification before any go-live.',
    icon: TestTube,
    duration: 'Week 11-12',
  },
  {
    number: '05',
    title: 'Launch & Retain',
    description: 'Zero-downtime launch with rollback protocol. 90-day post-launch support, monthly CRO sprints and optional retainer engagement.',
    icon: Rocket,
    duration: 'Ongoing',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.process-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      // Timeline line progress
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.process-steps',
              start: 'top 70%',
              end: 'bottom 50%',
              scrub: 1,
            },
          }
        );
      }

      // Steps stagger animation
      gsap.fromTo('.process-step',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.process-steps',
            start: 'top 75%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="section bg-[var(--bg)]">
      <div className="container">
        {/* Header */}
        <div className="process-header grid lg:grid-cols-2 gap-8 lg:gap-20 items-end mb-16">
          <div>
            <div className="tag mb-4">How We Work</div>
            <h2 className="text-[clamp(40px,5vw,66px)] font-[var(--font-display)] font-semibold leading-[0.95]">
              Five Phases.<br />
              <span className="text-[var(--accent)]">Zero Guesswork.</span>
            </h2>
          </div>
          <p className="text-[15px] text-[var(--muted)] leading-relaxed">
            We follow a disciplined five-phase methodology used across all our GCC engagements — 
            from a 6-week Shopify launch to a 6-month enterprise commerce platform build.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[19px] lg:left-[23px] top-0 bottom-0 w-0.5 bg-[var(--border)]">
            <div 
              ref={lineRef}
              className="absolute inset-0 bg-[var(--accent)] origin-top"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>

          {/* Steps */}
          <div className="process-steps space-y-0">
            {steps.map((step, index) => (
              <div
                key={index}
                className="process-step relative grid grid-cols-[50px_1fr] lg:grid-cols-[60px_1fr] gap-6 lg:gap-8 py-8 border-b border-[var(--border)] last:border-b-0 group"
              >
                {/* Dot */}
                <div className="relative z-10">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white border-2 border-[var(--border)] flex items-center justify-center font-bold text-[12px] lg:text-[13px] text-[var(--muted)] group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] group-hover:text-white transition-all duration-300 group-hover:shadow-[0_0_0_6px_rgba(43,92,230,0.1)]">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="pt-1">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 lg:gap-4 mb-3">
                    <h3 className="text-[clamp(18px,2vw,22px)] font-[var(--font-display)] font-semibold group-hover:text-[var(--accent)] transition-colors">
                      {step.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-[var(--muted)] font-medium">
                      <step.icon className="w-3.5 h-3.5" />
                      {step.duration}
                    </div>
                  </div>
                  <p className="text-[13px] text-[var(--muted)] leading-relaxed max-w-[600px]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
