// 统一内容类型定义 - 哲学的花园导游
// 这个文件定义了整个网站的数据结构，确保类型安全和一致性

export interface Author {
  name: string;
  bio: string;
  avatar: string;
  social: {
    youtube: string;
    email: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  hoverColor: string;
  icon: string;
  count: number;
  featured: boolean;
  keywords: string[];
  difficulty: '入门' | '中级' | '进阶';
  popularity: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  content?: string;
  category: string;
  categorySlug: string;
  readingTime: number;
  publishedAt: string;
  updatedAt?: string;
  featured: boolean;
  tags: string[];
  excerpt: string;
  difficulty: '入门' | '中级' | '进阶';
  popularity: number;
  author: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  relatedPosts?: string[];
  thumbnail?: string;
  status: 'draft' | 'published' | 'archived';
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  category: string;
  featured: boolean;
  publishedAt: string;
  youtubeUrl: string;
  embedUrl: string;
  tags: string[];
  transcript?: string;
  relatedVideos?: string[];
}

export interface Quote {
  id: string;
  text: string;
  author?: string;
  category: string;
  featured: boolean;
  source?: string;
  context?: string;
}

export interface ChannelStats {
  subscribers: string;
  totalViews: string;
  videosCount: string;
  avgWatchTime: string;
  lastUpdated: string;
}

export interface SiteMetrics {
  totalPosts: number;
  totalCategories: number;
  totalViews: string;
  avgReadingTime: number;
  userSatisfaction: number;
  lastUpdated: string;
}

// 内容查询和过滤接口
export interface ContentFilter {
  category?: string;
  difficulty?: string;
  featured?: boolean;
  tags?: string[];
  limit?: number;
  offset?: number;
  sortBy?: 'publishedAt' | 'popularity' | 'readingTime';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  hasMore: boolean;
  filters: ContentFilter;
}

// SEO相关类型
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: Record<string, any>;
}

// 导航和菜单类型
export interface NavigationItem {
  name: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
  external?: boolean;
}

// 错误处理类型
export interface ContentError {
  code: string;
  message: string;
  details?: any;
}

// 内容验证结果
export interface ValidationResult {
  isValid: boolean;
  errors: ContentError[];
  warnings: string[];
}

// 内容统计类型
export interface ContentStats {
  posts: {
    total: number;
    byCategory: Record<string, number>;
    byDifficulty: Record<string, number>;
    avgPopularity: number;
  };
  categories: {
    total: number;
    featured: number;
    avgPostCount: number;
  };
  videos: {
    total: number;
    totalViews: string;
    avgDuration: string;
  };
}

// 内容关系类型
export interface ContentRelation {
  type: 'related' | 'series' | 'prerequisite' | 'followup';
  targetId: string;
  strength: number; // 0-1, 关联强度
  description?: string;
}

// 内容元数据
export interface ContentMetadata {
  wordCount?: number;
  imageCount?: number;
  linkCount?: number;
  lastModified: string;
  version: number;
  checksum?: string;
}

// 完整的内容项目接口
export interface ContentItem extends Post {
  metadata: ContentMetadata;
  relations: ContentRelation[];
  seo: SEOData;
  analytics?: {
    views: number;
    shares: number;
    comments: number;
    avgTimeOnPage: number;
  };
}

// 导出所有类型的联合类型，便于类型检查
export type ContentType = Post | Video | Quote | Category;
export type ContentId = string;
export type CategorySlug = string;
export type PostSlug = string;
export type VideoId = string;