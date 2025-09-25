import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import RelatedPosts from '@/components/RelatedPosts';
import { siteConfig } from '@/lib/config';

// 示例文章数据 - 实际项目中会从文件系统或CMS获取
const blogPosts = {
  'philosophy-thinking-guide': {
    title: '哲学思维：现代人的智慧指南',
    description: '在快节奏的现代生活中，哲学思维如何帮助我们找到内心的平静与人生的方向？',
    content: `
# 哲学思维：现代人的智慧指南

在这个信息爆炸、节奏飞快的时代，我们每天都在面对无数的选择和挑战。工作压力、人际关系、未来规划...这些问题常常让我们感到迷茫和焦虑。然而，古老的哲学智慧却能为现代人提供一盏明灯，指引我们找到内心的平静与人生的方向。

## 什么是哲学思维？

哲学思维不是高深莫测的学术概念，而是一种看待世界和思考问题的方式。它包含以下几个核心要素：

### 1. 批判性思考
不盲从权威，不轻信表象，而是通过理性分析来判断事物的本质。

### 2. 系统性思维
将复杂的问题分解，从多个角度和层面来理解和解决问题。

### 3. 价值观反思
经常审视自己的价值观和人生目标，确保行动与内心的真实想法一致。

## 哲学思维在现代生活中的应用

### 职场决策
当面临职业选择时，哲学思维帮助我们：
- 明确自己的核心价值观
- 分析不同选择的长远影响
- 平衡理想与现实的关系

### 人际关系
在处理复杂的人际关系时：
- 理解他人行为背后的动机
- 保持同理心和包容心
- 建立基于尊重和理解的关系

### 个人成长
在自我提升的道路上：
- 认识自己的优势和局限
- 设定有意义的人生目标
- 培养内在的平静和智慧

## 如何培养哲学思维？

### 1. 多读经典
阅读古今中外的哲学经典，汲取前人的智慧。

### 2. 勤于思考
对日常生活中的现象保持好奇心，经常问"为什么"。

### 3. 实践反思
定期反思自己的行为和决策，从中学习和成长。

### 4. 开放对话
与不同观点的人交流，拓宽自己的思维边界。

## 结语

哲学思维不是一蹴而就的技能，而是需要终身修炼的智慧。在这个复杂多变的世界里，让我们用哲学的眼光看待生活，用智慧的心态面对挑战，在思考中找到属于自己的人生答案。

记住，真正的智慧不在于拥有所有答案，而在于提出正确的问题。让哲学思维成为你人生路上的指南针，引领你走向更加充实和有意义的生活。
    `,
    category: '哲学思维',
    author: '郭春林',
    publishedAt: '2024-01-15',
    readingTime: 8,
    tags: ['哲学', '思维', '理性', '现代生活'],
    youtubeVideoId: 'dQw4w9WgXcQ', // 示例视频ID
  },
  'business-philosophy-success': {
    title: '商业哲学：成功企业家的思维模式',
    description: '探索成功企业家背后的哲学思维，如何将智慧转化为商业成功的动力。',
    content: `
# 商业哲学：成功企业家的思维模式

成功的企业家往往不仅仅是商业技巧的高手，更是具有深刻哲学思维的智者。他们能够在复杂的商业环境中保持清醒的头脑，做出正确的战略决策。今天，让我们探索成功企业家背后的哲学思维模式。

## 企业家的哲学基础

### 1. 长远视野
真正的企业家不会被短期利益所迷惑，而是具有长远的战略眼光。

### 2. 价值创造
优秀的企业家明白，真正的成功来自于为社会创造价值，而不仅仅是获取利润。

### 3. 持续学习
在快速变化的商业环境中，保持学习的心态是企业家成功的关键。

## 商业决策中的哲学智慧

### 风险与机遇的平衡
哲学思维帮助企业家：
- 理性评估风险和机遇
- 在不确定性中做出决策
- 保持冷静和客观的判断

### 团队管理的艺术
- 理解人性的复杂性
- 激发团队的内在动力
- 建立基于信任的企业文化

## 实践案例分析

让我们通过一些成功企业家的案例，来理解哲学思维在商业实践中的应用...

[文章内容继续...]
    `,
    category: '商业智慧',
    author: '郭春林',
    publishedAt: '2024-01-10',
    readingTime: 12,
    tags: ['商业', '企业家', '成功', '哲学'],
    youtubeVideoId: 'dQw4w9WgXcQ',
  },
  // 可以添加更多文章...
};

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = blogPosts[params.slug as keyof typeof blogPosts];
  
  if (!post) {
    return {
      title: '文章未找到',
    };
  }

  return {
    title: `${post.title} - ${siteConfig.name}`,
    description: post.description,
    keywords: [...post.tags, '郭春林', siteConfig.name],
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default function PostPage({ params }: PageProps) {
  const post = blogPosts[params.slug as keyof typeof blogPosts];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <header className="mb-12">
          <div className="text-center mb-8">
            {/* Category */}
            <span className="inline-block bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
            
            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            {/* Description */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.description}
            </p>
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-xs">郭</span>
                </div>
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time>
                  {new Date(post.publishedAt).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{post.readingTime} 分钟阅读</span>
              </div>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
        </article>

        {/* YouTube Video */}
        {post.youtubeVideoId && (
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              相关视频内容
            </h3>
            <YouTubeEmbed
              videoId={post.youtubeVideoId}
              title={`${post.title} - 视频讲解`}
            />
          </section>
        )}

        {/* YouTube Channel CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              获取更多深度内容
            </h3>
            <p className="text-gray-600 mb-6">
              订阅郭春林的YouTube频道，观看更多哲学思维和人生智慧的视频内容
            </p>
            <a
              href={siteConfig.author.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              订阅 YouTube 频道
            </a>
          </div>
        </section>

        {/* Related Posts */}
        <RelatedPosts currentSlug={params.slug} category={post.category} />
      </main>

      <Footer />
    </div>
  );
}