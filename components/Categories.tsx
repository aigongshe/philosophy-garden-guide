'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { getPostStats } from '@/lib/data/posts';

const difficultyColors = {
  '入门': 'bg-green-100 text-green-800',
  '中级': 'bg-yellow-100 text-yellow-800',
  '进阶': 'bg-red-100 text-red-800',
};

export default function Categories() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'featured' | 'beginner'>('all');
  const sectionRef = useRef<HTMLDivElement>(null);

  // 使用统一数据源
  const stats = getPostStats();
  
  // 基于实际文章数据生成分类
  const allCategories = [
    {
      id: 'philosophy-thinking',
      name: '哲学思维',
      slug: 'philosophy-thinking',
      description: '在信息爆炸的时代，哲学思维是你的"心智防火墙"',
      icon: '🧠',
      color: 'from-blue-500 to-blue-700',
      hoverColor: 'group-hover:from-blue-600 group-hover:to-blue-800',
      count: stats.byCategory['philosophy-thinking'] || 0,
      difficulty: '中级',
      featured: true,
      popularity: 95,
      keywords: ['批判性思维', '深度思考', '认知升级', '心智模型']
    },
    {
      id: 'business-wisdom',
      name: '商业智慧',
      slug: 'business-wisdom',
      description: '真正的商业成功不在于战术，而在于哲学',
      icon: '💼',
      color: 'from-green-500 to-green-700',
      hoverColor: 'group-hover:from-green-600 group-hover:to-green-800',
      count: stats.byCategory['business-wisdom'] || 0,
      difficulty: '进阶',
      featured: true,
      popularity: 88,
      keywords: ['企业家思维', '商业哲学', '创新思维', '成功法则']
    },
    {
      id: 'life-philosophy',
      name: '人生哲学',
      slug: 'life-philosophy',
      description: '学会驾驭内心的"三驾马车"，成为人生的智慧车夫',
      icon: '🌟',
      color: 'from-purple-500 to-purple-700',
      hoverColor: 'group-hover:from-purple-600 group-hover:to-purple-800',
      count: stats.byCategory['life-philosophy'] || 0,
      difficulty: '入门',
      featured: true,
      popularity: 92,
      keywords: ['人生平衡', '内心和谐', '生活智慧', '存在思考']
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredCategories = allCategories.filter(category => {
    if (selectedFilter === 'featured') return category.featured;
    if (selectedFilter === 'beginner') return category.difficulty === '入门';
    return true;
  });

  const totalArticles = allCategories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary-200/20 to-accent-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-br from-accent-200/20 to-primary-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary-100/10 to-accent-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center bg-gradient-to-r from-primary-100 to-accent-100 text-primary-800 text-sm font-semibold px-6 py-3 rounded-full mb-6 border border-primary-200 shadow-lg">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            智慧分类导航
            <div className="ml-2 w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-primary-800 to-accent-700 bg-clip-text text-transparent">
              智慧花园
            </span>
            <span className="block text-gray-700 text-3xl lg:text-4xl mt-2">按主题探索哲学思维</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            每个分类都是一扇通往智慧的大门，从哲学思辨到商业智慧，从人生感悟到成长方法，
            <span className="block mt-2 text-primary-700 font-semibold">在这里找到解决人生困惑的深度思考和实用智慧</span>
          </p>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto mb-8">
            <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg">
              <div className="text-3xl font-bold text-primary-600 mb-1">{allCategories.length}</div>
              <div className="text-gray-600 text-sm">智慧分类</div>
            </div>
            <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg">
              <div className="text-3xl font-bold text-accent-600 mb-1">{totalArticles}</div>
              <div className="text-gray-600 text-sm">深度文章</div>
            </div>
            <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-1">50万+</div>
              <div className="text-gray-600 text-sm">总阅读量</div>
            </div>
            <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-1">95%</div>
              <div className="text-gray-600 text-sm">用户满意度</div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            {[
              { key: 'all', label: '全部分类', count: allCategories.length },
              { key: 'featured', label: '精选推荐', count: allCategories.filter(c => c.featured).length },
              { key: 'beginner', label: '新手友好', count: allCategories.filter(c => c.difficulty === '入门').length },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key as any)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedFilter === filter.key
                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                    : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
                }`}
              >
                {filter.label}
                <span className="ml-2 text-sm opacity-75">({filter.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Categories Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {filteredCategories.map((category, index) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group block"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className={`relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-primary-200 transform hover:-translate-y-2 ${
                hoveredCategory === category.id ? 'scale-105' : ''
              }`}>
                {/* Featured Badge */}
                {category.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      精选
                    </div>
                  </div>
                )}

                {/* Popularity Score */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-semibold text-gray-700">{category.popularity}</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Category Header */}
                <div className={`h-40 bg-gradient-to-br ${category.color} ${category.hoverColor} relative overflow-hidden transition-all duration-300`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                  
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-6 left-6 w-8 h-8 border-2 border-white rounded-full animate-pulse"></div>
                    <div className="absolute top-10 right-8 w-4 h-4 border-2 border-white rounded-full animate-pulse delay-300"></div>
                    <div className="absolute bottom-8 left-10 w-6 h-6 border-2 border-white rounded-full animate-pulse delay-700"></div>
                    <div className="absolute bottom-6 right-6 w-3 h-3 border-2 border-white rounded-full animate-pulse delay-1000"></div>
                  </div>

                  <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
                    <div>
                      <div className={`text-6xl mb-3 transform group-hover:scale-110 transition-transform duration-300 ${
                        hoveredCategory === category.id ? 'animate-bounce' : ''
                      }`}>
                        {category.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-1 group-hover:text-yellow-200 transition-colors duration-300">
                        {category.name}
                      </h3>
                      <div className="text-white/80 text-sm">
                        {category.count} 篇精选文章
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Enhanced Category Content */}
                <div className="p-8">
                  {/* Meta Information */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${difficultyColors[category.difficulty as keyof typeof difficultyColors]}`}>
                      {category.difficulty}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      热度 {category.popularity}%
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {category.description}
                  </p>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {category.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="text-xs text-gray-600 bg-gray-100 hover:bg-primary-100 px-2 py-1 rounded-md transition-colors duration-200"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex items-center text-gray-500 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {category.count} 篇文章
                    </div>
                    <span className="group/link text-primary-600 group-hover:text-primary-800 font-semibold text-sm transition-all duration-300 flex items-center hover:scale-105">
                      开始探索
                      <svg className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Hover Border Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className={`text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-12 border border-primary-100 shadow-xl">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                开启你的智慧之旅
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                基于郭春林老师多年的哲学思考和实践经验，我们将复杂的人生智慧转化为易懂的实用指南。
                <span className="block mt-2 text-primary-700 font-semibold">每个分类都蕴含着改变人生的深刻洞察，值得你深入探索</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                <Link
                  href="/posts"
                  className="group bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-primary-500/25 hover:scale-105 flex items-center"
                >
                  浏览所有文章
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                
                <a
                  href="mailto:contact@philosophy-garden.com"
                  className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-primary-300 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  建议新主题
                </a>
              </div>

              {/* Additional Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="font-semibold text-gray-900 mb-1">个性化推荐</div>
                  <div className="text-gray-600 text-sm">根据你的兴趣推荐最适合的内容</div>
                </div>
                <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50">
                  <div className="text-2xl mb-2">📈</div>
                  <div className="font-semibold text-gray-900 mb-1">学习进度</div>
                  <div className="text-gray-600 text-sm">追踪你的阅读进度和成长轨迹</div>
                </div>
                <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50">
                  <div className="text-2xl mb-2">💬</div>
                  <div className="font-semibold text-gray-900 mb-1">社区讨论</div>
                  <div className="text-gray-600 text-sm">与其他学习者分享心得和见解</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}