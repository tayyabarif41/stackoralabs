import { useEffect, useRef, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, Copy, Check, Twitter, Linkedin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations, useT } from '@/i18n/translation';
import { blogPosts } from '@/data/blogPosts';
import BlogCard from '@/components/BlogCard';
import Navigation from '@/sections/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import CustomCursor from '@/components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

function slugifyHeading(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim();
}

function extractH2Headings(html: string): { id: string; text: string }[] {
  const matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)];
  return matches.map((m) => {
    const text = m[1].replace(/<[^>]*>/g, '');
    return { id: slugifyHeading(text), text };
  });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate  = useNavigate();
  const { lang }  = useLanguage();
  const t  = useT(lang);
  const tx = translations.blog;

  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!post) navigate('/blog', { replace: true });
  }, [post, navigate]);

  const [readingProgress, setReadingProgress] = useState(0);
  const [activeHeading,   setActiveHeading]   = useState('');
  const [copied,          setCopied]          = useState(false);

  const articleRef = useRef<HTMLDivElement>(null);
  const heroRef    = useRef<HTMLDivElement>(null);

  // Reading progress bar
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      setReadingProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Assign IDs to h2 headings after render and observe active section
  useEffect(() => {
    if (!articleRef.current) return;
    const headings = articleRef.current.querySelectorAll<HTMLElement>('h2');
    const observers: IntersectionObserver[] = [];

    headings.forEach((h) => {
      const id = slugifyHeading(h.textContent ?? '');
      h.id = id;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveHeading(id); },
        { rootMargin: '-15% 0px -70% 0px' }
      );
      obs.observe(h);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, [post, lang]);

  // GSAP hero + body animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.post-hero-content',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 }
      );
      gsap.fromTo('.post-cover',
        { opacity: 0, scale: 1.03 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
      );
    }, heroRef);

    const bodyCtx = gsap.context(() => {
      const paras = articleRef.current?.querySelectorAll('p, h2, h3, blockquote, ul');
      if (!paras || paras.length === 0) return;
      gsap.fromTo(paras,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: articleRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      );
    });

    return () => { ctx.revert(); bodyCtx.revert(); };
  }, [post]);

  if (!post) return null;

  const title    = lang === 'ar' ? post.title.ar   : post.title.en;
  const content  = lang === 'ar' ? post.content.ar : post.content.en;
  const headings = extractH2Headings(content);
  const isRTL    = lang === 'ar';

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    lang === 'ar' ? 'ar-SA' : 'en-GB',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const twitterUrl  = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(title)}`;

  return (
    <div className="relative min-h-screen bg-[var(--bg)]">
      <CustomCursor />
      <AnimatedBackground />

      {/* Reading progress bar */}
      <div className="fixed top-0 inset-x-0 z-[60] h-[3px] bg-[var(--border)]">
        <div
          className="h-full bg-[var(--accent)] transition-none"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <Navigation />

      {/* ── Post navigation bar ───────────────────────── */}
      <div className="fixed top-[72px] inset-x-0 z-40 bg-[rgba(248,246,242,0.95)] backdrop-blur-xl border-b border-[var(--border)]">
        <div className="container">
          <div className="flex items-center justify-between h-12 gap-4">
            <Link
              to="/blog"
              className="flex items-center gap-2 text-[12px] font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors uppercase tracking-wider shrink-0"
            >
              {isRTL
                ? <><ArrowRight className="w-3.5 h-3.5" />{t(tx.back_to_blog)}</>
                : <><ArrowLeft  className="w-3.5 h-3.5" />{t(tx.back_to_blog)}</>
              }
            </Link>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] shrink-0">
              {post.category}
            </span>
          </div>
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────── */}
      <section ref={heroRef} className="pt-[152px] pb-0">
        <div className="container">
          <div className="post-hero-content max-w-3xl mx-auto text-center">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--accent)] mb-4 block">
              {post.category}
            </span>
            <h1
              className="text-[clamp(32px,5vw,64px)] font-bold text-[var(--ink)] leading-tight mb-8"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {title}
            </h1>
            {/* Author row */}
            <div className="flex items-center justify-center gap-4">
              <span className="text-2xl">{post.authorAvatar}</span>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <p className="text-[14px] font-semibold text-[var(--ink)]">{post.author}</p>
                <p className="text-[12px] text-[var(--muted-2)]">{post.authorRole}</p>
              </div>
              <div className="w-px h-8 bg-[var(--border)]" />
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <p className="text-[12px] text-[var(--muted)]">{formattedDate}</p>
                <p className="text-[12px] text-[var(--muted-2)]">{post.readTime} {t(tx.min_read)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cover gradient */}
        <div
          className="post-cover mt-10 w-full h-[360px] md:h-[440px]"
          style={{ background: post.coverGradient }}
        />
      </section>

      {/* ── Article body + sidebar ────────────────────── */}
      <section className="container py-16">
        <div className="grid lg:grid-cols-[1fr_260px] gap-12 max-w-5xl mx-auto">

          {/* Article body */}
          <article
            ref={articleRef}
            className="blog-prose min-w-0"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Sticky sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-[160px] space-y-6">

              {/* Table of Contents */}
              {headings.length > 0 && (
                <div className="bg-white rounded-2xl border border-[var(--border)] p-5">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)] mb-4">
                    {t(tx.toc_title)}
                  </p>
                  <nav className="space-y-1">
                    {headings.map(({ id, text }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          const el = document.getElementById(id);
                          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: 'smooth' });
                        }}
                        className={`block w-full text-left text-[13px] leading-snug px-3 py-2 rounded-lg transition-all duration-200 ${
                          activeHeading === id
                            ? 'bg-[var(--accent-light)] text-[var(--accent)] font-semibold'
                            : 'text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--bg-2)]'
                        }`}
                      >
                        {text}
                      </button>
                    ))}
                  </nav>
                </div>
              )}

              {/* Share */}
              <div className="bg-white rounded-2xl border border-[var(--border)] p-5">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)] mb-4">
                  {t(tx.share)}
                </p>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={copyLink}
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-[var(--ink)] hover:bg-[var(--bg-2)] transition-colors"
                  >
                    {copied
                      ? <Check  className="w-4 h-4 text-green-500 shrink-0" />
                      : <Copy   className="w-4 h-4 text-[var(--muted)] shrink-0" />
                    }
                    {copied ? t(tx.copied) : t(tx.copy_link)}
                  </button>
                  <a
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-[var(--ink)] hover:bg-[var(--bg-2)] transition-colors"
                  >
                    <Twitter  className="w-4 h-4 text-[var(--muted)] shrink-0" />
                    {t(tx.share_twitter)}
                  </a>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-[var(--ink)] hover:bg-[var(--bg-2)] transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-[var(--muted)] shrink-0" />
                    {t(tx.share_linkedin)}
                  </a>
                </div>
              </div>

            </div>
          </aside>
        </div>
      </section>

      {/* ── Mobile share ──────────────────────────────── */}
      <div className="lg:hidden container pb-8">
        <div className="bg-white rounded-2xl border border-[var(--border)] p-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)] mb-3">
            {t(tx.share)}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={copyLink}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold border border-[var(--border)] text-[var(--ink)] hover:border-[var(--accent)] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? t(tx.copied) : t(tx.copy_link)}
            </button>
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold border border-[var(--border)] text-[var(--ink)] hover:border-[var(--accent)] transition-colors"
            >
              <Twitter className="w-3.5 h-3.5" />
              {t(tx.share_twitter)}
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold border border-[var(--border)] text-[var(--ink)] hover:border-[var(--accent)] transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              {t(tx.share_linkedin)}
            </a>
          </div>
        </div>
      </div>

      {/* ── Related posts ─────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="bg-[var(--bg-2)] border-t border-[var(--border)] py-20">
          <div className="container">
            <h2
              className="text-[clamp(24px,3vw,36px)] font-bold text-[var(--ink)] mb-10"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t(tx.related_posts)}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((p) => (
                <BlogCard key={p.id} post={p} className="h-full" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Footer strip ──────────────────────────────── */}
      <div className="border-t border-[var(--border)] py-8 bg-[var(--bg)]">
        <div className="container flex items-center justify-between gap-4 flex-wrap">
          <span className="text-[13px] text-[var(--muted)]">© 2025 Stackora Labs</span>
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
