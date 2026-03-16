import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Globe, Calendar, Check, Loader2, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { t } = useLanguage();

  const contactInfo = [
    {
      labelEn: 'Email',           labelAr: 'البريد الإلكتروني',
      value: 'hello@stackoralabs.com',
      subtextEn: 'Same business day response', subtextAr: 'رد في نفس يوم العمل',
      icon: Mail,
    },
    {
      labelEn: 'Headquarters',    labelAr: 'المقر الرئيسي',
      valueEn: 'Dubai, UAE',      valueAr: 'دبي، الإمارات',
      subtextEn: 'DIFC · Business Bay', subtextAr: 'مركز دبي المالي الدولي · بيزنس باي',
      icon: MapPin,
    },
    {
      labelEn: 'Coverage',        labelAr: 'نطاق العمل',
      valueEn: 'UAE · KSA · Qatar · Kuwait', valueAr: 'الإمارات · السعودية · قطر · الكويت',
      subtextEn: 'Remote-first, on-site available', subtextAr: 'عن بُعد أولاً، حضور ميداني متاح',
      icon: Globe,
    },
    {
      labelEn: 'Availability',    labelAr: 'التوفر',
      valueEn: 'Booking Q3 2025', valueAr: 'الحجز للربع الثالث ٢٠٢٥',
      subtextEn: '2 project slots remaining', subtextAr: 'خانتان لمشاريع متبقيتان',
      icon: Calendar,
    },
  ];
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    service: '',
    budget: '',
    platform: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-content',
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

      gsap.fromTo('.contact-form',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = t('Please enter your name', 'يرجى إدخال اسمك');
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('Please enter a valid email', 'يرجى إدخال بريد إلكتروني صحيح');
    }
    if (!formData.company.trim()) {
      newErrors.company = t('Please enter your company', 'يرجى إدخال اسم شركتك');
    }
    if (!formData.country) {
      newErrors.country = t('Please select your country', 'يرجى اختيار دولتك');
    }
    if (!formData.service) {
      newErrors.service = t('Please select a service', 'يرجى اختيار الخدمة');
    }
    if (!formData.budget) {
      newErrors.budget = t('Please select a budget', 'يرجى اختيار الميزانية');
    }
    if (!formData.message.trim() || formData.message.length < 20) {
      newErrors.message = t('Please write at least 20 characters', 'يرجى كتابة ٢٠ حرفاً على الأقل');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Server error ${res.status}`);
      }

      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or email us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="section bg-[var(--bg-2)]">
      <div className="container">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="contact-content">
            <div className="tag mb-6">{t('Start a Project', 'ابدأ مشروعك')}</div>
            <h2 className="text-[clamp(36px,4.5vw,58px)] font-[var(--font-display)] font-semibold leading-[0.95] mb-4">
              {t("Let's Build Your GCC", 'لنبني محرك التجارة')}<br />
              <span className="text-[var(--accent)]">{t('Commerce Engine.', 'الخليجي الخاص بك.')}</span>
            </h2>
            <p className="text-[14px] text-[var(--muted)] leading-relaxed mb-10">
              {t(
                "Book a free 30-minute strategy session. We'll review your store, identify revenue opportunities and propose a scope — at no cost and no obligation.",
                'احجز جلسة استراتيجية مجانية لمدة ٣٠ دقيقة. سنراجع متجرك ونحدد فرص الإيرادات ونقترح نطاقاً — بدون تكلفة أو التزام.'
              )}
            </p>

            {/* Contact Info */}
            <div className="space-y-0">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="py-5 border-b border-[var(--border)] first:border-t"
                >
                  <div className="text-[9px] font-bold tracking-[0.14em] uppercase text-[var(--muted-2)] mb-1">
                    {t(item.labelEn, item.labelAr)}
                  </div>
                  <div className="flex items-start gap-3">
                    <item.icon className="w-4 h-4 text-[var(--accent)] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-[14px] font-semibold text-[var(--ink)]">
                        {item.value ?? t(item.valueEn!, item.valueAr!)}
                      </div>
                      <div className="text-[11px] text-[var(--muted)]">{t(item.subtextEn, item.subtextAr)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="contact-form">
            <div className="bg-white border border-[var(--border)] rounded-2xl p-6 lg:p-10 shadow-lg">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-[24px] font-[var(--font-display)] font-semibold mb-2">
                    {t('Message received.', 'تم استلام رسالتك.')}
                  </h3>
                  <p className="text-[13px] text-[var(--muted)]">
                    {t('Our team will be in touch within the same business day.', 'سيتواصل معك فريقنا في نفس يوم العمل.')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--muted)] block mb-2">
                        {t('Full Name', 'الاسم الكامل')}
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder={t('Khalid Al-Rashid', 'خالد الراشد')}
                        className={`w-full bg-[var(--bg)] border rounded-lg px-4 py-3 text-[13px] text-[var(--ink)] placeholder:text-[var(--muted-2)] transition-all focus:outline-none focus:border-[var(--accent)] focus:bg-white focus:ring-2 focus:ring-[var(--accent-light)] ${errors.name ? 'border-red-400' : 'border-[var(--border)]'
                          }`}
                      />
                      {errors.name && (
                        <span className="text-[10px] text-red-500 mt-1">{errors.name}</span>
                      )}
                    </div>
                    <div>
                      <label className="text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--muted)] block mb-2">
                        {t('Email Address', 'عنوان البريد الإلكتروني')}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="khalid@yourbrand.ae"
                        className={`w-full bg-[var(--bg)] border rounded-lg px-4 py-3 text-[13px] text-[var(--ink)] placeholder:text-[var(--muted-2)] transition-all focus:outline-none focus:border-[var(--accent)] focus:bg-white focus:ring-2 focus:ring-[var(--accent-light)] ${errors.email ? 'border-red-400' : 'border-[var(--border)]'
                          }`}
                      />
                      {errors.email && (
                        <span className="text-[10px] text-red-500 mt-1">{errors.email}</span>
                      )}
                    </div>
                  </div>

                  {/* Company & Country */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--muted)] block mb-2">
                        {t('Company / Brand', 'الشركة / العلامة التجارية')}
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        placeholder={t('Your Brand LLC', 'شركتك المحدودة')}
                        className={`w-full bg-[var(--bg)] border rounded-lg px-4 py-3 text-[13px] text-[var(--ink)] placeholder:text-[var(--muted-2)] transition-all focus:outline-none focus:border-[var(--accent)] focus:bg-white focus:ring-2 focus:ring-[var(--accent-light)] ${errors.company ? 'border-red-400' : 'border-[var(--border)]'
                          }`}
                      />
                      {errors.company && (
                        <span className="text-[10px] text-red-500 mt-1">{errors.company}</span>
                      )}
                    </div>
                    <div>
                      <label className="text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--muted)] block mb-2">
                        {t('Country', 'الدولة')}
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) => handleChange('country', e.target.value)}
                        className={`w-full bg-[var(--bg)] border rounded-lg px-4 py-3 text-[13px] text-[var(--ink)] transition-all focus:outline-none focus:border-[var(--accent)] focus:bg-white focus:ring-2 focus:ring-[var(--accent-light)] appearance-none cursor-pointer ${errors.country ? 'border-red-400' : 'border-[var(--border)]'
                          }`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7' viewBox='0 0 10 7'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%237A7670' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 14px center',
                        }}
                      >
                        <option value="">{t('Select country…', 'اختر الدولة…')}</option>
                        {[
                          { en: 'UAE', ar: 'الإمارات' },
                          { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
                          { en: 'Qatar', ar: 'قطر' },
                          { en: 'Kuwait', ar: 'الكويت' },
                          { en: 'Bahrain', ar: 'البحرين' },
                          { en: 'Oman', ar: 'عُمان' },
                          { en: 'Other', ar: 'أخرى' },
                        ].map((opt) => (
                          <option key={opt.en} value={opt.en}>{t(opt.en, opt.ar)}</option>
                        ))}
                      </select>
                      {errors.country && (
                        <span className="text-[10px] text-red-500 mt-1">{errors.country}</span>
                      )}
                    </div>
                  </div>

                  {/* Service & Budget */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--muted)] block mb-2">
                        {t('Service Needed', 'الخدمة المطلوبة')}
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => handleChange('service', e.target.value)}
                        className={`w-full bg-[var(--bg)] border rounded-lg px-4 py-3 text-[13px] text-[var(--ink)] transition-all focus:outline-none focus:border-[var(--accent)] focus:bg-white focus:ring-2 focus:ring-[var(--accent-light)] appearance-none cursor-pointer ${errors.service ? 'border-red-400' : 'border-[var(--border)]'
                          }`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7' viewBox='0 0 10 7'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%237A7670' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 14px center',
                        }}
                      >
                        <option value="">{t('Select service…', 'اختر الخدمة…')}</option>
                        {[
                          { en: 'Shopify Development',   ar: 'تطوير Shopify' },
                          { en: 'Shopify Plus',          ar: 'Shopify Plus' },
                          { en: 'CRO & Optimisation',    ar: 'تحسين التحويل' },
                          { en: 'Custom Ecommerce',      ar: 'تجارة إلكترونية مخصصة' },
                          { en: 'Migration',             ar: 'الترحيل' },
                          { en: 'ERP / API Integration', ar: 'تكامل ERP / API' },
                          { en: 'Retainer / Ongoing',    ar: 'عقد مستمر' },
                          { en: 'Not sure yet',          ar: 'لم أقرر بعد' },
                        ].map((opt) => (
                          <option key={opt.en} value={opt.en}>{t(opt.en, opt.ar)}</option>
                        ))}
                      </select>
                      {errors.service && (
                        <span className="text-[10px] text-red-500 mt-1">{errors.service}</span>
                      )}
                    </div>
                    <div>
                      <label className="text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--muted)] block mb-2">
                        {t('Budget (USD)', 'الميزانية (دولار)')}
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => handleChange('budget', e.target.value)}
                        className={`w-full bg-[var(--bg)] border rounded-lg px-4 py-3 text-[13px] text-[var(--ink)] transition-all focus:outline-none focus:border-[var(--accent)] focus:bg-white focus:ring-2 focus:ring-[var(--accent-light)] appearance-none cursor-pointer ${errors.budget ? 'border-red-400' : 'border-[var(--border)]'
                          }`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7' viewBox='0 0 10 7'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%237A7670' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 14px center',
                        }}
                      >
                        <option value="">{t('Select budget…', 'اختر الميزانية…')}</option>
                        {[
                          { en: '$5,000 – $10,000',    ar: '٥,٠٠٠ – ١٠,٠٠٠ $' },
                          { en: '$10,000 – $25,000',   ar: '١٠,٠٠٠ – ٢٥,٠٠٠ $' },
                          { en: '$25,000 – $50,000',   ar: '٢٥,٠٠٠ – ٥٠,٠٠٠ $' },
                          { en: '$50,000 – $100,000',  ar: '٥٠,٠٠٠ – ١٠٠,٠٠٠ $' },
                          { en: '$100,000+',            ar: '+١٠٠,٠٠٠ $' },
                          { en: 'Not sure yet',         ar: 'لم أقرر بعد' },
                        ].map((opt) => (
                          <option key={opt.en} value={opt.en}>{t(opt.en, opt.ar)}</option>
                        ))}
                      </select>
                      {errors.budget && (
                        <span className="text-[10px] text-red-500 mt-1">{errors.budget}</span>
                      )}
                    </div>
                  </div>

                  {/* Platform */}
                  <div>
                    <label className="text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--muted)] block mb-2">
                      {t('Current Platform', 'المنصة الحالية')}
                    </label>
                    <select
                      value={formData.platform}
                      onChange={(e) => handleChange('platform', e.target.value)}
                      className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-3 text-[13px] text-[var(--ink)] transition-all focus:outline-none focus:border-[var(--accent)] focus:bg-white focus:ring-2 focus:ring-[var(--accent-light)] appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7' viewBox='0 0 10 7'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%237A7670' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 14px center',
                      }}
                    >
                      <option value="">{t('Select platform…', 'اختر المنصة…')}</option>
                      {[
                        { en: 'Shopify',             ar: 'Shopify' },
                        { en: 'Shopify Plus',        ar: 'Shopify Plus' },
                        { en: 'WooCommerce',         ar: 'WooCommerce' },
                        { en: 'Magento',             ar: 'Magento' },
                        { en: 'Salla',               ar: 'سلة' },
                        { en: 'Zid',                 ar: 'زد' },
                        { en: 'Custom / Other',      ar: 'مخصص / أخرى' },
                        { en: 'Starting from scratch', ar: 'البدء من الصفر' },
                      ].map((opt) => (
                        <option key={opt.en} value={opt.en}>{t(opt.en, opt.ar)}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--muted)] block mb-2">
                      {t('Project Brief', 'ملخص المشروع')}
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder={t(
                        'Tell us about your brand, your current store, pain points and what success looks like…',
                        'أخبرنا عن علامتك التجارية ومتجرك الحالي ونقاط الألم وكيف يبدو النجاح بالنسبة لك…'
                      )}
                      rows={4}
                      className={`w-full bg-[var(--bg)] border rounded-lg px-4 py-3 text-[13px] text-[var(--ink)] placeholder:text-[var(--muted-2)] transition-all focus:outline-none focus:border-[var(--accent)] focus:bg-white focus:ring-2 focus:ring-[var(--accent-light)] resize-none ${errors.message ? 'border-red-400' : 'border-[var(--border)]'
                        }`}
                    />
                    {errors.message && (
                      <span className="text-[10px] text-red-500 mt-1">{errors.message}</span>
                    )}
                  </div>
                  {submitError && (
                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-[12px] text-red-700">
                      <span className="flex-shrink-0 mt-0.5">⚠</span>
                      <span>{submitError}</span>
                    </div>
                  )}
                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn btn-accent justify-center py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t('Sending...', 'جارٍ الإرسال...')}
                      </>
                    ) : (
                      <>
                        {t('Book Free Strategy Session', 'احجز جلسة استراتيجية مجانية')}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-[var(--muted-2)] text-center">
                    {t('No sales pitch. No commitment. Just a strategic conversation.', 'بلا عروض بيع. بلا التزامات. مجرد محادثة استراتيجية.')}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
