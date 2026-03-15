import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations, useT } from '@/i18n/translation';
import { blogPosts } from '@/data/blogPosts';
import BlogCard from '@/components/BlogCard';
import Navigation from '@/sections/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import CustomCursor from '@/components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ['All', 'Shopify', 'CRO', 'GCC Market', 'Headless', 'Strategy'];

export default function BlogList() {
  const { lang } = useLanguage();
  const t  = useT(lang);
  const tx = translations.blog;

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const cardsRef  = useRef<HTMLDivElement>(null);
  const heroRef   = useRef<HTMLDivElement>(null);

  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  const featured  = filteredPosts[0];
  const remaining = filteredPosts.slice(1);

  // Hero entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.blog-hero-content',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.2 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Cards scroll animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = document.querySelectorAll('.blog-card-item');
      if (cards.length === 0) return;
      gsap.fromTo(cards,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, cardsRef);
    return () => ctx.revert();
  }, [activeCategory]);

  const featuredTitle   = featured ? (lang === 'ar' ? featured.title.ar   : featured.title.en)   : '';
  const featuredExcerpt = featured ? (lang === 'ar' ? featured.excerpt.ar : featured.excerpt.en) : '';
  const featuredDate    = featured
    ? new Date(featured.publishedAt).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-GB', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : '';

  return (
    <div className="relative min-h-screen bg-[var(--bg)]">
      <CustomCursor />
      <AnimatedBackground />
      <Navigation />

      {/* ── Hero ──────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        <div className="container">
          <div className="blog-hero-content max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Link
                to="/"
                className="text-[12px] font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors uppercase tracking-wider"
              >
                {t(tx.back_home)}
              </Link>
            </div>
            <div className="flex items-center gap-3 mb-5">
              <BookOpen className="w-5 h-5 text-[var(--accent)]" />
              <span className="tag">{t(tx.all_posts)}</span>
            </div>
            <h1
              className="text-[clamp(40px,6vw,80px)] font-bold text-[var(--ink)] leading-[0.95] mb-5"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t(tx.heading)}
            </h1>
            <p className="text-[var(--muted)] text-[17px] leading-relaxed max-w-xl">
              {t(tx.subheading)}
            </p>
          </div>
        </div>
      </section>

      {/* ── Category filter ───────────────────────────── */}
      <div className="container pb-8">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const labelMap: Record<string, { en: string; ar: string }> = {
              All:        { en: 'All',        ar: 'الكل'              },
              Shopify:    { en: 'Shopify',    ar: 'Shopify'           },
              CRO:        { en: 'CRO',        ar: 'تحسين التحويل'    },
              'GCC Market': { en: 'GCC Market', ar: 'سوق الخليج'     },
              Headless:   { en: 'Headless',   ar: 'بدون رأس'         },
              Strategy:   { en: 'Strategy',   ar: 'الاستراتيجية'     },
            };
            const label = lang === 'ar' ? (labelMap[cat]?.ar ?? cat) : (labelMap[cat]?.en ?? cat);
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-[12px] font-semibold uppercase tracking-wider border transition-all duration-200 ${
                  isActive
                    ? 'bg-[var(--ink)] text-white border-[var(--ink)]'
                    : 'bg-transparent text-[var(--muted)] border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Featured Post ─────────────────────────────── */}
      {featured && (
        <div className="container pb-12">
          <Link
            to={`/blog/${featured.slug}`}
            className="group block rounded-3xl border border-[var(--border)] overflow-hidden bg-white card-hover"
          >
            <div className="grid lg:grid-cols-[1fr_420px]">
              {/* Cover gradient */}
              <div
                className="h-64 lg:h-auto min-h-[320px] relative"
                style={{ background: featured.coverGradient }}
              >
                <div className="absolute inset-0 bg-black/10" />
                <span className="absolute top-6 left-6 text-[11px] font-bold uppercase tracking-widest bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/20">
                  {t(tx.featured_label)}
                </span>
              </div>
              {/* Content */}
              <div className="p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--accent)] mb-3 block">
                    {featured.category}
                  </span>
                  <h2
                    className="text-[clamp(22px,2.5vw,32px)] font-bold text-[var(--ink)] leading-tight mb-4 group-hover:text-[var(--accent)] transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {featuredTitle}
                  </h2>
                  <p className="text-[var(--muted)] text-[15px] leading-relaxed mb-6">
                    {featuredExcerpt}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xl">{featured.authorAvatar}</span>
                    <div>
                      <p className="text-[13px] font-semibold text-[var(--ink)]">{featured.author}</p>
                      <p className="text-[12px] text-[var(--muted-2)]">
                        {featuredDate} · {featured.readTime} {t(tx.min_read)}
                      </p>
                    </div>
                  </div>
                  <span className="btn btn-primary gap-2 text-[12px] py-3 px-6 inline-flex">
                    {t(tx.read_article)}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* ── Post grid ─────────────────────────────────── */}
      {remaining.length > 0 && (
        <div className="container pb-24">
          <div
            ref={cardsRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {remaining.map((post) => (
              <div key={post.id} className="blog-card-item">
                <BlogCard post={post} className="h-full" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Empty state ───────────────────────────────── */}
      {filteredPosts.length === 0 && (
        <div className="container pb-24 text-center py-20">
          <p className="text-[var(--muted)] text-[16px]">No articles in this category yet.</p>
        </div>
      )}

      {/* ── Footer strip ──────────────────────────────── */}
      <div className="border-t border-[var(--border)] py-8 bg-[var(--bg-2)]">
        <div className="container flex items-center justify-between gap-4 flex-wrap">
          <span className="text-[13px] text-[var(--muted)]">
            © 2025 Stackora Labs
          </span>
          <Link
            to="/"
            className="text-[12px] font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            {t(tx.back_home)}
          </Link>
        </div>
      </div>
    </div>
  );
}
