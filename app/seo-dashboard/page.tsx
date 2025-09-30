import { Metadata } from 'next';
import SEODashboard from '@/components/SEODashboard';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'SEO监控仪表板 - 郭春林',
  description: '郭春林哲学的花园导游网站SEO监控仪表板，实时跟踪关键词排名、网站性能和搜索引擎优化指标',
  keywords: ['SEO监控', '郭春林', '关键词排名', '网站分析', '搜索引擎优化'],
  robots: {
    index: false, // 不让搜索引擎索引仪表板页面
    follow: false,
  },
};

export default function SEODashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">SEO监控仪表板</h1>
          <p className="mt-2 text-gray-600">
            实时监控郭春林哲学的花园导游网站的SEO表现和关键词排名
          </p>
        </div>
        
        <SEODashboard />
        
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">使用说明</h2>
          <div className="prose text-gray-600">
            <p>这个SEO监控仪表板帮助您：</p>
            <ul>
              <li>实时监控网站SEO健康状况</li>
              <li>跟踪"郭春林"相关关键词排名</li>
              <li>分析网站性能指标</li>
              <li>获取SEO优化建议</li>
            </ul>
            <p className="mt-4">
              <strong>注意：</strong>关键词排名数据为模拟数据，实际使用时需要接入Google Search Console API或第三方SEO工具。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}