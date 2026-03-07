import { useState, useRef } from 'react';
import type { ElementType } from 'react';
import gsap from 'gsap';
import {
  ShoppingBag, Zap, Globe, CreditCard, TrendingUp,
  Gauge, Code2, Puzzle, Server, ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations, useT } from '@/i18n/translation';

interface Service {
  Icon: ElementType;
  titleEn: string;
  titleAr: string;
}

interface Tab {
  id: string;
  labelEn: string;
  labelAr: string;
  services: Service[];
}

const TABS: Tab[] = [
  {
    id: 'shopify', labelEn: 'Shopify', labelAr: 'Shopify',
    services: [
      { Icon: ShoppingBag, titleEn: 'Custom Theme Development', titleAr: 'تطوير قوالب مخصصة'      },
      { Icon: Zap,         titleEn: 'Shopify Plus',             titleAr: 'Shopify Plus'           },
      { Icon: Code2,       titleEn: 'Theme Optimization',       titleAr: 'تحسين القوالب'           },
      { Icon: Puzzle,      titleEn: 'App Integration',          titleAr: 'تكامل التطبيقات'         },
      { Icon: Globe,       titleEn: 'Multi-region Setup',       titleAr: 'إعداد متعدد المناطق'     },
      { Icon: CreditCard,  titleEn: 'Checkout Customization',   titleAr: 'تخصيص صفحة الدفع'        },
    ],
  },
  {
    id: 'custom', labelEn: 'Custom Ecommerce', labelAr: 'تجارة إلكترونية مخصصة',
    services: [
      { Icon: Code2,       titleEn: 'Headless Commerce',        titleAr: 'تجارة بدون رأس'          },
      { Icon: Zap,         titleEn: 'Hydrogen Storefronts',     titleAr: 'واجهات Hydrogen'         },
      { Icon: Globe,       titleEn: 'Arabic-First UX',          titleAr: 'تجربة عربية أولاً'       },
      { Icon: CreditCard,  titleEn: 'GCC Payments',             titleAr: 'مدفوعات الخليج'          },
      { Icon: Puzzle,      titleEn: 'Custom Shopify Apps',      titleAr: 'تطبيقات Shopify مخصصة'   },
      { Icon: Server,      titleEn: 'ERP / OMS Integration',    titleAr: 'تكامل ERP / OMS'         },
    ],
  },
  {
    id: 'cro', labelEn: 'CRO & Growth', labelAr: 'تحسين التحويل والنمو',
    services: [
      { Icon: TrendingUp,  titleEn: 'Conversion Audits',        titleAr: 'تدقيق التحويل'           },
      { Icon: Gauge,       titleEn: 'A/B Testing',              titleAr: 'اختبار A/B'              },
      { Icon: Globe,       titleEn: 'Landing Page Optimization', titleAr: 'تحسين صفحات الهبوط'     },
      { Icon: ShoppingBag, titleEn: 'Checkout Funnel CRO',      titleAr: 'تحسين مسار الدفع'        },
      { Icon: Code2,       titleEn: 'Heatmap & Analytics',      titleAr: 'خرائط الحرارة والتحليلات' },
      { Icon: TrendingUp,  titleEn: 'Revenue Attribution',      titleAr: 'نسب الإيرادات'           },
    ],
  },
  {
    id: 'infra', labelEn: 'Infrastructure', labelAr: 'البنية التحتية',
    services: [
      { Icon: Server,      titleEn: 'Core Web Vitals',          titleAr: 'أداء الويب الأساسي'      },
      { Icon: Gauge,       titleEn: 'Performance Engineering',  titleAr: 'هندسة الأداء'            },
      { Icon: Code2,       titleEn: 'CDN & Edge Config',        titleAr: 'إعداد CDN والحافة'       },
      { Icon: Puzzle,      titleEn: 'Security Hardening',       titleAr: 'تقوية الأمان'            },
      { Icon: Server,      titleEn: 'Uptime Monitoring',        titleAr: 'مراقبة وقت التشغيل'      },
      { Icon: Zap,         titleEn: 'Disaster Recovery',        titleAr: 'التعافي من الكوارث'      },
    ],
  },
];

export default function Services() {
  const { lang } = useLanguage();
  const t = useT(lang);
  const tx = translations.services;
  const [activeTab, setActiveTab] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  const switchTab = (index: number) => {
    if (!gridRef.current) { setActiveTab(index); return; }
    gsap.to(gridRef.current, {
      opacity: 0, y: 12, duration: 0.2, ease: 'power2.in',
      onComplete: () => {
        setActiveTab(index);
        gsap.to(gridRef.current, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
      },
    });
  };

  const currentTab = TABS[activeTab];

  return (
    <section id="services" className="reveal-section section bg-[var(--bg-2)]">
      <div className="container">
        <div className="grid lg:grid-cols-[280px_1fr] gap-14">

          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 self-start">
            <span className="tag mb-4">{t(tx.tag)}</span>
            <h2 className="font-[var(--font-display)] text-[clamp(24px,3vw,42px)] font-bold text-[var(--ink)] leading-tight mb-3">
              {t(tx.heading)}
            </h2>
            <p className="text-[var(--muted)] text-[14px] leading-relaxed mb-8">
              {t(tx.subheading)}
            </p>

            {/* Tabs */}
            <nav className="space-y-1">
              {TABS.map((tab, i) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => switchTab(i)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-[14px] font-semibold transition-all ${
                    activeTab === i
                      ? 'bg-[var(--ink)] text-white'
                      : 'text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--bg-3)]'
                  }`}
                >
                  {lang === 'ar' ? tab.labelAr : tab.labelEn}
                </button>
              ))}
            </nav>
          </div>

          {/* Services grid */}
          <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 content-start">
            {currentTab.services.map((service, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-2xl p-6 border border-[var(--border)] card-hover overflow-hidden cursor-default"
              >
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="w-10 h-10 rounded-xl bg-[var(--bg-2)] group-hover:bg-[var(--accent)] flex items-center justify-center mb-4 transition-colors duration-300">
                  <service.Icon className="w-5 h-5 text-[var(--muted)] group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="text-[var(--ink)] font-semibold text-[14px] mb-3">
                  {lang === 'ar' ? service.titleAr : service.titleEn}
                </h3>

                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1 text-[var(--accent)] text-[12px] font-medium">
                  {t(tx.learn_more)}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}