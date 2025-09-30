'use client';

import { useState, useRef, useEffect } from 'react';
import { siteConfig } from '@/lib/config';
import { Videos } from '@/lib/data';

export default function YouTubeSection() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // 使用真实的YouTube视频数据
  const featuredVideos = Videos.getFeatured();
  const allVideos = Videos.getAll();
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

  const handleVideoPlay = (videoUrl: string) => {
    window.open(videoUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-slate-900 via-red-900/15 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(239,68,68,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(239,68,68,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(239,68,68,0.03)_50%,transparent_70%)]"></div>

        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-red-400/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* YouTube Brand Integration with Animation */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative group">
              <div className="w-20 h-20 bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-red-500/30 transition-all duration-500 group-hover:scale-110">
                <svg className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-full border-3 border-white animate-pulse flex items-center justify-center">
                <span className="text-white text-xs font-bold">LIVE</span>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            </div>
          </div>

          <h2 className="text-5xl lg:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent drop-shadow-2xl">
              YouTube
            </span>
            <span className="block text-white mt-3 text-4xl lg:text-6xl drop-shadow-2xl [text-shadow:_2px_2px_8px_rgb(0_0_0_/_80%)]">哲学智慧频道</span>
          </h2>

          <p className="text-xl lg:text-2xl text-white max-w-5xl mx-auto mb-10 leading-relaxed drop-shadow-lg [text-shadow:_1px_1px_4px_rgb(0_0_0_/_70%)]">
            跟随郭春林探索深邃的哲学思维，通过
            <span className="text-red-300 font-bold mx-2 drop-shadow-md [text-shadow:_1px_1px_3px_rgb(0_0_0_/_80%)]">高质量视频内容</span>
            获得人生智慧与商业洞察，
            <span className="block mt-2 text-red-200 font-semibold drop-shadow-md [text-shadow:_1px_1px_3px_rgb(0_0_0_/_80%)]">每一个视频都是一次思维的升华</span>
          </p>

          {/* Enhanced Channel Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-10">
            {[
              { label: '订阅者', value: channelStats.subscribers, icon: '👥', color: 'from-blue-500 to-blue-600' },
              { label: '总观看量', value: channelStats.totalViews, icon: '👁️', color: 'from-green-500 to-green-600' },
              { label: '视频数量', value: channelStats.videosCount, icon: '🎬', color: 'from-purple-500 to-purple-600' },
              { label: '平均观看时长', value: channelStats.avgWatchTime, icon: '⏱️', color: 'from-orange-500 to-orange-600' }
            ].map((stat, index) => (
              <div key={index} className="group text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-red-400/40 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className={`text-3xl mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent font-bold`}>
                  {stat.value}
                </div>
                <div className="text-white text-sm font-medium flex items-center justify-center drop-shadow-md [text-shadow:_1px_1px_2px_rgb(0_0_0_/_60%)]">
                  <span className="mr-2">{stat.icon}</span>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Primary CTA with Enhanced Design */}
          <a
            href={siteConfig.author.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white px-12 py-5 rounded-3xl font-bold text-xl transition-all duration-500 shadow-2xl hover:shadow-red-500/30 hover:scale-110 overflow-hidden"
          >
            {/* Button Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <svg className="relative z-10 w-7 h-7 mr-4 group-hover:scale-125 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span className="relative z-10">立即订阅频道</span>
            <svg className="relative z-10 ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Premium Featured Video Showcase */}
        <div className={`mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-4xl p-10 border border-white/30 shadow-2xl hover:shadow-red-500/10 transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Enhanced Video Player */}
              <div className="relative group">
                <div className="aspect-video bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50">
                  {/* Video Thumbnail Background */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: `url(${featuredVideos[activeVideo]?.thumbnail})` }}
                  ></div>

                  <div className="relative z-10 absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="text-center">
                      <div className="relative mb-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-full flex items-center justify-center mx-auto group-hover:scale-125 transition-all duration-500 shadow-2xl cursor-pointer"
                          onClick={() => handleVideoPlay(featuredVideos[activeVideo]?.youtubeUrl || siteConfig.author.social.youtube)}>
                          <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        {/* Pulse Animation */}
                        <div className="absolute inset-0 w-24 h-24 bg-red-500/30 rounded-full animate-ping mx-auto"></div>
                      </div>
                      <p className="text-white font-bold text-lg">点击观看精选视频</p>
                      <p className="text-gray-300 text-sm mt-2">高清画质 · 中文字幕</p>
                    </div>
                  </div>

                  {/* Enhanced Video Overlay Info */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-black/90 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-4">
                          <span className="bg-red-600 px-3 py-1 rounded-full text-sm font-bold">
                            {featuredVideos[activeVideo]?.duration || '25:30'}
                          </span>
                          <span className="text-gray-300 text-sm">
                            {featuredVideos[activeVideo]?.views || '18.5万'} 次观看
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400 text-sm font-medium">高质量</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Video Info */}
              <div className="space-y-8">
                <div className="inline-flex items-center bg-gradient-to-r from-red-500/30 to-red-600/30 text-red-200 text-sm font-bold px-6 py-3 rounded-full border border-red-400/60 backdrop-blur-sm drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_70%)]">
                  <span className="w-3 h-3 bg-red-400 rounded-full mr-3 animate-pulse drop-shadow-sm"></span>
                  🎯 {featuredVideos[activeVideo]?.category || '哲学思维'}
                </div>

                <h3 className="text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-2xl [text-shadow:_2px_2px_8px_rgb(0_0_0_/_80%)]">
                  {featuredVideos[activeVideo]?.title || 'AI时代，你真的会提问吗？'}
                </h3>

                <p className="text-white text-xl leading-relaxed drop-shadow-lg [text-shadow:_1px_1px_4px_rgb(0_0_0_/_70%)]">
                  {featuredVideos[activeVideo]?.description || '深入探讨"问题意识"的五个构建维度，强调在人工智能与ChatGPT时代，提出高质量问题能力的重要性'}
                </p>

                {/* Video Tags */}
                <div className="flex flex-wrap gap-3">
                  {(featuredVideos[activeVideo]?.tags || ['AI提问', '问题意识', '哲学思维']).slice(0, 4).map((tag, index) => (
                    <span key={index} className="bg-white/15 text-white px-4 py-2 rounded-full text-sm border border-white/30 hover:border-red-400/60 transition-colors duration-300 drop-shadow-md [text-shadow:_1px_1px_2px_rgb(0_0_0_/_60%)]">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-8 text-gray-200 drop-shadow-md [text-shadow:_1px_1px_2px_rgb(0_0_0_/_60%)]">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 mr-3 text-red-300 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="font-semibold text-white">{featuredVideos[activeVideo]?.views || '18.5万'} 次观看</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 mr-3 text-blue-300 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold text-white">{featuredVideos[activeVideo]?.duration || '25:30'}</span>
                  </div>
                </div>

                <a
                  href="https://www.youtube.com/playlist?list=PL50eMVAu4GRZacyHrLPx6aeZorN9roeQF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-red-500/25"
                >
                  <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  立即观看完整视频
                  <svg className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Video Grid */}
        <div className={`mb-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-xl [text-shadow:_2px_2px_6px_rgb(0_0_0_/_80%)]">精选视频合集</h3>
            <p className="text-white text-lg drop-shadow-lg [text-shadow:_1px_1px_3px_rgb(0_0_0_/_70%)]">每个视频都是一次深度的哲学思考之旅</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allVideos.slice(0, 6).map((video, index) => (
              <div
                key={video.id}
                className={`group relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer ${activeVideo === index
                    ? 'border-red-400/60 shadow-red-500/25 shadow-2xl scale-105'
                    : 'border-white/20 hover:border-red-400/40'
                  }`}
                onClick={() => setActiveVideo(index)}
              >
                {/* Enhanced Video Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                  {/* Thumbnail Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ backgroundImage: `url(${video.thumbnail})` }}
                  ></div>

                  <div className="relative z-10 absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-xl">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Enhanced Badges */}
                  <div className="absolute bottom-4 right-4 bg-black/90 text-white text-sm px-3 py-1 rounded-full font-bold border border-white/20">
                    {video.duration}
                  </div>

                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                    {video.category}
                  </div>

                  {/* View Count Badge */}
                  <div className="absolute top-4 right-4 bg-black/80 text-white text-xs px-2 py-1 rounded-full font-medium border border-white/20">
                    {video.views}
                  </div>
                </div>

                {/* Enhanced Video Info */}
                <div className="p-8">
                  <h4 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-red-200 transition-colors duration-300 leading-tight drop-shadow-lg [text-shadow:_1px_1px_3px_rgb(0_0_0_/_70%)]">
                    {video.title}
                  </h4>
                  <p className="text-gray-200 text-sm mb-6 line-clamp-3 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_2px_rgb(0_0_0_/_60%)]">
                    {video.description}
                  </p>

                  {/* Video Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {video.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-white/15 text-white px-2 py-1 rounded text-xs border border-white/30 drop-shadow-sm [text-shadow:_1px_1px_1px_rgb(0_0_0_/_50%)]">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-200 flex items-center drop-shadow-sm [text-shadow:_1px_1px_1px_rgb(0_0_0_/_50%)]">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {video.views}
                    </span>
                    <span className="text-red-300 font-bold group-hover:text-red-200 transition-colors duration-300 flex items-center drop-shadow-sm [text-shadow:_1px_1px_2px_rgb(0_0_0_/_60%)]">
                      点击播放
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Active Indicator */}
                {activeVideo === index && (
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700"></div>
                )}

                {/* Click Handler */}
                <div
                  className="absolute inset-0 z-20 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoPlay(video.youtubeUrl);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Premium Channel CTA */}
        <div className={`text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative bg-gradient-to-br from-red-900/40 via-red-800/30 to-red-900/40 backdrop-blur-lg rounded-4xl p-16 border border-red-400/30 shadow-2xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.3),transparent_70%)]"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto">
              <div className="mb-8">
                <span className="inline-flex items-center bg-gradient-to-r from-red-500/30 to-red-600/30 text-red-200 text-sm font-bold px-6 py-3 rounded-full border border-red-400/60 backdrop-blur-sm drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_70%)]">
                  <span className="w-3 h-3 bg-red-400 rounded-full mr-3 animate-pulse drop-shadow-sm"></span>
                  🔥 热门频道
                </span>
              </div>

              <h3 className="text-5xl lg:text-6xl font-bold text-white mb-8 drop-shadow-2xl [text-shadow:_3px_3px_10px_rgb(0_0_0_/_80%)]">
                加入 <span className="bg-gradient-to-r from-red-300 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">12.8万+</span> 智慧学习者
              </h3>

              <p className="text-2xl text-white mb-6 leading-relaxed drop-shadow-lg [text-shadow:_2px_2px_6px_rgb(0_0_0_/_70%)]">
                订阅郭春林的YouTube频道，第一时间获取最新的哲学思维分享和人生智慧解读
              </p>

              <p className="text-xl text-red-200 font-bold mb-12 drop-shadow-lg [text-shadow:_1px_1px_4px_rgb(0_0_0_/_70%)]">
                🎯 每周更新 · 🧠 深度内容 · 💎 终身受益 · 🆓 完全免费
              </p>

              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-12">
                <a
                  href={siteConfig.author.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white px-16 py-6 rounded-3xl font-bold text-xl transition-all duration-500 shadow-2xl hover:shadow-red-500/30 hover:scale-110 flex items-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <svg className="relative z-10 w-8 h-8 mr-4 group-hover:scale-125 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span className="relative z-10">免费订阅频道</span>
                </a>

                <a
                  href={`${siteConfig.author.social.youtube}/videos`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/15 hover:bg-white/25 text-white border-2 border-white/40 hover:border-red-400/60 px-12 py-6 rounded-3xl font-bold text-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                >
                  浏览全部视频
                </a>
              </div>

              {/* Enhanced Social Proof */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-white">
                {[
                  { icon: '✅', text: '完全免费', color: 'text-green-300' },
                  { icon: '🔄', text: '每周更新', color: 'text-blue-300' },
                  { icon: '⭐', text: '高质量内容', color: 'text-yellow-300' },
                  { icon: '🎓', text: '专业讲解', color: 'text-purple-300' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-center space-x-3 p-4 bg-white/15 rounded-2xl border border-white/30 hover:border-red-400/60 transition-colors duration-300 drop-shadow-lg">
                    <span className={`text-2xl ${item.color} drop-shadow-sm`}>{item.icon}</span>
                    <span className="font-semibold drop-shadow-md [text-shadow:_1px_1px_2px_rgb(0_0_0_/_60%)]">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}