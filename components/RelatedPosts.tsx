import Link from 'next/link';

interface RelatedPostsProps {
  currentSlug: string;
  category: string;
}

// 示例相关文章数据
const allPosts = [
  {
    slug: 'philosophy-thinking-guide',
    title: '哲学思维：现代人的智慧指南',
    category: '哲学思维',
    readingTime: 8,
  },
  {
    slug: 'business-philosophy-success',
    title: '商业哲学：成功企业家的思维模式',
    category: '商业智慧',
    readingTime: 12,
  },
  {
    slug: 'life-wisdom-balance',
    title: '人生智慧：在忙碌中寻找生活的平衡',
    category: '人生哲学',
    readingTime: 10,
  },
  {
    slug: 'education-philosophy-modern',
    title: '现代教育的哲学反思',
    category: '教育理念',
    readingTime: 15,
  },
  {
    slug: 'interpersonal-wisdom',
    title: '人际关系中的智慧法则',
    category: '人际关系',
    readingTime: 9,
  },
];

export default function RelatedPosts({ currentSlug, category }: RelatedPostsProps) {
  // 获取相关文章：同分类的其他文章，如果不够则补充其他文章
  const relatedPosts = allPosts
    .filter(post => post.slug !== currentSlug)
    .sort((a, b) => {
      // 同分类的文章优先
      if (a.category === category && b.category !== category) return -1;
      if (a.category !== category && b.category === category) return 1;
      return 0;
    })
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  const categoryColors: { [key: string]: string } = {
    '哲学思维': 'bg-blue-100 text-blue-800',
    '商业智慧': 'bg-green-100 text-green-800',
    '人生哲学': 'bg-purple-100 text-purple-800',
    '教育理念': 'bg-orange-100 text-orange-800',
    '人际关系': 'bg-pink-100 text-pink-800',
    '个人成长': 'bg-indigo-100 text-indigo-800',
  };

  const categoryIcons: { [key: string]: string } = {
    '哲学思维': '🧠',
    '商业智慧': '💼',
    '人生哲学': '🌟',
    '教育理念': '📚',
    '人际关系': '🤝',
    '个人成长': '🚀',
  };

  return (
    <section className="border-t border-gray-200 pt-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        相关文章推荐
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <article
            key={post.slug}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
          >
            {/* Post Image Placeholder */}
            <div className="h-32 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-1">
                  <span className="text-white text-lg">
                    {categoryIcons[post.category] || '📝'}
                  </span>
                </div>
                <p className="text-gray-600 text-xs">{post.category}</p>
              </div>
            </div>

            {/* Post Content */}
            <div className="p-4">
              {/* Category */}
              <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full mb-2 ${categoryColors[post.category] || 'bg-gray-100 text-gray-800'}`}>
                {post.category}
              </span>
              
              {/* Title */}
              <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                <Link
                  href={`/posts/${post.slug}`}
                  className="hover:text-primary-600 transition-colors duration-200"
                >
                  {post.title}
                </Link>
              </h4>
              
              {/* Meta */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {post.readingTime} 分钟
                </span>
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-primary-600 hover:text-primary-800 font-medium transition-colors duration-200"
                >
                  阅读 →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* More Posts CTA */}
      <div className="text-center mt-8">
        <Link
          href="/posts"
          className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium transition-colors duration-200"
        >
          查看更多文章
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}