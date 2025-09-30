export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: Date;
  updatedAt: Date;
  tags: string[];
  category: string;
  featured: boolean;
  thumbnail: string;
  youtubeVideoId?: string;
  seoKeywords: string[];
  readingTime: number;
  difficulty?: '入门' | '中级' | '高级';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  count: number;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  author: {
    name: string;
    bio: string;
    avatar: string;
    social: {
      youtube: string;
      twitter?: string;
      linkedin?: string;
      email?: string;
    };
  };
  seo: {
    keywords: string[];
    defaultImage: string;
  };
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: Date;
  duration: string;
  viewCount: number;
}