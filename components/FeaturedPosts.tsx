'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { getFeaturedPosts, getPostStats } from '@/lib/data/posts';

const categoryColors = {
  '哲学思维': {
    bg: 'from-blue-500 to-blue-700',
    text: 'text-blue-600',
    light: 'bg-blue-100 text-blue-800',
    icon: '🧠'
  },
  '商业智慧': {
    bg: 'from-green-500 to-green-700',
    text: 'text-green-600',
    light: 'bg-green-100 text-green-800',
    icon: '💼'
  },
  '人生哲学': {
    bg: 'from-purple-500 to-purple-700',
    text: 'text-purple-600',
    light: 'bg-purple-100 text-purple-800',
    icon: '🌟'
  },
  '教育理念': {
    bg: 'from-orange-500 to-orange-700',
    text: 'text-orange-600',
    light: 'bg-orange-100 text-orange-800',
    icon: '📚'
  },
  '人际关系': {
    bg: 'from-pink-500 to-pink-700',
    text: 'text-pink-600',
    light: 'bg-pink-100 text-pink-800',
    icon: '🤝'
  },
  '个人成长': {
    bg: 'from-indigo-500 to-indigo-700',
    text: 'text-indigo-600',
    light: 'bg-indigo-100 text-indigo-800',
    icon: '🚀'
  },
};

const difficultyColors = {
  '入门': 'bg-green-100 text-green-800',
  '中级': 'bg-yellow-100 text-yellow-800',
  '进阶': 'bg-red-100 text-red-800',
};

export default function FeaturedPosts() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // 使用统一数据源
  const featuredPosts = getFeaturedPosts();
  const stats = getPostStats();

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

  return (
    <section ref={sectionRef} className="py-16 bg-white relative">
      {/* Subtle Background Decorations */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary-100 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-accent-100 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Author Badge */}
          <div className="inline-flex items-center bg-gradient-to-r from-primary-100 to-accent-100 text-primary-800 text-sm font-semibold px-6 py-3 rounded-full mb-6 border border-primary-200 shadow-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xs">郭</span>
            </div>
            郭春林的智慧分享
            <div className="ml-2 w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-primary-800 to-accent-700 bg-clip-text text-transparent">
              精选文章
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            深入探索哲学思维在现代生活中的应用，发现智慧与成功的平衡之道。
            <span className="block mt-2 text-primary-700 font-semibold">每一篇文章都是一次思维的升华</span>
          </p>

          {/* Reading Stats */}
          <div className="flex items-center justify-center space-x-8 text-gray-500">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {stats.total}+ 深度文章
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              100万+ 阅读量
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              98% 好评率
            </div>
          </div>
        </div>

        {/* Enhanced Posts Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {featuredPosts.map((post, index) => {
            const categoryStyle = categoryColors[post.category as keyof typeof categoryColors];
            
            return (
              <article
                key={post.slug}
                className={`group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-primary-200 transform hover:-translate-y-2 ${
                  hoveredPost === index ? 'scale-105' : ''
                }`}
                onMouseEnter={() => setHoveredPost(index)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                {/* Featured Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    精选推荐
                  </div>
                </div>

                {/* Popularity Indicator */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-semibold text-gray-700">{post.popularity}</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Post Image */}
                <div className={`h-56 bg-gradient-to-br ${categoryStyle?.bg || 'from-gray-500 to-gray-700'} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                        {categoryStyle?.icon || '📝'}
                      </div>
                      <div className="text-lg font-semibold">{post.category}</div>
                    </div>
                  </div>
                  
                  {/* Animated Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Reading Progress Indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
                    <div 
                      className="h-full bg-white transition-all duration-1000 ease-out"
                      style={{ width: hoveredPost === index ? '100%' : '0%' }}
                    ></div>
                  </div>
                </div>

                {/* Enhanced Post Content */}
                <div className="p-8">
                  {/* Meta Information */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${categoryStyle?.light || 'bg-gray-100 text-gray-800'}`}>
                        {post.category}
                      </span>
                      <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${difficultyColors[post.difficulty as keyof typeof difficultyColors]}`}>
                        {post.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readingTime} 分钟
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-primary-700 transition-colors duration-300">
                    <Link href={`/posts/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>

                  {/* Excerpt */}
                  <blockquote className="border-l-4 border-primary-300 pl-4 mb-6 text-gray-700 italic">
                    "{post.excerpt}"
                  </blockquote>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-gray-600 bg-gray-100 hover:bg-primary-100 px-2 py-1 rounded-md transition-colors duration-200 cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <time className="text-gray-500 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(post.publishedAt).toLocaleDateString('zh-CN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <Link
                      href={`/posts/${post.slug}`}
                      className={`group/link inline-flex items-center font-semibold text-sm transition-all duration-300 hover:scale-105 ${categoryStyle?.text || 'text-gray-600'}`}
                    >
                      深度阅读
                      <svg className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </article>
            );
          })}
        </div>

        {/* Enhanced CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-12 border border-primary-100 shadow-xl">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              探索更多智慧内容
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              我们的文章库包含了哲学思维、商业智慧、人生哲学等多个领域的深度内容，
              <span className="text-primary-700 font-semibold">每一篇都值得细细品味</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/posts"
                className="group bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-primary-500/25 hover:scale-105 flex items-center"
              >
                查看全部文章
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <Link
                href="/categories"
                className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-primary-300 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
              >
                按分类浏览
              </Link>
            </div>

            {/* Newsletter Signup Hint */}
            <div className="mt-8 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50">
              <p className="text-gray-600 text-sm">
                💡 想第一时间获取最新文章？
                <Link href="/about" className="text-primary-600 hover:text-primary-800 font-medium ml-1">
                  关注我们的更新
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}