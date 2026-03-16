import { Linkedin, Twitter, Instagram } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    shopify: [
      { en: 'Store Development',  ar: 'تطوير المتاجر',           href: '#services' },
      { en: 'Shopify Plus',       ar: 'Shopify Plus',             href: '#services' },
      { en: 'Theme Design',       ar: 'تصميم القوالب',           href: '#services' },
      { en: 'App Development',    ar: 'تطوير التطبيقات',         href: '#services' },
      { en: 'Migration',          ar: 'الترحيل',                  href: '#services' },
    ],
    services: [
      { en: 'Custom Ecommerce',   ar: 'تجارة إلكترونية مخصصة',  href: '#services' },
      { en: 'CRO & Growth',       ar: 'تحسين التحويل والنمو',    href: '#services' },
      { en: 'GCC Payments',       ar: 'مدفوعات الخليج',          href: '#services' },
      { en: 'Arabic UX',          ar: 'تجربة المستخدم العربية',  href: '#services' },
      { en: 'Infrastructure',     ar: 'البنية التحتية',           href: '#services' },
    ],
    company: [
      { en: 'Our Work',           ar: 'أعمالنا',                 href: '#cases' },
      { en: 'Our Process',        ar: 'منهجيتنا',                href: '#process' },
      { en: 'Pricing',            ar: 'الأسعار',                 href: '#pricing' },
      { en: 'Contact',            ar: 'تواصل معنا',              href: '#contact' },
      { en: 'Privacy Policy',     ar: 'سياسة الخصوصية',         href: '#' },
    ],
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="bg-white border-t border-[var(--border)] pt-16 pb-8">
      <div className="container">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="w-6 h-6 bg-[var(--ink)] rounded-md grid grid-cols-2 gap-0.5 p-1">
                <span className="bg-white rounded-[1px]" />
                <span className="bg-white/50 rounded-[1px]" />
                <span className="bg-white/50 rounded-[1px]" />
                <span className="bg-white/20 rounded-[1px]" />
              </div>
              <span className="font-[var(--font-body)] text-[15px] font-bold tracking-tight">
                Stackora<span className="text-[var(--accent)]">Labs</span>
              </span>
            </a>
            <p className="text-[12px] text-[var(--muted)] leading-relaxed max-w-[240px] mb-6">
              {t(
                "GCC's premier ecommerce engineering partner. Headquartered in Dubai. Serving UAE, Saudi Arabia, Qatar and Kuwait.",
                'شريك هندسة التجارة الإلكترونية الرائد في الخليج. مقرنا في دبي. نخدم الإمارات والسعودية وقطر والكويت.'
              )}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-[var(--bg)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--bg-2)] transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shopify Links */}
          <div>
            <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--muted-2)] mb-4">
              Shopify
            </div>
            <ul className="space-y-2.5">
              {footerLinks.shopify.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-[12px] text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                  >
                    {t(link.en, link.ar)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--muted-2)] mb-4">
              {t('Services', 'الخدمات')}
            </div>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-[12px] text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                  >
                    {t(link.en, link.ar)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--muted-2)] mb-4">
              {t('Company', 'الشركة')}
            </div>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-[12px] text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                  >
                    {t(link.en, link.ar)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[11px] text-[var(--muted-2)]">
            {t('© 2025 StackoraLabs FZ-LLC. All rights reserved. Dubai, UAE.', '© ٢٠٢٥ StackoraLabs FZ-LLC. جميع الحقوق محفوظة. دبي، الإمارات.')}
          </span>

          <div className="flex items-center gap-2 text-[11px] text-[var(--muted-2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span>{t('Shopify Partner · AWS Partner · Google Partner', 'شريك Shopify · شريك AWS · شريك Google')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
