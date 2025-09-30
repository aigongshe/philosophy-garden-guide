import { Metadata } from 'next';
import KeywordAnalyzer from '@/components/KeywordAnalyzer';

export const metadata: Metadata = {
  title: '关键词分析工具 - 郭春林',
  description: '郭春林哲学的花园导游关键词分析工具，帮助优化内容中的关键词密度和SEO效果',
  keywords: ['关键词分析', '郭春林', 'SEO工具', '内容优化'],
  robots: {
    index: false,
    follow: false,
  },
};

export default function KeywordAnalyzerPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">关键词分析工具</h1>
          <p className="mt-2 text-gray-600">
            分析内容中"郭春林"相关关键词的密度和覆盖情况，获取SEO优化建议
          </p>
        </div>
        
        <KeywordAnalyzer />
      </div>
    </div>
  );
}
