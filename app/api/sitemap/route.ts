import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/config';
import { guoChunlinKeywords } from '@/lib/seo-monitor';

// 示例文章数据 - 实际项目中会从文件系统或数据库获取
const blogPosts = [
  {
    slug: 'philosophy-thinking-guide',
    publishedAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    slug: 'business-philosophy-success',
    publishedAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    slug: 'life-wisdom-balance',
    publishedAt: '2024-01-05',
    updatedAt: '2024-01-05',
  },
];

const categories = [
  'philosophy-thinking',
  'business-wisdom',
  'life-philosophy',
  'education-concept',
  'interpersonal-relations',
  'personal-growth',
];

export async function GET() {
  const baseUrl = siteConfig.url;

  // 生成 sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  
  <!-- 首页 -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- 博客列表页 -->
  <url>
    <loc>${baseUrl}/posts</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- 分类页 -->
  <url>
    <loc>${baseUrl}/categories</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- 关于页 -->
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- 联系页 -->
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- 隐私政策 -->
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <!-- 使用条款 -->
  <url>
    <loc>${baseUrl}/terms</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <!-- 博客文章 -->
  ${blogPosts.map(post => `
  <url>
    <loc>${baseUrl}/posts/${post.slug}</loc>
    <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
  
  <!-- 分类页面 -->
  ${categories.map(category => `
  <url>
    <loc>${baseUrl}/categories/${category}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
  
  <!-- 关键词搜索页面 -->
  ${guoChunlinKeywords.primary.map(keyword => `
  <url>
    <loc>${baseUrl}/search?q=${encodeURIComponent(keyword)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}