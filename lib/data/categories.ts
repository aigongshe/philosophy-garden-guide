// 统一分类数据管理
import { Category } from '@/lib/types/content';

export const categories: Category[] = [
  {
    id: 'philosophy-thinking',
    name: '哲学思维',
    slug: 'philosophy-thinking',
    description: '在信息爆炸的时代，哲学思维是你的"心智防火墙"。学会透过现象看本质，用理性之光照亮复杂世界，从"信息消费者"成为"智慧创造者"。',
    color: 'from-blue-500 to-blue-700',
    hoverColor: 'hover:from-blue-600 hover:to-blue-800',
    icon: '🧠',
    count: 12,
    featured: true,
    keywords: ['批判性思维', '深度思考', '逻辑分析', '认知升级', '心智模型', '思辨能力'],
    difficulty: '中级',
    popularity: 95,
    seoTitle: '哲学思维 - 信息时代的"心智防火墙" | 郭春林',
    seoDescription: '跟随郭春林学习哲学思维，掌握批判性思考和深度分析的方法，在信息洪流中保持理性与智慧。',
    seoKeywords: ['哲学思维', '批判性思维', '深度思考', '郭春林', '认知升级', '心智模型']
  },
  {
    id: 'business-wisdom',
    name: '商业智慧',
    slug: 'business-wisdom',
    description: '真正的商业成功不在于战术，而在于哲学。从"机会猎手"到"世界建筑师"，掌握企业家的底层思维逻辑，用智慧经营机会并持续盈利。',
    color: 'from-green-500 to-green-700',
    hoverColor: 'hover:from-green-600 hover:to-green-800',
    icon: '💼',
    count: 8,
    featured: true,
    keywords: ['企业家思维', '商业哲学', '创新思维', '领导力', '商业认知', '成功法则'],
    difficulty: '进阶',
    popularity: 88,
    seoTitle: '商业智慧 - 企业家的哲学思维与成功法则 | 郭春林',
    seoDescription: '学习企业家的底层思维逻辑和商业哲学，掌握用智慧经营机会的方法，实现可持续的商业成功。',
    seoKeywords: ['商业智慧', '企业家思维', '商业哲学', '创新思维', '郭春林', '成功法则']
  },
  {
    id: 'life-philosophy',
    name: '人生哲学',
    slug: 'life-philosophy',
    description: '人生不是在"平衡"，而是在被"撕扯"。学会驾驭内心的"三驾马车"，从"失衡"的救火队员成为人生的"智慧车夫"，找到属于你的生活节奏。',
    color: 'from-purple-500 to-purple-700',
    hoverColor: 'hover:from-purple-600 hover:to-purple-800',
    icon: '🌟',
    count: 15,
    featured: true,
    keywords: ['人生意义', '生活智慧', '内心和谐', '人生平衡', '存在思考', '幸福哲学'],
    difficulty: '入门',
    popularity: 92,
    seoTitle: '人生哲学 - 驾驭内心"三驾马车"的生活智慧 | 郭春林',
    seoDescription: '探索人生的深层意义，学会在理性、激情、品格之间找到平衡，构建属于自己的人生哲学体系。',
    seoKeywords: ['人生哲学', '生活智慧', '人生意义', '内心和谐', '郭春林', '人生平衡']
  },
  {
    id: 'education-concept',
    name: '教育理念',
    slug: 'education-concept',
    description: '教育的真谛在古人的"格物致知，诚意正心，修身齐家治国平天下"。在AI颠覆传统教育的时代，重新发现中华文化的教育智慧，培养真正的人才。',
    color: 'from-orange-500 to-orange-700',
    hoverColor: 'hover:from-orange-600 hover:to-orange-800',
    icon: '📚',
    count: 6,
    featured: false,
    keywords: ['传统文化教育', '现代教育反思', '独立思考', '人才培养', 'AI时代教育', '教育哲学'],
    difficulty: '中级',
    popularity: 78,
    seoTitle: '教育理念 - 传统智慧与现代教育的融合 | 郭春林',
    seoDescription: '在AI时代重新审视教育本质，融合传统文化智慧与现代教育理念，探索培养独立思考能力的教育方法。',
    seoKeywords: ['教育理念', '传统文化教育', '现代教育', '独立思考', '郭春林', 'AI时代教育']
  },
  {
    id: 'interpersonal-relations',
    name: '人际关系',
    slug: 'interpersonal-relations',
    description: '在中国社会，人际关系是第一资源。掌握"情义利"的平衡艺术，学会在合作中成长，在交往中学习，构建有效的人际关系网络。',
    color: 'from-pink-500 to-pink-700',
    hoverColor: 'hover:from-pink-600 hover:to-pink-800',
    icon: '🤝',
    count: 9,
    featured: false,
    keywords: ['人际关系', '社交智慧', '沟通艺术', '关系建立', '情商管理', '合作能力'],
    difficulty: '中级',
    popularity: 85,
    seoTitle: '人际关系 - 中国社会的第一资源与沟通艺术 | 郭春林',
    seoDescription: '学习人际交往的智慧，掌握"情义利"平衡的艺术，建立有效的人际关系网络和社交能力。',
    seoKeywords: ['人际关系', '社交智慧', '沟通艺术', '关系建立', '郭春林', '情商管理']
  },
  {
    id: 'personal-growth',
    name: '个人成长',
    slug: 'personal-growth',
    description: '普通人改变命运的关键在于认知升级。从"后知后觉穷光蛋"到"先知先觉先发财"，掌握成长的底层逻辑，实现人生的逆袭与蜕变。',
    color: 'from-indigo-500 to-indigo-700',
    hoverColor: 'hover:from-indigo-600 hover:to-indigo-800',
    icon: '🚀',
    count: 11,
    featured: false,
    keywords: ['认知升级', '自我提升', '命运改变', '成长思维', '能力发展', '人生逆袭'],
    difficulty: '入门',
    popularity: 90,
    seoTitle: '个人成长 - 普通人改变命运的认知升级之路 | 郭春林',
    seoDescription: '掌握个人成长的底层逻辑，通过认知升级实现命运改变，从普通人到成功者的蜕变之路。',
    seoKeywords: ['个人成长', '认知升级', '自我提升', '命运改变', '郭春林', '人生逆袭']
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