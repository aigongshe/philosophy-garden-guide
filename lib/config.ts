import { SiteConfig } from './types';

export const siteConfig: SiteConfig = {
  name: '哲学的花园导游',
  description: '跟随郭春林探索人生智慧，在哲学思维的花园中寻找商业成功与内心平静的平衡之道',
  url: 'https://philosophy-garden-guide.vercel.app',
  author: {
    name: '郭春林',
    bio: '郭春林，哲学思维的践行者，商业智慧的分享者。致力于将深邃的哲学思考转化为实用的人生指导，帮助企业家和职场人士在复杂的现代社会中找到内心的平静与事业的成功。通过YouTube频道分享人生感悟、商业哲学和教育理念，引导更多人走向智慧人生。',
    avatar: '/images/guochunlin-avatar.jpg',
    social: {
      youtube: 'https://www.youtube.com/@guochunlinthink',
      email: 'contact@philosophy-garden.com',
    },
  },
  seo: {
    keywords: [
      '郭春林',
      '哲学思维',
      '商业智慧',
      '人生哲学',
      '教育理念',
      '企业管理',
      '个人成长',
      '智慧人生',
      'YouTube',
      '哲学的花园导游'
    ],
    defaultImage: '/images/og-default.jpg',
  },
};