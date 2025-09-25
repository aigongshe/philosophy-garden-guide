import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/config';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# 重要页面
Allow: /posts/
Allow: /categories/
Allow: /about

# 禁止访问的路径
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: *.json$

# 站点地图
Sitemap: ${siteConfig.url}/sitemap.xml

# 爬取延迟（可选）
Crawl-delay: 1

# 特定搜索引擎规则
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Baiduspider
Allow: /
Crawl-delay: 2

# 社交媒体爬虫
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

# 禁止恶意爬虫
User-agent: SemrushBot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}