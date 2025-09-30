// SEO配置增强
import { Metadata } from 'next';
import { siteConfig } from './config';

// 基础SEO配置
export const defaultSEO: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.seo.defaultImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.seo.defaultImage],
    creator: '@guochunlinthink',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

// 文章页面SEO生成器
export function generateArticleSEO({
  title,
  description,
  publishedTime,
  modifiedTime,
  authors = [siteConfig.author.name],
  tags = [],
  images = [],
  slug,
}: {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  images?: string[];
  slug: string;
}): Metadata {
  const url = `${siteConfig.url}/posts/${slug}`;
  const defaultImage = images[0] || siteConfig.seo.defaultImage;

  return {
    title,
    description,
    keywords: [...tags, ...siteConfig.seo.keywords],
    authors: authors.map(author => ({ name: author })),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      locale: 'zh_CN',
      url,
      title,
      description,
      siteName: siteConfig.name,
      publishedTime,
      modifiedTime: modifiedTime || publishedTime,
      authors,
      tags,
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [defaultImage],
      creator: '@guochunlinthink',
    },
  };
}

// 分类页面SEO生成器
export function generateCategorySEO({
  categoryName,
  description,
  slug,
  postCount,
}: {
  categoryName: string;
  description: string;
  slug: string;
  postCount: number;
}): Metadata {
  const title = `${categoryName} - ${siteConfig.name}`;
  const url = `${siteConfig.url}/categories/${slug}`;
  const enhancedDescription = `${description} 共${postCount}篇精选文章，深度探索${categoryName}的智慧内容。`;

  return {
    title,
    description: enhancedDescription,
    keywords: [categoryName, ...siteConfig.seo.keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: 'zh_CN',
      url,
      title,
      description: enhancedDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.seo.defaultImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: enhancedDescription,
      images: [siteConfig.seo.defaultImage],
    },
  };
}

// 结构化数据生成器
export function generateArticleJsonLd({
  title,
  description,
  publishedTime,
  modifiedTime,
  author,
  slug,
  images = [],
}: {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  slug: string;
  images?: string[];
}) {
  const url = `${siteConfig.url}/posts/${slug}`;
  const defaultImage = images[0] || siteConfig.seo.defaultImage;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: images.length > 0 ? images : [defaultImage],
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Person',
      name: author,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
  };
}

// 网站结构化数据
export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Website',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

// 面包屑导航结构化数据
export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// FAQ结构化数据生成器
export function generateFAQJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// SEO工具函数
export const seoUtils = {
  // 生成页面标题
  generateTitle: (pageTitle?: string) => {
    if (!pageTitle) return siteConfig.name;
    return `${pageTitle} | ${siteConfig.name}`;
  },

  // 生成页面描述
  generateDescription: (content: string, maxLength = 160) => {
    const cleanContent = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    return cleanContent.length > maxLength 
      ? `${cleanContent.substring(0, maxLength - 3)}...`
      : cleanContent;
  },

  // 生成关键词
  generateKeywords: (customKeywords: string[] = []) => {
    return [...new Set([...customKeywords, ...siteConfig.seo.keywords])];
  },

  // 生成规范URL
  generateCanonicalUrl: (path: string) => {
    return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
  },

  // 验证SEO数据
  validateSEO: (data: { title?: string; description?: string; keywords?: string[] }) => {
    const errors: string[] = [];
    
    if (!data.title || data.title.length < 10 || data.title.length > 60) {
      errors.push('标题长度应在10-60字符之间');
    }
    
    if (!data.description || data.description.length < 50 || data.description.length > 160) {
      errors.push('描述长度应在50-160字符之间');
    }
    
    if (!data.keywords || data.keywords.length < 3) {
      errors.push('至少需要3个关键词');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  },
};
