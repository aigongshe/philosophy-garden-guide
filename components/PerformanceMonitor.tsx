'use client';

import { useEffect } from 'react';

interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // 只在生产环境中运行性能监控
    if (process.env.NODE_ENV !== 'production') return;

    const metrics: PerformanceMetrics = {};

    // 监控 Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'largest-contentful-paint':
            metrics.lcp = entry.startTime;
            break;
          case 'first-input':
            metrics.fid = (entry as any).processingStart - entry.startTime;
            break;
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              metrics.cls = (metrics.cls || 0) + (entry as any).value;
            }
            break;
        }
      }
    });

    // 观察性能指标
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (e) {
      // 某些浏览器可能不支持所有指标
      console.warn('Performance monitoring not fully supported:', e);
    }

    // 监控导航性能
    const navigationObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const navEntry = entry as PerformanceNavigationTiming;
        metrics.fcp = navEntry.responseStart - navEntry.fetchStart;
        metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
      }
    });

    try {
      navigationObserver.observe({ entryTypes: ['navigation'] });
    } catch (e) {
      console.warn('Navigation timing not supported:', e);
    }

    // 页面卸载时发送性能数据
    const sendMetrics = () => {
      // 这里可以发送到分析服务，如 Google Analytics 或自定义端点
      if (typeof window !== 'undefined' && window.gtag) {
        // Google Analytics 4 示例
        if (metrics.lcp) {
          window.gtag('event', 'web_vitals', {
            name: 'LCP',
            value: Math.round(metrics.lcp),
            event_category: 'Web Vitals',
          });
        }
        if (metrics.fid) {
          window.gtag('event', 'web_vitals', {
            name: 'FID',
            value: Math.round(metrics.fid),
            event_category: 'Web Vitals',
          });
        }
        if (metrics.cls) {
          window.gtag('event', 'web_vitals', {
            name: 'CLS',
            value: Math.round(metrics.cls * 1000),
            event_category: 'Web Vitals',
          });
        }
      }

      // 控制台输出（开发时查看）
      console.log('Performance Metrics:', {
        LCP: metrics.lcp ? `${Math.round(metrics.lcp)}ms` : 'N/A',
        FID: metrics.fid ? `${Math.round(metrics.fid)}ms` : 'N/A',
        CLS: metrics.cls ? Math.round(metrics.cls * 1000) / 1000 : 'N/A',
        FCP: metrics.fcp ? `${Math.round(metrics.fcp)}ms` : 'N/A',
        TTFB: metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : 'N/A',
      });
    };

    // 页面可见性变化时发送数据
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendMetrics();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 页面卸载时发送数据
    window.addEventListener('beforeunload', sendMetrics);

    // 清理函数
    return () => {
      observer.disconnect();
      navigationObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', sendMetrics);
    };
  }, []);

  return null; // 这个组件不渲染任何内容
}

// 扩展 Window 接口以支持 gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}