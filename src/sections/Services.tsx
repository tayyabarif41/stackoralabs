import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Store, 
  Zap, 
  Palette, 
  CreditCard, 
  Puzzle, 
  RefreshCw,
  Layers,
  Package,
  Users,
  Link2,
  LayoutGrid,
  Brain,
  TrendingUp,
  FlaskConical,
  Gauge,
  ShoppingCart,
  Mail,
  Search,
  Cloud,
  Shield,
  Settings,
  Database,
  Wifi,
  BarChart3,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: 'shopify', name: 'Shopify', count: '6 services', icon: Store },
  { id: 'custom', name: 'Custom Ecommerce', count: '6 services', icon: Layers },
  { id: 'cro', name: 'CRO & Growth', count: '6 services', icon: TrendingUp },
  { id: 'infra', name: 'Infrastructure', count: '6 services', icon: Cloud },
];

const servicesData: Record<string, Array<{ title: string; description: string; icon: React.ElementType }>> = {
  shopify: [
    { title: 'Custom Store Development', description: 'Shopify 2.0 stores built from scratch — unique design systems, bespoke sections and performance-first code. No templates, no shortcuts.', icon: Store },
    { title: 'Shopify Plus', description: 'Enterprise Shopify Plus — custom checkout extensions, B2B portals, multi-store architecture and Flow automation at scale.', icon: Zap },
    { title: 'Arabic-First UX Design', description: 'Bilingual design systems built for GCC users — culturally adapted, not just translated. Full RTL layout engineering.', icon: Palette },
    { title: 'GCC Payment Integration', description: 'Tap, HyperPay, PayTabs, Moyasar, Telr, Tabby and Tamara BNPL. All major regional gateways with custom checkout flows.', icon: CreditCard },
    { title: 'Shopify App Development', description: 'Custom public and private Shopify apps. From merchant admin tools to customer-facing extensions — if it doesn\'t exist, we build it.', icon: Puzzle },
    { title: 'Migration & Re-platforming', description: 'WooCommerce, Magento, Salla, Zid or OpenCart to Shopify. Zero-downtime migrations with full data integrity.', icon: RefreshCw },
  ],
  custom: [
    { title: 'Headless Commerce', description: 'Next.js + Shopify Storefront API. Decoupled frontends for brands that need total creative control and sub-second performance.', icon: Layers },
    { title: 'Custom OMS Integration', description: 'End-to-end order management connecting ecommerce with warehouse, fulfilment and logistics. Built for GCC last-mile complexity.', icon: Package },
    { title: 'B2B Commerce Portals', description: 'Wholesale portals, trade pricing, approval workflows and account-based purchasing for GCC enterprise procurement.', icon: Users },
    { title: 'ERP & CRM Integration', description: 'SAP, Oracle, Dynamics, Salesforce, Odoo — bidirectional real-time data sync between your store and business systems.', icon: Link2 },
    { title: 'Multi-vendor Marketplace', description: 'Build your own marketplace — vendor onboarding, commission management, product approval workflows and seller analytics.', icon: LayoutGrid },
    { title: 'AI Commerce Features', description: 'Personalised recommendations, AI search, dynamic pricing and demand forecasting built into your commerce stack.', icon: Brain },
  ],
  cro: [
    { title: 'CRO Audit & Strategy', description: 'Full-funnel audit — heatmaps, session recordings, funnel analytics. We identify revenue leaks and build a prioritised test roadmap.', icon: TrendingUp },
    { title: 'A/B & Multivariate Testing', description: 'Statistical-significance A/B testing on PDPs, checkout, homepage and cart. Every test is data-driven, every result actioned.', icon: FlaskConical },
    { title: 'Core Web Vitals & Speed', description: 'Sub-2s load time engineering — lazy loading, image optimisation, code splitting and CDN strategy for GCC users.', icon: Gauge },
    { title: 'Checkout Optimisation', description: 'Abandoned cart recovery, one-click upsells, express checkout flows, trust badges and post-purchase optimisation.', icon: ShoppingCart },
    { title: 'Email & SMS Automation', description: 'Klaviyo, Omnisend and regional SMS. Bilingual flows for welcome, abandonment, win-back and VIP retention.', icon: Mail },
    { title: 'GCC SEO', description: 'GCC keyword research, hreflang for Arabic/English, schema markup, sitemap engineering and Core Web Vitals alignment.', icon: Search },
  ],
  infra: [
    { title: 'Cloud Infrastructure', description: 'Auto-scaling AWS or GCP architectures with GCC data residency where required. Infrastructure as code — reproducible, secure, auditable.', icon: Cloud },
    { title: 'Security & Compliance', description: 'PCI-DSS compliance, SSL/TLS hardening, DDoS protection, WAF and audits aligned with UAE NESA and Saudi NCA.', icon: Shield },
    { title: 'DevOps & CI/CD', description: 'GitHub Actions, containerised deployments, blue-green strategies and automated testing pipelines for zero-downtime releases.', icon: Settings },
    { title: 'Database Architecture', description: 'PostgreSQL, MongoDB and Redis for high-throughput ecommerce — read replicas, caching strategies and query optimisation.', icon: Database },
    { title: 'API & Microservices', description: 'Event-driven microservices — Kafka, RabbitMQ, API gateways and service mesh for commerce systems that scale independently.', icon: Wifi },
    { title: 'Monitoring & Observability', description: 'Datadog, New Relic or Grafana/Prometheus. Uptime monitoring, error tracking, performance dashboards and SLA alerting.', icon: BarChart3 },
  ],
};

export default function Services() {
  const [activeTab, setActiveTab] = useState('shopify');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.services-header',
        { opacity: 0, y: 50 },
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

      gsap.fromTo('.services-container',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleTabChange = (tabId: string) => {
    if (tabId === activeTab) return;

    // Animate out current content
    if (contentRef.current) {
      gsap.to(contentRef.current.querySelectorAll('.service-card'), {
        opacity: 0,
        y: 15,
        scale: 0.98,
        duration: 0.25,
        stagger: 0.03,
        onComplete: () => {
          setActiveTab(tabId);
          // Animate in new content
          gsap.fromTo('.service-card',
            { opacity: 0, y: 25, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
          );
        },
      });
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <section ref={sectionRef} id="services" className="section bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(43,92,230,0.04)_0%,transparent_70%)]" />
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="services-header flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <div className="tag mb-4">What We Build</div>
            <h2 className="text-[clamp(40px,5vw,66px)] font-[var(--font-display)] font-semibold leading-[0.95]">
              One Focus.<br />
              <span className="text-[var(--accent)]">Infinite Depth.</span>
            </h2>
          </div>
          <p className="text-[14px] text-[var(--muted)] leading-relaxed max-w-[360px]">
            We don't spread across 20 service lines. Every discipline we practice is a variation 
            of the same obsession: building commerce that converts.
          </p>
        </div>

        {/* Services Container */}
        <div className="services-container grid lg:grid-cols-[280px_1fr] gap-0 min-h-[640px] border border-[var(--border)] rounded-2xl overflow-hidden shadow-lg">
          {/* Sidebar */}
          <div className="bg-[var(--ink)] p-6 lg:p-8 relative">
            <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/30 mb-6">
              Categories
            </div>
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleTabChange(category.id)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-300 flex-shrink-0 lg:flex-shrink group ${
                    activeTab === category.id
                      ? 'bg-[rgba(43,92,230,0.2)] text-white shadow-lg'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    activeTab === category.id ? 'bg-[var(--accent)] scale-110' : 'bg-white/5 group-hover:bg-white/10'
                  }`}>
                    <category.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold">{category.name}</div>
                    <div className="text-[10px] opacity-50">{category.count}</div>
                  </div>
                  {activeTab === category.id && (
                    <div className="hidden lg:block ml-auto">
                      <ArrowRight className="w-4 h-4 text-[var(--accent)]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            {/* Decorative element */}
            <div className="hidden lg:block absolute bottom-8 left-8 right-8">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-[10px] text-white/40 uppercase tracking-wide mb-2">Need something custom?</div>
                <a href="#contact" className="text-[12px] text-[var(--accent)] font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  Let's talk <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="bg-[var(--bg)] p-1">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)]">
              {servicesData[activeTab].map((service, index) => (
                <div
                  key={index}
                  className="service-card bg-white p-6 lg:p-7 hover:bg-[var(--bg)] transition-all duration-300 group cursor-pointer relative overflow-hidden"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Hover glow */}
                  <div className={`absolute inset-0 bg-[var(--accent)]/5 transition-opacity duration-300 ${
                    hoveredCard === index ? 'opacity-100' : 'opacity-0'
                  }`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        hoveredCard === index 
                          ? 'bg-[var(--accent)] scale-110' 
                          : 'bg-[var(--accent-light)]'
                      }`}>
                        <service.icon className={`w-5 h-5 transition-colors ${
                          hoveredCard === index ? 'text-white' : 'text-[var(--accent)]'
                        }`} />
                      </div>
                      <span className="text-[10px] font-bold text-[var(--muted-2)] tracking-wide">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    
                    <h4 className="text-[17px] font-[var(--font-display)] font-semibold mb-2 leading-tight group-hover:text-[var(--accent)] transition-colors">
                      {service.title}
                    </h4>
                    
                    <p className="text-[12px] text-[var(--muted)] leading-relaxed mb-4">
                      {service.description}
                    </p>
                    
                    <div className={`flex items-center gap-1 text-[11px] font-semibold text-[var(--accent)] transition-all duration-300 ${
                      hoveredCard === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                    }`}>
                      Learn more
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)] transition-transform duration-300 origin-left ${
                    hoveredCard === index ? 'scale-x-100' : 'scale-x-0'
                  }`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
