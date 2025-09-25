import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: '关于郭春林 - 哲学的花园导游',
  description: '了解郭春林的哲学思维理念、人生经历和教育背景，探索智慧人生的引路人',
  keywords: ['郭春林简介', '哲学思维', '个人经历', '教育背景', '人生哲学'],
  openGraph: {
    title: '关于郭春林 - 哲学的花园导游',
    description: '了解郭春林的哲学思维理念、人生经历和教育背景，探索智慧人生的引路人',
    url: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-4xl">郭</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            郭春林
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            哲学思维的践行者 · 商业智慧的分享者 · 人生导师
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
            关注 YouTube 频道
          </a>
        </section>

        {/* Biography */}
        <section className="prose prose-lg max-w-none mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">个人简介</h2>
          <div className="bg-gray-50 rounded-2xl p-8">
            <p className="text-gray-700 leading-relaxed mb-6">
              郭春林，哲学思维的践行者，商业智慧的分享者。致力于将深邃的哲学思考转化为实用的人生指导，
              帮助企业家和职场人士在复杂的现代社会中找到内心的平静与事业的成功。
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              通过多年的学习和实践，郭春林深刻理解了哲学思维在现代生活中的重要价值。他相信，
              真正的智慧不在于拥有所有答案，而在于提出正确的问题。在快节奏的现代生活中，
              哲学思维能够帮助我们保持理性，做出明智的决策。
            </p>
            <p className="text-gray-700 leading-relaxed">
              目前，郭春林通过YouTube频道、博客文章等多种形式分享人生感悟、商业哲学和教育理念，
              引导更多人走向智慧人生，在思考中找到属于自己的人生答案。
            </p>
          </div>
        </section>

        {/* Core Philosophy */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">核心理念</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">哲学思维</h3>
              <p className="text-gray-600">
                运用理性思考和批判性思维，深入探索事物的本质和规律
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">商业智慧</h3>
              <p className="text-gray-600">
                将哲学智慧应用于商业实践，实现可持续的成功和价值创造
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">人生智慧</h3>
              <p className="text-gray-600">
                在复杂的现代生活中找到内心的平静与人生的意义
              </p>
            </div>
          </div>
        </section>

        {/* Content Areas */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">主要内容领域</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">📚</span>
                <h3 className="text-xl font-semibold text-gray-900">教育理念</h3>
              </div>
              <p className="text-gray-600 mb-4">
                重新审视现代教育的本质和目标，探讨如何培养具有独立思考能力的下一代
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• 批判性思维培养</li>
                <li>• 创新教育方法</li>
                <li>• 终身学习理念</li>
              </ul>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🤝</span>
                <h3 className="text-xl font-semibold text-gray-900">人际关系</h3>
              </div>
              <p className="text-gray-600 mb-4">
                人际交往的艺术不仅仅是技巧，更是一种哲学态度和智慧体现
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• 沟通的智慧</li>
                <li>• 关系建立的艺术</li>
                <li>• 冲突解决方法</li>
              </ul>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🚀</span>
                <h3 className="text-xl font-semibold text-gray-900">个人成长</h3>
              </div>
              <p className="text-gray-600 mb-4">
                真正的成长不仅仅是技能的提升，更是思维方式的转变和智慧的积累
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• 自我认知提升</li>
                <li>• 目标设定与实现</li>
                <li>• 心理韧性培养</li>
              </ul>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">⚖️</span>
                <h3 className="text-xl font-semibold text-gray-900">生活平衡</h3>
              </div>
              <p className="text-gray-600 mb-4">
                在职场压力和生活责任之间找到平衡，实现内心的和谐与外在的成功
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• 工作生活平衡</li>
                <li>• 压力管理技巧</li>
                <li>• 内心平静的修炼</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            与我一起探索智慧人生
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            如果你对哲学思维、人生智慧或个人成长有任何问题或想法，欢迎通过以下方式与我交流
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={siteConfig.author.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTube 频道
            </a>
            {siteConfig.author.social.email && (
              <a
                href={`mailto:${siteConfig.author.social.email}`}
                className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                邮件联系
              </a>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}