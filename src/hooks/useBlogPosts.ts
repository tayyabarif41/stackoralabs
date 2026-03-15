import { useEffect, useState } from 'react';
import type { BlogPost, DevToArticle } from '@/types/blog';
import { mapArticle } from '@/types/blog';

const CACHE_KEY = 'stackora-blog-cache';
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

interface CacheEntry {
  posts: BlogPost[];
  ts: number;
}

function readCache(): BlogPost[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.ts > CACHE_TTL) return null;
    return entry.posts;
  } catch {
    return null;
  }
}

function writeCache(posts: BlogPost[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ posts, ts: Date.now() }));
  } catch {
    // storage full — ignore
  }
}

const TAGS = ['shopify', 'ecommerce', 'webdev'];

export interface UseBlogPostsResult {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
}

export function useBlogPosts(): UseBlogPostsResult {
  const [posts,   setPosts]   = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    const cached = readCache();
    if (cached) {
      setPosts(cached);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchAll() {
      try {
        const responses = await Promise.all(
          TAGS.map((tag) =>
            fetch(`https://dev.to/api/articles?tag=${tag}&per_page=12`)
              .then((r) => r.json() as Promise<DevToArticle[]>)
          )
        );

        if (cancelled) return;

        // Flatten and deduplicate by id
        const seen = new Set<number>();
        const all: BlogPost[] = [];
        for (const list of responses) {
          for (const article of list) {
            if (!seen.has(article.id)) {
              seen.add(article.id);
              all.push(mapArticle(article));
            }
          }
        }

        // Sort by reactions desc
        all.sort((a, b) => b.reactions - a.reactions);

        writeCache(all);
        setPosts(all);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load posts');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAll();
    return () => { cancelled = true; };
  }, []);

  return { posts, loading, error };
}
