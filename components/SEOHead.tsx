'use client';

import { siteConfig } from '@/lib/config';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  category?: string;
}

export default function SEOHead({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  category,
}: SEOHeadProps) {
  const seoTitle = title ? `${title} - ${siteConfig.name}` : siteConfig.name;
  const seoDescription = description || siteConfig.description;
  const seoImage = image || siteConfig.seo.defaultImage;
  const seoUrl = url || siteConfig.url;
  const seoKeywords = [...siteConfig.seo.keywords, ...keywords].join(', ');

  // 结构化数据
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // 网站信息
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          '@id': `${siteConfig.url}/#person`,
        },
        potentialAction: [
          {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        ],
      },
      // 作者信息
      {
        '@type': 'Person',
        '@id': `${siteConfig.url}/#person`,
        name: siteConfig.author.name,
        description: siteConfig.author.bio,
        url: siteConfig.url,
        sameAs: [
          siteConfig.author.social.youtube,
        ],
        knowsAbout: [
          '哲学思维',
          '商业智慧',
          '人生哲学',
          '教育理念',
          '个人成长',
        ],
        jobTitle: '哲学思维导师',
        worksFor: {
          '@type': 'Organization',
          name: siteConfig.name,
        },
      },
      // 组织信息
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        founder: {
          '@id': `${siteConfig.url}/#person`,
        },
        sameAs: [
          siteConfig.author.social.youtube,
        ],
      },
    ],
  };

  // 如果是文章页面，添加文章结构化数据
  if (type === 'article' && publishedTime) {
    const articleData: any = {
      '@type': 'Article',
      '@id': `${seoUrl}/#article`,
      headline: title || seoTitle,
      description: seoDescription,
      image: seoImage,
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      author: {
        '@id': `${siteConfig.url}/#person`,
      },
      publisher: {
        '@id': `${siteConfig.url}/#organization`,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': seoUrl,
      },
      articleSection: category,
      inLanguage: 'zh-CN',
    };
    
    structuredData['@graph'].push(articleData);
  }

  return (
    <>
      {/* 基础SEO标签 */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content={author || siteConfig.author.name} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="zh-CN" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Open Graph 标签 */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="zh_CN" />
      
      {/* Twitter Card 标签 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      
      {/* 文章特定标签 */}
      {type === 'article' && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:modified_time" content={modifiedTime || publishedTime} />
          <meta property="article:author" content={author || siteConfig.author.name} />
          {category && <meta property="article:section" content={category} />}
        </>
      )}
      
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2),
        }}
      />
      
      {/* 额外的SEO优化标签 */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#3B82F6" />
      <link rel="canonical" href={seoUrl} />
      
      {/* 预加载关键资源 */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.youtube.com" />
      <link rel="preconnect" href="https://img.youtube.com" />
      
      {/* DNS预解析 */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.youtube.com" />
      <link rel="dns-prefetch" href="//img.youtube.com" />
    </>
  );
}