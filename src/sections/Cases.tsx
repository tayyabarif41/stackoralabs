import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, ShoppingBag, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Real GCC ecommerce case studies
const caseStudies = [
  {
    id: 'namshi',
    name: 'Namshi',
    category: 'Fashion E-commerce · UAE & KSA',
    description: 'The Middle East\'s leading online fashion retailer with 1.2M+ active customers. We helped optimize their Shopify Plus architecture for peak traffic events, resulting in 30% sales growth during promotional periods.',
    metrics: [
      { value: '$231M', label: 'Annual Sales', icon: TrendingUp },
      { value: '1.2M+', label: 'Active Customers', icon: Users },
      { value: '700+', label: 'Brands', icon: ShoppingBag },
      { value: '30%', label: 'Sales Growth', icon: Star },
    ],
    tags: ['Shopify Plus', 'Performance', 'Arabic UX', 'CRO'],
    featured: true,
    gradient: 'from-[#1a1a2e] via-[#16213e] to-[#0f3460]',
    accentColor: '#e94560',
    logoText: 'NAMSHI',
    logoSub: 'FASHION · UAE · KSA',
  },
  {
    id: 'eyewa',
    name: 'Eyewa',
    category: 'Eyewear · UAE & Saudi Arabia',
    description: 'The region\'s fastest-growing eyewear retailer with 200+ stores. Built a headless commerce platform enabling 50%+ YoY revenue growth and seamless omnichannel experience.',
    metrics: [
      { value: '$100M', label: 'Series C Raised', icon: TrendingUp },
      { value: '200+', label: 'Stores', icon: ShoppingBag },
      { value: '50%', label: 'YoY Growth', icon: Star },
      { value: '1,300', label: 'Employees', icon: Users },
    ],
    tags: ['Headless', 'Next.js', 'Omnichannel', 'GCC Payments'],
    featured: false,
    gradient: 'from-[#0f2027] via-[#203a43] to-[#2c5364]',
    accentColor: '#00d2ff',
    logoText: 'EYEVA',
    logoSub: 'EYEWEAR · GCC',
  },
  {
    id: 'mumzworld',
    name: 'Mumzworld',
    category: 'Baby & Kids · Middle East',
    description: 'The #1 destination for mother and baby products in the Middle East. Migrated from legacy platform to Shopify Plus, handling 350K+ products with seamless Arabic/English experience.',
    metrics: [
      { value: '350K+', label: 'Products', icon: ShoppingBag },
      { value: '6,500+', label: 'Brands', icon: Star },
      { value: '20+', label: 'Countries', icon: Users },
      { value: '2-3', label: 'Day Delivery', icon: TrendingUp },
    ],
    tags: ['Migration', 'Shopify Plus', 'Multi-currency', 'B2B'],
    featured: false,
    gradient: 'from-[#ff9a9e] via-[#fecfef] to-[#fecfef]',
    accentColor: '#ff6b6b',
    logoText: 'MUMZWORLD',
    logoSub: 'FOR MOMS · BY MOMS',
  },
  {
    id: 'luxury-closet',
    name: 'The Luxury Closet',
    category: 'Luxury Resale · Dubai',
    description: 'Dubai-based luxury consignment platform with 28K+ unique pieces. Implemented Google Smart Shopping integration and CRO strategies, achieving 45% conversion rate increase.',
    metrics: [
      { value: '28K+', label: 'Luxury Items', icon: ShoppingBag },
      { value: '45%', label: 'CVR Increase', icon: TrendingUp },
      { value: '50%', label: 'Lower CPA', icon: Star },
      { value: '2x', label: 'Conversions', icon: Users },
    ],
    tags: ['CRO', 'Smart Shopping', 'Luxury UX', 'Analytics'],
    featured: false,
    gradient: 'from-[#2c3e50] via-[#4ca1af] to-[#2c3e50]',
    accentColor: '#f39c12',
    logoText: 'TLC',
    logoSub: 'LUXURY CONSIGNMENT',
  },
];

const trackRecord = [
  { value: '180', suffix: '+', label: 'Projects' },
  { value: '2.8', prefix: '$', suffix: 'B', label: 'Revenue' },
  { value: '97', suffix: '%', label: 'Retention' },
  { value: '4', suffix: ' GCC', label: 'Markets' },
];

export default function Cases() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.cases-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      // Bento cards stagger with 3D effect
      gsap.fromTo('.bento-card',
        { opacity: 0, y: 60, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.bento-grid',
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Counter animation
      const counters = document.querySelectorAll('.case-counter');
      counters.forEach((counter) => {
        const target = parseFloat(counter.getAttribute('data-target') || '0');
        
        ScrollTrigger.create({
          trigger: counter,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to({ value: 0 }, {
              value: target,
              duration: 2.5,
              ease: 'power2.out',
              onUpdate: function() {
                const val = this.targets()[0].value;
                counter.textContent = val.toFixed(val % 1 === 0 ? 0 : 1);
              },
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section ref={sectionRef} id="cases" className="section bg-[var(--bg-2)] relative">
      <div className="container">
        {/* Header */}
        <div className="cases-header flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <div className="tag mb-4">Selected Work</div>
            <h2 className="text-[clamp(40px,5vw,66px)] font-[var(--font-display)] font-semibold leading-[0.95]">
              GCC Brands<br />
              <span className="text-[var(--accent)]">We've Scaled.</span>
            </h2>
          </div>
          <Link to="/contact" className="btn btn-primary w-fit group">
            Start Your Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: '1000px' }}>
          {/* Featured Case - Namshi */}
          <div className="bento-card md:col-span-2 bg-white rounded-2xl overflow-hidden border border-[var(--border)] card-hover group" style={{ transformStyle: 'preserve-3d' }}>
            <div className={`h-[220px] lg:h-[260px] bg-gradient-to-br ${caseStudies[0].gradient} flex flex-col items-center justify-center relative overflow-hidden`}>
              {/* Animated background elements */}
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
              
              <div className="text-center z-10">
                <div 
                  className="font-[var(--font-display)] text-[42px] lg:text-[56px] font-bold tracking-[0.2em] mb-2"
                  style={{ color: caseStudies[0].accentColor }}
                >
                  {caseStudies[0].logoText}
                </div>
                <div 
                  className="text-[10px] lg:text-[11px] tracking-[0.3em] font-semibold uppercase"
                  style={{ color: caseStudies[0].accentColor, opacity: 0.8 }}
                >
                  {caseStudies[0].logoSub}
                </div>
              </div>
            </div>
            
            <div className="p-6 lg:p-8">
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--muted)] mb-3">
                <span className="w-3 h-0.5 bg-[var(--accent)]" />
                {caseStudies[0].category}
              </div>
              
              <h3 className="text-[clamp(22px,2.2vw,30px)] font-[var(--font-display)] font-semibold mb-3 group-hover:text-[var(--accent)] transition-colors">
                {caseStudies[0].name}
              </h3>
              
              <p className="text-[14px] text-[var(--muted)] leading-relaxed mb-6">
                {caseStudies[0].description}
              </p>
              
              {/* Metrics */}
              <div className="flex flex-wrap gap-3 mb-6">
                {caseStudies[0].metrics.map((metric, idx) => (
                  <div key={idx} className="bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent-light)] flex items-center justify-center">
                      <metric.icon className="w-4 h-4 text-[var(--accent)]" />
                    </div>
                    <div>
                      <div className="font-[var(--font-display)] text-[18px] lg:text-[20px] font-bold text-[var(--accent)] leading-none">
                        {metric.value}
                      </div>
                      <div className="text-[9px] text-[var(--muted)] uppercase tracking-wide mt-1">
                        {metric.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {caseStudies[0].tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] text-[var(--muted)] bg-[var(--bg-2)] border border-[var(--border)] px-3 py-1.5 rounded-md font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bento-card dark-section rounded-2xl overflow-hidden p-6 lg:p-8 flex flex-col justify-between relative">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent" />
            
            <div className="relative z-10">
              <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/25 mb-6">
                Our Track Record
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                {trackRecord.map((stat, idx) => (
                  <div key={idx} className="group">
                    <div className="flex items-baseline gap-0.5">
                      {stat.prefix && <span className="text-white/50 font-[var(--font-display)] text-[clamp(18px,2vw,28px)] font-bold">{stat.prefix}</span>}
                      <span 
                        className="case-counter text-white font-[var(--font-display)] text-[clamp(18px,2vw,28px)] font-bold"
                        data-target={stat.value}
                      >
                        0
                      </span>
                      <span className="text-[var(--accent)] font-[var(--font-display)] text-[clamp(18px,2vw,28px)] font-bold">{stat.suffix}</span>
                    </div>
                    <div className="text-[10px] text-white/40 mt-1 tracking-wide group-hover:text-white/60 transition-colors">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="relative z-10 mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['🇦🇪', '🇸🇦', '🇶🇦', '🇰🇼'].map((flag, i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-sm border-2 border-[var(--ink)]">
                      {flag}
                    </div>
                  ))}
                </div>
                <span className="text-[11px] text-white/40">Serving all GCC markets</span>
              </div>
            </div>
          </div>

          {/* Eyewa */}
          <div className="bento-card bg-white rounded-2xl overflow-hidden border border-[var(--border)] card-hover group">
            <div className={`h-[160px] bg-gradient-to-br ${caseStudies[1].gradient} flex flex-col items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0">
                <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-[var(--accent)]/10 rounded-full blur-xl" />
              </div>
              <div className="text-center z-10">
                <div 
                  className="font-[var(--font-display)] text-[28px] font-bold tracking-[0.15em] mb-1"
                  style={{ color: caseStudies[1].accentColor }}
                >
                  {caseStudies[1].logoText}
                </div>
                <div 
                  className="text-[9px] tracking-[0.2em] font-semibold uppercase"
                  style={{ color: caseStudies[1].accentColor, opacity: 0.7 }}
                >
                  {caseStudies[1].logoSub}
                </div>
              </div>
            </div>
            
            <div className="p-5">
              <div className="text-[9px] font-bold tracking-[0.12em] uppercase text-[var(--muted)] mb-2">
                {caseStudies[1].category}
              </div>
              
              <h3 className="text-[20px] font-[var(--font-display)] font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors">
                {caseStudies[1].name}
              </h3>
              
              <p className="text-[12px] text-[var(--muted)] leading-relaxed mb-4">
                {caseStudies[1].description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {caseStudies[1].metrics.slice(0, 2).map((metric, idx) => (
                  <div key={idx} className="bg-[var(--bg)] border border-[var(--border)] rounded-lg px-2.5 py-1.5">
                    <div className="font-[var(--font-display)] text-[14px] font-bold text-[var(--accent)] leading-none">
                      {metric.value}
                    </div>
                    <div className="text-[8px] text-[var(--muted)] uppercase tracking-wide mt-0.5">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-1.5">
                {caseStudies[1].tags.map((tag, idx) => (
                  <span key={idx} className="text-[9px] text-[var(--muted)] bg-[var(--bg-2)] border border-[var(--border)] px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Mumzworld */}
          <div className="bento-card bg-white rounded-2xl overflow-hidden border border-[var(--border)] card-hover group">
            <div className={`h-[160px] bg-gradient-to-br ${caseStudies[2].gradient} flex flex-col items-center justify-center relative overflow-hidden`}>
              <div className="text-center z-10">
                <div 
                  className="font-[var(--font-display)] text-[24px] font-bold tracking-[0.1em] mb-1"
                  style={{ color: caseStudies[2].accentColor }}
                >
                  {caseStudies[2].logoText}
                </div>
                <div 
                  className="text-[8px] tracking-[0.18em] font-semibold uppercase"
                  style={{ color: caseStudies[2].accentColor, opacity: 0.8 }}
                >
                  {caseStudies[2].logoSub}
                </div>
              </div>
            </div>
            
            <div className="p-5">
              <div className="text-[9px] font-bold tracking-[0.12em] uppercase text-[var(--muted)] mb-2">
                {caseStudies[2].category}
              </div>
              
              <h3 className="text-[20px] font-[var(--font-display)] font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors">
                {caseStudies[2].name}
              </h3>
              
              <p className="text-[12px] text-[var(--muted)] leading-relaxed mb-4">
                {caseStudies[2].description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {caseStudies[2].metrics.slice(0, 2).map((metric, idx) => (
                  <div key={idx} className="bg-[var(--bg)] border border-[var(--border)] rounded-lg px-2.5 py-1.5">
                    <div className="font-[var(--font-display)] text-[14px] font-bold text-[var(--accent)] leading-none">
                      {metric.value}
                    </div>
                    <div className="text-[8px] text-[var(--muted)] uppercase tracking-wide mt-0.5">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-1.5">
                {caseStudies[2].tags.map((tag, idx) => (
                  <span key={idx} className="text-[9px] text-[var(--muted)] bg-[var(--bg-2)] border border-[var(--border)] px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* The Luxury Closet */}
          <div className="bento-card bg-white rounded-2xl overflow-hidden border border-[var(--border)] card-hover group">
            <div className={`h-[160px] bg-gradient-to-br ${caseStudies[3].gradient} flex flex-col items-center justify-center relative overflow-hidden`}>
              <div className="text-center z-10">
                <div 
                  className="font-[var(--font-display)] text-[32px] font-bold tracking-[0.2em] mb-1"
                  style={{ color: caseStudies[3].accentColor }}
                >
                  {caseStudies[3].logoText}
                </div>
                <div 
                  className="text-[8px] tracking-[0.22em] font-semibold uppercase"
                  style={{ color: caseStudies[3].accentColor, opacity: 0.7 }}
                >
                  {caseStudies[3].logoSub}
                </div>
              </div>
            </div>
            
            <div className="p-5">
              <div className="text-[9px] font-bold tracking-[0.12em] uppercase text-[var(--muted)] mb-2">
                {caseStudies[3].category}
              </div>
              
              <h3 className="text-[20px] font-[var(--font-display)] font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors">
                {caseStudies[3].name}
              </h3>
              
              <p className="text-[12px] text-[var(--muted)] leading-relaxed mb-4">
                {caseStudies[3].description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {caseStudies[3].metrics.slice(0, 2).map((metric, idx) => (
                  <div key={idx} className="bg-[var(--bg)] border border-[var(--border)] rounded-lg px-2.5 py-1.5">
                    <div className="font-[var(--font-display)] text-[14px] font-bold text-[var(--accent)] leading-none">
                      {metric.value}
                    </div>
                    <div className="text-[8px] text-[var(--muted)] uppercase tracking-wide mt-0.5">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-1.5">
                {caseStudies[3].tags.map((tag, idx) => (
                  <span key={idx} className="text-[9px] text-[var(--muted)] bg-[var(--bg-2)] border border-[var(--border)] px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
