// 数据验证和工具函数
import { Post, Category, Video, Quote, ValidationResult, ContentError } from '@/lib/types/content';

/**
 * 验证文章数据的完整性和正确性
 */
export function validatePost(post: Partial<Post>): ValidationResult {
  const errors: ContentError[] = [];
  const warnings: string[] = [];

  // 必填字段验证
  if (!post.slug) {
    errors.push({ code: 'MISSING_SLUG', message: '文章slug不能为空' });
  } else if (!/^[a-z0-9-]+$/.test(post.slug)) {
    errors.push({ code: 'INVALID_SLUG', message: 'slug只能包含小写字母、数字和连字符' });
  }

  if (!post.title || post.title.trim().length === 0) {
    errors.push({ code: 'MISSING_TITLE', message: '文章标题不能为空' });
  } else if (post.title.length > 100) {
    warnings.push('标题过长，建议控制在100字符以内');
  }

  if (!post.description || post.description.trim().length === 0) {
    errors.push({ code: 'MISSING_DESCRIPTION', message: '文章描述不能为空' });
  } else if (post.description.length > 300) {
    warnings.push('描述过长，建议控制在300字符以内');
  }

  if (!post.category) {
    errors.push({ code: 'MISSING_CATEGORY', message: '文章分类不能为空' });
  }

  if (!post.publishedAt) {
    errors.push({ code: 'MISSING_PUBLISH_DATE', message: '发布日期不能为空' });
  } else {
    const publishDate = new Date(post.publishedAt);
    if (isNaN(publishDate.getTime())) {
      errors.push({ code: 'INVALID_PUBLISH_DATE', message: '发布日期格式无效' });
    }
  }

  // 数值验证
  if (post.readingTime !== undefined) {
    if (post.readingTime <= 0 || post.readingTime > 60) {
      warnings.push('阅读时间应该在1-60分钟之间');
    }
  }

  if (post.popularity !== undefined) {
    if (post.popularity < 0 || post.popularity > 100) {
      errors.push({ code: 'INVALID_POPULARITY', message: '热度值应该在0-100之间' });
    }
  }

  // 数组验证
  if (post.tags && post.tags.length > 10) {
    warnings.push('标签数量过多，建议控制在10个以内');
  }

  // SEO验证
  if (post.seoTitle && post.seoTitle.length > 60) {
    warnings.push('SEO标题过长，建议控制在60字符以内');
  }

  if (post.seoDescription && post.seoDescription.length > 160) {
    warnings.push('SEO描述过长，建议控制在160字符以内');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * 验证分类数据
 */
export function validateCategory(category: Partial<Category>): ValidationResult {
  const errors: ContentError[] = [];
  const warnings: string[] = [];

  if (!category.id) {
    errors.push({ code: 'MISSING_ID', message: '分类ID不能为空' });
  }

  if (!category.name) {
    errors.push({ code: 'MISSING_NAME', message: '分类名称不能为空' });
  }

  if (!category.slug) {
    errors.push({ code: 'MISSING_SLUG', message: '分类slug不能为空' });
  } else if (!/^[a-z0-9-]+$/.test(category.slug)) {
    errors.push({ code: 'INVALID_SLUG', message: 'slug只能包含小写字母、数字和连字符' });
  }

  if (!category.description) {
    errors.push({ code: 'MISSING_DESCRIPTION', message: '分类描述不能为空' });
  }

  if (category.popularity !== undefined) {
    if (category.popularity < 0 || category.popularity > 100) {
      errors.push({ code: 'INVALID_POPULARITY', message: '热度值应该在0-100之间' });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * 验证视频数据
 */
export function validateVideo(video: Partial<Video>): ValidationResult {
  const errors: ContentError[] = [];
  const warnings: string[] = [];

  if (!video.id) {
    errors.push({ code: 'MISSING_ID', message: '视频ID不能为空' });
  }

  if (!video.title) {
    errors.push({ code: 'MISSING_TITLE', message: '视频标题不能为空' });
  }

  if (!video.youtubeUrl) {
    errors.push({ code: 'MISSING_URL', message: 'YouTube链接不能为空' });
  } else if (!isValidYouTubeUrl(video.youtubeUrl)) {
    errors.push({ code: 'INVALID_YOUTUBE_URL', message: 'YouTube链接格式无效' });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * 工具函数：验证YouTube URL
 */
export function isValidYouTubeUrl(url: string): boolean {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/;
  return youtubeRegex.test(url);
}

/**
 * 工具函数：从YouTube URL提取视频ID
 */
export function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : null;
}

/**
 * 工具函数：生成YouTube缩略图URL
 */
export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'maxres'): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
}

/**
 * 工具函数：生成YouTube嵌入URL
 */
export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * 工具函数：计算阅读时间
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * 工具函数：生成SEO友好的slug
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/[\s_-]+/g, '-') // 替换空格和下划线为连字符
    .replace(/^-+|-+$/g, ''); // 移除开头和结尾的连字符
}

/**
 * 工具函数：格式化日期
 */
export function formatDate(date: string | Date, locale: string = 'zh-CN'): string {
  const d = new Date(date);
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * 工具函数：计算内容相似度
 */
export function calculateSimilarity(content1: string, content2: string): number {
  // 简单的基于关键词的相似度计算
  const words1 = new Set(content1.toLowerCase().split(/\s+/));
  const words2 = new Set(content2.toLowerCase().split(/\s+/));
  
  const intersection = new Set(Array.from(words1).filter(x => words2.has(x)));
  const union = new Set([...Array.from(words1), ...Array.from(words2)]);
  
  return intersection.size / union.size;
}

/**
 * 工具函数：提取关键词
 */
export function extractKeywords(content: string, maxKeywords: number = 10): string[] {
  // 简单的关键词提取（实际项目中可以使用更复杂的NLP算法）
  const words = content
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3); // 过滤短词

  const wordCount = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(wordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxKeywords)
    .map(([word]) => word);
}

/**
 * 工具函数：验证所有内容数据
 */
export function validateAllContent(posts: Post[], categories: Category[], videos: Video[]): ValidationResult {
  const errors: ContentError[] = [];
  const warnings: string[] = [];

  // 验证文章
  posts.forEach((post, index) => {
    const result = validatePost(post);
    if (!result.isValid) {
      errors.push(...result.errors.map(error => ({
        ...error,
        message: `文章 ${index + 1} (${post.slug}): ${error.message}`
      })));
    }
    warnings.push(...result.warnings.map(warning => `文章 ${post.slug}: ${warning}`));
  });

  // 验证分类
  categories.forEach((category, index) => {
    const result = validateCategory(category);
    if (!result.isValid) {
      errors.push(...result.errors.map(error => ({
        ...error,
        message: `分类 ${index + 1} (${category.slug}): ${error.message}`
      })));
    }
    warnings.push(...result.warnings.map(warning => `分类 ${category.slug}: ${warning}`));
  });

  // 验证视频
  videos.forEach((video, index) => {
    const result = validateVideo(video);
    if (!result.isValid) {
      errors.push(...result.errors.map(error => ({
        ...error,
        message: `视频 ${index + 1} (${video.id}): ${error.message}`
      })));
    }
    warnings.push(...result.warnings.map(warning => `视频 ${video.id}: ${warning}`));
  });

  // 交叉验证
  const categoryIds = new Set(categories.map(c => c.id));
  posts.forEach(post => {
    if (!categoryIds.has(post.categorySlug)) {
      errors.push({
        code: 'INVALID_CATEGORY_REFERENCE',
        message: `文章 ${post.slug} 引用了不存在的分类: ${post.categorySlug}`
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}