'use client';

import { useState, useRef, useEffect } from 'react';
import { siteConfig } from '@/lib/config';
import { Videos } from '@/lib/data';

export default function YouTubeSection() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // 使用统一数据源
  const featuredVideos = Videos.getFeatured();
  const channelStats = Videos.getChannelStats();

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
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(239,68,68,0.05),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* YouTube Brand Integration */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-2xl">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              YouTube
            </span>
            <span className="block text-white mt-2">智慧视频课程</span>
          </h2>

          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            通过精心制作的视频内容，深入了解郭春林的哲学思维和人生智慧，
            <span className="text-red-400 font-semibold">获得更直观、更深刻的学习体验</span>
          </p>

          {/* Channel Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto mb-8">
            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-2xl font-bold text-red-400 mb-1">{channelStats.subscribers}</div>
              <div className="text-gray-300 text-sm">订阅者</div>
            </div>
            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-2xl font-bold text-red-400 mb-1">{channelStats.totalViews}</div>
              <div className="text-gray-300 text-sm">总观看量</div>
            </div>
            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-2xl font-bold text-red-400 mb-1">{channelStats.videosCount}</div>
              <div className="text-gray-300 text-sm">视频数量</div>
            </div>
            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-2xl font-bold text-red-400 mb-1">{channelStats.avgWatchTime}</div>
              <div className="text-gray-300 text-sm">平均观看时长</div>
            </div>
          </div>

          {/* Primary CTA */}
          <a
            href={siteConfig.author.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-red-500/25 hover:scale-105"
          >
            <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            立即订阅频道
            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Featured Video Showcase */}
        <div className={`mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Featured Video Player */}
              <div className="relative group">
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="text-white font-medium">点击播放精选视频</p>
                    </div>
                  </div>

                  {/* Video Overlay Info */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center justify-between text-white text-sm">
                        <span className="font-medium">{featuredVideos[activeVideo]?.duration || '15:32'}</span>
                        <span>{featuredVideos[activeVideo]?.views || '12.5万'} 观看</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={featuredVideos[activeVideo]?.youtubeUrl || siteConfig.author.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                    aria-label={`观看视频: ${featuredVideos[activeVideo]?.title || '哲学思维视频'}`}
                  />
                </div>
              </div>

              {/* Featured Video Info */}
              <div className="space-y-6">
                <div className="inline-flex items-center bg-red-500/20 text-red-300 text-sm font-medium px-4 py-2 rounded-full border border-red-400/30">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></span>
                  {featuredVideos[activeVideo]?.category || '哲学思维'}
                </div>

                <h3 className="text-3xl font-bold text-white leading-tight">
                  {featuredVideos[activeVideo]?.title || '哲学思维如何改变你的人生轨迹'}
                </h3>

                <p className="text-gray-300 text-lg leading-relaxed">
                  {featuredVideos[activeVideo]?.description || '深入探讨哲学思维在日常生活中的实际应用，从思维模式到行为改变的完整路径'}
                </p>

                <div className="flex items-center space-x-6 text-gray-400">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {featuredVideos[activeVideo]?.views || '12.5万'} 次观看
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {featuredVideos[activeVideo]?.duration || '15:32'}
                  </div>
                </div>

                <a
                  href={featuredVideos[activeVideo]?.youtubeUrl || siteConfig.author.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  立即观看
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {featuredVideos.map((video, index) => (
            <div
              key={index}
              className={`group relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer ${activeVideo === index
                ? 'border-red-400/50 shadow-red-500/20 shadow-2xl'
                : 'border-white/20 hover:border-red-400/30'
                }`}
              onClick={() => setActiveVideo(index)}
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600/80 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded font-medium">
                  {video.duration}
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-red-600/90 text-white text-xs px-2 py-1 rounded-full font-medium">
                  {video.category}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h4 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-red-300 transition-colors duration-300">
                  {video.title}
                </h4>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {video.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{video.views} 观看</span>
                  <span className="text-red-400 font-medium group-hover:text-red-300">
                    点击播放 →
                  </span>
                </div>
              </div>

              {/* Active Indicator */}
              {activeVideo === index && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600"></div>
              )}
            </div>
          ))}
        </div>

        {/* Enhanced Channel CTA */}
        <div className={`text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 backdrop-blur-sm rounded-3xl p-12 border border-red-400/20 shadow-2xl">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-4xl font-bold text-white mb-6">
                加入 <span className="text-red-400">10万+</span> 智慧学习者
              </h3>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                订阅郭春林的YouTube频道，第一时间获取最新的哲学思维分享和人生智慧解读。
                <span className="block mt-2 text-red-300 font-semibold">每周更新，深度内容，终身受益</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href={siteConfig.author.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-red-500/25 hover:scale-105 flex items-center"
                >
                  <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  免费订阅频道
                </a>

                <a
                  href={`${siteConfig.author.social.youtube}/videos`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  浏览全部视频
                </a>
              </div>

              {/* Social Proof */}
              <div className="mt-8 flex items-center justify-center space-x-8 text-gray-400">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  完全免费
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  每周更新
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  高质量内容
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}