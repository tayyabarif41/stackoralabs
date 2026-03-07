import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const featuredTestimonial = {
  quote: "StackoraLabs didn't just build our store. They understood what it means to sell to a GCC customer — the expectations, the trust signals, the payment preferences. No other agency came close.",
  author: 'Sara Al-Mansouri',
  role: 'CEO, LUMÉ Collective — Dubai',
  rating: 5,
};

const miniTestimonials = [
  {
    quote: "We had a Magento store costing us 40% in abandoned carts. StackoraLabs migrated us to Shopify Plus in 8 weeks with zero data loss. Checkout abandonment dropped from 71% to 38%.",
    author: 'Khalid Al-Harbi',
    role: 'Founder, TERRA KSA — Riyadh',
    rating: 5,
  },
  {
    quote: "The Next.js headless build achieved 1.4s load times. The 3D product viewer they built became our biggest differentiator. We're now on monthly retainer.",
    author: 'James Whitfield',
    role: 'CTO, FORMA Home — Abu Dhabi',
    rating: 5,
  },
];

const ratings = [
  { score: '5.0', platform: 'Google Reviews' },
  { score: '4.9', platform: 'Clutch.co' },
  { score: '97%', platform: 'Client Retention', subtext: 'across 180+ projects' },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.testi-header',
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

      // Featured card
      gsap.fromTo('.testi-featured',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testi-layout',
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Mini cards
      gsap.fromTo('.testi-mini',
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testi-layout',
            start: 'top 75%',
            once: true,
          },
        }
      );

      // Rating bar
      gsap.fromTo('.testi-ratings',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testi-ratings',
            start: 'top 90%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="testi" className="section bg-[var(--bg)]">
      <div className="container">
        {/* Header */}
        <div className="testi-header flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <div className="tag mb-4">Client Voices</div>
            <h2 className="text-[clamp(40px,5vw,66px)] font-[var(--font-display)] font-semibold leading-[0.95]">
              Trusted Across<br />
              <span className="text-[var(--accent)]">the GCC.</span>
            </h2>
          </div>
          <p className="text-[14px] text-[var(--muted)] leading-relaxed max-w-[320px]">
            Real results from real brands across UAE, Saudi Arabia and the wider Gulf region.
          </p>
        </div>

        {/* Layout */}
        <div className="testi-layout grid lg:grid-cols-[1.4fr_1fr] gap-5 mb-12">
          {/* Featured Testimonial */}
          <div className="testi-featured bg-[var(--ink)] rounded-2xl p-8 lg:p-12 flex flex-col justify-between min-h-[480px] relative overflow-hidden">
            {/* Quote mark */}
            <div className="absolute top-4 right-8 text-[200px] font-[var(--font-display)] text-[rgba(43,92,230,0.1)] leading-none select-none">
              "
            </div>
            
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex gap-1 mb-8">
                {[...Array(featuredTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#F5C518] text-[#F5C518]" />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="text-[clamp(18px,2.2vw,26px)] font-[var(--font-display)] text-white leading-relaxed italic mb-10">
                "{featuredTestimonial.quote}"
              </blockquote>
            </div>
            
            {/* Author */}
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-lg font-semibold border-2 border-white/15">
                🇦🇪
              </div>
              <div>
                <div className="text-[14px] font-semibold text-white">{featuredTestimonial.author}</div>
                <div className="text-[11px] text-white/50">{featuredTestimonial.role}</div>
              </div>
            </div>
          </div>

          {/* Mini Testimonials */}
          <div className="flex flex-col gap-5">
            {miniTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testi-mini bg-white border border-[var(--border)] rounded-xl p-6 lg:p-7 flex-1 flex flex-col justify-between card-hover relative overflow-hidden"
              >
                {/* Quote mark */}
                <div className="absolute top-2 right-5 text-[80px] font-[var(--font-display)] text-[var(--accent-light)] leading-none select-none">
                  "
                </div>
                
                <div className="relative z-10">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[var(--gold)] text-[var(--gold)]" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-[13px] text-[var(--muted)] leading-relaxed italic mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
                
                {/* Author */}
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[var(--bg-2)] flex items-center justify-center text-[var(--ink)] text-sm font-semibold border border-[var(--border)]">
                    {index === 0 ? '🇸🇦' : '🇦🇪'}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-[var(--ink)]">{testimonial.author}</div>
                    <div className="text-[10px] text-[var(--muted)]">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ratings Bar */}
        <div className="testi-ratings flex flex-wrap items-center justify-center gap-6 lg:gap-10 py-6 px-8 bg-white border border-[var(--border)] rounded-full">
          {ratings.map((rating, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="font-[var(--font-display)] text-[22px] font-bold text-[var(--ink)]">
                {rating.score}
              </div>
              <div>
                {index < 2 && (
                  <div className="flex gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#F5C518] text-[#F5C518]" />
                    ))}
                  </div>
                )}
                <div className="text-[11px] text-[var(--muted)]">
                  {rating.platform}
                </div>
                {rating.subtext && (
                  <div className="text-[10px] text-[var(--muted-2)]">{rating.subtext}</div>
                )}
              </div>
              {index < ratings.length - 1 && (
                <div className="hidden lg:block w-px h-6 bg-[var(--border)] ml-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
