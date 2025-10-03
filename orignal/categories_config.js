// 郭春林文章分类配置 - 网站开发用
// 基于583篇文章的深度分析结果

export const categoriesConfig = {
  metadata: {
    totalArticles: 583,
    totalCategories: 11,
    featuredCategories: 3,
    lastUpdated: '2025-10-03',
    author: '郭春林',
    analysisMethod: '基于文件名关键词匹配和深度内容分析'
  },

  // 精选分类 - 首页展示
  featuredCategories: [
    {
      id: 'philosophy-thinking',
      name: '哲学思维',
      slug: 'philosophy-thinking',
      description: '在信息爆炸的时代，哲学思维是你的"心智防火墙"。学会透过现象看本质，用理性之光照亮复杂世界，从"信息消费者"成为"智慧创造者"。',
      color: 'from-blue-500 to-blue-700',
      hoverColor: 'hover:from-blue-600 hover:to-blue-800',
      icon: '🧠',
      count: 119,
      featured: true,
      keywords: ['批判性思维', '深度思考', '逻辑分析', '认知升级', '心智模型', '思辨能力'],
      difficulty: '中级',
      popularity: 95,
      seoTitle: '哲学思维 - 信息时代的"心智防火墙" | 郭春林',
      seoDescription: '跟随郭春林学习哲学思维，掌握批判性思考和深度分析的方法，在信息洪流中保持理性与智慧。',
      seoKeywords: ['哲学思维', '批判性思维', '深度思考', '郭春林', '认知升级', '心智模型'],
      representativeArticles: [
        '哲学是什么？',
        '领导者不懂哲学，事业很难再向上走',
        '哲学的思维就是赚钱的思维'
      ]
    },
    {
      id: 'life-wisdom',
      name: '人生智慧',
      slug: 'life-wisdom',
      description: '人生如茶，需要慢慢品味。在浮躁的世界中寻找内心的宁静，在迷茫中找到方向，在痛苦中获得成长，活出真正的自己。',
      color: 'from-green-500 to-green-700',
      hoverColor: 'hover:from-green-600 hover:to-green-800',
      icon: '🌱',
      count: 75,
      featured: true,
      keywords: ['人生感悟', '内心成长', '自我认知', '生活智慧', '心灵修养', '人生意义'],
      difficulty: '初级',
      popularity: 92,
      seoTitle: '人生智慧 - 在浮躁世界中寻找内心宁静 | 郭春林',
      seoDescription: '郭春林分享人生智慧与感悟，帮你在迷茫中找到方向，在痛苦中获得成长，活出真正的自己。',
      seoKeywords: ['人生智慧', '生活感悟', '内心成长', '郭春林', '人生意义', '心灵修养'],
      representativeArticles: [
        '人生的意义是什么就在于不断地升级意义',
        '一个人真正的成长是承认并接纳自己',
        '如何修炼出强大的心力'
      ]
    },
    {
      id: 'ai-era',
      name: 'AI时代',
      slug: 'ai-era',
      description: 'AI浪潮席卷而来，如何在智能化时代保持竞争力？掌握学习能力、创意思维和数字组织能力，让AI成为你的得力助手而非替代者。',
      color: 'from-purple-500 to-purple-700',
      hoverColor: 'hover:from-purple-600 hover:to-purple-800',
      icon: '🤖',
      count: 17,
      featured: true,
      keywords: ['人工智能', '数字化转型', '未来技能', '创新思维', '学习能力', '适应变化'],
      difficulty: '中级',
      popularity: 88,
      seoTitle: 'AI时代生存指南 - 普通人如何在智能化浪潮中突围 | 郭春林',
      seoDescription: '郭春林深度解析AI时代的机遇与挑战，教你掌握核心竞争力，在人工智能时代中脱颖而出。',
      seoKeywords: ['AI时代', '人工智能', '未来技能', '郭春林', '数字化转型', '智能化'],
      representativeArticles: [
        'AI时代到来普通人怎样才能有竞争力',
        '人工智能时代，普通人怎么有竞争力',
        '看懂AI的变革，你就抓了财富密码'
      ]
    }
  ],

  // 所有分类
  allCategories: [
    {
      id: 'philosophy-thinking',
      name: '哲学思维',
      slug: 'philosophy-thinking',
      description: '在信息爆炸的时代，哲学思维是你的"心智防火墙"。学会透过现象看本质，用理性之光照亮复杂世界，从"信息消费者"成为"智慧创造者"。',
      color: 'from-blue-500 to-blue-700',
      hoverColor: 'hover:from-blue-600 hover:to-blue-800',
      icon: '🧠',
      count: 119,
      featured: true,
      keywords: ['批判性思维', '深度思考', '逻辑分析', '认知升级', '心智模型', '思辨能力'],
      difficulty: '中级',
      popularity: 95,
      seoTitle: '哲学思维 - 信息时代的"心智防火墙" | 郭春林',
      seoDescription: '跟随郭春林学习哲学思维，掌握批判性思考和深度分析的方法，在信息洪流中保持理性与智慧。',
      seoKeywords: ['哲学思维', '批判性思维', '深度思考', '郭春林', '认知升级', '心智模型']
    },
    {
      id: 'life-wisdom',
      name: '人生智慧',
      slug: 'life-wisdom',
      description: '人生如茶，需要慢慢品味。在浮躁的世界中寻找内心的宁静，在迷茫中找到方向，在痛苦中获得成长，活出真正的自己。',
      color: 'from-green-500 to-green-700',
      hoverColor: 'hover:from-green-600 hover:to-green-800',
      icon: '🌱',
      count: 75,
      featured: true,
      keywords: ['人生感悟', '内心成长', '自我认知', '生活智慧', '心灵修养', '人生意义'],
      difficulty: '初级',
      popularity: 92,
      seoTitle: '人生智慧 - 在浮躁世界中寻找内心宁静 | 郭春林',
      seoDescription: '郭春林分享人生智慧与感悟，帮你在迷茫中找到方向，在痛苦中获得成长，活出真正的自己。',
      seoKeywords: ['人生智慧', '生活感悟', '内心成长', '郭春林', '人生意义', '心灵修养']
    },
    {
      id: 'interpersonal-relationships',
      name: '人际关系',
      slug: 'interpersonal-relationships',
      description: '人际关系是人生最大的资源。学会理解人性，掌握沟通艺术，建立真诚的连接，让关系成为你成功路上的助力。',
      color: 'from-pink-500 to-pink-700',
      hoverColor: 'hover:from-pink-600 hover:to-pink-800',
      icon: '🤝',
      count: 42,
      featured: false,
      keywords: ['人际沟通', '社交智慧', '人性洞察', '关系建立', '情商提升', '信任构建'],
      difficulty: '中级',
      popularity: 87,
      seoTitle: '人际关系智慧 - 让关系成为成功的助力 | 郭春林',
      seoDescription: '郭春林分享人际关系智慧，教你理解人性、掌握沟通艺术，建立真诚连接，让关系成为成功助力。',
      seoKeywords: ['人际关系', '社交智慧', '沟通技巧', '郭春林', '人性洞察', '情商提升']
    },
    {
      id: 'leadership',
      name: '领导力',
      slug: 'leadership',
      description: '真正的领导力不在于权力，而在于影响力。学会激发团队潜能，培养强大心力，成为能够引领他人走向成功的卓越领导者。',
      color: 'from-red-500 to-red-700',
      hoverColor: 'hover:from-red-600 hover:to-red-800',
      icon: '👑',
      count: 39,
      featured: false,
      keywords: ['团队管理', '影响力', '决策能力', '执行力', '心力修炼', '格局思维'],
      difficulty: '高级',
      popularity: 85,
      seoTitle: '领导力修炼 - 从管理者到真正的领导者 | 郭春林',
      seoDescription: '郭春林深度剖析领导力本质，教你培养强大心力和影响力，成为能够引领团队走向成功的卓越领导者。',
      seoKeywords: ['领导力', '团队管理', '影响力', '郭春林', '管理智慧', '心力修炼']
    },
    {
      id: 'education-learning',
      name: '教育学习',
      slug: 'education-learning',
      description: '教育的本质是唤醒，学习的核心是思考。在AI时代重新定义教育，培养独立思考能力，让学习成为终身的习惯。',
      color: 'from-indigo-500 to-indigo-700',
      hoverColor: 'hover:from-indigo-600 hover:to-indigo-800',
      icon: '📚',
      count: 38,
      featured: false,
      keywords: ['教育理念', '学习方法', '思维训练', '知识转化', '能力培养', '终身学习'],
      difficulty: '中级',
      popularity: 83,
      seoTitle: '教育学习新思维 - AI时代的学习革命 | 郭春林',
      seoDescription: '郭春林探讨AI时代的教育变革，分享高效学习方法，培养独立思考能力，让学习成为终身习惯。',
      seoKeywords: ['教育学习', '学习方法', '教育理念', '郭春林', 'AI教育', '思维训练']
    },
    {
      id: 'wealth-entrepreneurship',
      name: '财富创业',
      slug: 'wealth-entrepreneurship',
      description: '财富不仅是金钱的积累，更是认知的升级。掌握赚钱的底层逻辑，洞察商业机会，用哲学思维指导创业实践。',
      color: 'from-yellow-500 to-yellow-700',
      hoverColor: 'hover:from-yellow-600 hover:to-yellow-800',
      icon: '💰',
      count: 37,
      featured: false,
      keywords: ['创业思维', '商业洞察', '财富认知', '投资理念', '机会识别', '价值创造'],
      difficulty: '中级',
      popularity: 90,
      seoTitle: '财富创业 - 用哲学思维指导创业实践 | 郭春林',
      seoDescription: '郭春林揭示财富创业的底层逻辑，教你洞察商业机会，用哲学思维指导创业实践，实现财富自由。',
      seoKeywords: ['财富创业', '创业思维', '商业智慧', '郭春林', '赚钱逻辑', '投资理念']
    },
    {
      id: 'cultural-thinking',
      name: '文化思考',
      slug: 'cultural-thinking',
      description: '在东西方文明的碰撞中思考，在传统与现代的交融中前行。深度解析文化现象，洞察时代变迁，把握历史脉络。',
      color: 'from-amber-500 to-amber-700',
      hoverColor: 'hover:from-amber-600 hover:to-amber-800',
      icon: '🏛️',
      count: 37,
      featured: false,
      keywords: ['文化分析', '时代思考', '历史洞察', '文明对话', '传统现代', '社会变迁'],
      difficulty: '高级',
      popularity: 78,
      seoTitle: '文化思考 - 在文明碰撞中寻找前行方向 | 郭春林',
      seoDescription: '郭春林深度分析文化现象，在东西方文明碰撞中思考，洞察时代变迁，把握历史发展脉络。',
      seoKeywords: ['文化思考', '文明对话', '时代分析', '郭春林', '历史洞察', '社会变迁']
    },
    {
      id: 'workplace-wisdom',
      name: '职场智慧',
      slug: 'workplace-wisdom',
      description: '职场如战场，智慧是最好的武器。掌握职场生存法则，提升专业能力，在竞争中脱颖而出，实现职业发展。',
      color: 'from-gray-500 to-gray-700',
      hoverColor: 'hover:from-gray-600 hover:to-gray-800',
      icon: '💼',
      count: 19,
      featured: false,
      keywords: ['职场发展', '职业规划', '工作技能', '竞争策略', '专业能力', '职场情商'],
      difficulty: '中级',
      popularity: 81,
      seoTitle: '职场智慧 - 在竞争中脱颖而出的生存法则 | 郭春林',
      seoDescription: '郭春林分享职场智慧与生存法则，教你提升专业能力，在职场竞争中脱颖而出，实现职业发展。',
      seoKeywords: ['职场智慧', '职业发展', '工作技能', '郭春林', '职场生存', '专业能力']
    },
    {
      id: 'ai-era',
      name: 'AI时代',
      slug: 'ai-era',
      description: 'AI浪潮席卷而来，如何在智能化时代保持竞争力？掌握学习能力、创意思维和数字组织能力，让AI成为你的得力助手而非替代者。',
      color: 'from-purple-500 to-purple-700',
      hoverColor: 'hover:from-purple-600 hover:to-purple-800',
      icon: '🤖',
      count: 17,
      featured: true,
      keywords: ['人工智能', '数字化转型', '未来技能', '创新思维', '学习能力', '适应变化'],
      difficulty: '中级',
      popularity: 88,
      seoTitle: 'AI时代生存指南 - 普通人如何在智能化浪潮中突围 | 郭春林',
      seoDescription: '郭春林深度解析AI时代的机遇与挑战，教你掌握核心竞争力，在人工智能时代中脱颖而出。',
      seoKeywords: ['AI时代', '人工智能', '未来技能', '郭春林', '数字化转型', '智能化']
    },
    {
      id: 'emotional-relationships',
      name: '情感关系',
      slug: 'emotional-relationships',
      description: '爱情与婚姻的真谛在于把"我"变成"我们"。理解情感的本质，学会经营关系，在相互理解中共同成长。',
      color: 'from-rose-500 to-rose-700',
      hoverColor: 'hover:from-rose-600 hover:to-rose-800',
      icon: '💕',
      count: 11,
      featured: false,
      keywords: ['爱情婚姻', '情感经营', '关系维护', '相互理解', '家庭和谐', '情感智慧'],
      difficulty: '中级',
      popularity: 89,
      seoTitle: '情感关系智慧 - 爱情婚姻的经营之道 | 郭春林',
      seoDescription: '郭春林深度解析爱情婚姻的本质，分享情感关系的经营智慧，帮你在相互理解中共同成长。',
      seoKeywords: ['情感关系', '爱情婚姻', '关系经营', '郭春林', '婚姻智慧', '情感成长']
    },
    {
      id: 'others',
      name: '其他',
      slug: 'others',
      description: '涵盖各种主题的精彩内容，探索更多人生智慧和思考角度，发现意想不到的启发和收获。',
      color: 'from-slate-500 to-slate-700',
      hoverColor: 'hover:from-slate-600 hover:to-slate-800',
      icon: '📝',
      count: 149,
      featured: false,
      keywords: ['综合内容', '多元思考', '生活感悟', '随笔杂谈', '思想碎片', '智慧分享'],
      difficulty: '初级',
      popularity: 70,
      seoTitle: '其他内容 - 多元化的思考与感悟 | 郭春林',
      seoDescription: '郭春林的多元化思考与感悟，涵盖各种主题的精彩内容，探索更多人生智慧和思考角度。',
      seoKeywords: ['郭春林', '综合内容', '生活感悟', '思想分享', '多元思考', '智慧启发']
    }
  ],

  // 统计数据
  statistics: {
    totalArticles: 583,
    cleanedDataFiles: 144,
    originalMdFiles: 439,
    topThemes: ['哲学思维', '人生智慧', '人际关系', '领导力', '教育学习'],
    averagePopularity: 84.5,
    difficultyDistribution: {
      '初级': 2,
      '中级': 7,
      '高级': 2
    }
  },

  // SEO配置
  seoConfig: {
    siteName: '郭春林',
    defaultTitle: '郭春林 - 哲学思维与人生智慧',
    defaultDescription: '跟随郭春林探索哲学思维，获得人生智慧，在AI时代保持竞争力。',
    defaultKeywords: ['郭春林', '哲学思维', '人生智慧', 'AI时代', '领导力', '创业思维'],
    author: '郭春林',
    language: 'zh-CN',
    domain: 'guochunlin.com' // 示例域名
  }
};

// 工具函数
export const getCategoryById = (id) => {
  return categoriesConfig.allCategories.find(cat => cat.id === id);
};

export const getFeaturedCategories = () => {
  return categoriesConfig.featuredCategories;
};

export const getCategoriesByPopularity = () => {
  return [...categoriesConfig.allCategories].sort((a, b) => b.popularity - a.popularity);
};

export const getCategoriesByCount = () => {
  return [...categoriesConfig.allCategories].sort((a, b) => b.count - a.count);
};

export default categoriesConfig;