/**
 * 🚀 Core Web Vitals 性能测试工具
 * 用于测试和监控网站的核心性能指标
 */

// Core Web Vitals 测试器
class CoreWebVitalsTest {
    constructor() {
        this.metrics = {
            LCP: null,  // Largest Contentful Paint
            FID: null,  // First Input Delay
            CLS: null,  // Cumulative Layout Shift
            FCP: null,  // First Contentful Paint
            TTFB: null, // Time to First Byte
            INP: null   // Interaction to Next Paint
        };
        this.thresholds = {
            LCP: { good: 2500, poor: 4000 },
            FID: { good: 100, poor: 300 },
            CLS: { good: 0.1, poor: 0.25 },
            FCP: { good: 1800, poor: 3000 },
            TTFB: { good: 800, poor: 1800 },
            INP: { good: 200, poor: 500 }
        };
        this.observations = [];
    }

    // 初始化性能监控
    init() {
        console.log('🚀 初始化Core Web Vitals监控...');
        
        // 检查浏览器支持
        if (!this.checkBrowserSupport()) {
            console.warn('⚠️ 浏览器不完全支持所有性能API');
        }

        this.measureLCP();
        this.measureFID();
        this.measureCLS();
        this.measureFCP();
        this.measureTTFB();
        this.measureINP();
        
        // 5秒后生成报告
        setTimeout(() => {
            this.generateReport();
        }, 5000);
    }

    // 检查浏览器支持
    checkBrowserSupport() {
        const requiredAPIs = [
            'PerformanceObserver',
            'PerformanceNavigationTiming',
            'PerformancePaintTiming'
        ];
        
        return requiredAPIs.every(api => api in window);
    }

    // 测量 Largest Contentful Paint (LCP)
    measureLCP() {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                
                this.metrics.LCP = Math.round(lastEntry.startTime);
                this.observations.push({
                    metric: 'LCP',
                    value: this.metrics.LCP,
                    element: lastEntry.element?.tagName || 'unknown',
                    timestamp: Date.now()
                });
                
                console.log(`📊 LCP: ${this.metrics.LCP}ms`);
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (error) {
            console.warn('⚠️ LCP测量失败:', error.message);
        }
    }

    // 测量 First Input Delay (FID)
    measureFID() {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    this.metrics.FID = Math.round(entry.processingStart - entry.startTime);
                    this.observations.push({
                        metric: 'FID',
                        value: this.metrics.FID,
                        eventType: entry.name,
                        timestamp: Date.now()
                    });
                    
                    console.log(`📊 FID: ${this.metrics.FID}ms`);
                });
            });
            
            observer.observe({ entryTypes: ['first-input'] });
        } catch (error) {
            console.warn('⚠️ FID测量失败:', error.message);
        }
    }

    // 测量 Cumulative Layout Shift (CLS)
    measureCLS() {
        try {
            let clsValue = 0;
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                
                this.metrics.CLS = Math.round(clsValue * 1000) / 1000;
                this.observations.push({
                    metric: 'CLS',
                    value: this.metrics.CLS,
                    timestamp: Date.now()
                });
                
                console.log(`📊 CLS: ${this.metrics.CLS}`);
            });
            
            observer.observe({ entryTypes: ['layout-shift'] });
        } catch (error) {
            console.warn('⚠️ CLS测量失败:', error.message);
        }
    }

    // 测量 First Contentful Paint (FCP)
    measureFCP() {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    if (entry.name === 'first-contentful-paint') {
                        this.metrics.FCP = Math.round(entry.startTime);
                        this.observations.push({
                            metric: 'FCP',
                            value: this.metrics.FCP,
                            timestamp: Date.now()
                        });
                        
                        console.log(`📊 FCP: ${this.metrics.FCP}ms`);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['paint'] });
        } catch (error) {
            console.warn('⚠️ FCP测量失败:', error.message);
        }
    }

    // 测量 Time to First Byte (TTFB)
    measureTTFB() {
        try {
            const navigation = performance.getEntriesByType('navigation')[0];
            if (navigation) {
                this.metrics.TTFB = Math.round(navigation.responseStart - navigation.requestStart);
                this.observations.push({
                    metric: 'TTFB',
                    value: this.metrics.TTFB,
                    timestamp: Date.now()
                });
                
                console.log(`📊 TTFB: ${this.metrics.TTFB}ms`);
            }
        } catch (error) {
            console.warn('⚠️ TTFB测量失败:', error.message);
        }
    }

    // 测量 Interaction to Next Paint (INP)
    measureINP() {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    const inp = entry.processingEnd - entry.startTime;
                    if (!this.metrics.INP || inp > this.metrics.INP) {
                        this.metrics.INP = Math.round(inp);
                        this.observations.push({
                            metric: 'INP',
                            value: this.metrics.INP,
                            eventType: entry.name,
                            timestamp: Date.now()
                        });
                        
                        console.log(`📊 INP: ${this.metrics.INP}ms`);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['event'] });
        } catch (error) {
            console.warn('⚠️ INP测量失败:', error.message);
        }
    }

    // 评估指标等级
    evaluateMetric(metric, value) {
        if (value === null || value === undefined) {
            return 'unknown';
        }
        
        const threshold = this.thresholds[metric];
        if (!threshold) return 'unknown';
        
        if (value <= threshold.good) return 'good';
        if (value <= threshold.poor) return 'needs-improvement';
        return 'poor';
    }

    // 生成性能报告
    generateReport() {
        console.log('\n📊 Core Web Vitals 性能报告');
        console.log('='.repeat(50));
        
        const report = {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            metrics: {},
            score: 0,
            recommendations: []
        };

        let totalScore = 0;
        let validMetrics = 0;

        // 分析每个指标
        Object.keys(this.metrics).forEach(metric => {
            const value = this.metrics[metric];
            const evaluation = this.evaluateMetric(metric, value);
            
            report.metrics[metric] = {
                value,
                evaluation,
                threshold: this.thresholds[metric]
            };

            // 计算分数
            if (value !== null) {
                validMetrics++;
                switch (evaluation) {
                    case 'good': totalScore += 100; break;
                    case 'needs-improvement': totalScore += 50; break;
                    case 'poor': totalScore += 0; break;
                }
            }

            // 显示结果
            const status = this.getStatusIcon(evaluation);
            console.log(`${status} ${metric}: ${value || 'N/A'}${this.getUnit(metric)} (${evaluation})`);
        });

        // 计算总分
        report.score = validMetrics > 0 ? Math.round(totalScore / validMetrics) : 0;

        // 生成建议
        this.generateRecommendations(report);

        // 显示总分和建议
        console.log(`\n🎯 总体评分: ${report.score}/100`);
        console.log('\n💡 优化建议:');
        report.recommendations.forEach((rec, index) => {
            console.log(`${index + 1}. ${rec}`);
        });

        // 显示有用链接
        console.log('\n🔗 有用工具:');
        console.log('- PageSpeed Insights: https://pagespeed.web.dev/');
        console.log('- Lighthouse: Chrome DevTools > Lighthouse');
        console.log('- Web Vitals Extension: Chrome Web Store');
        console.log('- Search Console Core Web Vitals: https://search.google.com/search-console/');

        return report;
    }

    // 生成优化建议
    generateRecommendations(report) {
        const { metrics } = report;

        // LCP优化建议
        if (metrics.LCP?.evaluation === 'poor') {
            report.recommendations.push('🖼️ 优化LCP: 压缩图片、使用WebP格式、预加载关键资源');
        }

        // FID优化建议
        if (metrics.FID?.evaluation === 'poor') {
            report.recommendations.push('⚡ 优化FID: 减少JavaScript执行时间、使用Web Workers');
        }

        // CLS优化建议
        if (metrics.CLS?.evaluation === 'poor') {
            report.recommendations.push('📐 优化CLS: 为图片和广告设置尺寸、避免动态插入内容');
        }

        // FCP优化建议
        if (metrics.FCP?.evaluation === 'poor') {
            report.recommendations.push('🎨 优化FCP: 内联关键CSS、减少渲染阻塞资源');
        }

        // TTFB优化建议
        if (metrics.TTFB?.evaluation === 'poor') {
            report.recommendations.push('🌐 优化TTFB: 使用CDN、优化服务器响应时间、启用缓存');
        }

        // INP优化建议
        if (metrics.INP?.evaluation === 'poor') {
            report.recommendations.push('🖱️ 优化INP: 优化事件处理器、减少主线程阻塞');
        }

        // 通用建议
        if (report.score < 80) {
            report.recommendations.push('🔧 使用Lighthouse进行详细性能分析');
            report.recommendations.push('📊 定期监控Core Web Vitals指标');
            report.recommendations.push('🚀 考虑使用性能预算和持续监控');
        }
    }

    // 获取状态图标
    getStatusIcon(evaluation) {
        switch (evaluation) {
            case 'good': return '✅';
            case 'needs-improvement': return '⚠️';
            case 'poor': return '❌';
            default: return '❓';
        }
    }

    // 获取单位
    getUnit(metric) {
        return ['LCP', 'FID', 'FCP', 'TTFB', 'INP'].includes(metric) ? 'ms' : '';
    }

    // 开始实时监控
    startRealTimeMonitoring() {
        console.log('🔄 开始实时监控...');
        
        setInterval(() => {
            const currentMetrics = { ...this.metrics };
            console.log('📊 当前指标:', currentMetrics);
        }, 10000); // 每10秒输出一次
    }
}

// 主要测试函数
function runCoreWebVitalsTest() {
    console.log('🚀 启动Core Web Vitals测试...');
    
    const tester = new CoreWebVitalsTest();
    tester.init();
    
    return tester;
}

// 导出（Node.js环境）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CoreWebVitalsTest,
        runCoreWebVitalsTest
    };
}

// 浏览器环境自动运行
if (typeof window !== 'undefined') {
    // 等待页面加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(runCoreWebVitalsTest, 2000);
        });
    } else {
        setTimeout(runCoreWebVitalsTest, 2000);
    }
}

/**
 * 使用说明:
 * 
 * 1. 在浏览器中运行:
 *    - 访问 https://www.guochunlin.com/
 *    - 打开开发者工具 (F12)
 *    - 在控制台中粘贴此脚本
 *    - 等待5秒查看完整报告
 * 
 * 2. 手动启动测试:
 *    const tester = runCoreWebVitalsTest();
 * 
 * 3. 实时监控:
 *    tester.startRealTimeMonitoring();
 * 
 * 4. 获取当前指标:
 *    console.log(tester.metrics);
 */