import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Copy, Check, Twitter, Linkedin, ExternalLink } from 'lucide-react';
import { useBlogPost } from '@/hooks/useBlogPost';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import BlogCard from '@/components/BlogCard';
import BlogSkeleton from '@/components/BlogSkeleton';
import BlogError from '@/components/BlogError';

gsap.registerPlugin(ScrollTrigger);

interface TocItem { id: string; text: string }

function extractToc(html: string): TocItem[] {
  const parser = new DOMParser();
  const doc    = parser.parseFromString(html, 'text/html');
  return Array.from(doc.querySelectorAll('h2')).map((h) => ({
    id:   h.textContent?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim() ?? '',
    text: h.textContent ?? '',
  }));
}

function assignIds(container: HTMLElement) {
  container.querySelectorAll<HTMLElement>('h2').forEach((h) => {
    h.id = h.textContent?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim() ?? '';
  });
}

export default function BlogPost() {
  const { slug }  = useParams<{ slug: string }>();
  const id        = parseInt(slug?.split('-')[0] ?? '', 10);

  const { post, loading, error } = useBlogPost(id);
  const { posts: allPosts }      = useBlogPosts();

  const [readingProgress, setReadingProgress] = useState(0);
  const [activeHeading,   setActiveHeading]   = useState('');
  const [copied,          setCopied]          = useState(false);
  const [toc,             setToc]             = useState<TocItem[]>([]);

  const articleRef = useRef<HTMLDivElement>(null);
  const heroRef    = useRef<HTMLDivElement>(null);

  // Reading progress
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setReadingProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Build ToC + observe headings after body renders
  useEffect(() => {
    if (!post?.bodyHtml || !articleRef.current) return;
    setToc(extractToc(post.bodyHtml));
    assignIds(articleRef.current);

    const observers: IntersectionObserver[] = [];
    articleRef.current.querySelectorAll<HTMLElement>('h2').forEach((h) => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveHeading(h.id); },
        { rootMargin: '-15% 0px -70% 0px' }
      );
      obs.observe(h);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, [post]);

  // GSAP animations
  useEffect(() => {
    if (!post) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.post-hero-content',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 }
      );
    }, heroRef);

    const bodyCtx = gsap.context(() => {
      if (!articleRef.current) return;
      const els = articleRef.current.querySelectorAll('p, h2, h3, blockquote, ul');
      if (!els.length) return;
      gsap.fromTo(els,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.04, ease: 'power2.out',
          scrollTrigger: { trigger: articleRef.current, start: 'top 90%', once: true } }
      );
    });

    return () => { ctx.revert(); bodyCtx.revert(); };
  }, [post]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedPosts = allPosts
    .filter((p) => p.id !== id && p.tags.some((t) => post?.tags.includes(t)))
    .slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] pt-[152px]">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-4 mb-12">
            <div className="h-4 w-20 bg-[var(--bg-3)] rounded-full animate-pulse" />
            <div className="h-10 w-3/4 bg-[var(--bg-3)] rounded-xl animate-pulse" />
            <div className="h-10 w-1/2 bg-[var(--bg-3)] rounded-xl animate-pulse" />
          </div>
          <BlogSkeleton count={3} />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[var(--bg)] pt-[152px]">
        <div className="container">
          <BlogError message={error ?? 'Article not found'} />
        </div>
      </div>
    );
  }

  const twitterUrl  = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`;

  return (
    <div className="relative min-h-screen bg-[var(--bg)]">

      {/* Reading progress */}
      <div className="fixed top-0 inset-x-0 z-[60] h-[3px] bg-[var(--border)]">
        <div className="h-full bg-[var(--accent)] transition-none" style={{ width: `${readingProgress}%` }} />
      </div>

      {/* ── Sticky mini-header ──────────────────────── */}
      <div className="fixed top-[72px] inset-x-0 z-40 bg-[rgba(var(--bg-rgb,248,246,242),0.95)] backdrop-blur-xl border-b border-[var(--border)]">
        <div className="container">
          <div className="flex items-center justify-between h-12 gap-4">
            <Link
              to="/blog"
              className="flex items-center gap-2 text-[12px] font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors uppercase tracking-wider shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Articles
            </Link>
            {post.tags[0] && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] shrink-0">
                {post.tags[0]}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Hero ────────────────────────────────────── */}
      <section ref={heroRef} className="pt-[152px] pb-0">
        <div className="container">
          <div className="post-hero-content max-w-3xl mx-auto text-center">
            {post.tags[0] && (
              <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--accent)] mb-4 block">
                {post.tags[0]}
              </span>
            )}
            <h1
              className="text-[clamp(28px,5vw,60px)] font-bold text-[var(--ink)] leading-tight mb-8"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <img src={post.author.profile_image_90} alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover" />
              <div className="text-left">
                <p className="text-[14px] font-semibold text-[var(--ink)]">{post.author.name}</p>
                <p className="text-[12px] text-[var(--muted-2)]">@{post.author.username}</p>
              </div>
              <div className="w-px h-8 bg-[var(--border)]" />
              <div className="text-left">
                <p className="text-[12px] text-[var(--muted)]">
                  {new Date(post.publishedAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-[12px] text-[var(--muted-2)]">{post.readingTime} min read</p>
              </div>
            </div>
          </div>
        </div>

        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="post-cover mt-10 w-full h-[360px] md:h-[440px] object-cover"
          />
        ) : (
          <div
            className="post-cover mt-10 w-full h-[360px] md:h-[440px] bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)]"
          />
        )}
      </section>

      {/* ── Article body + sidebar ──────────────────── */}
      <section className="container py-16">
        <div className="grid lg:grid-cols-[1fr_260px] gap-12 max-w-5xl mx-auto">

          {/* Article body */}
          <article
            ref={articleRef}
            className="prose-content min-w-0"
            dangerouslySetInnerHTML={{ __html: post.bodyHtml ?? `<p>${post.description}</p>` }}
          />

          {/* Sticky sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-[160px] space-y-6">

              {/* Table of Contents */}
              {toc.length > 0 && (
                <div className="bg-white rounded-2xl border border-[var(--border)] p-5">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)] mb-4">
                    In this article
                  </p>
                  <nav className="space-y-1">
                    {toc.map(({ id, text }) => (
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
                  Share
                </p>
                <div className="space-y-2">
                  <button type="button" onClick={copyLink}
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-[var(--ink)] hover:bg-[var(--bg-2)] transition-colors">
                    {copied ? <Check className="w-4 h-4 text-green-500 shrink-0" /> : <Copy className="w-4 h-4 text-[var(--muted)] shrink-0" />}
                    {copied ? 'Copied!' : 'Copy link'}
                  </button>
                  <a href={twitterUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-[var(--ink)] hover:bg-[var(--bg-2)] transition-colors">
                    <Twitter className="w-4 h-4 text-[var(--muted)] shrink-0" />
                    Share on X
                  </a>
                  <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-[var(--ink)] hover:bg-[var(--bg-2)] transition-colors">
                    <Linkedin className="w-4 h-4 text-[var(--muted)] shrink-0" />
                    Share on LinkedIn
                  </a>
                  <a href={post.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-[var(--ink)] hover:bg-[var(--bg-2)] transition-colors">
                    <ExternalLink className="w-4 h-4 text-[var(--muted)] shrink-0" />
                    View on dev.to
                  </a>
                </div>
              </div>

              {/* Author bio */}
              <div className="bg-white rounded-2xl border border-[var(--border)] p-5">
                <img src={post.author.profile_image} alt={post.author.name}
                  className="w-12 h-12 rounded-full mb-3 object-cover" />
                <p className="text-[14px] font-semibold text-[var(--ink)]">{post.author.name}</p>
                <p className="text-[12px] text-[var(--muted)] mt-1">@{post.author.username}</p>
                {post.author.website_url && (
                  <a href={post.author.website_url} target="_blank" rel="noopener noreferrer"
                    className="text-[12px] text-[var(--accent)] hover:underline mt-2 block truncate">
                    {post.author.website_url}
                  </a>
                )}
              </div>

            </div>
          </aside>
        </div>
      </section>

      {/* ── Mobile share ────────────────────────────── */}
      <div className="lg:hidden container pb-8">
        <div className="bg-white rounded-2xl border border-[var(--border)] p-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)] mb-3">Share</p>
          <div className="flex items-center gap-2 flex-wrap">
            <button type="button" onClick={copyLink}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold border border-[var(--border)] text-[var(--ink)] hover:border-[var(--accent)] transition-colors">
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy link'}
            </button>
            <a href={twitterUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold border border-[var(--border)] text-[var(--ink)] hover:border-[var(--accent)] transition-colors">
              <Twitter className="w-3.5 h-3.5" /> X
            </a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold border border-[var(--border)] text-[var(--ink)] hover:border-[var(--accent)] transition-colors">
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* ── Related posts ───────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="bg-[var(--bg-2)] border-t border-[var(--border)] py-20">
          <div className="container">
            <h2 className="text-[clamp(24px,3vw,36px)] font-bold text-[var(--ink)] mb-10"
              style={{ fontFamily: 'var(--font-display)' }}>
              Related Articles
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((p) => <BlogCard key={p.id} post={p} className="h-full" />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Footer strip ────────────────────────────── */}
      <div className="border-t border-[var(--border)] py-8 bg-[var(--bg)]">
        <div className="container flex items-center justify-between gap-4 flex-wrap">
          <span className="text-[13px] text-[var(--muted)]">© 2025 Stackora Labs</span>
          <Link to="/" className="text-[12px] font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>

    </div>
  );
}
