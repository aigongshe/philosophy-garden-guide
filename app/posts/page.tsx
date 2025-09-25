import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: `博客文章 - ${siteConfig.name}`,
  description: '探索郭春林的哲学思维、商业智慧和人生感悟，获得深度的思考和实用的指导',
  keywords: ['郭春林博客', '哲学文章', '商业智慧', '人生哲学', '思维方式'],
};

// 示例博客文章数据
const blogPosts = [
  {
    slug: 'philosophy-thinking-guide',
    title: '哲学思维：现代人的智慧指南',
    description: '在快节奏的现代生活中，哲学思维如何帮助我们找到内心的平静与人生的方向？探索理性思考的力量。',
    category: '哲学思维',
    readingTime: 8,
    publishedAt: '2024-01-15',
    featured: true,
    tags: ['哲学', '思维', '理性', '现代生活'],
  },
  {
    slug: 'business-philosophy-success',
    title: '商业哲学：成功企业家的思维模式',
    description: '探索成功企业家背后的哲学思维，如何将智慧转化为商业成功的动力，建立可持续的商业帝国。',
    category: '商业智慧',
    readingTime: 12,
    publishedAt: '2024-01-10',
    featured: true,
    tags: ['商业', '企业家', '成功', '哲学'],
  },
  {
    slug: 'life-wisdom-balance',
    title: '人生智慧：在忙碌中寻找生活的平衡',
    description: '如何在职场压力和生活责任之间找到平衡？古老的智慧给出了答案，让我们重新审视生活的意义。',
    category: '人生哲学',
    readingTime: 10,
    publishedAt: '2024-01-05',
    featured: true,
    tags: ['人生', '平衡', '智慧', '生活'],
  },
  {
    slug: 'education-philosophy-modern',
    title: '现代教育的哲学反思',
    description: '重新审视教育的本质和目标，探讨如何培养具有独立思考能力的下一代。',
    category: '教育理念',
    readingTime: 15,
    publishedAt: '2024-01-01',
    featured: false,
    tags: ['教育', '哲学', '思考', '未来'],
  },
  {
    slug: 'interpersonal-wisdom',
    title: '人际关系中的智慧法则',
    description: '人际交往的艺术不仅仅是技巧，更是一种哲学态度。学会用智慧处理复杂的人际关系。',
    category: '人际关系',
    readingTime: 9,
    publishedAt: '2023-12-28',
    featured: false,
    tags: ['人际关系', '沟通', '智慧', '社交'],
  },
  {
    slug: 'personal-growth-philosophy',
    title: '个人成长的哲学基础',
    description: '真正的成长不仅仅是技能的提升，更是思维方式的转变。探索成长背后的哲学原理。',
    category: '个人成长',
    readingTime: 11,
    publishedAt: '2023-12-25',
    featured: false,
    tags: ['成长', '哲学', '自我提升', '思维'],
  },
];

export default function PostsPage() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            博客文章
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            探索郭春林的哲学思维、商业智慧和人生感悟，获得深度的思考和实用的指导
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-1 h-6 bg-primary-600 mr-3"></span>
              精选文章
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <PostCard key={post.slug} post={post} featured />
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="w-1 h-6 bg-accent-600 mr-3"></span>
            所有文章
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mt-16">
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              获取最新文章更新
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              订阅我们的YouTube频道，第一时间获取郭春林的最新哲学思考和人生智慧分享
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
      </main>

      <Footer />
    </div>
  );
}