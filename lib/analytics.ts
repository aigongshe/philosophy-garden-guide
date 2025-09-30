// Google Analytics 4 配置
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// 页面浏览事件
export const pageview = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_TRACKING_ID, {
            page_path: url,
        });
    }
};

// 自定义事件
export const event = ({
    action,
    category,
    label,
    value,
}: {
    action: string;
    category: string;
    label?: string;
    value?: number;
}) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

// Core Web Vitals 监控
export const reportWebVitals = ({ id, name, value }: any) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', name, {
            event_category: 'Web Vitals',
            event_label: id,
            value: Math.round(name === 'CLS' ? value * 1000 : value),
            non_interaction: true,
        });
    }
};

// 错误追踪
export const reportError = (error: Error, errorInfo?: any) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exception', {
            description: error.message,
            fatal: false,
            error_info: errorInfo,
        });
    }
};

// 用户交互事件
export const trackUserInteraction = (element: string, action: string) => {
    event({
        action: action,
        category: 'User Interaction',
        label: element,
    });
};

// 文章阅读事件
export const trackArticleRead = (articleTitle: string, readingTime: number) => {
    event({
        action: 'article_read',
        category: 'Content',
        label: articleTitle,
        value: readingTime,
    });
};

// 搜索事件
export const trackSearch = (searchTerm: string, resultsCount: number) => {
    event({
        action: 'search',
        category: 'Site Search',
        label: searchTerm,
        value: resultsCount,
    });
};

// 社交分享事件
export const trackSocialShare = (platform: string, url: string) => {
    event({
        action: 'share',
        category: 'Social',
        label: `${platform}: ${url}`,
    });
};