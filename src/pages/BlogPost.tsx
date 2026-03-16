import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Copy, Check, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// Simple inline SVGs for platforms not in lucide-react
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const RedditIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="currentColor">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);
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

  const pageUrl     = encodeURIComponent(window.location.href);
  const pageTitle   = encodeURIComponent(post.title);
  const twitterUrl  = `https://twitter.com/intent/tweet?text=${pageTitle}&url=${pageUrl}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${pageTitle}%20${pageUrl}`;
  const redditUrl   = `https://reddit.com/submit?url=${pageUrl}&title=${pageTitle}`;
  const telegramUrl = `https://t.me/share/url?url=${pageUrl}&text=${pageTitle}`;
  const emailUrl    = `mailto:?subject=${pageTitle}&body=${pageUrl}`;

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
                <div className="space-y-1">
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
                  <a href={facebookUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-[var(--ink)] hover:bg-[var(--bg-2)] transition-colors">
                    <FacebookIcon />
                    <span className="ml-0.5">Share on Facebook</span>
                  </a>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-[var(--ink)] hover:bg-[var(--bg-2)] transition-colors">
                    <WhatsAppIcon />
                    <span className="ml-0.5">Share on WhatsApp</span>
                  </a>
                  <a href={redditUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-[var(--ink)] hover:bg-[var(--bg-2)] transition-colors">
                    <RedditIcon />
                    <span className="ml-0.5">Share on Reddit</span>
                  </a>
                  <a href={telegramUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-[var(--ink)] hover:bg-[var(--bg-2)] transition-colors">
                    <TelegramIcon />
                    <span className="ml-0.5">Share on Telegram</span>
                  </a>
                  <a href={emailUrl}
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-[var(--ink)] hover:bg-[var(--bg-2)] transition-colors">
                    <Mail className="w-4 h-4 text-[var(--muted)] shrink-0" />
                    Share via Email
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
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <a href={twitterUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold border border-[var(--border)] text-[var(--ink)] hover:border-[var(--accent)] transition-colors">
              <Twitter className="w-3.5 h-3.5" /> X
            </a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold border border-[var(--border)] text-[var(--ink)] hover:border-[var(--accent)] transition-colors">
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold border border-[var(--border)] text-[var(--ink)] hover:border-[var(--accent)] transition-colors">
              <FacebookIcon /> Facebook
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold border border-[var(--border)] text-[var(--ink)] hover:border-[var(--accent)] transition-colors">
              <WhatsAppIcon /> WhatsApp
            </a>
            <a href={redditUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold border border-[var(--border)] text-[var(--ink)] hover:border-[var(--accent)] transition-colors">
              <RedditIcon /> Reddit
            </a>
            <a href={telegramUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold border border-[var(--border)] text-[var(--ink)] hover:border-[var(--accent)] transition-colors">
              <TelegramIcon /> Telegram
            </a>
            <a href={emailUrl}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold border border-[var(--border)] text-[var(--ink)] hover:border-[var(--accent)] transition-colors">
              <Mail className="w-3.5 h-3.5" /> Email
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
