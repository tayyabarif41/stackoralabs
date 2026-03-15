export interface DevToUser {
  name: string;
  username: string;
  twitter_username: string | null;
  github_username: string | null;
  website_url: string | null;
  profile_image: string;
  profile_image_90: string;
}

export interface DevToArticle {
  type_of: string;
  id: number;
  title: string;
  description: string;
  readable_publish_date: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  collection_id: number | null;
  published_timestamp: string;
  positive_reactions_count: number;
  cover_image: string | null;
  social_image: string;
  canonical_url: string;
  created_at: string;
  edited_at: string | null;
  crossposted_at: string | null;
  published_at: string;
  last_comment_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  tags: string;
  body_html?: string;
  body_markdown?: string;
  user: DevToUser;
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  slug: string;
  path: string;
  url: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
  coverImage: string | null;
  socialImage: string;
  reactions: number;
  author: DevToUser;
  bodyHtml?: string;
}

export function mapArticle(a: DevToArticle): BlogPost {
  return {
    id:          a.id,
    title:       a.title,
    description: a.description,
    slug:        a.slug,
    path:        a.path,
    url:         a.url,
    publishedAt: a.published_at,
    readingTime: a.reading_time_minutes,
    tags:        a.tag_list,
    coverImage:  a.cover_image,
    socialImage: a.social_image,
    reactions:   a.public_reactions_count,
    author:      a.user,
    bodyHtml:    a.body_html,
  };
}
