'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// Google Analytics 4 配置
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// 页面浏览事件
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      custom_map: {
        custom_parameter_1: 'author',
        custom_parameter_2: 'category',
        custom_parameter_3: 'reading_time'
      }
    });
  }
};

// 自定义事件追踪
export const trackEvent = ({
  action,
  category,
  label,
  value,
  custom_parameters = {}
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...custom_parameters
    });
  }
};

// 郭春林专属事件追踪
export const trackPhilosophyEvent = ({
  event_type,
  content_type,
  author = '郭春林',
  category,
  article_title,
  reading_progress
}: {
  event_type: 'article_view' | 'article_read' | 'video_click' | 'category_browse' | 'search' | 'contact';
  content_type: 'philosophy' | 'business' | 'life' | 'education' | 'relationship' | 'growth';
  author?: string;
  category?: string;
  article_title?: string;
  reading_progress?: number;
}) => {
  trackEvent({
    action: event_type,
    category: 'Philosophy_Content',
    label: `${author}_${content_type}`,
    value: reading_progress,
    custom_parameters: {
      author: author,
      content_category: category,
      article_title: article_title,
      philosopher: '郭春林',
      site_section: 'philosophy_garden'
    }
  });
};

// YouTube视频点击追踪
export const trackYouTubeClick = (videoTitle: string, videoId: string) => {
  trackEvent({
    action: 'youtube_click',
    category: 'Video_Engagement',
    label: videoTitle,
    custom_parameters: {
      video_id: videoId,
      author: '郭春林',
      platform: 'youtube',
      content_type: 'philosophy_video'
    }
  });
};

// 搜索事件追踪
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  trackEvent({
    action: 'site_search',
    category: 'Search',
    label: searchTerm,
    value: resultsCount,
    custom_parameters: {
      search_term: searchTerm,
      results_count: resultsCount,
      site_section: 'philosophy_garden'
    }
  });
};

// 转化事件追踪
export const trackConversion = (conversionType: 'email_signup' | 'youtube_subscribe' | 'article_share' | 'contact_form') => {
  trackEvent({
    action: 'conversion',
    category: 'Conversions',
    label: conversionType,
    value: 1,
    custom_parameters: {
      conversion_type: conversionType,
      author: '郭春林',
      timestamp: new Date().toISOString()
    }
  });
};

// Core Web Vitals 追踪
export const trackWebVitals = ({ id, name, value }: { id: string; name: string; value: number }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      non_interaction: true,
      custom_parameters: {
        metric_name: name,
        metric_value: value,
        page_type: 'philosophy_content'
      }
    });
  }
};

// 阅读进度追踪
export const trackReadingProgress = (articleTitle: string, progress: number) => {
  const milestones = [25, 50, 75, 100];
  const milestone = milestones.find(m => progress >= m && progress < m + 5);
  
  if (milestone) {
    trackPhilosophyEvent({
      event_type: 'article_read',
      content_type: 'philosophy',
      article_title: articleTitle,
      reading_progress: milestone
    });
  }
};

// 页面路由追踪Hook
export function useGoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (GA_MEASUREMENT_ID) {
      const url = pathname + searchParams.toString();
      pageview(url);
    }
  }, [pathname, searchParams]);
}

// Google Analytics 组件
export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              custom_map: {
                'custom_parameter_1': 'author',
                'custom_parameter_2': 'category',
                'custom_parameter_3': 'reading_time'
              },
              // 增强型电商跟踪
              enhanced_conversions: true,
              // 自动事件追踪
              send_page_view: true,
              // 自定义维度
              custom_parameter_1: '郭春林',
              custom_parameter_2: '哲学思维',
              custom_parameter_3: 'philosophy_garden'
            });
            
            // 自动追踪外链点击
            gtag('config', '${GA_MEASUREMENT_ID}', {
              link_attribution: true,
              enhanced_link_attribution: true
            });
            
            // 自动追踪文件下载
            gtag('config', '${GA_MEASUREMENT_ID}', {
              file_downloads: true
            });
          `,
        }}
      />
    </>
  );
}

// TypeScript 类型声明
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}
