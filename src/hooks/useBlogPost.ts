import { useEffect, useState } from 'react';
import type { BlogPost, DevToArticle } from '@/types/blog';
import { mapArticle } from '@/types/blog';

export interface UseBlogPostResult {
  post: BlogPost | null;
  loading: boolean;
  error: string | null;
}

export function useBlogPost(id: number): UseBlogPostResult {
  const [post,    setPost]    = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    if (!id || isNaN(id)) {
      setError('Invalid article id');
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchPost() {
      try {
        const res = await fetch(`https://dev.to/api/articles/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: DevToArticle = await res.json();
        if (!cancelled) setPost(mapArticle(data));
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load article');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPost();
    return () => { cancelled = true; };
  }, [id]);

  return { post, loading, error };
}
