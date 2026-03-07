import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Globe, Calendar, Check, Loader2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    label: 'Email',
    value: 'hello@stackoralabs.com',
    subtext: 'Same business day response',
    icon: Mail,
  },
  {
    label: 'Headquarters',
    value: 'Dubai, UAE',
    subtext: 'DIFC · Business Bay',
    icon: MapPin,
  },
  {
    label: 'Coverage',
    value: 'UAE · KSA · Qatar · Kuwait',
    subtext: 'Remote-first, on-site available',
    icon: Globe,
  },
  {
    label: 'Availability',
    value: 'Booking Q3 2025',
    subtext: '2 project slots remaining',
    icon: Calendar,
  },
];

const serviceOptions = [
  'Shopify Development',
  'Shopify Plus',
  'CRO & Optimisation',
  'Custom Ecommerce',
  'Migration',
  'ERP / API Integration',
  'Retainer / Ongoing',
  'Not sure yet',
];

const budgetOptions = [
  '$5,000 – $10,000',
  '$10,000 – $25,000',
  '$25,000 – $50,000',
  '$50,000 – $100,000',
  '$100,000+',
  'Not sure yet',
];

const countryOptions = [
  'UAE',
  'Saudi Arabia',
  'Qatar',
  'Kuwait',
  'Bahrain',
  'Oman',
  'Other',
];

const platformOptions = [
  'Shopify',
  'Shopify Plus',
  'WooCommerce',
  'Magento',
  'Salla',
  'Zid',
  'Custom / Other',
  'Starting from scratch',
];

export default function Contact() {
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
      newErrors.name = 'Please enter your name';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Please enter your company';
    }
    if (!formData.country) {
      newErrors.country = 'Please select your country';
    }
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }
    if (!formData.budget) {
      newErrors.budget = 'Please select a budget';
    }
    if (!formData.message.trim() || formData.message.length < 20) {
      newErrors.message = 'Please write at least 20 characters';
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
            <div className="tag mb-6">Start a Project</div>
            <h2 className="text-[clamp(36px,4.5vw,58px)] font-[var(--font-display)] font-semibold leading-[0.95] mb-4">
              Let's Build Your GCC<br />
              <span className="text-[var(--accent)]">Commerce Engine.</span>
            </h2>
            <p className="text-[14px] text-[var(--muted)] leading-relaxed mb-10">
              Book a free 30-minute strategy session. We'll review your store, identify revenue
              opportunities and propose a scope — at no cost and no obligation.
            </p>

            {/* Contact Info */}
            <div className="space-y-0">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="py-5 border-b border-[var(--border)] first:border-t"
                >
                  <div className="text-[9px] font-bold tracking-[0.14em] uppercase text-[var(--muted-2)] mb-1">
                    {item.label}
                  </div>
                  <div className="flex items-start gap-3">
                    <item.icon className="w-4 h-4 text-[var(--accent)] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-[14px] font-semibold text-[var(--ink)]">{item.value}</div>
                      <div className="text-[11px] text-[var(--muted)]">{item.subtext}</div>
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
                    Message received.
                  </h3>
                  <p className="text-[13px] text-[var(--muted)]">
                    Our team will be in touch within the same business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--muted)] block mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Khalid Al-Rashid"
                        className={`w-full bg-[var(--bg)] border rounded-lg px-4 py-3 text-[13px] text-[var(--ink)] placeholder:text-[var(--muted-2)] transition-all focus:outline-none focus:border-[var(--accent)] focus:bg-white focus:ring-2 focus:ring-[var(--accent-light)] ${errors.name ? 'border-red-400' : 'border-[var(--border)]'
                          }`}
                      />
                      {errors.name && (
                        <span className="text-[10px] text-red-500 mt-1">{errors.name}</span>
                      )}
                    </div>
                    <div>
                      <label className="text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--muted)] block mb-2">
                        Email Address
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
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        placeholder="Your Brand LLC"
                        className={`w-full bg-[var(--bg)] border rounded-lg px-4 py-3 text-[13px] text-[var(--ink)] placeholder:text-[var(--muted-2)] transition-all focus:outline-none focus:border-[var(--accent)] focus:bg-white focus:ring-2 focus:ring-[var(--accent-light)] ${errors.company ? 'border-red-400' : 'border-[var(--border)]'
                          }`}
                      />
                      {errors.company && (
                        <span className="text-[10px] text-red-500 mt-1">{errors.company}</span>
                      )}
                    </div>
                    <div>
                      <label className="text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--muted)] block mb-2">
                        Country
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
                        <option value="">Select country…</option>
                        {countryOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
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
                        Service Needed
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
                        <option value="">Select service…</option>
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      {errors.service && (
                        <span className="text-[10px] text-red-500 mt-1">{errors.service}</span>
                      )}
                    </div>
                    <div>
                      <label className="text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--muted)] block mb-2">
                        Budget (USD)
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
                        <option value="">Select budget…</option>
                        {budgetOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
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
                      Current Platform
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
                      <option value="">Select platform…</option>
                      {platformOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--muted)] block mb-2">
                      Project Brief
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Tell us about your brand, your current store, pain points and what success looks like…"
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
                        Sending...
                      </>
                    ) : (
                      <>
                        Book Free Strategy Session
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-[var(--muted-2)] text-center">
                    No sales pitch. No commitment. Just a strategic conversation.
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
