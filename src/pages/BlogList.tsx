import { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, TrendingUp, ArrowRight } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import BlogCard from '@/components/BlogCard';
import BlogSkeleton from '@/components/BlogSkeleton';
import BlogError from '@/components/BlogError';

gsap.registerPlugin(ScrollTrigger);

export default function BlogList() {
  const { posts, loading, error } = useBlogPosts();
  const [search,    setSearch]    = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const heroRef = useRef<HTMLDivElement>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ['All', ...Array.from(set).slice(0, 12)];
  }, [posts]);

  const featured = posts[0] ?? null;
  const rest      = posts.slice(1);

  const filtered = useMemo(() => {
    return rest.filter((p) => {
      const matchTag    = activeTag === 'All' || p.tags.includes(activeTag);
      const matchSearch = !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchTag && matchSearch;
    });
  }, [rest, activeTag, search]);

  const trending = useMemo(
    () => [...posts].sort((a, b) => b.reactions - a.reactions).slice(0, 4),
    [posts]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.blog-hero-content',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (loading || filtered.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.blog-card-item',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: '.blog-grid', start: 'top 85%', once: true } }
      );
    });
    return () => ctx.revert();
  }, [loading, filtered.length]);

  return (
    <div className="min-h-screen bg-[var(--bg)]">

      {/* ── Hero ───────────────────────────────────── */}
      <section ref={heroRef} className="pt-[112px] pb-16 bg-[var(--bg-2)] border-b border-[var(--border)]">
        <div className="container">
          <div className="blog-hero-content max-w-3xl">
            <span className="tag mb-4">Insights & Thinking</span>
            <h1 className="text-[clamp(40px,6vw,76px)] font-[var(--font-display)] font-semibold leading-[0.9] text-[var(--ink)] mb-6">
              GCC Ecommerce<br />
              <span className="text-[var(--accent)]">Perspectives.</span>
            </h1>
            <p className="text-[17px] text-[var(--muted)] leading-relaxed max-w-xl mb-8">
              Expert thinking on Shopify strategy, Arabic UX, and building stores that scale across the Gulf.
            </p>
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-2)]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles…"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[var(--border)] bg-white text-[14px] text-[var(--ink)] placeholder:text-[var(--muted-2)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured post ──────────────────────────── */}
      {!loading && !error && featured && (
        <section className="container py-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="tag">Featured Article</span>
          </div>
          <BlogCard post={featured} variant="featured" />
        </section>
      )}

      {/* ── Category filter + grid ─────────────────── */}
      <section className="container pb-20">
        {!loading && allTags.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-full text-[12px] font-semibold border transition-all ${
                  activeTag === tag
                    ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                    : 'bg-white text-[var(--muted)] border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {loading && <BlogSkeleton count={6} />}
        {!loading && error && <BlogError message={error} />}
        {!loading && !error && (
          filtered.length > 0 ? (
            <div className="blog-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <div key={post.id} className="blog-card-item">
                  <BlogCard post={post} className="h-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-[var(--muted)] text-[15px]">
                No articles found for "<strong>{search || activeTag}</strong>"
              </p>
            </div>
          )
        )}
      </section>

      {/* ── Trending row ───────────────────────────── */}
      {!loading && trending.length > 0 && (
        <section className="bg-[var(--bg-2)] border-t border-[var(--border)] py-16">
          <div className="container">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-4 h-4 text-[var(--accent)]" />
              <h2 className="text-[18px] font-semibold text-[var(--ink)]">Trending</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {trending.map((post) => (
                <BlogCard key={post.id} post={post} variant="compact" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Tag cloud ──────────────────────────────── */}
      {!loading && allTags.length > 2 && (
        <section className="container py-16 border-t border-[var(--border)]">
          <h2 className="text-[18px] font-semibold text-[var(--ink)] mb-6">Browse by Topic</h2>
          <div className="flex flex-wrap gap-2">
            {allTags.slice(1).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setActiveTag(tag);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-xl text-[13px] font-medium bg-[var(--bg-2)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
              >
                #{tag}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ── Newsletter CTA ─────────────────────────── */}
      <section className="dark-section py-20">
        <div className="container text-center max-w-xl mx-auto">
          <h2 className="text-[clamp(24px,4vw,42px)] font-[var(--font-display)] font-semibold text-white mb-4">
            GCC Ecommerce insights, weekly.
          </h2>
          <p className="text-white/60 text-[15px] mb-8">
            Strategy, case studies, and Shopify content — curated for GCC merchants.
          </p>
          <Link to="/contact" className="btn btn-accent">
            Get in touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Footer strip ───────────────────────────── */}
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
