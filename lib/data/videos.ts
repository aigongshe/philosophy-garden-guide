// 统一视频数据管理
import { Video, ChannelStats } from '@/lib/types/content';
import { extractYouTubeId, getYouTubeThumbnail, getYouTubeEmbedUrl } from '@/lib/utils/validation';

export const videos: Video[] = [
  {
    id: 'dQw4w9WgXcQ', // 这是示例ID，实际使用时需要替换为真实的YouTube视频ID
    title: '哲学思维如何改变你的人生轨迹',
    description: '深入探讨哲学思维在日常生活中的实际应用，从思维模式到行为改变的完整路径。通过具体案例分析，帮助你理解如何运用哲学智慧来指导人生决策。',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '15:32',
    views: '12.5万',
    category: '哲学思维',
    featured: true,
    publishedAt: '2024-01-15T00:00:00.000Z',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['哲学思维', '人生指导', '思维模式', '决策智慧', '实用哲学'],
    transcript: `在这个快节奏的现代社会中，我们经常被各种信息和选择所困扰。哲学思维为我们提供了一个强大的工具，帮助我们在复杂的世界中找到方向...`,
    relatedVideos: ['business-philosophy-success-video', 'critical-thinking-practice']
  },
  {
    id: 'business-philosophy-success-video',
    title: '商业成功背后的哲学智慧',
    description: '成功企业家必备的哲学思维模式，如何将古老智慧转化为现代商业优势。探索商业伦理、长期主义思维和价值创造的深层逻辑。',
    thumbnail: 'https://img.youtube.com/vi/business-philosophy-success-video/maxresdefault.jpg',
    duration: '18:45',
    views: '8.3万',
    category: '商业智慧',
    featured: true,
    publishedAt: '2024-01-10T00:00:00.000Z',
    youtubeUrl: 'https://www.youtube.com/watch?v=business-philosophy-success-video',
    embedUrl: 'https://www.youtube.com/embed/business-philosophy-success-video',
    tags: ['商业哲学', '企业家思维', '商业伦理', '长期主义', '价值创造'],
    transcript: `商业成功不仅仅是技巧和策略的问题，更重要的是背后的哲学思维。真正成功的企业家都有着深刻的哲学基础...`,
    relatedVideos: ['dQw4w9WgXcQ', 'leadership-philosophy-guide']
  },
  {
    id: 'education-philosophy-future',
    title: '现代教育的哲学反思与未来展望',
    description: '重新审视教育的本质和目标，探讨如何培养具有独立思考能力的下一代。从传统教育模式的局限到未来教育的可能性。',
    thumbnail: 'https://img.youtube.com/vi/education-philosophy-future/maxresdefault.jpg',
    duration: '22:18',
    views: '15.7万',
    category: '教育理念',
    featured: true,
    publishedAt: '2024-01-05T00:00:00.000Z',
    youtubeUrl: 'https://www.youtube.com/watch?v=education-philosophy-future',
    embedUrl: 'https://www.youtube.com/embed/education-philosophy-future',
    tags: ['教育哲学', '独立思考', '教育改革', '未来教育', '批判教育'],
    transcript: `教育的目的是什么？是传授知识，还是培养能力？是适应社会，还是改变世界？这些根本性的问题需要我们从哲学的角度来思考...`,
    relatedVideos: ['critical-thinking-practice', 'dQw4w9WgXcQ']
  },
  {
    id: 'life-balance-wisdom',
    title: '人生平衡的智慧：在忙碌中寻找内心的宁静',
    description: '现代人如何在工作压力和生活责任之间找到平衡？古老的哲学智慧为我们提供了答案。学会在动态中寻找和谐。',
    thumbnail: 'https://img.youtube.com/vi/life-balance-wisdom/maxresdefault.jpg',
    duration: '16:28',
    views: '11.2万',
    category: '人生哲学',
    featured: false,
    publishedAt: '2024-01-02T00:00:00.000Z',
    youtubeUrl: 'https://www.youtube.com/watch?v=life-balance-wisdom',
    embedUrl: 'https://www.youtube.com/embed/life-balance-wisdom',
    tags: ['生活平衡', '内心平静', '压力管理', '人生智慧', '现代生活'],
    transcript: `平衡不是静止的状态，而是动态的过程。在这个快节奏的时代，我们需要重新理解什么是真正的平衡...`,
    relatedVideos: ['stress-management-guide', 'mindfulness-practice-video']
  },
  {
    id: 'critical-thinking-practice',
    title: '批判性思维实战：如何在信息时代保持理性',
    description: '在信息爆炸的时代，如何分辨真伪、避免被误导？批判性思维的实用技巧和日常练习方法。',
    thumbnail: 'https://img.youtube.com/vi/critical-thinking-practice/maxresdefault.jpg',
    duration: '19:15',
    views: '9.8万',
    category: '哲学思维',
    featured: false,
    publishedAt: '2023-12-28T00:00:00.000Z',
    youtubeUrl: 'https://www.youtube.com/watch?v=critical-thinking-practice',
    embedUrl: 'https://www.youtube.com/embed/critical-thinking-practice',
    tags: ['批判思维', '信息素养', '理性分析', '逻辑思考', '媒体素养'],
    transcript: `批判性思维不是批评一切，而是理性地分析和评估信息。在这个信息时代，这是我们最需要的技能之一...`,
    relatedVideos: ['dQw4w9WgXcQ', 'logical-reasoning-guide']
  },
  {
    id: 'leadership-philosophy-guide',
    title: '领导力的哲学基础：从管理者到领导者的转变',
    description: '真正的领导力不是权力，而是影响力。探索领导力的哲学基础，学习如何成为有智慧的领导者。',
    thumbnail: 'https://img.youtube.com/vi/leadership-philosophy-guide/maxresdefault.jpg',
    duration: '20:42',
    views: '7.6万',
    category: '商业智慧',
    featured: false,
    publishedAt: '2023-12-25T00:00:00.000Z',
    youtubeUrl: 'https://www.youtube.com/watch?v=leadership-philosophy-guide',
    embedUrl: 'https://www.youtube.com/embed/leadership-philosophy-guide',
    tags: ['领导力', '管理哲学', '影响力', '团队管理', '领导智慧'],
    transcript: `领导力的本质是什么？是权力的行使，还是影响力的发挥？真正的领导者需要具备怎样的哲学素养？...`,
    relatedVideos: ['business-philosophy-success-video', 'team-management-wisdom']
  }
];

export const channelStats: ChannelStats = {
  subscribers: '10.2万',
  totalViews: '500万+',
  videosCount: '120+',
  avgWatchTime: '12分钟',
  lastUpdated: '2024-01-15T00:00:00.000Z'
};

// 工具函数：根据ID获取视频
export function getVideoById(id: string): Video | undefined {
  return videos.find(video => video.id === id);
}

// 工具函数：根据分类获取视频
export function getVideosByCategory(category: string): Video[] {
  return videos.filter(video => video.category === category);
}

// 工具函数：获取精选视频
export function getFeaturedVideos(): Video[] {
  return videos.filter(video => video.featured);
}

// 工具函数：获取最新视频
export function getLatestVideos(limit: number = 10): Video[] {
  return videos
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

// 工具函数：搜索视频
export function searchVideos(query: string): Video[] {
  const lowercaseQuery = query.toLowerCase();
  return videos.filter(video => 
    video.title.toLowerCase().includes(lowercaseQuery) ||
    video.description.toLowerCase().includes(lowercaseQuery) ||
    video.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

// 工具函数：获取相关视频
export function getRelatedVideos(currentVideo: Video, limit: number = 3): Video[] {
  return videos
    .filter(video => 
      video.id !== currentVideo.id && 
      (video.category === currentVideo.category || 
       video.tags.some(tag => currentVideo.tags.includes(tag)))
    )
    .slice(0, limit);
}

// 工具函数：获取视频统计
export function getVideoStats() {
  const total = videos.length;
  const featured = videos.filter(v => v.featured).length;
  
  const totalViewsNum = videos.reduce((sum, video) => {
    const viewStr = video.views.replace(/[万千]/g, '');
    const num = parseFloat(viewStr);
    if (video.views.includes('万')) {
      return sum + num * 10000;
    }
    return sum + num;
  }, 0);

  const byCategory = videos.reduce((acc, video) => {
    acc[video.category] = (acc[video.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total,
    featured,
    totalViews: totalViewsNum,
    byCategory
  };
}

// 工具函数：格式化观看次数
export function formatViews(views: string): number {
  const num = parseFloat(views.replace(/[万千]/g, ''));
  if (views.includes('万')) {
    return num * 10000;
  }
  if (views.includes('千')) {
    return num * 1000;
  }
  return num;
}

// 工具函数：生成YouTube相关URL
export function generateYouTubeUrls(videoId: string) {
  return {
    watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    thumbnailUrl: getYouTubeThumbnail(videoId),
    channelUrl: 'https://www.youtube.com/@guochunlinthink'
  };
}

// 导出默认视频数据
export default videos;