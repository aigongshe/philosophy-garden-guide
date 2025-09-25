// 统一分类数据管理
import { Category } from '@/lib/types/content';

export const categories: Category[] = [
  {
    id: 'philosophy-thinking',
    name: '哲学思维',
    slug: 'philosophy-thinking',
    description: '探索深邃的哲学思考，培养理性思维能力，掌握思辨的艺术。从古希腊哲学到现代思维科学，帮助你建立系统性的思考框架。',
    color: 'from-blue-500 to-blue-700',
    hoverColor: 'hover:from-blue-600 hover:to-blue-800',
    icon: '🧠',
    count: 12,
    featured: true,
    keywords: ['理性思考', '逻辑分析', '批判思维', '系统思维', '哲学方法论'],
    difficulty: '中级',
    popularity: 95,
    seoTitle: '哲学思维 - 现代人必备的理性思考能力 | 郭春林',
    seoDescription: '跟随郭春林学习哲学思维，掌握理性分析、批判思考的方法，在复杂世界中保持清醒的头脑。',
    seoKeywords: ['哲学思维', '理性思考', '批判思维', '郭春林', '思维训练']
  },
  {
    id: 'business-wisdom',
    name: '商业智慧',
    slug: 'business-wisdom',
    description: '商业成功背后的哲学原理和智慧法则，企业家必备思维。从商业伦理到战略思考，探索可持续成功的智慧之道。',
    color: 'from-green-500 to-green-700',
    hoverColor: 'hover:from-green-600 hover:to-green-800',
    icon: '💼',
    count: 8,
    featured: true,
    keywords: ['商业策略', '管理哲学', '创业智慧', '领导力', '商业伦理'],
    difficulty: '进阶',
    popularity: 88,
    seoTitle: '商业智慧 - 企业家必备的哲学思维 | 郭春林',
    seoDescription: '学习商业哲学和管理智慧，掌握成功企业家的思维模式，实现可持续的商业成功。',
    seoKeywords: ['商业智慧', '企业家思维', '管理哲学', '商业策略', '郭春林']
  },
  {
    id: 'life-philosophy',
    name: '人生哲学',
    slug: 'life-philosophy',
    description: '人生意义的探索与生活智慧的分享，寻找内心的平静。从生活的本质到幸福的真谛，构建属于你的人生哲学体系。',
    color: 'from-purple-500 to-purple-700',
    hoverColor: 'hover:from-purple-600 hover:to-purple-800',
    icon: '🌟',
    count: 15,
    featured: true,
    keywords: ['人生意义', '生活智慧', '内心平静', '幸福哲学', '人生价值'],
    difficulty: '入门',
    popularity: 92,
    seoTitle: '人生哲学 - 寻找生活的意义与智慧 | 郭春林',
    seoDescription: '探索人生的意义和价值，学习生活的智慧，在忙碌的现代生活中找到内心的平静与满足。',
    seoKeywords: ['人生哲学', '生活智慧', '人生意义', '内心平静', '郭春林']
  },
  {
    id: 'education-concept',
    name: '教育理念',
    slug: 'education-concept',
    description: '现代教育的反思与未来教育的展望，培养独立思考。重新审视教育的本质，探索培养创新人才的教育方法。',
    color: 'from-orange-500 to-orange-700',
    hoverColor: 'hover:from-orange-600 hover:to-orange-800',
    icon: '📚',
    count: 6,
    featured: false,
    keywords: ['教育改革', '独立思考', '创新教学', '批判教育', '终身学习'],
    difficulty: '中级',
    popularity: 78,
    seoTitle: '教育理念 - 培养独立思考的现代教育 | 郭春林',
    seoDescription: '反思现代教育的问题，探索培养独立思考能力的教育方法，为未来教育发展提供新思路。',
    seoKeywords: ['教育理念', '教育改革', '独立思考', '创新教育', '郭春林']
  },
  {
    id: 'interpersonal-relations',
    name: '人际关系',
    slug: 'interpersonal-relations',
    description: '人际交往的智慧与关系建立的艺术，沟通的哲学。从心理学到哲学，掌握建立深度人际关系的智慧。',
    color: 'from-pink-500 to-pink-700',
    hoverColor: 'hover:from-pink-600 hover:to-pink-800',
    icon: '🤝',
    count: 9,
    featured: false,
    keywords: ['沟通技巧', '关系建立', '社交智慧', '情商管理', '人际心理'],
    difficulty: '中级',
    popularity: 85,
    seoTitle: '人际关系 - 沟通的艺术与智慧 | 郭春林',
    seoDescription: '学习人际交往的智慧，掌握有效沟通的技巧，建立深度而有意义的人际关系。',
    seoKeywords: ['人际关系', '沟通技巧', '社交智慧', '关系建立', '郭春林']
  },
  {
    id: 'personal-growth',
    name: '个人成长',
    slug: 'personal-growth',
    description: '自我提升的方法与成长路径的指导，成为更好的自己。从自我认知到目标实现，构建系统性的成长体系。',
    color: 'from-indigo-500 to-indigo-700',
    hoverColor: 'hover:from-indigo-600 hover:to-indigo-800',
    icon: '🚀',
    count: 11,
    featured: false,
    keywords: ['自我提升', '目标达成', '习惯养成', '心理成长', '能力发展'],
    difficulty: '入门',
    popularity: 90,
    seoTitle: '个人成长 - 系统性的自我提升方法 | 郭春林',
    seoDescription: '掌握科学的个人成长方法，从自我认知到目标实现，建立持续进步的成长体系。',
    seoKeywords: ['个人成长', '自我提升', '目标达成', '习惯养成', '郭春林']
  }
];

// 工具函数：根据slug获取分类
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(category => category.slug === slug);
}

// 工具函数：根据ID获取分类
export function getCategoryById(id: string): Category | undefined {
  return categories.find(category => category.id === id);
}

// 工具函数：获取精选分类
export function getFeaturedCategories(): Category[] {
  return categories.filter(category => category.featured);
}

// 工具函数：根据难度获取分类
export function getCategoriesByDifficulty(difficulty: Category['difficulty']): Category[] {
  return categories.filter(category => category.difficulty === difficulty);
}

// 工具函数：获取分类统计
export function getCategoryStats() {
  const total = categories.length;
  const featured = categories.filter(c => c.featured).length;
  const totalPosts = categories.reduce((sum, c) => sum + c.count, 0);
  const avgPostCount = Math.round(totalPosts / total);
  const avgPopularity = Math.round(categories.reduce((sum, c) => sum + c.popularity, 0) / total);

  const byDifficulty = categories.reduce((acc, category) => {
    acc[category.difficulty] = (acc[category.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total,
    featured,
    totalPosts,
    avgPostCount,
    avgPopularity,
    byDifficulty
  };
}

// 工具函数：搜索分类
export function searchCategories(query: string): Category[] {
  const lowercaseQuery = query.toLowerCase();
  return categories.filter(category => 
    category.name.toLowerCase().includes(lowercaseQuery) ||
    category.description.toLowerCase().includes(lowercaseQuery) ||
    category.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
}

// 导出默认分类数据
export default categories;