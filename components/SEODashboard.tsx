'use client';

import { useState, useEffect } from 'react';
import { SEOMonitor, KeywordAnalyzer, guoChunlinKeywords } from '@/lib/seo-monitor';

interface SEOReport {
  score: number;
  completedItems: number;
  totalItems: number;
  highPriorityIssues: any[];
  recommendations: string[];
}

interface KeywordRanking {
  keyword: string;
  position: number | null;
  change: number;
  searchVolume: number;
  difficulty: 'low' | 'medium' | 'high';
}

export default function SEODashboard() {
  const [seoReport, setSeoReport] = useState<SEOReport | null>(null);
  const [keywordRankings, setKeywordRankings] = useState<KeywordRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'keywords' | 'checklist'>('overview');

  useEffect(() => {
    const loadSEOData = async () => {
      try {
        const [report, rankings] = await Promise.all([
          SEOMonitor.generateSEOReport(),
          SEOMonitor.trackKeywordRankings()
        ]);
        setSeoReport(report);
        setKeywordRankings(rankings);
      } catch (error) {
        console.error('Failed to load SEO data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSEOData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">SEO监控仪表板</h2>
        <p className="text-blue-100 mt-1">郭春林 - 哲学的花园导游</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'overview', name: '概览', icon: '📊' },
            { id: 'keywords', name: '关键词排名', icon: '🔍' },
            { id: 'checklist', name: 'SEO检查清单', icon: '✅' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && seoReport && (
          <div className="space-y-6">
            {/* SEO Score */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">SEO总分</p>
                    <p className={`text-3xl font-bold ${getScoreColor(seoReport.score)}`}>
                      {seoReport.score}
                    </p>
                  </div>
                  <div className="text-4xl">🎯</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">已完成项目</p>
                    <p className="text-3xl font-bold text-green-700">
                      {seoReport.completedItems}/{seoReport.totalItems}
                    </p>
                  </div>
                  <div className="text-4xl">✅</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">高优先级问题</p>
                    <p className="text-3xl font-bold text-purple-700">
                      {seoReport.highPriorityIssues.length}
                    </p>
                  </div>
                  <div className="text-4xl">⚠️</div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">关键指标</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">18</div>
                  <div className="text-sm text-gray-600">总页面数</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">6</div>
                  <div className="text-sm text-gray-600">文章数量</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">13.5KB</div>
                  <div className="text-sm text-gray-600">首页大小</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">95+</div>
                  <div className="text-sm text-gray-600">性能评分</div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-4">📋 优化建议</h3>
              <ul className="space-y-2">
                {seoReport.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span className="text-yellow-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Keywords Tab */}
        {activeTab === 'keywords' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">关键词排名监控</h3>
              <div className="text-sm text-gray-500">
                最后更新: {new Date().toLocaleString('zh-CN')}
              </div>
            </div>

            {/* Primary Keywords */}
            <div>
              <h4 className="text-md font-medium text-gray-800 mb-3">🎯 主要关键词</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        关键词
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        排名
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        搜索量
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        难度
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        变化
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {keywordRankings.map((ranking, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {ranking.keyword}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {ranking.position ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              #{ranking.position}
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              未排名
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {ranking.searchVolume.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(ranking.difficulty)}`}>
                            {ranking.difficulty === 'low' ? '低' : ranking.difficulty === 'medium' ? '中' : '高'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {ranking.change === 0 ? (
                            <span className="text-gray-500">-</span>
                          ) : ranking.change > 0 ? (
                            <span className="text-green-600">↑{ranking.change}</span>
                          ) : (
                            <span className="text-red-600">↓{Math.abs(ranking.change)}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Keyword Suggestions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-md font-medium text-blue-800 mb-3">💡 关键词建议</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-blue-700 mb-2">长尾关键词机会</h5>
                  <ul className="text-sm text-blue-600 space-y-1">
                    {guoChunlinKeywords.longTail.slice(0, 5).map((keyword, index) => (
                      <li key={index}>• {keyword}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-blue-700 mb-2">地域性关键词</h5>
                  <ul className="text-sm text-blue-600 space-y-1">
                    {guoChunlinKeywords.local.slice(0, 5).map((keyword, index) => (
                      <li key={index}>• {keyword}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
