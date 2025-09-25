// 统一数据访问层 - 哲学的花园导游
import { Post, Category, Video, Quote, ContentFilter, SearchResult, ContentStats } from '@/lib/types/content';
import { validateAllContent } from '@/lib/utils/validation';

// 导入所有数据源
import { posts, getPostBySlug, getPostsByCategory, getFeaturedPosts as getPostsFeatured, getPostsByDifficulty, getLatestPosts, getPopularPosts, searchPosts, getRelatedPosts, getPostStats } from './posts';
import { categories, getCategoryBySlug, getCategoryById, getFeaturedCategories, getCategoriesByDifficulty, getCategoryStats, searchCategories } from './categories';
import { videos, channelStats, getVideoById, getVideosByCategory, getFeaturedVideos, getLatestVideos, searchVideos, getRelatedVideos, getVideoStats } from './videos';
import { quotes, getQuoteById, getQuotesByCategory, getFeaturedQuotes, getRandomQuote, getRandomFeaturedQuote, searchQuotes, getQuoteStats, getDailyQuote, getRelatedQuotes } from './quotes';

// 数据验证
export function validateData() {
  return validateAllContent(posts, categories, videos);
}

// 文章相关接口
export const Posts = {
  getAll: () => posts,
  getBySlug: getPostBySlug,
  getByCategory: getPostsByCategory,
  getByDifficulty: getPostsByDifficulty,
  getFeatured: getPostsFeatured,
  getLatest: getLatestPosts,
  getPopular: getPopularPosts,
  getRelated: getRelatedPosts,
  search: searchPosts,
  getStats: getPostStats
};

// 分类相关接口
export const Categories = {
  getAll: () => categories,
  getBySlug: getCategoryBySlug,
  getById: getCategoryById,
  getByDifficulty: getCategoriesByDifficulty,
  getFeatured: getFeaturedCategories,
  search: searchCategories,
  getStats: getCategoryStats,
  updatePostCounts: (): Category[] => {
    return categories.map(category => ({
      ...category,
      count: posts.filter(post => post.categorySlug === category.slug).length
    }));
  }
};

// 视频相关接口
export const Videos = {
  getAll: () => videos,
  getById: getVideoById,
  getByCategory: getVideosByCategory,
  getFeatured: getFeaturedVideos,
  getLatest: getLatestVideos,
  getRelated: getRelatedVideos,
  search: searchVideos,
  getStats: getVideoStats,
  getChannelStats: () => channelStats
};

// 名言相关接口
export const Quotes = {
  getAll: () => quotes,
  getById: getQuoteById,
  getByCategory: getQuotesByCategory,
  getFeatured: getFeaturedQuotes,
  getRandom: getRandomQuote,
  getRandomFeatured: getRandomFeaturedQuote,
  getDaily: getDailyQuote,
  getRelated: getRelatedQuotes,
  search: searchQuotes,
  getStats: getQuoteStats
};

// 综合统计
export function getContentStats(): ContentStats {
  const postStats = Posts.getStats();
  const categoryStats = Categories.getStats();
  const videoStats = Videos.getStats();
  
  return {
    posts: {
      total: postStats.total,
      byCategory: postStats.byCategory,
      byDifficulty: postStats.byDifficulty,
      avgPopularity: postStats.avgPopularity
    },
    categories: {
      total: categoryStats.total,
      featured: categoryStats.featured,
      avgPostCount: categoryStats.avgPostCount
    },
    videos: {
      total: videoStats.total,
      totalViews: videoStats.totalViews.toString(),
      avgDuration: '15分钟'
    }
  };
}

// 网站概览
export function getSiteOverview() {
  const contentStats = getContentStats();
  const featuredPosts = Posts.getFeatured();
  const featuredCategories = Categories.getFeatured();
  const featuredVideos = Videos.getFeatured();
  const dailyQuote = Quotes.getDaily();
  
  return {
    stats: contentStats,
    featured: {
      posts: featuredPosts.slice(0, 3),
      categories: featuredCategories.slice(0, 6),
      videos: featuredVideos.slice(0, 3),
      quote: dailyQuote
    },
    lastUpdated: new Date().toISOString()
  };
}

// 默认导出
export default getSiteOverview;