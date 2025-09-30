'use client';

import { useState } from 'react';
import { KeywordAnalyzer as KeywordAnalyzerClass, guoChunlinKeywords } from '@/lib/seo-monitor';

interface AnalysisResult {
  primary: { keyword: string; density: number; present: boolean }[];
  longTail: { keyword: string; density: number; present: boolean }[];
  suggestions: string[];
}

export default function KeywordAnalyzer() {
  const [content, setContent] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeContent = () => {
    if (!content.trim()) return;
    
    setLoading(true);
    try {
      const analyzer = new KeywordAnalyzerClass(content);
      const result = analyzer.analyzeGuoChunlinCoverage();
      const contentSuggestions = analyzer.generateContentSuggestions();
      
      setAnalysis({
        ...result,
        suggestions: [...result.suggestions, ...contentSuggestions]
      });
    } catch (error) {
      console.error('分析失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDensityColor = (density: number) => {
    if (density >= 1 && density <= 3) return 'text-green-600';
    if (density > 3) return 'text-red-600';
    return 'text-yellow-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">关键词分析工具</h2>
      
      {/* 内容输入区域 */}
      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          输入要分析的内容
        </label>
        <textarea
          id="content"
          rows={8}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="请输入您要分析的文章内容..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="mt-2 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            字数: {content.length} | 词数: {content.split(/\s+/).filter(word => word.length > 0).length}
          </span>
          <button
            onClick={analyzeContent}
            disabled={!content.trim() || loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '分析中...' : '开始分析'}
          </button>
        </div>
      </div>

      {/* 分析结果 */}
      {analysis && (
        <div className="space-y-6">
          {/* 主要关键词分析 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🎯 主要关键词分析</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      关键词
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      密度
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状态
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analysis.primary.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.keyword}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getDensityColor(item.density)}`}>
                        {item.density.toFixed(2)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.present ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            ✓ 已包含
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            ✗ 未包含
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 长尾关键词分析 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🔍 长尾关键词覆盖</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysis.longTail.map((item, index) => (
                <div key={index} className={`p-3 rounded-lg border ${item.present ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{item.keyword}</span>
                    {item.present ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-gray-400">✗</span>
                    )}
                  </div>
                  {item.present && (
                    <div className={`text-xs mt-1 ${getDensityColor(item.density)}`}>
                      密度: {item.density.toFixed(2)}%
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 优化建议 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">💡 优化建议</h3>
            {analysis.suggestions.length > 0 ? (
              <ul className="space-y-2">
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span className="text-yellow-700">{suggestion}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-yellow-700">🎉 内容优化良好，暂无特别建议！</p>
            )}
          </div>

          {/* 关键词建议 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">📝 推荐关键词</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-blue-700 mb-2">竞争性关键词</h4>
                <div className="flex flex-wrap gap-2">
                  {guoChunlinKeywords.competitive.slice(0, 6).map((keyword, index) => (
                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-blue-700 mb-2">地域性关键词</h4>
                <div className="flex flex-wrap gap-2">
                  {guoChunlinKeywords.local.map((keyword, index) => (
                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
