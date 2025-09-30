/**
 * 🔍 Google Analytics 4 配置助手
 * 用于验证和测试GA4集成状态
 */

// 检查GA4配置状态
function checkGA4Status() {
    console.log('🔍 检查Google Analytics 4配置状态...\n');
    
    // 1. 检查环境变量
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    console.log('📊 测量ID配置:', measurementId || '❌ 未配置');
    
    if (!measurementId || measurementId === 'G-XXXXXXXXXX') {
        console.log('⚠️ 警告: GA4测量ID未正确配置');
        return false;
    }
    
    // 2. 检查gtag函数
    if (typeof window !== 'undefined') {
        console.log('🌐 gtag函数状态:', typeof window.gtag === 'function' ? '✅ 已加载' : '❌ 未加载');
        console.log('📡 dataLayer状态:', Array.isArray(window.dataLayer) ? '✅ 已初始化' : '❌ 未初始化');
        
        // 3. 检查GA4脚本加载
        const gaScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`);
        console.log('📜 GA4脚本加载:', gaScript ? '✅ 已加载' : '❌ 未加载');
        
        return typeof window.gtag === 'function' && Array.isArray(window.dataLayer);
    }
    
    return true;
}

// 测试事件追踪
function testEventTracking() {
    console.log('\n🧪 测试事件追踪功能...');
    
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
        console.log('❌ gtag函数不可用，无法测试事件追踪');
        return;
    }
    
    // 测试基础事件
    console.log('📊 发送测试事件: test_event');
    window.gtag('event', 'test_event', {
        event_category: 'SEO_Test',
        event_label: 'Configuration_Test',
        value: 1,
        custom_parameters: {
            test_type: 'configuration_validation',
            timestamp: new Date().toISOString()
        }
    });
    
    // 测试郭春林专属事件
    console.log('🎯 发送郭春林专属测试事件');
    window.gtag('event', 'philosophy_content_test', {
        event_category: 'Philosophy_Content',
        event_label: '郭春林_哲学思维',
        value: 1,
        custom_parameters: {
            author: '郭春林',
            content_category: '哲学思维',
            philosopher: '郭春林',
            site_section: 'philosophy_garden'
        }
    });
    
    console.log('✅ 测试事件已发送，请在GA4中查看实时报告');
}

// 验证自定义维度
function validateCustomDimensions() {
    console.log('\n📏 验证自定义维度配置...');
    
    const customDimensions = {
        'custom_parameter_1': '郭春林',
        'custom_parameter_2': '哲学思维',
        'custom_parameter_3': 'philosophy_garden'
    };
    
    Object.entries(customDimensions).forEach(([key, value]) => {
        console.log(`📊 ${key}: ${value}`);
    });
    
    console.log('💡 建议在GA4中配置对应的自定义维度');
}

// 生成GA4配置报告
function generateGA4Report() {
    console.log('\n📄 生成GA4配置报告...');
    
    const report = {
        timestamp: new Date().toISOString(),
        measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
        status: checkGA4Status(),
        recommendations: []
    };
    
    if (!report.measurementId || report.measurementId === 'G-XXXXXXXXXX') {
        report.recommendations.push('配置正确的GA4测量ID');
    }
    
    if (typeof window !== 'undefined' && typeof window.gtag !== 'function') {
        report.recommendations.push('确保GA4脚本正确加载');
    }
    
    report.recommendations.push('在GA4中设置自定义维度');
    report.recommendations.push('配置转化事件');
    report.recommendations.push('设置受众群体');
    
    console.log('📊 GA4配置报告:', JSON.stringify(report, null, 2));
    
    return report;
}

// 主要配置检查函数
function runGA4ConfigCheck() {
    console.log('🚀 开始Google Analytics 4配置检查...\n');
    
    const isConfigured = checkGA4Status();
    
    if (isConfigured) {
        testEventTracking();
        validateCustomDimensions();
    }
    
    const report = generateGA4Report();
    
    console.log('\n🎯 配置检查完成！');
    console.log('📋 下一步建议:');
    report.recommendations.forEach((rec, index) => {
        console.log(`${index + 1}. ${rec}`);
    });
    
    return report;
}

// 导出函数（用于Node.js环境）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        checkGA4Status,
        testEventTracking,
        validateCustomDimensions,
        generateGA4Report,
        runGA4ConfigCheck
    };
}

// 浏览器环境自动运行
if (typeof window !== 'undefined') {
    // 等待页面加载完成后运行检查
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(runGA4ConfigCheck, 2000); // 延迟2秒确保GA4脚本加载
        });
    } else {
        setTimeout(runGA4ConfigCheck, 2000);
    }
}

/**
 * 使用说明:
 * 
 * 1. 在浏览器控制台中运行:
 *    - 打开 https://www.guochunlin.com/
 *    - 按F12打开开发者工具
 *    - 在控制台中粘贴此脚本并运行
 * 
 * 2. 在Node.js中运行:
 *    const ga4Helper = require('./setup-google-analytics.js');
 *    ga4Helper.runGA4ConfigCheck();
 * 
 * 3. 验证步骤:
 *    - 检查测量ID是否正确配置
 *    - 验证gtag函数是否可用
 *    - 测试事件追踪功能
 *    - 查看GA4实时报告确认数据收集
 */

// Node.js环境执行入口
if (typeof require !== 'undefined' && require.main === module) {
    const fs = require('fs');
    const path = require('path');
    
    // 手动加载环境变量
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split('=');
            if (key && valueParts.length > 0) {
                const value = valueParts.join('=').trim();
                if (key.trim() && !key.startsWith('#')) {
                    process.env[key.trim()] = value;
                }
            }
        });
    }
    
    console.log('🚀 Google Analytics 4 配置验证');
    console.log('================================\n');
    
    // 检查环境变量配置
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    console.log('📊 测量ID配置:', measurementId || '❌ 未配置');
    
    if (!measurementId || measurementId === 'G-XXXXXXXXXX') {
        console.log('❌ 错误: GA4测量ID未正确配置');
        console.log('💡 请在 .env.local 文件中设置 NEXT_PUBLIC_GA_MEASUREMENT_ID');
        process.exit(1);
    } else {
        console.log('✅ GA4测量ID配置正确:', measurementId);
    }
    
    // 检查其他相关配置
    console.log('\n🔧 其他配置检查:');
    console.log('- Vercel Analytics:', process.env.NEXT_PUBLIC_VERCEL_ANALYTICS || '未配置');
    console.log('- 网站URL:', process.env.NEXT_PUBLIC_SITE_URL || '未配置');
    console.log('- SEO监控:', process.env.NEXT_PUBLIC_ENABLE_SEO_MONITORING || '未配置');
    
    console.log('\n📋 配置验证完成!');
    console.log('💡 要完整测试GA4功能，请在浏览器中访问网站并检查开发者工具的控制台。');
}