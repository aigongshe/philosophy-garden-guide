// SEO监控和关键词分析工具
import { siteConfig } from './config';

// 郭春林专属关键词配置
export const guoChunlinKeywords = {
  // 主要品牌词
  primary: [
    '郭春林',
    '郭春林 哲学',
    '郭春林 商业智慧',
    '郭春林 人生哲学',
    '哲学的花园导游'
  ],
  
  // 长尾关键词
  longTail: [
    '郭春林 哲学思维',
    '郭春林 批判性思维',
    '郭春林 系统性思维',
    '郭春林 商业哲学',
    '郭春林 企业家思维',
    '郭春林 人生智慧',
    '郭春林 个人成长',
    '郭春林 教育理念',
    '郭春林 YouTube',
    '郭春林 北大',
    '郭春林 哲学老师',
    '郭春林 商业导师'
  ],
  
  // 竞争性关键词
  competitive: [
    '哲学思维 导师',
    '商业智慧 分享',
    '人生哲学 指导',
    '批判性思维 训练',
    '企业家 思维模式',
    '现代哲学 应用',
    '商业哲学 课程',
    '人生导师 中国'
  ],
  
  // 地域性关键词
  local: [
    '北京 哲学老师',
    '中国 哲学导师',
    '北大 哲学',
    '北京 商业智慧',
    '中国 人生导师'
  ]
};

// SEO检查清单
export interface SEOChecklistItem {
  id: string;
  category: 'technical' | 'content' | 'keywords' | 'links' | 'social';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'completed' | 'in_progress' | 'not_started';
  checker: () => Promise<boolean>;
}

export const seoChecklist: SEOChecklistItem[] = [
  // 技术SEO
  {
    id: 'meta_title_guochunlin',
    category: 'technical',
    title: '页面标题包含"郭春林"',
    description: '确保所有重要页面的标题都包含"郭春林"关键词',
    priority: 'high',
    status: 'completed',
    checker: async () => {
      const title = document.title;
      return title.includes('郭春林') || title.includes('Guo Chunlin');
    }
  },
  {
    id: 'meta_description_optimized',
    category: 'technical',
    title: 'Meta描述优化',
    description: '描述长度在150-160字符，包含主要关键词',
    priority: 'high',
    status: 'completed',
    checker: async () => {
      const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
      return metaDesc ? metaDesc.length >= 150 && metaDesc.length <= 160 : false;
    }
  },
  {
    id: 'structured_data_person',
    category: 'technical',
    title: '郭春林个人结构化数据',
    description: '实现Person Schema标记，包含完整的个人信息',
    priority: 'high',
    status: 'completed',
    checker: async () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      return Array.from(scripts).some(script => {
        try {
          const data = JSON.parse(script.textContent || '');
          return data['@type'] === 'Person' && data.name === '郭春林';
        } catch {
          return false;
        }
      });
    }
  },
  {
    id: 'page_speed_optimization',
    category: 'technical',
    title: '页面加载速度优化',
    description: 'Core Web Vitals指标达到绿色标准',
    priority: 'high',
    status: 'completed',
    checker: async () => {
      // 简化的性能检查
      return performance.now() < 3000; // 3秒内加载完成
    }
  },
  
  // 内容SEO
  {
    id: 'keyword_density_guochunlin',
    category: 'content',
    title: '"郭春林"关键词密度',
    description: '主要内容中"郭春林"关键词密度在1-3%之间',
    priority: 'high',
    status: 'in_progress',
    checker: async () => {
      const content = document.body.textContent || '';
      const totalWords = content.split(/\s+/).length;
      const keywordCount = (content.match(/郭春林/g) || []).length;
      const density = (keywordCount / totalWords) * 100;
      return density >= 1 && density <= 3;
    }
  },
  {
    id: 'content_quality_philosophy',
    category: 'content',
    title: '哲学内容质量',
    description: '文章包含深度哲学思考，字数超过2000字',
    priority: 'high',
    status: 'completed',
    checker: async () => {
      const content = document.querySelector('article')?.textContent || '';
      return content.length > 2000;
    }
  },
  {
    id: 'internal_linking',
    category: 'content',
    title: '内链优化',
    description: '相关文章之间建立合理的内链结构',
    priority: 'medium',
    status: 'completed',
    checker: async () => {
      const internalLinks = document.querySelectorAll('a[href^="/"]');
      return internalLinks.length >= 3;
    }
  },
  
  // 关键词优化
  {
    id: 'h1_tag_optimization',
    category: 'keywords',
    title: 'H1标签关键词优化',
    description: 'H1标签包含主要关键词，每页只有一个H1',
    priority: 'high',
    status: 'completed',
    checker: async () => {
      const h1Tags = document.querySelectorAll('h1');
      return h1Tags.length === 1 && (h1Tags[0].textContent?.includes('郭春林') || false);
    }
  },
  {
    id: 'alt_text_optimization',
    category: 'keywords',
    title: '图片Alt文本优化',
    description: '所有图片都有描述性的Alt文本，包含相关关键词',
    priority: 'medium',
    status: 'in_progress',
    checker: async () => {
      const images = document.querySelectorAll('img');
      return Array.from(images).every(img => img.getAttribute('alt'));
    }
  },
  
  // 外链建设
  {
    id: 'youtube_integration',
    category: 'links',
    title: 'YouTube频道集成',
    description: '网站与郭春林YouTube频道建立双向链接',
    priority: 'high',
    status: 'completed',
    checker: async () => {
      const youtubeLinks = document.querySelectorAll('a[href*="youtube.com"]');
      return youtubeLinks.length > 0;
    }
  },
  {
    id: 'social_media_presence',
    category: 'social',
    title: '社交媒体存在',
    description: '在主要社交平台建立郭春林品牌存在',
    priority: 'medium',
    status: 'not_started',
    checker: async () => {
      // 这需要手动验证
      return false;
    }
  }
];

// 关键词分析工具
export class KeywordAnalyzer {
  private content: string;
  
  constructor(content: string) {
    this.content = content.toLowerCase();
  }
  
  // 分析关键词密度
  analyzeKeywordDensity(keyword: string): number {
    const words = this.content.split(/\s+/);
    const keywordCount = words.filter(word => word.includes(keyword.toLowerCase())).length;
    return (keywordCount / words.length) * 100;
  }
  
  // 分析郭春林相关关键词覆盖
  analyzeGuoChunlinCoverage(): {
    primary: { keyword: string; density: number; present: boolean }[];
    longTail: { keyword: string; density: number; present: boolean }[];
    suggestions: string[];
  } {
    const primaryAnalysis = guoChunlinKeywords.primary.map(keyword => ({
      keyword,
      density: this.analyzeKeywordDensity(keyword),
      present: this.content.includes(keyword.toLowerCase())
    }));
    
    const longTailAnalysis = guoChunlinKeywords.longTail.map(keyword => ({
      keyword,
      density: this.analyzeKeywordDensity(keyword),
      present: this.content.includes(keyword.toLowerCase())
    }));
    
    const suggestions = [];
    
    // 生成优化建议
    if (!primaryAnalysis.some(k => k.present)) {
      suggestions.push('建议在内容中至少包含一个主要关键词');
    }
    
    const guochunlinDensity = this.analyzeKeywordDensity('郭春林');
    if (guochunlinDensity < 1) {
      suggestions.push('"郭春林"关键词密度过低，建议增加到1-3%');
    } else if (guochunlinDensity > 3) {
      suggestions.push('"郭春林"关键词密度过高，建议降低到1-3%');
    }
    
    if (longTailAnalysis.filter(k => k.present).length < 2) {
      suggestions.push('建议增加更多长尾关键词以提高搜索覆盖面');
    }
    
    return {
      primary: primaryAnalysis,
      longTail: longTailAnalysis,
      suggestions
    };
  }
  
  // 生成内容优化建议
  generateContentSuggestions(): string[] {
    const suggestions = [];
    const wordCount = this.content.split(/\s+/).length;
    
    if (wordCount < 1500) {
      suggestions.push('文章长度建议增加到1500字以上以提高SEO效果');
    }
    
    if (!this.content.includes('哲学思维')) {
      suggestions.push('建议在内容中加入"哲学思维"相关讨论');
    }
    
    if (!this.content.includes('商业智慧')) {
      suggestions.push('建议在内容中加入"商业智慧"相关内容');
    }
    
    if (!this.content.includes('人生哲学')) {
      suggestions.push('建议在内容中加入"人生哲学"相关思考');
    }
    
    return suggestions;
  }
}

// SEO监控报告生成器
export class SEOMonitor {
  // 生成SEO检查报告
  static async generateSEOReport(): Promise<{
    score: number;
    completedItems: number;
    totalItems: number;
    highPriorityIssues: SEOChecklistItem[];
    recommendations: string[];
  }> {
    const results = await Promise.all(
      seoChecklist.map(async item => {
        try {
          const passed = await item.checker();
          return { ...item, passed };
        } catch {
          return { ...item, passed: false };
        }
      })
    );
    
    const completedItems = results.filter(item => item.passed).length;
    const score = Math.round((completedItems / seoChecklist.length) * 100);
    const highPriorityIssues = results.filter(item => !item.passed && item.priority === 'high');
    
    const recommendations = [
      '确保所有页面标题都包含"郭春林"关键词',
      '优化文章内容，增加哲学思维相关关键词密度',
      '建立与YouTube频道的双向链接',
      '在社交媒体平台建立品牌存在',
      '定期发布高质量的哲学内容',
      '优化图片Alt文本，包含相关关键词',
      '建立内链结构，提高页面权重传递'
    ];
    
    return {
      score,
      completedItems,
      totalItems: seoChecklist.length,
      highPriorityIssues,
      recommendations
    };
  }
  
  // 监控关键词排名（模拟数据，实际需要接入第三方API）
  static async trackKeywordRankings(): Promise<{
    keyword: string;
    position: number | null;
    change: number;
    searchVolume: number;
    difficulty: 'low' | 'medium' | 'high';
  }[]> {
    // 这里返回模拟数据，实际应该接入Google Search Console API或第三方SEO工具
    return [
      {
        keyword: '郭春林',
        position: null, // 未排名
        change: 0,
        searchVolume: 1000,
        difficulty: 'medium'
      },
      {
        keyword: '郭春林 哲学',
        position: null,
        change: 0,
        searchVolume: 500,
        difficulty: 'low'
      },
      {
        keyword: '郭春林 商业智慧',
        position: null,
        change: 0,
        searchVolume: 300,
        difficulty: 'low'
      },
      {
        keyword: '哲学的花园导游',
        position: 1, // 品牌词应该排第一
        change: 0,
        searchVolume: 100,
        difficulty: 'low'
      }
    ];
  }
}

// Google Search Console集成配置
export const searchConsoleConfig = {
  // 网站验证文件内容
  verificationMeta: {
    name: 'google-site-verification',
    content: 'your-google-verification-code' // 需要替换为实际的验证码
  },
  
  // 提交sitemap的URL
  sitemapUrls: [
    `${siteConfig.url}/sitemap.xml`,
    `${siteConfig.url}/posts-sitemap.xml`,
    `${siteConfig.url}/categories-sitemap.xml`
  ],
  
  // 重要页面URL（优先索引）
  priorityUrls: [
    `${siteConfig.url}`,
    `${siteConfig.url}/about`,
    `${siteConfig.url}/posts`,
    `${siteConfig.url}/categories`,
    ...guoChunlinKeywords.primary.map(keyword => 
      `${siteConfig.url}/posts?search=${encodeURIComponent(keyword)}`
    )
  ]
};

// 导出所有工具
export default {
  KeywordAnalyzer,
  SEOMonitor,
  guoChunlinKeywords,
  seoChecklist,
  searchConsoleConfig
};
