import { Link } from 'react-router-dom';
import { Calendar, Clock, Heart } from 'lucide-react';
import type { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

function blogUrl(post: BlogPost) {
  return `/blog/${post.id}-${post.slug}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function BlogCard({ post, variant = 'default', className = '' }: BlogCardProps) {
  if (variant === 'featured') {
    return (
      <Link
        to={blogUrl(post)}
        className={`group block bg-white rounded-2xl border border-[var(--border)] overflow-hidden card-hover ${className}`}
      >
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-[320px] object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-[320px] bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center">
            <span className="text-white/20 text-[80px] font-[var(--font-display)] font-bold leading-none">
              {post.title.charAt(0)}
            </span>
          </div>
        )}
        <div className="p-8">
          {post.tags[0] && (
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] mb-3">
              {post.tags[0]}
            </span>
          )}
          <h2 className="font-[var(--font-display)] text-[clamp(22px,2.5vw,32px)] font-semibold leading-tight text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors mb-3">
            {post.title}
          </h2>
          <p className="text-[15px] text-[var(--muted)] leading-relaxed line-clamp-3 mb-6">
            {post.description}
          </p>
          <div className="flex items-center gap-4 text-[12px] text-[var(--muted-2)]">
            <img src={post.author.profile_image_90} alt={post.author.name}
              className="w-8 h-8 rounded-full object-cover" />
            <span className="font-medium text-[var(--muted)]">{post.author.name}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{formatDate(post.publishedAt)}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readingTime} min</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link
        to={blogUrl(post)}
        className={`group flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--bg-2)] transition-colors ${className}`}
      >
        {post.coverImage ? (
          <img src={post.coverImage} alt={post.title}
            className="w-16 h-16 rounded-xl object-cover shrink-0" />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-[var(--accent-light)] flex items-center justify-center shrink-0">
            <span className="text-[var(--accent)] text-[24px] font-[var(--font-display)] font-bold leading-none">
              {post.title.charAt(0)}
            </span>
          </div>
        )}
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-[var(--ink)] leading-snug line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
            {post.title}
          </p>
          <div className="flex items-center gap-3 mt-1.5 text-[11px] text-[var(--muted-2)]">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readingTime} min</span>
            <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{post.reactions}</span>
          </div>
        </div>
      </Link>
    );
  }

  // default
  return (
    <Link
      to={blogUrl(post)}
      className={`group flex flex-col bg-white rounded-2xl border border-[var(--border)] overflow-hidden card-hover ${className}`}
    >
      {post.coverImage ? (
        <img src={post.coverImage} alt={post.title}
          className="w-full h-[180px] object-cover group-hover:scale-105 transition-transform duration-500" />
      ) : (
        <div className="w-full h-[180px] bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center">
          <span className="text-white/20 text-[60px] font-[var(--font-display)] font-bold leading-none">
            {post.title.charAt(0)}
          </span>
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        {post.tags[0] && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] mb-2">
            {post.tags[0]}
          </span>
        )}
        <h3 className="font-[var(--font-display)] text-[18px] font-semibold leading-snug text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 mb-2">
          {post.title}
        </h3>
        <p className="text-[13px] text-[var(--muted)] leading-relaxed line-clamp-3 flex-1 mb-4">
          {post.description}
        </p>
        <div className="flex items-center gap-3 text-[11px] text-[var(--muted-2)] mt-auto">
          <img src={post.author.profile_image_90} alt={post.author.name}
            className="w-6 h-6 rounded-full object-cover" />
          <span className="font-medium text-[var(--muted)] truncate">{post.author.name}</span>
          <span className="ml-auto flex items-center gap-1 shrink-0">
            <Clock className="w-3 h-3" />{post.readingTime} min
          </span>
        </div>
      </div>
    </Link>
  );
}
