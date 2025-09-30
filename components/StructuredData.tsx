import { siteConfig } from '@/lib/config';
import { BlogPost, Category } from '@/lib/types';

// 郭春林个人信息结构化数据
export function PersonStructuredData() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: '郭春林',
    alternateName: 'Guo Chunlin',
    description: siteConfig.author.bio,
    url: siteConfig.url,
    image: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}${siteConfig.author.avatar}`,
      width: 400,
      height: 400
    },
    sameAs: [
      siteConfig.author.social.youtube,
      `${siteConfig.url}/about`
    ],
    jobTitle: '哲学思维导师',
    worksFor: {
      '@type': 'Organization',
      name: '哲学的花园导游',
      url: siteConfig.url
    },
    knowsAbout: [
      '哲学思维',
      '商业智慧',
      '人生哲学',
      '批判性思维',
      '系统性思维',
      '个人成长',
      '教育理念',
      '人际关系'
    ],
    expertise: [
      '哲学教育',
      '商业咨询',
      '人生指导',
      '思维训练'
    ],
    award: [
      '哲学思维践行者',
      '商业智慧分享者'
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: '北京大学',
      alternateName: 'Peking University'
    },
    nationality: {
      '@type': 'Country',
      name: '中国'
    },
    birthPlace: {
      '@type': 'Place',
      name: '中国'
    },
    gender: 'Male',
    speaks: [
      {
        '@type': 'Language',
        name: '中文',
        alternateName: 'Chinese'
      },
      {
        '@type': 'Language',
        name: '英文',
        alternateName: 'English'
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}

// 网站组织结构化数据
export function OrganizationStructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    alternateName: 'Philosophy Garden Guide',
    description: siteConfig.description,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/logo.png`,
      width: 200,
      height: 200
    },
    image: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/og-image.jpg`,
      width: 1200,
      height: 630
    },
    founder: {
      '@type': 'Person',
      name: '郭春林',
      url: `${siteConfig.url}/about`
    },
    foundingDate: '2024-01-01',
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.author.social.email,
      contactType: 'Customer Service',
      availableLanguage: ['Chinese', 'English']
    },
    sameAs: [
      siteConfig.author.social.youtube
    ],
    keywords: siteConfig.seo.keywords.join(', '),
    category: '教育服务',
    serviceType: [
      '哲学教育',
      '思维训练',
      '人生指导',
      '商业咨询'
    ],
    areaServed: {
      '@type': 'Country',
      name: '中国'
    },
    audience: {
      '@type': 'Audience',
      audienceType: '成年人',
      geographicArea: {
        '@type': 'Country',
        name: '中国'
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}

// 文章结构化数据
export function ArticleStructuredData({ post }: { post: BlogPost }) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}${post.thumbnail}`,
      width: 1200,
      height: 630
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author,
      url: `${siteConfig.url}/about`,
      image: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}${siteConfig.author.avatar}`,
        width: 400,
        height: 400
      },
      sameAs: [
        siteConfig.author.social.youtube
      ]
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
        width: 200,
        height: 200
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/posts/${post.slug}`
    },
    url: `${siteConfig.url}/posts/${post.slug}`,
    wordCount: post.content.length,
    timeRequired: `PT${post.readingTime}M`,
    articleSection: post.category,
    keywords: post.tags?.join(', ') || post.seoKeywords?.join(', '),
    about: [
      {
        '@type': 'Thing',
        name: '哲学思维',
        sameAs: 'https://zh.wikipedia.org/wiki/哲学'
      },
      {
        '@type': 'Thing',
        name: '商业智慧',
        sameAs: 'https://zh.wikipedia.org/wiki/商业'
      },
      {
        '@type': 'Person',
        name: '郭春林',
        url: `${siteConfig.url}/about`
      }
    ],
    mentions: [
      {
        '@type': 'Person',
        name: '郭春林'
      }
    ],
    inLanguage: 'zh-CN',
    copyrightHolder: {
      '@type': 'Person',
      name: '郭春林'
    },
    copyrightYear: new Date(post.publishedAt).getFullYear(),
    license: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    isAccessibleForFree: true,
    genre: [
      '哲学',
      '教育',
      '自我提升'
    ],
    educationalLevel: post.difficulty === '入门' ? 'Beginner' : post.difficulty === '中级' ? 'Intermediate' : 'Advanced',
    learningResourceType: 'Article',
    teaches: post.tags || ['哲学思维', '人生智慧']
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  );
}

// 网站导航结构化数据
export function WebsiteStructuredData() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    alternateName: 'Philosophy Garden Guide',
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      '@type': 'Person',
      name: '郭春林',
      url: `${siteConfig.url}/about`
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    mainEntity: {
      '@type': 'ItemList',
      name: '主要内容分类',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '哲学思维',
          url: `${siteConfig.url}/categories/philosophy-thinking`
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: '商业智慧',
          url: `${siteConfig.url}/categories/business-wisdom`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: '人生哲学',
          url: `${siteConfig.url}/categories/life-philosophy`
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: '个人成长',
          url: `${siteConfig.url}/categories/personal-growth`
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: '教育理念',
          url: `${siteConfig.url}/categories/education-concept`
        },
        {
          '@type': 'ListItem',
          position: 6,
          name: '人际关系',
          url: `${siteConfig.url}/categories/interpersonal-relations`
        }
      ]
    },
    inLanguage: 'zh-CN',
    copyrightHolder: {
      '@type': 'Person',
      name: '郭春林'
    },
    copyrightYear: 2024,
    license: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    isAccessibleForFree: true
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  );
}

// FAQ结构化数据
export function FAQStructuredData() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '郭春林是谁？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '郭春林是一位哲学思维的践行者和商业智慧的分享者，致力于将深邃的哲学思考转化为实用的人生指导，帮助企业家和职场人士在复杂的现代社会中找到内心的平静与事业的成功。'
        }
      },
      {
        '@type': 'Question',
        name: '哲学思维对现代人有什么帮助？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '哲学思维帮助现代人在信息爆炸的时代保持理性思考，培养批判性思维能力，学会透过现象看本质，在复杂的世界中做出明智的决策。'
        }
      },
      {
        '@type': 'Question',
        name: '如何学习商业智慧？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '学习商业智慧需要结合哲学思维，理解商业的本质不仅是交易，更是价值的创造与传递。通过深度思考和实践，培养长期主义思维和系统性思考能力。'
        }
      },
      {
        '@type': 'Question',
        name: '人生哲学如何指导日常生活？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '人生哲学帮助我们建立正确的价值观，在面临选择时有明确的判断标准，在困难时保持内心的平静，在成功时保持谦逊，最终实现内心的和谐与外在的成就。'
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
