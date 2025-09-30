// 统一视频数据管理
import { Video, ChannelStats } from '@/lib/types/content';
import { extractYouTubeId, getYouTubeThumbnail, getYouTubeEmbedUrl } from '@/lib/utils/validation';

export const videos: Video[] = [
  {
    id: 'nZDI_VzSEeg',
    title: 'AI时代，你真的会提问吗？提升问题意识告别焦虑',
    description: '深入探讨"问题意识"的五个构建维度，强调在人工智能与ChatGPT时代，提出高质量问题能力的重要性。从"疑问"、"设问"到"提问"的三个层次，掌握与AI有效互动的核心技能。',
    thumbnail: 'https://img.youtube.com/vi/nZDI_VzSEeg/maxresdefault.jpg',
    duration: '25:30',
    views: '18.5万',
    category: '哲学思维',
    featured: true,
    publishedAt: '2024-01-15T00:00:00.000Z',
    youtubeUrl: 'https://www.youtube.com/watch?v=nZDI_VzSEeg',
    embedUrl: 'https://www.youtube.com/embed/nZDI_VzSEeg',
    tags: ['AI提问', '问题意识', '提问技巧', '告别焦虑', '人工智能', 'ChatGPT', '核心能力', '批判思维'],
    transcript: `AI时代，提出好问题的能力成为人区别于AI的关键。问题意识可分为三种心理状态：疑问、设问和提问。"疑问"是问题形成前的模糊感觉，"设问"是批判性思维的开端，"提问"则是与AI交互的重要方式...`,
    relatedVideos: ['qC9GOGUhYy4', 'wFZMHiC6TGk']
  },
  {
    id: 'qC9GOGUhYy4',
    title: '如何战胜无力感？根源竟是自我设限',
    description: '深度解析"战胜无力感"的核心议题，探讨个体在面对环境压力时产生无力感的原因。从哲学和心理学角度，剖析生活、心灵、实践三个层面的自我设限如何导致困境。',
    thumbnail: 'https://img.youtube.com/vi/qC9GOGUhYy4/maxresdefault.jpg',
    duration: '22:15',
    views: '15.2万',
    category: '人生哲学',
    featured: true,
    publishedAt: '2024-01-10T00:00:00.000Z',
    youtubeUrl: 'https://www.youtube.com/watch?v=qC9GOGUhYy4',
    embedUrl: 'https://www.youtube.com/embed/qC9GOGUhYy4',
    tags: ['无力感', '自我设限', '克服无力', '摆脱内耗', '内在力量', '情绪管理', '自我成长'],
    transcript: `无力感源于人与环境的对抗，特别是"自我风险"或"自我设限"。生活本质上是人与环境的斗争，正如《易经》所言"君子自强不息"。无力感的根源在于生命、心灵、实践三个层面的自我设限...`,
    relatedVideos: ['nZDI_VzSEeg', 'wFZMHiC6TGk']
  },
  {
    id: 'wFZMHiC6TGk',
    title: '思维模式升级：解决90%人生烦恼的秘密',
    description: '深入探讨升级思维模式对于解决生活困境和烦恼的核心作用，提出从感性思维到因果思维、辩证思维、最终到系统思维的进阶路径。重点解析感性思维与因果思维的特点、区别及常见认识误区。',
    thumbnail: 'https://img.youtube.com/vi/wFZMHiC6TGk/maxresdefault.jpg',
    duration: '28:45',
    views: '21.8万',
    category: '哲学思维',
    featured: true,
    publishedAt: '2024-01-05T00:00:00.000Z',
    youtubeUrl: 'https://www.youtube.com/watch?v=wFZMHiC6TGk',
    embedUrl: 'https://www.youtube.com/embed/wFZMHiC6TGk',
    tags: ['思维升级', '解决烦恼', '提升认知', '系统思维', '思维模式', '认知升级', '哲学智慧'],
    transcript: `许多烦恼和问题源于我们固有的思维模式。升级思维模式，能解决生活中绝大部分困扰。思维升级路径：感性思维→因果思维→辩证思维→系统思维。理解因果性是把握事物连续时间中变化必然性的关键...`,
    relatedVideos: ['nZDI_VzSEeg', '_8nxMNuaLVU']
  },
  {
    id: '_8nxMNuaLVU',
    title: '深度思考的6个循环：从控制情感到定义问题',
    description: '详细拆解深度思考的六个核心循环，从思考的起点"问题"出发，引导观众掌握如何控制情感、唤醒觉知、多元设问、定义问题、创造路径并进行批判性选择。',
    thumbnail: 'https://img.youtube.com/vi/_8nxMNuaLVU/maxresdefault.jpg',
    duration: '32:20',
    views: '13.7万',
    category: '哲学思维',
    featured: false,
    publishedAt: '2024-01-02T00:00:00.000Z',
    youtubeUrl: 'https://www.youtube.com/watch?v=_8nxMNuaLVU',
    embedUrl: 'https://www.youtube.com/embed/_8nxMNuaLVU',
    tags: ['深度思考', '思考方法', '提升思考', '思考力', '解决问题', '问题本质', '定义问题'],
    transcript: `深度思考的六个循环：控制情感→唤醒觉知→多元设问→定义问题→路径创造→批判选择。思考始于具体问题，具有明确的目的性。成功管理情绪后，才能唤醒内在觉知，使大脑主动调动起来...`,
    relatedVideos: ['wFZMHiC6TGk', 'nZDI_VzSEeg']
  }
];

export const channelStats: ChannelStats = {
  subscribers: '12.8万',
  totalViews: '680万+',
  videosCount: '150+',
  avgWatchTime: '18分钟',
  lastUpdated: '2024-01-15T00:00:00.000Z'
};

// 工具函数：获取所有视频
export function getAll(): Video[] {
  return videos;
}

// 工具函数：获取频道统计
export function getChannelStats(): ChannelStats {
  return channelStats;
}

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