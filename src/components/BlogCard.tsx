import { Link } from 'react-router-dom';
import type { BlogPost } from '@/data/blogPosts';
import { useLanguage } from '@/context/LanguageContext';
import { translations, useT } from '@/i18n/translation';

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export default function BlogCard({ post, className = '' }: BlogCardProps) {
  const { lang } = useLanguage();
  const t = useT(lang);
  const tx = translations.blog;

  const title   = lang === 'ar' ? post.title.ar   : post.title.en;
  const excerpt = lang === 'ar' ? post.excerpt.ar : post.excerpt.en;

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    lang === 'ar' ? 'ar-SA' : 'en-GB',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`group flex flex-col bg-white rounded-2xl border border-[var(--border)] card-hover overflow-hidden ${className}`}
    >
      {/* Cover gradient */}
      <div
        className="h-44 w-full shrink-0 relative overflow-hidden"
        style={{ background: post.coverGradient }}
      >
        {/* Category pill */}
        <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest bg-white/15 backdrop-blur-sm text-white px-3 py-1.5 rounded-full border border-white/20">
          {post.category}
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Title */}
        <h3
          className="font-[var(--font-display)] text-[18px] font-semibold text-[var(--ink)] leading-snug mb-2 group-hover:text-[var(--accent)] transition-colors duration-200"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-[var(--muted)] text-[13px] leading-relaxed line-clamp-3 flex-1 mb-4">
          {excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-base leading-none">{post.authorAvatar}</span>
            <div>
              <p className="text-[12px] font-semibold text-[var(--ink)] leading-tight">{post.author}</p>
              <p className="text-[11px] text-[var(--muted-2)] leading-tight">{formattedDate}</p>
            </div>
          </div>
          <span className="text-[11px] text-[var(--muted-2)] shrink-0">
            {post.readTime} {t(tx.min_read)}
          </span>
        </div>
      </div>
    </Link>
  );
}
