/**
 * 📊 SEO监控仪表板测试工具
 * 用于验证SEO仪表板功能和数据准确性
 */

// SEO仪表板测试器
class SEODashboardTester {
    constructor() {
        this.baseUrl = 'https://www.guochunlin.com';
        this.testResults = [];
        this.performanceMetrics = {};
    }

    // 测试仪表板页面可访问性
    async testDashboardAccessibility() {
        console.log('🔍 测试SEO仪表板页面可访问性...');
        
        try {
            const startTime = Date.now();
            const response = await fetch(`${this.baseUrl}/seo-dashboard`);
            const loadTime = Date.now() - startTime;
            
            if (response.ok) {
                const html = await response.text();
                
                this.testResults.push({
                    test: 'Dashboard页面可访问性',
                    status: 'passed',
                    details: `HTTP ${response.status}, 加载时间: ${loadTime}ms`,
                    loadTime
                });
                
                console.log(`✅ SEO仪表板页面正常访问 (${loadTime}ms)`);
                
                // 检查页面内容
                await this.analyzeDashboardContent(html);
                
            } else {
                this.testResults.push({
                    test: 'Dashboard页面可访问性',
                    status: 'failed',
                    details: `HTTP ${response.status}: ${response.statusText}`
                });
                console.log(`❌ SEO仪表板访问失败: ${response.status}`);
            }
            
        } catch (error) {
            this.testResults.push({
                test: 'Dashboard页面可访问性',
                status: 'error',
                details: error.message
            });
            console.error('❌ 仪表板访问测试失败:', error);
        }
    }

    // 分析仪表板页面内容
    async analyzeDashboardContent(html) {
        console.log('📋 分析仪表板页面内容...');
        
        const contentChecks = [
            {
                name: 'SEO评分显示',
                pattern: /SEO.*评分|score/i,
                required: true
            },
            {
                name: '关键词监控',
                pattern: /关键词|keyword/i,
                required: true
            },
            {
                name: '优化建议',
                pattern: /建议|recommendation|优化/i,
                required: true
            },
            {
                name: '性能指标',
                pattern: /性能|performance|web.*vitals/i,
                required: false
            },
            {
                name: '索引状态',
                pattern: /索引|index|sitemap/i,
                required: false
            }
        ];

        contentChecks.forEach(check => {
            const found = check.pattern.test(html);
            
            this.testResults.push({
                test: `Dashboard内容 - ${check.name}`,
                status: found ? 'passed' : (check.required ? 'failed' : 'warning'),
                details: found ? '内容已找到' : '内容未找到'
            });
            
            const icon = found ? '✅' : (check.required ? '❌' : '⚠️');
            console.log(`${icon} ${check.name}: ${found ? '已找到' : '未找到'}`);
        });
    }

    // 测试关键词分析器
    async testKeywordAnalyzer() {
        console.log('🔧 测试关键词分析器...');
        
        try {
            const startTime = Date.now();
            const response = await fetch(`${this.baseUrl}/keyword-analyzer`);
            const loadTime = Date.now() - startTime;
            
            if (response.ok) {
                const html = await response.text();
                
                this.testResults.push({
                    test: '关键词分析器可访问性',
                    status: 'passed',
                    details: `HTTP ${response.status}, 加载时间: ${loadTime}ms`,
                    loadTime
                });
                
                console.log(`✅ 关键词分析器正常访问 (${loadTime}ms)`);
                
                // 检查分析器功能
                await this.analyzeKeywordAnalyzerContent(html);
                
            } else {
                this.testResults.push({
                    test: '关键词分析器可访问性',
                    status: 'failed',
                    details: `HTTP ${response.status}: ${response.statusText}`
                });
                console.log(`❌ 关键词分析器访问失败: ${response.status}`);
            }
            
        } catch (error) {
            this.testResults.push({
                test: '关键词分析器可访问性',
                status: 'error',
                details: error.message
            });
            console.error('❌ 关键词分析器测试失败:', error);
        }
    }

    // 分析关键词分析器内容
    async analyzeKeywordAnalyzerContent(html) {
        console.log('🔍 分析关键词分析器功能...');
        
        const analyzerChecks = [
            {
                name: '文本输入区域',
                pattern: /textarea|input.*text/i,
                required: true
            },
            {
                name: '关键词密度分析',
                pattern: /密度|density/i,
                required: true
            },
            {
                name: '郭春林关键词检查',
                pattern: /郭春林/,
                required: true
            },
            {
                name: '优化建议生成',
                pattern: /建议|suggestion|recommendation/i,
                required: true
            },
            {
                name: '分析结果显示',
                pattern: /结果|result|分析/i,
                required: true
            }
        ];

        analyzerChecks.forEach(check => {
            const found = check.pattern.test(html);
            
            this.testResults.push({
                test: `关键词分析器 - ${check.name}`,
                status: found ? 'passed' : (check.required ? 'failed' : 'warning'),
                details: found ? '功能已找到' : '功能未找到'
            });
            
            const icon = found ? '✅' : (check.required ? '❌' : '⚠️');
            console.log(`${icon} ${check.name}: ${found ? '已找到' : '未找到'}`);
        });
    }

    // 测试SEO检查清单功能
    async testSEOChecklist() {
        console.log('📝 测试SEO检查清单功能...');
        
        // 模拟SEO检查清单测试
        const seoChecks = [
            {
                name: 'Meta标题检查',
                test: () => this.checkMetaTags(),
                weight: 10
            },
            {
                name: 'Meta描述检查',
                test: () => this.checkMetaDescription(),
                weight: 10
            },
            {
                name: '结构化数据检查',
                test: () => this.checkStructuredData(),
                weight: 15
            },
            {
                name: 'Sitemap检查',
                test: () => this.checkSitemap(),
                weight: 10
            },
            {
                name: 'Robots.txt检查',
                test: () => this.checkRobotsTxt(),
                weight: 5
            },
            {
                name: '页面性能检查',
                test: () => this.checkPagePerformance(),
                weight: 20
            },
            {
                name: '移动友好性检查',
                test: () => this.checkMobileFriendliness(),
                weight: 15
            },
            {
                name: '关键词优化检查',
                test: () => this.checkKeywordOptimization(),
                weight: 15
            }
        ];

        let totalScore = 0;
        let totalWeight = 0;

        for (const check of seoChecks) {
            try {
                const result = await check.test();
                const score = result.passed ? check.weight : 0;
                totalScore += score;
                totalWeight += check.weight;
                
                this.testResults.push({
                    test: `SEO检查 - ${check.name}`,
                    status: result.passed ? 'passed' : 'failed',
                    details: result.details,
                    score: score,
                    weight: check.weight
                });
                
                const icon = result.passed ? '✅' : '❌';
                console.log(`${icon} ${check.name}: ${result.details}`);
                
            } catch (error) {
                this.testResults.push({
                    test: `SEO检查 - ${check.name}`,
                    status: 'error',
                    details: error.message
                });
                console.error(`❌ ${check.name}测试失败:`, error);
            }
        }

        const overallScore = Math.round((totalScore / totalWeight) * 100);
        this.performanceMetrics.seoScore = overallScore;
        
        console.log(`\n🎯 SEO总体评分: ${overallScore}/100`);
        
        return overallScore;
    }

    // 检查Meta标签
    async checkMetaTags() {
        try {
            const response = await fetch(this.baseUrl);
            const html = await response.text();
            
            const hasTitle = /<title[^>]*>([^<]+)<\/title>/i.test(html);
            const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
            const title = titleMatch ? titleMatch[1] : '';
            
            const hasGuoChunlin = title.includes('郭春林');
            
            return {
                passed: hasTitle && hasGuoChunlin,
                details: hasTitle ? 
                    (hasGuoChunlin ? `标题包含"郭春林": ${title}` : `标题缺少"郭春林": ${title}`) :
                    '缺少页面标题'
            };
        } catch (error) {
            return { passed: false, details: `检查失败: ${error.message}` };
        }
    }

    // 检查Meta描述
    async checkMetaDescription() {
        try {
            const response = await fetch(this.baseUrl);
            const html = await response.text();
            
            const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
            const hasDescription = !!descMatch;
            const description = descMatch ? descMatch[1] : '';
            
            const hasKeywords = description.includes('哲学') || description.includes('郭春林');
            
            return {
                passed: hasDescription && hasKeywords,
                details: hasDescription ? 
                    (hasKeywords ? `描述包含关键词: ${description.substring(0, 50)}...` : '描述缺少关键词') :
                    '缺少Meta描述'
            };
        } catch (error) {
            return { passed: false, details: `检查失败: ${error.message}` };
        }
    }

    // 检查结构化数据
    async checkStructuredData() {
        try {
            const response = await fetch(this.baseUrl);
            const html = await response.text();
            
            const hasStructuredData = html.includes('application/ld+json');
            const hasPersonSchema = html.includes('"@type":"Person"') || html.includes('"@type": "Person"');
            
            return {
                passed: hasStructuredData && hasPersonSchema,
                details: hasStructuredData ? 
                    (hasPersonSchema ? '包含Person结构化数据' : '缺少Person Schema') :
                    '缺少结构化数据'
            };
        } catch (error) {
            return { passed: false, details: `检查失败: ${error.message}` };
        }
    }

    // 检查Sitemap
    async checkSitemap() {
        try {
            const response = await fetch(`${this.baseUrl}/api/sitemap`);
            const isAccessible = response.ok;
            
            if (isAccessible) {
                const xml = await response.text();
                const urlCount = (xml.match(/<url>/g) || []).length;
                
                return {
                    passed: urlCount > 0,
                    details: `Sitemap包含${urlCount}个URL`
                };
            } else {
                return {
                    passed: false,
                    details: `Sitemap访问失败: ${response.status}`
                };
            }
        } catch (error) {
            return { passed: false, details: `检查失败: ${error.message}` };
        }
    }

    // 检查Robots.txt
    async checkRobotsTxt() {
        try {
            const response = await fetch(`${this.baseUrl}/api/robots`);
            const isAccessible = response.ok;
            
            if (isAccessible) {
                const robotsText = await response.text();
                const hasSitemap = robotsText.includes('Sitemap:');
                
                return {
                    passed: hasSitemap,
                    details: hasSitemap ? 'Robots.txt包含Sitemap声明' : 'Robots.txt缺少Sitemap声明'
                };
            } else {
                return {
                    passed: false,
                    details: `Robots.txt访问失败: ${response.status}`
                };
            }
        } catch (error) {
            return { passed: false, details: `检查失败: ${error.message}` };
        }
    }

    // 检查页面性能
    async checkPagePerformance() {
        try {
            const startTime = Date.now();
            const response = await fetch(this.baseUrl);
            const loadTime = Date.now() - startTime;
            
            const html = await response.text();
            const pageSize = new Blob([html]).size;
            
            const isGoodPerformance = loadTime < 2000 && pageSize < 500000; // 2秒，500KB
            
            return {
                passed: isGoodPerformance,
                details: `加载时间: ${loadTime}ms, 页面大小: ${Math.round(pageSize/1024)}KB`
            };
        } catch (error) {
            return { passed: false, details: `检查失败: ${error.message}` };
        }
    }

    // 检查移动友好性
    async checkMobileFriendliness() {
        try {
            const response = await fetch(this.baseUrl);
            const html = await response.text();
            
            const hasViewport = html.includes('name="viewport"');
            const hasResponsiveCSS = html.includes('media=') || html.includes('@media');
            
            return {
                passed: hasViewport && hasResponsiveCSS,
                details: hasViewport ? 
                    (hasResponsiveCSS ? '包含viewport和响应式CSS' : '缺少响应式CSS') :
                    '缺少viewport meta标签'
            };
        } catch (error) {
            return { passed: false, details: `检查失败: ${error.message}` };
        }
    }

    // 检查关键词优化
    async checkKeywordOptimization() {
        try {
            const response = await fetch(this.baseUrl);
            const html = await response.text();
            
            const text = html.replace(/<[^>]*>/g, ' ').toLowerCase();
            const guoChunlinCount = (text.match(/郭春林/g) || []).length;
            const philosophyCount = (text.match(/哲学/g) || []).length;
            
            const hasGoodKeywordDensity = guoChunlinCount >= 3 && philosophyCount >= 5;
            
            return {
                passed: hasGoodKeywordDensity,
                details: `"郭春林"出现${guoChunlinCount}次，"哲学"出现${philosophyCount}次`
            };
        } catch (error) {
            return { passed: false, details: `检查失败: ${error.message}` };
        }
    }

    // 运行所有测试
    async runAllTests() {
        console.log('🚀 开始SEO仪表板综合测试...\n');
        
        await this.testDashboardAccessibility();
        await this.testKeywordAnalyzer();
        const seoScore = await this.testSEOChecklist();
        
        return this.generateTestReport();
    }

    // 生成测试报告
    generateTestReport() {
        const passedTests = this.testResults.filter(test => test.status === 'passed').length;
        const totalTests = this.testResults.length;
        const successRate = Math.round((passedTests / totalTests) * 100);
        
        const report = {
            timestamp: new Date().toISOString(),
            url: this.baseUrl,
            totalTests,
            passedTests,
            successRate,
            seoScore: this.performanceMetrics.seoScore || 0,
            testResults: this.testResults,
            recommendations: this.generateRecommendations()
        };

        this.printTestReport(report);
        return report;
    }

    // 生成改进建议
    generateRecommendations() {
        const failedTests = this.testResults.filter(test => test.status === 'failed');
        const recommendations = [];
        
        failedTests.forEach(test => {
            if (test.test.includes('Meta标题')) {
                recommendations.push('优化页面标题，确保包含"郭春林"关键词');
            }
            if (test.test.includes('Meta描述')) {
                recommendations.push('添加或优化Meta描述，包含哲学相关关键词');
            }
            if (test.test.includes('结构化数据')) {
                recommendations.push('添加或修复结构化数据标记');
            }
            if (test.test.includes('性能')) {
                recommendations.push('优化页面加载性能，减少文件大小');
            }
            if (test.test.includes('移动友好')) {
                recommendations.push('改进移动设备适配');
            }
        });
        
        // 通用建议
        if (this.performanceMetrics.seoScore < 80) {
            recommendations.push('定期监控SEO指标，持续优化');
            recommendations.push('使用Google Search Console监控搜索表现');
        }
        
        return [...new Set(recommendations)]; // 去重
    }

    // 打印测试报告
    printTestReport(report) {
        console.log('\n📊 SEO仪表板测试报告');
        console.log('='.repeat(50));
        console.log(`⏰ 测试时间: ${report.timestamp}`);
        console.log(`🌐 测试URL: ${report.url}`);
        console.log(`📋 测试总数: ${report.totalTests}`);
        console.log(`✅ 通过测试: ${report.passedTests}`);
        console.log(`📈 成功率: ${report.successRate}%`);
        console.log(`🎯 SEO评分: ${report.seoScore}/100`);
        
        console.log('\n📋 详细测试结果:');
        report.testResults.forEach((test, index) => {
            const icon = this.getStatusIcon(test.status);
            console.log(`${index + 1}. ${icon} ${test.test}: ${test.details}`);
        });
        
        if (report.recommendations.length > 0) {
            console.log('\n💡 改进建议:');
            report.recommendations.forEach((rec, index) => {
                console.log(`${index + 1}. ${rec}`);
            });
        }
        
        console.log('\n🔗 相关工具:');
        console.log('- SEO仪表板: https://www.guochunlin.com/seo-dashboard');
        console.log('- 关键词分析器: https://www.guochunlin.com/keyword-analyzer');
        console.log('- Google Search Console: https://search.google.com/search-console/');
        console.log('- PageSpeed Insights: https://pagespeed.web.dev/');
    }

    // 获取状态图标
    getStatusIcon(status) {
        switch (status) {
            case 'passed': return '✅';
            case 'failed': return '❌';
            case 'warning': return '⚠️';
            case 'error': return '🔴';
            default: return '❓';
        }
    }
}

// 主要测试函数
async function runSEODashboardTest() {
    const tester = new SEODashboardTester();
    return await tester.runAllTests();
}

// 导出（Node.js环境）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SEODashboardTester,
        runSEODashboardTest
    };
}

// 浏览器环境使用说明
if (typeof window !== 'undefined') {
    console.log('📊 SEO仪表板测试工具已加载');
    console.log('使用 runSEODashboardTest() 开始测试');
}

/**
 * 使用说明:
 * 
 * 1. 在Node.js中运行:
 *    node scripts/seo-dashboard-test.js
 * 
 * 2. 在浏览器中运行:
 *    - 打开开发者工具
 *    - 粘贴此脚本
 *    - 运行: runSEODashboardTest()
 * 
 * 3. 单独测试某个功能:
 *    const tester = new SEODashboardTester();
 *    await tester.testDashboardAccessibility();
 */