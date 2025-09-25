// 统一名言数据管理
import { Quote } from '@/lib/types/content';

export const quotes: Quote[] = [
  {
    id: 'wisdom-questions',
    text: '智慧不在于拥有所有答案，而在于提出正确的问题',
    author: '郭春林',
    category: '哲学思维',
    featured: true,
    source: '哲学思维课程',
    context: '在探讨哲学思维的本质时，强调提问比回答更重要的观点'
  },
  {
    id: 'success-balance',
    text: '真正的成功，是内心的平静与外在的成就和谐统一',
    author: '郭春林',
    category: '人生哲学',
    featured: true,
    source: '人生智慧讲座',
    context: '讨论成功的真正含义，强调内外平衡的重要性'
  },
  {
    id: 'philosophy-survival',
    text: '哲学思维是现代人最需要的生存技能',
    author: '郭春林',
    category: '哲学思维',
    featured: true,
    source: '现代哲学应用',
    context: '强调哲学思维在现代社会中的实用价值和重要性'
  },
  {
    id: 'simple-wisdom',
    text: '在复杂的世界中，保持简单的智慧',
    author: '郭春林',
    category: '人生哲学',
    featured: true,
    source: '生活智慧分享',
    context: '在复杂环境中如何保持清醒和简单的思考方式'
  },
  {
    id: 'business-philosophy',
    text: '商业的本质不是交易，而是价值的创造与传递',
    author: '郭春林',
    category: '商业智慧',
    featured: false,
    source: '商业哲学课程',
    context: '重新定义商业的本质，强调价值创造的重要性'
  },
  {
    id: 'learning-growth',
    text: '学习不是为了知道答案，而是为了提出更好的问题',
    author: '郭春林',
    category: '个人成长',
    featured: false,
    source: '终身学习理念',
    context: '探讨学习的真正目的和价值'
  },
  {
    id: 'change-adaptation',
    text: '适应变化的能力，比预测变化的能力更重要',
    author: '郭春林',
    category: '哲学思维',
    featured: false,
    source: '变化管理智慧',
    context: '在不确定的环境中如何保持竞争力'
  },
  {
    id: 'relationship-wisdom',
    text: '理解他人，从理解自己开始',
    author: '郭春林',
    category: '人际关系',
    featured: false,
    source: '人际关系哲学',
    context: '探讨人际理解的基础和前提'
  },
  {
    id: 'education-purpose',
    text: '教育的目的不是填满桶子，而是点燃火焰',
    author: '郭春林',
    category: '教育理念',
    featured: false,
    source: '教育哲学思考',
    context: '重新思考教育的本质和目标'
  },
  {
    id: 'time-wisdom',
    text: '时间不是金钱，时间是生命的载体',
    author: '郭春林',
    category: '人生哲学',
    featured: false,
    source: '时间管理哲学',
    context: '重新理解时间的价值和意义'
  },
  {
    id: 'decision-making',
    text: '最好的决策不是完美的决策，而是在不完美信息下的最优选择',
    author: '郭春林',
    category: '哲学思维',
    featured: false,
    source: '决策智慧',
    context: '在不确定性中如何做出明智的决策'
  },
  {
    id: 'leadership-essence',
    text: '领导力的本质是影响力，而影响力的源泉是品格',
    author: '郭春林',
    category: '商业智慧',
    featured: false,
    source: '领导力哲学',
    context: '探讨真正领导力的来源和基础'
  }
];

// 工具函数：根据ID获取名言
export function getQuoteById(id: string): Quote | undefined {
  return quotes.find(quote => quote.id === id);
}

// 工具函数：根据分类获取名言
export function getQuotesByCategory(category: string): Quote[] {
  return quotes.filter(quote => quote.category === category);
}

// 工具函数：获取精选名言
export function getFeaturedQuotes(): Quote[] {
  return quotes.filter(quote => quote.featured);
}

// 工具函数：随机获取名言
export function getRandomQuote(): Quote {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

// 工具函数：随机获取精选名言
export function getRandomFeaturedQuote(): Quote {
  const featuredQuotes = getFeaturedQuotes();
  const randomIndex = Math.floor(Math.random() * featuredQuotes.length);
  return featuredQuotes[randomIndex];
}

// 工具函数：搜索名言
export function searchQuotes(query: string): Quote[] {
  const lowercaseQuery = query.toLowerCase();
  return quotes.filter(quote => 
    quote.text.toLowerCase().includes(lowercaseQuery) ||
    quote.category.toLowerCase().includes(lowercaseQuery) ||
    (quote.context && quote.context.toLowerCase().includes(lowercaseQuery))
  );
}

// 工具函数：获取名言统计
export function getQuoteStats() {
  const total = quotes.length;
  const featured = quotes.filter(q => q.featured).length;
  
  const byCategory = quotes.reduce((acc, quote) => {
    acc[quote.category] = (acc[quote.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const byAuthor = quotes.reduce((acc, quote) => {
    const author = quote.author || '未知';
    acc[author] = (acc[author] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total,
    featured,
    byCategory,
    byAuthor
  };
}

// 工具函数：获取每日名言（基于日期）
export function getDailyQuote(date: Date = new Date()): Quote {
  // 使用日期作为种子，确保同一天返回相同的名言
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const index = dayOfYear % quotes.length;
  return quotes[index];
}

// 工具函数：获取相关名言
export function getRelatedQuotes(currentQuote: Quote, limit: number = 3): Quote[] {
  return quotes
    .filter(quote => 
      quote.id !== currentQuote.id && 
      quote.category === currentQuote.category
    )
    .slice(0, limit);
}

// 导出默认名言数据
export default quotes;