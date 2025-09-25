'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { siteConfig } from '@/lib/config';
import { Quotes } from '@/lib/data';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);

  // 使用统一数据源
  const philosophyQuotes = Quotes.getFeatured().map(quote => quote.text);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % philosophyQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-primary-900 to-accent-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-slate-900/95 to-accent-900/90"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-accent-400 rounded-full opacity-30 animate-pulse`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Geometric Patterns */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-accent-400/20 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-primary-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 border border-accent-300/30 rotate-45 animate-bounce-slow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className={`text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center bg-accent-500/20 backdrop-blur-sm text-accent-200 text-sm font-medium px-4 py-2 rounded-full mb-6 border border-accent-400/30">
              <span className="w-2 h-2 bg-accent-400 rounded-full mr-2 animate-pulse"></span>
              哲学思维的践行者
            </div>

            {/* Main Title */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="text-white">欢迎来到</span>
              <span className="block bg-gradient-to-r from-accent-400 via-primary-400 to-accent-300 bg-clip-text text-transparent mt-2">
                哲学的花园
              </span>
            </h1>

            {/* Dynamic Quote */}
            <div className="h-16 mb-8">
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed transition-all duration-500">
                {philosophyQuotes[currentQuote]}
              </p>
            </div>

            {/* Author Showcase */}
            <div className="flex items-center justify-center lg:justify-start mb-10 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-accent-400 to-primary-500 rounded-full flex items-center justify-center mr-6 shadow-2xl">
                  <span className="text-white font-bold text-2xl">郭</span>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {siteConfig.author.name}
                </h3>
                <p className="text-accent-200 text-lg">哲学思维导师 · 商业智慧分享者</p>
                <div className="flex items-center mt-2">
                  <div className="flex -space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-accent-400 rounded-full border border-white/30"></div>
                    ))}
                  </div>
                  <span className="text-gray-300 text-sm ml-2">10万+ 学员信赖</span>
                </div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/posts"
                className="group relative bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 text-center shadow-2xl hover:shadow-primary-500/25 hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center">
                  开始智慧之旅
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <a
                href={siteConfig.author.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 text-center shadow-2xl hover:shadow-red-500/25 hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  观看视频课程
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-400 mb-1">50+</div>
                <div className="text-gray-300 text-sm">深度文章</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400 mb-1">10万+</div>
                <div className="text-gray-300 text-sm">YouTube订阅</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-400 mb-1">5年+</div>
                <div className="text-gray-300 text-sm">哲学实践</div>
              </div>
            </div>
          </div>

          {/* Visual Masterpiece */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              {/* Main Visual Container */}
              <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20">
                {/* Animated Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    {/* Central Philosophy Symbol */}
                    <div className="relative mb-8">
                      <div className="w-32 h-32 bg-gradient-to-br from-accent-400 to-primary-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                        <span className="text-white font-bold text-5xl">哲</span>
                      </div>
                      {/* Orbiting Elements */}
                      <div className="absolute inset-0 animate-spin-slow">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent-400 rounded-full"></div>
                        <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-3 h-3 bg-primary-400 rounded-full"></div>
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent-400 rounded-full"></div>
                        <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-3 h-3 bg-primary-400 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Wisdom Keywords */}
                    <div className="space-y-4">
                      {['智慧', '思考', '成长', '平衡'].map((word, index) => (
                        <div
                          key={word}
                          className={`inline-block mx-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium transition-all duration-500`}
                          style={{ animationDelay: `${index * 0.2}s` }}
                        >
                          {word}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Wisdom Quotes */}
                <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 max-w-xs">
                  <p className="text-white text-sm">"思考是人类最高贵的活动"</p>
                </div>
                <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 max-w-xs">
                  <p className="text-white text-sm">"智慧源于对生活的深度思考"</p>
                </div>
              </div>

              {/* Floating Decorative Elements */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-accent-400/30 to-primary-500/30 rounded-full animate-float"></div>
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-primary-400/30 to-accent-500/30 rounded-full animate-float-delayed"></div>
              
              {/* Glow Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent-500/20 to-primary-500/20 rounded-3xl blur-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}